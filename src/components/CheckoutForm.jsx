// CheckoutForm.jsx
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const stripePromise = loadStripe('your-publishable-key-here'); // Replace with your actual Stripe publishable key

function CheckoutForm({ cart, total }) {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch('https://api.goblinclothing.com/api/products/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart }),
    });

    const session = await response.json();

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
      onClick={handleCheckout}
      className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md"
    >
      Pay {total} Shnargles
    </button>
  );
}

export default CheckoutForm;
