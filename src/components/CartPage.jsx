// CartPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa';  // Import icons
import api from '../api';
import Toast from '../components/Toast'; // Import the Toast component
import SeeAlsoComponent from './SeeAlsoComponent';

function CartPage({ cart, setCart }) {
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const productIds = cart.map(item => item.productId);
        if (productIds.length > 0) {
          const response = await api.post('/products/bulk', { ids: productIds });
          setCartProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };
    fetchCartProducts();
  }, [cart]);

  const handleQuantityChange = (productId, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const handleRemove = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    setToastMessage('Item removed from cart');
    setShowToast(true);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const product = cartProducts.find(p => p._id === item.productId);
      return total + (product ? Number(product.price) * Number(item.quantity) : 0);
    }, 0).toFixed(2);
  };

  const handleCheckout = () => {
    console.log('Cart contents before checkout:', cart); // Log cart contents
    const total = calculateTotal(); // Calculate the total
    console.log('Total amount:', total); // Log the total
  
    navigate('/checkout', {
      state: {
        cartProducts: cart, // Passing the cart to the checkout page
        total: total
      }
    });
  };  

  return (
    <><Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
        {cart.length > 0 ? (
          <div>
            <ul>
              {cart.map(item => {
                const product = cartProducts.find(p => p._id === item.productId);
                return (
                  <li key={item.productId} className="flex justify-between items-center mb-4 p-4 bg-white shadow-md rounded-lg">
                    {product && (
                      <>
                        <div className="flex items-center">
                          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div className="ml-4">
                            <h2 className="text-lg font-bold">{product.name}</h2>
                            <p className="text-gray-600">{product.price} Shnargles</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <button
                              className="bg-gray-400 text-white p-2 rounded-full shadow-md hover:bg-gray-500 transition duration-200 focus:outline-none"
                              onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                            >
                              <FaMinus />
                            </button>
                            <span className="text-lg font-bold px-4">{item.quantity}</span>
                            <button
                              className="bg-gray-400 text-white p-2 rounded-full shadow-md hover:bg-gray-500 transition duration-200 focus:outline-none"
                              onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                            >
                              <FaPlus />
                            </button>
                          </div>
                          <button
                            className="text-red-600 hover:text-red-800 font-bold"
                            onClick={() => handleRemove(item.productId)}
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="text-right text-lg font-bold mt-8">
              Total: {calculateTotal()} Shnargles
            </div>
            <div className="text-right mt-8">
              <button
                onClick={handleCheckout}
                className="bg-green-600 text-white py-3 px-6 rounded-md shadow hover:bg-green-700 transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <><p className="text-gray-700">Your cart is empty.</p><button onClick={() => navigate('/products')} className="bg-green-600 text-white py-3 px-6 rounded-md shadow hover:bg-green-700 transition duration-300 mt-4">Return to shopping</button></>
        )}
      </div>
    </div></>
  );
}

export default CartPage;
