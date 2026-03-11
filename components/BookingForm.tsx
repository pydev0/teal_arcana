"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const readingTypes = [
  "Single Card Pull",
  "Three Card Spread",
  "Celtic Cross",
  "Love & Relationships",
  "Career & Purpose",
  "Year Ahead",
  "Mind · Body · Spirit",
  "Monthly Forecast",
  "Shadow Work",
  "Intuitive Reading",
];

type Status = "idle" | "sending" | "success" | "error";

export default function BookingForm() {
  const [form, setForm] = useState({ name: "", email: "", reading: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm({ name: "", email: "", reading: "", message: "" });
    } catch { setStatus("error"); }
  }

  const isFocused = (name: string) => focused === name;

  const fieldStyle = (name: string) => ({
    width: "100%",
    background: isFocused(name) ? "rgba(11,191,187,0.04)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${isFocused(name) ? "rgba(11,191,187,0.45)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: 12,
    padding: "0.85rem 1.1rem",
    color: "var(--warm)",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
    boxShadow: isFocused(name) ? "0 0 18px rgba(11,191,187,0.08)" : "none",
    resize: "none" as const,
    fontFamily: "inherit",
  });

  return (
    <section id="book" className="py-28 px-6 relative overflow-hidden">
      {/* Orbs */}
      <div style={{ position: "absolute", left: "-5%", top: "20%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(11,191,187,0.07) 0%, transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "-5%", bottom: "15%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <ScrollReveal style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
            <div style={{ height: 1, width: 30, background: "var(--teal)", opacity: 0.5 }} />
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.35em", color: "var(--teal)", textTransform: "uppercase" }}>
              Begin Your Journey
            </span>
            <div style={{ height: 1, width: 30, background: "var(--teal)", opacity: 0.5 }} />
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, marginBottom: "0.75rem" }}>
            Book a <span className="gradient-text">Reading</span>
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.65 }}>
            The cards are waiting. Fill in your details and I'll reach out within 24 hours.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          {/* Form card */}
          <div className="p-6 sm:p-10" style={{
            position: "relative",
            borderRadius: 24,
            border: "1px solid rgba(11,191,187,0.12)",
            background: "linear-gradient(135deg, rgba(11,191,187,0.04) 0%, rgba(7,12,13,0.9) 60%, rgba(201,168,76,0.03) 100%)",
            overflow: "hidden",
          }}>
            {/* Corner ornaments */}
            <div className="font-display" style={{ position: "absolute", top: "0.75rem", left: "1rem", fontSize: "1.2rem", color: "rgba(11,191,187,0.15)", userSelect: "none" }}>✦</div>
            <div className="font-display" style={{ position: "absolute", top: "0.75rem", right: "1rem", fontSize: "1.2rem", color: "rgba(11,191,187,0.15)", userSelect: "none" }}>✦</div>
            <div className="font-display" style={{ position: "absolute", bottom: "0.75rem", left: "1rem", fontSize: "1.2rem", color: "rgba(201,168,76,0.12)", userSelect: "none" }}>✦</div>
            <div className="font-display" style={{ position: "absolute", bottom: "0.75rem", right: "1rem", fontSize: "1.2rem", color: "rgba(201,168,76,0.12)", userSelect: "none" }}>✦</div>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.9, y: 12 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ textAlign: "center", padding: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 12, -12, 0] }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    style={{ fontSize: "3.5rem" }}
                  >
                    🔮
                  </motion.div>
                  <h3 className="font-display" style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--warm)" }}>
                    The cards have heard you.
                  </h3>
                  <p style={{ color: "var(--muted)", maxWidth: 300, lineHeight: 1.7 }}>
                    I'll reach out within 24 hours to confirm your reading. Stay open.
                  </p>
                  <div className="teal-line" style={{ width: 60 }} />
                  <button
                    onClick={() => setStatus("idle")}
                    style={{ fontSize: "0.78rem", color: "var(--teal)", textDecoration: "underline", textUnderlineOffset: 4, cursor: "pointer", background: "none" }}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  exit={{ scale: 0.97, y: -8 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "flex", flexDirection: "column", gap: 22 }}
                >
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      { id: "name",  label: "Your Name",      type: "text",  placeholder: "Jane Doe" },
                      { id: "email", label: "Email Address",  type: "email", placeholder: "jane@example.com" },
                    ].map(f => (
                      <div key={f.id} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                        <label style={{ fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }} htmlFor={f.id}>
                          {f.label}
                        </label>
                        <input
                          id={f.id} name={f.id} type={f.type} required
                          value={form[f.id as keyof typeof form]}
                          onChange={handleChange}
                          placeholder={f.placeholder}
                          onFocus={() => setFocused(f.id)}
                          onBlur={() => setFocused(null)}
                          style={fieldStyle(f.id)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Reading type */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <label style={{ fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }} htmlFor="reading">
                      Type of Reading
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        id="reading" name="reading" required
                        value={form.reading} onChange={handleChange}
                        onFocus={() => setFocused("reading")}
                        onBlur={() => setFocused(null)}
                        style={{ ...fieldStyle("reading"), appearance: "none", cursor: "pointer" }}
                      >
                        <option value="" disabled style={{ background: "var(--dark)", color: "var(--muted)" }}>
                          Choose your reading...
                        </option>
                        {readingTypes.map(t => (
                          <option key={t} value={t} style={{ background: "#0D1517", color: "var(--warm)" }}>{t}</option>
                        ))}
                      </select>
                      {/* Custom chevron */}
                      <div style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--teal)", pointerEvents: "none", fontSize: "0.7rem" }}>
                        ▾
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <label style={{ fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }} htmlFor="message">
                      Your Question <span style={{ color: "rgba(122,138,138,0.45)", textTransform: "none" }}>(optional)</span>
                    </label>
                    <textarea
                      id="message" name="message" rows={4}
                      value={form.message} onChange={handleChange}
                      placeholder="Share what's on your mind, a specific question, or a situation you'd like guidance on..."
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      style={fieldStyle("message")}
                    />
                  </div>

                  {status === "error" && (
                    <p style={{ color: "#FF8080", fontSize: "0.82rem", textAlign: "center" }}>
                      Something went wrong. Please try again.
                    </p>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(11,191,187,0.35)" }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: "100%", padding: "1rem",
                      background: "linear-gradient(135deg, var(--teal) 0%, #0AADAA 100%)",
                      color: "#070C0D", fontWeight: 700, fontSize: "0.88rem",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      borderRadius: 12, cursor: status === "sending" ? "not-allowed" : "pointer",
                      opacity: status === "sending" ? 0.6 : 1,
                      border: "none", fontFamily: "var(--font-cinzel), serif",
                      transition: "opacity 0.2s",
                    }}
                  >
                    {status === "sending" ? (
                      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        <svg style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} viewBox="0 0 24 24" fill="none">
                          <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Reaching the cards...
                      </span>
                    ) : "Request a Reading ✦"}
                  </motion.button>

                  <p style={{ fontSize: "0.7rem", color: "rgba(122,138,138,0.5)", textAlign: "center", letterSpacing: "0.04em" }}>
                    ✦ &nbsp; Responses within 24 hours &nbsp; · &nbsp; Your information stays private &nbsp; ✦
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
