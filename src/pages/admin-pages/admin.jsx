import { Link, Routes, Route } from "react-router-dom";
import {
  FaBookmark,
  FaList,
  FaBed,
  FaComments,
  FaImages,
} from "react-icons/fa";

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
          <Route path="/bookings" element={<h1>Bookings</h1>} />
          <Route path="/categories" element={<h1>Categories</h1>} />
          <Route path="/rooms" element={<h1>Rooms</h1>} />
          <Route path="/users" element={<h1>Users</h1>} />
          <Route path="/feedbacks" element={<h1>Feedback</h1>} />
          <Route path="/gallery" element={<h1>Gallery Items</h1>} />
        </Routes>
      </div>
    </div>
  );
}
