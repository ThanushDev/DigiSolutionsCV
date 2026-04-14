// src/lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// NEXT_PUBLIC_ අයින් කරන්න. සාමාන්‍ය රහස් Key එකක් විදිහට ගන්න.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function askAI(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI generation failed. Please try again.";
  }
}
