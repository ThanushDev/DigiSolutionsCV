import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../../services/ai';

export function PersonalInfo() {
  const { cvData, updatePersonalInfo } = useCV();
  const [loading, setLoading] = useState(false);

  const handleAiMagic = async () => {
    if (!cvData.personalInfo.name) return alert("Please enter your name first!");
    setLoading(true);
    const result = await askAI('summary', { 
      name: cvData.personalInfo.name, 
      title: cvData.personalInfo.description || "Professional", 
      skills: cvData.skills.join(', ') 
    });
    if (result) updatePersonalInfo({ description: result.trim() });
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">Display Name</label>
        <input type="text" value={cvData.personalInfo.name} onChange={(e) => updatePersonalInfo({ name: e.target.value })} className="w-full px-4 py-2.5 border rounded-xl" />
      </div>
      <div className="md:col-span-2 space-y-1.5">
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-semibold text-gray-700">Professional Summary</label>
          <button onClick={handleAiMagic} disabled={loading} className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-[10px] font-bold uppercase">
            {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />} AI Polish
          </button>
        </div>
        <textarea value={cvData.personalInfo.description} onChange={(e) => updatePersonalInfo({ description: e.target.value })} rows={4} className="w-full px-4 py-2.5 border rounded-xl" />
      </div>
    </div>
  );
}
