"use client";

import About from "./components/home/About";
import Features from "./components/home/Features";
import Navbar from "./components/Navbar";
import Cta from "./components/home/Cta";
import Footer from "./components/Footer";
import Testimonial from "./components/home/Testimonial";
import Hero from "./components/home/Hero";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Testimonial />
      <Cta />
      <Footer />
    </main>
  );
}
