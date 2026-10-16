"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

const images = [
  "/imgs/60s-1.jpg",
  "/imgs/80s-1.jpg",
  "/imgs/90s-1.jpg",
  "/imgs/2010s-1.jpg",
  "/imgs/60s-2.jpg",
  "/imgs/80s-2.jpg",
  "/imgs/90s-2.jpg",
  "/imgs/2010s-2.jpg",
  "/imgs/60s-3.jpg",
  "/imgs/80s-3.jpg",
  "/imgs/90s-3.jpg",
  "/imgs/2010s-3.jpg",
  "/imgs/60s-4.jpg",
  "/imgs/80s-4.jpg",
  "/imgs/90s-4.jpg",
  "/imgs/2010s-4.jpg",
  "/imgs/60s-5.jpg",
  "/imgs/80s-5.jpg",
  "/imgs/90s-5.jpg",
  "/imgs/2010s-5.jpg",
];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageIndex = useRef(0);
  const pRefs = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const letters =
      containerRef.current.querySelectorAll<HTMLSpanElement>(".letter");

    const tl = gsap.timeline();

    letters.forEach((letterEl, index) => {
      const finalChar = letterEl.getAttribute("data-char") || "";

      tl.to(
        letterEl,
        {
          delay: 4.8,
          duration: 0.4,
          onStart: () => {
            let scrambleCount = 0;
            const interval = setInterval(() => {
              letterEl.textContent = chars.charAt(
                Math.floor(Math.random() * chars.length)
              );
              scrambleCount++;
              if (scrambleCount > 6) {
                clearInterval(interval);
                letterEl.textContent = finalChar;
              }
            }, 40);
          },
        },
        index * 0.08 + 0.5
      );
    });

    // after last letter animates → reveal paragraphs
    tl.to(
      pRefs.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power3.out",
      },
      "+=0.5" // wait a bit after last letter
    );
  }, []);

  // mouse trail effect (unchanged)
  useEffect(() => {
    if (!containerRef.current) return;

    let lastX = 0,
      lastY = 0;
    const threshold = 120;

    const triggerTrail = (clientX: number, clientY: number) => {
      const dx = clientX - lastX;
      const dy = clientY - lastY;
      const distance = Math.hypot(dx, dy);

      if (distance < threshold) return;

      const dirX = dx / distance || 0;
      const dirY = dy / distance || 0;

      lastX = clientX;
      lastY = clientY;

      const rotation = dirX > 0 ? 12 : -12;
      const src = images[imageIndex.current % images.length];
      imageIndex.current++;

      const img = document.createElement("img");
      img.src = src;

      const isMobile = window.innerWidth < 768;
      const imgWidth = isMobile ? "160px" : "280px";

      Object.assign(img.style, {
        position: "absolute",
        left: `${clientX}px`,
        top: `${clientY}px`,
        width: imgWidth,
        height: "auto",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        opacity: "0",
        objectFit: "cover",
        willChange: "transform, opacity",
        filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.25))",
      });

      containerRef.current?.appendChild(img);

      gsap.fromTo(
        img,
        {
          scale: 0.6,
          opacity: 0,
          borderRadius: "50%",
          x: `-=${dirX * 80}`,
          y: `-=${dirY * 80}`,
        },
        {
          scale: 1,
          opacity: 1,
          borderRadius: 0,
          duration: 1.4,
          rotate: rotation,
          ease: "power3.out",
          x: `+=${dirX * 180}`,
          y: `+=${dirY * 180}`,
        }
      );

      gsap.to(img, {
        opacity: 0,
        scale: 1.05,
        duration: 1.2,
        delay: 0.8,
        ease: "power2.out",
        onComplete: () => img.remove(),
      });
    };

    const handleMove = (e: MouseEvent) => {
      triggerTrail(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        triggerTrail(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-[999] bg-black min-h-[100dvh] h-screen text-white flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-8 overflow-hidden px-4 select-none"
    >
      {/* First block */}
      <div className="md:ml-[-10%] lg:ml-[-30%] flex flex-col-reverse md:flex-row gap-2 sm:gap-4 md:gap-5 items-center justify-center text-center md:text-left">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-aboreto overflow-hidden whitespace-nowrap">
          {"ARCHIVE".split("").map((char, ci) => (
            <span
              key={ci}
              data-char={char}
              className="letter inline-block will-change-transform"
            >
              &nbsp;
            </span>
          ))}
        </h1>
        <p
          ref={(el) => {
            if (el && !pRefs.current.includes(el)) {
              pRefs.current.push(el);
            }
          }}
          className="hero-text opacity-0 translate-y-6 text-xs sm:text-sm md:text-base text-center max-w-[260px] sm:max-w-none"
        >
          making the past impossible to ignore
        </p>
      </div>

      {/* Second block */}
      <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-aboreto overflow-hidden whitespace-nowrap">
        {"NIGERIAN".split("").map((char, ci) => (
          <span
            key={ci}
            data-char={char}
            className="letter inline-block will-change-transform"
          >
            &nbsp;
          </span>
        ))}
      </h1>

      {/* Third block */}
      <div className="md:ml-[15%] lg:ml-[40%] flex flex-col-reverse md:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-5 text-center md:text-left">
        <p
          ref={(el) => {
            if (el && !pRefs.current.includes(el)) {
              pRefs.current.push(el);
            }
          }}
          className="hero-text opacity-0 translate-y-6 text-xs sm:text-sm md:text-base text-center max-w-[260px] sm:max-w-none"
        >
          music &amp; fashion across generations
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-aboreto overflow-hidden whitespace-nowrap">
          {"Museum".split("").map((char, ci) => (
            <span
              key={ci}
              data-char={char}
              className="letter inline-block will-change-transform"
            >
              &nbsp;
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default Hero;
