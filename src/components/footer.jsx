import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <h3 className="text-xl font-serif">Leonine Villa</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              A sanctuary of luxury and tranquility, where every detail is designed to create unforgettable memories.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors">
                <FaFacebookF className="text-sm" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors">
                <FaInstagram className="text-sm" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors">
                <FaTwitter className="text-sm" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors">
                <FaYoutube className="text-sm" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-amber-400">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">Rooms & Suites</a></li>
              <li><a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">Amenities</a></li>
              <li><a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">Gallery</a></li>
              <li><a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">Special Offers</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-amber-400">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">Restaurant</a></li>
              <li><a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">Spa & Wellness</a></li>
              <li><a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">Swimming Pool</a></li>
              <li><a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">Event Spaces</a></li>
              <li><a href="#" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">Concierge</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-amber-400">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <FaMapMarkerAlt className="text-amber-400 mt-1 flex-shrink-0" />
                <span>123 Paradise Road, Kalutara, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <FaPhone className="text-amber-400 flex-shrink-0" />
                <span>+94 77 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <FaEnvelope className="text-amber-400 flex-shrink-0" />
                <span>info@leoninevilla.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 Leonine Villa. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-500 hover:text-amber-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-500 hover:text-amber-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-500 hover:text-amber-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}