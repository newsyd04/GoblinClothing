// CheckoutForm.jsx
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Toast from './Toast';

const stripePromise = loadStripe('pk_live_51PqYFwCbsRzgWQ8j6jCcU36X5qNDxMbjHzigJI2hRWJKdUJFnZ65cn9iuYJAzmKyUEPbAB7wNQXfDn7fPbSjyeqc00UxgoTX7O'); // Replace with your actual Stripe publishable key

function CheckoutForm({ cart, total, email, name, address1, address2, city, county, eircode, country }) {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const checkoutClicked = () => {
    let passed = checkCheckout();
    if (!passed) {
      return;
    }
    handleCheckout();
  };

  const checkCheckout = () => {
    if (!email || !name || !address1 || !city || !county || !eircode || !country) {
      setToastMessage('Please fill out all required fields.');
      setShowToast(true);
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;
  
    const response = await fetch('https://api.goblinclothing.com/api/products/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart }),
    });
  
    console.log('Response status:', response.status);
  
    // Read the response body as JSON
    const session = await response.json();
  
    // Log the JSON response
    console.log('Session data:', session);
  
    if (session.error) {
      console.error('[Checkout Session Error]', session.error);
    } else {
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
  
      if (result.error) {
        console.error('[Stripe Checkout Error]', result.error.message);
      }
    }
  };

  return (
    <>
      <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />

      <button
        onClick={checkoutClicked}
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md"
      >
        Pay {total} Shnargles
      </button>
    </>
  );
}

export default CheckoutForm;
