import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import goblin1 from '../assets/goblin1.png';
import goblin3 from '../assets/goblin3.png';
import goblin4 from '../assets/goblin4.png';
import goblin5 from '../assets/goblin5.png';
import coins from '../assets/Coins4.png';
import scrap from '../assets/image3.png';
import amulet from '../assets/image4.png';
import api from '../api';
import gobbo from '../assets/gobbopapertexture.png'
import legobbo from '../assets/bbgobbo.png'

const HomePage = () => {
  const slides = [goblin1, goblin3, goblin4, goblin5];
  const [slideIndex, setSlideIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Use navigate for handling navigation

  // Fetch live products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products'); // Adjust API endpoint if necessary
        const productData = response.data;
        setProducts(productData); // Set fetched products to state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Slideshow interval for Goblin images
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 100);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Goblin Clothing';
  }, []);

  // Handle product click to navigate to product page
  function handleProductClicked(product) {
    navigate(`/products/${product.name.replace(/\s+/g, '-').toLowerCase()}`,
      product.isSizeable ? ({
        state: {
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          quantity: product.quantity,
          type: product.type,
          isSizeable: product.isSizeable,
          smallQuantity: product.smallQuantity,
          mediumQuantity: product.mediumQuantity,
          largeQuantity: product.largeQuantity,
          xlQuantity: product.xlQuantity
        }
      }) :
      {
        state: {
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          quantity: product.quantity,
          type: product.type,
          isSizeable: product.isSizeable
        }
      });
  }

  const categories = [
    { image: goblin1, title: 'FASHION', link: '/products' },
    { image: coins, title: 'COINS', link: '/coins' },
    { image: amulet, title: 'AMULETS', link: '/amulets' },
    { image: scrap, title: 'SCRAPS', link: '/scraps' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Detect screen size to enable carousel mode on mobile only
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    handleResize(); // Check on initial render
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const touchDifference = touchStartX - touchEndX;
    const swipeThreshold = 50; // Minimum swipe distance to trigger slide

    if (touchDifference > swipeThreshold) {
      // Swiped left
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    } else if (touchDifference < -swipeThreshold) {
      // Swiped right
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? categories.length - 1 : prevIndex - 1
      );
    }
  };


  return (
    <>
      {/* Header Image / Goblin Slideshow */}
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
            Embrace Your Goblin Nature
          </div>
          <div 
            className="text-white text-lg sm:text-2xl lg:text-3xl text-center mt-2 px-4 font-extrabold"
            style={{ fontFamily: "'Bebas Neue'" }}
          >
            - WEAR THE MISCHIEF TODAY -
          </div>
        </div>
      </div>


      {/* Latest Arrivals Scrollable Section */}
      <div className="container mx-auto p-8">
        <div className="overflow-x-auto flex space-x-4 py-4 no-scrollbar">
          {products.map((product, index) => (
            <div 
              key={index} 
              className="flex-none w-38 bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer relative"
            >
              <div onClick={() => handleProductClicked(product)}>
                <img src={product.image} alt={product.name} className="w-64 h-64 object-cover" />

                {/* Sold Out Badge */}
                {product.quantity === 0 && (
                  <div className="absolute bottom-2 left-2 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                    SOLD OUT
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
            
      <section id="about-section" className="bg-gray-200 flex flex-col items-center justify-center px-8 sm:px-8 py-6 sm:py-12">
  
        {/* Center Text - Always at the Top */}
        <div className="text-center flex flex-col items-center space-y-2 sm:space-y-4">
          <div className="text-lg sm:text-3xl font-extrabold text-gray-900 tracking-wide py-4"             style={{
              fontFamily: "'Goblin One', sans-serif",
              textDecoration: 'none',
              textShadow: '2px 2px 2px green',
            }}>
            GOBLIN X NBA
          </div>
        </div>

        {/* Image Section - Side by Side on Mobile, Full Size on Desktop */}
        <div className="flex flex-row gap-20 sm:gap-32 items-center">

          {/* Left Image with Overlay Effect */}
          <div className="relative w-[10rem] h-[14rem] sm:w-[24rem] sm:h-[32rem]">
            <img src={gobbo} className="absolute top-6 left-6 sm:top-10 sm:left-10 w-full h-full border-white border-4"></img>
            <img src={gobbo} className="absolute top-3 left-3 sm:top-5 sm:left-5 w-full h-full border-white border-4"></img>
            <img 
              src={gobbo} 
              className="absolute top-0 left-0 w-full h-full object-cover border-white border-4"
            />
          </div>

          {/* Right Image with Overlay Effect */}
          <div className="relative w-[10rem] h-[14rem] sm:w-[24rem] sm:h-[32rem]">
            <img src={legobbo} className="absolute top-6 right-6 sm:top-10 sm:right-10 w-full h-full border-white border-4"></img>
            <img src={legobbo} className="absolute top-3 right-3 sm:top-5 sm:right-5 w-full h-full border-white border-4"></img>
            <img 
              src={legobbo} 
              className="absolute top-0 left-0 w-full h-full object-cover border-white border-4"
            />
          </div>

        </div>

        {/* Button - Always Below */}
        <div className="text-center flex flex-col items-center mt-10 sm:mt-20">
          <Link to="/products/" className="bg-gray-100 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-lg transition-transform transform hover:scale-105">
            Shop the Collection
          </Link>
        </div>
      </section>


    </>
  );
};

export default HomePage;
