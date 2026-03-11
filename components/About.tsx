"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px 0px" });

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      <motion.div
        className="anim-orb-pulse"
        style={{
          position: "absolute", left: "-5%", top: "30%",
          width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <ScrollReveal style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "4rem" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.35em", color: "var(--muted)", textTransform: "uppercase" }}>01 — About</span>
          <div className="teal-line" style={{ flex: 1, maxWidth: 96 }} />
        </ScrollReveal>

        <div className="grid md:grid-cols-5 gap-12 md:gap-20 items-start" ref={ref}>

          {/* Left — cards + quote */}
          <div className="md:col-span-2 flex flex-col gap-8">
            {/* Stacked card fan */}
            <div style={{ position: "relative", width: 176, height: 256, margin: "0 auto" }}>

              {/* Card back-most (gold) */}
              <motion.div
                animate={inView ? { rotate: 7, x: 0, scale: 1 } : { rotate: 0, x: -14, scale: 0.92 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute", width: 160, height: 240, borderRadius: 16, top: 14, left: 18,
                  border: "1px solid rgba(201,168,76,0.2)",
                  background: "linear-gradient(135deg, rgba(201,168,76,0.08), var(--surface))",
                }}
              />

              {/* Card middle (teal) */}
              <motion.div
                animate={inView ? { rotate: -4, x: 0, scale: 1 } : { rotate: 0, x: 14, scale: 0.92 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute", width: 160, height: 240, borderRadius: 16, top: 7, left: 9,
                  border: "1px solid rgba(11,191,187,0.2)",
                  background: "linear-gradient(135deg, rgba(11,191,187,0.08), var(--surface))",
                }}
              />

              {/* Card front */}
              <motion.div
                animate={inView ? { scale: 1, y: 0 } : { scale: 0.9, y: 10 }}
                transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute", width: 160, height: 240, borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.08)", background: "var(--surface)",
                  boxShadow: "0 0 40px rgba(11,191,187,0.1), 0 0 80px rgba(11,191,187,0.05)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
                  overflow: "hidden",
                }}
              >
                {/* Inner border */}
                <div style={{ position: "absolute", inset: 8, borderRadius: 10, border: "1px solid rgba(11,191,187,0.1)" }} />
                {/* Floating moon symbol */}
                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ fontSize: "2.5rem", position: "relative", zIndex: 1 }}
                >
                  ☽
                </motion.span>
                <div style={{ textAlign: "center", paddingInline: 12, position: "relative", zIndex: 1 }}>
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--teal)", textTransform: "uppercase" }}>The High Priestess</p>
                  <div className="teal-line" style={{ marginTop: 10 }} />
                  <p style={{ fontSize: "0.6rem", color: "var(--muted)", marginTop: 8, fontStyle: "italic" }}>Intuition · Mystery · Wisdom</p>
                </div>
              </motion.div>
            </div>

            {/* Pull quote */}
            <ScrollReveal delay={0.4}>
              <blockquote
                className="font-display"
                style={{ borderLeft: "2px solid var(--teal)", paddingLeft: "1rem", fontSize: "1.05rem", lineHeight: 1.55, color: "var(--warm)", fontStyle: "italic" }}
              >
                "The cards don't predict your future — they show you what you already feel but haven't said out loud."
              </blockquote>
            </ScrollReveal>
          </div>

          {/* Right — text */}
          <div className="md:col-span-3">
            <ScrollReveal delay={0.15}>
              <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1.5rem" }}>
                Two years. Hundreds of
                <br />
                <span className="gradient-text">real conversations.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="space-y-4 leading-relaxed" style={{ color: "var(--muted)", fontSize: "1rem" }}>
                <p>I got into tarot because I was curious — and I stayed because it actually works. Not magic, not fortune-telling. More like holding up a mirror to whatever's already going on inside you.</p>
                <p>I read cards the way I talk — honestly, directly, and without sugarcoating. If something in the spread is uncomfortable, I'll tell you. If it's hopeful, I'll tell you that too.</p>
                <p>I've sat with people going through breakups, career pivots, family drama, and moments of just feeling stuck. Every reading is different. Every person deserves something that actually feels personal.</p>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-3 sm:gap-6 mt-10 pt-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {[
                { value: "2+", label: "Years Reading" },
                { value: "300+", label: "Sessions Done" },
                { value: "1:1", label: "Always Personal" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  animate={statsInView ? { scale: 1, y: 0 } : { scale: 0.7, y: 12 }}
                  transition={{ duration: 0.55, delay: 0.3 + i * 0.1, type: "spring", stiffness: 180, damping: 14 }}
                >
                  <p className="font-display" style={{ fontSize: "2rem", fontWeight: 700, color: "var(--teal)" }}>{s.value}</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: 4 }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
