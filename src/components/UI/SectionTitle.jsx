import React from "react";

const SectionTitle = ({ children, className = "" }) => {
  return (
    <h2
      className={`section-title scroll-reveal font-playfair text-5xl text-center mb-16 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
