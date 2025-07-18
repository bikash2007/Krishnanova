import React from "react";
import SectionTitle from "../UI/SectionTitle";
import TextBox from "../UI/TextBox";
import Button from "../UI/Button";

const WisdomPortal = () => {
  return (
    <section id="wisdom" className="section py-24">
      <div className="container max-w-7xl mx-auto px-8">
        <SectionTitle>Divine Wisdom Portal</SectionTitle>
        <TextBox variant="mysticalAurora" scrollAnimation="scroll-slide-left">
          <h3 className="text-yellow-400 text-3xl mb-8 text-center">
            🔮 Sacred Wisdom Coming Soon
          </h3>
          <p className="text-gray-100 text-xl leading-relaxed text-center mb-8">
            Our GPT Gita integration launches in 2 days! Ask Krishna any
            question and receive personalized wisdom from the Bhagavad Gita.
            Experience ancient teachings through modern AI, creating a bridge
            between eternal wisdom and contemporary understanding.
          </p>
          <div className="text-center">
            <Button>Notify Me When Ready</Button>
          </div>
        </TextBox>
      </div>
    </section>
  );
};

export default WisdomPortal;
