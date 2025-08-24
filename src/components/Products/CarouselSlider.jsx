import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const CarouselSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  const baseUrl = import.meta.env.VITE_API_URL;
  const AUTO_PLAY_INTERVAL = 4000;

  const currentProduct = useMemo(() => {
    return products[currentIndex] || null;
  }, [products, currentIndex]);

  // Minimal color palette - Dark Blue theme
  const colorTheme = {
    primary: "#1e40af", // Royal Blue
    secondary: "#2563eb", // Bright Blue
    accent: "#3b82f6", // Light Blue
    dark: "#1e3a8a", // Dark Blue
    neutral: "#64748b", // Slate Gray
    light: "#f8fafc", // Almost White
    white: "#ffffff",
    success: "#10b981", // Green for price
    gradients: {
      primary: "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)",
      background: "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)",
      subtle: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    },
  };

  // Responsive display products calculation
  const displayProducts = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) return [];

    const items = [];
    // Responsive visible count: mobile=3, tablet=5, desktop=7
    const getVisibleCount = () => {
      if (typeof window === "undefined") return 7;
      if (window.innerWidth < 640) return 3; // mobile
      if (window.innerWidth < 1024) return 5; // tablet
      return 7; // desktop
    };

    const visibleCount = getVisibleCount();
    const centerOffset = Math.floor(visibleCount / 2);

    for (let i = 0; i < visibleCount; i++) {
      const position = i - centerOffset;
      const index =
        (currentIndex + position + products.length) % products.length;
      const product = products[index];

      if (product) {
        items.push({
          ...product,
          position,
          displayIndex: i,
          key: `coverflow-${product._id}-${position}-${currentIndex}`,
        });
      }
    }

    return items;
  }, [products, currentIndex]);

  // API Fetch with better error handling
  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/products`);
        if (!isMounted) return;

        let fetchedProducts = response.data;

        if (!Array.isArray(fetchedProducts) || fetchedProducts.length === 0) {
          throw new Error("No products available");
        }

        if (fetchedProducts.length < 7) {
          const original = [...fetchedProducts];
          while (fetchedProducts.length < 8) {
            fetchedProducts = [...fetchedProducts, ...original];
          }
        }

        setProducts(fetchedProducts.slice(0, 12));
      } catch (error) {
        console.error("API Error:", error);

        const fallbackProducts = [
          {
            _id: "demo-1",
            title: "Divine Krishna Keychain",
            desc: "Sacred blessed keychain with Krishna's divine presence and protection",
            price: 29,
            originalPrice: 39,
            images: ["/api/placeholder/400/400"],
          },
          {
            _id: "demo-2",
            title: "Peacock Feather Pendant",
            desc: "Beautiful handcrafted pendant inspired by Krishna's peacock feather",
            price: 49,
            originalPrice: 69,
            images: ["/api/placeholder/400/400"],
          },
          {
            _id: "demo-3",
            title: "Sacred Flute Charm",
            desc: "Elegant flute charm representing Krishna's divine music",
            price: 35,
            originalPrice: 45,
            images: ["/api/placeholder/400/400"],
          },
          {
            _id: "demo-4",
            title: "Lotus Blessing Ring",
            desc: "Pure lotus-inspired ring blessed with divine energy",
            price: 89,
            originalPrice: 119,
            images: ["/api/placeholder/400/400"],
          },
          {
            _id: "demo-5",
            title: "Radha Krishna Locket",
            desc: "Beautiful locket featuring Radha and Krishna in eternal love",
            price: 65,
            originalPrice: 85,
            images: ["/api/placeholder/400/400"],
          },
          {
            _id: "demo-6",
            title: "Divine Conch Shell",
            desc: "Sacred conch shell replica for spiritual ceremonies",
            price: 45,
            originalPrice: 60,
            images: ["/api/placeholder/400/400"],
          },
        ];

        setProducts(fallbackProducts);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [baseUrl]);

  // Optimized smooth navigation
  const goToSlide = useCallback(
    (index) => {
      if (
        isTransitioning ||
        index === currentIndex ||
        index < 0 ||
        index >= products.length
      )
        return;

      setIsTransitioning(true);
      setCurrentIndex(index);

      requestAnimationFrame(() => {
        setTimeout(() => setIsTransitioning(false), 500);
      });
    },
    [currentIndex, isTransitioning, products.length]
  );

  const nextSlide = useCallback(() => {
    if (products.length === 0) return;
    const nextIndex = (currentIndex + 1) % products.length;
    goToSlide(nextIndex);
  }, [currentIndex, products.length, goToSlide]);

  const prevSlide = useCallback(() => {
    if (products.length === 0) return;
    const prevIndex =
      currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    goToSlide(prevIndex);
  }, [currentIndex, products.length, goToSlide]);

  // Auto-play with performance optimization
  useEffect(() => {
    if (!isAutoPlaying || products.length <= 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(nextSlide, AUTO_PLAY_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, products.length, nextSlide]);

  const handleMouseEnter = useCallback(() => setIsAutoPlaying(false), []);
  const handleMouseLeave = useCallback(() => setIsAutoPlaying(true), []);

  // Responsive 3D transform calculator
  const getCoverflowTransform = useCallback((position) => {
    const isCurrent = position === 0;
    const absPos = Math.abs(position);

    if (isCurrent) {
      return {
        x: 0,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        zIndex: 100,
        blur: 0,
      };
    }

    // Responsive spacing and rotation
    const getSpacing = () => {
      if (typeof window === "undefined") return 160;
      if (window.innerWidth < 640) return 80; // mobile
      if (window.innerWidth < 1024) return 120; // tablet
      return 160; // desktop
    };

    const rotateY = position > 0 ? -40 : 40;
    const translateX = position * getSpacing();
    const scaleValue = Math.max(0.65, 1 - absPos * 0.12);
    const opacityValue = Math.max(0.4, 1 - absPos * 0.15);

    return {
      x: translateX,
      rotateY: rotateY,
      scale: scaleValue,
      opacity: opacityValue,
      zIndex: 100 - absPos * 10,
      blur: absPos * 1.5,
    };
  }, []);

  const getImageUrl = useCallback(
    (product) => {
      if (!product?.images?.length) return "/api/placeholder/400/400";
      const imagePath = product.images[0];
      return typeof imagePath === "string" && imagePath.startsWith("http")
        ? imagePath
        : `${baseUrl.replace("/api", "")}${imagePath}`;
    },
    [baseUrl]
  );

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-center px-4">
          <div className="relative mb-6">
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-t-4 rounded-full animate-spin mx-auto"
              style={{
                borderColor: `${colorTheme.primary}20`,
                borderTopColor: colorTheme.primary,
              }}
            />
          </div>
          <p
            className="font-semibold text-base sm:text-lg"
            style={{ color: colorTheme.primary }}
          >
            Loading Divine Products...
          </p>
        </div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-center px-4">
          <div className="text-4xl sm:text-6xl mb-4">🕉️</div>
          <h2
            className="text-xl sm:text-2xl font-bold"
            style={{ color: colorTheme.dark }}
          >
            No Products Available
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-transparent"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Responsive Navigation Buttons */}
        <motion.button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute left-2 sm:left-4 lg:left-8 z-50 p-2 sm:p-3 rounded-full bg-white border shadow-lg transition-all duration-200 group disabled:opacity-50 hover:shadow-xl"
          style={{
            borderColor: colorTheme.primary,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft
            className="w-4 h-4 sm:w-5 sm:h-5"
            style={{ color: colorTheme.primary }}
          />
        </motion.button>

        <motion.button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-2 sm:right-4 lg:right-8 z-50 p-2 sm:p-3 rounded-full bg-white border shadow-lg transition-all duration-200 group disabled:opacity-50 hover:shadow-xl"
          style={{
            borderColor: colorTheme.primary,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight
            className="w-4 h-4 sm:w-5 sm:h-5"
            style={{ color: colorTheme.primary }}
          />
        </motion.button>

        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Responsive Product Info */}
          <div className="w-full lg:w-2/5 text-center lg:text-left order-2 lg:order-1 px-4 lg:px-0 lg:pr-8 z-40">
            <AnimatePresence mode="wait">
              {currentProduct && (
                <motion.div
                  key={`info-${currentProduct._id}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-4 sm:space-y-6"
                >
                  <motion.p
                    className="text-xs sm:text-sm font-semibold uppercase tracking-wider"
                    style={{ color: colorTheme.primary }}
                  >
                    DIVINE COLLECTION
                  </motion.p>

                  <motion.h1
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                    style={{ color: colorTheme.dark }}
                  >
                    {currentProduct.title}
                  </motion.h1>

                  <motion.p
                    className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mx-auto lg:mx-0"
                    style={{ color: colorTheme.neutral }}
                  >
                    {currentProduct.desc}
                  </motion.p>

                  <motion.div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4">
                    <span
                      className="text-xl sm:text-2xl lg:text-3xl font-bold"
                      style={{ color: colorTheme.success }}
                    >
                      ₹{currentProduct.price}
                    </span>
                    {currentProduct.originalPrice &&
                      currentProduct.originalPrice !== currentProduct.price && (
                        <span
                          className="text-base sm:text-lg lg:text-xl line-through"
                          style={{ color: colorTheme.neutral }}
                        >
                          ₹{currentProduct.originalPrice}
                        </span>
                      )}
                  </motion.div>

                  {/* Responsive CTA Button */}
                  <Link
                    to={`/product/${currentProduct._id}`}
                    className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-sm sm:text-base"
                    style={{
                      background: colorTheme.gradients.primary,
                    }}
                  >
                    <span>View Product</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Responsive 3D Coverflow Display */}
          <div className="w-full lg:w-3/5 relative order-1 lg:order-2">
            <div
              className="relative w-full flex items-center justify-center"
              style={{
                height: "280px", // Fixed height for mobile
                perspective: "1000px",
                perspectiveOrigin: "center center",
              }}
            >
              <div className="sm:h-80 md:h-96 lg:h-[500px] w-full flex items-center justify-center">
                <AnimatePresence>
                  {displayProducts.map((item) => {
                    const transform = getCoverflowTransform(item.position);
                    const isCurrent = item.position === 0;
                    const imageUrl = getImageUrl(item);

                    // Responsive card sizes
                    const getCardSize = () => {
                      if (typeof window === "undefined")
                        return { width: 280, height: 280 };
                      if (window.innerWidth < 640)
                        return { width: 180, height: 180 }; // mobile
                      if (window.innerWidth < 1024)
                        return { width: 220, height: 220 }; // tablet
                      return { width: 280, height: 280 }; // desktop
                    };

                    const cardSize = getCardSize();

                    return (
                      <motion.div
                        key={item.key}
                        className="absolute flex items-center justify-center cursor-pointer"
                        style={{
                          width: `${cardSize.width}px`,
                          height: `${cardSize.height}px`,
                          transformStyle: "preserve-3d",
                          zIndex: transform.zIndex,
                          willChange: "transform",
                        }}
                        initial={{
                          x: item.position * 200,
                          rotateY: item.position * 60,
                          scale: 0.5,
                          opacity: 0,
                        }}
                        animate={{
                          x: transform.x,
                          rotateY: transform.rotateY,
                          scale: transform.scale,
                          opacity: transform.opacity,
                          filter: `blur(${transform.blur}px)`,
                        }}
                        exit={{
                          scale: 0.3,
                          opacity: 0,
                          rotateY: item.position * 90,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                          mass: 0.6,
                        }}
                        onClick={() => {
                          if (!isCurrent) {
                            goToSlide(
                              (currentIndex + item.position + products.length) %
                                products.length
                            );
                          }
                        }}
                        whileHover={
                          isCurrent
                            ? { scale: 1.05 }
                            : { scale: transform.scale * 1.05 }
                        }
                      >
                        <div className="relative w-full h-full">
                          {/* Responsive Product Card */}
                          <div
                            className="w-full h-full rounded-lg sm:rounded-xl border bg-[#1E3A8A]/80 backdrop-blur-xl shadow-lg overflow-hidden"
                            style={{
                              borderColor: isCurrent
                                ? colorTheme.primary
                                : colorTheme.light,
                              boxShadow: isCurrent
                                ? `0 10px 30px ${colorTheme.primary}20`
                                : `0 5px 15px ${colorTheme.primary}10`,
                            }}
                          >
                            <div className="p-2 sm:p-3 h-full flex items-center justify-center">
                              <motion.img
                                src={imageUrl}
                                alt={item.title}
                                className="w-full h-full object-contain"
                                style={{
                                  maxWidth: `${cardSize.width - 40}px`,
                                  maxHeight: `${cardSize.height - 40}px`,
                                }}
                                onError={(e) => {
                                  e.target.src = "/api/placeholder/400/400";
                                }}
                              />
                            </div>
                          </div>

                          {/* Subtle Reflection Effect for current item */}
                          {isCurrent && (
                            <div
                              className="absolute top-full left-0 w-full h-10 sm:h-20 opacity-10 pointer-events-none rounded-b-lg sm:rounded-b-xl"
                              style={{
                                background: `linear-gradient(to bottom, ${colorTheme.primary} 0%, transparent 100%)`,
                                transform: "scaleY(-0.3)",
                                filter: "blur(2px)",
                              }}
                            />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Indicators */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2 z-40">
          {products.map((_, index) => (
            <motion.button
              key={`dot-${index}`}
              onClick={() => goToSlide(index)}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  index === currentIndex
                    ? colorTheme.primary
                    : `${colorTheme.primary}40`,
              }}
              whileHover={{
                scale: index === currentIndex ? 1.5 : 1.2,
                backgroundColor: colorTheme.primary,
              }}
              animate={{
                scale: index === currentIndex ? 1.5 : 1,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarouselSlider;
