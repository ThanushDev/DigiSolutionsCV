import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Lightbulb, Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../../lib/gemini';

export function Skills() {
  const { cvData, addSkill, removeSkill } = useCV();
  const [newSkill, setNewSkill] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchAiSuggestions = async () => {
    setAiLoading(true);
    try {
      const prompt = `Suggest 8 trending professional skills for a ${cvData.personalInfo.description || "Professional"}. Only return a comma-separated list of skill names.`;
      const result = await askAI(prompt);
      if (result) {
        const skillsArray = result.split(',').map(s => s.trim().replace(/\*/g, ''));
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
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={() => { if(newSkill) { addSkill(newSkill); setNewSkill(''); } }} 
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
        >
          Add
        </button>
        <button 
          onClick={fetchAiSuggestions} 
          disabled={aiLoading}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-50 text-purple-600 border border-purple-200 rounded-xl font-bold hover:bg-purple-100 transition-all disabled:opacity-50"
        >
          {aiLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          AI Suggest
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 bg-purple-50/50 rounded-2xl border border-dashed border-purple-200 animate-in zoom-in duration-300">
          {suggestions.map((s, i) => (
            <button 
              key={i} 
              onClick={() => { addSkill(s); setSuggestions(prev => prev.filter(item => item !== s)); }} 
              className="px-3 py-1 bg-white border border-purple-100 rounded-full text-xs font-medium text-purple-700 hover:bg-purple-600 hover:text-white transition-all shadow-sm"
            >
              + {s}
            </button>
          ))}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cvData.skills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 group hover:border-blue-200 transition-all">
            <div className="flex items-center gap-2">
              <Lightbulb size={14} className="text-amber-500" />
              <span className="text-sm font-medium text-gray-700">{skill}</span>
            </div>
            <button onClick={() => removeSkill(index)} className="text-gray-400 hover:text-red-500 transition-colors">
              <XIcon size={16}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
