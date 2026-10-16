"use client"
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import  { useEffect, useRef } from "react";



const About = () => {
  const bioText = `Curators, historians and storytellers. Preserving Nigeria’s sonic revolutions and sartorial mastery. A living digital museum making our music and fashion heritage impossible to ignore.`;

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate the title
      gsap.from(".title span", {
        y: "100%",
        duration: 0.6,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate the bio (word by word)
      gsap.from(".bio p span", {
        y: "100%",
        duration: 0.6,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="about" ref={containerRef} className="p-4 sm:p-6 lg:p-10 flex flex-col items-center justify-center text-center">
      {/* heading */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl max-w-[950px] mx-auto mt-6 sm:mt-10 text-center px-2">
        <span className="block text-lg sm:text-xl font-medium mb-3 sm:mb-4 overflow-hidden title">
          <span className="block">The Archive</span>
        </span>

        <span className="bio">
          {bioText.split(" ").map((word, idx) => (
            <p key={idx} className="inline-block mr-1.5 sm:mr-2 overflow-hidden py-0.5">
              <span className="block">
                {word}
              </span>
            </p>
          ))}
        </span>
      </h2>
    </div>
  );
};

export default About;
