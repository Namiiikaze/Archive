"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Footer = () => {
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // Animate top footer content (emails, socials, etc.)
      tl.from(".footer-top > div, .footer-top a", {
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
          onComplete: () => {
            gsap.set([".footer-title", ".footer-title span"], { overflow: "visible" });
          },
        },
        "-=0.3" // overlap slightly with socials animation
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const bounceLetter = (el: HTMLElement) => {
    gsap.killTweensOf(el);
    gsap.set(el, { overflow: "visible" });
    if (el.parentElement) gsap.set(el.parentElement, { overflow: "visible" });

    gsap.timeline({ overwrite: "auto" })
      .to(el, {
        yPercent: -20,
        duration: 0.18,
        ease: "power2.out",
      })
      .to(el, {
        yPercent: 0,
        scale: 1,
        opacity: 1,
        duration: 0.45,
        ease: "bounce.out",
      });
  };

  const bounceWord = (el: HTMLElement) => {
    gsap.killTweensOf(el);
    gsap.timeline({ overwrite: "auto" })
      .to(el, {
        y: -6,
        duration: 0.18,
        ease: "power2.out",
      })
      .to(el, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: "bounce.out",
      });
  };

  return (
    <div
      ref={footerRef}
      className="relative z-[999] w-full h-fit flex flex-col items-center gap-6 sm:gap-8 md:gap-10 p-4 sm:p-6 md:px-0 pt-4 md:pt-8 pb-8 md:pb-0 mt-4 md:mt-8 bg-background overflow-hidden"
    >
      {/* Top footer content */}
      <div className="w-full md:w-7/10 max-w-xl md:max-w-3xl mx-auto px-4 footer-top flex flex-col items-center text-center text-sm text-gray-600">
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
    </div>
  );
};

export default Footer;
