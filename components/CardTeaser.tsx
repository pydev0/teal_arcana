import Link from "next/link";

export default function CardTeaser() {
  return (
    <section className="relative py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden p-10 md:p-14"
          style={{
            background: "linear-gradient(135deg, rgba(11,191,187,0.12) 0%, rgba(11,191,187,0.04) 50%, rgba(201,168,76,0.08) 100%)",
            border: "1px solid rgba(11,191,187,0.2)",
          }}
        >
          {/* Background big symbol */}
          <div
            className="absolute pointer-events-none select-none font-display"
            style={{
              right: "-2%",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "clamp(80px, 15vw, 180px)",
              color: "rgba(11,191,187,0.06)",
              fontWeight: 700,
            }}
          >
            ✦
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p
                className="text-xs tracking-[0.3em] uppercase mb-3"
                style={{ color: "var(--teal)" }}
              >
                Free · No sign up needed
              </p>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  marginBottom: "0.75rem",
                }}
              >
                Not sure yet?
                <br />
                Draw a card <span className="gradient-text">right now.</span>
              </h2>
              <p style={{ color: "var(--muted)", fontSize: "0.95rem", maxWidth: "360px", lineHeight: 1.6 }}>
                Pull from the Major Arcana and get a message for this exact moment. No account, no payment — just a card and its meaning.
              </p>
            </div>

            <div className="flex flex-col items-center gap-5 shrink-0">
              {/* Animated cards preview */}
              <div className="flex gap-3">
                {["☽", "★", "☀"].map((sym, i) => (
                  <div
                    key={sym}
                    className="anim-float"
                    style={{
                      animationDelay: `${i * 0.5}s`,
                      width: 52,
                      height: 76,
                      borderRadius: 10,
                      border: "1px solid rgba(11,191,187,0.25)",
                      background: "var(--surface)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.4rem",
                    }}
                  >
                    {sym}
                  </div>
                ))}
              </div>
              <Link href="/cards" className="btn-teal whitespace-nowrap">
                Draw Your Card →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
