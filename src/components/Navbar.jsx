import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaTimes } from 'react-icons/fa';
import logo from '../assets/GoblinClothingLogo.png';
import Toast from '../components/Toast';

function Navbar({ cart, setCart }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false); // State for showing search on mobile
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    setToastMessage('Item removed from cart');
    setShowToast(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/search-results', { state: { searchQuery } });
    }
  };

  const MenuLinks = ({ toggleMenu }) => (
    <>
      <Link
        to="/products"
        className="text-white block px-3 py-2 rounded-md text-base font-bold"
        onClick={toggleMenu}
      >
        Fashion
      </Link>
      <Link
        to="/coins"
        className="text-white block px-3 py-2 rounded-md text-base font-bold"
        onClick={toggleMenu}
      >
        Coins
      </Link>
      <Link
        to="/amulets"
        className="text-white block px-3 py-2 rounded-md text-base font-bold"
        onClick={toggleMenu}
      >
        Amulets
      </Link>
      <Link
        to="/scraps"
        className="text-white block px-3 py-2 rounded-md text-base font-bold"
        onClick={toggleMenu}
      >
        Scraps
      </Link>
    </>
  );

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center md:hidden">
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

            <div className="flex-1 flex items-center justify-center md:relative md:justify-start">
              <Link to="/" className="flex items-center text-white text-2xl font-bold">
                <img src={logo} alt="Goblin Clothing Logo" className="h-8 w-8 mr-2" />
                <span>Goblin Clothing</span>
              </Link>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative flex items-center w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button type="submit" className="absolute right-0 pr-3">
                  <FaSearch className="text-gray-500 hover:text-indigo-500" />
                </button>
              </form>
            </div>

            {/* Mobile Search Icon */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsSearchActive(!isSearchActive)}
                className="text-white hover:bg-green-700 p-2 rounded-full focus:outline-none"
              >
                <FaSearch className="h-6 w-6" />
              </button>
            </div>

            <div className="flex items-center justify-end md:hidden relative">
              <Link
                to="/cart"
                className="text-white hover:bg-green-700 p-2 rounded-full focus:outline-none"
              >
                <FaShoppingCart className="h-6 w-6" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cart.length}
                </span>
              </Link>
            </div>

            <div className="hidden md:flex space-x-4 items-center">
              <div className="relative">
                <button
                  onClick={toggleCart}
                  className="text-white hover:bg-green-700 p-2 rounded-full focus:outline-none"
                >
                  <FaShoppingCart className="h-6 w-6" />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {cart.length}
                  </span>
                </button>
                {isCartOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
                    <h2 className="font-bold text-lg mb-2">Your Cart</h2>
                    {cart.length > 0 ? (
                      <ul>
                        {cart.map(item => (
                          <li key={item.productId} className="flex justify-between items-center text-sm mb-2">
                            <span>{item.name} (x{item.quantity})</span>
                            <div className="flex items-center space-x-2">
                              <span>{item.price}</span>
                              <button
                                className="text-red-600 hover:text-red-900 font-bold"
                                onClick={() => removeFromCart(item.productId)}
                              >
                                Remove
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600">Your cart is empty.</p>
                    )}
                    <Link
                      to="/cart"
                      className="block mt-4 text-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Go to Cart
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sub-Navbar for Desktop */}
      <div className="bg-green-500 hidden md:flex justify-center space-x-8 py-1">
        <MenuLinks />
      </div>

      {/* Mobile Search Bar Sub-Navbar */}
      {isSearchActive && (
        <div className="bg-green-500 md:hidden py-2">
          <div className="flex items-center justify-between px-4">
            <form onSubmit={handleSearch} className="flex items-center w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </form>
            <button
              onClick={() => setIsSearchActive(false)}
              className="text-white hover:bg-green-700 p-2 rounded-full focus:outline-none"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Items */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-green-600 px-2 pt-2 pb-3 space-y-1">
          <MenuLinks toggleMenu={toggleMobileMenu} />
        </div>
      )}
    </>
  );
}

export default Navbar;
