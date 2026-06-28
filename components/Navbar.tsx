"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "About", href: "/#about" },
    { label: "Readings", href: "/#services" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(0,0,0,0.4)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "1.6rem" }}>🔮</span>
          <span style={{ fontFamily: "var(--font-cinzel-dec), serif", fontSize: "1.25rem", fontWeight: 700, letterSpacing: "0.1em", background: "linear-gradient(120deg, #0BBFBB 0%, #E8C97A 60%, #C9A84C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Teal Arcana
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link-underline text-sm transition-colors duration-200 hover:text-white"
              style={{ color: "var(--muted)", letterSpacing: "0.02em" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#book"
            className="btn-teal"
            style={{ padding: "0.5rem 1.4rem", fontSize: "0.8rem" }}
          >
            Book Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden transition-colors"
          style={{ color: "var(--muted)" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: -8, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden px-6 pb-6 pt-2"
            style={{ background: "rgba(0,0,0,0.85)", borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <ul className="flex flex-col gap-5">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors" style={{ color: "var(--muted)" }} onClick={() => setMenuOpen(false)}>
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/#book" className="btn-teal inline-block" onClick={() => setMenuOpen(false)}>Book Now</a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
