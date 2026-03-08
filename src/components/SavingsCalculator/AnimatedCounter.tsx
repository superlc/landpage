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
