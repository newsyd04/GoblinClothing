// src/components/CheckoutForm.jsx
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CheckoutForm({ cart, total }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
  
    if (error) {
      console.error('[Error]', error);
    } else {
      const response = await fetch('https://api.goblinclothing.com/api/products/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, paymentMethodId: paymentMethod.id }),
      });
  
      const paymentIntent = await response.json();
  
      if (paymentIntent.error) {
        console.error('[PaymentIntent Error]', paymentIntent.error);
      } else {
        const { error: confirmError } = await stripe.confirmCardPayment(paymentIntent.client_secret);
  
        if (confirmError) {
          console.error('[Payment Confirmation Error]', confirmError);
        } else {
          console.log('Payment successful!');
          // Redirect to success page or show success message
        }
      }
    }
  };  

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe} className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md">
        Pay {total} Shnargles
      </button>
    </form>
  );
}

export default CheckoutForm;
