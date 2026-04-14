// src/components/FormSections/ProfessionalQualifications.tsx
import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Award, Sparkles, Loader2 } from 'lucide-react';

export function ProfessionalQualifications() {
  const {
    cvData,
    addProfessionalQualification,
    removeProfessionalQualification,
    updateProfessionalQualification
  } = useCV();
  
  const [newQualification, setNewQualification] = useState('');
  const [isEnhancing, setIsEnhancing] = useState<number | null>(null);

  const handleAdd = () => {
    if (newQualification.trim()) {
      addProfessionalQualification(newQualification);
      setNewQualification('');
    }
  };

  const enhanceQualification = async (index: number, text: string) => {
    setIsEnhancing(index);
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'improve', // route.ts එකේ තියෙන case එක
          data: { text: text }
        }),
      });
      
      const data = await response.json();
      if (data.result) {
        updateProfessionalQualification(index, data.result.trim());
      }
    } catch (error) {
      console.error('AI Enhancement failed:', error);
    } finally {
      setIsEnhancing(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-3">
        <label className="block text-[11px] font-black uppercase tracking-widest text-gray-500 ml-1">
          Add Qualification / Certification
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newQualification}
            onChange={(e) => setNewQualification(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="e.g., Diploma in Business Management"
            className="flex-1 px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all shadow-sm bg-white"
          />
          <button
            onClick={handleAdd}
            disabled={!newQualification.trim()}
            className="w-full sm:w-auto px-6 py-3.5 md:py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-200 transition-all flex items-center justify-center gap-2 font-bold text-sm"
          >
            <PlusIcon size={18} /> Add
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {cvData.professionalQualifications.map((qualification, index) => (
          <div key={index} className="flex items-start justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-blue-200 transition-all">
            <div className="flex gap-3 flex-1">
              <div className="mt-1 p-1.5 bg-blue-50 rounded-lg">
                <Award className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-700 text-sm md:text-base font-medium">{qualification}</span>
                <button
                  onClick={() => enhanceQualification(index, qualification)}
                  disabled={isEnhancing !== null}
                  className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 uppercase tracking-wider hover:text-blue-800 disabled:opacity-50"
                >
                  {isEnhancing === index ? (
                    <><Loader2 size={10} className="animate-spin" /> Polishing...</>
                  ) : (
                    <><Sparkles size={10} /> AI Refine</>
                  )}
                </button>
              </div>
            </div>
            <button onClick={() => removeProfessionalQualification(index)} className="p-2 text-gray-400 hover:text-red-500">
              <XIcon size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
