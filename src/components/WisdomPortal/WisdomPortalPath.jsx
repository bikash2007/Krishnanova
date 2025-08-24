import React, { useEffect, useRef } from "react";
import SectionTitle from "../UI/SectionTitle";
import TextBox from "../UI/TextBox";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const WisdomPortalPath = () => {
  const cardRef = useRef(null);

  // **Minimal Dark Blue Color Palette**
  const colors = {
    primary: "#1e40af", // Royal Blue
    secondary: "#2563eb", // Bright Blue
    accent: "#3b82f6", // Light Blue
    dark: "#1e3a8a", // Dark Blue
    neutral: "#64748b", // Slate Gray
    light: "#f8fafc", // Almost White
    white: "#ffffff",
  };

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
    <>
      <style jsx>{`
        /* Clean animations */
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes float-slower {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-180deg);
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

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 12s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }

        /* Enhanced button styles */
        .hero-enhanced-button {
          background: linear-gradient(
            135deg,
            ${colors.primary} 0%,
            ${colors.secondary} 100%
          );
          background-size: 200% 200%;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .hero-enhanced-button:hover {
          background-position: 100% 0;
          box-shadow: 0 10px 30px ${colors.primary}40;
          filter: brightness(1.1);
          border-color: ${colors.accent} !important;
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
          opacity: 0.8;
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
      `}</style>

      <section id="wisdom" className="relative py-24 overflow-hidden bg-white">
        {/* Minimal subtle background elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute -top-32 -left-32 w-80 h-80 rounded-full animate-float-slow opacity-5"
            style={{
              background: `radial-gradient(circle, ${colors.primary}, transparent 70%)`,
            }}
          />
          <div
            className="absolute bottom-12 right-12 w-96 h-96 rounded-full animate-float-slower opacity-3"
            style={{
              background: `radial-gradient(circle, ${colors.secondary}, transparent 80%)`,
            }}
          />
          <div
            className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full animate-pulse opacity-4"
            style={{
              background: `radial-gradient(circle, ${colors.accent}, transparent 90%)`,
            }}
          />
        </div>

        <div className="relative z-10 container max-w-4xl mx-auto px-6 md:px-0">
          {/* Updated SectionTitle with minimal colors */}
          <div className="text-center mb-12">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Divine Wisdom Portal
            </motion.h2>
            <div
              className="w-24 h-1 mx-auto rounded-full"
              style={{ backgroundColor: colors.primary }}
            />
          </div>

          <TextBox
            variant="mysticalAurora"
            scrollAnimation="scroll-slide-left"
            className="backdrop-blur-xl rounded-3xl p-12 shadow-2xl"
          >
            {/* Updated content with minimal colors */}
            <h3
              className="text-4xl font-extrabold mb-8 text-center drop-shadow-lg"
              style={{ color: colors.primary }}
            >
              🔮 Sacred Wisdom Coming Soon
            </h3>

            <p
              className="text-lg md:text-xl leading-relaxed text-center mb-12 max-w-xl mx-auto drop-shadow-sm"
              style={{ color: colors.neutral }}
            >
              Our{" "}
              <span
                className="font-semibold"
                style={{ color: colors.secondary }}
              >
                GPT Gita
              </span>{" "}
              integration launches in <span className="font-bold">2 days!</span>{" "}
              Ask Krishna any question & receive personalized wisdom from the{" "}
              <span
                className="font-semibold"
                style={{ color: colors.secondary }}
              >
                Bhagavad Gita
              </span>
              . ✨ Bridging eternal teachings & modern AI.
            </p>

            <div className="text-center">
              <Link to="/wishdomportal" className="group relative inline-block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hero-enhanced-button interactive relative font-bold py-5 px-12 rounded-xl shadow-xl transition-all duration-500 border-2 border-transparent cursor-pointer overflow-hidden"
                  onMouseEnter={(e) => e.target.classList.add("hovered")}
                  onMouseLeave={(e) => e.target.classList.remove("hovered")}
                >
                  {/* Shimmer sweep */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-[120%] skew-x-[-20deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent)] animate-shimmer" />

                  {/* Ripple effect on hover */}
                  <span className="ripple-effect absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-300" />

                  <span className="relative z-10 flex items-center gap-3 text-white">
                    <span>Explore Wisdom Portal</span>
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
            </div>
          </TextBox>

          {/* Added feature highlights for better UX */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: "🤖",
                title: "AI-Powered Wisdom",
                desc: "Advanced GPT integration with sacred texts",
                color: colors.primary,
              },
              {
                icon: "📚",
                title: "Authentic Teachings",
                desc: "Direct insights from Bhagavad Gita verses",
                color: colors.secondary,
              },
              {
                icon: "💫",
                title: "Personal Guidance",
                desc: "Customized spiritual advice for your journey",
                color: colors.accent,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl border bg-white shadow-sm"
                style={{
                  borderColor: `${feature.color}20`,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 10px 25px ${feature.color}15`,
                  borderColor: `${feature.color}40`,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4
                  className="text-lg font-bold mb-2"
                  style={{ color: feature.color }}
                >
                  {feature.title}
                </h4>
                <p className="text-sm" style={{ color: colors.neutral }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default WisdomPortalPath;
