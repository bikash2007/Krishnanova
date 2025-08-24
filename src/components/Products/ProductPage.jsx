import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "../Navigation/Navigation";
import axios from "axios";
import placeholderImg from "../../Media/placeholder.png";

const BRAND = {
  primary: "#1e40af", // Royal Blue
  secondary: "#2563eb", // Bright Blue
  accent: "#3b82f6", // Light Blue
  dark: "#1e3a8a", // Dark Blue
  light: "#dbeafe", // Very Light Blue
  white: "#FFFFFF",
  gray: "#64748b", // Slate Gray
  lightGray: "#f8fafc", // Almost White
};

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState(() => new Set());
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();
  const baseApi = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${baseApi}/products`);
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [baseApi]);

  const addToWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getMediaUrl = (mediaPath) => {
    if (!mediaPath) return placeholderImg;
    return `${baseApi.replace("/api", "")}${mediaPath}`;
  };

  const firstImage = (p) => {
    if (Array.isArray(p.images) && p.images.length) return p.images[0];
    if (typeof p.images === "string") return p.images;
    return null;
  };

  const calcDiscount = (p) => {
    const op = Number(p?.originalPrice);
    const pr = Number(p?.price);
    if (!op || !pr || op <= pr) return 0;
    return Math.round(100 * (1 - pr / op));
  };

  const formatPrice = (n, currency = "INR") => {
    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(n);
    } catch {
      return `₹${n}`;
    }
  };

  const availableFilters = useMemo(() => {
    const set = new Set(["all", "bestseller", "new", "deals"]);
    products.forEach((p) => {
      if (p.badge) set.add(String(p.badge).toLowerCase());
      (p.tags || []).forEach((t) => set.add(String(t).toLowerCase()));
    });
    return [...set];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (activeFilter !== "all") {
      list = list.filter((p) => {
        const tags = (p.tags || []).map((t) => String(t).toLowerCase());
        const badge = String(p.badge || "").toLowerCase();
        if (activeFilter === "deals") return calcDiscount(p) >= 20;
        return tags.includes(activeFilter) || badge === activeFilter;
      });
    }
    switch (sortBy) {
      case "priceLow":
        list.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "priceHigh":
        list.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "rating":
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "new":
        list.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        break;
      default:
        break;
    }
    return list;
  }, [products, activeFilter, sortBy]);

  const Skeleton = () => (
    <div
      className="rounded-2xl border p-6 animate-pulse bg-white shadow-sm"
      style={{
        borderColor: BRAND.light,
      }}
    >
      <div className="h-56 rounded-xl bg-gray-200 mb-5" />
      <div className="h-5 rounded bg-gray-200 mb-3 w-3/4" />
      <div className="h-4 rounded bg-gray-100 mb-6 w-5/6" />
      <div className="h-10 rounded-xl bg-gray-100" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Clean Hero Section */}
      <section className="pt-20 pb-10 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              className="font-bold text-5xl lg:text-6xl mb-6"
              style={{ color: BRAND.dark }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Divine Krishna Collection
            </motion.h1>

            <motion.p
              className="text-lg lg:text-xl leading-relaxed mb-8"
              style={{ color: BRAND.gray }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Discover premium spiritual items blessed with{" "}
              <span className="font-semibold" style={{ color: BRAND.primary }}>
                sacred energy
              </span>{" "}
              to deepen your devotion.
            </motion.p>

            {/* Clean Trust Badges */}
            <motion.div
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {[
                "🕉️ Blessed & Authentic",
                "🚚 Free Shipping ₹999+",
                "🔒 Secure Checkout",
                "⭐ Loved by Devotees",
              ].map((t, i) => (
                <motion.span
                  key={i}
                  className="px-4 py-2 rounded-full border text-sm font-medium bg-white shadow-sm"
                  style={{
                    borderColor: BRAND.light,
                    color: BRAND.dark,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    boxShadow: "0 4px 12px rgba(30, 64, 175, 0.15)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Clean Filter Bar */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="sticky top-16 z-20">
              {/* Mobile Filter Toggle */}
              <div className="md:hidden mb-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl border bg-white shadow-sm"
                  style={{
                    borderColor: BRAND.light,
                    color: BRAND.dark,
                  }}
                >
                  <span className="font-semibold">Filters & Sort</span>
                  <motion.span
                    animate={{ rotate: showFilters ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ↓
                  </motion.span>
                </button>
              </div>

              {/* Filter Content */}
              <AnimatePresence>
                {(showFilters || window.innerWidth >= 768) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-xl border bg-white shadow-sm px-6 py-4"
                      style={{
                        borderColor: BRAND.light,
                      }}
                    >
                      {/* Filters */}
                      <div className="flex flex-wrap gap-2">
                        {availableFilters.map((f) => {
                          const active = activeFilter === f;
                          return (
                            <motion.button
                              key={f}
                              onClick={() => setActiveFilter(f)}
                              className="px-4 py-2 rounded-full text-sm font-semibold transition-all border"
                              style={{
                                background: active ? BRAND.primary : "white",
                                color: active ? "white" : BRAND.dark,
                                borderColor: active
                                  ? BRAND.primary
                                  : BRAND.light,
                              }}
                              whileHover={{
                                scale: 1.05,
                                backgroundColor: active
                                  ? BRAND.dark
                                  : BRAND.lightGray,
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {f === "all"
                                ? "All"
                                : f
                                    .replace(/_/g, " ")
                                    .replace(/\b\w/g, (m) => m.toUpperCase())}
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Sort */}
                      <div className="flex items-center gap-3">
                        <span
                          className="text-sm font-medium"
                          style={{ color: BRAND.gray }}
                        >
                          Sort:
                        </span>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="border text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                          style={{
                            minWidth: "140px",
                            borderColor: BRAND.light,
                            color: BRAND.dark,
                            focusRingColor: BRAND.primary,
                          }}
                        >
                          <option value="featured">Featured</option>
                          <option value="new">New Arrivals</option>
                          <option value="rating">Top Rated</option>
                          <option value="priceLow">Price: Low to High</option>
                          <option value="priceHigh">Price: High to Low</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Clean Products Grid */}
      <section className="pb-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <motion.div
              className="text-center py-20"
              style={{ color: BRAND.gray }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: BRAND.dark }}
              >
                No products found
              </h3>
              <p>Try adjusting your filters or check back soon!</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((p, index) => {
                const discount = calcDiscount(p);
                const inWishlist = wishlist.has(p._id);
                return (
                  <motion.div
                    key={p._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    onHoverStart={() => setHovered(p._id)}
                    onHoverEnd={() => setHovered(null)}
                    className="rounded-2xl overflow-hidden border bg-white group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
                    style={{
                      borderColor: BRAND.light,
                    }}
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                    }}
                  >
                    {/* Clean Image Area */}
                    <div className="relative aspect-[4/3] p-6 bg-gray-50">
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                        {discount > 0 && (
                          <motion.span
                            className="px-3 py-1 rounded-full text-xs font-bold text-white"
                            style={{
                              backgroundColor: BRAND.primary,
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                          >
                            -{discount}%
                          </motion.span>
                        )}
                        {p.badge && (
                          <span
                            className="px-3 py-1 rounded-full text-xs font-bold uppercase border bg-white"
                            style={{
                              borderColor: BRAND.light,
                              color: BRAND.dark,
                            }}
                          >
                            {p.badge}
                          </span>
                        )}
                      </div>

                      {/* Clean Wishlist Button */}
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToWishlist(p._id);
                        }}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full border flex items-center justify-center bg-white z-10"
                        style={{
                          borderColor: BRAND.light,
                          color: inWishlist ? BRAND.primary : BRAND.gray,
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <motion.span
                          animate={{ scale: inWishlist ? [1, 1.3, 1] : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {inWishlist ? "♥" : "♡"}
                        </motion.span>
                      </motion.button>

                      {/* Product Image */}
                      <motion.img
                        src={
                          firstImage(p)
                            ? getMediaUrl(firstImage(p))
                            : placeholderImg
                        }
                        alt={p.title}
                        className="w-full h-full object-contain"
                        animate={{
                          scale: hovered === p._id ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        loading="lazy"
                      />
                    </div>

                    {/* Clean Product Info */}
                    <div className="px-6 pb-6">
                      <h3
                        className="text-xl font-bold mb-1 line-clamp-1"
                        style={{ color: BRAND.dark }}
                      >
                        {p.title}
                      </h3>
                      <p
                        className="text-sm line-clamp-2 mb-3 leading-relaxed"
                        style={{ color: BRAND.gray }}
                      >
                        {p.desc}
                      </p>

                      {/* Clean Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-base ${
                                i < Math.round(p.rating || 0)
                                  ? "text-amber-400"
                                  : "text-gray-200"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs" style={{ color: BRAND.gray }}>
                          ({p.numReviews || p.reviews?.length || 0})
                        </span>
                      </div>

                      {/* Clean Price & CTAs */}
                      <div className="flex flex-col gap-3">
                        <div className="flex items-baseline gap-2">
                          <span
                            className="text-2xl font-bold"
                            style={{ color: BRAND.primary }}
                          >
                            {formatPrice(p.price)}
                          </span>
                          {p.originalPrice && (
                            <span
                              className="text-sm line-through"
                              style={{ color: BRAND.gray }}
                            >
                              {formatPrice(p.originalPrice)}
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <motion.button
                            className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold text-white"
                            style={{
                              backgroundColor: BRAND.primary,
                            }}
                            whileHover={{
                              scale: 1.02,
                              backgroundColor: BRAND.dark,
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/product/${p._id}?buy=1`);
                            }}
                          >
                            Buy Now
                          </motion.button>
                          <motion.button
                            className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold border bg-white"
                            style={{
                              borderColor: BRAND.light,
                              color: BRAND.dark,
                            }}
                            whileHover={{
                              scale: 1.02,
                              backgroundColor: BRAND.lightGray,
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/product/${p._id}`);
                            }}
                          >
                            View
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Clean Assurance Section */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {[
              {
                icon: "🚚",
                title: "Free Shipping",
                desc: "Across India on ₹999+",
              },
              {
                icon: "🪔",
                title: "Blessed & Authentic",
                desc: "Spiritually energized",
              },
              { icon: "🔄", title: "Easy Returns", desc: "30‑day policy" },
              {
                icon: "🔒",
                title: "Secure Payments",
                desc: "UPI / Cards / Netbanking",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="rounded-xl p-6 text-center border bg-white group"
                style={{
                  borderColor: BRAND.light,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 4px 12px rgba(30, 64, 175, 0.15)",
                }}
              >
                <motion.div
                  className="text-3xl mb-2"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {f.icon}
                </motion.div>
                <div
                  className="font-bold text-base mb-1"
                  style={{ color: BRAND.dark }}
                >
                  {f.title}
                </div>
                <div
                  className="text-sm leading-relaxed"
                  style={{ color: BRAND.gray }}
                >
                  {f.desc}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
