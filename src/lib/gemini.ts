export async function askAI(prompt: string) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("API Key missing! Check your GitHub Secrets.");
    return null;
  }

  // මෙතන v1 වෙනුවට v1beta දාන්න. එතකොට gemini-1.5-flash හොයාගන්න පුළුවන්.
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API Error Detail:", data.error);
      return null;
    }

    if (data.candidates && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text.trim();
    }
    
    return null;
  } catch (error) {
    console.error("Network Error (Gemini):", error);
    return null;
  }
}
