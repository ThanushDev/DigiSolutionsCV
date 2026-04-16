import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function askAI(prompt: string) {
  if (!apiKey) {
    console.error("Gemini API Key is missing!");
    return null;
  }

  try {
    // ගොඩක් වෙලාවට වැඩ කරන්නේ මේ නම: "gemini-1.5-flash"
    // ඒක වැඩ නැත්තම් "gemini-pro" කියලා දාලා බලන්නත් පුළුවන්
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim() || null;
  } catch (error: any) {
    console.error("Gemini Error Details:", error);
    
    // 404 ආවොත් විතරක් මේ Fallback එක රන් වෙනවා
    if (error.message?.includes("404")) {
      console.warn("404 detected, trying with legacy model name...");
      try {
        const fallback = genAI.getGenerativeModel({ model: "gemini-pro" });
        const res = await fallback.generateContent(prompt);
        return res.response.text().trim();
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}
