import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Award, Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../../lib/gemini';

export function ProfessionalQualifications() {
  const { cvData, addProfessionalQualification, removeProfessionalQualification, updateProfessionalQualification } = useCV();
  const [newQual, setNewQual] = useState('');
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const handleRefine = async (index: number, text: string) => {
    setLoadingIndex(index);
    try {
      const prompt = `Refine this professional qualification to sound more standard and impressive: "${text}". Only return the refined text.`;
      const result = await askAI(prompt);
      if (result) updateProfessionalQualification(index, result.trim());
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <input
          type="text"
          value={newQual}
          onChange={(e) => setNewQual(e.target.value)}
          placeholder="e.g. Diploma in Graphic Design"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl outline-none"
        />
        <button 
          onClick={() => { if(newQual) { addProfessionalQualification(newQual); setNewQual(''); } }}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
        >
          Add
        </button>
      </div>

      <div className="space-y-3">
        {cvData.professionalQualifications.map((qual, index) => (
          <div key={index} className="flex items-start justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm group hover:border-blue-200">
            <div className="flex gap-3 flex-1">
              <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                <Award size={16} className="text-blue-600" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">{qual}</span>
                <button 
                  onClick={() => handleRefine(index, qual)}
                  disabled={loadingIndex === index}
                  className="flex items-center gap-1 text-[10px] font-bold text-purple-600 uppercase hover:text-purple-800 disabled:opacity-50"
                >
                  {loadingIndex === index ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />}
                  AI Refine
                </button>
              </div>
            </div>
            <button onClick={() => removeProfessionalQualification(index)} className="text-gray-300 hover:text-red-500 p-1">
              <XIcon size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
