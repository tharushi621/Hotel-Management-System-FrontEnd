import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function RoomsPage() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const params    = new URLSearchParams(location.search);
  const categoryId   = params.get("category");
  const categoryName = params.get("name") || "Our Retreats";

  const [rooms, setRooms]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY]   = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  // ✅ imgIndexes keyed by room.roomId (Number) instead of room._id
  const [imgIndexes, setImgIndexes] = useState({});
  const [lightboxImg, setLightboxImg] = useState(null);
  const [activeRoom, setActiveRoom]   = useState(null);

  const heroImages = {
    treetop:   "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=1800&q=90",
    waterside: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1800&q=90",
    waterfall: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1800&q=90",
    cultural:  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=90",
    heritage:  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=90",
    forest:    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1800&q=90",
  };
  const getHero = () => {
    const lower = categoryName.toLowerCase();
    for (const [k, v] of Object.entries(heroImages)) if (lower.includes(k)) return v;
    return "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1800&q=90";
  };

  // Fallback photos when room.photos is empty
  const fallbackPhotos = [
    "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=900&q=90",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=90",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=90",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=90",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=90",
  ];

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 60); setScrollY(window.scrollY); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    // ✅ GET /api/rooms?category=<categoryId> — matches backend getRooms with filter
    const url = categoryId
      ? `${import.meta.env.VITE_BACKEND_URL}/api/rooms?category=${categoryId}`
      : `${import.meta.env.VITE_BACKEND_URL}/api/rooms`;

    axios
      .get(url)
      .then((res) => {
        const data = res.data.rooms || [];
        setRooms(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setRooms([]);
        setLoading(false);
      });
  }, [categoryId]);

  const cycleImg = (roomId, total, dir) => {
    setImgIndexes((prev) => {
      const cur = prev[roomId] || 0;
      return { ...prev, [roomId]: (cur + dir + total) % total };
    });
  };

  return (
    <div className="font-body bg-stone-950 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Cormorant+Infant:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-serif-light { font-family: 'Cormorant Infant', serif; }
        .font-body { font-family: 'Jost', sans-serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: #c9a84c; border-radius: 3px; }
        .gold-line { height: 1px; background: linear-gradient(90deg, transparent, #c9a84c, #d4891a, #c9a84c, transparent); }
        .nav-carved { background: linear-gradient(180deg, rgba(10,22,12,0.97) 0%, rgba(18,38,20,0.95) 100%); border-bottom: 1px solid rgba(201,168,76,0.2); box-shadow: 0 4px 30px rgba(0,0,0,0.4); }
        .batik-bg { background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23c9a84c' fill-opacity='0.03'%3E%3Cpath d='M40 0C17.9 0 0 17.9 0 40s17.9 40 40 40 40-17.9 40-40S62.1 0 40 0zm0 70C23.4 70 10 56.6 10 40S23.4 10 40 10s30 13.4 30 30-13.4 30-30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
        .nav-link::before { content: ''; position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 0; height: 1px; background: #c9a84c; transition: width 0.3s; }
        .nav-link:hover::before { width: 100%; }
        .nav-link { position: relative; letter-spacing: 0.15em; }
        .btn-gold { background: linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #d4891a 100%); box-shadow: 0 8px 32px rgba(201,168,76,0.35); transition: all 0.4s cubic-bezier(0.23,1,0.32,1); }
        .btn-gold:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 16px 48px rgba(201,168,76,0.5); }
        .btn-outline { border: 1px solid rgba(201,168,76,0.45); color: #f0d080; transition: all 0.3s; }
        .btn-outline:hover { border-color: rgba(201,168,76,0.9); background: rgba(201,168,76,0.08); }
        .room-card { background: linear-gradient(135deg, rgba(13,26,16,0.98), rgba(10,22,12,0.98)); border: 1px solid rgba(201,168,76,0.1); transition: border-color 0.4s ease, box-shadow 0.4s ease; }
        .room-card:hover { border-color: rgba(201,168,76,0.28); box-shadow: 0 40px 90px rgba(0,0,0,0.55); }
        .img-slide { transition: opacity 0.5s ease; }
        .slider-btn { background: rgba(10,22,12,0.7); border: 1px solid rgba(201,168,76,0.25); backdrop-filter: blur(10px); transition: all 0.3s; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }
        .slider-btn:hover { background: rgba(201,168,76,0.2); border-color: rgba(201,168,76,0.6); }
        .price-badge { background: linear-gradient(135deg, rgba(10,22,12,0.95), rgba(26,58,30,0.95)); border: 1px solid rgba(201,168,76,0.3); backdrop-filter: blur(20px); }
        .meta-chip { background: rgba(201,168,76,0.07); border: 1px solid rgba(201,168,76,0.15); border-radius: 999px; padding: 4px 14px; font-family: 'Jost', sans-serif; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: #c9a84c; }
        .lightbox { position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,0.92); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
        .anim-in { animation: fadeInUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .anim-float { animation: float 6s ease-in-out infinite; }
        .anim-shimmer { background: linear-gradient(90deg, #c9a84c 0%, #f0d080 40%, #d4891a 60%, #c9a84c 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer 4s linear infinite; }
        .loading-dot { animation: pulse-dot 1.4s ease-in-out infinite; }
        .hero-text-mask { background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(245,235,210,0.9)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `}</style>

      {/* LIGHTBOX */}
      {lightboxImg && (
        <div className="lightbox" onClick={() => setLightboxImg(null)}>
          <div className="relative max-w-5xl max-h-[90vh] mx-4">
            <img src={lightboxImg} alt="Room" className="rounded-2xl max-h-[85vh] w-full object-contain" />
            <button className="absolute top-4 right-4 text-stone-300 hover:text-white text-2xl font-light bg-black/50 w-10 h-10 rounded-full flex items-center justify-center transition-colors">✕</button>
          </div>
        </div>
      )}

      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? "nav-carved py-3" : "py-5 bg-transparent"}`}>
        <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between">
          <div className="flex flex-col items-start cursor-pointer" onClick={() => navigate("/")}>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Leonine" className="w-[44px] h-[44px]" onError={(e) => { e.target.style.display = "none"; }} />
              <span className="font-display text-2xl font-medium tracking-widest text-amber-100 hover:text-yellow-400 transition-colors duration-300">LEONINE</span>
            </div>
            <span className="font-body text-xs tracking-[0.4em] text-yellow-600/70 ml-10 uppercase">Villa & Sanctuary</span>
          </div>

          <ul className="hidden lg:flex items-center gap-8">
            {[
              { label: "Home",     href: "/" },
              { label: "Retreats", href: "/retreats" },
              { label: "Gallery",  href: "/gallery" },
              { label: "Contact",  href: "/#contact" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); navigate(item.href); }}
                  className={`nav-link font-body text-xs tracking-widest uppercase transition-colors duration-300 ${item.label === "Retreats" ? "text-yellow-400" : "text-stone-300 hover:text-yellow-400"}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <button className="btn-outline font-body text-xs tracking-widest uppercase px-4 py-2 rounded-full" onClick={() => navigate("/retreats")}>← Retreats</button>
            <button className="btn-gold font-body text-xs tracking-widest uppercase px-6 py-3 rounded-full text-stone-900 font-medium" onClick={() => navigate("/booking")}>Reserve Now</button>
          </div>

          <button className="lg:hidden text-stone-300 hover:text-yellow-400" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="flex flex-col gap-1.5 w-6">
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </div>
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden nav-carved border-t border-yellow-900/30 py-6 px-6">
            {["Home", "Retreats", "Gallery", "Contact"].map((item) => (
              <a key={item} href={`/${item.toLowerCase()}`} className="block font-body text-xs tracking-widest uppercase text-stone-300 hover:text-yellow-400 py-3 border-b border-stone-800/50 transition-colors" onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
            <button className="mt-4 w-full btn-gold font-body text-xs tracking-widest uppercase py-3 rounded-full text-stone-900 font-medium" onClick={() => { setMenuOpen(false); navigate("/booking"); }}>Reserve Now</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={getHero()} alt={categoryName} className="w-full h-full object-cover" style={{ transform: `translateY(${scrollY * 0.2}px)`, transformOrigin: "center top" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-stone-950/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 pb-16">
          <div className="anim-in flex items-center gap-2 mb-6 text-stone-500">
            <button onClick={() => navigate("/")} className="font-body text-xs tracking-wider uppercase hover:text-yellow-500 transition-colors">Home</button>
            <span>/</span>
            <button onClick={() => navigate("/retreats")} className="font-body text-xs tracking-wider uppercase hover:text-yellow-500 transition-colors">Retreats</button>
            <span>/</span>
            <span className="font-body text-xs tracking-wider uppercase text-yellow-600">{categoryName}</span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div style={{ height: "1px", width: "40px", background: "linear-gradient(90deg, #c9a84c, #d4891a)" }}></div>
            <span className="font-body text-xs tracking-[0.4em] uppercase text-yellow-400/90">Available Rooms</span>
          </div>
          <h1 className="font-display leading-none">
            <span className="block text-5xl md:text-7xl font-medium hero-text-mask">{categoryName}</span>
            <span className="block text-3xl md:text-4xl font-light italic anim-shimmer mt-2">Rooms & Villas</span>
          </h1>
          <p className="font-serif-light text-lg md:text-xl text-stone-300 italic font-light max-w-lg mt-5 leading-relaxed">
            Each room is a world unto itself — handcrafted, storied, and alive with the spirit of Lanka.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-10">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10">
            <path d="M0,0 C360,60 1080,0 1440,50 L1440,60 L0,60 Z" fill="#0a160c"/>
          </svg>
        </div>
      </section>

      {/* ROOMS LIST */}
      <main style={{ background: "linear-gradient(180deg, #0a160c, #0d1a10)" }} className="relative py-16">
        <div className="batik-bg absolute inset-0 pointer-events-none"></div>

        {!loading && rooms.length > 0 && (
          <div className="max-w-screen-xl mx-auto px-6 mb-12 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div style={{ height: "1px", width: "32px", background: "#c9a84c" }}></div>
              <span className="font-body text-xs tracking-[0.4em] uppercase text-stone-400">
                {rooms.length} {rooms.length === 1 ? "Room" : "Rooms"} Available
              </span>
            </div>
            <button onClick={() => navigate("/booking")} className="btn-gold font-body text-xs tracking-widest uppercase px-8 py-3 rounded-full text-stone-900 font-medium">
              Check Availability →
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="loading-dot w-3 h-3 rounded-full bg-yellow-500" style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-stone-500">Loading your sanctuaries…</p>
          </div>
        )}

        {/* Rooms */}
        {!loading && rooms.map((room, index) => {
          // ✅ FIX: use room.photos (schema field) instead of room.images
          const imgs   = room.photos?.length ? room.photos : fallbackPhotos.slice(0, 3);
          // ✅ FIX: key by room.roomId (schema field) instead of room._id
          const curImg = imgIndexes[room.roomId] || 0;
          const isOpen = activeRoom === room.roomId;

          return (
            <article key={room.roomId} className="max-w-screen-xl mx-auto px-6 mb-10">
              <div className="room-card rounded-3xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
                <div className="grid lg:grid-cols-2">

                  {/* Image Slider */}
                  <div className="relative h-80 lg:h-auto min-h-[380px] overflow-hidden">
                    {imgs.map((src, si) => (
                      <img key={si} src={src} alt={`Room ${room.roomId} — view ${si + 1}`}
                        className="img-slide absolute inset-0 w-full h-full object-cover cursor-zoom-in"
                        style={{ opacity: curImg === si ? 1 : 0, transition: "opacity 0.6s ease" }}
                        onClick={() => setLightboxImg(src)}
                        onError={(e) => { e.currentTarget.src = fallbackPhotos[si % fallbackPhotos.length]; }}
                      />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent pointer-events-none"></div>

                    {/* Room tag: Room #ID */}
                    <div className="absolute top-5 left-5">
                      <span className="font-body text-xs tracking-widest uppercase px-4 py-2 rounded-full text-stone-900 font-medium" style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)" }}>
                        Room #{room.roomId}
                      </span>
                    </div>

                    {imgs.length > 1 && (
                      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
                        {/* ✅ FIX: cycle by room.roomId */}
                        <button className="slider-btn text-stone-300 hover:text-yellow-400" onClick={() => cycleImg(room.roomId, imgs.length, -1)}>‹</button>
                        <div className="flex gap-1.5">
                          {imgs.map((_, di) => (
                            <button key={di} onClick={() => setImgIndexes((p) => ({ ...p, [room.roomId]: di }))}
                              className={`rounded-full transition-all duration-300 ${curImg === di ? "w-5 h-1.5 bg-yellow-500" : "w-1.5 h-1.5 bg-stone-500 hover:bg-stone-300"}`}>
                            </button>
                          ))}
                        </div>
                        <button className="slider-btn text-stone-300 hover:text-yellow-400" onClick={() => cycleImg(room.roomId, imgs.length, 1)}>›</button>
                      </div>
                    )}
                  </div>

                  {/* Room Details */}
                  <div className="p-8 md:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div style={{ height: "1px", width: "28px", background: "linear-gradient(90deg, #c9a84c, #d4891a)" }}></div>
                        {/* ✅ FIX: use room.category (schema field) */}
                        <span className="font-body text-xs tracking-[0.35em] uppercase text-yellow-600/80">{room.category}</span>
                      </div>

                      {/* ✅ FIX: Title is Room #ID since schema has no name field */}
                      <h2 className="font-display text-3xl md:text-4xl text-amber-50 font-medium mb-3 leading-snug">
                        Room <span className="anim-shimmer">#{room.roomId}</span>
                      </h2>

                      {/* ✅ FIX: meta chips use actual schema fields: maxGuests, available */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        <span className="meta-chip">👥 Max {room.maxGuests} Guests</span>
                        <span className="meta-chip">
                          {room.available ? "✅ Available" : "❌ Unavailable"}
                        </span>
                        {room.photos?.length > 0 && (
                          <span className="meta-chip">📸 {room.photos.length} Photos</span>
                        )}
                      </div>

                      {/* ✅ FIX: use room.specialDescription (schema field) instead of room.description */}
                      {room.specialDescription && (
                        <p className="font-serif-light text-lg text-stone-400 italic font-light leading-relaxed mb-6">
                          {room.specialDescription}
                        </p>
                      )}

                      {/* ✅ FIX: use room.notes (schema field) instead of room.features */}
                      {room.notes && (
                        <div
                          className="rounded-xl p-4 mb-6"
                          style={{ background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.1)" }}
                        >
                          <div className="font-body text-xs tracking-widest uppercase text-stone-500 mb-1">Notes</div>
                          <p className="font-body text-sm text-stone-400">{room.notes}</p>
                        </div>
                      )}

                      {/* Availability notice if unavailable */}
                      {!room.available && (
                        <div className="rounded-xl p-4 mb-6" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
                          <p className="font-body text-sm text-red-400">
                            ⚠ This room is currently unavailable. Please check back later or contact us.
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      {/* Every stay includes */}
                      <div className="rounded-xl p-4 mb-6" style={{ background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.1)" }}>
                        <div className="font-body text-xs tracking-widest uppercase text-stone-500 mb-2">Every stay includes</div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                          {["Ayurvedic Breakfast", "Welcome Ritual", "24/7 Butler", "Private Transfer"].map((inc) => (
                            <span key={inc} className="font-body text-xs text-stone-400 flex items-center gap-1">
                              <span className="text-yellow-700 text-xs">✦</span> {inc}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        {/* ✅ FIX: booking URL uses room.roomId (schema field) */}
                        <button
                          className="btn-gold flex-1 font-body text-xs tracking-widest uppercase py-4 rounded-full text-stone-900 font-medium text-center"
                          disabled={!room.available}
                          onClick={() =>
                            navigate(
                              `/booking?room=${room.roomId}&category=${encodeURIComponent(room.category)}`
                            )
                          }
                          style={!room.available ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                        >
                          {room.available ? "Book This Room →" : "Currently Unavailable"}
                        </button>
                        <button
                          className="btn-outline flex-1 font-body text-xs tracking-widest uppercase py-4 rounded-full text-center"
                          onClick={() => navigate("/booking")}
                        >
                          Check Availability
                        </button>
                      </div>
                      <p className="font-body text-xs text-stone-600 text-center mt-3 tracking-wider">
                        Free cancellation · Instant confirmation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        {/* No rooms */}
        {!loading && rooms.length === 0 && (
          <div className="max-w-screen-xl mx-auto px-6 py-32 text-center">
            <div className="text-5xl mb-6">🌿</div>
            <h3 className="font-display text-3xl text-amber-100 mb-4">No Rooms Available</h3>
            <p className="font-serif-light text-xl italic text-stone-400 mb-10">Rooms for this category are coming soon.</p>
            <button className="btn-gold font-body text-xs tracking-widest uppercase px-10 py-4 rounded-full text-stone-900 font-medium" onClick={() => navigate("/retreats")}>
              Explore All Retreats
            </button>
          </div>
        )}

        {!loading && rooms.length > 0 && (
          <div className="max-w-screen-xl mx-auto px-6 mt-8 flex justify-center">
            <button className="btn-outline font-body text-xs tracking-widest uppercase px-8 py-3 rounded-full flex items-center gap-2" onClick={() => navigate("/retreats")}>
              ← Back to All Retreats
            </button>
          </div>
        )}
      </main>

      {/* BOOKING CTA */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1f0f, #1a3a1e, #0d1a10)" }}>
        <div className="batik-bg absolute inset-0 pointer-events-none"></div>
        <div className="max-w-3xl mx-auto text-center">
          <div className="anim-float text-4xl mb-6">🦁</div>
          <h2 className="font-display text-5xl md:text-6xl text-amber-50 font-medium mb-3">Your Room</h2>
          <h2 className="font-display text-5xl md:text-6xl font-light italic mb-8 anim-shimmer">Awaits You</h2>
          <p className="font-serif-light text-xl italic text-stone-400 font-light mb-12 max-w-xl mx-auto leading-relaxed">
            Only 6 retreats available at any one time. Each stay is personally curated.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button className="btn-gold font-body text-sm tracking-widest uppercase px-12 py-5 rounded-full text-stone-900 font-medium" onClick={() => navigate("/booking")}>
              Begin Your Journey →
            </button>
            <button className="btn-outline font-body text-sm tracking-widest uppercase px-12 py-5 rounded-full" onClick={() => window.location.href = "tel:+94812204455"}>
              Speak to a Curator
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
            <div className="flex gap-6">
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