"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const topRow = [
  { name: "Claire McDonnell", text: "Thank you for my very detailed reading on Sunday. It really resonated with me and made so much sense. I loved your enthusiasm and the time you took to explain everything during the reading." },
  { name: "Leonie Bold", text: "I had my first tarot card reading last night and I thought it was amazing! Not only did the cards I chose stand out to me but there was names mentioned of people I know close to me. I will 100% go again. Thank you Stacey x" },
  { name: "Lisa Austin", text: "Myself and a friend had our first tarot reading with Stacey last night. Cannot put into words how amazing this lady is! So calm and relaxed, made you feel totally at ease and so accurate with a lot of things she told us both. I had goosebumps and tears. Would recommend Stacey xx" },
  { name: "Trudy Ratcliffe", text: "Had a reading tonight, can't recommend enough. Absolute brilliant, nearly had me in tears with how precise she was about me. Utterly amazing." },
  { name: "Louise Lou", text: "I had a wonderful reading from Stacey, a great way to start the year. She is a very talented lady. It came straight from the heart, with good solid advice and guidance and absolutely no fluff. Would definitely recommend Stacey without hesitation. A very talented and genuine soul. Thank you xx" },
  { name: "Dawn Barnes", text: "I have just had a reading, all I can say — OMG amazing. Stacey knows nothing about my life but just told me everything that is going on at the moment. I would so recommend her if you are looking for a 100% true reading. She is one amazing lady x" },
];

const bottomRow = [
  { name: "Kate Addison", text: "Spot on reading from Stacey! Great insights into my life, definitely recommend her as a tarot reader!" },
  { name: "Tracy Horsfall", text: "Well where do I start! I had a wonderful reading by this very talented young lady, who really knows nothing about me and she was 100% right in the reading she gave me. I would encourage anyone to have a reading with Stacey. Thank you so much xx" },
  { name: "Shaun Gorman", text: "Very good reading, made a lot of sense. Would recommend to anybody." },
  { name: "Lizzie Marzec", text: "Stacey has done my cards on numerous occasions. Spot on everything. Fabulous Stacey. Thank you xx" },
  { name: "Peter Richard", text: "Had a reading, was a bit sceptical but after listening to her and the reading I was shocked how accurate she was. I was very pleased with the overall experience. Thank you again Stacey." },
];

function Stars() {
  return (
    <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} style={{ color: "var(--gold)", fontSize: "0.75rem" }}>★</span>
      ))}
    </div>
  );
}

function ReviewCard({ name, text }: { name: string; text: string }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14,
        padding: "1.1rem 1.2rem",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: 300,
        minWidth: 300,
        flexShrink: 0,
      }}
    >
      <Stars />
      <p style={{ color: "var(--muted)", fontSize: "0.82rem", lineHeight: 1.6, flex: 1, fontStyle: "italic" }}>
        &ldquo;{text}&rdquo;
      </p>
      <p style={{ color: "var(--warm)", fontSize: "0.72rem", marginTop: 10, fontWeight: 600 }}>
        — {name}
      </p>
    </div>
  );
}

function MarqueeRow({ items, direction }: { items: typeof topRow; direction: "left" | "right" }) {
  const doubled = [...items, ...items];
  return (
    <div
      style={{
        overflow: "hidden",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className={direction === "left" ? "marquee-left" : "marquee-right"}
        style={{
          display: "flex",
          gap: 16,
          width: "max-content",
        }}
      >
        {doubled.map((r, i) => (
          <ReviewCard key={`${r.name}-${i}`} name={r.name} text={r.text} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section id="testimonials" className="relative py-28 overflow-hidden" ref={ref}>
      {/* Background orb */}
      <div
        style={{
          position: "absolute", right: "-5%", top: "20%",
          width: 340, height: 340, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(11,191,187,0.07) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
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
            <span className="gradient-text">saying about Stacey.</span>
          </h2>
        </ScrollReveal>
      </div>

      {/* Dual-row marquee */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <MarqueeRow items={topRow} direction="left" />
        <MarqueeRow items={bottomRow} direction="right" />
      </div>

      {/* Facebook link */}
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal delay={0.3} style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
            Read more reviews on{" "}
            <a
              href="https://www.facebook.com/share/18it52xq3d/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--teal)", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              Stacey&apos;s Facebook page →
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
