export async function askAI(prompt: string) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    console.error("Groq API Key එක නැහැ මචං!");
    return "API Key Missing";
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // Model එක llama-3.3-70b-versatile එකට මාරු කළා (මේක දැනට හොඳටම වැඩ කරන එක)
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a professional CV writer. Keep responses concise and impactful."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    const data = await response.json();
    
    // මෙතනදී තමයි API එකෙන් දෙන ඇත්තම වැරැද්ද බලාගන්න පුළුවන්
    if (data.error) {
      console.error("Groq API Error Detail:", data.error);
      return `Error: ${data.error.message}`;
    }

    return data.choices?.[0]?.message?.content || "No response content";
  } catch (error) {
    console.error("Groq Fetch Error:", error);
    return "Network error occurred";
  }
}
