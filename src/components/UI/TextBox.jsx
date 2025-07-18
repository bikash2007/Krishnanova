import React from "react";

const TextBox = ({
  children,
  variant = "default",
  className = "",
  scrollAnimation = "",
  ...props
}) => {
  const baseClasses =
    "bg-gray-100/5 border-2 border-yellow-400/30 rounded-2xl p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden";

  const variants = {
    default: "gradient-wave-box",
    cosmicOcean: "gradient-wave-box cosmic-ocean",
    sacredFire: "gradient-wave-box sacred-fire",
    mysticalAurora: "gradient-wave-box mystical-aurora",
    krishnaBreath: "gradient-wave-box krishna-breath",
  };

  return (
    <div
      className={`text-3d-box ${variants[variant]} ${scrollAnimation} ${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default TextBox;
