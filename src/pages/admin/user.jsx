import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaTrash,
  FaUsers,
  FaPhone,
  FaWhatsapp,
  FaBan,
  FaCheckCircle,
  FaUserCog,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TYPES = ["user", "admin", "customer"];

export default function AdminUser() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [typeModalUser, setTypeModalUser] = useState(null);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    if (!token || token === "null") navigate("/login");
  }, [token, navigate]);

  const fetchUsers = async (page = currentPage) => {
    if (!token || token === "null") { navigate("/login"); return; }
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/all?page=${page}&limit=${pageSize}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(res.data.users || []);
      setTotalUsers(res.data.totalUsers || 0);
    } catch (err) {
      if (err.response?.status === 403 || err.response?.status === 401) {
        toast.error("Session expired or access denied.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error("Failed to load users.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && token !== "null") fetchUsers(currentPage);
  }, [currentPage]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("User deleted.");
      fetchUsers(currentPage);
    } catch {
      toast.error("Failed to delete user.");
    }
  };

  const handleToggleDisable = async (user) => {
    const newState = !user.disabled;
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/disable/${user._id}`,
        { disabled: newState },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`User ${newState ? "disabled" : "enabled"}.`);
      setUsers((prev) =>
        prev.map((u) => (u._id === user._id ? { ...u, disabled: newState } : u))
      );
    } catch {
      toast.error("Failed to update user status.");
    }
  };

  const openTypeModal = (user) => {
    setTypeModalUser(user);
    setSelectedType(user.type);
  };

  const handleChangeType = async () => {
    if (!typeModalUser) return;
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/type/${typeModalUser._id}`,
        { type: selectedType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("User role updated.");
      setUsers((prev) =>
        prev.map((u) =>
          u._id === typeModalUser._id ? { ...u, type: selectedType } : u
        )
      );
      setTypeModalUser(null);
    } catch {
      toast.error("Failed to update user role.");
    }
  };

  const totalPages = Math.ceil(totalUsers / pageSize);

  const filteredUsers = search.trim()
    ? users.filter(
        (u) =>
          `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  const typeBadge = (type) => {
    if (type === "admin") return "bg-violet-100 text-violet-700 border border-violet-200";
    if (type === "customer") return "bg-sky-100 text-sky-700 border border-sky-200";
    return "bg-slate-100 text-slate-600 border border-slate-200";
  };

  const avatarColor = (type, disabled) => {
    if (disabled) return "bg-slate-300 text-slate-500";
    if (type === "admin") return "bg-violet-500 text-white";
    if (type === "customer") return "bg-sky-500 text-white";
    return "bg-teal-500 text-white";
  };

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Role Change Modal */}
      {typeModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 w-full max-w-xs mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-800">Change Role</h3>
              <button onClick={() => setTypeModalUser(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <FaTimes />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Updating role for{" "}
              <span className="font-semibold text-slate-700">
                {typeModalUser.firstName} {typeModalUser.lastName}
              </span>
            </p>
            <div className="flex flex-col gap-2 mb-5">
              {TYPES.map((t) => (
                <label
                  key={t}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all
                    ${selectedType === t
                      ? "border-teal-400 bg-teal-50"
                      : "border-slate-200 hover:border-slate-300 bg-white"}`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={t}
                    checked={selectedType === t}
                    onChange={() => setSelectedType(t)}
                    className="accent-[#1e2d16]"
                  />
                  <span className="capitalize text-sm font-medium text-slate-700">{t}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTypeModalUser(null)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleChangeType}
                className="flex-1 py-2 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-600 transition-colors text-sm"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="h-full flex flex-col">

        {/* Header — compact, no wasted space */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1e2d16] flex items-center justify-center shadow-sm">
              <FaUsers className="text-white text-sm" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800 leading-tight">User Management</h1>
              <p className="text-xs text-slate-400">Accounts, roles & access control</p>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search name or email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 rounded-lg pl-8 pr-3 py-2 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all text-sm w-56"
              />
            </div>

            {/* Stats pill */}
            <div className="flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-xl px-4 py-2">
              <span className="text-xs text-[#1e2d16] font-medium">Total</span>
              <span className="text-xl font-black text-[#1e2d16] leading-none">{totalUsers}</span>
            </div>
          </div>
        </div>

        {/* Table area */}
        <div className="flex-1 overflow-auto px-4 py-3">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider">
                    <th className="px-4 py-3 text-left font-semibold w-10">#</th>
                    <th className="px-4 py-3 text-left font-semibold">Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Email</th>
                    <th className="px-4 py-3 text-left font-semibold">Phone</th>
                    <th className="px-4 py-3 text-left font-semibold">WhatsApp</th>
                    <th className="px-4 py-3 text-center font-semibold">Role</th>
                    <th className="px-4 py-3 text-center font-semibold">Verified</th>
                    <th className="px-4 py-3 text-center font-semibold">Status</th>
                    <th className="px-4 py-3 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={9} className="text-center py-16">
                        <div className="w-7 h-7 border-3 border-[#1e2d16] border-t-transparent rounded-full animate-spin mx-auto" style={{ borderWidth: 3 }} />
                        <p className="text-slate-400 text-xs mt-2">Loading users…</p>
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-16 text-slate-400">
                        <FaUsers className="text-3xl mx-auto mb-2 opacity-30" />
                        <p className="text-sm">No users found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user, index) => (
                      <tr
                        key={user._id}
                        className={`border-b border-slate-100 transition-colors hover:bg-slate-50/70
                          ${user.disabled ? "bg-red-50/40" : ""}`}
                      >
                        {/* # */}
                        <td className="px-4 py-3 text-slate-400 font-mono text-xs">
                          {String(index + 1 + (currentPage - 1) * pageSize).padStart(3, "0")}
                        </td>

                        {/* Name */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${avatarColor(user.type, user.disabled)}`}>
                              {user.firstName?.[0]}{user.lastName?.[0]}
                            </div>
                            <span className={`font-medium whitespace-nowrap text-sm ${user.disabled ? "text-slate-400 line-through" : "text-slate-800"}`}>
                              {user.firstName} {user.lastName}
                            </span>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-4 py-3 text-slate-500 max-w-[180px]">
                          <span className="truncate block text-xs">{user.email}</span>
                        </td>

                        {/* Phone */}
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                          <span className="flex items-center gap-1.5 text-xs">
                            <FaPhone className="text-slate-400 shrink-0" style={{ fontSize: 10 }} />
                            {user.phone || <span className="text-slate-300">—</span>}
                          </span>
                        </td>

                        {/* WhatsApp */}
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                          <span className="flex items-center gap-1.5 text-xs">
                            <FaWhatsapp className="text-green-500 shrink-0" style={{ fontSize: 11 }} />
                            {user.whatsApp || <span className="text-slate-300">—</span>}
                          </span>
                        </td>

                        {/* Role */}
                        <td className="px-4 py-3 text-center">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${typeBadge(user.type)}`}>
                            {user.type}
                          </span>
                        </td>

                        {/* Verified */}
                        <td className="px-4 py-3 text-center">
                          {user.emailVerified
                            ? <FaCheckCircle className="text-teal-400 mx-auto" title="Verified" />
                            : <span className="text-xs font-medium text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">Pending</span>
                          }
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3 text-center">
                          {user.disabled
                            ? <span className="text-xs font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">Disabled</span>
                            : <span className="text-xs font-semibold text-[#1e2d16] bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">Active</span>
                          }
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleToggleDisable(user)}
                              title={user.disabled ? "Enable user" : "Disable user"}
                              className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all text-xs
                                ${user.disabled
                                  ? "bg-teal-50 text-[#1e2d16] hover:bg-teal-100 border border-teal-100"
                                  : "bg-amber-50 text-amber-500 hover:bg-amber-100 border border-amber-100"}`}
                            >
                              {user.disabled ? <FaCheckCircle /> : <FaBan />}
                            </button>
                            <button
                              onClick={() => openTypeModal(user)}
                              title="Change role"
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-violet-50 text-[#1e2d16] hover:bg-violet-100 border border-violet-100 transition-all text-xs"
                            >
                              <FaUserCog />
                            </button>
                            <button
                              onClick={() => handleDelete(user._id, `${user.firstName} ${user.lastName}`)}
                              title="Delete user"
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-100 transition-all text-xs"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination — only when needed */}
        {totalPages > 1 && (
          <div className="bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, totalUsers)} of {totalUsers}
            </p>
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-500 rounded-lg disabled:opacity-30 hover:bg-slate-100 transition-all text-xs font-medium"
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  className={`w-8 h-8 rounded-lg font-semibold transition-all text-xs
                    ${pg === currentPage
                      ? "bg-teal-500 text-white shadow-sm"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200"}`}
                >
                  {pg}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-500 rounded-lg disabled:opacity-30 hover:bg-slate-100 transition-all text-xs font-medium"
              >
                Next →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}