import { askAI } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { type, data, extra } = await req.json();

  let prompt = "";

  switch (type) {
    case "summary": // Feature 1
      prompt = `Write a professional CV summary for ${data.name} who is a ${data.title}. Skills: ${data.skills}. Keep it around 40 words.`;
      break;
    case "improve": // Feature 2
      prompt = `Rewrite this CV experience/description to be more professional and impactful: "${data.text}"`;
      break;
    case "suggest_skills": // Feature 3
      prompt = `Suggest 5-8 trending professional skills for a ${data.jobTitle} as a comma separated list.`;
      break;
    case "ats_score": // Feature 4
      prompt = `Rate this CV content against this Job Description: CV: ${data.cvText}, JD: ${extra.jd}. Give a percentage score and 2 quick tips.`;
      break;
    case "translate": // Feature 5
      prompt = `Translate this Sinhala professional text to professional English: "${data.text}"`;
      break;
  }

  const response = await askAI(prompt);
  return NextResponse.json({ result: response });
}
