import React, { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const Mission = () => {
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // **Minimal Dark Blue Color Palette**
  const colors = {
    primary: "#1e40af", // Royal Blue
    secondary: "#2563eb", // Bright Blue
    accent: "#3b82f6", // Light Blue
    dark: "#1e3a8a", // Dark Blue
    neutral: "#64748b", // Slate Gray
    light: "#f8fafc", // Almost White
    white: "#ffffff",
    success: "#10b981", // Green accent
  };

  // **Optimized mouse tracking**
  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  // **Floating Sacred Elements**
  const floatingElements = [
    // Sanskrit Om symbols
    { icon: "ॐ", size: "text-4xl", x: "10%", y: "15%", duration: 20, delay: 0 },
    { icon: "ॐ", size: "text-2xl", x: "85%", y: "25%", duration: 25, delay: 5 },
    {
      icon: "ॐ",
      size: "text-3xl",
      x: "20%",
      y: "70%",
      duration: 22,
      delay: 10,
    },

    // Lotus symbols
    { icon: "🪷", size: "text-3xl", x: "75%", y: "60%", duration: 18, delay: 2 },
    { icon: "🪷", size: "text-2xl", x: "15%", y: "40%", duration: 24, delay: 8 },
    { icon: "🪷", size: "text-xl", x: "90%", y: "80%", duration: 20, delay: 12 },

    // Peacock feathers
    {
      icon: "🪶",
      size: "text-2xl",
      x: "65%",
      y: "20%",
      duration: 26,
      delay: 4,
    },
    {
      icon: "🪶",
      size: "text-xl",
      x: "30%",
      y: "85%",
      duration: 19,
      delay: 15,
    },

    // Flutes
    { icon: "🪈", size: "text-xl", x: "80%", y: "45%", duration: 23, delay: 6 },
    {
      icon: "🪈",
      size: "text-2xl",
      x: "25%",
      y: "25%",
      duration: 21,
      delay: 11,
    },

    // Sacred geometry (using Unicode symbols)
    { icon: "◇", size: "text-lg", x: "45%", y: "15%", duration: 28, delay: 3 },
    { icon: "◆", size: "text-xl", x: "55%", y: "75%", duration: 17, delay: 9 },
    { icon: "○", size: "text-2xl", x: "5%", y: "55%", duration: 24, delay: 7 },
    { icon: "◯", size: "text-lg", x: "95%", y: "35%", duration: 22, delay: 13 },

    // Additional sacred symbols
    { icon: "✦", size: "text-xl", x: "40%", y: "90%", duration: 25, delay: 1 },
    { icon: "✧", size: "text-lg", x: "70%", y: "10%", duration: 20, delay: 14 },
    { icon: "※", size: "text-xl", x: "35%", y: "60%", duration: 23, delay: 16 },
    { icon: "⟐", size: "text-lg", x: "85%", y: "70%", duration: 27, delay: 18 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-transparent"
      onMouseMove={handleMouseMove}
    >
      {/* **Enhanced Background with Floating Elements** */}
      <div className="absolute inset-0">
        {/* Base gradient backgrounds */}
        <div className="absolute inset-0 opacity-3">
          <div
            className="absolute top-20 left-20 w-96 h-96 rounded-full"
            style={{
              background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute bottom-20 right-20 w-80 h-80 rounded-full"
            style={{
              background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)`,
              filter: "blur(80px)",
            }}
          />
        </div>

        {/* **Floating Sacred Elements** */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.size} pointer-events-none select-none`}
            style={{
              left: element.x,
              top: element.y,
              color: colors.primary,
              opacity: 0.08,
              filter: "blur(0.5px)",
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 360],
              opacity: [0.05, 0.12, 0.05],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {element.icon}
          </motion.div>
        ))}

        {/* **Additional Geometric Patterns** */}
        <div className="absolute inset-0 opacity-4">
          {/* Sacred geometry lines */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="w-full h-full border rounded-full"
              style={{
                borderColor: colors.accent,
                borderWidth: "1px",
                borderStyle: "dashed",
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border rounded-full"
              style={{
                borderColor: colors.secondary,
                borderWidth: "1px",
              }}
            />
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-24 h-24"
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="w-full h-full"
              style={{
                borderLeft: `1px solid ${colors.primary}`,
                borderTop: `1px solid ${colors.primary}`,
                transform: "rotate(45deg)",
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12"
              style={{
                borderRight: `1px solid ${colors.accent}`,
                borderBottom: `1px solid ${colors.accent}`,
                transform: "rotate(45deg)",
              }}
            />
          </motion.div>
        </div>

        {/* **Mandala-inspired Elements** */}
        <div className="absolute inset-0 opacity-6">
          <motion.div
            className="absolute top-10 right-10 w-20 h-20"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative w-full h-full">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-8 rounded-full"
                  style={{
                    backgroundColor: colors.primary,
                    left: "50%",
                    top: "50%",
                    transformOrigin: "50% 100%",
                    transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                  }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-10 w-16 h-16"
            animate={{
              rotate: [360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative w-full h-full">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-6 rounded-full"
                  style={{
                    backgroundColor: colors.secondary,
                    left: "50%",
                    top: "50%",
                    transformOrigin: "50% 100%",
                    transform: `translate(-50%, -100%) rotate(${i * 60}deg)`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* **Particle-like Sacred Dots** */}
        {[...Array(15)].map((_, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: colors.accent,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
              opacity: [0.05, 0.15, 0.05],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* **Enhanced Mouse Interaction** */}
      <div
        className="absolute inset-0 pointer-events-none opacity-8"
        style={{
          background: `radial-gradient(400px circle at ${
            mousePosition.x * 100
          }% ${mousePosition.y * 100}%, 
            ${colors.primary}12 0%, 
            ${colors.secondary}08 40%, 
            ${colors.accent}04 70%, 
            transparent 80%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* **Clean Header** */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6 border bg-white/90 backdrop-blur-sm shadow-sm"
            style={{
              borderColor: colors.primary,
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.primary }}
            >
              <span className="text-white text-sm font-bold">॥</span>
            </div>
            <span className="font-semibold" style={{ color: colors.dark }}>
              OUR MISSION
            </span>
          </div>

          {/* **Clean Title** */}
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{ color: colors.dark }}
          >
            Our Sacred Mission
          </motion.h2>

          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: colors.primary }}
          />
        </motion.div>

        {/* **Clean Mission Statement** */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="max-w-5xl mx-auto">
            <div
              className="rounded-3xl p-12 md:p-16 border shadow-lg bg-white/95 backdrop-blur-sm"
              style={{
                borderColor: colors.light,
              }}
            >
              <p
                className="text-2xl md:text-3xl leading-relaxed text-center"
                style={{ color: colors.neutral }}
              >
                We bridge{" "}
                <span className="font-bold" style={{ color: colors.primary }}>
                  ancient Krishna wisdom
                </span>{" "}
                with modern technology, creating a global spiritual ecosystem
                through blessed keychains and sacred offerings that{" "}
                <span className="font-bold" style={{ color: colors.secondary }}>
                  connect souls worldwide
                </span>
                .
              </p>
            </div>
          </div>
        </motion.div>

        {/* **Clean Three Pillars** */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Sacred Connection",
              description:
                "Transform everyday moments into spiritual experiences through our blessed Krishna keychains that carry divine energy.",
              icon: "🕉️",
              color: colors.primary,
            },
            {
              title: "Global Unity",
              description:
                "Unite devotees across continents through shared Krishna consciousness, creating bonds that transcend boundaries.",
              icon: "🌍",
              color: colors.secondary,
            },
            {
              title: "Timeless Wisdom",
              description:
                "Preserve and share Krishna's profound teachings through authentic spiritual products crafted with devotion.",
              icon: "📿",
              color: colors.accent,
            },
          ].map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: `0 10px 30px ${colors.primary}20`,
                transition: { duration: 0.2 },
              }}
              className="group"
            >
              <div
                className="rounded-2xl p-8 border shadow-sm h-full transition-all duration-300 bg-white/95 backdrop-blur-sm"
                style={{
                  borderColor: colors.light,
                }}
              >
                <div className="text-5xl mb-6 text-center">{pillar.icon}</div>

                <h3
                  className="text-xl font-bold mb-4 text-center"
                  style={{ color: colors.dark }}
                >
                  {pillar.title}
                </h3>

                <p
                  className="leading-relaxed text-center"
                  style={{ color: colors.neutral }}
                >
                  {pillar.description}
                </p>

                <div
                  className="w-0 group-hover:w-12 h-1 rounded-full mx-auto mt-4 transition-all duration-300"
                  style={{ backgroundColor: pillar.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* **Clean Values Section** */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <div
            className="rounded-3xl p-12 border shadow-lg bg-white/95 backdrop-blur-sm"
            style={{
              borderColor: colors.light,
            }}
          >
            <h3
              className="text-3xl font-bold text-center mb-8"
              style={{ color: colors.dark }}
            >
              Our Core Values
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Authenticity",
                  desc: "Every product carries genuine spiritual energy",
                  emoji: "✨",
                  color: colors.primary,
                },
                {
                  title: "Community",
                  desc: "Building bridges between devotees worldwide",
                  emoji: "🤝",
                  color: colors.secondary,
                },
                {
                  title: "Innovation",
                  desc: "Merging ancient wisdom with modern technology",
                  emoji: "🚀",
                  color: colors.accent,
                },
                {
                  title: "Devotion",
                  desc: "Deepening spiritual practice through mindful experiences",
                  emoji: "🙏",
                  color: colors.success,
                },
              ].map((value, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${value.color}15` }}
                  >
                    <span className="text-xl">{value.emoji}</span>
                  </div>
                  <div>
                    <h4
                      className="text-lg font-semibold mb-1"
                      style={{ color: colors.dark }}
                    >
                      {value.title}
                    </h4>
                    <p style={{ color: colors.neutral }}>{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* **Clean CTA Button** */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <Link to="/productpage" className="group relative inline-block">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: `0 10px 30px ${colors.primary}30`,
              }}
              whileTap={{ scale: 0.95 }}
              className="relative font-bold py-5 px-12 rounded-xl shadow-lg transition-all duration-300 border-2 text-white overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                borderColor: colors.primary,
              }}
            >
              {/* Clean shimmer effect */}
              <span className="pointer-events-none absolute inset-0 -translate-x-[120%] skew-x-[-20deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent)] animate-shimmer" />

              <span className="relative z-10 flex items-center gap-3">
                <span>🛒 Start Your Sacred Journey</span>
                <motion.span
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-xl"
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </Link>

          <p className="mt-4" style={{ color: colors.neutral }}>
            Join thousands of devotees worldwide
          </p>
        </motion.div>
      </div>

      {/* **Add shimmer animation** */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-120%) skewX(-20deg);
          }
          100% {
            transform: translateX(120%) skewX(-20deg);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Mission;
