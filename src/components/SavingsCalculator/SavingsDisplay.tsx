"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { MIN_TEAM_SIZE, MAX_TEAM_SIZE } from "./constants";

interface SavingsDisplayProps {
  teamSize: number;
  onTeamSizeChange: (size: number) => void;
  monthlySavings: number;
  annualSavings: number;
}

export default function SavingsDisplay({
  teamSize,
  onTeamSizeChange,
  monthlySavings,
  annualSavings,
}: SavingsDisplayProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= MIN_TEAM_SIZE && val <= MAX_TEAM_SIZE) {
      onTeamSizeChange(val);
    }
  };

  return (
    <motion.div
      className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Team size */}
      <motion.div
        className="rounded-2xl glow-card bg-white/[0.02] backdrop-blur-xl p-6"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <p className="text-sm text-zinc-500 mb-3 uppercase tracking-wider font-medium">Team size</p>
        <div className="relative">
          <input
            type="number"
            value={teamSize}
            onChange={handleChange}
            min={MIN_TEAM_SIZE}
            max={MAX_TEAM_SIZE}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-3xl font-bold text-white
              focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:bg-white/[0.05]
              transition-all duration-300
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          {/* Subtle inner glow on focus */}
          <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-r from-blue-500/0 via-blue-500/[0.03] to-purple-500/0" />
        </div>
      </motion.div>

      {/* Monthly savings */}
      <motion.div
        className="rounded-2xl glow-card bg-white/[0.02] backdrop-blur-xl p-6 relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Scan line effect */}
        <div className="absolute inset-0 shimmer-line pointer-events-none" />
        <p className="text-sm text-zinc-500 mb-3 uppercase tracking-wider font-medium relative">Monthly savings</p>
        <AnimatedCounter
          value={monthlySavings}
          className="text-3xl font-bold text-white relative"
        />
      </motion.div>

      {/* Annual savings - highlighted */}
      <motion.div
        className="rounded-2xl relative overflow-hidden p-6 backdrop-blur-xl
          bg-gradient-to-br from-blue-950/40 via-[#0a0a1a] to-purple-950/30
          border border-blue-500/20"
        whileHover={{ scale: 1.03, borderColor: "rgba(59,130,246,0.4)" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Shimmer sweep */}
        <div className="absolute inset-0 shimmer-line pointer-events-none" />

        <p className="text-sm text-zinc-400 mb-3 uppercase tracking-wider font-medium relative">Annual savings</p>
        <AnimatedCounter
          value={annualSavings}
          className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent relative text-glow"
        />

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/10 to-transparent pointer-events-none rounded-bl-3xl" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-500/10 to-transparent pointer-events-none rounded-tr-3xl" />
      </motion.div>
    </motion.div>
  );
}
