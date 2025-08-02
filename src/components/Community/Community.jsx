import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  FaQuoteLeft,
  FaStar,
  FaFire,
  FaChartLine, // Replace FaTrendingUp
  FaUserFriends,
  FaLightbulb,
  FaChevronRight,
  FaDotCircle,
  FaTicketAlt,
  FaMagic,
  FaGem,
  FaFeatherAlt,
  FaInfinity,
  FaSun, // Replace FaSparkles
  FaPlay,
  FaCircle,
  FaClock,
  FaHands,
  FaBookmark,
  FaRegBookmark,
  FaAward,
  FaCertificate,
  FaMedal,
} from "react-icons/fa";

const InteractiveBox = ({ children, className }) => {
  const boxRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const hasHoverSupport = window.matchMedia("(hover: hover)").matches;
    if (!hasHoverSupport) return;

    const handleMouseMove = (e) => {
      const rect = box.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    };

    box.addEventListener("mousemove", handleMouseMove);
    return () => box.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={boxRef}
      className={className}
      style={{
        background: `radial-gradient(
          1200px circle at ${mousePosition.x}% ${mousePosition.y}%,
          rgba(139, 69, 255, 0.15),
          rgba(59, 130, 246, 0.1) 30%,
          rgba(236, 72, 153, 0.08) 60%,
          transparent 80%
        )`,
      }}
    >
      {children}
    </div>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, Math.random() * 0.5 + 0.5, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Avatar Component
const Avatar = ({
  user,
  size = "w-12 h-12",
  baseUrl,
  showOnline = false,
  artistic = false,
}) => {
  const getAvatarUrl = () => {
    if (!user?.avatar) return "/user-avatar.png";
    if (user.avatar.startsWith("http")) return user.avatar;
    return baseUrl + user.avatar;
  };

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.1, rotate: artistic ? 5 : 0 }}
        className={`${
          artistic
            ? "p-1 bg-gradient-to-tr from-pink-400 via-purple-500 to-blue-500 rounded-full"
            : ""
        }`}
      >
        <img
          src={getAvatarUrl()}
          alt={user?.name || "User"}
          className={`${size} rounded-full object-cover border-3 ${
            artistic
              ? "border-white shadow-2xl ring-4 ring-purple-200/50"
              : "border-white/50 shadow-lg ring-2 ring-blue-100"
          }`}
          onError={(e) => {
            e.target.src = "/user-avatar.png";
          }}
        />
      </motion.div>
      {showOnline && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 border-2 border-white rounded-full shadow-lg"
        />
      )}
      {artistic && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400"
        >
          <FaSun />
        </motion.div>
      )}
    </div>
  );
};

// Artistic User Badge Component
const UserBadge = ({ user, size = "sm" }) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  if (user?.role === "admin") {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(251, 191, 36, 0.5)",
            "0 0 30px rgba(251, 191, 36, 0.8)",
            "0 0 20px rgba(251, 191, 36, 0.5)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`flex items-center space-x-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-white font-bold rounded-full shadow-lg ${sizeClasses[size]}`}
      >
        <FaCrown size={size === "sm" ? 8 : 10} />
        <span>ADMIN</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className={`flex items-center space-x-1 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-bold rounded-full shadow-lg ${sizeClasses[size]}`}
    >
      <FaPray size={size === "sm" ? 8 : 10} />
      <span>DEVOTEE</span>
    </motion.div>
  );
};

// Artistic Event Card Component
const EventCard = ({ event, baseUrl, index }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getEventTypeColor = (type) => {
    const colors = {
      meditation: "from-green-400 via-emerald-500 to-teal-600",
      prayer: "from-blue-400 via-indigo-500 to-purple-600",
      discourse: "from-purple-400 via-pink-500 to-rose-600",
      festival: "from-yellow-400 via-orange-500 to-red-600",
      community_service: "from-red-400 via-pink-500 to-purple-600",
      other: "from-gray-400 via-slate-500 to-gray-600",
    };
    return colors[type] || colors.other;
  };

  const getEventIcon = (type) => {
    const icons = {
      meditation: "🧘‍♀️",
      prayer: "🙏",
      discourse: "📿",
      festival: "🎊",
      community_service: "🤝",
      other: "✨",
    };
    return icons[type] || icons.other;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        delay: index * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -10,
        rotateX: 5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
      className="group relative"
    >
      {/* Artistic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl rounded-3xl"></div>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getEventTypeColor(
          event.eventType
        )} opacity-10 rounded-3xl group-hover:opacity-20 transition-opacity duration-300`}
      ></div>

      {/* Floating Elements */}
      <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>

      <div className="relative p-6 border border-white/30 rounded-3xl shadow-xl backdrop-blur-sm">
        {/* Event Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className={`w-12 h-12 bg-gradient-to-br ${getEventTypeColor(
                event.eventType
              )} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}
            >
              {getEventIcon(event.eventType)}
            </motion.div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-bold text-gray-900 text-sm">
                  {event.organizer?.name}
                </h4>
                <UserBadge user={event.organizer} size="sm" />
              </div>
              <p className="text-gray-500 text-xs">Event Organizer</p>
            </div>
          </div>

          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="px-2 py-1 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white text-xs font-bold rounded-full shadow-lg"
          >
            LIVE
          </motion.div>
        </div>

        {/* Event Title */}
        <h3 className="font-bold text-lg text-gray-900 mb-3 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
          {event.title}
        </h3>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-gray-600 text-sm">
            <FaCalendarAlt className="text-blue-500" />
            <span>{formatDate(event.dateTime)}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 text-sm">
            <FaMapMarkerAlt className="text-red-500" />
            <span className="truncate">{event.location?.city}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 text-sm">
            <FaUsers className="text-green-500" />
            <span>{event.participants?.length || 0} joined</span>
          </div>
        </div>

        {/* Event Image Preview */}
        {event.image && (
          <div className="relative mb-4 overflow-hidden rounded-2xl group/image">
            <img
              src={
                event.image.startsWith("http")
                  ? event.image
                  : baseUrl + event.image
              }
              alt="Event"
              className="w-full h-32 object-cover group-hover/image:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}

        {/* Join Event Button */}
        <Link to="/communityblog">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-3 bg-gradient-to-r ${getEventTypeColor(
              event.eventType
            )} text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2`}
          >
            <FaTicketAlt />
            <span>Join Event</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

// Artistic Social Post Card
const ArtisticSocialPostCard = ({ post, baseUrl, index }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));

    if (diffInMinutes < 1) return "now";
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const engagement = {
    likes: Math.floor(Math.random() * 50) + (post.likes?.length || 0),
    comments: Math.floor(Math.random() * 15) + 2,
    shares: Math.floor(Math.random() * 8) + 1,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        type: "spring",
        stiffness: 80,
      }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.2)",
      }}
      className="group relative"
    >
      {/* Artistic Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-white/50 backdrop-blur-xl rounded-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 rounded-3xl group-hover:from-blue-500/20 group-hover:via-purple-500/15 group-hover:to-pink-500/20 transition-all duration-500"></div>

      {/* Floating Decorative Elements */}
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-2 -right-2 w-6 h-6 text-pink-400 opacity-60"
      >
        <FaGem />
      </motion.div>

      <motion.div
        animate={{ rotate: -360, y: [0, -5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-2 -left-2 w-5 h-5 text-blue-400 opacity-40"
      >
        <FaFeatherAlt />
      </motion.div>

      <div className="relative border border-white/40 rounded-3xl shadow-2xl backdrop-blur-sm overflow-hidden">
        {/* Post Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center space-x-4">
            <Avatar
              user={post.author}
              baseUrl={baseUrl}
              size="w-12 h-12"
              showOnline={Math.random() > 0.5}
              artistic={true}
            />
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-bold text-gray-900 text-sm">
                  {post.author?.name || "Anonymous"}
                </h4>
                <UserBadge user={post.author} size="sm" />
              </div>
              <div className="flex items-center space-x-2 text-gray-500 text-xs">
                <span>{formatTimeAgo(post.createdAt)}</span>
                <FaDotCircle size={3} />
                <FaGlobe size={10} />
                <span>Public</span>
              </div>
            </div>
          </div>

          {engagement.likes > 30 && (
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg"
            >
              <FaFire size={10} />
              <span>TRENDING</span>
            </motion.div>
          )}
        </div>

        {/* Post Content */}
        <div className="px-6 pb-4">
          <Link to={`/blog/${post._id}`}>
            <motion.h3
              whileHover={{
                scale: 1.02,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="font-bold text-xl text-gray-900 mb-3 leading-tight cursor-pointer transition-all duration-300"
            >
              {post.title}
            </motion.h3>
          </Link>

          <div className="relative">
            <FaQuoteLeft className="absolute -top-2 -left-2 text-blue-200/50 text-xl" />
            <div className="text-gray-700 text-sm leading-relaxed pl-6">
              {showFullText ? (
                <p>{post.content}</p>
              ) : (
                <p>{truncateText(post.content, 100)}</p>
              )}

              {post.content.length > 100 && (
                <button
                  onClick={() => setShowFullText(!showFullText)}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm ml-1 hover:underline"
                >
                  {showFullText ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Post Image */}
        {post.image && (
          <div className="relative mx-6 mb-4 overflow-hidden rounded-2xl group/image">
            <Link to={`/blog/${post._id}`}>
              <img
                src={
                  post.image.startsWith("http")
                    ? post.image
                    : baseUrl + post.image
                }
                alt="Post content"
                className="w-full h-48 object-cover group-hover/image:scale-110 transition-transform duration-700 cursor-pointer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>

              {/* Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-300">
                <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full text-gray-800 font-semibold flex items-center space-x-2 shadow-xl transform scale-90 group-hover/image:scale-100 transition-transform duration-200">
                  <FaEye size={16} />
                  <span>Read Full Post</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Enhanced Engagement Section */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center space-x-1 transition-all duration-300 ${
                  isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
                }`}
              >
                <motion.div
                  animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                </motion.div>
              </motion.button>

              <button className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
                <FaComment size={18} />
              </button>

              <button className="text-gray-600 hover:text-green-500 transition-colors duration-200">
                <FaShareAlt size={16} />
              </button>
            </div>

            <button className="text-gray-600 hover:text-yellow-500 transition-colors duration-200">
              <motion.div whileHover={{ rotate: 15 }}>
                <FaStar size={18} />
              </motion.div>
            </button>
          </div>

          {/* Engagement Stats */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    className={`w-6 h-6 rounded-full border-2 border-white shadow-lg ${
                      i === 0
                        ? "bg-gradient-to-r from-red-400 to-pink-500"
                        : i === 1
                        ? "bg-gradient-to-r from-blue-400 to-purple-500"
                        : "bg-gradient-to-r from-green-400 to-teal-500"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {engagement.likes} likes
              </span>
            </div>

            <div className="text-sm text-gray-500">
              {engagement.comments} comments • {engagement.shares} shares
            </div>
          </div>

          {/* Enhanced Call to Action */}
          <Link to={`/blog/${post._id}`}>
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl border border-gradient-to-r border-blue-200/50 hover:border-purple-300/50 transition-all duration-300 cursor-pointer group/cta"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <FaInfinity className="text-white text-sm" />
                  </motion.div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 group-hover/cta:text-purple-700 transition-colors duration-200">
                      Dive Deeper into Wisdom
                    </div>
                    <div className="text-xs text-gray-500">
                      Explore the full spiritual journey
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaChevronRight
                    className="text-gray-400 group-hover/cta:text-purple-500 transition-colors duration-200"
                    size={16}
                  />
                </motion.div>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Stats Card
const ArtisticStatsCard = ({ icon, value, label, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8, type: "spring" }}
    whileHover={{
      scale: 1.05,
      y: -10,
      rotateY: 5,
      boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.25)",
    }}
    className="relative group cursor-pointer"
  >
    {/* Artistic Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl rounded-3xl"></div>
    <div
      className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 rounded-3xl group-hover:opacity-20 transition-opacity duration-300`}
    ></div>

    {/* Floating Elements */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-2 -right-2 w-4 h-4 text-pink-400 opacity-60"
    >
      <FaMagic />
    </motion.div>

    <div className="relative text-center p-6 border border-white/30 rounded-3xl shadow-xl backdrop-blur-sm">
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-2xl`}
      >
        {icon}
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="text-3xl font-bold text-gray-900 mb-2"
      >
        {value}
      </motion.div>
      <div className="text-gray-600 text-sm font-medium">{label}</div>
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
  const navigate = useNavigate();
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

        // Sort posts for main feed
        const sorted = postsRes.data
          .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
          .slice(0, 4);

        setTopPosts(sorted);
        setEvents(eventsRes.data.slice(0, 3));

        // Calculate stats
        setStats({
          members: postsRes.data.reduce((acc, post) => {
            const authorId = post.author?._id;
            return acc.includes(authorId) ? acc : [...acc, authorId];
          }, []).length,
          posts: postsRes.data.length,
          cities: Math.floor(Math.random() * 30) + 25,
          events: eventsRes.data.length || Math.floor(Math.random() * 20) + 15,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setTopPosts([]);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="community" className="section py-24 relative overflow-hidden">
      {/* Enhanced Artistic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-pink-50/60"></div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Dynamic Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-blue-500/20 rounded-full blur-3xl"
      />

      <div className="container max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Artistic Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-100/80 via-purple-100/80 to-pink-100/80 backdrop-blur-sm rounded-full mb-8 border border-white/50 shadow-xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <FaUserFriends className="text-blue-600 text-xl" />
            </motion.div>
            <span className="text-blue-800 font-bold text-lg">
              Sacred Community Hub
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaSun className="text-purple-600" />
            </motion.div>
          </motion.div>

          <motion.h2
            whileHover={{ scale: 1.05 }}
            className="section-title font-playfair text-5xl md:text-7xl mb-8 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent leading-tight"
          >
            Divine Community Experience
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 text-xl md:text-2xl max-w-5xl mx-auto leading-relaxed font-light"
          >
            Immerse yourself in a vibrant ecosystem of spiritual wisdom, sacred
            gatherings, and meaningful connections that transcend the ordinary
          </motion.p>
        </motion.div>

        {/* Artistic Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <ArtisticStatsCard
            icon={<FaUsers className="text-white text-2xl" />}
            value={`${stats.members}+`}
            label="Spiritual Souls"
            color="from-blue-500 via-cyan-500 to-teal-500"
            delay={0}
          />
          <ArtisticStatsCard
            icon={<FaBlog className="text-white text-2xl" />}
            value={`${stats.posts}+`}
            label="Wisdom Shared"
            color="from-purple-500 via-pink-500 to-rose-500"
            delay={0.1}
          />
          <ArtisticStatsCard
            icon={<FaMapMarkerAlt className="text-white text-2xl" />}
            value={`${stats.cities}+`}
            label="Sacred Cities"
            color="from-green-500 via-emerald-500 to-teal-500"
            delay={0.2}
          />
          <ArtisticStatsCard
            icon={<FaCalendarAlt className="text-white text-2xl" />}
            value={`${stats.events}+`}
            label="Divine Gatherings"
            color="from-orange-500 via-red-500 to-pink-500"
            delay={0.3}
          />
        </div>

        {/* Community Events Section */}
        {events.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <motion.h3
                  whileHover={{ scale: 1.02 }}
                  className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent mb-3"
                >
                  Sacred Gatherings
                </motion.h3>
                <p className="text-gray-600 text-lg">
                  Join upcoming spiritual events and community celebrations
                </p>
              </div>

              <Link
                to="/communityblog"
                className="hidden md:flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white rounded-full font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              >
                <FaCalendarAlt />
                <span>View All Events</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaArrowRight />
                </motion.div>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <EventCard
                  key={event._id}
                  event={event}
                  baseUrl={baseUrl}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Community Posts Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <motion.h3
                whileHover={{ scale: 1.02 }}
                className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3"
              >
                Wisdom Chronicles
              </motion.h3>
              <p className="text-gray-600 text-lg">
                Latest insights and spiritual discussions from our community
              </p>
            </div>

            <Link
              to="/communityblog"
              className="hidden md:flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white rounded-full font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              <FaBlog />
              <span>Explore All Posts</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaArrowRight />
              </motion.div>
            </Link>
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <AnimatePresence>
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 animate-pulse"
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-6 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="h-48 bg-gray-200 rounded-2xl mt-6"></div>
                  </div>
                ))
              ) : topPosts.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
                  >
                    <FaBlog className="text-gray-400 text-4xl" />
                  </motion.div>
                  <h4 className="text-3xl font-bold text-gray-700 mb-6">
                    No wisdom shared yet
                  </h4>
                  <p className="text-gray-500 mb-10 text-xl">
                    Be the first to illuminate our sacred community!
                  </p>
                  <Link
                    to="/communityblog"
                    className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                  >
                    <FaLightbulb className="mr-4 text-2xl" />
                    Share Your Light
                    <FaArrowRight className="ml-4" />
                  </Link>
                </div>
              ) : (
                topPosts.map((post, index) => (
                  <ArtisticSocialPostCard
                    key={post._id}
                    post={post}
                    baseUrl={baseUrl}
                    index={index}
                  />
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Final Artistic Call to Action */}
          {(topPosts.length > 0 || events.length > 0) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <InteractiveBox className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
                <Link
                  to="/communityblog"
                  className="inline-flex items-center px-12 py-6 bg-white rounded-full font-bold text-xl text-gray-800 hover:bg-gray-50 transition-all duration-300 hover:scale-105 group shadow-2xl"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="mr-4 text-3xl"
                  >
                    🕉️
                  </motion.div>
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Enter Sacred Community
                  </span>
                  <motion.div
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="ml-4 text-2xl"
                  >
                    <FaArrowRight className="text-purple-600" />
                  </motion.div>
                </Link>
              </InteractiveBox>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-gray-600 text-lg"
              >
                Join {stats.members}+ souls on a journey of spiritual awakening
                and divine connection
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Community;
