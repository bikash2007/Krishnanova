import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "../Navigation/Navigation";
import { useApi } from "../../Context/baseUrl";
import axios from "axios";
import placeholderImg from "../../Media/placeholder.png";
import { useAuth } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartContext";
import { 
  ArrowLeft, 
  Star, 
  ShoppingCart, 
  Heart, 
  Truck, 
  CheckCircle, 
  Shield,
  Package,
  Eye,
  Plus,
  Minus,
  MessageCircle,
  Send,
  Sparkles
} from "lucide-react";

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
    size = "w-4 h-4",
  }) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} cursor-pointer ${
            star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
          onClick={editable ? () => setRating(star) : undefined}
        />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Back Button */}
      <div className="pt-8 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 text-blue-500 hover:text-blue-600 font-medium transition-colors bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Products</span>
          </motion.button>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Product Media */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <motion.div
                  className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 flex items-center justify-center"
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
                {mediaList.length > 1 && (
                  <div className="flex gap-3 mt-6 justify-center">
                    {mediaList.map((media, index) =>
                      media.type === "image" ? (
                        <motion.button
                          key={index}
                          className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            activeMediaIndex === index
                              ? "border-blue-500 scale-110"
                              : "border-gray-200 hover:border-blue-300"
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
                          className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all relative bg-gray-900`}
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
                          <span className="absolute inset-0 flex items-center justify-center text-white opacity-80 pointer-events-none">
                            ▶️
                          </span>
                        </motion.button>
                      )
                    )}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <motion.div
                  className="flex items-center gap-2 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Package className="w-5 h-5 text-blue-500" />
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </motion.div>

                <motion.h1
                  className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4"
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
                  <StarRating rating={product.rating} size="w-5 h-5" />
                  <span className="text-blue-600">
                    ({product.numReviews || product.reviews?.length || 0} reviews)
                  </span>
                  <div className="h-4 w-px bg-gray-300"></div>
                  {product.inStock && (
                    <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      In Stock
                    </span>
                  )}
                </motion.div>

                <motion.p
                  className="text-lg text-gray-600 leading-relaxed"
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
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && product.originalPrice !== product.price && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                      <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
                        Save ${(product.originalPrice - product.price).toFixed(2)}
                      </span>
                    </>
                  )}
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
                  <span className="font-medium text-gray-900">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-50 transition-colors text-gray-600 font-medium"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-2 font-medium border-x border-gray-300 text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-gray-50 transition-colors text-gray-600 font-medium"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-blue-600">
                    Total: ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    onClick={handleBuyNow}
                    className="flex-1 bg-blue-500 text-white py-4 px-8 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Buy Now - ${(product.price * quantity).toFixed(2)}
                  </motion.button>
                  <motion.button
                    onClick={handleAddToCart}
                    className="flex-1 border-2 border-green-500 text-green-500 py-4 px-8 rounded-lg font-medium hover:bg-green-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Heart className="w-5 h-5" />
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-6 pt-6 border-t border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Truck className="w-4 h-4" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Shield className="w-4 h-4" />
                  <span>Blessed Items</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features and Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Product Features & Benefits
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover what makes this sacred item special and transformative
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Key Features:
              </h3>
              {product.features && product.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-900 font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-blue-500 rounded-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">
                  Benefits You'll Experience:
                </h3>
                <ul className="space-y-4">
                  {product.benefits && product.benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Sparkles className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
                      <span className="leading-relaxed">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <MessageCircle className="w-6 h-6 text-blue-500" />
            <h3 className="text-2xl font-bold text-gray-900">
              Product Reviews
            </h3>
          </div>

          {/* List reviews */}
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-6 mb-10">
              {product.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-semibold text-green-600">
                      {review.name}
                    </span>
                    <StarRating rating={review.rating} />
                    <span className="text-xs text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-gray-900">{review.comment}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 mb-10 text-center">No reviews yet.</div>
          )}

          {/* Leave a review */}
          {user ? (
            <form
              onSubmit={handleReviewSubmit}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h4 className="text-lg font-semibold mb-4 text-gray-900">
                Leave a Review
              </h4>
              <div className="flex items-center gap-4 mb-4">
                <span className="font-medium text-gray-900">Your Rating:</span>
                <StarRating
                  rating={reviewRating}
                  setRating={setReviewRating}
                  editable
                  size="w-6 h-6"
                />
              </div>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Your thoughts..."
                required
                rows={4}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:bg-blue-600 transition-colors flex items-center gap-2"
                disabled={reviewSubmitting || !reviewRating}
              >
                <Send className="w-4 h-4" />
                {reviewSubmitting ? "Submitting..." : "Submit Review"}
              </button>
              {reviewError && (
                <div className="mt-3 text-red-500 font-medium">
                  {reviewError}
                </div>
              )}
              {reviewSuccess && (
                <div className="mt-3 text-green-600 font-medium">
                  Review submitted!
                </div>
              )}
            </form>
          ) : (
            <div className="text-blue-600 text-center mb-10">
              Please login to leave a review.
            </div>
          )}
        </div>
      </section>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <CheckCircle className="w-5 h-5" />
            Added to cart successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
