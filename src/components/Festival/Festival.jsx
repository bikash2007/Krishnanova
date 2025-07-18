import React from "react";

const Festival = () => {
  return (
    <section className="section py-24">
      <div className="container max-w-7xl mx-auto px-8">
        <h2 className="section-title scroll-reveal font-playfair text-5xl text-center mb-16 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
          Festival Calendar
        </h2>
        <div className="text-3d-box gradient-wave-box cosmic-ocean scroll-slide-left bg-gray-100/5 border-2 border-yellow-400/30 rounded-2xl p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden">
          <h3 className="text-pink-500 text-3xl mb-6">
            🎉 Upcoming Celebrations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-pink-500/10 p-5 rounded-xl">
              <h4 className="text-yellow-400 text-xl mb-2">Janmashtami</h4>
              <p className="text-gray-100">Krishna's Birthday - August 30th</p>
            </div>
            <div className="bg-cyan-400/10 p-5 rounded-xl">
              <h4 className="text-yellow-400 text-xl mb-2">Govardhan Puja</h4>
              <p className="text-gray-100">Mountain Lifting - November 14th</p>
            </div>
            <div className="bg-purple-600/10 p-5 rounded-xl">
              <h4 className="text-yellow-400 text-xl mb-2">Holi</h4>
              <p className="text-gray-100">Festival of Colors - March 8th</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Festival;
