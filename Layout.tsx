import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User as UserIcon, X, Menu, LogIn } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AIChat from './AIChat';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { cart, total, removeFromCart } = useCart();
  const { user } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Book Now', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-brand-light-pink py-6 px-4 text-center shadow-sm">
        <h1 className="font-display text-4xl md:text-5xl text-brand-pink font-bold">
          Mapresh Daniels Beauty & Co
        </h1>
      </header>

      <nav className="bg-white sticky top-0 z-40 border-b border-brand-light-pink py-4 px-6 flex justify-between items-center shadow-sm">
        <div className="hidden md:flex gap-8 justify-center flex-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-display text-xl ${
                location.pathname === link.path ? 'text-brand-pink border-b-2 border-brand-pink' : 'text-gray-600'
              } hover:text-brand-pink transition-colors`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-brand-pink p-2">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div className="flex gap-4 items-center">
          {user ? (
            <Link to="/profile" className="flex items-center gap-2 group">
               <div className="bg-brand-soft-pink text-brand-pink p-2 rounded-full group-hover:bg-brand-pink group-hover:text-white transition-all shadow-sm">
                <UserIcon size={24} />
               </div>
               <span className="hidden lg:inline font-bold text-gray-700">{user.name}</span>
            </Link>
          ) : (
            <Link to="/login" className="text-brand-pink hover:bg-brand-soft-pink p-2 rounded-full transition-all flex items-center gap-2">
              <LogIn size={24} />
              <span className="hidden lg:inline font-bold">Login</span>
            </Link>
          )}

          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative p-2 text-brand-pink hover:bg-brand-soft-pink rounded-full transition-all shadow-sm"
          >
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-pink text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-brand-light-pink p-4 space-y-4 flex flex-col items-center">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="font-display text-2xl text-gray-600 hover:text-brand-pink"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {children}
      </main>

      {/* Persistent Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-y-0 right-0 w-80 bg-brand-soft-pink shadow-2xl z-50 p-6 flex flex-col animate-in slide-in-from-right duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display text-3xl text-brand-pink">Your Cart</h3>
            <button onClick={() => setIsCartOpen(false)} className="text-brand-pink ring-2 ring-brand-pink rounded-full p-1 hover:bg-white transition-all">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">Your cart is empty!</p>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-white rounded-2xl shadow-sm">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-brand-pink font-bold">R{item.price}</p>
                  </div>
                  <button onClick={() => removeFromCart(idx)} className="text-brand-pink hover:scale-110 transition-transform">
                    <X size={18} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-brand-light-pink">
            <div className="flex justify-between text-2xl font-bold mb-4 text-brand-pink">
              <span>Total:</span>
              <span>R{total}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full text-center bg-brand-pink text-white py-4 rounded-full font-display text-xl hover:bg-brand-hover-pink transition-colors shadow-lg"
            >
              Proceed to Payment
            </Link>
          </div>
        </div>
      )}

      <AIChat />

      <footer className="bg-brand-light-pink py-10 px-4 text-center mt-auto border-t border-brand-pink/10">
        <p className="font-display text-xl text-brand-pink">
          © 2026 Mapresh Daniels Beauty & Co
        </p>
        <p className="text-xs text-brand-pink/60 mt-2">Malamulele, Phaweni Village</p>
      </footer>
    </div>
  );
}
