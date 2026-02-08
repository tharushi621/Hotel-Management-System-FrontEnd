const bookings = [
  {
    bookingId: "B001",
    roomId: "R101",
    email: "alice@example.com",
    startDate: "2026-02-10",
    endDate: "2026-02-12",
    status: "Confirmed",
    reason: "Vacation",
    guests: 2,
    rooms: 1,
  },
  {
    bookingId: "B002",
    roomId: "R102",
    email: "bob@example.com",
    startDate: "2026-02-15",
    endDate: "2026-02-18",
    status: "Pending",
    reason: "Business",
    guests: 1,
    rooms: 1,
  },
  {
    bookingId: "B003",
    roomId: "R103",
    email: "carol@example.com",
    startDate: "2026-02-20",
    endDate: "2026-02-22",
    status: "Cancelled",
    reason: "Family",
    guests: 4,
    rooms: 2,
  },
];

export default function AdminBooking() {
  return (
    <div className="w-full p-6">
      {name}
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-pink-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Booking ID</th>
              <th className="py-3 px-4 text-left">Room ID</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Start Date</th>
              <th className="py-3 px-4 text-left">End Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Reason</th>
              <th className="py-3 px-4 text-left">Guests</th>
              <th className="py-3 px-4 text-left">Rooms</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
                bookings.map((booking,index)=>{
                    return(
                         <tr key={index}>
                        <td>
                            {booking.bookingId}
                        </td>
                        <td>
                            {booking.roomId}
                        </td>
                        <td>
                            {booking.email}
                        </td>
                        <td>
                            {booking.startDate}
                        </td>
                        <td>
                            {booking.endDate}
                        </td>   
                        <td>
                            {booking.status}
                        </td>   
                        <td>
                            {booking.reason}
                        </td>
                        <td>
                            {booking.guests}
                        </td>
                        <td>
                            {booking.rooms}
                        </td>
                    </tr>
                    )
                   
                })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
