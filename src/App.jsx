import React, { useEffect } from "react";

// Hooks
import useScrollAnimation from "./hooks/useScrollAnimation";

// Utils
import Navigation from "./components/Navigation/Navigation";
import Hero from "./components/Hero/Hero";
import Mission from "./components/Mission/Mission";
import Products from "./components/Products/Products";
import KrishnaNames from "./components/KrishnaNames/KrishnaNames";
import Community from "./components/Community/Community";
import Festival from "./components/Festival/Festival";
import Meditation from "./components/Meditation/Meditation";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import MusicPlayer from "./components/MusicPlayer";
import ScrollToHash from "./utils/ScrollToHash";
import { useLocation } from "react-router-dom";
import WisdomPortalPath from "./components/WisdomPortal/WisdomPortalPath";
import FloatingKrishna from "./components/FloatingKrishna";

const App = () => {
  useScrollAnimation();

  const location = useLocation();

  // Handle scrolling after navigation from other routes
  useEffect(() => {
    if (location.state?.scrollToId) {
      const targetId = location.state.scrollToId;

      // Small delay to ensure the page has fully rendered
      const timer = setTimeout(() => {
        const section = document.getElementById(targetId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        // Optional: Clear the state to prevent re-scrolling on page refresh
        window.history.replaceState({}, document.title);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="app">
      <ScrollToHash />
      <MusicPlayer />
      <Navigation />
      <FloatingKrishna />

      {/* Hero Section */}
      <div id="home">
        <Hero />
      </div>

      {/* Main Content */}
      <div className="bg-white">
        <div id="products" className="py-12">
          <Products />
        </div>

        <div id="mission" className="py-12 bg-gray-50">
          <Mission />
        </div>

        <div id="krishna-names" className="py-12">
          <KrishnaNames />
        </div>

        <div id="wisdom" className="py-12 bg-gray-50">
          <WisdomPortalPath />
        </div>

        <div id="community" className="py-12">
          <Community />
        </div>

        <div id="festival" className="py-12 bg-gray-50">
          <Festival />
        </div>

        <div id="meditation" className="py-12">
          <Meditation />
        </div>

        <div id="contact" className="py-12 bg-gray-50">
          <Contact />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;
