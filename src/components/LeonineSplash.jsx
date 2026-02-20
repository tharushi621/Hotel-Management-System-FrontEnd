import { useState, useEffect } from "react";

// ─── Precise Corner Ornament ────────────────────────────────────────────────────
function CornerOrnament({ flip = false, flipY = false, size = 72 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      style={{
        transform: `scale(${flip ? -1 : 1}, ${flipY ? -1 : 1})`,
        transformOrigin: "center",
      }}
    >
      {/* Outer L-bracket */}
      <path d="M4 4 L4 32 M4 4 L32 4" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" />
      {/* Inner L */}
      <path d="M10 10 L10 26 M10 10 L26 10" stroke="#c9a84c" strokeWidth="0.6" strokeLinecap="round" opacity="0.6" />
      {/* Corner diamond */}
      <rect x="1.5" y="1.5" width="5" height="5" fill="#c9a84c" transform="rotate(45 4 4)" />
      {/* Diamond accent along top */}
      <rect x="17.5" y="1.5" width="3.5" height="3.5" fill="#c9a84c" opacity="0.7" transform="rotate(45 19 3)" />
      {/* Diamond accent along left */}
      <rect x="1.5" y="17.5" width="3.5" height="3.5" fill="#c9a84c" opacity="0.7" transform="rotate(45 3 19)" />
      {/* Elegant curve flourish */}
      <path d="M28 4 Q20 4 12 12" stroke="#c9a84c" strokeWidth="0.5" opacity="0.35" fill="none" />
    </svg>
  );
}

// ─── Horizontal Divider Rule ────────────────────────────────────────────────────
function GoldRule({ width = "100%", opacity = 1 }) {
  return (
    <svg
      width={width}
      height="18"
      viewBox="0 0 600 18"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      style={{ opacity }}
    >
      {/* Primary rule */}
      <line x1="0" y1="9" x2="600" y2="9" stroke="url(#gr)" strokeWidth="0.8" />
      {/* Secondary hairline */}
      <line x1="40" y1="12" x2="560" y2="12" stroke="url(#gr)" strokeWidth="0.3" opacity="0.4" />
      {/* Centre medallion */}
      <rect x="296" y="5" width="8" height="8" fill="#c9a84c" transform="rotate(45 300 9)" />
      {/* Quarter diamonds */}
      {[120, 480].map((cx, i) => (
        <rect key={i} x={cx - 3} y="6" width="6" height="6" fill="#c9a84c" opacity="0.55" transform={`rotate(45 ${cx} 9)`} />
      ))}
      {/* Micro dots */}
      {[60, 190, 410, 540].map((cx, i) => (
        <circle key={i} cx={cx} cy="9" r="1.2" fill="#c9a84c" opacity="0.35" />
      ))}
      <defs>
        <linearGradient id="gr" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#c9a84c" stopOpacity="0" />
          <stop offset="20%"  stopColor="#c9a84c" stopOpacity="0.8" />
          <stop offset="50%"  stopColor="#f0d080" stopOpacity="1" />
          <stop offset="80%"  stopColor="#c9a84c" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Centre medallion rule (smaller, for section breaks) ─────────────────────
function ThinRule({ show, delay = 0, widthPct = "60%" }) {
  return (
    <div
      style={{
        width: widthPct,
        opacity: show ? 1 : 0,
        transition: `opacity 0.8s ease ${delay}s`,
        margin: "0 auto",
      }}
    >
      <GoldRule width="100%" />
    </div>
  );
}

// ─── Ambient Mist Layer ───────────────────────────────────────────────────────
function AmbientMist({ active }) {
  if (!active) return null;
  return (
    <>
      {/* Left mist panels */}
      {[
        { top: 5,  h: 40, dur: 9,   del: 0,   op: 0.55 },
        { top: 35, h: 38, dur: 10,  del: 1.5, op: 0.45 },
        { top: 62, h: 38, dur: 8.5, del: 0.8, op: 0.4  },
      ].map((m, i) => (
        <div key={`lm-${i}`} style={{
          position: "absolute", top: `${m.top}%`, left: 0,
          width: "28%", height: `${m.h}%`,
          background: "linear-gradient(90deg, rgba(180,200,170,0.13) 0%, rgba(180,200,170,0.04) 60%, transparent 100%)",
          opacity: m.op,
          animation: `mistDrift ${m.dur}s ease-in-out ${m.del}s infinite alternate`,
          pointerEvents: "none",
        }} />
      ))}
      {/* Right mist panels */}
      {[
        { top: 5,  h: 40, dur: 9,   del: 0.5, op: 0.55 },
        { top: 35, h: 38, dur: 10,  del: 2,   op: 0.45 },
        { top: 62, h: 38, dur: 8.5, del: 1.2, op: 0.4  },
      ].map((m, i) => (
        <div key={`rm-${i}`} style={{
          position: "absolute", top: `${m.top}%`, right: 0,
          width: "28%", height: `${m.h}%`,
          background: "linear-gradient(270deg, rgba(180,200,170,0.13) 0%, rgba(180,200,170,0.04) 60%, transparent 100%)",
          opacity: m.op,
          animation: `mistDrift ${m.dur}s ease-in-out ${m.del}s infinite alternate`,
          pointerEvents: "none",
        }} />
      ))}
      {/* Central ambient glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)", width: "60%", height: "60%",
        background: "radial-gradient(ellipse at center, rgba(201,168,76,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Subtle gold centre warmth */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)", width: "40%", height: "40%",
        background: "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 65%)",
        animation: "warmPulse 6s ease-in-out infinite",
        pointerEvents: "none",
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
    // Fade the whole splash to dark (matches home page bg) then unmount
    setPhase(6);
    setTimeout(() => onComplete?.(), 1000);
  };

  const exiting = phase >= 6;

  return (
    <>
      <style>{`
        @keyframes mistDrift {
          from { transform: translateX(0px) scaleY(1); }
          to   { transform: translateX(18px) scaleY(1.04); }
        }
        @keyframes warmPulse {
          0%,100% { opacity: 0.6; transform: translate(-50%,-50%) scale(1); }
          50%      { opacity: 1;   transform: translate(-50%,-50%) scale(1.15); }
        }
        @keyframes haloExpand {
          0%   { transform: translate(-50%,-50%) scale(0.6); opacity: 0.6; }
          100% { transform: translate(-50%,-50%) scale(1.8); opacity: 0; }
        }
        @keyframes logoReveal {
          0%   { clip-path: inset(100% 0 0 0); opacity: 0; }
          100% { clip-path: inset(0% 0 0 0);   opacity: 1; }
        }
        @keyframes shimmerSweep {
          0%   { left: -80%; }
          100% { left: 160%; }
        }
        @keyframes shimmerText {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .splash-shimmer-text {
          background: linear-gradient(90deg, #c9a84c 0%, #f0d080 40%, #d4891a 60%, #c9a84c 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerText 4s linear infinite;
        }
      `}</style>

      {/* ══ ROOT — covers entire viewport ══
          On exit: fades to #050e06 which matches the home page dark bg perfectly */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#050e06",
          opacity: exiting ? 0 : 1,
          transition: exiting ? "opacity 1s ease" : "none",
          pointerEvents: exiting ? "none" : "auto",
        }}
      >
        {/* ── Deep radial bg ── */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 40%, #0d2410 0%, #070f08 45%, #030806 100%)",
          opacity: phase >= 1 ? 1 : 0,
          transition: "opacity 2s ease",
        }} />

        {/* ── Subtle grain ── */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E\")",
          pointerEvents: "none",
        }} />

        {/* ── Fine horizontal stone lines ── */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,168,76,0.025) 40px)",
          pointerEvents: "none",
        }} />

        {/* ══ MIST ══ */}
        <AmbientMist active={phase >= 2} />

        {/* ══ PRECISE BORDER FRAME ══ */}
        <svg
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            opacity: phase >= 1 ? 1 : 0,
            transition: "opacity 0.6s ease 0.3s",
          }}
          preserveAspectRatio="none"
          viewBox="0 0 1000 600"
        >
          <defs>
            <linearGradient id="borderGrad" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
              <stop offset="0%"   stopColor="#c9a84c" stopOpacity="0.3" />
              <stop offset="30%"  stopColor="#f0d080" stopOpacity="0.85" />
              <stop offset="50%"  stopColor="#c9a84c" stopOpacity="1" />
              <stop offset="70%"  stopColor="#f0d080" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="borderGradV" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%"   stopColor="#c9a84c" stopOpacity="0.3" />
              <stop offset="30%"  stopColor="#f0d080" stopOpacity="0.85" />
              <stop offset="50%"  stopColor="#c9a84c" stopOpacity="1" />
              <stop offset="70%"  stopColor="#f0d080" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Outer primary border — top / bottom */}
          <line x1="12" y1="12" x2="988" y2="12" stroke="url(#borderGrad)" strokeWidth="0.9"
            strokeDasharray="976" strokeDashoffset={phase >= 1 ? 0 : 1000}
            style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1) 0.4s" }} />
          <line x1="12" y1="588" x2="988" y2="588" stroke="url(#borderGrad)" strokeWidth="0.9"
            strokeDasharray="976" strokeDashoffset={phase >= 1 ? 0 : 1000}
            style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1) 0.6s" }} />
          {/* Outer primary border — left / right */}
          <line x1="12" y1="12" x2="12" y2="588" stroke="url(#borderGradV)" strokeWidth="0.9"
            strokeDasharray="576" strokeDashoffset={phase >= 1 ? 0 : 600}
            style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1) 0.5s" }} />
          <line x1="988" y1="12" x2="988" y2="588" stroke="url(#borderGradV)" strokeWidth="0.9"
            strokeDasharray="576" strokeDashoffset={phase >= 1 ? 0 : 600}
            style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1) 0.7s" }} />

          {/* Inner secondary border */}
          <line x1="24" y1="24" x2="976" y2="24" stroke="url(#borderGrad)" strokeWidth="0.4"
            strokeDasharray="952" strokeOpacity="0.45" strokeDashoffset={phase >= 1 ? 0 : 952}
            style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1) 0.8s" }} />
          <line x1="24" y1="576" x2="976" y2="576" stroke="url(#borderGrad)" strokeWidth="0.4"
            strokeDasharray="952" strokeOpacity="0.45" strokeDashoffset={phase >= 1 ? 0 : 952}
            style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1) 0.9s" }} />
          <line x1="24" y1="24" x2="24" y2="576" stroke="url(#borderGradV)" strokeWidth="0.4"
            strokeDasharray="552" strokeOpacity="0.45" strokeDashoffset={phase >= 1 ? 0 : 552}
            style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1) 0.85s" }} />
          <line x1="976" y1="24" x2="976" y2="576" stroke="url(#borderGradV)" strokeWidth="0.4"
            strokeDasharray="552" strokeOpacity="0.45" strokeDashoffset={phase >= 1 ? 0 : 552}
            style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1) 0.95s" }} />

          {/* Top centre diamond */}
          {phase >= 1 && <rect x="496" y="8"   width="8" height="8" fill="#c9a84c" transform="rotate(45 500 12)"  opacity="0.9" />}
          {/* Bottom centre diamond */}
          {phase >= 1 && <rect x="496" y="584" width="8" height="8" fill="#c9a84c" transform="rotate(45 500 588)" opacity="0.9" />}
          {/* Left / Right centre diamonds */}
          {phase >= 1 && <>
            <rect x="8"   y="296" width="8" height="8" fill="#c9a84c" transform="rotate(45 12 300)"  opacity="0.9" />
            <rect x="984" y="296" width="8" height="8" fill="#c9a84c" transform="rotate(45 988 300)" opacity="0.9" />
          </>}

          {/* Inner border corner accent diamonds */}
          {phase >= 1 && [[24,24],[976,24],[24,576],[976,576]].map(([cx,cy],i) => (
            <rect key={i} x={cx-3} y={cy-3} width="6" height="6" fill="#c9a84c"
              transform={`rotate(45 ${cx} ${cy})`} opacity="0.5" />
          ))}

          {/* Quarter-point accent diamonds */}
          {phase >= 1 && [250,750].map((cx,i) => (
            <rect key={i} x={cx-3} y="9" width="6" height="6" fill="#c9a84c"
              transform={`rotate(45 ${cx} 12)`} opacity="0.5" />
          ))}
          {phase >= 1 && [150,450].map((cy,i) => (
            <rect key={i} x="9" y={cy-3} width="6" height="6" fill="#c9a84c"
              transform={`rotate(45 12 ${cy})`} opacity="0.4" />
          ))}
        </svg>

        {/* ══ CORNER ORNAMENTS ══ */}
        {[
          { style: { top: 12, left: 12 },    flip: false, flipY: false, delay: "0.8s" },
          { style: { top: 12, right: 12 },   flip: true,  flipY: false, delay: "0.9s" },
          { style: { bottom: 12, left: 12 }, flip: false, flipY: true,  delay: "1.0s" },
          { style: { bottom: 12, right: 12 },flip: true,  flipY: true,  delay: "1.1s" },
        ].map((c, i) => (
          <div key={i} style={{
            position: "absolute", ...c.style,
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "scale(1)" : "scale(0.3)",
            transition: `opacity 0.8s ease ${c.delay}, transform 0.8s cubic-bezier(0.34,1.56,0.64,1) ${c.delay}`,
          }}>
            <CornerOrnament flip={c.flip} flipY={c.flipY} size={72} />
          </div>
        ))}

        {/* ══ CENTRE CONTENT ══ */}
        <div style={{
          position: "relative", zIndex: 10,
          display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
          padding: "0 48px", maxWidth: 560, width: "100%",
        }}>
          {/* Halo rings */}
          {phase >= 3 && [0,1,2].map(i => (
            <div key={i} style={{
              position: "absolute", top: "50%", left: "50%",
              width: 90, height: 90, borderRadius: "50%",
              border: "1px solid rgba(201,168,76,0.4)",
              animation: `haloExpand 3s ease-out ${i * 1}s infinite`,
              pointerEvents: "none",
            }} />
          ))}

          {/* Heritage subtitle */}
          <div style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.6rem", letterSpacing: "0.45em",
            textTransform: "uppercase", color: "rgba(201,168,76,0.65)",
            marginBottom: 12,
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 1s ease 0.1s, transform 1s ease 0.1s",
          }}>
            ශ්‍රී ලංකා &nbsp;·&nbsp; Est. 2019
          </div>

          {/* Thin rule above logo */}
          <div style={{
            width: "100%", marginBottom: 18,
            opacity: phase >= 4 ? 1 : 0,
            transition: "opacity 0.8s ease 0.25s",
          }}>
            <ThinRule show={phase >= 4} delay={0.25} widthPct="100%" />
          </div>

          {/* Logo */}
          <div style={{
            width: 72, height: 72, marginBottom: 18, position: "relative",
            opacity: phase >= 3 ? 1 : 0, transition: "opacity 0.1s",
          }}>
            {phase >= 3 && (
              <img src="/logo.png" alt="Leonine" style={{
                width: "100%", height: "100%", objectFit: "contain",
                filter: "drop-shadow(0 0 18px rgba(201,168,76,0.55))",
                animation: "logoReveal 1.2s cubic-bezier(0.16,1,0.3,1) both",
              }} />
            )}
          </div>

          {/* LEONINE — main title */}
          <h1 className="splash-shimmer-text" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.6rem, 6vw, 4rem)",
            fontWeight: 500, letterSpacing: "0.35em", lineHeight: 1, marginBottom: 8,
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
          }}>
            LEONINE
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: "'Cormorant Infant', serif",
            fontSize: "clamp(0.85rem, 2vw, 1.05rem)",
            fontStyle: "italic", fontWeight: 300, letterSpacing: "0.28em",
            color: "rgba(245,235,210,0.75)", marginBottom: 18,
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 1s ease 0.35s, transform 1s ease 0.35s",
          }}>
            Villa &amp; Sanctuary
          </p>

          {/* Rule */}
          <div style={{
            width: "100%", marginBottom: 18,
            opacity: phase >= 4 ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}>
            <ThinRule show={phase >= 4} delay={0} widthPct="100%" />
          </div>

          {/* Tagline */}
          <p style={{
            fontFamily: "'Cormorant Infant', serif",
            fontSize: "clamp(0.78rem, 1.8vw, 0.95rem)",
            fontStyle: "italic", fontWeight: 300,
            color: "rgba(200,185,155,0.65)", letterSpacing: "0.12em", marginBottom: 18,
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 1s ease 0.65s, transform 1s ease 0.65s",
          }}>
            Where the Jungle Whispers Ancient Stories
          </p>

          {/* Second rule */}
          <div style={{
            width: "100%", marginBottom: 28,
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
                position: "relative", overflow: "hidden",
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.62rem", fontWeight: 400,
                letterSpacing: "0.4em", textTransform: "uppercase",
                color: "#1a1a0a",
                background: "linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #d4891a 100%)",
                border: "none", borderRadius: "999px",
                padding: "14px 44px", cursor: "pointer",
                boxShadow: "0 8px 32px rgba(201,168,76,0.45), 0 2px 8px rgba(0,0,0,0.4)",
                transition: "filter 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.14)"; e.currentTarget.style.transform = "scale(1.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)";    e.currentTarget.style.transform = "scale(1)"; }}
            >
              Enter
              {/* Shimmer sweep */}
              <span style={{
                position: "absolute", top: 0, left: "-80%",
                width: "60%", height: "100%",
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%)",
                transform: "skewX(-15deg)",
                animation: "shimmerSweep 3s ease-in-out 1.5s infinite",
                pointerEvents: "none",
              }} />
            </button>
          </div>
        </div>

        {/* ══ BOTTOM STRIP ══ */}
        <div style={{
          position: "absolute", bottom: 28, left: 0, right: 0,
          display: "flex", justifyContent: "center",
          opacity: phase >= 5 ? 1 : 0,
          transition: "opacity 0.9s ease 0.2s",
          whiteSpace: "nowrap", alignItems: "center", gap: 12,
        }}>
          <div style={{ height: 1, width: 32, background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.4))" }} />
          {["Sri Lanka", "Nature", "Culture", "Heritage"].map((w, i) => (
            <span key={w} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
              <span style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.55rem", letterSpacing: "0.35em",
                textTransform: "uppercase", color: "rgba(201,168,76,0.5)",
              }}>{w}</span>
              {i < 3 && <span style={{ color: "rgba(201,168,76,0.3)", fontSize: "0.5rem" }}>◆</span>}
            </span>
          ))}
          <div style={{ height: 1, width: 32, background: "linear-gradient(90deg,rgba(201,168,76,0.4),transparent)" }} />
        </div>
      </div>
    </>
  );
}