// components/BackgroundVectors.js
import React from "react";

export const FluteSVG = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 64"
    fill="none"
  >
    <rect width="512" height="8" y="28" fill="#c084fc" />
    <circle cx="60" cy="32" r="4" fill="#fff" />
    <circle cx="120" cy="32" r="4" fill="#fff" />
    <circle cx="180" cy="32" r="4" fill="#fff" />
    <circle cx="240" cy="32" r="4" fill="#fff" />
  </svg>
);

export const FeatherSVG = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 256"
    fill="none"
  >
    <path
      d="M32 0 C60 80, 60 176, 32 256 C4 176, 4 80, 32 0 Z"
      fill="#38bdf8"
    />
    <line x1="32" y1="0" x2="32" y2="256" stroke="#fff" strokeWidth="2" />
  </svg>
);

export const PeacockFeatherSVG = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 200"
    fill="none"
  >
    <ellipse cx="50" cy="100" rx="40" ry="80" fill="#8a2be2" opacity="0.15" />
    <circle cx="50" cy="100" r="30" fill="#60a5fa" opacity="0.25" />
    <circle cx="50" cy="100" r="15" fill="#facc15" opacity="0.4" />
  </svg>
);

export const LotusSVG = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="none"
  >
    <path
      d="M32 2C24 12 8 14 8 32s16 18 24 30c8-12 24-14 24-30S40 12 32 2z"
      fill="#a78bfa"
      opacity="0.25"
    />
    <circle cx="32" cy="32" r="10" fill="#c084fc" opacity="0.4" />
  </svg>
);
