import React from 'react';
import { FaFilter, FaSortAmountDown } from 'react-icons/fa'; // Importing icons
import SeeAlsoComponent from '../components/SeeAlsoComponent';

function AmuletsPage() {
  const amulets = [
    { id: 1, name: 'Mystic Amulet', price: '$89.99', image: 'https://via.placeholder.com/200x200', description: 'A powerful amulet for mystical protection.' },
    { id: 2, name: 'Golden Amulet', price: '$74.99', image: 'https://via.placeholder.com/200x200', description: 'A radiant amulet crafted from pure gold.' },
    { id: 3, name: 'Silver Amulet', price: '$59.99', image: 'https://via.placeholder.com/200x200', description: 'An elegant amulet made from silver.' },
    { id: 4, name: 'Enchanted Amulet', price: '$99.99', image: 'https://via.placeholder.com/200x200', description: 'An amulet infused with ancient enchantments.' },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Amulets</h2>
            </div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <button className="flex items-center bg-white shadow-md px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-200">
                  <FaFilter className="mr-2" /> Filters
                </button>
                <button className="flex items-center bg-white shadow-md px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-200">
                  <FaSortAmountDown className="mr-2" /> Sort by
                </button>
              </div>
              <p className="text-gray-700">Showing 1-4 of 4 results</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {amulets.map((amulet) => (
              <div key={amulet.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={amulet.image} alt={amulet.name} className="w-full h-56 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">{amulet.name}</h3>
                  <p className="text-gray-700">{amulet.description}</p>
                  <p className="text-green-700 font-bold mt-2">{amulet.price}</p>
                  <button className="mt-4 w-full bg-green-900 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <SeeAlsoComponent /> {/* Make sure this component is correctly imported and working */}
    </>
  );
}

export default AmuletsPage;
