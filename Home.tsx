import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, Heart } from 'lucide-react';

export default function Home() {
  const hours = [
    { day: 'Monday', time: '08:00 - 18:00', icon: '🌸' },
    { day: 'Tuesday', time: '08:00 - 18:00', icon: '✨' },
    { day: 'Wednesday', time: '08:00 - 18:00', icon: '💖' },
    { day: 'Thursday', time: '08:00 - 18:00', icon: '💅' },
    { day: 'Friday', time: '08:00 - 18:00', icon: '💄' },
    { day: 'Saturday', time: '08:00 - 16:00', icon: '💇‍♀️' },
    { day: 'Sunday', time: 'Closed', icon: '💤' },
  ];

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] rounded-[3rem] overflow-hidden flex flex-col justify-center items-center text-center p-6 border-4 border-white shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1600" 
            alt="Mapresh Salon Interior" 
            className="w-full h-full object-cover brightness-75 transition-transform duration-10000 hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-pink/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 space-y-6 text-white drop-shadow-lg">
          <h2 className="font-display text-5xl md:text-8xl leading-tight">
            Mapresh <br />
            Beauty & Co
          </h2>
          <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto text-white/90">
            Unleash Your Inner Sparkle in Malamulele
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link to="/contact" className="btn-primary !bg-white !text-brand-pink hover:!bg-brand-light-pink">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="font-display text-4xl text-brand-pink">Opening Hours</h2>
          <div className="w-24 h-1 bg-brand-pink mx-auto mt-2 rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {hours.map((h) => (
            <div 
              key={h.day}
              className={`card-cartoon p-4 text-center ${today === h.day ? 'ring-4 ring-brand-pink scale-110 !bg-brand-pink !text-white' : ''}`}
            >
              <span className="text-3xl mb-2 block">{h.icon}</span>
              <h3 className="font-display text-lg font-bold">{h.day}</h3>
              <p className="text-sm font-semibold opacity-90">{h.time}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="card-cartoon space-y-4 text-left overflow-hidden relative group">
          <img 
            src="https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&q=80&w=800" 
            alt="Hair Braiding" 
            className="w-full h-48 object-cover rounded-3xl mb-4 group-hover:scale-105 transition-transform"
            referrerPolicy="no-referrer"
          />
          <div className="flex items-center gap-3">
            <div className="bg-white p-3 rounded-2xl shadow-sm text-brand-pink">
              <Star size={32} />
            </div>
            <h3 className="font-display text-3xl text-brand-pink">Hair Salon</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            From Knotless Braids to Fishbone and Halfmoon styles. 
            Come to us for professional styling that makes you feel confident and beautiful.
          </p>
          <Link to="/services" className="inline-block text-brand-pink font-bold border-b-2 border-brand-pink py-1 hover:text-brand-hover-pink transition-colors">
            View Hair Services →
          </Link>
        </div>

        <div className="card-cartoon space-y-4 text-left overflow-hidden relative group">
          <img 
            src="https://images.unsplash.com/photo-1604654894611-6973b376cbff?auto=format&fit=crop&q=80&w=800" 
            alt="Nail Art" 
            className="w-full h-48 object-cover rounded-3xl mb-4 group-hover:scale-105 transition-transform"
            referrerPolicy="no-referrer"
          />
          <div className="flex items-center gap-3">
            <div className="bg-white p-3 rounded-2xl shadow-sm text-brand-pink">
              <Heart size={32} />
            </div>
            <h3 className="font-display text-3xl text-brand-pink">Nail Studio</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Beautiful Stiletto, Oval, or Plain nails. Complete your look with our professional 
            manicures and pedicures that leave your hands and feet glowing.
          </p>
          <Link to="/services" className="inline-block text-brand-pink font-bold border-b-2 border-brand-pink py-1 hover:text-brand-hover-pink transition-colors">
            View Nail Services →
          </Link>
        </div>
      </section>

       {/* Products Preview */}
       <section className="bg-brand-soft-pink rounded-[3rem] p-8 md:p-16 text-center space-y-8">
        <h2 className="font-display text-4xl text-brand-pink">Shop Our Beauty Collection</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-display text-2xl text-gray-800">Frontal Hair</h4>
            <p className="text-gray-600">Short, Medium and Long premium quality frontal hair available for purchase.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-display text-2xl text-gray-800">Skin Care Products</h4>
            <p className="text-gray-600">Glow Serums, Hydrating Creams, and Vitamin C Oils for that perfect radiance.</p>
          </div>
        </div>
        <Link to="/products" className="btn-primary inline-block">
          Shop Products
        </Link>
      </section>
      
      {/* Location */}
      <section className="flex flex-col items-center text-center space-y-4 pb-12">
        <div className="bg-brand-light-pink p-6 rounded-full text-brand-pink animate-bounce">
          <MapPin size={48} />
        </div>
        <h2 className="font-display text-3xl text-brand-pink">Find Us</h2>
        <p className="text-xl text-gray-600">
          Malamulele, Phaweni Village <br />
          Limpopo, South Africa
        </p>
      </section>
    </div>
  );
}
