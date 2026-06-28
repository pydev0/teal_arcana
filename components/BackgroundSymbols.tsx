"use client";

import { useEffect, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   Real tree silhouette (CC0 public domain from freesvg.org)
   with animated butterflies, fog, and falling leaves.
   ────────────────────────────────────────────────────────────── */

interface ButterflyData {
  id: number;
  size: number;
  color: string;
  pathDur: number;
  flapSpeed: number;
  delay: number;
}

const BUTTERFLIES: ButterflyData[] = [
  { id: 1, size: 20, color: "#0BBFBB", pathDur: 22, flapSpeed: 0.15, delay: 0 },
  { id: 2, size: 16, color: "#6EE7DF", pathDur: 28, flapSpeed: 0.12, delay: 4 },
  { id: 3, size: 24, color: "#C9A84C", pathDur: 32, flapSpeed: 0.18, delay: 8 },
  { id: 4, size: 14, color: "#0BBFBB", pathDur: 20, flapSpeed: 0.14, delay: 2 },
  { id: 5, size: 18, color: "#6EE7DF", pathDur: 26, flapSpeed: 0.16, delay: 12 },
  { id: 6, size: 22, color: "#C9A84C", pathDur: 35, flapSpeed: 0.13, delay: 6 },
  { id: 7, size: 12, color: "#0BBFBB", pathDur: 18, flapSpeed: 0.17, delay: 15 },
  { id: 8, size: 26, color: "#6EE7DF", pathDur: 30, flapSpeed: 0.11, delay: 10 },
  { id: 9, size: 15, color: "#C9A84C", pathDur: 24, flapSpeed: 0.15, delay: 18 },
  { id: 10, size: 19, color: "#0BBFBB", pathDur: 27, flapSpeed: 0.14, delay: 7 },
];

export function BackgroundSymbols() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <style>{`
        @keyframes flutter {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(70deg); }
          100% { transform: rotateY(0deg); }
        }
        @keyframes fogPulse1 {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.8; }
        }
        @keyframes fogDrift1 {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); }
          33% { transform: translateX(3vw) translateY(-2vh) scale(1.05); }
          66% { transform: translateX(-2vw) translateY(1vh) scale(0.95); }
        }
        @keyframes fogDrift2 {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-4vw) translateY(-2vh); }
        }
        @keyframes fogDrift3 {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); opacity: 0.8; }
          50% { transform: translateX(5vw) translateY(-3vh) scale(1.1); opacity: 1; }
        }
        @keyframes fogDrift4 {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); opacity: 0.8; }
          50% { transform: translateX(-5vw) translateY(3vh) scale(1.1); opacity: 1; }
        }

        /* Butterfly flight paths */
        @keyframes bfly1 {
          0%   { transform: translate(-10vw, 30vh) rotate(10deg); }
          15%  { transform: translate(25vw, 15vh) rotate(-5deg); }
          30%  { transform: translate(50vw, 40vh) rotate(15deg); }
          50%  { transform: translate(80vw, 20vh) rotate(-10deg); }
          65%  { transform: translate(110vw, 50vh) rotate(8deg); }
          80%  { transform: translate(60vw, 70vh) rotate(-15deg); }
          90%  { transform: translate(20vw, 55vh) rotate(5deg); }
          100% { transform: translate(-10vw, 30vh) rotate(10deg); }
        }
        @keyframes bfly2 {
          0%   { transform: translate(110vw, 60vh) rotate(-8deg); }
          20%  { transform: translate(70vw, 25vh) rotate(12deg); }
          40%  { transform: translate(30vw, 50vh) rotate(-5deg); }
          55%  { transform: translate(-10vw, 35vh) rotate(10deg); }
          70%  { transform: translate(15vw, 80vh) rotate(-12deg); }
          85%  { transform: translate(55vw, 65vh) rotate(6deg); }
          100% { transform: translate(110vw, 60vh) rotate(-8deg); }
        }
        @keyframes bfly3 {
          0%   { transform: translate(50vw, -10vh) rotate(5deg); }
          18%  { transform: translate(20vw, 25vh) rotate(-10deg); }
          35%  { transform: translate(60vw, 50vh) rotate(15deg); }
          50%  { transform: translate(85vw, 30vh) rotate(-8deg); }
          68%  { transform: translate(40vw, 75vh) rotate(12deg); }
          82%  { transform: translate(10vw, 90vh) rotate(-5deg); }
          92%  { transform: translate(30vw, 110vh) rotate(8deg); }
          100% { transform: translate(50vw, -10vh) rotate(5deg); }
        }
        @keyframes bfly4 {
          0%   { transform: translate(90vw, 110vh) rotate(-12deg); }
          20%  { transform: translate(60vw, 70vh) rotate(8deg); }
          40%  { transform: translate(20vw, 40vh) rotate(-15deg); }
          60%  { transform: translate(-5vw, 60vh) rotate(10deg); }
          75%  { transform: translate(35vw, 15vh) rotate(-6deg); }
          90%  { transform: translate(75vw, 45vh) rotate(12deg); }
          100% { transform: translate(90vw, 110vh) rotate(-12deg); }
        }
        @keyframes bfly5 {
          0%   { transform: translate(-10vw, 80vh) rotate(8deg); }
          16%  { transform: translate(30vw, 60vh) rotate(-10deg); }
          33%  { transform: translate(70vw, 30vh) rotate(14deg); }
          50%  { transform: translate(110vw, 45vh) rotate(-6deg); }
          66%  { transform: translate(80vw, 80vh) rotate(10deg); }
          83%  { transform: translate(40vw, 95vh) rotate(-12deg); }
          100% { transform: translate(-10vw, 80vh) rotate(8deg); }
        }
        @keyframes bfly6 {
          0%   { transform: translate(50vw, 110vh) rotate(-5deg); }
          14%  { transform: translate(80vw, 75vh) rotate(10deg); }
          28%  { transform: translate(100vw, 40vh) rotate(-8deg); }
          42%  { transform: translate(70vw, 10vh) rotate(12deg); }
          58%  { transform: translate(30vw, -5vh) rotate(-10deg); }
          72%  { transform: translate(5vw, 30vh) rotate(6deg); }
          86%  { transform: translate(20vw, 70vh) rotate(-14deg); }
          100% { transform: translate(50vw, 110vh) rotate(-5deg); }
        }
        @keyframes bfly7 {
          0%   { transform: translate(110vw, 10vh) rotate(6deg); }
          25%  { transform: translate(65vw, 45vh) rotate(-12deg); }
          50%  { transform: translate(15vw, 20vh) rotate(8deg); }
          75%  { transform: translate(-5vw, 65vh) rotate(-6deg); }
          100% { transform: translate(110vw, 10vh) rotate(6deg); }
        }
        @keyframes bfly8 {
          0%   { transform: translate(-10vw, 50vh) rotate(-10deg); }
          20%  { transform: translate(20vw, 20vh) rotate(14deg); }
          40%  { transform: translate(55vw, 60vh) rotate(-8deg); }
          60%  { transform: translate(90vw, 30vh) rotate(10deg); }
          80%  { transform: translate(110vw, 70vh) rotate(-12deg); }
          95%  { transform: translate(50vw, 90vh) rotate(6deg); }
          100% { transform: translate(-10vw, 50vh) rotate(-10deg); }
        }
        @keyframes bfly9 {
          0%   { transform: translate(30vw, -10vh) rotate(12deg); }
          20%  { transform: translate(75vw, 20vh) rotate(-8deg); }
          35%  { transform: translate(100vw, 55vh) rotate(10deg); }
          55%  { transform: translate(60vw, 85vh) rotate(-14deg); }
          70%  { transform: translate(15vw, 70vh) rotate(6deg); }
          85%  { transform: translate(-5vw, 40vh) rotate(-10deg); }
          100% { transform: translate(30vw, -10vh) rotate(12deg); }
        }
        @keyframes bfly10 {
          0%   { transform: translate(80vw, 95vh) rotate(-6deg); }
          18%  { transform: translate(45vw, 55vh) rotate(12deg); }
          36%  { transform: translate(10vw, 80vh) rotate(-10deg); }
          54%  { transform: translate(-5vw, 45vh) rotate(8deg); }
          72%  { transform: translate(35vw, 10vh) rotate(-14deg); }
          90%  { transform: translate(70vw, 35vh) rotate(6deg); }
          100% { transform: translate(80vw, 95vh) rotate(-6deg); }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {/* ═══════════ FOG / MIST ═══════════ */}
        <div style={{
          position: "fixed", inset: 0, display: "flex",
          justifyContent: "center", alignItems: "center",
          pointerEvents: "none",
        }}>
          <div style={{
            position: "absolute",
            width: "70vw", height: "80vh",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(10,158,155,0.06) 0%, rgba(10,158,155,0.02) 40%, transparent 70%)",
            animation: "fogPulse1 10s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute",
            top: "5%",
            width: "60vw", height: "40vh",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(10,158,155,0.04) 0%, transparent 65%)",
            animation: "fogDrift1 18s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute",
            bottom: "5%",
            width: "55vw", height: "35vh",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(184,146,58,0.05) 0%, transparent 60%)",
            animation: "fogDrift2 22s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute",
            left: "-5%", top: "30%",
            width: "35vw", height: "50vh",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(10,158,155,0.04) 0%, transparent 60%)",
            animation: "fogDrift3 25s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute",
            right: "-5%", top: "25%",
            width: "35vw", height: "50vh",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(10,158,155,0.04) 0%, transparent 60%)",
            animation: "fogDrift4 20s ease-in-out infinite",
          }} />
        </div>

        {/* ═══════════ TREE — full opacity, no effects ═══════════ */}
        <div style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/tree.png"
            alt=""
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              objectPosition: "center bottom",
            }}
          />
        </div>

      </div>

      {/* ═══════════ BUTTERFLIES — rendered above all content ═══════════ */}
      <div
        aria-hidden="true"
        className="butterfly-layer"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9999,
          overflow: "hidden",
        }}
      >
        {mounted && BUTTERFLIES.map((b) => (
          <div
            key={b.id}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: 0,
              height: 0,
              animation: `bfly${b.id} ${b.pathDur}s ${b.delay}s ease-in-out infinite`,
            }}
          >
            <svg
              width={b.size * 2.5}
              height={b.size * 2}
              viewBox={`-${b.size} -${b.size} ${b.size * 2} ${b.size * 2}`}
              style={{ overflow: "visible", transform: "translate(-50%, -50%)" }}
            >
              <g style={{ transformOrigin: "0px 0px", animation: `flutter ${b.flapSpeed}s ease-in-out infinite` }}>
                <path
                  d={`M0,0 C-${b.size * 0.6},-${b.size * 0.9} -${b.size},-${b.size * 0.4} -${b.size * 0.3},0 C-${b.size * 0.8},${b.size * 0.3} -${b.size * 0.5},${b.size * 0.7} 0,${b.size * 0.2}Z`}
                  fill={b.color}
                  opacity="0.65"
                />
              </g>
              <g style={{ transformOrigin: "0px 0px", animation: `flutter ${b.flapSpeed}s ${b.flapSpeed / 2}s ease-in-out infinite` }}>
                <path
                  d={`M0,0 C${b.size * 0.6},-${b.size * 0.9} ${b.size},-${b.size * 0.4} ${b.size * 0.3},0 C${b.size * 0.8},${b.size * 0.3} ${b.size * 0.5},${b.size * 0.7} 0,${b.size * 0.2}Z`}
                  fill={b.color}
                  opacity="0.65"
                />
              </g>
              <line x1="0" y1={-b.size * 0.2} x2="0" y2={b.size * 0.3} stroke={b.color} strokeWidth="1" opacity="0.7" />
              <path d={`M0,-${b.size * 0.2} C-${b.size * 0.15},-${b.size * 0.4} -${b.size * 0.2},-${b.size * 0.45} -${b.size * 0.18},-${b.size * 0.5}`} stroke={b.color} strokeWidth="0.5" fill="none" opacity="0.5" />
              <path d={`M0,-${b.size * 0.2} C${b.size * 0.15},-${b.size * 0.4} ${b.size * 0.2},-${b.size * 0.45} ${b.size * 0.18},-${b.size * 0.5}`} stroke={b.color} strokeWidth="0.5" fill="none" opacity="0.5" />
            </svg>
          </div>
        ))}
      </div>
    </>
  );
}
