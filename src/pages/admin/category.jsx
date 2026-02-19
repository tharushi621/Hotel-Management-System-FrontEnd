import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaImage, FaTags } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminCategory() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!token || token === "null") navigate("/login");
  }, [token, navigate]);

  useEffect(() => {
    if (!isLoaded && token && token !== "null") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)
        .then((res) => {
          setCategories(res.data.list || res.data.categories || []);
          setIsLoaded(true);
        })
        .catch((err) => {
          if (err.response?.status === 401 || err.response?.status === 403) {
            toast.error("Session expired or access denied.");
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            toast.error("Failed to load categories.");
          }
          setIsLoaded(true);
        });
    }
  }, [isLoaded]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category? This cannot be undone.")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Category deleted.");
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch {
      toast.error("Error deleting category.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1e2d16] flex items-center justify-center shadow-sm">
            <FaTags className="text-white text-sm" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800 leading-tight">Category Management</h1>
            <p className="text-xs text-slate-400">Manage room categories and pricing</p>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-xl px-4 py-2">
            <span className="text-xs text-[#1e2d16] font-medium">Total</span>
            <span className="text-xl font-black text-[#1e2d16] leading-none">{categories.length}</span>
          </div>
          <button
            onClick={() => navigate("/admin/add-category")}
            className="flex items-center gap-2 bg-[#1e2d16] hover:bg-green-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <FaPlus style={{ fontSize: 10 }} /> Add Category
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 py-3">

        {/* Loading */}
        {!isLoaded && (
          <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
            <div className="w-7 h-7 border-2 border-[#1e2d16] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-400 text-xs mt-2">Loading categories…</p>
          </div>
        )}

        {/* Empty */}
        {isLoaded && categories.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
            <div className="w-16 h-16 bg-teal-50 border border-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaTags className="text-[#1e2e16] text-2xl" />
            </div>
            <h3 className="text-sm font-semibold text-slate-700 mb-1">No categories yet</h3>
            <p className="text-xs text-slate-400 mb-4">Add your first category to get started.</p>
            <button
              onClick={() => navigate("/admin/add-category")}
              className="inline-flex items-center gap-2 bg-[#1e2d16] hover:bg-[#1e2d15] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
            >
              <FaPlus style={{ fontSize: 10 }} /> Add Category
            </button>
          </div>
        )}

        {/* List */}
        {isLoaded && categories.length > 0 && (
          <div className="flex flex-col gap-3 pb-4">
            {categories.map((cat, index) => (
              <div
                key={cat._id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">

                  {/* Image */}
                  <div className="md:w-48 shrink-0 bg-slate-100 flex items-center justify-center">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-40 md:h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x300?text=Not+Found";
                        }}
                      />
                    ) : (
                      <div className="w-full h-40 flex items-center justify-center">
                        <FaImage className="text-slate-300 text-3xl" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400 font-mono text-xs">
                            {String(index + 1).padStart(3, "0")}
                          </span>
                          <div>
                            <h2 className="text-sm font-semibold text-slate-800">{cat.name}</h2>
                            <span className="inline-block mt-1 text-xs font-semibold text-[#1e2d16] bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">
                              $ {cat.price}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => navigate("/admin/update-category", { state: cat })}
                            title="Edit category"
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-sky-50 text-[#1e2d16] hover:bg-sky-100 border border-sky-100 transition-all text-xs"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(cat._id)}
                            title="Delete category"
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-100 transition-all text-xs"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3">
                        {cat.description}
                      </p>

                      {/* Features */}
                      {cat.features?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {cat.features.map((f, i) => (
                            <span
                              key={i}
                              className="text-xs text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}