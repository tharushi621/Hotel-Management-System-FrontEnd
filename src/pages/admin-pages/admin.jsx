import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  FaBookmark, FaList, FaBed, FaComments,
  FaImages, FaUser, FaClock, FaSignOutAlt,
  FaHome, FaArrowLeft,
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

const API = import.meta.env.VITE_BACKEND_URL;

const navItems = [
  { to: "/admin/bookings",   icon: <FaBookmark />, label: "Bookings",   accent: "#c9a84c" },
  { to: "/admin/categories", icon: <FaList />,     label: "Categories", accent: "#7cad7a" },
  { to: "/admin/rooms",      icon: <FaBed />,      label: "Rooms",      accent: "#d4891a" },
  { to: "/admin/users",      icon: <FaUser />,     label: "Users",      accent: "#c9a84c" },
  { to: "/admin/feedbacks",  icon: <FaComments />, label: "Feedbacks",  accent: "#7cad7a" },
  { to: "/admin/gallery",    icon: <FaImages />,   label: "Gallery",    accent: "#d4891a" },
];

const token = () => localStorage.getItem("token");

/* ── real data helpers matching each sub-panel's response shape ── */
async function fetchStat(endpoint, extractor) {
  try {
    const res = await fetch(`${API}${endpoint}`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    if (!res.ok) return "—";
    const data = await res.json();
    return extractor(data);
  } catch { return "—"; }
}

async function fetchRecentBookings() {
  try {
    const res = await fetch(`${API}/api/bookings`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const arr = data.result ?? data.bookings ?? (Array.isArray(data) ? data : []);
    return [...arr].reverse().slice(0, 8);
  } catch { return []; }
}

// Get admin info from token in localStorage
function getAdminFromToken() {
  try {
    const t = token();
    if (!t || t === "null") return null;
    const payload = JSON.parse(atob(t.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
}

export default function AdminPage() {
  const [currentTime, setCurrentTime]       = useState(new Date());
  const [collapsed, setCollapsed]           = useState(false);
  const [stats, setStats]                   = useState({ bookings: "…", rooms: "…", users: "…", rating: "…" });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loadingStats, setLoadingStats]     = useState(true);
  const [adminInfo, setAdminInfo]           = useState(null);

  const location = useLocation();
  const navigate  = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Get admin name from token
  useEffect(() => {
    const info = getAdminFromToken();
    setAdminInfo(info);
  }, []);

  useEffect(() => {
    (async () => {
      setLoadingStats(true);
      const [bookings, rooms, users, rating, recent] = await Promise.all([
        fetchStat("/api/bookings", (d) => (d.result ?? []).length),
        fetchStat("/api/rooms",    (d) => (d.rooms ?? []).length),
        fetchStat("/api/users/all?page=1&limit=1", (d) => d.totalUsers ?? "—"),
        fetchStat("/api/feedbacks", (d) => {
          const arr = d.result ?? [];
          if (!arr.length) return "—";
          const avg = arr.reduce((s, f) => s + (Number(f.rating) || 0), 0) / arr.length;
          return avg.toFixed(1);
        }),
        fetchRecentBookings(),
      ]);
      setStats({ bookings, rooms, users, rating });
      setRecentBookings(recent);
      setLoadingStats(false);
    })();
  }, []);

  const fmt       = (d) => d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
  const fmtDate   = (d) => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const isActive      = (p) => location.pathname === p;
  const isOnDashboard = location.pathname === "/admin";
  const activeLabel   = navItems.find((n) => location.pathname.startsWith(n.to))?.label ?? "Dashboard";

  // Derive admin display name and initial
  const adminFirstName  = adminInfo?.firstName || adminInfo?.name || "Admin";
  const adminLastName   = adminInfo?.lastName || "";
  const adminFullName   = adminLastName ? `${adminFirstName} ${adminLastName}` : adminFirstName;
  const adminInitial    = adminFirstName.charAt(0).toUpperCase();
  const adminEmail      = adminInfo?.email || "";

  const quickStats = [
    { label: "Total Bookings",   value: stats.bookings, icon: <FaBookmark />, rgb: "201,168,76" },
    { label: "Total Rooms",      value: stats.rooms,    icon: <FaBed />,      rgb: "124,173,122" },
    { label: "Registered Users", value: stats.users,    icon: <FaUser />,     rgb: "212,137,26" },
    { label: "Avg Rating",       value: stats.rating,   icon: <FaComments />, rgb: "201,168,76" },
  ];

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", overflow: "hidden", background: "#060e07", fontFamily: "'Jost',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Jost:wght@300;400;500;600&display=swap');
        .sb { transition:width 0.35s cubic-bezier(0.4,0,0.2,1); background:linear-gradient(180deg,#0a1a0c,#0d1f0f 40%,#081208); border-right:1px solid rgba(201,168,76,0.12); box-shadow:4px 0 40px rgba(0,0,0,0.6); position:relative; z-index:20; flex-shrink:0; display:flex; flex-direction:column; }
        .sb::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent); }
        .ni { position:relative; display:flex; align-items:center; gap:12px; padding:10px 13px; border-radius:12px; cursor:pointer; transition:all 0.22s cubic-bezier(0.4,0,0.2,1); border:1px solid transparent; color:rgba(200,200,180,0.5); text-decoration:none; margin-bottom:3px; width:100%; background:none; font-family:'Jost',sans-serif; }
        .ni::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background:linear-gradient(180deg,#c9a84c,#d4891a); border-radius:0 3px 3px 0; transform:scaleY(0); transition:transform 0.22s ease; }
        .ni:hover { color:#f5f0e8 !important; background:rgba(201,168,76,0.07) !important; border-color:rgba(201,168,76,0.15); }
        .ni:hover::before { transform:scaleY(1); }
        .ni.act { color:#f0d080 !important; background:linear-gradient(135deg,rgba(201,168,76,0.12),rgba(26,58,30,0.5)) !important; border-color:rgba(201,168,76,0.25); box-shadow:0 4px 20px rgba(0,0,0,0.3),inset 0 1px 0 rgba(201,168,76,0.1); }
        .ni.act::before { transform:scaleY(1); }
        .ni-icon { font-size:14px; flex-shrink:0; filter:drop-shadow(0 0 5px currentColor); }
        .ni-label { font-size:11px; font-weight:500; letter-spacing:0.1em; text-transform:uppercase; white-space:nowrap; }
        .gold-div { height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent); margin:10px 0; }
        .stat-card { position:relative; padding:20px; border-radius:16px; border:1px solid rgba(201,168,76,0.12); background:linear-gradient(135deg,rgba(13,31,15,0.95),rgba(26,58,30,0.5)); overflow:hidden; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); }
        .stat-card::after { content:''; position:absolute; top:-40px; right:-40px; width:90px; height:90px; border-radius:50%; background:radial-gradient(circle,rgba(201,168,76,0.06),transparent 70%); pointer-events:none; }
        .stat-card:hover { border-color:rgba(201,168,76,0.3); transform:translateY(-3px); box-shadow:0 16px 40px rgba(0,0,0,0.4); }
        .stat-num { font-family:'Playfair Display',serif; font-size:2rem; font-weight:600; background:linear-gradient(135deg,#c9a84c,#f0d080,#d4891a); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; line-height:1; }
        .wb { position:relative; border-radius:20px; overflow:hidden; background:linear-gradient(135deg,#0d1f0f,#1a3a1e 40%,#162b18); border:1px solid rgba(201,168,76,0.18); padding:32px 36px; margin-bottom:24px; }
        .wb::before { content:''; position:absolute; inset:0; background-image:url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c9a84c' fill-opacity='0.03'%3E%3Cpath d='M40 0C17.9 0 0 17.9 0 40s17.9 40 40 40 40-17.9 40-40S62.1 0 40 0zm0 70C23.4 70 10 56.6 10 40S23.4 10 40 10s30 13.4 30 30-13.4 30-30 30z'/%3E%3C/g%3E%3C/svg%3E"); pointer-events:none; }
        .wb::after { content:''; position:absolute; top:0; right:0; width:40%; height:100%; background:radial-gradient(ellipse at 80% 50%,rgba(201,168,76,0.07),transparent 60%); pointer-events:none; }
        .mca { flex:1; height:100%; overflow-y:auto; background:linear-gradient(160deg,#060e07,#0a1a0c 50%,#081005); position:relative; }
        .top-bar { background:rgba(6,14,7,0.92); backdrop-filter:blur(20px); border-bottom:1px solid rgba(201,168,76,0.1); padding:13px 28px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:10; }
        .back-btn { display:inline-flex; align-items:center; gap:7px; padding:7px 16px; border-radius:10px; cursor:pointer; border:1px solid rgba(201,168,76,0.3); background:rgba(201,168,76,0.07); color:#c9a84c; font-size:9px; font-weight:500; letter-spacing:0.22em; text-transform:uppercase; transition:all 0.2s; font-family:'Jost',sans-serif; }
        .back-btn:hover { background:rgba(201,168,76,0.14); border-color:rgba(201,168,76,0.55); color:#f0d080; transform:translateX(-2px); }
        .ra-card { background:linear-gradient(135deg,rgba(13,31,15,0.95),rgba(10,22,12,0.98)); border:1px solid rgba(201,168,76,0.12); border-radius:16px; overflow:hidden; }
        .ra-row { padding:13px 18px; border-bottom:1px solid rgba(201,168,76,0.06); display:flex; align-items:center; gap:12px; transition:background 0.18s; text-decoration:none; }
        .ra-row:last-child { border-bottom:none; }
        .ra-row:hover { background:rgba(201,168,76,0.04); }
        .col-btn { width:28px; height:28px; border-radius:8px; border:1px solid rgba(201,168,76,0.2); background:rgba(201,168,76,0.05); color:rgba(201,168,76,0.55); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.18s; font-size:10px; flex-shrink:0; }
        .col-btn:hover { background:rgba(201,168,76,0.12); color:#c9a84c; border-color:rgba(201,168,76,0.4); }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#060e07; }
        ::-webkit-scrollbar-thumb { background:rgba(201,168,76,0.25); border-radius:2px; }
        @keyframes fiu { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
        .fi { animation:fiu 0.45s cubic-bezier(0.16,1,0.3,1) both; }
        .fi1 { animation-delay:0.07s; } .fi2 { animation-delay:0.14s; }
        @keyframes pulse { 0%,100%{opacity:0.4;} 50%{opacity:1;} }
        .pulsing { animation:pulse 1.4s ease-in-out infinite; }
        .bc { font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(201,168,76,0.4); }
        .bc span { color:rgba(201,168,76,0.75); }
        .sec-title { font-family:'Playfair Display',serif; font-size:1rem; color:#f5f0e8; font-weight:500; }
        .sec-label { font-size:8px; letter-spacing:0.35em; text-transform:uppercase; color:rgba(201,168,76,0.5); font-weight:500; }
        .sign-out-btn { background:none; border:none; cursor:pointer; padding:4px; transition:all 0.2s; border-radius:4px; }
        .sign-out-btn:hover { color:#e57373 !important; }
      `}</style>

      {/* ══ SIDEBAR ══ */}
      <div className="sb" style={{ width: collapsed ? "66px" : "236px" }}>

        {/* Logo row */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 14px 14px", borderBottom:"1px solid rgba(201,168,76,0.1)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", overflow:"hidden" }}>
            <img src="/logo.png" alt="Leonine" style={{ width:"36px", height:"36px", objectFit:"contain", flexShrink:0, filter:"drop-shadow(0 0 8px rgba(201,168,76,0.3))" }} />
            {!collapsed && (
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"13px", color:"#f0d080", letterSpacing:"0.15em", fontWeight:500 }}>LEONINE</div>
                <div style={{ fontSize:"7px", letterSpacing:"0.3em", color:"rgba(201,168,76,0.45)", textTransform:"uppercase" }}>Admin Panel</div>
              </div>
            )}
          </div>
          <button className="col-btn" onClick={() => setCollapsed(!collapsed)}>{collapsed ? "→" : "←"}</button>
        </div>

        {/* Dashboard link */}
<div style={{ padding:"10px 10px 0" }}>
  <button onClick={() => navigate("/admin")} className={`ni ${isOnDashboard ? "act" : ""}`} title={collapsed ? "Dashboard" : undefined}>
    <span className="ni-icon" style={{ color: isOnDashboard ? "#c9a84c" : "inherit" }}><FaHome /></span>
    {!collapsed && <span className="ni-label">Dashboard</span>}
  </button>
  <button onClick={() => navigate("/")} className="ni" title={collapsed ? "Visit Site" : undefined}>
    <span className="ni-icon" style={{ color: "rgba(124,173,122,0.75)" }}>↗</span>
    {!collapsed && <span className="ni-label" style={{ color: "rgba(124,173,122,0.75)" }}>Visit Site</span>}
  </button>
</div>
<div style={{ padding:"0 10px" }}><div className="gold-div" /></div>
        <div style={{ padding:"0 10px" }}><div className="gold-div" /></div>

        {/* Modules */}
        <nav style={{ flex:1, overflowY:"auto", padding:"0 10px" }}>
          {!collapsed && <div className="sec-label" style={{ padding:"0 4px 6px" }}>Modules</div>}
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className={`ni ${isActive(item.to) ? "act" : ""}`} title={collapsed ? item.label : undefined}>
              <span className="ni-icon" style={{ color: isActive(item.to) ? item.accent : "inherit" }}>{item.icon}</span>
              {!collapsed && <span className="ni-label">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Clock + Profile — shows ADMIN NAME from token */}
        <div style={{ padding:"10px", borderTop:"1px solid rgba(201,168,76,0.08)", display:"flex", flexDirection:"column", gap:"8px" }}>
          <div style={{ background:"rgba(201,168,76,0.05)", border:"1px solid rgba(201,168,76,0.12)", borderRadius:"12px", padding: collapsed ? "9px 7px" : "9px 13px", display:"flex", alignItems:"center", gap:"9px" }}>
            <FaClock style={{ color:"rgba(201,168,76,0.55)", fontSize:"12px", flexShrink:0 }} />
            {!collapsed && (
              <div>
                <div style={{ fontSize:"11px", fontWeight:600, color:"#f0d080", letterSpacing:"0.05em" }}>{fmt(currentTime)}</div>
                <div style={{ fontSize:"9px", color:"rgba(201,168,76,0.4)", letterSpacing:"0.1em" }}>{fmtDate(currentTime)}</div>
              </div>
            )}
          </div>
          <div style={{ background:"linear-gradient(135deg,rgba(201,168,76,0.08),rgba(26,58,30,0.4))", border:"1px solid rgba(201,168,76,0.15)", borderRadius:"12px", padding: collapsed ? "9px 7px" : "9px 13px", display:"flex", alignItems:"center", gap:"9px" }}>
            {/* Avatar with admin initial */}
            <div style={{ width:"30px", height:"30px", flexShrink:0, background:"linear-gradient(135deg,#c9a84c,#d4891a)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", fontWeight:700, color:"#0d1f0f", boxShadow:"0 2px 10px rgba(201,168,76,0.3)" }}>
              {adminInitial}
            </div>
            {!collapsed && (
              <>
                <div style={{ flex:1, overflow:"hidden" }}>
                  {/* Admin name from token — not hardcoded "Resort Manager" */}
                  <div style={{ fontSize:"11px", fontWeight:600, color:"#f5f0e8", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{adminFullName}</div>
                  <div style={{ fontSize:"8px", color:"rgba(201,168,76,0.45)", letterSpacing:"0.15em", textTransform:"uppercase", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                    {adminEmail || "Administrator"}
                  </div>
                </div>
                <button
                  className="sign-out-btn"
                  title="Sign out"
                  onClick={handleSignOut}
                >
                  <FaSignOutAlt style={{ color:"rgba(201,168,76,0.3)", fontSize:"11px" }} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ══ MAIN ══ */}
      <div className="mca">

        {/* Top bar */}
        <div className="top-bar">
          <div className="bc">Leonine Admin &nbsp;/&nbsp; <span>{activeLabel}</span></div>
          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            {!isOnDashboard && (
              <button className="back-btn" onClick={() => navigate("/admin")}>
                <FaArrowLeft style={{ fontSize:"9px" }} /> Dashboard
              </button>
            )}
            <div style={{ fontSize:"10px", color:"rgba(201,168,76,0.4)", letterSpacing:"0.15em" }}>{fmtDate(currentTime)}</div>
            <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#4a7c52", boxShadow:"0 0 8px rgba(74,124,82,0.8)" }} />
            <span style={{ fontSize:"9px", color:"rgba(124,173,122,0.65)", letterSpacing:"0.2em", textTransform:"uppercase" }}>Live</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding:"24px", position:"relative", zIndex:1 }}>

          {/* ── DASHBOARD ── */}
          {isOnDashboard && (
            <>
              {/* Welcome banner */}
              <div className="wb fi">
                <div style={{ position:"relative", zIndex:1 }}>
                  <div style={{ fontSize:"8px", letterSpacing:"0.4em", textTransform:"uppercase", color:"rgba(201,168,76,0.5)", marginBottom:"8px" }}>Resort Management System</div>
                  <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.9rem", color:"#f5f0e8", fontWeight:500, marginBottom:"7px", lineHeight:1.2 }}>
                    Welcome back,{" "}
                    <span style={{ background:"linear-gradient(135deg,#c9a84c,#f0d080)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                      {adminFirstName}
                    </span>
                  </h1>
                  <p style={{ fontSize:"12px", color:"rgba(200,190,175,0.55)", maxWidth:"460px", lineHeight:1.75 }}>
                    Live data from your MongoDB database. All stats update on each visit.
                  </p>
                </div>
              </div>

              {/* Stats — real data */}
              <div className="fi fi1" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"14px", marginBottom:"22px" }}>
                {quickStats.map((s, i) => (
                  <div key={i} className="stat-card">
                    <div style={{ padding:"8px", borderRadius:"10px", background:`rgba(${s.rgb},0.1)`, color:`rgb(${s.rgb})`, fontSize:"13px", width:"fit-content", marginBottom:"14px" }}>{s.icon}</div>
                    <div className={`stat-num ${loadingStats ? "pulsing" : ""}`}>{s.value}</div>
                    <div style={{ fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(200,190,175,0.4)", marginTop:"4px" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Bottom grid */}
              <div className="fi fi2" style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:"18px" }}>

                {/* Quick access */}
                <div className="ra-card">
                  <div style={{ padding:"14px 18px", borderBottom:"1px solid rgba(201,168,76,0.08)" }}>
                    <div className="sec-label" style={{ marginBottom:"3px" }}>Quick Access</div>
                    <div className="sec-title">Modules</div>
                  </div>
                  {navItems.map((item, i) => (
                    <Link key={i} to={item.to} className="ra-row">
                      <div style={{ padding:"6px", borderRadius:"7px", background:`rgba(${item.accent === "#c9a84c" ? "201,168,76" : item.accent === "#7cad7a" ? "124,173,122" : "212,137,26"},0.1)`, color:item.accent, fontSize:"12px" }}>{item.icon}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:"11px", fontWeight:500, color:"#e8e0d0", letterSpacing:"0.06em" }}>{item.label}</div>
                      </div>
                      <span style={{ fontSize:"10px", color:"rgba(201,168,76,0.3)" }}>→</span>
                    </Link>
                  ))}
                </div>

                {/* Recent bookings — real data */}
                <div className="ra-card">
                  <div style={{ padding:"14px 18px", borderBottom:"1px solid rgba(201,168,76,0.08)" }}>
                    <div className="sec-label" style={{ marginBottom:"3px" }}>From your database</div>
                    <div className="sec-title">Recent Bookings</div>
                  </div>

                  {loadingStats ? (
                    <div style={{ padding:"28px", textAlign:"center", fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(201,168,76,0.35)" }}>Loading…</div>
                  ) : recentBookings.length === 0 ? (
                    <div style={{ padding:"28px", textAlign:"center", fontSize:"11px", color:"rgba(200,190,175,0.25)", letterSpacing:"0.1em" }}>No bookings in database yet</div>
                  ) : (
                    recentBookings.map((b, i) => {
                      const email   = b.email || b.user?.email || "—";
                      const room    = b.roomId || b.room?.name || "—";
                      const start   = b.start || b.checkIn || b.checkInDate || b.createdAt || "";
                      const dateStr = start ? new Date(start).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" }) : "";
                      const status  = (b.status || "pending").toLowerCase();
                      const dot     = status === "confirmed" ? "#7cad7a" : status === "cancelled" ? "#e57373" : "#c9a84c";
                      return (
                        <div key={b._id || b.bookingId || i} className="ra-row">
                          <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:dot, boxShadow:`0 0 6px ${dot}90`, flexShrink:0 }} />
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontSize:"11px", color:"#d0c8b8", fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", marginBottom:"1px" }}>{email}</div>
                            <div style={{ fontSize:"10px", color:"rgba(200,190,175,0.35)" }}>Room {room}{dateStr ? ` · ${dateStr}` : ""}</div>
                          </div>
                          <div style={{ fontSize:"8px", color:dot, letterSpacing:"0.12em", textTransform:"uppercase", flexShrink:0 }}>{status}</div>
                        </div>
                      );
                    })
                  )}
                  <Link to="/admin/bookings" className="ra-row" style={{ justifyContent:"center" }}>
                    <span style={{ fontSize:"9px", color:"rgba(201,168,76,0.45)", letterSpacing:"0.22em", textTransform:"uppercase" }}>View all bookings →</span>
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* Sub-panel routes */}
          <Routes>
            <Route path="/bookings"        element={<AdminBooking />} />
            <Route path="/categories"      element={<AdminCategory />} />
            <Route path="/add-category"    element={<AddCategoryForm />} />
            <Route path="/update-category" element={<UpdateCategoryForm />} />
            <Route path="/rooms"           element={<AdminRoom />} />
            <Route path="/add-room"        element={<AddRoomForm />} />
            <Route path="/update-room"     element={<UpdateRoomForm />} />
            <Route path="/users"           element={<AdminUser />} />
            <Route path="/feedbacks"       element={<AdminFeedback />} />
            <Route path="/gallery"         element={<AdminGallery />} />
            <Route path="/add-gallery"     element={<AddGalleryItemForm />} />
            <Route path="/update-gallery"  element={<UpdateGalleryForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}