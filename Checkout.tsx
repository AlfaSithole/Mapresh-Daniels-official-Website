import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CreditCard, Truck, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { addOrder } = useAuth();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');

  const hasProducts = cart.some(item => item.type === 'product');
  const hasServices = cart.some(item => item.type === 'service');

  if (cart.length === 0 && step === 1) {
    return (
      <div className="text-center py-24 space-y-8">
        <h2 className="font-display text-4xl text-gray-500">Your cart is empty! 🛍</h2>
        <Link to="/products" className="btn-primary inline-block">
          Go Shopping
        </Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in zoom-in duration-500">
        <div className="bg-brand-soft-pink p-16 rounded-[4rem] border-4 border-white shadow-2xl relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white p-4 rounded-full shadow-lg text-green-500 ring-8 ring-brand-light-pink">
            <CheckCircle size={64} />
          </div>
          <h2 className="font-display text-5xl text-brand-pink pt-8">Payment Successful!</h2>
          <p className="text-2xl font-medium text-gray-600 mt-4 italic">"Time to Shine, Doll! ✨"</p>
          <p className="text-lg text-gray-500 mt-2 max-w-md mx-auto">
            {hasProducts ? "Your boutique items are on their way! 🏠" : "See you at the salon! 💇‍♀️"}
          </p>
          <Link to="/" className="btn-primary mt-12 inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-display text-4xl text-brand-pink">Checkout</h2>
        <div className="flex gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-brand-pink text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-brand-pink text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3 space-y-8">
          {step === 1 ? (
             <div className="bg-white p-8 rounded-[3rem] shadow-2xl border-2 border-brand-light-pink space-y-6">
                <div className="flex gap-4 items-center border-b pb-4 border-brand-light-pink">
                  <Truck className="text-brand-pink" size={32} />
                  <h3 className="font-display text-2xl text-gray-800">
                    {hasProducts ? 'Delivery Information' : 'Booking Confirmation'}
                  </h3>
                </div>
                
                {hasProducts && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500 italic">We deliver boutique items right to your door! 🏠</p>
                    <textarea 
                      placeholder="Street Address, City, Postal Code"
                      className="w-full p-6 bg-brand-soft-pink rounded-3xl outline-none border-2 border-transparent focus:border-brand-pink transition-all min-h-[120px]"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="First Name" className="w-full p-4 bg-brand-soft-pink rounded-3xl outline-none border-2 border-transparent focus:border-brand-pink transition-all" />
                  <input type="text" placeholder="Last Name" className="w-full p-4 bg-brand-soft-pink rounded-3xl outline-none border-2 border-transparent focus:border-brand-pink transition-all" />
                </div>
                
                <button 
                  onClick={() => {
                    if (hasProducts && !address) {
                      alert('Please provide a delivery address! ✨');
                      return;
                    }
                    setStep(2);
                  }} 
                  className="btn-primary w-full text-2xl py-5 mt-4"
                >
                  Continue to Payment →
                </button>
             </div>
          ) : (
            <div className="bg-white p-8 rounded-[3rem] shadow-2xl border-2 border-brand-light-pink space-y-6 animate-in slide-in-from-right duration-300">
               <div className="flex gap-4 items-center border-b pb-4 border-brand-light-pink">
                  <CreditCard className="text-brand-pink" size={32} />
                  <h3 className="font-display text-2xl text-gray-800">Secure Payment</h3>
               </div>
               <div className="space-y-6">
                  <input type="text" placeholder="Card Number" className="w-full p-4 bg-brand-soft-pink rounded-3xl outline-none border-2 border-transparent focus:border-brand-pink transition-all" />
                  <div className="grid grid-cols-2 gap-6">
                    <input type="text" placeholder="MM/YY" className="w-full p-4 bg-brand-soft-pink rounded-3xl outline-none border-2 border-transparent focus:border-brand-pink transition-all" />
                    <input type="text" placeholder="CVV" className="w-full p-4 bg-brand-soft-pink rounded-3xl outline-none border-2 border-transparent focus:border-brand-pink transition-all" />
                  </div>
                  <div className="flex gap-4 pt-4">
                     <button onClick={() => setStep(1)} className="flex-1 font-display text-gray-500 hover:text-brand-pink transition-colors flex items-center justify-center gap-2">
                        <ArrowLeft size={18} /> Back
                     </button>
                     <button 
                        onClick={() => {
                          addOrder(cart.map(i => `${i.name}${i.type === 'service' ? ' (Salon)' : ' (Delivery)'}`), total);
                          clearCart();
                          setStep(3);
                        }} 
                        className="flex-[2] btn-primary py-4 text-xl"
                      >
                        Confirm R{total}
                     </button>
                  </div>
               </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-brand-soft-pink p-8 rounded-[2.5rem] shadow-lg border-2 border-white sticky top-24">
            <h3 className="font-display text-2xl text-brand-pink mb-6">Order Summary</h3>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between py-2 border-b border-brand-light-pink text-sm">
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <span className="font-bold text-brand-pink">R{item.price}</span>
                </div>
              ))}
            </div>
            <div className="pt-6 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>R{total}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-500 font-bold uppercase text-xs">Free ✨</span>
              </div>
              <div className="flex justify-between text-3xl font-bold text-brand-pink pt-4 border-t-2 border-brand-light-pink">
                <span>Total</span>
                <span>R{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
