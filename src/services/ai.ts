import { GoogleGenerativeAI } from "@google/generative-ai";

// .env.local එකේ ඇති Key එක ලබා ගැනීම
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY || "");

export async function askAI(type: string, data: any) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    let prompt = "";

    switch (type) {
      case "summary":
        prompt = `Write a professional CV summary for ${data.name} who is a ${data.title}. Skills: ${data.skills}. Keep it around 40 words.`;
        break;
      case "improve":
        prompt = `Rewrite this professional experience to be more impactful, formal and professional: "${data.text}"`;
        break;
      case "suggest_skills":
        prompt = `Suggest 5-8 trending professional skills for a ${data.jobTitle} as a comma separated list.`;
        break;
      case "ats_analysis":
        prompt = `Analyze this CV data and give an ATS score out of 100 and 2 short tips. CV Data: ${JSON.stringify(data)}. Return ONLY a JSON object like {"score": 85, "tips": ["Tip 1", "Tip 2"]}`;
        break;
      case "suggest_education":
        prompt = `Suggest 3-5 standard school subjects for a ${data.level} student in ${data.stream} stream. Return as a comma separated list.`;
        break;
      default:
        prompt = data.prompt || "";
    }

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    if (type === "ats_analysis") {
      const jsonMatch = text.match(/\{.*\}/s);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { score: 50, tips: ["Add more details to sections"] };
    }

    return text;
  } catch (error) {
    console.error("AI Error:", error);
    return null;
  }
}
