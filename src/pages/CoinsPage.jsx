import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSortAmountDown, FaStar } from 'react-icons/fa';
import api from '../api';
import Toast from '../components/Toast';
import { SiZabka } from 'react-icons/si';

function CoinsPage({ cart, setCart }) {
  const [coins, setCoins] = useState([]);
  const [sortOption, setSortOption] = useState('lowToHigh');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchQuery = location.state?.searchQuery || '';
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        console.log('Fetched Products:', response.data); // Log fetched products
  
        // Filter for items of type 'coin'
        let filteredCoins = response.data.filter(item => item.type === 'coin');
  
        // Sort coins based on the selected sort option
        if (sortOption === 'lowToHigh') {
          filteredCoins = filteredCoins.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'highToLow') {
          filteredCoins = filteredCoins.sort((a, b) => b.price - a.price);
        }
  
        setCoins(filteredCoins);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [sortOption]); // Re-fetch when sortOption changes  

  const addToCart = (coin, e) => {
    e.stopPropagation();

    const existingProduct = cart.find(item => item.productId === coin._id);

    if (existingProduct) {
      setCart(prevCart =>
        prevCart.map(item =>
          item.productId === coin._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const newCartItem = {
        productId: coin._id,
        name: coin.name,
        price: coin.price,
        quantity: 1,
        size: null, 
      };
      setCart(prevCart => [...prevCart, newCartItem]);
    }
    setToastMessage('Coin added to cart');
    setShowToast(true);
  };

  const handleCoinClicked = (coin) => {
    navigate(`/products/${coin.name.replace(/\s+/g, '-').toLowerCase()}`, {
      state: {
        id: coin._id,
        name: coin.name,
        price: coin.price,
        image: coin.image,
        description: coin.description,
        quantity: coin.quantity,
        type: coin.type,
        isSizeable: coin.isSizeable,
      },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Coins - Goblin Clothing';
  }, []);

  return (
    <>
      <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
      <div className="min-h-screen bg-gray-100">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">OUR COINS</h2>
          <div className="flex justify-between items-center mb-6 gap-4">
            <div className="relative">
              <button
                className="flex items-center bg-white shadow-md px-4 py-2 rounded-lg hover:bg-gray-200"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FaSortAmountDown className="mr-2" /> SORT BY
              </button>
              {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute bg-white shadow-lg rounded-lg mt-2 z-10">
                  <div
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => { setSortOption('lowToHigh'); setIsDropdownOpen(false); }}
                  >
                    Price low to high
                  </div>
                  <div
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => { setSortOption('highToLow'); setIsDropdownOpen(false); }}
                  >
                    Price high to low
                  </div>
                </div>
              )}
            </div>
            <p className="text-gray-700">SHOWING {coins.length} RESULTS</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {coins.map((product) => (
                <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full cursor-pointer transform hover:scale-105 transition duration-300"
                  onClick={() => { handleCoinClicked(product) }}>
                  <img src={product.image} alt={product.name} className="w-full h-60 object-cover" />
                  <div className="flex flex-col items-center  flex-grow p-6">
                    <div className="text-sm font-bold text-gray-900 mb-3" 
                      style={{ 
                        fontFamily: "'Poppins', sans-serif", 
                        lineHeight: '1.6', 
                        letterSpacing: '0.5px', 
                        color: '#2c3e50' 
                      }}>
                    {product.name}
                    </div>
                    <div className="text-green-700 font-bold text-sm mb-4" 
                        style={{ 
                          fontFamily: "'Poppins', sans-serif", 
                          fontWeight: '500', 
                          letterSpacing: '0.3px', 
                          lineHeight: '1.5',
                          color: '#27ae60'
                        }}>
                      {product.price} Shnargles
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </main>
      </div>
    </>
  );
}

export default CoinsPage;
  