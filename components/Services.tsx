"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const services = [
  { num: "01", title: "30 Minute Tarot Reading", price: "£25", desc: "A full tarot and angel card session. Enough time to go deep — multiple questions, layered guidance, and real clarity on what's moving in your life.", popular: true },
  { num: "02", title: "20 Minute Tarot Reading", price: "£20", desc: "A focused tarot and angel card session. Perfect when you have a clear topic or a couple of questions and want honest, direct insight.", popular: false },
  { num: "03", title: "3 Card Reading", price: "£15", desc: "Past, present, future — or situation, action, outcome. Perfect for decisions or understanding where you're at right now.", popular: false },
  { num: "04", title: "1 Question Reading", price: "£10", desc: "One question, one honest answer using 3 cards. Straight to the point to cut through the noise.", popular: false },
  { num: "05", title: "Word Affirmation Reading", price: "£15", desc: "Receive a powerful word affirmation channelled through the cards. A message to carry with you — simple, grounding, and aligned to your energy.", popular: false },
  { num: "06", title: "Oracle / Angel Card Reading", price: "£15", desc: "Gentle, uplifting guidance through oracle and angel cards. Perfect for spiritual encouragement, reassurance, and connecting with higher energy.", popular: false },
  { num: "07", title: "Email Reading", price: "£20", desc: "A detailed written reading sent straight to your inbox. Thoughtful, in-depth, and something you can revisit whenever you need it.", popular: false },
  { num: "08", title: "30 Minute Audio Recording", price: "£25", desc: "Your reading delivered as a voice recording via WhatsApp. Listen back anytime — personal, intimate, and on your own time.", popular: false },
];

const MOODS = [
  { emoji: "🌊", label: "Lost & Drifting",   sub: "Not sure where you're headed",  reading: "30 Minute Tarot Reading",  hint: "A full session to go deep — multiple questions, layered guidance, and real clarity. £25" },
  { emoji: "💫", label: "In Love",            sub: "Heart full or complicated",     reading: "20 Minute Tarot Reading",  hint: "A focused session for matters of the heart. Honest, direct insight on your connection. £20" },
  { emoji: "🔀", label: "At a Crossroads",    sub: "A big decision is looming",     reading: "3 Card Reading",           hint: "Past · Present · Future — see where you've been and what's actually coming. £15" },
  { emoji: "🔥", label: "Seeking Purpose",    sub: "Work or path feels off",        reading: "30 Minute Tarot Reading",  hint: "Enough time to explore your path, hidden opportunities, and where your energy should go. £25" },
  { emoji: "✨", label: "Just Curious",        sub: "No drama, just vibes",          reading: "1 Question Reading",       hint: "One question, one honest answer using 3 cards. Straight to the point. £10" },
  { emoji: "🌙", label: "New Chapter",         sub: "Something big is shifting",     reading: "Oracle / Angel Card Reading", hint: "Gentle, uplifting guidance through oracle and angel cards for your new beginning. £15" },
];

const cardVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    y: 0, opacity: 1, scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px 0px" });
  const [moodOpen, setMoodOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-20 px-6 overflow-hidden section-backdrop">
      <div style={{
        position: "absolute", right: "-5%", bottom: "10%",
        width: 380, height: 380, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(11,191,187,0.07) 0%, transparent 70%)",
        filter: "blur(50px)", pointerEvents: "none",
      }} />

      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <ScrollReveal style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
          <div style={{ height: 1, width: 30, background: "var(--teal)", opacity: 0.5 }} />
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.35em", color: "var(--teal)", textTransform: "uppercase" }}>Readings</span>
          <div style={{ height: 1, width: 30, background: "var(--teal)", opacity: 0.5 }} />
        </ScrollReveal>

        {/* Heading row */}
        <ScrollReveal style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, lineHeight: 1.05, marginBottom: "1rem" }}>
            Pick what <span className="gradient-text">calls to you.</span>
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", lineHeight: 1.7, maxWidth: 400, margin: "0 auto" }}>
            Every session is 1-on-1. No scripts, no copy-paste answers. Just you, me, and the cards.
          </p>
        </ScrollReveal>

        {/* Pricing cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                padding: "clamp(1.25rem, 3vw, 1.75rem) clamp(1rem, 2.5vw, 1.5rem)",
                borderRadius: 20,
                border: s.popular
                  ? "1px solid rgba(201,168,76,0.35)"
                  : "1px solid rgba(255,255,255,0.15)",
                background: s.popular
                  ? "linear-gradient(160deg, rgba(255,215,0,0.15) 0%, rgba(0,0,0,0.45) 50%, rgba(15,255,248,0.08) 100%)"
                  : "rgba(0,0,0,0.35)",
                overflow: "hidden",
                transition: "border-color 0.3s",
              }}
              className="service-card"
            >
              {/* Popular badge */}
              {s.popular && (
                <div className="font-display" style={{
                  position: "absolute", top: 14, right: 14,
                  fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "var(--gold)", background: "rgba(201,168,76,0.12)",
                  padding: "4px 10px", borderRadius: 20,
                  border: "1px solid rgba(201,168,76,0.2)",
                }}>
                  Most Popular
                </div>
              )}

              {/* Number */}
              <span className="font-display" style={{
                fontSize: "0.6rem", color: s.popular ? "var(--gold)" : "var(--teal)",
                letterSpacing: "0.12em", marginBottom: 14, opacity: 0.7,
              }}>
                {s.num}
              </span>

              {/* Price */}
              <div className="font-display" style={{
                fontSize: "2rem", fontWeight: 700,
                color: "var(--warm)",
                lineHeight: 1, marginBottom: 8,
              }}>
                {s.price}
              </div>

              {/* Title */}
              <h3 className="font-display" style={{
                fontSize: "1rem", fontWeight: 600,
                color: "var(--warm)", lineHeight: 1.3,
                marginBottom: 12,
              }}>
                {s.title}
              </h3>

              {/* Description */}
              <p style={{
                color: "var(--muted)", fontSize: "0.95rem",
                lineHeight: 1.75, flex: 1,
                marginBottom: 20,
              }}>
                {s.desc}
              </p>

              {/* Book button */}
              <motion.a
                href="#book"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="font-display"
                style={{
                  display: "block", textAlign: "center",
                  padding: "0.7rem 1rem", borderRadius: 10,
                  fontSize: "0.72rem", fontWeight: 600,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  textDecoration: "none",
                  background: s.popular
                    ? "linear-gradient(135deg, var(--teal) 0%, #0AADAA 100%)"
                    : "transparent",
                  color: s.popular ? "#FFFFFF" : "var(--teal)",
                  border: s.popular ? "none" : "1px solid rgba(11,191,187,0.3)",
                  transition: "background 0.3s, border-color 0.3s",
                  cursor: "pointer",
                }}
              >
                Book Now
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Tarot Parties note */}
        <ScrollReveal delay={0.15} style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
            <span style={{ color: "var(--gold)" }}>✦</span> &nbsp;Tarot Parties available on request&nbsp; <span style={{ color: "var(--gold)" }}>✦</span>
          </p>
        </ScrollReveal>

        {/* CTA + mood toggle */}
        <ScrollReveal delay={0.2} style={{ marginTop: "2.5rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 16, marginBottom: "1.5rem" }}>
            <motion.button
              onClick={() => { setMoodOpen((o) => !o); setSelected(null); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
                fontSize: "0.85rem", color: moodOpen ? "var(--teal)" : "var(--muted)",
                transition: "color 0.2s",
              }}
            >
              <motion.span
                animate={{ rotate: moodOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: "1rem", display: "inline-block" }}
              >
                ✦
              </motion.span>
              Not sure which one? Let the cards guide you.
            </motion.button>
          </div>

          {/* Mood picker panel */}
          <AnimatePresence>
            {moodOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div style={{
                  padding: "2rem",
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  marginBottom: "1rem",
                }}>
                  <p className="font-display" style={{ fontSize: "0.8rem", color: "var(--teal)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                    How are you feeling?
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3" style={{ marginBottom: "1.5rem" }}>
                    {MOODS.map((mood, i) => (
                      <motion.button
                        key={i}
                        onClick={() => setSelected(selected === i ? null : i)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          textAlign: "left", padding: "0.85rem 1rem", borderRadius: 12, cursor: "pointer",
                          border: selected === i ? "1px solid rgba(11,191,187,0.5)" : "1px solid rgba(255,255,255,0.1)",
                          background: selected === i ? "rgba(11,191,187,0.07)" : "rgba(255,255,255,0.05)",
                          transition: "border-color 0.2s, background 0.2s",
                        }}
                      >
                        <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{mood.emoji}</div>
                        <p className="font-display" style={{ fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.2rem", color: selected === i ? "var(--teal)" : "var(--warm)", transition: "color 0.2s" }}>
                          {mood.label}
                        </p>
                        <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{mood.sub}</p>
                      </motion.button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {selected !== null && (
                      <motion.div
                        key={selected}
                        initial={{ y: 10, scale: 0.98 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: -6, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          padding: "1.5rem 2rem",
                          borderRadius: 14,
                          border: "1px solid rgba(11,191,187,0.25)",
                          background: "rgba(11,191,187,0.04)",
                          display: "flex", flexWrap: "wrap",
                          alignItems: "center", justifyContent: "space-between", gap: "1rem",
                        }}
                      >
                        <div>
                          <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", color: "var(--teal)", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                            Recommended for you
                          </p>
                          <h3 className="font-display" style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--warm)", marginBottom: "0.4rem" }}>
                            {MOODS[selected].reading}
                          </h3>
                          <p style={{ color: "var(--muted)", fontSize: "0.85rem", maxWidth: 420, lineHeight: 1.65 }}>
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
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
}
