"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { majorArcana } from "@/lib/arcana";

function useBreakpoint() {
  const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">("desktop");
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      setBp(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

const IMAGES: Record<number, string> = {
  0:  "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
  1:  "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
  2:  "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg",
  3:  "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg",
  4:  "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg",
  5:  "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg",
  6:  "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg",
  7:  "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
  8:  "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
  9:  "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg",
  10: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
  11: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg",
  12: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg",
  13: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg",
  14: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg",
  15: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg",
  16: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
  17: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg",
  18: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg",
  19: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg",
  20: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg",
  21: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg",
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ARC_5 = [
  { rotate: -18, y: 18 },
  { rotate: -9,  y: 8  },
  { rotate: 0,   y: 0  },
  { rotate: 9,   y: 8  },
  { rotate: 18,  y: 18 },
];
const ARC_7 = [
  { rotate: -21, y: 22 },
  { rotate: -14, y: 12 },
  { rotate: -7,  y: 5  },
  { rotate: 0,   y: 0  },
  { rotate: 7,   y: 5  },
  { rotate: 14,  y: 12 },
  { rotate: 21,  y: 22 },
];
const ARC_9 = [
  { rotate: -24, y: 28 },
  { rotate: -17, y: 16 },
  { rotate: -10, y: 8  },
  { rotate: -4,  y: 3  },
  { rotate: 0,   y: 0  },
  { rotate: 4,   y: 3  },
  { rotate: 10,  y: 8  },
  { rotate: 17,  y: 16 },
  { rotate: 24,  y: 28 },
];

export default function CardPull() {
  const bp = useBreakpoint();
  const { CARD_W, CARD_H, SPREAD, ARC, ML } = bp === "mobile"
    ? { CARD_W: 84,  CARD_H: 145, SPREAD: 5, ARC: ARC_5, ML: -30 }
    : bp === "tablet"
    ? { CARD_W: 110, CARD_H: 190, SPREAD: 7, ARC: ARC_7, ML: -42 }
    : { CARD_W: 140, CARD_H: 242, SPREAD: 9, ARC: ARC_9, ML: -54 };

  const [deck, setDeck] = useState(majorArcana);
  const [chosen, setChosen] = useState<number | null>(null);
  const [shuffleKey, setShuffleKey] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDeck(shuffle(majorArcana));
    setMounted(true);
  }, []);

  const spread = deck.slice(0, SPREAD);
  const displayCards = deck.slice(SPREAD, SPREAD + 4);
  const chosenCard = chosen !== null ? spread[chosen] : null;

  function handlePick(i: number) {
    if (chosen !== null || isShuffling) return;
    setChosen(i);
  }

  function handleShuffle() {
    if (isShuffling) return;
    setIsShuffling(true);
    setChosen(null);
    setTimeout(() => {
      setDeck(shuffle(majorArcana));
      setShuffleKey(k => k + 1);
      setIsShuffling(false);
    }, 380);
  }

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div style={{ position: "absolute", left: "8%", top: "15%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", filter: "blur(55px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "5%", bottom: "20%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(11,191,187,0.07) 0%, transparent 70%)", filter: "blur(55px)", pointerEvents: "none" }} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: "1.2rem" }}>
            <div style={{ height: 1, width: 30, background: "var(--teal)", opacity: 0.5 }} />
            <span style={{ fontSize: "0.68rem", letterSpacing: "0.35em", color: "var(--teal)", textTransform: "uppercase" }}>
              Single Pull
            </span>
            <div style={{ height: 1, width: 30, background: "var(--teal)", opacity: 0.5 }} />
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, marginBottom: "0.75rem" }}>
            Pick a <span className="gradient-text">card.</span>
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.65, maxWidth: 340, margin: "0 auto" }}>
            {chosen === null
              ? "Focus on a question. When you're ready, choose one."
              : "Your card has spoken. Book a reading for the full picture."}
          </p>
        </ScrollReveal>

        {/* Spread */}
        <ScrollReveal delay={0.1}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", marginBottom: "2rem", minHeight: CARD_H + 40, visibility: mounted ? "visible" : "hidden" }}>
            {spread.map((card, i) => {
              const arc = ARC[i];
              const isChosen = chosen === i;
              const isDimmed = chosen !== null && !isChosen;

              return (
                <motion.div
                  key={`${card.id}-${shuffleKey}`}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{
                    y: isShuffling ? 20 : isChosen ? -32 : arc.y,
                    rotate: isChosen ? 0 : arc.rotate,
                    scale: isShuffling ? 0.9 : isChosen ? 1.13 : isDimmed ? 0.87 : 1,
                    opacity: isShuffling ? 0 : isDimmed ? 0.22 : 1,
                  }}
                  transition={{
                    duration: isShuffling ? 0.3 : 0.55,
                    delay: isShuffling ? i * 0.03 : i * 0.055,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={chosen === null && !isShuffling ? { y: arc.y - 20, scale: 1.07 } : {}}
                  onClick={() => handlePick(i)}
                  style={{
                    cursor: chosen === null && !isShuffling ? "pointer" : "default",
                    marginLeft: i === 0 ? 0 : ML,
                    zIndex: isChosen ? 20 : i,
                    transformOrigin: "bottom center",
                    position: "relative",
                  }}
                >
                  <div style={{ perspective: 1000 }}>
                    <motion.div
                      animate={{ rotateY: isChosen ? 180 : 0 }}
                      transition={{ duration: 0.85, delay: isChosen ? 0.25 : 0, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformStyle: "preserve-3d", position: "relative", width: CARD_W, height: CARD_H }}
                    >
                      {/* Card back */}
                      <div style={{
                        position: "absolute", inset: 0,
                        backfaceVisibility: "hidden",
                        borderRadius: 12,
                        border: "1.5px solid rgba(11,191,187,0.3)",
                        background: "linear-gradient(160deg, #0E1619 0%, #070C0D 100%)",
                        boxShadow: "0 18px 45px rgba(0,0,0,0.7)",
                        overflow: "hidden",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <div style={{
                          position: "absolute", inset: 0,
                          backgroundImage: "repeating-linear-gradient(45deg, rgba(11,191,187,0.055) 0px, rgba(11,191,187,0.055) 1px, transparent 1px, transparent 14px), repeating-linear-gradient(-45deg, rgba(11,191,187,0.055) 0px, rgba(11,191,187,0.055) 1px, transparent 1px, transparent 14px)",
                        }} />
                        <div style={{ position: "absolute", inset: 8, borderRadius: 7, border: "1px solid rgba(11,191,187,0.1)" }} />
                        <span style={{ fontSize: "1.5rem", color: "rgba(11,191,187,0.35)", position: "relative" }}>✦</span>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, rgba(11,191,187,0.55), transparent)" }} />
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)" }} />
                      </div>

                      {/* Card front */}
                      <div style={{
                        position: "absolute", inset: 0,
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        borderRadius: 12,
                        overflow: "hidden",
                        border: "1.5px solid rgba(201,168,76,0.5)",
                        boxShadow: "0 24px 60px rgba(0,0,0,0.8), 0 0 40px rgba(201,168,76,0.22)",
                      }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={IMAGES[card.id]} alt={card.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Shuffle button */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }}>
            <motion.button
              onClick={handleShuffle}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              disabled={isShuffling}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "0.65rem 1.6rem",
                borderRadius: 99,
                border: "1px solid rgba(11,191,187,0.3)",
                background: "rgba(11,191,187,0.06)",
                color: isShuffling ? "var(--muted)" : "var(--teal)",
                fontSize: "0.8rem", letterSpacing: "0.1em",
                cursor: isShuffling ? "not-allowed" : "pointer",
                transition: "color 0.2s, background 0.2s",
                fontFamily: "var(--font-cinzel), serif",
              }}
            >
              <motion.span
                animate={{ rotate: isShuffling ? 360 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ display: "inline-block", fontSize: "1rem" }}
              >
                ↺
              </motion.span>
              {isShuffling ? "Shuffling..." : "Shuffle the Deck"}
            </motion.button>
          </div>
        </ScrollReveal>

        {/* Meaning panel */}
        <AnimatePresence mode="wait">
          {chosenCard ? (
            <motion.div
              key={chosenCard.id}
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: "center", marginBottom: "4rem" }}
            >
              <div style={{
                display: "inline-block", padding: "0.3rem 1.1rem", borderRadius: 99,
                background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.22)", marginBottom: "1rem",
              }}>
                <span style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: "var(--gold)", textTransform: "uppercase" }}>
                  {chosenCard.name}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap", marginBottom: "1rem" }}>
                {chosenCard.keywords.map(kw => (
                  <span key={kw} style={{
                    fontSize: "0.68rem", padding: "0.2rem 0.7rem", borderRadius: 99,
                    border: "1px solid rgba(255,255,255,0.08)", color: "var(--muted)", letterSpacing: "0.05em",
                  }}>{kw}</span>
                ))}
              </div>
              <p style={{ color: "var(--warm)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: 500, margin: "0 auto 2rem", fontStyle: "italic" }}>
                &ldquo;{chosenCard.meaning}&rdquo;
              </p>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
                <motion.a href="#book" className="btn-teal" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  Book a Full Reading
                </motion.a>
                <motion.button
                  onClick={handleShuffle}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  style={{ background: "none", cursor: "pointer", fontSize: "0.82rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}
                >
                  <span style={{ fontSize: "1rem" }}>↺</span> Draw another
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ textAlign: "center", color: "var(--muted)", fontSize: "0.78rem", letterSpacing: "0.2em", marginBottom: "4rem" }}
            >
              ✦ &nbsp; focus · breathe · choose &nbsp; ✦
            </motion.p>
          )}
        </AnimatePresence>

        {/* Display cards — rest of the shuffled deck */}
        <ScrollReveal delay={0.2}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
            <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.05)" }} />
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase" }}>
              From the Major Arcana
            </span>
            <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.05)" }} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {displayCards.map((card, i) => (
              <motion.div
                key={`${card.id}-display-${shuffleKey}`}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 20px rgba(201,168,76,0.15)" }}
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid rgba(201,168,76,0.2)",
                  transition: "box-shadow 0.25s",
                  cursor: "default",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMAGES[card.id]} alt={card.name} style={{ width: "100%", aspectRatio: "3/5.2", objectFit: "cover", display: "block" }} />
                <div style={{
                  padding: "0.6rem 0.75rem",
                  background: "rgba(7,12,13,0.9)",
                  borderTop: "1px solid rgba(201,168,76,0.12)",
                  textAlign: "center",
                }}>
                  <p className="font-display" style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(201,168,76,0.7)", textTransform: "uppercase" }}>
                    {card.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
