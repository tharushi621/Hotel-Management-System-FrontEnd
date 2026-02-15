import UserData from "./userData.jsx";
import { useState } from "react";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll effect
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 50);
    });
  }

  return (
    <header 
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md shadow-2xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">L</span>
          </div>
          <div>
            <h1 className="text-2xl font-serif text-white tracking-wide">
              Leonine Villa
            </h1>
            <p className="text-amber-400 text-xs tracking-widest uppercase">
              Luxury Resort
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#home" 
            className="text-white hover:text-amber-400 transition-colors text-sm tracking-wide uppercase font-light"
          >
            Home
          </a>
          <a 
            href="#rooms" 
            className="text-white hover:text-amber-400 transition-colors text-sm tracking-wide uppercase font-light"
          >
            Rooms
          </a>
          <a 
            href="#amenities" 
            className="text-white hover:text-amber-400 transition-colors text-sm tracking-wide uppercase font-light"
          >
            Amenities
          </a>
          <a 
            href="#gallery" 
            className="text-white hover:text-amber-400 transition-colors text-sm tracking-wide uppercase font-light"
          >
            Gallery
          </a>
          <a 
            href="#contact" 
            className="text-white hover:text-amber-400 transition-colors text-sm tracking-wide uppercase font-light"
          >
            Contact
          </a>
        </nav>

        {/* User Data */}
        <UserData 
          imageLink="https://img.freepik.com/premium-vector/user-icon-vector_1272330-86.jpg" 
          name="Tharushi Bhagya" 
        />
      </div>
    </header>
  );
}

export default Header;