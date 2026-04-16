import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function askAI(prompt: string) {
  try {
    // 404 error එක එන එක නතර කරන්න model එකේ නම "gemini-1.5-flash" ම තියලා, 
    // SDK එකට ඒක හරියටම අල්ලගන්න ඉඩ දෙමු.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // වැදගත්: text එක ඇතුළේ JSON format එකක් හරි Markdown symbols හරි ආවොත් ඒවා clean කරන්න
    return text.trim() || null;
  } catch (error) {
    console.error("Gemini Error:", error);
    // මෙතනදී error එකක් ආවොත් null යන නිසා UI එක crash වෙන්නේ නැහැ
    return null; 
  }
}
