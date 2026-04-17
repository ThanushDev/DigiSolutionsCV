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
        // අපි මෙතන පාවිච්චි කරන්නේ Meta ගේ Llama 3 AI එක (පට්ට බලවත්)
        model: "llama3-8b-8192",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response";
  } catch (error) {
    console.error("Groq Error:", error);
    return "AI Error occurred";
  }
}
