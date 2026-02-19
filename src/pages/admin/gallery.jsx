import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaImage, FaTag, FaSearch, FaTh, FaList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminGallery() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

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

      {/* ── Header ── */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1e2d16] flex items-center justify-center shadow-sm shrink-0">
            <FaImage className="text-white text-sm" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800 leading-tight">Gallery Management</h1>
            <p className="text-xs text-slate-400">Images shown on the public gallery page</p>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto flex-wrap">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 rounded-lg pl-8 pr-3 py-2 outline-none focus:border-[#1e2d16] focus:ring-2 focus:ring-green-100 transition-all text-xs w-40"
            />
          </div>

          {/* View toggle */}
          <div className="flex items-center bg-slate-100 rounded-lg p-1 gap-0.5">
            <button
              onClick={() => setViewMode("grid")}
              title="Grid view"
              className={`w-7 h-7 rounded-md flex items-center justify-center transition-all text-xs
                ${viewMode === "grid" ? "bg-white shadow-sm text-[#1e2d16]" : "text-slate-400 hover:text-slate-600"}`}
            >
              <FaTh />
            </button>
            <button
              onClick={() => setViewMode("list")}
              title="List view"
              className={`w-7 h-7 rounded-md flex items-center justify-center transition-all text-xs
                ${viewMode === "list" ? "bg-white shadow-sm text-[#1e2d16]" : "text-slate-400 hover:text-slate-600"}`}
            >
              <FaList />
            </button>
          </div>

          {/* Count pill */}
          <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2">
            <span className="text-xs text-[#1e2d16] font-medium">Total</span>
            <span className="text-lg font-black text-[#1e2d16] leading-none">{galleryItems.length}</span>
          </div>

          {/* Add */}
          <button
            onClick={() => navigate("/admin/add-gallery")}
            className="flex items-center gap-2 bg-[#1e2d16] hover:bg-[#2a3d20] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <FaPlus style={{ fontSize: 10 }} /> Add Item
          </button>
        </div>
      </div>

      {/* ── Category filter bar ── */}
      <div className="bg-white border-b border-slate-100 px-6 py-2.5 flex items-center gap-2 flex-wrap">
        <FaTag className="text-slate-300 text-xs shrink-0" />
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
        <span className="ml-auto text-xs text-slate-400 shrink-0">
          {filteredItems.length} of {galleryItems.length} shown
        </span>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-auto p-4 md:p-6">

        {/* Loading */}
        {!isLoaded && (
          <div className="bg-white rounded-xl border border-slate-200 p-20 text-center">
            <div className="w-7 h-7 border-2 border-[#1e2d16] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-400 text-xs mt-3">Loading gallery items…</p>
          </div>
        )}

        {/* Empty — no items */}
        {isLoaded && galleryItems.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-20 text-center">
            <div className="w-20 h-20 bg-green-50 border border-green-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
              <FaImage className="text-[#1e2d16] text-3xl" />
            </div>
            <h3 className="text-sm font-semibold text-slate-700 mb-1">No gallery items yet</h3>
            <p className="text-xs text-slate-400 mb-5">Add your first image to display on the public gallery.</p>
            <button
              onClick={() => navigate("/admin/add-gallery")}
              className="inline-flex items-center gap-2 bg-[#1e2d16] hover:bg-[#2a3d20] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all"
            >
              <FaPlus style={{ fontSize: 10 }} /> Add Gallery Item
            </button>
          </div>
        )}

        {/* Empty — filter yields nothing */}
        {isLoaded && galleryItems.length > 0 && filteredItems.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-14 text-center">
            <FaImage className="text-slate-200 text-4xl mx-auto mb-3" />
            <p className="text-sm text-slate-500 mb-3">No items match your filter</p>
            <button
              onClick={() => { setFilterCategory("All"); setSearch(""); }}
              className="text-xs font-medium text-[#1e2d16] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* ════════════════════════════════
            GRID VIEW
            ════════════════════════════════ */}
        {isLoaded && filteredItems.length > 0 && viewMode === "grid" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
            {filteredItems.map((item, index) => (
              <div
                key={item._id}
                className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-square bg-slate-100 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300?text=Not+Found";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaImage className="text-slate-300 text-3xl" />
                    </div>
                  )}

                  {/* Hover overlay with actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <button
                      onClick={() => navigate("/admin/update-gallery", { state: item })}
                      title="Edit"
                      className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#1e2d16] flex items-center justify-center shadow transition-all text-sm"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      title="Delete"
                      className="w-9 h-9 rounded-full bg-red-500/90 hover:bg-red-500 text-white flex items-center justify-center shadow transition-all text-sm"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  {/* Index badge */}
                  <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[9px] font-mono rounded-md px-1.5 py-0.5 leading-none">
                    {String(index + 1).padStart(3, "0")}
                  </div>

                  {/* Category badge */}
                  {item.category && (
                    <div className="absolute top-2 right-2 bg-[#1e2d16]/80 backdrop-blur-sm text-white text-[9px] font-semibold rounded-full px-2 py-0.5 leading-none tracking-wide">
                      {item.category}
                    </div>
                  )}
                </div>

                {/* Card footer */}
                <div className="p-2.5">
                  <p className="text-xs font-semibold text-slate-800 truncate leading-tight">{item.name}</p>
                  {item.description && (
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1 leading-relaxed">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ════════════════════════════════
            LIST VIEW
            ════════════════════════════════ */}
        {isLoaded && filteredItems.length > 0 && viewMode === "list" && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Table header */}
            <div className="grid grid-cols-[48px_80px_1fr_120px_100px_90px] items-center gap-3 px-4 py-2.5 bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>#</span>
              <span>Image</span>
              <span>Name & Description</span>
              <span>Category</span>
              <span>URL</span>
              <span className="text-right">Actions</span>
            </div>

            {filteredItems.map((item, index) => (
              <div
                key={item._id}
                className="grid grid-cols-[48px_80px_1fr_120px_100px_90px] items-center gap-3 px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50/80 transition-colors group"
              >
                {/* Index */}
                <span className="text-xs text-slate-400 font-mono">
                  {String(index + 1).padStart(3, "0")}
                </span>

                {/* Thumbnail */}
                <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/80x60?text=?";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaImage className="text-slate-300 text-lg" />
                    </div>
                  )}
                </div>

                {/* Name + description */}
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{item.name}</p>
                  {item.description && (
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{item.description}</p>
                  )}
                </div>

                {/* Category */}
                <div>
                  {item.category ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-50 text-green-700 border border-green-100">
                      <FaTag style={{ fontSize: 8 }} />{item.category}
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-300">—</span>
                  )}
                </div>

                {/* URL truncated */}
                <div className="min-w-0">
                  {item.image ? (
                    <p className="text-[10px] text-slate-300 truncate" title={item.image}>
                      {item.image}
                    </p>
                  ) : (
                    <span className="text-[10px] text-slate-300">—</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 justify-end">
                  <button
                    onClick={() => navigate("/admin/update-gallery", { state: item })}
                    title="Edit"
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 border border-sky-100 transition-all text-xs"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    title="Delete"
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 border border-red-100 transition-all text-xs"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}