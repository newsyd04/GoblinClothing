// CartPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js'; // Import Stripe
import api from '../api';
import Toast from '../components/Toast';

const stripePromise = loadStripe('pk_live_51PqYFwCbsRzgWQ8j6jCcU36X5qNDxMbjHzigJI2hRWJKdUJFnZ65cn9iuYJAzmKyUEPbAB7wNQXfDn7fPbSjyeqc00UxgoTX7O'); // Replace with your actual Stripe publishable key

function CartPage({ cart, setCart }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const productIds = cart.map(item => item.productId.substring(0, 24));
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

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Your Cart - Goblin Clothing';
  }, []);

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
      const product = cartProducts.find(p => p._id === item.productId.substring(0, 24)); // Match directly with _id
      return total + (product ? Number(product.price) * Number(item.quantity) : 0);
    }, 0).toFixed(2);
  };

  const handlePayment = async () => {
    if (cart.length === 0) {
      setToastMessage('Your cart is empty!');
      setShowToast(true);
      return;
    }

    try {
      const stripe = await stripePromise;

      const response = await fetch('https://api.goblinclothing.com/api/products/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart }),
      });

      const session = await response.json();

      if (session.error) {
        setToastMessage('Error initiating payment process.');
        setShowToast(true);
        console.error('[Checkout Session Error]', session.error);
        return;
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error('[Stripe Checkout Error]', result.error.message);
        setToastMessage('Payment process failed.');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error during payment process:', error);
      setToastMessage('An error occurred during the payment process.');
      setShowToast(true);
    }
  };

  return (
    <>
      <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
          {cart.length > 0 ? (
            <div>
              <ul>
                {cart.map(item => {
                  const product = cartProducts.find(p => p._id === item.productId.substring(0, 24));
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
                  onClick={handlePayment}
                  className="bg-green-600 text-white py-3 px-6 rounded-md shadow hover:bg-green-700 transition duration-300"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-700">Your cart is empty.</p>
              <button
                onClick={() => navigate('/products')}
                className="bg-green-600 text-white py-3 px-6 rounded-md shadow hover:bg-green-700 transition duration-300 mt-4"
              >
                Return to shopping
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CartPage;
