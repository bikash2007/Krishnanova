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
    "inline-block font-bold transition-all duration-300 hover:-translate-y-1 hover:scale-105 shadow-xl relative overflow-hidden";

  const variants = {
    primary: `
      bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-600 
      text-white 
      rounded-full 
      border-2 border-transparent 
      hover:shadow-[0_0_25px_#8a2be2] 
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:rounded-full before:blur-sm
    `,
    secondary: `
      bg-gradient-to-r from-cyan-400 to-blue-500 
      text-white 
      rounded-full 
      border-2 border-cyan-300 
      hover:shadow-[0_0_20px_#00bfff]
    `,
  };

  const sizes = {
    small: "px-6 py-3 text-sm",
    medium: "px-10 py-5 text-lg",
    large: "px-12 py-6 text-xl",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
