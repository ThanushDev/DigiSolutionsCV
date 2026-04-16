import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Sparkles, Loader2, Lightbulb } from 'lucide-react';
import { askAI } from '../../lib/gemini';

export function Skills() {
  const { cvData, addSkill, removeSkill } = useCV();
  const [inputValue, setInputValue] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleManualAdd = () => {
    if (inputValue.trim()) {
      addSkill(inputValue.trim());
      setInputValue('');
    }
  };

  const fetchAiSuggestions = async () => {
    setAiLoading(true);
    try {
      const prompt = `Suggest 8 trending professional skills for a ${cvData.personalInfo.description || "Professional"}. Return only a comma-separated list of skill names.`;
      const result = await askAI(prompt);
      if (result) {
        setSuggestions(result.split(',').map(s => s.trim()));
      } else {
        alert("AI is busy. Please try again.");
      }
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleManualAdd()}
          placeholder="Type a skill (e.g. React, Sales)"
          className="flex-1 px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleManualAdd} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold">ADD</button>
      </div>

      <button 
        onClick={fetchAiSuggestions}
        className="w-full py-3 bg-amber-50 text-amber-600 rounded-2xl border-2 border-dashed border-amber-200 font-bold flex items-center justify-center gap-2"
      >
        {aiLoading ? <Loader2 className="animate-spin" /> : <Sparkles />} GET AI SUGGESTIONS
      </button>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-2xl">
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => { addSkill(s); setSuggestions(prev => prev.filter(x => x !== s)); }} className="px-3 py-1 bg-white border rounded-full text-xs hover:bg-blue-50">+ {s}</button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-2">
        {cvData.skills.map((skill, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-white border rounded-xl shadow-sm">
            <span className="text-sm font-medium">{skill}</span>
            <button onClick={() => removeSkill(index)} className="text-red-400"><XIcon size={16}/></button>
          </div>
        ))}
      </div>
    </div>
  );
}
