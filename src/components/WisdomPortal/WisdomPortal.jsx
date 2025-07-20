import React, { useEffect, useRef } from "react";
import SectionTitle from "../UI/SectionTitle";
import TextBox from "../UI/TextBox";
import Button from "../UI/Button";

const WisdomPortal = () => {
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
            <Button
              variant="krishna"
              size="large"
              className="shadow-xl hover:shadow-[0_0_30px_#a78bfa]"
            >
              🚀 Notify Me When Ready
            </Button>
          </div>
        </TextBox>
      </div>
    </section>
  );
};

export default WisdomPortal;
