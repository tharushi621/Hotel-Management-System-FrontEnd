import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CategoriesPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Fallback category visuals keyed by name keywords
  const categoryVisuals = {
    treetop: {
      image: "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=1200&q=90",
      icon: "🌿",
      accent: "#4a7c52",
      accentLight: "rgba(74,124,82,0.15)",
      tag: "Most Requested",
      badge: "Elevated Jungle Living",
      poem: "Rise above the canopy — where clouds are your floor and the forest is endless.",
    },
    waterside: {
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=90",
      icon: "💧",
      accent: "#2e6b8a",
      accentLight: "rgba(46,107,138,0.15)",
      tag: "Romantic Escape",
      badge: "River & Birdsong",
      poem: "Let the river's song lull you into the ancient rhythm of Lanka's highlands.",
    },
    waterfall: {
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=90",
      icon: "💧",
      accent: "#2e6b8a",
      accentLight: "rgba(46,107,138,0.15)",
      tag: "Romantic Escape",
      badge: "River & Birdsong",
      poem: "Let the river's song lull you into the ancient rhythm of Lanka's highlands.",
    },
    cultural: {
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=90",
      icon: "🏛️",
      accent: "#8b4513",
      accentLight: "rgba(139,69,19,0.15)",
      tag: "Cultural Immersion",
      badge: "Kandyan Heritage",
      poem: "Sleep within the walls of living history — every carved beam tells a thousand years.",
    },
    heritage: {
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=90",
      icon: "🏛️",
      accent: "#8b4513",
      accentLight: "rgba(139,69,19,0.15)",
      tag: "Cultural Immersion",
      badge: "Kandyan Heritage",
      poem: "Sleep within the walls of living history — every carved beam tells a thousand years.",
    },
    forest: {
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=90",
      icon: "🌲",
      accent: "#2e5c35",
      accentLight: "rgba(46,92,53,0.15)",
      tag: "Forest Escape",
      badge: "Ancient Canopy",
      poem: "Surrender to the forest's embrace — where silence is the greatest luxury.",
    },
  };

  const getVisual = (name = "") => {
    const lower = name.toLowerCase();
    for (const key of Object.keys(categoryVisuals)) {
      if (lower.includes(key)) return categoryVisuals[key];
    }
    return {
      image: "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=1200&q=90",
      icon: "🦁",
      accent: "#c9a84c",
      accentLight: "rgba(201,168,76,0.15)",
      tag: "Signature Retreat",
      badge: "Curated Luxury",
      poem: "A sanctuary born from Sri Lanka's ancient spirit — yours to discover.",
    };
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)
      .then((res) => {
        const data = res.data.list || res.data.categories || res.data || [];
        setCategories(Array.isArray(data) ? data : []);
        setIsLoaded(true);
        setLoading(false);
      })
      .catch(() => {
        setCategories([
          {
            _id: "1",
            name: "Treetop Luxury",
            price: 42000,
            description:
              "Rise above the jungle canopy in our most elevated retreat. Ancient jak-wood ceilings, hand-beaten copper tubs, and a private rain terrace where mist rolls in at dawn. Fourteen acres of protected rainforest form your private wilderness.",
            features: ["Private Plunge Pool", "Open-Air Rain Bath", "Forest Terrace", "Stargazing Deck", "Butler Service"],
          },
          {
            _id: "2",
            name: "Waterside Retreat",
            price: 38000,
            description:
              "Perched above a singing river, this villa wraps you in the sound of water and birdsong. Step-stone baths, woven rattan terraces, and sunrise over the sacred hills — a Kandyan love poem made into a living space.",
            features: ["River View Deck", "Step-Stone Bath", "Rattan Terrace", "Sunrise Yoga Platform", "Private Boat"],
          },
          {
            _id: "3",
            name: "Cultural Sanctuary",
            price: 35000,
            description:
              "Inspired by the royal pavilions of Kandy — traditional clay walls, Batik draperies, hand-painted murals, and a meditation sala open to the ancient forest. Certified by the UNESCO Heritage Partnership.",
            features: ["Meditation Sala", "Batik Draperies", "Hand-Painted Murals", "Artisan Workshops", "Heritage Tours"],
          },
        ]);
        setLoading(false);
      });
  }, []);

  const amenityIcons = {
    "Private Plunge Pool": "🏊",
    "Open-Air Rain Bath": "🚿",
    "Forest Terrace": "🌿",
    "Stargazing Deck": "⭐",
    "Butler Service": "🛎️",
    "River View Deck": "🌊",
    "Step-Stone Bath": "🪨",
    "Rattan Terrace": "🪑",
    "Sunrise Yoga Platform": "🧘",
    "Private Boat": "⛵",
    "Meditation Sala": "🎋",
    "Batik Draperies": "🎨",
    "Hand-Painted Murals": "🖌️",
    "Artisan Workshops": "✂️",
    "Heritage Tours": "🏛️",
  };

  return (
    <div className="font-body bg-stone-950 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Cormorant+Infant:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');
        .font-display  { font-family: 'Playfair Display', serif; }
        .font-serif-light { font-family: 'Cormorant Infant', serif; }
        .font-body { font-family: 'Jost', sans-serif; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: #c9a84c; border-radius: 3px; }

        .gold-line { height: 1px; background: linear-gradient(90deg, transparent, #c9a84c, #d4891a, #c9a84c, transparent); }

        .nav-carved {
          background: linear-gradient(180deg, rgba(10,22,12,0.97) 0%, rgba(18,38,20,0.95) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.2);
          box-shadow: 0 4px 30px rgba(0,0,0,0.4);
        }

        /* batik-pattern intentionally omitted from hero — only used below hero sections */
        .batik-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23c9a84c' fill-opacity='0.04'%3E%3Cpath d='M40 0C17.9 0 0 17.9 0 40s17.9 40 40 40 40-17.9 40-40S62.1 0 40 0zm0 70C23.4 70 10 56.6 10 40S23.4 10 40 10s30 13.4 30 30-13.4 30-30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .hero-parallax { will-change: transform; }

        .category-card {
          transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.7s ease;
        }
        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 50px 100px rgba(0,0,0,0.5);
        }

        .img-zoom img {
          transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .img-zoom:hover img { transform: scale(1.06); }

        .nav-link { position: relative; letter-spacing: 0.15em; }
        .nav-link::before { content: ''; position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 0; height: 1px; background: #c9a84c; transition: width 0.3s ease; }
        .nav-link:hover::before { width: 100%; }

        .btn-gold {
          background: linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #d4891a 100%);
          box-shadow: 0 8px 32px rgba(201,168,76,0.4);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .btn-gold:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 16px 48px rgba(201,168,76,0.5); }

        .btn-outline-gold {
          border: 1px solid rgba(201,168,76,0.5);
          transition: all 0.3s ease;
        }
        .btn-outline-gold:hover {
          border-color: rgba(201,168,76,0.9);
          background: rgba(201,168,76,0.08);
        }

        .feature-pill {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .feature-pill:hover {
          background: rgba(201,168,76,0.12);
          border-color: rgba(201,168,76,0.3);
        }

        .ornament-line {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ornament-line::before,
        .ornament-line::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4));
        }
        .ornament-line::after {
          background: linear-gradient(90deg, rgba(201,168,76,0.4), transparent);
        }

        .price-tag {
          background: linear-gradient(135deg, rgba(10,22,12,0.95), rgba(26,58,30,0.95));
          border: 1px solid rgba(201,168,76,0.3);
          backdrop-filter: blur(20px);
        }

        .section-divider {
          height: 120px;
          background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.03), transparent);
          position: relative;
          overflow: hidden;
        }
        .section-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 1px;
          height: 80px;
          background: linear-gradient(to bottom, transparent, #c9a84c, transparent);
        }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes pulse-dot { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }

        .anim-in { animation: fadeInUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .anim-in-left { animation: fadeInLeft 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }

        .anim-shimmer {
          background: linear-gradient(90deg, #c9a84c 0%, #f0d080 40%, #d4891a 60%, #c9a84c 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .anim-float { animation: float 6s ease-in-out infinite; }

        .loading-dot { animation: pulse-dot 1.4s ease-in-out infinite; }
        .loading-dot:nth-child(2) { animation-delay: 0.2s; }
        .loading-dot:nth-child(3) { animation-delay: 0.4s; }

        .hero-text-mask {
          background: linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(245,235,210,0.9) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* ── NAVIGATION ── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? "nav-carved py-3" : "py-5 bg-transparent"}`}>
        <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between">
          <div className="flex flex-col items-start cursor-pointer" onClick={() => navigate("/")}>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Leonine" className="w-[44px] h-[44px]" onError={(e) => { e.target.style.display = 'none'; }} />
              <span className="font-display text-2xl font-medium tracking-widest text-amber-100 hover:text-yellow-400 transition-colors duration-300">LEONINE</span>
            </div>
            <span className="font-body text-xs tracking-[0.4em] text-yellow-600/70 ml-10 uppercase">Villa & Sanctuary</span>
          </div>

          <ul className="hidden lg:flex items-center gap-8">
            {["Home", "Retreats", "Gallery", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={item === "Home" ? "/" : item === "Retreats" ? "/retreats" : `/#${item.toLowerCase()}`}
                  className={`nav-link font-body text-xs tracking-widest uppercase transition-colors duration-300 ${item === "Retreats" ? "text-yellow-400" : "text-stone-300 hover:text-yellow-400"}`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <button
              className="btn-gold font-body text-xs tracking-widest uppercase px-6 py-3 rounded-full text-stone-900 font-medium"
              onClick={() => navigate("/booking")}
            >
              Reserve Now
            </button>
          </div>

          <button className="lg:hidden text-stone-300 hover:text-yellow-400 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="flex flex-col gap-1.5 w-6">
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </div>
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden nav-carved border-t border-yellow-900/30 py-6 px-6">
            {["Home", "Retreats", "Dining", "Gallery", "Contact"].map((item) => (
              <a key={item} href={item === "Home" ? "/" : `#${item.toLowerCase()}`} className="block font-body text-xs tracking-widest uppercase text-stone-300 hover:text-yellow-400 py-3 border-b border-stone-800/50 transition-colors" onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
            <button className="mt-4 w-full btn-gold font-body text-xs tracking-widest uppercase px-6 py-3 rounded-full text-stone-900 font-medium" onClick={() => { setMenuOpen(false); navigate("/booking"); }}>Reserve Now</button>
          </div>
        )}
      </nav>

      {/* ── HERO BANNER — no batik pattern overlay ── */}
      <section className="relative h-[75vh] min-h-[560px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1800&q=90"
            alt="Leonine Retreats"
            className="hero-parallax w-full h-full object-cover"
            style={{ transform: `translateY(${scrollY * 0.25}px)`, transformOrigin: "center top" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/30 to-transparent"></div>
        </div>

        {/* Floating leaf ornament — kept as it's a natural SVG, not the circle pattern */}
        <div className="absolute top-24 right-16 opacity-15 anim-float hidden xl:block pointer-events-none">
          <svg width="160" height="240" viewBox="0 0 200 300" fill="none">
            <path d="M100 280 Q90 200 70 160 Q30 130 10 145 Q40 120 65 140 Q55 100 30 70 Q60 95 68 130 Q72 90 50 55 Q80 82 76 125 Q82 88 100 50 Q96 90 78 122 Q88 100 115 85 Q104 115 80 128 Q95 140 120 132 Q108 148 82 144 Q92 210 100 280Z" fill="#4a7c52"/>
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 pb-20">
          <div className="anim-in delay-1 flex items-center gap-4 mb-5">
            <div className="gold-line w-14"></div>
            <span className="font-body text-xs tracking-[0.4em] uppercase text-yellow-400/90">Sacred Retreats · Sri Lanka</span>
          </div>
          <h1 className="font-display leading-none mb-4">
            <span className="anim-in delay-2 block text-6xl md:text-8xl xl:text-9xl font-medium hero-text-mask" style={{ textShadow: "0 2px 40px rgba(0,0,0,0.6)" }}>Curated</span>
            <span className="anim-in delay-3 block text-5xl md:text-7xl xl:text-8xl font-light italic anim-shimmer mt-1">Sanctuaries</span>
          </h1>
          <p className="anim-in delay-4 font-serif-light text-xl md:text-2xl text-stone-300 italic font-light max-w-xl mt-6 leading-relaxed">
            Three retreats. Three worlds. Each a living poem of nature, heritage, and absolute stillness.
          </p>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 w-full z-10">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,0 C360,60 1080,0 1440,50 L1440,60 L0,60 Z" fill="#0a160c"/>
          </svg>
        </div>
      </section>

      {/* ── INTRO STRIP ── */}
      <section style={{ background: "linear-gradient(135deg, #0a160c 0%, #142018 100%)" }} className="py-10 px-6">
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between gap-6">
          {[
            { num: "3", label: "Retreat Categories" },
            { num: "6", label: "Exclusive Villas" },
            { num: "14", label: "Acres of Jungle" },
            { num: "24/7", label: "Dedicated Butlers" },
          ].map((s, i) => (
            <div key={i} className="text-center flex-1 min-w-[120px]">
              <div className="font-display text-4xl font-bold anim-shimmer">{s.num}</div>
              <div className="font-body text-xs tracking-widest uppercase text-stone-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <main style={{ background: "linear-gradient(180deg, #0a160c 0%, #0d1a10 100%)" }} className="relative pb-24">
        <div className="batik-pattern absolute inset-0 pointer-events-none opacity-50"></div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`loading-dot w-3 h-3 rounded-full bg-yellow-500`} style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-stone-500">Preparing your sanctuaries…</p>
          </div>
        )}

        {/* Categories rendered */}
        {!loading && categories.map((cat, index) => {
          const visual = getVisual(cat.name);
          const isEven = index % 2 === 0;

          return (
            <div key={cat._id}>
              {index > 0 && <div className="section-divider"></div>}

              <article className="max-w-screen-xl mx-auto px-6">

                {/* Category Header */}
                <div className="text-center mb-14 anim-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="ornament-line text-yellow-600/50 text-sm mb-6">
                    <span className="font-body text-xs tracking-[0.5em] uppercase text-yellow-600/70">Retreat {String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="text-5xl mb-4">{visual.icon}</div>
                  <div className="inline-block px-4 py-1.5 rounded-full mb-4 font-body text-xs tracking-widest uppercase text-stone-900 font-medium" style={{ background: `linear-gradient(135deg, #c9a84c, #f0d080)` }}>{visual.tag}</div>
                  <h2 className="font-display text-5xl md:text-6xl font-medium text-amber-50 leading-tight">{cat.name}</h2>
                  <div className="flex items-center justify-center gap-3 mt-3">
                    <div className="w-8 h-px" style={{ background: "#c9a84c" }}></div>
                    <span className="font-serif-light text-lg italic text-yellow-400/80">{visual.badge}</span>
                    <div className="w-8 h-px" style={{ background: "#c9a84c" }}></div>
                  </div>
                </div>

                {/* Main Card */}
                <div className={`category-card rounded-3xl overflow-hidden relative group`} style={{ border: "1px solid rgba(201,168,76,0.12)", boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}>

                  {/* Hero Image */}
                  <div className="img-zoom relative h-[55vh] min-h-[380px] overflow-hidden">
                    <img
                      src={cat.image || visual.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = visual.image; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-transparent"></div>

                    {/* Price badge */}
                    <div className="absolute top-6 right-6 price-tag rounded-2xl px-5 py-3 text-center">
                      <div className="font-body text-xs tracking-widest uppercase text-stone-400 mb-1">From</div>
                      <div className="font-display text-2xl font-bold anim-shimmer">$ {cat.price?.toLocaleString() || "—"}</div>
                      <div className="font-body text-xs text-stone-500 mt-1">per night</div>
                    </div>

                    {/* Bottom overlay content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <p className="font-serif-light text-2xl md:text-3xl italic text-stone-200 font-light leading-relaxed max-w-2xl opacity-90">
                        "{visual.poem}"
                      </p>
                    </div>
                  </div>

                  {/* Content panel */}
                  <div className="p-8 md:p-12" style={{ background: "linear-gradient(135deg, rgba(13,26,16,0.98), rgba(10,22,12,0.98))" }}>
                    <div className="grid md:grid-cols-2 gap-10 items-start">

                      {/* Left: Description */}
                      <div>
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-8 h-px" style={{ background: "#c9a84c" }}></div>
                          <span className="font-body text-xs tracking-[0.4em] uppercase text-yellow-600/80">About this Retreat</span>
                        </div>
                        <p className="font-serif-light text-lg md:text-xl text-stone-300 leading-relaxed font-light italic mb-8">
                          {cat.description || "A living sanctuary where luxury and nature exist in perfect balance."}
                        </p>

                        {cat.features?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-8">
                            {cat.features.map((f, fi) => (
                              <span key={fi} className="feature-pill font-body text-xs tracking-wider text-stone-300 px-4 py-2 rounded-full flex items-center gap-1.5">
                                <span>{amenityIcons[f] || "✦"}</span>
                                {f}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: Highlights + CTA */}
                      <div className="flex flex-col gap-6">
                        <div className="rounded-2xl p-6" style={{ background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.12)" }}>
                          <h4 className="font-display text-sm text-amber-200 tracking-wider uppercase mb-4">What's Included</h4>
                          <ul className="space-y-2.5">
                            {["Daily Ayurvedic Breakfast", "Evening Jungle Walk", "24/7 Butler Concierge", "Welcome Ceremony", "Private Transfer"].map((item) => (
                              <li key={item} className="flex items-center gap-3 font-body text-sm text-stone-400">
                                <span className="text-yellow-600 text-xs">✦</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            className="btn-gold flex-1 font-body text-xs tracking-widest uppercase py-4 rounded-full text-stone-900 font-medium text-center"
                            onClick={() => navigate(`/rooms?category=${cat._id}&name=${encodeURIComponent(cat.name)}`)}
                          >
                            View Rooms →
                          </button>
                          <button
                            className="btn-outline-gold flex-1 font-body text-xs tracking-widest uppercase py-4 rounded-full text-yellow-400 text-center"
                            onClick={() => navigate("/booking")}
                          >
                            Book Now
                          </button>
                        </div>
                        <p className="font-body text-xs text-stone-600 text-center tracking-wider">
                          Free cancellation · No hidden fees · Private transfer included
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </article>
            </div>
          );
        })}

        {!loading && categories.length === 0 && (
          <div className="max-w-screen-xl mx-auto px-6 py-32 text-center">
            <div className="text-5xl mb-6">🌿</div>
            <h3 className="font-display text-3xl text-amber-100 mb-3">Sanctuaries Coming Soon</h3>
            <p className="font-serif-light text-lg italic text-stone-400">Our retreat categories are being curated. Please check back soon.</p>
          </div>
        )}
      </main>

      {/* ── BOOKING CTA BANNER ── */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1f0f, #1a3a1e, #0d1a10)" }}>
        <div className="batik-pattern absolute inset-0 pointer-events-none"></div>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-4xl mb-6 anim-float">🦁</div>
          <h2 className="font-display text-5xl md:text-6xl text-amber-50 font-medium mb-4">Find Your</h2>
          <h2 className="font-display text-5xl md:text-6xl font-light italic mb-8 anim-shimmer">Perfect Sanctuary</h2>
          <p className="font-serif-light text-xl italic text-stone-400 font-light mb-12 leading-relaxed max-w-xl mx-auto">
            Only 6 retreats at any one time. Each stay is individually curated. Begin with one conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-gold font-body text-sm tracking-widest uppercase px-12 py-5 rounded-full text-stone-900 font-medium" onClick={() => navigate("/booking")}>
              Begin Your Journey →
            </button>
            <button className="btn-outline-gold font-body text-sm tracking-widest uppercase px-12 py-5 rounded-full text-amber-200" onClick={() => window.location.href = "tel:+94812204455"}>
              Speak to a Curator
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="pt-16 pb-8 px-6" style={{ background: "#060e07", borderTop: "1px solid rgba(201,168,76,0.12)" }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Leonine" className="w-9 h-9 object-contain" onError={(e) => { e.target.style.display='none'; }} />
              <div>
                <div className="font-display text-xl text-amber-100 tracking-widest">LEONINE</div>
                <div className="font-body text-xs tracking-[0.3em] text-yellow-700 uppercase">Villa & Sanctuary · Sri Lanka</div>
              </div>
            </div>
            <div className="flex gap-6 flex-wrap justify-center">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
                <a key={l} href="#" className="font-body text-xs text-stone-600 hover:text-yellow-600 transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div className="gold-line mb-6"></div>
          <p className="font-body text-xs text-stone-600 text-center">© 2026 Leonine Villa & Sanctuary. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}