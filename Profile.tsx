import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Package, Gift, LogOut, ExternalLink } from 'lucide-react';

export default function Profile() {
  const { user, orders, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-12">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* User Card */}
        <div className="card-cartoon space-y-6 text-center !p-8">
          <div className="w-24 h-24 bg-brand-pink text-white rounded-full flex items-center justify-center mx-auto text-4xl shadow-xl border-4 border-white font-display">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1">
            <h2 className="font-display text-3xl text-brand-pink">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 space-y-4 shadow-inner">
            <div className="flex justify-between items-center text-brand-pink">
              <div className="flex items-center gap-2">
                <Gift size={24} />
                <span className="font-bold">Rewards</span>
              </div>
              <span className="text-2xl font-display font-bold text-gray-800">{user.loyaltyPoints} pts</span>
            </div>
            
            <div className="space-y-2">
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden border-2 border-brand-light-pink">
                <div 
                  className="h-full bg-brand-pink relative transition-all duration-1000" 
                  style={{ width: `${Math.min((user.loyaltyPoints % 1000) / 10, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                {1000 - (user.loyaltyPoints % 1000)} points until next VIP Gift ✨
              </p>
            </div>
          </div>
          <button 
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center justify-center gap-2 w-full text-brand-pink font-bold hover:bg-brand-light-pink p-3 rounded-2xl transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>

        {/* Orders Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-4 border-b-4 border-brand-light-pink pb-4">
            <Package className="text-brand-pink" size={32} />
            <h2 className="font-display text-4xl text-brand-pink">Beauty History</h2>
          </div>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-brand-soft-pink p-12 rounded-[2.5rem] text-center space-y-4 border-2 border-dashed border-brand-pink/30">
                <p className="text-2xl text-gray-500 font-display italic">No bookings or purchases yet! ✨</p>
                <button onClick={() => navigate('/services')} className="btn-primary !py-2 !px-8">Start Your Journey</button>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-white p-6 rounded-3xl shadow-md border-2 border-brand-light-pink flex flex-col md:flex-row justify-between items-center gap-4 hover:border-brand-pink transition-colors">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-brand-pink uppercase tracking-widest flex items-center gap-1">
                      <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full">{order.status}</span>
                      ID: {order.id}
                    </p>
                    <p className="font-display text-xl text-gray-800">{order.items.join(', ')}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-brand-pink">R{order.total}</p>
                    <button className="text-xs font-bold text-gray-400 hover:text-brand-pink flex items-center gap-1">
                      Details <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
