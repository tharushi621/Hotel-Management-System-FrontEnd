import "./App.css";
import { useState } from "react";
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
import FeedbackPage from "./pages/client-pages/feedbackForm.jsx";
import VerifyEmailPage from "./pages/client-pages/verifyemailpage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  const [showSplash, setShowSplash] = useState(
    () => !sessionStorage.getItem("hasVisited")
  );

  const handleSplashComplete = () => {
    sessionStorage.setItem("hasVisited", "true");
    setShowSplash(false);
  };

  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <FeedbackPage />
            </ProtectedRoute>
          }
        />
        <Route path="/retreats" element={<CategoriesPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
      {showSplash && <LeonineSplash onComplete={handleSplashComplete} />}
    </BrowserRouter>
  );
}

export default App;