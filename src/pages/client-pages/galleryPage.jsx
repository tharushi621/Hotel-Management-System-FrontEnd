import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GalleryPage() {
  const navigate = useNavigate();
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null); // index of open image
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close lightbox on Escape, navigate with arrow keys
  useEffect(() => {
    const handleKey = (e) => {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((p) => (p + 1) % filteredItems.length);
      if (e.key === "ArrowLeft") setLightbox((p) => (p - 1 + filteredItems.length) % filteredItems.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/gallery`)
      .then((res) => {
        const data = res.data.list || res.data || [];
        setGalleryItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        // Fallback demo data while backend is unavailable
        setGalleryItems([
          { _id: "1", name: "Pool Terrace", description: "The infinity pool at golden hour", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=90", category: "Spaces" },
          { _id: "2", name: "Jungle Canopy", description: "Morning mist through the treetops", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&q=90", category: "Nature" },
          { _id: "3", name: "Heritage Suite", description: "Hand-carved jak wood interiors", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=90", category: "Spaces" },
          { _id: "4", name: "Villa Exterior", description: "The main villa at dusk", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&q=90", category: "Spaces" },
          { _id: "5", name: "Spa Garden", description: "Ayurvedic herb garden", image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=900&q=90", category: "Wellness" },
          { _id: "6", name: "Sunset Dining", description: "Alfresco dining as the sun sets", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=90", category: "Dining" },
          { _id: "7", name: "Forest Path", description: "Ancient trails through the jungle", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=90", category: "Nature" },
          { _id: "8", name: "Ayurveda Ritual", description: "Sacred healing ceremony", image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900&q=90", category: "Wellness" },
          { _id: "9", name: "Kandyan Art", description: "Living artisan traditions", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=90", category: "Culture" },
          { _id: "10", name: "River Dawn", description: "First light over the river", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=90", category: "Nature" },
          { _id: "11", name: "Tea Estate", description: "Rolling hills of highland tea", image: "https://images.unsplash.com/photo-1566646174759-5d5b0e2e1a6a?w=900&q=90", category: "Culture" },
          { _id: "12", name: "Bedroom Sanctuary", description: "The canopy suite at night", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=90", category: "Spaces" },
        ]);
        setLoading(false);
      });
  }, []);

  // Derive unique filter tags from the data
  const allCategories = ["All", ...Array.from(new Set(galleryItems.map((i) => i.category).filter(Boolean)))];
  const filteredItems = filter === "All" ? galleryItems : galleryItems.filter((i) => i.category === filter);

  const navItems = [
    { label: "Home",     action: () => navigate("/") },
    { label: "Retreats", action: () => navigate("/retreats") },
    { label: "Dining",   action: () => navigate("/dining") },
    { label: "Gallery",  action: () => navigate("/gallery") },
    { label: "Contact",  action: () => { navigate("/"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100); } },
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    item.action();
    setMenuOpen(false);
  };

  const openLightbox = (index) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const prevImage = () => setLightbox((p) => (p - 1 + filteredItems.length) % filteredItems.length);
  const nextImage = () => setLightbox((p) => (p + 1) % filteredItems.length);

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

        .nav-carved {
          background: linear-gradient(180deg, rgba(10,22,12,0.97) 0%, rgba(18,38,20,0.95) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.2);
          box-shadow: 0 4px 30px rgba(0,0,0,0.4);
        }
        .nav-link { position: relative; letter-spacing: 0.15em; }
        .nav-link::before { content: ''; position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 0; height: 1px; background: #c9a84c; transition: width 0.3s ease; }
        .nav-link:hover::before { width: 100%; }

        .btn-gold {
          background: linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #d4891a 100%);
          box-shadow: 0 8px 32px rgba(201,168,76,0.4);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .btn-gold:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 16px 48px rgba(201,168,76,0.5); }

        /* ── Masonry grid ── */
        .masonry-grid {
          columns: 1;
          column-gap: 16px;
        }
        @media (min-width: 640px)  { .masonry-grid { columns: 2; } }
        @media (min-width: 1024px) { .masonry-grid { columns: 3; } }
        @media (min-width: 1280px) { .masonry-grid { columns: 4; } }

        .masonry-item {
          break-inside: avoid;
          margin-bottom: 16px;
        }

        /* ── Gallery card ── */
        .gallery-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(201,168,76,0.08);
          display: block;
          width: 100%;
        }
        .gallery-card img {
          width: 100%;
          display: block;
          transition: transform 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease;
          filter: brightness(0.9) saturate(1.05);
        }
        .gallery-card:hover img {
          transform: scale(1.05);
          filter: brightness(1) saturate(1.2);
        }
        .gallery-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(5,10,6,0.88) 0%, rgba(5,10,6,0.3) 45%, transparent 75%);
          opacity: 0;
          transition: opacity 0.45s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.25rem;
        }
        .gallery-card:hover .gallery-card-overlay { opacity: 1; }
        .gallery-card-zoom-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.6);
          opacity: 0;
          transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(201,168,76,0.2);
          border: 1px solid rgba(201,168,76,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(8px);
        }
        .gallery-card:hover .gallery-card-zoom-icon {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        /* ── Lightbox ── */
        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(3,6,4,0.96);
          backdrop-filter: blur(24px);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: lb-in 0.3s ease both;
        }
        @keyframes lb-in { from { opacity: 0; } to { opacity: 1; } }
        .lightbox-img {
          max-width: min(90vw, 1100px);
          max-height: 80vh;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
          border: 1px solid rgba(201,168,76,0.15);
          animation: lb-img-in 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes lb-img-in { from { opacity: 0; transform: scale(0.93); } to { opacity: 1; transform: scale(1); } }
        .lb-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(201,168,76,0.12);
          border: 1px solid rgba(201,168,76,0.3);
          color: #c9a84c;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          font-size: 1.2rem;
          backdrop-filter: blur(10px);
        }
        .lb-nav-btn:hover {
          background: rgba(201,168,76,0.25);
          border-color: rgba(201,168,76,0.7);
        }

        /* ── Filter pills ── */
        .filter-pill {
          font-family: 'Jost', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.45rem 1.1rem;
          border-radius: 999px;
          border: 1px solid rgba(201,168,76,0.25);
          color: rgba(214,204,185,0.65);
          background: transparent;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .filter-pill:hover {
          border-color: rgba(201,168,76,0.5);
          color: #c9a84c;
        }
        .filter-pill.active {
          background: linear-gradient(135deg, #c9a84c, #f0d080, #d4891a);
          border-color: transparent;
          color: #1a1200;
          font-weight: 500;
          box-shadow: 0 4px 16px rgba(201,168,76,0.35);
        }

        /* ── Animations ── */
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes pulse-dot { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.75); } }

        .anim-in { animation: fadeInUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.35s; }
        .delay-4 { animation-delay: 0.5s; }

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

        .batik-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23c9a84c' fill-opacity='0.04'%3E%3Cpath d='M40 0C17.9 0 0 17.9 0 40s17.9 40 40 40 40-17.9 40-40S62.1 0 40 0zm0 70C23.4 70 10 56.6 10 40S23.4 10 40 10s30 13.4 30 30-13.4 30-30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>

      {/* ── NAVIGATION ── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? "nav-carved py-3" : "py-5 bg-transparent"}`}>
        <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between">
          <div className="flex flex-col items-start cursor-pointer" onClick={() => navigate("/")}>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Leonine" className="w-[44px] h-[44px] object-contain" onError={(e) => { e.target.style.display = "none"; }} />
              <span className="font-display text-2xl font-medium tracking-widest text-amber-100 hover:text-yellow-400 transition-colors duration-300">LEONINE</span>
            </div>
            <span className="font-body text-xs tracking-[0.4em] text-yellow-600/70 ml-14 uppercase">Villa & Sanctuary</span>
          </div>

          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  onClick={(e) => handleNavClick(e, item)}
                  className={`nav-link font-body text-xs tracking-widest uppercase transition-colors duration-300 ${item.label === "Gallery" ? "text-yellow-400" : "text-stone-300 hover:text-yellow-400"}`}
                >
                  {item.label}
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
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className="block font-body text-xs tracking-widest uppercase text-stone-300 hover:text-yellow-400 py-3 border-b border-stone-800/50 transition-colors"
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
              </a>
            ))}
            <button className="mt-4 w-full btn-gold font-body text-xs tracking-widest uppercase px-6 py-3 rounded-full text-stone-900 font-medium" onClick={() => { setMenuOpen(false); navigate("/booking"); }}>
              Reserve Now
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1800&q=90"
            alt="Leonine Gallery"
            className="w-full h-full object-cover"
            style={{ transform: `translateY(${scrollY * 0.22}px)`, transformOrigin: "center top" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-stone-950/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/30 to-transparent"></div>
        </div>

        {/* Leaf ornament */}
        <div className="absolute top-28 right-16 opacity-12 anim-float hidden xl:block pointer-events-none">
          <svg width="140" height="220" viewBox="0 0 200 300" fill="none">
            <path d="M100 280 Q90 200 70 160 Q30 130 10 145 Q40 120 65 140 Q55 100 30 70 Q60 95 68 130 Q72 90 50 55 Q80 82 76 125 Q82 88 100 50 Q96 90 78 122 Q88 100 115 85 Q104 115 80 128 Q95 140 120 132 Q108 148 82 144 Q92 210 100 280Z" fill="#4a7c52"/>
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 pb-20">
          <div className="anim-in delay-1 flex items-center gap-4 mb-5">
            <div className="gold-line w-14"></div>
            <span className="font-body text-xs tracking-[0.4em] uppercase text-yellow-400/90">Leonine Life · Captured</span>
          </div>
          <h1 className="font-display leading-none mb-4">
            <span className="anim-in delay-2 block text-6xl md:text-8xl xl:text-9xl font-medium hero-text-mask">Moments</span>
            <span className="anim-in delay-3 block text-5xl md:text-7xl xl:text-8xl font-light italic anim-shimmer mt-1">& Memories</span>
          </h1>
          <p className="anim-in delay-4 font-serif-light text-xl md:text-2xl text-stone-300 italic font-light max-w-xl mt-5 leading-relaxed">
            Every image a whisper from the jungle — light through canopy, stone worn by sacred rivers, lives transformed.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-10">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,0 C360,60 1080,0 1440,50 L1440,60 L0,60 Z" fill="#060e07"/>
          </svg>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <section style={{ background: "linear-gradient(135deg, #060e07 0%, #0d1a10 100%)" }} className="sticky top-[56px] z-40 py-5 px-6 border-b border-yellow-900/20">
        <div className="max-w-screen-xl mx-auto flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-stone-500 whitespace-nowrap mr-2">Filter</span>
          {allCategories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${filter === cat ? "active" : ""}`}
              onClick={() => { setFilter(cat); setLightbox(null); }}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto font-body text-xs text-stone-600 whitespace-nowrap tracking-wider">
            {filteredItems.length} {filteredItems.length === 1 ? "image" : "images"}
          </span>
        </div>
      </section>

      {/* ── GALLERY GRID ── */}
      <main style={{ background: "linear-gradient(180deg, #060e07 0%, #0a160c 100%)" }} className="relative min-h-screen">
        <div className="batik-pattern absolute inset-0 pointer-events-none opacity-40"></div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-48 gap-6">
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="loading-dot w-3 h-3 rounded-full bg-yellow-500" style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-stone-500">Curating your gallery…</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredItems.length === 0 && (
          <div className="max-w-xl mx-auto px-6 py-40 text-center">
            <div className="text-5xl mb-6">🌿</div>
            <h3 className="font-display text-3xl text-amber-100 mb-3">No Images Yet</h3>
            <p className="font-serif-light text-lg italic text-stone-400">
              {filter === "All"
                ? "The gallery is being curated. Please check back soon."
                : `No images in the "${filter}" collection yet.`}
            </p>
            {filter !== "All" && (
              <button onClick={() => setFilter("All")} className="mt-6 font-body text-xs tracking-widest uppercase text-yellow-500 border border-yellow-700/40 px-6 py-3 rounded-full hover:bg-yellow-900/10 transition-all">
                View All
              </button>
            )}
          </div>
        )}

        {/* Masonry gallery */}
        {!loading && filteredItems.length > 0 && (
          <div className="relative z-10 max-w-screen-xl mx-auto px-6 py-12">
            <div className="masonry-grid">
              {filteredItems.map((item, index) => (
                <div key={item._id} className="masonry-item">
                  <div
                    className="gallery-card"
                    onClick={() => openLightbox(index)}
                    style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80"; }}
                    />

                    {/* Zoom icon */}
                    <div className="gallery-card-zoom-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
                      </svg>
                    </div>

                    {/* Hover overlay */}
                    <div className="gallery-card-overlay">
                      {item.category && (
                        <span className="font-body text-[10px] tracking-[0.22em] uppercase text-yellow-500/70 mb-1">{item.category}</span>
                      )}
                      <h3 className="font-display text-base text-amber-100 font-medium leading-tight">{item.name}</h3>
                      {item.description && (
                        <p className="font-body text-xs text-stone-400 mt-1 leading-relaxed line-clamp-2">{item.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && filteredItems[lightbox] && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          {/* Close */}
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center border border-yellow-700/40 text-stone-300 hover:text-yellow-400 hover:border-yellow-500 transition-all z-10 bg-stone-950/60 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            ✕
          </button>

          {/* Prev */}
          {filteredItems.length > 1 && (
            <button className="lb-nav-btn" style={{ left: "1rem" }} onClick={(e) => { e.stopPropagation(); prevImage(); }}>
              ←
            </button>
          )}

          {/* Image container */}
          <div className="flex flex-col items-center gap-5 px-16" onClick={(e) => e.stopPropagation()}>
            <img
              key={lightbox}
              src={filteredItems[lightbox].image}
              alt={filteredItems[lightbox].name}
              className="lightbox-img"
            />
            <div className="text-center">
              {filteredItems[lightbox].category && (
                <span className="font-body text-xs tracking-[0.25em] uppercase text-yellow-600/70 block mb-1">{filteredItems[lightbox].category}</span>
              )}
              <h3 className="font-display text-xl text-amber-100">{filteredItems[lightbox].name}</h3>
              {filteredItems[lightbox].description && (
                <p className="font-body text-sm text-stone-400 mt-1 max-w-md mx-auto">{filteredItems[lightbox].description}</p>
              )}
              <p className="font-body text-xs text-stone-600 mt-3 tracking-wider">
                {lightbox + 1} / {filteredItems.length}
              </p>
            </div>
          </div>

          {/* Next */}
          {filteredItems.length > 1 && (
            <button className="lb-nav-btn" style={{ right: "1rem" }} onClick={(e) => { e.stopPropagation(); nextImage(); }}>
              →
            </button>
          )}
        </div>
      )}

      {/* ── BOOKING CTA ── */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1f0f, #1a3a1e, #0d1a10)" }}>
        <div className="batik-pattern absolute inset-0 pointer-events-none"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="gold-line w-16"></div>
            <img src="/logo.png" alt="Leonine" className="w-10 h-10 object-contain" style={{ filter: "drop-shadow(0 0 10px rgba(201,168,76,0.35))" }} onError={(e) => { e.target.style.display = "none"; }} />
            <div className="gold-line w-16"></div>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-amber-50 font-medium mb-4">Live Inside</h2>
          <h2 className="font-display text-5xl md:text-6xl font-light italic mb-8 anim-shimmer">the Picture</h2>
          <p className="font-serif-light text-xl italic text-stone-400 font-light mb-12 leading-relaxed max-w-xl mx-auto">
            These moments can be yours. Six retreats, infinite stillness, one unforgettable journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="btn-gold font-body text-sm tracking-widest uppercase px-12 py-5 rounded-full text-stone-900 font-medium"
              onClick={() => navigate("/booking")}
            >
              Begin Your Journey →
            </button>
            <button
              className="font-body text-sm tracking-widest uppercase px-12 py-5 rounded-full text-amber-200 border border-yellow-700/40 hover:bg-yellow-900/10 hover:border-yellow-500 transition-all"
              onClick={() => window.location.href = "tel:+94812204455"}
            >
              Speak to a Curator
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact" className="pt-16 pb-8 px-6" style={{ background: "#060e07", borderTop: "1px solid rgba(201,168,76,0.12)" }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Leonine" className="w-9 h-9 object-contain" onError={(e) => { e.target.style.display = "none"; }} />
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