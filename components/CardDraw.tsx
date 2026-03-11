"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { drawCards, TarotCard } from "@/lib/arcana";

/* ── Element visual themes ─────────────────────────────── */
const elementTheme: Record<string, { bg: string; border: string; glow: string; accent: string }> = {
  Fire: {
    bg: "radial-gradient(ellipse at 40% 65%, rgba(255,120,50,0.95) 0%, rgba(160,30,0,0.98) 55%, #0C0300 100%)",
    border: "rgba(255,120,50,0.55)",
    glow: "0 0 60px rgba(255,100,30,0.5), 0 0 120px rgba(255,100,30,0.2)",
    accent: "#FF7832",
  },
  Water: {
    bg: "radial-gradient(ellipse at 60% 35%, rgba(0,210,240,0.85) 0%, rgba(0,70,110,0.98) 55%, #000A14 100%)",
    border: "rgba(0,210,240,0.45)",
    glow: "0 0 60px rgba(0,200,230,0.4), 0 0 120px rgba(0,200,230,0.15)",
    accent: "#00D2F0",
  },
  Air: {
    bg: "radial-gradient(ellipse at 55% 42%, rgba(160,210,255,0.8) 0%, rgba(50,105,150,0.98) 55%, #03080E 100%)",
    border: "rgba(160,210,255,0.4)",
    glow: "0 0 60px rgba(150,200,255,0.35), 0 0 120px rgba(150,200,255,0.12)",
    accent: "#A0D2FF",
  },
  Earth: {
    bg: "radial-gradient(ellipse at 38% 62%, rgba(110,160,70,0.85) 0%, rgba(50,85,25,0.98) 55%, #030800 100%)",
    border: "rgba(110,160,70,0.45)",
    glow: "0 0 60px rgba(100,155,65,0.4), 0 0 120px rgba(100,155,65,0.15)",
    accent: "#6EA046",
  },
};

const romanNumerals = ["0","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX","XXI"];

type DrawMode = "single" | "three";
interface DrawnCard { card: TarotCard; flipped: boolean; reversed: boolean; label?: string }
const spreadLabels = ["Past", "Present", "Future"];

/* ── Particle burst on flip ─────────────────────────────── */
function Particles({ trigger }: { trigger: boolean }) {
  const pts = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    const dist = 70 + Math.random() * 50;
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, size: 2 + Math.random() * 3 };
  });
  if (!trigger) return null;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none", zIndex: 20 }}>
      {pts.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
          transition={{ duration: 0.9, delay: i * 0.015, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: p.size, height: p.size,
            borderRadius: "50%",
            background: "var(--teal)",
            marginTop: -p.size / 2, marginLeft: -p.size / 2,
          }}
        />
      ))}
      {/* Extra gold sparks */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2 + 0.3;
        const dist = 40 + Math.random() * 30;
        return (
          <motion.div
            key={`g${i}`}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, scale: 0 }}
            transition={{ duration: 0.7, delay: 0.05 + i * 0.02, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              width: 3, height: 3,
              borderRadius: "50%",
              background: "var(--gold)",
              marginTop: -1.5, marginLeft: -1.5,
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Individual flip card ───────────────────────────────── */
function FlipCard({ drawn, index, onFlip }: { drawn: DrawnCard; index: number; onFlip: (i: number) => void }) {
  const [burst, setBurst] = useState(false);
  const theme = elementTheme[drawn.card.element] ?? elementTheme.Air;

  function handleClick() {
    if (!drawn.flipped) {
      onFlip(index);
      setBurst(true);
      setTimeout(() => setBurst(false), 1200);
    }
  }

  return (
    <div
      onClick={handleClick}
      style={{ width: 170, height: 260, perspective: "1200px", position: "relative", cursor: drawn.flipped ? "default" : "pointer" }}
    >
      <Particles trigger={burst} />

      {/* Hover glow ring (only when not flipped) */}
      {!drawn.flipped && (
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", inset: -8,
            borderRadius: 20,
            border: "1px solid rgba(11,191,187,0.35)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Card flip wrapper */}
      <motion.div
        animate={{ rotateY: drawn.flipped ? 180 : 0 }}
        transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
        style={{ width: "100%", height: "100%", transformStyle: "preserve-3d", position: "relative" }}
      >

        {/* ── Card Back ── */}
        <div
          style={{
            position: "absolute", inset: 0,
            borderRadius: 16,
            border: "1px solid rgba(11,191,187,0.25)",
            background: "linear-gradient(145deg, #0D1C1E 0%, #071214 100%)",
            backfaceVisibility: "hidden",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 12,
            overflow: "hidden",
          }}
        >
          {/* Back pattern */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "repeating-linear-gradient(45deg, rgba(11,191,187,0.03) 0px, rgba(11,191,187,0.03) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(-45deg, rgba(11,191,187,0.03) 0px, rgba(11,191,187,0.03) 1px, transparent 1px, transparent 12px)",
          }} />
          {/* Ornate border inside */}
          <div style={{
            position: "absolute", inset: 8,
            borderRadius: 12,
            border: "1px solid rgba(11,191,187,0.12)",
          }} />
          <div
            className="font-display"
            style={{ fontSize: "2.2rem", color: "rgba(11,191,187,0.6)", zIndex: 1 }}
          >
            ✦
          </div>
          <p style={{ fontSize: "0.55rem", letterSpacing: "0.25em", color: "rgba(11,191,187,0.35)", textTransform: "uppercase", zIndex: 1 }}>
            Teal Arcana
          </p>
        </div>

        {/* ── Card Front ── */}
        <div
          style={{
            position: "absolute", inset: 0,
            borderRadius: 16,
            border: `1px solid ${theme.border}`,
            background: theme.bg,
            boxShadow: drawn.flipped ? theme.glow : "none",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 10,
            overflow: "hidden",
            rotate: drawn.reversed ? "180deg" : "0deg",
          }}
        >
          {/* Front pattern overlay */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 60%)",
          }} />
          {/* Ornate inner border */}
          <div style={{
            position: "absolute", inset: 7,
            borderRadius: 11,
            border: `1px solid ${theme.border}`,
            opacity: 0.5,
          }} />
          <div style={{
            position: "absolute", inset: 11,
            borderRadius: 9,
            border: `1px solid ${theme.border}`,
            opacity: 0.25,
          }} />

          {/* Roman numeral */}
          <p
            className="font-display"
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: theme.accent,
              opacity: 0.7,
              zIndex: 1,
            }}
          >
            {romanNumerals[drawn.card.id]}
          </p>

          {/* Symbol */}
          <div style={{ fontSize: "2.8rem", zIndex: 1, filter: "drop-shadow(0 0 12px rgba(255,255,255,0.3))" }}>
            {drawn.card.symbol}
          </div>

          {/* Name */}
          <p
            className="font-display"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.9)",
              textAlign: "center",
              paddingInline: 12,
              lineHeight: 1.4,
              zIndex: 1,
            }}
          >
            {drawn.card.name}
          </p>

          {/* Element */}
          <p style={{ fontSize: "0.5rem", letterSpacing: "0.2em", color: theme.accent, opacity: 0.6, zIndex: 1, textTransform: "uppercase" }}>
            {drawn.card.element}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────── */
export default function CardDraw() {
  const [mode, setMode] = useState<DrawMode>("single");
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [phase, setPhase] = useState<"idle" | "drawn">("idle");
  const [screenFlash, setScreenFlash] = useState(false);

  function handleDraw() {
    const count = mode === "single" ? 1 : 3;
    setDrawnCards(
      drawCards(count).map((card, i) => ({
        card, flipped: false,
        reversed: Math.random() < 0.25,
        label: count === 3 ? spreadLabels[i] : undefined,
      }))
    );
    setPhase("drawn");
  }

  function flipCard(index: number) {
    setDrawnCards(prev => prev.map((dc, i) => i === index ? { ...dc, flipped: true } : dc));
    setScreenFlash(true);
    setTimeout(() => setScreenFlash(false), 400);
  }

  function reset() { setDrawnCards([]); setPhase("idle"); }

  const allFlipped = drawnCards.length > 0 && drawnCards.every(dc => dc.flipped);

  return (
    <div style={{ minHeight: "100vh", background: "var(--dark)", position: "relative", overflow: "hidden", paddingTop: "5rem" }}>

      {/* Screen flash on card reveal */}
      <AnimatePresence>
        {screenFlash && (
          <motion.div
            initial={{ opacity: 0.25 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ position: "fixed", inset: 0, background: "rgba(11,191,187,0.12)", zIndex: 100, pointerEvents: "none" }}
          />
        )}
      </AnimatePresence>

      {/* Ambient orbs */}
      <div style={{
        position: "absolute", top: "15%", right: "8%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(11,191,187,0.12) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "5%",
        width: 350, height: 350,
        background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
        filter: "blur(50px)", pointerEvents: "none",
      }} />

      {/* Star field dots */}
      <div className="star-field" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>

        {/* ── Hero header ── */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: "1.5rem" }}>
            <div style={{ height: 1, width: 40, background: "var(--teal)" }} />
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.35em", color: "var(--teal)", textTransform: "uppercase" }}>
              Major Arcana · 22 Cards
            </span>
            <div style={{ height: 1, width: 40, background: "var(--teal)" }} />
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              marginBottom: "1rem",
              color: "var(--warm)",
            }}
          >
            The Major <span className="gradient-text">Arcana</span>
          </h1>
          <p style={{ color: "var(--muted)", fontSize: "1rem", maxWidth: 420, margin: "0 auto" }}>
            Breathe. Think of your question. When you're ready — click the deck.
          </p>
        </div>

        {/* ── Mode selector ── */}
        {phase === "idle" && (
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: "3.5rem" }}>
            {(["single", "three"] as DrawMode[]).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="font-display"
                style={{
                  padding: "0.6rem 1.6rem",
                  borderRadius: 9999,
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  transition: "all 0.2s ease",
                  border: mode === m ? "1px solid var(--teal)" : "1px solid rgba(255,255,255,0.1)",
                  background: mode === m ? "rgba(11,191,187,0.15)" : "transparent",
                  color: mode === m ? "var(--teal)" : "var(--muted)",
                  cursor: "pointer",
                }}
              >
                {m === "single" ? "Daily Card" : "Three Card Spread"}
              </button>
            ))}
          </div>
        )}

        {/* ── Idle — animated deck ── */}
        {phase === "idle" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2.5rem" }}>
            {/* Deck */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDraw}
              style={{ position: "relative", width: 170, height: 260, cursor: "pointer" }}
            >
              {/* Glow pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute", inset: -16,
                  borderRadius: 28,
                  border: "1px solid rgba(11,191,187,0.3)",
                  pointerEvents: "none",
                }}
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                style={{
                  position: "absolute", inset: -30,
                  borderRadius: 36,
                  border: "1px solid rgba(11,191,187,0.15)",
                  pointerEvents: "none",
                }}
              />

              {/* Card stack */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={i === 5 ? { y: [0, -4, 0] } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                  style={{
                    position: "absolute", inset: 0,
                    borderRadius: 16,
                    border: "1px solid rgba(11,191,187,0.2)",
                    background: "linear-gradient(145deg, #0D1C1E 0%, #071214 100%)",
                    zIndex: i,
                    transform: `rotate(${(i - 3) * 2.5}deg) translateY(${-i * 2}px)`,
                    overflow: "hidden",
                  }}
                >
                  {/* Diamond pattern */}
                  <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "repeating-linear-gradient(45deg, rgba(11,191,187,0.03) 0px, rgba(11,191,187,0.03) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(-45deg, rgba(11,191,187,0.03) 0px, rgba(11,191,187,0.03) 1px, transparent 1px, transparent 12px)",
                  }} />
                  {i === 5 && (
                    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, position: "relative" }}>
                      <div style={{ inset: 8, position: "absolute", borderRadius: 10, border: "1px solid rgba(11,191,187,0.15)" }} />
                      <span className="font-display" style={{ fontSize: "2.5rem", color: "rgba(11,191,187,0.55)" }}>✦</span>
                      <p style={{ fontSize: "0.5rem", letterSpacing: "0.3em", color: "rgba(11,191,187,0.3)", textTransform: "uppercase" }}>Teal Arcana</p>
                      <p style={{ fontSize: "0.45rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase" }}>Click to draw</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <p style={{ color: "var(--muted)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {mode === "single" ? "One card · One message" : "Three cards · Past · Present · Future"}
            </p>
          </div>
        )}

        {/* ── Drawn cards ── */}
        {phase === "drawn" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem" }}>

            {/* Spread label */}
            {!allFlipped && (
              <p
                className="font-display"
                style={{ color: "var(--muted)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase" }}
              >
                {drawnCards.filter(d => d.flipped).length} of {drawnCards.length} revealed
              </p>
            )}

            {/* Cards row */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
              {drawnCards.map((dc, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                  {dc.label && (
                    <span
                      className="font-display"
                      style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase" }}
                    >
                      {dc.label}
                    </span>
                  )}
                  <FlipCard drawn={dc} index={i} onFlip={flipCard} />
                </div>
              ))}
            </div>

            {/* ── Full reading details ── */}
            <AnimatePresence>
              {allFlipped && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.5rem" }}
                >
                  {/* Divider */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
                    <span className="font-display" style={{ fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                      Your Reading
                    </span>
                    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
                  </div>

                  {drawnCards.map((dc, i) => {
                    const theme = elementTheme[dc.card.element] ?? elementTheme.Air;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2, duration: 0.6 }}
                        style={{
                          borderRadius: 20,
                          border: `1px solid ${theme.border}`,
                          background: `linear-gradient(135deg, rgba(13,21,23,0.95), rgba(7,12,13,0.98))`,
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        {/* Top colored bar */}
                        <div style={{ height: 3, background: theme.accent, opacity: 0.7 }} />

                        {/* Glow overlay */}
                        <div style={{
                          position: "absolute", top: 0, left: 0, right: 0, height: 120,
                          background: `radial-gradient(ellipse at 50% 0%, ${theme.accent}18 0%, transparent 80%)`,
                          pointerEvents: "none",
                        }} />

                        <div style={{ padding: "2rem 2rem 2rem", position: "relative" }}>
                          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "1.5rem" }}>

                            {/* Symbol circle */}
                            <div style={{
                              width: 64, height: 64, borderRadius: "50%",
                              border: `1px solid ${theme.border}`,
                              background: `${theme.accent}15`,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: "1.8rem", flexShrink: 0,
                              boxShadow: `0 0 20px ${theme.accent}30`,
                            }}>
                              {dc.card.symbol}
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                              {/* Name + badges */}
                              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                <span
                                  className="font-display"
                                  style={{ fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.2em", textTransform: "uppercase" }}
                                >
                                  {romanNumerals[dc.card.id]}
                                </span>
                                {dc.label && (
                                  <span style={{
                                    fontSize: "0.65rem", padding: "0.15rem 0.6rem", borderRadius: 9999,
                                    border: `1px solid ${theme.border}`, color: theme.accent,
                                    background: `${theme.accent}10`, textTransform: "uppercase", letterSpacing: "0.1em",
                                  }}>
                                    {dc.label}
                                  </span>
                                )}
                                {dc.reversed && (
                                  <span style={{
                                    fontSize: "0.65rem", padding: "0.15rem 0.6rem", borderRadius: 9999,
                                    border: "1px solid rgba(255,100,100,0.3)", color: "#FF8080",
                                    background: "rgba(255,80,80,0.08)", textTransform: "uppercase", letterSpacing: "0.1em",
                                  }}>
                                    Reversed
                                  </span>
                                )}
                              </div>

                              <h2
                                className="font-display"
                                style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "var(--warm)", marginBottom: "0.6rem", lineHeight: 1.1 }}
                              >
                                {dc.card.name}
                              </h2>

                              {/* Keywords */}
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1.2rem" }}>
                                {dc.card.keywords.map(kw => (
                                  <span
                                    key={kw}
                                    style={{
                                      fontSize: "0.7rem", padding: "0.2rem 0.75rem", borderRadius: 9999,
                                      border: "1px solid rgba(255,255,255,0.08)",
                                      color: "var(--muted)", letterSpacing: "0.05em",
                                    }}
                                  >
                                    {kw}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Meaning */}
                          <p style={{
                            color: "rgba(237,232,223,0.8)",
                            fontSize: "1rem",
                            lineHeight: 1.75,
                            marginTop: "0.5rem",
                            paddingTop: "1.2rem",
                            borderTop: "1px solid rgba(255,255,255,0.05)",
                          }}>
                            {dc.reversed ? dc.card.reversed : dc.card.meaning}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Actions */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", paddingTop: "1rem" }}>
                    <button onClick={reset} className="btn-outline">Draw Again</button>
                    <a href="/#book" className="btn-teal">Book a Full Reading ✦</a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
