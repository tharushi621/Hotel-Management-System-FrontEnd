import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/footer";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/feedbacks/public`)
      .then((res) => {
        const data = res.data.result || [];
        const visible = data
          .filter((f) => f.status === "Visible" && f.comment)
          .slice(0, 6);
        setTestimonials(visible);
      })
      .catch(() => {
        setTestimonials([
          {
            comment:
              "Leonine Villa transcends the concept of hospitality. The ancient stone paths, the chorus of the jungle at dawn, the firefly gardens at dusk — I left a different person.",
            email: "isabelle.m@example.com",
            rating: 5,
            _static: true,
            author: "Isabelle Marchetti",
            country: "Florence, Italy",
          },
          {
            comment:
              "A living heritage. Every corner breathes Sri Lanka's soul — carved wood, handwoven textiles, the scent of cinnamon in the morning breeze. Nothing compares.",
            email: "james.h@example.com",
            rating: 5,
            _static: true,
            author: "James Hartwell",
            country: "London, UK",
          },
          {
            comment:
              "We've stayed at villas across Southeast Asia. Leonine stands alone. The fusion of Kandyan art with pure jungle immersion is a masterpiece of experience design.",
            email: "tanaka@example.com",
            rating: 5,
            _static: true,
            author: "Yuki & Sho Tanaka",
            country: "Kyoto, Japan",
          },
        ]);
      });
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const t = setInterval(
      () => setActiveTestimonial((p) => (p + 1) % testimonials.length),
      6000
    );
    return () => clearInterval(t);
  }, [testimonials]);

  const rooms = [
    {
      title: "The King's Canopy Suite",
      subtitle: "Treetop Luxury",
      description:
        "Rise above the jungle canopy in this elevated retreat. Ancient jak-wood ceilings, hand-beaten copper tubs, and a private rain terrace where the mist rolls in at dawn.",
      image: "/z1.jpg",
      tag: "Most Requested",
    },
    {
      title: "Ganga Riverside Villa",
      subtitle: "Waterside Retreat",
      description:
        "Perched above a singing river, this villa wraps you in the sound of water and birdsong. Step-stone baths, woven rattan terraces, and sunrise over the sacred hills.",
      image: "/t2.jpg",
      tag: "Romantic Escape",
    },
    {
      title: "The Heritage Forest Lodge",
      subtitle: "Cultural Sanctuary",
      description:
        "Inspired by the royal pavilions of Kandy — traditional clay walls, Batik draperies, hand-painted murals, and a meditation sala open to the ancient forest.",
      image: "/t3.jpg",
      tag: "Cultural Immersion",
    },
  ];

  const experiences = [
    {
      title: "Jungle Foraging",
      desc: "Walk with our naturalists through 14 acres of uncharted rainforest, discovering rare flora and ancient herbal traditions.",
      image: "/j1.jpg",
      detail: "3–4 hrs · Dawn or Dusk",
    },
    {
      title: "Ayurvedic Rituals",
      desc: "Ancient healing ceremonies with resident Ayurveda masters — restoring balance through sacred oils, herbs, and timeless wisdom.",
      image: "/j2.jpg",
      detail: "2 hrs · By Appointment",
    },
    {
      title: "Kandyan Art",
      desc: "Private sessions with award-winning Sinhala artisans — learn the strokes of a 2,000-year-old visual language.",
      image: "/j3.jpg",
      detail: "2–3 hrs · Afternoon",
    },
    {
      title: "Elephant Dawn",
      desc: "Sacred morning walks with Sri Lanka's wild giants as the mist lifts from the highland valleys at first light.",
      image: "/j4.jpg",
      detail: "4 hrs · Sunrise",
    },
    {
      title: "River Ceremonies",
      desc: "Torch-lit river rituals at sunset — a Leonine signature that connects you to the ancient pulse of the land.",
      image: "/j5.jpg",
      detail: "1.5 hrs · Sunset",
    },
    {
      title: "Tea Garden Walks",
      desc: "Journey through misty highland tea estates at golden hour, guided by a fifth-generation tea master.",
      image: "/j6.jpg",
      detail: "3 hrs · Golden Hour",
    },
  ];

  const galleryImages = [
    { src: "/g2.jpg", label: "Musical Nights" },
    { src: "/2.jpg", label: "Jungle Views" },
    { src: "/c1.jpg", label: "Heritage Suite" },
    { src: "/c2.jpg", label: "Calm Eve" },
    { src: "/n1.jpg", label: "Aesthetic Vibe" },
  ];

  const navItems = [
    { label: "Home", href: "/", action: () => navigate("/") },
    { label: "Retreats", href: "/retreats", action: () => navigate("/retreats") },
    { label: "Gallery", href: "/gallery", action: () => navigate("/gallery") },
    {
      label: "Contact",
      href: "#contact",
      action: () =>
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
    },
  ];

  // ✅ REMOVED handleBookingNav — ProtectedRoute in App.jsx handles auth redirect automatically
  const handleCallCurator = () => {
    window.location.href = "tel:+94812204455";
  };
  const handleGetDirections = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=Heerassagala+Kandy+Sri+Lanka",
      "_blank",
      "noopener noreferrer"
    );
  };
  const handleNavClick = (e, item) => {
    e.preventDefault();
    item.action();
    setMenuOpen(false);
  };

  const getDisplayName = (fb) => {
    if (fb._static) return fb.author;
    const parts = fb.email?.split("@")[0] || "Guest";
    return parts.charAt(0).toUpperCase() + parts.slice(1).replace(/[._]/g, " ");
  };

  const socials = [
    { letter: "I", label: "Instagram", href: "https://instagram.com" },
    { letter: "F", label: "Facebook", href: "https://facebook.com" },
    { letter: "P", label: "Pinterest", href: "https://pinterest.com" },
    { letter: "Y", label: "YouTube", href: "https://youtube.com" },
  ];

  return (
    <div className="font-body bg-stone-950 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Cormorant+Infant:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        :root {
          --jungle: #1a3a1e; --jungle-mid: #2e5c35; --leaf: #4a7c52; --fern: #7cad7a;
          --moss: #a8c8a0; --saffron: #d4891a; --gold: #c9a84c; --copper: #b5651d;
          --cream: #f5f0e8; --parchment: #ede4d3; --stone: #c4b49a; --terra: #8b4513;
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
          content: ''; position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 3;
        }
        .nav-carved {
          background: linear-gradient(180deg, rgba(10,22,12,0.97) 0%, rgba(18,38,20,0.95) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.2);
          box-shadow: 0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,168,76,0.15);
        }
        .gold-line { height: 1px; background: linear-gradient(90deg, transparent, var(--gold), var(--saffron), var(--gold), transparent); }
        .text-glow { text-shadow: 0 0 80px rgba(201,168,76,0.3), 0 2px 40px rgba(0,0,0,0.6); }
        .room-card-3d { transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s ease; transform-style: preserve-3d; }
        .room-card-3d:hover { transform: translateY(-12px) rotateX(2deg); box-shadow: 0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.2); }
        .btn-ripple { position: relative; overflow: hidden; }
        .btn-ripple::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%); opacity: 0; transition: opacity 0.3s; }
        .btn-ripple:hover::after { opacity: 1; }

        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(201,168,76,0.3); } 50% { box-shadow: 0 0 50px rgba(201,168,76,0.6); } }
        @keyframes ping-slow { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(2.5); opacity: 0; } }

        .anim-shimmer-text { background: linear-gradient(90deg, #c9a84c 0%, #f0d080 40%, #d4891a 60%, #c9a84c 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer 4s linear infinite; }
        .anim-hero-1 { animation: fadeInDown 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
        .anim-hero-2 { animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both; }
        .anim-hero-3 { animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both; }
        .anim-hero-4 { animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.1s both; }
        .anim-hero-5 { animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.4s both; }
        .anim-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .ping-slow { animation: ping-slow 2s ease-out infinite; }
        .nav-link { position: relative; letter-spacing: 0.15em; }
        .nav-link::before { content: ''; position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 0; height: 1px; background: var(--gold); transition: width 0.3s ease; }
        .nav-link:hover::before { width: 100%; }
        .testimonial-slide { transition: opacity 0.8s ease, transform 0.8s ease; }

        .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: 200px 200px; gap: 12px; }
        .gallery-item { position: relative; border-radius: 16px; overflow: hidden; cursor: pointer; border: 1px solid rgba(201,168,76,0.1); }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.4,0,0.2,1); }
        .gallery-item:hover img { transform: scale(1.06); }
        .gallery-item-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(5,10,6,0.85) 0%, transparent 55%); opacity: 0; transition: opacity 0.4s ease; display: flex; align-items: flex-end; padding: 14px; }
        .gallery-item:hover .gallery-item-overlay { opacity: 1; }
        .gallery-item:nth-child(1) { grid-row: span 2; }

        .wave-separator { position: absolute; bottom: -2px; left: 0; width: 100%; overflow: hidden; line-height: 0; }
        .stat-number { font-family: 'Playfair Display', serif; background: linear-gradient(135deg, #c9a84c, #f0d080, #d4891a); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .booking-glass { background: rgba(10, 22, 12, 0.55); backdrop-filter: blur(30px) saturate(150%); border: 1px solid rgba(201,168,76,0.2); }
        .bg-linen { background-color: #f5f0e8; background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E"); }

        .heritage-feat { position: relative; padding: 1.5rem; border-radius: 1rem; border: 1px solid rgba(201,168,76,0.15); background: linear-gradient(135deg, rgba(26,58,30,0.65) 0%, rgba(13,26,16,0.85) 100%); overflow: hidden; transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1); cursor: default; }
        .heritage-feat::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(201,168,76,0.07) 0%, transparent 60%); opacity: 0; transition: opacity 0.4s ease; }
        .heritage-feat:hover { border-color: rgba(201,168,76,0.4); transform: translateY(-5px); box-shadow: 0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.1); }
        .heritage-feat:hover::before { opacity: 1; }
        .heritage-feat-glow { position: absolute; bottom: -30px; right: -30px; width: 90px; height: 90px; background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%); border-radius: 50%; pointer-events: none; }

        .exp-v-card {
          position: relative; border-radius: 1.5rem; overflow: hidden; cursor: pointer;
          border: 1px solid rgba(201,168,76,0.1); height: 520px;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1); flex-shrink: 0;
        }
        .exp-v-card:hover { border-color: rgba(201,168,76,0.4); transform: translateY(-8px) scale(1.015); box-shadow: 0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,168,76,0.2); }
        .exp-v-card img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease; filter: brightness(0.72) saturate(1.1); }
        .exp-v-card:hover img { transform: scale(1.06); filter: brightness(0.6) saturate(1.25); }
        .exp-v-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(4,10,5,0.97) 0%, rgba(4,10,5,0.75) 35%, rgba(4,10,5,0.15) 65%, transparent 100%); transition: background 0.5s ease; }
        .exp-v-card:hover .exp-v-overlay { background: linear-gradient(to top, rgba(4,10,5,0.99) 0%, rgba(4,10,5,0.82) 40%, rgba(4,10,5,0.25) 70%, transparent 100%); }
        .exp-v-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 2rem 1.75rem; }
        .exp-v-desc { font-family: 'Jost', sans-serif; font-size: 0.8rem; color: rgba(210,200,180,0.0); line-height: 1.7; max-height: 0; overflow: hidden; transition: max-height 0.5s cubic-bezier(0.23,1,0.32,1), color 0.4s ease 0.1s, margin-top 0.4s ease; margin-top: 0; }
        .exp-v-card:hover .exp-v-desc { max-height: 120px; color: rgba(210,200,180,0.85); margin-top: 0.65rem; }
        .exp-v-badge { position: absolute; top: 1rem; right: 1rem; background: rgba(5,10,6,0.65); backdrop-filter: blur(10px); border: 1px solid rgba(201,168,76,0.25); border-radius: 999px; padding: 0.2rem 0.75rem; font-family: 'Jost', sans-serif; font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(201,168,76,0.85); }
        .exp-v-arrow { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; border: 1px solid rgba(201,168,76,0.4); color: #c9a84c; font-size: 0.9rem; margin-top: 1rem; opacity: 0; transform: translateX(-8px); transition: opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s; }
        .exp-v-card:hover .exp-v-arrow { opacity: 1; transform: translateX(0); }

        .location-info-card { display: flex; align-items: flex-start; gap: 1rem; padding: 1rem 1.25rem; border-radius: 0.75rem; background: rgba(245,240,232,0.8); border: 1px solid rgba(201,168,76,0.15); transition: all 0.3s ease; }
        .location-info-card:hover { border-color: rgba(201,168,76,0.4); background: rgba(255,248,220,0.5); transform: translateX(4px); }
        .location-icon-wrap { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #c9a84c22, #d4891a11); border: 1px solid rgba(201,168,76,0.3); flex-shrink: 0; }

        .fb-float { position: fixed; bottom: 36px; right: 36px; z-index: 9999; display: flex; align-items: center; gap: 9px; padding: 11px 22px; border: 1px solid rgba(201,168,76,0.45); border-radius: 999px; cursor: pointer; background: linear-gradient(135deg, rgba(13,26,16,0.94) 0%, rgba(26,58,30,0.97) 100%); backdrop-filter: blur(16px); color: #c9a84c; font-family: 'Jost', sans-serif; font-size: 0.65rem; letter-spacing: 0.22em; text-transform: uppercase; box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.08) inset; transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease; animation: fbFloatIn 0.8s cubic-bezier(0.16,1,0.3,1) 1.5s both; }
        .fb-float:hover { transform: translateY(-4px) scale(1.04); border-color: rgba(201,168,76,0.8); box-shadow: 0 16px 44px rgba(0,0,0,0.55), 0 0 24px rgba(201,168,76,0.18); }
        .fb-float-star { font-size: 0.9rem; color: #c9a84c; filter: drop-shadow(0 0 4px rgba(201,168,76,0.55)); animation: fbStarPulse 3s ease-in-out 2.5s infinite; flex-shrink: 0; }
        @keyframes fbFloatIn { from { opacity: 0; transform: translateY(28px) scale(0.88); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes fbStarPulse { 0%,100% { filter: drop-shadow(0 0 2px rgba(201,168,76,0.4)); } 50% { filter: drop-shadow(0 0 8px rgba(201,168,76,0.9)); } }
        .testimonial-author-tag { display: inline-block; padding: 2px 10px; border-radius: 999px; background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.2); font-size: 0.65rem; letter-spacing: 0.15em; color: rgba(201,168,76,0.7); text-transform: uppercase; margin-top: 4px; }
      `}</style>

      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? "nav-carved py-3" : "py-5 bg-transparent"}`}>
        <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between">
          <div className="flex flex-col items-start group cursor-pointer" onClick={() => navigate("/")}>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Leonine Logo" className="w-[50px] h-[50px]" />
              <span className="font-display text-2xl font-medium tracking-widest text-amber-100 group-hover:text-yellow-400 transition-colors duration-300">LEONINE</span>
            </div>
            <span className="font-body text-xs tracking-[0.4em] text-yellow-600/70 ml-14 uppercase">Villa & Sanctuary</span>
          </div>

          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} onClick={(e) => handleNavClick(e, item)} className="nav-link font-body text-xs tracking-widest uppercase text-stone-300 hover:text-yellow-400 transition-colors duration-300">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <button
              className="font-body text-xs tracking-widest uppercase text-stone-300 hover:text-yellow-400 transition-colors duration-300 px-4 py-2"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
            {/* ✅ Direct navigate — ProtectedRoute handles the auth check */}
            <button
              className="btn-ripple font-body text-xs tracking-widest uppercase px-6 py-3 rounded-full border border-yellow-600/50 text-yellow-400 hover:bg-yellow-600/10 hover:border-yellow-500 transition-all duration-300 anim-pulse-glow"
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
              <a key={item.label} href={item.href} className="block font-body text-xs tracking-widest uppercase text-stone-300 hover:text-yellow-400 py-3 border-b border-stone-800/50 transition-colors" onClick={(e) => handleNavClick(e, item)}>
                {item.label}
              </a>
            ))}
            <button className="mt-3 w-full font-body text-xs tracking-widest uppercase py-3 text-stone-300 hover:text-yellow-400 transition-colors border-b border-stone-800/50" onClick={() => { setMenuOpen(false); navigate("/login"); }}>
              Sign In
            </button>
            {/* ✅ Direct navigate — ProtectedRoute handles the auth check */}
            <button
              className="mt-4 w-full font-body text-xs tracking-widest uppercase px-6 py-3 rounded-full border border-yellow-600/50 text-yellow-400 hover:bg-yellow-600/10 transition-all"
              onClick={() => { setMenuOpen(false); navigate("/booking"); }}
            >
              Reserve Now
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" ref={heroRef} className="hero-grain relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/h1.jpg" alt="Leonine Villa" className="w-full h-full object-cover" style={{ transform: `translateY(${scrollY * 0.3}px)` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-transparent to-stone-950/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/25 via-transparent to-stone-950/15"></div>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,10,6,0.45) 100%)" }}></div>
        </div>

        <div className="relative z-10 pt-24 px-12 sm:px-24 md:px-32 lg:px-40 flex flex-col items-start w-full">
          <div className="anim-hero-1 inline-flex items-center gap-3 mb-8">
            <div className="gold-line w-16"></div>
            <span className="font-body text-xs tracking-[0.4em] uppercase text-yellow-400/90">Sri Lanka · Est. 2019</span>
            <div className="gold-line w-16"></div>
          </div>
          <h1 className="font-display text-glow mb-4 anim-hero-2 text-left">
            <span className="block text-6xl md:text-8xl xl:text-9xl font-medium text-white leading-none tracking-wide">Leonine</span>
            <span className="block text-3xl md:text-4xl xl:text-5xl font-light italic text-yellow-400/95 mt-2 tracking-widest">Villa & Sanctuary</span>
          </h1>
          <div className="anim-hero-3 flex items-center gap-4 my-6">
            <div className="gold-line w-20"></div>
            <div className="text-yellow-500 text-lg">❋</div>
            <div className="gold-line w-20"></div>
          </div>
          <p className="anim-hero-4 font-serif-light text-xl md:text-2xl text-stone-200 leading-relaxed max-w-lg font-light italic mb-10 text-left">
            Where Sri Lanka's ancient soul breathes through every leaf, every carved pillar, every firefly-lit evening in the heart of the jungle.
          </p>
          <div className="anim-hero-5 flex flex-col sm:flex-row gap-4 justify-start">
            {/* ✅ Direct navigate */}
            <button
              className="btn-ripple group font-body text-sm tracking-widest uppercase px-10 py-4 rounded-full text-stone-900 font-medium transition-all duration-500 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #d4891a 100%)", boxShadow: "0 8px 32px rgba(201,168,76,0.4)" }}
              onClick={() => navigate("/booking")}
            >
              Book Your Sanctuary <span className="ml-2 group-hover:ml-4 transition-all duration-300">→</span>
            </button>
            <button
              className="btn-ripple font-body text-sm tracking-widest uppercase px-10 py-4 rounded-full text-amber-100 border border-yellow-600/50 hover:border-yellow-400/80 hover:bg-yellow-900/15 transition-all duration-300"
              onClick={() => document.getElementById("heritage")?.scrollIntoView({ behavior: "smooth" })}
            >
              Discover the Story
            </button>
          </div>
          <div className="anim-hero-5 mt-14 flex flex-wrap items-center justify-start gap-6 opacity-75">
            {["World's Best Eco Villa 2024", "Traveller Pick", "UNESCO Heritage Partner"].map((award) => (
              <div key={award} className="flex items-center gap-2">
                <span className="text-yellow-500 text-xs">★</span>
                <span className="font-body text-xs tracking-wider text-stone-300 uppercase">{award}</span>
              </div>
            ))}
          </div>
        </div>

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

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
          <span className="font-body text-xs tracking-[0.3em] text-stone-300 uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-yellow-500/60 to-transparent animate-pulse"></div>
        </div>
        <div className="wave-separator z-10">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,0 C360,60 1080,0 1440,50 L1440,60 L0,60 Z" fill="#0d1f0f" />
          </svg>
        </div>
      </section>

      {/* HERITAGE */}
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
              <h2 className="font-display text-5xl md:text-6xl font-light italic mb-8" style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080, #d4891a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Soil of Lanka
              </h2>
              <p className="font-serif-light text-xl text-stone-300 leading-relaxed italic mb-6 font-light">
                "Leonine" draws from the ancient Sinhala symbol of the Lion — strength, grace, and an unbreakable bond with the land.
              </p>
              <p className="font-body text-sm text-stone-400 leading-relaxed mb-10">
                Nestled in Sri Lanka's Central Highlands, every structure at Leonine Villa honours traditional Kandyan craftsmanship — hand-carved jak wood columns, rammed earth walls, hand-laid Dumbara mats — blended with contemporary sanctuary design.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11" /></svg>, label: "Architecture", title: "Kandyan Architecture", desc: "Royal building traditions, reborn in every carved pillar and ceremonial arch." },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2a10 10 0 0 1 0 20A10 10 0 0 1 12 2z" /><path d="M12 6v6l3 3" /><path d="M6 12c0-1.5.5-3 1.5-4.2" /><path d="M18 12a6 6 0 0 1-6 6" /><circle cx="12" cy="12" r="2" /></svg>, label: "Sustainability", title: "Zero Carbon Footprint", desc: "100% solar & rainwater systems — luxury that leaves no trace on the earth." },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 22V12" /><path d="M8 7c0 2.2 1.8 4 4 4s4-1.8 4-4-1.8-4-4-4c-1 0-2 .4-2.8 1" /><path d="M4 14c0 3.3 3.6 6 8 6s8-2.7 8-6" /></svg>, label: "Nature", title: "Biodiversity Reserve", desc: "14 acres of protected jungle habitat teeming with rare endemic species." },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>, label: "Culture", title: "Living Culture", desc: "Resident artisans and Ayurveda masters keep ancient wisdom alive daily." },
                ].map((f) => (
                  <div key={f.title} className="heritage-feat group relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-600/40 to-transparent" />
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="text-yellow-600/70 shrink-0 transition-colors duration-300 group-hover:text-yellow-500/90">{f.icon}</div>
                      <span className="font-body text-[9px] tracking-[0.3em] uppercase text-yellow-600/50 group-hover:text-yellow-600/70 transition-colors duration-300">{f.label}</span>
                    </div>
                    <div className="font-display text-[0.92rem] text-amber-100/90 font-medium leading-snug mb-2 group-hover:text-amber-100 transition-colors duration-300">{f.title}</div>
                    <div className="font-body text-xs text-stone-400/80 leading-relaxed group-hover:text-stone-300/80 transition-colors duration-300">{f.desc}</div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-yellow-900/10 to-transparent" />
                    <div className="heritage-feat-glow" />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[600px] hidden lg:block">
              <div className="absolute top-0 right-0 w-72 h-80 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.2)", boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }}>
                <img src="/h2.jpg" alt="Heritage" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-80 h-96 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.25)", boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
                <img src="/c5.jpg" alt="Villa" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 to-transparent"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" style={{ animation: "float-slow 8s ease-in-out infinite" }}>
                <style>{`@keyframes float-slow { 0%, 100% { transform: translate(-50%,-50%) translateY(0px); } 50% { transform: translate(-50%,-50%) translateY(-20px); } }`}</style>
                <div className="w-28 h-28 rounded-full flex flex-col items-center justify-center text-center" style={{ background: "linear-gradient(135deg, #0d1f0f, #1a3a1e)", border: "2px solid rgba(201,168,76,0.5)", boxShadow: "0 0 40px rgba(201,168,76,0.2), inset 0 0 30px rgba(0,0,0,0.5)" }}>
                  <span className="font-display text-3xl font-bold anim-shimmer-text">5★</span>
                  <span className="font-body text-xs text-stone-400 tracking-wider uppercase mt-1">Awarded</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROOMS */}
      <section id="retreats" className="py-24 bg-linen relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full overflow-hidden" style={{ height: "60px" }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 C360,60 1080,0 1440,50 L1440,0 L0,0 Z" fill="#0d1f0f" />
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
            <p className="font-serif-light text-xl text-stone-600 italic font-light max-w-xl mx-auto">
              Each retreat is a world unto itself — nature, luxury, and heritage woven into one living space
            </p>
          </div>
          <div className="flex gap-2 justify-center mb-10 flex-wrap">
            {rooms.map((r, i) => (
              <button key={i} onClick={() => setActiveRoom(i)} className={`font-body text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 ${activeRoom === i ? "text-stone-900 font-medium" : "border border-stone-300 text-stone-500 hover:border-stone-400"}`} style={activeRoom === i ? { background: "linear-gradient(135deg, #c9a84c, #f0d080, #d4891a)", boxShadow: "0 4px 20px rgba(201,168,76,0.4)" } : {}}>
                {r.subtitle}
              </button>
            ))}
          </div>
          {rooms.map((room, i) => (
            <div key={i} style={{ display: activeRoom === i ? "block" : "none" }} className={`transition-all duration-700 ${activeRoom === i ? "opacity-100" : "opacity-0"}`}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="room-card-3d rounded-3xl overflow-hidden relative" style={{ height: "500px", boxShadow: "0 30px 70px rgba(0,0,0,0.2)" }}>
                  <img src={room.image} alt={room.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)" }}></div>
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
                    {["Private Plunge Pool", "Open-Air Rain Bath", "Butler Service", "Forest Terrace", "Organic Minibar", "Stargazing Deck"].map((am) => (
                      <div key={am} className="flex items-center gap-2 font-body text-sm text-stone-600">
                        <span className="text-yellow-600 text-xs">✦</span> {am}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    {/* ✅ Direct navigate */}
                    <button className="btn-ripple font-body text-xs tracking-widest uppercase px-8 py-4 rounded-full text-stone-900 font-medium transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080, #d4891a)", boxShadow: "0 6px 24px rgba(201,168,76,0.4)" }} onClick={() => navigate("/booking")}>
                      Reserve This Retreat
                    </button>
                    <button className="font-body text-xs tracking-widest uppercase text-stone-500 hover:text-yellow-700 transition-colors duration-300 flex items-center gap-2" onClick={() => navigate("/rooms")}>
                      Full Details <span className="ml-1">→</span>
                    </button>
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
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="gold-line w-16"></div>
              <span className="font-body text-xs tracking-[0.4em] uppercase text-yellow-600/80">Curated Moments</span>
              <div className="gold-line w-16"></div>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-amber-50 font-medium mb-4">
              Experiences That
              <span className="block font-light italic mt-1" style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Rewrite the Soul
              </span>
            </h2>
            <p className="font-serif-light text-lg text-stone-400 italic font-light max-w-lg mx-auto">
              Six immersive journeys, each a doorway into the living spirit of Lanka
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {experiences.map((exp, i) => (
              <div key={i} className="exp-v-card">
                <img src={exp.image} alt={exp.title} />
                <div className="exp-v-overlay"></div>
                <div className="exp-v-badge">Leonine Exclusive</div>
                <div className="exp-v-content">
                  <div style={{ marginBottom: "0.5rem" }}>
                    <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(201,168,76,0.75)" }}>{exp.detail}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", fontWeight: 500, color: "#fef3c7", lineHeight: 1.25 }}>{exp.title}</h3>
                  <p className="exp-v-desc">{exp.desc}</p>
                  <div className="exp-v-arrow">→</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <button className="btn-ripple font-body text-xs tracking-widest uppercase px-12 py-5 rounded-full border border-yellow-600/40 text-yellow-400 hover:bg-yellow-900/10 hover:border-yellow-500 transition-all duration-300">
              Explore All Experiences
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-linen relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="gold-line w-16"></div>
            <span className="font-body text-xs tracking-[0.4em] uppercase text-yellow-700">Guest Voices</span>
            <div className="gold-line w-16"></div>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-stone-900 font-medium mb-16">Words From the Wild</h2>
          {testimonials.length === 0 ? (
            <div className="text-stone-400 italic font-serif-light text-lg py-8">Be the first to share your experience at Leonine...</div>
          ) : (
            <>
              <div className="relative min-h-56">
                {testimonials.map((t, i) => (
                  <div key={i} className="testimonial-slide absolute inset-0 flex flex-col items-center" style={{ opacity: activeTestimonial === i ? 1 : 0, transform: activeTestimonial === i ? "translateY(0)" : "translateY(20px)", pointerEvents: activeTestimonial === i ? "all" : "none" }}>
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, s) => (<span key={s} className="text-xl" style={{ color: s < (t.rating || 5) ? "#d97706" : "#d1d5db" }}>★</span>))}
                    </div>
                    <blockquote className="font-serif-light text-2xl md:text-3xl text-stone-700 italic font-light leading-relaxed mb-8 max-w-3xl">"{t.comment}"</blockquote>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-px" style={{ background: "linear-gradient(90deg, #c9a84c, #d4891a)" }}></div>
                      <p className="font-body text-sm font-medium text-stone-700 mt-2">{getDisplayName(t)}</p>
                      {t._static && t.country && <p className="font-body text-xs tracking-wider text-stone-400 uppercase">{t.country}</p>}
                      {!t._static && <span className="testimonial-author-tag">Verified Guest</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-3 mt-12">
                {testimonials.map((_, i) => (<button key={i} onClick={() => setActiveTestimonial(i)} className={`rounded-full transition-all duration-300 ${activeTestimonial === i ? "w-8 h-2 bg-yellow-600" : "w-2 h-2 bg-stone-400 hover:bg-stone-500"}`}></button>))}
              </div>
            </>
          )}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-40">
            {["Travel + Leisure", "Architectural Digest", "National Geographic", "Forbes"].map((pub) => (<span key={pub} className="font-display text-stone-600 text-sm italic">{pub}</span>))}
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
              <h2 className="font-display text-5xl text-amber-50 font-medium">Moments<br /><span className="font-light italic" style={{ color: "#c9a84c" }}>Captured</span></h2>
            </div>
            <button className="font-body text-xs tracking-widest uppercase px-8 py-3 rounded-full border border-yellow-700/40 text-yellow-500 hover:border-yellow-500 hover:bg-yellow-900/10 transition-all" onClick={() => navigate("/gallery")}>
              Full Gallery →
            </button>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((img, i) => (
              <div key={i} className="gallery-item">
                <img src={img.src} alt={img.label} />
                <div className="gallery-item-overlay"><span className="font-display text-amber-100 text-base italic">{img.label}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-24 px-6 bg-linen relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="gold-line w-12"></div>
                <span className="font-body text-xs tracking-[0.4em] uppercase text-yellow-700">Where to Find Us</span>
              </div>
              <h2 className="font-display text-5xl text-stone-900 font-medium mb-2">The Heart of</h2>
              <h2 className="font-display text-5xl font-light italic mb-4" style={{ color: "#c9a84c" }}>Highland Lanka</h2>
              <p className="font-body text-sm text-stone-500 leading-relaxed mb-8 max-w-md">
                Perched at 1,400 metres above sea level in Sri Lanka's Central Province, Leonine Villa is a 45-minute journey from Kandy — the last royal capital of the Kandyan Kingdom.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-yellow-700"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>, label: "Address", val: "Heerassagala, Kandy, Central Province, Sri Lanka" },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-yellow-700"><path d="M21 16.5a2.5 2.5 0 0 1-2.5 2.5H5.5A2.5 2.5 0 0 1 3 16.5V7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9z"/><path d="M3 8l9 6 9-6"/></svg>, label: "Nearest International Airport", val: "Bandaranaike International Airport (BIA) — approx. 2.5 hrs" },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-yellow-700"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M8 7V5a2 2 0 0 1 4 0v2M16 7V5a2 2 0 0 1 4 0v2"/><line x1="12" y1="12" x2="12" y2="12"/></svg>, label: "Scenic Train", val: "Colombo Fort → Kandy — 2.5 hrs through tropical countryside" },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-yellow-700"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.09 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16h1.92z"/></svg>, label: "Reservations & Inquiries", val: "+94 81 220 4455  ·  stay@leonine.lk" },
                ].map((item) => (
                  <div key={item.label} className="location-info-card">
                    <div className="location-icon-wrap">{item.icon}</div>
                    <div>
                      <div className="font-body text-xs tracking-wider uppercase text-stone-400 mb-0.5">{item.label}</div>
                      <div className="font-body text-sm text-stone-700 font-medium leading-relaxed">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                <button className="btn-ripple font-body text-xs tracking-widest uppercase px-8 py-4 rounded-full text-stone-900 font-medium hover:scale-105 transition-transform" style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080, #d4891a)", boxShadow: "0 6px 24px rgba(201,168,76,0.4)" }} onClick={handleGetDirections}>Get Directions</button>
                <button className="btn-ripple font-body text-xs tracking-widest uppercase px-8 py-4 rounded-full text-stone-700 border border-stone-300 hover:border-yellow-500 hover:text-yellow-700 transition-all" onClick={handleCallCurator}>Call Us</button>
              </div>
            </div>
            <div className="relative h-96 lg:h-[520px] rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.2)", boxShadow: "0 30px 70px rgba(0,0,0,0.15)" }}>
              <img src="/n1.jpg" alt="Sri Lanka Highland Landscape" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative flex flex-col items-center">
                  <div className="ping-slow absolute w-12 h-12 rounded-full" style={{ background: "rgba(201,168,76,0.3)" }}></div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center z-10" style={{ background: "linear-gradient(135deg, #c9a84c, #d4891a)", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
                    <img src="/logo.png" alt="Leonine" className="w-8 h-8 object-contain" />
                  </div>
                  <div className="mt-2 px-3 py-1 rounded-full text-xs font-body font-medium tracking-wider uppercase text-stone-900 whitespace-nowrap" style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)" }}>Leonine Villa</div>
                </div>
              </div>
              <div className="absolute top-5 right-5 px-3 py-2 rounded-xl font-body text-xs text-yellow-200 tracking-wider" style={{ background: "rgba(10,22,12,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(201,168,76,0.25)" }}>
                <div className="text-yellow-500 font-semibold">1,400 m</div>
                <div className="text-stone-400 text-[10px] uppercase tracking-widest">Elevation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1f0f 0%, #1a3a1e 50%, #0d1a10 100%)" }}>
        <div className="batik-pattern absolute inset-0 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="gold-line w-16"></div>
            <img src="/logo.png" alt="Leonine" className="w-12 h-12 object-contain" style={{ filter: "drop-shadow(0 0 12px rgba(201,168,76,0.4))" }} />
            <div className="gold-line w-16"></div>
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-amber-50 font-medium mb-4">Your Sanctuary</h2>
          <h2 className="font-display text-5xl md:text-7xl font-light italic mb-8" style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080, #d4891a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Awaits</h2>
          <p className="font-serif-light text-xl text-stone-300 italic font-light max-w-xl mx-auto mb-12 leading-relaxed">
            Only 6 retreats available at any time. Each stay is crafted individually. Your journey into the soul of Sri Lanka begins with one conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* ✅ Direct navigate */}
            <button className="btn-ripple group font-body text-sm tracking-widest uppercase px-12 py-5 rounded-full text-stone-900 font-medium transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #d4891a 100%)", boxShadow: "0 10px 40px rgba(201,168,76,0.5)" }} onClick={() => navigate("/booking")}>
              Begin Your Journey →
            </button>
            <button className="btn-ripple font-body text-sm tracking-widest uppercase px-12 py-5 rounded-full text-amber-200 border border-yellow-700/40 hover:bg-yellow-900/10 hover:border-yellow-500 transition-all" onClick={handleCallCurator}>
              Speak to a Curator
            </button>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-stone-500">
            {["Free Cancellation", "Instant Confirmation", "No Hidden Fees", "Private Transfer Included"].map((t) => (
              <div key={t} className="flex items-center gap-2 font-body text-xs">
                <span className="text-yellow-700">✓</span>
                <span className="tracking-wider uppercase">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* Floating Feedback Button — ✅ direct navigate, ProtectedRoute guards /feedback */}
      <button className="fb-float" onClick={() => navigate("/feedback")} title="Share your experience at Leonine">
        <span className="fb-float-star">★</span>
        Share Your Experience
      </button>
    </div>
  );
}