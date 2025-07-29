import React, { useEffect, useRef } from "react";
import SectionTitle from "../UI/SectionTitle";
import TextBox from "../UI/TextBox";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const WisdomPortalPath = () => {
  const cardRef = useRef(null);

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

    // Cleanup on unmount
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <section id="wisdom" className="relative py-24 overflow-hidden">
      {/* Subtle animated glowing orbs like background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-[radial-gradient(circle,rgba(255,255,255,0.1),transparent_70%)] rounded-full animate-float-slow"></div>
        <div className="absolute bottom-12 right-12 w-96 h-96 bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_80%)] rounded-full animate-float-slower"></div>
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_90%)] rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 container max-w-4xl mx-auto px-6 md:px-0">
        <SectionTitle>
          <span className="bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">
            Divine Wisdom Portal
          </span>
        </SectionTitle>

        <TextBox
          variant="mysticalAurora"
          scrollAnimation="scroll-slide-left"
          className=" backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20"
        >
          <h3 className="text-yellow-300 text-4xl font-extrabold mb-8 text-center drop-shadow-lg">
            🔮 Sacred Wisdom Coming Soon
          </h3>

          <p className="text-white/90 text-lg md:text-xl leading-relaxed text-center mb-12 max-w-xl mx-auto drop-shadow-sm">
            Our <span className="text-pink-300 font-semibold">GPT Gita</span>{" "}
            integration launches in <span className="font-bold">2 days!</span>{" "}
            Ask Krishna any question & receive personalized wisdom from the{" "}
            <span className="text-pink-300 font-semibold">Bhagavad Gita</span>.
            ✨ Bridging eternal teachings & modern AI.
          </p>

          <div className="text-center">
            <Link to="/wishdomportal" className="group relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-600 hover:from-blue-400 hover:via-emerald-400 hover:to-blue-500 text-white font-bold py-5 px-12 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-300/30"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span>Explore Wishdom Portal</span>
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
      </div>
    </section>
  );
};

export default WisdomPortalPath;
