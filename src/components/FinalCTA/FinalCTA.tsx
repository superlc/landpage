"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[300px] bg-blue-600/[0.08] rounded-full blur-[120px]" />
      </div>

      <motion.div
        className="relative text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-glow mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Ready to see an
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
            AI CFO in action?
          </span>
        </motion.h2>

        <motion.p
          className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Replace 10+ tools with one AI-powered platform. Start free, no credit
          card required.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* Primary CTA */}
          <motion.a
            href="#"
            className="relative inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25 overflow-hidden group"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {/* Shimmer overlay */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10">Book a live demo</span>
            <svg
              className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-medium text-zinc-300 border border-zinc-700/50 hover:border-zinc-500/50 hover:text-white backdrop-blur-sm transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Talk to sales
          </motion.a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          className="text-xs text-zinc-600 mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          ✦ Use your own ERP data &nbsp; ✦ Near turn-key onboarding &nbsp; ✦ Construction-specific
          reports
        </motion.p>
      </motion.div>
    </section>
  );
}
