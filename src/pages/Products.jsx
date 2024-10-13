import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSortAmountDown } from 'react-icons/fa';
import api from '../api';
import Toast from '../components/Toast'; // Import the Toast component

function ProductsPage({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('lowToHigh');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const searchQuery = location.state?.searchQuery || ''; // Extract search query
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Reference for the dropdown menu

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Send search query to the backend
        const response = await api.get('/products', {
          params: { search: searchQuery },
        });
        let sortedProducts = response.data;

        switch (sortOption) {
          case 'lowToHigh':
            sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
            break;
          case 'highToLow':
            sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
            break;
          default:
            break;
        }

        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [sortOption, searchQuery]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product, e) => {
    e.stopPropagation();

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

  function handleProductClicked(product) {
    navigate(`/products/${product.name.replace(/\s+/g, '-').toLowerCase()}`,
      {
        state: {
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          quantity: product.quantity
        }
      });
  }

  // Handle closing the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />

      <div className="min-h-screen bg-gray-100">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className='flex flex-col'>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-8">OUR PRODUCTS</h2>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 w-full">
              {/* Flex container for sorting and showing results */}
              <div className="flex w-full justify-between items-center">
                <div className="relative">
                  <button
                    className="flex items-center bg-white shadow-md px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-200 justify-center text-gray-800 font-medium"
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
                {/* Showing results text aligned to the right */}
                <p className="text-gray-600 text-sm md:text-base">SHOWING {filteredProducts.length} RESULTS</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full cursor-pointer transform hover:scale-105 transition duration-300"
                  onClick={() => { handleProductClicked(product) }}>
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
                    {/* <button
                      className={product.quantity <= 0 ?
                        "mt-auto w-full bg-gray-300 text-white py-2 px-4 rounded-md text-center cursor-not-allowed"
                        : "mt-auto w-full bg-green-700 text-white py-2 px-4 rounded-md text-center hover:bg-green-900 transition duration-300 cursor-pointer"}
                      disabled={product.quantity <= 0}
                      onClick={(e) => addToCart(product, e)}
                    >
                      Add to Cart
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ProductsPage;
