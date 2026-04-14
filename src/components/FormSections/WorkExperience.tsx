import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, TrashIcon, Briefcase, Sparkles, Loader2 } from 'lucide-react';

export function WorkExperience() {
  const { cvData, addWorkExperience, updateWorkExperience, removeWorkExperience } = useCV();
  const [aiLoading, setAiLoading] = useState<string | null>(null);

  const improveDescription = async (id: string, currentText: string) => {
    if (!currentText) return;
    setAiLoading(id);
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'improve',
          data: { text: currentText }
        }),
      });
      const { result } = await response.json();
      updateWorkExperience(id, { description: result.trim() });
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setAiLoading(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {cvData.workExperience.length > 0 ? (
        <div className="space-y-6">
          {cvData.workExperience.map((exp, index) => (
            <div key={exp.id} className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-50 rounded-lg"><Briefcase className="w-4 h-4 text-blue-600" /></div>
                  <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Experience {index + 1}</h4>
                </div>
                <button onClick={() => removeWorkExperience(exp.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase ml-1">Job Title</label>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => updateWorkExperience(exp.id, { title: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase ml-1">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateWorkExperience(exp.id, { company: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase ml-1">Description</label>
                    <button 
                      onClick={() => improveDescription(exp.id, exp.description)}
                      disabled={aiLoading === exp.id || !exp.description}
                      className="flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg text-[9px] font-black uppercase tracking-wider hover:bg-purple-100 disabled:opacity-50 transition-all"
                    >
                      {aiLoading === exp.id ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />}
                      AI Improve
                    </button>
                  </div>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateWorkExperience(exp.id, { description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-3xl">
          <p className="text-sm text-gray-400 font-medium px-6">No work experience added yet.</p>
        </div>
      )}

      <button
        onClick={addWorkExperience}
        className="w-full py-4 border-2 border-dashed border-blue-200 rounded-2xl text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-2 font-bold text-sm"
      >
        <PlusIcon className="w-5 h-5" /> Add Work Experience
      </button>
    </div>
  );
}
