import { useEffect, useRef, useState } from "react";

export default function FloatingKrishna() {
  const containerRef = useRef(null);
  const laughRef = useRef(null);
  const [teaseText, setTeaseText] = useState("Catch me if you can 👀");
  const teaseMessages = [
    "Too slow! 🐢",
    "Try harder 😏",
    "Haha 😂",
    "You can’t catch me 🪷",
    "Not today! 👋",
    "😜 Missed me!",
  ];

  const moveKrishna = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const maxX = window.innerWidth - container.offsetWidth;
    const maxY = window.innerHeight - container.offsetHeight;

    const randX = Math.floor(Math.random() * maxX);
    const randY = Math.floor(Math.random() * maxY);

    container.style.transform = `translate(${randX}px, ${randY}px)`;
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const buffer = 100;

    if (
      mouseX > rect.left - buffer &&
      mouseX < rect.right + buffer &&
      mouseY > rect.top - buffer &&
      mouseY < rect.bottom + buffer
    ) {
      moveKrishna();

      const randomTease =
        teaseMessages[Math.floor(Math.random() * teaseMessages.length)];
      setTeaseText(randomTease);

      if (laughRef.current) {
        laughRef.current.play();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    moveKrishna();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <audio ref={laughRef} src="/laugh.mp3" />
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          transform: "translate(0, 0)",
          zIndex: 9999,
          textAlign: "center",
          cursor: "pointer",
          transition: "transform 0.3s ease",
        }}
      >
        <div
          style={{
            color: "#ffd700",
            fontWeight: "bold",
            fontSize: "1rem",
            textShadow: "0 0 5px black",
            marginBottom: "5px",
            animation: "talking 0.4s infinite alternate",
          }}
        >
          {teaseText}
        </div>
        <img
          src="/krishna.png"
          alt="Lord Krishna"
          style={{
            width: "150px",
            height: "auto",
            pointerEvents: "auto",
          }}
        />
      </div>

      <style>{`
        @keyframes talking {
          0% { transform: translateY(0); }
          100% { transform: translateY(-3px); }
        }
      `}</style>
    </>
  );
}
