"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/* ── Chat demo conversation ── */
const CONVERSATIONS = [
  {
    question: "What's our cash position this week?",
    answer:
      "Based on your latest AR/AP data from Sage, you have $1.24M available cash. $380K in receivables are due within 7 days.",
    dataLabel: "Pulling AR/AP aging from Sage…",
  },
  {
    question: "Which jobs are over budget?",
    answer:
      "Highway 101 is 12% over budget ($48K). Root cause: subcontractor change orders in Phase 3. Marina Dock is trending 6% over.",
    dataLabel: "Analyzing job cost vs. estimate…",
  },
  {
    question: "Show me our 90-day cash forecast.",
    answer:
      "Projecting a $200K shortfall in May due to delayed receivables on Office TI. Recommend accelerating AR collection or drawing $150K on your line.",
    dataLabel: "Running cash flow projection model…",
  },
];

/* ── Typing effect hook ── */
function useTypingEffect(text: string, speed: number = 18, enabled: boolean = false) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!enabled) {
      setDisplayed("");
      return;
    }
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, enabled]);
  return displayed;
}

/* ── Data source pills ── */
const DATA_SOURCES = [
  { name: "Sage 300", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  { name: "Spectrum", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { name: "Viewpoint", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  { name: "QuickBooks", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
];

/* ── Output types ── */
const OUTPUT_TYPES = [
  { icon: "📊", label: "Reports", desc: "WIP, P&L, cash flow" },
  { icon: "🚨", label: "Anomalies", desc: "Overruns & red flags" },
  { icon: "💡", label: "Insights", desc: "Recommendations" },
];

/* ── Animation variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ── Chat message bubble ── */
function ChatBubble({
  isUser,
  text,
  typing,
}: {
  isUser: boolean;
  text: string;
  typing?: boolean;
}) {
  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-blue-600/80 text-white rounded-br-md"
            : "bg-white/[0.06] border border-white/[0.08] text-zinc-300 rounded-bl-md"
        }`}
      >
        {text}
        {typing && (
          <motion.span
            className="inline-block w-1 h-4 ml-0.5 bg-blue-400 rounded-full align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
}

/* ── Processing indicator ── */
function ProcessingIndicator({ label }: { label: string }) {
  return (
    <motion.div
      className="flex items-center gap-2 mb-3 ml-1"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-1.5">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-cyan-400"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-cyan-400"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-cyan-400"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
        />
      </div>
      <span className="text-xs font-mono text-cyan-400/70">{label}</span>
    </motion.div>
  );
}

/* ── Main component ── */
export default function ChatPipelineFeatures() {
  const [activeConv, setActiveConv] = useState(0);
  const [phase, setPhase] = useState<
    "question" | "processing" | "answering" | "done"
  >("question");

  const conv = CONVERSATIONS[activeConv];
  const typedAnswer = useTypingEffect(conv.answer, 18, phase === "answering");

  // Auto-advance conversation phases
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    setPhase("question");
    timers.push(
      setTimeout(() => setPhase("processing"), 1200),
      setTimeout(() => setPhase("answering"), 2800),
      setTimeout(() => setPhase("done"), 2800 + conv.answer.length * 18 + 500)
    );
    return () => timers.forEach(clearTimeout);
  }, [activeConv, conv.answer.length]);

  // Auto-cycle through conversations
  useEffect(() => {
    if (phase !== "done") return;
    const timer = setTimeout(() => {
      setActiveConv((prev) => (prev + 1) % CONVERSATIONS.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <section
      id="features"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 scroll-mt-16"
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
          How AI CFO works
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Just ask.
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-200 to-purple-300 bg-clip-text text-transparent">
            Your data does the rest.
          </span>
        </motion.h2>
        <motion.p
          className="text-zinc-400 mt-4 max-w-2xl mx-auto text-base md:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          AI CFO is a conversational interface powered by your real ERP data.
          Ask questions in plain English — get instant financial answers backed by live numbers.
        </motion.p>
      </motion.div>

      {/* Main 3-column layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr_1fr] gap-6 items-start"
      >
        {/* ── LEFT: Raw Data Sources ── */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-emerald-400/70 uppercase tracking-widest">
              Raw Data
            </span>
            <span className="flex-1 h-px bg-emerald-500/20" />
          </div>

          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5 space-y-3">
            <p className="text-xs text-zinc-500 mb-3">Connected ERP systems</p>
            {DATA_SOURCES.map((src, i) => (
              <motion.div
                key={src.name}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${src.color} text-xs font-medium`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-current"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
                {src.name}
                <span className="ml-auto text-[10px] opacity-60">Live</span>
              </motion.div>
            ))}
          </div>

          {/* Data flow arrow pointing right → center */}
          <div className="hidden lg:flex items-center justify-end pr-0 py-2">
            <motion.div
              className="flex items-center gap-1 text-emerald-500/40"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-12 h-px bg-gradient-to-r from-emerald-500/10 to-emerald-500/40" />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 2l4 4-4 4" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* ── CENTER: Chat Interface (AI CFO) ── */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex-1 h-px bg-blue-500/20" />
            <span className="text-xs font-mono text-blue-400/70 uppercase tracking-widest">
              AI CFO
            </span>
            <span className="flex-1 h-px bg-blue-500/20" />
          </div>

          <div className="relative">
            {/* Glow ring */}
            <motion.div
              className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-500/15 via-cyan-500/15 to-purple-500/15 blur-sm pointer-events-none"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-sm">
                  🤖
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">AI CFO Advisor</p>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Online · Connected to your ERP
                  </p>
                </div>
              </div>

              {/* Chat body */}
              <div className="p-5 min-h-[280px] flex flex-col justify-end">
                {/* User question */}
                <ChatBubble isUser text={conv.question} />

                {/* Processing indicator */}
                {(phase === "processing" || phase === "answering" || phase === "done") && (
                  <ProcessingIndicator label={conv.dataLabel} />
                )}

                {/* AI answer */}
                {(phase === "answering" || phase === "done") && (
                  <ChatBubble
                    isUser={false}
                    text={phase === "done" ? conv.answer : typedAnswer}
                    typing={phase === "answering"}
                  />
                )}
              </div>

              {/* Chat input mock */}
              <div className="px-5 pb-4">
                <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-2.5">
                  <span className="text-sm text-zinc-500 flex-1">Ask about your finances…</span>
                  <div className="w-7 h-7 rounded-lg bg-blue-600/60 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L6 8" />
                      <path d="M12 2l-4 10-2-4-4-2 10-4z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Conversation selector dots */}
          <div className="flex justify-center gap-2 mt-4">
            {CONVERSATIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveConv(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeConv
                    ? "bg-blue-400 w-6"
                    : "bg-zinc-600 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: Outputs ── */}
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Data flow arrow pointing left ← from center */}
          <div className="hidden lg:flex items-center justify-start pl-0 py-2">
            <motion.div
              className="flex items-center gap-1 text-purple-500/40"
              animate={{ x: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="rotate-180">
                <path d="M4 2l4 4-4 4" />
              </svg>
              <span className="w-12 h-px bg-gradient-to-l from-purple-500/10 to-purple-500/40" />
            </motion.div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="flex-1 h-px bg-purple-500/20" />
            <span className="text-xs font-mono text-purple-400/70 uppercase tracking-widest">
              Output
            </span>
          </div>

          <div className="space-y-3">
            {OUTPUT_TYPES.map((out, i) => (
              <motion.div
                key={out.label}
                className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 flex items-start gap-3 group hover:bg-white/[0.04] transition-colors"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <span className="text-xl">{out.icon}</span>
                <div>
                  <p className="text-sm font-medium text-zinc-200">{out.label}</p>
                  <p className="text-xs text-zinc-500">{out.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom flow explanation */}
      <motion.div
        className="mt-12 flex items-center justify-center gap-3 flex-wrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <span className="text-xs font-mono text-zinc-600 uppercase tracking-wider">
          Your ERP Data
        </span>
        <span className="text-zinc-700">→</span>
        <span className="text-xs font-mono text-blue-400/60 uppercase tracking-wider">
          AI understands your intent
        </span>
        <span className="text-zinc-700">→</span>
        <span className="text-xs font-mono text-purple-400/60 uppercase tracking-wider">
          Financial answers in seconds
        </span>
      </motion.div>
    </section>
  );
}
