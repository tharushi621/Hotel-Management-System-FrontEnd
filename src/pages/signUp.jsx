import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    whatsApp: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [inkFocus, setInkFocus] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSignup() {
    setError("");
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.phone || !form.whatsApp) {
      setError("Pray complete all required fields before sealing the register.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("The passphrases do not match — please verify your inscription.");
      return;
    }
    if (form.password.length < 6) {
      setError("Your passphrase must contain at least 6 characters for security.");
      return;
    }
    setLoading(true);
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/register", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        phone: form.phone,
        whatsApp: form.whatsApp,
      })
      .then(() => {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2800);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "The quill has faltered — please try again presently.");
        setLoading(false);
      });
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=IM+Fell+English:ital@0;1&family=Cinzel:wght@400;600&display=swap');

        :root {
          --parchment:    #f4e4c1;
          --parchment-dk: #e8d5a3;
          --parchment-sh: #d4b896;
          --ink:          #2c1810;
          --ink-faded:    #5a3e2b;
          --seal-red:     #8b1a1a;
          --seal-gold:    #c8860a;
          --gold:         #b8860b;
          --gold-lt:      #d4a843;
          --green-dark:   #1a3d1a;
        }

        .signup-bg {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 16px;
          position: relative;
          overflow: hidden;
          background: radial-gradient(ellipse 120% 80% at 50% 30%, #1a2a0a 0%, #0c1808 60%, #05090f 100%);
          font-family: 'IM Fell English', serif;
        }

        .jungle-mist {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 50%, #2d4a1a22 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 50%, #2d4a1a22 0%, transparent 60%);
          pointer-events: none;
        }

        /* ── Outer wrapper ── */
        .letter-outer {
          position: relative;
          width: min(560px, 94vw);
          animation: letterDrop 0.9s cubic-bezier(.16,1,.3,1) both;
        }
        @keyframes letterDrop {
          0%   { opacity: 0; transform: translateY(-60px) rotate(-1.5deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        .letter-shadow {
          position: absolute;
          bottom: -18px; left: 8%; right: 8%;
          height: 30px;
          background: radial-gradient(ellipse, #00000066 0%, transparent 70%);
          filter: blur(8px);
        }

        /* ── Parchment card ── */
        .parchment {
          position: relative;
          background:
            radial-gradient(ellipse 45% 35% at 12% 14%, #c8a96844 0%, transparent 60%),
            radial-gradient(ellipse 38% 28% at 88% 86%, #b8904422 0%, transparent 60%),
            linear-gradient(160deg, #f7e8c8 0%, #f0d9a8 35%, #e8cd96 65%, #f2e0b0 100%);
          border-radius: 2px;
          padding: 44px 48px 56px;
          box-shadow:
            0 1px 0 #fff9 inset,
            0 -1px 0 #b8904444 inset,
            2px 0 0 #fff6 inset,
            4px 8px 32px #00000055,
            8px 16px 60px #00000033;
          border: 1px solid #d4b88855;
          overflow: visible;
        }
        .parchment::before {
          content: '';
          position: absolute; inset: 0; border-radius: 2px;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E");
          opacity: 0.22; pointer-events: none;
        }
        .parchment::after {
          content: '';
          position: absolute; inset: 0; border-radius: 2px;
          background-image: repeating-linear-gradient(
            to bottom, transparent 0px, transparent 31px, #a0845522 32px, transparent 33px
          );
          pointer-events: none; opacity: 0.55;
        }

        /* ── Fold crease ── */
        .fold-line {
          position: absolute;
          top: 28%; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 4%, #b8904433 20%, #a07a3844 50%, #b8904433 80%, transparent 96%);
          pointer-events: none;
        }
        .fold-shadow {
          position: absolute;
          top: calc(28% + 1px); left: 0; right: 0; height: 4px;
          background: linear-gradient(to bottom, #00000011, transparent);
          pointer-events: none;
        }

        /* ── Postmark (top-right) — matches login ── */
        .postmark {
          position: absolute;
          top: 22px; right: 28px;
          width: 72px; height: 72px;
          border: 2px solid #8b4513aa;
          border-radius: 50%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          transform: rotate(12deg);
          opacity: 0.6;
          pointer-events: none;
        }
        .postmark-inner {
          width: 58px; height: 58px;
          border: 1px solid #8b4513aa;
          border-radius: 50%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 1px;
        }
        .postmark span {
          font-family: 'Cinzel', serif;
          font-size: 6.5px; color: #6b3410;
          letter-spacing: 0.12em; text-align: center;
          line-height: 1.3; text-transform: uppercase;
        }
        .postmark .year { font-size: 9px; font-weight: 600; letter-spacing: 0.08em; }

        /* ── Stamp corner (matches login) ── */
        .stamp-corner {
          position: absolute;
          top: 18px; right: 110px;
          width: 42px; height: 52px;
          border: 1.5px solid #8b4513aa;
          padding: 2px; opacity: 0.55;
          pointer-events: none;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 2px;
        }
        .stamp-inner {
          border: 1px solid #8b451388;
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
        }
        .stamp-corner span {
          font-family: 'Cinzel', serif; font-size: 5.5px;
          color: #6b3410; letter-spacing: 0.1em;
          text-align: center; text-transform: uppercase;
        }
        .stamp-corner .stamp-lion { font-size: 14px; line-height: 1; }

        /* ── Wax seal (red — matches login) ── */
        .wax-seal {
          position: absolute;
          bottom: -28px; right: 36px;
          width: 80px; height: 80px;
          z-index: 10;
          filter: drop-shadow(2px 4px 8px #00000055);
          animation: sealAppear 0.6s ease 0.7s both;
        }
        @keyframes sealAppear {
          0%   { opacity: 0; transform: scale(0.4) rotate(-20deg); }
          70%  { transform: scale(1.08) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        /* ── Typography ── */
        .ornament {
          text-align: center; margin-bottom: 6px;
          color: var(--gold); font-size: 1.1rem;
          letter-spacing: 0.3em; opacity: 0.7;
        }
        .letter-address {
          font-family: 'IM Fell English', serif; font-style: italic;
          font-size: 0.72rem; color: var(--ink-faded);
          margin-bottom: 2px; letter-spacing: 0.04em; line-height: 1.5;
        }
        .letter-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.45rem, 4.5vw, 1.95rem);
          font-weight: 700; color: var(--ink);
          text-align: center; margin: 10px 0 4px;
          letter-spacing: 0.06em; line-height: 1.15;
          position: relative; z-index: 1;
        }
        .quill-divider {
          display: flex; align-items: center; gap: 8px;
          margin: 8px 0 16px; position: relative; z-index: 1;
        }
        .divider-rule { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #8b6030aa, transparent); }
        .divider-diamond { width: 6px; height: 6px; background: var(--gold); transform: rotate(45deg); opacity: 0.7; flex-shrink: 0; }

        .salutation {
          font-family: 'IM Fell English', serif; font-style: italic;
          font-size: 0.82rem; color: var(--ink-faded);
          margin-bottom: 16px; position: relative; z-index: 1; line-height: 1.55;
        }

        /* ── Fields ── */
        .field-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0 20px;
          position: relative; z-index: 1;
        }
        @media (max-width: 480px) { .field-row { grid-template-columns: 1fr; } }

        .field-label {
          font-family: 'IM Fell English', serif; font-style: italic;
          font-size: 0.74rem; color: var(--ink-faded);
          margin-bottom: 3px; display: block;
          letter-spacing: 0.04em; position: relative; z-index: 1;
        }
        .field-label .req { color: var(--seal-red); margin-left: 2px; }

        .field-wrap { position: relative; z-index: 1; margin-bottom: 14px; }
        .ink-dot {
          position: absolute; left: -6px; bottom: 10px;
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--ink); opacity: 0;
          transition: opacity 0.3s; pointer-events: none;
        }
        .field-wrap.focused .ink-dot { opacity: 0.35; }

        .pw-input-wrap { position: relative; display: flex; align-items: center; }

        .ink-field {
          width: 100%; background: transparent;
          border: none; border-bottom: 1.5px solid #a07838cc;
          outline: none;
          font-family: 'IM Fell English', serif; font-style: italic;
          font-size: 0.96rem; color: var(--ink);
          padding: 4px 28px 5px 2px;
          transition: border-color 0.3s;
          position: relative; z-index: 1;
          letter-spacing: 0.03em; box-sizing: border-box;
        }
        .ink-field.no-pr { padding-right: 2px; }
        .ink-field::placeholder { color: #a0845577; font-style: italic; font-size: 0.88rem; }
        .ink-field:focus {
          border-bottom-color: var(--ink);
          background: linear-gradient(to bottom, transparent 95%, #8b603018 100%);
        }

        .pw-toggle {
          position: absolute; right: 2px; bottom: 5px;
          background: none; border: none; padding: 0;
          cursor: pointer; display: flex; align-items: center;
          color: #a07838aa; transition: color 0.2s, transform 0.15s;
          z-index: 2; line-height: 1;
        }
        .pw-toggle:hover { color: var(--ink-faded); transform: scale(1.15); }
        .pw-toggle svg { width: 15px; height: 15px; display: block; }

        /* ── Error / Success ── */
        .error-msg {
          font-family: 'IM Fell English', serif; font-style: italic;
          font-size: 0.78rem; color: #8b1a1a;
          margin-bottom: 12px; padding: 6px 10px;
          border-left: 2px solid #8b1a1a88;
          background: #8b1a1a08;
          position: relative; z-index: 1;
          animation: fadeIn 0.4s ease;
        }
        .success-msg {
          font-family: 'IM Fell English', serif; font-style: italic;
          font-size: 0.82rem; color: #1a4a1a;
          margin-bottom: 12px; padding: 10px 14px;
          border: 1px solid #1a4a1a55; background: #1a4a1a08;
          position: relative; z-index: 1;
          text-align: center; line-height: 1.6;
          animation: fadeIn 0.6s ease;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; } }

        /* ── Submit button — red seal style (matches login) ── */
        .seal-btn {
          width: 100%; padding: 13px 0; margin-top: 6px;
          background: linear-gradient(160deg, #6b2a2a 0%, #8b1a1a 40%, #6b1010 100%);
          color: #f4e4c1; border: none; border-radius: 2px;
          font-family: 'Cinzel', serif; font-size: 0.82rem;
          letter-spacing: 0.25em; cursor: pointer;
          position: relative; z-index: 1;
          box-shadow: 0 2px 0 #3a0a0a, 0 4px 12px #8b1a1a44, 0 1px 0 #ff9a6644 inset;
          transition: transform 0.15s, box-shadow 0.15s;
          overflow: hidden; text-transform: uppercase;
        }
        .seal-btn::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(180deg, #ffffff18 0%, transparent 50%);
          pointer-events: none;
        }
        .seal-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 3px 0 #3a0a0a, 0 6px 18px #8b1a1a66, 0 1px 0 #ff9a6644 inset;
        }
        .seal-btn:active:not(:disabled) { transform: translateY(1px); box-shadow: 0 1px 0 #3a0a0a, 0 2px 8px #8b1a1a33; }
        .seal-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        /* ── PS / footer link ── */
        .letter-ps {
          font-family: 'IM Fell English', serif; font-style: italic;
          font-size: 0.78rem; color: var(--ink-faded);
          margin-top: 18px; text-align: center;
          position: relative; z-index: 1; line-height: 1.6;
        }
        .letter-ps button {
          background: none; border: none; color: var(--seal-red);
          font-family: 'IM Fell English', serif; font-style: italic; font-size: inherit;
          cursor: pointer; padding: 0;
          text-decoration: underline; text-decoration-color: #8b1a1a55;
          text-underline-offset: 3px; transition: color 0.2s;
        }
        .letter-ps button:hover { color: #5a0a0a; }

        .consent-note {
          font-family: 'IM Fell English', serif; font-style: italic;
          font-size: 0.7rem; color: #8b6030aa;
          margin-bottom: 12px; position: relative; z-index: 1; line-height: 1.5;
        }

        /* ── Back home ── */
        .back-home {
          position: absolute; top: 20px; left: 20px;
          font-family: 'IM Fell English', serif; font-style: italic;
          font-size: 0.76rem; color: #f4e4c166;
          background: none; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 6px;
          transition: color 0.2s; z-index: 50;
        }
        .back-home:hover { color: #f4e4c1cc; }

        /* ── Mobile padding ── */
        @media (max-width: 500px) {
          .parchment { padding: 36px 24px 52px; }
          .postmark { display: none; }
          .stamp-corner { display: none; }
        }
      `}</style>

      <div className="signup-bg">
        <button className="back-home" onClick={() => navigate("/")}>
          ← Return to Estate
        </button>

        <div className="jungle-mist" />

        <div className="letter-outer">
          <div className="letter-shadow" />

          <div className="parchment">
            <div className="fold-line" />
            <div className="fold-shadow" />

            {/* Postmark — identical to login */}
            <div className="postmark">
              <div className="postmark-inner">
                <span>Leonine Villa</span>
                <span className="year">2025</span>
                <span>Sri Lanka</span>
              </div>
            </div>

            {/* Stamp — identical to login */}
            <div className="stamp-corner">
              <div className="stamp-inner">
                <span className="stamp-lion">🦁</span>
                <span>LVN</span>
              </div>
            </div>

            <div className="ornament">✦ &nbsp;·&nbsp; ✦</div>

            <div className="letter-address">
              To: The Prospective Guest &nbsp;&nbsp;·&nbsp;&nbsp; Leonine Villa Natura Resort, Sri Lanka
            </div>

            <h1 className="letter-heading">A Guest's Register</h1>

            <div className="quill-divider">
              <div className="divider-rule" />
              <div className="divider-diamond" />
              <div className="divider-rule" />
            </div>

            <p className="salutation">
              Dear Esteemed Traveller, pray inscribe your particulars below, that we may duly record your name amongst our honoured company.
            </p>

            {success ? (
              <div className="success-msg">
                ✦ &nbsp; Your name has been duly inscribed in our Guest Register. &nbsp; ✦<br />
                <em>We shall receive you presently... Directing you to the entrance hall.</em>
              </div>
            ) : (
              <>
                {error && <div className="error-msg">⚠ &nbsp;{error}</div>}

                {/* First + Last Name */}
                <div className="field-row">
                  {[
                    { name: "firstName", label: "First Name",        placeholder: "e.g. James" },
                    { name: "lastName",  label: "Last Name & Title", placeholder: "e.g. Perera" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="field-label">{f.label}<span className="req"> *</span></label>
                      <div className={`field-wrap ${inkFocus === f.name ? "focused" : ""}`}>
                        <div className="ink-dot" />
                        <input
                          type="text" name={f.name} placeholder={f.placeholder}
                          className="ink-field no-pr" value={form[f.name]}
                          onChange={handleChange}
                          onFocus={() => setInkFocus(f.name)}
                          onBlur={() => setInkFocus(null)}
                          autoComplete={f.name}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Email — full width */}
                <label className="field-label">
                  Electronic Correspondence<span className="req"> *</span>
                </label>
                <div className={`field-wrap ${inkFocus === "email" ? "focused" : ""}`}>
                  <div className="ink-dot" />
                  <input
                    type="email" name="email" placeholder="your.name@correspondence.com"
                    className="ink-field no-pr" value={form.email}
                    onChange={handleChange}
                    onFocus={() => setInkFocus("email")}
                    onBlur={() => setInkFocus(null)}
                    autoComplete="email"
                  />
                </div>

                {/* Phone + WhatsApp */}
                <div className="field-row">
                  {[
                    { name: "phone",    label: "Calling Number",  placeholder: "+94 77 000 0000" },
                    { name: "whatsApp", label: "WhatsApp Number", placeholder: "+94 77 000 0000" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="field-label">{f.label}<span className="req"> *</span></label>
                      <div className={`field-wrap ${inkFocus === f.name ? "focused" : ""}`}>
                        <div className="ink-dot" />
                        <input
                          type="tel" name={f.name} placeholder={f.placeholder}
                          className="ink-field no-pr" value={form[f.name]}
                          onChange={handleChange}
                          onFocus={() => setInkFocus(f.name)}
                          onBlur={() => setInkFocus(null)}
                          autoComplete="tel"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Password + Confirm */}
                <div className="field-row">
                  {[
                    { name: "password",        label: "Secret Passphrase",      show: showPassword,        setShow: setShowPassword        },
                    { name: "confirmPassword", label: "Re-inscribe Passphrase", show: showConfirmPassword, setShow: setShowConfirmPassword },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="field-label">{f.label}<span className="req"> *</span></label>
                      <div className={`field-wrap ${inkFocus === f.name ? "focused" : ""}`}>
                        <div className="ink-dot" />
                        <div className="pw-input-wrap">
                          <input
                            type={f.show ? "text" : "password"}
                            name={f.name} placeholder="··········"
                            className="ink-field" value={form[f.name]}
                            onChange={handleChange}
                            onFocus={() => setInkFocus(f.name)}
                            onBlur={() => setInkFocus(null)}
                            autoComplete="new-password"
                          />
                          <button
                            type="button" className="pw-toggle"
                            onClick={() => f.setShow((v) => !v)}
                            tabIndex={-1}
                            title={f.show ? "Conceal passphrase" : "Reveal passphrase"}
                          >
                            {f.show ? (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                                <line x1="1" y1="1" x2="23" y2="23"/>
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="consent-note">
                  By inscribing your name herein, you consent to the estate's terms of hospitality and our solemn privacy charter.
                </p>

                <button className="seal-btn" onClick={handleSignup} disabled={loading}>
                  {loading ? "Recording in the register..." : "✦  Inscribe My Name  ✦"}
                </button>

                <div className="letter-ps">
                  <em>P.S.</em> — Already a registered guest?{" "}
                  <button onClick={() => navigate("/login")}>
                    Return to the entrance hall
                  </button>
                  &nbsp;and present your credentials.
                </div>
              </>
            )}
          </div>

          {/* Red wax seal — identical to login */}
          <div className="wax-seal">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="38" fill="url(#sealGradSU)" />
              <circle cx="40" cy="40" r="34" fill="none" stroke="#f4e4c188" strokeWidth="1" />
              <circle cx="40" cy="40" r="29" fill="none" stroke="#f4e4c133" strokeWidth="0.5" />
              <text x="40" y="47" textAnchor="middle"
                fontFamily="Cinzel, serif" fontSize="22" fontWeight="700"
                fill="#f4e4c1cc" letterSpacing="0.05em">L</text>
              <path id="sealRingSU" d="M40 40 m-28,0 a28,28 0 1,1 56,0 a28,28 0 1,1 -56,0" fill="none"/>
              <text fontSize="6" fontFamily="Cinzel, serif" fill="#f4e4c188" letterSpacing="0.18em">
                <textPath href="#sealRingSU">LEONINE VILLA · SRI LANKA · </textPath>
              </text>
              <defs>
                <radialGradient id="sealGradSU" cx="40" cy="35" r="38" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a02020" />
                  <stop offset="0.6" stopColor="#7a1010" />
                  <stop offset="1" stopColor="#4a0808" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}