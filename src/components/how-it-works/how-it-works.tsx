"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { KeyRound, FolderOpen, GitBranch } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: KeyRound,
    title: "Connect GitHub",
    description:
      "Paste your Personal Access Token. No OAuth apps, no browser redirects. Just a token.",
  },
  {
    number: 2,
    icon: FolderOpen,
    title: "Open a repo",
    description:
      "Clone a repository or open one from your machine. All your repos in one place.",
  },
  {
    number: 3,
    icon: GitBranch,
    title: "See your history",
    description:
      "Your commits, branches, and merges appear as an interactive graph you can explore.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "center center"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-12 md:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gd-text-primary mb-4">
            Up and running in minutes
          </h2>
          <p className="text-gd-text-secondary">
            Three steps. No complicated setup.
          </p>
        </motion.div>
        <div className="relative flex flex-col md:flex-row items-center gap-12 md:gap-4">
          {/* Animated dashed connector line (desktop) */}
          <div className="hidden md:block absolute top-7 left-[15%] right-[15%] h-px overflow-hidden">
            <motion.div
              className="h-full border-t-2 border-dashed border-gd-border"
              style={{ width: lineWidth }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="flex-1 flex flex-col items-center text-center relative z-10"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                className="relative mb-4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: i * 0.2 + 0.1,
                }}
              >
                <div className="w-14 h-14 rounded-full bg-gd-accent-dim flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-gd-accent" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gd-accent text-white text-xs font-bold flex items-center justify-center">
                  {step.number}
                </div>
              </motion.div>
              <h3 className="text-lg font-semibold text-gd-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gd-text-secondary leading-relaxed max-w-[240px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
