import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import ProductsPage from './pages/Products';
import Footer from './components/Footer';
import CheckoutPage from './pages/CheckoutPage';
import CoinsPage from './pages/CoinsPage';
import AmuletsPage from './pages/AmuletsPage';
import ScrapsPage from './pages/ScrapsPage';
import CartPage from './components/CartPage';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <Navbar cart={cart} setCart={setCart} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <>
              <HomePage />
              <Footer />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <ProductsPage cart={cart} setCart={setCart} />
              <Footer />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <CheckoutPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <CartPage cart={cart} setCart={setCart} />
              <Footer />
            </>
          }
        />
        <Route
          path="/coins"
          element={
            <>
              <CoinsPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/amulets"
          element={
            <>
              <AmuletsPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/scraps"
          element={
            <>
              <ScrapsPage />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
