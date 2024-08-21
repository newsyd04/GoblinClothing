import React from 'react';
import { FaStar } from 'react-icons/fa';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';

function SeeAlsoComponent() {
  const items = [
    { id: 1, name: 'Historic Tiara', price: '32 Shnargles', image: image1 },
    { id: 2, name: 'Golden Belt', price: '24 Shnargles', image: image2 },
    { id: 3, name: 'Tattered Scraps', price: '5 Shnargles', image: image3 },
    { id: 4, name: 'Crusty Ruby', price: '56 Shnargles', image: image4 },
    { id: 1, name: 'Historic Tiara', price: '32 Shnargles', image: image1 },
    { id: 2, name: 'Golden Belt', price: '24 Shnargles', image: image2 },
    { id: 3, name: 'Tattered Scraps', price: '5 Shnargles', image: image3 },
    { id: 4, name: 'Crusty Ruby', price: '56 Shnargles', image: image4 },
    { id: 1, name: 'Historic Tiara', price: '32 Shnargles', image: image1 },
    { id: 2, name: 'Golden Belt', price: '24 Shnargles', image: image2 },
    { id: 3, name: 'Tattered Scraps', price: '5 Shnargles', image: image3 },
    { id: 4, name: 'Crusty Ruby', price: '56 Shnargles', image: image4 },
    { id: 1, name: 'Historic Tiara', price: '32 Shnargles', image: image1 },
    { id: 2, name: 'Golden Belt', price: '24 Shnargles', image: image2 },
    { id: 3, name: 'Tattered Scraps', price: '5 Shnargles', image: image3 },
    { id: 4, name: 'Crusty Ruby', price: '56 Shnargles', image: image4 },
  ];

  return (
    <div className="container mx-auto p-4 bg-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-start p-2">Customers also bought:</h1>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-64 bg-white shadow-lg rounded-lg p-4"
            style={{ minWidth: '250px' }} // Ensures proper sizing in carousel
          >
            <div className="mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
            <p className="text-base font-semibold text-gray-700 mb-2">{item.name}</p>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500 text-sm" />
              ))}
            </div>
            <h2 className="text-lg font-bold text-green-600">{item.price}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeeAlsoComponent;
