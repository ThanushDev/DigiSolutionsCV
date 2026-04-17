import React, { useState, useEffect } from 'react';
import { askAI } from '../../lib/gemini';
import { CVTemplateBase } from './CVTemplateBase';
import { templateThemes } from '../../types/cv';

export function TemplateRenderer({ cvData, scale = 1 }: { cvData: any; scale?: number }) {
  const [atsScore, setAtsScore] = useState<number>(0);
  const [tips, setTips] = useState<string>("");

  // දැනට තෝරාගෙන තියෙන theme එක හොයාගන්නවා
  const currentTheme = templateThemes.find(t => t.id === cvData.selectedTemplate) || templateThemes[0];

  useEffect(() => {
    const analyzeCV = async () => {
      if (!cvData.personalInfo.name) return;
      try {
        const prompt = `Analyze this CV data and give an ATS score out of 100 and one short tip to improve it. 
        Data: ${JSON.stringify(cvData)}. 
        Format your response exactly like this: "Score: [number], Tip: [text]"`;
        
        const result = await askAI(prompt);
        const scoreMatch = result.match(/Score:\s*(\d+)/);
        const tipMatch = result.match(/Tip:\s*(.*)/);
        
        if (scoreMatch) setAtsScore(parseInt(scoreMatch[1]));
        if (tipMatch) setTips(tipMatch[1]);
      } catch (e) {
        setAtsScore(50);
      }
    };

    const timer = setTimeout(analyzeCV, 3000);
    return () => clearTimeout(timer);
  }, [cvData]);

  return (
    <div className="relative">
      {/* ATS Score & Tips Floating Badge (Optional) */}
      {atsScore > 0 && (
        <div className="absolute -top-12 left-0 right-0 flex justify-between items-center bg-white/90 p-3 rounded-2xl shadow-sm border border-blue-50 z-10 scale-[0.8] md:scale-100">
          <div>
            <span className="text-[10px] font-black uppercase text-gray-400 block">ATS Score</span>
            <span className="text-lg font-black text-blue-600">{atsScore}%</span>
          </div>
          <div className="flex-1 ml-4 border-l pl-4">
            <span className="text-[10px] font-black uppercase text-gray-400 block">AI Suggestion</span>
            <p className="text-[11px] text-gray-600 leading-tight">{tips}</p>
          </div>
        </div>
      )}

      {/* ඇත්තම CV එක පෙන්වන තැන */}
      <CVTemplateBase cvData={cvData} theme={currentTheme} scale={scale} />
    </div>
  );
}
