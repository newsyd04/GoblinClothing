import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const MenuLinks = ({ toggleMenu }) => (
    <>
      <Link
        to="/about"
        className="text-white hover:bg-green-700 block px-3 py-2 rounded-md text-base font-bold"
        onClick={toggleMenu}
      >
        Fashion
      </Link>
      <Link
        to="/coins"
        className="text-white hover:bg-green-700 block px-3 py-2 rounded-md text-base font-bold"
        onClick={toggleMenu}
      >
        Coins
      </Link>
      <Link
        to="#"
        className="text-white hover:bg-green-700 block px-3 py-2 rounded-md text-base font-bold"
        onClick={toggleMenu}
      >
        Amulets
      </Link>
      <Link
        to="#"
        className="text-white hover:bg-green-700 block px-3 py-2 rounded-md text-base font-bold"
        onClick={toggleMenu}
      >
        Scraps
      </Link>
    </>
  );

  return (
    <nav className="bg-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold">
              Goblin Clothing
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <MenuLinks />
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white inline-flex items-center justify-center p-2 rounded-md hover:bg-green-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MenuLinks toggleMenu={toggleMobileMenu} />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
