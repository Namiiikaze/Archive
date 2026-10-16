"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

import { useEffect, useRef } from "react";
import Panoramic3D from "./Panoramic3D";

const services: Service[] = [
  {
    id: "1960",
    title: "Highlife Horns & Independence Elegance",
    description:
      "Independence ignited a golden cultural renaissance. Cardinal Rex Lawson, Dr. Victor Olaiya, and Bobby Benson filled dancehalls with brass-driven Highlife while I.K. Dairo, Sir Victor Uwaifo, and Osita Osadebe electrified guitars and talking drums, paired with regal hand-woven Aso-Oke, towering Gele crowns, indigo Adire, and sharp post-colonial tailoring.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/z5nd1SjB7rA",
    },
    services: [
      ["Cardinal Rex Lawson", "Dr. Victor Olaiya", "Bobby Benson", "I.K. Dairo"],
      ["Sir Victor Uwaifo", "Stephen Osita Osadebe", "Fela & Koola Lobitos", "Orlando Owoh"],
      ["Hand-Woven Aso-Oke", "Abeokuta Indigo Adire", "Regal Agbada & Buba", "60s Mod Tailoring"],
    ],
    fashionImages: Array.from({ length: 20 }, (_, i) => `/era/1960/${i + 1}.jpg`),
  },
  {
    id: "1980",
    title: "Afrobeat Shrines, Jùjú & Power Silhouettes",
    description:
      "An era of sonic rebellion and maximalist style. Fela Anikulapo Kuti’s Afrika Shrine fused militant Afrobeat horns with bold embroidered stagewear, while King Sunny Adé, Chief Ebenezer Obey, Onyeka Onwenu, Christy Essien-Igbokwe, Sir Shina Peters, and William Onyeabor propelled synths, Afro-Jùjú, silk boubous, and disco-era glamour onto world stages.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/7h8R6PH0kzg",
    },
    services: [
      ["Fela Anikulapo Kuti", "King Sunny Adé", "Chief Ebenezer Obey", "Onyeka Onwenu"],
      ["Christy Essien-Igbokwe", "Sir Shina Peters", "Sikiru Ayinde Barrister", "William Onyeabor"],
      ["Kalakuta Stage Costumes", "Silk Boubou & George", "High-Waist Flare & Afro", "Statement Lace & Coral"],
    ],
    fashionImages: Array.from({ length: 21 }, (_, i) => `/era/1980/${i + 1}.jpg`),
  },
  {
    id: "1990",
    title: "Fuji, Street Reggae & Nollywood Glamour",
    description:
      "Street-level rhythm met screen-ready extravagance. Majek Fashek and Ras Kimono shook the nation with conscious roots reggae, K1 De Ultimate modernized Fuji, and Daddy Showkey, Lagbaja, Blackky, and The Remedies birthed Ajegunle Galala and Afro-hip-hop, shaping an era of masked mystique, baggy street denim, and classic Nollywood luxury.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/vveYFgRIutw",
    },
    services: [
      ["K1 De Ultimate (KWAM 1)", "Majek Fashek", "Ras Kimono", "Daddy Showkey"],
      ["Lagbaja & Blackky", "The Remedies", "Plantashun Boiz", "Junior & Pretty"],
      ["90s Nollywood Velvet", "Baggy Street Denim", "Brocade Senator Sets", "Masked Couture & Berets"],
    ],
    fashionImages: Array.from({ length: 26 }, (_, i) => `/era/1990/${i + 1}.jpg`),
  },
  {
    id: "2000s",
    title: "Afrobeats Dawn & Y2K Street Couture",
    description:
      "The digital explosion of contemporary Naija pop and fearless global swagger. 2Face Idibia, D’banj & Don Jazzy (Mo’ Hits), P-Square, Asa, Styl-Plus, 9ice, Wande Coal, and M.I Abaga rewired African music, ushering in Y2K Nollywood streetwear, contemporary Ankara runway couture, and the sonic foundation for Wizkid, Davido, and global Afrobeats.",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/fvhbCjpeKLY",
    },
    services: [
      ["2Face Idibia (2Baba)", "P-Square", "D’banj & Don Jazzy", "Asa & Styl-Plus"],
      ["9ice & Wande Coal", "M.I Abaga & Naeto C", "Sasha P & Timaya", "Wizkid & Davido Dawn"],
      ["Y2K Nollywood Streetwear", "Ankara Runway Couture", "Tinted Frames & Denim", "Lagos Fashion Vanguard"],
    ],
    fashionImages: Array.from({ length: 14 }, (_, i) => `/era/2000s/${i + 1}.jpg`),
  },
];

const Work = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

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
    }, containerRef);

    return () => ctx.revert();
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
  services: string[][];
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
    <div className="sticky top-0 left-0 bg-background min-h-screen lg:h-screen flex flex-col justify-start gap-4 md:gap-6 my-3 md:my-5 p-4 sm:p-6 lg:p-8 overflow-y-auto lg:overflow-hidden">
      {/* Top Content Row */}
      <div className="flex flex-col lg:flex-row justify-between gap-3 sm:gap-4 md:gap-6 lg:gap-10">
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
        <div className="lg:flex-[0.55] flex flex-col justify-start items-start gap-3 md:gap-4">
          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            {description}
          </p>

          {/* Video Placeholder + Era Details Side-by-Side on larger screens */}
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-6 lg:gap-8 mt-2 md:mt-4">
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
          </div>
        </div>
      </div>

      {/* Curved 3D Panoramic Fashion Motion (Three.js + GSAP) Under Each Era */}
      <div className="w-full mt-3 md:mt-4">
        <Panoramic3D images={fashionImages} />
      </div>
    </div>
  );
};