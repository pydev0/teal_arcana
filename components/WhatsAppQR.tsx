"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import QRCode from "react-qr-code";
import { ScrollReveal } from "./ScrollReveal";

const WHATSAPP_NUMBER = "1234567890";
const WHATSAPP_MESSAGE = "Hi! I'd like to book a tarot reading with Teal Arcana 🔮";
const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function WhatsAppQR() {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrInView = useInView(qrRef, { once: true, margin: "-60px 0px" });

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div
            className="relative rounded-3xl overflow-hidden p-6 sm:p-10 md:p-14 border-shimmer"
            style={{
              background: "linear-gradient(135deg, rgba(11,191,187,0.1) 0%, rgba(11,191,187,0.03) 50%, rgba(201,168,76,0.07) 100%)",
              border: "1px solid rgba(11,191,187,0.15)",
            }}
          >
            {/* Background big ✦ */}
            <div className="font-display" style={{
              position: "absolute", right: "-2%", top: "50%", transform: "translateY(-50%)",
              fontSize: "clamp(80px, 14vw, 160px)", color: "rgba(11,191,187,0.05)",
              fontWeight: 700, pointerEvents: "none", userSelect: "none",
            }}>
              ✦
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between" style={{ position: "relative", zIndex: 1, gap: "2rem" }}>

              {/* Text */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
                  <div style={{ height: 1, width: 30, background: "var(--teal)", opacity: 0.5 }} />
                  <span style={{ fontSize: "0.7rem", letterSpacing: "0.35em", color: "var(--teal)", textTransform: "uppercase" }}>Quick Connect</span>
                  <div style={{ height: 1, width: 30, background: "var(--teal)", opacity: 0.5 }} />
                </div>
                <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "0.75rem" }}>
                  Reach Me on{" "}
                  <span className="gradient-text">WhatsApp</span>
                </h2>
                <p style={{ color: "var(--muted)", fontSize: "0.95rem", maxWidth: 360, lineHeight: 1.65, marginBottom: "1.5rem" }}>
                  Scan the QR code to open a WhatsApp chat directly. Ask anything — I'm happy to answer before you book.
                </p>
                <motion.a
                  href={whatsappURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(37,211,102,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  className="sm:inline-flex"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "0.85rem 1.6rem", borderRadius: 9999,
                    background: "#25D366", color: "#fff",
                    fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.04em", textTransform: "uppercase",
                  }}
                >
                  <svg style={{ width: 18, height: 18 }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </motion.a>
              </div>

              {/* QR Code — desktop only (useless on mobile) */}
              <div ref={qrRef} className="hidden sm:flex" style={{ flexDirection: "column", alignItems: "center", gap: 12, flexShrink: 0 }}>
                <motion.div
                  animate={qrInView ? { scale: 1, rotate: 0 } : { scale: 0.82, rotate: -5 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{ position: "relative" }}
                >
                  {/* Pulse ring */}
                  <motion.div
                    animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.65, 0.35] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute", inset: -10, borderRadius: 20,
                      border: "1px solid rgba(11,191,187,0.3)", pointerEvents: "none",
                    }}
                  />
                  <div style={{ padding: 14, borderRadius: 16, background: "#fff" }}>
                    <QRCode value={whatsappURL} size={148} bgColor="#ffffff" fgColor="#070C0D" />
                  </div>
                </motion.div>
                <p style={{ fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Scan to open WhatsApp
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
