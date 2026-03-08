"use client";

import { motion } from "framer-motion";

const LOGOS = [
  { name: "Spectrum", icon: "📐" },
  { name: "Sage 300", icon: "📗" },
  { name: "Viewpoint", icon: "🔭" },
  { name: "Procore", icon: "🏗️" },
  { name: "QuickBooks", icon: "📒" },
  { name: "Salesforce", icon: "☁️" },
  { name: "Foundation", icon: "🧱" },
  { name: "ComputerEase", icon: "💻" },
];

// Duplicate for seamless loop
const MARQUEE_LOGOS = [...LOGOS, ...LOGOS];

export default function SocialProof() {
  return (
    <section className="relative w-full py-12 md:py-16 overflow-hidden">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm text-zinc-500 tracking-wide">
          Trusted by{" "}
          <span className="text-zinc-300 font-medium">2,000+</span> teams
          worldwide
        </p>
      </motion.div>

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="marquee-track flex items-center gap-12 md:gap-16">
          {MARQUEE_LOGOS.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center gap-2.5 shrink-0 text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
            >
              <span className="text-xl opacity-60">{logo.icon}</span>
              <span className="text-base font-medium tracking-wide whitespace-nowrap">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <motion.div
        className="flex flex-wrap justify-center gap-8 md:gap-16 mt-10 max-w-3xl mx-auto px-4"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {[
          { value: "$2.1T", label: "Industry Revenue" },
          { value: "730K+", label: "Contracting Firms" },
          { value: "10x", label: "Faster Reporting" },
          { value: "24/7", label: "AI CFO Available" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
