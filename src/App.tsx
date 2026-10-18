import React from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <main className="overflow-x-clip min-h-screen">
      <Loader />
      <Hero />
      <About />
      <Work />
      <Testimonials />
      <Footer />
    </main>
  );
}
