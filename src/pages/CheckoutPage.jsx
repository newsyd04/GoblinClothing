import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';

function CheckoutPage() {
  const location = useLocation();
  const { cartProducts, total } = location.state || {}; // Access total directly
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const [eircode, setEircode] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Checkout - Goblin Clothing';
  }, []);
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>
          <div className="flex flex-col md:flex-row md:space-x-6 items-start">
            <form className="w-full md:w-1/2">
              <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 gap-6">
                  <label className="block">
                    <span className="text-gray-700">Email *</span>
                    <input
                      type="text"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="form-input mt-1 block w-full"
                      placeholder="example@gmail.com"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Full Name *</span>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="form-input mt-1 block w-full"
                      placeholder="John Doe"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Address Line 1 *</span>
                    <input
                      type="text"
                      value={address1}
                      onChange={e => setAddress1(e.target.value)}
                      className="form-input mt-1 block w-full"
                      placeholder="Bishop Street"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Address Line 2</span>
                    <input
                      type="text"
                      value={address2}
                      onChange={e => setAddress2(e.target.value)}
                      className="form-input mt-1 block w-full"
                      placeholder="Silly Lane"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">City *</span>
                    <input
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="form-input mt-1 block w-full"
                      placeholder="Snacktown"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">County / State *</span>
                    <input
                      type="text"
                      value={county}
                      onChange={e => setCounty(e.target.value)}
                      className="form-input mt-1 block w-full"
                      placeholder="GW"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Eircode / ZIP code *</span>
                    <input
                      type="text"
                      value={eircode}
                      onChange={e => setEircode(e.target.value)}
                      className="form-input mt-1 block w-full"
                      placeholder="123456"
                    />
                  </label>
                  <label className="block">
                    <span className="text-gray-700">Country *</span>
                    <input
                      type="text"
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      className="form-input mt-1 block w-full"
                      placeholder="Sealand"
                    />
                  </label>
                </div>
              </div>
            </form>
          <div className="bg-white shadow-md rounded-lg p-6 mb-8 w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            <ul className="mb-6">
              {cartProducts.map(item => (
                <li key={item.productId} className="flex justify-between text-sm text-gray-700 mb-2">
                  <span>{item.name} {item.size ? item.size : ''} (x{item.quantity})</span>
                  <span>{(item.price * item.quantity).toFixed(2)} Shnargles</span>
                </li>
              ))}
              <li className="flex justify-between text-sm text-gray-700 font-bold">
                <span>Total</span>
                <span>{total} Shnargles</span> {/* Use the passed total */}
              </li>
            </ul>
            <CheckoutForm 
              cart={cartProducts} 
              total={total} 
              email={email} 
              name={name} 
              address1={address1}
              address2={address2}
              city={city}
              county={county}
              eircode={eircode}
              country={country}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
