"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

interface Panoramic3DProps {
  images: string[];
}

const Panoramic3D: React.FC<Panoramic3DProps> = ({ images }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || images.length === 0) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 400;

    const scene = new THREE.Scene();

    // Camera positioned with comfortable depth to frame the full sweeping 3D arc
    const fov = 30;
    const cameraDistance = 6.8;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 100);
    camera.position.set(0, 0, cameraDistance);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Edge-to-edge continuous 3D panoramic arc - zero gaps between images
    const count = images.length;
    const panelWidth = 2.25;
    const panelHeight = 2.75;
    const step = panelWidth; // 0 gap so panels touch seamlessly edge-to-edge
    const totalLength = count * step;
    const panelAspect = panelWidth / panelHeight;

    const vHeight = 2 * cameraDistance * Math.tan(((fov / 2) * Math.PI) / 180);
    let currentCurveRadius = Math.max(20, (width / height) * 4.6);

    const segmentsX = 24;
    const baseGeo = new THREE.PlaneGeometry(panelWidth, panelHeight, segmentsX, 1);
    const basePositions = baseGeo.attributes.position.array as Float32Array;

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.MeshBasicMaterial[] = [];
    const textures: THREE.Texture[] = [];
    const meshes: THREE.Mesh[] = [];
    const textureLoader = new THREE.TextureLoader();

    images.forEach((imgUrl) => {
      const geo = baseGeo.clone();
      geometries.push(geo);

      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      });
      materials.push(mat);

      textureLoader.load(imgUrl, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;

        // Center-crop (object-fit: cover) so every photo is sharp and unstretched
        const imgW = tex.image?.width || 1;
        const imgH = tex.image?.height || 1;
        const imgAspect = imgW / imgH;

        if (imgAspect > panelAspect) {
          const scale = panelAspect / imgAspect;
          tex.repeat.set(scale, 1);
          tex.offset.set((1 - scale) / 2, 0);
        } else {
          const scale = imgAspect / panelAspect;
          tex.repeat.set(1, scale);
          tex.offset.set(0, (1 - scale) / 2);
        }

        mat.map = tex;
        mat.needsUpdate = true;
        textures.push(tex);
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.frustumCulled = false;
      scene.add(mesh);
      meshes.push(mesh);
    });

    // Update each panel's vertices along the continuous 3D panoramic arc
    const updateArcPositions = (scrollOffset: number) => {
      const halfTrack = totalLength / 2;
      const vWidth = vHeight * (width / height);
      // Only render panels within visible reach to prevent wrapping behind the camera
      const maxVisibleS = vWidth / 2 + step * 1.5;

      for (let i = 0; i < count; i++) {
        let centerS = (i * step - scrollOffset) % totalLength;
        if (centerS < -halfTrack) centerS += totalLength;
        if (centerS > halfTrack) centerS -= totalLength;

        const mesh = meshes[i];
        if (!mesh) continue;

        // Cull panels that are safely outside the viewport so they never clip through the camera
        if (Math.abs(centerS) > maxVisibleS) {
          if (mesh.visible) mesh.visible = false;
          continue;
        }
        if (!mesh.visible) mesh.visible = true;

        const posAttr = geometries[i].attributes.position;
        for (let v = 0; v < posAttr.count; v++) {
          const localX = basePositions[v * 3];
          const localY = basePositions[v * 3 + 1];

          const s = centerS + localX;
          const theta = s / currentCurveRadius;

          // Smooth 3D curve: center sits at z = 0, edges curve cleanly forward to screen edges
          const x = currentCurveRadius * Math.sin(theta);
          const z = currentCurveRadius * (1 - Math.cos(theta)) * 0.55;

          posAttr.setXYZ(v, x, localY, z);
        }
        posAttr.needsUpdate = true;
      }
    };

    // Continuous motion driven by GSAP (consistent speed per panel)
    const motionState = { offset: 0 };
    updateArcPositions(0);

    const ctx = gsap.context(() => {});
    let scrollTween: gsap.core.Tween;

    ctx.add(() => {
      scrollTween = gsap.to(motionState, {
        offset: totalLength,
        duration: count * 2.8,
        ease: "none",
        repeat: -1,
        onUpdate: () => {
          updateArcPositions(motionState.offset);
        },
      });
    });

    const renderScene = () => {
      renderer.render(scene, camera);
    };
    gsap.ticker.add(renderScene);

    const onMouseEnter = () => {
      if (scrollTween) {
        gsap.to(scrollTween, { timeScale: 0.35, duration: 0.5, ease: "power2.out" });
      }
    };

    const onMouseLeave = () => {
      if (scrollTween) {
        gsap.to(scrollTween, { timeScale: 1, duration: 0.7, ease: "power2.out" });
      }
    };

    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 400;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      currentCurveRadius = Math.max(20, (width / height) * 4.6);
      updateArcPositions(motionState.offset);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      gsap.ticker.remove(renderScene);
      ctx.revert();
      baseGeo.dispose();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, [images]);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[400px] overflow-hidden select-none"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default Panoramic3D;

