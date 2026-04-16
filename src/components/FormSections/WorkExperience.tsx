import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Sparkles, Loader2, Briefcase } from 'lucide-react';
import { askAI } from '../../lib/gemini';

export function WorkExperience() {
  const { cvData, addWorkExperience, updateWorkExperience, removeWorkExperience } = useCV();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleImprove = async (id: string, text: string) => {
    if (!text) return;
    setLoadingId(id);
    try {
      const prompt = `Improve this professional work experience description: "${text}". Make it more impactful and use action verbs. Keep it concise.`;
      const result = await askAI(prompt);
      if (result) updateWorkExperience(id, { description: result.trim() });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <button 
        onClick={addWorkExperience} 
        className="w-full py-4 border-2 border-dashed border-blue-200 rounded-2xl text-blue-600 font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-all"
      >
        <PlusIcon size={20} /> Add Work Experience
      </button>

      {cvData.workExperience.map((exp) => (
        <div key={exp.id} className="p-6 bg-white border border-gray-200 rounded-3xl space-y-4 shadow-sm relative group animate-in slide-in-from-bottom-2 duration-300">
          <button 
            onClick={() => removeWorkExperience(exp.id)} 
            className="absolute top-4 right-4 text-gray-300 hover:text-red-500 p-1 rounded-full hover:bg-red-50"
          >
            <XIcon size={18}/>
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              placeholder="Job Title (e.g. Sales Manager)" 
              value={exp.title} 
              onChange={(e) => updateWorkExperience(exp.id, { title: e.target.value })} 
              className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
            />
            <input 
              placeholder="Company Name" 
              value={exp.company} 
              onChange={(e) => updateWorkExperience(exp.id, { company: e.target.value })} 
              className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>

          <div className="relative">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Responsibilities</label>
              <button 
                onClick={() => handleImprove(exp.id, exp.description)}
                disabled={loadingId === exp.id || !exp.description}
                className="flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-600 rounded-lg text-[10px] font-black uppercase hover:bg-purple-100 disabled:opacity-50 transition-all"
              >
                {loadingId === exp.id ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />}
                AI Improve
              </button>
            </div>
            <textarea 
              value={exp.description} 
              onChange={(e) => updateWorkExperience(exp.id, { description: e.target.value })} 
              rows={3} 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/30 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="What did you achieve in this role?"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
