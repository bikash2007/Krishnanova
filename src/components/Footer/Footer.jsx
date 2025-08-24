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
import logo from "../../../public/logo.png";

const Footer = () => {
  const footerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const { user } = useAuth();
  const baseUrl = useApi();

  // **Minimal Dark Blue Color Palette**
  const colors = {
    primary: "#1e40af", // Royal Blue
    secondary: "#2563eb", // Bright Blue
    accent: "#3b82f6", // Light Blue
    dark: "#1e3a8a", // Dark Blue
    neutral: "#64748b", // Slate Gray
    light: "#f8fafc", // Almost White
    white: "#ffffff",
    success: "#10b981", // Green accent
    danger: "#ef4444", // Red for errors
  };

  // Clean title styles
  const titleStyle = {
    color: colors.dark,
    fontWeight: "bold",
  };

  const highlightStyle = {
    color: colors.primary,
    fontWeight: "600",
  };

  useEffect(() => {
    if (user?.email && !email) setEmail(user.email);
  }, [user, email]);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      });
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSendMessage = async () => {
    if (!email?.trim() || !message?.trim()) {
      setEmailStatus("error");
      setStatusMessage("Please fill in both email and message fields.");
      setTimeout(() => {
        setEmailStatus(null);
        setStatusMessage("");
      }, 4000);
      return;
    }
    if (message.trim().length < 10) {
      setEmailStatus("error");
      setStatusMessage("Message must be at least 10 characters long.");
      setTimeout(() => {
        setEmailStatus(null);
        setStatusMessage("");
      }, 4000);
      return;
    }

    setIsLoading(true);
    setEmailStatus(null);
    setStatusMessage("");

    try {
      const res = await fetch(`${baseUrl}/api/contact/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          message: message.trim(),
          userName: user?.name || email.split("@")[0],
          userInfo: user
            ? `Logged in as: ${user.name} (${user.email})`
            : "Anonymous visitor",
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEmailStatus("success");
        setStatusMessage(data.message);
        setEmail("");
        setMessage("");
      } else {
        setEmailStatus("error");
        setStatusMessage(data.message || "Failed to send. Please try again.");
      }
    } catch {
      setEmailStatus("error");
      setStatusMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setEmailStatus(null);
        setStatusMessage("");
      }, 4000);
    }
  };

  const social = [
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "https://instagram.com/krishnova",
    },
    { name: "Twitter", icon: FaTwitter, url: "https://twitter.com/krishnova" },
    { name: "YouTube", icon: FaYoutube, url: "https://youtube.com/@krishnova" },
    { name: "WhatsApp", icon: FaWhatsapp, url: "https://wa.me/15555474746" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative py-20 overflow-hidden"
      style={{ background: "transparent" }}
    >
      <div className="container max-w-7xl mx-auto px-6 md:px-8 relative">
        {/* Clean Glass Panel */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative rounded-3xl border shadow-lg p-10 md:p-12 overflow-hidden bg-white"
          style={{
            borderColor: colors.light,
            boxShadow: `0 20px 40px ${colors.primary}10`,
            background:
              mouse.x || mouse.y
                ? `
                white,
                radial-gradient(420px circle at ${mouse.x}% ${mouse.y}%,
                  ${colors.primary}08 0%,
                  ${colors.secondary}05 35%,
                  transparent 70%)
                `
                : "white",
          }}
        >
          {/* Header */}
          <div className="text-center mb-12 relative z-10">
            <div className="inline-flex items-center justify-center mb-3">
              <img src={logo} alt="Krishnova" className="h-10 mr-3" />
              <motion.h3
                className="text-3xl md:text-4xl font-extrabold font-playfair"
                style={titleStyle}
              >
                Krishnova
              </motion.h3>
            </div>

            <p
              className="max-w-2xl mx-auto leading-relaxed"
              style={{ color: colors.neutral }}
            >
              Where Ancient Wisdom Meets Modern Technology
            </p>
            <p style={{ color: colors.neutral }}>
              <span style={highlightStyle}>
                Connecting Souls Through Divine Love
              </span>
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-10 mb-12 relative z-10">
            {/* Info & Social */}
            <div className="space-y-8">
              <div>
                <h4
                  className="text-xl font-semibold mb-3"
                  style={{ color: colors.primary }}
                >
                  Sacred Digital Ecosystem
                </h4>
                <p style={{ color: colors.neutral }}>
                  Bridging spirituality and technology to create meaningful
                  connections.
                </p>
                <div
                  className="flex items-center gap-2 mt-4"
                  style={{ color: colors.neutral }}
                >
                  <span>🕉️</span>
                  <span>Est. 2024 • Built for spiritual seekers</span>
                </div>
              </div>

              <div className="space-y-4">
                <h5
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: colors.neutral }}
                >
                  Connect with us
                </h5>
                <div className="space-y-3">
                  <a
                    href="mailto:hello@krishnova.com"
                    className="flex items-center gap-3 transition-colors"
                    style={{ color: colors.neutral }}
                    onMouseEnter={(e) =>
                      (e.target.style.color = colors.primary)
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = colors.neutral)
                    }
                  >
                    <span>📧</span> hello@krishnova.com
                  </a>
                  <a
                    href="tel:+15555474746"
                    className="flex items-center gap-3 transition-colors"
                    style={{ color: colors.neutral }}
                    onMouseEnter={(e) =>
                      (e.target.style.color = colors.primary)
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = colors.neutral)
                    }
                  >
                    <span>📞</span> +1 (555) KRISHNA
                  </a>
                </div>
              </div>

              <div>
                <h5
                  className="text-sm font-semibold uppercase tracking-wider mb-3"
                  style={{ color: colors.neutral }}
                >
                  Social
                </h5>
                <div className="flex gap-3">
                  {social.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border bg-white flex items-center justify-center transition relative overflow-hidden"
                        style={{
                          borderColor: colors.light,
                          color: colors.neutral,
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = colors.primary;
                          e.target.style.borderColor = colors.primary;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = colors.neutral;
                          e.target.style.borderColor = colors.light;
                        }}
                      >
                        {/* Blue shimmer on hover */}
                        <motion.span
                          className="absolute inset-0 pointer-events-none"
                          initial={{ x: "-120%" }}
                          whileHover={{ x: "120%" }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          style={{
                            background: `linear-gradient(90deg, transparent, ${colors.primary}25, transparent)`,
                          }}
                        />
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-5">
              <h4
                className="text-xl font-semibold"
                style={{ color: colors.primary }}
              >
                Send Us a Message
              </h4>
              <p style={{ color: colors.neutral }}>
                Questions about our sacred products or spiritual technology?
                We'd love to hear from you.
              </p>

              {emailStatus && (
                <div
                  className={`p-3 rounded-lg border flex items-start gap-2 ${
                    emailStatus === "success"
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  {emailStatus === "success" ? (
                    <FaCheckCircle
                      className="mt-0.5"
                      style={{ color: colors.success }}
                    />
                  ) : (
                    <FaExclamationTriangle
                      className="mt-0.5"
                      style={{ color: colors.danger }}
                    />
                  )}
                  <div>
                    <p
                      className="font-medium"
                      style={{
                        color:
                          emailStatus === "success"
                            ? colors.success
                            : colors.danger,
                      }}
                    >
                      {emailStatus === "success" ? "Message sent" : "Error"}
                    </p>
                    <p
                      className="text-sm"
                      style={{
                        color:
                          emailStatus === "success"
                            ? colors.success
                            : colors.danger,
                      }}
                    >
                      {statusMessage}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label
                    className="block text-xs font-medium mb-2"
                    style={{ color: colors.neutral }}
                  >
                    Your Email{" "}
                    {user && (
                      <span style={{ color: colors.primary }}>
                        (from your account)
                      </span>
                    )}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={isLoading}
                    className="w-full px-4 py-3 rounded-xl border bg-white transition disabled:opacity-60"
                    style={{
                      borderColor: colors.light,
                      color: colors.dark,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.primary;
                      e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.light;
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-medium mb-2"
                    style={{ color: colors.neutral }}
                  >
                    Your Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Share your spiritual journey or ask any questions..."
                    disabled={isLoading}
                    maxLength={1000}
                    className="w-full px-4 py-3 rounded-xl border bg-white transition resize-none disabled:opacity-60"
                    style={{
                      borderColor: colors.light,
                      color: colors.dark,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = colors.primary;
                      e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.light;
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <div
                    className="text-right text-xs mt-1"
                    style={{ color: colors.neutral }}
                  >
                    {message.length}/1000
                  </div>
                </div>

                {/* Clean blue send button */}
                <motion.button
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="w-full px-6 py-3 rounded-xl font-semibold text-white shadow-sm transition relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    boxShadow: `0 4px 12px ${colors.primary}30`,
                  }}
                >
                  {/* shimmer */}
                  <motion.span
                    className="absolute inset-0 opacity-25"
                    initial={{ x: "-120%" }}
                    animate={{ x: ["-120%", "120%"] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,.4), transparent)",
                    }}
                  />
                  <span className="relative inline-flex items-center gap-2">
                    {isLoading ? (
                      <>
                        <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane size={14} />
                        Send Message
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 relative z-10">
            {[
              { label: "🛍️ Shop Sacred Items", id: "products" },
              { label: "📚 Wisdom Portal", id: "wisdom" },
              { label: "🤝 Join Community", id: "community" },
            ].map((cta) => (
              <button
                key={cta.id}
                onClick={() => scrollToSection(cta.id)}
                className="px-5 py-2.5 rounded-xl border bg-white transition"
                style={{
                  borderColor: colors.light,
                  color: colors.neutral,
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.light;
                  e.target.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = colors.white;
                  e.target.style.color = colors.neutral;
                }}
              >
                {cta.label}
              </button>
            ))}
          </div>

          {/* Bottom */}
          <div
            className="border-t pt-6 text-center text-sm relative z-10"
            style={{
              borderColor: colors.light,
              color: colors.neutral,
            }}
          >
            © 2024{" "}
            <span style={{ color: colors.primary, fontWeight: "600" }}>
              Krishnova
            </span>{" "}
            • Sacred Digital Ecosystem • 🕉️
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
