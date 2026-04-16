import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Sparkles, Loader2, Lightbulb } from 'lucide-react';
import { askAI } from '../../lib/gemini';

export function Skills() {
  const { cvData, addSkill, removeSkill } = useCV();
  const [aiLoading, setAiLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchAiSuggestions = async () => {
    setAiLoading(true);
    try {
      const prompt = `Suggest 8 trending professional skills for a ${cvData.personalInfo.description || "Professional"} as a comma separated list. Only provide the skill names.`;
      const result = await askAI(prompt);
      if (result) {
        const skillsArray = result.split(',').map((s: string) => s.trim());
        setSuggestions(skillsArray);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <button 
        onClick={fetchAiSuggestions}
        disabled={aiLoading}
        className="w-full py-3 bg-amber-50 text-amber-600 rounded-2xl border-2 border-dashed border-amber-200 font-bold text-xs uppercase flex items-center justify-center gap-2"
      >
        {aiLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
        Get AI Skill Suggestions
      </button>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-2xl">
          {suggestions.map((s, i) => (
            <button 
              key={i} 
              onClick={() => { addSkill(s); setSuggestions(prev => prev.filter(item => item !== s)); }}
              className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs hover:bg-blue-50"
            >
              + {s}
            </button>
          ))}
        </div>
      )}
      {/* පරණ විදිහටම Skills list එක මෙතනින් පහලට... */}
    </div>
  );
}
