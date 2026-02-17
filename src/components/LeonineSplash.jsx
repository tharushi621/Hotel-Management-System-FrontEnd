import { useState, useEffect } from "react";

// ─── Precise Corner Ornament ──────────────────────────────────────────────────
function CornerOrnament({ flip = false, flipY = false, size = 72 }) {
  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: size,
        height: size,
        transform: `scale(${flip ? -1 : 1}, ${flipY ? -1 : 1})`,
        display: "block",
      }}
    >
      <defs>
        <linearGradient id={`cg-${flip}-${flipY}`} x1="0" y1="0" x2="72" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f5c842" />
          <stop offset="0.6" stopColor="#c8860a" />
          <stop offset="1" stopColor="#c8860a" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Outer L-bracket */}
      <path
        d="M8 8 L8 64"
        stroke={`url(#cg-${flip}-${flipY})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 8 L64 8"
        stroke={`url(#cg-${flip}-${flipY})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Inner L */}
      <path
        d="M16 16 L16 52"
        stroke="#c8860a"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M16 16 L52 16"
        stroke="#c8860a"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.35"
      />
      {/* Corner diamond */}
      <rect
        x="4" y="4" width="8" height="8"
        transform="rotate(45 8 8)"
        fill="#f5c842"
        opacity="0.95"
      />
      {/* Diamond accent along top */}
      <rect
        x="31" y="4.5" width="7" height="7"
        transform="rotate(45 34 8)"
        fill="none"
        stroke="#f5c842"
        strokeWidth="1"
        opacity="0.65"
      />
      <rect
        x="33.2" y="6.7" width="2.6" height="2.6"
        transform="rotate(45 34 8)"
        fill="#f5c842"
        opacity="0.8"
      />
      {/* Diamond accent along left */}
      <rect
        x="4.5" y="31" width="7" height="7"
        transform="rotate(45 8 34)"
        fill="none"
        stroke="#f5c842"
        strokeWidth="1"
        opacity="0.65"
      />
      <rect
        x="6.7" y="33.2" width="2.6" height="2.6"
        transform="rotate(45 8 34)"
        fill="#f5c842"
        opacity="0.8"
      />
      {/* Elegant curve flourish */}
      <path
        d="M22 22 Q30 14 23 9"
        stroke="#f5c842"
        strokeWidth="0.8"
        fill="none"
        opacity="0.4"
        strokeLinecap="round"
      />
      <path
        d="M22 22 Q14 30 9 23"
        stroke="#f5c842"
        strokeWidth="0.8"
        fill="none"
        opacity="0.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Horizontal Divider Rule ──────────────────────────────────────────────────
function GoldRule({ width = "100%", opacity = 1 }) {
  return (
    <svg
      viewBox="0 0 600 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, display: "block", opacity }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="ruleGrad" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c8860a" stopOpacity="0" />
          <stop offset="0.15" stopColor="#c8860a" stopOpacity="0.7" />
          <stop offset="0.35" stopColor="#f5c842" />
          <stop offset="0.5" stopColor="#fff8d0" />
          <stop offset="0.65" stopColor="#f5c842" />
          <stop offset="0.85" stopColor="#c8860a" stopOpacity="0.7" />
          <stop offset="1" stopColor="#c8860a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ruleGrad2" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c8860a" stopOpacity="0" />
          <stop offset="0.2" stopColor="#c8860a" stopOpacity="0.4" />
          <stop offset="0.5" stopColor="#c8860a" stopOpacity="0.5" />
          <stop offset="0.8" stopColor="#c8860a" stopOpacity="0.4" />
          <stop offset="1" stopColor="#c8860a" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Primary rule */}
      <line x1="0" y1="10" x2="600" y2="10" stroke="url(#ruleGrad)" strokeWidth="1.4" />
      {/* Secondary hairline */}
      <line x1="30" y1="14.5" x2="570" y2="14.5" stroke="url(#ruleGrad2)" strokeWidth="0.5" />
      {/* Centre medallion */}
      <rect x="291" y="1" width="18" height="18" transform="rotate(45 300 10)" fill="none" stroke="url(#ruleGrad)" strokeWidth="1.2" opacity="0.9" />
      <rect x="295.5" y="5.5" width="9" height="9" transform="rotate(45 300 10)" fill="none" stroke="#f5c842" strokeWidth="0.7" opacity="0.6" />
      <rect x="297.8" y="7.8" width="4.4" height="4.4" transform="rotate(45 300 10)" fill="#f5c842" opacity="0.95" />
      {/* Quarter diamonds */}
      {[120, 480].map((cx, i) => (
        <g key={i}>
          <rect x={cx - 4} y={10 - 4} width={8} height={8} transform={`rotate(45 ${cx} 10)`} fill="none" stroke="#f5c842" strokeWidth="0.9" opacity="0.6" />
          <rect x={cx - 1.6} y={10 - 1.6} width={3.2} height={3.2} transform={`rotate(45 ${cx} 10)`} fill="#f5c842" opacity="0.75" />
        </g>
      ))}
      {/* Micro dots */}
      {[60, 190, 410, 540].map((cx, i) => (
        <circle key={i} cx={cx} cy="10" r="1.4" fill="#c8860a" opacity="0.4" />
      ))}
    </svg>
  );
}

// ─── Centre medallion rule (smaller, for section breaks) ─────────────────────
function ThinRule({ show, delay = 0, widthPct = "60%" }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: widthPct,
        margin: "0 auto",
        opacity: show ? 1 : 0,
        transform: show ? "scaleX(1)" : "scaleX(0)",
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
        transformOrigin: "center",
      }}
    >
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(200,134,10,0.6) 50%, #f5c842)" }} />
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <div style={{ width: 4, height: 4, background: "#c8860a", transform: "rotate(45deg)" }} />
        <div style={{ width: 6, height: 6, background: "#f5c842", transform: "rotate(45deg)" }} />
        <div style={{ width: 4, height: 4, background: "#c8860a", transform: "rotate(45deg)" }} />
      </div>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg, transparent, rgba(200,134,10,0.6) 50%, #f5c842)" }} />
    </div>
  );
}

// ─── Ambient Mist Layer ───────────────────────────────────────────────────────
function AmbientMist({ active }) {
  if (!active) return null;
  return (
    <>
      <style>{`
        @keyframes mistLeft {
          0%   { opacity: 0; transform: translateX(-20px) scale(0.8); }
          25%  { opacity: 1; }
          75%  { opacity: 0.7; transform: translateX(30px) scale(1.1); }
          100% { opacity: 0; transform: translateX(50px) scale(1.15); }
        }
        @keyframes mistRight {
          0%   { opacity: 0; transform: translateX(20px) scale(0.8); }
          25%  { opacity: 1; }
          75%  { opacity: 0.7; transform: translateX(-30px) scale(1.1); }
          100% { opacity: 0; transform: translateX(-50px) scale(1.15); }
        }
      `}</style>
      {/* Left mist panels */}
      {[
        { top: 5,  h: 40, dur: 9,   del: 0,    op: 0.55 },
        { top: 35, h: 38, dur: 10,  del: 1.5,  op: 0.45 },
        { top: 62, h: 38, dur: 8.5, del: 0.8,  op: 0.4  },
      ].map((m, i) => (
        <div key={`lm-${i}`} style={{
          position: "absolute",
          left: 0,
          top: `${m.top}%`,
          width: "28%",
          height: `${m.h}%`,
          background: "radial-gradient(ellipse at 10% 50%, rgba(15,45,18,0.75) 0%, rgba(8,22,10,0.5) 50%, transparent 80%)",
          filter: "blur(40px)",
          animation: `mistLeft ${m.dur}s ease-in-out ${m.del}s infinite`,
          pointerEvents: "none",
          zIndex: 4,
        }} />
      ))}
      {/* Right mist panels */}
      {[
        { top: 5,  h: 40, dur: 9,   del: 0.5,  op: 0.55 },
        { top: 35, h: 38, dur: 10,  del: 2,    op: 0.45 },
        { top: 62, h: 38, dur: 8.5, del: 1.2,  op: 0.4  },
      ].map((m, i) => (
        <div key={`rm-${i}`} style={{
          position: "absolute",
          right: 0,
          top: `${m.top}%`,
          width: "28%",
          height: `${m.h}%`,
          background: "radial-gradient(ellipse at 90% 50%, rgba(15,45,18,0.75) 0%, rgba(8,22,10,0.5) 50%, transparent 80%)",
          filter: "blur(40px)",
          animation: `mistRight ${m.dur}s ease-in-out ${m.del}s infinite`,
          pointerEvents: "none",
          zIndex: 4,
        }} />
      ))}
      {/* Central ambient glow */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "55%",
        height: "65%",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(20,55,22,0.28) 0%, rgba(10,30,12,0.12) 55%, transparent 78%)",
        filter: "blur(50px)",
        pointerEvents: "none",
        zIndex: 3,
      }} />
      {/* Subtle gold centre warmth */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "40%",
        height: "50%",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(200,134,10,0.1) 0%, rgba(245,200,66,0.05) 45%, transparent 70%)",
        filter: "blur(35px)",
        pointerEvents: "none",
        zIndex: 3,
      }} />
    </>
  );
}

// ─── MAIN SPLASH ──────────────────────────────────────────────────────────────
export default function LeonineSplash({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const steps = [
      [1, 150],
      [2, 600],
      [3, 1400],
      [4, 2400],
      [5, 3500],
    ];
    const timers = steps.map(([p, t]) => setTimeout(() => setPhase(p), t));
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnter = () => {
    setPhase(6);
    setTimeout(() => onComplete?.(), 1100);
  };

  const exiting = phase >= 6;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        /* Gold shimmer on title */
        @keyframes goldShimmer {
          0%   { background-position: -250% center; }
          100% { background-position: 250% center; }
        }

        /* Logo entrance */
        @keyframes logoReveal {
          0%   { opacity: 0; transform: scale(0.72) translateY(20px); filter: brightness(3) blur(20px); }
          45%  { opacity: 1; filter: brightness(1.4) blur(0); transform: scale(1.04) translateY(-3px); }
          65%  { transform: scale(0.97) translateY(1px); }
          80%  { transform: scale(1.015); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: brightness(1) blur(0); }
        }

        /* Logo persistent glow */
        @keyframes logoGlow {
          0%, 100% { filter: drop-shadow(0 0 18px rgba(245,200,66,0.35)) drop-shadow(0 0 50px rgba(200,134,10,0.2)); }
          50%       { filter: drop-shadow(0 0 32px rgba(245,200,66,0.65)) drop-shadow(0 0 80px rgba(200,134,10,0.4)); }
        }

        /* Halo pulse ring */
        @keyframes haloExpand {
          0%   { transform: translate(-50%, -50%) scale(0.3); opacity: 0.7; }
          100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
        }

        /* Button pulse */
        @keyframes btnPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245,200,66,0.2), 0 8px 32px rgba(200,134,10,0.4); }
          50%       { box-shadow: 0 0 0 10px rgba(245,200,66,0), 0 12px 52px rgba(200,134,10,0.7); }
        }

        /* Shimmer sweep on button */
        @keyframes btnShimmer {
          0%   { left: -80%; }
          100% { left: 120%; }
        }

        /* Border frame lines draw in */
        @keyframes drawH {
          from { stroke-dashoffset: 900; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes drawV {
          from { stroke-dashoffset: 600; }
          to   { stroke-dashoffset: 0; }
        }

        .logo-anim {
          animation: logoReveal 2s cubic-bezier(0.16,1,0.3,1) both, logoGlow 4.5s ease-in-out 2.2s infinite;
        }
        .title-shimmer {
          background: linear-gradient(
            90deg,
            #c8860a 0%, #f5c842 18%, #fff4a0 32%, #f5c842 46%, #c8860a 60%, #f5c842 74%, #fff4a0 86%, #c8860a 100%
          );
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldShimmer 6s linear 2.5s infinite;
        }
      `}</style>

      {/* ══ ROOT ══ */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#030806",
        overflow: "hidden",
        transition: "opacity 1.1s cubic-bezier(0.4,0,0.2,1), transform 1.1s ease",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.04)" : "scale(1)",
      }}>

        {/* ── Deep radial bg ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 90% 80% at 50% 42%, #0d2211 0%, #081209 55%, #030806 100%)",
          opacity: phase >= 1 ? 1 : 0,
          transition: "opacity 2s ease",
        }} />

        {/* ── Subtle grain ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          opacity: 0.18,
          pointerEvents: "none",
        }} />

        {/* ── Fine horizontal stone lines ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(0deg, transparent 0px, transparent 4px, rgba(245,200,66,0.006) 4px, rgba(245,200,66,0.006) 5px)",
          pointerEvents: "none",
        }} />

        {/* ══ MIST ══ */}
        <AmbientMist active={phase >= 2} />

        {/* ══ PRECISE BORDER FRAME ══ */}
        {/* SVG border — single source of truth, perfectly aligned */}
        <svg
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            inset: "12px",
            width: "calc(100% - 24px)",
            height: "calc(100% - 24px)",
            pointerEvents: "none",
            zIndex: 20,
            opacity: phase >= 1 ? 1 : 0,
            transition: "opacity 0.6s ease 0.3s",
          }}
        >
          <defs>
            <linearGradient id="borderH" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c8860a" stopOpacity="0.08" />
              <stop offset="0.08" stopColor="#c8860a" stopOpacity="0.7" />
              <stop offset="0.25" stopColor="#f5c842" />
              <stop offset="0.5" stopColor="#fff4a0" />
              <stop offset="0.75" stopColor="#f5c842" />
              <stop offset="0.92" stopColor="#c8860a" stopOpacity="0.7" />
              <stop offset="1" stopColor="#c8860a" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="borderH2" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c8860a" stopOpacity="0" />
              <stop offset="0.15" stopColor="#c8860a" stopOpacity="0.35" />
              <stop offset="0.5" stopColor="#c8860a" stopOpacity="0.4" />
              <stop offset="0.85" stopColor="#c8860a" stopOpacity="0.35" />
              <stop offset="1" stopColor="#c8860a" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="borderV" x1="0" y1="0" x2="0" y2="600" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c8860a" stopOpacity="0.08" />
              <stop offset="0.08" stopColor="#c8860a" stopOpacity="0.55" />
              <stop offset="0.3" stopColor="#f5c842" stopOpacity="0.7" />
              <stop offset="0.5" stopColor="#f5c842" stopOpacity="0.8" />
              <stop offset="0.7" stopColor="#f5c842" stopOpacity="0.7" />
              <stop offset="0.92" stopColor="#c8860a" stopOpacity="0.55" />
              <stop offset="1" stopColor="#c8860a" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="borderV2" x1="0" y1="0" x2="0" y2="600" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c8860a" stopOpacity="0" />
              <stop offset="0.15" stopColor="#c8860a" stopOpacity="0.3" />
              <stop offset="0.5" stopColor="#c8860a" stopOpacity="0.35" />
              <stop offset="0.85" stopColor="#c8860a" stopOpacity="0.3" />
              <stop offset="1" stopColor="#c8860a" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Outer primary border */}
          <line x1="0" y1="1" x2="1000" y2="1" stroke="url(#borderH)" strokeWidth="1.8"
            strokeDasharray="1000" strokeDashoffset={phase >= 1 ? 0 : 1000}
            style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1) 0.4s" }} />
          <line x1="0" y1="599" x2="1000" y2="599" stroke="url(#borderH)" strokeWidth="1.8"
            strokeDasharray="1000" strokeDashoffset={phase >= 1 ? 0 : 1000}
            style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1) 0.6s" }} />
          <line x1="1" y1="0" x2="1" y2="600" stroke="url(#borderV)" strokeWidth="1.8"
            strokeDasharray="600" strokeDashoffset={phase >= 1 ? 0 : 600}
            style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1) 0.5s" }} />
          <line x1="999" y1="0" x2="999" y2="600" stroke="url(#borderV)" strokeWidth="1.8"
            strokeDasharray="600" strokeDashoffset={phase >= 1 ? 0 : 600}
            style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1) 0.7s" }} />

          {/* Inner secondary border */}
          <line x1="24" y1="24" x2="976" y2="24" stroke="url(#borderH2)" strokeWidth="0.7"
            strokeDasharray="952" strokeDashoffset={phase >= 1 ? 0 : 952}
            style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1) 0.8s" }} />
          <line x1="24" y1="576" x2="976" y2="576" stroke="url(#borderH2)" strokeWidth="0.7"
            strokeDasharray="952" strokeDashoffset={phase >= 1 ? 0 : 952}
            style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1) 0.9s" }} />
          <line x1="24" y1="24" x2="24" y2="576" stroke="url(#borderV2)" strokeWidth="0.7"
            strokeDasharray="552" strokeDashoffset={phase >= 1 ? 0 : 552}
            style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1) 0.85s" }} />
          <line x1="976" y1="24" x2="976" y2="576" stroke="url(#borderV2)" strokeWidth="0.7"
            strokeDasharray="552" strokeDashoffset={phase >= 1 ? 0 : 552}
            style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1) 0.95s" }} />

          {/* Top centre diamond on outer border */}
          {phase >= 1 && (
            <g opacity="1" style={{ transition: "opacity 0.4s ease 1.4s" }}>
              <rect x="491" y="-8" width="18" height="18" transform="rotate(45 500 1)" fill="none" stroke="#f5c842" strokeWidth="1.2" opacity="0.85" />
              <rect x="496" y="-3" width="8" height="8" transform="rotate(45 500 1)" fill="#f5c842" opacity="0.95" />
            </g>
          )}
          {/* Bottom centre diamond */}
          {phase >= 1 && (
            <g>
              <rect x="491" y="590" width="18" height="18" transform="rotate(45 500 599)" fill="none" stroke="#f5c842" strokeWidth="1.2" opacity="0.85" />
              <rect x="496" y="595" width="8" height="8" transform="rotate(45 500 599)" fill="#f5c842" opacity="0.95" />
            </g>
          )}
          {/* Left / Right centre diamonds */}
          {phase >= 1 && (
            <>
              <rect x="-8" y="292" width="18" height="18" transform="rotate(45 1 300)" fill="none" stroke="#f5c842" strokeWidth="1.2" opacity="0.8" />
              <rect x="-3" y="297" width="8" height="8" transform="rotate(45 1 300)" fill="#f5c842" opacity="0.9" />
              <rect x="990" y="292" width="18" height="18" transform="rotate(45 999 300)" fill="none" stroke="#f5c842" strokeWidth="1.2" opacity="0.8" />
              <rect x="995" y="297" width="8" height="8" transform="rotate(45 999 300)" fill="#f5c842" opacity="0.9" />
            </>
          )}

          {/* Inner border corner accent diamonds */}
          {phase >= 1 && [
            [24, 24], [976, 24], [24, 576], [976, 576]
          ].map(([cx, cy], i) => (
            <g key={i}>
              <rect x={cx - 5} y={cy - 5} width="10" height="10" transform={`rotate(45 ${cx} ${cy})`}
                fill="none" stroke="#f5c842" strokeWidth="1" opacity="0.7" />
              <rect x={cx - 2} y={cy - 2} width="4" height="4" transform={`rotate(45 ${cx} ${cy})`}
                fill="#f5c842" opacity="0.85" />
            </g>
          ))}

          {/* Quarter-point accent diamonds on outer border */}
          {phase >= 1 && [250, 750].map((cx, i) => (
            <g key={i}>
              <rect x={cx - 5} y={-4} width="10" height="10" transform={`rotate(45 ${cx} 1)`}
                fill="none" stroke="#c8860a" strokeWidth="1" opacity="0.55" />
              <rect x={cx - 2} y={-1} width="4" height="4" transform={`rotate(45 ${cx} 1)`}
                fill="#c8860a" opacity="0.6" />
              <rect x={cx - 5} y={594} width="10" height="10" transform={`rotate(45 ${cx} 599)`}
                fill="none" stroke="#c8860a" strokeWidth="1" opacity="0.55" />
              <rect x={cx - 2} y={597} width="4" height="4" transform={`rotate(45 ${cx} 599)`}
                fill="#c8860a" opacity="0.6" />
            </g>
          ))}
          {phase >= 1 && [150, 450].map((cy, i) => (
            <g key={i}>
              <rect x={-4} y={cy - 5} width="10" height="10" transform={`rotate(45 1 ${cy})`}
                fill="none" stroke="#c8860a" strokeWidth="1" opacity="0.5" />
              <rect x={-1} y={cy - 2} width="4" height="4" transform={`rotate(45 1 ${cy})`}
                fill="#c8860a" opacity="0.55" />
              <rect x={994} y={cy - 5} width="10" height="10" transform={`rotate(45 999 ${cy})`}
                fill="none" stroke="#c8860a" strokeWidth="1" opacity="0.5" />
              <rect x={997} y={cy - 2} width="4" height="4" transform={`rotate(45 999 ${cy})`}
                fill="#c8860a" opacity="0.55" />
            </g>
          ))}
        </svg>

        {/* ══ CORNER ORNAMENTS — pinned precisely to border corners ══ */}
        {[
          { style: { top: 12, left: 12 }, flip: false, flipY: false, delay: "0.8s" },
          { style: { top: 12, right: 12 }, flip: true,  flipY: false, delay: "0.9s" },
          { style: { bottom: 12, left: 12 }, flip: false, flipY: true,  delay: "1.0s" },
          { style: { bottom: 12, right: 12 }, flip: true,  flipY: true,  delay: "1.1s" },
        ].map((c, i) => (
          <div key={i} style={{
            position: "absolute",
            ...c.style,
            zIndex: 25,
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "scale(1)" : "scale(0.3)",
            transition: `opacity 0.8s ease ${c.delay}, transform 0.8s cubic-bezier(0.34,1.56,0.64,1) ${c.delay}`,
          }}>
            <CornerOrnament flip={c.flip} flipY={c.flipY} size={70} />
          </div>
        ))}

        {/* ══ CENTRE CONTENT ══ */}
        <div style={{
          position: "relative",
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          padding: "0 40px",
          maxWidth: 520,
          width: "100%",
          textAlign: "center",
        }}>

          {/* Halo rings — timed with logo */}
          {phase >= 3 && [0, 1, 2].map(i => (
            <div key={i} style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 260,
              height: 260,
              borderRadius: "50%",
              border: `1px solid rgba(245,200,66,${0.4 - i * 0.1})`,
              pointerEvents: "none",
              animation: `haloExpand ${3 + i * 0.7}s ease-out ${i * 1.2}s infinite`,
            }} />
          ))}

          {/* Heritage subtitle */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(0.85rem, 2vw, 1.05rem)",
            fontWeight: 400,
            color: "rgba(245,200,66,0.65)",
            letterSpacing: "0.38em",
            marginBottom: 20,
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 1s ease 0.1s, transform 1s ease 0.1s",
          }}>
            ශ්‍රී ලංකා &nbsp;·&nbsp; Est. 2019
          </div>

          {/* Thin rule above logo */}
          <div style={{
            width: "55%",
            marginBottom: 22,
            opacity: phase >= 4 ? 1 : 0,
            transition: "opacity 0.8s ease 0.25s",
          }}>
            <ThinRule show={phase >= 4} delay={0.25} widthPct="100%" />
          </div>

          {/* Logo */}
          <div style={{
            width: "clamp(170px, 26vw, 230px)",
            height: "clamp(170px, 26vw, 230px)",
            marginBottom: 20,
            flexShrink: 0,
            position: "relative",
            opacity: phase >= 3 ? 1 : 0,
            transition: "opacity 0.1s",
          }}>
            {phase >= 3 && (
              <img
                src="/logo.png"
                alt="Leonine Villa & Sanctuary"
                className="logo-anim"
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              />
            )}
          </div>

          {/* LEONINE — main title */}
          <h1
            className="title-shimmer"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "clamp(2rem, 5.5vw, 3.4rem)",
              fontWeight: 900,
              letterSpacing: "0.16em",
              lineHeight: 1,
              margin: 0,
              marginBottom: 8,
              opacity: phase >= 4 ? 1 : 0,
              transform: phase >= 4 ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
            }}
          >
            LEONINE
          </h1>

          {/* Subtitle */}
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(0.58rem, 1.5vw, 0.78rem)",
            letterSpacing: "0.5em",
            color: "rgba(245,200,66,0.58)",
            fontWeight: 500,
            textTransform: "uppercase",
            marginBottom: 22,
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 1s ease 0.35s, transform 1s ease 0.35s",
          }}>
            Villa &amp; Sanctuary
          </div>

          {/* Rule */}
          <div style={{
            width: "72%",
            marginBottom: 18,
            opacity: phase >= 4 ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}>
            <GoldRule opacity={phase >= 4 ? 1 : 0} />
          </div>

          {/* Tagline */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(0.98rem, 2.2vw, 1.18rem)",
            fontWeight: 300,
            color: "rgba(190,220,185,0.78)",
            letterSpacing: "0.05em",
            lineHeight: 1.75,
            margin: 0,
            marginBottom: 20,
            maxWidth: 340,
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 1s ease 0.65s, transform 1s ease 0.65s",
          }}>
            Where the Jungle Whispers<br />Ancient Stories
          </p>

          {/* Second rule */}
          <div style={{
            width: "42%",
            marginBottom: 28,
            opacity: phase >= 4 ? 1 : 0,
            transition: "opacity 0.8s ease 0.82s",
          }}>
            <ThinRule show={phase >= 4} delay={0.82} widthPct="100%" />
          </div>

          {/* Enter button */}
          <div style={{
            opacity: phase >= 5 ? 1 : 0,
            transform: phase >= 5 ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}>
            <button
              onClick={handleEnter}
              style={{
                position: "relative",
                padding: "14px 60px",
                fontFamily: "'Cinzel', serif",
                fontSize: "0.68rem",
                letterSpacing: "0.45em",
                fontWeight: 600,
                textTransform: "uppercase",
                color: "#0a140a",
                background: "linear-gradient(135deg, #c8860a 0%, #f5c842 40%, #ffe082 55%, #c8860a 100%)",
                border: "none",
                cursor: "pointer",
                overflow: "hidden",
                outline: "none",
                animation: "btnPulse 3s ease-in-out infinite",
                transition: "transform 0.22s ease, filter 0.22s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.filter = "brightness(1.14)";
                e.currentTarget.style.transform = "scale(1.06)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.filter = "brightness(1)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Enter
              {/* Shimmer sweep */}
              <span style={{
                position: "absolute",
                top: 0,
                left: "-80%",
                width: "50%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
                animation: "btnShimmer 3.5s ease-in-out 2s infinite",
                pointerEvents: "none",
              }} />
            </button>
          </div>

        </div>

        {/* ══ BOTTOM STRIP ══ */}
        <div style={{
          position: "absolute",
          bottom: 22,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
          opacity: phase >= 5 ? 1 : 0,
          transition: "opacity 0.9s ease 0.2s",
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}>
          <div style={{ width: 36, height: 1, background: "linear-gradient(90deg, transparent, rgba(245,200,66,0.35))" }} />
          {["Sri Lanka", "Nature", "Culture", "Heritage"].map((w, i) => (
            <span key={w} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.58rem",
                letterSpacing: "0.38em",
                color: "rgba(245,200,66,0.38)",
                textTransform: "uppercase",
              }}>{w}</span>
              {i < 3 && (
                <span style={{
                  width: 4,
                  height: 4,
                  background: "rgba(245,200,66,0.3)",
                  transform: "rotate(45deg)",
                  display: "inline-block",
                  flexShrink: 0,
                }} />
              )}
            </span>
          ))}
          <div style={{ width: 36, height: 1, background: "linear-gradient(270deg, transparent, rgba(245,200,66,0.35))" }} />
        </div>

      </div>
    </>
  );
}