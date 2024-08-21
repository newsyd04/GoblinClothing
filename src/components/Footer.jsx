import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-green-900 text-green-200 p-6 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Brand Logo or Name */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold font-goblin">Goblin Clothing</h2>
          <p className="text-sm italic mt-1">Unleash your inner mischief</p>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="#" className="text-green-200 hover:text-green-400">
            <FaFacebook size="1.5em" />
          </a>
          <a href="#" className="text-green-200 hover:text-green-400">
            <FaInstagram size="1.5em" />
          </a>
          <a href="#" className="text-green-200 hover:text-green-400">
            <FaTwitter size="1.5em" />
          </a>
        </div>

        {/* Footer Links */}
        <div className="text-center md:text-right">
          <ul className="flex flex-col md:flex-row md:space-x-6 text-sm">
            <li>
              <a href="/home" className="hover:text-green-400">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-green-700 mt-6 pt-4">
        <p className="text-center text-xs text-green-400">
          © 2024 Goblin Clothing. All rights reserved.
        </p>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-1/3 h-1/3 bg-gradient-to-r from-green-700 to-green-900 rounded-full blur-3xl opacity-20"></div>
      </div>
    </footer>
  );
}

export default Footer;
