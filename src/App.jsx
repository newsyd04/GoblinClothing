import React from 'react';
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

function App() {
  return (
    <Router>
      <Routes>
        {/* LandingPage route without Navbar */}
        <Route path="/" element={<LandingPage />} />

        {/* All other routes with Navbar */}
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <HomePage />
              <Footer />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <Navbar />
              <ProductsPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <CheckoutPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/coins"
          element={
            <>
              <Navbar />
              <CoinsPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/amulets"
          element={
            <>
              <Navbar />
              <AmuletsPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/scraps"
          element={
            <>
              <Navbar />
              <ScrapsPage />
              <Footer />
            </>
          }
        />
        {/* You can add more routes here that include the Navbar */}
      </Routes>
    </Router>
  );
}

export default App;
