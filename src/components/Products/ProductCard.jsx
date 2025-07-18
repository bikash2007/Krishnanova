import React from "react";
import Button from "../UI/Button";
import TextBox from "../UI/TextBox";

const ProductCard = ({ product, scrollAnimation }) => {
  return (
    <div
      className={`product-card ${scrollAnimation} gradient-wave-box ${product.variant} bg-gray-100/5 rounded-3xl p-10 text-center transition-all duration-300 backdrop-blur-sm border-2 border-yellow-400/20 relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl`}
    >
      <div className="product-image w-48 h-48 mx-auto mb-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center text-6xl">
        {product.icon}
      </div>

      <h3 className="product-title font-playfair text-3xl text-gray-100 mb-5">
        {product.title}
      </h3>

      <TextBox variant="sacredFire" className="mb-6">
        <p className="product-description text-gray-100/80 mb-8 leading-relaxed">
          {product.description}
        </p>
      </TextBox>

      {product.additionalContent && (
        <TextBox variant="mysticalAurora" className="mb-6">
          {product.additionalContent}
        </TextBox>
      )}

      <Button>Add to Cart - ${product.price}</Button>
    </div>
  );
};

export default ProductCard;
