import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
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
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;

// Badge Component
const UserBadge = ({ user }) => {
  if (user?.role === "admin") {
    return (
      <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
        <FaCrown size={10} />
        <span>ADMIN</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full">
      <FaPray size={10} />
      <span>DEVOTEE</span>
    </div>
  );
};

// Avatar Component with proper URL handling
const Avatar = ({ user, size = "w-10 h-10", baseUrl }) => {
  const getAvatarUrl = () => {
    if (!user?.avatar) return "/user-avatar.png";
    if (user.avatar.startsWith("http")) return user.avatar;
    return baseUrl + user.avatar;
  };

  return (
    <img
      src={getAvatarUrl()}
      alt={user?.name || "User"}
      className={`${size} rounded-full object-cover border-2 border-white shadow-lg`}
      onError={(e) => {
        e.target.src = "/user-avatar.png";
      }}
    />
  );
};

// Event Card Component
const EventCard = ({ event, user, onJoin, onLeave, baseUrl, index }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  const isJoined =
    user && event.participants.some((p) => p.user._id === user._id);
  const isOrganizer = user && event.organizer._id === user._id;
  const isFull =
    event.maxParticipants && event.participants.length >= event.maxParticipants;
  const isPast = new Date(event.dateTime) < new Date();

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getEventTypeColor = (type) => {
    const colors = {
      meditation: "from-green-500 to-teal-600",
      prayer: "from-blue-500 to-indigo-600",
      discourse: "from-purple-500 to-pink-600",
      festival: "from-yellow-500 to-orange-600",
      community_service: "from-red-500 to-pink-600",
      other: "from-gray-500 to-gray-600",
    };
    return colors[type] || colors.other;
  };

  const getEventTypeIcon = (type) => {
    const icons = {
      meditation: "🧘",
      prayer: "🙏",
      discourse: "📖",
      festival: "🎉",
      community_service: "🤝",
      other: "📅",
    };
    return icons[type] || icons.other;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      {/* Event Header */}
      <div className="relative">
        {event.image && (
          <img
            src={
              event.image.startsWith("http")
                ? event.image
                : baseUrl + event.image
            }
            alt="Event"
            className="w-full h-48 object-cover"
          />
        )}
        <div
          className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${getEventTypeColor(
            event.eventType
          )} text-white text-sm font-bold rounded-full flex items-center space-x-1`}
        >
          <span>{getEventTypeIcon(event.eventType)}</span>
          <span>{event.eventType.replace("_", " ").toUpperCase()}</span>
        </div>
        {isFull && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
            FULL
          </div>
        )}
        {isPast && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-gray-500 text-white text-sm font-bold rounded-full">
            PAST
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="p-6">
        {/* Organizer Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar user={event.organizer} baseUrl={baseUrl} />
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-bold text-gray-900">
                  {event.organizer.name}
                </h4>
                <UserBadge user={event.organizer} />
              </div>
              <p className="text-gray-500 text-sm">Event Organizer</p>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h2>

        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-3 text-gray-600">
            <FaCalendarAlt className="text-blue-500" />
            <span className="font-medium">
              {formatDateTime(event.dateTime)}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-gray-600">
            <FaClock className="text-green-500" />
            <span>{formatDuration(event.duration)}</span>
          </div>

          <div className="flex items-center space-x-3 text-gray-600">
            <FaMapMarkerAlt className="text-red-500" />
            <span>
              {event.location.address}, {event.location.city}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-gray-600">
            <FaUsers className="text-purple-500" />
            <span>
              {event.participants.length} joined
              {event.maxParticipants && ` / ${event.maxParticipants} max`}
            </span>
          </div>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">
          {showDetails
            ? event.description
            : `${event.description.substring(0, 150)}...`}
          {event.description.length > 150 && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-600 hover:text-blue-800 font-medium ml-2"
            >
              {showDetails ? "Show less" : "Read more"}
            </button>
          )}
        </p>

        {/* Requirements */}
        {event.requirements && event.requirements.length > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">
              Requirements:
            </h4>
            <ul className="text-yellow-700 text-sm space-y-1">
              {event.requirements.map((req, idx) => (
                <li key={idx}>• {req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Participants Preview */}
        {event.participants.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800">Participants</h4>
              <button
                onClick={() => setShowParticipants(!showParticipants)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {showParticipants ? "Hide" : "View all"}
              </button>
            </div>

            <div className="flex -space-x-2">
              {event.participants.slice(0, 5).map((participant, idx) => (
                <Avatar
                  key={idx}
                  user={participant.user}
                  size="w-8 h-8"
                  baseUrl={baseUrl}
                />
              ))}
              {event.participants.length > 5 && (
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
                  +{event.participants.length - 5}
                </div>
              )}
            </div>

            {showParticipants && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3 space-y-2 max-h-40 overflow-y-auto"
              >
                {event.participants.map((participant, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg"
                  >
                    <Avatar
                      user={participant.user}
                      size="w-6 h-6"
                      baseUrl={baseUrl}
                    />
                    <span className="text-sm font-medium">
                      {participant.user.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      Joined{" "}
                      {new Date(participant.joinedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        )}

        {/* Contact Information */}
        {event.contactDetails &&
          Object.keys(event.contactDetails).length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">
                Contact Organizer:
              </h4>
              <div className="flex flex-wrap gap-2">
                {event.contactDetails.phone && (
                  <a
                    href={`tel:${event.contactDetails.phone}`}
                    className="flex items-center space-x-1 px-2 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600"
                  >
                    <FaPhone size={10} />
                    <span>Call</span>
                  </a>
                )}
                {event.contactDetails.email && (
                  <a
                    href={`mailto:${event.contactDetails.email}`}
                    className="flex items-center space-x-1 px-2 py-1 bg-blue-500 text-white text-xs rounded-full hover:bg-blue-600"
                  >
                    <FaEnvelope size={10} />
                    <span>Email</span>
                  </a>
                )}
                {event.contactDetails.telegram && (
                  <a
                    href={`https://t.me/${event.contactDetails.telegram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 px-2 py-1 bg-blue-400 text-white text-xs rounded-full hover:bg-blue-500"
                  >
                    <FaTelegram size={10} />
                    <span>Telegram</span>
                  </a>
                )}
                {event.contactDetails.whatsapp && (
                  <a
                    href={`https://wa.me/${event.contactDetails.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 px-2 py-1 bg-green-600 text-white text-xs rounded-full hover:bg-green-700"
                  >
                    <FaWhatsapp size={10} />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            {!isPast && !isOrganizer && user && (
              <>
                {isJoined ? (
                  <button
                    onClick={() => onLeave(event._id)}
                    className="px-6 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-colors duration-200"
                  >
                    Leave Event
                  </button>
                ) : (
                  <button
                    onClick={() => onJoin(event._id)}
                    disabled={isFull}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isFull ? "Event Full" : "Join Event"}
                  </button>
                )}
              </>
            )}

            {isOrganizer && (
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold text-sm">
                Your Event
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all duration-200">
              <FaShareAlt size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-full transition-all duration-200">
              <FaBookmark size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Post Card with Badge
const PostCard = ({
  post,
  user,
  onLike,
  onShare,
  onEdit,
  onDelete,
  baseUrl,
  index,
}) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const isLiked = user && post.likes.includes(user._id);
  const isOwner = user && post.author._id === user._id;

  const formatTimeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return postDate.toLocaleDateString();
  };

  const shouldTruncate = post.content.length > 200;
  const displayContent =
    shouldTruncate && !showFullContent
      ? post.content.substring(0, 200) + "..."
      : post.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar user={post.author} baseUrl={baseUrl} />
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-bold text-gray-900 hover:text-blue-600 cursor-pointer">
                  {post.author.name}
                </h3>
                <UserBadge user={post.author} />
              </div>
              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <span>{formatTimeAgo(post.createdAt)}</span>
                <span>•</span>
                <FaGlobe size={12} />
              </div>
            </div>
          </div>

          {/* Action Menu */}
          <div className="flex items-center space-x-2">
            {isOwner && (
              <>
                <button
                  onClick={() => onEdit(post)}
                  className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all duration-200"
                  title="Edit post"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => onDelete(post)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                  title="Delete post"
                >
                  <FaTrash size={14} />
                </button>
              </>
            )}
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-full transition-all duration-200"
              title="Bookmark"
            >
              {isBookmarked ? (
                <FaBookmark size={14} />
              ) : (
                <FaRegBookmark size={14} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-6 pb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
          {post.title}
        </h2>

        <div className="text-gray-700 leading-relaxed">
          <p className="whitespace-pre-wrap">{displayContent}</p>
          {shouldTruncate && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm mt-2 transition-colors duration-200"
            >
              {showFullContent ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="relative overflow-hidden">
          <img
            src={
              post.image.startsWith("http") ? post.image : baseUrl + post.image
            }
            alt="Post content"
            className="w-full max-h-96 object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Post Actions */}
      <div className="p-6 pt-4 border-t border-gray-50">
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

            <button className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200">
              <FaComment size={16} />
              <span className="font-semibold">0</span>
            </button>

            <button
              onClick={() => onShare(post)}
              className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-600 hover:text-green-500 hover:bg-green-50 transition-all duration-200"
            >
              <FaShareAlt size={16} />
              <span className="font-semibold text-sm">Share</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Create Event Component
const CreateEvent = ({ user, onSubmit, baseUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "meditation",
    address: "",
    city: "",
    dateTime: "",
    duration: 60,
    maxParticipants: "",
    requirements: [],
    contactDetails: {
      phone: "",
      email: "",
      telegram: "",
      whatsapp: "",
    },
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [posting, setPosting] = useState(false);
  const [newRequirement, setNewRequirement] = useState("");

  const eventTypes = [
    {
      value: "meditation",
      label: "🧘 Meditation Session",
      color: "from-green-500 to-teal-600",
    },
    {
      value: "prayer",
      label: "🙏 Prayer Meeting",
      color: "from-blue-500 to-indigo-600",
    },
    {
      value: "discourse",
      label: "📖 Spiritual Discourse",
      color: "from-purple-500 to-pink-600",
    },
    {
      value: "festival",
      label: "🎉 Festival Celebration",
      color: "from-yellow-500 to-orange-600",
    },
    {
      value: "community_service",
      label: "🤝 Community Service",
      color: "from-red-500 to-pink-600",
    },
    {
      value: "other",
      label: "📅 Other Event",
      color: "from-gray-500 to-gray-600",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      contactDetails: { ...prev.contactDetails, [field]: value },
    }));
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()],
      }));
      setNewRequirement("");
    }
  };

  const removeRequirement = (index) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      !formData.address ||
      !formData.city ||
      !formData.dateTime
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setPosting(true);
    await onSubmit({ ...formData, image });

    // Reset form
    setFormData({
      title: "",
      description: "",
      eventType: "meditation",
      address: "",
      city: "",
      dateTime: "",
      duration: 60,
      maxParticipants: "",
      requirements: [],
      contactDetails: { phone: "", email: "", telegram: "", whatsapp: "" },
    });
    setImage(null);
    setPreview(null);
    setIsExpanded(false);
    setPosting(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      eventType: "meditation",
      address: "",
      city: "",
      dateTime: "",
      duration: 60,
      maxParticipants: "",
      requirements: [],
      contactDetails: { phone: "", email: "", telegram: "", whatsapp: "" },
    });
    setImage(null);
    setPreview(null);
    setIsExpanded(false);
    setNewRequirement("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8"
    >
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar user={user} baseUrl={baseUrl} />
          <button
            onClick={() => setIsExpanded(true)}
            className="flex-1 text-left px-4 py-3 bg-gradient-to-r from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 rounded-full text-orange-600 transition-colors duration-200 font-medium border border-orange-200"
          >
            🎉 Organize a spiritual event for the community...
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
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Event title *"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-lg font-medium"
                  required
                />

                <select
                  value={formData.eventType}
                  onChange={(e) =>
                    handleInputChange("eventType", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                >
                  {eventTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                placeholder="Describe your event, its purpose, and what participants can expect... *"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 min-h-[120px] resize-none"
                required
              />

              {/* Location */}
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full address *"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  required
                />

                <input
                  type="text"
                  placeholder="City *"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  required
                />
              </div>

              {/* Date and Duration */}
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="datetime-local"
                  value={formData.dateTime}
                  onChange={(e) =>
                    handleInputChange("dateTime", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  required
                />

                <input
                  type="number"
                  placeholder="Duration (minutes)"
                  value={formData.duration}
                  onChange={(e) =>
                    handleInputChange("duration", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  min="15"
                />

                <input
                  type="number"
                  placeholder="Max participants (optional)"
                  value={formData.maxParticipants}
                  onChange={(e) =>
                    handleInputChange("maxParticipants", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  min="1"
                />
              </div>

              {/* Requirements */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Requirements (What should participants bring/know?)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Add a requirement..."
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addRequirement())
                    }
                  />
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200"
                  >
                    Add
                  </button>
                </div>
                {formData.requirements.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.requirements.map((req, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        <span>{req}</span>
                        <button
                          type="button"
                          onClick={() => removeRequirement(index)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Details */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Contact Information (How can participants reach you?)
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={formData.contactDetails.phone}
                    onChange={(e) =>
                      handleContactChange("phone", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={formData.contactDetails.email}
                    onChange={(e) =>
                      handleContactChange("email", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Telegram username"
                    value={formData.contactDetails.telegram}
                    onChange={(e) =>
                      handleContactChange("telegram", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    placeholder="WhatsApp number"
                    value={formData.contactDetails.whatsapp}
                    onChange={(e) =>
                      handleContactChange("whatsapp", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Event Image (Optional)
                </label>
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
                <label className="flex items-center justify-center space-x-2 px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-2xl cursor-pointer transition-colors duration-200 border-2 border-dashed border-blue-300">
                  <FaImage size={20} />
                  <span className="font-medium">Upload Event Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-full font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={posting}
                  className="px-8 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {posting ? "Creating Event..." : "Create Event"}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Create Post Component (simplified version of the original)
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
      className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8"
    >
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar user={user} baseUrl={baseUrl} />
          <button
            onClick={() => setIsExpanded(true)}
            className="flex-1 text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 transition-colors duration-200"
          >
            What's on your mind, {user?.name?.split(" ")[0]}?
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
                placeholder="Give your post a catchy title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-lg font-medium"
                required
              />

              <textarea
                placeholder="Share your thoughts, stories, or wisdom with the community..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 min-h-[120px] resize-none"
                required
              />

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
                  <label className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-full cursor-pointer transition-colors duration-200">
                    <FaImage size={16} />
                    <span className="font-medium">Photo</span>
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
                  <button
                    type="submit"
                    disabled={!title || !content || posting}
                    className="px-8 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {posting ? "Posting..." : "Post"}
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
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
  const [activeTab, setActiveTab] = useState("posts"); // 'posts' or 'events'
  const [editPost, setEditPost] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/login?redirect=/communityblog");
    else {
      fetchPosts();
      fetchEvents();
    }
    // eslint-disable-next-line
  }, [user, loading]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API}/blog`);
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API}/community-events`); // Changed endpoint
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleCreatePost = async ({ title, content, image }) => {
    const form = new FormData();
    form.append("title", title);
    form.append("content", content);
    if (image) form.append("image", image);

    await axios.post(`${API}/blog`, form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    fetchPosts();
  };

  const handleCreateEvent = async (eventData) => {
    const form = new FormData();

    // Append all form fields
    Object.keys(eventData).forEach((key) => {
      if (key === "image" && eventData[key]) {
        form.append("image", eventData[key]);
      } else if (key === "requirements" || key === "contactDetails") {
        form.append(key, JSON.stringify(eventData[key]));
      } else if (
        eventData[key] !== "" &&
        eventData[key] !== null &&
        eventData[key] !== undefined
      ) {
        form.append(key, eventData[key]);
      }
    });

    try {
      await axios.post(`${API}/community-events`, form, {
        // Changed endpoint
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
  };

  const handleJoinEvent = async (eventId) => {
    try {
      await axios.post(
        `${API}/community-events/${eventId}/join`, // Changed endpoint
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchEvents();
    } catch (error) {
      console.error("Error joining event:", error);
      alert(error.response?.data?.message || "Failed to join event");
    }
  };

  const handleLeaveEvent = async (eventId) => {
    try {
      await axios.post(
        `${API}/community-events/${eventId}/leave`, // Changed endpoint
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchEvents();
    } catch (error) {
      console.error("Error leaving event:", error);
      alert("Failed to leave event");
    }
  };

  const handleLike = async (id) => {
    if (!user) return navigate("/login?redirect=/communityblog");

    try {
      await axios.post(
        `${API}/blog/${id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchPosts();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleShare = (post) => {
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
  };

  const handleEdit = (post) => {
    setEditPost(post);
    setShowEditModal(true);
  };

  const handleDelete = async (post) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`${API}/blog/${post._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-8 w-96 h-96 bg-gradient-to-br from-pink-300/20 to-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto pt-24 px-4 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            ✨ Krishna Community
          </h1>
          <p className="text-gray-600 text-lg">
            Share wisdom, organize events, and connect with fellow devotees
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mb-8"
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            <button
              onClick={() => setActiveTab("posts")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === "posts"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              📝 Posts & Discussions
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === "events"
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              🎉 Events & Gatherings
            </button>
          </div>
        </motion.div>

        {/* Content based on active tab */}
        {user && (
          <>
            {activeTab === "posts" && (
              <CreatePost
                user={user}
                onSubmit={handleCreatePost}
                baseUrl={baseUrl}
              />
            )}
            {activeTab === "events" && (
              <CreateEvent
                user={user}
                onSubmit={handleCreateEvent}
                baseUrl={baseUrl}
              />
            )}
          </>
        )}

        {/* Posts/Events Feed */}
        <div className="space-y-6">
          {activeTab === "posts" && (
            <>
              {posts.map((post, index) => (
                <PostCard
                  key={post._id}
                  post={post}
                  user={user}
                  onLike={handleLike}
                  onShare={handleShare}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  baseUrl={baseUrl}
                  index={index}
                />
              ))}

              {posts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                    <FaPlus className="text-gray-400" size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    No posts yet
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Be the first to inspire the community with your wisdom!
                  </p>
                </motion.div>
              )}
            </>
          )}

          {activeTab === "events" && (
            <>
              {events.map((event, index) => (
                <EventCard
                  key={event._id}
                  event={event}
                  user={user}
                  onJoin={handleJoinEvent}
                  onLeave={handleLeaveEvent}
                  baseUrl={baseUrl}
                  index={index}
                />
              ))}

              {events.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-red-200 rounded-full flex items-center justify-center">
                    <FaCalendarAlt className="text-orange-400" size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    No events yet
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Be the first to organize a spiritual gathering for the
                    community!
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
