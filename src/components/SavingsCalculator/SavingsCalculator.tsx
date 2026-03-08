"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FEATURES, DEFAULT_TEAM_SIZE } from "./constants";
import FeatureGrid from "./FeatureGrid";
import SavingsDisplay from "./SavingsDisplay";

export default function SavingsCalculator() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(FEATURES.filter((f) => f.defaultChecked).map((f) => f.id))
  );
  const [teamSize, setTeamSize] = useState(DEFAULT_TEAM_SIZE);

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const { monthlySavings, annualSavings } = useMemo(() => {
    const monthly = FEATURES
      .filter((f) => selectedIds.has(f.id))
      .reduce((sum, f) => sum + f.pricePerUser * teamSize, 0);
    return { monthlySavings: monthly, annualSavings: monthly * 12 };
  }, [selectedIds, teamSize]);

  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
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
          Calculate your savings
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-glow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Stop paying for manual reporting.
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-200 to-purple-300 bg-clip-text text-transparent">
            Your AI CFO works 24/7.
          </span>
        </motion.h2>
      </motion.div>

      <FeatureGrid
        features={FEATURES}
        selectedIds={selectedIds}
        onToggle={handleToggle}
      />
      <SavingsDisplay
        teamSize={teamSize}
        onTeamSizeChange={setTeamSize}
        monthlySavings={monthlySavings}
        annualSavings={annualSavings}
      />
    </section>
  );
}
