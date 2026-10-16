import React from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Achivements from "@/components/Achivements";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function App() {
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

