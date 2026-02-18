import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// FIX: category values now match exact DB room category strings
// Previously "canopy", "ganga", "heritage" — matched nothing in Room collection
// Now matches actual Room documents: "TREETOP LUXURY", "WATERSIDE RETREAT", "CULTURAL SANCTUARY"
const ROOMS = [
  { id: "treetop",   category: "TREETOP LUXURY",    label: "Treetop Luxury Suite",     icon: "🌿", price: "from $480 / night" },
  { id: "waterside", category: "WATERSIDE RETREAT",  label: "Waterside Retreat Villa",  icon: "💧", price: "from $380 / night" },
  { id: "cultural",  category: "CULTURAL SANCTUARY", label: "Cultural Sanctuary Lodge", icon: "🏛️", price: "from $320 / night" },
];

const GUESTS = ["1 Guest", "2 Guests", "3 Guests", "4 Guests", "5+ Guests"];

export default function BookingPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    checkIn: "", checkOut: "",
    room: "", guests: "",
    requests: "",
  });
  const [inkFocus, setInkFocus]     = useState(null);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [success, setSuccess]       = useState(false);
  const [bookingRef, setBookingRef] = useState(null);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit() {
    setError("");

    const required = ["name", "email", "checkIn", "checkOut", "room", "guests"];
    for (const key of required) {
      if (!form[key]) {
        setError("Pray complete all marked fields before presenting your reservation.");
        return;
      }
    }
    if (new Date(form.checkOut) <= new Date(form.checkIn)) {
      setError("Your departure must follow your arrival — please verify the dates.");
      return;
    }

    const chosenRoom = ROOMS.find(r => r.id === form.room);
    if (!chosenRoom) {
      setError("Please select a sanctuary before proceeding.");
      return;
    }

    setLoading(true);

    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/api/bookings/create-by-category",
        {
          category: chosenRoom.category,
          start: form.checkIn,
          end:   form.checkOut,
          notes: [
            `Name: ${form.name}`,
            form.phone    ? `Phone: ${form.phone}`       : null,
            `Guests: ${form.guests}`,
            form.requests ? `Requests: ${form.requests}` : null,
          ].filter(Boolean).join(" | "),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setBookingRef(res.data.result);
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        const status = err.response?.status;
        const msg    = err.response?.data?.message;

        if (status === 409) {
          setError("No rooms are available for your selected dates in this sanctuary. Please try different dates or choose another.");
        } else if (status === 401 || status === 403) {
          setError("Your session has expired — pray sign in once more.");
        } else {
          setError(msg || "The courier has faltered — please try again presently.");
        }
        setLoading(false);
      });
  }

  const chosenRoomLabel = ROOMS.find(r => r.id === form.room)?.label || "—";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=IM+Fell+English:ital@0;1&family=Cinzel:wght@400;600&display=swap');

        :root {
          --ink: #2c1810; --ink-faded: #5a3e2b;
          --seal-red: #8b1a1a; --gold: #b8860b;
          --green-dk: #1a3d1a; --green-md: #2d5a30;
        }

        .booking-bg {
          min-height: 100vh; width: 100%;
          display: flex; align-items: flex-start; justify-content: center;
          padding: 60px 16px 80px;
          background: radial-gradient(ellipse 120% 80% at 50% 20%, #1a2a0a 0%, #0c1808 55%, #05090f 100%);
          font-family: 'IM Fell English', serif;
          position: relative; overflow: hidden;
        }
        .booking-bg::before {
          content: ''; position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 50% 40% at 10% 60%, #2d4a1a1a 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 90% 40%, #2d4a1a1a 0%, transparent 60%);
          pointer-events: none;
        }
        .booking-bg::after {
          content: ''; position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23c9a84c' fill-opacity='0.025'%3E%3Cpath d='M40 0C17.9 0 0 17.9 0 40s17.9 40 40 40 40-17.9 40-40S62.1 0 40 0zm0 70C23.4 70 10 56.6 10 40S23.4 10 40 10s30 13.4 30 30-13.4 30-30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .booking-outer {
          position: relative; width: min(680px, 96vw);
          animation: bookDrop 0.9s cubic-bezier(.16,1,.3,1) both; z-index: 1;
        }
        @keyframes bookDrop {
          0%   { opacity: 0; transform: translateY(-40px) rotate(-0.8deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        .booking-shadow {
          position: absolute; bottom: -22px; left: 6%; right: 6%;
          height: 30px;
          background: radial-gradient(ellipse, #00000066 0%, transparent 70%);
          filter: blur(10px);
        }

        .booking-parchment {
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
        .booking-parchment::before {
          content: ''; position: absolute; inset: 0; border-radius: 2px;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.1'/%3E%3C/svg%3E");
          opacity: 0.2; pointer-events: none;
        }
        .booking-parchment::after {
          content: ''; position: absolute; inset: 0; border-radius: 2px;
          background-image: repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, #a0845520 32px, transparent 33px);
          opacity: 0.45; pointer-events: none;
        }

        .bfold { position: absolute; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent 3%, #b8904428 20%, #a07a3838 50%, #b8904428 80%, transparent 97%); pointer-events: none; }
        .bfold-sh { position: absolute; left: 0; right: 0; height: 3px; background: linear-gradient(to bottom, #0000000e, transparent); pointer-events: none; }

        .b-ornament { text-align: center; color: var(--gold); font-size: 1rem; letter-spacing: 0.32em; opacity: 0.65; margin-bottom: 4px; }
        .b-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 4.5vw, 2.2rem); font-weight: 700;
          color: var(--ink); text-align: center; margin: 10px 0 3px;
          letter-spacing: 0.06em; line-height: 1.12; position: relative; z-index: 1;
        }
        .b-subheading { font-style: italic; font-size: 0.74rem; color: var(--ink-faded); text-align: center; margin-bottom: 10px; position: relative; z-index: 1; letter-spacing: 0.04em; }
        .b-intro { font-style: italic; font-size: 0.8rem; color: var(--ink-faded); margin-bottom: 18px; position: relative; z-index: 1; line-height: 1.6; }

        .b-divider { display: flex; align-items: center; gap: 8px; margin: 8px 0 18px; position: relative; z-index: 1; }
        .b-rule { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #8b603088, transparent); }
        .b-dia { width: 5px; height: 5px; background: var(--gold); transform: rotate(45deg); opacity: 0.65; flex-shrink: 0; }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 28px; position: relative; z-index: 1; }
        .form-full { grid-column: 1 / -1; }

        .b-label { font-style: italic; font-size: 0.71rem; color: var(--ink-faded); margin-bottom: 3px; display: block; letter-spacing: 0.03em; }
        .b-label .req { color: var(--seal-red); }

        .b-wrap { position: relative; margin-bottom: 15px; }
        .b-dot { position: absolute; left: -5px; bottom: 9px; width: 4px; height: 4px; border-radius: 50%; background: var(--ink); opacity: 0; transition: opacity 0.3s; pointer-events: none; }
        .b-wrap.focused .b-dot { opacity: 0.28; }

        .b-input, .b-select, .b-textarea {
          width: 100%; background: transparent;
          border: none; border-bottom: 1.5px solid #a07838bb; outline: none;
          font-family: 'IM Fell English', serif; font-style: italic;
          font-size: 0.93rem; color: var(--ink); padding: 4px 2px 5px;
          transition: border-color 0.3s; letter-spacing: 0.02em;
        }
        .b-input::placeholder, .b-textarea::placeholder { color: #a0845566; font-style: italic; font-size: 0.83rem; }
        .b-input:focus, .b-select:focus, .b-textarea:focus { border-bottom-color: var(--ink); }
        .b-input[type="date"] { color-scheme: light; }
        .b-select { -webkit-appearance: none; appearance: none; cursor: pointer; }
        .b-textarea { resize: vertical; min-height: 72px; border: 1.5px solid #a07838bb; border-radius: 1px; padding: 6px 8px; }

        .room-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px; position: relative; z-index: 1; }
        .room-card { border: 1.5px solid #a07838aa; border-radius: 3px; padding: 10px 8px; cursor: pointer; text-align: center; transition: all 0.25s; background: transparent; font-family: 'IM Fell English', serif; }
        .room-card:hover { border-color: var(--ink); background: #a0783810; }
        .room-card.selected { border-color: var(--green-dk); background: #1a3d1a12; }
        .room-card .rc-icon { font-size: 1.3rem; margin-bottom: 4px; }
        .room-card .rc-name { font-size: 0.65rem; color: var(--ink); font-style: italic; letter-spacing: 0.02em; line-height: 1.3; }
        .room-card .rc-price { font-size: 0.6rem; color: var(--ink-faded); margin-top: 2px; opacity: 0.7; }
        .room-card.selected .rc-name { color: var(--green-dk); font-weight: 600; }

        .b-postmark { position: absolute; top: 20px; right: 24px; width: 68px; height: 68px; border: 2px solid #8b4513aa; border-radius: 50%; display: flex; align-items: center; justify-content: center; transform: rotate(-8deg); opacity: 0.55; pointer-events: none; }
        .b-pm-inner { width: 55px; height: 55px; border: 1px solid #8b451388; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px; }
        .b-pm-inner span { font-family: 'Cinzel', serif; font-size: 6px; color: #6b3410; letter-spacing: 0.12em; text-align: center; text-transform: uppercase; line-height: 1.3; }
        .b-pm-inner .bpy { font-size: 9px; font-weight: 600; }

        .b-cf { position: absolute; opacity: 0.15; pointer-events: none; z-index: 0; font-size: 3rem; color: var(--gold); line-height: 1; }
        .b-cf-tl { top: 8px; left: 10px; transform: rotate(-10deg); }
        .b-cf-br { bottom: 8px; right: 10px; transform: rotate(170deg); }

        .b-ref { position: absolute; top: 20px; left: 24px; font-style: italic; font-size: 0.64rem; color: #8b6030aa; letter-spacing: 0.06em; line-height: 1.5; }

        .b-error { font-style: italic; font-size: 0.76rem; color: #8b1a1a; margin-bottom: 12px; padding: 6px 10px; border-left: 2px solid #8b1a1a88; background: #8b1a1a08; position: relative; z-index: 1; animation: fadeIn 0.4s ease; }

        .b-welcome { position: relative; z-index: 1; animation: fadeIn 0.8s ease; text-align: center; }
        .b-welcome-icon { font-size: 3.4rem; display: block; margin: 0 auto 14px; animation: iconFloat 0.6s cubic-bezier(.34,1.56,.64,1) 0.2s both; }
        @keyframes iconFloat {
          from { opacity: 0; transform: scale(0.4) rotate(-15deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .b-welcome-title { font-family: 'Playfair Display', serif; font-size: clamp(1.4rem, 4vw, 1.85rem); font-weight: 700; color: var(--green-dk); margin-bottom: 6px; letter-spacing: 0.05em; }
        .b-welcome-sub { font-style: italic; font-size: 0.78rem; color: var(--ink-faded); margin-bottom: 20px; letter-spacing: 0.03em; }
        .b-welcome-card { border: 1px solid #a0783855; border-radius: 4px; padding: 18px 22px; background: #1a3d1a09; margin: 0 auto 22px; text-align: left; max-width: 420px; }
        .b-wc-row { display: flex; justify-content: space-between; align-items: center; font-style: italic; font-size: 0.78rem; color: var(--ink); padding: 5px 0; border-bottom: 1px solid #a0783822; }
        .b-wc-row:last-child { border-bottom: none; }
        .b-wc-label { color: var(--ink-faded); font-size: 0.7rem; }
        .b-wc-value { font-weight: 600; color: var(--green-dk); }
        .b-welcome-note { font-style: italic; font-size: 0.76rem; color: var(--ink-faded); line-height: 1.7; margin-bottom: 22px; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; } }

        .b-btn { width: 100%; padding: 14px 0; margin-top: 8px; background: linear-gradient(160deg, #1a3d20 0%, #2d5a30 40%, #1a3d1a 100%); color: #f4e4c1; border: none; border-radius: 2px; font-family: 'Cinzel', serif; font-size: 0.8rem; letter-spacing: 0.24em; cursor: pointer; position: relative; z-index: 1; box-shadow: 0 2px 0 #0a1a0a, 0 5px 16px #1a3d1a44, 0 1px 0 #88dd8844 inset; transition: transform 0.15s, box-shadow 0.15s; text-transform: uppercase; overflow: hidden; }
        .b-btn::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, #ffffff14 0%, transparent 50%); pointer-events: none; }
        .b-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 3px 0 #0a1a0a, 0 8px 24px #1a3d1a55, 0 1px 0 #88dd8844 inset; }
        .b-btn:active:not(:disabled) { transform: translateY(1px); }
        .b-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .b-btn-red { background: linear-gradient(160deg, #6b2a2a, #8b1a1a, #6b1010) !important; }

        .b-back { font-style: italic; font-size: 0.76rem; color: var(--ink-faded); margin-top: 16px; text-align: center; position: relative; z-index: 1; line-height: 1.6; }
        .b-back button { background: none; border: none; color: var(--seal-red); font-family: 'IM Fell English', serif; font-style: italic; font-size: inherit; cursor: pointer; padding: 0; text-decoration: underline; text-decoration-color: #8b1a1a55; text-underline-offset: 3px; transition: color 0.2s; }
        .b-back button:hover { color: #5a0a0a; }

        .b-wax-seal { position: absolute; bottom: -26px; right: 38px; width: 78px; height: 78px; z-index: 10; filter: drop-shadow(2px 4px 8px #00000055); animation: sealPop 0.6s ease 0.7s both; }
        @keyframes sealPop {
          0%   { opacity: 0; transform: scale(0.3) rotate(-22deg); }
          70%  { transform: scale(1.1) rotate(4deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        .b-terms { font-style: italic; font-size: 0.68rem; color: #8b6030aa; margin-bottom: 12px; position: relative; z-index: 1; line-height: 1.5; }

        .b-nav-back { position: fixed; top: 20px; left: 20px; font-family: 'IM Fell English', serif; font-style: italic; font-size: 0.76rem; color: #f4e4c166; background: rgba(10,22,12,0.7); backdrop-filter: blur(8px); border: 1px solid #f4e4c122; border-radius: 2px; cursor: pointer; padding: 8px 16px; display: flex; align-items: center; gap: 6px; transition: color 0.2s, border-color 0.2s; z-index: 50; }
        .b-nav-back:hover { color: #f4e4c1cc; border-color: #f4e4c144; }

        @media (max-width: 560px) {
          .form-grid { grid-template-columns: 1fr; }
          .form-full { grid-column: 1; }
          .room-cards { grid-template-columns: 1fr; }
          .booking-parchment { padding: 36px 24px 46px; }
        }
      `}</style>

      <button className="b-nav-back" onClick={() => navigate("/")}>
        ← Return to Estate
      </button>

      <div className="booking-bg">
        <div className="booking-outer">
          <div className="booking-shadow" />

          <div className="booking-parchment">
            <div className="bfold" style={{ top: "28%" }} />
            <div className="bfold-sh" style={{ top: "calc(28% + 1px)" }} />
            <div className="bfold" style={{ top: "62%", opacity: 0.5 }} />

            <div className="b-cf b-cf-tl">❧</div>
            <div className="b-cf b-cf-br">❧</div>

            <div className="b-ref">
              Reservation Form<br />
              {bookingRef
                ? `Ref. ${String(bookingRef.bookingId).padStart(4, "0")} / 2025`
                : "Ref. _ _ _ _ / 2025"}
            </div>

            <div className="b-postmark">
              <div className="b-pm-inner">
                <span>Leonine</span>
                <span className="bpy">2025</span>
                <span>Reserve</span>
              </div>
            </div>

            <div className="b-ornament">✦ &nbsp;·&nbsp; ✦</div>
            <h1 className="b-heading">
              {success ? "Welcome to Leonine" : "Reservation of Sanctuary"}
            </h1>
            <p className="b-subheading">Leonine Villa Natura Resort — Kandy, Sri Lanka</p>

            <div className="b-divider">
              <div className="b-rule" /><div className="b-dia" /><div className="b-dia" /><div className="b-dia" /><div className="b-rule" />
            </div>

            {success ? (
              <div className="b-welcome">
                <span className="b-welcome-icon">🌿</span>
                <div className="b-welcome-title">Your Sanctuary Awaits</div>
                <div className="b-welcome-sub">
                  Honoured {form.name}, your reservation has been duly received at the estate.
                </div>

                {bookingRef && (
                  <div className="b-welcome-card">
                    <div className="b-wc-row">
                      <span className="b-wc-label">Booking Reference</span>
                      <span className="b-wc-value">#{bookingRef.bookingId}</span>
                    </div>
                    <div className="b-wc-row">
                      <span className="b-wc-label">Room Assigned</span>
                      <span className="b-wc-value">{bookingRef.roomId}</span>
                    </div>
                    <div className="b-wc-row">
                      <span className="b-wc-label">Sanctuary</span>
                      <span className="b-wc-value">{chosenRoomLabel}</span>
                    </div>
                    <div className="b-wc-row">
                      <span className="b-wc-label">Arrival</span>
                      <span className="b-wc-value">
                        {new Date(bookingRef.start).toLocaleDateString("en-GB", {
                          day: "numeric", month: "long", year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="b-wc-row">
                      <span className="b-wc-label">Departure</span>
                      <span className="b-wc-value">
                        {new Date(bookingRef.end).toLocaleDateString("en-GB", {
                          day: "numeric", month: "long", year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="b-wc-row">
                      <span className="b-wc-label">Status</span>
                      <span className="b-wc-value" style={{ color: "#b8860b" }}>
                        {bookingRef.status || "Pending"}
                      </span>
                    </div>
                  </div>
                )}

                <div className="b-welcome-note">
                  Our butler shall correspond with thee shortly to confirm your sanctuary.<br />
                  A deposit of 30% will be requested upon confirmation.<br />
                  We await your arrival with the warmest anticipation.
                </div>

                <button className="b-btn b-btn-red" onClick={() => navigate("/")}>
                  ✦ &nbsp; Return to the Estate &nbsp; ✦
                </button>
              </div>
            ) : (
              <>
                <p className="b-intro">
                  Dear Honoured Guest, pray inscribe your details in the form below
                  that we may prepare your sanctuary with all the care it deserves.
                </p>

                {error && <div className="b-error">⚠ &nbsp;{error}</div>}

                <div className="form-grid">
                  <div>
                    <label className="b-label">Full Name &amp; Title <span className="req">*</span></label>
                    <div className={`b-wrap ${inkFocus === "name" ? "focused" : ""}`}>
                      <div className="b-dot" />
                      <input name="name" type="text" placeholder="e.g. Mr. James Perera"
                        className="b-input" value={form.name} onChange={handleChange}
                        onFocus={() => setInkFocus("name")} onBlur={() => setInkFocus(null)} />
                    </div>
                  </div>

                  <div>
                    <label className="b-label">Calling Number</label>
                    <div className={`b-wrap ${inkFocus === "phone" ? "focused" : ""}`}>
                      <div className="b-dot" />
                      <input name="phone" type="tel" placeholder="+94 77 000 0000"
                        className="b-input" value={form.phone} onChange={handleChange}
                        onFocus={() => setInkFocus("phone")} onBlur={() => setInkFocus(null)} />
                    </div>
                  </div>

                  <div className="form-full">
                    <label className="b-label">Electronic Correspondence <span className="req">*</span></label>
                    <div className={`b-wrap ${inkFocus === "email" ? "focused" : ""}`}>
                      <div className="b-dot" />
                      <input name="email" type="email" placeholder="your.name@correspondence.com"
                        className="b-input" value={form.email} onChange={handleChange}
                        onFocus={() => setInkFocus("email")} onBlur={() => setInkFocus(null)} />
                    </div>
                  </div>

                  <div>
                    <label className="b-label">Arrival Date <span className="req">*</span></label>
                    <div className={`b-wrap ${inkFocus === "checkIn" ? "focused" : ""}`}>
                      <div className="b-dot" />
                      <input name="checkIn" type="date"
                        min={new Date().toISOString().split("T")[0]}
                        className="b-input" value={form.checkIn} onChange={handleChange}
                        onFocus={() => setInkFocus("checkIn")} onBlur={() => setInkFocus(null)} />
                    </div>
                  </div>

                  <div>
                    <label className="b-label">Departure Date <span className="req">*</span></label>
                    <div className={`b-wrap ${inkFocus === "checkOut" ? "focused" : ""}`}>
                      <div className="b-dot" />
                      <input name="checkOut" type="date"
                        min={form.checkIn || new Date().toISOString().split("T")[0]}
                        className="b-input" value={form.checkOut} onChange={handleChange}
                        onFocus={() => setInkFocus("checkOut")} onBlur={() => setInkFocus(null)} />
                    </div>
                  </div>

                  <div className="form-full">
                    <label className="b-label">Number of Guests <span className="req">*</span></label>
                    <div className={`b-wrap ${inkFocus === "guests" ? "focused" : ""}`}>
                      <div className="b-dot" />
                      <select name="guests" className="b-select" value={form.guests} onChange={handleChange}
                        onFocus={() => setInkFocus("guests")} onBlur={() => setInkFocus(null)}>
                        <option value="">— Select party size —</option>
                        {GUESTS.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="form-full">
                    <label className="b-label" style={{ marginBottom: 8 }}>
                      Choose Your Sanctuary <span className="req">*</span>
                    </label>
                    <div className="room-cards">
                      {ROOMS.map(r => (
                        <div key={r.id}
                          className={`room-card ${form.room === r.id ? "selected" : ""}`}
                          onClick={() => setForm(p => ({ ...p, room: r.id }))}>
                          <div className="rc-icon">{r.icon}</div>
                          <div className="rc-name">{r.label}</div>
                          <div className="rc-price">{r.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-full">
                    <label className="b-label">Special Requests &amp; Arrangements</label>
                    <div className={`b-wrap ${inkFocus === "requests" ? "focused" : ""}`}>
                      <textarea name="requests" placeholder="Dietary requirements, special occasions, accessibility needs..."
                        className="b-textarea" value={form.requests} onChange={handleChange}
                        onFocus={() => setInkFocus("requests")} onBlur={() => setInkFocus(null)} />
                    </div>
                  </div>
                </div>

                <p className="b-terms">
                  By submitting this form, you acknowledge our reservation policy. A deposit of 30% shall be requested upon confirmation. Full cancellation permitted up to 7 days prior to arrival.
                </p>

                <button className="b-btn" onClick={handleSubmit} disabled={loading}>
                  {loading ? "Dispatching your reservation..." : "✦  Submit Reservation Request  ✦"}
                </button>

                <div className="b-back">
                  Changed your mind?{" "}
                  <button onClick={() => navigate("/")}>Return to the estate</button>
                  {" "}or{" "}
                  <button onClick={() => navigate("/login")}>sign in to your account</button>
                </div>
              </>
            )}
          </div>

          {/* Wax seal */}
          <div className="b-wax-seal">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="38" fill="url(#bseal)"/>
              <circle cx="40" cy="40" r="34" fill="none" stroke="#f4e4c188" strokeWidth="1"/>
              <circle cx="40" cy="40" r="28" fill="none" stroke="#f4e4c133" strokeWidth="0.5"/>
              <text x="40" y="47" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="19" fontWeight="700" fill="#f4e4c1cc">R</text>
              <path id="bsr" d="M40 40 m-28,0 a28,28 0 1,1 56,0 a28,28 0 1,1 -56,0" fill="none"/>
              <text fontSize="5.8" fontFamily="Cinzel,serif" fill="#f4e4c188" letterSpacing="0.16em">
                <textPath href="#bsr">RESERVATION · LEONINE · 2025 · </textPath>
              </text>
              <defs>
                <radialGradient id="bseal" cx="40" cy="34" r="38" gradientUnits="userSpaceOnUse">
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