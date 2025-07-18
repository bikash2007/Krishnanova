import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="section py-24">
      <div className="container max-w-7xl mx-auto px-8">
        <h2 className="section-title scroll-reveal font-playfair text-5xl text-center mb-16 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
          Connect with Our Sacred Circle
        </h2>
        <div className="text-3d-box gradient-wave-box krishna-breath scroll-reveal bg-gray-100/5 border-2 border-yellow-400/30 rounded-2xl p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden">
          <div className="text-center">
            <h3 className="text-yellow-400 text-3xl mb-8">
              🙏 Join Our Spiritual Family
            </h3>
            <p className="text-gray-100 text-xl mb-8">
              Ready to begin your sacred journey? Connect with us for guidance,
              support, and divine blessings.
            </p>
            <div className="flex flex-col md:flex-row gap-5 justify-center">
              <button className="cta-button px-10 py-5 bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-full font-semibold text-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 shadow-lg">
                📧 Email Us
              </button>
              <button className="cta-button px-10 py-5 bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-full font-semibold text-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 shadow-lg">
                📱 WhatsApp
              </button>
              <button className="cta-button px-10 py-5 bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-full font-semibold text-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 shadow-lg">
                🌐 Join Newsletter
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
