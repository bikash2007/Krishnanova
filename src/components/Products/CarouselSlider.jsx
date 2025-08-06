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

/**
 * 3D Coverflow Carousel - Inspired by the YouTube video
 * Smooth perspective transitions with realistic depth and rotation
 */
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

  // **3D Coverflow Display Products**
  const displayProducts = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) return [];

    const items = [];
    const visibleCount = 7; // Show 7 items for full coverflow effect
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

  // **API Fetch**
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

  // **Smooth Navigation**
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

      setTimeout(() => setIsTransitioning(false), 600);
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

  // **Auto-play**
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

  // **3D Transform Calculator - Like the video**
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

    // **Side items with perspective rotation**
    const rotateY = position > 0 ? -45 : 45; // Rotate based on side
    const translateX = position * 180; // Spacing between items
    const translateZ = -Math.abs(position) * 100; // Depth based on distance

    return {
      x: translateX,
      rotateY: rotateY,
      scale: Math.max(0.6, 1 - absPos * 0.15),
      opacity: Math.max(0.4, 1 - absPos * 0.2),
      zIndex: 100 - absPos * 10,
      blur: absPos * 2,
      translateZ: translateZ,
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
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          </div>
          <p className="text-indigo-600 font-semibold text-lg">
            Loading Divine Products...
          </p>
        </div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="text-6xl mb-4">🕉️</div>
          <h2 className="text-2xl font-bold text-gray-800">
            No Products Available
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* **Krishna Background** */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-indigo-100" />

        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={`bg-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${250 + i * 40}px`,
                height: `${250 + i * 40}px`,
                left: `${i * 15}%`,
                top: `${i * 12}%`,
                background: `radial-gradient(ellipse, 
                  rgba(59, 130, 246, ${0.1 + i * 0.02}) 0%, 
                  rgba(99, 102, 241, ${0.08 + i * 0.015}) 40%, 
                  transparent 70%)`,
                filter: "blur(60px)",
              }}
              animate={{
                x: [0, 40, -20, 0],
                y: [0, -30, 20, 0],
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative h-screen flex items-center justify-center px-4 md:px-8">
        {/* **Navigation** */}
        <motion.button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute left-8 z-50 p-4 rounded-full bg-white/90 backdrop-blur-sm border border-blue-200/50 shadow-2xl hover:bg-white transition-all duration-200 group disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-6 h-6 text-indigo-600" />
        </motion.button>

        <motion.button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-8 z-50 p-4 rounded-full bg-white/90 backdrop-blur-sm border border-blue-200/50 shadow-2xl hover:bg-white transition-all duration-200 group disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-6 h-6 text-indigo-600" />
        </motion.button>

        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          {/* **Product Info** */}
          <div className="w-full lg:w-2/5 text-center lg:text-left mb-8 lg:mb-0 lg:pr-12 z-40">
            <AnimatePresence mode="wait">
              {currentProduct && (
                <motion.div
                  key={`info-${currentProduct._id}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <motion.p className="text-sm font-bold text-indigo-600 mb-3 uppercase tracking-wider">
                    DESIGN SLIDER
                  </motion.p>

                  <motion.h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    {currentProduct.title}
                  </motion.h1>

                  <motion.p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    {currentProduct.desc}
                  </motion.p>

                  <motion.div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                    <span className="text-3xl font-bold text-indigo-600">
                      ${currentProduct.price}
                    </span>
                    {currentProduct.originalPrice &&
                      currentProduct.originalPrice !== currentProduct.price && (
                        <span className="text-xl text-gray-400 line-through">
                          ${currentProduct.originalPrice}
                        </span>
                      )}
                  </motion.div>

                  <Link
                    to={`/product/${currentProduct._id}`}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 font-semibold shadow-xl group"
                  >
                    See more
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

          {/* **3D Coverflow Display** */}
          <div className="w-full lg:w-3/5 relative h-96 lg:h-[500px] flex items-center justify-center">
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{
                perspective: "1000px",
                perspectiveOrigin: "center center",
              }}
            >
              <AnimatePresence>
                {displayProducts.map((item) => {
                  const transform = getCoverflowTransform(item.position);
                  const isCurrent = item.position === 0;
                  const imageUrl = getImageUrl(item);

                  return (
                    <motion.div
                      key={item.key}
                      className="absolute flex items-center justify-center cursor-pointer"
                      style={{
                        width: "280px",
                        height: "280px",
                        transformStyle: "preserve-3d",
                        zIndex: transform.zIndex,
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
                        stiffness: 260,
                        damping: 20,
                        mass: 0.8,
                        duration: 0.6,
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
                        <motion.img
                          src={imageUrl}
                          alt={item.title}
                          className="w-full h-full object-contain"
                          style={{
                            maxWidth: "260px",
                            maxHeight: "260px",
                            filter: isCurrent
                              ? "drop-shadow(0 20px 40px rgba(0,0,0,0.3))"
                              : "drop-shadow(0 10px 20px rgba(0,0,0,0.2))",
                            borderRadius: "12px",
                          }}
                          onError={(e) => {
                            e.target.src = "/api/placeholder/400/400";
                          }}
                        />

                        {/* **Reflection Effect** */}
                        {isCurrent && (
                          <div
                            className="absolute top-full left-0 w-full h-full opacity-20 pointer-events-none"
                            style={{
                              background: `linear-gradient(to bottom, 
                                rgba(0,0,0,0.1) 0%, 
                                transparent 60%)`,
                              transform: "scaleY(-1)",
                              filter: "blur(1px)",
                            }}
                          >
                            <img
                              src={imageUrl}
                              alt=""
                              className="w-full h-full object-contain"
                              style={{ maxWidth: "260px", maxHeight: "260px" }}
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* **Indicators** */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-40">
          {products.map((_, index) => (
            <motion.button
              key={`dot-${index}`}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-indigo-600 scale-150"
                  : "bg-indigo-300 hover:bg-indigo-400"
              }`}
              whileHover={{ scale: index === currentIndex ? 1.5 : 1.2 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarouselSlider;
