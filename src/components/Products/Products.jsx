import React, { useEffect, useState } from "react";
import SectionTitle from "../UI/SectionTitle";
import ProductCard from "./ProductCard";
import { useApi } from "../../Context/baseUrl";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// If you want to ensure all backgrounds are always under the content,
// use z-negative for backgrounds and z-positive for foregrounds.

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/products`);
        setProducts(response.data.slice(0, 2));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [baseUrl]);

  if (loading) {
    return (
      <section
        id="products"
        className="section py-24 bg-gradient-to-br from-blue-50 via-white to-emerald-50"
      >
        <div className="container max-w-7xl mx-auto px-8">
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-emerald-200 border-b-emerald-500 rounded-full animate-spin animate-reverse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="products"
      className="section py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/50"
    >
      {/* Animated blurred background shapes */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Layered gradients for soft background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent"></div>
        {/* Animated shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
              background: `linear-gradient(${Math.random() * 360}deg, 
                rgba(59, 130, 246, ${0.12 + Math.random() * 0.15}), 
                rgba(16, 185, 129, ${0.1 + Math.random() * 0.12}), 
                rgba(245, 158, 11, ${0.07 + Math.random() * 0.08}))`,
            }}
            animate={{
              x: [0, 60, -40, 0],
              y: [0, -40, 30, 0],
              scale: [1, 1.13, 0.92, 1],
              rotate: [0, 170, 340],
            }}
            transition={{
              duration: 19 + i * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container max-w-6xl mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="section-title font-bold font-playfair text-5xl text-center mb-16 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent ">
            Sacred Products
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed font-semibold"
          >
            Discover divine companions that connect you to spiritual wisdom and
            community through innovative sacred technology.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </div>

        {/* View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-20"
        >
          <Link to="/productpage" className="group relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-600 hover:from-blue-400 hover:via-emerald-400 hover:to-blue-500 text-white font-bold py-5 px-12 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-300/30"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span>Explore All Sacred Items</span>
                <motion.span
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-xl"
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
