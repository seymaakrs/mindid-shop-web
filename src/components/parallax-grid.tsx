"use client";

import { useEffect, useRef } from "react";

export const ParallaxGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (gridRef.current) {
        gridRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        ref={gridRef}
        className="absolute inset-0 will-change-transform"
        style={{
          top: "-50%",
          height: "200%",
          backgroundImage: `
            linear-gradient(rgba(16, 10, 44, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 10, 44, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

    </div>
  );
};
