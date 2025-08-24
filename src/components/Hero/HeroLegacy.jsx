import React, { useEffect, useMemo, useRef, useState } from "react";

const HeroLegacy = ({
  title = "Welcome to Krishnova",
  subtitle = "A Journey of faith, where all things blossom",
  ctaText = "Begin Your Sacred Journey",
  ctaHref = "#products",
}) => {
  const parallaxRef = useRef(null);
  const flowsRef = useRef([]);
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Seed particles using your exact structure
  const seed = useMemo(
    () => [
      {
        id: 1,
        left: "10%",
        delay: "0s",
        dur: "8s",
        colorVar: "--golden-sunrise",
      },
      { id: 2, left: "20%", delay: "-1s", dur: "9s", colorVar: "--neon-cyan" },
      {
        id: 3,
        left: "30%",
        delay: "-2s",
        dur: "10s",
        colorVar: "--electric-magenta",
      },
      {
        id: 4,
        left: "40%",
        delay: "-3s",
        dur: "7s",
        colorVar: "--golden-sunrise",
      },
      { id: 5, left: "50%", delay: "-4s", dur: "8s", colorVar: "--neon-cyan" },
      {
        id: 6,
        left: "60%",
        delay: "-5s",
        dur: "9s",
        colorVar: "--electric-magenta",
      },
      {
        id: 7,
        left: "70%",
        delay: "-1.5s",
        dur: "10s",
        colorVar: "--golden-sunrise",
      },
      {
        id: 8,
        left: "80%",
        delay: "-2.5s",
        dur: "8s",
        colorVar: "--neon-cyan",
      },
      {
        id: 9,
        left: "90%",
        delay: "-3.5s",
        dur: "9s",
        colorVar: "--electric-magenta",
      },
    ],
    []
  );
  const [particles, setParticles] = useState(seed);

  // Energy beams positions
  const flows = useMemo(
    () => [
      { left: "10%", delay: "0s" },
      { left: "30%", delay: "-2s" },
      { left: "50%", delay: "-4s" },
      { left: "70%", delay: "-6s" },
      { left: "90%", delay: "-8s" },
    ],
    []
  );

  // Mouse tracking for cursor glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove);
      return () => hero.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Scroll parallax for sprinkle background and energy-flow shift
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    let raf;
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${y * 0.5}px)`;
      }
      flowsRef.current.forEach((el, idx) => {
        if (!el) return;
        el.style.transform = `translateY(${y * (0.2 + idx * 0.1)}px)`;
      });
    };
    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(onScroll);
    };

    window.addEventListener("scroll", handler, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", handler);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Auto-spawn particles periodically
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    let id = 1000;
    const colors = [
      "--golden-sunrise",
      "--neon-cyan",
      "--electric-magenta",
      "--cosmic-purple",
    ];
    const iv = setInterval(() => {
      setParticles((prev) => {
        const next = [...prev];
        if (next.length > 50) next.splice(0, next.length - 50);
        next.push({
          id: id++,
          left: `${Math.random() * 100}%`,
          delay: `-${(Math.random() * 10).toFixed(2)}s`,
          dur: `${(Math.random() * 5 + 5).toFixed(2)}s`,
          colorVar: colors[Math.floor(Math.random() * colors.length)],
        });
        return next;
      });
    }, 2000);
    return () => clearInterval(iv);
  }, []);

  return (
    <>
      <style jsx>{`
        :root {
          /* Krishnova core */
          --primary: #39c0cd;
          /* Krishna Blue */
          --red: #e53e3e;
          /* Sacred Red */
          --accent: #d4a574;
          /* Divine Gold */
          --dark: #2d3748;
          --white: #ffffff;

          /* Legacy hero palette */
          --golden-sunrise: #ffd700;
          --electric-magenta: #ff1493;
          --neon-cyan: #00ffff;
          --cosmic-purple: #8a2be2;
          --royal-krishna-blue: #1e3a8a;
          --deep-space-blue: #191970;
          --divine-orange: #ff8c00;
          --iridescent-white: #f8f8ff;
        }

        .bg-krishnova-hero {
          background: radial-gradient(
              ellipse at center,
              rgba(255, 20, 147, 0.1) 0%,
              transparent 70%
            ),
            linear-gradient(
              135deg,
              var(--deep-space-blue) 0%,
              var(--royal-krishna-blue) 50%,
              var(--cosmic-purple) 100%
            );
        }

        .cursor-bell {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32"><path d="M12 2C8 2 5 5 5 9v6c0 2 1 4 3 5l-1 3h10l-1-3c2-1 3-3 3-5V9c0-4-3-7-7-7zm0 2c3 0 5 2 5 5v6c0 1-1 2-2 3H9c-1-1-2-2-2-3V9c0-3 2-5 5-5z" fill="%23FFD700"/><circle cx="12" cy="25" r="2" fill="%23FFD700"/><path d="M10 24h4v4h-4z" fill="%23FFD700"/></svg>')
              12 16,
            auto;
        }

        .cursor-bell .interactive:hover {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32"><g transform="rotate(10 12 16)"><path d="M12 2C8 2 5 5 5 9v6c0 2 1 4 3 5l-1 3h10l-1-3c2-1 3-3 3-5V9c0-4-3-7-7-7zm0 2c3 0 5 2 5 5v6c0 1-1 2-2 3H9c-1-1-2-2-2-3V9c0-3 2-5 5-5z" fill="%23FFD700"/><circle cx="12" cy="25" r="2" fill="%23FFD700"/><path d="M10 24h4v4h-4z" fill="%23FFD700"/></g></svg>')
              12 16,
            auto;
        }

        .hero-parallax {
          background-image: radial-gradient(
              circle at 20px 20px,
              rgba(255, 215, 0, 0.3) 2px,
              transparent 2px
            ),
            radial-gradient(
              circle at 80px 30px,
              rgba(0, 255, 255, 0.4) 1.5px,
              transparent 1.5px
            ),
            radial-gradient(
              circle at 60px 70px,
              rgba(255, 20, 147, 0.3) 1px,
              transparent 1px
            ),
            radial-gradient(
              circle at 30px 80px,
              rgba(138, 43, 226, 0.2) 2.5px,
              transparent 2.5px
            );
          background-size: 100px 100px;
          background-repeat: repeat;
        }

        .particle-dot {
          position: absolute;
          top: 0;
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          opacity: 0.75;
          background: var(--golden-sunrise);
        }

        .particle-dot:nth-child(2n) {
          background: var(--neon-cyan);
        }

        .particle-dot:nth-child(3n) {
          background: var(--electric-magenta);
        }

        .pendulum-ball {
          width: 60px;
          height: 60px;
          border-radius: 9999px;
          background: radial-gradient(
            circle,
            var(--golden-sunrise) 0%,
            var(--divine-orange) 100%
          );
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
          position: relative;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pendulum-v {
          position: absolute;
          width: 30px;
          height: 40px;
          top: 8px;
          background: #fff;
          transform: rotate(180deg);
          clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
        }

        .energy-flow {
          position: absolute;
          top: 0;
          width: 2px;
          height: 100px;
          background: linear-gradient(
            to bottom,
            transparent,
            var(--neon-cyan),
            transparent
          );
        }

        .text-iridescent {
          color: var(--iridescent-white);
        }

        .text-shadow-gold {
          text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
        }

        @keyframes parallaxFloat {
          0% {
            transform: translateY(0) translateX(0);
          }
          100% {
            transform: translateY(-100px) translateX(50px);
          }
        }

        .animate-parallax {
          animation: parallaxFloat 20s linear infinite;
        }

        @keyframes floatUp {
          0%,
          100% {
            transform: translateY(100vh) translateX(0) rotate(0);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          50% {
            transform: translateY(50vh) translateX(50px) rotate(180deg);
          }
        }

        .animate-particle {
          animation: floatUp 8s ease-in-out infinite;
        }

        @keyframes pendulumSwing {
          0%,
          100% {
            transform: rotate(-15deg);
          }
          50% {
            transform: rotate(15deg);
          }
        }

        .animate-pendulum {
          animation: pendulumSwing 4s ease-in-out infinite;
          transform-origin: top center;
        }

        @keyframes energyFlow {
          0% {
            opacity: 0;
            transform: translateY(-100px);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(100vh);
          }
        }

        .animate-energy {
          animation: energyFlow 4s ease-in-out infinite;
        }

        @keyframes gentleFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-gentle-float {
          animation: gentleFloat 3s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradientShift 12s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-120%) skewX(-20deg);
          }
          100% {
            transform: translateX(120%) skewX(-20deg);
          }
        }

        .animate-shimmer {
          animation: shimmer 1.8s linear infinite;
        }

        /* Enhanced button styles - FIXED VERSION */
        .hero-enhanced-button {
          position: relative;
          background: linear-gradient(
            135deg,
            var(--golden-sunrise) 0%,
            var(--electric-magenta) 50%,
            var(--neon-cyan) 100%
          );
          background-size: 200% 200%;
          border: none;
          border-radius: 50px;
          padding: 16px 32px;
          font-weight: 600;
          color: white;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          /* Force hardware acceleration for smoother rendering */
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .hero-enhanced-button:hover {
          background-position: 100% 0;
          transform: translateY(-4px) translateZ(0) scale(1.05);
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.6),
            0 0 60px rgba(255, 20, 147, 0.4), 0 0 90px rgba(0, 255, 255, 0.3),
            0 15px 40px rgba(0, 0, 0, 0.3);
          filter: brightness(1.1);
        }

        /* Animated border glow effect */
        .hero-enhanced-button::before {
          content: "";
          position: absolute;
          inset: -3px;
          background: linear-gradient(
            45deg,
            var(--golden-sunrise),
            var(--electric-magenta),
            var(--neon-cyan),
            var(--cosmic-purple),
            var(--golden-sunrise)
          );
          background-size: 300% 300%;
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.4s ease;
          animation: gradientRotate 4s ease infinite;
          /* Ensure smooth edges */
          filter: blur(1px);
        }

        .hero-enhanced-button:hover::before {
          opacity: 0.8;
        }

        /* Inner content wrapper for clean text rendering */
        .hero-enhanced-button::after {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          border-radius: inherit;
          z-index: -1;
        }

        @keyframes gradientRotate {
          0% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Additional anti-aliasing for button text */
        .hero-enhanced-button span {
          position: relative;
          z-index: 1;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
      <section
        ref={heroRef}
        id="home"
        className="
          krishnova-hero relative min-h-[100svh] flex items-center justify-center text-center overflow-hidden
          cursor-bell bg-krishnova-hero
        "
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255, 215, 0, 0.08) 0%, 
              rgba(255, 20, 147, 0.04) 25%, 
              rgba(0, 255, 255, 0.03) 50%, 
              transparent 70%),
            radial-gradient(ellipse at center, rgba(255, 20, 147, 0.1) 0%, transparent 70%),
            linear-gradient(135deg, var(--deep-space-blue) 0%, var(--royal-krishna-blue) 50%, var(--cosmic-purple) 100%)
          `,
        }}
      >
        {/* Parallax sprinkle background */}
        <div
          ref={parallaxRef}
          className="hero-parallax absolute inset-0 pointer-events-none animate-parallax"
        />

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <span
              key={p.id}
              className="particle-dot animate-particle"
              style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.dur,
                background: `var(${p.colorVar})`,
              }}
            />
          ))}
        </div>

        {/* Pendulum with V insert */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-16 h-16">
          <div className="pendulum-ball animate-pendulum">
            <span className="pendulum-v" />
          </div>
        </div>

        {/* Floating content */}
        <div className="relative z-10 max-w-[800px] px-5 text-iridescent">
          <h1
            className="
              font-playfair font-bold mb-5
              text-transparent bg-clip-text
              bg-gradient-to-r from-[#FFD700] via-[#FF1493] to-[#00FFFF]
              text-shadow-gold
              text-[clamp(2.6rem,6vw,4rem)]
              animate-gentle-float animate-gradient-shift
            "
          >
            {title}
          </h1>

          <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] opacity-90 mb-9 animate-gentle-float">
            {subtitle}
          </p>

          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => (window.location.href = ctaHref)}
            className="hero-enhanced-button interactive cursor-pointer"
          >
            {/* Shimmer sweep */}
            <span className="pointer-events-none absolute inset-0 -translate-x-[120%] skew-x-[-20deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent)] animate-shimmer rounded-full" />

            {/* Ripple effect on hover */}
            {isHovered && (
              <span
                className="
                absolute inset-0 rounded-full
                bg-gradient-to-r from-transparent via-white to-transparent
                opacity-15 animate-ping
              "
              />
            )}

            <span className="relative z-10">{ctaText}</span>
          </button>
        </div>

        {/* Energy flows */}
        {flows.map((f, i) => (
          <span
            key={i}
            ref={(el) => (flowsRef.current[i] = el)}
            className="energy-flow animate-energy absolute top-0"
            style={{ left: f.left, animationDelay: f.delay }}
          />
        ))}
      </section>
    </>
  );
};

export default HeroLegacy;
