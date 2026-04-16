import { GoogleGenerativeAI } from "@google/generative-ai";

// key එක කෙලින්ම දාන්න එපා. GitHub Secret එකෙන් මේක variable එකක් විදියට ගන්නවා.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function askAI(prompt: string) {
  if (!apiKey) {
    console.error("API Key missing!");
    return "API Key එක සැකසීම් වල දමා නැත.";
  }
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}
