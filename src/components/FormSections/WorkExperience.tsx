// src/components/FormSections/WorkExperience.tsx
import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Briefcase, Sparkles, Loader2, Calendar, Building2 } from 'lucide-react';

export function WorkExperience() {
  const { cvData, addWorkExperience, updateWorkExperience, removeWorkExperience } = useCV();
  const [isImproving, setIsImproving] = useState<string | null>(null);

  const handleImprove = async (id: string, currentDescription: string) => {
    if (!currentDescription) return;
    
    setIsImproving(id);
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'improve',
          data: { text: currentDescription }
        }),
      });

      const data = await response.json();
      if (data.result) {
        updateWorkExperience(id, { description: data.result.trim() });
      }
    } catch (error) {
      console.error("AI Improvement Error:", error);
    } finally {
      setIsImproving(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-gray-500">Work Experience</h2>
          <p className="text-[10px] text-gray-400 uppercase">Tell us about your career history</p>
        </div>
        <button
          onClick={addWorkExperience}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-all text-xs font-bold shadow-lg active:scale-95"
        >
          <PlusIcon size={14} /> Add Job
        </button>
      </div>

      <div className="space-y-4">
        {cvData.workExperience.map((exp) => (
          <div
            key={exp.id}
            className="group relative p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-blue-200 transition-all animate-in slide-in-from-bottom-2"
          >
            <button
              onClick={() => removeWorkExperience(exp.id)}
              className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <XIcon size={16} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Job Title */}
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase ml-1">
                  <Briefcase size={10} /> Job Title
                </label>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => updateWorkExperience(exp.id, { title: e.target.value })}
                  placeholder="e.g., Senior Accountant"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              {/* Company */}
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase ml-1">
                  <Building2 size={10} /> Company
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateWorkExperience(exp.id, { company: e.target.value })}
                  placeholder="e.g., ABC Pvt Ltd"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              {/* Duration */}
              <div className="space-y-1 md:col-span-2">
                <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase ml-1">
                  <Calendar size={10} /> Duration
                </label>
                <input
                  type="text"
                  value={exp.duration}
                  onChange={(e) => updateWorkExperience(exp.id, { duration: e.target.value })}
                  placeholder="e.g., Jan 2020 - Present"
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              {/* Description with AI Improve */}
              <div className="md:col-span-2 space-y-1">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Description / Key Achievements</label>
                  <button
                    onClick={() => handleImprove(exp.id, exp.description)}
                    disabled={isImproving === exp.id || !exp.description}
                    className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-tighter hover:bg-blue-100 disabled:opacity-50 transition-all"
                  >
                    {isImproving === exp.id ? (
                      <><Loader2 size={10} className="animate-spin" /> AI Processing...</>
                    ) : (
                      <><Sparkles size={10} /> AI Improve</>
                    )}
                  </button>
                </div>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateWorkExperience(exp.id, { description: e.target.value })}
                  rows={3}
                  placeholder="Describe your responsibilities and achievements..."
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none shadow-inner bg-gray-50/30"
                />
              </div>
            </div>
          </div>
        ))}

        {cvData.workExperience.length === 0 && (
          <div className="text-center py-12 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-3xl">
            <Briefcase className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-400 font-medium">No work experience added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
