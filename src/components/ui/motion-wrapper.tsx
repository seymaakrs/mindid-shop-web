"use client";

import { motion, type Variants } from "motion/react";
import { type ReactNode } from "react";

/* ─── Hazır animasyon varyantları ─── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const variants = { fadeUp, fadeDown, fadeLeft, fadeRight, scaleUp };

/* ─── ScrollReveal: Ekrana girince animasyon ─── */

type ScrollRevealProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
};

export const ScrollReveal = ({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
}: ScrollRevealProps) => {
  return (
    <motion.div
      variants={variants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── StaggerContainer: Çocukları sırayla animate eder ─── */

type StaggerContainerProps = {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const StaggerContainer = ({
  children,
  staggerDelay = 0.12,
  className,
  once = true,
}: StaggerContainerProps) => {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── StaggerItem: StaggerContainer içinde kullanılır ─── */

type StaggerItemProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
};

export const StaggerItem = ({
  children,
  variant = "fadeUp",
  className,
}: StaggerItemProps) => {
  return (
    <motion.div
      variants={variants[variant]}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── CountUp: Sayı sayma animasyonu ─── */

type CountUpProps = {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

export const CountUp = ({
  from = 0,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
  className,
}: CountUpProps) => {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ "--num": from } as Record<string, number>}
        whileInView={{ "--num": to } as Record<string, number>}
        viewport={{ once: true }}
        transition={{ duration, ease: "easeOut" }}
      >
        {prefix}
        <motion.span
          style={{
            counterSet: `num var(--num)`,
          }}
        />
      </motion.span>
      {/* Fallback: sadece son değeri göster */}
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {prefix}{to}{suffix}
      </motion.span>
    </motion.span>
  );
};
