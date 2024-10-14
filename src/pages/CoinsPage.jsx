import React, {useEffect} from 'react';
import { FaFilter, FaSortAmountDown, FaShoppingCart, FaStar } from 'react-icons/fa';
import coinImage1 from '../assets/Coins1.png';
import coinImage2 from '../assets/Coins2.png';
import coinImage3 from '../assets/Coins3.png';
import coinImage4 from '../assets/Coins4.png';

function CoinsPage() {
  const coins = [
    { id: 1, name: 'Golden Coin', price: '$99.99', image: coinImage1, rating: 5 },
    { id: 2, name: 'Silver Coin', price: '$49.99', image: coinImage2, rating: 4 },
    { id: 3, name: 'Bronze Coin', price: '$19.99', image: coinImage3, rating: 3 },
    { id: 4, name: 'Platinum Coin', price: '$199.99', image: coinImage4, rating: 5 },
    { id: 1, name: 'Golden Coin', price: '$99.99', image: coinImage1, rating: 5 },
    { id: 2, name: 'Silver Coin', price: '$49.99', image: coinImage2, rating: 4 },
    { id: 3, name: 'Bronze Coin', price: '$19.99', image: coinImage3, rating: 3 },
    { id: 4, name: 'Platinum Coin', price: '$199.99', image: coinImage4, rating: 5 },
    { id: 1, name: 'Golden Coin', price: '$99.99', image: coinImage1, rating: 5 },
    { id: 2, name: 'Silver Coin', price: '$49.99', image: coinImage2, rating: 4 },
    { id: 3, name: 'Bronze Coin', price: '$19.99', image: coinImage3, rating: 3 },
    { id: 4, name: 'Platinum Coin', price: '$199.99', image: coinImage4, rating: 5 },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Coins - Goblin Clothing';
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className='flex flex-col'>
            <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">OUR COINS</h2>
            </div>
            <div className="flex justify-between items-center mb-6 gap-4">
            <div className="flex space-x-4">
                <button className="flex items-center bg-white shadow-md px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-200">
                <FaFilter className="mr-2" /> FILTERS
                </button>
                <button className="flex items-center bg-white shadow-md px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-200">
                <FaSortAmountDown className="mr-2" /> SORT BY
                </button>
            </div>
            <p className="text-gray-700">SHOWING 12 RESULTS</p>
            </div>
        </div>
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coins.map((coin) => (
            <div key={coin.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-bold text-gray-800">{coin.name}</h2>
              <div className="flex items-center mt-2">
                {[...Array(coin.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 text-sm" />
                ))}
              </div>
              <p className="text-green-600 text-xl font-bold my-2">{coin.price}</p>
              <button className="mt-auto bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoinsPage;
