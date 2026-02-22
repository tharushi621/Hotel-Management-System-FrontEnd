import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
const emailFromSignup = location.state?.email || "";
const otpFromSignup = location.state?.otp || "";

  const [email, setEmail] = useState(emailFromSignup);
  const [otp, setOtp] = useState(
  otpFromSignup ? String(otpFromSignup).split("") : ["", "", "", ""]
);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [inkFocus, setInkFocus] = useState(null);
  const inputRefs = useRef([]);

  // Handle each OTP digit box
  function handleOtpChange(index, value) {
    if (!/^\d?$/.test(value)) return; // digits only
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    // Auto-advance to next box
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(index, e) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handleOtpPaste(e) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pasted.length === 4) {
      setOtp(pasted.split(""));
      inputRefs.current[3]?.focus();
      e.preventDefault();
    }
  }

  function handleVerify() {
    setError("");
    const otpString = otp.join("");
    if (!email) { setError("No correspondence address found — please return to the register."); return; }
    if (otpString.length < 4) { setError("Pray enter all four digits of your verification seal."); return; }

    setLoading(true);
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/verify-email", {
        email,
        otp: otpString,
      })
      .then(() => {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2500);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "The seal could not be verified — please try again.");
        setLoading(false);
      });
  }

  function handleResend() {
    setError("");
    setResending(true);
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/resend-otp", { email })
      .then(() => {
        setOtp(["", "", "", ""]);
        inputRefs.current[0]?.focus();
        setResending(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Unable to dispatch a new seal at this time.");
        setResending(false);
      });
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=IM+Fell+English:ital@0;1&family=Cinzel:wght@400;600&display=swap');
        :root {
          --ink: #2c1810; --ink-faded: #5a3e2b;
          --seal-red: #8b1a1a; --gold: #b8860b;
        }
        .verify-bg {
          min-height:100vh; width:100%; display:flex; align-items:center; justify-content:center;
          padding:48px 16px; position:relative; overflow:hidden;
          background:radial-gradient(ellipse 120% 80% at 50% 30%,#1a2a0a 0%,#0c1808 60%,#05090f 100%);
          font-family:'IM Fell English',serif;
        }
        .jungle-mist { position:absolute; inset:0; pointer-events:none;
          background: radial-gradient(ellipse 60% 50% at 20% 50%,#2d4a1a22 0%,transparent 60%),
                      radial-gradient(ellipse 60% 50% at 80% 50%,#2d4a1a22 0%,transparent 60%); }
        .letter-outer { position:relative; width:min(480px,94vw); animation:letterDrop 0.9s cubic-bezier(.16,1,.3,1) both; }
        @keyframes letterDrop { 0%{opacity:0;transform:translateY(-60px) rotate(1.5deg)} 100%{opacity:1;transform:translateY(0) rotate(0deg)} }
        .letter-shadow { position:absolute; bottom:-18px; left:8%; right:8%; height:30px;
          background:radial-gradient(ellipse,#00000066 0%,transparent 70%); filter:blur(8px); }
        .parchment {
          position:relative;
          background: radial-gradient(ellipse 45% 35% at 88% 12%,#c8a96844 0%,transparent 60%),
                      radial-gradient(ellipse 38% 28% at 12% 88%,#b8904422 0%,transparent 60%),
                      linear-gradient(160deg,#f7e8c8 0%,#f0d9a8 35%,#e8cd96 65%,#f2e0b0 100%);
          border-radius:2px; padding:44px 48px 56px; overflow:visible;
          box-shadow:0 1px 0 #fff9 inset,0 -1px 0 #b8904444 inset,2px 0 0 #fff6 inset,4px 8px 32px #00000055,8px 16px 60px #00000033;
          border:1px solid #d4b88855;
        }
        .parchment::before { content:''; position:absolute; inset:0; border-radius:2px; opacity:0.22; pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E"); }
        .parchment::after { content:''; position:absolute; inset:0; border-radius:2px; pointer-events:none; opacity:0.55;
          background-image:repeating-linear-gradient(to bottom,transparent 0px,transparent 31px,#a0845522 32px,transparent 33px); }
        .fold-line { position:absolute; top:32%; left:0; right:0; height:1px; pointer-events:none;
          background:linear-gradient(90deg,transparent 4%,#b8904433 20%,#a07a3844 50%,#b8904433 80%,transparent 96%); }
        .fold-shadow { position:absolute; top:calc(32% + 1px); left:0; right:0; height:4px; pointer-events:none;
          background:linear-gradient(to bottom,#00000011,transparent); }

        /* Envelope flap decoration at top */
        .envelope-mark {
          position:absolute; top:14px; left:50%; transform:translateX(-50%);
          font-family:'Cinzel',serif; font-size:0.58rem; color:#8b603088;
          letter-spacing:0.3em; text-transform:uppercase; white-space:nowrap; pointer-events:none;
        }

        .wax-seal {
          position:absolute; bottom:-28px; right:36px; width:80px; height:80px; z-index:10;
          filter:drop-shadow(2px 4px 8px #00000055); animation:sealAppear 0.6s ease 0.7s both;
        }
        @keyframes sealAppear { 0%{opacity:0;transform:scale(0.4) rotate(-20deg)} 70%{transform:scale(1.08) rotate(3deg)} 100%{opacity:1;transform:scale(1) rotate(0deg)} }

        .ornament { text-align:center; margin-bottom:6px; color:var(--gold); font-size:1.1rem; letter-spacing:0.3em; opacity:0.7; }
        .letter-heading { font-family:'Playfair Display',serif; font-size:clamp(1.35rem,4vw,1.75rem); font-weight:700; color:var(--ink);
          text-align:center; margin:10px 0 4px; letter-spacing:0.06em; line-height:1.2; position:relative; z-index:1; }
        .quill-divider { display:flex; align-items:center; gap:8px; margin:8px 0 20px; position:relative; z-index:1; }
        .divider-rule { flex:1; height:1px; background:linear-gradient(90deg,transparent,#8b6030aa,transparent); }
        .divider-diamond { width:6px; height:6px; background:var(--gold); transform:rotate(45deg); opacity:0.7; flex-shrink:0; }

        .dispatch-note {
          font-family:'IM Fell English',serif; font-style:italic; font-size:0.83rem; color:var(--ink-faded);
          margin-bottom:6px; position:relative; z-index:1; line-height:1.6; text-align:center;
        }
        .dispatch-email {
          font-family:'Cinzel',serif; font-size:0.72rem; color:var(--ink);
          text-align:center; margin-bottom:22px; position:relative; z-index:1;
          letter-spacing:0.05em; opacity:0.75;
        }

        /* OTP digit boxes */
        .otp-row {
          display:flex; justify-content:center; gap:14px;
          margin-bottom:24px; position:relative; z-index:1;
        }
        .otp-box-wrap { display:flex; flex-direction:column; align-items:center; gap:6px; }
        .otp-numeral {
          font-family:'IM Fell English',serif; font-style:italic;
          font-size:0.6rem; color:#a07838aa; letter-spacing:0.1em;
        }
        .otp-box {
          width:52px; height:58px;
          background:linear-gradient(to bottom,#f9f0d8,#f2e4c0);
          border:1px solid #c8a06055;
          border-bottom:2px solid #a07838cc;
          border-radius:1px;
          font-family:'Playfair Display',serif; font-size:1.8rem; font-weight:700;
          color:var(--ink); text-align:center;
          outline:none; caret-color:var(--seal-red);
          transition:border-color 0.2s, box-shadow 0.2s;
          box-shadow:0 2px 6px #00000011 inset, 0 1px 0 #fff9;
          position:relative; z-index:1;
        }
        .otp-box:focus {
          border-color:#8b1a1a88;
          border-bottom-color:var(--seal-red);
          box-shadow:0 2px 6px #00000011 inset,0 1px 0 #fff9,0 0 0 2px #8b1a1a18;
        }
        .otp-box.filled { border-bottom-color:var(--ink); }

        /* Email field (shown if no email passed via state) */
        .field-label { font-family:'IM Fell English',serif; font-style:italic; font-size:0.74rem; color:var(--ink-faded); margin-bottom:3px; display:block; letter-spacing:0.04em; position:relative; z-index:1; }
        .field-wrap { position:relative; z-index:1; margin-bottom:18px; }
        .ink-dot { position:absolute; left:-6px; bottom:10px; width:5px; height:5px; border-radius:50%;
          background:var(--ink); opacity:0; transition:opacity 0.3s; pointer-events:none; }
        .field-wrap.focused .ink-dot { opacity:0.35; }
        .ink-field { width:100%; background:transparent; border:none; border-bottom:1.5px solid #a07838cc; outline:none;
          font-family:'IM Fell English',serif; font-style:italic; font-size:0.96rem; color:var(--ink);
          padding:4px 2px 5px; transition:border-color 0.3s; position:relative; z-index:1; letter-spacing:0.03em; box-sizing:border-box; }
        .ink-field::placeholder { color:#a0845577; font-style:italic; font-size:0.88rem; }
        .ink-field:focus { border-bottom-color:var(--ink); }

        .error-msg { font-family:'IM Fell English',serif; font-style:italic; font-size:0.78rem; color:#8b1a1a;
          margin-bottom:12px; padding:6px 10px; border-left:2px solid #8b1a1a88; background:#8b1a1a08;
          position:relative; z-index:1; animation:fadeIn 0.4s ease; }
        .success-msg { font-family:'IM Fell English',serif; font-style:italic; font-size:0.82rem; color:#1a4a1a;
          margin-bottom:12px; padding:10px 14px; border:1px solid #1a4a1a55; background:#1a4a1a08;
          position:relative; z-index:1; text-align:center; line-height:1.6; animation:fadeIn 0.6s ease; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-4px)} to{opacity:1} }

        .seal-btn { width:100%; padding:13px 0; margin-top:4px;
          background:linear-gradient(160deg,#6b2a2a 0%,#8b1a1a 40%,#6b1010 100%);
          color:#f4e4c1; border:none; border-radius:2px; font-family:'Cinzel',serif; font-size:0.82rem;
          letter-spacing:0.25em; cursor:pointer; position:relative; z-index:1;
          box-shadow:0 2px 0 #3a0a0a,0 4px 12px #8b1a1a44,0 1px 0 #ff9a6644 inset;
          transition:transform 0.15s,box-shadow 0.15s; overflow:hidden; text-transform:uppercase; }
        .seal-btn::after { content:''; position:absolute; inset:0; background:linear-gradient(180deg,#ffffff18 0%,transparent 50%); pointer-events:none; }
        .seal-btn:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 3px 0 #3a0a0a,0 6px 18px #8b1a1a66,0 1px 0 #ff9a6644 inset; }
        .seal-btn:active:not(:disabled) { transform:translateY(1px); }
        .seal-btn:disabled { opacity:0.65; cursor:not-allowed; }

        .resend-row { text-align:center; margin-top:16px; position:relative; z-index:1; }
        .resend-row span { font-family:'IM Fell English',serif; font-style:italic; font-size:0.76rem; color:var(--ink-faded); }
        .resend-btn { background:none; border:none; color:var(--seal-red); font-family:'IM Fell English',serif;
          font-style:italic; font-size:0.76rem; cursor:pointer; padding:0; text-decoration:underline;
          text-decoration-color:#8b1a1a55; text-underline-offset:3px; transition:color 0.2s; }
        .resend-btn:hover { color:#5a0a0a; }
        .resend-btn:disabled { opacity:0.5; cursor:not-allowed; }

        .back-home { position:absolute; top:20px; left:20px; font-family:'IM Fell English',serif; font-style:italic;
          font-size:0.76rem; color:#f4e4c166; background:none; border:none; cursor:pointer;
          display:flex; align-items:center; gap:6px; transition:color 0.2s; z-index:50; }
        .back-home:hover { color:#f4e4c1cc; }
        @media(max-width:500px){ .parchment{padding:36px 24px 52px} .otp-box{width:44px;height:52px;font-size:1.5rem} }
      `}</style>

      <div className="verify-bg">
        <button className="back-home" onClick={() => navigate("/signup")}>← Return to Register</button>
        <div className="jungle-mist" />

        <div className="letter-outer">
          <div className="letter-shadow" />
          <div className="parchment">
            <div className="fold-line" /><div className="fold-shadow" />
            <div className="envelope-mark">· Verification Dispatch ·</div>

            <div className="ornament" style={{marginTop:"14px"}}>✦ &nbsp;·&nbsp; ✦</div>
            <h1 className="letter-heading">Confirm Your Identity</h1>
            <div className="quill-divider"><div className="divider-rule" /><div className="divider-diamond" /><div className="divider-rule" /></div>

            {success ? (
              <div className="success-msg">
                ✦ &nbsp; Your identity has been duly confirmed. &nbsp; ✦<br />
                <em>Welcome to the estate. Directing you to the entrance hall...</em>
              </div>
            ) : (
              <>
                <p className="dispatch-note">
                  A four-digit verification seal has been dispatched to your correspondence address.
                  Pray enter it below to complete your inscription.
                </p>

                {/* Show email — editable only if not passed via state */}
                {emailFromSignup ? (
                  <p className="dispatch-email">{email}</p>
                ) : (
                  <>
                    <label className="field-label">Correspondence Address<span style={{color:"var(--seal-red)",marginLeft:2}}> *</span></label>
                    <div className={`field-wrap ${inkFocus==="email"?"focused":""}`}>
                      <div className="ink-dot" />
                      <input type="email" placeholder="your.name@correspondence.com" className="ink-field"
                        value={email} onChange={e=>setEmail(e.target.value)}
                        onFocus={()=>setInkFocus("email")} onBlur={()=>setInkFocus(null)} />
                    </div>
                  </>
                )}

                {error && <div className="error-msg">⚠ &nbsp;{error}</div>}

                {/* 4-digit OTP boxes */}
                <div className="otp-row" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <div key={i} className="otp-box-wrap">
                      <span className="otp-numeral">{["I","II","III","IV"][i]}</span>
                      <input
                        ref={el => inputRefs.current[i] = el}
                        type="text" inputMode="numeric" maxLength={1}
                        className={`otp-box ${digit ? "filled" : ""}`}
                        value={digit}
                        onChange={e => handleOtpChange(i, e.target.value)}
                        onKeyDown={e => handleOtpKeyDown(i, e)}
                      />
                    </div>
                  ))}
                </div>

                <button className="seal-btn" onClick={handleVerify} disabled={loading}>
                  {loading ? "Verifying the seal..." : "✦  Confirm Verification  ✦"}
                </button>

                <div className="resend-row">
                  <span>Did not receive the seal? &nbsp;</span>
                  <button className="resend-btn" onClick={handleResend} disabled={resending}>
                    {resending ? "Dispatching..." : "Dispatch a new one"}
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="wax-seal">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="38" fill="url(#sealGradV)" />
              <circle cx="40" cy="40" r="34" fill="none" stroke="#f4e4c188" strokeWidth="1" />
              <text x="40" y="47" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="22" fontWeight="700" fill="#f4e4c1cc">L</text>
              <path id="sealRingV" d="M40 40 m-28,0 a28,28 0 1,1 56,0 a28,28 0 1,1 -56,0" fill="none"/>
              <text fontSize="6" fontFamily="Cinzel, serif" fill="#f4e4c188" letterSpacing="0.18em">
                <textPath href="#sealRingV">LEONINE VILLA · SRI LANKA · </textPath>
              </text>
              <defs>
                <radialGradient id="sealGradV" cx="40" cy="35" r="38" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a02020" /><stop offset="0.6" stopColor="#7a1010" /><stop offset="1" stopColor="#4a0808" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}