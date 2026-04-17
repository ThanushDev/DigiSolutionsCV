import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../../lib/gemini';

export function ProfessionalQualifications() {
  const { cvData, addProfessionalQualification, removeProfessionalQualification, updateProfessionalQualification } = useCV();
  const [newVal, setNewVal] = useState('');
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const handleAdd = () => {
    if (newVal.trim()) {
      addProfessionalQualification(newVal.trim());
      setNewVal('');
    }
  };

  const handleImprove = async (index: number, text: string) => {
    setLoadingIndex(index);
    const result = await askAI(`Rewrite this professional qualification to sound better: "${text}"`);
    if (result) updateProfessionalQualification(index, result.trim());
    setLoadingIndex(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <input 
          value={newVal}
          onChange={(e) => setNewVal(e.target.value)}
          placeholder="e.g. Diploma in Information Technology"
          className="flex-1 px-4 py-3 border rounded-2xl outline-none"
        />
        <button onClick={handleAdd} className="p-3 bg-zinc-900 text-white rounded-2xl flex justify-center"><PlusIcon/></button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {cvData.professionalQualifications.map((q, i) => (
          <div key={i} className="p-4 md:p-5 bg-white border border-zinc-100 rounded-3xl flex justify-between items-center shadow-sm">
            <div className="flex-1 mr-4">
              <p className="text-sm font-bold text-zinc-700">{q}</p>
              <button onClick={() => handleImprove(i, q)} className="mt-2 flex items-center gap-1 text-[9px] font-black text-purple-600 uppercase tracking-widest">
                {loadingIndex === i ? <Loader2 size={10} className="animate-spin"/> : <Sparkles size={10}/>} AI Improve
              </button>
            </div>
            <button onClick={() => removeProfessionalQualification(i)} className="text-zinc-300 hover:text-red-500 shrink-0"><XIcon size={18}/></button>
          </div>
        ))}
      </div>
    </div>
  );
}
