import React, { useState, useEffect, useRef } from "react";

const lessons = [
  "Do your duty, but don’t concern yourself with the results.",
  "Calmness, gentleness, silence, self-restraint — these are virtues.",
  "Change is the law of the universe.",
  "A person is made by their faith.",
  "You are what you believe in.",
  "Be fearless and pure.",
  "You came empty handed, you will leave empty handed.",
];

const teases = [
  "😏 Too slow!",
  "🌀 You thought you had me?",
  "😂 Try harder, mortal!",
  "🚀 Missed again!",
  "🪷 Catch me if you can!",
  "😎 Not today!",
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
    const interval = setInterval(moveKrishna, 2000);
    return () => clearInterval(interval);
  }, []);

  const playAudio = () => {
    if (!audioRef.current) return;

    // only play if not already playing
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
          ? "✨ You’re lucky today! ✨"
          : `🪷 Krishna says: “${randomLesson}”`
      );
      setTease("😮 How did you catch me?!");
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
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}/laugh.mp3`} />

      {/* Krishna */}
      <div
        onMouseEnter={handleHover}
        className="fixed transition-all duration-300 cursor-pointer z-50 text-center"
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}/krishna.png`}
          alt="Lord Krishna"
          className="w-24 mx-auto"
        />
        <div className="text-white font-bold mt-1 drop-shadow-lg animate-pulse">
          {tease}
        </div>
      </div>

      {/* Popup */}
      {message && (
        <div
          onClick={closeMessage}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          bg-gradient-to-br from-yellow-50 to-white shadow-2xl p-6 rounded-xl z-50 max-w-sm text-center animate-bounce space-y-4 border-4 border-yellow-300"
        >
          <div className="text-3xl text-yellow-600">🪷</div>
          <p className="text-lg font-medium text-gray-800">{message}</p>
          <button className="mt-2 bg-yellow-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-yellow-500 transition">
            🙏 Close
          </button>
        </div>
      )}
    </div>
  );
};

export default LuckyKrishna;
