import React, {
  useEffect,
  useRef,
  useState,
  memo,
  useCallback,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// **Performance Optimization: Memoized ProductCard**
const ProductCard = memo(({ product, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameRef = useRef(null);

  const baseUrl = import.meta.env.VITE_API_URL;

  // **Optimization: Memoized URL calculation**
  const mediaUrl = useMemo(() => {
    if (!product.images || product.images.length === 0) return null;
    const mediaPath = product.images[0];
    if (!mediaPath) return "/api/placeholder/400/400";
    return `${baseUrl.replace("/api", "")}${mediaPath}`;
  }, [product.images, baseUrl]);

  // **Optimization: Memoized discount calculation**
  const discount = useMemo(() => {
    return product.originalPrice && product.price
      ? Math.round(100 * (1 - product.price / product.originalPrice))
      : 0;
  }, [product.originalPrice, product.price]);

  // **Major Performance Fix: Throttled mouse tracking**
  const handleMouseMove = useCallback(
    (e) => {
      if (animationFrameRef.current) return;

      animationFrameRef.current = requestAnimationFrame(() => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // **Reduced calculation complexity**
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20; // Reduced sensitivity
        const rotateY = (centerX - x) / 20;

        // **Use transform instead of CSS custom properties for better performance**
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${
          isHovered ? "8px" : "0px"
        })`;

        animationFrameRef.current = null;
      });
    },
    [isHovered]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    const card = cardRef.current;
    if (card) {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // **Performance: Only enable on devices that support hover**
    const hasHoverSupport = window.matchMedia("(hover: hover)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!hasHoverSupport || prefersReducedMotion) return;

    // **Performance: Use passive listeners**
    card.addEventListener("mousemove", handleMouseMove, { passive: true });
    card.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    card.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: Math.min(index * 0.05, 0.3), // **Reduced delay for faster loading**
        duration: 0.4, // **Reduced duration**
        ease: "easeOut",
      }}
      className="group relative max-w-sm mx-auto"
    >
      {/* **Simplified Glow Effect** */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 via-emerald-400/20 to-amber-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

      {/* **Main Card - Simplified** */}
      <div className="relative bg-white rounded-3xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-200">
        {/* **Discount Badge** */}
        {discount > 0 && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
            -{discount}%
          </div>
        )}

        {/* **Optimized Product Image** */}
        <div className="relative mb-6 group/image">
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-md overflow-hidden border border-gray-200">
            {mediaUrl ? (
              <img
                src={mediaUrl}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover/image:scale-105"
                loading="lazy" // **Performance: Lazy loading**
                onError={(e) => {
                  e.target.src = "/api/placeholder/400/400";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl text-amber-500">
                🕉️
              </div>
            )}
          </div>
        </div>

        {/* **Content** */}
        <div className="text-center space-y-4">
          {/* **Title** */}
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-200 line-clamp-2">
            {product.title}
          </h3>

          {/* **Description** */}
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {product.desc || product.fullDescription}
          </p>

          {/* **Price** */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold text-emerald-600">
              ${product.price}
            </span>
            {product.originalPrice &&
              product.originalPrice !== product.price && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
          </div>

          {/* **Rating - Simplified** */}
          {product.rating > 0 && (
            <div className="flex items-center justify-center gap-2">
              <div className="flex text-amber-400">
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-gray-500 text-xs">
                ({product.numReviews || 0})
              </span>
            </div>
          )}

          {/* **Action Buttons - Simplified** */}
          <div className="flex gap-2 pt-2">
            <Link to={`/product/${product._id}`} className="flex-1">
              <button className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 text-sm">
                View Details
              </button>
            </Link>
            <Link to="/productpage">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 text-sm">
                Shop All
              </button>
            </Link>
          </div>

          {/* **Features - Simplified** */}
          {product.features && product.features.length > 0 && (
            <div className="pt-3 border-t border-gray-100">
              <div className="flex flex-wrap gap-1 justify-center">
                {product.features.slice(0, 2).map((feature, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
