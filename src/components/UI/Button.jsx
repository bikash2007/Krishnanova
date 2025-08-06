import React from "react";
import { motion } from "framer-motion";

const Button = ({ 
  children, 
  onClick, 
  className = "", 
  variant = "default",
  size = "md",
  disabled = false,
  type = "button",
  ...props 
}) => {
  const baseClasses = "btn";
  const variantClasses = {
    default: "btn",
    primary: "btn-primary",
    secondary: "btn-secondary",
    destructive: "btn-destructive",
    ghost: "btn-ghost",
    outline: "btn-outline"
  };
  const sizeClasses = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg"
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(" ");

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
