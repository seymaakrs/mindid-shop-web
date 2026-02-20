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
            linear-gradient(rgba(50, 47, 174, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(50, 47, 174, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* 3D floating shapes */}
      <div className="absolute top-[15%] left-[8%] w-[200px] h-[200px] rounded-full border border-[var(--lime)]/5 animate-rotate-slow" />
      <div className="absolute top-[40%] right-[12%] w-[150px] h-[150px] rounded-full border border-[var(--electric-blue)]/8 animate-rotate-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
      <div className="absolute top-[70%] left-[20%] w-[100px] h-[100px] rotate-45 border border-[var(--lime)]/5 animate-float" />

      {/* Glow orbs */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-[var(--lime)] rounded-full opacity-[0.02] blur-[100px]" />
      <div className="absolute top-[50%] right-[10%] w-[400px] h-[400px] bg-[var(--electric-blue)] rounded-full opacity-[0.04] blur-[120px]" />
      <div className="absolute bottom-[10%] left-[40%] w-[350px] h-[350px] bg-[var(--lime)] rounded-full opacity-[0.015] blur-[100px]" />
    </div>
  );
};
