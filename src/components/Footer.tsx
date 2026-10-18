"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Footer = () => {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const entranceCompletedRef = useRef(false);
  const [isProcessOpen, setIsProcessOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            entranceCompletedRef.current = false;
          },
          onLeaveBack: () => {
            entranceCompletedRef.current = false;
          },
        },
        onComplete: () => {
          entranceCompletedRef.current = true;
        },
        onReverseComplete: () => {
          entranceCompletedRef.current = false;
        },
      });

      // Animate top footer content (emails, socials, etc.)
      tl.from(".footer-top > div, .footer-top a, .footer-top button", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.15,
      });

      // Animate big "ARCHIVE" per letter
      tl.from(
        ".footer-title span",
        {
          yPercent: 120,
          opacity: 0,
          duration: 0.6,
          ease: "power4.out",
          stagger: 0.05,
        },
        "-=0.3" // overlap slightly with socials animation
      );
    }, footerRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  const bounceLetter = (el: HTMLElement) => {
    if (!entranceCompletedRef.current) return;
    gsap.killTweensOf(el);
    gsap.timeline({ overwrite: "auto" })
      .to(el, {
        scale: 0.35,
        duration: 0.4,
        ease: "power2.inOut",
        transformOrigin: "center center",
      })
      .to(el, {
        scale: 1,
        duration: 0.65,
        ease: "back.out(1.7)",
        transformOrigin: "center center",
      });
  };

  const bounceWord = (el: HTMLElement) => {
    if (!entranceCompletedRef.current) return;
    gsap.killTweensOf(el);
    gsap.timeline({ overwrite: "auto" })
      .to(el, {
        scale: 0.85,
        duration: 0.3,
        ease: "power2.inOut",
        transformOrigin: "center center",
      })
      .to(el, {
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        transformOrigin: "center center",
      });
  };

  return (
    <div
      ref={footerRef}
      className="relative z-[999] w-full h-fit flex flex-col items-center gap-6 sm:gap-8 md:gap-10 p-4 sm:p-6 md:px-0 pt-4 md:pt-8 pb-8 md:pb-0 mt-4 md:mt-8 bg-background overflow-hidden"
    >
      {/* Top footer content */}
      <div className="w-full md:w-7/10 max-w-xl md:max-w-3xl mx-auto px-4 footer-top flex flex-col items-center gap-5 text-center text-sm text-gray-600">
        {/* Design Process Link */}
        <div>
          <button
            type="button"
            onClick={() => setIsProcessOpen(true)}
            onMouseEnter={(e) => bounceWord(e.currentTarget)}
            onTouchStart={(e) => bounceWord(e.currentTarget)}
            className="inline-flex items-center gap-2 border border-black/25 px-4 py-1.5 text-xs sm:text-sm font-medium text-black tracking-tight rounded-full cursor-pointer transition-colors hover:bg-black hover:text-[#E3E1DC]"
          >
            Read Design Process ↗
          </button>
        </div>

        <div>
          <p
            className="font-medium text-black mb-2 inline-block cursor-pointer"
            onMouseEnter={(e) => bounceWord(e.currentTarget)}
            onTouchStart={(e) => bounceWord(e.currentTarget)}
          >
            Channels
          </p>
          <ul className="flex flex-wrap justify-center gap-3 sm:gap-6">
            <li>
              <a
                href="#"
                className="inline-block cursor-pointer transition-colors hover:text-black"
                onMouseEnter={(e) => bounceWord(e.currentTarget)}
                onTouchStart={(e) => bounceWord(e.currentTarget)}
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-block cursor-pointer transition-colors hover:text-black"
                onMouseEnter={(e) => bounceWord(e.currentTarget)}
                onTouchStart={(e) => bounceWord(e.currentTarget)}
              >
                YouTube
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-block cursor-pointer transition-colors hover:text-black"
                onMouseEnter={(e) => bounceWord(e.currentTarget)}
                onTouchStart={(e) => bounceWord(e.currentTarget)}
              >
                Spotify
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-block cursor-pointer transition-colors hover:text-black"
                onMouseEnter={(e) => bounceWord(e.currentTarget)}
                onTouchStart={(e) => bounceWord(e.currentTarget)}
              >
                Are.na
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-block cursor-pointer transition-colors hover:text-black"
                onMouseEnter={(e) => bounceWord(e.currentTarget)}
                onTouchStart={(e) => bounceWord(e.currentTarget)}
              >
                X / Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Giant footer text */}
      <h2 className="footer-title w-full text-[clamp(2.7rem,12vw,3.7rem)] sm:text-[18vw] md:text-[23.2vw] font-bold text-center text-black leading-[0.8] tracking-tighter overflow-hidden whitespace-nowrap select-none">
        {"ARCHIVE".split("").map((ch, idx) => (
          <span
            key={idx}
            className="inline-block overflow-hidden cursor-pointer"
            onMouseEnter={(e) => bounceLetter(e.currentTarget)}
            onTouchStart={(e) => bounceLetter(e.currentTarget)}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </h2>

      {/* Design Process Modal */}
      {isProcessOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6"
          onClick={() => setIsProcessOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#E3E1DC] text-[#121110] border border-black/15 rounded-lg p-6 sm:p-8 md:p-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-black/15 pb-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-600 mb-1">
                  Behind the Build
                </p>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  THE ARCHIVE: Design Process
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsProcessOpen(false)}
                className="text-sm font-medium px-3 py-1 border border-black/20 rounded-full hover:bg-black hover:text-[#E3E1DC] transition-colors cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-6 text-sm sm:text-base leading-relaxed text-neutral-800">
              <div>
                <h4 className="font-semibold text-black text-base sm:text-lg mb-1">
                  1. The Color of History: Aged Nigerian Newspapers
                </h4>
                <p>
                  The starting point was finding a color that immediately speaks to history. What came to mind was the look of old Nigerian newspapers and how their pages naturally weather and turn into a warm, pale stone tone over time. Instead of a stark white canvas, the background was shifted to this aged newsprint shade (<code>#E3E1DC</code>).
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-black text-base sm:text-lg mb-1">
                  2. Typography &amp; Structure: The Norrav Inspiration
                </h4>
                <p>
                  Choosing the right typeface and page structure was initially a major roadblock. After revisiting my personal archive of saved website inspirations, I looked at <strong>Norrav</strong>, a studio I have always followed. Studying how their portfolio tells a story became the structural reference for <strong>THE ARCHIVE</strong>, maintaining the clean font pairings and editorial arrangements while adapting the background to the pale Nigerian newspaper tone to tell a story about Nigerian Fashion and Music.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-black text-base sm:text-lg mb-1">
                  3. Building the 3D Panoramic Curve
                </h4>
                <p>
                  Curved 3D panoramic galleries have always been something I admired and wanted to build myself. Under each era (1960s, 1980s, 1990s, 2000s), I built a custom Three.js and GSAP continuous 3D panoramic filmstrip that bends archival fashion photography across the viewport and slows down smoothly on hover.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-black text-base sm:text-lg mb-1">
                  4. Embedded Sonic Nostalgia
                </h4>
                <p>
                  To make the history tangible, I embedded music and video links for each decade so anyone visiting the site can listen to these classic Nigerian songs and feel the nostalgia right inside the experience.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-black text-base sm:text-lg mb-1">
                  5. The Monumental Footer: Inspired by NOTHIN&apos;
                </h4>
                <p>
                  The footer was inspired by <strong>NOTHIN&apos;</strong>, anchored by an oversized edge-to-edge <strong>ARCHIVE</strong> wordmark and enhanced in React + GSAP with an interactive scale-up and scale-down bounce effect on hover.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
