import { Link, Routes, Route } from "react-router-dom";
import {
  FaBookmark,
  FaList,
  FaBed,
  FaComments,
  FaImages,
  FaUser,
  FaClock,
} from "react-icons/fa";
import { useState, useEffect } from "react";

import AdminBooking from "../admin/booking";
import AdminCategory from "../admin/category";
import AdminRoom from "../admin/room";
import AdminUser from "../admin/user";
import AdminFeedback from "../admin/feedback";
import AdminGallery from "../admin/gallery";
import AddCategoryForm from "../admin/addCategoryForm";
import UpdateCategoryForm from "../admin/updateCategoryForm";
import AddGalleryItemForm from "../admin/addGalleryItemForm";
import UpdateGalleryForm from "../admin/updateGalleryItemForm";

// ✅ Move logo.png to src/assets/logo.png
import logo from "../../assets/logo.png";

export default function AdminPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="w-full h-screen flex bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <div className="w-[260px] bg-gradient-to-b from-emerald-900 via-green-900 to-emerald-950 flex flex-col shadow-2xl">
        {/* Logo Section */}
        <div className="p-6 flex justify-center items-center">
          <img
            src={logo}
            alt="Villa Logo"
            className="h-20 w-auto object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 flex flex-col justify-between px-4 py-4">
          {/* Top nav links */}
          <div className="space-y-2">
            <Link
              to="/admin/bookings"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-700/50 text-emerald-100 hover:text-white transition-all duration-200"
            >
              <FaBookmark className="text-lg" />
              <span className="text-sm font-medium">Bookings</span>
            </Link>

            <Link
              to="/admin/categories"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-700/50 text-emerald-100 hover:text-white transition-all duration-200"
            >
              <FaList className="text-lg" />
              <span className="text-sm font-medium">Categories</span>
            </Link>

            <Link
              to="/admin/rooms"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-700/50 text-emerald-100 hover:text-white transition-all duration-200"
            >
              <FaBed className="text-lg" />
              <span className="text-sm font-medium">Rooms</span>
            </Link>

            <Link
              to="/admin/users"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-700/50 text-emerald-100 hover:text-white transition-all duration-200"
            >
              <FaUser className="text-lg" />
              <span className="text-sm font-medium">Users</span>
            </Link>

            <Link
              to="/admin/feedbacks"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-700/50 text-emerald-100 hover:text-white transition-all duration-200"
            >
              <FaComments className="text-lg" />
              <span className="text-sm font-medium">Feedbacks</span>
            </Link>

            <Link
              to="/admin/gallery"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-700/50 text-emerald-100 hover:text-white transition-all duration-200"
            >
              <FaImages className="text-lg" />
              <span className="text-sm font-medium">Gallery</span>
            </Link>
          </div>

          {/* Bottom section: Time + Admin */}
          <div className="space-y-3">
            {/* Time */}
            <div className="bg-emerald-800/50 rounded-xl p-3 text-emerald-100">
              <div className="flex items-center gap-2">
                <FaClock />
                <div>
                  <p className="text-sm font-bold">{formatTime(currentTime)}</p>
                  <p className="text-xs">{formatDate(currentTime)}</p>
                </div>
              </div>
            </div>

            {/* Admin Profile */}
            <div className="bg-emerald-700/40 rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Admin</p>
                <p className="text-emerald-200 text-xs">Resort Manager</p>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 h-screen overflow-y-auto bg-gradient-to-br from-gray-50 to-emerald-50/30 p-4">
        <Routes>
          <Route path="/bookings" element={<AdminBooking />} />
          <Route path="/categories" element={<AdminCategory />} />
          <Route path="/add-category" element={<AddCategoryForm />} />
          <Route path="/update-category" element={<UpdateCategoryForm />} />
          <Route path="/rooms" element={<AdminRoom />} />
          <Route path="/users" element={<AdminUser />} />
          <Route path="/feedbacks" element={<AdminFeedback />} />
          <Route path="/gallery" element={<AdminGallery />} />
          <Route path="/add-gallery" element={<AddGalleryItemForm/>}/>
          <Route path="/update-gallery" element={<UpdateGalleryForm/>}/>
        </Routes>
      </div>
    </div>
  );
}
