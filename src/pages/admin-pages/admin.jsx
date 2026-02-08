import { Link, Routes, Route } from "react-router-dom";
import {
  FaBookmark,
  FaList,
  FaBed,
  FaComments,
  FaImages,
} from "react-icons/fa";
import AdminBooking from "../admin/booking";
import AdminCategory from "../admin/category";
import AdminRoom from "../admin/room";
import AdminUser from "../admin/user";
import AdminFeedback from "../admin/feedback";
import AdminGallery from "../admin/gallery";

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-[20%] bg-pink-600 h-full flex flex-col text-white p-4 space-y-3">
        <Link
          to="/admin/bookings"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:text-pink-600 transition-all duration-200"
        >
          <FaBookmark className="text-xl" />
          <span className="text-lg font-medium">Bookings</span>
        </Link>

        <Link
          to="/admin/categories"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:text-pink-600 transition-all duration-200"
        >
          <FaList className="text-xl" />
          <span className="text-lg font-medium">Categories</span>
        </Link>

        <Link
          to="/admin/rooms"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:text-pink-600 transition-all duration-200"
        >
          <FaBed className="text-xl" />
          <span className="text-lg font-medium">Rooms</span>
        </Link>

        <Link
          to="/admin/feedbacks"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:text-pink-600 transition-all duration-200"
        >
          <FaComments className="text-xl" />
          <span className="text-lg font-medium">Feedbacks</span>
        </Link>

        <Link
          to="/admin/gallery"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:text-pink-600 transition-all duration-200"
        >
          <FaImages className="text-xl" />
          <span className="text-lg font-medium">Gallery</span>
        </Link>
      </div>

      <div className="w-[80%] max-h-[100vh] overflow-y-scroll  bg-purple-600 ">
        <Routes path="/*">
          <Route path="/bookings" element={<AdminBooking/>} />
          <Route path="/categories" element={<AdminCategory/>} />
          <Route path="/rooms" element={<AdminRoom/>} />
          <Route path="/users" element={<AdminUser/>} />
          <Route path="/feedbacks" element={<AdminFeedback/>} />
          <Route path="/gallery" element={<AdminGallery/>} />
        </Routes>
      </div>
    </div>
  );
}
