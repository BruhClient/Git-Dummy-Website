// Caller: features-section.tsx. Props: icon, title, description, index. User: "scroll animations, moving components on scroll"
"use client";

import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: FeatureCardProps) {
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.02 }}
      className="bg-gd-bg-card border border-gd-border rounded-xl p-6 hover:border-gd-accent/50 transition-colors duration-300"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gd-accent-dim mb-4">
        <Icon className="w-5 h-5 text-gd-accent" />
      </div>
      <h3 className="font-semibold text-gd-text-primary mb-2">{title}</h3>
      <p className="text-sm text-gd-text-secondary leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
