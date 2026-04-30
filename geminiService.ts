import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function chatWithMapreshAI(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  try {
    const systemInstruction = `You are Mapresh AI, the ultra-stylish assistant for Mapresh Daniels Beauty & Co. 
    Location: Malamulele, Phaweni Village.
    Deliveries: WE DELIVER all boutique items (handbags, skincare, hair products) 🏠✨.
    Salon Services: Services like Braids, Nails, Microblading are SALON-ONLY. 💇‍♀️💅
    Be friendly, bubbly, and use plenty of emojis! Prices are in Rands (R).`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: { systemInstruction }
    });
    
    return response.text || "I'm here to help! ✨ What else would you like to know?";
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "I'm sorry, I'm having a little trouble connecting right now! 🌸 Please try again in a moment or contact us directly!";
  }
}
