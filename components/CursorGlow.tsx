"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);

  const springX = useSpring(x, { stiffness: 70, damping: 22 });
  const springY = useSpring(y, { stiffness: 70, damping: 22 });

  // Slightly delayed second glow for a richer feel
  const springX2 = useSpring(x, { stiffness: 40, damping: 28 });
  const springY2 = useSpring(y, { stiffness: 40, damping: 28 });

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <>
      {/* Primary teal glow */}
      <motion.div
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 500, height: 500,
          x: springX, y: springY,
          translateX: "-50%", translateY: "-50%",
          pointerEvents: "none",
          zIndex: 0,
          background: "radial-gradient(circle, rgba(11,191,187,0.07) 0%, rgba(11,191,187,0.02) 40%, transparent 65%)",
          borderRadius: "50%",
        }}
      />
      {/* Trailing gold glow — slightly delayed, larger, softer */}
      <motion.div
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 700, height: 700,
          x: springX2, y: springY2,
          translateX: "-50%", translateY: "-50%",
          pointerEvents: "none",
          zIndex: 0,
          background: "radial-gradient(circle, rgba(201,168,76,0.035) 0%, transparent 55%)",
          borderRadius: "50%",
        }}
      />
    </>
  );
}
