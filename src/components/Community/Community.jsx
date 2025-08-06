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
  FaChartLine,
  FaUserFriends,
  FaLightbulb,
  FaChevronRight,
  FaDotCircle,
  FaTicketAlt,
  FaMagic,
  FaGem,
  FaFeatherAlt,
  FaInfinity,
  FaSun,
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

// **Interactive Background Component**
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
          800px circle at ${mousePosition.x}% ${mousePosition.y}%,
          rgba(59, 130, 246, 0.08),
          rgba(99, 102, 241, 0.05) 40%,
          rgba(139, 92, 246, 0.03) 70%,
          transparent 90%
        )`,
      }}
    >
      {children}
    </div>
  );
};

// **Elegant Floating Particles**
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          animate={{
            x: [0, Math.random() * 60 - 30],
            y: [0, Math.random() * 60 - 30],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
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

// **Professional Avatar Component**
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
        whileHover={{ scale: 1.05 }}
        className={`${
          artistic
            ? "p-0.5 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-full"
            : ""
        }`}
      >
        <img
          src={getAvatarUrl()}
          alt={user?.name || "User"}
          className={`${size} rounded-full object-cover ${
            artistic
              ? "border-2 border-white shadow-lg"
              : "border-2 border-gray-200 shadow-md"
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
          className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
        />
      )}
    </div>
  );
};

// **Clean User Badge Component**
const UserBadge = ({ user, size = "sm" }) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  if (user?.role === "admin") {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`flex items-center space-x-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full shadow-sm ${sizeClasses[size]}`}
      >
        <FaCrown size={size === "sm" ? 8 : 10} />
        <span>ADMIN</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex items-center space-x-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-sm ${sizeClasses[size]}`}
    >
      <FaPray size={size === "sm" ? 8 : 10} />
      <span>DEVOTEE</span>
    </motion.div>
  );
};

// **Clean Event Card Component**
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
      meditation: "from-emerald-500 to-teal-600",
      prayer: "from-blue-500 to-indigo-600",
      discourse: "from-purple-500 to-violet-600",
      festival: "from-orange-500 to-red-500",
      community_service: "from-pink-500 to-rose-600",
      other: "from-gray-500 to-slate-600",
    };
    return colors[type] || colors.other;
  };

  const getEventIcon = (type) => {
    const icons = {
      meditation: <FaHands className="text-white text-lg" />,
      prayer: <FaPray className="text-white text-lg" />,
      discourse: <FaBookOpen className="text-white text-lg" />,
      festival: <FaStar className="text-white text-lg" />,
      community_service: <FaUsers className="text-white text-lg" />,
      other: <FaCalendarAlt className="text-white text-lg" />,
    };
    return icons[type] || icons.other;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5, boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)" }}
      className="group relative"
    >
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Event Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 5 }}
                className={`w-12 h-12 bg-gradient-to-br ${getEventTypeColor(
                  event.eventType
                )} rounded-xl flex items-center justify-center shadow-lg`}
              >
                {getEventIcon(event.eventType)}
              </motion.div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {event.organizer?.name}
                  </h4>
                  <UserBadge user={event.organizer} size="sm" />
                </div>
                <p className="text-gray-500 text-xs">Event Organizer</p>
              </div>
            </div>

            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              LIVE
            </span>
          </div>

          <h3 className="font-bold text-lg text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-200">
            {event.title}
          </h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <FaCalendarAlt className="text-blue-500 text-xs" />
              <span>{formatDate(event.dateTime)}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <FaMapMarkerAlt className="text-red-500 text-xs" />
              <span className="truncate">{event.location?.city}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <FaUsers className="text-green-500 text-xs" />
              <span>{event.participants?.length || 0} joined</span>
            </div>
          </div>
        </div>

        {/* Event Image */}
        {event.image && (
          <div className="px-6 pb-4">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={
                  event.image.startsWith("http")
                    ? event.image
                    : baseUrl + event.image
                }
                alt="Event"
                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        )}

        {/* Join Button */}
        <div className="p-6 pt-0">
          <Link to="/communityblog">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 bg-gradient-to-r ${getEventTypeColor(
                event.eventType
              )} text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2`}
            >
              <FaTicketAlt size={14} />
              <span>Join Event</span>
              <FaArrowRight size={12} />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// **Clean Social Post Card**
const SocialPostCard = ({ post, baseUrl, index }) => {
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5, boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)" }}
      className="group relative"
    >
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Post Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar
                user={post.author}
                baseUrl={baseUrl}
                size="w-11 h-11"
                showOnline={Math.random() > 0.6}
                artistic={true}
              />
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-gray-900 text-sm">
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
              <span className="flex items-center space-x-1 px-2 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
                <FaFire size={10} />
                <span>Trending</span>
              </span>
            )}
          </div>

          <Link to={`/blog/${post._id}`}>
            <h3 className="font-bold text-xl text-gray-900 mb-3 leading-tight hover:text-blue-600 transition-colors duration-200 cursor-pointer">
              {post.title}
            </h3>
          </Link>

          <div className="relative mb-4">
            <div className="text-gray-700 text-sm leading-relaxed">
              {showFullText ? (
                <p>{post.content}</p>
              ) : (
                <p>{truncateText(post.content, 100)}</p>
              )}

              {post.content.length > 100 && (
                <button
                  onClick={() => setShowFullText(!showFullText)}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm ml-1 hover:underline"
                >
                  {showFullText ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Post Image */}
        {post.image && (
          <div className="px-6 pb-4">
            <Link to={`/blog/${post._id}`}>
              <div className="relative overflow-hidden rounded-xl group/image cursor-pointer">
                <img
                  src={
                    post.image.startsWith("http")
                      ? post.image
                      : baseUrl + post.image
                  }
                  alt="Post content"
                  className="w-full h-48 object-cover group-hover/image:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 bg-white/95 px-4 py-2 rounded-full text-gray-800 font-medium text-sm flex items-center space-x-2">
                    <FaEye size={14} />
                    <span>Read Full Post</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Engagement Section */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center space-x-1 transition-colors duration-200 ${
                  isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
                }`}
              >
                {isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                <span className="text-sm font-medium">{engagement.likes}</span>
              </motion.button>

              <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                <FaComment size={16} />
                <span className="text-sm font-medium">
                  {engagement.comments}
                </span>
              </button>

              <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors duration-200">
                <FaShareAlt size={14} />
                <span className="text-sm font-medium">{engagement.shares}</span>
              </button>
            </div>

            <button className="text-gray-500 hover:text-yellow-500 transition-colors duration-200">
              <FaStar size={16} />
            </button>
          </div>

          <Link to={`/blog/${post._id}`}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100/50 hover:border-blue-200/50 transition-all duration-200 cursor-pointer group/cta"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <FaBookOpen className="text-white text-xs" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 group-hover/cta:text-blue-700 transition-colors duration-200">
                      Continue Reading
                    </div>
                    <div className="text-xs text-gray-500">
                      Explore the full story
                    </div>
                  </div>
                </div>
                <FaChevronRight
                  className="text-gray-400 group-hover/cta:text-blue-500 transition-colors duration-200"
                  size={14}
                />
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// **Clean Stats Card**
const StatsCard = ({ icon, value, label, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ y: -5, boxShadow: "0 15px 30px -12px rgba(0, 0, 0, 0.15)" }}
    className="group"
  >
    <div className="bg-white rounded-2xl border border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg`}
      >
        {icon}
      </motion.div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
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

        const sorted = postsRes.data
          .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
          .slice(0, 4);

        setTopPosts(sorted);
        setEvents(eventsRes.data.slice(0, 3));

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
      {/* **Beautiful White Background with Subtle Gradients** */}
      <div className="absolute inset-0 bg-white">
        {/* Subtle gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/20" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-50/20 via-transparent to-pink-50/15" />

        {/* Soft blur patterns */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/50 to-indigo-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-100/40 to-pink-200/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-100/30 to-blue-200/20 rounded-full blur-2xl" />
        </div>

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px, 30px 30px",
          }}
        />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      <div className="container max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* **Clean Section Header** */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center space-x-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full mb-6 border border-gray-200/50 shadow-lg"
          >
            <FaUserFriends className="text-blue-600 text-lg" />
            <span className="text-gray-700 font-semibold">
              Sacred Community
            </span>
            <FaSun className="text-orange-500" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-700 bg-clip-text text-transparent leading-tight">
            Divine Community Hub
          </h2>

          <p className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Connect with like-minded souls, share wisdom, and participate in
            sacred gatherings that nurture spiritual growth and community bonds
          </p>
        </motion.div>

        {/* **Clean Stats Section** */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <StatsCard
            icon={<FaUsers className="text-white text-xl" />}
            value={`${stats.members}+`}
            label="Community Members"
            color="from-blue-500 to-blue-600"
            delay={0}
          />
          <StatsCard
            icon={<FaBlog className="text-white text-xl" />}
            value={`${stats.posts}+`}
            label="Shared Stories"
            color="from-indigo-500 to-purple-600"
            delay={0.1}
          />
          <StatsCard
            icon={<FaMapMarkerAlt className="text-white text-xl" />}
            value={`${stats.cities}+`}
            label="Cities Connected"
            color="from-emerald-500 to-teal-600"
            delay={0.2}
          />
          <StatsCard
            icon={<FaCalendarAlt className="text-white text-xl" />}
            value={`${stats.events}+`}
            label="Sacred Events"
            color="from-orange-500 to-red-500"
            delay={0.3}
          />
        </div>

        {/* **Events Section** */}
        {events.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Upcoming Events
                </h3>
                <p className="text-gray-600">
                  Join our sacred gatherings and community celebrations
                </p>
              </div>

              <Link
                to="/communityblog"
                className="hidden md:flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 group"
              >
                <FaCalendarAlt size={16} />
                <span>View All Events</span>
                <FaArrowRight
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                  size={14}
                />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* **Posts Section** */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Community Stories
              </h3>
              <p className="text-gray-600">
                Latest wisdom and insights shared by our community
              </p>
            </div>

            <Link
              to="/communityblog"
              className="hidden md:flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 group"
            >
              <FaBlog size={16} />
              <span>View All Posts</span>
              <FaArrowRight
                className="group-hover:translate-x-0.5 transition-transform duration-200"
                size={14}
              />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <AnimatePresence>
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-11 h-11 bg-gray-200 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                      </div>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="h-5 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="h-40 bg-gray-200 rounded-xl"></div>
                  </div>
                ))
              ) : topPosts.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaBlog className="text-gray-400 text-3xl" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-700 mb-4">
                    No stories shared yet
                  </h4>
                  <p className="text-gray-500 mb-8">
                    Be the first to share your spiritual journey with our
                    community
                  </p>
                  <Link
                    to="/communityblog"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  >
                    <FaLightbulb className="mr-3" />
                    Share Your Story
                    <FaArrowRight className="ml-3" size={14} />
                  </Link>
                </div>
              ) : (
                topPosts.map((post, index) => (
                  <SocialPostCard
                    key={post._id}
                    post={post}
                    baseUrl={baseUrl}
                    index={index}
                  />
                ))
              )}
            </AnimatePresence>
          </div>

          {/* **Final Call to Action** */}
          {(topPosts.length > 0 || events.length > 0) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <InteractiveBox className="inline-block p-1 rounded-2xl">
                <Link
                  to="/communityblog"
                  className="inline-flex items-center px-10 py-5 bg-white rounded-2xl font-bold text-lg text-gray-800 hover:bg-gray-50 transition-all duration-200 hover:scale-105 group shadow-xl border border-gray-200/50"
                >
                  <span className="mr-4 text-2xl">🕉️</span>
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                    Join Our Community
                  </span>
                  <FaArrowRight className="ml-4 text-indigo-600 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </InteractiveBox>

              <p className="mt-4 text-gray-600">
                Connect with {stats.members}+ souls on a journey of spiritual
                growth
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Community;
