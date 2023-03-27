import React from "react";
import About from "../components/About";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Testi from "../components/Testi";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
function Home() {
  useEffect(() => {
    Aos.init({ duration: 2000, once: true });
  }, []);
  let props = {
    navigation: [
      { name: "Features", href: "#Features" },
      { name: "Testimonials", href: "#Testi" },
      { name: "About", href: "#About" },
    ],
    btn: "Get Started",
    btnurl: "/login",
  };
  return (
    <div>
      <Navbar {...props} />
      <Hero />
      <Features />
      <Testi />
      <About />
      <Footer />
    </div>
  );
}

export default Home;
