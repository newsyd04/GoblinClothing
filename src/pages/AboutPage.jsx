import React, { useState, useEffect } from 'react';
import goblin1 from '../assets/goblin1.png';
import goblin3 from '../assets/goblin3.png';
import goblin4 from '../assets/goblin4.png';
import goblin5 from '../assets/goblin5.png';
import goblinAbout7 from '../assets/goblin-about7.png';
import goblinAbout5 from '../assets/goblin-about5.png';
import goblinAbout2 from '../assets/goblin-about2.png';

const AboutPage = () => {
  const slides = [goblin1, goblin3, goblin4, goblin5];
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 100);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <div className="relative overflow-hidden h-64 sm:h-96 md:h-[28rem] lg:h-[38rem] flex justify-center items-center bg-black">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Goblin Slideshow ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              index === slideIndex ? 'opacity-100' : 'opacity-15'
            }`}
          />
        ))}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="text-white text-xl sm:text-3xl lg:text-4xl font-bold text-center px-4"
            style={{
              fontFamily: "'Goblin One', sans-serif",
              textDecoration: 'none',
              textShadow: '2px 2px 2px green',
            }}
          >
            Embrace Your Goblin Nature:
          </div>
          <div className="text-white text-lg sm:text-2xl lg:text-3xl text-center mt-2 px-4">
            Wear the Mischief Today
          </div>
        </div>
      </div>

      <div className="container mx-auto p-8 sm:p-12 md:p-24">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 p-12">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center md:text-left">What is Goblin Clothing</h2>
            <p className="text-base sm:text-lg lg:text-xl font-medium mb-4 text-center md:text-left">
              Goblin Clothing is an avant-garde fashion brand that caters to those with an unapologetically mischievous and whimsical spirit. Embracing the mystique and allure of goblins, our brand offers a captivating range of clothing and accessories that allow you to express your unique style in the most enchanting way possible.
            </p>
          </div>
          <img
            src={goblinAbout7}
            alt="Logo Icon"
            className="w-2/4 sm:w-2/3 md:w-1/3 lg:w-1/5 max-w-sm mx-auto"
          />
        </div>

        <div className="bg-gray-100 rounded-lg flex flex-col p-8 sm:p-8 md:p-12 items-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center">How We Stand Out</h2>

          <div className="flex flex-col md:flex-row items-center justify-between my-2">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center md:text-left">The Goblin Spirit</h3>
              <p className="text-base sm:text-lg lg:text-xl font-medium mb-4 text-center md:text-left">
                At Goblin Clothing, we believe that fashion should be a form of self-expression, and what better way to do so than by channeling the mischievous charm and eccentricity of goblins? Our designs are meticulously crafted to capture the essence of these mythical creatures, offering a blend of fantasy, creativity, and contemporary fashion trends.
              </p>
            </div>
            <img
              src={goblinAbout5}
              alt="Very Cool Goblin"
              className="w-2/4 sm:w-2/3 md:w-1/3 lg:w-1/5 max-w-sm mx-auto"
            />
          </div>

          <hr className="w-full border-t-2 border-gray-200 my-8" />

          <div className="flex flex-col md:flex-row-reverse items-center justify-between mt-4">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center md:text-left">Join The Goblin Revolution</h3>
              <p className="text-base sm:text-lg lg:text-xl font-medium mb-4 text-center md:text-left">
                When it comes to our clothing line, expect a kaleidoscope of colors, textures, and patterns that bring goblin aesthetics to life. From intricately detailed hoodies and t-shirts adorned with goblin motifs to flamboyant dresses and skirts that exude playful energy, each garment is carefully designed to make a bold statement. Our attention to detail ensures that even the most discerning goblin enthusiast will find something truly extraordinary.
              </p>
            </div>
            <img
              src={goblinAbout2}
              alt="Cool Goblin"
              className="w-2/4 sm:w-2/3 md:w-1/3 lg:w-1/5 max-w-sm mx-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
