import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../../Context/baseUrl";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaUsers,
  FaGlobe,
  FaBlog,
  FaArrowRight,
  FaComment,
  FaShareAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCrown,
  FaPray,
  FaEye,
  FaBookOpen,
  FaStar,
  FaFire,
  FaUserFriends,
  FaLightbulb,
  FaChevronRight,
  FaDotCircle,
  FaTicketAlt,
  FaHands,
} from "react-icons/fa";

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
  warning: "#f59e0b", // Amber
  danger: "#ef4444", // Red
};

// Interactive background box (minimal version)
const InteractiveBox = ({ children, className }) => {
  const ref = useRef(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const el = ref.current;
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

  return (
    <div
      ref={ref}
      className={className}
      style={{
        background: `radial-gradient(400px circle at ${mouse.x}% ${mouse.y}%,
          ${colors.primary}08 0%,
          ${colors.secondary}04 40%,
          transparent 70%)`,
      }}
    >
      {children}
    </div>
  );
};

// Enhanced Creative Particles
const CreativeParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Floating Sacred Symbols */}
    {[...Array(8)].map((_, i) => {
      const symbols = ["🕉️", "🪷", "⭐", "💫", "🌙", "🔮", "✨", "🙏"];
      const symbol = symbols[i % symbols.length];

      return (
        <motion.div
          key={`symbol-${i}`}
          className="absolute text-lg opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            color: [colors.primary, colors.secondary, colors.accent][i % 3],
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        >
          {symbol}
        </motion.div>
      );
    })}

    {/* Geometric Shapes */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={`shape-${i}`}
        className="absolute"
        style={{
          width: `${Math.random() * 8 + 4}px`,
          height: `${Math.random() * 8 + 4}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `linear-gradient(45deg, ${colors.primary}30, ${colors.secondary}30)`,
          borderRadius: i % 2 === 0 ? "50%" : "2px",
          boxShadow: `0 0 10px ${
            [colors.primary, colors.secondary, colors.accent][i % 3]
          }20`,
        }}
        animate={{
          x: [0, Math.random() * 200 - 100, 0],
          y: [0, Math.random() * 200 - 100, 0],
          scale: [1, Math.random() + 0.5, 1],
          opacity: [0.2, 0.6, 0.2],
          rotate: i % 2 === 0 ? [0, 360] : [0, -360],
        }}
        transition={{
          duration: Math.random() * 15 + 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 3,
        }}
      />
    ))}

    {/* Connecting Lines */}
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={`line-${i}`}
        className="absolute opacity-10"
        style={{
          width: `${Math.random() * 100 + 50}px`,
          height: "1px",
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `linear-gradient(90deg, transparent, ${colors.primary}60, transparent)`,
          transformOrigin: "center",
        }}
        animate={{
          rotate: [0, 360],
          scaleX: [0.5, 1.5, 0.5],
          opacity: [0.05, 0.2, 0.05],
        }}
        transition={{
          duration: Math.random() * 25 + 20,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 5,
        }}
      />
    ))}

    {/* Pulsing Dots */}
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={`dot-${i}`}
        className="absolute rounded-full"
        style={{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: `radial-gradient(circle, ${
            [colors.primary, colors.secondary, colors.accent][i % 3]
          }40 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, Math.random() * 3 + 2, 1],
          opacity: [0.1, 0.4, 0.1],
          x: [0, Math.random() * 50 - 25, 0],
          y: [0, Math.random() * 50 - 25, 0],
        }}
        transition={{
          duration: Math.random() * 8 + 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 3,
        }}
      />
    ))}
  </div>
);

// Clean Avatar component
const Avatar = ({ user, size = "w-12 h-12", baseUrl, showOnline = false }) => {
  const [imageError, setImageError] = useState(false);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);

  const getAvatarUrl = () => {
    if (imageError) return null;
    if (!user?.avatar) return null;
    if (user.avatar.startsWith("http")) return user.avatar;
    return `${baseUrl}${user.avatar.startsWith("/") ? "" : "/"}${user.avatar}`;
  };

  const handleImageError = () => {
    if (!hasTriedFallback) {
      setHasTriedFallback(true);
      setImageError(true);
    } else setImageError(true);
  };

  const avatarUrl = getAvatarUrl();
  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="relative">
      <motion.div whileHover={{ scale: 1.05 }}>
        {avatarUrl && !imageError ? (
          <img
            src={avatarUrl}
            alt={user?.name || "User"}
            className={`${size} rounded-full object-cover border-2 shadow-sm`}
            style={{ borderColor: colors.light }}
            onError={handleImageError}
          />
        ) : (
          <div
            className={`${size} rounded-full border-2 shadow-sm flex items-center justify-center text-white font-bold`}
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              borderColor: colors.light,
              fontSize: size.includes("w-11") ? "14px" : "16px",
            }}
          >
            {initial}
          </div>
        )}
      </motion.div>
      {showOnline && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white rounded-full"
          style={{ backgroundColor: colors.success }}
        />
      )}
    </div>
  );
};

// Clean role badge
const UserBadge = ({ user, size = "sm" }) => {
  const sizeClasses = { sm: "px-2 py-0.5 text-xs", md: "px-3 py-1 text-sm" };
  const isAdmin = user?.role === "admin";
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex items-center space-x-1 rounded-full text-white font-semibold ${sizeClasses[size]}`}
      style={{
        background: isAdmin
          ? `linear-gradient(135deg, ${colors.warning}, ${colors.danger})`
          : `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
      }}
    >
      {isAdmin ? <FaCrown size={10} /> : <FaPray size={10} />}
      <span>{isAdmin ? "ADMIN" : "DEVOTEE"}</span>
    </motion.div>
  );
};

// Clean event card
const EventCard = ({ event, baseUrl, index }) => {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const headerGradient = (type) => {
    const map = {
      meditation: `linear-gradient(135deg, ${colors.primary}, ${colors.dark})`,
      prayer: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
      discourse: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`,
      festival: `linear-gradient(135deg, ${colors.warning}, ${colors.danger})`,
      community_service: `linear-gradient(135deg, ${colors.success}, ${colors.accent})`,
      other: `linear-gradient(135deg, ${colors.neutral}, ${colors.dark})`,
    };
    return map[type] || map.other;
  };

  const typeIcon = {
    meditation: <FaHands className="text-white text-lg" />,
    prayer: <FaPray className="text-white text-lg" />,
    discourse: <FaBookOpen className="text-white text-lg" />,
    festival: <FaStar className="text-white text-lg" />,
    community_service: <FaUsers className="text-white text-lg" />,
    other: <FaCalendarAlt className="text-white text-lg" />,
  }[event.eventType || "other"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group"
    >
      <div
        className="rounded-3xl border overflow-hidden transition bg-white shadow-lg"
        style={{
          borderColor: colors.light,
          boxShadow: `0 10px 30px ${colors.primary}10`,
        }}
      >
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                style={{ background: headerGradient(event.eventType) }}
              >
                {typeIcon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4
                    className="font-semibold text-sm"
                    style={{ color: colors.dark }}
                  >
                    {event.organizer?.name}
                  </h4>
                  <UserBadge user={event.organizer} size="sm" />
                </div>
                <p className="text-xs" style={{ color: colors.neutral }}>
                  Event Organizer
                </p>
              </div>
            </div>
            <span
              className="px-2 py-1 text-xs font-semibold rounded-full text-white"
              style={{
                background: colors.success,
              }}
            >
              LIVE
            </span>
          </div>

          <h3
            className="font-bold text-lg mb-3 leading-tight"
            style={{ color: colors.dark }}
          >
            {event.title}
          </h3>

          <div
            className="space-y-2 mb-4 text-sm"
            style={{ color: colors.neutral }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded flex items-center justify-center"
                style={{ backgroundColor: colors.accent }}
              >
                <FaCalendarAlt className="text-white text-[10px]" />
              </div>
              <span>{formatDate(event.dateTime)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded flex items-center justify-center"
                style={{ backgroundColor: colors.warning }}
              >
                <FaMapMarkerAlt className="text-white text-[10px]" />
              </div>
              <span className="truncate">{event.location?.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded flex items-center justify-center"
                style={{ backgroundColor: colors.success }}
              >
                <FaUsers className="text-white text-[10px]" />
              </div>
              <span>{event.participants?.length || 0} joined</span>
            </div>
          </div>
        </div>

        {event.image && (
          <div className="px-6 pb-4">
            <div
              className="relative overflow-hidden rounded-xl border"
              style={{ borderColor: colors.light }}
            >
              <img
                src={
                  event.image.startsWith("http")
                    ? event.image
                    : useApi() + event.image
                }
                alt="Event"
                className="w-full h-32 object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            </div>
          </div>
        )}

        <div className="p-6 pt-0">
          <Link to="/communityblog">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 text-white rounded-xl font-semibold shadow-sm hover:shadow-md transition flex items-center justify-center gap-2"
              style={{ background: headerGradient(event.eventType) }}
            >
              <FaTicketAlt size={14} />
              <span>Join Sacred Event</span>
              <FaArrowRight size={12} />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Clean post card
const SocialPostCard = ({ post, baseUrl, index }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const d = new Date(date);
    const diff = Math.floor((now - d) / (1000 * 60));
    if (diff < 1) return "now";
    if (diff < 60) return `${diff}m`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h`;
    return `${Math.floor(diff / 1440)}d`;
  };

  const truncate = (t, max = 120) =>
    t.length <= max ? t : t.slice(0, max) + "...";

  const engagement = {
    likes: Math.floor(Math.random() * 50) + (post.likes?.length || 0),
    comments: Math.floor(Math.random() * 15) + 2,
    shares: Math.floor(Math.random() * 8) + 1,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group"
    >
      <div
        className="rounded-3xl border overflow-hidden bg-white shadow-lg"
        style={{
          borderColor: colors.light,
          boxShadow: `0 10px 30px ${colors.primary}10`,
        }}
      >
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar
                user={post.author}
                baseUrl={baseUrl}
                size="w-11 h-11"
                showOnline={Math.random() > 0.6}
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4
                    className="font-semibold text-sm"
                    style={{ color: colors.dark }}
                  >
                    {post.author?.name || "Anonymous"}
                  </h4>
                  <UserBadge user={post.author} size="sm" />
                </div>
                <div
                  className="flex items-center gap-2 text-xs"
                  style={{ color: colors.neutral }}
                >
                  <span>{formatTimeAgo(post.createdAt)}</span>
                  <FaDotCircle size={3} />
                  <FaGlobe size={10} />
                  <span>Public</span>
                </div>
              </div>
            </div>

            {engagement.likes > 30 && (
              <span
                className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full text-white"
                style={{
                  backgroundColor: colors.danger,
                }}
              >
                <FaFire size={10} />
                <span>Trending</span>
              </span>
            )}
          </div>

          <Link to={`/blog/${post._id}`}>
            <h3
              className="font-bold text-xl mb-3 leading-tight cursor-pointer"
              style={{ color: colors.dark }}
            >
              {post.title}
            </h3>
          </Link>

          <div
            className="mb-4 text-sm leading-relaxed"
            style={{ color: colors.neutral }}
          >
            <p>{showFullText ? post.content : truncate(post.content, 100)}</p>
            {post.content.length > 100 && (
              <button
                onClick={() => setShowFullText(!showFullText)}
                className="font-medium text-sm ml-1 hover:underline"
                style={{ color: colors.primary }}
              >
                {showFullText ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        </div>

        {post.image && (
          <div className="px-6 pb-4">
            <Link to={`/blog/${post._id}`}>
              <div
                className="relative overflow-hidden rounded-xl border group/image cursor-pointer"
                style={{ borderColor: colors.light }}
              >
                <img
                  src={
                    post.image.startsWith("http")
                      ? post.image
                      : baseUrl + post.image
                  }
                  alt="Post"
                  className="w-full h-48 object-cover group-hover/image:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div
                    className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 px-4 py-2 rounded-full text-white text-sm flex items-center gap-2 border"
                    style={{
                      background: `${colors.primary}E0`,
                      borderColor: colors.white,
                    }}
                  >
                    <FaEye size={14} />
                    <span>Read Full Post</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-1 transition-colors ${
                  isLiked ? "text-red-500" : "hover:text-red-500"
                }`}
                style={{ color: isLiked ? colors.danger : colors.neutral }}
              >
                {isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                <span className="text-sm font-medium">{engagement.likes}</span>
              </motion.button>

              <button
                className="flex items-center gap-1 transition-colors hover:text-blue-500"
                style={{ color: colors.neutral }}
              >
                <FaComment size={16} />
                <span className="text-sm font-medium">
                  {engagement.comments}
                </span>
              </button>

              <button
                className="flex items-center gap-1 transition-colors hover:text-blue-500"
                style={{ color: colors.neutral }}
              >
                <FaShareAlt size={14} />
                <span className="text-sm font-medium">{engagement.shares}</span>
              </button>
            </div>

            <button
              className="transition-colors hover:text-yellow-500"
              style={{ color: colors.neutral }}
            >
              <FaStar size={16} />
            </button>
          </div>

          <Link to={`/blog/${post._id}`}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-4 rounded-xl border cursor-pointer transition bg-gray-50"
              style={{
                borderColor: colors.light,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    }}
                  >
                    <FaBookOpen className="text-white text-xs" />
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: colors.dark }}
                    >
                      Continue Reading
                    </div>
                    <div className="text-xs" style={{ color: colors.neutral }}>
                      Explore the full divine story
                    </div>
                  </div>
                </div>
                <FaChevronRight size={14} style={{ color: colors.neutral }} />
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Clean stats card
const StatsCard = ({ icon, value, label, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -6, scale: 1.03 }}
  >
    <div
      className="rounded-2xl border text-center p-6 bg-white shadow-sm"
      style={{
        borderColor: colors.light,
      }}
    >
      <div
        className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center shadow-sm"
        style={{ background: color }}
      >
        {icon}
      </div>
      <div className="text-2xl font-bold mb-1" style={{ color: colors.dark }}>
        {value}
      </div>
      <div className="text-sm font-medium" style={{ color: colors.neutral }}>
        {label}
      </div>
    </div>
  </motion.div>
);

const Community = () => {
  const [topPosts, setTopPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    members: 0,
    posts: 0,
    cities: 0,
    events: 0,
  });
  const baseUrl = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, eventsRes] = await Promise.all([
          axios.get(import.meta.env.VITE_API_URL + "/blog"),
          axios
            .get(import.meta.env.VITE_API_URL + "/community-events")
            .catch(() => ({ data: [] })),
        ]);
        const sorted = postsRes.data
          .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
          .slice(0, 4);

        setTopPosts(sorted);
        setEvents(eventsRes.data.slice(0, 3));
        setStats({
          members: postsRes.data.reduce((acc, p) => {
            const id = p.author?._id;
            return acc.includes(id) ? acc : [...acc, id];
          }, []).length,
          posts: postsRes.data.length,
          cities: Math.floor(Math.random() * 30) + 25,
          events: eventsRes.data.length || Math.floor(Math.random() * 20) + 15,
        });
      } catch (e) {
        console.error("Error:", e);
        setTopPosts([]);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <style jsx>{`
        /* Enhanced button styles */
        .hero-enhanced-button {
          background: linear-gradient(
            135deg,
            ${colors.primary} 0%,
            ${colors.secondary} 100%
          );
          background-size: 200% 200%;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .hero-enhanced-button:hover {
          background-position: 100% 0;
          box-shadow: 0 10px 30px ${colors.primary}40;
          filter: brightness(1.1);
        }

        .hero-enhanced-button::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(
            45deg,
            ${colors.primary},
            ${colors.accent},
            ${colors.secondary},
            ${colors.primary}
          );
          background-size: 400% 400%;
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.4s ease;
          animation: gradientRotate 3s ease infinite;
        }

        .hero-enhanced-button:hover::before {
          opacity: 0.8;
        }

        @keyframes gradientRotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-120%) skewX(-20deg);
          }
          100% {
            transform: translateX(120%) skewX(-20deg);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
      `}</style>

      <section
        id="community"
        className="section py-24 relative overflow-hidden"
      >
        {/* Enhanced Creative Particles */}
        <CreativeParticles />

        <div className="container max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          {/* Clean Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6 border bg-white shadow-sm"
              style={{ borderColor: colors.primary }}
            >
              <FaUserFriends
                className="text-lg"
                style={{ color: colors.primary }}
              />
              <span className="font-semibold" style={{ color: colors.dark }}>
                Sacred Community
              </span>
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                style={{ background: colors.primary }}
              >
                ॥
              </span>
            </div>

            {/* Clean title */}
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{ color: colors.dark }}
            >
              Divine Community Hub
            </motion.h2>

            <p
              className="text-lg md:text-xl max-w-3xl mx-auto"
              style={{ color: colors.neutral }}
            >
              Connect with like‑minded souls, share wisdom, and join{" "}
              <span className="font-semibold" style={{ color: colors.primary }}>
                sacred gatherings
              </span>{" "}
              that nurture spiritual growth.
            </p>
          </motion.div>

          {/* Clean Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <StatsCard
              icon={<FaUsers className="text-white text-xl" />}
              value={`${stats.members}+`}
              label="Members"
              color={`linear-gradient(135deg, ${colors.primary}, ${colors.dark})`}
              delay={0}
            />
            <StatsCard
              icon={<FaBlog className="text-white text-xl" />}
              value={`${stats.posts}+`}
              label="Stories"
              color={`linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`}
              delay={0.1}
            />
            <StatsCard
              icon={<FaMapMarkerAlt className="text-white text-xl" />}
              value={`${stats.cities}+`}
              label="Cities"
              color={`linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`}
              delay={0.2}
            />
            <StatsCard
              icon={<FaCalendarAlt className="text-white text-xl" />}
              value={`${stats.events}+`}
              label="Events"
              color={`linear-gradient(135deg, ${colors.success}, ${colors.accent})`}
              delay={0.3}
            />
          </div>

          {/* Clean Events */}
          {events.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <div className="flex items-center justify-between mb-8">
                <h3
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: colors.dark }}
                >
                  Upcoming Sacred Events
                </h3>
                <Link
                  to="/communityblog"
                  className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border transition"
                  style={{
                    background: colors.primary,
                    borderColor: colors.primary,
                  }}
                >
                  <FaCalendarAlt size={16} />
                  <span>View All Events</span>
                  <FaArrowRight size={14} />
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, i) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    baseUrl={baseUrl}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Clean Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h3
                className="text-2xl md:text-3xl font-bold"
                style={{ color: colors.dark }}
              >
                Community Stories
              </h3>
              <Link
                to="/communityblog"
                className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border transition"
                style={{
                  background: colors.primary,
                  borderColor: colors.primary,
                }}
              >
                <FaBlog size={16} />
                <span>View All Posts</span>
                <FaArrowRight size={14} />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <AnimatePresence>
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-3xl border p-6 animate-pulse bg-white"
                      style={{
                        borderColor: colors.light,
                      }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-11 h-11 rounded-full"
                          style={{ backgroundColor: `${colors.primary}20` }}
                        />
                        <div className="space-y-2">
                          <div
                            className="h-4 rounded w-32"
                            style={{ backgroundColor: `${colors.primary}20` }}
                          />
                          <div
                            className="h-3 rounded w-24"
                            style={{ backgroundColor: `${colors.primary}20` }}
                          />
                        </div>
                      </div>
                      <div className="space-y-3 mb-4">
                        <div
                          className="h-5 rounded"
                          style={{ backgroundColor: `${colors.primary}20` }}
                        />
                        <div
                          className="h-4 rounded w-3/4"
                          style={{ backgroundColor: `${colors.primary}20` }}
                        />
                      </div>
                      <div
                        className="h-40 rounded-xl"
                        style={{ backgroundColor: `${colors.primary}20` }}
                      />
                    </div>
                  ))
                ) : topPosts.length === 0 ? (
                  <div className="col-span-full text-center py-16">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border"
                      style={{
                        backgroundColor: `${colors.primary}10`,
                        borderColor: colors.light,
                      }}
                    >
                      <FaBlog
                        className="text-2xl"
                        style={{ color: colors.primary }}
                      />
                    </div>
                    <h4
                      className="text-xl font-bold mb-3"
                      style={{ color: colors.dark }}
                    >
                      No stories yet
                    </h4>
                    <p className="mb-6" style={{ color: colors.neutral }}>
                      Be the first to share your spiritual journey.
                    </p>
                    <Link
                      to="/communityblog"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border transition"
                      style={{
                        background: colors.primary,
                        borderColor: colors.primary,
                      }}
                    >
                      <FaLightbulb />
                      Share Your Story
                      <FaArrowRight size={14} />
                    </Link>
                  </div>
                ) : (
                  topPosts.map((post, i) => (
                    <SocialPostCard
                      key={post._id}
                      post={post}
                      baseUrl={baseUrl}
                      index={i}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Clean Final CTA */}
            {(topPosts.length > 0 || events.length > 0) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <InteractiveBox className="inline-block p-1 rounded-3xl">
                  <Link
                    to="/communityblog"
                    className="hero-enhanced-button interactive relative inline-flex items-center gap-4 px-10 py-5 rounded-3xl font-bold text-lg text-white shadow-xl transition-all duration-400 ease-out hover:-translate-y-1 hover:scale-[1.05] border-2 border-transparent cursor-pointer overflow-hidden"
                    onMouseEnter={(e) => e.target.classList.add("hovered")}
                    onMouseLeave={(e) => e.target.classList.remove("hovered")}
                  >
                    {/* Shimmer sweep */}
                    <span className="pointer-events-none absolute inset-0 -translate-x-[120%] skew-x-[-20deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent)] animate-shimmer" />

                    {/* Ripple effect on hover */}
                    <span className="ripple-effect absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-300" />

                    <span className="relative z-10 text-2xl">🕉️</span>
                    <span className="relative z-10">
                      Join Our Sacred Community
                    </span>
                    <FaArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </InteractiveBox>
                <p className="mt-4" style={{ color: colors.neutral }}>
                  Connect with {stats.members}+ souls on a journey of spiritual
                  growth
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Community;
