"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const services = [
  { num: "01", title: "Single Card Pull", desc: "One card. One question. Straight to the point. Great for a daily check-in or when you need a clear answer fast." },
  { num: "02", title: "Three Card Spread", desc: "Past, present, future — or situation, action, outcome. Perfect for decisions or understanding where you're at right now." },
  { num: "03", title: "Celtic Cross", desc: "The full picture. Ten cards covering everything — your current energy, hidden influences, fears, hopes, and likely outcome." },
  { num: "04", title: "Love & Relationships", desc: "For the messy, complicated, beautiful parts of love. Clarity on your relationship, compatibility, or what's blocking connection." },
  { num: "05", title: "Career & Purpose", desc: "Feeling stuck or unsure of your direction? This one looks at your path, hidden opportunities, and where your energy should go." },
  { num: "06", title: "Year Ahead", desc: "Twelve cards — one for each month. A roadmap of themes, energy, and what to watch out for in the year coming." },
  { num: "07", title: "Mind · Body · Spirit", desc: "Three cards, three layers. Your mental state, physical energy, and spiritual alignment right now. Grounding and clarifying." },
  { num: "08", title: "Monthly Forecast", desc: "A focused look at the energy, themes, and shifts shaping your month ahead. Good for checking in at the start of something new." },
  { num: "09", title: "Shadow Work", desc: "The cards don't lie. This spread digs into patterns, blocks, and hidden parts of yourself that might be running the show without you knowing." },
  { num: "10", title: "Intuitive Reading", desc: "No agenda, no fixed spread. I read what comes through — raw, unfiltered, and often the most honest session you'll have. Great when you don't know where to start." },
];

const MOODS = [
  { emoji: "🌊", label: "Lost & Drifting",   sub: "Not sure where you're headed",  reading: "Celtic Cross",         hint: "Ten cards covering your full situation — energy, blocks, fears, hopes, and likely outcome." },
  { emoji: "💫", label: "In Love",            sub: "Heart full or complicated",     reading: "Love & Relationships",  hint: "Clarity on connection, compatibility, or what's quietly blocking intimacy." },
  { emoji: "🔀", label: "At a Crossroads",    sub: "A big decision is looming",     reading: "Three Card Spread",     hint: "Past · Present · Future — see where you've been and what's actually coming." },
  { emoji: "🔥", label: "Seeking Purpose",    sub: "Work or path feels off",        reading: "Career & Purpose",      hint: "Uncover your direction, hidden opportunities, and where your energy should go." },
  { emoji: "✨", label: "Just Curious",        sub: "No drama, just vibes",          reading: "Intuitive Reading",     hint: "No agenda, no fixed spread. Raw, unfiltered, and often the most honest session you'll have." },
  { emoji: "🌙", label: "New Chapter",         sub: "Something big is shifting",     reading: "Year Ahead",            hint: "Twelve cards — one for each month. A roadmap for what's coming." },
];

const rowVariants = {
  hidden: { y: 18, scale: 0.985 },
  visible: (i: number) => ({
    y: 0, scale: 1,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Services() {
  const listRef = useRef<HTMLDivElement>(null);
  const listInView = useInView(listRef, { once: true, margin: "-60px 0px" });
  const [moodOpen, setMoodOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-28 px-6 overflow-hidden">
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
          <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.05, marginBottom: "1rem" }}>
            Pick what <span className="gradient-text">calls to you.</span>
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>
            Every session is 1-on-1. No scripts, no copy-paste answers. Just you, me, and the cards.
          </p>
        </ScrollReveal>

        {/* Service rows */}
        <div ref={listRef}>
          {/* Mobile: 2-col tile grid */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            {services.map((s, i) => (
              <motion.div
                key={s.num}
                custom={i}
                variants={rowVariants}
                initial="hidden"
                animate={listInView ? "visible" : "hidden"}
                style={{
                  padding: "1rem",
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <span className="font-display" style={{ fontSize: "0.6rem", color: "var(--teal)", letterSpacing: "0.12em" }}>{s.num}</span>
                <h3 className="font-display" style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--warm)", marginTop: 6, lineHeight: 1.3 }}>{s.title}</h3>
              </motion.div>
            ))}
          </div>

          {/* Desktop: original rows */}
          <div className="hidden sm:block">
            {services.map((s, i) => (
              <motion.div
                key={s.num}
                custom={i}
                variants={rowVariants}
                initial="hidden"
                animate={listInView ? "visible" : "hidden"}
                className="service-row"
                style={{ display: "flex", alignItems: "flex-start", gap: 24, paddingBlock: 28, cursor: "default" }}
              >
                <motion.span
                  className="service-num font-display"
                  whileHover={{ textShadow: "0 0 14px rgba(11,191,187,0.9)" }}
                  style={{ fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.12em", paddingTop: 4, minWidth: "2rem", transition: "color 0.2s" }}
                >
                  {s.num}
                </motion.span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--warm)", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA + mood toggle */}
        <ScrollReveal delay={0.2} style={{ marginTop: "3.5rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginBottom: "1.5rem" }}>
            <motion.a href="#book" className="btn-teal" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              Book a Session
            </motion.a>
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
              Not sure which one?
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
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
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
                          border: selected === i ? "1px solid rgba(11,191,187,0.5)" : "1px solid rgba(255,255,255,0.07)",
                          background: selected === i ? "rgba(11,191,187,0.07)" : "rgba(255,255,255,0.02)",
                          transition: "border-color 0.2s, background 0.2s",
                        }}
                      >
                        <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{mood.emoji}</div>
                        <p className="font-display" style={{ fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.2rem", color: selected === i ? "var(--teal)" : "var(--warm)", transition: "color 0.2s" }}>
                          {mood.label}
                        </p>
                        <p style={{ fontSize: "0.7rem", color: "var(--muted)" }}>{mood.sub}</p>
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
                          <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--teal)", textTransform: "uppercase", marginBottom: "0.4rem" }}>
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
