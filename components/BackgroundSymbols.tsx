"use client";

const ITEMS = [
  { s: "♈",   t: "10%", l: "8%",  sz: "1.1rem", op: 0.22, anim: 1, dur: 20, del: 0   },
  { s: "☿",   t: "20%", l: "75%", sz: "1.3rem", op: 0.19, anim: 3, dur: 24, del: 3   },
  { s: "V",   t: "35%", l: "15%", sz: "0.9rem", op: 0.17, anim: 2, dur: 28, del: 5   },
  { s: "☽",   t: "50%", l: "80%", sz: "1.4rem", op: 0.21, anim: 4, dur: 18, del: 1   },
  { s: "♏",   t: "65%", l: "12%", sz: "1.0rem", op: 0.19, anim: 5, dur: 22, del: 4   },
  { s: "X",   t: "75%", l: "70%", sz: "0.85rem",op: 0.17, anim: 1, dur: 26, del: 2   },
  { s: "✦",   t: "85%", l: "25%", sz: "1.3rem", op: 0.24, anim: 3, dur: 16, del: 0   },
  { s: "XXI", t: "8%",  l: "60%", sz: "0.75rem",op: 0.17, anim: 2, dur: 30, del: 6   },
  { s: "♎",   t: "30%", l: "45%", sz: "1.0rem", op: 0.16, anim: 4, dur: 25, del: 2   },
  { s: "△",   t: "55%", l: "55%", sz: "1.2rem", op: 0.16, anim: 5, dur: 20, del: 4   },
  { s: "♃",   t: "42%", l: "88%", sz: "1.1rem", op: 0.19, anim: 1, dur: 27, del: 1   },
  { s: "⊕",   t: "18%", l: "30%", sz: "1.0rem", op: 0.17, anim: 3, dur: 19, del: 5   },
  { s: "▽",   t: "78%", l: "60%", sz: "1.2rem", op: 0.16, anim: 2, dur: 29, del: 8   },
  { s: "♄",   t: "90%", l: "40%", sz: "1.1rem", op: 0.19, anim: 4, dur: 21, del: 2   },
  { s: "♓",   t: "25%", l: "90%", sz: "1.0rem", op: 0.17, anim: 5, dur: 17, del: 3   },
  { s: "I",   t: "5%",  l: "40%", sz: "0.8rem", op: 0.14, anim: 2, dur: 33, del: 0   },
  { s: "☀",   t: "60%", l: "35%", sz: "1.1rem", op: 0.14, anim: 1, dur: 23, del: 8   },
  { s: "♉",   t: "45%", l: "20%", sz: "1.0rem", op: 0.13, anim: 4, dur: 36, del: 10  },
  { s: "♋",   t: "70%", l: "85%", sz: "1.1rem", op: 0.13, anim: 3, dur: 31, del: 6   },
  { s: "XIII",t: "15%", l: "55%", sz: "0.7rem", op: 0.14, anim: 5, dur: 26, del: 4   },
];

const css =
  ITEMS.map((item, i) =>
    `.bgsym-${i}{animation:wander${item.anim} ${item.dur}s ${item.del}s ease-in-out infinite;}`
  ).join("") +
  `@media(max-width:640px){` +
  ITEMS.map((item, i) =>
    `.bgsym-${i}{animation-duration:${Math.round(item.dur * 2.5)}s;opacity:${+(item.op * 0.18).toFixed(3)};}`
  ).join("") +
  `}`;

export function BackgroundSymbols() {
  return (
    <>
      <style>{css}</style>
      <div
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}
      >
        {ITEMS.map((item, i) => (
          <span
            key={i}
            className={`bgsym-${i}`}
            style={{
              position: "absolute",
              top: item.t,
              left: item.l,
              fontSize: item.sz,
              opacity: item.op,
              color: "var(--teal)",
              fontFamily: "Georgia, serif",
              userSelect: "none",
              lineHeight: 1,
              display: "block",
            }}
          >
            {item.s}
          </span>
        ))}
      </div>
    </>
  );
}
