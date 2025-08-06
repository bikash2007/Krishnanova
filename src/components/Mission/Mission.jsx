import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// **Professional Sacred Icons Component**
const SacredIcon = ({ type, className = "" }) => {
  const icons = {
    om: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12.75 2.25c-4.5 0-8.25 3.75-8.25 8.25 0 2.25.75 4.25 2 5.75l-1.5 1.5c-.25.25-.25.75 0 1l1 1c.25.25.75.25 1 0l1.5-1.5c1.5 1.25 3.5 2 5.75 2 4.5 0 8.25-3.75 8.25-8.25S17.25 2.25 12.75 2.25zm0 14.5c-3.5 0-6.25-2.75-6.25-6.25s2.75-6.25 6.25-6.25 6.25 2.75 6.25 6.25-2.75 6.25-6.25 6.25z" />
        <circle cx="12.75" cy="10.75" r="2" />
        <path d="M8.5 14.5c.5 1 1.5 1.75 2.75 2v-1.5c-.75-.25-1.25-.75-1.5-1.5h-1.25z" />
        <path d="M16 14.5h-1.25c-.25.75-.75 1.25-1.5 1.5v1.5c1.25-.25 2.25-1 2.75-2z" />
      </svg>
    ),
    lotus: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12 2c-1.5 3-3 4.5-4.5 6C6 9.5 5 11 5 13c0 3.5 3 6.5 7 6.5s7-3 7-6.5c0-2-1-3.5-2.5-5C15 6.5 13.5 5 12 2z" />
        <path
          d="M12 4c-1 2-2 3-3 4-1.5 1.5-2 2.5-2 4 0 2.5 2 4.5 5 4.5s5-2 5-4.5c0-1.5-.5-2.5-2-4-1-1-2-2-3-4z"
          opacity="0.7"
        />
        <ellipse cx="12" cy="12" rx="3" ry="2" opacity="0.5" />
      </svg>
    ),
    prayer: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12 2L8 8h8l-4-6z" />
        <path d="M8 8v6c0 2 2 4 4 4s4-2 4-4V8H8z" />
        <path d="M10 18v2c0 1 1 2 2 2s2-1 2-2v-2h-4z" />
        <circle cx="10" cy="11" r="1" />
        <circle cx="14" cy="11" r="1" />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12 2l2.5 7.5H22l-6 4.5 2.5 7.5L12 17l-6.5 4.5L8 14 2 9.5h7.5L12 2z" />
        <path
          d="M12 6l1.5 4.5H18l-3.5 2.5L16 18l-4-3-4 3 1.5-5L6 10.5h4.5L12 6z"
          opacity="0.6"
        />
      </svg>
    ),
    globe: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <path
          d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.7"
        />
        <path
          d="M8 12c0-4 2-8 4-8s4 4 4 8-2 8-4 8-4-4-4-8z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    ),
    book: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M4 2v20l8-4 8 4V2H4z" />
        <path d="M6 4h12v14l-6-3-6 3V4z" opacity="0.7" />
        <line
          x1="8"
          y1="8"
          x2="16"
          y2="8"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        <line
          x1="8"
          y1="11"
          x2="16"
          y2="11"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        <line
          x1="8"
          y1="14"
          x2="13"
          y2="14"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
    ),
    sparkle: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12 0l1.5 4.5L18 6l-4.5 1.5L12 12l-1.5-4.5L6 6l4.5-1.5L12 0z" />
        <path d="M6 12l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
        <path d="M18 12l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
      </svg>
    ),
    feather: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z" />
        <path
          d="M16 8L2 22M17.5 15H9"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
        <path d="M12 12c1-1 2-2 3-2s2 1 2 2-1 2-2 2-2-1-3-2z" opacity="0.7" />
      </svg>
    ),
  };

  return icons[type] || icons.om;
};

const Mission = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // **Parallax Effects**
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // **Mouse Movement Effect**
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      return () => section.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // **Professional Floating Elements**
  const floatingElements = [
    { icon: "lotus", delay: 0, duration: 12 },
    { icon: "om", delay: 1, duration: 15 },
    { icon: "feather", delay: 2, duration: 10 },
    { icon: "prayer", delay: 0.5, duration: 14 },
    { icon: "sparkle", delay: 1.5, duration: 8 },
    { icon: "star", delay: 2.5, duration: 16 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* **Beautiful Krishna-Inspired Background** */}
      <div className="absolute inset-0">
        {/* **Main Gradient Background - Krishna Colors** */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200" />

        {/* **Secondary Gradient Layer** */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-50 via-blue-100 to-violet-150 opacity-80" />

        {/* **Peacock Feather Inspired Large Blurs** */}
        <div className="absolute inset-0">
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={`peacock-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${500 + i * 100}px`,
                height: `${300 + i * 60}px`,
                left: `${i * 15}%`,
                top: `${i * 12}%`,
                background: `radial-gradient(ellipse at center, 
                  rgba(59, 130, 246, ${0.2 + i * 0.03}) 0%, 
                  rgba(99, 102, 241, ${0.15 + i * 0.02}) 25%, 
                  rgba(139, 92, 246, ${0.12 + i * 0.015}) 50%, 
                  rgba(168, 85, 247, ${0.08 + i * 0.01}) 75%, 
                  transparent 100%)`,
                filter: "blur(80px)",
              }}
              animate={{
                x: [0, 60, -40, 0],
                y: [0, -40, 30, 0],
                scale: [1, 1.2, 0.9, 1],
                rotate: [0, 120, 240, 360],
              }}
              transition={{
                duration: 30 + i * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* **Layered Color Washes** */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/40 via-transparent to-purple-100/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/60 to-transparent" />

        {/* **Interactive Divine Light** */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle 800px at ${
              mousePosition.x * 100
            }% ${mousePosition.y * 100}%, 
              rgba(147, 197, 253, 0.3) 0%, 
              rgba(165, 180, 252, 0.2) 30%, 
              rgba(196, 181, 253, 0.15) 60%, 
              transparent 80%)`,
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* **Subtle Pattern Overlay** */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px, 40px 40px",
          }}
        />

        {/* **Floating Light Particles** */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={`light-particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `rgba(${59 + Math.random() * 100}, ${
                  130 + Math.random() * 100
                }, 246, ${0.3 + Math.random() * 0.4})`,
                boxShadow: `0 0 ${
                  10 + Math.random() * 20
                }px rgba(59, 130, 246, 0.5)`,
              }}
              animate={{
                y: [0, -60, 0],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* **Enhanced Floating Sacred Elements** */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={`floating-${index}`}
          className="absolute opacity-20 pointer-events-none select-none text-indigo-600"
          style={{
            left: `${8 + index * 14}%`,
            top: `${15 + index * 12}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            isInView
              ? {
                  opacity: [0, 0.25, 0.1],
                  scale: [0.5, 1.3, 1],
                  y: [0, -80, 0],
                  rotate: [0, 180, 360],
                }
              : {}
          }
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <SacredIcon type={element.icon} className="w-16 h-16" />
        </motion.div>
      ))}

      {/* **Main Content Container** */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center">
        {/* **Divine Symbol Header** */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  scale: 1,
                  rotateY: 0,
                }
              : {}
          }
          transition={{
            duration: 1.2,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
          }}
          className="mb-12"
        >
          <div className="relative inline-block">
            <motion.div
              className="text-indigo-700 drop-shadow-xl"
              animate={{
                filter: [
                  "drop-shadow(0 8px 16px rgba(99, 102, 241, 0.4))",
                  "drop-shadow(0 12px 24px rgba(99, 102, 241, 0.6))",
                  "drop-shadow(0 8px 16px rgba(99, 102, 241, 0.4))",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <SacredIcon type="om" className="w-28 h-28 md:w-36 md:h-36" />
            </motion.div>

            {/* **Rotating Sacred Ring** */}
            <motion.div
              className="absolute inset-0 border-3 border-indigo-400/40 rounded-full"
              style={{ width: "160px", height: "160px", margin: "auto" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />

            {/* **Inner Pulsing Ring** */}
            <motion.div
              className="absolute inset-0 border-2 border-purple-300/30 rounded-full"
              style={{ width: "120px", height: "120px", margin: "auto" }}
              animate={{
                rotate: -360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </div>
        </motion.div>

        {/* **Main Title with Beautiful Gradient** */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            style={{
              background:
                "linear-gradient(135deg, #312e81 0%, #3730a3 20%, #4338ca 40%, #4f46e5 60%, #6366f1 80%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Our Divine Mission
          </motion.h2>

          {/* **Decorative Line** */}
          <motion.div
            className="w-40 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full shadow-lg"
            initial={{ width: 0 }}
            animate={isInView ? { width: 160 } : {}}
            transition={{ duration: 1.2, delay: 0.8 }}
          />
        </motion.div>

        {/* **Enhanced Mission Cards** */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Sacred Connection",
              description:
                "Bridging ancient wisdom with modern souls through divine technology",
              icon: "star",
              gradient: "from-blue-600 to-indigo-700",
              bgGradient: "from-blue-50 to-indigo-100",
            },
            {
              title: "Global Unity",
              description:
                "Creating spiritual communities that transcend geographical boundaries",
              icon: "globe",
              gradient: "from-indigo-600 to-purple-700",
              bgGradient: "from-indigo-50 to-purple-100",
            },
            {
              title: "Timeless Teachings",
              description:
                "Preserving and sharing Krishna's eternal wisdom for future generations",
              icon: "book",
              gradient: "from-purple-600 to-pink-700",
              bgGradient: "from-purple-50 to-pink-100",
            },
          ].map((card, index) => (
            <motion.div
              key={`mission-card-${index}`}
              initial={{ opacity: 0, y: 50, rotateX: -30 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.8,
                delay: 0.5 + index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              className="relative group"
            >
              {/* **Beautiful Card Background** */}
              <div
                className={`relative bg-gradient-to-br ${card.bgGradient} backdrop-blur-xl border border-white/60 rounded-3xl p-8 h-full overflow-hidden shadow-2xl`}
              >
                {/* **Animated Border Glow** */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-500`}
                  animate={{
                    background: [
                      `linear-gradient(0deg, var(--tw-gradient-stops))`,
                      `linear-gradient(360deg, var(--tw-gradient-stops))`,
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                {/* **Card Content** */}
                <div className="relative z-10 text-center">
                  <motion.div
                    className="text-indigo-700 mb-6 flex justify-center"
                    animate={{
                      scale: [1, 1.15, 1],
                      rotate: [0, 8, -8, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.7,
                    }}
                  >
                    <SacredIcon type={card.icon} className="w-14 h-14" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {card.title}
                  </h3>

                  <p className="text-gray-700 leading-relaxed font-medium">
                    {card.description}
                  </p>
                </div>

                {/* **Enhanced Floating Particles** */}
                {Array.from({ length: 4 }, (_, i) => (
                  <motion.div
                    key={`card-particle-${i}`}
                    className="absolute rounded-full"
                    style={{
                      width: `${2 + i}px`,
                      height: `${2 + i}px`,
                      left: `${20 + i * 15}%`,
                      top: `${15 + i * 20}%`,
                      background: `rgba(99, 102, 241, ${0.3 + i * 0.1})`,
                      boxShadow: `0 0 ${8 + i * 4}px rgba(99, 102, 241, 0.4)`,
                    }}
                    animate={{
                      y: [0, -25, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 4 + i * 0.8,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* **Enhanced Mission Statement** */}
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-white/70 via-blue-50/80 to-indigo-100/70 backdrop-blur-2xl border border-white/50 rounded-3xl p-12 md:p-16 shadow-2xl">
            {/* **Elegant Quote Marks** */}
            <motion.div
              className="text-7xl text-indigo-400/50 absolute top-6 left-10 font-serif"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              "
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium relative z-10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 1.4 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                Krishnova bridges the sacred and digital realms, creating a
                global spiritual ecosystem where{" "}
              </motion.span>
              <motion.span
                className="text-indigo-700 font-bold"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.8 }}
              >
                ancient wisdom meets modern technology
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 2.0 }}
              >
                . Through our blessed Krishna keychains and sacred texts, we
                connect souls across distances, fostering{" "}
              </motion.span>
              <motion.span
                className="text-purple-700 font-bold"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 2.2 }}
              >
                divine communities rooted in love, devotion, and timeless
                teachings
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 2.4 }}
              >
                .
              </motion.span>
            </motion.p>

            <motion.div
              className="text-7xl text-indigo-400/50 absolute bottom-6 right-10 rotate-180 font-serif"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 2.6 }}
            >
              "
            </motion.div>
          </div>
        </motion.div>

        {/* **Beautiful Call to Action** */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="mt-16"
        >
          <motion.button
            className="group relative px-14 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-full text-lg overflow-hidden shadow-2xl hover:shadow-3xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* **Button Shimmer Effect** */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <span className="relative z-10 flex items-center gap-4">
              Join Our Sacred Journey
              <motion.div
                animate={{
                  x: [0, 8, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <SacredIcon type="sparkle" className="w-6 h-6" />
              </motion.div>
            </span>
          </motion.button>
        </motion.div>

        {/* **Enhanced Bottom Decorative Elements** */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 3 }}
          className="mt-20 flex justify-center space-x-12"
        >
          {["lotus", "om", "prayer", "om", "lotus"].map((iconType, index) => (
            <motion.div
              key={`bottom-symbol-${index}`}
              className="text-indigo-500/70"
              animate={{
                y: [0, -15, 0],
                opacity: [0.7, 1, 0.7],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeInOut",
              }}
            >
              <SacredIcon type={iconType} className="w-10 h-10" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* **Enhanced Scroll Indicator** */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        <motion.div
          className="w-7 h-12 border-2 border-indigo-500/60 rounded-full flex justify-center shadow-lg"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-4 bg-indigo-600/80 rounded-full mt-3"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Mission;
