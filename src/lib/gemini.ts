import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function askAI(prompt: string) {
  try {
    // 404 Error එක එන එක නතර කරන්න අපි "gemini-1.5-flash-latest" පාවිච්චි කරමු
    // මේක තමයි දැනට තියෙන stable ම නම.
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest" 
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Empty response from AI");
    }

    return text.trim();
  } catch (error: any) {
    console.error("Gemini Error Details:", error);
    
    // වැදගත්: 404 ආවොත් මේ fallback එක වැඩ කරයි
    if (error.message?.includes("404") || error.message?.includes("not found")) {
      console.log("Retrying with fallback model...");
      try {
        const fallbackModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await fallbackModel.generateContent(prompt);
        return result.response.text().trim();
      } catch (retryError) {
        return null;
      }
    }
    
    return null; 
  }
}
