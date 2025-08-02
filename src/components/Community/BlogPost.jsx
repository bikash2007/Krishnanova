import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Added useParams import
import { motion, AnimatePresence } from "framer-motion";
import { useApi } from "../../Context/baseUrl";
import { useAuth } from "../../Context/AuthContext";
import Navigation from "../Navigation/Navigation";
import axios from "axios";
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaShareAlt,
  FaArrowLeft,
  FaCrown,
  FaPray,
  FaCalendarAlt,
  FaEye,
  FaBookmark,
  FaRegBookmark,
  FaQuoteLeft,
  FaGem,
  FaFeatherAlt,
  FaInfinity,
  FaUserFriends,
  FaGlobe,
  FaDotCircle,
  FaReply,
  FaEdit,
  FaTrash,
  FaPaperPlane,
  FaAward,
  FaThumbsUp,
  FaRegThumbsUp,
  FaSun, // Replace FaSparkles
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;

// Floating Particles Component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30"
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
            scale: [1, Math.random() * 0.5 + 0.5, 1],
          }}
          transition={{
            duration: Math.random() * 8 + 8,
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
const Avatar = ({ user, size = "w-16 h-16", baseUrl, artistic = true }) => {
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
          className={`${size} rounded-full object-cover border-4 ${
            artistic
              ? "border-white shadow-2xl ring-4 ring-purple-200/50"
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
          className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400"
        >
          <FaSun />
        </motion.div>
      )}
    </div>
  );
};

// User Badge Component
const UserBadge = ({ user, size = "md" }) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
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
        className={`flex items-center space-x-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-white font-bold rounded-full shadow-lg ${sizeClasses[size]}`}
      >
        <FaCrown size={size === "sm" ? 10 : size === "md" ? 12 : 14} />
        <span>ADMIN</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className={`flex items-center space-x-2 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-bold rounded-full shadow-lg ${sizeClasses[size]}`}
    >
      <FaPray size={size === "sm" ? 10 : size === "md" ? 12 : 14} />
      <span>DEVOTEE</span>
    </motion.div>
  );
};

// Comment Component
const CommentItem = ({
  comment,
  baseUrl,
  user,
  onReply,
  onLike,
  onEdit,
  onDelete,
  level = 0,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isLiked, setIsLiked] = useState(
    user && comment.likes?.includes(user._id)
  );
  const [likesCount, setLikesCount] = useState(comment.likes?.length || 0);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInMinutes = Math.floor((now - commentDate) / (1000 * 60));

    if (diffInMinutes < 1) return "now";
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  const handleReply = async () => {
    if (!replyContent.trim()) return;
    await onReply(comment._id, replyContent);
    setReplyContent("");
    setShowReplyForm(false);
  };

  const handleLike = async () => {
    const result = await onLike(comment._id);
    if (result) {
      setIsLiked(result.liked);
      setLikesCount(result.likes);
    }
  };

  const handleEdit = async () => {
    if (!editContent.trim()) return;
    await onEdit(comment._id, editContent);
    setIsEditing(false);
  };

  const isOwner = user && comment.author._id === user._id;
  const canReply = level < 2; // Limit reply depth

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${level > 0 ? "ml-8 mt-4" : "mb-6"}`}
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-4">
        {/* Comment Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Avatar
              user={comment.author}
              size="w-10 h-10"
              baseUrl={baseUrl}
              artistic={false}
            />
            <div>
              <div className="flex items-center space-x-2">
                <h5 className="font-semibold text-gray-900 text-sm">
                  {comment.author?.name}
                </h5>
                <UserBadge user={comment.author} size="sm" />
              </div>
              <span className="text-gray-500 text-xs">
                {formatTimeAgo(comment.createdAt)}
              </span>
            </div>
          </div>

          {isOwner && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
              >
                <FaEdit size={12} />
              </button>
              <button
                onClick={() => onDelete(comment._id)}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <FaTrash size={12} />
              </button>
            </div>
          )}
        </div>

        {/* Comment Content */}
        <div className="mb-3">
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                rows="3"
              />
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditContent(comment.content);
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 text-sm leading-relaxed">
              {comment.content}
            </p>
          )}
        </div>

        {/* Comment Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              disabled={!user}
              className={`flex items-center space-x-1 text-sm transition-colors duration-200 ${
                isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
              } disabled:opacity-50`}
            >
              {isLiked ? <FaThumbsUp size={14} /> : <FaRegThumbsUp size={14} />}
              <span>{likesCount}</span>
            </motion.button>

            {canReply && user && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500 transition-colors duration-200"
              >
                <FaReply size={12} />
                <span>Reply</span>
              </button>
            )}
          </div>
        </div>

        {/* Reply Form */}
        {showReplyForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="flex space-x-3">
              <Avatar
                user={user}
                size="w-8 h-8"
                baseUrl={baseUrl}
                artistic={false}
              />
              <div className="flex-1">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  rows="2"
                />
                <div className="flex items-center justify-end space-x-2 mt-2">
                  <button
                    onClick={() => setShowReplyForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReply}
                    disabled={!replyContent.trim()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
                  >
                    <FaPaperPlane size={12} />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              baseUrl={baseUrl}
              user={user}
              onReply={onReply}
              onLike={onLike}
              onEdit={onEdit}
              onDelete={onDelete}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

// Comment Form Component
const CommentForm = ({ user, baseUrl, onSubmit }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    await onSubmit(content);
    setContent("");
    setIsSubmitting(false);
  };

  if (!user) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-6 text-center">
        <p className="text-gray-600 mb-4">
          Please log in to join the discussion
        </p>
        <Link
          to="/login"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
        >
          <span>Sign In</span>
        </Link>
      </div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-6"
    >
      <div className="flex space-x-4">
        <Avatar
          user={user}
          size="w-12 h-12"
          baseUrl={baseUrl}
          artistic={false}
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts on this spiritual wisdom..."
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            rows="4"
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-500">
              {content.length}/500 characters
            </span>
            <button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <FaPaperPlane size={14} />
              )}
              <span>{isSubmitting ? "Posting..." : "Post Comment"}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.form>
  );
};

// Related Posts Component
const RelatedPost = ({ post, baseUrl, index }) => {
  const formatTimeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return postDate.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group"
    >
      <Link to={`/blog/${post._id}`}>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 overflow-hidden hover:shadow-xl transition-all duration-300">
          {post.image && (
            <div className="relative overflow-hidden h-32">
              <img
                src={
                  post.image.startsWith("http")
                    ? post.image
                    : baseUrl + post.image
                }
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          )}

          <div className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Avatar
                user={post.author}
                size="w-6 h-6"
                baseUrl={baseUrl}
                artistic={false}
              />
              <span className="text-xs text-gray-600">{post.author?.name}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-400">
                {formatTimeAgo(post.createdAt)}
              </span>
            </div>

            <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
              {post.title}
            </h4>

            <p className="text-gray-600 text-xs line-clamp-2">
              {post.content.substring(0, 80)}...
            </p>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-1 text-red-500">
                <FaHeart size={10} />
                <span className="text-xs">{post.likes?.length || 0}</span>
              </div>
              <span className="text-xs text-blue-600 font-medium">
                Read more →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const BlogPost = () => {
  const { id } = useParams(); // Now properly imported
  const navigate = useNavigate();
  const baseUrl = useApi();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    fetchPost();
    fetchComments();
    fetchRelatedPosts();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${API}/blog`);
      const foundPost = res.data.find((p) => p._id === id);

      if (!foundPost) {
        navigate("/communityblog");
        return;
      }

      setPost(foundPost);
      setLikesCount(foundPost.likes?.length || 0);
      setIsLiked(user && foundPost.likes?.includes(user._id));
    } catch (error) {
      console.error("Error fetching post:", error);
      navigate("/communityblog");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${API}/comments/post/${id}`);
      setComments(res.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const fetchRelatedPosts = async () => {
    try {
      const res = await axios.get(`${API}/blog`);
      const related = res.data
        .filter((p) => p._id !== id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setRelatedPosts(related);
    } catch (error) {
      console.error("Error fetching related posts:", error);
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate("/login?redirect=" + window.location.pathname);
      return;
    }

    try {
      await axios.post(
        `${API}/blog/${id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setIsLiked(!isLiked);
      setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.content.substring(0, 100) + "...",
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Post link copied to clipboard!");
    }
  };

  const handleCommentSubmit = async (content) => {
    try {
      await axios.post(
        `${API}/comments`,
        { postId: id, content },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleCommentReply = async (parentCommentId, content) => {
    try {
      await axios.post(
        `${API}/comments`,
        { postId: id, content, parentComment: parentCommentId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchComments();
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  const handleCommentLike = async (commentId) => {
    if (!user) return null;

    try {
      const res = await axios.post(
        `${API}/comments/${commentId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchComments();
      return res.data;
    } catch (error) {
      console.error("Error liking comment:", error);
      return null;
    }
  };

  const handleCommentEdit = async (commentId, content) => {
    try {
      await axios.put(
        `${API}/comments/${commentId}`,
        { content },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchComments();
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    try {
      await axios.delete(`${API}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} days ago`;
    return postDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-pink-50/60">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
          />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-pink-50/60">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Post not found
            </h2>
            <Link
              to="/communityblog"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Community
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/60 via-purple-50/40 to-pink-50/60">
      <Navigation />

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
        className="fixed top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl -z-10"
      />

      <div className="container max-w-4xl mx-auto px-6 pt-24 pb-16 relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/communityblog"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200 group"
          >
            <motion.div whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
              <FaArrowLeft />
            </motion.div>
            <span className="font-medium">Back to Community</span>
          </Link>
        </motion.div>

        {/* Main Post Card */}
        <motion.article
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-12"
        >
          {/* Artistic Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-white/50 backdrop-blur-xl rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 rounded-3xl"></div>

          {/* Floating Decorative Elements */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -right-4 w-8 h-8 text-pink-400 opacity-60"
          >
            <FaGem />
          </motion.div>

          <motion.div
            animate={{ rotate: -360, y: [0, -10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-4 -left-4 w-6 h-6 text-blue-400 opacity-40"
          >
            <FaFeatherAlt />
          </motion.div>

          <div className="relative border border-white/40 rounded-3xl shadow-2xl backdrop-blur-sm overflow-hidden">
            {/* Post Header */}
            <div className="p-8 pb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Avatar
                    user={post.author}
                    baseUrl={baseUrl}
                    size="w-16 h-16"
                    artistic={true}
                  />
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-bold text-gray-900 text-lg">
                        {post.author?.name || "Anonymous Devotee"}
                      </h4>
                      <UserBadge user={post.author} size="md" />
                    </div>
                    <div className="flex items-center space-x-3 text-gray-500 text-sm">
                      <FaCalendarAlt size={12} />
                      <span>{formatTimeAgo(post.createdAt)}</span>
                      <FaDotCircle size={4} />
                      <FaGlobe size={12} />
                      <span>Public Post</span>
                    </div>
                  </div>
                </div>

                {/* Trending Badge */}
                {likesCount > 20 && (
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white text-sm font-bold rounded-full shadow-lg"
                  >
                    <FaSun size={12} />
                    <span>TRENDING</span>
                  </motion.div>
                )}
              </div>

              {/* Post Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight"
              >
                {post.title}
              </motion.h1>

              {/* Engagement Stats */}
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
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
                  <span className="text-sm font-semibold text-gray-700">
                    {likesCount} likes
                  </span>
                </div>

                <div className="flex items-center space-x-1 text-gray-500">
                  <FaEye size={14} />
                  <span className="text-sm">
                    {Math.floor(Math.random() * 200) + 50} views
                  </span>
                </div>

                <div className="flex items-center space-x-1 text-gray-500">
                  <FaComment size={14} />
                  <span className="text-sm">{comments.length} comments</span>
                </div>
              </div>
            </div>

            {/* Post Image */}
            {post.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative mx-8 mb-8 overflow-hidden rounded-2xl shadow-2xl"
              >
                <img
                  src={
                    post.image.startsWith("http")
                      ? post.image
                      : baseUrl + post.image
                  }
                  alt={post.title}
                  className="w-full max-h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </motion.div>
            )}

            {/* Post Content */}
            <div className="px-8 pb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <FaQuoteLeft className="absolute -top-4 -left-4 text-blue-200/50 text-3xl" />
                <div className="text-gray-700 text-lg leading-relaxed pl-8 pr-4">
                  <p className="whitespace-pre-wrap font-light">
                    {post.content}
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200/50"
              >
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      isLiked
                        ? "text-red-500 bg-red-50 hover:bg-red-100"
                        : "text-gray-600 hover:text-red-500 hover:bg-red-50"
                    }`}
                  >
                    <motion.div
                      animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {isLiked ? (
                        <FaHeart size={20} />
                      ) : (
                        <FaRegHeart size={20} />
                      )}
                    </motion.div>
                    <span className="font-semibold">{likesCount}</span>
                  </motion.button>

                  <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition-all duration-300">
                    <FaComment size={18} />
                    <span className="font-semibold">{comments.length}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 hover:text-green-500 hover:bg-green-50 transition-all duration-300"
                  >
                    <FaShareAlt size={16} />
                    <span className="font-semibold">Share</span>
                  </button>
                </div>

                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isBookmarked
                      ? "text-yellow-500 bg-yellow-50 hover:bg-yellow-100"
                      : "text-gray-600 hover:text-yellow-500 hover:bg-yellow-50"
                  }`}
                >
                  {isBookmarked ? (
                    <FaBookmark size={18} />
                  ) : (
                    <FaRegBookmark size={18} />
                  )}
                </button>
              </motion.div>
            </div>
          </div>
        </motion.article>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
            >
              <FaComment className="text-white text-sm" />
            </motion.div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Community Discussion ({comments.length})
            </h3>
          </div>

          {/* Comment Form */}
          <div className="mb-8">
            <CommentForm
              user={user}
              baseUrl={baseUrl}
              onSubmit={handleCommentSubmit}
            />
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {commentsLoading ? (
              <div className="text-center py-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"
                />
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30">
                <FaComment className="text-gray-400 text-4xl mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-700 mb-2">
                  No comments yet
                </h4>
                <p className="text-gray-500">
                  Be the first to share your thoughts on this wisdom!
                </p>
              </div>
            ) : (
              <AnimatePresence>
                {comments.map((comment) => (
                  <CommentItem
                    key={comment._id}
                    comment={comment}
                    baseUrl={baseUrl}
                    user={user}
                    onReply={handleCommentReply}
                    onLike={handleCommentLike}
                    onEdit={handleCommentEdit}
                    onDelete={handleCommentDelete}
                  />
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16"
          >
            <div className="flex items-center space-x-3 mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
              >
                <FaInfinity className="text-white text-sm" />
              </motion.div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Continue Your Journey
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <RelatedPost
                  key={relatedPost._id}
                  post={relatedPost}
                  baseUrl={baseUrl}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Back to Community CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <Link
            to="/communityblog"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group"
          >
            <FaUserFriends className="mr-3 text-xl" />
            <span>Explore More Wisdom</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="ml-3"
            >
              <FaArrowLeft className="rotate-180" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
