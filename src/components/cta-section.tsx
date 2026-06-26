"use client";

import { motion } from "framer-motion";
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
            href="https://github.com/BruhClient/Git-Dummy/releases/latest/download/GitDummy-windows.exe"
            className="inline-flex items-center justify-center gap-2 bg-gd-accent hover:bg-gd-accent-hover text-white font-semibold rounded-lg px-6 py-3 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
            </svg>
            Download for Windows
          </a>
          <a
            href="https://github.com/BruhClient/Git-Dummy/releases/latest/download/GitDummy-macos.zip"
            className="inline-flex items-center justify-center gap-2 border border-gd-border text-gd-text-primary hover:bg-gd-bg-hover font-medium rounded-lg px-6 py-3 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Download for macOS
          </a>
        </div>
      </motion.div>
    </section>
  );
}
