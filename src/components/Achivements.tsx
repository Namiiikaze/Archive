"use client"
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";


const companies = [
  "/company/nigeria-coat-of-arms.svg",
];

const Achievements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate heading + paragraph text
      gsap.from(".achievements-text  ", {
        y: "100%",
        opacity: 0,
        duration: 0.6,
       
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate company logos
      gsap.from(".logo", {
        opacity: 0,
        scale: 0.6,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-fit p-4 sm:p-6 lg:p-10 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-10">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl overflow-hidden">
            <span className="block achievements-text">Cultural Pillars</span>
          </h2>
        </div>
        <div className="flex-1 flex flex-col mt-2 md:mt-0">
          <div className="text-sm sm:text-base overflow-hidden leading-relaxed">
            {`From the analog warmth of 1970s Lagos vinyl pressings and Afrobeat shrines to hand-woven Aso-Oke looms, indigo Adire dye pits, and contemporary runway rebellion, we document the icons, sounds, and silhouettes that shaped Nigeria's identity. Every recording and garment tells the story of a generation.`
              .split(" ")
              .map((ch, idx) => (
                <p
                  key={idx}
                  className="inline-block mr-1.5 sm:mr-2 overflow-hidden py-0.5"
                >
                  <span className="block achievements-text">{ch}</span>
                </p>
              ))}
          </div>

          <div className="grid grid-cols-4 mt-6 md:mt-10 gap-3 md:gap-6">
            {companies.map((company, idx) => (
              <Image
                src={company}
                key={idx}
                width={80}
                height={80}
                alt="Nigerian Coat of Arms"
                className="size-14 sm:size-16 md:size-20 logo object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
