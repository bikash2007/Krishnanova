import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-block font-semibold transition-all duration-300 hover:-translate-y-1 hover:scale-105 shadow-lg";

  const variants = {
    primary:
      "bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-full border-2 border-transparent hover:border-cyan-400 hover:shadow-xl hover:shadow-pink-500/50",
    secondary:
      "bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full",
  };

  const sizes = {
    small: "px-6 py-3 text-sm",
    medium: "px-10 py-5 text-xl",
    large: "px-12 py-6 text-2xl",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
