import React, { createContext, useContext, useState } from "react";
const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((p) => p.productId === product._id);
      let updated;
      if (found) {
        updated = prev.map((p) =>
          p.productId === product._id ? { ...p, quantity: p.quantity + qty } : p
        );
      } else {
        updated = [
          ...prev,
          {
            productId: product._id,
            title: product.title,
            price: product.price,
            image: product.images?.[0] || "",
            quantity: qty,
          },
        ];
      }
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };
  const removeFromCart = (id) =>
    setCart((prev) => {
      const updated = prev.filter((p) => p.productId !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
