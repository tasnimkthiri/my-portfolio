"use client";
import { motion, useReducedMotion } from "framer-motion";
export default function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const still = useReducedMotion();
  if (still) return <div className={className}>{children}</div>;
  return <motion.div className={className} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
export function Float({ children, className = "", d = 0 }: { children: React.ReactNode; className?: string; d?: number }) {
  const still = useReducedMotion();
  if (still) return <div className={className}>{children}</div>;
  return <motion.div className={className} animate={{ y: [0, -12, 0] }} transition={{ duration: 5 + d, repeat: Infinity, ease: "easeInOut" }}>{children}</motion.div>;
}
