"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function CTASection() {
  return (
    <section id="download" className="py-12 md:py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-75 h-75 sm:w-150 sm:h-150 rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #d4775c 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>
      <motion.div
        className="max-w-2xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gd-text-primary mb-4">
          Ready to see your code differently?
        </h2>
        <p className="text-gd-text-secondary mb-8 max-w-md mx-auto">
          Download Git Dummy and turn your commit history into something you can
          actually understand.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://github.com/BruhClient/Git-Dummy/releases"
            className="inline-flex items-center justify-center gap-2 bg-gd-accent hover:bg-gd-accent-hover text-white font-semibold rounded-lg px-6 py-3 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download for Windows
          </a>
          <a
            href="https://github.com/BruhClient/Git-Dummy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-gd-border text-gd-text-primary hover:bg-gd-bg-hover font-medium rounded-lg px-6 py-3 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
}
