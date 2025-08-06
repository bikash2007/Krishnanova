import React, { useRef } from "react";
import Button from "../UI/Button";
import { handleSmoothScroll } from "../../utils/animations";
import { Bell, Sparkles } from "lucide-react";
import bell from "../../Media/bell.png";
import bellSound from "../../Audio/bell.mp3";
import overlay from "../../Media/overlay.mp4";

const Hero = () => {
  const audioRef = useRef(null);

  const handleBellClick = () => {
    // Play sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    // Add swing animation to the bell
    const bellElement = document.querySelector(".bell-container");
    if (bellElement) {
      bellElement.classList.add("swing");
      setTimeout(() => {
        bellElement.classList.remove("swing");
      }, 2000);
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center text-center relative overflow-hidden"
    >
      {/* Background Video */}
      <video
        src={overlay}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-indigo-900/40"></div>

      {/* Bell Icon with Sound */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10">
        <div 
          className="bell-container w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg cursor-pointer hover:bg-white/30 transition-all duration-300 border border-white/30 divine-glow"
          onClick={handleBellClick}
        >
          <img
            src={bell}
            alt="bell"
            className="w-10 h-10 object-contain"
          />
        </div>
        <audio ref={audioRef} src={bellSound} />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 z-10 relative">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-yellow-300 divine-sparkle" />
          <span className="text-yellow-300 font-medium">Welcome to</span>
          <Sparkles className="w-6 h-6 text-yellow-300 divine-sparkle" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg peaceful-breath">
          Krishnova
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-100 mb-10 max-w-2xl mx-auto drop-shadow-md">
          A journey of faith, where all things blossom
        </p>
        
        <Button
          onClick={(e) => handleSmoothScroll(e, "#products")}
          variant="primary"
          size="lg"
          className="shadow-lg hover:shadow-xl divine-hover"
        >
          Begin Your Sacred Journey
        </Button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 opacity-30 gentle-float">
        <div className="w-32 h-32 border-2 border-yellow-300 rounded-full"></div>
      </div>
      
      <div className="absolute top-20 right-10 opacity-30 gentle-float" style={{ animationDelay: '1s' }}>
        <div className="w-24 h-24 border-2 border-yellow-300 rounded-full"></div>
      </div>

      {/* Additional subtle decorative elements */}
      <div className="absolute top-1/3 left-1/4 opacity-20 gentle-float" style={{ animationDelay: '2s' }}>
        <div className="w-16 h-16 border border-yellow-300 rounded-full"></div>
      </div>
      
      <div className="absolute bottom-1/3 right-1/4 opacity-20 gentle-float" style={{ animationDelay: '3s' }}>
        <div className="w-12 h-12 border border-yellow-300 rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
