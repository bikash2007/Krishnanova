import React from "react";
import Button from "../UI/Button";
import { handleSmoothScroll } from "../../utils/animations";
import FloatingKrishna from "../FloatingKrishna";

const Hero = () => {
  return (
    <section
      id="home"
      className="hero min-h-screen flex items-center justify-center text-center relative overflow-hidden"
    >
      <FloatingKrishna />
      <div className="w-full h-screen bg-black/50 top-0 left-0 absolute"></div>
      <div className="parallax-bg absolute top-0 left-0 w-full h-full opacity-30"></div>

      {/* Particles */}
      <div className="particles absolute w-full h-full overflow-hidden">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-yellow-400 rounded-full opacity-70"
            style={{
              left: `${(i + 1) * 10}%`,
              animationDelay: `${-i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Pendulum */}
      <div className="pendulum-container absolute top-12 left-1/2 transform -translate-x-1/2 w-15 h-15">
        <div className="pendulum w-15 h-15 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 relative flex items-center justify-center shadow-lg shadow-yellow-400/50">
          <div
            className="absolute w-8 h-10 bg-white transform rotate-180"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)" }}
          ></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="hero-content max-w-4xl z-10 text-gray-100 ">
        <h1 className="floating-text  text-6xl md:text-7xl font-bold mb-5  shadow-md shadow-[#ffd700] ">
          Welcome to{" "}
          <span className="font-playfair  font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
            Krishnova
          </span>
        </h1>
        <p className="floating-text text-2xl mb-10 text-white ">
          A Journey of faith, where all things bloosom
        </p>
        <Button
          onClick={(e) => handleSmoothScroll(e, "#products")}
          className="floating-button"
        >
          Begin Your Sacred Journey
        </Button>
      </div>

      {/* Energy Flows */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="energy-flow absolute w-0.5 h-24 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
          style={{
            left: `${(i + 1) * 20}%`,
            animationDelay: `${-i * 2}s`,
          }}
        />
      ))}
    </section>
  );
};

export default Hero;
