export async function askAI(prompt: string) {
  const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
  if (!apiKey) return null;

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
    
    // Hugging Face එකෙන් එන්නේ array එකක් විදියට
    if (Array.isArray(result) && result[0].generated_text) {
      const fullText = result[0].generated_text;
      // Instruction එක අයින් කරලා උත්තරේ විතරක් ගන්නවා
      return fullText.split("[/INST]").pop().trim();
    }
    return "AI Error occurred";
  } catch (error) {
    console.error("HF Error:", error);
    return null;
  }
}
