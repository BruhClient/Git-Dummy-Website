"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GlowOrb from "@/components/shared/glow-orb";
import HeroCTA from "./hero-cta";
import { laneColor } from "@/lib/colors";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.2, delay, ease: EASE }, opacity: { duration: 0.3, delay } },
  }),
};

const pop = {
  hidden: { scale: 0, opacity: 0 },
  visible: (delay: number) => ({
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 20, delay },
  }),
};

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={heroRef} className="min-h-screen flex items-center py-20 max-w-6xl mx-auto px-6">
      <motion.div
        className="w-full"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <div className="relative flex flex-col items-center text-center max-w-3xl mx-auto gap-8">
          <GlowOrb className="-top-40 left-1/2 -translate-x-1/2 opacity-60" />

          {/* SVG stroke-draw decoration behind text */}
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            <motion.svg
              viewBox="0 0 700 400"
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-[120%] h-auto opacity-[0.12]"
              initial="hidden"
              animate="visible"
              aria-hidden="true"
            >
              {/* Main branch spine */}
              <motion.line
                x1="60" y1="200" x2="640" y2="200"
                stroke={laneColor(0)} strokeWidth="3" strokeLinecap="round"
                variants={draw} custom={0.3}
              />
              {/* Feature branch arc */}
              <motion.path
                d="M 200 200 L 200 100 L 400 100 L 400 200"
                fill="none" stroke={laneColor(1)} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                variants={draw} custom={0.8}
              />
              {/* Bugfix branch arc */}
              <motion.path
                d="M 320 200 L 320 300 L 500 300 L 500 200"
                fill="none" stroke={laneColor(2)} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                variants={draw} custom={1.2}
              />
              {/* Short hotfix branch */}
              <motion.path
                d="M 520 200 L 520 140 L 580 140 L 580 200"
                fill="none" stroke={laneColor(3)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="6 4"
                variants={draw} custom={1.6}
              />

              {/* Commit nodes on main */}
              {[100, 200, 320, 400, 500, 580, 640].map((cx, i) => (
                <motion.circle
                  key={`m${i}`} cx={cx} cy={200} r={6}
                  fill={laneColor(0)} stroke="white" strokeWidth="1.5" strokeOpacity={0.3}
                  variants={pop} custom={0.4 + i * 0.1}
                />
              ))}
              {/* Feature branch nodes */}
              {[200, 300, 400].map((cx, i) => (
                <motion.circle
                  key={`f${i}`} cx={cx} cy={100} r={5}
                  fill={laneColor(1)} stroke="white" strokeWidth="1.5" strokeOpacity={0.3}
                  variants={pop} custom={1.0 + i * 0.12}
                />
              ))}
              {/* Bugfix branch nodes */}
              {[320, 410, 500].map((cx, i) => (
                <motion.circle
                  key={`b${i}`} cx={cx} cy={300} r={5}
                  fill={laneColor(2)} stroke="white" strokeWidth="1.5" strokeOpacity={0.3}
                  variants={pop} custom={1.4 + i * 0.12}
                />
              ))}
              {/* Hotfix node */}
              <motion.circle
                cx={550} cy={140} r={4}
                fill={laneColor(3)} stroke="white" strokeWidth="1.5" strokeOpacity={0.3}
                variants={pop} custom={1.8}
              />
            </motion.svg>
          </div>

          <motion.span
            className="relative inline-block bg-gd-accent-dim text-gd-accent text-sm font-medium px-4 py-1.5 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            v1.0.0 | Open Source
          </motion.span>

          <motion.h1
            className="relative font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-gd-text-primary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Every change you&apos;ve made,{" "}
            <span className="text-gd-accent">beautifully</span> visualised
          </motion.h1>

          <motion.p
            className="relative text-gd-text-secondary text-lg sm:text-xl max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Git Dummy turns your commit history into an interactive visual graph.
            Branch, merge, stash, and create pull requests. All without
            touching the command line.
          </motion.p>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroCTA />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
