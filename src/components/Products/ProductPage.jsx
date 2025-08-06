import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "../Navigation/Navigation";
import { useApi } from "../../Context/baseUrl";
import axios from "axios";
import { 
  Package, 
  Truck, 
  Shield, 
  Star, 
  ShoppingCart, 
  Eye,
  Sparkles,
  Heart,
  CheckCircle,
  ArrowRight
} from "lucide-react";

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
    if (!mediaPath) return placeholderImg;
    return `${baseUrl.replace("/api", "")}${mediaPath}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gray-50 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              className="flex items-center justify-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Package className="w-8 h-8 text-blue-500" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Divine Krishna Collection
              </h1>
            </motion.div>
            
            <motion.p
              className="text-xl text-gray-600 mb-8"
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
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700 shadow-sm border border-gray-200">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>Blessed Items</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700 shadow-sm border border-gray-200">
                <Truck className="w-4 h-4 text-green-500" />
                <span>Free Shipping $50+</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700 shadow-sm border border-gray-200">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700 shadow-sm border border-gray-200">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>4.8/5 Rating</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredProduct(product._id)}
                onHoverEnd={() => setHoveredProduct(null)}
                className="group"
              >
                <Link to={`/product/${product._id}`}>
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                    {/* Product Image Container */}
                    <div className="relative aspect-square bg-gray-50 p-6">
                      {/* Discount Badge */}
                      {product.originalPrice && product.price && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          -
                          {Math.round(
                            100 * (1 - product.price / product.originalPrice)
                          )}
                          %
                        </div>
                      )}

                      {/* Product Badge */}
                      {product.badge && (
                        <div className="absolute top-4 right-4 bg-yellow-500 text-gray-900 px-2 py-1 rounded-full text-xs font-medium">
                          {product.badge}
                        </div>
                      )}

                      {/* Product Image */}
                      {product.images && product.images.length > 0 ? (
                        <motion.img
                          src={getMediaUrl(product.images[0])}
                          alt={product.title}
                          className="w-full h-full object-contain"
                          animate={{
                            scale: hoveredProduct === product._id ? 1.05 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        />
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                          {product.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {product.desc}
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          ({product.numReviews || product.reviews?.length || 0})
                        </span>
                      </div>

                      {/* Price and Action */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-bold text-gray-900">
                            ${product.price}
                          </span>
                          {product.originalPrice && product.originalPrice !== product.price && (
                            <span className="text-sm text-gray-400 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>

                        <motion.button
                          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </motion.button>
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
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: "Free Shipping",
                desc: "Orders over $50",
                color: "text-blue-500",
              },
              {
                icon: Shield,
                title: "Support 24/7",
                desc: "Contact us anytime",
                color: "text-green-500",
              },
              {
                icon: CheckCircle,
                title: "30 Days Return",
                desc: "Money back guarantee",
                color: "text-yellow-500",
              },
              {
                icon: Heart,
                title: "Payment Secure",
                desc: "100% secure payment",
                color: "text-red-500",
              },
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-lg border border-gray-200 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-12 h-12 mx-auto mb-4 ${feature.color}`}>
                    <IconComponent className="w-full h-full" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
