// NameCard.jsx - Minimal Design
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const NameCard = ({ name, meaning, bgColor, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Minimal color palette
  const colors = useMemo(
    () => ({
      primary: "#1e40af", // Royal Blue
      secondary: "#2563eb", // Bright Blue
      accent: "#3b82f6", // Light Blue
      dark: "#1e3a8a", // Dark Blue
      neutral: "#64748b", // Slate Gray
      light: "#f8fafc", // Almost White
      white: "#ffffff",
    }),
    []
  );

  // Clean card styles based on type
  const cardStyles = useMemo(() => {
    const baseStyle = {
      background: colors.white,
      borderColor: colors.light,
      textColor: colors.neutral,
    };

    if (bgColor === "teal") {
      return {
        ...baseStyle,
        accentColor: colors.primary,
        shadowColor: `${colors.primary}20`,
      };
    } else {
      return {
        ...baseStyle,
        accentColor: colors.secondary,
        shadowColor: `${colors.secondary}20`,
      };
    }
  }, [bgColor, colors]);

  // Clean animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
        duration: 0.6,
      },
    },
  };

  const hoverVariants = {
    scale: 1.03,
    y: -8,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  };

  return (
    <motion.div
      className="relative group cursor-pointer"
      variants={cardVariants}
      whileHover={hoverVariants}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Clean card container */}
      <div
        className="relative rounded-2xl p-8 text-center transition-all duration-300 border-2"
        style={{
          background: cardStyles.background,
          borderColor: isHovered
            ? cardStyles.accentColor
            : cardStyles.borderColor,
          boxShadow: isHovered
            ? `0 15px 35px ${cardStyles.shadowColor}, 0 5px 15px rgba(0,0,0,0.1)`
            : `0 4px 15px ${cardStyles.shadowColor}`,
        }}
      >
        {/* Clean accent line */}
        <motion.div
          className="w-12 h-1 mx-auto mb-6 rounded-full"
          style={{ backgroundColor: cardStyles.accentColor }}
          animate={isHovered ? { width: 48 } : { width: 32 }}
          transition={{ duration: 0.3 }}
        />

        {/* Clean name title */}
        <motion.h3
          className="font-bold text-2xl mb-4"
          style={{ color: cardStyles.accentColor }}
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {name}
        </motion.h3>

        {/* Clean meaning text */}
        <motion.p
          className="italic leading-relaxed text-base"
          style={{ color: cardStyles.textColor }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {meaning}
        </motion.p>

        {/* Clean corner accent */}
        <div
          className="absolute top-4 right-4 w-3 h-3 rounded-full transition-opacity duration-300"
          style={{
            backgroundColor: cardStyles.accentColor,
            opacity: isHovered ? 0.6 : 0.3,
          }}
        />
      </div>
    </motion.div>
  );
};

export default NameCard;
