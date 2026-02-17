import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/client-pages/homePage.jsx";
import AdminPage from "./pages/admin-pages/admin.jsx";
import Loginpage from "./pages/login.jsx";
import SignupPage from "./pages/signUp.jsx";
import BookingPage from "./pages/client-pages/clientBooking.jsx";
import RoomsPage from "./pages/client-pages/rooms.jsx";
import CategoriesPage from "./pages/client-pages/categories.jsx";
import LeonineSplash from "./components/LeonineSplash.jsx";
import GalleryPage from "./pages/client-pages/galleryPage.jsx";

// ─── FIXES APPLIED ───────────────────────────────────────────────────────────
// 1. Removed duplicate /categories and /bookings top-level routes that were
//    incorrectly pointing to Admin components. Admin routes live under /admin/*.
// 2. Added missing /gallery client route.
// 3. Moved the wildcard /*  route to the VERY END so it doesn't swallow
//    /retreats, /rooms, /gallery, etc.
// ─────────────────────────────────────────────────────────────────────────────

function App() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    localStorage.setItem("hasVisited", "true");
  };

  return (
    <>
      {showSplash && <LeonineSplash onComplete={handleSplashComplete} />}

      {!showSplash && (
        <BrowserRouter>
          <Toaster position="top-right" reverseOrder={false} />
          <Routes>
            {/* ── Auth ── */}
            <Route path="/login"   element={<Loginpage />} />
            <Route path="/signup"  element={<SignupPage />} />

            {/* ── Client ── */}
            <Route path="/booking"  element={<BookingPage />} />
            <Route path="/retreats" element={<CategoriesPage />} />
            <Route path="/rooms"    element={<RoomsPage />} />
            {/* FIX #2 — added /gallery route so "Full Gallery →" button works */}
            <Route path="/gallery"  element={<GalleryPage />} />

            {/* ── Admin (all sub-routes handled inside AdminPage) ── */}
            <Route path="/admin/*" element={<AdminPage />} />

            {/* ── Home — wildcard MUST be last ── */}
            {/* FIX #3 — moved wildcard to bottom so it doesn't eat named routes */}
            <Route path="/*" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;

// ─── NOTE ────────────────────────────────────────────────────────────────────
// Replace <GalleryClientPage /> above with your actual gallery page component
// import, e.g.:
//   import GalleryClientPage from "./pages/client-pages/gallery.jsx";
// If you don't have one yet, create a placeholder or reuse an existing page.
// ─────────────────────────────────────────────────────────────────────────────