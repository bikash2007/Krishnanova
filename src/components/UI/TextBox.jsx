import React, { useEffect, useRef } from "react";

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

  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    card.addEventListener("mousemove", handleMouseMove);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`text-3d-box font-semibold backdrop-blur-xl ${variants[variant]} ${scrollAnimation} ${baseClasses} ${className}`}
      style={{
        background: `radial-gradient(
          960px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
          rgba(59, 248, 251, 0.3),
          transparent 40%
        )`,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default TextBox;
