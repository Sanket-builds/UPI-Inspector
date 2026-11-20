"use client";

import React, { useId } from "react";

/**
 * Stripi-Inspired Atmospheric Gradient Mesh Backdrop.
 * Implemented as a layered organic SVG mesh (cream -> sherbet orange -> lavender ->
 * electric indigo -> ruby pink / magenta) rather than a flat CSS linear gradient.
 */
export function GradientMesh({
  className = "",
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "login" | "ribbon";
}) {
  const uid = useId().replace(/:/g, "");

  if (variant === "ribbon") {
    return (
      <div className={`mesh-ribbon ${className}`} aria-hidden="true">
        <svg viewBox="0 0 1440 24" preserveAspectRatio="none" className="mesh-svg">
          <defs>
            <linearGradient id={`rib-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f5e9d4" />
              <stop offset="22%" stopColor="#f4a261" />
              <stop offset="48%" stopColor="#b9b9f9" />
              <stop offset="72%" stopColor="#533afd" />
              <stop offset="88%" stopColor="#ea2261" />
              <stop offset="100%" stopColor="#f96bee" />
            </linearGradient>
          </defs>
          <rect width="1440" height="24" fill={`url(#rib-${uid})`} />
        </svg>
      </div>
    );
  }

  return (
    <div className={`mesh-backdrop mesh-${variant} ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 620"
        preserveAspectRatio="xMidYMid slice"
        className="mesh-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`blur-${uid}`} x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="68" />
          </filter>
          <linearGradient id={`base-${uid}`} x1="0%" y1="0%" x2="100%" y2="25%">
            <stop offset="0%" stopColor="#f5e9d4" />
            <stop offset="30%" stopColor="#f9d8b6" />
            <stop offset="56%" stopColor="#d5d1fc" />
            <stop offset="80%" stopColor="#7c68fe" />
            <stop offset="100%" stopColor="#ea2261" />
          </linearGradient>
          <linearGradient id={`fade-${uid}`} x1="0%" y1="55%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="72%" stopColor="#ffffff" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
        </defs>

        <rect width="1440" height="620" fill={`url(#base-${uid})`} />

        <g filter={`url(#blur-${uid})`}>
          {/* Warm cream & sherbet orange left wash */}
          <ellipse cx="140" cy="140" rx="380" ry="240" fill="#f5e9d4" opacity="0.95" />
          <path
            d="M190,40 C380,-40 560,60 540,210 C520,360 300,390 180,290 C60,190 40,110 190,40 Z"
            fill="#f4a86e"
            opacity="0.72"
          />
          <ellipse cx="470" cy="110" rx="220" ry="150" fill="#9b6829" opacity="0.22" />

          {/* Soft lavender bridge */}
          <path
            d="M520,60 C720,-20 920,80 880,240 C840,400 600,410 490,290 C380,170 390,110 520,60 Z"
            fill="#b9b9f9"
            opacity="0.92"
          />

          {/* Electric indigo heart */}
          <path
            d="M820,-30 C1040,-70 1230,90 1160,260 C1090,430 850,410 750,270 C650,130 690,0 820,-30 Z"
            fill="#533afd"
            opacity="0.82"
          />
          <ellipse cx="980" cy="240" rx="230" ry="150" fill="#4434d4" opacity="0.58" />

          {/* Ruby & magenta atmospheric right bloom */}
          <path
            d="M1140,20 C1330,-40 1510,90 1460,260 C1410,420 1180,420 1090,290 C1000,160 1010,60 1140,20 Z"
            fill="#ea2261"
            opacity="0.74"
          />
          <ellipse cx="1320" cy="120" rx="250" ry="170" fill="#f96bee" opacity="0.62" />
        </g>

        {/* Smooth diagonal/atmospheric dissolve into crisp white canvas */}
        <polygon points="0,420 1440,290 1440,620 0,620" fill="#ffffff" opacity="0.64" />
        <rect width="1440" height="620" fill={`url(#fade-${uid})`} />
      </svg>
    </div>
  );
}
