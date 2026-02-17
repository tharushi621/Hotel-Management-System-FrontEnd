import { useState } from 'react';
import UserData from "./userData.jsx";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="Leonine Villa Logo" 
              className="h-14 w-14 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h1 className="text-2xl font-bold text-amber-400 tracking-wide">
                LEONINE VILLA
              </h1>
              <p className="text-xs text-emerald-200 tracking-widest">NATURA RESORT</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-amber-400 transition-colors duration-300 font-medium">
              Home
            </a>
            <a href="#about" className="text-white hover:text-amber-400 transition-colors duration-300 font-medium">
              About Us
            </a>
            <a href="#stays" className="text-white hover:text-amber-400 transition-colors duration-300 font-medium">
              Stays
            </a>
            <a href="#dining" className="text-white hover:text-amber-400 transition-colors duration-300 font-medium">
              Dining
            </a>
            <a href="#experiences" className="text-white hover:text-amber-400 transition-colors duration-300 font-medium">
              Experiences
            </a>
            <a href="#gallery" className="text-white hover:text-amber-400 transition-colors duration-300 font-medium">
              Gallery
            </a>
            <a href="#contact" className="text-white hover:text-amber-400 transition-colors duration-300 font-medium">
              Contact
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-6 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Book Now
            </button>
            <UserData 
              imageLink="https://img.freepik.com/premium-vector/user-icon-vector_1272330-86.jpg" 
              name="Tharushi Bhagya" 
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-3">
              <a href="#home" className="text-white hover:text-amber-400 transition-colors duration-300 py-2">
                Home
              </a>
              <a href="#about" className="text-white hover:text-amber-400 transition-colors duration-300 py-2">
                About Us
              </a>
              <a href="#stays" className="text-white hover:text-amber-400 transition-colors duration-300 py-2">
                Stays
              </a>
              <a href="#dining" className="text-white hover:text-amber-400 transition-colors duration-300 py-2">
                Dining
              </a>
              <a href="#experiences" className="text-white hover:text-amber-400 transition-colors duration-300 py-2">
                Experiences
              </a>
              <a href="#gallery" className="text-white hover:text-amber-400 transition-colors duration-300 py-2">
                Gallery
              </a>
              <a href="#contact" className="text-white hover:text-amber-400 transition-colors duration-300 py-2">
                Contact
              </a>
              <button className="px-6 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-all duration-300 w-full">
                Book Now
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;