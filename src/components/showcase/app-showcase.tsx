"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MockWindow from "./mock-window";

export default function AppShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.9, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section ref={sectionRef} className="py-12 md:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gd-text-primary mb-4">
            See it in action
          </h2>
          <p className="text-gd-text-secondary max-w-lg mx-auto">
            A complete Git workspace with commit graph, branch sidebar, and detail
            panel, all in one window.
          </p>
        </motion.div>

        <motion.div style={{ y, scale, opacity }}>
          <MockWindow>
            <img
              src="/screenshots/app-showcase.png"
              alt="Git Dummy app showing commit graph with branches, detail panel, and minimap"
              className="w-full h-auto block"
              draggable={false}
            />
          </MockWindow>
        </motion.div>
      </div>
    </section>
  );
}
