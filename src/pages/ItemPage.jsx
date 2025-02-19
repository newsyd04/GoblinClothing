import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles
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

    const thumbnails = Array.isArray(image) ? image : []; 
    const [selectedImage, setSelectedImage] = useState(thumbnails.length > 0 ? thumbnails[0] : "default-image.jpg");    

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
        console.log("isSizable: ", isSizeable);
        console.log("mediumQuantity: ", mediumQuantity);
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

        let currentItem = cart.find(item => item.productId === id + selectedSize && item.size === selectedSize);
        let currentQuantity = currentItem ? currentItem.quantity : 0;
        console.log('Current item: ', currentItem);
        console.log('Current quantity: ', currentQuantity);
        if (selectedSize) {
            switch (selectedSize) {
                case 'SM':
                    if (selectedQuantity > smallQuantity || currentQuantity + selectedQuantity > smallQuantity) {
                        setToastMessage('Not enough stock.');
                        setShowToast(true);
                        return;
                    }
                    break;
                case 'MD':
                    if (selectedQuantity > mediumQuantity || currentQuantity + selectedQuantity > mediumQuantity) {
                        setToastMessage('Not enough stock.');
                        setShowToast(true);
                        return;
                    }
                    break;
                case 'LG':
                    if (selectedQuantity > largeQuantity || currentQuantity + selectedQuantity > largeQuantity) {
                        setToastMessage('Not enough stock.');
                        setShowToast(true);
                        return;
                    }
                    break;
                case 'XL':
                    if (selectedQuantity > xlQuantity || currentQuantity + selectedQuantity > xlQuantity) {
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

            <div className="mx-auto max-w-6xl px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Mobile: Slideshow */}
                    <div className="lg:hidden">
                        <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows>
                            {thumbnails.map((img, index) => (
                                <div key={index} className="w-full h-96 flex justify-center items-center bg-gray-100">
                                    <img
                                        src={img}
                                        alt={`Slide ${index + 1}`}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>

                    {/* Desktop: Image Gallery */}
                    <div className="hidden lg:flex gap-4">
                        {/* Thumbnails */}
                        <div className="flex flex-col space-y-4">
                            {thumbnails.map((img, index) => (
                                <div key={index} className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-lg">
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        onClick={() => setSelectedImage(img)}
                                        className="cursor-pointer max-w-full max-h-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Main Image Display */}
                        <div className="flex-1 flex items-center justify-center bg-white h-[450px] w-[450px] min-w-[450px]">
                            <img
                                src={selectedImage}
                                alt={name}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col">
                        <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
                        <p className="text-gray-700 my-2">{description}</p>
                        <p className="text-xl font-semibold text-gray-800 my-1">€{price}</p>
                        <p className={`text-md font-medium ${quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {quantity > 0 ? `Only ${quantity} left!` : "Out of stock"}
                        </p>

                        <hr className="my-4" />

                        {/* Size Selection */}
                        {isSizeable && (
                            <div>
                                <label htmlFor="sizes" className="block text-sm font-medium text-gray-900 mb-1">
                                    Select a size
                                </label>
                                <select
                                    id="sizes"
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-green-500 focus:border-green-500"
                                    value={selectedSize}
                                    onChange={(e) => setSelectedSize(e.target.value)}
                                >
                                    <option value="">Choose a size</option>
                                    <option value="SM">Small</option>
                                    <option value="MD">Medium</option>
                                    <option value="LG">Large</option>
                                    <option value="XL">Extra-Large</option>
                                </select>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div className="mt-4 flex items-center space-x-4">
                            <button
                                className={`w-8 h-8 flex items-center justify-center bg-gray-600 text-white text-xs font-extrabold rounded-full transition hover:scale-105 ${
                                    selectedQuantity === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-900'
                                }`}
                                onClick={() => handleQuantityChange('decrement')}
                                disabled={selectedQuantity === 1}
                            >
                                −
                            </button>
                            <span className="text-xl font-bold">{selectedQuantity}</span>
                            <button
                                className={`w-8 h-8 flex items-center justify-center bg-gray-600 text-white text-xs font-extrabold rounded-full transition hover:scale-105 ${
                                    selectedQuantity === quantity ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-900'
                                }`}
                                onClick={() => handleQuantityChange('increment')}
                                disabled={selectedQuantity === quantity}
                            >
                                +
                            </button>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            className={`w-full bg-green-700 text-white py-3 mt-6 text-lg font-semibold rounded-lg transition ${
                                (isSizeable && !selectedSize) || quantity === 0 ? 'cursor-not-allowed opacity-50' : 'hover:bg-green-900'
                            }`}
                            onClick={addToCart}
                            disabled={quantity === 0 || (isSizeable && !selectedSize)}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ItemPage;