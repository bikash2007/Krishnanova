import React, { useEffect } from "react";

// Hooks
import useScrollAnimation from "./hooks/useScrollAnimation";

// Utils
import { createParticle } from "./utils/animations";
import Navigation from "./components/Navigation/Navigation";
import Hero from "./components/Hero/Hero";
import Mission from "./components/Mission/Mission";
import Products from "./components/Products/Products";
import KrishnaNames from "./components/KrishnaNames/KrishnaNames";
import WisdomPortal from "./components/WisdomPortal/WisdomPortal";
import Community from "./components/Community/Community";
import Festival from "./components/Festival/Festival";
import Meditation from "./components/Meditation/Meditation";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import MusicPlayer from "./components/MusicPlayer";
import ScrollToHash from "./utils/ScrollToHash";
import {
  FeatherSVG,
  FluteSVG,
  LotusSVG,
  PeacockFeatherSVG,
} from "./components/UI/Svg";

const App = () => {
  useScrollAnimation();

  useEffect(() => {
    // Parallax scrolling effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxBg = document.querySelector(".parallax-bg");
      if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
      }

      // Energy flows follow scroll
      const energyFlows = document.querySelectorAll(".energy-flow");
      energyFlows.forEach((flow, index) => {
        flow.style.transform = `translateY(${
          scrolled * (0.2 + index * 0.1)
        }px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Create particles periodically
    const particleInterval = setInterval(createParticle, 2000);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <div className="app">
      <ScrollToHash />
      <MusicPlayer />
      <Navigation />

      {/* Add the correct IDs below 👇 */}
      <div id="home">
        <Hero />
      </div>
      <div className=" ">
        <div id="mission">
          <Mission />
        </div>

        <div id="products">
          <Products />
        </div>
      </div>

      <div id="krishna-names">
        <KrishnaNames />
      </div>

      <div
        id="wisdom"
        className="min-h-screen bg-gradient-to-br from-[#01abfd] via-[#a78bfa] to-[#60a5fa] relative py-12   overflow-hidden"
      >
        {/* 🎨 Decorative background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Animated radial glow */}
          <div className="absolute w-[40rem] h-[40rem] bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_80%)] rounded-full top-20 left-1/4 animate-slow-spin"></div>

          {/* Static radial glow */}
          <div className="absolute w-[25rem] h-[25rem] bg-[radial-gradient(circle,rgba(255,255,255,0.04),transparent_70%)] rounded-full bottom-10 right-1/4"></div>

          {/* Subtle grid */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.02)_75%,rgba(255,255,255,0.02))] bg-[length:50px_50px]"></div>

          {/* Animated SVG flute / feather */}
          <FluteSVG className="absolute w-40 md:w-56 opacity-10 top-20 left-10 animate-float-slow" />
          <FluteSVG className="absolute w-40 md:w-56 opacity-10 top-20 left-10 animate-float-slow" />
          <FeatherSVG className="absolute w-32 md:w-48 opacity-10 bottom-10 right-10 animate-float-slower" />
          <PeacockFeatherSVG className="absolute w-48 opacity-8 top-1/3 right-1/3 animate-float-slower" />

          <LotusSVG className="absolute w-32 opacity-8 bottom-20 left-1/4 animate-float-slow" />
          <LotusSVG className="absolute w-32 opacity-8 bottom-15 left-1/4 animate-float-slow" />
        </div>

        {/* 🌟 Main Content */}
        <div className="relative z-10 space-y-20">
          <LotusSVG className="absolute w-32 opacity-8 bottom-15 left-1/4 animate-float-slow" />
          <WisdomPortal />
          <div id="community">
            <PeacockFeatherSVG className="absolute w-48 opacity-8 top-1/3 right-1/3 animate-float-slower" />
            <Community />
          </div>
          <div id="festival">
            <LotusSVG className="absolute w-32 opacity-8 bottom-2 left-1/4 animate-float-slow" />
            <Festival />
          </div>
          <div className="relative" id="meditation">
            <FluteSVG className="absolute w-40 md:w-56 opacity-10 top-20 left-10 animate-float-slow" />
            <LotusSVG className="absolute w-32 opacity-8 bottom-2 left-1/4 animate-float-slow" />
            <Meditation />
          </div>
          <div id="contact">
            <Contact />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
