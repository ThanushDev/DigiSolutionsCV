export async function askAI(prompt: string) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) return "API Key Missing";

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are a professional CV writer. 
            Your task is to provide a high-quality professional CV summary in ENGLISH.
            Even if the user provides information in Sinhala or any other language, you must translate it and output the final summary ONLY in English.
            Keep it concise (around 40 words), impactful, and use professional action verbs.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5, // Accuracy එක වැඩි කරන්න temperature එක පොඩ්ඩක් අඩු කළා
        max_tokens: 500
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response content";
  } catch (error) {
    return "AI Error occurred";
  }
}
