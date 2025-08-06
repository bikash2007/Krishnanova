import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import { useApi } from "../../Context/baseUrl";

const Footer = () => {
  const footerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const { user } = useAuth();
  const baseUrl = useApi();

  // Pre-fill email if user is logged in
  useEffect(() => {
    if (user?.email && !email) {
      setEmail(user.email);
    }
  }, [user, email]);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    let animationFrameId;
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;

    const handleMouseMove = (e) => {
      const rect = footer.getBoundingClientRect();
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

    footer.addEventListener("mousemove", handleMouseMove);
    footer.addEventListener("mouseenter", handleMouseEnter);
    footer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      footer.removeEventListener("mousemove", handleMouseMove);
      footer.removeEventListener("mouseenter", handleMouseEnter);
      footer.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovered]);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleSendMessage = async () => {
    if (!email?.trim() || !message?.trim()) {
      setEmailStatus("error");
      setStatusMessage("Please fill in both email and message fields!");
      setTimeout(() => {
        setEmailStatus(null);
        setStatusMessage("");
      }, 5000);
      return;
    }

    if (message.trim().length < 10) {
      setEmailStatus("error");
      setStatusMessage("Message must be at least 10 characters long.");
      setTimeout(() => {
        setEmailStatus(null);
        setStatusMessage("");
      }, 5000);
      return;
    }

    setIsLoading(true);
    setEmailStatus(null);
    setStatusMessage("");

    try {
      const response = await fetch(`${baseUrl}/api/contact/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          message: message.trim(),
          userName: user?.name || email.split("@")[0],
          userInfo: user
            ? `Logged in as: ${user.name} (${user.email}) - Role: ${
                user.role || "user"
              }`
            : "Anonymous visitor",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setEmailStatus("success");
        setStatusMessage(data.message);
        setEmail("");
        setMessage("");
        setTimeout(() => {
          setEmailStatus(null);
          setStatusMessage("");
        }, 8000);
      } else {
        setEmailStatus("error");
        setStatusMessage(
          data.message || "Failed to send message. Please try again."
        );
        setTimeout(() => {
          setEmailStatus(null);
          setStatusMessage("");
        }, 6000);
      }
    } catch (error) {
      setEmailStatus("error");
      setStatusMessage(
        "Network error. Please check your connection and try again."
      );
      setTimeout(() => {
        setEmailStatus(null);
        setStatusMessage("");
      }, 6000);
    } finally {
      setIsLoading(false);
    }
  };

  const socialLinks = [
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "https://instagram.com/krishnova",
      color: "from-pink-500 to-purple-500",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      url: "https://twitter.com/krishnova",
      color: "from-blue-400 to-blue-600",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      url: "https://youtube.com/@krishnova",
      color: "from-red-500 to-red-600",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      url: "https://wa.me/15555474746",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/50 py-20 text-gray-800 overflow-hidden"
    >
      {/* Light Theme Background Glow Effects */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-1000 blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.2) 0%,rgba(16, 185, 129, 0.15) 30%,rgba(245, 158, 11, 0.1) 60%,transparent 80%)`,
        }}
      />
      {/* Secondary Glow */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-60 transition-opacity duration-700 blur-2xl pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%,rgba(99, 102, 241, 0.15) 0%,rgba(34, 197, 94, 0.1) 50%,transparent 70%)`,
        }}
      />
      {/* Light Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl opacity-10"
            style={{
              width: `${150 + i * 50}px`,
              height: `${150 + i * 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(${
                Math.random() * 360
              }deg, rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.15), rgba(245, 158, 11, 0.1))`,
            }}
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container max-w-7xl mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-12 border border-gray-200/50 shadow-2xl overflow-hidden group"
        >
          {/* Light Theme Cursor Glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
            style={{
              background: `radial-gradient(400px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.08) 0%,rgba(16, 185, 129, 0.06) 40%,rgba(245, 158, 11, 0.04) 60%,transparent 80%)`,
            }}
          />

          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h3
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-6 font-playfair cursor-pointer"
              style={{
                textShadow: isHovered
                  ? "0 0 30px rgba(59, 130, 246, 0.3)"
                  : undefined,
              }}
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection("home")}
            >
              Krishnova
            </motion.h3>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Where Ancient Wisdom Meets Modern Technology
              <br />
              <span className="text-blue-600 font-medium">
                Connecting Souls Through Divine Love
              </span>
            </motion.p>
          </div>

          {/* Content Grid - 2 Columns */}
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            {/* Company Info & Social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              <div>
                <h4 className="text-2xl font-semibold text-blue-700 mb-6">
                  Sacred Digital Ecosystem
                </h4>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Bridging the gap between spirituality and technology, creating
                  meaningful connections in the digital age.
                </p>
                <div className="flex items-center gap-2 text-emerald-600 mb-8">
                  <span>🕉️</span>
                  <span>Est. 2024 • Made with 💙 for spiritual seekers</span>
                </div>
              </div>
              {/* Contact Info */}
              <div className="space-y-4">
                <h5 className="text-lg font-semibold text-blue-700">
                  Connect With Us
                </h5>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <span>📧</span>
                    <a
                      href="mailto:hello@krishnova.com"
                      className="hover:text-blue-600 transition-colors"
                    >
                      hello@krishnova.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <span>📞</span>
                    <a
                      href="tel:+15555474746"
                      className="hover:text-blue-600 transition-colors"
                    >
                      +1 (555) KRISHNA
                    </a>
                  </div>
                </div>
              </div>
              {/* Social Links */}
              <div>
                <h5 className="text-lg font-semibold text-blue-700 mb-4">
                  Follow Our Journey
                </h5>
                <div className="flex gap-4">
                  {socialLinks.map((social, idx) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          boxShadow: isHovered
                            ? `0 0 20px rgba(59, 130, 246, 0.4)`
                            : undefined,
                        }}
                      >
                        <IconComponent size={20} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Send Message Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h4 className="text-2xl font-semibold text-blue-700">
                Send Us a Message
              </h4>
              <p className="text-gray-600">
                Have questions about our sacred products or spiritual
                technology? We'd love to hear from you!
              </p>
              {/* Status Messages */}
              {emailStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border flex items-start gap-3 ${
                    emailStatus === "success"
                      ? "bg-green-50 border-green-200 text-green-700"
                      : "bg-red-50 border-red-200 text-red-700"
                  }`}
                >
                  {emailStatus === "success" ? (
                    <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <FaExclamationTriangle className="text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium">
                      {emailStatus === "success" ? "Message Sent!" : "Oops!"}
                    </p>
                    <p className="text-sm">{statusMessage}</p>
                  </div>
                </motion.div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email{" "}
                    {user && (
                      <span className="text-blue-600">(from your account)</span>
                    )}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your spiritual journey or ask any questions..."
                    rows={4}
                    disabled={isLoading}
                    maxLength={1000}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {message.length}/1000 characters
                  </div>
                </div>
                <motion.button
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className={`w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-400 hover:to-emerald-400 text-white"
                  }`}
                  style={{
                    boxShadow:
                      isHovered && !isLoading
                        ? `0 0 25px rgba(59, 130, 246, 0.3)`
                        : undefined,
                  }}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("products")}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              🛍️ Shop Sacred Items
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("wisdom")}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              📚 Wisdom Portal
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("community")}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              🤝 Join Community
            </motion.button>
          </motion.div>

          {/* Bottom Section */}
          <div className="border-t border-gray-300/50 pt-8 text-center">
            <motion.div
              className="text-blue-600 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              © 2024 Krishnova. All Rights Reserved.
              <span className="mx-2">•</span>
              Sacred Digital Ecosystem
              <span className="mx-2">•</span>
              <span className="text-amber-500">🕉️</span>
            </motion.div>
          </div>

          {/* Light Theme Floating Sparkles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-100"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + i * 12}%`,
                  boxShadow: "0 0 10px currentColor",
                }}
                animate={
                  isHovered
                    ? {
                        y: [-10, -30, -10],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                      }
                    : { y: 0, opacity: 0, scale: 0 }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
