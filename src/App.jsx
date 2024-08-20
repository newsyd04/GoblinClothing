import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

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
            </>
          }
        />
        {/* You can add more routes here that include the Navbar */}
      </Routes>
    </Router>
  );
}

export default App;
