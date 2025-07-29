import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "../Navigation/Navigation";
import { useApi } from "../../Context/baseUrl";
import axios from "axios";
import placeholderImg from "../../Media/placeholder.png";
import { useAuth } from "../../Context/AuthContext"; // For user info
import { useCart } from "../../Context/CartContext";

const testimonials = [
  // ... (Your testimonials array as before)
];

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;
  const { user } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
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
          className={`${size} cursor-pointer ${
            star <= rating ? "text-[#f4c430]" : "text-[#d1ccc0]"
          }`}
          onClick={editable ? () => setRating(star) : undefined}
        >
          ★
        </span>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9fbfd] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#01abfd]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f9fbfd] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0f1f2e] mb-4">
            Product not found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-[#01abfd] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#0189d1] transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fbfd] font-[Inter,sans-serif]">
      <Navigation />

      <div className="absolute inset-0 bg-gradient-to-br from-[#01abfd]/5 via-[#eec6d3]/10 to-[#2e8b57]/5"></div>

      {/* Back Button */}
      <div className=" z-40 pt-8 px-4 top-20 right-2 fixed">
        <div className="max-w-7xl mx-auto">
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 text-[#01abfd] hover:text-[#0189d1] font-semibold transition-all duration-300 bg-white px-6 py-3 rounded-xl border-2 border-[#01abfd]/30 hover:border-[#01abfd] hover:bg-[#01abfd]/5 shadow-lg hover:shadow-xl group"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -8, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="text-xl"
              animate={{ x: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              ←
            </motion.span>
            <span>Back to All Products</span>
          </motion.button>
        </div>
      </div>

      {/* Product Section */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product Media */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <motion.div
                  className="aspect-square bg-gradient-to-br from-[#01abfd]/10 via-[#eec6d3]/20 to-[#2e8b57]/10 rounded-3xl overflow-hidden shadow-2xl border border-[#01abfd]/20 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
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
                        style={{ backgroundColor: "#222" }}
                      />
                    )
                  ) : (
                    <img
                      src={placeholderImg}
                      alt="placeholder"
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
                {/* Thumbnails */}
                <div className="flex gap-3 mt-6 justify-center">
                  {mediaList.map((media, index) =>
                    media.type === "image" ? (
                      <motion.button
                        key={index}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          activeMediaIndex === index
                            ? "border-[#01abfd] scale-110"
                            : "border-[#d1ccc0] hover:border-[#01abfd]/50"
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
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all relative bg-[#222]`}
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
                        <span className="absolute inset-0 flex items-center justify-center text-xl text-white opacity-80 pointer-events-none">
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
              className="space-y-8"
            >
              <div>
                <motion.span
                  className="inline-block px-4 py-2 bg-gradient-to-r from-[#eec6d3] to-[#01abfd]/20 text-[#0189d1] rounded-full text-sm font-medium mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  🕉️ {product.category}
                </motion.span>

                <motion.h1
                  className="text-4xl lg:text-5xl font-bold text-[#0f1f2e] leading-tight mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {product.title}
                </motion.h1>

                <motion.div
                  className="flex items-center gap-4 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <StarRating rating={product.rating} size="text-lg" />
                  <span className="text-[#0189d1]">
                    ({product.numReviews || product.reviews?.length || 0}{" "}
                    reviews)
                  </span>
                  <div className="h-4 w-px bg-[#d1ccc0]"></div>
                  {product.inStock && (
                    <span className="text-sm text-[#2e8b57] font-medium">
                      ✓ In Stock
                    </span>
                  )}
                </motion.div>

                <motion.p
                  className="text-lg text-[#0f1f2e]/80 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {product.fullDescription}
                </motion.p>
              </div>

              <motion.div
                className="flex items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-[#2e8b57]">
                    ${product.price}
                  </span>
                  <span className="text-lg text-[#d1ccc0] line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="bg-[#f4c430]/20 text-[#f4c430] px-3 py-1 rounded-full text-sm font-medium">
                    Save ${product.originalPrice - product.price}
                  </span>
                </div>
              </motion.div>

              {/* Quantity and Actions */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-medium text-[#0f1f2e]">Quantity:</span>
                  <div className="flex items-center border-2 border-[#01abfd]/30 rounded-lg bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-[#01abfd]/10 transition-colors text-[#01abfd] font-medium"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 font-medium border-x-2 border-[#01abfd]/30 text-[#0f1f2e]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-[#01abfd]/10 transition-colors text-[#01abfd] font-medium"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-[#0189d1]">
                    Total: ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    onClick={handleBuyNow}
                    className="flex-1 bg-gradient-to-r from-[#01abfd] to-[#0189d1] text-white py-4 px-8 rounded-xl font-semibold hover:from-[#0189d1] hover:to-[#01abfd] transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Buy Now - ${(product.price * quantity).toFixed(2)}
                  </motion.button>
                  <motion.button
                    onClick={handleAddToCart}
                    className="flex-1 border-2 border-[#2e8b57] text-[#2e8b57] py-4 px-8 rounded-xl font-semibold hover:bg-[#2e8b57] hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-6 pt-6 border-t border-[#d1ccc0]/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-2 text-sm text-[#2e8b57]">
                  <span>✓</span>
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#2e8b57]">
                  <span>✓</span>
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#2e8b57]">
                  <span>✓</span>
                  <span>Blessed Items</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features and Benefits Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0f1f2e] mb-4">
              Product Features & Benefits
            </h2>
            <p className="text-[#0189d1] max-w-2xl mx-auto">
              Discover what makes this sacred item special and transformative
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-[#0f1f2e] mb-6">
                Key Features:
              </h3>
              {product.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#eec6d3]/20 to-[#01abfd]/10 rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <span className="text-[#2e8b57] text-xl mt-1">✓</span>
                  <span className="text-[#0f1f2e] font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#01abfd] to-[#2e8b57] rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">
                  Benefits You'll Experience:
                </h3>
                <ul className="space-y-4">
                  {product.benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-[#f4c430] mt-1 text-lg">✨</span>
                      <span className="leading-relaxed">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-[#eec6d3]/20 to-[#01abfd]/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#01abfd] to-[#2e8b57] text-transparent bg-clip-text mb-4">
              How It Works
            </h2>
            <p className="text-[#0189d1] max-w-2xl mx-auto">
              Experience the divine connection through our innovative spiritual
              technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Receive Your Item",
                desc: "Get your blessed spiritual companion",
                icon: "📦",
              },
              {
                step: "2",
                title: "Scan QR Code",
                desc: "Access your personal spiritual portal",
                icon: "📱",
              },
              {
                step: "3",
                title: "Connect & Name",
                desc: "Personalize and connect with community",
                icon: "🤝",
              },
              {
                step: "4",
                title: "Experience Blessings",
                desc: "Feel the divine presence daily",
                icon: "✨",
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
                <div className="relative mb-6">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-[#01abfd] to-[#2e8b57] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {step.step}
                  </motion.div>
                  <div className="absolute -top-2 -right-2 text-2xl">
                    {step.icon}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-[#01abfd]/30 to-[#2e8b57]/30"></div>
                  )}
                </div>
                <h3 className="font-bold text-[#0f1f2e] mb-2">{step.title}</h3>
                <p className="text-sm text-[#0189d1]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Reviews Section */}
      <section className="py-14 bg-[#f9fbfd] border-t border-[#eec6d3]/30">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-[#0189d1] mb-6">
            Product Reviews
          </h3>

          {/* List reviews */}
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-6 mb-10">
              {product.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow p-4 flex flex-col gap-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#2e8b57]">
                      {review.name}
                    </span>
                    <StarRating rating={review.rating} />
                    <span className="text-xs text-gray-400 ml-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-[#0f1f2e]">{review.comment}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 mb-10">No reviews yet.</div>
          )}

          {/* Leave a review */}
          {user ? (
            <form
              onSubmit={handleReviewSubmit}
              className="bg-white rounded-lg shadow px-6 py-6 mb-10"
            >
              <h4 className="text-lg font-semibold mb-2 text-[#0189d1]">
                Leave a Review
              </h4>
              <div className="flex items-center gap-4 mb-4">
                <span className="font-medium text-[#0f1f2e]">Your Rating:</span>
                <StarRating
                  rating={reviewRating}
                  setRating={setReviewRating}
                  editable
                  size="text-xl"
                />
              </div>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                placeholder="Your thoughts..."
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#01abfd] to-[#2e8b57] text-white px-6 py-2 rounded font-semibold shadow hover:shadow-lg transition"
                disabled={reviewSubmitting || !reviewRating}
              >
                {reviewSubmitting ? "Submitting..." : "Submit Review"}
              </button>
              {reviewError && (
                <div className="mt-2 text-red-500 font-medium">
                  {reviewError}
                </div>
              )}
              {reviewSuccess && (
                <div className="mt-2 text-green-600 font-medium">
                  Review submitted!
                </div>
              )}
            </form>
          ) : (
            <div className="text-[#0189d1] text-center mb-10">
              Please login to leave a review.
            </div>
          )}
        </div>
      </section>

      {/* Keep your Working Steps, Testimonials, Footer ... */}
      {/* ... */}
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed top-20 right-4 bg-[#2e8b57] text-white px-6 py-3 rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            ✓ Added to cart successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
