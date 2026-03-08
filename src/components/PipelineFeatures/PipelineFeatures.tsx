"use client";

import { motion } from "framer-motion";

/* ── Layer definitions ── */

interface LayerItem {
  icon: string;
  title: string;
  description: string;
  accent: string;
  iconBg: string;
}

const LAYER_1: LayerItem = {
  icon: "🏗️",
  title: "ERP Data Sync",
  description:
    "Connects to Sage, Spectrum, Viewpoint, and more. Your raw financial data flows in automatically — no manual exports.",
  accent: "from-emerald-500/20 to-teal-500/10",
  iconBg: "from-emerald-500 to-teal-500",
};

const LAYER_2: LayerItem = {
  icon: "🧠",
  title: "AI Processing Engine",
  description:
    "Our AI normalizes, reconciles, and interprets your data in seconds — turning messy ERP exports into structured intelligence.",
  accent: "from-blue-500/20 to-cyan-500/10",
  iconBg: "from-blue-500 to-cyan-500",
};

const LAYER_3: LayerItem[] = [
  {
    icon: "📊",
    title: "Instant Reports",
    description:
      "WIP schedules, cash flow forecasts, job cost analysis — generated on demand.",
    accent: "from-purple-500/20 to-pink-500/10",
    iconBg: "from-purple-500 to-pink-500",
  },
  {
    icon: "🚨",
    title: "Anomaly Detection",
    description:
      "Flags cost overruns, margin drops, and cash shortfalls before they become problems.",
    accent: "from-rose-500/20 to-red-500/10",
    iconBg: "from-rose-500 to-red-500",
  },
  {
    icon: "💎",
    title: "Actionable Insights",
    description:
      "Divisional P&L, KPI dashboards, and variance analysis — always up to date.",
    accent: "from-sky-500/20 to-indigo-500/10",
    iconBg: "from-sky-500 to-indigo-500",
  },
];

/* ── Animation variants ── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const layerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const outputVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ── Connector arrow between layers (upward) ── */
function LayerConnectorUp() {
  return (
    <div className="flex justify-center py-3 md:py-5 relative">
      {/* Vertical glow line */}
      <div className="w-px h-10 bg-gradient-to-t from-blue-500/50 to-blue-500/10 relative">
        {/* Particle traveling UP */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
          animate={{ top: ["calc(100% + 4px)", "-4px"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
        />
      </div>
      {/* Arrow head pointing UP */}
      <motion.div
        className="absolute top-2 text-blue-500/50"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 10l4-4 4 4" />
        </svg>
      </motion.div>
    </div>
  );
}

/* ── Fan-in connector: 3 → 1 (upward, from bottom 3 cards merging to center) ── */
function FanInConnectorUp() {
  return (
    <div className="relative py-3 md:py-5 flex justify-center">
      {/* Desktop: SVG fan-in lines (3 bottom points merge to 1 top center) */}
      <svg
        className="hidden md:block w-full max-w-3xl h-12"
        viewBox="0 0 600 48"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="fanGradUp" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(59,130,246,0.5)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0.15)" />
          </linearGradient>
        </defs>
        {/* Left branch: bottom-left → center-top */}
        <motion.path
          d="M100 44 Q300 36 300 24"
          stroke="url(#fanGradUp)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        {/* Center branch: bottom-center → top-center */}
        <motion.path
          d="M300 44 L300 24"
          stroke="url(#fanGradUp)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        {/* Right branch: bottom-right → center-top */}
        <motion.path
          d="M500 44 Q300 36 300 24"
          stroke="url(#fanGradUp)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        {/* Center line up */}
        <motion.path
          d="M300 24 L300 4"
          stroke="url(#fanGradUp)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
        />
        {/* Glow dots at bottom endpoints */}
        {[100, 300, 500].map((cx, i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={44}
            r={3}
            fill="rgba(59,130,246,0.6)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1 }}
          />
        ))}
        {/* Glow dot at top merge point */}
        <motion.circle
          cx={300}
          cy={4}
          r={3}
          fill="rgba(59,130,246,0.6)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        />
      </svg>
      {/* Mobile: simple vertical line with upward particle */}
      <div className="md:hidden w-px h-10 bg-gradient-to-t from-blue-500/50 to-blue-500/10 relative">
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
          animate={{ top: ["calc(100% + 4px)", "-4px"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
        />
      </div>
    </div>
  );
}

/* ── Card component ── */
function FeatureCard({
  item,
  label,
  large,
}: {
  item: LayerItem;
  label?: string;
  large?: boolean;
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={`relative group rounded-2xl glow-card bg-white/[0.02] backdrop-blur-xl p-6 flex flex-col overflow-hidden cursor-default ${
        large ? "md:py-8" : ""
      }`}
    >
      {/* Hover gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-white/[0.03] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center text-lg shadow-lg`}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {item.icon}
          </motion.div>
          {label && (
            <span className="text-xs font-mono text-blue-400/60 uppercase tracking-widest">
              {label}
            </span>
          )}
        </div>
        <h3
          className={`font-semibold text-zinc-100 mb-2 ${
            large ? "text-xl" : "text-lg"
          }`}
        >
          {item.title}
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Main component ── */

export default function PipelineFeatures() {
  return (
    <section
      id="features"
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 scroll-mt-16"
    >
      {/* Section header */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.p
          className="text-sm font-medium uppercase tracking-widest text-blue-400 mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          How your AI CFO works
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-glow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            From raw ERP data
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-200 to-purple-300 bg-clip-text text-transparent">
            to instant answers.
          </span>
        </motion.h2>
      </motion.div>

      {/* Layered pipeline — bottom-up: Input → Processing → Outputs */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* ── TOP: Outputs (3 cards) ── */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LAYER_3.map((item, i) => (
            <motion.div key={i} variants={outputVariants}>
              <FeatureCard item={item} label="Output" />
            </motion.div>
          ))}
        </motion.div>

        <FanInConnectorUp />

        {/* ── MIDDLE: AI Processing ── */}
        <motion.div variants={layerVariants} className="flex justify-center">
          <div className="w-full md:w-2/3 lg:w-1/2 relative">
            {/* Pulsing glow ring around the AI layer */}
            <motion.div
              className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 blur-sm pointer-events-none"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <FeatureCard item={LAYER_2} label="Processing" large />
          </div>
        </motion.div>

        <LayerConnectorUp />

        {/* ── BOTTOM: Raw Data Input ── */}
        <motion.div variants={layerVariants} className="flex justify-center">
          <div className="w-full md:w-2/3 lg:w-1/2">
            <FeatureCard item={LAYER_1} label="Input" large />
          </div>
        </motion.div>
      </motion.div>

      {/* Framework label */}
      <motion.div
        className="text-center mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <span className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
          <span className="w-8 h-px bg-zinc-700" />
          Powered by the AI CFO framework
          <span className="w-8 h-px bg-zinc-700" />
        </span>
      </motion.div>
    </section>
  );
}
