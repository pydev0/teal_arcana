"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const reviews = [
  {
    name: "Priya M.",
    text: "I was skeptical at first but the reading was incredibly accurate. She picked up on things I hadn't even told anyone. Left the session feeling so much clearer.",
    stars: 5,
  },
  {
    name: "Rahul S.",
    text: "Honest, direct, and no fluff. She told me exactly what I needed to hear about my career situation. Already booked a second session.",
    stars: 5,
  },
  {
    name: "Ananya K.",
    text: "I was going through a tough breakup and the reading helped me see things from a completely different angle. Very calming and insightful experience.",
    stars: 5,
  },
  {
    name: "Deepa R.",
    text: "She doesn't just read the cards — she actually listens. Felt like talking to someone who genuinely understood what I was going through.",
    stars: 5,
  },
  {
    name: "Karan T.",
    text: "Best tarot reading I've ever had. Super personal, not generic at all. Highly recommend to anyone who's on the fence about trying it.",
    stars: 5,
  },
  {
    name: "Meera V.",
    text: "Came in with questions about a major life decision and left with so much clarity. The reading was spot on and she explained everything really well.",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "var(--gold)", fontSize: "0.85rem" }}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section id="testimonials" className="relative py-28 px-6 overflow-hidden">
      {/* Background orb */}
      <motion.div
        className="anim-orb-pulse"
        style={{
          position: "absolute", right: "-5%", top: "20%",
          width: 340, height: 340, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(11,191,187,0.07) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <ScrollReveal style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
          <div style={{ height: 1, width: 30, background: "var(--teal)", opacity: 0.5 }} />
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.35em", color: "var(--teal)", textTransform: "uppercase" }}>Testimonials</span>
          <div style={{ height: 1, width: 30, background: "var(--teal)", opacity: 0.5 }} />
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal delay={0.1} style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, lineHeight: 1.1 }}>
            What people are
            <br />
            <span className="gradient-text">saying about her.</span>
          </h2>
        </ScrollReveal>

        {/* Grid */}
        <div
          ref={ref}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-5"
        >
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "var(--surface)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <Stars count={r.stars} />
              <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.65, flex: 1, fontStyle: "italic" }}>
                "{r.text}"
              </p>
              <p style={{ color: "var(--warm)", fontSize: "0.8rem", marginTop: 14, fontWeight: 600 }}>
                — {r.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Facebook link */}
        <ScrollReveal delay={0.3} style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
            Read more reviews on{" "}
            <a
              href="#"
              style={{ color: "var(--teal)", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              her Facebook page →
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
