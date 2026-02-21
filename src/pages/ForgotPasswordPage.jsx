import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=email, 2=otp+newpass
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [inkFocus, setInkFocus] = useState(null);
  const inputRefs = useRef([]);

  function handleOtpChange(index, value) {
    if (!/^\d?$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  }

  function handleOtpKeyDown(index, e) {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputRefs.current[index - 1]?.focus();
  }

  function handleOtpPaste(e) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pasted.length === 4) {
      setOtp(pasted.split(""));
      inputRefs.current[3]?.focus();
      e.preventDefault();
    }
  }

  function handleSendCode() {
    setError("");
    if (!email) { setError("Please enter your email address."); return; }
    setLoading(true);
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/forgot-password", { email })
      .then(() => { setStep(2); setLoading(false); })
      .catch((err) => {
        setError(err.response?.data?.message || "Could not send reset code. Please try again.");
        setLoading(false);
      });
  }

  function handleReset() {
    setError("");
    const otpString = otp.join("");
    if (otpString.length < 4) { setError("Please enter the 4-digit code sent to your email."); return; }
    if (!newPassword) { setError("Please enter a new password."); return; }
    if (newPassword.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
    setLoading(true);
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/reset-password", {
      email, otp: otpString, newPassword,
    })
      .then(() => { setSuccess(true); setLoading(false); setTimeout(() => navigate("/login"), 2500); })
      .catch((err) => {
        setError(err.response?.data?.message || "Could not reset password. Please try again.");
        setLoading(false);
      });
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=IM+Fell+English:ital@0;1&family=Cinzel:wght@400;600&display=swap');
        :root { --ink:#2c1810; --ink-faded:#5a3e2b; --seal-red:#8b1a1a; --gold:#b8860b; }
        *,*::before,*::after{box-sizing:border-box;}
        .fp-bg { min-height:100vh;width:100%;display:flex;align-items:center;justify-content:center;
          padding:48px 16px;position:relative;overflow:hidden;
          background:radial-gradient(ellipse 120% 80% at 50% 30%,#1a2a0a 0%,#0c1808 60%,#05090f 100%);
          font-family:'IM Fell English',serif; }
        .fp-mist { position:absolute;inset:0;pointer-events:none;
          background:radial-gradient(ellipse 60% 50% at 20% 50%,#2d4a1a22 0%,transparent 60%),
                    radial-gradient(ellipse 60% 50% at 80% 50%,#2d4a1a22 0%,transparent 60%); }
        .fp-outer { position:relative;width:min(440px,94vw);animation:fpDrop 0.9s cubic-bezier(.16,1,.3,1) both; }
        @keyframes fpDrop { 0%{opacity:0;transform:translateY(-50px) rotate(1deg)} 100%{opacity:1;transform:none} }
        .fp-shadow { position:absolute;bottom:-16px;left:8%;right:8%;height:28px;
          background:radial-gradient(ellipse,#00000066 0%,transparent 70%);filter:blur(8px); }
        .fp-parchment {
          position:relative;
          background:radial-gradient(ellipse 45% 35% at 88% 12%,#c8a96844 0%,transparent 60%),
                    radial-gradient(ellipse 38% 28% at 12% 88%,#b8904422 0%,transparent 60%),
                    linear-gradient(160deg,#f7e8c8 0%,#f0d9a8 35%,#e8cd96 65%,#f2e0b0 100%);
          border-radius:2px;padding:44px 44px 56px;overflow:visible;
          box-shadow:0 1px 0 #fff9 inset,0 -1px 0 #b8904444 inset,2px 0 0 #fff6 inset,4px 8px 32px #00000055,8px 16px 60px #00000033;
          border:1px solid #d4b88855; }
        .fp-parchment::after { content:'';position:absolute;inset:0;border-radius:2px;pointer-events:none;opacity:0.45;
          background-image:repeating-linear-gradient(to bottom,transparent 0px,transparent 31px,#a0845520 32px,transparent 33px); }
        .fp-fold { position:absolute;left:0;right:0;height:1px;pointer-events:none;
          background:linear-gradient(90deg,transparent 4%,#b8904433 20%,#a07a3844 50%,#b8904433 80%,transparent 96%); }

        .wax-seal { position:absolute;bottom:-28px;right:32px;width:78px;height:78px;z-index:10;
          filter:drop-shadow(2px 4px 8px #00000055);animation:sealAppear 0.6s ease 0.7s both; }
        @keyframes sealAppear { 0%{opacity:0;transform:scale(0.4) rotate(-20deg)} 70%{transform:scale(1.08) rotate(3deg)} 100%{opacity:1;transform:scale(1) rotate(0deg)} }

        .ornament { text-align:center;margin-bottom:6px;color:var(--gold);font-size:1.1rem;letter-spacing:0.3em;opacity:0.7; }
        .fp-heading { font-family:'Playfair Display',serif;font-size:clamp(1.3rem,4vw,1.65rem);font-weight:700;color:var(--ink);
          text-align:center;margin:10px 0 4px;letter-spacing:0.06em;line-height:1.2;position:relative;z-index:1; }
        .fp-sub { font-style:italic;font-size:0.74rem;color:var(--ink-faded);text-align:center;margin-bottom:14px;position:relative;z-index:1; }
        .quill-div { display:flex;align-items:center;gap:8px;margin:8px 0 18px;position:relative;z-index:1; }
        .div-rule { flex:1;height:1px;background:linear-gradient(90deg,transparent,#8b6030aa,transparent); }
        .div-dia { width:5px;height:5px;background:var(--gold);transform:rotate(45deg);opacity:0.7;flex-shrink:0; }

        .field-label { font-style:italic;font-size:0.74rem;color:var(--ink-faded);margin-bottom:3px;display:block;letter-spacing:0.04em;position:relative;z-index:1; }
        .field-wrap { position:relative;z-index:1;margin-bottom:16px; }
        .ink-dot { position:absolute;left:-5px;bottom:9px;width:4px;height:4px;border-radius:50%;
          background:var(--ink);opacity:0;transition:opacity 0.3s;pointer-events:none; }
        .field-wrap.focused .ink-dot { opacity:0.3; }
        .ink-field { width:100%;background:transparent;border:none;border-bottom:1.5px solid #a07838cc;outline:none;
          font-family:'IM Fell English',serif;font-style:italic;font-size:0.96rem;color:var(--ink);
          padding:4px 2px 5px;transition:border-color 0.3s;position:relative;z-index:1;letter-spacing:0.03em; }
        .ink-field::placeholder { color:#a0845577;font-style:italic;font-size:0.88rem; }
        .ink-field:focus { border-bottom-color:var(--ink); }
        .pass-wrap { position:relative; }
        .pass-wrap .ink-field { padding-right:32px; }
        .pass-eye { position:absolute;right:2px;bottom:6px;background:none;border:none;cursor:pointer;
          color:#a07838cc;font-size:1rem;padding:0;z-index:2;transition:color 0.2s; }
        .pass-eye:hover { color:var(--ink); }

        .otp-row { display:flex;justify-content:center;gap:12px;margin-bottom:20px;position:relative;z-index:1; }
        .otp-box-wrap { display:flex;flex-direction:column;align-items:center;gap:5px; }
        .otp-numeral { font-style:italic;font-size:0.6rem;color:#a07838aa;letter-spacing:0.1em; }
        .otp-box { width:50px;height:56px;background:linear-gradient(to bottom,#f9f0d8,#f2e4c0);
          border:1px solid #c8a06055;border-bottom:2px solid #a07838cc;border-radius:1px;
          font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:700;color:var(--ink);
          text-align:center;outline:none;caret-color:var(--seal-red);transition:border-color 0.2s,box-shadow 0.2s;
          box-shadow:0 2px 6px #00000011 inset,0 1px 0 #fff9; }
        .otp-box:focus { border-color:#8b1a1a88;border-bottom-color:var(--seal-red);box-shadow:0 2px 6px #00000011 inset,0 1px 0 #fff9,0 0 0 2px #8b1a1a18; }
        .otp-box.filled { border-bottom-color:var(--ink); }

        .error-msg { font-style:italic;font-size:0.78rem;color:#8b1a1a;margin-bottom:12px;
          padding:6px 10px;border-left:2px solid #8b1a1a88;background:#8b1a1a08;position:relative;z-index:1;animation:fadeIn 0.4s ease; }
        .success-msg { font-style:italic;font-size:0.82rem;color:#1a4a1a;margin-bottom:12px;
          padding:10px 14px;border:1px solid #1a4a1a55;background:#1a4a1a08;position:relative;z-index:1;text-align:center;line-height:1.6;animation:fadeIn 0.6s ease; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-4px)} to{opacity:1} }

        .seal-btn { width:100%;padding:13px 0;margin-top:4px;
          background:linear-gradient(160deg,#6b2a2a 0%,#8b1a1a 40%,#6b1010 100%);
          color:#f4e4c1;border:none;border-radius:2px;font-family:'Cinzel',serif;font-size:0.82rem;
          letter-spacing:0.22em;cursor:pointer;position:relative;z-index:1;
          box-shadow:0 2px 0 #3a0a0a,0 4px 12px #8b1a1a44,0 1px 0 #ff9a6644 inset;
          transition:transform 0.15s,box-shadow 0.15s;overflow:hidden;text-transform:uppercase; }
        .seal-btn::after { content:'';position:absolute;inset:0;background:linear-gradient(180deg,#ffffff18 0%,transparent 50%);pointer-events:none; }
        .seal-btn:hover:not(:disabled) { transform:translateY(-1px);box-shadow:0 3px 0 #3a0a0a,0 6px 18px #8b1a1a66,0 1px 0 #ff9a6644 inset; }
        .seal-btn:active:not(:disabled) { transform:translateY(1px); }
        .seal-btn:disabled { opacity:0.65;cursor:not-allowed; }

        .note { font-style:italic;font-size:0.76rem;color:var(--ink-faded);text-align:center;
          margin-top:14px;position:relative;z-index:1;line-height:1.6; }
        .note button,.note a { background:none;border:none;color:var(--seal-red);font-family:'IM Fell English',serif;
          font-style:italic;font-size:inherit;cursor:pointer;padding:0;
          text-decoration:underline;text-decoration-color:#8b1a1a55;text-underline-offset:3px;transition:color 0.2s; }
        .note button:hover,.note a:hover { color:#5a0a0a; }
        .back-home { position:absolute;top:20px;left:20px;font-family:'IM Fell English',serif;font-style:italic;
          font-size:0.76rem;color:#f4e4c166;background:none;border:none;cursor:pointer;
          display:flex;align-items:center;gap:6px;transition:color 0.2s;z-index:50; }
        .back-home:hover { color:#f4e4c1cc; }
        .step-indicator { display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:16px;position:relative;z-index:1; }
        .step-dot { width:8px;height:8px;border-radius:50%;background:#d4b888;transition:all 0.3s; }
        .step-dot.active { background:var(--seal-red);width:24px;border-radius:4px; }
        @media(max-width:480px){ .fp-parchment{padding:36px 24px 52px} .otp-box{width:44px;height:50px;font-size:1.5rem} }
      `}</style>

      <div className="fp-bg">
        <button className="back-home" onClick={() => navigate("/login")}>← Back to Sign In</button>
        <div className="fp-mist" />

        <div className="fp-outer">
          <div className="fp-shadow" />
          <div className="fp-parchment">
            <div className="fp-fold" style={{ top: "30%" }} />

            <div className="ornament">✦ &nbsp;·&nbsp; ✦</div>
            <h1 className="fp-heading">Reset Your Password</h1>
            <p className="fp-sub">Leonine Villa Natura Resort</p>

            <div className="step-indicator">
              <div className={`step-dot ${step === 1 ? "active" : ""}`} />
              <div className={`step-dot ${step === 2 ? "active" : ""}`} />
            </div>

            <div className="quill-div"><div className="div-rule" /><div className="div-dia" /><div className="div-rule" /></div>

            {success ? (
              <div className="success-msg">
                ✦ &nbsp; Your password has been reset successfully. &nbsp; ✦<br />
                <em>Directing you to the sign in page...</em>
              </div>
            ) : step === 1 ? (
              <>
                <p style={{ fontStyle: "italic", fontSize: "0.8rem", color: "var(--ink-faded)", marginBottom: "18px", lineHeight: 1.6, position: "relative", zIndex: 1 }}>
                  Enter the email address associated with your account and we will send you a verification code to reset your password.
                </p>

                {error && <div className="error-msg">⚠ &nbsp;{error}</div>}

                <label className="field-label">Email Address <span style={{ color: "var(--seal-red)" }}>*</span></label>
                <div className={`field-wrap ${inkFocus === "email" ? "focused" : ""}`}>
                  <div className="ink-dot" />
                  <input type="email" placeholder="your.name@email.com" className="ink-field"
                    value={email} onChange={e => setEmail(e.target.value)}
                    onFocus={() => setInkFocus("email")} onBlur={() => setInkFocus(null)}
                    onKeyDown={e => e.key === "Enter" && handleSendCode()} />
                </div>

                <button className="seal-btn" onClick={handleSendCode} disabled={loading}>
                  {loading ? "Sending code..." : "Send Reset Code"}
                </button>

                <div className="note">
                  Remember your password?{" "}
                  <button onClick={() => navigate("/login")}>Sign in here</button>
                </div>
              </>
            ) : (
              <>
                <p style={{ fontStyle: "italic", fontSize: "0.8rem", color: "var(--ink-faded)", marginBottom: "6px", lineHeight: 1.6, position: "relative", zIndex: 1 }}>
                  A 4-digit code has been sent to <strong style={{ color: "var(--ink)" }}>{email}</strong>. Enter it below along with your new password.
                </p>

                {error && <div className="error-msg">⚠ &nbsp;{error}</div>}

                <div className="otp-row" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <div key={i} className="otp-box-wrap">
                      <span className="otp-numeral">{["I", "II", "III", "IV"][i]}</span>
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

                <label className="field-label">New Password <span style={{ color: "var(--seal-red)" }}>*</span></label>
                <div className={`field-wrap pass-wrap ${inkFocus === "np" ? "focused" : ""}`}>
                  <div className="ink-dot" />
                  <input type={showPass ? "text" : "password"} placeholder="Minimum 6 characters" className="ink-field"
                    value={newPassword} onChange={e => setNewPassword(e.target.value)}
                    onFocus={() => setInkFocus("np")} onBlur={() => setInkFocus(null)} />
                  <button type="button" className="pass-eye" onClick={() => setShowPass(p => !p)}>
                    {showPass ? "🙈" : "👁"}
                  </button>
                </div>

                <label className="field-label">Confirm New Password <span style={{ color: "var(--seal-red)" }}>*</span></label>
                <div className={`field-wrap ${inkFocus === "cp" ? "focused" : ""}`}>
                  <div className="ink-dot" />
                  <input type={showPass ? "text" : "password"} placeholder="Repeat your new password" className="ink-field"
                    value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                    onFocus={() => setInkFocus("cp")} onBlur={() => setInkFocus(null)} />
                </div>

                <button className="seal-btn" onClick={handleReset} disabled={loading}>
                  {loading ? "Resetting password..." : "Reset Password"}
                </button>

                <div className="note">
                  Did not receive the code?{" "}
                  <button onClick={() => { setStep(1); setOtp(["","","",""]); setError(""); }}>
                    Try again
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="wax-seal">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="38" fill="url(#fpSeal)" />
              <circle cx="40" cy="40" r="34" fill="none" stroke="#f4e4c188" strokeWidth="1" />
              <text x="40" y="47" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="20" fontWeight="700" fill="#f4e4c1cc">L</text>
              <path id="fpRing" d="M40 40 m-28,0 a28,28 0 1,1 56,0 a28,28 0 1,1 -56,0" fill="none" />
              <text fontSize="5.5" fontFamily="Cinzel, serif" fill="#f4e4c188" letterSpacing="0.18em">
                <textPath href="#fpRing">LEONINE VILLA · SRI LANKA · </textPath>
              </text>
              <defs>
                <radialGradient id="fpSeal" cx="40" cy="35" r="38" gradientUnits="userSpaceOnUse">
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