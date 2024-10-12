import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaTimes, FaBars } from 'react-icons/fa';
import logo from '../assets/logo.png';
import Toast from '../components/Toast';

function Navbar({ cart, setCart }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();
  const mobileSearchInputRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeModal = () => {
    setIsCartOpen(false);
    setIsSearchModalOpen(false);
    setIsMobileMenuOpen(false);
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
      setIsSearchModalOpen(false); // Close modal after search
      setSearchQuery(''); // Clear the search query
    }
  };

  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  useEffect(() => {
    if (isSearchModalOpen && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [isSearchModalOpen]);

  const MenuLinks = ({ toggleMenu }) => (
    <>
      <Link
        to="/products"
        className="text-gray-500 block px-3 py-2 rounded-md text-base font-bold"
        onClick={toggleMenu}
      >
        Fashion
      </Link>
      <Link
        to="/coins"
        className="text-gray-500 block px-3 py-2 rounded-md text-base font-bold"
        onClick={toggleMenu}
      >
        Coins
      </Link>
      <Link
        to="/amulets"
        className="text-gray-500 block px-3 py-2 rounded-md text-base font-bold"
        onClick={toggleMenu}
      >
        Amulets
      </Link>
      <Link
        to="/scraps"
        className="text-gray-500 block px-3 py-2 rounded-md text-base font-bold"
        onClick={toggleMenu}
      >
        Scraps
      </Link>
    </>
  );

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">

            {/* Left - Hamburger Menu and Search (Mobile) */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-500 p-2 rounded-md focus:outline-none md:hidden z-20"
              >
                <FaBars className="h-6 w-6" />
              </button>

              <button
                onClick={toggleSearchModal}
                className="text-gray-500 p-2 rounded-full focus:outline-none md:hidden z-20"
              >
                <FaSearch />
              </button>

              {/* Desktop Search Bar */}
              <form
                onSubmit={handleSearch}
                className="hidden md:flex items-center space-x-2 z-20"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button type="submit" className="ml-2 text-gray-400">
                  <FaSearch />
                </button>
              </form>
            </div>

            {/* Center - Logo (Always Centered) */}
            <div className="absolute inset-x-0 flex justify-center z-10">
              <Link to="/">
                <div className="flex items-center">
                  <img src={logo} className="h-24 w-auto" alt="Goblin Clothing Logo" />
                </div>
              </Link>
            </div>

            {/* Right - Cart Button */}
            <div className="flex items-center ml-auto z-20">
              <Link to="/cart" className="hidden md:block text-black font-bold mx-2">
                Cart
              </Link>
              <button
                onClick={toggleCart}
                className="relative text-black p-2 rounded-full focus:outline-none"
              >
                <FaShoppingCart className="h-6 w-6" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cart.length}
                </span>
              </button>
            </div>
          </div>
        </div>
        <hr />
      </nav>

      {/* Sub-Navbar for Desktop */}
      <div className='flex flex-col sticky top-24 z-20  '>
        <div className="bg-white hidden md:flex justify-center space-x-8 py-2 ">
          <MenuLinks />
        </div>
        <div>
          <hr />
        </div>
      </div>
      {/* Search Modal */}
      {isSearchModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
          >
            <form onSubmit={handleSearch} className="flex items-center w-full">
              <input
                ref={mobileSearchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button type="submit" className="ml-2 text-green-500">
                <FaSearch />
              </button>
            </form>
            <button
              onClick={toggleSearchModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu as a Modal (Slide in from Left) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-start z-50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 w-64 h-full shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
          >
            {/* X Button inside the menu */}
            <button
              onClick={toggleMobileMenu}
              className="text-black hover:text-green-600 absolute top-2 left-56 focus:outline-none"
            >
              <FaTimes className="h-6 w-6" />
            </button>
            <nav className="mt-8 space-y-4">
              <MenuLinks toggleMenu={toggleMobileMenu} />
            </nav>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 w-72 h-full shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
          >
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
        </div>
      )}
    </>
  );
}

export default Navbar;
