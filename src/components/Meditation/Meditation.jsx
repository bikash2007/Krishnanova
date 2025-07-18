import React from "react";

const Meditation = () => {
  return (
    <section className="section py-24">
      <div className="container max-w-7xl mx-auto px-8">
        <h2 className="section-title scroll-reveal font-playfair text-5xl text-center mb-16 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
          Spiritual Practice Guide
        </h2>
        <div className="text-3d-box gradient-wave-box mystical-aurora scroll-slide-right bg-gray-100/5 border-2 border-yellow-400/30 rounded-2xl p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden">
          <h3 className="text-yellow-400 text-3xl mb-6">
            🧘 Daily Krishna Meditation
          </h3>
          <p className="text-gray-100 text-xl leading-relaxed mb-5">
            Transform your Krishna keychain into a powerful meditation tool.
            Hold it during prayer, feel its sacred energy, and let it remind you
            of divine presence throughout your day.
          </p>
          <div className="bg-black/20 p-5 rounded-xl mt-5">
            <h4 className="text-cyan-400 mb-4 text-xl">Morning Prayer</h4>
            <p className="text-gray-100 italic">
              "Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare
              <br />
              Hare Rama, Hare Rama, Rama Rama, Hare Hare"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Meditation;
