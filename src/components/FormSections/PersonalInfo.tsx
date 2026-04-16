import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../../lib/gemini';

export function PersonalInfo() {
  const { cvData, updatePersonalInfo } = useCV();
  const [loading, setLoading] = useState(false);

  const handleAiMagic = async () => {
    if (!cvData.personalInfo.name) return alert("Please enter your name first!");
    setLoading(true);
    try {
      const prompt = `Write a professional CV summary for ${cvData.personalInfo.name} who is a ${cvData.personalInfo.description || "Professional"}. Skills: ${cvData.skills.join(', ')}. Keep it around 40 words and use professional English.`;
      const result = await askAI(prompt);
      if (result) updatePersonalInfo({ description: result.trim() });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
      <div className="md:col-span-2 space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700 ml-1">Full Name</label>
        <input
          type="text"
          value={cvData.personalInfo.name}
          onChange={(e) => updatePersonalInfo({ name: e.target.value })}
          className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white"
        />
      </div>

      <div className="md:col-span-2 space-y-1.5">
        <div className="flex justify-between items-center mb-1 ml-1">
          <label className="block text-sm font-semibold text-gray-700">Professional Summary</label>
          <button 
            onClick={handleAiMagic} 
            disabled={loading}
            className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-[10px] font-bold uppercase transition-all hover:opacity-90 active:scale-95"
          >
            {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
            AI Polish
          </button>
        </div>
        <textarea
          value={cvData.personalInfo.description}
          onChange={(e) => updatePersonalInfo({ description: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
          placeholder="Briefly describe your professional background..."
        />
      </div>
    </div>
  );
}
