import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const Meditation = () => {
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // **Enhanced Dark Royal Blue Palette**
  const colors = {
    primary: "#1e3a8a", // Deep Royal Blue
    secondary: "#1e40af", // Royal Blue
    accent: "#2563eb", // Bright Blue
    dark: "#0f172a", // Very Dark Blue
    neutral: "#475569", // Dark Slate
    light: "#f1f5f9", // Light Blue Gray
    white: "#ffffff",
    success: "#059669", // Emerald
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)",
    shadow: "rgba(30, 58, 138, 0.15)",
  };

  // Cursor tracking
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <style jsx>{`
        /* Enhanced button styles */
        .hero-enhanced-button {
          background: ${colors.gradient};
          background-size: 200% 200%;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .hero-enhanced-button:hover {
          background-position: 100% 0;
          box-shadow: 0 15px 40px ${colors.shadow};
          filter: brightness(1.15);
          transform: translateY(-2px);
        }

        .hero-enhanced-button::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(
            45deg,
            ${colors.primary},
            ${colors.accent},
            ${colors.secondary},
            ${colors.primary}
          );
          background-size: 400% 400%;
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.4s ease;
          animation: gradientRotate 3s ease infinite;
        }

        .hero-enhanced-button:hover::before {
          opacity: 0.9;
        }

        @keyframes gradientRotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-120%) skewX(-20deg);
          }
          100% {
            transform: translateX(120%) skewX(-20deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px ${colors.primary}40;
          }
          50% {
            box-shadow: 0 0 30px ${colors.primary}60;
          }
        }

        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="section py-24 relative overflow-hidden"
        onMouseMove={handleMouseMove}
        style={{ background: "transparent" }}
      >
        {/* Enhanced cursor tracking with royal blue colors */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(circle 400px at ${
              mousePosition.x * 100
            }% ${mousePosition.y * 100}%,
              ${colors.primary}20 0%, 
              ${colors.secondary}10 40%, 
              transparent 70%)`,
          }}
        />

        <div className="container max-w-6xl mx-auto px-8 relative z-10">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-5xl font-bold mb-6"
              style={{ color: colors.dark }}
            >
              Spiritual Practice Guide
            </motion.h2>

            {/* Enhanced divider */}
            <motion.div
              className="w-32 h-1 mx-auto rounded-full mb-4"
              style={{
                background: colors.gradient,
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Enhanced Main Card with Left Design */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-3xl shadow-2xl border overflow-hidden bg-white relative"
            style={{
              borderColor: colors.light,
              boxShadow: `0 25px 50px ${colors.shadow}`,
            }}
          >
            {/* Left Side Decorative Panel */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-transparent via-blue-600 to-transparent opacity-60"></div>

            <div className="flex flex-col lg:flex-row">
              {/* Left Side - Enhanced Visual Design */}
              <div className="lg:w-1/3 relative overflow-hidden">
                <div
                  className="h-full min-h-[400px] p-8 flex flex-col justify-center items-center relative"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
                  }}
                >
                  {/* Floating Sacred Symbols */}
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 20% 20%, white 2px, transparent 2px),
                        radial-gradient(circle at 80% 20%, white 1px, transparent 1px),
                        radial-gradient(circle at 20% 80%, white 1.5px, transparent 1.5px),
                        radial-gradient(circle at 80% 80%, white 1px, transparent 1px)
                      `,
                      backgroundSize:
                        "60px 60px, 40px 40px, 50px 50px, 45px 45px",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 120,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Central Sacred Symbol */}
                  <motion.div
                    className="relative z-10 text-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 1, delay: 0.5, type: "spring" }}
                  >
                    {/* Om Symbol Container */}
                    <motion.div
                      className="w-24 h-24 mx-auto mb-6 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center relative animate-pulse-glow"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <span className="text-5xl text-white font-bold">ॐ</span>

                      {/* Orbiting dots */}
                      <motion.div
                        className="absolute w-3 h-3 bg-white rounded-full opacity-80"
                        style={{ top: "10%", left: "50%" }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <motion.div
                        className="absolute w-2 h-2 bg-white rounded-full opacity-60"
                        style={{ bottom: "10%", right: "20%" }}
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </motion.div>

                    {/* Sacred Text */}
                    <motion.div
                      className="text-white text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      <h3 className="text-2xl font-bold mb-2">
                        Sacred Practice
                      </h3>
                      <p className="text-blue-100 text-sm font-medium">
                        Connect with Divine Energy
                      </p>
                    </motion.div>

                    {/* Floating Elements */}
                    <motion.div
                      className="absolute -top-8 -left-8 text-6xl text-white opacity-20 animate-float"
                      style={{ animationDelay: "0s" }}
                    >
                      🕉️
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-4 -right-4 text-4xl text-white opacity-30 animate-float"
                      style={{ animationDelay: "1s" }}
                    >
                      🙏
                    </motion.div>
                  </motion.div>

                  {/* Bottom Decorative Wave */}
                  <div className="absolute bottom-0 left-0 right-0">
                    <svg
                      viewBox="0 0 400 100"
                      className="w-full h-16 text-white opacity-10"
                      preserveAspectRatio="none"
                    >
                      <motion.path
                        d="M0,50 Q100,10 200,50 T400,50 L400,100 L0,100 Z"
                        fill="currentColor"
                        animate={{
                          d: [
                            "M0,50 Q100,10 200,50 T400,50 L400,100 L0,100 Z",
                            "M0,50 Q100,90 200,50 T400,50 L400,100 L0,100 Z",
                            "M0,50 Q100,10 200,50 T400,50 L400,100 L0,100 Z",
                          ],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="lg:w-2/3 p-8">
                {/* Header */}
                <div className="mb-8">
                  <motion.h3
                    className="text-3xl font-bold mb-4"
                    style={{ color: colors.dark }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Daily Krishna Meditation
                  </motion.h3>

                  <motion.p
                    className="text-lg leading-relaxed"
                    style={{ color: colors.neutral }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    Transform your{" "}
                    <motion.span
                      className="font-semibold px-2 py-1 rounded"
                      style={{
                        color: colors.primary,
                        backgroundColor: `${colors.primary}10`,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      Krishna keychain
                    </motion.span>{" "}
                    into a powerful meditation tool. Hold it during prayer, feel
                    its{" "}
                    <motion.span
                      className="font-semibold px-2 py-1 rounded"
                      style={{
                        color: colors.secondary,
                        backgroundColor: `${colors.secondary}10`,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      sacred energy
                    </motion.span>
                    , and let it remind you of{" "}
                    <motion.span
                      className="font-semibold px-2 py-1 rounded"
                      style={{
                        color: colors.accent,
                        backgroundColor: `${colors.accent}10`,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      divine presence
                    </motion.span>{" "}
                    throughout your day.
                  </motion.p>
                </div>

                {/* Morning Prayer Section */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="flex items-center mb-4">
                    <motion.div
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                      style={{
                        background: colors.gradient,
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      animate={{
                        boxShadow: [
                          `0 0 20px ${colors.primary}40`,
                          `0 0 30px ${colors.primary}60`,
                          `0 0 20px ${colors.primary}40`,
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-white text-lg font-bold">॥</span>
                    </motion.div>
                    <h4
                      className="text-2xl font-semibold"
                      style={{ color: colors.dark }}
                    >
                      Morning Prayer
                    </h4>
                  </div>

                  <motion.div
                    className="rounded-2xl p-6 border-l-4 relative overflow-hidden bg-gradient-to-r from-blue-50 to-white shadow-sm"
                    style={{
                      borderColor: colors.primary,
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: `0 10px 30px ${colors.shadow}`,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <blockquote
                      className="text-xl font-medium text-center leading-relaxed italic relative z-10 mb-4"
                      style={{ color: colors.dark }}
                    >
                      "Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare
                      <br />
                      Hare Rama, Hare Rama, Rama Rama, Hare Hare"
                    </blockquote>

                    <motion.p
                      className="text-sm text-center font-medium px-4 py-2 rounded-full inline-block"
                      style={{
                        color: colors.primary,
                        backgroundColor: `${colors.primary}10`,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      Chant with devotion while holding your sacred keychain
                    </motion.p>
                  </motion.div>
                </motion.div>

                {/* Enhanced Benefits Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <h4
                    className="text-xl font-semibold mb-6 text-center"
                    style={{ color: colors.dark }}
                  >
                    Benefits of Daily Practice:
                  </h4>

                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      {
                        icon: "🕉️",
                        title: "Inner Peace",
                        desc: "Find tranquility in daily chaos",
                        color: colors.primary,
                      },
                      {
                        icon: "💝",
                        title: "Divine Connection",
                        desc: "Strengthen your bond with Krishna",
                        color: colors.secondary,
                      },
                      {
                        icon: "🌟",
                        title: "Spiritual Growth",
                        desc: "Evolve on your sacred journey",
                        color: colors.accent,
                      },
                    ].map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                        whileHover={{
                          y: -8,
                          scale: 1.05,
                          boxShadow: `0 15px 30px ${benefit.color}20`,
                        }}
                        className="text-center p-6 rounded-xl border transition-all duration-300 bg-white shadow-sm cursor-pointer group"
                        style={{
                          borderColor: colors.light,
                        }}
                      >
                        <motion.div
                          className="text-3xl mb-3"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.5,
                          }}
                        >
                          {benefit.icon}
                        </motion.div>

                        <h5
                          className="font-semibold mb-2 group-hover:scale-105 transition-transform"
                          style={{ color: colors.dark }}
                        >
                          {benefit.title}
                        </h5>

                        <p
                          className="text-sm mb-3"
                          style={{ color: colors.neutral }}
                        >
                          {benefit.desc}
                        </p>

                        <motion.div
                          className="w-12 h-1 mx-auto rounded-full"
                          style={{ backgroundColor: benefit.color }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center mt-16"
          >
            <Link to="/productpage" className="group relative inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hero-enhanced-button relative font-bold py-6 px-16 rounded-2xl shadow-2xl transition-all duration-500 border-2 border-transparent cursor-pointer overflow-hidden"
              >
                {/* Enhanced shimmer effect */}
                <span className="pointer-events-none absolute inset-0 -translate-x-[120%] skew-x-[-20deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent)] animate-shimmer" />

                <span className="relative z-10 flex items-center gap-4 text-white text-lg">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    🕉️
                  </motion.span>
                  <span>Start Your Sacred Journey</span>
                  <motion.span
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-2xl"
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </Link>

            <motion.p
              className="mt-6 text-base font-medium"
              style={{ color: colors.neutral }}
              whileHover={{ scale: 1.05 }}
            >
              Transform your spiritual practice today ✨
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Meditation;
