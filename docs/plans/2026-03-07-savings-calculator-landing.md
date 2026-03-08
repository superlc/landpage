# Savings Calculator Landing Page Implementation Plan

> **For implementation:** Use executing-plans skill to implement this plan task-by-task.

**Goal:** Create a sci-fi themed, animated cost savings calculator landing page component using Next.js + Tailwind CSS + Framer Motion.

**Architecture:** Single-page component broken into 5 sub-components under `src/components/SavingsCalculator/`. State lives in the root `SavingsCalculator` component (selectedFeatures + teamSize). Child components receive props/callbacks. All animations use Framer Motion with CSS for static visual effects.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion

---

## Task 1: Create constants and type definitions

**Files:**
- Create: `src/components/SavingsCalculator/constants.ts`

### Step 1: Create constants file

Create `src/components/SavingsCalculator/constants.ts` with feature data:

```typescript
export interface Feature {
  id: string;
  name: string;
  pricePerUser: number;
  defaultChecked: boolean;
}

export const FEATURES: Feature[] = [
  { id: "ai-search", name: "AI Search", pricePerUser: 35, defaultChecked: true },
  { id: "ai-chatbot", name: "AI Chatbot", pricePerUser: 20, defaultChecked: true },
  { id: "ai-meeting-notes", name: "AI Meeting Notes", pricePerUser: 15, defaultChecked: false },
  { id: "ai-writing", name: "AI Writing Assistant", pricePerUser: 20, defaultChecked: true },
  { id: "ai-email", name: "AI Email App", pricePerUser: 30, defaultChecked: true },
  { id: "ai-research", name: "AI Research", pricePerUser: 25, defaultChecked: false },
  { id: "calendar", name: "Calendar Scheduling", pricePerUser: 15, defaultChecked: true },
  { id: "team-wiki", name: "Team Wiki", pricePerUser: 10, defaultChecked: true },
  { id: "project-mgmt", name: "Project Management Tool", pricePerUser: 24, defaultChecked: true },
  { id: "basic-crm", name: "Basic CRM", pricePerUser: 20, defaultChecked: true },
  { id: "site-builder", name: "Site Builder", pricePerUser: 20, defaultChecked: true },
  { id: "forms", name: "Forms", pricePerUser: 10, defaultChecked: false },
];

export const DEFAULT_TEAM_SIZE = 10;
export const MIN_TEAM_SIZE = 1;
export const MAX_TEAM_SIZE = 1000;
```

### Step 2: Verify

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors related to constants.ts

### Step 3: Commit

```bash
git add -A && git commit -m "feat: add savings calculator constants and types"
```

---

## Task 2: Create AnimatedCounter component

**Files:**
- Create: `src/components/SavingsCalculator/AnimatedCounter.tsx`

### Step 1: Create AnimatedCounter

Create `src/components/SavingsCalculator/AnimatedCounter.tsx`:

```typescript
"use client";

import { useEffect, useRef } from "react";
import { useSpring, useMotionValue, motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  className?: string;
}

export default function AnimatedCounter({ value, prefix = "$", className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.01,
  });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, value, isInView]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString()}`;
      }
    });
    return unsubscribe;
  }, [springValue, prefix]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}0
    </motion.span>
  );
}
```

### Step 2: Verify

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: No type errors

### Step 3: Commit

```bash
git add -A && git commit -m "feat: add AnimatedCounter component with spring animation"
```

---

## Task 3: Create HeroSection component

**Files:**
- Create: `src/components/SavingsCalculator/HeroSection.tsx`

### Step 1: Create HeroSection

Create `src/components/SavingsCalculator/HeroSection.tsx`:

```typescript
"use client";

import { motion } from "framer-motion";

const TOOL_ICONS = [
  { icon: "💬", label: "Slack", x: 60, y: 10, rotate: -15, delay: 0.2 },
  { icon: "📊", label: "Sheets", x: 72, y: 5, rotate: 10, delay: 0.3 },
  { icon: "📝", label: "Docs", x: 80, y: 15, rotate: -8, delay: 0.15 },
  { icon: "📧", label: "Email", x: 68, y: 20, rotate: 20, delay: 0.35 },
  { icon: "📅", label: "Calendar", x: 85, y: 8, rotate: -12, delay: 0.25 },
  { icon: "🔍", label: "Search", x: 75, y: 25, rotate: 5, delay: 0.4 },
  { icon: "📋", label: "Tasks", x: 90, y: 18, rotate: -20, delay: 0.1 },
  { icon: "💾", label: "Storage", x: 65, y: 28, rotate: 15, delay: 0.45 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function HeroSection() {
  return (
    <motion.div
      className="relative w-full mb-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Floating tool icons */}
      <div className="absolute top-0 right-0 w-[45%] h-full overflow-hidden pointer-events-none">
        {TOOL_ICONS.map((tool, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl md:text-3xl opacity-60"
            style={{ left: `${tool.x - 60}%`, top: `${tool.y}%` }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            whileInView={{
              opacity: 0.5,
              scale: 1,
              rotate: tool.rotate,
              transition: { delay: tool.delay, duration: 0.8, type: "spring" },
            }}
            viewport={{ once: true }}
            animate={{
              y: [0, -8, 0],
              transition: {
                duration: 3 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            title={tool.label}
          >
            {tool.icon}
          </motion.div>
        ))}
        {/* Diagonal strike-through line */}
        <motion.div
          className="absolute top-[45%] left-[-10%] w-[130%] h-[3px] bg-gradient-to-r from-transparent via-white/80 to-transparent"
          style={{ rotate: "-15deg" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Title */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl md:text-6xl font-bold leading-tight tracking-tight"
      >
        <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          More productivity.
        </span>
        <br />
        <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          Fewer tools.
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="mt-4 text-lg text-zinc-400 max-w-md"
      >
        Bring all your tools and teams under one roof. Calculate savings below.
      </motion.p>

      {/* CTA */}
      <motion.a
        variants={itemVariants}
        href="#pricing"
        className="inline-flex items-center mt-4 text-blue-400 hover:text-blue-300 transition-colors group"
      >
        See pricing plans
        <motion.span
          className="ml-1 inline-block"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.span>
      </motion.a>
    </motion.div>
  );
}
```

### Step 2: Verify

```bash
npx tsc --noEmit 2>&1 | head -20
```

### Step 3: Commit

```bash
git add -A && git commit -m "feat: add HeroSection with floating icons and gradient title"
```

---

## Task 4: Create FeatureGrid component

**Files:**
- Create: `src/components/SavingsCalculator/FeatureGrid.tsx`

### Step 1: Create FeatureGrid

Create `src/components/SavingsCalculator/FeatureGrid.tsx`:

```typescript
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
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function FeatureGrid({ features, selectedIds, onToggle }: FeatureGridProps) {
  return (
    <motion.div
      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors duration-200
                ${isSelected
                  ? "bg-blue-500/10 border border-blue-500/30"
                  : "bg-white/[0.02] border border-white/5 hover:border-white/15"
                }
              `}
            >
              <motion.div
                className={`
                  w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors
                  ${isSelected
                    ? "bg-blue-500"
                    : "border border-white/20 bg-white/5"
                  }
                `}
                animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {isSelected && (
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-3 h-3 text-white"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
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
              <span className="text-sm text-zinc-200">{feature.name}</span>
              <span className="ml-auto text-xs text-zinc-500">
                ${feature.pricePerUser}/user
              </span>
            </motion.label>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
```

### Step 2: Verify

```bash
npx tsc --noEmit 2>&1 | head -20
```

### Step 3: Commit

```bash
git add -A && git commit -m "feat: add FeatureGrid with animated checkboxes"
```

---

## Task 5: Create SavingsDisplay component

**Files:**
- Create: `src/components/SavingsCalculator/SavingsDisplay.tsx`

### Step 1: Create SavingsDisplay

Create `src/components/SavingsCalculator/SavingsDisplay.tsx`:

```typescript
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
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Team size */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
        <p className="text-sm text-zinc-400 mb-3">Team size</p>
        <input
          type="number"
          value={teamSize}
          onChange={handleChange}
          min={MIN_TEAM_SIZE}
          max={MAX_TEAM_SIZE}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-3xl font-bold text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>

      {/* Monthly savings */}
      <motion.div
        className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6"
        whileHover={{ borderColor: "rgba(59,130,246,0.3)" }}
      >
        <p className="text-sm text-zinc-400 mb-3">Monthly savings</p>
        <AnimatedCounter
          value={monthlySavings}
          className="text-3xl font-bold text-white"
        />
      </motion.div>

      {/* Annual savings */}
      <motion.div
        className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.05] backdrop-blur-xl p-6 relative overflow-hidden"
        whileHover={{ borderColor: "rgba(59,130,246,0.4)" }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
        <p className="text-sm text-zinc-400 mb-3 relative">Annual savings</p>
        <AnimatedCounter
          value={annualSavings}
          className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent relative"
        />
      </motion.div>
    </motion.div>
  );
}
```

### Step 2: Verify

```bash
npx tsc --noEmit 2>&1 | head -20
```

### Step 3: Commit

```bash
git add -A && git commit -m "feat: add SavingsDisplay with animated counters"
```

---

## Task 6: Create main SavingsCalculator component and integrate into page

**Files:**
- Create: `src/components/SavingsCalculator/SavingsCalculator.tsx`
- Create: `src/components/SavingsCalculator/index.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

### Step 1: Create SavingsCalculator

Create `src/components/SavingsCalculator/SavingsCalculator.tsx`:

```typescript
"use client";

import { useState, useMemo } from "react";
import { FEATURES, DEFAULT_TEAM_SIZE } from "./constants";
import HeroSection from "./HeroSection";
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
    <section className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <HeroSection />
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
```

### Step 2: Create barrel export

Create `src/components/SavingsCalculator/index.ts`:

```typescript
export { default } from "./SavingsCalculator";
```

### Step 3: Update globals.css

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

:root {
  --background: #0a0a0f;
  --foreground: #ededed;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}

/* Sci-fi grid background */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 0;
}
```

### Step 4: Update page.tsx

Replace `src/app/page.tsx` with:

```typescript
import SavingsCalculator from "@/components/SavingsCalculator";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/[0.07] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-500/[0.05] rounded-full blur-[100px] pointer-events-none" />
      <SavingsCalculator />
    </main>
  );
}
```

### Step 5: Verify

```bash
npx tsc --noEmit 2>&1 | head -20
npm run build 2>&1 | tail -20
```

Expected: No errors, build succeeds.

### Step 6: Commit

```bash
git add -A && git commit -m "feat: integrate SavingsCalculator into landing page with sci-fi theme"
```

---

## Summary

| Task | Component | Description |
|------|-----------|-------------|
| 1 | `constants.ts` | Feature data, types, config |
| 2 | `AnimatedCounter` | Spring-animated number counter |
| 3 | `HeroSection` | Gradient title + floating icons + CTA |
| 4 | `FeatureGrid` | Animated checkbox grid with glassmorphism |
| 5 | `SavingsDisplay` | Team size input + savings counters |
| 6 | `SavingsCalculator` + integration | Main component + page + global styles |
