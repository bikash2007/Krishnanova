import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaHeart,
  FaComment,
  FaShare,
  FaEye,
  FaPray,
  FaCalendarAlt,
  FaUsers,
  FaMapMarkerAlt,
  FaClock,
  FaBlog,
  FaChevronRight,
  FaQuoteLeft,
  FaFeatherAlt,
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;

// Floating Sacred Elements
const FloatingSacredElements = () => {
  const symbols = ["🕉️", "🪷", "🦚", "⭐", "💫", "🌙"];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {symbols.map((symbol, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-10"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [null, Math.random() * window.innerWidth],
            y: [null, Math.random() * window.innerHeight],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced User Badge
const UserBadge = ({ user, size = "md" }) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  if (!user || user.role !== "devotee") {
    return null;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className={`flex items-center space-x-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-bold rounded-full shadow-lg ${sizeClasses[size]}`}
    >
      <FaPray size={size === "sm" ? 8 : 10} />
      <span>DEVOTEE</span>
    </motion.div>
  );
};

// Artistic Avatar Component
const Avatar = ({ user, size = "w-10 h-10", baseUrl, artistic = false }) => {
  const avatarUrl = user?.avatar?.startsWith("http")
    ? user.avatar
    : user?.avatar
    ? `${baseUrl}${user.avatar}`
    : "/default-avatar.png";

  if (artistic) {
    return (
      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`${size} rounded-full overflow-hidden border-3 border-gradient-to-r from-orange-400 via-purple-500 to-pink-500 p-1`}
        >
          <img
            src={avatarUrl}
            alt={user?.name || "User"}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              e.target.src = "/default-avatar.png";
            }}
          />
        </motion.div>
        <UserBadge user={user} size="sm" />
      </div>
    );
  }

  return (
    <div className={`${size} rounded-full overflow-hidden border-2 border-white shadow-lg`}>
      <img
        src={avatarUrl}
        alt={user?.name || "User"}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.src = "/default-avatar.png";
        }}
      />
    </div>
  );
};

// Instagram/Facebook Style Post Card
const SocialPostCard = ({ post, baseUrl, index }) => {
  const [showFullText, setShowFullText] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

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
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/40 via-purple-100/30 to-pink-100/40 rounded-3xl opacity-60"></div>

      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar user={post.author} baseUrl={baseUrl} artistic={true} />
              <div>
                <h4 className="font-bold text-gray-900 flex items-center space-x-2">
                  <span>{post.author?.name || "Anonymous Devotee"}</span>
                  <UserBadge user={post.author} size="sm" />
                </h4>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{formatTimeAgo(post.createdAt)}</span>
                  <span>•</span>
                  <FaEye size={12} />
                  <span>{Math.floor(Math.random() * 200) + 50} views</span>
                </div>
              </div>
            </div>
            <motion.div
              whileHover={{ rotate: 15 }}
              className="text-orange-400 opacity-60"
            >
              <FaFeatherAlt size={16} />
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-800 leading-relaxed">
              {showFullText ? post.content : truncateText(post.content)}
              {post.content.length > 120 && (
                <button
                  onClick={() => setShowFullText(!showFullText)}
                  className="ml-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                >
                  {showFullText ? "Show less" : "Read more"}
                </button>
              )}
            </p>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag, tagIndex) => (
                <motion.span
                  key={tagIndex}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-medium rounded-full"
                >
                  #{tag}
                </motion.span>
              ))}
            </div>
          )}
        </div>

        {/* Image */}
        {post.image && (
          <div className="relative group/image overflow-hidden">
            <Link to={`/blog/${post._id}`}>
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={post.image.startsWith("http") ? post.image : `${baseUrl}${post.image}`}
                alt={post.title}
                className="w-full h-80 object-cover transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
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
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  isLiked
                    ? "bg-red-50 text-red-600"
                    : "bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                <motion.div
                  animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <FaHeart size={16} className={isLiked ? "fill-current" : ""} />
                </motion.div>
                <span className="font-semibold">{engagement.likes}</span>
              </motion.button>

              <div className="flex items-center space-x-2 text-gray-600">
                <FaComment size={16} />
                <span className="font-semibold">{engagement.comments}</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-600">
                <FaShare size={16} />
                <span className="font-semibold">{engagement.shares}</span>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              {engagement.comments} comments • {engagement.shares} shares
            </div>
          </div>

          {/* Call to Action */}
          <Link to="/communityblog">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 hover:border-indigo-200 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <FaBlog className="text-white text-sm" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      Read Full Discussion
                    </div>
                    <div className="text-xs text-gray-500">
                      Join the conversation in our community
                    </div>
                  </div>
                </div>
                <FaChevronRight className="text-gray-400" size={14} />
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Story-style Preview Cards
const StoryCard = ({ post, baseUrl, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="relative w-32 h-48 rounded-2xl overflow-hidden cursor-pointer group"
    >
      <Link to={`/blog/${post._id}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
        
        {post.image ? (
          <img
            src={post.image.startsWith("http") ? post.image : `${baseUrl}${post.image}`}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-400 via-purple-500 to-pink-600"></div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
          <div className="text-white text-sm font-medium leading-tight line-clamp-3">
            {post.title || post.content.substring(0, 60) + "..."}
          </div>
          <div className="text-white/80 text-xs mt-1">
            {post.author?.name || "Anonymous"}
          </div>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="absolute top-3 right-3 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center z-20"
        >
          <FaEye className="text-white text-xs" />
        </motion.div>
      </Link>
    </motion.div>
  );
};

// Enhanced Event Card
const EventCard = ({ event, baseUrl, index }) => {
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      time: date.toLocaleTimeString("en-US", { 
        hour: "2-digit", 
        minute: "2-digit",
        hour12: true 
      }),
    };
  };

  const eventDate = formatEventDate(event.dateTime);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-6 hover:shadow-xl transition-all duration-300"
    >
      {/* Event Type Badge */}
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold rounded-full">
          {event.type?.toUpperCase() || "EVENT"}
        </span>
      </div>

      {/* Date Section */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="flex-shrink-0 text-center">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-3 shadow-lg">
            <div className="text-xs font-semibold opacity-90">{eventDate.day}</div>
            <div className="text-2xl font-bold">{eventDate.date}</div>
            <div className="text-xs font-semibold opacity-90">{eventDate.month}</div>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
            {event.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {event.description}
          </p>
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <FaClock size={12} className="text-indigo-500" />
          <span>{eventDate.time}</span>
        </div>
        
        {event.location && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FaMapMarkerAlt size={12} className="text-red-500" />
            <span>{event.location.address}, {event.location.city}</span>
          </div>
        )}
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <FaUsers size={12} className="text-green-500" />
          <span>{event.participants?.length || 0} participants</span>
        </div>
      </div>

      {/* Call to Action */}
      <Link to="/communityblog">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Learn More
        </motion.button>
      </Link>
    </motion.div>
  );
};

// Main Community Component
const Community = () => {
  const [topPosts, setTopPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_API_URL || "";

  const fetchCommunityData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch posts
      const postsResponse = await axios.get(`${API}/blog`);
      setTopPosts(postsResponse.data.slice(0, 6));
      
      // Fetch events
      const eventsResponse = await axios.get(`${API}/events`);
      setEvents(eventsResponse.data.slice(0, 4));
      
    } catch (error) {
      console.error("Error fetching community data:", error);
      // Set mock data as fallback
      setTopPosts([
        {
          _id: "1",
          title: "The Path of Devotion",
          content: "Discovering the eternal love through Krishna's teachings...",
          author: { name: "Devotee Arjun", role: "devotee" },
          createdAt: new Date(),
          likes: [],
          tags: ["devotion", "spirituality"]
        }
      ]);
      setEvents([
        {
          _id: "1",
          title: "Weekly Kirtan",
          description: "Join us for an evening of devotional singing",
          dateTime: new Date(Date.now() + 86400000),
          type: "kirtan",
          location: { address: "Temple Hall", city: "Sacred City" },
          participants: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCommunityData();
  }, [fetchCommunityData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <section id="community" className="relative py-20 overflow-hidden">
      <FloatingSacredElements />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <FaUsers className="text-4xl text-indigo-500" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Sacred Community
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with fellow devotees, share wisdom, and participate in divine events
          </p>
        </motion.div>

        {/* Posts Section */}
        {topPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Latest Sacred Discussions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {topPosts.slice(0, 3).map((post, index) => (
                <SocialPostCard
                  key={post._id}
                  post={post}
                  baseUrl={baseUrl}
                  index={index}
                />
              ))}
            </div>

            {/* Story-style cards for remaining posts */}
            {topPosts.length > 3 && (
              <div className="flex justify-center space-x-4 mb-8">
                {topPosts.slice(3, 6).map((post, index) => (
                  <StoryCard
                    key={post._id}
                    post={post}
                    baseUrl={baseUrl}
                    index={index}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Events Section */}
        {events.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Upcoming Divine Events
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Final Call to Action */}
        {(topPosts.length > 0 || events.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/60">
              <FaQuoteLeft className="text-4xl text-indigo-400 mx-auto mb-4 opacity-60" />
              <blockquote className="text-xl text-gray-700 italic mb-6 max-w-2xl mx-auto">
                "In the company of devotees, the heart finds its true home, and the soul discovers its eternal song."
              </blockquote>
              <Link to="/communityblog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <FaBlog size={20} />
                  <span>Join Our Sacred Community</span>
                  <FaChevronRight size={16} />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Community;