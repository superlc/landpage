"use client";

import { motion } from "framer-motion";

interface BentoItem {
  icon: string;
  title: string;
  description: string;
  gridArea: string;
  accent: string;
  iconBg: string;
  highlight?: boolean;
}

const FEATURES: BentoItem[] = [
  {
    icon: "🤖",
    title: "AI-Powered Automation",
    description:
      "Automate repetitive tasks with intelligent AI agents. From email triage to meeting summaries — let AI handle the busywork.",
    gridArea: "ai",
    accent: "from-blue-500/20 to-cyan-500/10",
    iconBg: "from-blue-500 to-cyan-500",
    highlight: true,
  },
  {
    icon: "🔗",
    title: "Unified Workspace",
    description:
      "One platform replaces 10+ tools. Search, chat, docs, CRM — all connected.",
    gridArea: "unified",
    accent: "from-purple-500/20 to-pink-500/10",
    iconBg: "from-purple-500 to-pink-500",
  },
  {
    icon: "⚡",
    title: "Instant Setup",
    description: "Import your data in minutes. Zero migration headaches.",
    gridArea: "setup",
    accent: "from-amber-500/20 to-orange-500/10",
    iconBg: "from-amber-500 to-orange-500",
  },
  {
    icon: "🛡️",
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified. End-to-end encryption. SSO, SCIM, and advanced audit logs built in.",
    gridArea: "security",
    accent: "from-emerald-500/20 to-teal-500/10",
    iconBg: "from-emerald-500 to-teal-500",
  },
  {
    icon: "📊",
    title: "Smart Analytics",
    description:
      "Real-time dashboards show team productivity, tool usage, and cost savings at a glance.",
    gridArea: "analytics",
    accent: "from-sky-500/20 to-indigo-500/10",
    iconBg: "from-sky-500 to-indigo-500",
    highlight: true,
  },
  {
    icon: "🧩",
    title: "500+ Integrations",
    description:
      "Connect with Slack, Google, Notion, Salesforce, and hundreds more out of the box.",
    gridArea: "integrations",
    accent: "from-rose-500/20 to-red-500/10",
    iconBg: "from-rose-500 to-red-500",
  },
];

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

export default function BentoFeatures() {
  return (
    <section id="features" className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 scroll-mt-16">
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

      {/* Bento Grid — explicit grid-template-areas for precise control */}
      <motion.div
        className="bento-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {FEATURES.map((feature, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{
              scale: 1.02,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            style={{ gridArea: feature.gridArea }}
            className={`
              relative group rounded-2xl glow-card bg-white/[0.02] backdrop-blur-xl p-6
              flex flex-col overflow-hidden cursor-default
            `}
          >
            {/* Hover gradient reveal */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
            />

            {/* Corner glow on hover */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-white/[0.03] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl" />

            {/* Highlight badge for featured cards */}
            {feature.highlight && (
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/20 z-20">
                Featured
              </div>
            )}

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center text-lg mb-4 shadow-lg`}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Bottom shimmer on highlight cards */}
            {feature.highlight && (
              <div className="absolute bottom-0 left-0 right-0 h-px shimmer-line" />
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
