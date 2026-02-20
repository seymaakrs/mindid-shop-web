"use client";

import { useEffect, useRef } from "react";

export const ParallaxGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (gridRef.current) {
        const scrollY = window.scrollY;
        gridRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
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
            linear-gradient(rgba(50, 47, 174, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(50, 47, 174, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          perspective: "500px",
          transformStyle: "preserve-3d",
        }}
      />
      {/* Lime glow orbs */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-[var(--lime)] rounded-full opacity-[0.03] blur-[100px]" />
      <div className="absolute top-[60%] right-[15%] w-[400px] h-[400px] bg-[var(--electric-blue)] rounded-full opacity-[0.05] blur-[120px]" />
    </div>
  );
};
