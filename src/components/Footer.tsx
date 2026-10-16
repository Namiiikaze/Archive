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
        },
        "-=0.3" // overlap slightly with socials animation
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={footerRef}
      className="relative z-[999] h-fit flex flex-col items-center gap-6 sm:gap-8 md:gap-10 p-4 sm:p-6 pt-4 md:pt-6 pb-8 md:pb-2 mt-4 md:mt-6 bg-background"
    >
      {/* Top footer content */}
      <div className="w-full md:w-7/10 mx-auto footer-top flex flex-col items-center text-center text-sm text-gray-600">
        <div>
          <p className="font-medium text-black mb-2">Channels</p>
          <ul className="flex flex-wrap justify-center gap-3 sm:gap-6">
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">YouTube</a>
            </li>
            <li>
              <a href="#">Spotify</a>
            </li>
            <li>
              <a href="#">Are.na</a>
            </li>
            <li>
              <a href="#">X / Twitter</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Giant footer text */}
      <h2 className="footer-title text-[clamp(2.7rem,12vw,3.7rem)] sm:text-[4.5rem] md:text-[18rem] font-semibold text-center text-black leading-none overflow-hidden whitespace-nowrap select-none">
        {"ARCHIVE".split("").map((ch, idx) => (
          <span key={idx} className="inline-block overflow-hidden">
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </h2>
    </div>
  );
};

export default Footer;
