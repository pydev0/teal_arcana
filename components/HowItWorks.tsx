"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const STEPS = [
  {
    num: "01",
    symbol: "✦",
    title: "Pick your reading",
    desc: "Browse the reading types or use the mood picker — I'll point you to what fits. No tarot experience needed.",
  },
  {
    num: "02",
    symbol: "✉",
    title: "Send a message",
    desc: "Fill out the booking form or drop me a WhatsApp. I'll confirm your slot within 24 hours.",
  },
  {
    num: "03",
    symbol: "☽",
    title: "Your session",
    desc: "We connect 1:1. Just you, me, and the cards. No scripts, no vague answers — honest guidance, every time.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div style={{
        position: "absolute", right: 0, top: "20%",
        width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(11,191,187,0.07) 0%, transparent 70%)",
        filter: "blur(50px)", pointerEvents: "none",
      }} />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <ScrollReveal style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
          <div style={{ height: 1, width: 30, background: "var(--teal)", opacity: 0.5 }} />
          <span style={{ fontSize: "0.68rem", letterSpacing: "0.35em", color: "var(--teal)", textTransform: "uppercase" }}>Process</span>
          <div style={{ height: 1, width: 30, background: "var(--teal)", opacity: 0.5 }} />
        </ScrollReveal>

        <ScrollReveal style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1 }}>
            Simple as <span className="gradient-text">1 · 2 · 3</span>
          </h2>
        </ScrollReveal>

        {/* Steps — vertical timeline */}
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute", left: 19, top: 8, bottom: 8, width: 1,
            background: "linear-gradient(to bottom, rgba(11,191,187,0.5), rgba(11,191,187,0.15), transparent)",
            pointerEvents: "none",
          }} />

          {STEPS.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.15}>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "flex", gap: "1.75rem", alignItems: "flex-start",
                  paddingBottom: i < STEPS.length - 1 ? "3rem" : 0,
                  position: "relative",
                }}
              >
                {/* Circle */}
                <div style={{ flexShrink: 0, position: "relative", zIndex: 1 }}>
                  <motion.div
                    whileHover={{ scale: 1.15, borderColor: "rgba(11,191,187,0.8)" }}
                    transition={{ duration: 0.2 }}
                    style={{
                      width: 40, height: 40, borderRadius: "50%",
                      border: "1px solid rgba(11,191,187,0.35)",
                      background: "var(--dark)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 0 20px rgba(11,191,187,0.1)",
                    }}
                  >
                    <span className="font-display" style={{ fontSize: "0.62rem", color: "var(--teal)", letterSpacing: "0.1em" }}>
                      {step.num}
                    </span>
                  </motion.div>
                </div>

                {/* Content */}
                <div style={{ paddingTop: "0.55rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.5rem" }}>
                    <h3 className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--warm)" }}>
                      {step.title}
                    </h3>
                    <span style={{ fontSize: "0.9rem", color: "rgba(11,191,187,0.4)" }}>{step.symbol}</span>
                  </div>
                  <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.75, maxWidth: 420 }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
