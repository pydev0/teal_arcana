"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
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
        <ScrollReveal style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
          <div style={{ height: 1, width: 30, background: "var(--teal)", opacity: 0.5 }} />
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.35em", color: "var(--teal)", textTransform: "uppercase" }}>About</span>
          <div style={{ height: 1, width: 30, background: "var(--teal)", opacity: 0.5 }} />
        </ScrollReveal>

        <div className="grid md:grid-cols-5 gap-12 md:gap-20 items-start" ref={ref}>

          {/* Left — photos + quote */}
          <div className="md:col-span-2 flex flex-col gap-8">
            {/* Photo mosaic grid */}
            <motion.div
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
            >
              {[1, 2, 3, 4].map((n, i) => (
                <motion.div
                  key={n}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    borderRadius: 12, overflow: "hidden", aspectRatio: "3/4",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    position: "relative",
                  }}
                >
                  <Image
                    src={`/about-${n}.jpeg`}
                    alt={`About photo ${n}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 45vw, 15vw"
                  />
                </motion.div>
              ))}

            </motion.div>

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
              <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1.5rem" }}>
                Two years. Hundreds of
                <br />
                <span className="gradient-text">real conversations.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="space-y-4 leading-relaxed" style={{ color: "var(--muted)", fontSize: "1rem" }}>
                <p>It all started with curiosity — and once I learned the cards, something shifted. You awaken to something much higher than the everyday. It's hard to explain until you feel it yourself.</p>
                <p>No card reads the same story twice. The same card pulled for two different people will tell a completely different tale, because everyone carries their own energy. That's what makes tarot so powerful — it meets you exactly where you are.</p>
                <p>This tool is an intuitive way of connecting on a higher vibration with tarot cards. It's not about prediction — it's about resonance, reflection, and reading the energy that's already there.</p>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-3 sm:gap-6 mt-10 pt-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {[
                { value: "4+", label: "Years Reading" },
                { value: "500+", label: "Sessions Done" },
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
