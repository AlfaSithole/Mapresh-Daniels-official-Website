import React, { useState } from 'react';
import { Calendar, Phone, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="bg-brand-soft-pink p-12 rounded-[3rem] shadow-2xl border-4 border-white animate-in zoom-in duration-500">
           <span className="text-8xl mb-6 block animate-bounce">💖</span>
           <h2 className="font-display text-4xl text-brand-pink">Booking Received!</h2>
           <p className="text-xl text-gray-600 mt-4">
             Thank you, doll! ✨ We'll contact you shortly to confirm your appointment.
           </p>
           <button 
             onClick={() => setSubmitted(false)}
             className="btn-primary mt-8"
           >
             Make Another Booking
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12 py-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="font-display text-5xl text-brand-pink leading-tight">
            Let's Get You <br />
            Red Carpet Ready! ✨
          </h2>
          <p className="text-xl text-gray-600">
            Fill out the form below or chat with our AI assistant to book your slot.
          </p>
        </div>

        <div className="space-y-6 bg-brand-soft-pink p-8 rounded-[2.5rem] shadow-lg">
          <div className="flex items-center gap-4 group">
            <div className="bg-brand-pink text-white p-3 rounded-2xl group-hover:scale-110 transition-transform">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-brand-pink uppercase tracking-widest">Call Us</p>
              <p className="text-xl font-medium text-gray-800">+27 12 345 6789</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="bg-brand-pink text-white p-3 rounded-2xl group-hover:scale-110 transition-transform">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-brand-pink uppercase tracking-widest">Email</p>
              <p className="text-xl font-medium text-gray-800">hello@mapreshbeauty.co</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="bg-brand-pink text-white p-3 rounded-2xl group-hover:scale-110 transition-transform">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-brand-pink uppercase tracking-widest">Address</p>
              <p className="text-lg font-medium text-gray-800">Malamulele, Phaweni Village</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl border-2 border-brand-light-pink">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="font-display text-lg text-gray-700">Full Name</label>
            <input 
              required
              type="text" 
              placeholder="Your name here..."
              className="w-full p-4 bg-brand-soft-pink border-2 border-transparent focus:border-brand-pink focus:bg-white rounded-3xl outline-none transition-all"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-display text-lg text-gray-700">Phone</label>
              <input 
                required
                type="tel" 
                placeholder="071..."
                className="w-full p-4 bg-brand-soft-pink border-2 border-transparent focus:border-brand-pink focus:bg-white rounded-3xl outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="font-display text-lg text-gray-700">Service</label>
              <select className="w-full p-4 bg-brand-soft-pink border-2 border-transparent focus:border-brand-pink focus:bg-white rounded-3xl outline-none transition-all appearance-none cursor-pointer">
                <option>Hair Styling</option>
                <option>Nail Studio</option>
                <option>Skin Care Consultation</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-display text-lg text-gray-700">Message / Preference</label>
            <textarea 
              rows={4}
              placeholder="Tell us about your style..."
              className="w-full p-4 bg-brand-soft-pink border-2 border-transparent focus:border-brand-pink focus:bg-white rounded-3xl outline-none transition-all"
            ></textarea>
          </div>

          <button type="submit" className="btn-primary w-full py-5 text-2xl mt-4">
            Book Appointment Now! ✨
          </button>
        </form>
      </div>
    </div>
  );
}
