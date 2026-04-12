import React from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, TrashIcon } from 'lucide-react';

export function Education() {
  const { cvData, updateEducation, addSubject, updateSubject, removeSubject } = useCV();

  const renderEducationLevel = (level: 'oLevel' | 'aLevel', title: string) => {
    const data = cvData.education[level];
    return (
      <div className="p-4 sm:p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-5 animate-in fade-in duration-500">
        <h4 className="font-bold text-gray-800 text-sm sm:text-base border-b border-gray-200 pb-2">
          {title}
        </h4>

        {/* Index & Year Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              Index Number
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={data.indexNumber}
              onChange={(e) => updateEducation(level, { indexNumber: e.target.value })}
              placeholder="e.g., 84259728"
              className="w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white outline-none shadow-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              Year
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={data.year}
              onChange={(e) => updateEducation(level, { year: e.target.value })}
              placeholder="e.g., 2018"
              className="w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Subjects Section */}
        <div className="space-y-3">
          <label className="block text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
            Subjects & Results
          </label>

          {data.subjects.length > 0 ? (
            <div className="space-y-3">
              {data.subjects.map((subject, index) => (
                <div key={index} className="flex gap-2 items-start sm:items-center">
                  {/* Subject Name */}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={subject.name}
                      onChange={(e) => updateSubject(level, index, { name: e.target.value })}
                      placeholder="Subject"
                      className="w-full px-3 py-3 sm:py-2 text-base sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white outline-none shadow-sm"
                    />
                  </div>
                  
                  {/* Grade */}
                  <div className="w-20 sm:w-24">
                    <input
                      type="text"
                      value={subject.grade}
                      onChange={(e) => updateSubject(level, index, { grade: e.target.value })}
                      placeholder="Grade"
                      className="w-full px-2 py-3 sm:py-2 text-base sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-center font-bold outline-none shadow-sm"
                    />
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeSubject(level, index)}
                    className="p-3 sm:p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors flex-shrink-0 mt-0.5 sm:mt-0"
                  >
                    <TrashIcon className="w-5 h-5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
               <p className="text-xs sm:text-sm text-gray-400">No subjects added yet.</p>
            </div>
          )}

          {/* Add Subject Button */}
          <button
            onClick={() => addSubject(level)}
            className="w-full py-4 sm:py-3 border-2 border-dashed border-blue-200 rounded-2xl text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-bold shadow-sm active:scale-[0.98]"
          >
            <PlusIcon className="w-5 h-5 sm:w-4 sm:h-4" />
            Add New Subject
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-4">
      {renderEducationLevel('oLevel', 'G.C.E. Ordinary Level Examination')}
      {renderEducationLevel('aLevel', 'G.C.E. Advanced Level Examination')}
    </div>
  );
}
