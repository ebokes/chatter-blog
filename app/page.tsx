import React from "react";
import About from "./components/home/About";
import Features from "./components/home/Features";
import Navbar from "./components/Navbar";
import Cta from "./components/home/Cta";
import Footer from "./components/Footer";
import Testimonial from "./components/home/Testimonial";
import Hero from "./components/home/Hero";

const Home = () => {
  return (
    <main>
      <nav>
        <Navbar />
      </nav>
      <section>
        <Hero />
      </section>
      <section>
        <About />
      </section>
      <section>
        <Features />
      </section>
      <section>
        <Testimonial />
      </section>
      <section>
        <Cta />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
};

export default Home;
