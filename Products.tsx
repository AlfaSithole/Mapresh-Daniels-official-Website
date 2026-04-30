import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Star, Sparkles, Heart } from 'lucide-react';

export default function Products() {
  const { addToCart } = useCart();

  const hairProducts = [
    { id: 'p1', name: 'Short Frontal', price: 500, description: 'Premium quality 8-10 inch', type: 'product', image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=400' },
    { id: 'p2', name: 'Medium Frontal', price: 700, description: 'Premium quality 12-16 inch', type: 'product', image: 'https://images.unsplash.com/photo-1632760822170-4f5195b058c4?auto=format&fit=crop&q=80&w=400' },
    { id: 'p3', name: 'Long Frontal', price: 900, description: 'Premium quality 18-24 inch', type: 'product', image: 'https://images.unsplash.com/photo-1594125355919-dbec32a1df0b?auto=format&fit=crop&q=80&w=400' },
    { id: 'p4', name: 'Full Lace Wig', price: 2500, description: 'Natural look, 100% human hair', type: 'product', image: 'https://images.unsplash.com/photo-1560066921-2a4ca730a90b?auto=format&fit=crop&q=80&w=400' },
    { id: 'p5', name: 'HD Lace Closure', price: 850, description: 'Invisible knots, pre-plucked', type: 'product', image: 'https://images.unsplash.com/photo-1595152431210-2f9547ea8d61?auto=format&fit=crop&q=80&w=400' },
  ];

  const skinProducts = [
    { id: 's1', name: 'Glow Serum', price: 300, description: 'For that instant radiance', type: 'product', image: 'https://images.unsplash.com/photo-1570172619666-1113ed739266?auto=format&fit=crop&q=80&w=400' },
    { id: 's2', name: 'Hydrating Cream', price: 250, description: 'Smooth as clouds ☁️', type: 'product', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400' },
    { id: 's3', name: 'Vitamin C Face Oil', price: 350, description: 'Brighten and nourish', type: 'product', image: 'https://images.unsplash.com/photo-1601049541289-9b1b7abcfe19?auto=format&fit=crop&q=80&w=400' },
    { id: 's4', name: 'Night Repair Mask', price: 400, description: 'Wake up with beauty', type: 'product', image: 'https://images.unsplash.com/photo-1590156221122-c748e78f2a43?auto=format&fit=crop&q=80&w=400' },
  ];

  const boutiqueItems = [
    { id: 'b1', name: 'Elegant Handbag', price: 1200, description: 'Luxury leather accessory', type: 'product', image: 'https://images.unsplash.com/photo-1584917033904-493ed9568911?auto=format&fit=crop&q=80&w=400' },
    { id: 'b2', name: 'Golden Earrings', price: 450, description: 'Statement piece', type: 'product', image: 'https://images.unsplash.com/photo-1535632066927-ab7ca9b57452?auto=format&fit=crop&q=80&w=400' },
    { id: 'b3', name: 'Silk Scarf', price: 300, description: 'Hand-painted floral', type: 'product', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=400' },
    { id: 'b4', name: 'Designer Sunglasses', price: 1500, description: 'Chic and protective', type: 'product', image: 'https://images.unsplash.com/photo-1511499767390-c859e3258de2?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="space-y-16 py-8">
      <div className="text-center space-y-4">
        <h2 className="font-display text-5xl text-brand-pink">Beauty Boutique</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto italic">
          "For products, we deliver right to your door! 🏠✨"
        </p>
      </div>

      <section className="space-y-10">
        <div className="flex items-center gap-4 border-b-4 border-brand-light-pink pb-4">
          <div className="bg-brand-pink text-white p-3 rounded-2xl shadow-lg">
            <Sparkles size={32} />
          </div>
          <h2 className="font-display text-4xl text-brand-pink">Frontal Hair & Wigs</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hairProducts.map((product) => (
            <div key={product.id} className="card-cartoon text-center space-y-4 flex flex-col items-center group">
              <div className="w-full h-56 bg-white overflow-hidden rounded-[2.5rem] mb-2 shadow-inner border-4 border-white">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-display text-2xl text-gray-800">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.description}</p>
              <p className="text-3xl font-bold text-brand-pink">R{product.price}</p>
              <button 
                onClick={() => {
                  addToCart(product);
                  alert(`${product.name} added to cart! 🛍`);
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
            <Heart size={32} />
          </div>
          <h2 className="font-display text-4xl text-brand-pink">Skin Care</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skinProducts.map((product) => (
            <div key={product.id} className="card-cartoon text-center space-y-4 flex flex-col items-center group">
              <div className="w-full h-56 bg-white overflow-hidden rounded-[2.5rem] mb-2 shadow-inner border-4 border-white">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-display text-2xl text-gray-800">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.description}</p>
              <p className="text-3xl font-bold text-brand-pink">R{product.price}</p>
              <button 
                onClick={() => {
                  addToCart(product);
                  alert(`${product.name} added to cart! ✨`);
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
            <ShoppingBag size={32} />
          </div>
          <h2 className="font-display text-4xl text-brand-pink">Boutique Fashion</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {boutiqueItems.map((product) => (
            <div key={product.id} className="card-cartoon text-center space-y-4 flex flex-col items-center group">
              <div className="w-full h-56 bg-white overflow-hidden rounded-[2.5rem] mb-2 shadow-inner border-4 border-white">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-display text-2xl text-gray-800">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.description}</p>
              <p className="text-3xl font-bold text-brand-pink">R{product.price}</p>
              <button 
                onClick={() => {
                  addToCart(product);
                  alert(`${product.name} added to cart! 👜`);
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
