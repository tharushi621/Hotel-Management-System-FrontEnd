import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaImage, FaTag, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminGallery() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!token || token === "null") navigate("/login");
  }, [token, navigate]);

  useEffect(() => {
    if (!isLoaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/gallery`)
        .then((res) => {
          setGalleryItems(res.data.list || []);
          setIsLoaded(true);
        })
        .catch((err) => {
          if (err.response?.status === 401 || err.response?.status === 403) {
            toast.error("Session expired or access denied.");
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            toast.error("Failed to load gallery items.");
          }
          setIsLoaded(true);
        });
    }
  }, [isLoaded]);

  // FIX: update local state directly instead of setIsLoaded(false) refetch
  const handleDelete = (id) => {
    if (!window.confirm("Delete this gallery item? This cannot be undone.")) return;
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Gallery item deleted.");
        setGalleryItems((prev) => prev.filter((i) => i._id !== id));
      })
      .catch(() => toast.error("Error deleting gallery item."));
  };

  const allCategories = [
    "All",
    ...Array.from(new Set(galleryItems.map((i) => i.category).filter(Boolean))),
  ];

  const filteredItems = galleryItems
    .filter((i) => filterCategory === "All" || i.category === filterCategory)
    .filter((i) =>
      search.trim()
        ? i.name.toLowerCase().includes(search.toLowerCase()) ||
          (i.description || "").toLowerCase().includes(search.toLowerCase())
        : true
    );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Header — matches AdminUser / AdminBooking / AdminFeedback pattern */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1e2d16] flex items-center justify-center shadow-sm">
            <FaImage className="text-white text-sm" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800 leading-tight">Gallery Management</h1>
            <p className="text-xs text-[#1e2d16]">Images shown on the public gallery page</p>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search items…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 rounded-lg pl-8 pr-3 py-2 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all text-sm w-44"
            />
          </div>

          {/* Total pill */}
          <div className="flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-xl px-4 py-2">
            <span className="text-xs text-[#1e2d16] font-medium">Total</span>
            <span className="text-xl font-black text-[#1e2d16] leading-none">{galleryItems.length}</span>
          </div>

          {/* Add button */}
          <button
            onClick={() => navigate("/admin/add-gallery")}
            className="flex items-center gap-2 bg-[#1e2d16] hover:bg-[#1e2d16] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <FaPlus style={{ fontSize: 10 }} /> Add Item
          </button>
        </div>
      </div>

      {/* Category filter bar */}
      {galleryItems.length > 0 && (
        <div className="bg-white border-b border-slate-100 px-6 py-3 flex items-center gap-2 flex-wrap">
          <FaTag className="text-slate-400 text-xs shrink-0" />
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all
                ${filterCategory === cat
                  ? "bg-[#1e2d16] text-white shadow-sm"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1 opacity-60">
                  ({galleryItems.filter((i) => i.category === cat).length})
                </span>
              )}
            </button>
          ))}
          <span className="ml-auto text-xs text-slate-400">
            {filteredItems.length} of {galleryItems.length} shown
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 py-3">

        {/* Loading */}
        {!isLoaded && (
          <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
            <div className="w-7 h-7 border-2 border-[#1e2d16] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-400 text-xs mt-2">Loading gallery items…</p>
          </div>
        )}

        {/* Empty — no items at all */}
        {isLoaded && galleryItems.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
            <div className="w-16 h-16 bg-teal-50 border border-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaImage className="text-[#1e2d16] text-2xl" />
            </div>
            <h3 className="text-sm font-semibold text-slate-700 mb-1">No gallery items yet</h3>
            <p className="text-xs text-slate-400 mb-4">Add your first image to display on the public gallery.</p>
            <button
              onClick={() => navigate("/admin/add-gallery")}
              className="inline-flex items-center gap-2 bg-[#1e2d16] hover:bg-[#1e2d16] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
            >
              <FaPlus style={{ fontSize: 10 }} /> Add Gallery Item
            </button>
          </div>
        )}

        {/* Empty — filter yields nothing */}
        {isLoaded && galleryItems.length > 0 && filteredItems.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <FaImage className="text-slate-300 text-3xl mx-auto mb-3" />
            <p className="text-sm text-slate-500 mb-3">
              No items match "{filterCategory !== "All" ? filterCategory : search}"
            </p>
            <button
              onClick={() => { setFilterCategory("All"); setSearch(""); }}
              className="text-xs text-teal-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Gallery list */}
        {isLoaded && filteredItems.length > 0 && (
          <div className="flex flex-col gap-3 pb-4">
            {filteredItems.map((item, index) => (
              <div
                key={item._id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">

                  {/* Image */}
                  <div className="md:w-48 shrink-0 bg-slate-100 flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
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
                          {/* Index */}
                          <span className="text-slate-400 font-mono text-xs">
                            {String(index + 1).padStart(3, "0")}
                          </span>
                          <div>
                            <h2 className="text-sm font-semibold text-slate-800">{item.name}</h2>
                            {/* FIX: category now exists in schema — badge renders correctly */}
                            {item.category && (
                              <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-100">
                                <FaTag style={{ fontSize: 9 }} />
                                {item.category}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => navigate("/admin/update-gallery", { state: item })}
                            title="Edit item"
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-sky-50 text-[#1e2d16] hover:bg-sky-100 border border-sky-100 transition-all text-xs"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            title="Delete item"
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-100 transition-all text-xs"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {item.image && (
                      <p className="mt-3 text-xs text-slate-300 truncate max-w-md" title={item.image}>
                        🔗 {item.image}
                      </p>
                    )}
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