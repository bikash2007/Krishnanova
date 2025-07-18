import React from "react";

const Community = () => {
  return (
    <section id="community" className="section py-24">
      <div className="container max-w-7xl mx-auto px-8">
        <h2 className="section-title scroll-reveal font-playfair text-5xl text-center mb-16 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
          Sacred Community Journey
        </h2>
        <div className="text-3d-box gradient-wave-box krishna-breath scroll-slide-right bg-gray-100/5 border-2 border-yellow-400/30 rounded-2xl p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden mb-10">
          <h3 className="text-cyan-400 text-3xl mb-6">
            🌍 Connect Across Distances
          </h3>
          <p className="text-gray-100 text-xl leading-relaxed">
            Each QR code on your Krishna keychain opens a portal to find
            spiritual family in your area. Share meditation circles, celebrate
            festivals together, and build lasting bonds through shared devotion.
            Technology serving the sacred purpose of unity.
          </p>
        </div>

        <div className="text-3d-box gradient-wave-box sacred-fire scroll-reveal bg-gray-100/5 border-2 border-yellow-400/30 rounded-2xl p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden">
          <h3 className="text-yellow-400 text-3xl mb-6">
            🕯️ Find Your Spiritual Family
          </h3>
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <input
              type="text"
              placeholder="Enter your zipcode"
              className="flex-1 p-4 rounded-xl bg-black/30 text-white border-2 border-cyan-400 min-w-0 md:min-w-48"
            />
            <button className="cta-button px-10 py-5 bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-full font-semibold text-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 shadow-lg">
              Find Community
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
