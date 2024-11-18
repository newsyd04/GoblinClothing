import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/Products';
import CoinsPage from './pages/CoinsPage';
import AmuletsPage from './pages/AmuletsPage';
import ScrapsPage from './pages/ScrapsPage';
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './components/CartPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { StripeContext } from './StripeContext';
import ConfirmationPage from './pages/ConfirmationPage';
import SearchResultsPage from './pages/SearchResultsPage';
import ItemPage from './pages/ItemPage';
import NotFoundPage from './pages/NotFoundPage';
import AdsPage from './pages/AdsPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <StripeContext>
      <Router>
        <MainApp cart={cart} setCart={setCart} />
      </Router>
    </StripeContext>
  );
}

function MainApp({ cart, setCart }) {
  const location = useLocation(); // Get the current route

  return (
    <>
      {/* Conditionally render Navbar only if not on the landing page */}
      {location.pathname !== '/' && <Navbar cart={cart} setCart={setCart} />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<><HomePage /><Footer /></>} />
        <Route path="/products" element={<><ProductsPage cart={cart} setCart={setCart} /><Footer /></>} />
        <Route path='/products/:productName' element={<><ItemPage cart={cart} setCart={setCart} /><Footer /></>} />
        <Route path="/coins" element={<><CoinsPage /><Footer /></>} />
        <Route path="/amulets" element={<><AmuletsPage /><Footer /></>} />
        <Route path="/scraps" element={<><ScrapsPage /><Footer /></>} />
        <Route path="/checkout" element={<><CheckoutPage cart={cart} setCart={setCart} /><Footer /></>} />
        <Route path="/cart" element={<><CartPage cart={cart} setCart={setCart} /><Footer /></>} />
        <Route path="/payment-success" element={<><ConfirmationPage setCart={setCart} /><Footer /></>} />
        <Route path="/search-results" element={<><SearchResultsPage cart={cart} setCart={setCart} /><Footer /></>} />
        <Route path="*" element={<><NotFoundPage /><Footer /></>} />
        <Route path="/ads" element={<><AdsPage /><Footer /></>} />
        <Route path="/about" element={<><AboutPage /><Footer /></>} />
      </Routes>
    </>
  );
}

export default App;
