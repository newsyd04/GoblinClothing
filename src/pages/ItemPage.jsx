import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Toast from '../components/Toast';

function ItemPage({ cart, setCart }) {
    const { state } = useLocation();
    const { id, name, price, image, description, quantity } = state;
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const handleQuantityChange = (type) => {
        if (type === 'increment' && selectedQuantity < quantity) {
            setSelectedQuantity(selectedQuantity + 1);
        } else if (type === 'decrement' && selectedQuantity > 1) {
            setSelectedQuantity(selectedQuantity - 1);
        }
    };

    const addToCart = () => {
        const existingProduct = cart.find(item => item.productId === id);
        if (existingProduct) {
          setCart(prevCart =>
            prevCart.map(item =>
              item.productId === id
                ? { ...item, quantity: item.quantity + selectedQuantity }
                : item
            )
          );
        } else {
          const newCartItem = {
            productId: id,
            name: name,
            price: price,
            quantity: selectedQuantity
          };
          console.log('Adding new item to cart:', newCartItem); // Log new cart item
          setCart(prevCart => [...prevCart, newCartItem]);
        }
        console.log('Updated cart:', cart); // Log entire cart state after addition
        setToastMessage('Item added to cart');
        setShowToast(true);
      };

    return (
        <>
            <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />

            <div className="flex flex-col lg:flex-row mx-[10%] my-8 gap-8 items-center">
                <div className="flex-1">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                </div>

                <div className="flex-1 flex flex-col">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mt-6 mb-3">{name}</h1>
                        <p className="text-gray-700 mb-3">{description}</p>
                        <div className="flex flex-row gap-3">
                            <p className="text-lg font-semibold text-gray-800 mb-4">${price}</p>
                            <p className={`text-lg font-medium ${quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {quantity > 0 ? `Only ${quantity} left!` : "Out of stock"}
                            </p>
                        </div>
                    </div>

                    <hr className='my-2'/>
                    <div className='flex flex-row gap-6'>
                        <div className='flex items-start'>
                            <form class="max-w-sm">
                                <label for="sizes" class="block mb-2 text-sm font-medium text-gray-900">Select a size</label>
                                <select id="sizes" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option selected></option>
                                    <option value="US">Small</option>
                                    <option value="CA">Medium</option>
                                    <option value="FR">Large</option>
                                    <option value="DE">Extra-Large</option>
                                </select>
                            </form>
                        </div>
                    
                    {quantity > 0 && (
                        <div className="mt-6 flex items-center space-x-4">
                            <button 
                                className={`w-8 h-8 flex items-center justify-center bg-gray-600 text-white text-xs font-extrabold rounded-full transition duration-300 transform hover:scale-105
                                ${selectedQuantity === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-900'}`}
                                onClick={() => handleQuantityChange('decrement')}
                                disabled={selectedQuantity === 1}
                            >
                                −
                            </button>
                            <span className="text-2xl font-bold text-gray-900">{selectedQuantity}</span>
                            <button 
                                className={`w-8 h-8 flex items-center justify-center bg-gray-600 text-white text-xs font-extrabold rounded-full transition duration-300 transform hover:scale-105
                                ${selectedQuantity === quantity ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-900'}`}
                                onClick={() => handleQuantityChange('increment')}
                                disabled={selectedQuantity === quantity}
                            >
                                +
                            </button>
                        </div>
                    )}
                    </div>

                    <div className="mt-6">
                        {quantity > 0 && (
                            <button 
                                className="w-full bg-green-700 text-white py-3 text-lg font-semibold rounded-lg hover:bg-green-900 transition duration-300"
                                onClick={() => addToCart()}
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemPage;