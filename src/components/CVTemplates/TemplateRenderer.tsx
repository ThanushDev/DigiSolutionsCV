import React, { useState, useEffect } from 'react';
import { askAI } from '../../lib/gemini';

export function TemplateRenderer({ cvData, scale = 1 }: { cvData: any; scale?: number }) {
  const [atsScore, setAtsScore] = useState<number>(0);
  const [tips, setTips] = useState<string>("");

  useEffect(() => {
    const analyzeCV = async () => {
      try {
        const prompt = `Analyze this CV data and give an ATS score out of 100 and one short tip to improve it. 
        Data: ${JSON.stringify(cvData)}. 
        Format your response exactly like this: "Score: [number], Tip: [text]"`;
        
        const result = await askAI(prompt);
        // Result එකෙන් score එකයි tip එකයි වෙන් කරගන්නා හැටි:
        const scoreMatch = result.match(/Score:\s*(\d+)/);
        const tipMatch = result.match(/Tip:\s*(.*)/);
        
        if (scoreMatch) setAtsScore(parseInt(scoreMatch[1]));
        if (tipMatch) setTips(tipMatch[1]);
      } catch (e) {
        setAtsScore(50);
      }
    };

    const timer = setTimeout(analyzeCV, 3000); // User ටයිප් කරලා නතර කරලා තත්පර 3කට පසු
    return () => clearTimeout(timer);
  }, [cvData]);

  // ... (ඉතිරි UI එක පරණ විදිහමයි)
}
