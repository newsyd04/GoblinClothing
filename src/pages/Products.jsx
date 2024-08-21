import React from 'react';
import { FaFilter, FaSortAmountDown } from 'react-icons/fa'; // Importing icons
import SeeAlsoComponent from '../components/SeeAlsoComponent';

function ProductsPage() {
  const products = [
    { id: 1, name: 'Goblin Hoodie', price: '$49.99', image: 'https://via.placeholder.com/200x200', description: 'A cozy hoodie for goblin enthusiasts.' },
    { id: 2, name: 'Goblin T-Shirt', price: '$24.99', image: 'https://via.placeholder.com/200x200', description: 'A cool t-shirt for every goblin fan.' },
    { id: 3, name: 'Goblin Hat', price: '$19.99', image: 'https://via.placeholder.com/200x200', description: 'A stylish hat for goblin lovers.' },
    { id: 4, name: 'Goblin Shoes', price: '$79.99', image: 'https://via.placeholder.com/200x200', description: 'Step into the world of goblins with these shoes.' },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className='flex flex-col'>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Products</h2> {/* Corrected title */}
            </div>
            <div className="flex justify-between items-center mb-6 gap-4">
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
            {products.map((product) => (
              <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                  <p className="text-gray-700">{product.description}</p>
                  <p className="text-green-700 font-bold mt-2">{product.price}</p>
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

export default ProductsPage;
