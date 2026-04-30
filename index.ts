import express from 'express';
import { GoogleGenAI } from "@google/genai";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET || 'mapresh_secret_key_123';

interface User {
  email: string;
  password: string;
  name: string;
  loyaltyPoints: number;
}

interface Order {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: string;
  userEmail: string;
}

const db: { users: User[], orders: Order[] } = {
  users: [],
  orders: []
};

// Auth: Signup
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, name } = req.body;
  if (db.users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = { email, password: hashedPassword, name, loyaltyPoints: 50 };
  db.users.push(newUser);
  
  const token = jwt.sign({ email: newUser.email }, JWT_SECRET);
  res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
  res.json({ user: { email: newUser.email, name: newUser.name, loyaltyPoints: newUser.loyaltyPoints } });
});

// Auth: Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ email: user.email }, JWT_SECRET);
  res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
  res.json({ user: { email: user.email, name: user.name, loyaltyPoints: user.loyaltyPoints } });
});

// Auth: Logout
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

// Auth: Verify Session
app.get('/api/auth/me', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    const user = db.users.find(u => u.email === decoded.email);
    if (!user) return res.status(401).json({ message: 'User not found' });
    res.json({ user: { email: user.email, name: user.name, loyaltyPoints: user.loyaltyPoints } });
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Orders: Get User Orders
app.get('/api/orders', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    const userOrders = db.orders.filter(o => o.userEmail === decoded.email);
    res.json(userOrders);
  } catch (e) {
     res.status(401).json({ message: 'Session expired' });
  }
});

// Orders: Place Order
app.post('/api/orders', (req, res) => {
  const token = req.cookies.token;
  let userEmail = 'guest';

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
      userEmail = decoded.email;
      const user = db.users.find(u => u.email === userEmail);
      if (user) {
        user.loyaltyPoints += Math.floor(req.body.total / 10);
      }
    } catch (e) {}
  }

  const newOrder: Order = {
    id: Math.random().toString(36).substr(2, 9).toUpperCase(),
    date: new Date().toLocaleDateString(),
    items: req.body.items,
    total: req.body.total,
    status: req.body.items.some((i: string) => i.includes('(Salon)')) ? 'Confirmed ✨' : 'Packaging 🏠',
    userEmail
  };

  db.orders.push(newOrder);
  res.json(newOrder);
});

export default app;
