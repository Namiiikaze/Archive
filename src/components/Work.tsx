"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

import { useEffect, useRef } from "react";
import Panoramic3D from "./Panoramic3D";

const services: Service[] = [
  {
    id: "1960",
    title: "Highlife & Independence",
    description:
      "Independence ignited a golden renaissance — where brass-driven Highlife met regal hand-woven Aso-Oke and sharp post-colonial tailoring.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/z5nd1SjB7rA",
    },
    services: ["Cardinal Rex Lawson", "Dr. Victor Olaiya", "Bobby Benson", "I.K. Dairo", "Aso-Oke", "Indigo Adire"],
    fashionImages: Array.from({ length: 20 }, (_, i) => `/era/1960/${i + 1}.jpg`),
  },
  {
    id: "1980",
    title: "Afrobeat & Maximalism",
    description:
      "Sonic rebellion meets maximalist style — from militant Afrobeat horns at the Shrine to shimmering Jùjú guitars and silk boubous.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/7h8R6PH0kzg",
    },
    services: ["Fela Anikulapo Kuti", "King Sunny Adé", "Onyeka Onwenu", "Chief Ebenezer Obey", "Sir Shina Peters"],
    fashionImages: Array.from({ length: 21 }, (_, i) => `/era/1980/${i + 1}.jpg`),
  },
  {
    id: "1990",
    title: "Street Reggae & Nollywood",
    description:
      "Ajegunle street rhythm fuses with screen glamour — marked by conscious roots reggae, modern Fuji beats, and masked mystique.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/vveYFgRIutw",
    },
    services: ["Majek Fashek", "Ras Kimono", "K1 De Ultimate", "Daddy Showkey", "Lagbaja", "Baggy Street Denim"],
    fashionImages: Array.from({ length: 26 }, (_, i) => `/era/1990/${i + 1}.jpg`),
  },
  {
    id: "2000",
    title: "Y2K & Afrobeats Dawn",
    description:
      "The digital pop explosion that rewired African sound — uniting nostalgic Y2K street style with fearless global swagger.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/fvhbCjpeKLY",
    },
    services: ["2Face Idibia", "D'banj & Don Jazzy", "P-Square", "Asa", "Styl-Plus", "Contemporary Ankara Couture"],
    fashionImages: Array.from({ length: 14 }, (_, i) => `/era/2000s/${i + 1}.jpg`),
  },
];

const Work = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray<HTMLElement>(".era-card", containerRef.current);

    // Ensure the full panoramic and its bottom space are always reachable before sticking
    const updateStickyOffsets = () => {
      cards.forEach((card) => {
        const extra = window.innerHeight - card.offsetHeight;
        card.style.top = `${Math.min(0, extra)}px`;
      });
      ScrollTrigger.refresh();
    };

    const ctx = gsap.context(() => {
      gsap.from(".title span", {
        y: "100%",
        duration: 0.6,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      cards.forEach((card, index) => {
        const inner = card.querySelector(".era-card-inner");

        // Smooth ease-in as each era enters the viewport
        if (inner) {
          gsap.fromTo(
            inner,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                end: "top 20%",
                scrub: 0.6,
              },
            }
          );
        }

        // Smoothly fade out the current era while the next era eases in
        const nextCard = cards[index + 1];
        if (nextCard) {
          gsap.fromTo(
            card,
            { opacity: 1 },
            {
              opacity: 0,
              ease: "power2.inOut",
              immediateRender: false,
              scrollTrigger: {
                trigger: nextCard,
                start: "top 95%",
                end: "top 15%",
                scrub: 0.6,
              },
            }
          );
        }
      });
    }, containerRef);

    updateStickyOffsets();
    window.addEventListener("resize", updateStickyOffsets);

    return () => {
      window.removeEventListener("resize", updateStickyOffsets);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative z-[400] h-fit p-4 sm:p-6 lg:p-10">
      {/* heading */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight max-w-[950px] overflow-hidden title mb-4 sm:mb-6">
        <span className="block">Music &amp; Fashion Disciplines</span>
      </h2>

      {/* card-container */}
      <div className="min-h-screen">
        {services.map((service) => (
          <Card key={service.id} {...service} />
        ))}
      </div>
    </div>
  );
};

export default Work;

type Service = {
  id: string;
  title: string;
  description: string;
  media: {
    type: "image" | "video";
    url: string;
  };
  services: string[];
  fashionImages: string[];
};

const Card: React.FC<Service> = ({
  id,
  title,
  description,
  media,
  services,
  fashionImages,
}) => {
  return (
<<<<<<< HEAD
    <div className="era-card sticky top-0 left-0 bg-background min-h-screen flex flex-col justify-start pt-5 sm:pt-6 lg:pt-8 px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-28 mb-[24vh] md:mb-[32vh] last:mb-8">
      <div className="era-card-inner flex flex-col justify-start gap-5 md:gap-7 w-full">
        {/* Top Content Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 sm:gap-5 md:gap-6 lg:gap-10">
          {/* Left Side: Stacked vertically on mobile, side-by-side from sm upwards */}
          <div className="lg:flex-[0.42] flex flex-col sm:flex-row justify-between items-start sm:items-baseline lg:items-start gap-2 sm:gap-4">
            <h2 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-medium tracking-tighter leading-none shrink-0">
              {id}
            </h2>
            <h4 className="text-lg sm:text-lg md:text-xl font-semibold leading-snug tracking-tight sm:max-w-[240px] text-left sm:text-right lg:text-left">
              {title}
            </h4>
          </div>

          {/* Right Side */}
          <div className="lg:flex-[0.55] flex flex-col justify-start items-start gap-4 md:gap-5">
            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              {description}
            </p>

            {/* Video Placeholder + Era Details Side-by-Side on larger screens */}
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-6 lg:gap-8 mt-2 md:mt-3">
              {media.type === "image" ? (
                <Image
                  src={media.url}
                  alt={title}
                  width={280}
                  height={160}
                  className="h-[120px] sm:h-[140px] w-full sm:w-[220px] md:w-[250px] object-cover shrink-0 rounded"
                />
              ) : (
                <iframe
                  src={`${
                    media.url
                  }?autoplay=1&mute=1&controls=0&loop=1&playlist=${media.url
                    .split("/")
                    .pop()}`}
                  title={title}
                  className="h-[120px] sm:h-[140px] w-full sm:w-[220px] md:w-[250px] object-cover shrink-0 rounded"
                  frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              )}

              {/* Prominent Musicians & Fashion Details */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm leading-snug tracking-wide">
                {services.map((group, i) => (
                  <ul key={i} className="text-light space-y-1">
                    {group.map((item, j) => (
                      <li key={j} className="whitespace-normal sm:whitespace-nowrap">{item}</li>
                    ))}
                  </ul>
                ))}
              </div>
=======
    <div className="sticky top-0 left-0 flex min-h-screen flex-col justify-start gap-4 overflow-y-auto bg-background p-4 md:gap-6 md:p-6 lg:h-screen lg:overflow-hidden lg:p-8">
      <div className="grid grid-cols-[0.22fr_0.22fr_0.56fr] items-start gap-24">
        <h2 className="shrink-0 text-5xl font-medium leading-none tracking-tighter sm:text-6xl md:text-7xl xl:text-8xl">
          {id}
        </h2>

        <h4 className="self-start text-sm font-normal leading-snug tracking-tight text-neutral-600 sm:max-w-[240px] lg:justify-self-center lg:text-center">
          {title}
        </h4>

        <div className="flex w-full flex-col items-start justify-start gap-3 md:gap-4">
          <p className="max-w-none text-2xl font-normal leading-snug text-neutral-900">
            {description}
          </p>

          <div className="mt-2 flex w-full flex-col items-start gap-4 sm:flex-row sm:items-start md:mt-4 md:gap-6 lg:gap-8">
            {media.type === "image" ? (
              <Image
                src={media.url}
                alt={title}
                width={280}
                height={160}
                className="h-[150px] w-full shrink-0 rounded object-cover sm:h-[170px] sm:w-[260px] md:w-[320px]"
              />
            ) : (
              <iframe
                src={`${
                  media.url
                }?autoplay=1&mute=1&controls=0&loop=1&playlist=${media.url
                  .split("/")
                  .pop()}`}
                title={title}
                className="h-[150px] w-full shrink-0 rounded sm:h-[170px] sm:w-[260px] md:w-[320px]"
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            )}

            <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-1 text-xs leading-snug tracking-wide text-light sm:text-sm">
              {services.map((item) => (
                <span key={item} className="whitespace-normal">
                  {item}
                </span>
              ))}
>>>>>>> a9d122a3b95d9f25e0e85b48bce676dd316a6243
            </div>
          </div>
        </div>

        {/* Curved 3D Panoramic Fashion Motion (Three.js + GSAP) Under Each Era */}
        <div className="w-full mt-3 md:mt-5">
          <Panoramic3D images={fashionImages} />
        </div>
      </div>
    </div>
  );
};