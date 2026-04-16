import React, { useState, useEffect } from 'react';
import { CVData } from '../../types/cv';
import { Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../../services/ai';

export function TemplateRenderer({ cvData, scale = 1 }: { cvData: CVData; scale?: number }) {
  const [atsScore, setAtsScore] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tips, setTips] = useState<string[]>([]);

  useEffect(() => {
    const analyze = async () => {
      setIsAnalyzing(true);
      const result = await askAI('ats_analysis', cvData);
      if (result) {
        setAtsScore(result.score);
        setTips(result.tips);
      }
      setIsAnalyzing(false);
    };
    const timer = setTimeout(analyze, 3000);
    return () => clearTimeout(timer);
  }, [cvData]);

  return (
    <div className="w-full">
      <div className="mb-6 p-4 bg-purple-50 rounded-2xl flex items-center justify-between border border-purple-100">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-black text-purple-600">{atsScore}%</div>
          <div>
            <h5 className="text-xs font-black uppercase text-purple-600 flex items-center gap-1"><Sparkles size={12}/> AI ATS Strength</h5>
            <p className="text-[10px] text-gray-500">{isAnalyzing ? "Analyzing..." : tips[0] || "Optimizing your CV"}</p>
          </div>
        </div>
      </div>
      {/* ඔයාගේ Template Render වෙන කොටස මෙතනින් පල්ලෙහාට */}
      <div className="flex justify-center" style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
         {/* Render Your ProfessionalLayout here */}
      </div>
    </div>
  );
}
