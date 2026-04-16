import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Sparkles, Loader2, Calendar } from 'lucide-react';
import { askAI } from '../../lib/gemini';

export function WorkExperience() {
  const { cvData, addWorkExperience, removeWorkExperience, updateWorkExperience } = useCV();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleImprove = async (id: string, text: string) => {
    if (!text) return alert("Please type your duties first!");
    setLoadingId(id);
    const prompt = `Polished professional version of this job responsibility: "${text}". Keep it concise and impressive.`;
    const result = await askAI(prompt);
    if (result) updateWorkExperience(id, { description: result.trim() });
    setLoadingId(null);
  };

  return (
    <div className="space-y-6">
      <button onClick={addWorkExperience} className="w-full py-3 bg-blue-50 text-blue-600 rounded-2xl border-2 border-dashed border-blue-200 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
        <PlusIcon size={16}/> Add Work Experience
      </button>

      {cvData.workExperience.map((exp) => (
        <div key={exp.id} className="p-6 bg-white border border-zinc-100 rounded-[2.5rem] shadow-xl shadow-zinc-200/50 space-y-4 relative animate-in slide-in-from-bottom-4">
          <button onClick={() => removeWorkExperience(exp.id)} className="absolute top-4 right-4 p-2 text-zinc-300 hover:text-red-500 transition-colors">
            <XIcon size={20}/>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Job Title" value={exp.title} onChange={e => updateWorkExperience(exp.id, { title: e.target.value })} className="px-4 py-3 bg-zinc-50 border-none rounded-2xl text-sm font-bold" />
            <input placeholder="Company Name" value={exp.company} onChange={e => updateWorkExperience(exp.id, { company: e.target.value })} className="px-4 py-3 bg-zinc-50 border-none rounded-2xl text-sm font-bold" />
          </div>

          <div className="relative">
            <textarea 
              placeholder="Your responsibilities... (Click AI Polish to improve)" 
              value={exp.description} 
              onChange={e => updateWorkExperience(exp.id, { description: e.target.value })} 
              rows={4} 
              className="w-full px-5 py-4 bg-zinc-50 border-none rounded-3xl text-sm leading-relaxed" 
            />
            <button 
              onClick={() => handleImprove(exp.id, exp.description)}
              disabled={loadingId === exp.id}
              className="absolute bottom-4 right-4 px-4 py-2 bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-purple-200"
            >
              {loadingId === exp.id ? <Loader2 size={12} className="animate-spin"/> : <Sparkles size={12}/>} AI Polish
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
