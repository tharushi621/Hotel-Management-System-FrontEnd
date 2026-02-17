import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaBed, FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminRoom() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // Fetch all rooms
  useEffect(() => {
    if (!isLoaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/rooms`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const roomData = res.data.rooms || [];
          setRooms(roomData);

          // Extract unique categories from rooms
          const uniqueCategories = [
            ...new Set(roomData.map((r) => r.category)),
          ];
          setCategories(uniqueCategories);

          setIsLoaded(true);
        })
        .catch(() => toast.error("Failed to load rooms"));
    }
  }, [isLoaded, token]);

  // Delete room
  const handleDelete = async (roomId) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Room deleted successfully");

      // Update state
      setRooms((prev) => prev.filter((r) => r.roomId !== roomId));
    } catch (err) {
      console.error(err);
      toast.error("Error deleting room");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <span className="bg-white/20 p-3 rounded-lg">🛏️</span>
            Room Management
          </h1>
          <p className="text-indigo-100 mt-2 text-lg">
            Manage all rooms under categories
          </p>
        </div>

        {/* Category & Rooms */}
        {categories.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <FaBed className="text-indigo-400 text-6xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Rooms Found
            </h3>
            <button
              onClick={() => navigate("/admin/add-room")}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700"
            >
              Add Room
            </button>
          </div>
        ) : (
          categories.map((cat, idx) => (
            <div key={idx} className="mb-8">
              {/* Category Title */}
              <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-2">
                {cat}
              </h2>

              {/* Rooms under this category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rooms
                  .filter((r) => r.category === cat)
                  .map((room, index) => (
                    <div
                      key={room.roomId}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row">

                        {/* Room Photos */}
                        <div className="md:w-1/4 p-4 bg-indigo-100">
                          {room.photos?.length > 0 ? (
                            <img
                              src={room.photos[0]}
                              alt={`Room ${room.roomId}`}
                              className="w-full h-40 object-cover rounded-xl"
                            />
                          ) : (
                            <div className="h-40 flex items-center justify-center bg-indigo-200 rounded-xl">
                              <FaImage className="text-indigo-400 text-5xl" />
                            </div>
                          )}
                        </div>

                        {/* Room Details */}
                        <div className="md:w-3/4 p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-800">
                                Room #{room.roomId}
                              </h3>
                              <p className="text-gray-700">
                                Max Guests: {room.maxGuests}
                              </p>
                              <p className="text-gray-700">
                                Available:{" "}
                                {room.available ? "✅" : "❌"}
                              </p>
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  navigate("/admin/update-room", { state: room })
                                }
                                className="bg-indigo-100 p-3 rounded-lg text-indigo-700"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(room.roomId)}
                                className="bg-red-100 p-3 rounded-lg text-red-700"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>

                          {/* Special Description & Notes */}
                          {room.specialDescription && (
                            <p className="text-gray-600 mb-2">
                              {room.specialDescription}
                            </p>
                          )}
                          {room.notes && (
                            <p className="text-gray-600 mb-2">Notes: {room.notes}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
        )}

        {/* Floating Add Button */}
        <button
          onClick={() => navigate("/admin/add-room")}
          className="fixed bottom-8 right-8 bg-indigo-600 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center text-2xl hover:scale-110"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
