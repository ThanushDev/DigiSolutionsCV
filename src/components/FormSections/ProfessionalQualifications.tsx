import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../../lib/gemini';

export function ProfessionalQualifications() {
  const { cvData, addProfessionalQualification, removeProfessionalQualification, updateProfessionalQualification } = useCV();
  const [newQual, setNewQual] = useState('');
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const handleAdd = () => {
    if (newQual.trim()) {
      addProfessionalQualification(newQual.trim());
      setNewQual('');
    }
  };

  const handleImprove = async (index: number, text: string) => {
    setLoadingIndex(index);
    const result = await askAI(`Improve this qualification: "${text}". Keep it professional.`);
    if (result) updateProfessionalQualification(index, result.trim());
    setLoadingIndex(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input 
          value={newQual}
          onChange={(e) => setNewQual(e.target.value)}
          placeholder="e.g. Diploma in Graphic Design"
          className="flex-1 px-4 py-2 border rounded-xl outline-none"
        />
        <button onClick={handleAdd} className="p-2 bg-blue-600 text-white rounded-xl"><PlusIcon/></button>
      </div>

      {cvData.professionalQualifications.map((q, i) => (
        <div key={i} className="p-4 bg-white border rounded-2xl flex justify-between items-center shadow-sm">
          <div className="flex-1 mr-4">
            <p className="text-sm font-medium">{q}</p>
            <button onClick={() => handleImprove(i, q)} className="text-[10px] text-blue-600 font-bold flex items-center gap-1 mt-1">
              {loadingIndex === i ? <Loader2 size={10} className="animate-spin"/> : <Sparkles size={10}/>} AI IMPROVE
            </button>
          </div>
          <button onClick={() => removeProfessionalQualification(i)} className="text-red-300"><XIcon size={18}/></button>
        </div>
      ))}
    </div>
  );
}
