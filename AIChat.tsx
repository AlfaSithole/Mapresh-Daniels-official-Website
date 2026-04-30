import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Sparkles } from 'lucide-react';
import { chatWithMapreshAI } from '../services/geminiService';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm Mapresh AI ✨ How can I help you sparkle today? 🌸", sender: 'bot' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    // Convert local messages to Gemini history format
    const history = messages.slice(1).map(m => ({
      role: m.sender === 'bot' ? 'model' : 'user' as any,
      parts: [{ text: m.text }]
    }));

    const response = await chatWithMapreshAI(userMsg, history);
    setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-brand-pink text-white p-4 rounded-full shadow-2xl flex items-center gap-2 hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <MessageCircle size={28} />
        <span className="font-display text-lg hidden group-hover:inline">Chat with Mapresh AI</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[85vw] md:w-96 h-[70vh] bg-white rounded-[2rem] shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300 border-2 border-brand-light-pink">
          <div className="bg-brand-pink p-5 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <Sparkles className="animate-pulse" size={20} />
              <h3 className="font-display text-2xl font-bold">Mapresh AI ✨</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-soft-pink/30">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-3xl text-sm shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-brand-light-pink text-gray-800 rounded-tr-none'
                      : 'bg-brand-pink text-white rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-brand-pink opacity-70 text-white p-4 rounded-3xl rounded-tl-none text-sm animate-pulse">
                  Mapresh is typing... ✨
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t bg-white flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me about services, prices..."
              className="flex-1 p-3 border-2 border-brand-light-pink rounded-full focus:outline-none focus:border-brand-pink transition-colors text-sm"
            />
            <button
              onClick={handleSend}
              className="bg-brand-pink text-white p-3 rounded-full hover:bg-brand-hover-pink transition-colors flex shadow-sm"
              disabled={isLoading}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
