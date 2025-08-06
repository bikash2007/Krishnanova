import React from "react";
import { motion } from "framer-motion";

const SectionTitle = ({ 
  children, 
  className = "", 
  variant = "default",
  size = "lg",
  ...props 
}) => {
  const baseClasses = "font-semibold tracking-tight";
  
  const variantClasses = {
    default: "text-foreground",
    muted: "text-muted-foreground",
    primary: "text-primary"
  };
  
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
    "2xl": "text-4xl"
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(" ");

  return (
    <motion.h2
      className={classes}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      {...props}
    >
      {children}
    </motion.h2>
  );
};

export default SectionTitle;
