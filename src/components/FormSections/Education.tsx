import React from 'react';
import { useCV } from '../../context/CVContext';
import { TrashIcon, PlusIcon } from 'lucide-react';

export function Education() {
  const { cvData, updateEducation, addSubject, updateSubject, removeSubject } = useCV();

  const renderEducationLevel = (level: 'oLevel' | 'aLevel', title: string) => {
    const data = cvData.education[level];
    
    return (
      <div className="p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm space-y-5">
        <div className="flex justify-between items-center border-b border-gray-50 pb-4">
          <h3 className="font-black text-gray-800 uppercase tracking-tighter">{title}</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Index No</label>
            <input
              placeholder="e.g. 1234567"
              value={data.indexNumber}
              onChange={(e) => updateEducation(level, { indexNumber: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Year / Stream</label>
            <input
              placeholder="e.g. 2023 / Maths"
              value={data.year}
              onChange={(e) => updateEducation(level, { year: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          {data.subjects.map((subject, index) => (
            <div key={index} className="flex gap-2 items-center animate-in slide-in-from-left-2">
              <input
                placeholder="Subject Name"
                value={subject.name}
                onChange={(e) => updateSubject(level, index, { name: e.target.value })}
                className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                placeholder="A"
                value={subject.grade}
                onChange={(e) => updateSubject(level, index, { grade: e.target.value })}
                className="w-16 px-2 py-2 bg-white border border-gray-200 rounded-xl text-sm text-center font-bold outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button onClick={() => removeSubject(level, index)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                <TrashIcon size={16} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => addSubject(level)}
          className="w-full py-3 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all text-xs font-bold uppercase flex items-center justify-center gap-2"
        >
          <PlusIcon size={14} /> Add Subject
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {renderEducationLevel('oLevel', 'G.C.E. O/L Examination')}
      {renderEducationLevel('aLevel', 'G.C.E. A/L Examination')}
    </div>
  );
}
