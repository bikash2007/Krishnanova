import React from "react";
import SectionTitle from "../UI/SectionTitle";
import TextBox from "../UI/TextBox";

const Mission = () => {
  return (
    <section className="section py-24 relative z-10 ">
      <div className="container max-w-7xl mx-auto px-8">
        <SectionTitle>Our Divine Mission</SectionTitle>
        <TextBox scrollAnimation="scroll-slide-left">
          <p className="text-gray-100 text-xl leading-relaxed">
            Krishnova bridges the sacred and digital realms, creating a global
            spiritual ecosystem where ancient wisdom meets modern technology.
            Through our blessed Krishna keychains and sacred texts, we connect
            souls across distances, fostering divine communities rooted in love,
            devotion, and timeless teachings.
          </p>
        </TextBox>
      </div>
    </section>
  );
};

export default Mission;
