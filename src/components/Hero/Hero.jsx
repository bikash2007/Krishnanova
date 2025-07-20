import React, { useRef } from "react";
import Button from "../UI/Button";
import { handleSmoothScroll } from "../../utils/animations";
import FloatingKrishna from "../FloatingKrishna";
import overlay from "../../Media/overlay.mp4";
import bell from "../../Media/bell.png";
import bellSound from "../../Audio/bell.mp3";

const Hero = () => {
  const audioRef = useRef(null);

  const handleBellClick = () => {
    const bell = document.querySelector(".pendulum");
    bell.classList.add("swing");

    // Play sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    // Remove animation after it ends
    setTimeout(() => {
      bell.classList.remove("swing");
    }, 2000);
  };

  return (
    <section
      id="home"
      className="hero min-h-screen flex items-center justify-center text-center relative overflow-hidden"
    >
      {/* bell */}
      <div className="pendulum-container absolute top-16 left-1/2 transform -translate-x-1/2 w-20 h-20 z-10">
        <div className="pendulum w-20 h-20 rounded-full bg-gradient-to-br  relative flex items-center justify-center shadow-lg shadow-yellow-400/50">
          <img
            src={bell}
            onClick={handleBellClick}
            className="bell w-20  cursor-pointer"
            alt="bell"
          />
        </div>
        <audio ref={audioRef} src={bellSound} />
      </div>
      <video
        src={overlay}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover "
      ></video>

      <FloatingKrishna />
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
      <div className="particles absolute w-full h-full overflow-hidden">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-red-400 rounded-full opacity-70"
            style={{
              left: `${(i + 1) * 10}%`,
              animationDelay: `${-i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="hero-content max-w-4xl z-10 text-gray-100 ">
        <h1 className="   text-6xl md:text-7xl font-bold mb-5   ">
          Welcome to{" "}
          <span className="font-playfair  font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent z-10">
            Krishnova
          </span>
        </h1>
        <p className=" text-2xl mb-10 text-white font font-semibold">
          A Journey of faith, where all things bloosom
        </p>
        <Button
          onClick={(e) => handleSmoothScroll(e, "#products")}
          className=""
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
