import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaImage, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminRooms() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const [rooms, setRooms] = useState([]);
  const [roomsIsLoaded, setRoomsIsLoaded] = useState(false);

  useEffect(() => {
    if (!roomsIsLoaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/rooms`)
        .then((res) => {
          setRooms(res.data.rooms || []);
          setRoomsIsLoaded(true);
        })
        .catch(() => {
          toast.error("Failed to load rooms");
        });
    }
  }, [roomsIsLoaded]);

  // Delete room
  function handleDelete(roomId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );
    if (!confirmDelete) return;

    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Room deleted successfully");
        setRoomsIsLoaded(false);
      })
      .catch(() => {
        toast.error("Error deleting room");
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <span className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">🏨</span>
            Room Management
          </h1>
          <p className="text-emerald-100 mt-2 text-lg">
            Manage all rooms in your resort
          </p>
        </div>

        {/* Stats Card */}
        <div className="mb-6 bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Rooms</p>
              <p className="text-3xl font-bold text-emerald-600">{rooms.length}</p>
            </div>
            <div className="bg-emerald-100 p-4 rounded-full">
              <FaUsers className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 gap-6 pb-24">
          {rooms.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
              <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaImage className="text-emerald-600 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No Rooms Found
              </h3>
              <p className="text-gray-500 mb-6">
                Start by adding your first room
              </p>
              <button
                onClick={() => navigate("/admin/add-room")}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-105"
              >
                Add Room
              </button>
            </div>
          ) : (
            rooms.map((room, index) => (
              <div
                key={room.roomId}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-emerald-100 hover:border-emerald-300"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Photos Section */}
                  <div className="md:w-1/4 bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center p-6">
                    {room.photos && room.photos.length > 0 ? (
                      <img
                        src={room.photos[0]}
                        alt={`Room ${room.roomId}`}
                        className="w-full h-48 object-cover rounded-xl shadow-md"
                      />
                    ) : (
                      <div className="w-full h-48 bg-emerald-200 rounded-xl flex items-center justify-center">
                        <FaImage className="text-emerald-400 text-5xl" />
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="md:w-3/4 p-6">
                    {/* Header with Index */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <span className="bg-gradient-to-r from-emerald-600 to-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md">
                          {index + 1}
                        </span>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800">
                            Room #{room.roomId} - {room.category}
                          </h2>
                          <p className="text-gray-600 mt-1">
                            Max Guests: {room.maxGuests}
                          </p>
                          <p className="text-gray-600">
                            {room.available ? "Available" : "Occupied"}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            navigate("/admin/update-room", { state: room })
                          }
                          className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                          title="Edit"
                        >
                          <FaEdit className="text-lg" />
                        </button>

                        <button
                          onClick={() => handleDelete(room.roomId)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                          title="Delete"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </div>
                    </div>

                    {/* Special Description */}
                    {room.specialDescription && (
                      <p className="text-gray-600 mb-2 leading-relaxed">
                        {room.specialDescription}
                      </p>
                    )}

                    {/* Notes */}
                    {room.notes && (
                      <p className="text-gray-500 mb-2 italic">{room.notes}</p>
                    )}

                    {/* Photos */}
                    {room.photos && room.photos.length > 1 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {room.photos.slice(1).map((photo, i) => (
                          <img
                            key={i}
                            src={photo}
                            alt={`Room ${room.roomId} photo ${i + 2}`}
                            className="w-24 h-24 object-cover rounded-lg shadow-sm"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => navigate("/admin/add-room")}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-90 z-50"
          title="Add New Room"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
