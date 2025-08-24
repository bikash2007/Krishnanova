import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const useGSAPScrolling = () => {
  const smoother = useRef(null);

  useEffect(() => {
    // Create smooth scrolling effect
    smoother.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.1,
    });

    // Scroll reveal animations
    const revealElements = gsap.utils.toArray(".scroll-reveal");
    revealElements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Slide animations
    const slideLeftElements = gsap.utils.toArray(".scroll-slide-left");
    slideLeftElements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    const slideRightElements = gsap.utils.toArray(".scroll-slide-right");
    slideRightElements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          x: 100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Parallax effects for hero elements
    const parallaxElements = gsap.utils.toArray(".parallax");
    parallaxElements.forEach((element) => {
      gsap.to(element, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Sacred symbols animation for name cards
    const nameCards = gsap.utils.toArray(".name-card");
    nameCards.forEach((card) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 70%",
        onEnter: () => createSacredSymbol(card),
      });
    });

    // Cleanup function
    return () => {
      if (smoother.current) {
        smoother.current.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const createSacredSymbol = (element) => {
    const symbols = ["🕉️", "🪷", "🦚", "⭐", "💫", "🌙"];
    const symbol = document.createElement("div");
    symbol.className = "sacred-symbol";
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.cssText = `
      position: absolute;
      left: ${Math.random() * 80 + 10}%;
      top: ${Math.random() * 80 + 10}%;
      color: #FFD700;
      font-size: 1.5rem;
      z-index: 10;
      pointer-events: none;
    `;

    element.style.position = "relative";
    element.appendChild(symbol);

    // Animate the symbol with GSAP
    gsap.fromTo(
      symbol,
      {
        opacity: 0,
        scale: 0,
        rotation: 0,
      },
      {
        opacity: 1,
        scale: 1.2,
        rotation: 360,
        duration: 2,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(symbol, {
            opacity: 0,
            duration: 1,
            onComplete: () => symbol.remove(),
          });
        },
      }
    );
  };

  return smoother;
};

export default useGSAPScrolling;