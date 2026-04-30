import React from 'react';
import { useCart } from '../context/CartContext';
import { Scissors, Sparkle } from 'lucide-react';

export default function Services() {
  const { addToCart } = useCart();

  const hairServices = [
    { id: 'h1', name: 'Free Hand', price: 120, icon: '💇‍♀️', type: 'service', image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&q=80&w=400' },
    { id: 'h2', name: 'Fishbone', price: 150, icon: '✨', type: 'service', image: 'https://images.unsplash.com/photo-1594125355919-dbec32a1df0b?auto=format&fit=crop&q=80&w=400' },
    { id: 'h3', name: 'Straight Up', price: 200, icon: '👱‍♀️', type: 'service', image: 'https://images.unsplash.com/photo-1632760822170-4f5195b058c4?auto=format&fit=crop&q=80&w=400' },
    { id: 'h4', name: 'Straight Back', price: 160, icon: '👧', type: 'service', image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=400' },
    { id: 'h5', name: 'Halfmoon', price: 350, icon: '🌙', type: 'service', image: 'https://images.unsplash.com/photo-1588392382834-a8af9fce1f86?auto=format&fit=crop&q=80&w=400' },
    { id: 'h6', name: 'Knotless Braids', price: 400, icon: '🎀', type: 'service', image: 'https://images.unsplash.com/photo-1644447326604-093fd8d7123e?auto=format&fit=crop&q=80&w=400' },
  ];

  const nailServices = [
    { id: 'n1', name: 'Plain Short', price: 150, icon: '💅', type: 'service', image: 'https://images.unsplash.com/photo-1604654894611-6973b376cbff?auto=format&fit=crop&q=80&w=400' },
    { id: 'n2', name: 'Plain Medium', price: 200, icon: '💅', type: 'service', image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=400' },
    { id: 'n3', name: 'Plain Long', price: 250, icon: '💅', type: 'service', image: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&q=80&w=400' },
    { id: 'n4', name: 'Pedicure Plain', price: 150, icon: '👣', type: 'service', image: 'https://images.unsplash.com/photo-1519415510271-4197a7d26411?auto=format&fit=crop&q=80&w=400' },
    { id: 'n5', name: 'Pedicure Design', price: 200, icon: '👣', type: 'service', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=400' },
  ];

  const microbladingServices = [
    { id: 'm1', name: 'First Session', price: 1200, icon: '✍️', type: 'service', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400' },
    { id: 'm2', name: 'Ombre Powder', price: 1500, icon: '✨', type: 'service', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400' },
    { id: 'm3', name: 'Touch Up', price: 800, icon: '🔄', type: 'service', image: 'https://images.unsplash.com/photo-1600428791230-1a183bda90cc?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="space-y-16 py-8">
      <div className="text-center space-y-4">
        <h2 className="font-display text-5xl text-brand-pink">Our Services</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto italic">
          "Beauty is being the best version of yourself, from hair to nails." ✨
        </p>
      </div>

      <section className="space-y-10">
        <div className="flex items-center gap-4 border-b-4 border-brand-light-pink pb-4">
          <div className="bg-brand-pink text-white p-3 rounded-2xl shadow-lg">
            <Scissors size={32} />
          </div>
          <h2 className="font-display text-4xl text-brand-pink">Hair Salon</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hairServices.map((service) => (
            <div key={service.id} className="card-cartoon text-center space-y-4 flex flex-col items-center overflow-hidden group">
              <div className="w-full h-48 overflow-hidden rounded-[2rem] mb-2">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-display text-2xl text-gray-800">{service.name}</h3>
              <p className="text-3xl font-bold text-brand-pink">R{service.price}</p>
              <button 
                onClick={() => {
                  addToCart(service);
                  alert(`${service.name} added to cart! ✨`);
                }}
                className="btn-primary !text-lg !px-6 !py-2 mt-auto"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-10">
        <div className="flex items-center gap-4 border-b-4 border-brand-light-pink pb-4">
          <div className="bg-brand-pink text-white p-3 rounded-2xl shadow-lg">
            <Sparkle size={32} />
          </div>
          <h2 className="font-display text-4xl text-brand-pink">Nail Studio</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {nailServices.map((service) => (
            <div key={service.id} className="card-cartoon text-center space-y-4 flex flex-col items-center overflow-hidden group">
              <div className="w-full h-48 overflow-hidden rounded-[2rem] mb-2">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-display text-2xl text-gray-800">{service.name}</h3>
              <p className="text-3xl font-bold text-brand-pink">R{service.price}</p>
              <button 
                onClick={() => {
                  addToCart(service);
                  alert(`${service.name} added to cart! 💅`);
                }}
                className="btn-primary !text-lg !px-6 !py-2 mt-auto"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-10">
        <div className="flex items-center gap-4 border-b-4 border-brand-light-pink pb-4">
          <div className="bg-brand-pink text-white p-3 rounded-2xl shadow-lg">
            <Sparkle size={32} />
          </div>
          <h2 className="font-display text-4xl text-brand-pink">Microblading</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {microbladingServices.map((service) => (
            <div key={service.id} className="card-cartoon text-center space-y-4 flex flex-col items-center overflow-hidden group">
              <div className="w-full h-48 overflow-hidden rounded-[2rem] mb-2">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-display text-2xl text-gray-800">{service.name}</h3>
              <p className="text-3xl font-bold text-brand-pink">R{service.price}</p>
              <button 
                onClick={() => {
                  addToCart(service);
                  alert(`${service.name} added to cart! ✨`);
                }}
                className="btn-primary !text-lg !px-6 !py-2 mt-auto"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
