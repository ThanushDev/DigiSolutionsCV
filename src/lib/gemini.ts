import { GoogleGenerativeAI } from "@google/generative-ai";

// Vite වලදී අනිවාර්යයෙන්ම VITE_ ලෙස ආරම්භ විය යුතුයි
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("Gemini API Key is missing! Check your .env.local file.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export async function askAI(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) throw new Error("Empty response from AI");
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null; // Error එකක් ආවොත් null යවනවා
  }
}
