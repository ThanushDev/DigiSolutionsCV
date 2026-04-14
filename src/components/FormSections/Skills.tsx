import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Lightbulb, Sparkles, Loader2 } from 'lucide-react';

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
      // Suggestion එකක් click කළා නම් ඒක අයින් කරනවා
      setSuggestions(prev => prev.filter(s => s !== skillToAdd));
    }
  };

  const fetchAiSuggestions = async () => {
    setAiLoading(true);
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'suggest_skills',
          data: { jobTitle: cvData.personalInfo.description || "Professional" }
        }),
      });
      const { result } = await response.json();
      // "Skill1, Skill2" විදිහට එන response එක array එකකට හරවනවා
      const skillsArray = result.split(',').map((s: string) => s.trim());
      setSuggestions(skillsArray);
    } catch (error) {
      console.error("AI Suggestions Error:", error);
    } finally {
      setAiLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Input Section */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center ml-1">
          <label className="block text-[11px] font-black uppercase tracking-widest text-gray-500">
            Add a Professional Skill
          </label>
          <button 
            onClick={fetchAiSuggestions}
            disabled={aiLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-600 rounded-lg text-[10px] font-bold uppercase hover:bg-purple-100 transition-all border border-purple-100"
          >
            {aiLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
            AI Suggestions
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="e.g., Cash handling, Team management"
            className="flex-1 px-4 py-3.5 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm bg-white"
          />
          <button
            onClick={() => handleAddSkill()}
            disabled={!newSkill.trim()}
            className="w-full sm:w-auto px-6 py-3.5 md:py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-200 transition-all flex items-center justify-center gap-2 font-bold text-sm shadow-md"
          >
            <PlusIcon className="w-5 h-5 sm:w-4 sm:h-4" />
            Add
          </button>
        </div>
      </div>

      {/* AI Suggestions Chips */}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 animate-in slide-in-from-top-2">
          {suggestions.map((skill, i) => (
            <button
              key={i}
              onClick={() => handleAddSkill(skill)}
              className="px-3 py-1.5 bg-white border border-purple-200 text-purple-600 text-[11px] font-bold rounded-full hover:bg-purple-600 hover:text-white transition-all shadow-sm"
            >
              + {skill}
            </button>
          ))}
        </div>
      )}

      {/* Skills List Area */}
      <div className="space-y-3">
        <label className="block text-[11px] font-black uppercase tracking-widest text-gray-500 ml-1">
          My Skills
        </label>
        
        {cvData.skills.length > 0 ? (
          <div className="grid grid-cols-1 gap-2.5">
            {cvData.skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm group"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-1.5 bg-amber-50 rounded-lg">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                  </div>
                  <span className="text-gray-700 text-sm md:text-base font-medium leading-tight">
                    {skill}
                  </span>
                </div>
                <button
                  onClick={() => removeSkill(index)}
                  className="ml-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <XIcon className="w-5 h-5 sm:w-4 sm:h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-3xl">
            <p className="text-xs sm:text-sm text-gray-400 font-medium px-6">
              No skills added yet. Professional skills help you stand out.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
