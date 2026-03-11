"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const READINGS = [
  "Love & Relationships",
  "Career & Purpose",
  "Year Ahead Reading",
  "Celtic Cross",
  "Three Card Spread",
  "A Single Card Pull",
];

function useTypewriter(words: string[], typeSpeed = 75, deleteSpeed = 40, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const current = words[wordIdx];
    if (!deleting && displayed === current) {
      timeout.current = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && displayed === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timeout.current = setTimeout(() => {
        setDisplayed((prev) =>
          deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        );
      }, deleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(timeout.current);
  }, [displayed, deleting, wordIdx, words, typeSpeed, deleteSpeed, pause]);

  return displayed;
}

const CARDS = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg",           name: "The Moon",          rotate: -18, left: 16,  top: 88, z: 1, delay: 0.65, floatDur: 5.5 },
  { src: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg",        name: "The Empress",       rotate: -9,  left: 97,  top: 46, z: 2, delay: 0.45, floatDur: 4.8 },
  { src: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg", name: "High Priestess",    rotate: 0,   left: 178, top: 12, z: 5, delay: 0.25, floatDur: 4.2 },
  { src: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg",           name: "The Star",          rotate: 9,   left: 258, top: 46, z: 3, delay: 0.1,  floatDur: 5.2 },
  { src: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg",          name: "The World",         rotate: 18,  left: 336, top: 86, z: 1, delay: 0,    floatDur: 6   },
];

function TarotCard({ src, name, rotate, left, top, z, delay, floatDur }: typeof CARDS[0]) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: floatDur, repeat: Infinity, ease: "easeInOut", delay: delay + 1.2 }}
      style={{ position: "absolute", left, top, zIndex: z }}
    >
      <motion.div
        initial={{ y: 90, rotate: rotate - 8, scale: 0.75 }}
        animate={{ y: 0, rotate, scale: 1 }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 192, height: 330,
          borderRadius: 12,
          overflow: "hidden",
          position: "relative",
          border: "2px solid rgba(11,191,187,0.35)",
          boxShadow: "0 28px 70px rgba(0,0,0,0.75), 0 0 40px rgba(11,191,187,0.12), inset 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Real card image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        {/* Teal shimmer on top edge */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, transparent, rgba(11,191,187,0.6), transparent)",
        }} />
      </motion.div>
    </motion.div>
  );
}

const container = {
  animate: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};
const item = {
  initial: { y: 22, scale: 0.97 },
  animate: { y: 0, scale: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);
  const typed = useTypewriter(READINGS);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden star-field"
    >
      {/* Teal orb — shifted left to complement cards on right */}
      <motion.div
        className="anim-orb-pulse"
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", right: "8%", top: "15%",
          width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(11,191,187,0.14) 0%, transparent 70%)",
          filter: "blur(50px)", pointerEvents: "none",
        }}
      />
      {/* Gold orb */}
      <motion.div
        animate={{ x: [0, -12, 0], y: [0, 18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: "absolute", left: "8%", bottom: "18%",
          width: 260, height: 260, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)",
          filter: "blur(30px)", pointerEvents: "none",
        }}
      />

      {/* ARCANA watermark */}
      <motion.div
        className="font-display"
        animate={{ x: [0, -18, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", right: "-2%", top: "50%",
          transform: "translateY(-50%)",
          fontSize: "clamp(100px, 18vw, 260px)",
          color: "rgba(11,191,187,0.03)",
          lineHeight: 1, fontWeight: 700,
          letterSpacing: "-0.05em",
          userSelect: "none", pointerEvents: "none",
        }}
      >
        ARCANA
      </motion.div>

      {/* Two-column layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 lg:py-0 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Left — text */}
        <motion.div variants={container} initial="initial" animate="animate">

          <motion.div variants={item} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "2rem" }}>
            <div style={{ height: 1, width: 40, background: "var(--teal)" }} />
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.35em", color: "var(--teal)", textTransform: "uppercase" }}>
              Tarot · Guidance · Clarity
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)", lineHeight: 1.05, fontWeight: 700, marginBottom: "1.5rem", color: "var(--warm)" }}
          >
            The cards
            <br className="hidden sm:block" />
            {" "}<span className="gradient-text">already know.</span>
            <br className="hidden sm:block" />
            {" "}Do you dare
            <br className="hidden sm:block" />
            {" "}to listen?
          </motion.h1>

          {/* Mobile — card fan between heading and paragraph */}
          <motion.div variants={item} className="lg:hidden flex justify-center items-end gap-3 my-6">
            {[
              { src: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg", name: "The Empress" },
              { src: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg", name: "High Priestess" },
              { src: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg", name: "The Emperor" },
            ].map((card, i) => {
              const rotations = [-10, 0, 10];
              const yOffsets = [14, 0, 14];
              return (
                <motion.div
                  key={card.name}
                  initial={{ y: 30, rotate: rotations[i] - 6, scale: 0.8, opacity: 0 }}
                  animate={{ y: yOffsets[i], rotate: rotations[i], scale: 1, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.5 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    width: 90, height: 155, borderRadius: 10, overflow: "hidden",
                    border: "1.5px solid rgba(11,191,187,0.35)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.6), 0 0 20px rgba(11,191,187,0.1)",
                    flexShrink: 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.src} alt={card.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </motion.div>
              );
            })}
          </motion.div>

          <motion.p
            variants={item}
            style={{ color: "var(--muted)", fontSize: "1rem", maxWidth: 420, lineHeight: 1.7, marginBottom: "1.5rem" }}
          >
            I'm a tarot reader who gives you real talk, not vague answers.
            Whether you're lost, curious, or just need a sign — let's look at the cards together.
          </motion.p>

          <motion.div
            variants={item}
            style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "2.5rem", minHeight: "1.6rem" }}
          >
            <span style={{ fontSize: "0.82rem", color: "var(--muted)", letterSpacing: "0.04em" }}>Readings for</span>
            <span style={{ fontSize: "0.82rem", color: "var(--teal)", fontFamily: "var(--font-cinzel), serif", letterSpacing: "0.06em", minWidth: 180 }}>
              {typed}<span className="caret" style={{ marginLeft: 1, borderRight: "1.5px solid var(--teal)" }}>&nbsp;</span>
            </span>
          </motion.div>

          <motion.div variants={item} style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <motion.a
              href="#book"
              className={`btn-teal ${loaded ? "btn-teal-pulse" : ""}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Book a Reading
            </motion.a>
          </motion.div>

          <motion.div
            variants={item}
            style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "2.5rem", color: "var(--muted)", fontSize: "0.8rem" }}
          >
            <div style={{ display: "flex", marginRight: 4 }}>
              {["#0BBFBB", "#C9A84C", "#6EE7DF"].map((c) => (
                <div key={c} style={{ width: 24, height: 24, borderRadius: "50%", background: c, border: "2px solid var(--dark)", marginLeft: -6 }} />
              ))}
            </div>
            Trusted by clients across the city · 2+ years of readings
          </motion.div>
        </motion.div>

        {/* Right — card fan */}
        <div className="hidden lg:flex items-center justify-center" style={{ minWidth: 0 }}>
        <div style={{ position: "relative", width: 545, height: 460 }}>
          {/* Glow behind cards */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 50% 60%, rgba(11,191,187,0.1) 0%, transparent 70%)",
            filter: "blur(24px)", pointerEvents: "none",
          }} />
          {CARDS.map((card) => (
            <TarotCard key={card.name} {...card} />
          ))}
        </div>
        </div>

      </div>

    </section>
  );
}
