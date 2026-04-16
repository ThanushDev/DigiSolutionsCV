import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Award, Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../../lib/gemini';

export function ProfessionalQualifications() {
  const { cvData, addProfessionalQualification, removeProfessionalQualification, updateProfessionalQualification } = useCV();
  const [newQualification, setNewQualification] = useState('');
  const [isEnhancing, setIsEnhancing] = useState<number | null>(null);

  const handleAdd = () => {
    if (newQualification.trim()) {
      addProfessionalQualification(newQualification);
      setNewQualification('');
    }
  };

  const enhance = async (index: number, text: string) => {
    setIsEnhancing(index);
    try {
      const result = await askAI(`Improve this professional qualification: "${text}". Keep it short.`);
      if (result) updateProfessionalQualification(index, result.trim());
    } finally { setIsEnhancing(null); }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input
          value={newQualification}
          onChange={(e) => setNewQualification(e.target.value)}
          placeholder="e.g. Diploma in IT"
          className="flex-1 px-4 py-2 border rounded-xl"
        />
        <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-xl"><PlusIcon/></button>
      </div>

      <div className="space-y-3">
        {cvData.professionalQualifications.map((q, i) => (
          <div key={i} className="p-4 bg-white border rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{q}</p>
              <button onClick={() => enhance(i, q)} className="text-[10px] text-blue-600 font-bold flex items-center gap-1">
                {isEnhancing === i ? <Loader2 size={10} className="animate-spin"/> : <Sparkles size={10}/>} AI REFINE
              </button>
            </div>
            <button onClick={() => removeProfessionalQualification(i)} className="text-gray-400"><XIcon size={18}/></button>
          </div>
        ))}
      </div>
    </div>
  );
}
