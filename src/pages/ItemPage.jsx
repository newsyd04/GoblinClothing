import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Toast from '../components/Toast';

function ItemPage({ cart, setCart }) {
    const { state } = useLocation();
    const { id, name, price, image, description, quantity, largeQuantity, mediumQuantity, smallQuantity, xlQuantity, type, isSizeable } = state;
    console.log('ItemPage state:', state);
    const [selectedSize, setSelectedSize] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const hasSizes = largeQuantity || mediumQuantity || smallQuantity || xlQuantity;

    const [selectedQuantity, setSelectedQuantity] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = name + " - Goblin Clothing";
    }, [name]);

    const handleQuantityChange = (type) => {
        if (type === 'increment' && selectedQuantity < quantity) {
            setSelectedQuantity(selectedQuantity + 1);
        } else if (type === 'decrement' && selectedQuantity > 1) {
            setSelectedQuantity(selectedQuantity - 1);
        }
        console.log('Stuff: ', id, name, price, image, description, quantity);
        console.log('Quantities: ', largeQuantity, mediumQuantity, smallQuantity, xlQuantity);
    };

    const addToCart = () => {
        // isSizeable is a boolean value
        if (isSizeable !== false && !selectedSize) {
            setToastMessage('Please select a size.');
            setShowToast(true);
            return;
        }

        if (selectedQuantity > quantity) {
            setToastMessage('Not enough stock.');
            setShowToast(true);
            return;
        }
        console.log('small quantity: ', smallQuantity);

        if (selectedSize) {
            switch (selectedSize) {
                case 'SM':
                    if (selectedQuantity > smallQuantity) {
                        setToastMessage('Not enough stock.');
                        setShowToast(true);
                        return;
                    }
                    break;
                case 'MD':
                    if (selectedQuantity > mediumQuantity) {
                        setToastMessage('Not enough stock.');
                        setShowToast(true);
                        return;
                    }
                    break;
                case 'LG':
                    if (selectedQuantity > largeQuantity) {
                        setToastMessage('Not enough stock.');
                        setShowToast(true);
                        return;
                    }
                    break;
                case 'XL':
                    if (selectedQuantity > xlQuantity) {
                        setToastMessage('Not enough stock.');
                        setShowToast(true);
                        return;
                    }
                    break;
                default:
                    break;
            }
        }

        // should be hasSizes check instead of selectedSize later
        const existingProduct = selectedSize ? 
            cart.find(item => item.productId === (id + selectedSize) && item.size === selectedSize) 
            : cart.find(item => item.productId === id);
        if (existingProduct) {
          setCart(prevCart =>
            prevCart.map(item =>
                (item.productId === id || item.productId === id + selectedSize) && (!selectedSize || item.size === selectedSize)
                ? { ...item, quantity: item.quantity + selectedQuantity }
                : item
        )
          );
        } else {
            // should be hasSizes check instead of selectedSize later
            let productId = selectedSize ? id + selectedSize : id;
            const newCartItem = {
                productId: productId,
                name: name,
                price: price,
                quantity: selectedQuantity,
                size: selectedSize || "Baller Alert"
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
                            <p className="text-lg font-semibold text-gray-800 mb-4">€{price}</p>
                            <p className={`text-lg font-medium ${quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {quantity > 0 ? `Only ${quantity} left!` : "Out of stock"}
                            </p>
                        </div>
                    </div>

                    <hr className='my-2'/>
                    <div className='flex flex-row gap-6'>
                    {quantity > 0 && (
                        <> {isSizeable !== false && (
                            <div className='flex items-start'>
                                <form className="max-w-sm">
                                    <label htmlFor="sizes" className="block mb-2 text-sm font-medium text-gray-900">Select a size</label>
                                    <select 
                                        id="sizes" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        value={selectedSize}
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                    >
                                        <option value=""></option>
                                        <option value="SM">Small</option>
                                        <option value="MD">Medium</option>
                                        <option value="LG">Large</option>
                                        <option value="XL">Extra-Large</option>
                                    </select>
                                </form>
                            </div>
                            )}                        
                            
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
                                </div></>
                    )}
                    </div>

                    <div className="mt-6">
                        {quantity > 0 && (
                            <button 
                                className={`w-full bg-green-700 text-white py-3 text-lg font-semibold rounded-lg hover:bg-green-900 transition duration-300
                                    ${isSizeable !== false && selectedSize === '' ? 'cursor-not-allowed opacity-50' : 'hover:bg-green-900'}`}
                                onClick={() => addToCart()}
                                disabled={quantity <= 0 || (isSizeable !== false && selectedSize === '')}
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