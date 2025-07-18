import React from "react";
import SectionTitle from "../UI/SectionTitle";
import NameCard from "./NameCard";

const KrishnaNames = () => {
  const krishnaNames = [
    {
      name: "Govinda",
      meaning: "Protector of Cows, Earth's Guardian",
      bg: "pink",
    },
    {
      name: "Ladoo Gopal",
      meaning: "Sweet Child oh Krishna, Beloved by All",
      bg: "cyan",
    },
    {
      name: "Radha Ramana",
      meaning: "Beloved of Radha, Divine Love",
      bg: "pink",
    },
    {
      name: "Kanaiya",
      meaning: "The Mischievous One, Playful Spirit",
      bg: "cyan",
    },
    { name: "Kanha", meaning: "Dark-complexioned, Beautiful One", bg: "pink" },
    { name: "Hari", meaning: "Remover of Sorrows, Divine Healer", bg: "cyan" },
    {
      name: "Banke Bihari",
      meaning: "Bent in Three Places, Charming Form",
      bg: "pink",
    },
    { name: "Shyam", meaning: "Dark Beauty, Enchanting Presence", bg: "cyan" },
    { name: "Keshav", meaning: "Long-haired One, Slayer of Keshi", bg: "pink" },
    { name: "Madhusudan", meaning: "Destroyer of Madhu Demon", bg: "cyan" },
    { name: "Vasudeva", meaning: "Son of Vasudeva, Divine Child", bg: "pink" },
    {
      name: "Jagannath",
      meaning: "Lord of the Universe, Universal Master",
      bg: "cyan",
    },
  ];

  return (
    <section className="section py-24">
      <div className="container max-w-7xl mx-auto px-8">
        <SectionTitle>Sacred Krishna Names & Meanings</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {krishnaNames.map((item, index) => (
            <NameCard
              key={index}
              name={item.name}
              meaning={item.meaning}
              bgColor={item.bg}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KrishnaNames;
