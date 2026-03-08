"use client";

import { motion } from "framer-motion";
import type { Feature } from "./constants";

interface FeatureGridProps {
  features: Feature[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
}

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
};

export default function FeatureGrid({ features, selectedIds, onToggle }: FeatureGridProps) {
  return (
    <motion.div
      className="w-full rounded-2xl glow-card bg-white/[0.02] backdrop-blur-xl p-6 md:p-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {features.map((feature) => {
          const isSelected = selectedIds.has(feature.id);
          return (
            <motion.label
              key={feature.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: isSelected
                  ? "0 0 20px rgba(59,130,246,0.15), inset 0 0 20px rgba(59,130,246,0.05)"
                  : "0 0 15px rgba(255,255,255,0.05)",
              }}
              whileTap={{ scale: 0.97 }}
              className={`
                relative flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-300
                ${isSelected
                  ? "bg-blue-500/[0.08] border border-blue-500/40 shadow-[inset_0_1px_0_rgba(59,130,246,0.2)]"
                  : "bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04]"
                }
              `}
            >
              {/* Selected glow pulse */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-blue-500/[0.05]"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              <motion.div
                className={`
                  relative w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-300
                  ${isSelected
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    : "border border-white/20 bg-white/[0.03]"
                  }
                `}
                animate={isSelected ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.35 }}
              >
                {isSelected && (
                  <motion.svg
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-3 h-3 text-white"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path d="M2 6L5 9L10 3" />
                  </motion.svg>
                )}
              </motion.div>
              <input
                type="checkbox"
                className="sr-only"
                checked={isSelected}
                onChange={() => onToggle(feature.id)}
              />
              <span className={`relative text-sm transition-colors duration-200 ${isSelected ? "text-zinc-100" : "text-zinc-400"}`}>
                {feature.name}
              </span>
              <span className={`relative ml-auto text-xs whitespace-nowrap transition-colors duration-200 ${isSelected ? "text-blue-400/70" : "text-zinc-600"}`}>
                ${feature.pricePerUser}/user
              </span>
            </motion.label>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
