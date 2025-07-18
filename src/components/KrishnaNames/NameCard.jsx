import React from "react";
import TextBox from "../UI/TextBox";

const NameCard = ({ name, meaning, bgColor }) => {
  return (
    <div
      className={`name-card backdrop-blur-lg scroll-reveal gradient-wave-box p-8 rounded-2xl text-center transition-all duration-300 relative hover:-translate-y-1 hover:scale-105 ${
        bgColor === "pink" ? "bg-pink-500/10" : "bg-cyan-400/10"
      }`}
    >
      <h3 className="name-title font-playfair text-2xl text-yellow-400 mb-4">
        {name}
      </h3>
      <p className="name-meaning text-gray-100 italic">{meaning}</p>
    </div>
  );
};

export default NameCard;
