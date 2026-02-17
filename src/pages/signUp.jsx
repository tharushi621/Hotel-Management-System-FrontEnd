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
  const navigate = useNavigate();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSignup() {
    setError("");

    // Required field validation
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
        setTimeout(() => {
          navigate("/login");
        }, 2800);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ||
            "The quill has faltered — please try again presently."
        );
        setLoading(false);
      });
  }

  const fields = [
    { name: "firstName",       label: "First Name",                 placeholder: "e.g. James",             type: "text",     required: true  },
    { name: "lastName",        label: "Last Name & Title",          placeholder: "e.g. Perera",            type: "text",     required: true  },
    { name: "email",           label: "Electronic Correspondence",  placeholder: "your.name@post.com",     type: "email",    required: true  },
    { name: "phone",           label: "Calling Number",             placeholder: "+94 77 000 0000",        type: "tel",      required: true  },
    { name: "whatsApp",        label: "WhatsApp Number",            placeholder: "+94 77 000 0000",        type: "tel",      required: true  },
    { name: "password",        label: "Secret Passphrase",          placeholder: "··········",             type: "password", required: true  },
    { name: "confirmPassword", label: "Re-inscribe Passphrase",     placeholder: "··········",             type: "password", required: true  },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=IM+Fell+English:ital@0;1&family=Cinzel:wght@400;600&display=swap');

        :root {
          --ink: #2c1810; --ink-faded: #5a3e2b;
          --seal-red: #8b1a1a; --gold: #b8860b;
        }

        .signup-bg {
          min-height: 100vh; width: 100%;
          display: flex; align-items: center; justify-content: center;
          padding: 40px 16px;
          background: radial-gradient(ellipse 120% 80% at 50% 30%, #1a2a0a 0%, #0c1808 60%, #05090f 100%);
          font-family: 'IM Fell English', serif;
          position: relative; overflow: hidden;
        }
        .signup-bg::before {
          content: ''; position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 55% 45% at 15% 50%, #2d4a1a1e 0%, transparent 65%),
            radial-gradient(ellipse 55% 45% at 85% 50%, #2d4a1a1e 0%, transparent 65%);
          pointer-events: none;
        }

        .reg-letter-outer {
          position: relative;
          width: min(560px, 94vw);
          animation: regDrop 0.9s cubic-bezier(.16,1,.3,1) both;
        }
        @keyframes regDrop {
          0%   { opacity: 0; transform: translateY(-50px) rotate(1deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        .reg-shadow {
          position: absolute; bottom: -20px; left: 7%; right: 7%;
          height: 28px;
          background: radial-gradient(ellipse, #00000055 0%, transparent 70%);
          filter: blur(10px);
        }

        .reg-parchment {
          position: relative;
          background:
            radial-gradient(ellipse 40% 30% at 88% 12%, #c8a96833 0%, transparent 60%),
            radial-gradient(ellipse 35% 25% at 10% 90%, #b8904422 0%, transparent 60%),
            linear-gradient(155deg, #f6e9cc 0%, #f1dba8 30%, #e9ce98 70%, #f3e2b2 100%);
          border-radius: 2px;
          padding: 38px 46px 52px;
          box-shadow:
            0 1px 0 #fff9 inset, 0 -1px 0 #b8904444 inset,
            2px 0 0 #fff6 inset,
            4px 8px 32px #00000055, 8px 18px 60px #00000033;
          border: 1px solid #d4b88855;
        }
        .reg-parchment::before {
          content: ''; position: absolute; inset: 0; border-radius: 2px;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.1'/%3E%3C/svg%3E");
          opacity: 0.2; pointer-events: none;
        }
        .reg-parchment::after {
          content: ''; position: absolute; inset: 0; border-radius: 2px;
          background-image: repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, #a0845522 32px, transparent 33px);
          opacity: 0.5; pointer-events: none;
        }

        .rfold1 {
          position: absolute; top: 30%; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 3%, #b8904430 20%, #a07a3840 50%, #b8904430 80%, transparent 97%);
          pointer-events: none;
        }
        .rfold1-sh {
          position: absolute; top: calc(30% + 1px); left: 0; right: 0; height: 3px;
          background: linear-gradient(to bottom, #00000010, transparent); pointer-events: none;
        }

        .reg-ornament {
          text-align: center; margin-bottom: 4px;
          color: var(--gold); font-size: 0.95rem; letter-spacing: 0.35em; opacity: 0.65;
        }
        .reg-number {
          position: absolute; top: 20px; left: 24px;
          font-family: 'IM Fell English', serif;
          font-style: italic; font-size: 0.66rem;
          color: #8b6030aa; letter-spacing: 0.06em; line-height: 1.5;
        }

        .reg-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.4rem, 4vw, 1.85rem);
          font-weight: 700; color: var(--ink);
          text-align: center; margin: 8px 0 3px;
          letter-spacing: 0.06em; line-height: 1.15;
          position: relative; z-index: 1;
        }
        .reg-subheading {
          font-family: 'IM Fell English', serif; font-style: italic;
          font-size: 0.74rem; color: var(--ink-faded);
          text-align: center; margin-bottom: 12px;
          position: relative; z-index: 1; letter-spacing: 0.04em;
        }

        .reg-divider {
          display: flex; align-items: center; gap: 8px;
          margin: 6px 0 16px; position: relative; z-index: 1;
        }
        .rd-rule { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #8b603088, transparent); }
        .rd-diamond { width: 5px; height: 5px; background: var(--gold); transform: rotate(45deg); opacity: 0.65; flex-shrink: 0; }

        /* Two-column row for side-by-side fields */
        .field-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0 18px;
          position: relative; z-index: 1;
        }

        .field-label {
          font-family: 'IM Fell English', serif; font-style: italic;
          font-size: 0.72rem; color: var(--ink-faded);
          margin-bottom: 3px; display: block; letter-spacing: 0.03em;
        }
        .field-label .req { color: var(--seal-red); margin-left: 2px; }

        .field-wrap { position: relative; margin-bottom: 14px; z-index: 1; }
        .ink-dot-r {
          position: absolute; left: -5px; bottom: 9px;
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--ink); opacity: 0;
          transition: opacity 0.3s; pointer-events: none;
        }
        .field-wrap.focused .ink-dot-r { opacity: 0.3; }

        .ink-field-r {
          width: 100%; background: transparent;
          border: none; border-bottom: 1.5px solid #a07838bb;
          outline: none;
          font-family: 'IM Fell English', serif; font-style: italic;
          font-size: 0.94rem; color: var(--ink);
          padding: 4px 2px 5px;
          transition: border-color 0.3s; letter-spacing: 0.02em;
          box-sizing: border-box;
        }
        .ink-field-r::placeholder { color: #a0845566; font-style: italic; font-size: 0.83rem; }
        .ink-field-r:focus { border-bottom-color: var(--ink); }

        .reg-error {
          font-family: 'IM Fell English', serif; font-style: italic;
          font-size: 0.76rem; color: #8b1a1a;
          margin-bottom: 12px; padding: 6px 10px;
          border-left: 2px solid #8b1a1a88;
          background: #8b1a1a08; position: relative; z-index: 1;
          animation: fadeIn 0.4s ease;
        }
        .reg-success {
          font-family: 'IM Fell English', serif; font-style: italic;
          font-size: 0.82rem; color: #1a4a1a;
          margin-bottom: 12px; padding: 10px 14px;
          border: 1px solid #1a4a1a55;
          background: #1a4a1a08; position: relative; z-index: 1;
          text-align: center; line-height: 1.6;
          animation: fadeIn 0.6s ease;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; } }

        .reg-btn {
          width: 100%; padding: 13px 0; margin-top: 4px;
          background: linear-gradient(160deg, #1a3d20 0%, #2d5a30 40%, #1a3d1a 100%);
          color: #f4e4c1; border: none; border-radius: 2px;
          font-family: 'Cinzel', serif; font-size: 0.8rem;
          letter-spacing: 0.22em; cursor: pointer;
          position: relative; z-index: 1;
          box-shadow: 0 2px 0 #0a1a0a, 0 4px 14px #1a3d1a44, 0 1px 0 #88dd8844 inset;
          transition: transform 0.15s, box-shadow 0.15s;
          text-transform: uppercase; overflow: hidden;
        }
        .reg-btn::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(180deg, #ffffff15 0%, transparent 50%);
          pointer-events: none;
        }
        .reg-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 3px 0 #0a1a0a, 0 7px 20px #1a3d1a55, 0 1px 0 #88dd8844 inset;
        }
        .reg-btn:active:not(:disabled) { transform: translateY(1px); }
        .reg-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .back-link {
          font-family: 'IM Fell English', serif; font-style: italic;
          font-size: 0.78rem; color: var(--ink-faded);
          margin-top: 16px; text-align: center;
          position: relative; z-index: 1; line-height: 1.6;
        }
        .back-link button {
          background: none; border: none;
          color: var(--seal-red);
          font-family: 'IM Fell English', serif; font-style: italic; font-size: inherit;
          cursor: pointer; padding: 0;
          text-decoration: underline; text-decoration-color: #8b1a1a55;
          text-underline-offset: 3px; transition: color 0.2s;
        }
        .back-link button:hover { color: #5a0a0a; }

        .reg-wax-seal {
          position: absolute; bottom: -24px; left: 36px;
          width: 72px; height: 72px; z-index: 10;
          filter: drop-shadow(2px 4px 8px #00000055);
          animation: sealAppear 0.6s ease 0.7s both;
        }
        @keyframes sealAppear {
          0%   { opacity: 0; transform: scale(0.4) rotate(20deg); }
          70%  { transform: scale(1.1) rotate(-3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        .corner-flourish {
          position: absolute; opacity: 0.18; pointer-events: none; z-index: 0;
          font-size: 3.5rem; color: var(--gold); line-height: 1;
        }
        .cf-tl { top: 8px; left: 10px; transform: rotate(-10deg); }
        .cf-br { bottom: 8px; right: 10px; transform: rotate(170deg); }

        .back-home-su {
          position: absolute; top: 20px; left: 20px;
          font-family: 'IM Fell English', serif; font-style: italic;
          font-size: 0.76rem; color: #f4e4c166;
          background: none; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 6px;
          transition: color 0.2s; z-index: 50;
        }
        .back-home-su:hover { color: #f4e4c1cc; }

        @media (max-width: 500px) {
          .reg-parchment { padding: 32px 26px 44px; }
          .field-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="signup-bg">
        <button className="back-home-su" onClick={() => navigate("/")}>
          ← Return to Estate
        </button>

        <div className="reg-letter-outer">
          <div className="reg-shadow" />

          <div className="reg-parchment">
            <div className="rfold1" />
            <div className="rfold1-sh" />

            <div className="corner-flourish cf-tl">❧</div>
            <div className="corner-flourish cf-br">❧</div>

            <div className="reg-number">
              Guest Register<br />
              No. &nbsp;_ _ _ _
            </div>

            <div className="reg-ornament">✦ &nbsp;·&nbsp; ✦</div>

            <h1 className="reg-heading">Guest Register</h1>
            <p className="reg-subheading">
              Leonine Villa Natura Resort — Sri Lanka &nbsp;·&nbsp; Est. Heritage
            </p>

            <div className="reg-divider">
              <div className="rd-rule" /><div className="rd-diamond" /><div className="rd-diamond" /><div className="rd-diamond" /><div className="rd-rule" />
            </div>

            {success ? (
              <div className="reg-success">
                ✦ &nbsp; Your name has been duly inscribed in our Guest Register. &nbsp; ✦<br/>
                <em>We shall receive you presently... Directing you to the entrance hall.</em>
              </div>
            ) : (
              <>
                {error && <div className="reg-error">⚠ &nbsp;{error}</div>}

                {/* First Name + Last Name side by side */}
                <div className="field-row">
                  {[
                    { name: "firstName", label: "First Name",          placeholder: "e.g. James"  },
                    { name: "lastName",  label: "Last Name & Title",   placeholder: "e.g. Perera" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="field-label">
                        {f.label}<span className="req"> *</span>
                      </label>
                      <div className={`field-wrap ${inkFocus === f.name ? "focused" : ""}`}>
                        <div className="ink-dot-r" />
                        <input
                          type="text"
                          name={f.name}
                          placeholder={f.placeholder}
                          className="ink-field-r"
                          value={form[f.name]}
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
                <div>
                  <label className="field-label">
                    Electronic Correspondence<span className="req"> *</span>
                  </label>
                  <div className={`field-wrap ${inkFocus === "email" ? "focused" : ""}`}>
                    <div className="ink-dot-r" />
                    <input
                      type="email"
                      name="email"
                      placeholder="your.name@post.com"
                      className="ink-field-r"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setInkFocus("email")}
                      onBlur={() => setInkFocus(null)}
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Phone + WhatsApp side by side */}
                <div className="field-row">
                  {[
                    { name: "phone",    label: "Calling Number",   placeholder: "+94 77 000 0000" },
                    { name: "whatsApp", label: "WhatsApp Number",  placeholder: "+94 77 000 0000" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="field-label">
                        {f.label}<span className="req"> *</span>
                      </label>
                      <div className={`field-wrap ${inkFocus === f.name ? "focused" : ""}`}>
                        <div className="ink-dot-r" />
                        <input
                          type="tel"
                          name={f.name}
                          placeholder={f.placeholder}
                          className="ink-field-r"
                          value={form[f.name]}
                          onChange={handleChange}
                          onFocus={() => setInkFocus(f.name)}
                          onBlur={() => setInkFocus(null)}
                          autoComplete="tel"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Password + Confirm Password side by side */}
                <div className="field-row">
                  {[
                    { name: "password",        label: "Secret Passphrase",    placeholder: "··········" },
                    { name: "confirmPassword", label: "Re-inscribe Passphrase", placeholder: "··········" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="field-label">
                        {f.label}<span className="req"> *</span>
                      </label>
                      <div className={`field-wrap ${inkFocus === f.name ? "focused" : ""}`}>
                        <div className="ink-dot-r" />
                        <input
                          type="password"
                          name={f.name}
                          placeholder={f.placeholder}
                          className="ink-field-r"
                          value={form[f.name]}
                          onChange={handleChange}
                          onFocus={() => setInkFocus(f.name)}
                          onBlur={() => setInkFocus(null)}
                          autoComplete="new-password"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <p style={{
                  fontFamily:"'IM Fell English', serif", fontStyle:"italic",
                  fontSize:"0.7rem", color:"#8b6030aa", marginBottom:12,
                  position:"relative", zIndex:1, lineHeight:1.5,
                }}>
                  By inscribing your name herein, you consent to the estate's terms of hospitality
                  and our solemn privacy charter.
                </p>

                <button className="reg-btn" onClick={handleSignup} disabled={loading}>
                  {loading ? "Recording in the register..." : "✦  Inscribe My Name  ✦"}
                </button>

                <div className="back-link">
                  Already a registered guest?{" "}
                  <button onClick={() => navigate("/login")}>
                    Return to the entrance hall
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="reg-wax-seal">
            <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="36" cy="36" r="34" fill="url(#gseal)" />
              <circle cx="36" cy="36" r="30" fill="none" stroke="#f4e4c188" strokeWidth="1" />
              <text x="36" y="43" textAnchor="middle"
                fontFamily="Cinzel, serif" fontSize="19" fontWeight="700"
                fill="#f4e4c1cc">V</text>
              <path id="gsealRing" d="M36 36 m-25,0 a25,25 0 1,1 50,0 a25,25 0 1,1 -50,0" fill="none"/>
              <text fontSize="5.5" fontFamily="Cinzel, serif" fill="#f4e4c177" letterSpacing="0.16em">
                <textPath href="#gsealRing">VILLA NATURA · REGISTER · </textPath>
              </text>
              <defs>
                <radialGradient id="gseal" cx="36" cy="30" r="34" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2d6030" />
                  <stop offset="0.6" stopColor="#1a4020" />
                  <stop offset="1" stopColor="#0a2010" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}