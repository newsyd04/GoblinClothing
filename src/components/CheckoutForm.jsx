// CheckoutForm.jsx
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const stripePromise = loadStripe('pk_test_51PqYFwCbsRzgWQ8jPHOsRoIrkCXhUb1aiSAIT4GZZVOxj8IRmx9o7v3svcH1nSMSuJY7tJkiX4ttXBD5aHtkvzKN00Krn2Xi92'); // Replace with your actual Stripe publishable key

function CheckoutForm({ cart, total, email, name, address1, address2, city, county, eircode, country }) {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const checkoutClicked = () => {
    let passed = checkCheckout();
    if (!passed) {
      return;
    }
    handleCheckout();
  };

  const checkCheckout = () => {
    if (!email || !name || !address1 || !city || !county || !eircode || !country) {
      alert('Please fill out all required fields.');
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
    <button
      onClick={checkoutClicked}
      className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md"
    >
      Pay {total} Shnargles
    </button>
  );
}

export default CheckoutForm;
