// src/StripeContext.js
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PqYFwCbsRzgWQ8jPHOsRoIrkCXhUb1aiSAIT4GZZVOxj8IRmx9o7v3svcH1nSMSuJY7tJkiX4ttXBD5aHtkvzKN00Krn2Xi92'); // Replace with your Stripe publishable key

export const StripeContext = ({ children }) => (
  <Elements stripe={stripePromise}>
    {children}
  </Elements>
);
