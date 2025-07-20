import React from "react";

const Button = ({
  children,
  onClick,
  variant = "krishna",
  size = "medium",
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-block font-semibold transition-all duration-300 hover:-translate-y-[1px] hover:scale-[1.03] shadow-md relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-offset-2 rounded-full";

  const variants = {
    krishna: `
      text-white
      bg-gradient-to-r from-[#01abfd] via-[#2e8b57] to-[#01abfd]
      hover:shadow-[0_0_20px_#01abfd99]
      border-none
      before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)] before:opacity-0 hover:before:opacity-100 before:transition
    `,
    secondary: `
      text-[#2e8b57]
      bg-white
      border border-[#01abfd88]
      hover:bg-[#f0fbff]
      hover:shadow-[0_0_10px_#01abfd66]
    `,
    gold: `
      text-[#2e2e2e]
      bg-gradient-to-r from-[#f5d26c] to-[#f7e8a4]
      hover:shadow-[0_0_20px_#f5d26c88]
      text-sm
    `,
  };

  const sizes = {
    small: "px-5 py-2 text-sm",
    medium: "px-8 py-3 text-base",
    large: "px-10 py-4 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} backdrop-blur-sm`}
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
