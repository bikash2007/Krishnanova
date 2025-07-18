import React from "react";
import { handleSmoothScroll } from "../../utils/animations";

const Navigation = () => {
  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#products", label: "Products" },
    { href: "#wisdom", label: "Wisdom Portal" },
    { href: "#community", label: "Community" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-blue-900/10 backdrop-blur-md py-5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8">
        <div className="font-playfair text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
          Krishnova
        </div>
        <ul className="hidden md:flex space-x-8">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="text-gray-100 hover:text-yellow-400 transition-all duration-300 hover:-translate-y-1"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
