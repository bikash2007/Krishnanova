import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  throttle, 
  createOptimizedObserver, 
  performanceMonitor,
  cleanupAnimations 
} from "../utils/performanceOptimizer";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const useSmoothScroll = () => {
  const scrollContainer = useRef(null);

  useEffect(() => {
    performanceMonitor.start('smooth-scroll-init');
    
    // Smooth scrolling using optimized implementation
    let requestId = null;
    let currentScroll = window.pageYOffset;
    let targetScroll = window.pageYOffset;
    let ease = 0.12;

    const smoothScroll = () => {
      currentScroll += (targetScroll - currentScroll) * ease;
      
      if (Math.abs(targetScroll - currentScroll) < 0.1) {
        currentScroll = targetScroll;
      }

      window.scrollTo(0, currentScroll);

      if (currentScroll !== targetScroll) {
        requestId = requestAnimationFrame(smoothScroll);
      }
    };

    const handleScroll = () => {
      targetScroll = window.pageYOffset;
      if (!requestId) {
        requestId = requestAnimationFrame(smoothScroll);
      }
    };

    // Custom smooth scrolling for better performance
    let ticking = false;
    const updateScroll = () => {
      targetScroll = window.pageYOffset;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    // Scroll reveal animations with GSAP
    const revealElements = gsap.utils.toArray(".scroll-reveal");
    revealElements.forEach((element, index) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
            markers: false,
          },
        }
      );
    });

    // Slide left animations
    const slideLeftElements = gsap.utils.toArray(".scroll-slide-left");
    slideLeftElements.forEach((element, index) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          x: -80,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.4,
          ease: "power3.out",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Slide right animations
    const slideRightElements = gsap.utils.toArray(".scroll-slide-right");
    slideRightElements.forEach((element, index) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          x: 80,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.4,
          ease: "power3.out",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Parallax effects for decorative elements
    const parallaxElements = gsap.utils.toArray(".parallax");
    parallaxElements.forEach((element) => {
      gsap.to(element, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    // Enhanced name card animations
    const nameCards = gsap.utils.toArray(".name-card");
    nameCards.forEach((card, index) => {
      // Main card animation
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
          rotationX: 15,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            onEnter: () => createSacredSymbol(card),
          },
        }
      );

      // Hover effects
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // Smooth scroll for anchor links
    const smoothScrollTo = (target) => {
      const element = document.querySelector(target);
      if (element) {
        gsap.to(window, {
          duration: 1.5,
          scrollTo: { y: element, offsetY: 80 },
          ease: "power3.inOut",
        });
      }
    };

    // Handle navigation clicks
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        if (href && href !== "#") {
          smoothScrollTo(href);
        }
      });
    });

    // Cleanup function
    return () => {
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      navLinks.forEach((link) => {
        link.removeEventListener("click", smoothScrollTo);
      });
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
        duration: 2.5,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(symbol, {
            opacity: 0,
            scale: 0.5,
            duration: 1.5,
            onComplete: () => symbol.remove(),
          });
        },
      }
    );
  };

  return scrollContainer;
};

export default useSmoothScroll;