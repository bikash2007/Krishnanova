import React, { useEffect, useRef } from "react";
import Button from "../UI/Button";
import TextBox from "../UI/TextBox";
import { Link } from "react-router-dom";

const ProductCard = ({ product, scrollAnimation }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    card.addEventListener("mousemove", handleMouseMove);

    // Cleanup on unmount
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`product-card ${scrollAnimation} card gradient-wave-box ${product.variant} bg-gray-100/5 backdrop-blur-lg rounded-3xl p-10 text-center transition-all duration-300 border-2 border-yellow-400/20 relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl`}
      style={{
        // Fallback background color for no JS or no mouse
        background: `radial-gradient(960px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 248, 251, 0.3), transparent 40%)`,
      }}
    >
      <div
        style={{
          backgroundImage: `url(${product.icon})`,
        }}
        className="product-image w-48 h-48 mx-auto mb-8 bg-center shadow-2xl shadow-black bg-cover rounded-3xl flex items-center justify-center text-6xl"
      ></div>

      <h3 className="product-title font-playfair text-3xl text-gray-100 mb-5">
        {product.title}
      </h3>

      <TextBox variant="sacredFire" className="mb-6">
        <p className="product-description text-gray-100/80 mb-8 leading-relaxed">
          {product.description}
        </p>
      </TextBox>

      <Link
        to={"/productpage"}
        className="text-white rounded-2xl bg-cyan-400 px-5 py-2 text-xl hover:scale-110 transition-transform duration-300 z-20 inline-block"
      >
        View more
      </Link>
    </div>
  );
};

export default ProductCard;
