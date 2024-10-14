import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaFilter, FaSortAmountDown } from 'react-icons/fa';
import api from '../api';
import Toast from '../components/Toast';

function SearchResultsPage({ cart, setCart }) {
  const [allProducts, setAllProducts] = useState([]); // Store all products
  const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered products
  const [sortOption, setSortOption] = useState('lowToHigh'); // Sort option state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products'); // Fetch all products
        setAllProducts(response.data); // Store all products in state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Fetch once on component mount

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Search results for: ' + searchQuery + ' - Goblin Clothing';
  }, [searchQuery]);

  useEffect(() => {
    // Filter and sort products on the frontend based on the search query
    let results = allProducts;

    if (searchQuery) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products based on the selected sort option
    switch (sortOption) {
      case 'lowToHigh':
        results = results.sort((a, b) => a.price - b.price);
        break;
      case 'highToLow':
        results = results.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(results); // Update filtered products state
  }, [searchQuery, allProducts, sortOption]); // Re-run this filter when searchQuery, allProducts, or sortOption change

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.productId === product._id);
    if (existingProduct) {
      setCart(prevCart =>
        prevCart.map(item =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const newCartItem = {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1
      };
      setCart(prevCart => [...prevCart, newCartItem]);
    }
    setToastMessage('Item added to cart');
    setShowToast(true);
  };

  return (
    <>
      <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />

      <div className="min-h-screen bg-gray-100">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className='flex flex-col'>
            <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">SEARCH RESULTS FOR: {searchQuery}</h2>
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex space-x-4 w-full md:w-auto">
                  <button className="flex items-center bg-white shadow-md px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-200 w-full md:w-auto justify-center">
                    <FaFilter className="mr-2" /> FILTERS
                  </button>
                  <div className="relative w-full md:w-auto">
                    <button
                      className="flex items-center bg-white shadow-md px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-200 w-full md:w-auto justify-center"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <FaSortAmountDown className="mr-2" /> SORT BY
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute bg-white shadow-lg rounded-lg mt-2 z-10">
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
                </div>
                <div className="flex items-center space-x-4 w-full md:w-auto mt-4 md:mt-0">
                  <p className="text-gray-700 hidden md:block">SHOWING {filteredProducts.length} RESULTS</p>
                </div>
              </div>
              <div className="md:hidden text-gray-700 mb-4 text-center">
                SHOWING {filteredProducts.length} RESULTS
              </div>
            </div>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
                    <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                    <div className="flex flex-col flex-grow p-4">
                      <div className="text-lg font-bold text-gray-900 mb-2">{product.name}</div>
                      <div className="text-gray-700 mb-4 flex-grow">{product.description}</div>
                      <div className="text-green-700 font-bold mb-4">{product.price} Shnargles</div>
                      <div
                        className="mt-auto w-full bg-green-900 text-white py-2 px-4 rounded-md text-center hover:bg-green-700 transition duration-300 cursor-pointer"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-700">No products found for your search query.</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default SearchResultsPage;
