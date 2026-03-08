"use client";

import { motion } from "framer-motion";

const TOOL_ICONS = [
  { icon: "📊", x: 5, y: 5, rotate: -15, delay: 0.2, size: "text-4xl" },
  { icon: "🤖", x: 20, y: 0, rotate: 10, delay: 0.3, size: "text-3xl" },
  { icon: "🏗️", x: 38, y: 8, rotate: -8, delay: 0.15, size: "text-4xl" },
  { icon: "💰", x: 55, y: 2, rotate: 20, delay: 0.35, size: "text-3xl" },
  { icon: "📈", x: 70, y: 10, rotate: -12, delay: 0.25, size: "text-3xl" },
  { icon: "🧠", x: 85, y: 3, rotate: 5, delay: 0.4, size: "text-4xl" },
  { icon: "⚡", x: 15, y: 60, rotate: -20, delay: 0.1, size: "text-3xl" },
  { icon: "📋", x: 48, y: 55, rotate: 15, delay: 0.45, size: "text-3xl" },
  { icon: "🔗", x: 75, y: 58, rotate: -5, delay: 0.5, size: "text-4xl" },
  { icon: "💎", x: 92, y: 52, rotate: 12, delay: 0.55, size: "text-3xl" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function HeroSection() {
  return (
    <motion.div
      className="relative w-full mb-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Floating tool icons scattered across full width */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {TOOL_ICONS.map((tool, i) => (
          <motion.div
            key={i}
            className={`absolute ${tool.size}`}
            style={{ left: `${tool.x}%`, top: `${tool.y}%` }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            whileInView={{
              opacity: 0.2,
              scale: 1,
              rotate: tool.rotate,
              transition: { delay: tool.delay + 0.5, duration: 1, type: "spring", stiffness: 100 },
            }}
            viewport={{ once: true }}
            animate={{
              y: [0, -15, 0],
              rotate: [tool.rotate, tool.rotate + 5, tool.rotate],
              transition: {
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <span className="drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]">{tool.icon}</span>
          </motion.div>
        ))}

        {/* Animated diagonal slash */}
        <motion.div
          className="absolute top-[35%] left-[-5%] w-[110%] h-[2px] shimmer-line"
          style={{ rotate: "-12deg" }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
        </motion.div>
      </div>

      {/* Title with glow */}
      <motion.h1
        variants={itemVariants}
        className="relative text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight text-glow"
      >
        <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
          Meet Your
        </span>
        <br />
        <span className="bg-gradient-to-r from-zinc-200 via-purple-200 to-zinc-400 bg-clip-text text-transparent">
          AI CFO.
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="mt-6 text-lg md:text-xl text-zinc-400 max-w-lg leading-relaxed"
      >
        Construction financial reporting in a flash.
        <br className="hidden md:block" />
        Connect your ERP. Talk to your AI CFO. Get answers instantly.
      </motion.p>

      {/* CTA button */}
      <motion.a
        variants={buttonVariants}
        href="#features"
        className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full text-sm font-medium
          bg-gradient-to-r from-blue-600/20 to-purple-600/20
          border border-blue-500/30 text-blue-300
          hover:from-blue-600/30 hover:to-purple-600/30 hover:border-blue-400/50 hover:text-blue-200
          transition-all duration-300 group backdrop-blur-sm"
      >
        See how it works
        <motion.span
          className="inline-block"
          animate={{ x: [0, 2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          →
        </motion.span>
      </motion.a>
    </motion.div>
  );
}