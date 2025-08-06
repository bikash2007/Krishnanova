import React from "react";
import { Heart, Star } from "lucide-react";
import TextBox from "../UI/TextBox";

const NameCard = ({ name, meaning, bgColor }) => {
  return (
    <div
      className={`name-card backdrop-blur-lg scroll-reveal gradient-wave-box p-8 rounded-2xl text-center transition-all duration-300 relative hover:-translate-y-1 hover:scale-105 ${
        bgColor === "pink" ? "bg-blue-50 border-2 border-blue-200" : "bg-indigo-50 border-2 border-indigo-200"
      } shadow-lg hover:shadow-xl`}
    >
      <div className="flex items-center justify-center mb-4">
        {bgColor === "pink" ? 
          <Heart className="text-blue-500 mr-2" size={20} /> : 
          <Star className="text-indigo-500 mr-2" size={20} />
        }
        <h3 className="name-title font-playfair text-2xl text-slate-800 font-bold">
          {name}
        </h3>
        {bgColor === "pink" ? 
          <Heart className="text-blue-500 ml-2" size={20} /> : 
          <Star className="text-indigo-500 ml-2" size={20} />
        }
      </div>
      <p className="name-meaning text-slate-600 italic leading-relaxed">{meaning}</p>
    </div>
  );
};

export default NameCard;
