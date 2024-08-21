import React, { useEffect, useState } from 'react';
import { FaFilter, FaSortAmountDown } from 'react-icons/fa';
import SeeAlsoComponent from '../components/SeeAlsoComponent';
import api from '../api'; // Import the API instance

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products'); // Assuming your backend has a /products endpoint
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className='flex flex-col'>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Products</h2>
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
              <p className="text-gray-700">Showing {products.length} results</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
                <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                <div className="flex flex-col flex-grow p-4">
                  <div className="text-lg font-bold text-gray-900 mb-2">{product.name}</div>
                  <div className="text-gray-700 mb-4 flex-grow">{product.description}</div>
                  <div className="text-green-700 font-bold mb-4">{product.price} Shnargles</div>
                  <div className="mt-auto w-full bg-green-900 text-white py-2 px-4 rounded-md text-center hover:bg-green-700 transition duration-300">
                    Add to Cart
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <SeeAlsoComponent />
    </>
  );
}

export default ProductsPage;
