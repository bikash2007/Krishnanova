import { useState } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#products", label: "Products" },
  { href: "#wisdom", label: "Wisdom Portal" },
  { href: "#community", label: "Community" },
  { href: "#contact", label: "Contact" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-lg py-5 shadow-sm">
      <div className=" mx-auto flex justify-evenly items-center px-4 md:px-8">
        {/* Logo */}
        <Link
          to={"/krishnanova"}
          className="font-playfair text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#f5d26c] to-[#ee6aa7] bg-clip-text text-transparent"
        >
          Krishnova
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={`/Krishnanova${item.href}`}
                className="text-white font-medium hover:text-[#f5d26c] hover:scale-105 transition-all"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-8">
          <Link
            to="/productpage"
            className="px-4 py-1  rounded-full bg-gradient-to-r from-[#01abfd] to-[#2e8b57] text-white shadow hover:brightness-110"
          >
            BUY
          </Link>
          <Link
            to="/admin"
            className="px-4 py-1 rounded-full bg-white text-[#2e8b57] border border-[#01abfd] shadow hover:bg-[#f0fbff]"
          >
            Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-[#0b132b]/90 backdrop-blur-md px-6 py-4 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={`/Krishnanova${item.href}`}
              className="block text-white py-1 hover:text-[#f5d26c] transition-all"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/productpage"
            className="block bg-gradient-to-r from-[#01abfd] to-[#2e8b57] text-white text-center py-2 rounded-full shadow hover:brightness-110"
            onClick={() => setOpen(false)}
          >
            BUY
          </Link>
          <Link
            to="/admin"
            className="block bg-white text-[#2e8b57] border border-[#01abfd] text-center py-2 rounded-full shadow hover:bg-[#f0fbff]"
            onClick={() => setOpen(false)}
          >
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
