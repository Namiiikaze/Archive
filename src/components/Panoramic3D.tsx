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

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 240;

    const scene = new THREE.Scene();

    // Camera positioned close and level so images fill the strip clearly
    const fov = 30;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.4);
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
    const panelWidth = 2.15;
    const panelHeight = 2.45;
    const step = panelWidth; // 0 gap so panels touch seamlessly edge-to-edge
    const totalLength = count * step;
    const panelAspect = panelWidth / panelHeight;

    // Large radius gives a subtle, readable 3D curve without deep distortion
    const curveRadius = 18;
    const segmentsX = 20;

    const baseGeo = new THREE.PlaneGeometry(panelWidth, panelHeight, segmentsX, 1);
    const basePositions = baseGeo.attributes.position.array as Float32Array;

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.MeshBasicMaterial[] = [];
    const textures: THREE.Texture[] = [];
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
      // Disable frustum culling because vertex positions are dynamically deformed each frame
      mesh.frustumCulled = false;
      scene.add(mesh);
    });

    // Update each panel's vertices along a shallow, gapless 3D panoramic arc
    const updateArcPositions = (scrollOffset: number) => {
      const halfTrack = totalLength / 2;

      for (let i = 0; i < count; i++) {
        // Wrap arc position seamlessly into [-halfTrack, +halfTrack]
        let centerS = (i * step - scrollOffset) % totalLength;
        if (centerS < -halfTrack) centerS += totalLength;
        if (centerS > halfTrack) centerS -= totalLength;

        const posAttr = geometries[i].attributes.position;
        for (let v = 0; v < posAttr.count; v++) {
          const localX = basePositions[v * 3];
          const localY = basePositions[v * 3 + 1];

          const s = centerS + localX;
          const theta = s / curveRadius;

          // Gentle concave 3D curve: center sits at z = 0, edges curve slightly forward
          const x = curveRadius * Math.sin(theta);
          const z = curveRadius * (1 - Math.cos(theta)) * 0.55;

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
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || 240;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
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
      className="relative w-full h-[150px] sm:h-[180px] md:h-[220px] lg:h-[250px] overflow-hidden select-none"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default Panoramic3D;
