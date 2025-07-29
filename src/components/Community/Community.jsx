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
  FaUserFriends,
  FaHands,
  FaLightbulb,
  FaPlay,
  FaChevronRight,
  FaDotCircle,
  FaCircle,
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
          800px circle at ${mousePosition.x}% ${mousePosition.y}%,
          rgba(59, 248, 251, 0.15),
          rgba(244, 196, 48, 0.1) 40%,
          transparent 70%
        )`,
      }}
    >
      {children}
    </div>
  );
};

// Enhanced Avatar Component
const Avatar = ({ user, size = "w-12 h-12", baseUrl, showOnline = false }) => {
  const getAvatarUrl = () => {
    if (!user?.avatar) return "/user-avatar.png";
    if (user.avatar.startsWith("http")) return user.avatar;
    return baseUrl + user.avatar;
  };

  return (
    <div className="relative">
      <motion.img
        whileHover={{ scale: 1.1 }}
        src={getAvatarUrl()}
        alt={user?.name || "User"}
        className={`${size} rounded-full object-cover border-3 border-white shadow-lg ring-2 ring-blue-100`}
        onError={(e) => {
          e.target.src = "/user-avatar.png";
        }}
      />
      {showOnline && (
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
      )}
    </div>
  );
};

// User Badge Component
const UserBadge = ({ user, size = "sm" }) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  if (user?.role === "admin") {
    return (
      <div
        className={`flex items-center space-x-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-full ${sizeClasses[size]}`}
      >
        <FaCrown size={size === "sm" ? 8 : 10} />
        <span>ADMIN</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center space-x-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full ${sizeClasses[size]}`}
    >
      <FaPray size={size === "sm" ? 8 : 10} />
      <span>DEVOTEE</span>
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

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const getRandomEngagement = () => ({
    likes: Math.floor(Math.random() * 50) + (post.likes?.length || 0),
    comments: Math.floor(Math.random() * 15) + 2,
    shares: Math.floor(Math.random() * 8) + 1,
  });

  const engagement = getRandomEngagement();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        type: "spring",
        stiffness: 80,
      }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Post Header - Like Instagram */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center space-x-3">
          <Avatar
            user={post.author}
            baseUrl={baseUrl}
            size="w-10 h-10"
            showOnline={Math.random() > 0.5}
          />
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-gray-900 text-sm">
                {post.author?.name || "Anonymous"}
              </h4>
              <UserBadge user={post.author} size="sm" />
            </div>
            <div className="flex items-center space-x-1 text-gray-500 text-xs">
              <span>{formatTimeAgo(post.createdAt)}</span>
              <FaDotCircle size={3} />
              <FaGlobe size={10} />
            </div>
          </div>
        </div>

        {/* Trending Badge */}
        {engagement.likes > 30 && (
          <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold rounded-full">
            <FaFire size={8} />
            <span>HOT</span>
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight">
          {post.title}
        </h3>

        <div className="text-gray-700 text-sm leading-relaxed">
          {showFullText ? (
            <p>{post.content}</p>
          ) : (
            <p>{truncateText(post.content, 120)}</p>
          )}

          {post.content.length > 120 && (
            <button
              onClick={() => setShowFullText(!showFullText)}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm ml-1"
            >
              {showFullText ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      </div>

      {/* Post Image - Instagram Style */}
      {post.image && (
        <div className="relative">
          <img
            src={
              post.image.startsWith("http") ? post.image : baseUrl + post.image
            }
            alt="Post content"
            className="w-full h-64 object-cover"
          />

          {/* Image Overlay for Full Post */}
          <Link to="/communityblog">
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
              <div className="bg-white bg-opacity-90 px-4 py-2 rounded-full flex items-center space-x-2 transform scale-90 hover:scale-100 transition-transform duration-200">
                <FaEye size={14} />
                <span className="text-sm font-medium">View Full Post</span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Engagement Section - Like Instagram */}
      <div className="p-4">
        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center space-x-1 ${
                isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
              } transition-colors duration-200`}
            >
              {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
            </motion.button>

            <button className="text-gray-600 hover:text-blue-500 transition-colors duration-200">
              <FaComment size={18} />
            </button>

            <button className="text-gray-600 hover:text-green-500 transition-colors duration-200">
              <FaShareAlt size={16} />
            </button>
          </div>

          <button className="text-gray-600 hover:text-yellow-500 transition-colors duration-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
            </svg>
          </button>
        </div>

        {/* Engagement Stats */}
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full border-2 border-white bg-gradient-to-r from-red-400 to-pink-500"
                ></div>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-900">
              {engagement.likes} likes
            </span>
          </div>

          <div className="text-sm text-gray-500">
            {engagement.comments} comments • {engagement.shares} shares
          </div>
        </div>

        {/* Call to Action */}
        <Link to="/communityblog">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover:border-blue-200 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
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
      <Link to="/communityblog">
        {post.image ? (
          <img
            src={
              post.image.startsWith("http") ? post.image : baseUrl + post.image
            }
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500"></div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>

        {/* Author Avatar */}
        <div className="absolute top-3 left-3">
          <Avatar user={post.author} baseUrl={baseUrl} size="w-8 h-8" />
        </div>

        {/* Title */}
        <div className="absolute bottom-3 left-3 right-3">
          <h4 className="text-white text-sm font-bold leading-tight line-clamp-2">
            {post.title}
          </h4>
          <div className="flex items-center space-x-1 mt-1">
            <FaHeart className="text-red-400" size={10} />
            <span className="text-white text-xs">
              {post.likes?.length || 0}
            </span>
          </div>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
            <FaPlay className="text-gray-800 ml-1" size={16} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Enhanced Stats Card Component
const StatsCard = ({ icon, value, label, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.05, y: -5 }}
    className="relative group"
  >
    <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
      <div
        className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg`}
      >
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-gray-600 text-sm font-medium">{label}</div>
    </div>
  </motion.div>
);

const Community = () => {
  const [topPosts, setTopPosts] = useState([]);
  const [storyPosts, setStoryPosts] = useState([]);
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
        const [postsRes] = await Promise.all([
          axios.get(import.meta.env.VITE_API_URL + "/blog"),
        ]);

        // Sort posts for main feed
        const sorted = postsRes.data
          .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
          .slice(0, 3);

        // Get posts with images for story-style display
        const withImages = postsRes.data
          .filter((post) => post.image)
          .slice(0, 5);

        setTopPosts(sorted);
        setStoryPosts(withImages);

        // Calculate stats
        setStats({
          members: postsRes.data.reduce((acc, post) => {
            const authorId = post.author?._id;
            return acc.includes(authorId) ? acc : [...acc, authorId];
          }, []).length,
          posts: postsRes.data.length,
          cities: Math.floor(Math.random() * 30) + 25,
          events: Math.floor(Math.random() * 50) + 30,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setTopPosts([]);
        setStoryPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="community" className="section py-24 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-purple-50/30 to-pink-50/40"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-pink-300/20 to-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title font-playfair text-4xl md:text-6xl mb-6 bg-gradient-to-r from-[#f4c430] via-[#01abfd] to-[#eec6d3] bg-clip-text text-transparent">
            Krishna Community Hub
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Connect, share wisdom, and grow together in our vibrant spiritual
            community
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <StatsCard
            icon={<FaUsers className="text-white text-xl" />}
            value={`${stats.members}+`}
            label="Active Members"
            color="from-blue-500 to-cyan-500"
            delay={0}
          />
          <StatsCard
            icon={<FaBlog className="text-white text-xl" />}
            value={`${stats.posts}+`}
            label="Posts Shared"
            color="from-purple-500 to-pink-500"
            delay={0.1}
          />
          <StatsCard
            icon={<FaMapMarkerAlt className="text-white text-xl" />}
            value={`${stats.cities}+`}
            label="Cities"
            color="from-green-500 to-teal-500"
            delay={0.2}
          />
          <StatsCard
            icon={<FaCalendarAlt className="text-white text-xl" />}
            value={`${stats.events}+`}
            label="Events"
            color="from-orange-500 to-red-500"
            delay={0.3}
          />
        </div>

        {/* Story-style Posts Preview */}
        {storyPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Featured Stories
              </h3>
              <Link
                to="/communityblog"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
              >
                <span>View All</span>
                <FaArrowRight size={12} />
              </Link>
            </div>

            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {storyPosts.map((post, index) => (
                <StoryCard
                  key={post._id}
                  post={post}
                  baseUrl={baseUrl}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Main Posts Feed */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Community Feed
              </h3>
              <p className="text-gray-600">
                Latest wisdom and discussions from our devotees
              </p>
            </div>

            <Link
              to="/communityblog"
              className="hidden md:flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <FaBlog />
              <span>Join Discussion</span>
            </Link>
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <AnimatePresence>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="h-32 bg-gray-200 rounded-lg mt-4"></div>
                  </div>
                ))
              ) : topPosts.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaBlog className="text-gray-400 text-2xl" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-700 mb-4">
                    No posts yet
                  </h4>
                  <p className="text-gray-500 mb-8">
                    Be the first to share wisdom with our community!
                  </p>
                  <Link
                    to="/communityblog"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <FaBlog className="mr-3" />
                    Create First Post
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

          {/* Final Call to Action */}
          {topPosts.length > 0 && (
            <div className="text-center">
              <Link
                to="/communityblog"
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-[#f4c430] via-[#01abfd] to-[#eec6d3] text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group"
              >
                <FaUserFriends className="mr-4 text-2xl" />
                <span>Join Our Community</span>
                <FaArrowRight className="ml-4 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              <p className="mt-4 text-gray-600">
                Connect with {stats.members}+ devotees sharing their spiritual
                journey
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Community;
