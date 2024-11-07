// src/StripeContext.js
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_live_51PqYFwCbsRzgWQ8j6jCcU36X5qNDxMbjHzigJI2hRWJKdUJFnZ65cn9iuYJAzmKyUEPbAB7wNQXfDn7fPbSjyeqc00UxgoTX7O'); // Replace with your Stripe publishable key

export const StripeContext = ({ children }) => (
  <Elements stripe={stripePromise}>
    {children}
  </Elements>
);
