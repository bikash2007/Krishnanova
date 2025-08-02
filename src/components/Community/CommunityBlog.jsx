import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../../Context/baseUrl";
import Navigation from "../Navigation/Navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaEdit,
  FaTrash,
  FaComment,
  FaPlus,
  FaImage,
  FaTimes,
  FaGlobe,
  FaBookmark,
  FaRegBookmark,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaPhone,
  FaEnvelope,
  FaTelegram,
  FaWhatsapp,
  FaCrown,
  FaPray,
  FaReply,
  FaPaperPlane,
  FaThumbsUp,
  FaRegThumbsUp,
  FaQuoteLeft,
  FaFeatherAlt,
  FaGem,
  FaSun,
  FaMoon,
  FaStar,
  FaCircle,
  FaLeaf,
  FaFire,
  FaMagic,
  FaUserPlus,
  FaUserMinus,
  FaInfoCircle,
  FaTicketAlt,
  FaHandsHelping,
  FaMusic,
  FaOm,
  FaLightbulb,
  FaBook,
  FaHourglass,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowRight,
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;
// Floating Sacred Elements Component
const FloatingSacredElements = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated Background Patterns */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 opacity-10"
      >
        <div className="w-full h-full bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur-3xl"></div>
      </motion.div>

      <motion.div
        animate={{
          rotate: -360,
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-1/4 right-1/4 w-48 h-48 opacity-15"
      >
        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl"></div>
      </motion.div>

      {/* Floating Sacred Symbols */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-orange-300/20 text-4xl"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
          }}
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + i * 8}%`,
          }}
        >
          {i % 4 === 0 ? "🕉️" : i % 4 === 1 ? "🪷" : i % 4 === 2 ? "✨" : "🙏"}
        </motion.div>
      ))}

      {/* Sacred Geometric Patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-purple-50/20 to-blue-50/30"></div>

      {/* Mandala-like Background */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-full opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #f97316 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%), 
                           radial-gradient(circle at 75% 25%, #06b6d4 0%, transparent 50%), 
                           radial-gradient(circle at 25% 75%, #ec4899 0%, transparent 50%)`,
        }}
      />
    </div>
  );
};

// Enhanced Badge Component
const UserBadge = ({ user, size = "md" }) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
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
        className={`flex items-center space-x-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold rounded-full shadow-lg ${sizeClasses[size]}`}
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

// Enhanced Avatar Component
const Avatar = ({ user, size = "w-10 h-10", baseUrl, artistic = false }) => {
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
            ? "p-1 bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500 rounded-full"
            : ""
        }`}
      >
        <img
          src={getAvatarUrl()}
          alt={user?.name || "User"}
          className={`${size} rounded-full object-cover border-3 ${
            artistic
              ? "border-white shadow-2xl ring-4 ring-orange-200/50"
              : "border-white/50 shadow-lg"
          }`}
          onError={(e) => {
            e.target.src = "/user-avatar.png";
          }}
        />
      </motion.div>
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

// Ultra Cool Tab Navigation Component
const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: "posts",
      label: "Sacred Posts",
      icon: FaFeatherAlt,
      color: "from-orange-400 to-red-500",
    },
    {
      id: "events",
      label: "Divine Events",
      icon: FaCalendarAlt,
      color: "from-purple-400 to-pink-500",
    },
  ];

  return (
    <div className="relative mb-12">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-300/20 via-purple-300/20 to-pink-300/20 blur-3xl"></div>

      <div className="relative flex justify-center">
        <motion.div
          className="bg-white/10 backdrop-blur-xl rounded-full p-1.5 shadow-2xl border border-white/20"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex items-center">
            {/* Sliding Background */}
            <motion.div
              className={`absolute inset-y-0 bg-gradient-to-r ${
                activeTab === "posts" ? tabs[0].color : tabs[1].color
              } rounded-full shadow-lg`}
              layoutId="activeTabBg"
              initial={false}
              animate={{
                x: activeTab === "posts" ? 0 : "100%",
                width: "50%",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />

            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center space-x-3 ${
                    isActive
                      ? "text-white"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{
                      rotate: isActive ? 360 : 0,
                      scale: isActive ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon size={20} />
                  </motion.div>
                  <span className="text-sm md:text-base">{tab.label}</span>

                  {/* Active Indicator Dot */}
                  {isActive && (
                    <motion.div
                      layoutId="activeDot"
                      className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-4xl"
        >
          {activeTab === "posts" ? "✍️" : "🎉"}
        </motion.div>
      </div>
    </div>
  );
};

// Comment Component with Enhanced Features
const CommentItem = React.memo(
  ({
    comment,
    postId,
    baseUrl,
    user,
    onReply,
    onLike,
    onEdit,
    onDelete,
    level = 0,
    onCommentUpdate,
  }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const [isLiked, setIsLiked] = useState(
      user && comment.likes?.includes(user._id)
    );
    const [likesCount, setLikesCount] = useState(comment.likes?.length || 0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formatTimeAgo = useCallback((date) => {
      const now = new Date();
      const commentDate = new Date(date);
      const diffInMinutes = Math.floor((now - commentDate) / (1000 * 60));

      if (diffInMinutes < 1) return "now";
      if (diffInMinutes < 60) return `${diffInMinutes}m`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
      return `${Math.floor(diffInMinutes / 1440)}d`;
    }, []);

    const handleReply = async () => {
      if (!replyContent.trim() || isSubmitting) return;
      setIsSubmitting(true);
      try {
        await onReply(comment._id, replyContent);
        setReplyContent("");
        setShowReplyForm(false);
      } catch (error) {
        console.error("Error replying:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleLike = async () => {
      if (!user || isSubmitting) return;
      setIsSubmitting(true);
      try {
        const result = await onLike(comment._id);
        if (result) {
          setIsLiked(result.liked);
          setLikesCount(result.likes);
        }
      } catch (error) {
        console.error("Error liking comment:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleEdit = async () => {
      if (!editContent.trim() || isSubmitting) return;
      setIsSubmitting(true);
      try {
        await onEdit(comment._id, editContent);
        setIsEditing(false);
        onCommentUpdate();
      } catch (error) {
        console.error("Error editing comment:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleDelete = async () => {
      if (
        !window.confirm("Are you sure you want to delete this comment?") ||
        isSubmitting
      )
        return;
      setIsSubmitting(true);
      try {
        await onDelete(comment._id);
        onCommentUpdate();
      } catch (error) {
        console.error("Error deleting comment:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    const isOwner = user && comment.author._id === user._id;
    const isAdmin = user?.role === "admin";
    const canDelete = isOwner || isAdmin;
    const canReply = level < 2 && user;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${level > 0 ? "ml-8 mt-4" : "mb-6"}`}
      >
        <div className="relative">
          {/* Sacred Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-orange-50/30 to-purple-50/20 backdrop-blur-sm rounded-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl"></div>

          {/* Floating Decorative Elements */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-2 -right-2 w-4 h-4 text-orange-300 opacity-60"
          >
            <FaGem />
          </motion.div>

          <div className="relative p-4 border border-white/40 rounded-2xl shadow-lg backdrop-blur-sm">
            {/* Comment Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Avatar
                  user={comment.author}
                  size="w-10 h-10"
                  baseUrl={baseUrl}
                  artistic={comment.author?.role === "admin"}
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h5 className="font-semibold text-gray-900 text-sm">
                      {comment.author?.name}
                    </h5>
                    <UserBadge user={comment.author} size="sm" />
                  </div>
                  <span className="text-gray-500 text-xs flex items-center space-x-1">
                    <FaClock size={10} />
                    <span>{formatTimeAgo(comment.createdAt)}</span>
                  </span>
                </div>
              </div>

              {canDelete && (
                <div className="flex items-center space-x-2">
                  {isOwner && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsEditing(true)}
                      disabled={isSubmitting}
                      className="text-gray-400 hover:text-blue-500 transition-colors duration-200 disabled:opacity-50"
                    >
                      <FaEdit size={12} />
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDelete}
                    disabled={isSubmitting}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200 disabled:opacity-50"
                  >
                    <FaTrash size={12} />
                  </motion.button>
                </div>
              )}
            </div>

            {/* Comment Content */}
            <div className="mb-3">
              {isEditing ? (
                <div className="space-y-3">
                  <div className="relative">
                    <FaQuoteLeft className="absolute -top-2 -left-2 text-orange-200/50 text-lg" />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full p-3 pl-6 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none bg-white/80 backdrop-blur-sm"
                      rows="3"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEdit}
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 disabled:opacity-50"
                    >
                      {isSubmitting ? "Saving..." : "Save"}
                    </motion.button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditContent(comment.content);
                      }}
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <FaQuoteLeft className="absolute -top-2 -left-2 text-orange-200/50 text-lg" />
                  <p className="text-gray-700 text-sm leading-relaxed pl-6">
                    {comment.content}
                  </p>
                </div>
              )}
            </div>

            {/* Comment Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLike}
                  disabled={!user || isSubmitting}
                  className={`flex items-center space-x-1 text-sm transition-colors duration-200 ${
                    isLiked
                      ? "text-red-500"
                      : "text-gray-500 hover:text-red-500"
                  } disabled:opacity-50`}
                >
                  <motion.div
                    animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {isLiked ? (
                      <FaThumbsUp size={14} />
                    ) : (
                      <FaRegThumbsUp size={14} />
                    )}
                  </motion.div>
                  <span>{likesCount}</span>
                </motion.button>

                {canReply && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowReplyForm(!showReplyForm)}
                    disabled={isSubmitting}
                    className="flex items-center space-x-1 text-sm text-gray-500 hover:text-orange-500 transition-colors duration-200 disabled:opacity-50"
                  >
                    <FaReply size={12} />
                    <span>Reply</span>
                  </motion.button>
                )}
              </div>
            </div>

            {/* Reply Form */}
            <AnimatePresence>
              {showReplyForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-orange-200/50"
                >
                  <div className="flex space-x-3">
                    <Avatar
                      user={user}
                      size="w-8 h-8"
                      baseUrl={baseUrl}
                      artistic={false}
                    />
                    <div className="flex-1">
                      <div className="relative">
                        <FaQuoteLeft className="absolute top-2 left-2 text-orange-200/50 text-sm" />
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Write a thoughtful reply..."
                          className="w-full p-3 pl-8 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none bg-white/80 backdrop-blur-sm"
                          rows="2"
                        />
                      </div>
                      <div className="flex items-center justify-end space-x-2 mt-2">
                        <button
                          onClick={() => setShowReplyForm(false)}
                          disabled={isSubmitting}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium disabled:opacity-50"
                        >
                          Cancel
                        </button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleReply}
                          disabled={!replyContent.trim() || isSubmitting}
                          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                        >
                          {isSubmitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                          ) : (
                            <FaPaperPlane size={12} />
                          )}
                          <span>{isSubmitting ? "Posting..." : "Reply"}</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply._id}
                  comment={reply}
                  postId={postId}
                  baseUrl={baseUrl}
                  user={user}
                  onReply={onReply}
                  onLike={onLike}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onCommentUpdate={onCommentUpdate}
                  level={level + 1}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  }
);

// Comment Form Component
const CommentForm = React.memo(({ user, baseUrl, onSubmit, postId }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(content);
      setContent("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-orange-50/30 to-purple-50/20 backdrop-blur-sm rounded-2xl"></div>
        <div className="relative p-6 border border-white/40 rounded-2xl shadow-lg backdrop-blur-sm text-center">
          <FaQuoteLeft className="text-orange-300 text-4xl mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            Please log in to join the divine discussion
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/login")}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg"
          >
            <FaSun className="mr-2" />
            <span>Sign In</span>
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-orange-50/30 to-purple-50/20 backdrop-blur-sm rounded-2xl"></div>
      <div className="relative p-6 border border-white/40 rounded-2xl shadow-lg backdrop-blur-sm">
        <div className="flex space-x-4">
          <Avatar
            user={user}
            size="w-12 h-12"
            baseUrl={baseUrl}
            artistic={user?.role === "admin"}
          />
          <div className="flex-1">
            <div className="relative">
              <FaQuoteLeft className="absolute top-3 left-3 text-orange-200/50 text-xl" />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your spiritual insights and wisdom..."
                className="w-full p-4 pl-12 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none bg-white/80 backdrop-blur-sm"
                rows="4"
                maxLength={500}
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FaFeatherAlt size={12} />
                <span>{content.length}/500 characters</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!content.trim() || isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white rounded-full font-semibold hover:from-orange-600 hover:via-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 shadow-lg"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <FaPaperPlane size={14} />
                )}
                <span>{isSubmitting ? "Sharing..." : "Share Wisdom"}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.form>
  );
});

// Enhanced Post Card with Comments
const PostCard = React.memo(
  ({ post, user, onLike, onShare, onEdit, onDelete, baseUrl, index }) => {
    const [showFullContent, setShowFullContent] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentsCount, setCommentsCount] = useState(0);
    const isFetchingRef = useRef(false);

    const isLiked = user && post.likes.includes(user._id);
    const isOwner = user && post.author._id === user._id;

    const formatTimeAgo = useCallback((date) => {
      const now = new Date();
      const postDate = new Date(date);
      const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));

      if (diffInHours < 1) return "Just now";
      if (diffInHours < 24) return `${diffInHours}h ago`;
      if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
      return postDate.toLocaleDateString();
    }, []);
    // Add this useEffect in PostCard component
    useEffect(() => {
      // Fetch comment count on mount
      const fetchCommentCount = async () => {
        try {
          const res = await axios.get(`${API}/comments/post/${post._id}/count`);
          setCommentsCount(res.data.count);
        } catch (error) {
          console.error("Error fetching comment count:", error);
        }
      };

      fetchCommentCount();
    }, [post._id]);

    const fetchComments = useCallback(async () => {
      if (isFetchingRef.current || commentsLoading) return;

      isFetchingRef.current = true;
      setCommentsLoading(true);

      try {
        const res = await axios.get(`${API}/comments/post/${post._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const allComments = res.data || [];

        // Filter only top-level comments (no parentComment)
        const topLevelComments = allComments.filter(
          (comment) => !comment.parentComment
        );

        // Build nested structure
        const commentsWithReplies = topLevelComments.map((comment) => {
          const replies = allComments.filter(
            (reply) => reply.parentComment === comment._id
          );
          return { ...comment, replies };
        });

        setComments(commentsWithReplies);
        setCommentsCount(allComments.length);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
        setCommentsCount(0);
      } finally {
        setCommentsLoading(false);
        isFetchingRef.current = false;
      }
    }, [post._id]);

    const handleCommentSubmit = useCallback(
      async (content) => {
        try {
          const response = await axios.post(
            `${API}/comments`,
            { postId: post._id, content },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 201) {
            await fetchComments();
          }
        } catch (error) {
          console.error("Error posting comment:", error);
          alert("Failed to post comment. Please try again.");
        }
      },
      [post._id, fetchComments]
    );

    const handleCommentReply = useCallback(
      async (parentCommentId, content) => {
        try {
          const response = await axios.post(
            `${API}/comments`,
            {
              postId: post._id,
              content,
              parentComment: parentCommentId,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 201) {
            await fetchComments();
          }
        } catch (error) {
          console.error("Error posting reply:", error);
          alert("Failed to post reply. Please try again.");
        }
      },
      [post._id, fetchComments]
    );

    useEffect(() => {
      if (showComments && comments.length === 0 && !commentsLoading) {
        fetchComments();
      }
    }, [showComments]);

    const handleShowComments = useCallback(() => {
      setShowComments((prev) => !prev);
    }, []);

    const handleCommentLike = useCallback(
      async (commentId) => {
        if (!user) return null;

        try {
          const res = await axios.post(
            `${API}/comments/${commentId}/like`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          fetchComments();
          return res.data;
        } catch (error) {
          console.error("Error liking comment:", error);
          return null;
        }
      },
      [user, fetchComments]
    );

    const handleCommentEdit = useCallback(
      async (commentId, content) => {
        try {
          await axios.put(
            `${API}/comments/${commentId}`,
            { content },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          fetchComments();
        } catch (error) {
          console.error("Error editing comment:", error);
        }
      },
      [fetchComments]
    );

    const handleCommentDelete = useCallback(
      async (commentId) => {
        try {
          await axios.delete(`${API}/comments/${commentId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          fetchComments();
        } catch (error) {
          console.error("Error deleting comment:", error);
        }
      },
      [fetchComments]
    );

    const shouldTruncate = post.content.length > 200;
    const displayContent = useMemo(() => {
      return shouldTruncate && !showFullContent
        ? post.content.substring(0, 200) + "..."
        : post.content;
    }, [post.content, shouldTruncate, showFullContent]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="relative group"
      >
        {/* Sacred Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-orange-50/30 to-purple-50/20 backdrop-blur-sm rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-purple-500/5 to-blue-500/5 rounded-3xl group-hover:from-orange-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500"></div>

        {/* Floating Decorative Elements */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-4 -right-4 w-8 h-8 text-orange-300 opacity-60"
        >
          <FaGem />
        </motion.div>

        <div className="relative border border-white/40 rounded-3xl shadow-2xl backdrop-blur-sm overflow-hidden hover:shadow-3xl transition-all duration-300">
          {/* Post Header */}
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar
                  user={post.author}
                  baseUrl={baseUrl}
                  artistic={post.author?.role === "admin"}
                />
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-gray-900 hover:text-orange-600 cursor-pointer transition-colors duration-200">
                      {post.author.name}
                    </h3>
                    <UserBadge user={post.author} />
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500 text-sm">
                    <FaClock size={12} />
                    <span>{formatTimeAgo(post.createdAt)}</span>
                    <span>•</span>
                    <FaGlobe size={12} />
                    <span>Public</span>
                  </div>
                </div>
              </div>

              {/* Action Menu */}
              <div className="flex items-center space-x-2">
                {isOwner && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEdit(post)}
                      className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all duration-200"
                      title="Edit post"
                    >
                      <FaEdit size={14} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDelete(post)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                      title="Delete post"
                    >
                      <FaTrash size={14} />
                    </motion.button>
                  </>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-full transition-all duration-200"
                  title="Bookmark"
                >
                  {isBookmarked ? (
                    <FaBookmark size={14} />
                  ) : (
                    <FaRegBookmark size={14} />
                  )}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="px-6 pb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
              {post.title}
            </h2>

            <div className="relative">
              <FaQuoteLeft className="absolute -top-2 -left-2 text-orange-200/50 text-xl" />
              <div className="text-gray-700 leading-relaxed pl-6">
                <p className="whitespace-pre-wrap">{displayContent}</p>
                {shouldTruncate && (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowFullContent(!showFullContent);
                      }}
                      className="text-orange-600 hover:text-orange-800 font-medium text-sm mt-2"
                    >
                      {showFullContent ? "Show less" : "Preview"}
                    </button>
                    <Link
                      to={`/blog/${post._id}`}
                      className="text-purple-600 hover:text-purple-800 font-medium text-sm mt-2 flex items-center space-x-1"
                    >
                      <span>Read Full Post</span>
                      <FaArrowRight size={12} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Post Image */}
          {post.image && (
            <div className="relative overflow-hidden mx-6 mb-4 rounded-2xl">
              <img
                src={
                  post.image.startsWith("http")
                    ? post.image
                    : baseUrl + post.image
                }
                alt="Post content"
                className="w-full max-h-96 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          {/* Post Actions */}
          <div className="p-6 pt-4 border-t border-orange-100/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <motion.button
                  onClick={() => onLike(post._id)}
                  disabled={!user}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 ${
                    isLiked
                      ? "text-red-500 bg-red-50 hover:bg-red-100"
                      : "text-gray-600 hover:text-red-500 hover:bg-red-50"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                  </motion.div>
                  <span className="font-semibold">{post.likes.length}</span>
                </motion.button>

                <motion.button
                  onClick={handleShowComments}
                  className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaComment size={16} />
                  <span className="font-semibold">{commentsCount}</span>
                </motion.button>

                <motion.button
                  onClick={() => onShare(post)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-600 hover:text-green-500 hover:bg-green-50 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaShareAlt size={16} />
                  <span className="font-semibold text-sm">Share</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-orange-100/50 bg-gradient-to-br from-orange-50/30 to-purple-50/20"
              >
                <div className="p-6">
                  {/* Comment Form */}
                  <div className="mb-6">
                    <CommentForm
                      user={user}
                      baseUrl={baseUrl}
                      onSubmit={handleCommentSubmit}
                      postId={post._id}
                    />
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {commentsLoading ? (
                      <div className="text-center py-8">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto"
                        />
                        <p className="text-gray-500 mt-2">
                          Loading sacred discussions...
                        </p>
                      </div>
                    ) : comments.length === 0 ? (
                      <div className="text-center py-12">
                        <FaQuoteLeft className="text-orange-300 text-4xl mx-auto mb-4" />
                        <h4 className="text-xl font-bold text-gray-700 mb-2">
                          No discussions yet
                        </h4>
                        <p className="text-gray-500">
                          Be the first to share your spiritual insights!
                        </p>
                      </div>
                    ) : (
                      <AnimatePresence mode="wait">
                        {comments.map((comment) => (
                          <CommentItem
                            key={comment._id}
                            comment={comment}
                            postId={post._id}
                            baseUrl={baseUrl}
                            user={user}
                            onReply={handleCommentReply}
                            onLike={handleCommentLike}
                            onEdit={handleCommentEdit}
                            onDelete={handleCommentDelete}
                            onCommentUpdate={fetchComments}
                          />
                        ))}
                      </AnimatePresence>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }
);

// Create Post Component
const CreatePost = ({ user, onSubmit, baseUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [posting, setPosting] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    setPosting(true);
    await onSubmit({ title, content, image });

    setTitle("");
    setContent("");
    setImage(null);
    setPreview(null);
    setIsExpanded(false);
    setPosting(false);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImage(null);
    setPreview(null);
    setIsExpanded(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-8"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-orange-50/30 to-purple-50/20 backdrop-blur-sm rounded-3xl"></div>
      <div className="relative border border-white/40 rounded-3xl shadow-xl backdrop-blur-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar
              user={user}
              baseUrl={baseUrl}
              artistic={user?.role === "admin"}
            />
            <button
              onClick={() => setIsExpanded(true)}
              className="flex-1 text-left px-4 py-3 bg-gradient-to-r from-orange-50 to-purple-50 hover:from-orange-100 hover:to-purple-100 rounded-full text-orange-600 transition-colors duration-200 font-medium border border-orange-200"
            >
              What sacred wisdom would you like to share,{" "}
              {user?.name?.split(" ")[0]}?
            </button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input
                  type="text"
                  placeholder="Give your wisdom a meaningful title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-orange-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 text-lg font-medium bg-white/80"
                  required
                />

                <div className="relative">
                  <FaQuoteLeft className="absolute top-3 left-3 text-orange-200/50 text-xl" />
                  <textarea
                    placeholder="Share your spiritual thoughts, experiences, or wisdom with the community..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-orange-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 min-h-[120px] resize-none bg-white/80"
                    required
                  />
                </div>

                {preview && (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full max-h-64 object-cover rounded-2xl"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setPreview(null);
                      }}
                      className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-full cursor-pointer transition-colors duration-200">
                      <FaImage size={16} />
                      <span className="font-medium">Add Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-full font-medium transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={!title || !content || posting}
                      className="px-8 py-2 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white rounded-full font-semibold hover:from-orange-600 hover:via-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {posting ? "Sharing..." : "Share Wisdom"}
                    </motion.button>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Community Event Card Component
const EventCard = React.memo(
  ({ event, user, onJoin, onLeave, onEdit, onDelete, baseUrl, index }) => {
    const isOrganizer = user && event.organizer._id === user._id;
    const isAdmin = user?.role === "admin";
    const hasJoined =
      user && event.participants.some((p) => p.user._id === user._id);
    const [showDetails, setShowDetails] = useState(false);

    const formatEventDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const getEventTypeIcon = (type) => {
      const iconMap = {
        kirtan: <FaMusic className="text-orange-500" />,
        satsang: <FaUsers className="text-purple-500" />,
        seva: <FaHandsHelping className="text-green-500" />,
        festival: <FaStar className="text-yellow-500" />,
        meditation: <FaOm className="text-indigo-500" />,
        workshop: <FaLightbulb className="text-blue-500" />,
        retreat: <FaLeaf className="text-teal-500" />,
        other: <FaCalendarAlt className="text-gray-500" />,
      };
      return iconMap[type] || iconMap["other"];
    };

    const getEventTypeColor = (type) => {
      const colorMap = {
        kirtan: "from-orange-400 to-red-500",
        satsang: "from-purple-400 to-pink-500",
        seva: "from-green-400 to-teal-500",
        festival: "from-yellow-400 to-orange-500",
        meditation: "from-indigo-400 to-purple-500",
        workshop: "from-blue-400 to-cyan-500",
        retreat: "from-teal-400 to-green-500",
        other: "from-gray-400 to-slate-500",
      };
      return colorMap[type] || colorMap["other"];
    };

    const getEventStatus = () => {
      const eventDate = new Date(event.dateTime);
      const now = new Date();

      if (eventDate < now) {
        return {
          text: "Completed",
          color: "text-gray-500",
          icon: <FaCheckCircle />,
        };
      } else if (eventDate - now < 24 * 60 * 60 * 1000) {
        return {
          text: "Starting Soon",
          color: "text-orange-500",
          icon: <FaExclamationCircle />,
        };
      } else {
        return { text: "Upcoming", color: "text-green-500", icon: <FaClock /> };
      }
    };

    const eventStatus = getEventStatus();

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="relative group"
      >
        {/* Sacred Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-purple-50/30 to-pink-50/20 backdrop-blur-sm rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5 rounded-3xl group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-orange-500/10 transition-all duration-500"></div>

        {/* Floating Event Type Icon */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
        >
          {getEventTypeIcon(event.eventType)}
        </motion.div>

        <div className="relative border border-white/40 rounded-3xl shadow-2xl backdrop-blur-sm overflow-hidden hover:shadow-3xl transition-all duration-300">
          {/* Event Image */}
          {event.image && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={
                  event.image.startsWith("http")
                    ? event.image
                    : baseUrl + event.image
                }
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              {/* Event Status Badge */}
              <div
                className={`absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full flex items-center space-x-2 ${eventStatus.color}`}
              >
                {eventStatus.icon}
                <span className="text-sm font-semibold">
                  {eventStatus.text}
                </span>
              </div>
            </div>
          )}

          {/* Event Header */}
          <div className="p-6 pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <span
                      className={`px-3 py-1 bg-gradient-to-r ${getEventTypeColor(
                        event.eventType
                      )} text-white rounded-full text-xs font-semibold capitalize`}
                    >
                      {event.eventType}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaHourglass size={12} />
                    <span>{event.duration} mins</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaUsers size={12} />
                    <span>
                      {event.participants.length}/{event.maxParticipants}
                    </span>
                  </div>
                </div>

                {/* Organizer Info */}
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar
                    user={event.organizer}
                    size="w-8 h-8"
                    baseUrl={baseUrl}
                    artistic={event.organizer.role === "admin"}
                  />
                  <div>
                    <p className="text-sm text-gray-600">Organized by</p>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">
                        {event.organizer.name}
                      </span>
                      <UserBadge user={event.organizer} size="sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Menu */}
              {(isOrganizer || isAdmin) && (
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onEdit(event)}
                    className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all duration-200"
                    title="Edit event"
                  >
                    <FaEdit size={14} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete(event)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                    title="Delete event"
                  >
                    <FaTrash size={14} />
                  </motion.button>
                </div>
              )}
            </div>

            {/* Event Details */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-700">
                <FaCalendarAlt
                  className="text-orange-500 flex-shrink-0"
                  size={16}
                />
                <span className="font-medium">
                  {formatEventDate(event.dateTime)}
                </span>
              </div>

              <div className="flex items-center space-x-3 text-gray-700">
                <FaMapMarkerAlt
                  className="text-red-500 flex-shrink-0"
                  size={16}
                />
                <span>
                  {event.location.address}, {event.location.city}
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed line-clamp-3">
                {event.description}
              </p>
            </div>
          </div>

          {/* Participants Preview */}
          {event.participants.length > 0 && (
            <div className="px-6 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Devotees Attending
                </span>
                <span className="text-xs text-gray-500">
                  {event.participants.length} joined
                </span>
              </div>
              <div className="flex items-center -space-x-2">
                {event.participants.slice(0, 8).map((participant, idx) => (
                  <Avatar
                    key={participant._id}
                    user={participant.user}
                    size="w-8 h-8"
                    baseUrl={baseUrl}
                    artistic={false}
                  />
                ))}
                {event.participants.length > 8 && (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold flex items-center justify-center shadow-lg"
                  >
                    +{event.participants.length - 8}
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* Event Actions */}
          <div className="p-6 pt-4 border-t border-purple-100/50">
            <div className="flex items-center justify-between">
              <motion.button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <FaInfoCircle size={16} />
                <span>{showDetails ? "Hide" : "View"} Details</span>
              </motion.button>

              {user && event.status === "upcoming" && (
                <motion.button
                  onClick={() =>
                    hasJoined ? onLeave(event._id) : onJoin(event._id)
                  }
                  disabled={
                    !hasJoined &&
                    event.participants.length >= event.maxParticipants
                  }
                  className={`flex items-center space-x-2 px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                    hasJoined
                      ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      : event.participants.length >= event.maxParticipants
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl"
                  }`}
                  whileHover={{
                    scale:
                      event.participants.length >= event.maxParticipants
                        ? 1
                        : 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {hasJoined ? (
                    <>
                      <FaUserMinus size={16} />
                      <span>Leave Event</span>
                    </>
                  ) : event.participants.length >= event.maxParticipants ? (
                    <>
                      <FaUsers size={16} />
                      <span>Event Full</span>
                    </>
                  ) : (
                    <>
                      <FaUserPlus size={16} />
                      <span>Join Event</span>
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>

          {/* Expanded Details */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-purple-100/50 bg-gradient-to-br from-purple-50/30 to-pink-50/20"
              >
                <div className="p-6 space-y-6">
                  {/* Requirements */}
                  {event.requirements && event.requirements.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                        <FaExclamationCircle className="text-orange-500" />
                        <span>Requirements</span>
                      </h4>
                      <ul className="space-y-2">
                        {event.requirements.map((req, idx) => (
                          <li
                            key={idx}
                            className="flex items-start space-x-2 text-gray-700"
                          >
                            <FaCheckCircle
                              className="text-green-500 mt-0.5 flex-shrink-0"
                              size={14}
                            />
                            <span className="text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Contact Information */}
                  {(event.contactDetails.email ||
                    event.contactDetails.phone) && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Contact Information
                      </h4>
                      <div className="space-y-2">
                        {event.contactDetails.email && (
                          <div className="flex items-center space-x-2 text-gray-700">
                            <FaEnvelope className="text-orange-500" size={14} />
                            <a
                              href={`mailto:${event.contactDetails.email}`}
                              className="hover:text-orange-600 text-sm"
                            >
                              {event.contactDetails.email}
                            </a>
                          </div>
                        )}
                        {event.contactDetails.phone && (
                          <div className="flex items-center space-x-2 text-gray-700">
                            <FaPhone className="text-green-500" size={14} />
                            <a
                              href={`tel:${event.contactDetails.phone}`}
                              className="hover:text-green-600 text-sm"
                            >
                              {event.contactDetails.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Share Event */}
                  <div className="pt-4 border-t border-purple-100">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">
                        Share Event:
                      </span>
                      <div className="flex items-center space-x-3">
                        {event.contactDetails.whatsapp && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-all duration-200"
                            onClick={() =>
                              window.open(
                                `https://wa.me/${
                                  event.contactDetails.whatsapp
                                }?text=${encodeURIComponent(
                                  `Join us for ${
                                    event.title
                                  } on ${formatEventDate(event.dateTime)} at ${
                                    event.location.address
                                  }, ${event.location.city}`
                                )}`,
                                "_blank"
                              )
                            }
                          >
                            <FaWhatsapp size={20} />
                          </motion.button>
                        )}
                        {event.contactDetails.telegram && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                            onClick={() =>
                              window.open(
                                `https://t.me/${event.contactDetails.telegram}`,
                                "_blank"
                              )
                            }
                          >
                            <FaTelegram size={20} />
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-200"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${event.title} - ${formatEventDate(
                                event.dateTime
                              )} at ${event.location.address}, ${
                                event.location.city
                              }`
                            );
                            alert("Event details copied to clipboard!");
                          }}
                        >
                          <FaShareAlt size={18} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }
);

// Create Event Component
const CreateEvent = ({ user, onSubmit, baseUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    eventType: "satsang",
    description: "",
    dateTime: "",
    duration: 60,
    location: {
      address: "",
      city: "",
    },
    maxParticipants: 50,
    requirements: [""],
    contactDetails: {
      email: "",
      phone: "",
      whatsapp: "",
      telegram: "",
    },
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [creating, setCreating] = useState(false);

  const eventTypes = [
    { value: "kirtan", label: "Kirtan", icon: FaMusic },
    { value: "satsang", label: "Satsang", icon: FaUsers },
    { value: "seva", label: "Seva", icon: FaHandsHelping },
    { value: "festival", label: "Festival", icon: FaStar },
    { value: "meditation", label: "Meditation", icon: FaOm },
    { value: "workshop", label: "Workshop", icon: FaLightbulb },
    { value: "retreat", label: "Retreat", icon: FaLeaf },
    { value: "other", label: "Other", icon: FaCalendarAlt },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !eventData.title ||
      !eventData.description ||
      !eventData.dateTime ||
      !eventData.location.address ||
      !eventData.location.city
    )
      return;

    setCreating(true);

    // Filter out empty requirements
    const filteredData = {
      ...eventData,
      requirements: eventData.requirements.filter((req) => req.trim() !== ""),
    };

    await onSubmit(filteredData);

    // Reset form
    setEventData({
      title: "",
      eventType: "satsang",
      description: "",
      dateTime: "",
      duration: 60,
      location: {
        address: "",
        city: "",
      },
      maxParticipants: 50,
      requirements: [""],
      contactDetails: {
        email: "",
        phone: "",
        whatsapp: "",
        telegram: "",
      },
      image: null,
    });
    setPreview(null);
    setIsExpanded(false);
    setCreating(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setEventData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setEventData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...eventData.requirements];
    newRequirements[index] = value;
    setEventData((prev) => ({ ...prev, requirements: newRequirements }));
  };

  const addRequirement = () => {
    setEventData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }));
  };

  const removeRequirement = (index) => {
    const newRequirements = eventData.requirements.filter(
      (_, i) => i !== index
    );
    setEventData((prev) => ({ ...prev, requirements: newRequirements }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-8"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-purple-50/30 to-pink-50/20 backdrop-blur-sm rounded-3xl"></div>
      <div className="relative border border-white/40 rounded-3xl shadow-xl backdrop-blur-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar
              user={user}
              baseUrl={baseUrl}
              artistic={user?.role === "admin"}
            />
            <button
              onClick={() => setIsExpanded(true)}
              className="flex-1 text-left px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-full text-purple-600 transition-colors duration-200 font-medium border border-purple-200"
            >
              Organize a divine gathering, {user?.name?.split(" ")[0]}...
            </button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <FaInfoCircle className="text-purple-500" />
                    <span>Event Information</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="title"
                      placeholder="Event title..."
                      value={eventData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                      required
                    />

                    <select
                      name="eventType"
                      value={eventData.eventType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                    >
                      {eventTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <textarea
                    name="description"
                    placeholder="Describe the divine event..."
                    value={eventData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 min-h-[120px] resize-none bg-white/80"
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="datetime-local"
                      name="dateTime"
                      value={eventData.dateTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                      required
                    />

                    <input
                      type="number"
                      name="duration"
                      placeholder="Duration (minutes)"
                      value={eventData.duration}
                      onChange={handleChange}
                      min="15"
                      max="480"
                      className="w-full px-4 py-3 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                      required
                    />

                    <input
                      type="number"
                      name="maxParticipants"
                      placeholder="Max participants"
                      value={eventData.maxParticipants}
                      onChange={handleChange}
                      min="1"
                      max="1000"
                      className="w-full px-4 py-3 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                      required
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>Location</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="location.address"
                      placeholder="Street address..."
                      value={eventData.location.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                      required
                    />

                    <input
                      type="text"
                      name="location.city"
                      placeholder="City..."
                      value={eventData.location.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                      required
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <FaExclamationCircle className="text-orange-500" />
                    <span>Requirements (Optional)</span>
                  </h3>

                  {eventData.requirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Add a requirement..."
                        value={req}
                        onChange={(e) =>
                          handleRequirementChange(index, e.target.value)
                        }
                        className="flex-1 px-4 py-3 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                      />
                      {eventData.requirements.length > 1 && (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeRequirement(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                        >
                          <FaTimes size={16} />
                        </motion.button>
                      )}
                    </div>
                  ))}

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addRequirement}
                    className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 font-medium"
                  >
                    <FaPlus size={14} />
                    <span>Add Requirement</span>
                  </motion.button>
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <FaPhone className="text-green-500" />
                    <span>Contact Information (Optional)</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      name="contactDetails.email"
                      placeholder="Contact email..."
                      value={eventData.contactDetails.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                    />

                    <input
                      type="tel"
                      name="contactDetails.phone"
                      placeholder="Contact phone..."
                      value={eventData.contactDetails.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                    />

                    <input
                      type="text"
                      name="contactDetails.whatsapp"
                      placeholder="WhatsApp number..."
                      value={eventData.contactDetails.whatsapp}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                    />

                    <input
                      type="text"
                      name="contactDetails.telegram"
                      placeholder="Telegram username..."
                      value={eventData.contactDetails.telegram}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/80"
                    />
                  </div>
                </div>

                {/* Event Image */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <FaImage className="text-blue-500" />
                    <span>Event Image (Optional)</span>
                  </h3>

                  {preview && (
                    <div className="relative">
                      <img
                        src={preview}
                        alt="Event preview"
                        className="w-full h-48 object-cover rounded-2xl"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setEventData((prev) => ({ ...prev, image: null }));
                          setPreview(null);
                        }}
                        className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200"
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  )}

                  <label className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-full cursor-pointer transition-colors duration-200 w-fit">
                    <FaImage size={16} />
                    <span className="font-medium">Choose Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-purple-100">
                  <button
                    type="button"
                    onClick={() => {
                      setIsExpanded(false);
                      setEventData({
                        title: "",
                        eventType: "satsang",
                        description: "",
                        dateTime: "",
                        duration: 60,
                        location: {
                          address: "",
                          city: "",
                        },
                        maxParticipants: 50,
                        requirements: [""],
                        contactDetails: {
                          email: "",
                          phone: "",
                          whatsapp: "",
                          telegram: "",
                        },
                        image: null,
                      });
                      setPreview(null);
                    }}
                    className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-full font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={creating}
                    className="px-8 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-full font-semibold hover:from-purple-600 hover:via-pink-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {creating ? "Creating Event..." : "Create Divine Event"}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

// Main Component
export default function CommunityBlog() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const baseUrl = useApi();
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");

  // Fetch posts
  const fetchPosts = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/blog`);
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);

  // Fetch events
  const fetchEvents = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/community-events`);
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login?redirect=/communityblog");
    } else if (user) {
      fetchPosts();
      fetchEvents();
    }
  }, [user, loading, navigate, fetchPosts, fetchEvents]);

  // Post handlers
  const handleCreatePost = useCallback(
    async ({ title, content, image }) => {
      const form = new FormData();
      form.append("title", title);
      form.append("content", content);
      if (image) form.append("image", image);

      try {
        await axios.post(`${API}/blog`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
        fetchPosts();
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
    [fetchPosts]
  );

  const handleLike = useCallback(
    async (id) => {
      if (!user) return navigate("/login?redirect=/communityblog");

      try {
        await axios.post(
          `${API}/blog/${id}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchPosts();
      } catch (error) {
        console.error("Error liking post:", error);
      }
    },
    [user, navigate, fetchPosts]
  );

  const handleShare = useCallback((post) => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.content,
          url: window.location.href + "#" + post._id,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href + "#" + post._id);
      alert("Post link copied to clipboard!");
    }
  }, []);

  const handleEditPost = useCallback((post) => {
    console.log("Edit post:", post);
    // TODO: Implement edit functionality
  }, []);

  const handleDeletePost = useCallback(
    async (post) => {
      if (!window.confirm("Are you sure you want to delete this post?")) return;

      try {
        await axios.delete(`${API}/blog/${post._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        fetchPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },
    [fetchPosts]
  );

  // Event handlers
  const handleCreateEvent = useCallback(
    async (eventData) => {
      const formData = new FormData();

      // Append all fields to FormData
      Object.keys(eventData).forEach((key) => {
        if (key === "location" || key === "contactDetails") {
          formData.append(key, JSON.stringify(eventData[key]));
        } else if (key === "requirements") {
          formData.append(key, JSON.stringify(eventData[key]));
        } else if (key === "image" && eventData[key]) {
          formData.append("image", eventData[key]);
        } else if (key !== "image") {
          formData.append(key, eventData[key]);
        }
      });

      try {
        await axios.post(`${API}/community-events`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
        fetchEvents();
      } catch (error) {
        console.error("Error creating event:", error);
        alert("Failed to create event. Please try again.");
      }
    },
    [fetchEvents]
  );

  const handleJoinEvent = useCallback(
    async (eventId) => {
      if (!user) return navigate("/login?redirect=/communityblog");

      try {
        await axios.post(
          `${API}/community-events/${eventId}/join`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchEvents();
      } catch (error) {
        console.error("Error joining event:", error);
      }
    },
    [user, navigate, fetchEvents]
  );

  const handleLeaveEvent = useCallback(
    async (eventId) => {
      try {
        await axios.post(
          `${API}/community-events/${eventId}/leave`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchEvents();
      } catch (error) {
        console.error("Error leaving event:", error);
      }
    },
    [fetchEvents]
  );

  const handleEditEvent = useCallback((event) => {
    console.log("Edit event:", event);
    // TODO: Implement edit functionality
  }, []);

  const handleDeleteEvent = useCallback(
    async (event) => {
      if (!window.confirm("Are you sure you want to delete this event?"))
        return;

      try {
        await axios.delete(`${API}/community-events/${event._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        fetchEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    },
    [fetchEvents]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <FloatingSacredElements />
        <div className="relative z-10 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 text-lg">Loading sacred community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50">
      <Navigation />
      <FloatingSacredElements />

      <div className="relative z-10 max-w-2xl mx-auto pt-24 px-4 pb-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent mb-2"
          >
            🕉️ Krishna Community
          </motion.h1>
          <p className="text-gray-600 text-lg">
            {activeTab === "posts"
              ? "Share divine wisdom and connect with fellow devotees"
              : "Join sacred gatherings and spiritual events"}
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content based on active tab */}
        <AnimatePresence mode="wait">
          {activeTab === "posts" ? (
            <motion.div
              key="posts"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Create Post */}
              {user && (
                <CreatePost
                  user={user}
                  onSubmit={handleCreatePost}
                  baseUrl={baseUrl}
                />
              )}

              {/* Posts Feed */}
              <div className="space-y-8">
                <AnimatePresence>
                  {posts.map((post, index) => (
                    <PostCard
                      key={post._id}
                      post={post}
                      user={user}
                      onLike={handleLike}
                      onShare={handleShare}
                      onEdit={handleEditPost}
                      onDelete={handleDeletePost}
                      baseUrl={baseUrl}
                      index={index}
                    />
                  ))}
                </AnimatePresence>

                {posts.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <FaQuoteLeft className="text-orange-300 text-6xl mx-auto mb-6" />
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      No sacred wisdom shared yet
                    </h3>
                    <p className="text-gray-600 mb-8">
                      Be the first to illuminate the community with divine
                      insights!
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="events"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Create Event */}
              {user && (
                <CreateEvent
                  user={user}
                  onSubmit={handleCreateEvent}
                  baseUrl={baseUrl}
                />
              )}

              {/* Events Feed */}
              <div className="space-y-8">
                <AnimatePresence>
                  {events.map((event, index) => (
                    <EventCard
                      key={event._id}
                      event={event}
                      user={user}
                      onJoin={handleJoinEvent}
                      onLeave={handleLeaveEvent}
                      onEdit={handleEditEvent}
                      onDelete={handleDeleteEvent}
                      baseUrl={baseUrl}
                      index={index}
                    />
                  ))}
                </AnimatePresence>

                {events.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <FaCalendarAlt className="text-purple-300 text-6xl mx-auto mb-6" />
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      No community events yet
                    </h3>
                    <p className="text-gray-600 mb-8">
                      Be the first to organize a divine gathering!
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
