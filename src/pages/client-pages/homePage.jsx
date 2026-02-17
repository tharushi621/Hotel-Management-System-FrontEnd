import { useState, useEffect, useRef } from "react";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((p) => (p + 1) % 3), 6000);
    return () => clearInterval(t);
  }, []);

  const testimonials = [
    {
      text: "Leonine Villa transcends the concept of hospitality. The ancient stone paths, the chorus of the jungle at dawn, the firefly gardens at dusk — I left a different person.",
      author: "Isabelle Marchetti",
      country: "Florence, Italy",
      rating: 5,
    },
    {
      text: "A living heritage. Every corner breathes Sri Lanka's soul — carved wood, handwoven textiles, the scent of cinnamon in the morning breeze. Nothing compares.",
      author: "James Hartwell",
      country: "London, UK",
      rating: 5,
    },
    {
      text: "We've stayed at villas across Southeast Asia. Leonine stands alone. The fusion of Kandyan art with pure jungle immersion is a masterpiece of experience design.",
      author: "Yuki & Sho Tanaka",
      country: "Kyoto, Japan",
      rating: 5,
    },
  ];

  const rooms = [
    {
      title: "The King's Canopy Suite",
      subtitle: "Treetop Luxury",
      description:
        "Rise above the jungle canopy in this elevated retreat. Ancient jak-wood ceilings, hand-beaten copper tubs, and a private rain terrace where the mist rolls in at dawn.",
      image:
        "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=900&q=90",
      icon: "🌿",
      tag: "Most Requested",
    },
    {
      title: "Ganga Riverside Villa",
      subtitle: "Waterside Retreat",
      description:
        "Perched above a singing river, this villa wraps you in the sound of water and birdsong. Step-stone baths, woven rattan terraces, and sunrise over the sacred hills.",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=90",
      icon: "💧",
      tag: "Romantic Escape",
    },
    {
      title: "The Heritage Forest Lodge",
      subtitle: "Cultural Sanctuary",
      description:
        "Inspired by the royal pavilions of Kandy — traditional clay walls, Batik draperies, hand-painted murals, and a meditation sala open to the ancient forest.",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=90",
      icon: "🏛️",
      tag: "Cultural Immersion",
    },
  ];

  const experiences = [
    {
      icon: "🌿",
      title: "Jungle Foraging",
      desc: "Walk with our naturalists through 14 acres of uncharted rainforest",
    },
    {
      icon: "🎋",
      title: "Ayurvedic Rituals",
      desc: "Ancient healing ceremonies with resident Ayurveda masters",
    },
    {
      icon: "🎨",
      title: "Kandyan Art",
      desc: "Private sessions with award-winning Sinhala artisans",
    },
    {
      icon: "🐘",
      title: "Elephant Dawn",
      desc: "Sacred morning walks with Sri Lanka's wild giants",
    },
    {
      icon: "🌊",
      title: "River Ceremonies",
      desc: "Torch-lit river rituals at sunset, a Leonine signature",
    },
    {
      icon: "🍃",
      title: "Tea Garden Walks",
      desc: "Journey through misty highland tea estates at golden hour",
    },
  ];

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=90",
      label: "Pool Terrace",
    },
    {
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&q=90",
      label: "Jungle Views",
    },
    {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=90",
      label: "Heritage Suite",
    },
    {
      src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&q=90",
      label: "Villa Exterior",
    },
    {
      src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=900&q=90",
      label: "Spa Garden",
    },
    {
      src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=90",
      label: "Sunset Dining",
    },
  ];

  return (
    <div className="font-body bg-stone-950 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Cormorant+Infant:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        :root {
          --jungle: #1a3a1e;
          --jungle-mid: #2e5c35;
          --leaf: #4a7c52;
          --fern: #7cad7a;
          --moss: #a8c8a0;
          --saffron: #d4891a;
          --gold: #c9a84c;
          --copper: #b5651d;
          --cream: #f5f0e8;
          --parchment: #ede4d3;
          --stone: #c4b49a;
          --terra: #8b4513;
        }

        .font-display { font-family: 'Playfair Display', serif; }
        .font-serif-light { font-family: 'Cormorant Infant', serif; }
        .font-body { font-family: 'Jost', sans-serif; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

        .batik-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.04'%3E%3Cpath d='M40 0C17.9 0 0 17.9 0 40s17.9 40 40 40 40-17.9 40-40S62.1 0 40 0zm0 70C23.4 70 10 56.6 10 40S23.4 10 40 10s30 13.4 30 30-13.4 30-30 30z'/%3E%3Cpath d='M40 20c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm0 32c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .hero-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 3;
        }

        .nav-carved {
          background: linear-gradient(180deg, rgba(10,22,12,0.97) 0%, rgba(18,38,20,0.95) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.2);
          box-shadow: 0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,168,76,0.15);
        }

        .gold-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), var(--saffron), var(--gold), transparent);
        }

        .text-glow {
          text-shadow: 0 0 80px rgba(201,168,76,0.3), 0 2px 40px rgba(0,0,0,0.6);
        }

        .room-card-3d {
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s ease;
          transform-style: preserve-3d;
        }
        .room-card-3d:hover {
          transform: translateY(-12px) rotateX(2deg);
          box-shadow: 0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.2);
        }

        .btn-ripple {
          position: relative;
          overflow: hidden;
        }
        .btn-ripple::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-ripple:hover::after { opacity: 1; }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-0.5deg); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(201,168,76,0.3); }
          50% { box-shadow: 0 0 50px rgba(201,168,76,0.6); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }

        .anim-float { animation: float-slow 8s ease-in-out infinite; }
        .anim-float-2 { animation: float-medium 6s ease-in-out infinite 1s; }
        .anim-sway { animation: sway 4s ease-in-out infinite; }
        .anim-shimmer-text {
          background: linear-gradient(90deg, #c9a84c 0%, #f0d080 40%, #d4891a 60%, #c9a84c 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .anim-hero-1 { animation: fadeInDown 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
        .anim-hero-2 { animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both; }
        .anim-hero-3 { animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both; }
        .anim-hero-4 { animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.1s both; }
        .anim-hero-5 { animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.4s both; }
        .anim-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .ping-slow { animation: ping-slow 2s ease-out infinite; }

        .nav-link {
          position: relative;
          letter-spacing: 0.15em;
        }
        .nav-link::before {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: width 0.3s ease;
        }
        .nav-link:hover::before { width: 100%; }

        .testimonial-slide {
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .gallery-zoom img {
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gallery-zoom:hover img {
          transform: scale(1.08);
        }

        .experience-card {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .experience-card:hover {
          transform: translateY(-8px);
          border-color: rgba(201,168,76,0.5) !important;
        }

        .wave-separator {
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }

        .stat-number {
          font-family: 'Playfair Display', serif;
          background: linear-gradient(135deg, #c9a84c, #f0d080, #d4891a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .booking-glass {
          background: rgba(10, 22, 12, 0.55);
          backdrop-filter: blur(30px) saturate(150%);
          border: 1px solid rgba(201,168,76,0.2);
        }

        .bg-linen {
          background-color: #f5f0e8;
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? "nav-carved py-3" : "py-5 bg-transparent"}`}>
        <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between">
          <div className="flex flex-col items-start group cursor-pointer">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${scrolled ? "border-yellow-600/60 bg-yellow-900/20" : "border-yellow-400/40"}`}>
                <img src="/logo.png" alt="Logo" className="w-[170px] h-[70px]" />
              </div>
              <span className="font-display text-2xl font-medium tracking-widest text-amber-100 group-hover:text-yellow-400 transition-colors duration-300">LEONINE</span>
            </div>
            <span className="font-body text-xs tracking-[0.4em] text-yellow-600/70 ml-10 uppercase">Villa & Sanctuary</span>
          </div>

          <ul className="hidden lg:flex items-center gap-8">
            {["Home","Heritage","Retreats","Dining","Gallery","Contact"].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="nav-link font-body text-xs tracking-widest uppercase text-stone-300 hover:text-yellow-400 transition-colors duration-300">{item}</a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <button className="font-body text-xs tracking-widest uppercase text-stone-300 hover:text-yellow-400 transition-colors duration-300 px-4 py-2">Sign In</button>
            <button className="btn-ripple font-body text-xs tracking-widest uppercase px-6 py-3 rounded-full border border-yellow-600/50 text-yellow-400 hover:bg-yellow-600/10 hover:border-yellow-500 transition-all duration-300 anim-pulse-glow">Reserve Now</button>
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
            {["Home","Heritage","Retreats","Dining","Gallery","Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block font-body text-xs tracking-widest uppercase text-stone-300 hover:text-yellow-400 py-3 border-b border-stone-800/50 transition-colors" onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
            <button className="mt-4 w-full font-body text-xs tracking-widest uppercase px-6 py-3 rounded-full border border-yellow-600/50 text-yellow-400 hover:bg-yellow-600/10 transition-all">Reserve Now</button>
          </div>
        )}
      </nav>

      {/* ═══ HERO SECTION — lighter overlays so image is beautifully visible ═══ */}
      <section id="home" ref={heroRef} className="hero-grain relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/n2.jpg"
            alt="Leonine Villa"
            className="w-full h-full object-cover"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          />

          {/* ── OVERLAY 1: gentle top-to-bottom fade — was /80 now /40 ── */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-transparent to-stone-950/70"></div>

          {/* ── OVERLAY 2: subtle left-right gradient — was /60 now /25 ── */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/25 via-transparent to-stone-950/15"></div>

          {/* ── OVERLAY 3: vignette — reduced opacity center transparency ── */}
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,10,6,0.45) 100%)" }}
          ></div>
        </div>

        {/* Animated botanical elements */}
        <div className="absolute left-0 top-20 opacity-20 anim-float pointer-events-none z-1 hidden xl:block">
          <svg width="200" height="300" viewBox="0 0 200 300" fill="none">
            <path d="M100 280 Q90 200 70 160 Q30 130 10 145 Q40 120 65 140 Q55 100 30 70 Q60 95 68 130 Q72 90 50 55 Q80 82 76 125 Q82 88 100 50 Q96 90 78 122 Q88 100 115 85 Q104 115 80 128 Q95 140 120 132 Q108 148 82 144 Q92 210 100 280Z" fill="#4a7c52"/>
            <path d="M140 280 Q135 220 120 180 Q100 165 85 172 Q102 158 118 168 Q110 140 95 118 Q112 132 116 158 Q120 135 108 108 Q124 125 122 152 Q128 128 145 105 Q140 130 126 150 Q134 138 150 130 Q143 148 128 155 Q135 165 148 160 Q142 170 128 167 Q133 225 140 280Z" fill="#2e5c35" opacity="0.6"/>
          </svg>
        </div>
        <div className="absolute right-0 top-32 opacity-15 anim-float-2 pointer-events-none z-1 hidden xl:block" style={{ transform: "scaleX(-1)" }}>
          <svg width="180" height="280" viewBox="0 0 200 300" fill="none">
            <path d="M100 280 Q90 200 70 160 Q30 130 10 145 Q40 120 65 140 Q55 100 30 70 Q60 95 68 130 Q72 90 50 55 Q80 82 76 125 Q82 88 100 50 Q96 90 78 122 Q88 100 115 85 Q104 115 80 128 Q95 140 120 132 Q108 148 82 144 Q92 210 100 280Z" fill="#4a7c52"/>
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24">
          <div className="anim-hero-1 inline-flex items-center gap-3 mb-8">
            <div className="gold-line w-16"></div>
            <span className="font-body text-xs tracking-[0.4em] uppercase text-yellow-400/90">Sri Lanka · Est. 2019</span>
            <div className="gold-line w-16"></div>
          </div>

          <h1 className="font-display text-glow mb-4 anim-hero-2">
            <span className="block text-6xl md:text-8xl xl:text-9xl font-medium text-white leading-none tracking-wide">Leonine</span>
            <span className="block text-3xl md:text-4xl xl:text-5xl font-light italic text-yellow-400/95 mt-2 tracking-widest">Villa & Sanctuary</span>
          </h1>

          <div className="anim-hero-3 flex items-center justify-center my-6">
            <div className="gold-line w-20"></div>
            <div className="mx-4 text-yellow-500 text-lg">❋</div>
            <div className="gold-line w-20"></div>
          </div>

          <p className="anim-hero-4 font-serif-light text-xl md:text-2xl text-stone-200 leading-relaxed max-w-2xl mx-auto font-light italic mb-10">
            Where Sri Lanka's ancient soul breathes through every leaf, every carved pillar, every firefly-lit evening in the heart of the jungle.
          </p>

          <div className="anim-hero-5 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="btn-ripple group font-body text-sm tracking-widest uppercase px-10 py-4 rounded-full text-stone-900 font-medium transition-all duration-500 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #d4891a 100%)", boxShadow: "0 8px 32px rgba(201,168,76,0.4)" }}
            >
              Book Your Sanctuary
              <span className="ml-2 group-hover:ml-4 transition-all duration-300">→</span>
            </button>
            <button className="btn-ripple font-body text-sm tracking-widest uppercase px-10 py-4 rounded-full text-amber-100 border border-yellow-600/50 hover:border-yellow-400/80 hover:bg-yellow-900/15 transition-all duration-300">
              Discover the Story
            </button>
          </div>

          <div className="anim-hero-5 mt-14 flex flex-wrap items-center justify-center gap-6 opacity-75">
            {["World's Best Eco Villa 2024","Condé Nast Traveller Pick","UNESCO Heritage Partner"].map((award) => (
              <div key={award} className="flex items-center gap-2">
                <span className="text-yellow-500 text-xs">★</span>
                <span className="font-body text-xs tracking-wider text-stone-300 uppercase">{award}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 mt-16">
          <div className="booking-glass rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: "14", unit: "Acres", label: "of Wild Jungle" },
              { num: "5,000+", unit: "", label: "Souls Transformed" },
              { num: "1,400", unit: "m", label: "Above Sea Level" },
              { num: "24/7", unit: "", label: "Dedicated Butlers" },
            ].map((stat, i) => (
              <div key={i} className="text-center border-r border-yellow-900/30 last:border-0 px-2">
                <div className="stat-number text-3xl font-bold">{stat.num}<span className="text-lg">{stat.unit}</span></div>
                <div className="font-body text-xs tracking-wider text-stone-400 uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
          <span className="font-body text-xs tracking-[0.3em] text-stone-300 uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-yellow-500/60 to-transparent animate-pulse"></div>
        </div>

        {/* Wave separator */}
        <div className="wave-separator z-10">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,0 C360,60 1080,0 1440,50 L1440,60 L0,60 Z" fill="#0d1f0f"/>
          </svg>
        </div>
      </section>

      {/* HERITAGE SECTION */}
      <section id="heritage" className="relative py-24 px-6" style={{ background: "linear-gradient(135deg, #0d1f0f 0%, #1a3a1e 50%, #0d1a10 100%)" }}>
        <div className="batik-pattern absolute inset-0 pointer-events-none"></div>
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="gold-line w-12"></div>
                <span className="font-body text-xs tracking-[0.4em] uppercase text-yellow-600/80">Our Heritage</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl font-medium text-amber-50 leading-tight mb-2">Born from the</h2>
              <h2 className="font-display text-5xl md:text-6xl font-light italic mb-8" style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080, #d4891a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Soil of Lanka</h2>
              <p className="font-serif-light text-xl text-stone-300 leading-relaxed italic mb-6 font-light">
                "Leonine" draws from the ancient Sinhala symbol of the Lion — strength, grace, and an unbreakable bond with the land. Our villa was shaped not by architects, but by the forest itself.
              </p>
              <p className="font-body text-sm text-stone-400 leading-relaxed mb-8">
                Nestled in Sri Lanka's Central Highlands, every structure at Leonine Villa honours traditional Kandyan craftsmanship — hand-carved jak wood columns, rammed earth walls, hand-laid Dumbara mats — blended with contemporary sanctuary design that lets nature flow freely through every space.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🏛️", title: "Kandyan Architecture", desc: "Royal building traditions, reborn" },
                  { icon: "🌿", title: "Zero Carbon Footprint", desc: "100% solar & rainwater systems" },
                  { icon: "🦋", title: "Biodiversity Reserve", desc: "14 acres of protected habitat" },
                  { icon: "🎋", title: "Living Culture", desc: "Resident artisans & Ayurveda" },
                ].map((f) => (
                  <div key={f.title} className="p-4 rounded-xl border border-green-900/50 bg-green-950/30 hover:border-yellow-700/40 hover:bg-green-950/50 transition-all duration-300 cursor-default">
                    <div className="text-2xl mb-2">{f.icon}</div>
                    <div className="font-display text-sm text-amber-100 font-medium mb-1">{f.title}</div>
                    <div className="font-body text-xs text-stone-400">{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[600px] hidden lg:block">
              <div className="absolute top-0 right-0 w-72 h-80 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.2)", boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }}>
                <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=90" alt="Heritage" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-80 h-96 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.25)", boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
                <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=90" alt="Villa" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 to-transparent"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 anim-float z-10">
                <div className="w-28 h-28 rounded-full flex flex-col items-center justify-center text-center" style={{ background: "linear-gradient(135deg, #0d1f0f, #1a3a1e)", border: "2px solid rgba(201,168,76,0.5)", boxShadow: "0 0 40px rgba(201,168,76,0.2), inset 0 0 30px rgba(0,0,0,0.5)" }}>
                  <span className="font-display text-3xl font-bold anim-shimmer-text">5★</span>
                  <span className="font-body text-xs text-stone-400 tracking-wider uppercase mt-1">Awarded</span>
                </div>
              </div>
              <div className="absolute top-4 left-4 w-16 h-16 opacity-30 anim-sway">
                <svg viewBox="0 0 60 60" fill="none"><path d="M30 5 L35 25 L55 25 L40 37 L46 57 L30 45 L14 57 L20 37 L5 25 L25 25 Z" stroke="#c9a84c" strokeWidth="1" fill="none"/></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROOMS SECTION */}
      <section id="retreats" className="py-24 bg-linen relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full overflow-hidden" style={{ height: "60px" }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 C360,60 1080,0 1440,50 L1440,0 L0,0 Z" fill="#0d1f0f"/>
          </svg>
        </div>

        <div className="max-w-screen-xl mx-auto px-6 pt-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="gold-line w-16"></div>
              <span className="font-body text-xs tracking-[0.4em] uppercase text-yellow-700">Sacred Retreats</span>
              <div className="gold-line w-16"></div>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-stone-900 font-medium mb-4">Curated Sanctuaries</h2>
            <p className="font-serif-light text-xl text-stone-600 italic font-light max-w-xl mx-auto">Each retreat is a world unto itself — nature, luxury, and heritage woven into one living space</p>
          </div>

          <div className="flex gap-2 justify-center mb-10 flex-wrap">
            {rooms.map((r, i) => (
              <button key={i} onClick={() => setActiveRoom(i)}
                className={`font-body text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 ${activeRoom === i ? "text-stone-900 font-medium" : "border border-stone-300 text-stone-500 hover:border-stone-400"}`}
                style={activeRoom === i ? { background: "linear-gradient(135deg, #c9a84c, #f0d080, #d4891a)", boxShadow: "0 4px 20px rgba(201,168,76,0.4)" } : {}}>
                {r.icon} {r.subtitle}
              </button>
            ))}
          </div>

          {rooms.map((room, i) => (
            <div key={i} className={`transition-all duration-700 ${activeRoom === i ? "opacity-100" : "opacity-0 absolute"}`} style={{ display: activeRoom === i ? "block" : "none" }}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="room-card-3d rounded-3xl overflow-hidden relative" style={{ height: "500px", boxShadow: "0 30px 70px rgba(0,0,0,0.2)" }}>
                  <img src={room.image} alt={room.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent"></div>
                  <div className="absolute top-6 left-6 font-body text-xs tracking-widest uppercase px-4 py-2 rounded-full text-stone-900 font-medium" style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)" }}>{room.tag}</div>
                  <div className="absolute bottom-6 right-6 font-display text-6xl font-bold text-white/10">0{i + 1}</div>
                </div>
                <div className="lg:pl-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div style={{ height: "1px", width: "40px", background: "linear-gradient(90deg, #c9a84c, #d4891a)" }}></div>
                    <span className="font-body text-xs tracking-[0.3em] uppercase text-yellow-700">{room.subtitle}</span>
                  </div>
                  <h3 className="font-display text-4xl text-stone-900 font-medium mb-6">{room.title}</h3>
                  <p className="font-serif-light text-lg text-stone-600 leading-relaxed italic font-light mb-8">{room.description}</p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {["Private Plunge Pool","Open-Air Rain Bath","Butler Service","Forest Terrace","Organic Minibar","Stargazing Deck"].map((am) => (
                      <div key={am} className="flex items-center gap-2 font-body text-sm text-stone-600"><span className="text-yellow-600 text-xs">✦</span> {am}</div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="btn-ripple font-body text-xs tracking-widest uppercase px-8 py-4 rounded-full text-stone-900 font-medium transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080, #d4891a)", boxShadow: "0 6px 24px rgba(201,168,76,0.4)" }}>Reserve This Retreat</button>
                    <button className="font-body text-xs tracking-widest uppercase text-stone-500 hover:text-yellow-700 transition-colors duration-300 flex items-center gap-2">Full Details <span className="ml-1">→</span></button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center gap-3 mt-10">
            {rooms.map((_, i) => (
              <button key={i} onClick={() => setActiveRoom(i)} className={`rounded-full transition-all duration-300 ${activeRoom === i ? "w-8 h-2 bg-yellow-600" : "w-2 h-2 bg-stone-400 hover:bg-stone-600"}`}></button>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1f0f 0%, #162b18 50%, #0d1f0f 100%)" }}>
        <div className="batik-pattern absolute inset-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 1440 200" fill="#4a7c52" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,200 L0,120 Q50,80 80,120 Q100,60 130,100 Q160,40 200,90 Q230,20 270,70 Q300,10 340,60 Q380,0 420,55 Q460,20 500,65 Q540,5 580,50 Q620,15 660,55 Q700,0 740,45 Q780,20 820,60 Q860,5 900,50 Q940,25 980,65 Q1020,10 1060,55 Q1100,20 1140,60 Q1180,0 1220,45 Q1260,25 1300,65 Q1340,10 1380,50 L1440,55 L1440,200 Z"/>
          </svg>
        </div>
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="gold-line w-16"></div>
              <span className="font-body text-xs tracking-[0.4em] uppercase text-yellow-600/80">Curated Moments</span>
              <div className="gold-line w-16"></div>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-amber-50 font-medium mb-4">
              Experiences That
              <span className="block font-light italic mt-1" style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Rewrite the Soul</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {experiences.map((exp, i) => (
              <div key={i} className="experience-card p-8 rounded-2xl border border-green-900/50 bg-green-950/20 cursor-default">
                <div className="text-4xl mb-4">{exp.icon}</div>
                <h3 className="font-display text-xl text-amber-100 font-medium mb-3">{exp.title}</h3>
                <p className="font-body text-sm text-stone-400 leading-relaxed">{exp.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-yellow-600/60 hover:text-yellow-500 transition-colors cursor-pointer">
                  <span className="font-body text-xs tracking-widest uppercase">Learn More</span>
                  <span className="text-sm">→</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <button className="btn-ripple font-body text-xs tracking-widest uppercase px-12 py-5 rounded-full border border-yellow-600/40 text-yellow-400 hover:bg-yellow-900/10 hover:border-yellow-500 transition-all duration-300">Explore All Experiences</button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-linen relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 10 L110 80 L180 80 L125 125 L145 195 L100 155 L55 195 L75 125 L20 80 L90 80 Z' stroke='%23c9a84c' fill='none' stroke-width='1'/%3E%3C/svg%3E")`, backgroundSize: "200px 200px" }}></div>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="gold-line w-16"></div>
            <span className="font-body text-xs tracking-[0.4em] uppercase text-yellow-700">Guest Voices</span>
            <div className="gold-line w-16"></div>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-stone-900 font-medium mb-16">Words From the Wild</h2>
          <div className="relative min-h-56">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-slide absolute inset-0 flex flex-col items-center"
                style={{ opacity: activeTestimonial === i ? 1 : 0, transform: activeTestimonial === i ? "translateY(0)" : "translateY(20px)", pointerEvents: activeTestimonial === i ? "all" : "none" }}>
                <div className="flex gap-1 mb-6">{[...Array(5)].map((_, s) => (<span key={s} className="text-yellow-500 text-xl">★</span>))}</div>
                <blockquote className="font-serif-light text-2xl md:text-3xl text-stone-700 italic font-light leading-relaxed mb-8 max-w-3xl">"{t.text}"</blockquote>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-px" style={{ background: "linear-gradient(90deg, #c9a84c, #d4891a)" }}></div>
                  <p className="font-body text-sm font-medium text-stone-700 mt-2">{t.author}</p>
                  <p className="font-body text-xs tracking-wider text-stone-400 uppercase">{t.country}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} className={`rounded-full transition-all duration-300 ${activeTestimonial === i ? "w-8 h-2 bg-yellow-600" : "w-2 h-2 bg-stone-400 hover:bg-stone-500"}`}></button>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-40">
            {["Condé Nast","Travel + Leisure","Architectural Digest","National Geographic","Forbes"].map((pub) => (
              <span key={pub} className="font-display text-stone-600 text-sm italic">{pub}</span>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6 relative" style={{ background: "linear-gradient(135deg, #0d1f0f 0%, #1a3a1e 50%, #0d1a10 100%)" }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="gold-line w-12"></div>
                <span className="font-body text-xs tracking-[0.4em] uppercase text-yellow-600/80">Leonine Life</span>
              </div>
              <h2 className="font-display text-5xl text-amber-50 font-medium">Moments<br/><span className="font-light italic" style={{ color: "#c9a84c" }}>Captured</span></h2>
            </div>
            <button className="font-body text-xs tracking-widest uppercase px-8 py-3 rounded-full border border-yellow-700/40 text-yellow-500 hover:border-yellow-500 hover:bg-yellow-900/10 transition-all">Full Gallery →</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className={`gallery-zoom relative rounded-2xl overflow-hidden cursor-pointer group ${i === 0 ? "md:row-span-2" : ""}`}
                style={{ height: i === 0 ? "auto" : "220px", minHeight: i === 0 ? "460px" : "220px", border: "1px solid rgba(201,168,76,0.1)", boxShadow: "0 10px 40px rgba(0,0,0,0.4)" }}>
                <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-5">
                  <span className="font-display text-amber-100 text-lg italic">{img.label}</span>
                </div>
                <div className="absolute top-3 right-3 w-6 h-6 opacity-0 group-hover:opacity-60 transition-opacity duration-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1"><path d="M7 7h10v10M7 17L17 7"/></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-24 px-6 bg-linen relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="gold-line w-12"></div>
                <span className="font-body text-xs tracking-[0.4em] uppercase text-yellow-700">Where to Find Us</span>
              </div>
              <h2 className="font-display text-5xl text-stone-900 font-medium mb-6">The Heart of<br/><span className="font-light italic" style={{ color: "#c9a84c" }}>Highland Lanka</span></h2>
              <p className="font-body text-sm text-stone-500 leading-relaxed mb-8">Leonine Villa rests in Sri Lanka's Central Province, just 45 minutes from Kandy — the ancient capital of the Kandyan Kingdom. Surrounded by misty tea estates, thundering waterfalls, and UNESCO-protected rainforest.</p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: "📍", label: "Address", val: "Heerassagala, Kandy, Sri Lanka" },
                  { icon: "✈️", label: "Nearest Airport", val: "Bandaranaike International (2.5 hrs)" },
                  { icon: "🚂", label: "Scenic Train Route", val: "Colombo → Kandy (2.5 hrs)" },
                  { icon: "📞", label: "Direct Line", val: "+94 81 220 4455" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl bg-stone-100/80 border border-stone-200 hover:border-yellow-400/30 hover:bg-amber-50/30 transition-all duration-300">
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <div className="font-body text-xs tracking-wider uppercase text-stone-400">{item.label}</div>
                      <div className="font-body text-sm text-stone-700 font-medium mt-0.5">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-ripple font-body text-xs tracking-widest uppercase px-10 py-4 rounded-full text-stone-900 font-medium hover:scale-105 transition-transform" style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080, #d4891a)", boxShadow: "0 6px 24px rgba(201,168,76,0.4)" }}>Get Directions</button>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.2)", boxShadow: "0 30px 70px rgba(0,0,0,0.15)" }}>
              <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=90" alt="Sri Lanka Landscape" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative flex flex-col items-center">
                  <div className="ping-slow absolute w-12 h-12 rounded-full bg-yellow-500/30"></div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center z-10" style={{ background: "linear-gradient(135deg, #c9a84c, #d4891a)", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
                    <span className="text-stone-900 text-lg">🦁</span>
                  </div>
                  <div className="mt-2 px-3 py-1 rounded-full text-xs font-body font-medium tracking-wider uppercase text-stone-900" style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)" }}>Leonine Villa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1f0f 0%, #1a3a1e 50%, #0d1a10 100%)" }}>
        <div className="batik-pattern absolute inset-0 pointer-events-none"></div>
        <div className="absolute top-8 left-8 w-32 h-32 opacity-10 anim-sway">
          <svg viewBox="0 0 100 100" fill="none" stroke="#c9a84c" strokeWidth="0.5"><circle cx="50" cy="50" r="45"/><circle cx="50" cy="50" r="35"/><circle cx="50" cy="50" r="25"/><path d="M50 5 L50 95 M5 50 L95 50 M20 20 L80 80 M80 20 L20 80"/></svg>
        </div>
        <div className="absolute bottom-8 right-8 w-28 h-28 opacity-10 anim-float">
          <svg viewBox="0 0 100 100" fill="none" stroke="#c9a84c" strokeWidth="0.5"><path d="M50 10 L61 39 L92 39 L68 58 L77 87 L50 69 L23 87 L32 58 L8 39 L39 39 Z"/></svg>
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="gold-line w-16"></div>
            <span className="text-2xl">🦁</span>
            <div className="gold-line w-16"></div>
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-amber-50 font-medium mb-4">Your Sanctuary</h2>
          <h2 className="font-display text-5xl md:text-7xl font-light italic mb-8" style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080, #d4891a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Awaits</h2>
          <p className="font-serif-light text-xl text-stone-300 italic font-light max-w-xl mx-auto mb-12 leading-relaxed">Only 6 retreats available at any time. Each stay is crafted individually. Your journey into the soul of Sri Lanka begins with one conversation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-ripple group font-body text-sm tracking-widest uppercase px-12 py-5 rounded-full text-stone-900 font-medium transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #d4891a 100%)", boxShadow: "0 10px 40px rgba(201,168,76,0.5)" }}>Begin Your Journey →</button>
            <button className="btn-ripple font-body text-sm tracking-widest uppercase px-12 py-5 rounded-full text-amber-200 border border-yellow-700/40 hover:bg-yellow-900/10 hover:border-yellow-500 transition-all">Speak to a Curator</button>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-stone-500">
            {["Free Cancellation","Instant Confirmation","No Hidden Fees","Private Transfer Included"].map((t) => (
              <div key={t} className="flex items-center gap-2 font-body text-xs"><span className="text-yellow-700">✓</span><span className="tracking-wider uppercase">{t}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="pt-20 pb-8 px-6 relative" style={{ background: "#060e07", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full border border-yellow-700/40 flex items-center justify-center"><span className="text-yellow-500">🦁</span></div>
                <div>
                  <div className="font-display text-2xl text-amber-100 tracking-widest">LEONINE</div>
                  <div className="font-body text-xs tracking-[0.3em] text-yellow-700 uppercase">Villa & Sanctuary · Sri Lanka</div>
                </div>
              </div>
              <p className="font-body text-sm text-stone-500 leading-relaxed mb-6 max-w-sm">A living heritage. A breathing jungle. An experience that rewrites what luxury means. Located in the ancient hills of Kandy, Sri Lanka.</p>
              <div className="flex gap-3">
                {["Instagram","Facebook","Pinterest","YouTube"].map((s) => (
                  <button key={s} className="w-9 h-9 rounded-full border border-green-900/60 flex items-center justify-center text-stone-400 hover:border-yellow-700/60 hover:text-yellow-500 hover:bg-yellow-900/10 transition-all duration-300 font-body text-xs">{s[0]}</button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display text-amber-100 text-lg mb-5">Explore</h4>
              <ul className="space-y-3">
                {["The Heritage","Retreats","Dining","Experiences","Gallery","Sustainability"].map((l) => (
                  <li key={l}><a href="#" className="font-body text-sm text-stone-500 hover:text-yellow-500 transition-colors duration-300 tracking-wide flex items-center gap-2 group"><span className="w-0 group-hover:w-3 transition-all duration-300 text-yellow-700 overflow-hidden">→</span>{l}</a></li>
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
                <li className="pt-2 text-stone-600">Open all year, 24/7</li>
              </ul>
            </div>
          </div>
          <div className="gold-line mb-6"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-xs text-stone-600">© 2026 Leonine Villa & Sanctuary. All rights reserved. Sri Lanka Tourism Board Certified.</p>
            <div className="flex gap-6">
              {["Privacy Policy","Terms of Service","Cookie Policy"].map((l) => (
                <a key={l} href="#" className="font-body text-xs text-stone-600 hover:text-yellow-600 transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}