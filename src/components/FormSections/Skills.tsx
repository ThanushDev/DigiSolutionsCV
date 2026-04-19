import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../../lib/gemini';

export function Skills() {
  const context = useCV();
  const [inputValue, setInputValue] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  if (!context) return null;
  const { cvData, addSkill, removeSkill } = context;
  const currentSkills = cvData?.skills || [];

  const handleManualAdd = () => {
    if (inputValue.trim()) {
      addSkill(inputValue.trim());
      setInputValue('');
    }
  };

  const fetchAiSuggestions = async () => {
    setAiLoading(true);
    try {
      const desc = cvData?.personalInfo?.description || "Job Seeker";
      const prompt = `Give me 8 professional skills for a ${desc}. Return only as a comma separated list. No intro.`;
      const result = await askAI(prompt);
      if (result) {
        const skillsArray = result.split(',').map(s => s.trim().replace(/\./g, ''));
        setSuggestions(skillsArray);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row gap-2">
        <input 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleManualAdd()}
          placeholder="Add a skill (e.g. React, English)"
          className="flex-1 px-4 py-3 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
        />
        <button onClick={handleManualAdd} className="px-6 py-3 sm:py-0 bg-zinc-900 text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest">Add</button>
      </div>

      <button 
        onClick={fetchAiSuggestions}
        disabled={aiLoading}
        className="w-full py-4 bg-amber-50 text-amber-600 rounded-[2rem] border-2 border-dashed border-amber-200 font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-amber-100 transition-all"
      >
        {aiLoading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />} 
        {aiLoading ? "AI is Thinking..." : "Get AI Suggestions"}
      </button>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 bg-zinc-50 rounded-3xl border border-zinc-100">
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => { addSkill(s); setSuggestions(prev => prev.filter(x => x !== s)); }} className="px-3 py-1.5 bg-white border rounded-full text-[10px] font-bold text-zinc-600 hover:bg-blue-600 hover:text-white transition-colors capitalize">
              + {s}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {currentSkills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl shadow-sm animate-in zoom-in duration-300">
            <span className="text-sm font-semibold text-zinc-700">
              {/* මෙතන තමයි වැදගත්ම දේ: Object එකක් ආවොත් ඒකේ name එක පෙන්වනවා නැත්නම් කෙලින්ම skill එක පෙන්වනවා */}
              {typeof skill === 'object' ? (skill as any).name : skill}
            </span>
            <button onClick={() => removeSkill(index)} className="text-zinc-400 hover:text-red-500"><XIcon size={14}/></button>
          </div>
        ))}
      </div>
    </div>
  );
}
