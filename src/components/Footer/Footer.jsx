import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900/30 py-16 text-center text-gray-100 backdrop-blur-sm">
      <div className="container max-w-7xl mx-auto px-8">
        <div className="text-3d-box gradient-wave-box bg-gray-100/5 border-2 border-yellow-400/30 rounded-2xl p-8 backdrop-blur-sm shadow-2xl relative overflow-hidden text-center">
          <h3 className="text-yellow-400 mb-5 text-2xl">
            Krishnova - Sacred Digital Ecosystem
          </h3>
          <p className="text-gray-100 mb-8">
            Where Ancient Wisdom Meets Modern Technology
            <br />
            Connecting Souls Through Divine Love
          </p>
          <div className="text-cyan-400">
            © 2024 Krishnova. All Rights Reserved. 🕉️
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
