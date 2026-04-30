import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, User as UserIcon } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, isLogin ? 'Diva' : name);
    navigate('/profile');
  };

  return (
    <div className="flex justify-center items-center py-12 px-4 min-h-[70vh]">
      <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl border-2 border-brand-light-pink w-full max-w-lg space-y-8 animate-in zoom-in duration-500">
        <div className="text-center space-y-2">
          <div className="bg-brand-pink text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg animate-float">
            <Sparkles size={32} />
          </div>
          <h2 className="font-display text-4xl text-brand-pink">{isLogin ? 'Welcome Back!' : 'Join the Club!'}</h2>
          <p className="text-gray-500 italic">Sign in for exclusive rewards & easy bookings ✨</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="relative">
              <input
                required
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 pl-12 bg-brand-soft-pink rounded-3xl outline-none border-2 border-transparent focus:border-brand-pink transition-all"
              />
              <UserIcon className="absolute left-4 top-4 text-brand-pink" size={20} />
            </div>
          )}

          <div className="relative">
            <input
              required
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 pl-12 bg-brand-soft-pink rounded-3xl outline-none border-2 border-transparent focus:border-brand-pink transition-all"
            />
            <Mail className="absolute left-4 top-4 text-brand-pink" size={20} />
          </div>

          <div className="relative">
            <input
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 pl-12 bg-brand-soft-pink rounded-3xl outline-none border-2 border-transparent focus:border-brand-pink transition-all"
            />
            <Lock className="absolute left-4 top-4 text-brand-pink" size={20} />
          </div>

          <button type="submit" className="btn-primary w-full py-5 text-2xl mt-4">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="text-center pt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-brand-pink font-bold hover:underline"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
