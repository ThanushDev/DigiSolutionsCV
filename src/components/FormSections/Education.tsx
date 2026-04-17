import React from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, TrashIcon, GraduationCap } from 'lucide-react';

export function Education() {
  // useCV එකෙන් එන functions හරියට destruct කරගන්නවා
  const { cvData, updateEducation, addSubject, updateSubject, removeSubject } = useCV();

  const renderEducationLevel = (level: 'oLevel' | 'aLevel', title: string) => {
    const data = cvData.education[level];

    return (
      <div className="p-5 md:p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm space-y-5 animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-50 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <GraduationCap size={20} />
            </div>
            <h3 className="font-black text-gray-800 uppercase tracking-tighter text-sm md:text-base">
              {title}
            </h3>
          </div>
        </div>

        {/* Index & Year Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Index Number</label>
            <input
              type="text"
              value={data.indexNumber || ''}
              onChange={(e) => updateEducation(level, { indexNumber: e.target.value })}
              placeholder="12345678"
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Year</label>
            <input
              type="text"
              value={data.year || ''}
              onChange={(e) => updateEducation(level, { year: e.target.value })}
              placeholder="2023"
              className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Subjects & Results */}
        <div className="space-y-3">
          <p className="text-[10px] font-black text-gray-400 uppercase ml-1">Subjects & Grades</p>
          
          {data.subjects.length > 0 ? (
            <div className="space-y-2">
              {data.subjects.map((subject, index) => (
                <div key={index} className="flex gap-2 items-center group animate-in slide-in-from-left-2 duration-300">
                  <input
                    type="text"
                    value={subject.name}
                    onChange={(e) => updateSubject(level, index, { name: e.target.value })}
                    placeholder="Subject Name"
                    className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                  <input
                    type="text"
                    maxLength={2}
                    value={subject.grade}
                    onChange={(e) => updateSubject(level, index, { grade: e.target.value })}
                    placeholder="A"
                    className="w-14 md:w-16 px-1 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-center font-bold outline-none focus:ring-2 focus:ring-blue-500 shadow-sm uppercase"
                  />
                  <button 
                    onClick={() => removeSubject(level, index)} 
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <TrashIcon size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center border-2 border-dashed border-gray-100 rounded-[1.5rem] bg-gray-50/50">
               <p className="text-[11px] font-bold text-gray-400 uppercase">No subjects added</p>
            </div>
          )}

          {/* Add Subject Button */}
          <button
            onClick={() => addSubject(level)}
            className="w-full py-4 border-2 border-dashed border-blue-100 rounded-2xl text-blue-500 hover:bg-blue-50 hover:border-blue-200 transition-all text-[11px] font-black uppercase flex items-center justify-center gap-2 group"
          >
            <PlusIcon size={16} className="group-hover:scale-110 transition-transform" />
            Add New Subject
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-10">
      {renderEducationLevel('oLevel', 'G.C.E. O/L Examination')}
      {renderEducationLevel('aLevel', 'G.C.E. A/L Examination')}
    </div>
  );
}
