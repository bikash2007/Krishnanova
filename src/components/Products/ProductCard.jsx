import React from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const baseUrl = import.meta.env.VITE_API_URL;

  const mediaUrl = product.media && product.media.length > 0
    ? `${baseUrl.replace("/api", "")}${product.media[0]}`
    : "/placeholder.png";

  const discount = product.discount || 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card overflow-hidden hover:shadow-lg transition-all duration-300 divine-hover"
    >
      {/* Product Image */}
      <div className="relative h-48 bg-muted flex items-center justify-center">
        <img
          src={mediaUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {discount > 0 && (
          <div className="absolute top-2 right-2 badge badge-destructive sacred-pulse">
            -{discount}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-2">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-card-foreground">
              ${product.price}
            </span>
            {discount > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                ${(product.price / (1 - discount / 100)).toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < (product.rating || 4) ? "text-yellow-400 fill-current" : "text-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/product/${product._id}`}
            className="flex-1"
          >
            <motion.button
              className="w-full btn btn-outline btn-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="w-4 h-4" />
              View
            </motion.button>
          </Link>
          <motion.button
            onClick={handleAddToCart}
            className="flex-1 btn btn-primary btn-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </div>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {product.features.slice(0, 3).map((feature, idx) => (
                <span
                  key={idx}
                  className="badge badge-secondary"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
