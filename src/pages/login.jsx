import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inkFocus, setInkFocus] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  function handleLogin() {
    if (!email || !password) {
      setError("Pray complete both fields before presenting your credentials.");
      return;
    }
    setLoading(true);
    setError("");
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
        email,
        password,
      })
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        if (res.data.user && res.data.user.type === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ||
            "The ink has run dry — please check your credentials."
        );
        setLoading(false);
      });
  }

  function handleGoogleLogin() {
    // Redirects to backend Google OAuth endpoint
    window.location.href = import.meta.env.VITE_BACKEND_URL + "/api/users/auth/google";
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleLogin();
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=IM+Fell+English:ital@0;1&family=Cinzel:wght@400;600&display=swap');

        :root {
          --ink:        #2c1810;
          --ink-faded:  #5a3e2b;
          --seal-red:   #8b1a1a;
          --gold:       #b8860b;
          --green-dark: #1a3d1a;
        }

        .login-page-bg {
          min-height: 100vh; width: 100%;
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
          background: radial-gradient(ellipse 120% 80% at 50% 30%, #1a2a0a 0%, #0c1808 60%, #05090f 100%);
          font-family: 'IM Fell English', serif;
        }

        .jungle-mist {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 50% at 20% 50%, #2d4a1a22 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 50%, #2d4a1a22 0%, transparent 60%);
        }

        .letter-outer {
          position: relative; width: min(520px, 94vw);
          animation: letterDrop 0.9s cubic-bezier(.16,1,.3,1) both;
        }
        @keyframes letterDrop {
          0%   { opacity: 0; transform: translateY(-60px) rotate(-1.5deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0deg); }
        }

        .letter-shadow {
          position: absolute; bottom: -18px; left: 8%; right: 8%; height: 30px;
          background: radial-gradient(ellipse, #00000066 0%, transparent 70%);
          filter: blur(8px);
        }

        .parchment {
          position: relative;
          background:
            radial-gradient(ellipse 45% 35% at 12% 14%, #c8a96844 0%, transparent 60%),
            radial-gradient(ellipse 38% 28% at 88% 86%, #b8904422 0%, transparent 60%),
            linear-gradient(160deg, #f7e8c8 0%, #f0d9a8 35%, #e8cd96 65%, #f2e0b0 100%);
          border-radius: 2px; padding: 44px 48px 52px;
          box-shadow:
            0 1px 0 #fff9 inset, 0 -1px 0 #b8904444 inset, 2px 0 0 #fff6 inset,
            4px 8px 32px #00000055, 8px 16px 60px #00000033;
          border: 1px solid #d4b88855; overflow: visible;
        }
        .parchment::before {
          content: ''; position: absolute; inset: 0; border-radius: 2px; opacity: 0.22; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E");
        }
        .parchment::after {
          content: ''; position: absolute; inset: 0; border-radius: 2px; pointer-events: none; opacity: 0.55;
          background-image: repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, #a0845522 32px, transparent 33px);
        }

        .fold-line {
          position: absolute; top: 30%; left: 0; right: 0; height: 1px; pointer-events: none;
          background: linear-gradient(90deg, transparent 4%, #b8904433 20%, #a07a3844 50%, #b8904433 80%, transparent 96%);
        }
        .fold-shadow {
          position: absolute; top: calc(30% + 1px); left: 0; right: 0; height: 4px; pointer-events: none;
          background: linear-gradient(to bottom, #00000011, transparent);
        }

        .postmark {
          position: absolute; top: 22px; right: 28px; width: 72px; height: 72px;
          border: 2px solid #8b4513aa; border-radius: 50%;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          transform: rotate(12deg); opacity: 0.6; pointer-events: none;
        }
        .postmark-inner {
          width: 58px; height: 58px; border: 1px solid #8b4513aa; border-radius: 50%;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px;
        }
        .postmark span { font-family: 'Cinzel', serif; font-size: 6.5px; color: #6b3410; letter-spacing: 0.12em; text-align: center; line-height: 1.3; text-transform: uppercase; }
        .postmark .year { font-size: 9px; font-weight: 600; letter-spacing: 0.08em; }

        .stamp-corner {
          position: absolute; top: 18px; right: 110px; width: 42px; height: 52px;
          border: 1.5px solid #8b4513aa; padding: 2px; opacity: 0.55; pointer-events: none;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;
        }
        .stamp-inner {
          border: 1px solid #8b451388; width: 100%; height: 100%;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .stamp-corner span { font-family: 'Cinzel', serif; font-size: 5.5px; color: #6b3410; letter-spacing: 0.1em; text-align: center; text-transform: uppercase; }
        .stamp-corner .stamp-lion { font-size: 14px; line-height: 1; }

        .wax-seal {
          position: absolute; bottom: -28px; right: 36px; width: 80px; height: 80px;
          z-index: 10; filter: drop-shadow(2px 4px 8px #00000055);
          animation: sealAppear 0.6s ease 0.7s both;
        }
        @keyframes sealAppear {
          0%   { opacity: 0; transform: scale(0.4) rotate(-20deg); }
          70%  { transform: scale(1.08) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        .ornament { text-align: center; margin-bottom: 6px; color: var(--gold); font-size: 1.1rem; letter-spacing: 0.3em; opacity: 0.7; }
        .letter-address { font-family: 'IM Fell English', serif; font-style: italic; font-size: 0.72rem; color: var(--ink-faded); margin-bottom: 2px; letter-spacing: 0.04em; line-height: 1.5; }
        .letter-heading { font-family: 'Playfair Display', serif; font-size: clamp(1.55rem, 4.5vw, 2rem); font-weight: 700; color: var(--ink); text-align: center; margin: 10px 0 4px; letter-spacing: 0.06em; line-height: 1.15; position: relative; z-index: 1; }

        .quill-divider { display: flex; align-items: center; gap: 8px; margin: 8px 0 18px; position: relative; z-index: 1; }
        .divider-rule { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #8b6030aa, transparent); }
        .divider-diamond { width: 6px; height: 6px; background: var(--gold); transform: rotate(45deg); opacity: 0.7; flex-shrink: 0; }

        .salutation { font-family: 'IM Fell English', serif; font-style: italic; font-size: 0.82rem; color: var(--ink-faded); margin-bottom: 16px; position: relative; z-index: 1; line-height: 1.55; }

        .redirect-notice {
          font-family: 'IM Fell English', serif; font-style: italic; font-size: 0.76rem; color: #1a3d1a;
          margin-bottom: 14px; padding: 7px 12px; border-left: 2px solid #1a3d1a88; background: #1a3d1a08;
          position: relative; z-index: 1; animation: fadeIn 0.4s ease; line-height: 1.55;
        }

        .field-label { font-family: 'IM Fell English', serif; font-size: 0.74rem; color: var(--ink-faded); font-style: italic; margin-bottom: 3px; display: block; letter-spacing: 0.04em; position: relative; z-index: 1; }

        /* Password row: label + forgot link side by side */
        .password-label-row {
          display: flex; align-items: baseline; justify-content: space-between;
          margin-bottom: 3px; position: relative; z-index: 1;
        }
        .forgot-link {
          font-family: 'IM Fell English', serif; font-style: italic; font-size: 0.68rem;
          color: var(--seal-red); background: none; border: none; cursor: pointer; padding: 0;
          text-decoration: underline; text-decoration-color: #8b1a1a44; text-underline-offset: 3px;
          transition: color 0.2s; letter-spacing: 0.02em;
        }
        .forgot-link:hover { color: #5a0a0a; }

        .ink-field {
          width: 100%; background: transparent; border: none; border-bottom: 1.5px solid #a07838cc;
          outline: none; font-family: 'IM Fell English', serif; font-style: italic; font-size: 0.98rem;
          color: var(--ink); padding: 4px 2px 5px; margin-bottom: 16px; transition: border-color 0.3s;
          position: relative; z-index: 1; letter-spacing: 0.03em;
        }
        .ink-field::placeholder { color: #a0845577; font-style: italic; font-size: 0.88rem; }
        .ink-field:focus { border-bottom-color: var(--ink); background: linear-gradient(to bottom, transparent 95%, #8b603018 100%); }

        .field-wrap { position: relative; z-index: 1; }
        .ink-dot { position: absolute; left: -6px; bottom: 10px; width: 5px; height: 5px; border-radius: 50%; background: var(--ink); opacity: 0; transition: opacity 0.3s; pointer-events: none; }
        .field-wrap.focused .ink-dot { opacity: 0.35; }

        .error-msg { font-family: 'IM Fell English', serif; font-style: italic; font-size: 0.78rem; color: #8b1a1a; margin-bottom: 12px; padding: 6px 10px; border-left: 2px solid #8b1a1a88; background: #8b1a1a08; position: relative; z-index: 1; animation: fadeIn 0.4s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; } }

        .seal-btn {
          width: 100%; padding: 13px 0; margin-top: 6px;
          background: linear-gradient(160deg, #6b2a2a 0%, #8b1a1a 40%, #6b1010 100%);
          color: #f4e4c1; border: none; border-radius: 2px; font-family: 'Cinzel', serif;
          font-size: 0.82rem; letter-spacing: 0.25em; cursor: pointer; position: relative; z-index: 1;
          box-shadow: 0 2px 0 #3a0a0a, 0 4px 12px #8b1a1a44, 0 1px 0 #ff9a6644 inset;
          transition: transform 0.15s, box-shadow 0.15s; overflow: hidden; text-transform: uppercase;
        }
        .seal-btn::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, #ffffff18 0%, transparent 50%); pointer-events: none; }
        .seal-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 3px 0 #3a0a0a, 0 6px 18px #8b1a1a66, 0 1px 0 #ff9a6644 inset; }
        .seal-btn:active:not(:disabled) { transform: translateY(1px); }
        .seal-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        /* OR divider */
        .or-divider { display: flex; align-items: center; gap: 10px; margin: 16px 0; position: relative; z-index: 1; }
        .or-rule { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #a0784444, transparent); }
        .or-text { font-family: 'IM Fell English', serif; font-style: italic; font-size: 0.7rem; color: #a08060aa; white-space: nowrap; letter-spacing: 0.06em; }

        /* Google button */
        .google-btn {
          width: 100%; padding: 11px 0; background: #fff; color: #3c3c3c;
          border: 1.5px solid #d4b88866; border-radius: 2px; font-family: 'Cinzel', serif;
          font-size: 0.76rem; letter-spacing: 0.12em; cursor: pointer; position: relative; z-index: 1;
          transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 10px;
          box-shadow: 0 1px 4px #00000018; text-transform: uppercase;
        }
        .google-btn:hover { background: #f8f8f8; border-color: #a07838aa; box-shadow: 0 2px 8px #00000022; transform: translateY(-1px); }
        .google-btn:active { transform: translateY(0); }
        .google-icon { width: 16px; height: 16px; flex-shrink: 0; }

        /* Sign-up section */
        .signup-divider { display: flex; align-items: center; gap: 10px; margin: 16px 0 14px; position: relative; z-index: 1; }
        .signup-divider-rule { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #a0784444, transparent); }
        .signup-divider-text { font-family: 'IM Fell English', serif; font-style: italic; font-size: 0.72rem; color: #a08060aa; white-space: nowrap; letter-spacing: 0.05em; }

        .signup-btn {
          width: 100%; padding: 11px 0; background: transparent; color: var(--ink-faded);
          border: 1.5px solid #a0783888; border-radius: 2px; font-family: 'Cinzel', serif;
          font-size: 0.78rem; letter-spacing: 0.2em; cursor: pointer; position: relative; z-index: 1;
          transition: all 0.2s; text-transform: uppercase;
        }
        .signup-btn:hover { background: #a0783811; border-color: #a07838cc; color: var(--ink); transform: translateY(-1px); }
        .signup-btn:active { transform: translateY(0px); }

        .back-home {
          position: absolute; top: 20px; left: 20px; font-family: 'IM Fell English', serif;
          font-style: italic; font-size: 0.76rem; color: #f4e4c166; background: none; border: none;
          cursor: pointer; display: flex; align-items: center; gap: 6px; transition: color 0.2s; z-index: 50; text-decoration: none;
        }
        .back-home:hover { color: #f4e4c1cc; }
      `}</style>

      <div className="login-page-bg">
        <button className="back-home" onClick={() => navigate("/")}>
          ← Return to Estate
        </button>

        <div className="jungle-mist" />

        <div className="letter-outer">
          <div className="letter-shadow" />

          <div className="parchment">
            <div className="fold-line" />
            <div className="fold-shadow" />

            <div className="postmark">
              <div className="postmark-inner">
                <span>Leonine Villa</span>
                <span className="year">2026</span>
                <span>Sri Lanka</span>
              </div>
            </div>

            <div className="stamp-corner">
              <div className="stamp-inner">
                <img src="/logo.png" alt="Logo" className="stamp-lion" />
                <span>LVN</span>
              </div>
            </div>

            <div className="ornament">✦ &nbsp;·&nbsp; ✦</div>

            <div className="letter-address">
              To: The Honoured Guest &nbsp;&nbsp; · &nbsp;&nbsp; Leonine Villa Natura Resort, Sri Lanka
            </div>

            <h1 className="letter-heading">A Letter of Welcome</h1>

            <div className="quill-divider">
              <div className="divider-rule" />
              <div className="divider-diamond" />
              <div className="divider-rule" />
            </div>

            {from !== "/" && (
              <div className="redirect-notice">
                🔏 &nbsp; To proceed with your{" "}
                {from === "/booking" ? "reservation" : "request"}, pray sign in
                to your account — you shall be returned forthwith.
              </div>
            )}

            <p className="salutation">
              Dear Esteemed Traveller, pray inscribe your credentials below,
              that we may receive thee in the grand tradition of our estate.
            </p>

            <label className="field-label">Your Address (Electronic Post)</label>
            <div className={`field-wrap ${inkFocus === "email" ? "focused" : ""}`}>
              <div className="ink-dot" />
              <input
                type="email"
                placeholder="your.name@correspondence.com"
                className="ink-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setInkFocus("email")}
                onBlur={() => setInkFocus(null)}
                onKeyDown={handleKeyDown}
                autoComplete="email"
              />
            </div>

            {/* Password label row with Forgot Password inline */}
            <div className="password-label-row">
              <span className="field-label" style={{ marginBottom: 0 }}>Secret Passphrase</span>
              <button
                className="forgot-link"
                type="button"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </button>
            </div>
            <div className={`field-wrap ${inkFocus === "password" ? "focused" : ""}`}>
              <div className="ink-dot" />
              <input
                type="password"
                placeholder="··········"
                className="ink-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setInkFocus("password")}
                onBlur={() => setInkFocus(null)}
                onKeyDown={handleKeyDown}
                autoComplete="current-password"
              />
            </div>

            {error && <div className="error-msg">⚠ &nbsp;{error}</div>}

            {/* Primary Login button */}
            <button className="seal-btn" onClick={handleLogin} disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>

            {/* OR divider */}
            <div className="or-divider">
              <div className="or-rule" />
              <span className="or-text">or continue with</span>
              <div className="or-rule" />
            </div>

            {/* Google Sign-In */}
            <button className="google-btn" type="button" onClick={handleGoogleLogin}>
              <svg className="google-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Sign in with Google
            </button>

            {/* Sign Up */}
            <div className="signup-divider">
              <div className="signup-divider-rule" />
              <span className="signup-divider-text">Don't have an account?</span>
              <div className="signup-divider-rule" />
            </div>

            <button className="signup-btn" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>

          <div className="wax-seal">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="38" fill="url(#sealGrad)" />
              <circle cx="40" cy="40" r="34" fill="none" stroke="#f4e4c188" strokeWidth="1" />
              <circle cx="40" cy="40" r="29" fill="none" stroke="#f4e4c133" strokeWidth="0.5" />
              <text x="40" y="47" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="22" fontWeight="700" fill="#f4e4c1cc" letterSpacing="0.05em">L</text>
              <path id="sealRing" d="M40 40 m-28,0 a28,28 0 1,1 56,0 a28,28 0 1,1 -56,0" fill="none"/>
              <text fontSize="6" fontFamily="Cinzel, serif" fill="#f4e4c188" letterSpacing="0.18em">
                <textPath href="#sealRing">LEONINE VILLA · SRI LANKA · </textPath>
              </text>
              <defs>
                <radialGradient id="sealGrad" cx="40" cy="35" r="38" gradientUnits="userSpaceOnUse">
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