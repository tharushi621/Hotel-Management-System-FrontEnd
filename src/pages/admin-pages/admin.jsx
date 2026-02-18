import { Link, Routes, Route, useLocation } from "react-router-dom";
import {
  FaBookmark,
  FaList,
  FaBed,
  FaComments,
  FaImages,
  FaUser,
  FaClock,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import AdminCategory from "../admin/category";
import AdminBooking from "../admin/booking";
import AdminRoom from "../admin/room";
import AddRoomForm from "../admin/addRoomForm";
import UpdateRoomForm from "../admin/updateRoomForm";
import AdminUser from "../admin/user";
import AdminFeedback from "../admin/feedback";
import AdminGallery from "../admin/gallery";
import AddCategoryForm from "../admin/addCategoryForm";
import UpdateCategoryForm from "../admin/updateCategoryForm";
import AddGalleryItemForm from "../admin/addGalleryItemForm";
import UpdateGalleryForm from "../admin/updateGalleryItemForm";

const navItems = [
  { to: "/admin/bookings",   icon: <FaBookmark />,   label: "Bookings",    accent: "#c9a84c" },
  { to: "/admin/categories", icon: <FaList />,        label: "Categories",  accent: "#7cad7a" },
  { to: "/admin/rooms",      icon: <FaBed />,         label: "Rooms",       accent: "#d4891a" },
  { to: "/admin/users",      icon: <FaUser />,        label: "Users",       accent: "#c9a84c" },
  { to: "/admin/feedbacks",  icon: <FaComments />,    label: "Feedbacks",   accent: "#7cad7a" },
  { to: "/admin/gallery",    icon: <FaImages />,      label: "Gallery",     accent: "#d4891a" },
];

const quickStats = [
  { label: "Active Bookings", value: "24", icon: <FaBookmark />, color: "#c9a84c" },
  { label: "Total Rooms",     value: "12", icon: <FaBed />,       color: "#7cad7a" },
  { label: "Guests Today",    value: "38", icon: <FaUser />,      color: "#d4891a" },
  { label: "Avg Rating",      value: "4.9", icon: <FaComments />, color: "#c9a84c" },
];

export default function AdminPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
  const formatDate = (date) =>
    date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  const isActive = (path) => location.pathname === path;
  const isOnDashboard = navItems.every((n) => !location.pathname.startsWith(n.to));

  return (
    <div className="w-full h-screen flex overflow-hidden" style={{ background: "#060e07", fontFamily: "'Jost', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Jost:wght@200;300;400;500;600&display=swap');

        :root {
          --gold: #c9a84c; --saffron: #d4891a; --gold-light: #f0d080;
          --jungle-deep: #060e07; --jungle-dark: #0d1f0f; --jungle-mid: #1a3a1e;
          --jungle-light: #2e5c35; --leaf: #4a7c52; --fern: #7cad7a;
          --cream: #f5f0e8; --stone: #c4b49a;
        }

        .admin-sidebar {
          transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
          background: linear-gradient(180deg, #0a1a0c 0%, #0d1f0f 40%, #081208 100%);
          border-right: 1px solid rgba(201,168,76,0.12);
          box-shadow: 4px 0 40px rgba(0,0,0,0.6);
          position: relative;
          z-index: 20;
        }
        .admin-sidebar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent);
        }

        .nav-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
          border: 1px solid transparent;
          color: rgba(200,200,180,0.55);
          text-decoration: none;
          overflow: hidden;
          margin-bottom: 3px;
        }
        .nav-item::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, var(--gold), var(--saffron));
          border-radius: 0 3px 3px 0;
          transform: scaleY(0);
          transition: transform 0.25s ease;
        }
        .nav-item:hover {
          color: #f5f0e8;
          background: rgba(201,168,76,0.07);
          border-color: rgba(201,168,76,0.15);
        }
        .nav-item:hover::before { transform: scaleY(1); }
        .nav-item.active {
          color: #f0d080;
          background: linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(26,58,30,0.5) 100%);
          border-color: rgba(201,168,76,0.25);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(201,168,76,0.1);
        }
        .nav-item.active::before { transform: scaleY(1); }
        .nav-icon {
          font-size: 15px;
          flex-shrink: 0;
          transition: color 0.25s;
          filter: drop-shadow(0 0 6px currentColor);
        }
        .nav-label {
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
          overflow: hidden;
          transition: opacity 0.2s, width 0.35s;
        }

        .gold-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent); margin: 12px 0; }

        .stat-card {
          position: relative;
          padding: 20px;
          border-radius: 16px;
          border: 1px solid rgba(201,168,76,0.12);
          background: linear-gradient(135deg, rgba(13,31,15,0.9) 0%, rgba(26,58,30,0.5) 100%);
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          cursor: default;
        }
        .stat-card::after {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 100px; height: 100px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .stat-card:hover {
          border-color: rgba(201,168,76,0.3);
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.1);
        }
        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 600;
          background: linear-gradient(135deg, #c9a84c, #f0d080, #d4891a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }

        .welcome-banner {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(135deg, #0d1f0f 0%, #1a3a1e 40%, #162b18 100%);
          border: 1px solid rgba(201,168,76,0.18);
          padding: 32px 36px;
          margin-bottom: 24px;
        }
        .welcome-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c9a84c' fill-opacity='0.03'%3E%3Cpath d='M40 0C17.9 0 0 17.9 0 40s17.9 40 40 40 40-17.9 40-40S62.1 0 40 0zm0 70C23.4 70 10 56.6 10 40S23.4 10 40 10s30 13.4 30 30-13.4 30-30 30z'/%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }
        .welcome-banner::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 40%;
          height: 100%;
          background: radial-gradient(ellipse at 80% 50%, rgba(201,168,76,0.08) 0%, transparent 60%);
          pointer-events: none;
        }

        .main-content-area {
          flex: 1;
          height: 100%;
          overflow-y: auto;
          background: linear-gradient(160deg, #060e07 0%, #0a1a0c 50%, #081005 100%);
          position: relative;
        }
        .main-content-area::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .top-bar {
          background: rgba(6,14,7,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(201,168,76,0.1);
          padding: 14px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .breadcrumb { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(201,168,76,0.5); }
        .breadcrumb span { color: rgba(201,168,76,0.8); }

        .collapse-btn {
          width: 28px; height: 28px;
          border-radius: 8px;
          border: 1px solid rgba(201,168,76,0.2);
          background: rgba(201,168,76,0.05);
          color: rgba(201,168,76,0.6);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 11px;
        }
        .collapse-btn:hover { background: rgba(201,168,76,0.12); color: #c9a84c; border-color: rgba(201,168,76,0.4); }

        .recent-activity {
          background: linear-gradient(135deg, rgba(13,31,15,0.9) 0%, rgba(10,22,12,0.95) 100%);
          border: 1px solid rgba(201,168,76,0.12);
          border-radius: 16px;
          overflow: hidden;
        }
        .activity-row {
          padding: 14px 20px;
          border-bottom: 1px solid rgba(201,168,76,0.06);
          display: flex;
          align-items: center;
          gap: 14px;
          transition: background 0.2s;
        }
        .activity-row:last-child { border-bottom: none; }
        .activity-row:hover { background: rgba(201,168,76,0.04); }
        .activity-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #060e07; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 2px; }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .anim-in { animation: fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        .anim-in-1 { animation-delay: 0.05s; }
        .anim-in-2 { animation-delay: 0.1s; }
        .anim-in-3 { animation-delay: 0.15s; }
        .anim-in-4 { animation-delay: 0.2s; }
        .anim-in-5 { animation-delay: 0.25s; }

        .gold-line { height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          color: #f5f0e8;
          font-weight: 500;
          letter-spacing: 0.02em;
        }
        .section-label {
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.55);
          font-weight: 500;
        }
      `}</style>

      {/* ═══════════════ SIDEBAR ═══════════════ */}
      <div className="admin-sidebar flex flex-col" style={{ width: collapsed ? "68px" : "240px" }}>

        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-5" style={{ borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
          <div className="flex items-center gap-3 overflow-hidden">
            <img src="/logo.png" alt="Leonine" className="flex-shrink-0"
              style={{ width: "38px", height: "38px", objectFit: "contain", filter: "drop-shadow(0 0 8px rgba(201,168,76,0.3))" }} />
            {!collapsed && (
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", color: "#f0d080", letterSpacing: "0.15em", fontWeight: 500 }}>LEONINE</div>
                <div style={{ fontSize: "8px", letterSpacing: "0.3em", color: "rgba(201,168,76,0.5)", textTransform: "uppercase" }}>Admin Panel</div>
              </div>
            )}
          </div>
          <button className="collapse-btn flex-shrink-0" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 pt-4">
          {!collapsed && <div className="section-label px-2 mb-3">Navigation</div>}
          <div className="gold-divider" style={{ margin: collapsed ? "8px 0" : "0 0 10px 0" }} />

          {navItems.map((item) => (
            <Link key={item.to} to={item.to}
              className={`nav-item ${isActive(item.to) ? "active" : ""}`}
              title={collapsed ? item.label : undefined}>
              <span className="nav-icon" style={{ color: isActive(item.to) ? item.accent : "inherit" }}>
                {item.icon}
              </span>
              {!collapsed && <span className="nav-label">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-4 space-y-3" style={{ borderTop: "1px solid rgba(201,168,76,0.08)", paddingTop: "12px" }}>
          {/* Clock */}
          <div style={{
            background: "rgba(201,168,76,0.05)",
            border: "1px solid rgba(201,168,76,0.12)",
            borderRadius: "12px",
            padding: collapsed ? "10px 8px" : "10px 14px",
            display: "flex", alignItems: "center", gap: "10px"
          }}>
            <FaClock style={{ color: "rgba(201,168,76,0.6)", fontSize: "13px", flexShrink: 0 }} />
            {!collapsed && (
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#f0d080", letterSpacing: "0.05em" }}>{formatTime(currentTime)}</div>
                <div style={{ fontSize: "10px", color: "rgba(201,168,76,0.45)", letterSpacing: "0.1em" }}>{formatDate(currentTime)}</div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div style={{
            background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(26,58,30,0.4) 100%)",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: "12px",
            padding: collapsed ? "10px 8px" : "10px 14px",
            display: "flex", alignItems: "center", gap: "10px"
          }}>
            <div style={{
              width: "32px", height: "32px", flexShrink: 0,
              background: "linear-gradient(135deg, #c9a84c, #d4891a)",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "13px", fontWeight: 700, color: "#0d1f0f",
              boxShadow: "0 2px 12px rgba(201,168,76,0.3)"
            }}>A</div>
            {!collapsed && (
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#f5f0e8", letterSpacing: "0.05em" }}>Admin</div>
                <div style={{ fontSize: "9px", color: "rgba(201,168,76,0.5)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Resort Manager</div>
              </div>
            )}
            {!collapsed && <FaSignOutAlt style={{ color: "rgba(201,168,76,0.3)", fontSize: "12px", cursor: "pointer", flexShrink: 0 }} />}
          </div>
        </div>
      </div>

      {/* ═══════════════ MAIN ═══════════════ */}
      <div className="main-content-area">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="breadcrumb">
            Leonine Admin &nbsp;/&nbsp; <span>
              {navItems.find(n => isActive(n.to))?.label || "Dashboard"}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ fontSize: "11px", color: "rgba(201,168,76,0.5)", letterSpacing: "0.15em" }}>
              {formatDate(currentTime)}
            </div>
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#4a7c52",
              boxShadow: "0 0 8px rgba(74,124,82,0.8)"
            }} />
            <span style={{ fontSize: "10px", color: "rgba(124,173,122,0.7)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Live</span>
          </div>
        </div>

        {/* Inner Content */}
        <div className="relative z-10" style={{ padding: "28px" }}>

          {/* Dashboard when no sub-route is active */}
          {isOnDashboard && (
            <div>
              {/* Welcome Banner */}
              <div className="welcome-banner anim-in">
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,168,76,0.55)", marginBottom: "8px" }}>
                    Resort Management System
                  </div>
                  <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#f5f0e8", fontWeight: 500, marginBottom: "8px", lineHeight: 1.2 }}>
                    Welcome back, <span style={{ background: "linear-gradient(135deg,#c9a84c,#f0d080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Admin</span>
                  </h1>
                  <p style={{ fontSize: "13px", color: "rgba(200,190,175,0.6)", letterSpacing: "0.05em", maxWidth: "480px" }}>
                    Here's an overview of Leonine Villa's operations. Select a module from the sidebar to manage your sanctuary.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="anim-in anim-in-1" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginBottom: "28px" }}>
                {quickStats.map((s, i) => (
                  <div key={i} className="stat-card">
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "14px" }}>
                      <div style={{ padding: "8px", borderRadius: "10px", background: `rgba(${s.color === "#c9a84c" ? "201,168,76" : s.color === "#7cad7a" ? "124,173,122" : "212,137,26"},0.12)`, color: s.color, fontSize: "14px" }}>
                        {s.icon}
                      </div>
                      <div style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.4)", marginTop: "2px" }}>+12%</div>
                    </div>
                    <div className="stat-number">{s.value}</div>
                    <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(200,190,175,0.45)", marginTop: "4px" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick Actions + Recent Activity */}
              <div className="anim-in anim-in-2" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "20px" }}>

                {/* Quick Actions */}
                <div className="recent-activity">
                  <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
                    <div className="section-label" style={{ marginBottom: "4px" }}>Quick Access</div>
                    <div className="section-title">Manage Modules</div>
                  </div>
                  {navItems.map((item, i) => (
                    <Link key={i} to={item.to} className="activity-row" style={{ textDecoration: "none" }}>
                      <div style={{ padding: "7px", borderRadius: "8px", background: `rgba(${item.accent === "#c9a84c" ? "201,168,76" : item.accent === "#7cad7a" ? "124,173,122" : "212,137,26"},0.1)`, color: item.accent, fontSize: "13px" }}>
                        {item.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "12px", fontWeight: 500, color: "#e8e0d0", letterSpacing: "0.05em" }}>{item.label}</div>
                      </div>
                      <div style={{ fontSize: "11px", color: "rgba(201,168,76,0.3)" }}>→</div>
                    </Link>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="recent-activity">
                  <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
                    <div className="section-label" style={{ marginBottom: "4px" }}>Live Feed</div>
                    <div className="section-title">Recent Activity</div>
                  </div>
                  {[
                    { dot: "#c9a84c", text: "New booking received — King's Canopy Suite", time: "2 min ago", sub: "Isabelle M. · 3 nights" },
                    { dot: "#7cad7a", text: "Gallery updated — 4 new images uploaded", time: "18 min ago", sub: "Admin" },
                    { dot: "#d4891a", text: "Room availability updated — Ganga Villa", time: "42 min ago", sub: "Admin" },
                    { dot: "#c9a84c", text: "New feedback submitted ★★★★★", time: "1 hr ago", sub: "James H. · London, UK" },
                    { dot: "#7cad7a", text: "New user registered", time: "2 hrs ago", sub: "yuki.tanaka@mail.jp" },
                    { dot: "#d4891a", text: "Booking confirmed — Heritage Forest Lodge", time: "3 hrs ago", sub: "Yuki T. · 5 nights" },
                    { dot: "#c9a84c", text: "Category 'Wellness Retreat' created", time: "5 hrs ago", sub: "Admin" },
                  ].map((a, i) => (
                    <div key={i} className="activity-row">
                      <div className="activity-dot" style={{ background: a.dot, boxShadow: `0 0 6px ${a.dot}80` }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "12px", color: "#d8d0c0", fontWeight: 400, letterSpacing: "0.02em", marginBottom: "2px" }}>{a.text}</div>
                        <div style={{ fontSize: "10px", color: "rgba(200,190,175,0.35)", letterSpacing: "0.05em" }}>{a.sub}</div>
                      </div>
                      <div style={{ fontSize: "9px", color: "rgba(201,168,76,0.35)", letterSpacing: "0.1em", whiteSpace: "nowrap", textTransform: "uppercase" }}>{a.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Route views */}
          <Routes>
            <Route path="/bookings"       element={<AdminBooking />} />
            <Route path="/categories"     element={<AdminCategory />} />
            <Route path="/add-category"   element={<AddCategoryForm />} />
            <Route path="/update-category" element={<UpdateCategoryForm />} />
            <Route path="/rooms"          element={<AdminRoom />} />
            <Route path="/add-room"       element={<AddRoomForm />} />
            <Route path="/update-room"    element={<UpdateRoomForm />} />
            <Route path="/users"          element={<AdminUser />} />
            <Route path="/feedbacks"      element={<AdminFeedback />} />
            <Route path="/gallery"        element={<AdminGallery />} />
            <Route path="/add-gallery"    element={<AddGalleryItemForm />} />
            <Route path="/update-gallery" element={<UpdateGalleryForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}