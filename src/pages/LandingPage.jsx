import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Goblinpic from '../assets/goblinPic.png';
import MonkeySong from '../assets/monkey.mp3';

function LandingPage() {
  useEffect(() => {
    const audio = new Audio(MonkeySong);

    // Try to play the audio automatically
    audio.play().catch(() => {
      // If autoplay fails (e.g., in Chrome), wait for user interaction
      console.log('Autoplay failed, waiting for user interaction');
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleImageClick = () => {
    const audio = new Audio(MonkeySong);
    audio.play();
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-gray-100 p-4">
      <img
        alt="goblin logo"
        src={Goblinpic}
        className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 h-auto"
        onClick={handleImageClick} // Play the sound on image click
        style={{ cursor: 'pointer' }} // Change cursor to indicate interactivity
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
