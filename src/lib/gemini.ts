export async function askAI(prompt: string) {
  const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  
  if (!apiKey) {
    console.error("Hugging Face API Key එක නැහැ මචං!");
    return "API Key Missing";
  }

  console.log("AI එකට පණිවිඩය යැව්වා:", prompt);

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: `<s>[INST] ${prompt} [/INST]`,
          parameters: { max_new_tokens: 500, temperature: 0.7 }
        }),
      }
    );

    const result = await response.json();
    console.log("AI එකෙන් ආපු අමු දත්ත:", result);

    if (Array.isArray(result) && result[0].generated_text) {
      const fullText = result[0].generated_text;
      const answer = fullText.split("[/INST]").pop().trim();
      return answer;
    }
    
    if (result.error) {
      console.error("AI Error:", result.error);
      return "Error: " + result.error;
    }

    return "AI response format error";
  } catch (error) {
    console.error("Network Error:", error);
    return "Network error occurred";
  }
}
