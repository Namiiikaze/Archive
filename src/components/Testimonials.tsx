"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

import React, { useEffect, useRef } from "react";

const testimonials = [
  {
    company: "/company/nigeria-coat-of-arms.svg",
    quote:
      "Hearing pristine transfers of 1970s Lagos horn sections alongside the original stage garments worn at the Afrika Shrine makes history feel alive. ARCHIVE bridges the gap between the pioneers who laid the groove and the producers sampling those rhythms today.",
    name: "Dr. Adewale Ogunlesi",
    role: "Ethnomusicologist & Sonic Archivist, Lagos",
  },
  {
    company: "/company/nigeria-coat-of-arms.svg",
    quote:
      "For too long, our sartorial history existed only in fading family trunks. Seeing century-old Abeokuta Adire patterns and 1960s post-independence tailoring documented with this level of care gives young Nigerian designers a foundation to build the future upon.",
    name: "Zainab Danjuma",
    role: "Textile Historian & Fashion Curator, Abuja",
  },
  {
    company: "/company/nigeria-coat-of-arms.svg",
    quote:
      "From the rebel tailoring of 70s highlife bands to the fearless silhouettes of today’s Alté movement, music and fashion in Nigeria have always moved as one. ARCHIVE makes that lineage impossible to ignore for a whole new generation.",
    name: "Chidi Nwosu",
    role: "Cultural Critic & Creative Director, Enugu",
  },
];

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !sliderRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from(".Testimonials span", {
        y: "100%",
        duration: 0.6,
        stagger: 0.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        },
      });

      // Horizontal scroll
      const slider = sliderRef.current!;
      const sections = slider.querySelectorAll(
        ".testimonial"
      ) as NodeListOf<HTMLElement>;

      let totalWidth = 0;
      sections.forEach((section) => {
        totalWidth += section.offsetWidth;
      });
      totalWidth -= containerRef.current!.offsetWidth;

      gsap.to(slider, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + totalWidth,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div ref={containerRef} className="relative p-4 sm:p-6 pb-2">
        {/* heading */}
        <div className="flex flex-col md:flex-row gap-3 sm:gap-5 md:gap-20 mb-4 sm:mb-6 p-2">
          <h2 className="text-2xl sm:text-3xl max-w-[950px] overflow-hidden Testimonials">
            <span className="block">Voices of the Archive</span>
          </h2>
          <p className="max-w-[280px] sm:max-w-xs md:max-w-sm text-xs sm:text-sm leading-relaxed text-gray-600">
            {"Vinyl scratches and fabrics fade with time, but preserving the voices, rhythms, and garments of Nigeria's pioneers keeps our creative spirit eternal."
              .split(" ")
              .map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden mr-1">
                  <span className="block">{word}</span>
                </span>
              ))}
          </p>
        </div>

        {/* horizontal track */}
        <div className="overflow-hidden">
          <div ref={sliderRef} className="flex h-fit pb-2">
            {testimonials.map((review, idx) => (
              <div
                key={idx}
                className="testimonial shrink-0 w-[88vw] sm:w-[75vw] md:w-[60vw] lg:w-[50vw] flex flex-col justify-start pt-2 md:pt-4 p-3 sm:p-4 md:p-6 pb-2 mr-4 sm:mr-6"
              >
                <Image
                  src={review.company}
                  alt="Coat of arms"
                  width={64}
                  height={64}
                  className="size-12 sm:size-16 mb-4 sm:mb-6 object-contain"
                />
                <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-medium leading-snug mb-4 sm:mb-6 pr-2 sm:pr-8">
                  “{review.quote}”
                </p>
                <div className="text-base sm:text-lg">
                  <h2 className="font-semibold">{review.name}</h2>
                  <h4 className="text-gray-500 text-sm sm:text-base">{review.role}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
