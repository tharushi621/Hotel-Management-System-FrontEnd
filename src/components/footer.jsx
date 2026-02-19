import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const socials = [
    { letter: "I", label: "Instagram", href: "https://instagram.com" },
    { letter: "F", label: "Facebook", href: "https://facebook.com" },
    { letter: "P", label: "Pinterest", href: "https://pinterest.com" },
    { letter: "Y", label: "YouTube", href: "https://youtube.com" },
  ];

  const goldLine = { height: "1px", background: "linear-gradient(90deg, transparent, #c9a84c, #d4891a, #c9a84c, transparent)" };

  return (
    <footer id="contact" className="pt-20 pb-8 px-6 relative" style={{ background: "#060e07", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Leonine" className="w-10 h-10 object-contain" />
              <div>
                <div className="font-display text-2xl text-amber-100 tracking-widest">LEONINE</div>
                <div className="font-body text-xs tracking-[0.3em] text-yellow-700 uppercase">Villa & Sanctuary · Sri Lanka</div>
              </div>
            </div>
            <p className="font-body text-sm text-stone-500 leading-relaxed mb-6 max-w-sm">
              A living heritage. A breathing jungle. An experience that rewrites what luxury means.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="w-9 h-9 rounded-full border border-green-900/60 flex items-center justify-center text-stone-400 hover:border-yellow-700/60 hover:text-yellow-500 hover:bg-yellow-900/10 transition-all duration-300 font-body text-xs"
                >
                  {s.letter}
                </a>
              ))}
            </div>
            <p className="font-body text-xs text-stone-600 mt-3 tracking-wider">Instagram · Facebook · Pinterest · YouTube</p>
          </div>

          <div>
            <h4 className="font-display text-amber-100 text-lg mb-5">Explore</h4>
            <ul className="space-y-3">
              {["The Heritage", "Retreats", "Dining", "Experiences", "Gallery", "Sustainability"].map((l) => (
                <li key={l}>
                  <a href="#" className="font-body text-sm text-stone-500 hover:text-yellow-500 transition-colors duration-300 tracking-wide">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-amber-100 text-lg mb-5">Contact</h4>
            <ul className="space-y-3 font-body text-sm text-stone-500">
              <li>Heerassagala, Kandy</li>
              <li>Central Province, Sri Lanka</li>
              <li className="pt-2 hover:text-yellow-500 transition-colors cursor-pointer">+94 81 220 4455</li>
              <li className="hover:text-yellow-500 transition-colors cursor-pointer">stay@leonine.lk</li>
            </ul>
          </div>
        </div>

        <div style={goldLine} className="mb-6"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-stone-600">© 2026 Leonine Villa & Sanctuary. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
              <a key={l} href="#" className="font-body text-xs text-stone-600 hover:text-yellow-600 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Feedback Button */}
      <style>{`
        .fb-float {
          position: fixed; bottom: 36px; right: 36px; z-index: 9999;
          display: flex; align-items: center; gap: 9px;
          padding: 11px 22px;
          border: 1px solid rgba(201,168,76,0.45);
          border-radius: 999px; cursor: pointer;
          background: linear-gradient(135deg, rgba(13,26,16,0.94) 0%, rgba(26,58,30,0.97) 100%);
          backdrop-filter: blur(16px);
          color: #c9a84c;
          font-family: 'Jost', sans-serif; font-size: 0.65rem;
          letter-spacing: 0.22em; text-transform: uppercase;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.08) inset;
          transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease;
          animation: fbFloatIn 0.8s cubic-bezier(0.16,1,0.3,1) 1.5s both;
        }
        .fb-float:hover { transform: translateY(-4px) scale(1.04); border-color: rgba(201,168,76,0.8); box-shadow: 0 16px 44px rgba(0,0,0,0.55), 0 0 24px rgba(201,168,76,0.18); }
        .fb-float-star { font-size: 0.9rem; color: #c9a84c; filter: drop-shadow(0 0 4px rgba(201,168,76,0.55)); animation: fbStarPulse 3s ease-in-out 2.5s infinite; flex-shrink: 0; }
        @keyframes fbFloatIn { from { opacity: 0; transform: translateY(28px) scale(0.88); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes fbStarPulse { 0%,100% { filter: drop-shadow(0 0 2px rgba(201,168,76,0.4)); } 50% { filter: drop-shadow(0 0 8px rgba(201,168,76,0.9)); } }
      `}</style>
      <button className="fb-float" onClick={() => navigate("/feedback")} title="Share your experience at Leonine">
        <span className="fb-float-star">★</span>
        Share Your Experience
      </button>
    </footer>
  );
}