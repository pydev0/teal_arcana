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

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "0.68rem", letterSpacing: "0.35em", color: "var(--muted)", textTransform: "uppercase" }}>
            03 — Process
          </span>
          <div className="teal-line" style={{ width: 60 }} />
        </ScrollReveal>

        <ScrollReveal style={{ marginBottom: "4rem" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1 }}>
            Simple as <span className="gradient-text">1 · 2 · 3</span>
          </h2>
        </ScrollReveal>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(11,191,187,0.35)" }}
                transition={{ duration: 0.25 }}
                className="p-6 md:p-9"
                style={{
                  position: "relative",
                  borderRadius: 20,
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                {/* Big faded step number behind */}
                <div className="font-display" style={{
                  position: "absolute", right: "1rem", bottom: "0.5rem",
                  fontSize: "5rem", fontWeight: 700, lineHeight: 1,
                  color: "rgba(11,191,187,0.05)", userSelect: "none", pointerEvents: "none",
                }}>
                  {step.num}
                </div>

                {/* Top row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
                  <span className="font-display" style={{ fontSize: "0.68rem", color: "var(--teal)", letterSpacing: "0.18em" }}>
                    {step.num}
                  </span>
                  <span style={{ fontSize: "1.3rem", color: "rgba(11,191,187,0.5)" }}>{step.symbol}</span>
                </div>

                <div className="teal-line" style={{ marginBottom: "1.5rem" }} />

                <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--warm)", marginBottom: "0.75rem" }}>
                  {step.title}
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.75 }}>
                  {step.desc}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
