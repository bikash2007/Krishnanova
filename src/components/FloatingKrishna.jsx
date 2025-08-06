import React, { useState, useEffect, useRef } from "react";
import kpng from "../Media/krishna.png";
import laugh from "../Audio/laugh.mp3";
import { Sparkles, X, Heart } from "lucide-react";

const lessons = [
  "Do your duty, but don't concern yourself with the results.",
  "Calmness, gentleness, silence, self-restraint — these are virtues.",
  "Change is the law of the universe.",
  "A person is made by their faith.",
  "You are what you believe in.",
  "Be fearless and pure.",
  "You came empty handed, you will leave empty handed.",
];

const teases = [
  "Too slow!",
  "You thought you had me?",
  "Try harder, mortal!",
  "Missed again!",
  "Catch me if you can!",
  "Not today!",
];

const LuckyKrishna = () => {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [message, setMessage] = useState(null);
  const [tease, setTease] = useState("Catch Me If You Can");
  const audioRef = useRef(null);

  const moveKrishna = () => {
    setPosition({
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
    });
  };

  useEffect(() => {
    const interval = setInterval(moveKrishna, 3000);
    return () => clearInterval(interval);
  }, []);

  const playAudio = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error("Audio play failed", err);
      });
    }
  };

  const handleHover = () => {
    playAudio();

    if (Math.random() < 0.02) {
      const randomLesson = lessons[Math.floor(Math.random() * lessons.length)];
      setMessage(
        Math.random() < 0.5
          ? "You're lucky today!"
          : `Krishna says: "${randomLesson}"`
      );
      setTease("How did you catch me?!");
    } else {
      setTease(teases[Math.floor(Math.random() * teases.length)]);
      moveKrishna();
    }
  };

  const closeMessage = () => {
    setMessage(null);
    setTease("Catch Me If You Can");
  };

  return (
    <div>
      {/* Audio */}
      <audio ref={audioRef} src={laugh} />

      {/* Krishna */}
      <div
        onMouseEnter={handleHover}
        className="fixed transition-all duration-300 cursor-pointer z-50 text-center group"
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        <div className="relative">
          <img 
            src={kpng} 
            alt="Lord Krishna" 
            className="w-16 h-16 object-contain mx-auto drop-shadow-lg group-hover:scale-110 transition-transform duration-200" 
          />
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
          </div>
        </div>
        <div className="text-sm font-medium text-gray-700 mt-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          {tease}
        </div>
      </div>

      {/* Popup */}
      {message && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-red-500" />
              <span className="text-lg font-semibold text-gray-900">Divine Message</span>
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">{message}</p>
            
            <button 
              onClick={closeMessage}
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <X className="w-4 h-4" />
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LuckyKrishna;
