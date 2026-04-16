import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Lightbulb, Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../../lib/gemini';

export function Skills() {
  const { cvData, addSkill, removeSkill } = useCV();
  const [newSkill, setNewSkill] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleAddSkill = (skillText?: string) => {
    const skillToAdd = skillText || newSkill;
    if (skillToAdd.trim()) {
      addSkill(skillToAdd.trim());
      setNewSkill('');
      setSuggestions(prev => prev.filter(s => s !== skillToAdd));
    }
  };

  const fetchAiSuggestions = async () => {
    setAiLoading(true);
    try {
      const prompt = `Suggest 8 professional skills for a ${cvData.personalInfo.description || "Professional"}. Return only a comma separated list.`;
      const result = await askAI(prompt);
      if (result) {
        setSuggestions(result.split(',').map(s => s.trim()));
      }
    } catch (error) { console.error(error); }
    finally { setAiLoading(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Type a skill and press enter"
          className="flex-1 px-4 py-2 border rounded-xl"
          onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
        />
        <button onClick={() => handleAddSkill()} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Add</button>
      </div>

      <button 
        onClick={fetchAiSuggestions} 
        disabled={aiLoading}
        className="w-full py-3 bg-amber-50 text-amber-600 rounded-2xl border-2 border-dashed border-amber-200 font-bold flex items-center justify-center gap-2"
      >
        {aiLoading ? <Loader2 className="animate-spin" /> : <Sparkles />} GET AI SUGGESTIONS
      </button>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-xl">
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => handleAddSkill(s)} className="px-3 py-1 bg-white border rounded-full text-xs">+ {s}</button>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {cvData.skills.map((skill, index) => (
          <div key={index} className="flex justify-between p-3 bg-white border rounded-xl items-center">
            <span className="text-sm">{skill}</span>
            <button onClick={() => removeSkill(index)} className="text-red-400"><XIcon size={16}/></button>
          </div>
        ))}
      </div>
    </div>
  );
}
