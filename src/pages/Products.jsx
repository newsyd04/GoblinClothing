import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFilter, FaSortAmountDown } from 'react-icons/fa';
import SeeAlsoComponent from '../components/SeeAlsoComponent';
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
        console.log(sortedProducts); // Log to verify the product structure
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
      console.log('Adding new item to cart:', newCartItem); // Log new cart item
      setCart(prevCart => [...prevCart, newCartItem]);
    }
    console.log('Updated cart:', cart); // Log entire cart state after addition
    setToastMessage('Item added to cart');
    setShowToast(true);
  };
 
  function handleProductClicked(product) {
    navigate(`/products/${product.name.replace(/\s+/g, '-').toLowerCase()}`,
      { state:
        {
          id: product._id,
          name: product.name,
          price: product.price,
          image:product.image,
          description: product.description,
          quantity: product.quantity
        } 
      });
  }

  return (
    <>
      <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />

      <div className="min-h-screen bg-gray-100">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className='flex flex-col'>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Products</h2>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="flex space-x-4 w-full md:w-auto">
                <button className="flex items-center bg-white shadow-md px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-200 w-full md:w-auto justify-center">
                  <FaFilter className="mr-2" /> Filters
                </button>
                <div className="relative w-full md:w-auto">
                  <button
                    className="flex items-center bg-white shadow-md px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-200 w-full md:w-auto justify-center"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <FaSortAmountDown className="mr-2" /> Sort by
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
                <p className="text-gray-700 hidden md:block">Showing {filteredProducts.length} results</p>
              </div>
            </div>
            <div className="md:hidden text-gray-700 mb-4 text-center">
              Showing {filteredProducts.length} results
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full cursor-pointer"
              onClick={() => {handleProductClicked(product)}}>
                <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                <div className="flex flex-col flex-grow p-4">
                  <div className="text-lg font-bold text-gray-900 mb-2">{product.name}</div>
                  <div className="text-green-700 font-bold mb-4">{product.price} Shnargles</div>
                  <button
                  // will we add check to see the amount in cart to disable too?
                    className={product.quantity<=0 ? 
                      "mt-auto w-full bg-gray-300 text-white py-2 px-4 rounded-md text-center cursor-not-allowed" 
                      : "mt-auto w-full bg-green-700 text-white py-2 px-4 rounded-md text-center hover:bg-green-900 transition duration-300 cursor-pointer"}
                    disabled={product.quantity <= 0}
                    onClick={(e) => addToCart(product, e)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default ProductsPage;
