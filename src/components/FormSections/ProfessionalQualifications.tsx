import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Award } from 'lucide-react';

export function ProfessionalQualifications() {
  const {
    cvData,
    addProfessionalQualification,
    removeProfessionalQualification
  } = useCV();
  const [newQualification, setNewQualification] = useState('');

  const handleAdd = () => {
    if (newQualification.trim()) {
      addProfessionalQualification(newQualification);
      setNewQualification('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Input Section */}
      <div className="flex flex-col gap-3">
        <label className="block text-[11px] font-black uppercase tracking-widest text-gray-500 ml-1">
          Add Qualification / Certification
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newQualification}
            onChange={(e) => setNewQualification(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="e.g., Diploma in Business Management"
            className="flex-1 px-4 py-3.5 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none shadow-sm bg-white"
          />
          <button
            onClick={handleAdd}
            disabled={!newQualification.trim()}
            className="w-full sm:w-auto px-6 py-3.5 md:py-2.5 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-bold text-sm shadow-lg active:scale-95"
          >
            <PlusIcon className="w-5 h-5 sm:w-4 sm:h-4" />
            Add
          </button>
        </div>
      </div>

      {/* Qualifications List Area */}
      <div className="space-y-3">
        <label className="block text-[11px] font-black uppercase tracking-widest text-gray-500 ml-1">
          Added Qualifications
        </label>
        
        {cvData.professionalQualifications.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {cvData.professionalQualifications.map((qualification, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-blue-200 transition-all group animate-in slide-in-from-left-2"
              >
                <div className="flex gap-3 flex-1">
                  <div className="mt-1 p-1.5 bg-blue-50 rounded-lg">
                    <Award className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700 text-sm md:text-base font-medium leading-relaxed">
                    {qualification}
                  </span>
                </div>
                <button
                  onClick={() => removeProfessionalQualification(index)}
                  className="ml-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all flex-shrink-0"
                >
                  <XIcon className="w-5 h-5 sm:w-4 sm:h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-3xl">
            <p className="text-xs sm:text-sm text-gray-400">
              No professional qualifications added yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
