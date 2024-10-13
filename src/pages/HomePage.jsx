import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import goblin1 from '../assets/goblin1.png';
import goblin3 from '../assets/goblin3.png';
import goblin4 from '../assets/goblin4.png';
import goblin5 from '../assets/goblin5.png';
import coins from '../assets/coins4.png';
import scrap from '../assets/image3.png';
import amulet from '../assets/image4.png';
import api from '../api'; // Import your API service

const HomePage = () => {
  const slides = [goblin1, goblin3, goblin4, goblin5];
  const [slideIndex, setSlideIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Use navigate for handling navigation

  // Fetch live products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products'); // Adjust API endpoint if necessary
        const productData = response.data;
        setProducts(productData); // Set fetched products to state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Slideshow interval for Goblin images
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 100);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Handle product click to navigate to product page
  const handleProductClicked = (product) => {
    navigate(`/products/${product.name.replace(/\s+/g, '-').toLowerCase()}`, {
      state: {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity: product.quantity,
      },
    });
  };

  return (
    <>
      {/* Header Image / Goblin Slideshow */}
      <div className="relative overflow-hidden h-64 sm:h-96 md:h-[28rem] lg:h-[38rem] flex justify-center items-center bg-black">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Goblin Slideshow ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              index === slideIndex ? 'opacity-100' : 'opacity-15'
            }`}
          />
        ))}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="text-white text-xl sm:text-3xl lg:text-4xl font-bold text-center px-4"
            style={{
              fontFamily: "'Goblin One', sans-serif",
              textDecoration: 'none',
              textShadow: '2px 2px 2px green',
            }}
          >
            Embrace Your Goblin Nature
          </div>
          <div 
            className="text-white text-lg sm:text-2xl lg:text-3xl text-center mt-2 px-4 font-extrabold"
            style={{ fontFamily: "'Bobby Jones', cursive" }}
          >
            - WEAR THE MISCHIEF TODAY -
          </div>
        </div>
      </div>


      {/* Latest Arrivals Scrollable Section */}
      <div className="container mx-auto p-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center">LATEST ARRIVALS</h2>
        <div className="overflow-x-auto flex space-x-4 py-4">
          {products.map((product, index) => (
            <div key={index} className="min-w-[300px] max-w-sm bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer">
              <div onClick={() => handleProductClicked(product)}>
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                <div className="p-4 flex flex-col items-center">
                  <div
                    className="text-lg font-bold text-gray-900 mb-3"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      lineHeight: '1.6',
                      letterSpacing: '0.5px',
                      color: '#2c3e50',
                    }}
                  >
                    {product.name}
                  </div>
                  <div
                    className="text-green-700 font-bold text-sm mb-4"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: '500',
                      letterSpacing: '0.3px',
                      lineHeight: '1.5',
                      color: '#27ae60',
                    }}
                  >
                    {product.price} Shnargles
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shop by Category Section */}
      <div className="container mx-auto p-8 pb-24 bg-slate-950">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center text-white">SHOP BY CATEGORY</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Category: Fashion */}
          <Link to="/products" className="relative group bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={goblin1} className="w-full h-64 object-cover" alt="Fashion" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-white">FASHION</h3>
              <button className="mt-4 bg-white text-black font-semibold py-2 px-4 rounded shadow hover:bg-gray-200">
                SHOP NOW
              </button>
            </div>
          </Link>
          
          {/* Category: Coins */}
          <Link to="/coins" className="relative group bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={coins} className="w-full h-64 object-cover" alt="Coats & Jackets" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-white">COINS</h3>
              <button className="mt-4 bg-white text-black font-semibold py-2 px-4 rounded shadow hover:bg-gray-200">
                SHOP NOW
              </button>
            </div>
          </Link>

          {/* Category: Amulets */}
          <Link to="/amulets" className="relative group bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={amulet} className="w-full h-64 object-cover" alt="Sweaters & Hoodies" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-white">AMULETS</h3>
              <button className="mt-4 bg-white text-black font-semibold py-2 px-4 rounded shadow hover:bg-gray-200">
                SHOP NOW
              </button>
            </div>
          </Link>

          {/* Category: Scraps */}
          <Link to="/scraps" className="relative group bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={scrap} className="w-full h-64 object-cover" alt="Scraps" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-white">SCRAPS</h3>
              <button className="mt-4 bg-white text-black font-semibold py-2 px-4 rounded shadow hover:bg-gray-200">
                SHOP NOW
              </button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
