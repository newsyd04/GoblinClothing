import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import logo from '../assets/GoblinClothingLogo.png';
import Toast from '../components/Toast';

function Navbar({ cart, setCart }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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

  const MenuLinks = ({ toggleMenu }) => (
    <>
      <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
      <Link
        to="/products"
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
        to="/amulets"
        className="text-white hover:bg-green-700 block px-3 py-2 rounded-md text-base font-bold"
        onClick={toggleMenu}
      >
        Amulets
      </Link>
      <Link
        to="/scraps"
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
            <MenuLinks />
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
