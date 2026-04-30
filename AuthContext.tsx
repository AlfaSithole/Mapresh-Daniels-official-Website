import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  loyaltyPoints: number;
}

interface Order {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: 'Processing' | 'Delivered' | 'Confirmed';
}

interface AuthContextType {
  user: User | null;
  orders: Order[];
  login: (email: string, name: string) => void;
  logout: () => void;
  addOrder: (items: string[], total: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          fetchOrders();
        }
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (email: string, name: string) => {
    // In a real app we'd have a separate signup/login form
    // Here we'll try login first, then signup if it fails
    try {
      let res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'password123' }) // Simplified for demo
      });

      if (!res.ok) {
        res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password: 'password123', name })
        });
      }

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        fetchOrders();
      } else {
        alert('Authentication failed');
      }
    } catch (e) {
      alert('Network error');
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setOrders([]);
  };

  const addOrder = async (items: string[], total: number) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total })
      });
      if (res.ok) {
        const newOrder = await res.json();
        setOrders(prev => [newOrder, ...prev]);
        // Refresh user to get updated loyalty points
        const meRes = await fetch('/api/auth/me');
        if (meRes.ok) {
          const meData = await meRes.json();
          setUser(meData.user);
        }
      }
    } catch (e) {}
  };

  return (
    <AuthContext.Provider value={{ user, orders, login, logout, addOrder }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
