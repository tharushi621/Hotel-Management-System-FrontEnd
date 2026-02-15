import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import { useState } from "react";
import { FaCalendarAlt, FaTag, FaChevronRight, FaStar, FaWifi, FaSwimmingPool, FaSpa, FaConciergeBell } from "react-icons/fa";

export default function HomePage() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [category, setCategory] = useState("luxury");

  const handleBooking = () => {
    console.log({ checkIn, checkOut, category });
    // Add your booking logic here
  };

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Background with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-transform duration-1000"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-32 pb-20">
          
          {/* Welcome Text with Animation */}
          <div className="text-center mb-16 animate-fadeInUp">
            <div className="inline-block mb-4">
              <span className="text-amber-400 text-sm tracking-[0.4em] uppercase font-light border-b border-amber-400/30 pb-2">
                Escape to Paradise
              </span>
            </div>
            
            <h1 className="text-white text-6xl md:text-7xl lg:text-8xl font-serif font-light leading-tight mb-6">
              Welcome to the
              <br />
              <span className="font-semibold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Leonine Villa
              </span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Experience unparalleled luxury nestled in nature's embrace. 
              Where timeless elegance meets modern comfort.
            </p>

            {/* Rating */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-amber-400 text-sm" />
                ))}
              </div>
              <span className="text-white/80 text-sm">5.0 · 2,847 Reviews</span>
            </div>
          </div>

          {/* Booking Card */}
          <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-2 animate-fadeInUp delay-300">
            <div className="bg-gradient-to-br from-white via-white to-amber-50 rounded-xl p-8 shadow-xl">
              <h3 className="text-slate-800 text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="text-amber-600">✦</span>
                Reserve Your Stay
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Check-in */}
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Check-in
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600" />
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-slate-700 bg-white"
                    />
                  </div>
                </div>

                {/* Check-out */}
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Check-out
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600" />
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-slate-700 bg-white"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Room Category
                  </label>
                  <div className="relative">
                    <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600" />
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-slate-700 bg-white appearance-none cursor-pointer"
                    >
                      <option value="luxury">Luxury Suite</option>
                      <option value="deluxe">Deluxe Room</option>
                      <option value="standard">Standard Room</option>
                    </select>
                  </div>
                </div>

                {/* Book Button */}
                <div className="flex items-end">
                  <button
                    onClick={handleBooking}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    Book Now
                    <FaChevronRight className="text-sm" />
                  </button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <FaWifi className="text-amber-600" />
                  <span>Free Wi-Fi</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaSwimmingPool className="text-amber-600" />
                  <span>Pool Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaSpa className="text-amber-600" />
                  <span>Spa Services</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaConciergeBell className="text-amber-600" />
                  <span>24/7 Service</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-white/70 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-amber-600 text-sm tracking-[0.3em] uppercase font-light">
              Discover
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mt-4 mb-6">
              Unforgettable Experiences
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Every moment at Leonine Villa is crafted to perfection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <div 
                className="h-80 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80')" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-serif mb-2">Luxury Suites</h3>
                <p className="text-slate-300 text-sm">Elegantly designed rooms with breathtaking views</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <div 
                className="h-80 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80')" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-serif mb-2">Fine Dining</h3>
                <p className="text-slate-300 text-sm">World-class cuisine prepared by master chefs</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <div 
                className="h-80 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80')" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-serif mb-2">Wellness & Spa</h3>
                <p className="text-slate-300 text-sm">Rejuvenate your body and soul</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }

        .delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </>
  );
}