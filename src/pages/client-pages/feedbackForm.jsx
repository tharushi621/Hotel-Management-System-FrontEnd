import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FeedbackPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    bookingId: "",
    rating: 0,
    comment: "",
  });
  const [hoverRating, setHoverRating]   = useState(0);
  const [inkFocus, setInkFocus]         = useState(null);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [success, setSuccess]           = useState(false);
  const [submittedRef, setSubmittedRef] = useState(null);

  useEffect(() => {
    if (!token || token === "null") navigate("/login");
  }, [token, navigate]);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit() {
    setError("");

    if (!form.bookingId || isNaN(Number(form.bookingId))) {
      setError("Please enter a valid Booking ID from your reservation.");
      return;
    }
    if (!form.rating || form.rating < 1 || form.rating > 5) {
      setError("Please bestow a rating between 1 and 5 stars.");
      return;
    }
    if (!form.comment.trim()) {
      setError("A brief account of your stay is most appreciated.");
      return;
    }

    setLoading(true);

    // POST /api/feedbacks — matches feedbackRouter.post("/", protect, createFeedback)
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/feedbacks`,
        {
          bookingId: Number(form.bookingId),
          rating: form.rating,
          comment: form.comment.trim(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setSubmittedRef(res.data.result);
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        const msg = err.response?.data?.message;
        const status = err.response?.status;

        if (status === 401 || status === 403) {
          setError("Your session has expired — pray sign in once more.");
        } else if (status === 404) {
          setError("No booking found for that ID, or it does not belong to your account.");
        } else if (status === 400) {
          setError(msg || "Feedback has already been submitted for this booking.");
        } else {
          setError(msg || "The courier has faltered — please try again presently.");
        }
        setLoading(false);
      });
  }

  const STAR_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];
  const displayRating = hoverRating || form.rating;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=IM+Fell+English:ital@0;1&family=Cinzel:wght@400;600&display=swap');

        :root {
          --ink: #2c1810; --ink-faded: #5a3e2b;
          --seal-red: #8b1a1a; --gold: #b8860b;
          --green-dk: #1a3d1a; --green-md: #2d5a30;
        }

        .fb-bg {
          min-height: 100vh; width: 100%;
          display: flex; align-items: flex-start; justify-content: center;
          padding: 60px 16px 80px;
          background: radial-gradient(ellipse 120% 80% at 50% 20%, #1a2a0a 0%, #0c1808 55%, #05090f 100%);
          font-family: 'IM Fell English', serif;
          position: relative; overflow: hidden;
        }
        .fb-bg::before {
          content: ''; position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 50% 40% at 10% 60%, #2d4a1a1a 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 90% 40%, #2d4a1a1a 0%, transparent 60%);
          pointer-events: none;
        }
        .fb-bg::after {
          content: ''; position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23c9a84c' fill-opacity='0.025'%3E%3Cpath d='M40 0C17.9 0 0 17.9 0 40s17.9 40 40 40 40-17.9 40-40S62.1 0 40 0zm0 70C23.4 70 10 56.6 10 40S23.4 10 40 10s30 13.4 30 30-13.4 30-30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .fb-outer {
          position: relative; width: min(580px, 96vw);
          animation: bookDrop 0.9s cubic-bezier(.16,1,.3,1) both; z-index: 1;
        }
        @keyframes bookDrop {
          0%   { opacity: 0; transform: translateY(-40px) rotate(-0.8deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        .fb-shadow {
          position: absolute; bottom: -22px; left: 6%; right: 6%;
          height: 30px;
          background: radial-gradient(ellipse, #00000066 0%, transparent 70%);
          filter: blur(10px);
        }

        .fb-parchment {
          position: relative;
          background:
            radial-gradient(ellipse 50% 30% at 8% 10%, #d4b87840 0%, transparent 55%),
            radial-gradient(ellipse 40% 25% at 92% 88%, #c8a06822 0%, transparent 55%),
            radial-gradient(ellipse 30% 20% at 50% 50%, #e8d09811 0%, transparent 70%),
            linear-gradient(158deg, #f8ead0 0%, #f2dca8 28%, #eacf94 65%, #f4e2b2 100%);
          border-radius: 2px; padding: 48px 54px 56px;
          box-shadow:
            0 1px 0 #fffb inset, 0 -1px 0 #b8904444 inset, 2px 0 0 #fff7 inset,
            6px 10px 40px #00000055, 10px 20px 70px #00000030;
          border: 1px solid #d4b88855;
        }
        .fb-parchment::before {
          content: ''; position: absolute; inset: 0; border-radius: 2px;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.1'/%3E%3C/svg%3E");
          opacity: 0.2; pointer-events: none;
        }
        .fb-parchment::after {
          content: ''; position: absolute; inset: 0; border-radius: 2px;
          background-image: repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, #a0845520 32px, transparent 33px);
          opacity: 0.45; pointer-events: none;
        }

        .bfold { position: absolute; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent 3%, #b8904428 20%, #a07a3838 50%, #b8904428 80%, transparent 97%); pointer-events: none; }
        .bfold-sh { position: absolute; left: 0; right: 0; height: 3px; background: linear-gradient(to bottom, #0000000e, transparent); pointer-events: none; }

        .fb-ornament { text-align: center; color: var(--gold); font-size: 1rem; letter-spacing: 0.32em; opacity: 0.65; margin-bottom: 4px; }
        .fb-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 4.5vw, 2rem); font-weight: 700;
          color: var(--ink); text-align: center; margin: 10px 0 3px;
          letter-spacing: 0.06em; line-height: 1.12; position: relative; z-index: 1;
        }
        .fb-subheading { font-style: italic; font-size: 0.74rem; color: var(--ink-faded); text-align: center; margin-bottom: 10px; position: relative; z-index: 1; letter-spacing: 0.04em; }
        .fb-intro { font-style: italic; font-size: 0.8rem; color: var(--ink-faded); margin-bottom: 20px; position: relative; z-index: 1; line-height: 1.6; }

        .fb-divider { display: flex; align-items: center; gap: 8px; margin: 8px 0 18px; position: relative; z-index: 1; }
        .fb-rule { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #8b603088, transparent); }
        .fb-dia { width: 5px; height: 5px; background: var(--gold); transform: rotate(45deg); opacity: 0.65; flex-shrink: 0; }

        .fb-cf { position: absolute; opacity: 0.15; pointer-events: none; z-index: 0; font-size: 3rem; color: var(--gold); line-height: 1; }
        .fb-cf-tl { top: 8px; left: 10px; transform: rotate(-10deg); }
        .fb-cf-br { bottom: 8px; right: 10px; transform: rotate(170deg); }

        .fb-ref { position: absolute; top: 20px; left: 24px; font-style: italic; font-size: 0.64rem; color: #8b6030aa; letter-spacing: 0.06em; line-height: 1.5; }

        .fb-postmark { position: absolute; top: 20px; right: 24px; width: 68px; height: 68px; border: 2px solid #8b4513aa; border-radius: 50%; display: flex; align-items: center; justify-content: center; transform: rotate(-8deg); opacity: 0.55; pointer-events: none; }
        .fb-pm-inner { width: 55px; height: 55px; border: 1px solid #8b451388; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px; }
        .fb-pm-inner span { font-family: 'Cinzel', serif; font-size: 6px; color: #6b3410; letter-spacing: 0.12em; text-align: center; text-transform: uppercase; line-height: 1.3; }
        .fb-pm-inner .fbpy { font-size: 9px; font-weight: 600; }

        .fb-label { font-style: italic; font-size: 0.71rem; color: var(--ink-faded); margin-bottom: 3px; display: block; letter-spacing: 0.03em; }
        .fb-label .req { color: var(--seal-red); }

        .fb-wrap { position: relative; margin-bottom: 18px; }
        .fb-dot { position: absolute; left: -5px; bottom: 9px; width: 4px; height: 4px; border-radius: 50%; background: var(--ink); opacity: 0; transition: opacity 0.3s; pointer-events: none; }
        .fb-wrap.focused .fb-dot { opacity: 0.28; }

        .fb-input, .fb-textarea {
          width: 100%; background: transparent;
          border: none; border-bottom: 1.5px solid #a07838bb; outline: none;
          font-family: 'IM Fell English', serif; font-style: italic;
          font-size: 0.93rem; color: var(--ink); padding: 4px 2px 5px;
          transition: border-color 0.3s; letter-spacing: 0.02em;
        }
        .fb-input::placeholder { color: #a0845566; font-style: italic; font-size: 0.83rem; }
        .fb-input:focus, .fb-textarea:focus { border-bottom-color: var(--ink); }
        .fb-textarea { resize: vertical; min-height: 100px; border: 1.5px solid #a07838bb; border-radius: 1px; padding: 8px 10px; }
        .fb-textarea::placeholder { color: #a0845566; font-style: italic; font-size: 0.83rem; }

        /* Star rating */
        .star-row { display: flex; align-items: center; gap: 6px; margin-bottom: 18px; position: relative; z-index: 1; }
        .star-btn { background: none; border: none; cursor: pointer; padding: 2px; font-size: 1.6rem; transition: transform 0.15s; line-height: 1; }
        .star-btn:hover { transform: scale(1.2); }
        .star-filled { color: #b8860b; filter: drop-shadow(0 1px 2px #b8860b44); }
        .star-empty { color: #c8a06855; }
        .star-label { font-style: italic; font-size: 0.72rem; color: var(--ink-faded); margin-left: 4px; min-width: 60px; transition: color 0.2s; }
        .star-label.has-rating { color: var(--gold); font-weight: 600; }

        .fb-error { font-style: italic; font-size: 0.76rem; color: #8b1a1a; margin-bottom: 14px; padding: 6px 10px; border-left: 2px solid #8b1a1a88; background: #8b1a1a08; position: relative; z-index: 1; animation: fadeIn 0.4s ease; }

        .fb-btn { width: 100%; padding: 14px 0; margin-top: 6px; background: linear-gradient(160deg, #1a3d20 0%, #2d5a30 40%, #1a3d1a 100%); color: #f4e4c1; border: none; border-radius: 2px; font-family: 'Cinzel', serif; font-size: 0.8rem; letter-spacing: 0.24em; cursor: pointer; position: relative; z-index: 1; box-shadow: 0 2px 0 #0a1a0a, 0 5px 16px #1a3d1a44, 0 1px 0 #88dd8844 inset; transition: transform 0.15s, box-shadow 0.15s; text-transform: uppercase; overflow: hidden; }
        .fb-btn::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, #ffffff14 0%, transparent 50%); pointer-events: none; }
        .fb-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 3px 0 #0a1a0a, 0 8px 24px #1a3d1a55, 0 1px 0 #88dd8844 inset; }
        .fb-btn:active:not(:disabled) { transform: translateY(1px); }
        .fb-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .fb-btn-red { background: linear-gradient(160deg, #6b2a2a, #8b1a1a, #6b1010) !important; }

        .fb-back { font-style: italic; font-size: 0.76rem; color: var(--ink-faded); margin-top: 16px; text-align: center; position: relative; z-index: 1; line-height: 1.6; }
        .fb-back button { background: none; border: none; color: var(--seal-red); font-family: 'IM Fell English', serif; font-style: italic; font-size: inherit; cursor: pointer; padding: 0; text-decoration: underline; text-decoration-color: #8b1a1a55; text-underline-offset: 3px; transition: color 0.2s; }
        .fb-back button:hover { color: #5a0a0a; }

        .fb-nav-back { position: fixed; top: 20px; left: 20px; font-family: 'IM Fell English', serif; font-style: italic; font-size: 0.76rem; color: #f4e4c166; background: rgba(10,22,12,0.7); backdrop-filter: blur(8px); border: 1px solid #f4e4c122; border-radius: 2px; cursor: pointer; padding: 8px 16px; display: flex; align-items: center; gap: 6px; transition: color 0.2s, border-color 0.2s; z-index: 50; }
        .fb-nav-back:hover { color: #f4e4c1cc; border-color: #f4e4c144; }

        /* Success */
        .fb-success { position: relative; z-index: 1; animation: fadeIn 0.8s ease; text-align: center; }
        .fb-success-icon { font-size: 3.4rem; display: block; margin: 0 auto 14px; animation: iconFloat 0.6s cubic-bezier(.34,1.56,.64,1) 0.2s both; }
        @keyframes iconFloat {
          from { opacity: 0; transform: scale(0.4) rotate(-15deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .fb-success-title { font-family: 'Playfair Display', serif; font-size: clamp(1.3rem, 4vw, 1.7rem); font-weight: 700; color: var(--green-dk); margin-bottom: 6px; letter-spacing: 0.05em; }
        .fb-success-sub { font-style: italic; font-size: 0.78rem; color: var(--ink-faded); margin-bottom: 20px; letter-spacing: 0.03em; line-height: 1.7; }

        .fb-receipt { border: 1px solid #a0783855; border-radius: 4px; padding: 18px 22px; background: #1a3d1a09; margin: 0 auto 22px; text-align: left; }
        .fb-r-row { display: flex; justify-content: space-between; align-items: center; font-style: italic; font-size: 0.78rem; color: var(--ink); padding: 5px 0; border-bottom: 1px solid #a0783822; }
        .fb-r-row:last-child { border-bottom: none; }
        .fb-r-label { color: var(--ink-faded); font-size: 0.7rem; }
        .fb-r-value { font-weight: 600; color: var(--green-dk); }

        .fb-wax-seal { position: absolute; bottom: -26px; right: 38px; width: 78px; height: 78px; z-index: 10; filter: drop-shadow(2px 4px 8px #00000055); animation: sealPop 0.6s ease 0.7s both; }
        @keyframes sealPop {
          0%   { opacity: 0; transform: scale(0.3) rotate(-22deg); }
          70%  { transform: scale(1.1) rotate(4deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; } }

        @media (max-width: 560px) {
          .fb-parchment { padding: 36px 24px 46px; }
        }
      `}</style>

      <button className="fb-nav-back" onClick={() => navigate("/")}>
        ← Return to Estate
      </button>

      <div className="fb-bg">
        <div className="fb-outer">
          <div className="fb-shadow" />

          <div className="fb-parchment">
            <div className="bfold" style={{ top: "28%" }} />
            <div className="bfold-sh" style={{ top: "calc(28% + 1px)" }} />
            <div className="bfold" style={{ top: "65%", opacity: 0.5 }} />

            <div className="fb-cf fb-cf-tl">❧</div>
            <div className="fb-cf fb-cf-br">❧</div>

            <div className="fb-ref">
              Guest Testimony<br />
              {submittedRef
                ? `Ref. ${String(submittedRef.bookingId).padStart(4, "0")} / 2025`
                : "Ref. _ _ _ _ / 2025"}
            </div>

            <div className="fb-postmark">
              <div className="fb-pm-inner">
                <span>Leonine</span>
                <span className="fbpy">2025</span>
                <span>Reserve</span>
              </div>
            </div>

            <div className="fb-ornament">✦ &nbsp;·&nbsp; ✦</div>
            <h1 className="fb-heading">
              {success ? "With Our Gratitude" : "Record of Your Stay"}
            </h1>
            <p className="fb-subheading">Leonine Villa Natura Resort — Kandy, Sri Lanka</p>

            <div className="fb-divider">
              <div className="fb-rule" /><div className="fb-dia" /><div className="fb-dia" /><div className="fb-dia" /><div className="fb-rule" />
            </div>

            {success ? (
              /* ── SUCCESS ──────────────────────────────────────────── */
              <div className="fb-success">
                <span className="fb-success-icon">🌿</span>
                <div className="fb-success-title">Your Testimony is Received</div>
                <div className="fb-success-sub">
                  Your words are most treasured by all at the estate.<br />
                  They shall guide us in the continued care of our guests.
                </div>

                {submittedRef && (
                  <div className="fb-receipt">
                    <div className="fb-r-row">
                      <span className="fb-r-label">Booking Reference</span>
                      <span className="fb-r-value">#{submittedRef.bookingId}</span>
                    </div>
                    <div className="fb-r-row">
                      <span className="fb-r-label">Room</span>
                      <span className="fb-r-value">{submittedRef.roomId}</span>
                    </div>
                    <div className="fb-r-row">
                      <span className="fb-r-label">Your Rating</span>
                      <span className="fb-r-value" style={{ color: "#b8860b" }}>
                        {"★".repeat(submittedRef.rating)}{"☆".repeat(5 - submittedRef.rating)}
                        &nbsp;{STAR_LABELS[submittedRef.rating]}
                      </span>
                    </div>
                    <div className="fb-r-row">
                      <span className="fb-r-label">Visibility</span>
                      <span className="fb-r-value">{submittedRef.status || "Visible"}</span>
                    </div>
                  </div>
                )}

                <button className="fb-btn fb-btn-red" onClick={() => navigate("/")}>
                  ✦ &nbsp; Return to the Estate &nbsp; ✦
                </button>
              </div>
            ) : (
              /* ── FORM ──────────────────────────────────────────────── */
              <>
                <p className="fb-intro">
                  Dear Honoured Guest, your account of the stay is of great value
                  to us. Pray share your impressions of the sanctuary you occupied.
                </p>

                {error && <div className="fb-error">⚠ &nbsp;{error}</div>}

                {/* Booking ID */}
                <label className="fb-label">
                  Booking Reference Number <span className="req">*</span>
                </label>
                <div className={`fb-wrap ${inkFocus === "bookingId" ? "focused" : ""}`}>
                  <div className="fb-dot" />
                  <input
                    name="bookingId"
                    type="number"
                    placeholder="e.g. 1748291034567"
                    className="fb-input"
                    value={form.bookingId}
                    onChange={handleChange}
                    onFocus={() => setInkFocus("bookingId")}
                    onBlur={() => setInkFocus(null)}
                  />
                </div>

                {/* Star Rating */}
                <label className="fb-label" style={{ position: "relative", zIndex: 1 }}>
                  Your Rating <span className="req">*</span>
                </label>
                <div className="star-row">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="star-btn"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setForm(p => ({ ...p, rating: star }))}
                      title={STAR_LABELS[star]}
                    >
                      <span className={star <= displayRating ? "star-filled" : "star-empty"}>
                        ★
                      </span>
                    </button>
                  ))}
                  <span className={`star-label ${displayRating ? "has-rating" : ""}`}>
                    {displayRating ? STAR_LABELS[displayRating] : "Select…"}
                  </span>
                </div>

                {/* Comment */}
                <label className="fb-label" style={{ position: "relative", zIndex: 1 }}>
                  Account of Your Stay <span className="req">*</span>
                </label>
                <div className={`fb-wrap ${inkFocus === "comment" ? "focused" : ""}`}>
                  <textarea
                    name="comment"
                    placeholder="Describe your experience at the estate — the sanctuary, the service, the atmosphere…"
                    className="fb-textarea"
                    value={form.comment}
                    onChange={handleChange}
                    onFocus={() => setInkFocus("comment")}
                    onBlur={() => setInkFocus(null)}
                  />
                </div>

                <button className="fb-btn" onClick={handleSubmit} disabled={loading}>
                  {loading ? "Delivering your testimony…" : "✦  Submit Your Testimony  ✦"}
                </button>

                <div className="fb-back">
                  <button onClick={() => navigate("/")}>Return to the estate</button>
                </div>
              </>
            )}
          </div>

          {/* Wax seal */}
          <div className="fb-wax-seal">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="38" fill="url(#fbseal)"/>
              <circle cx="40" cy="40" r="34" fill="none" stroke="#f4e4c188" strokeWidth="1"/>
              <circle cx="40" cy="40" r="28" fill="none" stroke="#f4e4c133" strokeWidth="0.5"/>
              <text x="40" y="47" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="19" fontWeight="700" fill="#f4e4c1cc">F</text>
              <path id="fbsr" d="M40 40 m-28,0 a28,28 0 1,1 56,0 a28,28 0 1,1 -56,0" fill="none"/>
              <text fontSize="5.8" fontFamily="Cinzel,serif" fill="#f4e4c188" letterSpacing="0.16em">
                <textPath href="#fbsr">FEEDBACK · LEONINE · 2025 · </textPath>
              </text>
              <defs>
                <radialGradient id="fbseal" cx="40" cy="34" r="38" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3a6040"/>
                  <stop offset="0.55" stopColor="#1a3d20"/>
                  <stop offset="1" stopColor="#0a1a0c"/>
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}