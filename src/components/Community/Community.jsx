import React, { useRef, useEffect } from "react";

const InteractiveBox = ({ children, className }) => {
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const handleMouseMove = (e) => {
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      box.style.setProperty("--mouse-x", `${x}px`);
      box.style.setProperty("--mouse-y", `${y}px`);
    };

    box.addEventListener("mousemove", handleMouseMove);

    return () => {
      box.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={boxRef}
      className={className}
      style={{
        background: `radial-gradient(
          960px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
          rgba(59, 248, 251, 0.15),
          transparent 40%
        )`,
      }}
    >
      {children}
    </div>
  );
};

const Community = () => {
  return (
    <section id="community" className="section py-24">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        <h2
          className="section-title font-playfair text-5xl text-center mb-16
          bg-gradient-to-r from-[#f4c430] to-[#eec6d3] bg-clip-text text-transparent"
        >
          Sacred Community Journey
        </h2>

        {/* Connect Box */}
        <InteractiveBox
          className={`rounded-2xl p-8
            bg-[#0f1f2e]/20 backdrop-blur-lg
            border-2 border-[#0189d1]/60
            shadow-lg
            transition-all ease-linear hover:shadow-cyan-500 duration-500
            hover:bg-gradient-to-br hover:from-[#01abfd] hover:via-[#0189d1] hover:to-[#f4c430]
            hover:border-[#f4c430]
            hover:scale-[1.03] mb-4`}
        >
          <h3 className="text-[#01abfd] text-3xl mb-6 font-semibold drop-shadow-md">
            🌍 Connect Across Distances
          </h3>
          <p className="text-[#f9fbfdcc] text-lg md:text-xl leading-relaxed max-w-3xl">
            Each QR code on your Krishna keychain opens a portal to find
            spiritual family in your area. Share meditation circles, celebrate
            festivals together, and build lasting bonds through shared devotion.
            Technology serving the sacred purpose of unity.
          </p>
        </InteractiveBox>

        {/* Find Spiritual Family Box */}
        <InteractiveBox
          className={`rounded-2xl p-8
            bg-[#0f1f2e]/20 backdrop-blur-lg
            border-2 border-[#0189d1]/60
            shadow-lg
            transition-all ease-linear hover:shadow-cyan-500 duration-500
            hover:bg-gradient-to-br hover:from-[#01abfd] hover:via-[#0189d1] hover:to-[#f4c430]
            hover:border-[#f4c430]
            hover:scale-[1.03] `}
        >
          <h3 className="text-[#f4c430] text-3xl mb-6 font-semibold drop-shadow-md">
            🕯️ Find Your Spiritual Family
          </h3>

          <div className="flex flex-col md:flex-row gap-5 items-center">
            <input
              type="text"
              placeholder="Enter your zipcode"
              className="flex-1 p-4 rounded-xl bg-[#0189d1]/20 text-[#f9fbfd] border-2 border-[#01abfd] focus:border-[#f4c430] focus:outline-none transition-colors duration-300 placeholder:text-[#eec6d3]/90 min-w-0 md:min-w-[12rem]"
            />
            <button
              className="px-10 py-4
                bg-gradient-to-r from-[#f4c430] to-[#eec6d3]
                text-[#0f1f2e] rounded-full font-semibold text-xl
                shadow-md
                transition-transform duration-300
                hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
            >
              Find Community
            </button>
          </div>
        </InteractiveBox>
      </div>
    </section>
  );
};

export default Community;
