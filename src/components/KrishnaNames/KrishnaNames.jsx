// KrishnaNames.jsx - Minimal Design with Original Emoji Animation
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const KrishnaNames = () => {
  const sectionRef = useRef(null);

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

  const krishnaNames = [
    {
      name: "Govinda",
      meaning: "Protector of Cows, Earth's Guardian",
      color: colors.primary,
    },
    {
      name: "Ladoo Gopal",
      meaning: "Sweet Child of Krishna, Beloved by All",
      color: colors.secondary,
    },
    {
      name: "Radha Ramana",
      meaning: "Beloved of Radha, Divine Love",
      color: colors.accent,
    },
    {
      name: "Kanaiya",
      meaning: "The Mischievous One, Playful Spirit",
      color: colors.primary,
    },
    {
      name: "Kanha",
      meaning: "Dark-complexioned, Beautiful One",
      color: colors.secondary,
    },
    {
      name: "Hari",
      meaning: "Remover of Sorrows, Divine Healer",
      color: colors.accent,
    },
    {
      name: "Banke Bihari",
      meaning: "Bent in Three Places, Charming Form",
      color: colors.primary,
    },
    {
      name: "Shyam",
      meaning: "Dark Beauty, Enchanting Presence",
      color: colors.secondary,
    },
    {
      name: "Keshav",
      meaning: "Long-haired One, Slayer of Keshi",
      color: colors.accent,
    },
    {
      name: "Madhusudan",
      meaning: "Destroyer of Madhu Demon",
      color: colors.primary,
    },
    {
      name: "Vasudeva",
      meaning: "Son of Vasudeva, Divine Child",
      color: colors.secondary,
    },
    {
      name: "Jagannath",
      meaning: "Lord of the Universe, Universal Master",
      color: colors.accent,
    },
  ];

  // Create floating sacred symbols (EXACT same as original)
  const createSacredSymbol = (element) => {
    const symbols = ["🕉️", "🪷", "🦚", "⭐", "💫", "🌙"];
    const symbol = document.createElement("div");
    symbol.className = "sacred-symbol";
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.left = Math.random() * 100 + "%";
    symbol.style.top = Math.random() * 100 + "%";
    symbol.style.color = colors.primary; // Using our blue instead of golden

    element.style.position = "relative";
    element.appendChild(symbol);

    setTimeout(() => {
      symbol.remove();
    }, 3000);
  };

  // Scroll reveal animation (EXACT same as original)
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");

          // Add sacred symbols animation (EXACT same as original)
          if (entry.target.classList.contains("name-card")) {
            createSacredSymbol(entry.target);
          }
        }
      });
    }, observerOptions);

    const scrollElements =
      sectionRef.current?.querySelectorAll(".scroll-reveal");
    scrollElements?.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      scrollElements?.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      <style jsx>{`
        /* Clean minimal styles */
        .section {
          padding: 100px 0;
          position: relative;
          // background: white;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 30px;
        }

        .section-title {
          font-family: "Playfair Display", serif;
          font-size: 3rem;
          text-align: center;
          margin-bottom: 60px;
          color: ${colors.dark};
          font-weight: bold;
        }

        /* Clean Krishna Names Grid */
        .krishna-names {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          margin-top: 60px;
        }

        .name-card {
          padding: 30px;
          border-radius: 15px;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          background: white;
          border: 2px solid ${colors.light};
          box-shadow: 0 4px 15px rgba(30, 64, 175, 0.1);
        }

        .name-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 30px rgba(30, 64, 175, 0.15);
          border-color: ${colors.primary};
        }

        .name-title {
          font-family: "Playfair Display", serif;
          font-size: 1.8rem;
          margin-bottom: 15px;
          font-weight: bold;
        }

        .name-meaning {
          color: ${colors.neutral};
          font-style: italic;
          line-height: 1.6;
          font-size: 1rem;
        }

        /* Clean scroll animations */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* Sacred Symbols Animation - EXACT same as original */
        .sacred-symbol {
          position: absolute;
          font-size: 2rem;
          opacity: 0;
          animation: symbolMaterialize 3s ease-in-out;
          pointer-events: none;
          z-index: 10;
        }

        @keyframes symbolMaterialize {
          0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.2) rotate(180deg);
          }
          100% {
            opacity: 0;
            transform: scale(0.8) rotate(360deg);
          }
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .section-title {
            font-size: 2.5rem;
          }

          .krishna-names {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .name-card {
            padding: 25px;
          }

          .name-title {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <section ref={sectionRef} className="section">
        <div className="container">
          <h2 className="section-title scroll-reveal">
            Sacred Krishna Names & Meanings
          </h2>

          <div className="krishna-names">
            {krishnaNames.map((item, index) => (
              <div
                key={index}
                className="name-card scroll-reveal"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Clean accent line */}
                <div
                  className="w-12 h-1 mx-auto mb-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />

                <h3 className="name-title" style={{ color: item.color }}>
                  {item.name}
                </h3>

                <p className="name-meaning">{item.meaning}</p>

                {/* Clean corner accent */}
                <div
                  className="absolute top-4 right-4 w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: item.color,
                    opacity: 0.3,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default KrishnaNames;
