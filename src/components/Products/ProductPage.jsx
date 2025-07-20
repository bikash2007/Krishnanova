import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "../Navigation/Navigation";
import krishnakeychain from "../../Media/krishnakeychain.png";
import bagwatgita from "../../Media/bagwatkeychain.png";

const products = [
  {
    id: 1,
    icon: krishnakeychain,
    title: "Mini Krishna Keychain",
    desc: "A sacred companion carrying Krishna's divine presence. Each keychain connects you to a global spiritual community through QR technology, allowing you to name your Krishna and find fellow devotees nearby.",
    price: 25,
  },
  {
    id: 2,
    icon: bagwatgita,
    title: "Mini Bhagavad Gita Book/Keychain",
    desc: "Carry eternal wisdom wherever you go. This beautifully crafted mini Bhagavad Gita doubles as both a sacred keychain and a source of divine guidance, connecting you to our GPT Gita wisdom portal.",
    price: 35,
  },
];

export default function ProductPage() {
  const [cart, setCart] = useState([]);
  const [viewProduct, setViewProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const addToCart = (product, qty) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: qty }]);
    }
  };

  const buyNow = (product, qty) => {
    alert(
      `Proceeding to buy ${qty} x ${product.title} ($${product.price * qty})`
    );
  };

  const buyCart = () => {
    alert(`Proceeding to buy entire cart. Total: $${total}`);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen font-[Inter,sans-serif] relative">
      {/* background */}
      <div className="absolute top-0 inset-0 -z-10 bg-gradient-to-br from-[#f0fbff] to-[#e6f7ff]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#01abfd33,transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,#2e8b5733,transparent_40%)]"></div>
      </div>

      <Navigation />

      <div className="text-center  py-24">
        <motion.h1
          className="text-5xl md:text-6xl  font-extrabold bg-gradient-to-r from-[#01abfd] to-[#2e8b57] text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ✨ Krishna’s Blessings ✨
        </motion.h1>
        <p className="text-lg text-gray-600 mt-4 max-w-xl mx-auto italic">
          “You have the right to perform your actions, but you are not entitled
          to the fruits of your actions.” — Bhagavad Gita 2.47
        </p>
      </div>

      <div id="products" className="px-4">
        {viewProduct ? (
          <motion.div
            className=" mx-auto bg-white p-8 rounded-3xl shadow-xl relative space-y-4 border lg:flex lg:w-[90%] gap-10 border-[#01abfd44]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <button
              onClick={() => setViewProduct(null)}
              className="absolute top-2 right-2 text-[#01abfd] hover:text-[#0189d1] text-2xl"
            >
              ✕
            </button>
            <motion.div
              className="w-full h-96 bg-cover  bg-center drop-shadow rounded-lg"
              style={{ backgroundImage: `url(${viewProduct.icon})` }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            ></motion.div>
            <div>
              <h2 className="text-3xl text-[#0189d1] font-bold text-center">
                {viewProduct.title}
              </h2>
              <p className="text-gray-500 text-center text-sm">
                {viewProduct.desc}
              </p>

              <div className="flex justify-center items-center gap-3 mt-4">
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="px-3 py-1 bg-[#e0f4ff] text-[#0189d1] rounded-full text-lg hover:bg-[#cceaff]"
                >
                  -
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 bg-[#e0f4ff] text-[#0189d1] rounded-full text-lg hover:bg-[#cceaff]"
                >
                  +
                </button>
              </div>

              <div className="text-center mt-4">
                <span className="text-xl font-bold text-green-600">
                  ${viewProduct.price} each
                </span>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    addToCart(viewProduct, quantity);
                    setViewProduct(null);
                    setQuantity(1);
                  }}
                  className="flex-1 bg-gradient-to-r from-[#01abfd] to-[#0189d1] text-white px-4 py-2 rounded-full hover:shadow-lg"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => buyNow(viewProduct, quantity)}
                  className="flex-1 bg-gradient-to-r from-[#2e8b57] to-[#01abfd] text-white px-4 py-2 rounded-full hover:shadow-lg"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-3xl shadow-md p-6 flex flex-col gap-4 hover:shadow-xl transition cursor-pointer border border-[#01abfd22]"
                whileHover={{ scale: 1.03 }}
                onClick={() => setViewProduct(product)}
              >
                <motion.div
                  className="w-full h-72 bg-cover  bg-center drop-shadow rounded-lg"
                  style={{ backgroundImage: `url(${product.icon})` }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                ></motion.div>
                <h2 className="text-xl font-semibold text-[#0189d1] text-center">
                  {product.title}
                </h2>
                <p className="text-gray-500 text-sm text-center">
                  {product.desc}
                </p>
                <div className="text-center mt-auto">
                  <span className="text-lg font-bold text-green-600">
                    ${product.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {cart.length > 0 && (
        <motion.div
          className="fixed bottom-4 right-4 bg-white p-4 rounded-2xl shadow-lg w-72 border border-[#01abfd44]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="font-bold text-lg text-[#0189d1]">Your Cart</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm my-1">
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
          <div className="mt-2 border-t pt-2 text-right font-bold">
            Total: ${total}
          </div>
          <button
            onClick={buyCart}
            className="mt-3 w-full bg-gradient-to-r from-[#2e8b57] to-[#01abfd] text-white px-4 py-2 rounded-full hover:shadow-lg"
          >
            Checkout
          </button>
        </motion.div>
      )}

      <footer className="text-center mt-12 text-xs text-gray-400">
        © {new Date().getFullYear()} Krishna Vibes. All rights reserved.
      </footer>
    </div>
  );
}
