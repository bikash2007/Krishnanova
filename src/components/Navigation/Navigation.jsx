import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingBag, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useApi } from "../../Context/baseUrl";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../Context/CartContext";

// Section nav items (scroll)
const sectionNavItems = [
  { id: "home", label: "Home" },
  { id: "products", label: "Products" },
  { id: "wisdom", label: "Wisdom Portal" },
  { id: "community", label: "Community" },
  { id: "contact", label: "Contact" },
];

// Utility function to get avatar URL
function getUserAvatarUrl(user, baseUrl) {
  if (!user?.avatar) return null;
  if (user.isGoogleUser && user.avatar.startsWith("http")) return user.avatar;
  if (user.avatar.startsWith("http")) return user.avatar;
  return baseUrl + user.avatar;
}

export default function Navigation() {
  const { cart } = useCart();
  const { user, logout, isAdmin, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const avatarRef = useRef(null);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const baseUrl = useApi();

  // Cursor tracking for glow effects (desktop only)
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Check if device supports hover (desktop)
    const hasHoverSupport = window.matchMedia("(hover: hover)").matches;
    if (!hasHoverSupport) return;

    let animationFrameId;
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;

    const handleMouseMove = (e) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      targetX = (x / rect.width) * 100;
      targetY = (y / rect.height) * 100;
    };

    const animatePosition = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      setMousePosition({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animatePosition);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      animatePosition();
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      targetX = 50;
      targetY = 50;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseenter", handleMouseEnter);
    nav.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseenter", handleMouseEnter);
      nav.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovered]);

  // Scroll to section by id or navigate home
  const scrollToSection = (id) => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate("/", { state: { scrollToId: id } });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitial = () => {
    if (user?.name) return user.name[0].toUpperCase();
    if (user?.username) return user.username[0].toUpperCase();
    return "U";
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl py-3 md:py-4 shadow-lg border-b border-gray-200/50 group"
      >
        {/* Background Glow Effect - Desktop only */}
        <div
          className="absolute inset-0 opacity-0 hidden md:block group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(59, 130, 246, 0.1) 0%,
              rgba(16, 185, 129, 0.08) 30%,
              rgba(245, 158, 11, 0.06) 60%,
              transparent 80%
            )`,
          }}
        />

        {/* Cursor Area Glow - Desktop only */}
        <div
          className="absolute inset-0 opacity-0 hidden md:block group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(200px circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(59, 130, 246, 0.15) 0%,
              rgba(16, 185, 129, 0.1) 50%,
              transparent 70%
            )`,
          }}
        />

        <div className="mx-auto flex justify-between items-center px-4 sm:px-6 md:px-12 relative z-10">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection("home")}
            className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#f5d26c] to-[#ee6aa7] bg-clip-text text-transparent relative flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Krishnova
            <div className="absolute inset-0 bg-gradient-to-r from-[#f5d26c] to-[#ee6aa7] opacity-0 hover:opacity-20 blur-lg transition-opacity duration-300 -z-10 hidden md:block" />
          </motion.button>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex space-x-4 xl:space-x-6">
            {sectionNavItems.map((item, index) => (
              <li key={item.id}>
                <motion.button
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-[#22223b] font-medium hover:text-[#f5d26c] transition-all duration-300 px-2 xl:px-3 py-2 rounded-lg group/nav text-sm xl:text-base"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f5d26c]/20 to-[#ee6aa7]/20 opacity-0 group-hover/nav:opacity-100 blur-sm transition-opacity duration-300 rounded-lg -z-10" />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#f5d26c] to-[#ee6aa7] group-hover/nav:w-full transition-all duration-300" />
                </motion.button>
              </li>
            ))}
          </ul>

          {/* Right Side: Cart + BUY + Auth/avatar */}
          <div className="flex gap-2 sm:gap-3 md:gap-4 items-center">
            {/* Cart Icon */}
            <Link to="/cart" className="relative group p-2 md:p-0">
              <FaShoppingCart className="text-[#01abfd] text-xl md:text-2xl transition-transform duration-200 group-hover:scale-110" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-[#f4c430] text-[#0f1f2e] text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center leading-none">
                  {cart.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              )}
            </Link>

            {/* BUY Button - Fixed hover issue */}
            <motion.div className="relative">
              <Link
                to="/productpage"
                className="relative px-3 sm:px-4 md:px-6 py-2 rounded-full bg-gradient-to-r from-[#01abfd] to-[#2e8b57] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-1 sm:gap-2 font-semibold text-sm md:text-base group/buylink overflow-hidden"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -top-10 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-0 group-hover/buylink:opacity-100 group-hover/buylink:animate-pulse transition-opacity duration-300" />

                {/* Icon with hover animation */}
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex-shrink-0"
                >
                  <FaShoppingBag size={14} className="md:w-4 md:h-4" />
                </motion.div>

                {/* Text */}
                <span className="relative z-10 whitespace-nowrap">BUY</span>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0189d1] to-[#2e8b57] opacity-0 group-hover/buylink:opacity-100 transition-opacity duration-300 rounded-full" />
              </Link>
            </motion.div>

            {/* Login Button */}
            {!loading && !user && (
              <motion.div className="relative">
                <Link
                  to="/login"
                  className="relative px-3 sm:px-4 py-2 rounded-full bg-white text-[#2e8b57] border-2 border-[#01abfd]/30 shadow-md hover:shadow-lg hover:border-[#01abfd] hover:bg-[#f0fbff] transition-all duration-300 font-medium text-sm whitespace-nowrap"
                >
                  Login
                </Link>
              </motion.div>
            )}

            {/* User Avatar/Dropdown */}
            {!loading && user && (
              <div className="relative">
                <motion.button
                  ref={avatarRef}
                  className="flex items-center gap-1 sm:gap-2 focus:outline-none group/avatar relative p-1"
                  onClick={() => setUserDropdown((v) => !v)}
                  onBlur={() => setTimeout(() => setUserDropdown(false), 150)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Avatar glow - desktop only */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#01abfd]/40 to-[#2e8b57]/40 opacity-0 hidden md:block group-hover/avatar:opacity-100 blur-lg transition-opacity duration-300 rounded-full scale-125" />

                  {user.avatar ? (
                    <img
                      src={getUserAvatarUrl(user, baseUrl)}
                      alt={user.name}
                      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-cover rounded-full border-2 border-[#01abfd] shadow-lg transition-shadow duration-300 flex-shrink-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://ui-avatars.com/api/?name=" +
                          encodeURIComponent(user.name || user.username || "U");
                      }}
                    />
                  ) : (
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#01abfd] to-[#2e8b57] flex items-center justify-center text-white text-sm md:text-xl font-bold border-2 border-[#01abfd] shadow-lg transition-shadow duration-300 flex-shrink-0">
                      {getInitial()}
                    </div>
                  )}

                  <span className="hidden sm:inline text-[#01abfd] font-semibold text-sm md:text-base truncate max-w-20 md:max-w-none">
                    {user.name?.split(" ")[0]}
                  </span>

                  <motion.svg
                    className="w-3 h-3 md:w-4 md:h-4 text-[#01abfd] flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    animate={{ rotate: userDropdown ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </motion.button>

                <AnimatePresence>
                  {userDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-44 sm:w-48 bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl border border-[#01abfd]/30 py-2 z-50 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#01abfd]/5 to-[#2e8b57]/5 pointer-events-none" />

                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-[#0189d1] hover:bg-[#f0fbff] transition-all duration-200 relative group/item text-sm"
                        onClick={() => setUserDropdown(false)}
                      >
                        <FaUser size={12} />
                        <span>Profile</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#01abfd]/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" />
                      </Link>

                      <Link
                        to="/orders"
                        className="flex items-center gap-3 px-4 py-3 text-[#0189d1] hover:bg-[#f0fbff] transition-all duration-200 text-sm"
                        onClick={() => setUserDropdown(false)}
                      >
                        <FaShoppingBag size={12} />
                        <span>My Orders</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center gap-3 px-4 py-3 text-[#2e8b57] hover:bg-[#e8fbe8] transition-all duration-200 relative group/item text-sm"
                          onClick={() => setUserDropdown(false)}
                        >
                          <FaCog size={12} />
                          <span>Admin Dashboard</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#2e8b57]/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" />
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-[#ee6aa7] hover:bg-[#fae2ef] transition-all duration-200 relative group/item text-sm"
                      >
                        <FaSignOutAlt size={12} />
                        <span>Logout</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#ee6aa7]/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden text-[#01abfd] focus:outline-none relative group/mobile p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#01abfd]/20 to-[#2e8b57]/20 opacity-0 group-hover/mobile:opacity-100 blur-sm transition-opacity duration-300 rounded-lg" />
              <motion.svg
                className="w-6 h-6 md:w-7 md:h-7 relative z-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                animate={{ rotate: menuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {menuOpen ? (
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
              </motion.svg>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 lg:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {sectionNavItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 text-[#22223b] font-medium hover:text-[#f5d26c] hover:bg-gradient-to-r hover:from-[#f5d26c]/10 hover:to-[#ee6aa7]/10 rounded-lg transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
