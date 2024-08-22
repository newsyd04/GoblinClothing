import React from 'react';
import { useNavigate } from 'react-router-dom';

function ConfirmationPage() {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/products'); // Navigate to products or home page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="flex flex-col items-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Payment Successful
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Thank you for your purchase! Your order has been successfully processed.
          </p>
        </div>

        <div className="mt-8">
          <div className="text-center">
            <button
              onClick={handleContinueShopping}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Continue Shopping
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/orders')}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-green-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              View Order Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;
