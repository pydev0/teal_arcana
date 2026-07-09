"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

const WHATSAPP_NUMBER = "447907451315";

const readingTypes = [
  "30 Minute Tarot Reading — £25",
  "20 Minute Tarot Reading — £20",
  "3 Card Reading (Past, Present, Future) — £15",
  "1 Question Reading (3 Cards) — £10",
  "Word Affirmation Reading — £15",
  "Oracle / Angel Card Reading — £15",
  "Email Reading (Written) — £20",
  "30 Minute Audio Recording — £25",
];

export default function BookingForm() {
  const [form, setForm] = useState({ name: "", email: "", reading: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const lines = [
      `Hi! I'd like to book a reading.`,
      ``,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Reading: ${form.reading}`,
      form.message ? `Message: ${form.message}` : "",
    ].filter(Boolean).join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;
    window.open(url, "_blank");
  }

  const isFocused = (name: string) => focused === name;

  const fieldStyle = (name: string) => ({
    width: "100%",
    background: isFocused(name) ? "rgba(11,191,187,0.04)" : "rgba(255,255,255,0.06)",
    border: `1px solid ${isFocused(name) ? "rgba(11,191,187,0.45)" : "rgba(255,255,255,0.12)"}`,
    borderRadius: 12,
    padding: "0.85rem 1.1rem",
    color: "var(--warm)",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
    boxShadow: isFocused(name) ? "0 0 18px rgba(11,191,187,0.08)" : "none",
    resize: "none" as const,
    fontFamily: "inherit",
  });

  return (
    <section id="book" className="py-20 px-6 relative overflow-hidden section-backdrop">
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
          <p style={{ color: "var(--muted)", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", lineHeight: 1.75 }}>
            The cards are waiting. Fill in your details and I'll reach out within 24 hours.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          {/* Form card */}
          <div className="p-6 sm:p-10" style={{
            position: "relative",
            borderRadius: 24,
            border: "1px solid rgba(11,191,187,0.12)",
            background: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.3) 100%)",
            overflow: "hidden",
          }}>
            {/* Corner ornaments */}
            <div className="font-display" style={{ position: "absolute", top: "0.75rem", left: "1rem", fontSize: "1.2rem", color: "rgba(11,191,187,0.15)", userSelect: "none" }}>✦</div>
            <div className="font-display" style={{ position: "absolute", top: "0.75rem", right: "1rem", fontSize: "1.2rem", color: "rgba(11,191,187,0.15)", userSelect: "none" }}>✦</div>
            <div className="font-display" style={{ position: "absolute", bottom: "0.75rem", left: "1rem", fontSize: "1.2rem", color: "rgba(201,168,76,0.12)", userSelect: "none" }}>✦</div>
            <div className="font-display" style={{ position: "absolute", bottom: "0.75rem", right: "1rem", fontSize: "1.2rem", color: "rgba(201,168,76,0.12)", userSelect: "none" }}>✦</div>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 22 }}
            >
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      { id: "name",  label: "Your Name",      type: "text",  placeholder: "Jane Doe" },
                      { id: "email", label: "Email Address",  type: "email", placeholder: "jane@example.com" },
                    ].map(f => (
                      <div key={f.id} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                        <label style={{ fontSize: "0.78rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }} htmlFor={f.id}>
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
                    <label style={{ fontSize: "0.78rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }} htmlFor="reading">
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
                          <option key={t} value={t} style={{ background: "#FAFAF8", color: "var(--warm)" }}>{t}</option>
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
                    <label style={{ fontSize: "0.78rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }} htmlFor="message">
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

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(37,211,102,0.35)" }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: "100%", padding: "1rem",
                      background: "#25D366",
                      color: "#FFFFFF", fontWeight: 700, fontSize: "0.88rem",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      borderRadius: 12, cursor: "pointer",
                      border: "none", fontFamily: "var(--font-cinzel), serif",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    }}
                  >
                    <svg style={{ width: 18, height: 18 }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Book via WhatsApp
                  </motion.button>

                  <p style={{ fontSize: "0.75rem", color: "rgba(122,138,138,0.5)", textAlign: "center", letterSpacing: "0.04em" }}>
                    ✦ &nbsp; Responses within 24 hours &nbsp; · &nbsp; Your information stays private &nbsp; ✦
                  </p>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
