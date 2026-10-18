"use client"
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import  { useEffect, useRef } from "react";

const archiveImages = [
  {
    src: "/archive/demas-nwoko.jpg",
    alt: "Portrait of Demas Nwoko",
    title: "Demas Nwoko",
    position: "center",
  },
  {
    src: "/archive/traditional-hairstyles.jpg",
    alt: "Traditional Nigerian hairstyle",
    title: "Traditional Hairstyles",
    position: "center",
  },
  {
    src: "/archive/archival-film-portrait.jpg",
    alt: "Archival film portrait",
    title: "Archival Film Portrait",
    position: "center",
  },
  {
    src: "/archive/fela-kuti.jpg",
    alt: "Fela Kuti performing",
    title: "Fela Kuti",
    position: "center top",
  },
  {
    src: "/archive/archive-new-1.jpg",
    alt: "Portrait of Chief Stephen Osita Osadebe",
    title: "Chief Stephen Osita Osadebe",
    position: "center",
  },
  {
    src: "/archive/archive-new-2.jpg",
    alt: "Portrait of Ben Enwonwu",
    title: "Ben Enwonwu",
    position: "center",
  },
  {
    src: "/archive/lagbaja.jpg",
    alt: "Portrait of Lagbaja",
    title: "Lagbaja",
    position: "center",
  },
];



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
      gsap.from(".bio > span > span", {
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
    <section
      id="about"
      ref={containerRef}
      className="p-4 sm:p-6 lg:p-10"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between pt-10 sm:pt-14 lg:pt-6">
        <div className="mb-4 sm:mb-6 md:mb-0 md:w-[34%] md:pr-6 shrink-0">
          <span className="title block overflow-hidden text-base font-medium sm:text-lg">
            <span className="block">The Archive</span>
          </span>
        </div>

        <p className="bio md:w-[66%] ml-auto max-w-[950px] text-2xl leading-[1.18] tracking-tight sm:text-3xl lg:text-4xl">
          {bioText.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="mr-2 inline-block overflow-hidden py-0.5 sm:mr-2.5"
            >
              <span className="block">{word}</span>
            </span>
          ))}
        </p>
      </div>

      <div className="mt-14 overflow-hidden sm:mt-20 md:mt-24 lg:mx-[7%] lg:mt-28">
        <div
          aria-label="Archive image collection"
          className="hide-scrollbar flex snap-x snap-mandatory gap-1.5 overflow-x-auto sm:gap-2"
        >
          {Array.from({ length: 7 }, (_, index) => (
            <div
              key={index}
              className="group relative aspect-[0.78] w-[calc((100%-3px)/2)] shrink-0 snap-start overflow-hidden bg-black/[0.04] sm:w-[calc((100%-4px)/3)] lg:w-[calc((100%-8px)/5)]"
            >
              {archiveImages[index] ? (
                <>
                  <img
                    src={archiveImages[index].src}
                    alt={archiveImages[index].alt}
                    className="h-full w-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: archiveImages[index].position }}
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-black/75 px-3 py-2 text-xs text-white transition-transform duration-300 group-hover:translate-y-0 sm:text-sm">
                    {archiveImages[index].title}
                  </span>
                </>
              ) : (
                <span className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2 text-xs text-white sm:text-sm">
                  More archive images coming soon
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
