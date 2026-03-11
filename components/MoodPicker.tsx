"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const MOODS = [
  {
    emoji: "🌊",
    label: "Lost & Drifting",
    sub: "Not sure where you're headed",
    reading: "Celtic Cross",
    hint: "Ten cards covering your full situation — energy, blocks, fears, hopes, and likely outcome.",
  },
  {
    emoji: "💫",
    label: "In Love",
    sub: "Heart full or complicated",
    reading: "Love & Relationships",
    hint: "Clarity on connection, compatibility, or what's quietly blocking intimacy.",
  },
  {
    emoji: "🔀",
    label: "At a Crossroads",
    sub: "A big decision is looming",
    reading: "Three Card Spread",
    hint: "Past · Present · Future — see where you've been and what's actually coming.",
  },
  {
    emoji: "🔥",
    label: "Seeking Purpose",
    sub: "Work or path feels off",
    reading: "Career & Purpose",
    hint: "Uncover your direction, hidden opportunities, and where your energy should go.",
  },
  {
    emoji: "✨",
    label: "Just Curious",
    sub: "No drama, just vibes",
    reading: "Single Card Pull",
    hint: "One card, one message. Clean, fast, and surprisingly on point.",
  },
  {
    emoji: "🌙",
    label: "New Chapter",
    sub: "Something big is shifting",
    reading: "Year Ahead Reading",
    hint: "Twelve cards — one for each month. A roadmap for what's coming.",
  },
];

export default function MoodPicker() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div style={{
        position: "absolute", left: "50%", top: "30%",
        width: 400, height: 400, borderRadius: "50%", transform: "translateX(-50%)",
        background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div className="max-w-6xl mx-auto">
        <ScrollReveal style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.35em", color: "var(--teal)", textTransform: "uppercase", marginBottom: "1rem" }}>
            Find Your Reading
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, marginBottom: "0.75rem" }}>
            How are you <span className="gradient-text">feeling?</span>
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "0.95rem", maxWidth: 400, margin: "0 auto", lineHeight: 1.65 }}>
            Pick what resonates — I'll match you with the right reading.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {MOODS.map((mood, i) => (
              <motion.button
                key={i}
                onClick={() => setSelected(selected === i ? null : i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  textAlign: "left",
                  padding: "1.5rem",
                  borderRadius: 16,
                  border: selected === i
                    ? "1px solid rgba(11,191,187,0.5)"
                    : "1px solid rgba(255,255,255,0.07)",
                  background: selected === i
                    ? "rgba(11,191,187,0.07)"
                    : "rgba(255,255,255,0.02)",
                  cursor: "pointer",
                  transition: "border-color 0.2s, background 0.2s",
                }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{mood.emoji}</div>
                <p className="font-display" style={{
                  fontSize: "0.88rem", fontWeight: 600, marginBottom: "0.3rem",
                  color: selected === i ? "var(--teal)" : "var(--warm)",
                  transition: "color 0.2s",
                }}>
                  {mood.label}
                </p>
                <p style={{ fontSize: "0.74rem", color: "var(--muted)", lineHeight: 1.5 }}>{mood.sub}</p>
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {selected !== null && (
            <motion.div
              key={selected}
              initial={{ y: 16, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -8, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                marginTop: "2rem",
                padding: "2rem 2.5rem",
                borderRadius: 18,
                border: "1px solid rgba(11,191,187,0.25)",
                background: "rgba(11,191,187,0.04)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1.5rem",
              }}
            >
              <div>
                <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: "var(--teal)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  Recommended for you
                </p>
                <h3 className="font-display" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--warm)", marginBottom: "0.5rem" }}>
                  {MOODS[selected].reading}
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", maxWidth: 460, lineHeight: 1.65 }}>
                  {MOODS[selected].hint}
                </p>
              </div>
              <motion.a
                href="#book"
                className="btn-teal"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{ flexShrink: 0 }}
              >
                Book this Reading
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
