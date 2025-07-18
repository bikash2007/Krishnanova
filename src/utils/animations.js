export const handleSmoothScroll = (e, targetId) => {
  e.preventDefault();
  const target = document.querySelector(targetId);
  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

export const createParticle = () => {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDelay = Math.random() * 10 + "s";
  particle.style.animationDuration = Math.random() * 5 + 5 + "s";

  const colors = ["#FFD700", "#00FFFF", "#FF1493", "#8A2BE2"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  particle.style.background = randomColor;

  const particlesContainer = document.querySelector(".particles");
  if (particlesContainer) {
    particlesContainer.appendChild(particle);
  }

  setTimeout(() => {
    particle.remove();
  }, 15000);
};
