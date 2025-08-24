import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "../Navigation/Navigation";
import { useApi } from "../../Context/baseUrl";
import axios from "axios";
import placeholderImg from "../../Media/placeholder.png";
import { useAuth } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartContext";

const testimonials = [
  {
    name: "Priya Sharma",
    rating: 5,
    comment:
      "This sacred item has brought incredible peace to my daily meditation practice. The divine energy is truly palpable.",
    location: "Mumbai, India",
  },
  {
    name: "David Chen",
    rating: 5,
    comment:
      "Amazing quality and the spiritual connection is real. I carry it everywhere and feel protected and blessed.",
    location: "Singapore",
  },
  {
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Beautiful craftsmanship and the QR code feature is innovative. Love being part of this spiritual community.",
    location: "New York, USA",
  },
];

const colors = {
  primary: "#1e40af",
  secondary: "#2563eb",
  accent: "#3b82f6",
  dark: "#1e3a8a",
  neutral: "#64748b",
  light: "#f8fafc",
  white: "#ffffff",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
};

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;
  const { user } = useAuth();
  const { addToCart } = useCart();

  // Mouse position tracking for cursor glow
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.documentElement.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / window.innerWidth) * 100,
        y: ((e.clientY - rect.top) / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  const [product, setProduct] = useState(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [mediaList, setMediaList] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // Review state
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Fetch single product from API
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await axios.get(`${baseUrl}/products/${id}`);
        setProduct(res.data);
        const images = res.data.images || [];
        const videos = res.data.videos || [];
        setMediaList([
          ...images.map((img) => ({ type: "image", src: img })),
          ...videos.map((vid) => ({ type: "video", src: vid })),
        ]);
      } catch (err) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, baseUrl, reviewSuccess]);

  const getMediaUrl = (mediaPath) => {
    if (!mediaPath) return placeholderImg;
    return `${baseUrl.replace("/api", "")}${mediaPath}`;
  };

  // Review submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewSubmitting(true);
    setReviewError("");
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${baseUrl}/products/${id}/reviews`,
        { rating: reviewRating, comment: reviewComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviewSuccess(true);
      setReviewRating(0);
      setReviewComment("");
      setTimeout(() => setReviewSuccess(false), 2000);
    } catch (err) {
      setReviewError(
        err.response?.data?.message ||
          "Failed to submit review. You may have already reviewed this product."
      );
    } finally {
      setReviewSubmitting(false);
    }
  };

  // Star rating component
  const StarRating = ({
    rating,
    setRating,
    editable = false,
    size = "text-sm",
  }) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${size} cursor-pointer transition-all duration-200 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          } ${editable ? "hover:text-yellow-300" : ""}`}
          onClick={editable ? () => setRating(star) : undefined}
        >
          ★
        </span>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 md:h-20 md:w-20 border-t-4 border-b-4 border-blue-200 mb-4 mx-auto" />
          <p className="text-slate-600 text-base md:text-lg">
            Loading divine wisdom...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center text-slate-800 max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Product not found
          </h2>
          <p className="text-slate-600 mb-8 text-sm md:text-base">
            The sacred item you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="hero-enhanced-button px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-sm md:text-base"
          >
            Return to Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white font-[Inter,sans-serif] relative"
      style={{
        background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, ${colors.primary}08 0%, ${colors.secondary}04 40%, transparent 70%)`,
      }}
    >
      <Navigation />

      {/* Back Button */}
      <div className="relative z-40 pt-4 md:pt-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 md:gap-3 text-slate-700 hover:text-blue-600 font-semibold transition-all duration-300 bg-white/80 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-white/90 shadow-lg hover:shadow-xl group text-sm md:text-base"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -8, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="text-lg md:text-xl"
              animate={{ x: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              ←
            </motion.span>
            <span className="hidden sm:inline">Back to Divine Collection</span>
            <span className="sm:hidden">Back</span>
          </motion.button>
        </div>
      </div>

      {/* Hero Product Section */}
      <section className="relative py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start lg:items-center">
            {/* Product Media */}
            <motion.div
              className="relative order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                {/* Main Product Display */}
                <motion.div
                  className="aspect-square bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-slate-200 flex items-center justify-center relative group"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {mediaList.length > 0 ? (
                    mediaList[activeMediaIndex].type === "image" ? (
                      <img
                        src={getMediaUrl(mediaList[activeMediaIndex].src)}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={getMediaUrl(mediaList[activeMediaIndex].src)}
                        controls
                        className="w-full h-full object-cover"
                        style={{ backgroundColor: "#f8fafc" }}
                      />
                    )
                  ) : (
                    <img
                      src={placeholderImg}
                      alt="placeholder"
                      className="w-full h-full object-cover opacity-80"
                    />
                  )}

                  {/* Subtle Blue Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-50/20 via-transparent to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>

                {/* Media Thumbnails */}
                <div className="flex gap-2 md:gap-3 mt-4 md:mt-6 justify-center overflow-x-auto pb-2">
                  {mediaList.map((media, index) =>
                    media.type === "image" ? (
                      <motion.button
                        key={index}
                        className={`w-12 h-12 md:w-20 md:h-20 flex-shrink-0 rounded-lg md:rounded-xl overflow-hidden border-2 transition-all ${
                          activeMediaIndex === index
                            ? "border-blue-500 scale-110 shadow-lg shadow-blue-500/30"
                            : "border-slate-300 hover:border-blue-400 bg-white"
                        }`}
                        onClick={() => setActiveMediaIndex(index)}
                        whileHover={{
                          scale: activeMediaIndex === index ? 1.1 : 1.05,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img
                          src={getMediaUrl(media.src)}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ) : (
                      <motion.button
                        key={index}
                        className={`w-12 h-12 md:w-20 md:h-20 flex-shrink-0 rounded-lg md:rounded-xl overflow-hidden border-2 transition-all relative bg-slate-100 ${
                          activeMediaIndex === index
                            ? "border-blue-500 scale-110"
                            : "border-slate-300 hover:border-blue-400"
                        }`}
                        onClick={() => setActiveMediaIndex(index)}
                        whileHover={{
                          scale: activeMediaIndex === index ? 1.1 : 1.05,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <video
                          src={getMediaUrl(media.src)}
                          className="w-full h-full object-cover"
                          muted
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-lg md:text-2xl text-slate-600 pointer-events-none">
                          ▶️
                        </span>
                      </motion.button>
                    )
                  )}
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8 text-slate-800 order-2"
            >
              <div>
                <motion.span
                  className="inline-block px-4 py-2 md:px-6 md:py-2 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6 border border-blue-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  🕉️ DIVINE COLLECTION
                </motion.span>

                <motion.h1
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight mb-4 md:mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {product.title}
                </motion.h1>

                <motion.div
                  className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <StarRating
                    rating={product.rating}
                    size="text-base md:text-xl"
                  />
                  <span className="text-blue-600 font-medium text-sm md:text-base">
                    ({product.numReviews || product.reviews?.length || 0}{" "}
                    reviews)
                  </span>
                  <div className="h-4 md:h-6 w-px bg-slate-300"></div>
                  {product.inStock && (
                    <span className="text-xs md:text-sm text-green-600 font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      In Stock
                    </span>
                  )}
                </motion.div>

                <motion.p
                  className="text-base md:text-lg lg:text-xl text-slate-700 leading-relaxed font-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {product.fullDescription}
                </motion.p>
              </div>

              {/* Pricing */}
              <motion.div
                className="flex flex-wrap items-center gap-3 md:gap-6 py-4 md:py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-lg md:text-xl text-slate-400 line-through">
                        ${product.originalPrice}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold border border-blue-200">
                        Save ${product.originalPrice - product.price}
                      </span>
                    </>
                  )}
                </div>
              </motion.div>

              {/* Quantity and Actions */}
              <motion.div
                className="space-y-6 md:space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
                  <span className="font-semibold text-slate-800 text-base md:text-lg">
                    Quantity:
                  </span>
                  <div className="flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 md:px-6 md:py-3 hover:bg-slate-50 transition-colors text-slate-700 font-bold text-lg md:text-xl"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 md:px-8 md:py-3 font-bold border-x border-slate-300 text-slate-800 bg-slate-50 text-lg md:text-xl min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 md:px-6 md:py-3 hover:bg-slate-50 transition-colors text-slate-700 font-bold text-lg md:text-xl"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm md:text-lg text-blue-600 font-semibold">
                    Total: ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <motion.button
                    onClick={handleBuyNow}
                    className="flex-1 hero-enhanced-button py-4 md:py-5 px-6 md:px-8 rounded-xl font-bold text-base md:text-lg"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Buy Now - ${(product.price * quantity).toFixed(2)}
                  </motion.button>
                  <motion.button
                    onClick={handleAddToCart}
                    className="flex-1 border-2 border-slate-300 text-slate-700 py-4 md:py-5 px-6 md:px-8 rounded-xl font-bold text-base md:text-lg hover:bg-slate-50 hover:border-blue-400 transition-all duration-300 bg-white"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-8 pt-6 md:pt-8 border-t border-slate-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-2 md:gap-3 text-green-600 font-semibold text-sm md:text-base">
                  <span className="text-lg md:text-xl">✓</span>
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-green-600 font-semibold text-sm md:text-base">
                  <span className="text-lg md:text-xl">✓</span>
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-green-600 font-semibold text-sm md:text-base">
                  <span className="text-lg md:text-xl">✓</span>
                  <span>Blessed Items</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features and Benefits Section */}
      <section className="py-16 md:py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6">
              Sacred Features & Divine Benefits
            </h2>
            <p className="text-blue-700 max-w-3xl mx-auto text-base md:text-xl">
              Discover the transformative power and sacred energy that makes
              this spiritual companion truly special
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 md:space-y-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8 flex items-center gap-3">
                <span className="text-blue-600">✨</span>
                Key Features:
              </h3>
              {product.features?.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-white rounded-xl md:rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <span className="text-green-500 text-xl md:text-2xl mt-1 flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-slate-700 font-medium text-base md:text-lg leading-relaxed">
                    {feature}
                  </span>
                </motion.div>
              )) || (
                <div className="text-slate-500">Features will be loaded...</div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl md:rounded-3xl p-6 md:p-10 text-slate-800 border border-blue-200 shadow-xl">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center gap-3 text-slate-900">
                  <span className="text-blue-600">🌟</span>
                  Divine Benefits:
                </h3>
                <ul className="space-y-4 md:space-y-6">
                  {product.benefits?.map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 md:gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-blue-500 mt-1 text-xl md:text-2xl flex-shrink-0">
                        ✨
                      </span>
                      <span className="leading-relaxed text-base md:text-lg font-medium text-slate-700">
                        {benefit}
                      </span>
                    </motion.li>
                  )) || (
                    <div className="text-slate-600">
                      Benefits will be loaded...
                    </div>
                  )}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6">
              Your Spiritual Journey
            </h2>
            <p className="text-blue-700 max-w-3xl mx-auto text-base md:text-xl">
              Experience the divine connection through our innovative spiritual
              technology and sacred community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                step: "1",
                title: "Receive Your Sacred Item",
                desc: "Get your blessed spiritual companion delivered with love",
                icon: "📦",
                color: "from-blue-500 to-blue-600",
              },
              {
                step: "2",
                title: "Scan Divine QR Code",
                desc: "Access your personal spiritual portal and community",
                icon: "📱",
                color: "from-blue-600 to-blue-700",
              },
              {
                step: "3",
                title: "Connect & Personalize",
                desc: "Name your companion and join our global spiritual family",
                icon: "🤝",
                color: "from-blue-700 to-blue-800",
              },
              {
                step: "4",
                title: "Experience Divine Blessings",
                desc: "Feel the sacred presence and transformation daily",
                icon: "✨",
                color: "from-blue-800 to-blue-900",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="relative mb-6 md:mb-8">
                  <motion.div
                    className={`w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg md:text-2xl mx-auto shadow-xl border-2 md:border-4 border-white`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {step.step}
                  </motion.div>
                  <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 text-2xl md:text-3xl animate-bounce">
                    {step.icon}
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-8 md:top-12 left-full w-full h-1 bg-gradient-to-r from-blue-300 to-transparent"></div>
                  )}
                </div>
                <h3 className="font-bold text-slate-900 text-base md:text-xl mb-2 md:mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6">
              Sacred Testimonials
            </h2>
            <p className="text-blue-700 max-w-3xl mx-auto text-base md:text-xl">
              Hear from our blessed community members about their transformative
              experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <StarRating
                    rating={testimonial.rating}
                    size="text-base md:text-lg"
                  />
                </div>
                <p className="text-slate-700 leading-relaxed mb-4 md:mb-6 text-base md:text-lg italic">
                  "{testimonial.comment}"
                </p>
                <div className="border-t border-slate-200 pt-4">
                  <p className="font-bold text-slate-900 text-sm md:text-base">
                    {testimonial.name}
                  </p>
                  <p className="text-blue-600 text-xs md:text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 md:mb-12 text-center">
            Community Reviews
          </h3>

          {/* List reviews */}
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-4 md:space-y-6 mb-12 md:mb-16">
              {product.reviews.map((review, idx) => (
                <motion.div
                  key={idx}
                  className="bg-slate-50 rounded-xl md:rounded-2xl shadow-sm p-6 md:p-8 border border-slate-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 mb-4">
                    <span className="font-bold text-blue-600 text-base md:text-lg">
                      {review.name}
                    </span>
                    <StarRating
                      rating={review.rating}
                      size="text-base md:text-lg"
                    />
                    <span className="text-slate-500 text-xs md:text-sm sm:ml-auto">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-base md:text-lg">
                    {review.comment}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-slate-500 text-center mb-12 md:mb-16 text-base md:text-lg">
              No reviews yet. Be the first to share your experience!
            </div>
          )}

          {/* Leave a review */}
          {user ? (
            <motion.form
              onSubmit={handleReviewSubmit}
              className="bg-slate-50 rounded-xl md:rounded-2xl p-6 md:p-8 border border-slate-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-slate-900 flex items-center gap-3">
                <span className="text-blue-600">✍️</span>
                Share Your Experience
              </h4>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 mb-4 md:mb-6">
                <span className="font-semibold text-slate-800 text-base md:text-lg">
                  Your Rating:
                </span>
                <StarRating
                  rating={reviewRating}
                  setRating={setReviewRating}
                  editable
                  size="text-xl md:text-2xl"
                />
              </div>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl p-4 mb-4 md:mb-6 text-slate-800 placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none text-sm md:text-base"
                placeholder="Share your thoughts about this sacred item..."
                rows="4"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto hero-enhanced-button px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg disabled:opacity-50"
                disabled={reviewSubmitting || !reviewRating}
              >
                {reviewSubmitting ? "Sharing..." : "Share Review"}
              </button>
              {reviewError && (
                <div className="mt-4 text-red-600 font-semibold bg-red-50 border border-red-200 rounded-lg p-4 text-sm md:text-base">
                  {reviewError}
                </div>
              )}
              {reviewSuccess && (
                <div className="mt-4 text-green-600 font-semibold bg-green-50 border border-green-200 rounded-lg p-4 text-sm md:text-base">
                  Thank you! Your review has been shared with our community.
                </div>
              )}
            </motion.form>
          ) : (
            <div className="text-center">
              <div className="bg-slate-50 rounded-xl md:rounded-2xl p-6 md:p-8 border border-slate-200">
                <p className="text-slate-600 text-base md:text-lg mb-4">
                  Please login to share your experience with our community
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="hero-enhanced-button px-6 md:px-8 py-3 rounded-xl font-semibold text-sm md:text-base"
                >
                  Login to Review
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed top-20 md:top-24 right-4 md:right-6 bg-green-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl shadow-2xl z-50 border border-green-400 max-w-sm"
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-xl md:text-2xl">✓</span>
              <span className="font-semibold text-sm md:text-base">
                Added to cart successfully!
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
