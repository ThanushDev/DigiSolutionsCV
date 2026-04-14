import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Award, Sparkles, Loader2 } from 'lucide-react';
import { generateAIContent } from '../../services/ai';

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
      const prompt = `Rewrite this professional qualification or certification to be more formal and impactful for a CV: "${text}". Keep it concise (maximum 10-12 words). Just give the rewritten text.`;
      const enhancedText = await generateAIContent(prompt);
      if (enhancedText) {
        updateProfessionalQualification(index, enhancedText);
      }
    } catch (error) {
      console.error('AI Enhancement failed:', error);
    } finally {
      setIsEnhancing(null);
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
            className="flex-1 px-4 py-3.5 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none shadow-sm bg-white"
          />
          <button
            onClick={handleAdd}
            disabled={!newQualification.trim()}
            className="w-full sm:w-auto px-6 py-3.5 md:py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 transition-all flex items-center justify-center gap-2 font-bold text-sm shadow-lg active:scale-95"
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
                className="group relative flex items-start justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-blue-200 transition-all animate-in slide-in-from-left-2"
              >
                <div className="flex gap-3 flex-1">
                  <div className="mt-1 p-1.5 bg-blue-50 rounded-lg">
                    <Award className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-700 text-sm md:text-base font-medium leading-relaxed pr-20">
                      {qualification}
                    </span>
                    <button
                      onClick={() => enhanceQualification(index, qualification)}
                      disabled={isEnhancing !== null}
                      className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 uppercase tracking-wider hover:text-blue-800 transition-colors disabled:opacity-50"
                    >
                      {isEnhancing === index ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          AI Polishing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3" />
                          AI Refine
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeProfessionalQualification(index)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
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
