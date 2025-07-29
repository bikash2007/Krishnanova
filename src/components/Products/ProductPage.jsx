import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "../Navigation/Navigation";
import { useApi } from "../../Context/baseUrl";
import axios from "axios";

// If you want a placeholder image when no image is found:
import placeholderImg from "../../Media/placeholder.png";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseUrl}/products`);
        setProducts(response.data);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchProduct();
  }, [baseUrl]);

  // Helper for building full media URLs
  const getMediaUrl = (mediaPath) => {
    // If using Vite dev, mediaPath is like "/uploads/products/filename.jpg"
    // So, baseUrl might be "http://localhost:5000/api" – remove "/api"
    if (!mediaPath) return placeholderImg;
    return `${baseUrl.replace("/api", "")}${mediaPath}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#01abfd]/5 to-[#2e8b57]/5 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-[#0f1f2e] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Divine Krishna Collection
            </motion.h1>
            <motion.p
              className="text-xl text-[#0189d1] mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Discover sacred items blessed with divine energy
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-white px-6 py-3 rounded-full text-sm font-medium text-[#0f1f2e] shadow-sm">
                ✨ Blessed Items
              </span>
              <span className="bg-white px-6 py-3 rounded-full text-sm font-medium text-[#0f1f2e] shadow-sm">
                🚚 Free Shipping $50+
              </span>
              <span className="bg-white px-6 py-3 rounded-full text-sm font-medium text-[#0f1f2e] shadow-sm">
                🔒 Secure Checkout
              </span>
              <span className="bg-white px-6 py-3 rounded-full text-sm font-medium text-[#0f1f2e] shadow-sm">
                ⭐ 4.8/5 Rating
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                onHoverStart={() => setHoveredProduct(product._id)}
                onHoverEnd={() => setHoveredProduct(null)}
              >
                <Link to={`/product/${product._id}`}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                    <div className="relative">
                      {/* Product Image Container */}
                      <div className="aspect-[4/3] bg-gradient-to-br from-[#f9fbfd] to-[#eec6d3]/10 p-8 relative overflow-hidden">
                        {/* Discount Badge: you can calculate or store discount on backend */}
                        {product.originalPrice && product.price && (
                          <div className="absolute top-4 left-4 bg-[#2e8b57] text-white px-3 py-1 rounded-full text-sm font-bold">
                            -
                            {Math.round(
                              100 * (1 - product.price / product.originalPrice)
                            )}
                            %
                          </div>
                        )}

                        {/* Product Badge (optional, e.g., if bestseller) */}
                        {product.badge && (
                          <div className="absolute top-4 right-4 bg-[#f4c430] text-[#0f1f2e] px-3 py-1 rounded-full text-xs font-bold uppercase">
                            {product.badge}
                          </div>
                        )}

                        {/* Product Image or Video */}
                        {/* If video exists, show play icon overlay */}
                        {product.images && product.images.length > 0 ? (
                          <motion.img
                            src={getMediaUrl(product.images[0])}
                            alt={product.title}
                            className="w-full h-full object-contain"
                            animate={{
                              scale: hoveredProduct === product._id ? 1.1 : 1,
                              rotate: hoveredProduct === product._id ? 5 : 0,
                            }}
                            transition={{ duration: 0.5 }}
                          />
                        ) : product.videos && product.videos.length > 0 ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <video
                              src={getMediaUrl(product.videos[0])}
                              className="w-full h-full object-contain"
                              autoPlay={false}
                              controls={false}
                              muted
                              loop
                            />
                            <span className="absolute inset-0 flex items-center justify-center text-4xl text-white opacity-80">
                              ▶️
                            </span>
                          </div>
                        ) : (
                          <img
                            src={placeholderImg}
                            alt="placeholder"
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-[#0f1f2e] mb-2 line-clamp-1">
                            {product.title}
                          </h3>
                          <p className="text-[#0189d1] text-sm line-clamp-2">
                            {product.desc}
                          </p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${
                                  i < Math.floor(product.rating)
                                    ? "text-[#f4c430]"
                                    : "text-gray-300"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            (
                            {product.numReviews || product.reviews?.length || 0}
                            )
                          </span>
                        </div>

                        {/* Price and Action */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-[#2e8b57]">
                              ${product.price}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              ${product.originalPrice}
                            </span>
                          </div>

                          <motion.button
                            className="bg-[#01abfd] text-white px-6 py-3 rounded-full font-medium hover:bg-[#0189d1] transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View Details
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#f9fbfd] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: "🚚",
                title: "Free Shipping",
                desc: "Orders over $50",
                color: "from-[#01abfd]/10 to-[#0189d1]/10",
              },
              {
                icon: "📞",
                title: "Support 24/7",
                desc: "Contact us anytime",
                color: "from-[#2e8b57]/10 to-[#2e8b57]/20",
              },
              {
                icon: "🔄",
                title: "30 Days Return",
                desc: "Money back guarantee",
                color: "from-[#f4c430]/10 to-[#f4c430]/20",
              },
              {
                icon: "🔒",
                title: "Payment Secure",
                desc: "100% secure payment",
                color: "from-[#eec6d3]/20 to-[#eec6d3]/30",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${feature.color} p-8 rounded-2xl`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-[#0f1f2e] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
