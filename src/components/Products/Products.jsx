import React from "react";
import SectionTitle from "../UI/SectionTitle";
import ProductCard from "./ProductCard";

const Products = () => {
  const products = [
    {
      id: 1,
      icon: "🔑",
      title: "Mini Krishna Keychain",
      description:
        "A sacred companion carrying Krishna's divine presence. Each keychain connects you to a global spiritual community through QR technology, allowing you to name your Krishna and find fellow devotees nearby.",
      price: 25,
      variant: "cosmic-ocean",
      additionalContent: (
        <>
          <h4 className="text-yellow-400 mb-5 text-xl">Name Your Krishna</h4>
          <select className="w-full p-4 rounded-xl bg-black/30 text-white border-2 border-yellow-400">
            <option>Choose a Sacred Name</option>
            <option>Govinda - Protector of Cows</option>
            <option>Ladoo Gopal - Sweet Child Krishna</option>
            <option>Radha Ramana - Beloved of Radha</option>
            <option>Kanaiya - The Mischievous One</option>
            <option>Kanha - Dark Beauty</option>
            <option>Hari - Remover of Sorrows</option>
            <option>Banke Bihari - Charming Form</option>
            <option>Shyam - Enchanting Presence</option>
            <option>Keshav - Long-haired One</option>
            <option>Madhusudan - Destroyer of Demons</option>
            <option>Vasudeva - Divine Child</option>
            <option>Jagannath - Lord of Universe</option>
          </select>
        </>
      ),
    },
    {
      id: 2,
      icon: "📖",
      title: "Mini Bhagavad Gita Book/Keychain",
      description:
        "Carry eternal wisdom wherever you go. This beautifully crafted mini Bhagavad Gita doubles as both a sacred keychain and a source of divine guidance, connecting you to our GPT Gita wisdom portal.",
      price: 35,
      variant: "krishna-breath",
      additionalContent: (
        <>
          <h4 className="text-cyan-400 mb-4 text-xl">Daily Wisdom Preview</h4>
          <p className="text-gray-100 italic">
            "You have the right to perform your actions, but you are not
            entitled to the fruits of your actions." - Bhagavad Gita 2.47
          </p>
        </>
      ),
    },
  ];

  return (
    <section id="products" className="section py-24">
      <div className="container max-w-7xl mx-auto px-8">
        <SectionTitle>Sacred Products</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-20">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              scrollAnimation={
                index % 2 === 0 ? "scroll-slide-left" : "scroll-slide-right"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
