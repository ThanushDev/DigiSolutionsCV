// src/services/ai.ts

/**
 * AI Content Generator Service
 * මෙතනින් තමයි Gemini API එකට request එක යවන්නේ.
 */

export async function generateAIContent(prompt: string): Promise<string> {
  try {
    // සැබෑ API එකක් නැති අවස්ථාවක පරීක්ෂා කිරීමට (Optional Delay)
    // await new Promise(resolve => setTimeout(resolve, 1000));

    // මෙතනට ඔයාගේ Backend API URL එක හෝ 
    // සෘජුවම Gemini API එක call කරන logic එක දාන්න පුළුවන්.
    // දැනට අපි සරලව fetch එකක් පාවිච්චි කරමු.
    
    // සටහන: Client-side එකේ API Keys තියන එක ආරක්ෂිත නැති නිසා 
    // සාමාන්‍යයෙන් මේක Backend එකක් හරහා කරන එක හොඳයි.
    // දැනට Build එක fix කරන්න අපි සරල response එකක් එවමු:
    
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBJL1YXMobisasDKcDB30ixA8ellW_oPqY', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text.trim();
    
  } catch (error) {
    console.error("AI Service Error:", error);
    return ""; // Error එකක් වුනොත් හිස්ව එවන්න
  }
}
