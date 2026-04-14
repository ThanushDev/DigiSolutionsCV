import React, { useState, useEffect } from 'react';
import { CVData } from '../../types/cv';
import { Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

// ... (ProfessionalLayout කෝඩ් එක එලෙසම පවතී)

export function TemplateRenderer({ cvData, scale = 1 }: { cvData: CVData; scale?: number }) {
  const [atsScore, setAtsScore] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tips, setTips] = useState<string[]>([]);

  // දත්ත වෙනස් වන හැම වෙලේම Score එක update කරනවා
  useEffect(() => {
    const analyzeCV = async () => {
      setIsAnalyzing(true);
      // මෙතනදී AI එකට මුළු cvData එකම යවලා analysis එක ගන්නවා
      try {
        const response = await fetch('/api/ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'ats_analysis', data: cvData })
        });
        const result = await response.json();
        setAtsScore(result.score);
        setTips(result.tips);
      } catch (e) {
        setAtsScore(45); // Error එකක් වුනොත් default score එකක්
      } finally {
        setIsAnalyzing(false);
      }
    };

    const timer = setTimeout(analyzeCV, 2000); // යූසර් type කරලා නතර කළාම analyze කරන්න
    return () => clearTimeout(timer);
  }, [cvData]);

  const configs: Record<number, any> = {
    1: { sidebar: "bg-gray-50", accent: "border-blue-600", text: "text-blue-600", isDefault: true },
    // ... (අනිත් configs එලෙසමයි)
  };

  const theme = configs[cvData.selectedTemplate] || configs[1];

  return (
    <div className="flex flex-col items-center w-full gap-6">
      {/* AI ATS Score Widget - Floating Style */}
      <div className="w-[210mm] bg-white border border-purple-100 rounded-3xl p-4 shadow-sm flex items-center justify-between animate-in slide-in-from-top-4 duration-700">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="28" fill="transparent" stroke="#f3e8ff" strokeWidth="4" />
              <circle 
                cx="32" cy="32" r="28" fill="transparent" stroke="#9333ea" strokeWidth="4" 
                strokeDasharray={176} strokeDashoffset={176 - (176 * atsScore) / 100}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <span className="absolute font-black text-purple-700 text-sm">{atsScore}%</span>
          </div>
          <div>
            <h5 className="text-[12px] font-black uppercase tracking-widest text-purple-600 flex items-center gap-2">
              <Sparkles size={14} /> AI ATS Strength
            </h5>
            <p className="text-[11px] text-gray-500 font-medium">
              {isAnalyzing ? "Analyzing your CV content..." : tips[0] || "Add more skills to boost your score!"}
            </p>
          </div>
        </div>
        <div className="hidden sm:flex gap-2">
           {atsScore > 70 ? (
             <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase flex items-center gap-1">
               <CheckCircle2 size={12} /> Optimized
             </span>
           ) : (
             <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold uppercase flex items-center gap-1">
               <AlertCircle size={12} /> Needs Work
             </span>
           )}
        </div>
      </div>

      {/* CV Renderer */}
      <div className="flex justify-center w-full">
        <div className="transition-transform duration-500 ease-in-out origin-top" style={{ transform: `scale(${scale})`, width: '210mm' }}>
          <ProfessionalLayout 
            d={cvData} 
            sidebarBg={theme.sidebar} 
            accentColor={theme.accent} 
            textColor={theme.text}
            isDefault={theme.isDefault}
          />
        </div>
      </div>
    </div>
  );
}
