"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);

  const springX = useSpring(x, { stiffness: 70, damping: 22 });
  const springY = useSpring(y, { stiffness: 70, damping: 22 });

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: 560, height: 560,
        x: springX, y: springY,
        translateX: "-50%", translateY: "-50%",
        pointerEvents: "none",
        zIndex: 1,
        background: "radial-gradient(circle, rgba(11,191,187,0.06) 0%, transparent 65%)",
        borderRadius: "50%",
      }}
    />
  );
}
