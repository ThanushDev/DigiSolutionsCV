import React from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, TrashIcon, Briefcase } from 'lucide-react';

export function WorkExperience() {
  const {
    cvData,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience
  } = useCV();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {cvData.workExperience.length > 0 ? (
        <div className="space-y-6">
          {cvData.workExperience.map((exp, index) => (
            <div 
              key={exp.id} 
              className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-5 animate-in slide-in-from-bottom-2"
            >
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-50 rounded-lg">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide">
                    Experience {index + 1}
                  </h4>
                </div>
                <button
                  onClick={() => removeWorkExperience(exp.id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all active:scale-90"
                >
                  <TrashIcon className="w-5 h-5 md:w-4 md:h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Job Title */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => updateWorkExperience(exp.id, { title: e.target.value })}
                    placeholder="e.g., Marketing Executive"
                    className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white"
                  />
                </div>

                {/* Company */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateWorkExperience(exp.id, { company: e.target.value })}
                    placeholder="e.g., ABC Company (Pvt) Ltd"
                    className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white"
                  />
                </div>

                {/* Duration */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={exp.duration}
                    onChange={(e) => updateWorkExperience(exp.id, { duration: e.target.value })}
                    placeholder="e.g., Jan 2022 - Present"
                    className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Description
                  </label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateWorkExperience(exp.id, { description: e.target.value })}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={4}
                    className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none shadow-sm bg-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-3xl">
          <p className="text-sm text-gray-400 font-medium px-6">
            No work experience added yet. Tell us about your career journey.
          </p>
        </div>
      )}

      <button
        onClick={addWorkExperience}
        className="w-full py-4 border-2 border-dashed border-blue-200 rounded-2xl text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all flex items-center justify-center gap-2 font-bold text-sm active:scale-95 shadow-sm"
      >
        <PlusIcon className="w-5 h-5" />
        Add Work Experience
      </button>
    </div>
  );
}
