import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Loginpage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inkFocus, setInkFocus] = useState(null);

  function handleLogin() {
    setError("");
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setLoading(true);
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", { email, password })
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        setLoading(false);
        if (res.data.user.type === "admin") {
          navigate("/admin");
        } else {
          const redirectTo = location.state?.from || "/";
          console.log("STATE:", location.state, "REDIRECT:", redirectTo);
          navigate(redirectTo);
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Login failed. Please try again.");
        setLoading(false);
      });
  }

  function handleGoogleLogin() {
    window.location.href = import.meta.env.VITE_BACKEND_URL + "/api/users/auth/google";
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=IM+Fell+English:ital@0;1&family=Cinzel:wght@400;600&display=swap');
        :root{--ink:#2c1810;--ink-faded:#5a3e2b;--seal-red:#8b1a1a;--gold:#b8860b;}
        *,*::before,*::after{box-sizing:border-box;}
        .login-bg{min-height:100vh;width:100%;display:flex;align-items:center;justify-content:center;
          padding:48px 16px;position:relative;overflow:hidden;
          background:radial-gradient(ellipse 120% 80% at 50% 30%,#1a2a0a 0%,#0c1808 60%,#05090f 100%);
          font-family:'IM Fell English',serif;}
        .login-mist{position:absolute;inset:0;pointer-events:none;
          background:radial-gradient(ellipse 60% 50% at 20% 50%,#2d4a1a22 0%,transparent 60%),
                    radial-gradient(ellipse 60% 50% at 80% 50%,#2d4a1a22 0%,transparent 60%);}
        .login-outer{position:relative;width:min(420px,94vw);animation:loginDrop 0.9s cubic-bezier(.16,1,.3,1) both;}
        @keyframes loginDrop{0%{opacity:0;transform:translateY(-50px) rotate(1deg)}100%{opacity:1;transform:none}}
        .login-shadow{position:absolute;bottom:-16px;left:8%;right:8%;height:28px;
          background:radial-gradient(ellipse,#00000066 0%,transparent 70%);filter:blur(8px);}
        .login-parchment{position:relative;
          background:radial-gradient(ellipse 45% 35% at 88% 12%,#c8a96844 0%,transparent 60%),
                    radial-gradient(ellipse 38% 28% at 12% 88%,#b8904422 0%,transparent 60%),
                    linear-gradient(160deg,#f7e8c8 0%,#f0d9a8 35%,#e8cd96 65%,#f2e0b0 100%);
          border-radius:2px;padding:44px 44px 56px;overflow:visible;
          box-shadow:0 1px 0 #fff9 inset,0 -1px 0 #b8904444 inset,2px 0 0 #fff6 inset,4px 8px 32px #00000055,8px 16px 60px #00000033;
          border:1px solid #d4b88855;}
        .login-parchment::after{content:'';position:absolute;inset:0;border-radius:2px;pointer-events:none;opacity:0.45;
          background-image:repeating-linear-gradient(to bottom,transparent 0px,transparent 31px,#a0845520 32px,transparent 33px);}
        .lp-fold{position:absolute;left:0;right:0;height:1px;pointer-events:none;
          background:linear-gradient(90deg,transparent 4%,#b8904433 20%,#a07a3844 50%,#b8904433 80%,transparent 96%);}
        .wax-seal{position:absolute;bottom:-28px;right:32px;width:78px;height:78px;z-index:10;
          filter:drop-shadow(2px 4px 8px #00000055);animation:sealAppear 0.6s ease 0.7s both;}
        @keyframes sealAppear{0%{opacity:0;transform:scale(0.4) rotate(-20deg)}70%{transform:scale(1.08) rotate(3deg)}100%{opacity:1;transform:scale(1) rotate(0deg)}}
        .ornament{text-align:center;margin-bottom:6px;color:var(--gold);font-size:1.1rem;letter-spacing:0.3em;opacity:0.7;}
        .lp-heading{font-family:'Playfair Display',serif;font-size:clamp(1.4rem,4vw,1.8rem);font-weight:700;color:var(--ink);
          text-align:center;margin:10px 0 4px;letter-spacing:0.06em;line-height:1.2;position:relative;z-index:1;}
        .lp-sub{font-style:italic;font-size:0.74rem;color:var(--ink-faded);text-align:center;margin-bottom:14px;position:relative;z-index:1;}
        .quill-div{display:flex;align-items:center;gap:8px;margin:8px 0 18px;position:relative;z-index:1;}
        .div-rule{flex:1;height:1px;background:linear-gradient(90deg,transparent,#8b6030aa,transparent);}
        .div-dia{width:5px;height:5px;background:var(--gold);transform:rotate(45deg);opacity:0.7;flex-shrink:0;}
        .label-row{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:3px;position:relative;z-index:1;}
        .field-label{font-style:italic;font-size:0.74rem;color:var(--ink-faded);display:block;letter-spacing:0.04em;}
        .forgot-link{font-style:italic;font-size:0.7rem;color:var(--seal-red);background:none;border:none;cursor:pointer;
          padding:0;text-decoration:underline;text-decoration-color:#8b1a1a55;text-underline-offset:3px;transition:color 0.2s;font-family:'IM Fell English',serif;}
        .forgot-link:hover{color:#5a0a0a;}
        .field-wrap{position:relative;z-index:1;margin-bottom:16px;}
        .ink-dot{position:absolute;left:-5px;bottom:9px;width:4px;height:4px;border-radius:50%;
          background:var(--ink);opacity:0;transition:opacity 0.3s;pointer-events:none;}
        .field-wrap.focused .ink-dot{opacity:0.3;}
        .ink-field{width:100%;background:transparent;border:none;border-bottom:1.5px solid #a07838cc;outline:none;
          font-family:'IM Fell English',serif;font-style:italic;font-size:0.96rem;color:var(--ink);
          padding:4px 2px 5px;transition:border-color 0.3s;position:relative;z-index:1;letter-spacing:0.03em;}
        .ink-field::placeholder{color:#a0845577;font-style:italic;font-size:0.88rem;}
        .ink-field:focus{border-bottom-color:var(--ink);}
        .pass-wrap{position:relative;}
        .pass-wrap .ink-field{padding-right:32px;}
        .pass-eye{position:absolute;right:2px;bottom:6px;background:none;border:none;cursor:pointer;
          color:#a07838cc;font-size:1rem;padding:0;z-index:2;transition:color 0.2s;}
        .pass-eye:hover{color:var(--ink);}
        .error-msg{font-style:italic;font-size:0.78rem;color:#8b1a1a;margin-bottom:12px;
          padding:6px 10px;border-left:2px solid #8b1a1a88;background:#8b1a1a08;position:relative;z-index:1;animation:fadeIn 0.4s ease;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1}}
        .seal-btn{width:100%;padding:13px 0;margin-top:4px;
          background:linear-gradient(160deg,#6b2a2a 0%,#8b1a1a 40%,#6b1010 100%);
          color:#f4e4c1;border:none;border-radius:2px;font-family:'Cinzel',serif;font-size:0.82rem;
          letter-spacing:0.22em;cursor:pointer;position:relative;z-index:1;
          box-shadow:0 2px 0 #3a0a0a,0 4px 12px #8b1a1a44,0 1px 0 #ff9a6644 inset;
          transition:transform 0.15s,box-shadow 0.15s;overflow:hidden;text-transform:uppercase;}
        .seal-btn::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,#ffffff18 0%,transparent 50%);pointer-events:none;}
        .seal-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 3px 0 #3a0a0a,0 6px 18px #8b1a1a66,0 1px 0 #ff9a6644 inset;}
        .seal-btn:active:not(:disabled){transform:translateY(1px);}
        .seal-btn:disabled{opacity:0.65;cursor:not-allowed;}
        .or-divider{display:flex;align-items:center;gap:10px;margin:16px 0;position:relative;z-index:1;}
        .or-line{flex:1;height:1px;background:linear-gradient(90deg,transparent,#a0783855,transparent);}
        .or-text{font-style:italic;font-size:0.7rem;color:var(--ink-faded);white-space:nowrap;}
        .google-btn{width:100%;padding:11px 0;display:flex;align-items:center;justify-content:center;gap:10px;
          background:#fff;border:1.5px solid #d4b88899;border-radius:2px;cursor:pointer;position:relative;z-index:1;
          font-family:'IM Fell English',serif;font-style:italic;font-size:0.88rem;color:#3c1a0a;
          transition:box-shadow 0.2s,border-color 0.2s;box-shadow:0 1px 4px #00000011;}
        .google-btn:hover{border-color:#b8860b88;box-shadow:0 2px 8px #b8860b22;}
        .google-icon{width:18px;height:18px;flex-shrink:0;}
        .note{font-style:italic;font-size:0.76rem;color:var(--ink-faded);text-align:center;
          margin-top:16px;position:relative;z-index:1;line-height:1.6;}
        .note button{background:none;border:none;color:var(--seal-red);font-family:'IM Fell English',serif;
          font-style:italic;font-size:inherit;cursor:pointer;padding:0;
          text-decoration:underline;text-decoration-color:#8b1a1a55;text-underline-offset:3px;transition:color 0.2s;}
        .note button:hover{color:#5a0a0a;}
        .back-home{position:absolute;top:20px;left:20px;font-family:'IM Fell English',serif;font-style:italic;
          font-size:0.76rem;color:#f4e4c166;background:none;border:none;cursor:pointer;
          display:flex;align-items:center;gap:6px;transition:color 0.2s;z-index:50;}
        .back-home:hover{color:#f4e4c1cc;}
        @media(max-width:480px){.login-parchment{padding:36px 24px 52px}}
      `}</style>

      <div className="login-bg">
        <button className="back-home" onClick={() => navigate("/")}>← Return to Estate</button>
        <div className="login-mist" />
        <div className="login-outer">
          <div className="login-shadow" />
          <div className="login-parchment">
            <div className="lp-fold" style={{ top: "30%" }} />
            <div className="ornament">✦ &nbsp;·&nbsp; ✦</div>
            <h1 className="lp-heading">Welcome Back</h1>
            <p className="lp-sub">Leonine Villa Natura Resort — Kandy, Sri Lanka</p>
            <div className="quill-div"><div className="div-rule" /><div className="div-dia" /><div className="div-rule" /></div>

            {error && <div className="error-msg">⚠ &nbsp;{error}</div>}

            <label className="field-label">Email Address <span style={{ color: "var(--seal-red)" }}>*</span></label>
            <div className={`field-wrap ${inkFocus === "email" ? "focused" : ""}`}>
              <div className="ink-dot" />
              <input type="email" placeholder="your.name@email.com" className="ink-field"
                value={email} onChange={e => setEmail(e.target.value)}
                onFocus={() => setInkFocus("email")} onBlur={() => setInkFocus(null)}
                onKeyDown={e => e.key === "Enter" && handleLogin()} />
            </div>

            <div className="label-row">
              <label className="field-label">Password <span style={{ color: "var(--seal-red)" }}>*</span></label>
              <button className="forgot-link" onClick={() => navigate("/forgot-password")}>Forgot password?</button>
            </div>
            <div className={`field-wrap pass-wrap ${inkFocus === "pass" ? "focused" : ""}`}>
              <div className="ink-dot" />
              <input type={showPass ? "text" : "password"} placeholder="Your password" className="ink-field"
                value={password} onChange={e => setPassword(e.target.value)}
                onFocus={() => setInkFocus("pass")} onBlur={() => setInkFocus(null)}
                onKeyDown={e => e.key === "Enter" && handleLogin()} />
              <button type="button" className="pass-eye" onClick={() => setShowPass(p => !p)}>
                {showPass ? "🙈" : "👁"}
              </button>
            </div>

            <button className="seal-btn" onClick={handleLogin} disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>

            <div className="or-divider">
              <div className="or-line" /><span className="or-text">or continue with</span><div className="or-line" />
            </div>

            <button className="google-btn" onClick={handleGoogleLogin}>
              <svg className="google-icon" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="note" style={{ marginTop: 20 }}>
              Don't have an account?{" "}
              <button onClick={() => navigate("/signup")}>Sign up here</button>
            </div>
          </div>

          <div className="wax-seal">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="38" fill="url(#loginSeal)"/>
              <circle cx="40" cy="40" r="34" fill="none" stroke="#f4e4c188" strokeWidth="1"/>
              <text x="40" y="47" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="20" fontWeight="700" fill="#f4e4c1cc">L</text>
              <path id="loginRing" d="M40 40 m-28,0 a28,28 0 1,1 56,0 a28,28 0 1,1 -56,0" fill="none"/>
              <text fontSize="5.5" fontFamily="Cinzel,serif" fill="#f4e4c188" letterSpacing="0.18em">
                <textPath href="#loginRing">LEONINE VILLA · SRI LANKA · </textPath>
              </text>
              <defs>
                <radialGradient id="loginSeal" cx="40" cy="35" r="38" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a02020"/><stop offset="0.6" stopColor="#7a1010"/><stop offset="1" stopColor="#4a0808"/>
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}