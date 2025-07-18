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
      <MusicPlayer />
      <Navigation />
      <Hero />
      <Mission />
      <Products />
      <KrishnaNames />
      <WisdomPortal />
      <Community />
      <Festival />
      <Meditation />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
