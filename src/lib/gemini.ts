import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function askAI(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    // වැදගත්: response එක text() එකක් විදිහට කෙලින්ම ගන්න
    const text = result.response.text();
    return text || null;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null; 
  }
}
