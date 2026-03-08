"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

interface ChatPair {
  question: string;
  featureTitle: string;
  answer: string;
  accent: string;
}

const CHAT_PAIRS: ChatPair[] = [
  {
    question: "Show me this month's WIP report across all active jobs.",
    featureTitle: "WIP Report",
    answer:
      "Here's your WIP report for March 2026. You have 14 active jobs with $2.3M in costs to date. 3 jobs are over-billed by a combined $180K — I've flagged them for review.",
    accent: "from-blue-500/20 to-cyan-500/10",
  },
  {
    question: "What does our cash flow look like for the next 90 days?",
    featureTitle: "Cash Flow Forecast",
    answer:
      "Based on current AR/AP aging and projected billings, you'll have a $340K shortfall in Week 6. I recommend accelerating billing on the Riverside project — $215K is ready to invoice.",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    question: "Which jobs are bleeding margin this quarter?",
    featureTitle: "Anomaly Detection",
    answer:
      "3 jobs have margin erosion > 5%: Highway 101 Bridge (-8.2%), Downtown Office TI (-6.1%), and Marina Seawall (-5.4%). Primary driver: labor cost overruns on change orders not yet approved.",
    accent: "from-rose-500/20 to-red-500/10",
  },
  {
    question: "Give me a P&L breakdown by division.",
    featureTitle: "Divisional P&L",
    answer:
      "Commercial division leads at 12.3% net margin ($1.8M revenue). Residential is at 8.1% — down from 9.4% last quarter. Civil is breaking even due to the delayed Highway 101 project.",
    accent: "from-purple-500/20 to-pink-500/10",
  },
];

/* ── Typing cursor ── */
function Cursor() {
  return (
    <motion.span
      className="inline-block w-[2px] h-4 bg-blue-400 ml-0.5 align-middle"
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    />
  );
}

/* ── Three-dot thinking indicator ── */
function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-blue-400/60"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

/* Message type for the flat message list */
type Message =
  | { type: "welcome" }
  | { type: "user"; text: string; typing?: boolean }
  | { type: "thinking" }
  | { type: "ai"; text: string; featureTitle: string; accent: string; typing?: boolean };

export default function ChatFeatures() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pairIndex, setPairIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "typing-q" | "pause-q" | "thinking" | "typing-a" | "pause-a" | "done">("idle");
  const [typingText, setTypingText] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToBottom = useCallback(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }
  }, []);

  // Observe viewport
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !hasStarted) setHasStarted(true); },
      { threshold: 0.3 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [hasStarted]);

  // Start: add welcome + begin first question
  useEffect(() => {
    if (!hasStarted || phase !== "idle") return;
    setMessages([{ type: "welcome" }]);
    const t = setTimeout(() => {
      setPhase("typing-q");
    }, 600);
    return () => clearTimeout(t);
  }, [hasStarted, phase]);

  // Phase: typing question
  useEffect(() => {
    if (phase !== "typing-q") return;
    const pair = CHAT_PAIRS[pairIndex];
    if (!pair) return;

    // Add a user bubble placeholder
    setMessages((prev) => [...prev, { type: "user", text: "", typing: true }]);
    setTypingText("");

    let i = 0;
    timerRef.current = setInterval(() => {
      i++;
      const text = pair.question.slice(0, i);
      setTypingText(text);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { type: "user", text, typing: true };
        return updated;
      });
      if (i >= pair.question.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        // Finalize: remove typing flag
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { type: "user", text: pair.question };
          return updated;
        });
        setPhase("pause-q");
      }
    }, 30);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, pairIndex]);

  // Phase: pause after question → show thinking
  useEffect(() => {
    if (phase !== "pause-q") return;
    const t = setTimeout(() => {
      setMessages((prev) => [...prev, { type: "thinking" }]);
      setPhase("thinking");
    }, 300);
    return () => clearTimeout(t);
  }, [phase]);

  // Phase: thinking → start typing answer
  useEffect(() => {
    if (phase !== "thinking") return;
    const t = setTimeout(() => {
      // Replace thinking with AI bubble
      const pair = CHAT_PAIRS[pairIndex];
      setMessages((prev) => {
        const updated = [...prev];
        // Remove the thinking message
        updated[updated.length - 1] = { type: "ai", text: "", featureTitle: pair.featureTitle, accent: pair.accent, typing: true };
        return updated;
      });
      setPhase("typing-a");
    }, 1200);
    return () => clearTimeout(t);
  }, [phase, pairIndex]);

  // Phase: typing answer
  useEffect(() => {
    if (phase !== "typing-a") return;
    const pair = CHAT_PAIRS[pairIndex];
    if (!pair) return;

    let i = 0;
    timerRef.current = setInterval(() => {
      i++;
      const text = pair.answer.slice(0, i);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { type: "ai", text, featureTitle: pair.featureTitle, accent: pair.accent, typing: true };
        return updated;
      });
      if (i >= pair.answer.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        // Finalize
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { type: "ai", text: pair.answer, featureTitle: pair.featureTitle, accent: pair.accent };
          return updated;
        });
        setPhase("pause-a");
      }
    }, 15);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, pairIndex]);

  // Phase: pause after answer → next pair or done
  useEffect(() => {
    if (phase !== "pause-a") return;
    const t = setTimeout(() => {
      if (pairIndex < CHAT_PAIRS.length - 1) {
        setPairIndex((i) => i + 1);
        setPhase("typing-q");
      } else {
        setPhase("done");
      }
    }, 800);
    return () => clearTimeout(t);
  }, [phase, pairIndex]);

  // Auto-scroll
  useEffect(() => {
    scrollToBottom();
  }, [messages, typingText, scrollToBottom]);

  return (
    <section
      ref={sectionRef}
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
          Talk to your AI CFO
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-glow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Ask anything about
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-200 to-purple-300 bg-clip-text text-transparent">
            your financials.
          </span>
        </motion.h2>
      </motion.div>

      {/* Chat interface */}
      <div className="relative max-w-2xl mx-auto">
        <div className="rounded-2xl glow-card bg-white/[0.01] backdrop-blur-xl border border-white/[0.04] overflow-hidden">
          {/* Window header */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs text-zinc-500 font-medium">
                Flash Financials — AI CFO
              </span>
            </div>
            <div className="w-12" />
          </div>

          {/* Messages area */}
          <div
            ref={chatRef}
            className="p-5 md:p-6 space-y-5 h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
          >
            {messages.map((msg, i) => {
              if (msg.type === "welcome") {
                return (
                  <motion.div
                    key={`msg-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-sm rounded-2xl rounded-tl-sm px-4 py-3 bg-white/[0.03] border border-white/[0.06]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-[10px]">
                          🤖
                        </div>
                        <span className="text-[10px] text-blue-400 font-medium uppercase tracking-wider">
                          AI CFO
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400">
                        Hi! I&apos;m connected to your ERP. Ask me anything about your financials.
                      </p>
                    </div>
                  </motion.div>
                );
              }

              if (msg.type === "user") {
                return (
                  <motion.div
                    key={`msg-${i}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex justify-end"
                  >
                    <div className="max-w-md rounded-2xl rounded-tr-sm px-5 py-3.5 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20 backdrop-blur-xl">
                      <p className="text-sm text-zinc-200 leading-relaxed">
                        {msg.text}
                        {msg.typing && <Cursor />}
                      </p>
                      <div className="flex items-center justify-end gap-1.5 mt-2">
                        <span className="text-[10px] text-zinc-500">You</span>
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center text-[10px]">
                          👤
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              if (msg.type === "thinking") {
                return (
                  <motion.div
                    key={`msg-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="rounded-2xl rounded-tl-sm px-3 py-2 bg-white/[0.02] border border-white/[0.06]">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-[10px]">
                          🤖
                        </div>
                        <span className="text-[10px] text-blue-400 font-medium uppercase tracking-wider">
                          AI CFO
                        </span>
                      </div>
                      <ThinkingDots />
                    </div>
                  </motion.div>
                );
              }

              if (msg.type === "ai") {
                return (
                  <motion.div
                    key={`msg-${i}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-lg rounded-2xl rounded-tl-sm px-5 py-4 bg-white/[0.02] border border-white/[0.06] relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${msg.accent} opacity-30 pointer-events-none`} />
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-[10px]">
                            🤖
                          </div>
                          <span className="text-[10px] text-blue-400 font-medium uppercase tracking-wider">
                            AI CFO
                          </span>
                          <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-300 border border-blue-500/15">
                            {msg.featureTitle}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          {msg.text}
                          {msg.typing && <Cursor />}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              return null;
            })}
          </div>

          {/* Input bar */}
          <div className="px-5 py-4 border-t border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-3">
              <span className="text-zinc-600 text-sm flex-1">
                Ask your AI CFO anything...
              </span>
              <motion.div
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Ambient glow */}
        <div className="absolute -inset-8 -z-10">
          <div className="w-full h-full bg-blue-600/[0.04] rounded-3xl blur-[60px]" />
        </div>
      </div>
    </section>
  );
}
