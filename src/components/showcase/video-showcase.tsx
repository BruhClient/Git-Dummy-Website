"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MockWindow from "./mock-window";
import MockPhone from "./mock-phone";

const VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ";

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.65, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [160, 0]);

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
            Watch it in action
          </h2>
          <p className="text-gd-text-secondary max-w-lg mx-auto">
            See how Git Dummy turns your commit history into a visual,
            interactive experience.
          </p>
        </motion.div>

        {/* Desktop — cinematic rise with perspective */}
        <div className="hidden md:block" style={{ perspective: 1200 }}>
          <motion.div style={{ scale, opacity, rotateX, y }}>
            <MockWindow>
              <div className="aspect-video">
                <iframe
                  src={VIDEO_URL}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                />
              </div>
            </MockWindow>
          </motion.div>
        </div>

        {/* Phone — simpler scale-up */}
        <div className="md:hidden" style={{ perspective: 800 }}>
          <motion.div style={{ scale, opacity, y }}>
            <MockPhone>
              <div className="aspect-video">
                <iframe
                  src={VIDEO_URL}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                />
              </div>
            </MockPhone>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
