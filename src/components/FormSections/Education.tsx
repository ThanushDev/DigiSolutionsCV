import { askAI } from '../../lib/gemini';

// ... (අනෙක් imports සහ component ආරම්භය)

const handleAiSubjects = async (level: 'oLevel' | 'aLevel', stream: string) => {
  if (!stream) return;
  setIsAiLoading(level);
  try {
    const prompt = `List 8 standard subjects for ${level === 'oLevel' ? 'G.C.E. O/L' : 'G.C.E. A/L'} ${stream} stream in Sri Lanka. Return only a comma-separated list of subject names.`;
    const result = await askAI(prompt);
    
    if (result) {
      const subjectsArray = result.split(',').map(s => s.trim().replace(/\*/g, ''));
      // දැනට තියෙන පරණ subjects අයින් කරන්න (optional)
      // අලුත් subjects ටික loop එකකින් ඇඩ් කරන්න
      subjectsArray.forEach(subName => {
        // මෙතනදී ඔයාගේ context එකේ තියෙන addSubject function එක පාවිච්චි කරන්න
        // සටහන: context එකේ updateSubject එකට index එක හරියට යවන්න ඕනේ
      });
    }
  } catch (e) {
    console.error(e);
  } finally {
    setIsAiLoading(null);
  }
};
