// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Goblinpic from '../assets/goblinPic.png';

function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-gray-100 p-4">
      <img
        alt="goblin logo"
        src={Goblinpic}
        className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 h-auto"
      />
      <div className="text-center mt-8">
        <Link
          to="/home"
          className="text-black text-4xl sm:text-5xl lg:text-6xl font-bold"
          style={{
            fontFamily: "'Goblin One', sans-serif",
            textDecoration: "none",
            textShadow: "2px 2px 2px green",
          }}
        >
          Goblin Clothing
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
