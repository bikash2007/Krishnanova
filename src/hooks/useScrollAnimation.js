import { useEffect, useRef } from "react";

const useScrollAnimation = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");

          // Add sacred symbols animation
          if (entry.target.classList.contains("name-card")) {
            createSacredSymbol(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe all scroll reveal elements
    const elements = document.querySelectorAll(
      ".scroll-reveal, .scroll-slide-left, .scroll-slide-right"
    );
    elements.forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const createSacredSymbol = (element) => {
    const symbols = ["🕉️", "🪷", "🦚", "⭐", "💫", "🌙"];
    const symbol = document.createElement("div");
    symbol.className = "sacred-symbol";
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.left = Math.random() * 100 + "%";
    symbol.style.top = Math.random() * 100 + "%";
    symbol.style.color = "#FFD700";

    element.style.position = "relative";
    element.appendChild(symbol);

    setTimeout(() => {
      symbol.remove();
    }, 3000);
  };

  return observerRef;
};

export default useScrollAnimation;
