import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';

function CheckoutPage() {
  const location = useLocation();
  const { cartProducts, total } = location.state || {}; // Access total directly
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Checkout - Goblin Clothing';
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
          <ul className="mb-6">
            {cartProducts.map(item => (
              <li key={item.productId} className="flex justify-between text-sm text-gray-700 mb-2">
                <span>{item.name} {item.size ? item.size : ''} (x{item.quantity})</span>
                <span>{(item.price * item.quantity).toFixed(2)} Shnargles</span>
              </li>
            ))}
            <li className="flex justify-between text-sm text-gray-700 font-bold">
              <span>Total</span>
              <span>{total} Shnargles</span> {/* Use the passed total */}
            </li>
          </ul>
          <CheckoutForm cart={cartProducts} total={total} />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
