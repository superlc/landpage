"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ── Mini visualization components ── */

function MiniChat() {
  const messages = ["What's our cash position?", "You have $1.2M available..."];
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setVisibleCount(1), 600);
    const t2 = setTimeout(() => setVisibleCount(2), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="mt-4 space-y-2">
      {messages.slice(0, visibleCount).map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`text-[11px] px-3 py-1.5 rounded-lg max-w-[85%] ${
            i === 0
              ? "bg-blue-500/15 text-blue-300 ml-auto rounded-tr-sm"
              : "bg-white/[0.05] text-zinc-400 mr-auto rounded-tl-sm"
          }`}
        >
          {msg}
        </motion.div>
      ))}
      {visibleCount < 2 && (
        <div className="flex gap-1 px-3">
          {[0, 1, 2].map((d) => (
            <motion.div
              key={d}
              className="w-1.5 h-1.5 rounded-full bg-zinc-600"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.8, delay: d * 0.2, repeat: Infinity }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MiniProgressBars() {
  const bars = [
    { label: "Highway 101", pct: 72, color: "bg-blue-500" },
    { label: "Marina Dock", pct: 45, color: "bg-purple-500" },
    { label: "Office TI", pct: 88, color: "bg-emerald-500" },
  ];
  return (
    <div className="mt-4 space-y-2.5">
      {bars.map((bar, i) => (
        <div key={i}>
          <div className="flex justify-between text-[10px] mb-1">
            <span className="text-zinc-500">{bar.label}</span>
            <span className="text-zinc-400">{bar.pct}%</span>
          </div>
          <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${bar.color} rounded-full`}
              initial={{ width: 0 }}
              whileInView={{ width: `${bar.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 + i * 0.2, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniLineChart() {
  const points = [20, 35, 28, 45, 40, 55, 50, 68, 62, 75];
  const w = 200;
  const h = 60;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - (p / 100) * h;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
  const areaPath = `${path} L${w},${h} L0,${h} Z`;

  return (
    <div className="mt-4">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(59,130,246,0.3)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </linearGradient>
        </defs>
        <motion.path
          d={areaPath}
          fill="url(#chartGrad)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d={path}
          fill="none"
          stroke="rgba(59,130,246,0.8)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="flex justify-between text-[9px] text-zinc-600 mt-1">
        <span>Apr</span><span>May</span><span>Jun</span>
      </div>
    </div>
  );
}

function MiniJobCards() {
  const jobs = [
    { name: "Riverside Tower", status: "On Track", color: "bg-emerald-500" },
    { name: "Highway 101", status: "At Risk", color: "bg-amber-500" },
    { name: "Marina Seawall", status: "Over Budget", color: "bg-red-500" },
  ];
  return (
    <div className="mt-4 space-y-2">
      {jobs.map((job, i) => (
        <motion.div
          key={i}
          className="flex items-center justify-between text-[11px] px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.15 }}
        >
          <span className="text-zinc-400">{job.name}</span>
          <span className={`flex items-center gap-1.5`}>
            <span className={`w-1.5 h-1.5 rounded-full ${job.color}`} />
            <span className="text-zinc-500">{job.status}</span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function MiniAlertPulse() {
  return (
    <div className="mt-4 space-y-2">
      {[
        { msg: "Labor cost overrun on Job #4102", severity: "high" },
        { msg: "Cash shortfall in 6 weeks", severity: "medium" },
        { msg: "Margin drop: Commercial div.", severity: "low" },
      ].map((alert, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-2 text-[11px] px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.2 }}
        >
          <motion.div
            className={`w-2 h-2 rounded-full flex-shrink-0 ${
              alert.severity === "high"
                ? "bg-red-500"
                : alert.severity === "medium"
                ? "bg-amber-500"
                : "bg-yellow-500"
            }`}
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
          />
          <span className="text-zinc-400">{alert.msg}</span>
        </motion.div>
      ))}
    </div>
  );
}

// Pre-compute deterministic heights to avoid SSR/client hydration mismatch
const WAVE_HEIGHTS = Array.from({ length: 32 }, (_, i) => {
  const pseudo = Math.abs(Math.sin(i * 2.1) * 30);
  return 30 + Math.sin(i * 0.8) * 40 + pseudo;
});

function MiniWaveform() {
  return (
    <div className="mt-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm flex-shrink-0">
        ▶
      </div>
      <div className="flex items-end gap-[2px] h-8 flex-1">
        {WAVE_HEIGHTS.map((height, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-gradient-to-t from-blue-500/40 to-purple-500/40 rounded-sm"
            style={{ height: `${height}%` }}
            animate={{ height: [`${height}%`, `${height * 0.5}%`, `${height}%`] }}
            transition={{
              duration: 0.8 + Math.abs(Math.sin(i * 1.3)) * 0.4,
              delay: i * 0.03,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Feature data ── */

interface DashboardFeature {
  icon: string;
  title: string;
  description: string;
  gridArea: string;
  accent: string;
  iconBg: string;
  highlight?: boolean;
  visualization: "chat" | "progress" | "chart" | "jobs" | "alerts" | "waveform";
}

const FEATURES: DashboardFeature[] = [
  {
    icon: "🤖",
    title: "AI CFO Advisor",
    description: "Ask questions in plain English. Get instant answers with full financial context.",
    gridArea: "ai",
    accent: "from-blue-500/20 to-cyan-500/10",
    iconBg: "from-blue-500 to-cyan-500",
    highlight: true,
    visualization: "chat",
  },
  {
    icon: "📋",
    title: "WIP Reports",
    description: "Real-time work-in-progress schedules synced directly from your ERP.",
    gridArea: "unified",
    accent: "from-purple-500/20 to-pink-500/10",
    iconBg: "from-purple-500 to-pink-500",
    visualization: "progress",
  },
  {
    icon: "💰",
    title: "Cash Flow Forecast",
    description: "90-day projections based on AR/AP aging and job schedules.",
    gridArea: "setup",
    accent: "from-amber-500/20 to-orange-500/10",
    iconBg: "from-amber-500 to-orange-500",
    visualization: "chart",
  },
  {
    icon: "🏗️",
    title: "Construction Intel",
    description: "Job status tracking with real-time cost-to-complete and margin analysis.",
    gridArea: "security",
    accent: "from-emerald-500/20 to-teal-500/10",
    iconBg: "from-emerald-500 to-teal-500",
    visualization: "jobs",
  },
  {
    icon: "🚨",
    title: "Anomaly Detection",
    description: "Auto-flags cost overruns, margin drops, and cash shortfalls before they escalate.",
    gridArea: "analytics",
    accent: "from-rose-500/20 to-red-500/10",
    iconBg: "from-rose-500 to-red-500",
    highlight: true,
    visualization: "alerts",
  },
  {
    icon: "🎬",
    title: "Video Chat",
    description: "Face-to-face conversations with your AI CFO. Walk through reports together.",
    gridArea: "integrations",
    accent: "from-sky-500/20 to-indigo-500/10",
    iconBg: "from-sky-500 to-indigo-500",
    visualization: "waveform",
  },
];

const VIZ_MAP: Record<DashboardFeature["visualization"], React.FC> = {
  chat: MiniChat,
  progress: MiniProgressBars,
  chart: MiniLineChart,
  jobs: MiniJobCards,
  alerts: MiniAlertPulse,
  waveform: MiniWaveform,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function DashboardFeatures() {
  return (
    <section
      id="features"
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 scroll-mt-16"
    >
      {/* Section header */}
      <motion.div
        className="text-center mb-12"
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
          Why contractors switch
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

      {/* Bento Grid with visualizations */}
      <motion.div
        className="bento-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {FEATURES.map((feature, i) => {
          const Viz = VIZ_MAP[feature.visualization];
          return (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              style={{ gridArea: feature.gridArea }}
              className="relative group rounded-2xl glow-card bg-white/[0.02] backdrop-blur-xl p-6 flex flex-col overflow-hidden cursor-default"
            >
              {/* Hover gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-white/[0.03] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl" />

              {feature.highlight && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/20 z-20">
                  Featured
                </div>
              )}

              <div className="relative z-10 flex flex-col h-full">
                <motion.div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center text-lg mb-3 shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Mini visualization */}
                <div className="mt-auto pt-2">
                  <Viz />
                </div>
              </div>

              {feature.highlight && (
                <div className="absolute bottom-0 left-0 right-0 h-px shimmer-line" />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
