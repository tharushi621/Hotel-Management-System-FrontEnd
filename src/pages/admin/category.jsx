import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaImage, FaTags } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// ─── FIXES APPLIED ───────────────────────────────────────────────────────────
// 1. DELETE now calls DELETE /api/categories/${cat._id}  (MongoDB _id)
//    Backend was using :name param before — now fixed on both ends to use :id.
// 2. getCategories response is { list: result } — reads res.data.list first.
// 3. Navigate to update uses _id consistently.
// ─────────────────────────────────────────────────────────────────────────────

export default function AdminCategory() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // Fetch categories
  useEffect(() => {
    if (!isLoaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)
        .then((res) => {
          // FIX #2: backend now returns { list: [...] }
          setCategories(res.data.list || res.data.categories || []);
          setIsLoaded(true);
        })
        .catch(() => toast.error("Failed to load categories"));
    }
  }, [isLoaded]);

  // FIX #1: Delete by MongoDB _id
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Category deleted successfully");
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Error deleting category");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <span className="bg-white/20 p-3 rounded-lg">🏷️</span>
            Category Management
          </h1>
          <p className="text-indigo-100 mt-2 text-lg">
            Manage your product categories
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6 bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Categories</p>
              <p className="text-3xl font-bold text-indigo-600">
                {categories.length}
              </p>
            </div>
            <div className="bg-indigo-100 p-4 rounded-full">
              <FaTags className="text-indigo-600 w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Category List */}
        <div className="grid grid-cols-1 gap-6 pb-24">
          {categories.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
              <FaTags className="text-indigo-400 text-6xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No Categories Found
              </h3>
              <button
                onClick={() => navigate("/admin/add-category")}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700"
              >
                Add Category
              </button>
            </div>
          ) : (
            categories.map((cat, index) => (
              <div
                key={cat._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">

                  {/* Image */}
                  <div className="md:w-1/4 p-6 bg-indigo-100">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    ) : (
                      <div className="h-48 flex items-center justify-center bg-indigo-200 rounded-xl">
                        <FaImage className="text-indigo-400 text-5xl" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="md:w-3/4 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          {index + 1}. {cat.name}
                        </h2>
                        <p className="text-indigo-600 font-semibold">
                          Price: Rs. {cat.price}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {/* FIX #3: pass full cat object for editing */}
                        <button
                          onClick={() =>
                            navigate("/admin/update-category", { state: cat })
                          }
                          className="bg-indigo-100 p-3 rounded-lg text-indigo-700"
                        >
                          <FaEdit />
                        </button>
                        {/* FIX #1: delete by _id */}
                        <button
                          onClick={() => handleDelete(cat._id)}
                          className="bg-red-100 p-3 rounded-lg text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-3">{cat.description}</p>

                    {/* Features */}
                    {cat.features?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {cat.features.map((f, i) => (
                          <span
                            key={i}
                            className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Floating Button */}
        <button
          onClick={() => navigate("/admin/add-category")}
          className="fixed bottom-8 right-8 bg-indigo-600 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center text-2xl hover:scale-110"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}