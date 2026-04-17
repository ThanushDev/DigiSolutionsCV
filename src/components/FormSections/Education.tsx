import React from 'react';
import { useCV } from '../../context/CVContext';
import { TrashIcon, PlusIcon, GraduationCap } from 'lucide-react';

export function Education() {
  const { cvData, updateEducation, addSubject, updateSubject, removeSubject } = useCV();

  const renderEducationLevel = (level: 'oLevel' | 'aLevel', title: string) => {
    const data = cvData.education[level];
    
    return (
      <div className="p-5 md:p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm space-y-5">
        {/* Header Section */}
        <div className="flex justify-between items-center border-b border-gray-50 pb-4">
          <div className="flex items-center gap-2">
             <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <GraduationCap size={18}/>
             </div>
             <h3 className="font-black text-gray-800 uppercase tracking-tighter text-sm md:text-base">{title}</h3>
          </div>
        </div>

        {/* Info Grid: Index No & Year */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Index No</label>
            <input
              placeholder="1234567"
              value={data.indexNumber}
              onChange={(e) => updateEducation(level, { indexNumber: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Year / Stream</label>
            <input
              placeholder="2023 / Maths"
              value={data.year}
              onChange={(e) => updateEducation(level, { year: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Subjects List */}
        <div className="space-y-3">
          <p className="text-[10px] font-black text-gray-400 uppercase ml-1">Subjects & Grades</p>
          {data.subjects.map((subject, index) => (
            <div key={index} className="flex gap-2 items-center group animate-in slide-in-from-left-2 duration-300">
              {/* Subject Name Input */}
              <input
                placeholder="Subject"
                value={subject.name}
                onChange={(e) => updateSubject(level, index, { name: e.target.value })}
                className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              
              {/* Grade Input (පොඩි ඉඩක් පමණක් ලබා දී ඇත) */}
              <input
                placeholder="A"
                maxLength={2}
                value={subject.grade}
                onChange={(e) => updateSubject(level, index, { grade: e.target.value })}
                className="w-14 md:w-16 px-1 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-center font-bold outline-none focus:ring-2 focus:ring-blue-500 shadow-sm uppercase placeholder:font-normal"
              />

              {/* Delete Button */}
              <button 
                onClick={() => removeSubject(level, index)} 
                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all active:scale-90"
                title="Remove subject"
              >
                <TrashIcon size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Add Subject Button */}
        <button
          onClick={() => addSubject(level)}
          className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all text-[11px] font-black uppercase flex items-center justify-center gap-2 group"
        >
          <div className="p-1 bg-gray-50 group-hover:bg-blue-100 rounded-md transition-colors">
            <PlusIcon size={14} />
          </div>
          Add Subject
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-700">
      {renderEducationLevel('oLevel', 'G.C.E. O/L Examination')}
      {renderEducationLevel('aLevel', 'G.C.E. A/L Examination')}
    </div>
  );
}
