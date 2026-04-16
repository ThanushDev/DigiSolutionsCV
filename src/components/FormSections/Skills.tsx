import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../../services/ai';

export function Skills() {
  const { cvData, addSkill, removeSkill } = useCV();
  const [newSkill, setNewSkill] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchAiSuggestions = async () => {
    setAiLoading(true);
    const result = await askAI('suggest_skills', { jobTitle: cvData.personalInfo.description || "Professional" });
    if (result) setSuggestions(result.split(',').map((s: string) => s.trim()));
    setAiLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add a skill..." className="flex-1 px-4 py-2.5 border rounded-xl" />
        <button onClick={() => { if(newSkill) addSkill(newSkill); setNewSkill(''); }} className="px-6 bg-blue-600 text-white rounded-xl font-bold">Add</button>
      </div>
      <button onClick={fetchAiSuggestions} disabled={aiLoading} className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
        {aiLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />} Get AI Suggestions
      </button>
      <div className="flex flex-wrap gap-2">
        {suggestions.map(s => <button key={s} onClick={() => addSkill(s)} className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-bold">+ {s}</button>)}
      </div>
      <div className="flex flex-wrap gap-2">
        {cvData.skills.map((s, i) => <div key={i} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">{s} <XIcon size={14} onClick={() => removeSkill(i)} className="cursor-pointer" /></div>)}
      </div>
    </div>
  );
}
