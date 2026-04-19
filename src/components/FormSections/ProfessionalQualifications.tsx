import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../../lib/gemini';

export function ProfessionalQualifications() {
  const { 
    cvData, 
    addProfessionalQualification, 
    removeProfessionalQualification, 
    // මෙතන update function එක නැති වුණොත් crash වෙන නිසා මම safe logic එකක් දැම්මා
    updateProfessionalQualification 
  } = useCV();
  
  const [newVal, setNewVal] = useState('');
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const handleAdd = () => {
    if (newVal.trim()) {
      addProfessionalQualification(newVal.trim());
      setNewVal('');
    }
  };

  const handleImprove = async (index: number, text: string) => {
    // update function එක ඇත්තටම තියෙනවද කියලා check කරනවා
    if (typeof updateProfessionalQualification !== 'function') {
      console.error("updateProfessionalQualification is not defined in CVContext");
      return;
    }

    setLoadingIndex(index);
    try {
      const result = await askAI(`Rewrite this professional qualification to sound better and professional (Keep it short): "${text}"`);
      if (result) {
        updateProfessionalQualification(index, result.trim());
      }
    } catch (err) {
      console.error("AI Improvement failed:", err);
    } finally {
      setLoadingIndex(null);
    }
  };

  // cvData.professionalQualifications null හෝ undefined නම් empty array එකක් ගන්නවා
  const qualifications = cvData?.professionalQualifications || [];

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input 
          value={newVal}
          onChange={(e) => setNewVal(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="e.g. Diploma in Information Technology"
          className="flex-1 px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all text-sm font-medium"
        />
        <button 
          onClick={handleAdd} 
          className="px-6 py-4 bg-zinc-900 text-white rounded-2xl flex items-center justify-center gap-2 hover:bg-zinc-800 active:scale-95 transition-all shadow-lg"
        >
          <PlusIcon size={20}/>
          <span className="sm:hidden font-bold uppercase text-[10px]">Add Qualification</span>
        </button>
      </div>

      {/* Qualifications List */}
      <div className="grid grid-cols-1 gap-4">
        {qualifications.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-zinc-100 rounded-[2.5rem]">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">No qualifications added yet</p>
          </div>
        ) : (
          qualifications.map((q, i) => (
            <div 
              key={i} 
              className="group p-5 bg-white border border-zinc-100 rounded-[2rem] flex justify-between items-start md:items-center shadow-sm hover:shadow-md transition-all animate-in slide-in-from-bottom-2 duration-300"
            >
              <div className="flex-1 mr-4">
                <p className="text-sm font-bold text-zinc-800 leading-relaxed">
                  {typeof q === 'string' ? q : (q as any).qualification}
                </p>
                <button 
                  onClick={() => handleImprove(i, typeof q === 'string' ? q : (q as any).qualification)} 
                  disabled={loadingIndex !== null}
                  className={`mt-2 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.1em] transition-all
                    ${loadingIndex === i ? 'text-zinc-400' : 'text-purple-600 hover:text-purple-700'}`}
                >
                  {loadingIndex === i ? (
                    <>
                      <Loader2 size={12} className="animate-spin"/>
                      Improving...
                    </>
                  ) : (
                    <>
                      <Sparkles size={12} className="group-hover:animate-pulse"/>
                      AI Improve
                    </>
                  )}
                </button>
              </div>
              
              <button 
                onClick={() => removeProfessionalQualification(i)} 
                className="p-2 bg-zinc-50 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shrink-0"
              >
                <XIcon size={18}/>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
