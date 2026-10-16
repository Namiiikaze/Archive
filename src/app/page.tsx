import About from "@/components/About";
import Achivements from "@/components/Achivements";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import Testimonials from "@/components/Testimonials";
import Work from "@/components/Work";

import Image from "next/image";

export default function Home() {
  return (
    <main className="overflow-x-clip min-h-screen">
      <Loader />
      <Hero />
      <About />
      <Achivements />
      <Work />
      <Testimonials />
      <Footer />
    </main>
  );
}
