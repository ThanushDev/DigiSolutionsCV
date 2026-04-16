import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, TrashIcon, Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../../services/ai';

export function WorkExperience() {
  const { cvData, addWorkExperience, updateWorkExperience, removeWorkExperience } = useCV();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleImprove = async (id: string, text: string) => {
    if(!text) return;
    setLoadingId(id);
    const res = await askAI('improve', { text });
    if(res) updateWorkExperience(id, { description: res.trim() });
    setLoadingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-black uppercase text-gray-500">Work Experience</h2>
        <button onClick={addWorkExperience} className="text-blue-600 font-black text-xs uppercase">+ Add Work</button>
      </div>
      {cvData.workExperience.map((exp) => (
        <div key={exp.id} className="p-6 bg-white border rounded-3xl space-y-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Job Title" value={exp.title} onChange={e => updateWorkExperience(exp.id, { title: e.target.value })} className="px-4 py-2 border rounded-xl text-sm" />
            <input placeholder="Company" value={exp.company} onChange={e => updateWorkExperience(exp.id, { company: e.target.value })} className="px-4 py-2 border rounded-xl text-sm" />
          </div>
          <div className="relative">
             <button onClick={() => handleImprove(exp.id, exp.description)} className="absolute right-2 top-2 z-10 text-[9px] font-bold bg-purple-100 text-purple-600 px-2 py-1 rounded-lg uppercase">
               {loadingId === exp.id ? <Loader2 size={10} className="animate-spin"/> : <Sparkles size={10}/>} AI Refine
             </button>
             <textarea placeholder="Responsibilities..." value={exp.description} onChange={e => updateWorkExperience(exp.id, { description: e.target.value })} rows={3} className="w-full px-4 py-3 border rounded-xl text-sm pt-8" />
          </div>
          <button onClick={() => removeWorkExperience(exp.id)} className="text-red-500 text-xs font-bold uppercase">Remove</button>
        </div>
      ))}
    </div>
  );
}
