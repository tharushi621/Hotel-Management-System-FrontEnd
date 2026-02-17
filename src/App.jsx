import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/client-pages/homePage.jsx";
import AdminPage from "./pages/admin-pages/admin.jsx";
import Loginpage from "./pages/login.jsx";
import AdminCategory from "./pages/admin/category.jsx";
import AdminBooking from "./pages/admin/booking.jsx";
import TestPage from "./components/test.jsx";
import LeonineSplash from "./components/LeonineSplash.jsx";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <LeonineSplash onComplete={() => setShowSplash(false)} />}

      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/categories" element={<AdminCategory />} />
          <Route path="/bookings" element={<AdminBooking />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;