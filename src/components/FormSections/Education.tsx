import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, TrashIcon, Sparkles, Loader2 } from 'lucide-react';

export function Education() {
  const { cvData, updateEducation, addSubject, updateSubject, removeSubject } = useCV();
  const [isAiLoading, setIsAiLoading] = useState<string | null>(null);

  // AI එකෙන් Stream එකට අදාළ විෂයන් ටික ගන්නා function එක
  const handleAiSubjects = async (level: 'oLevel' | 'aLevel', stream: string) => {
    setIsAiLoading(level);
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'suggest_education', data: { level, stream } })
      });
      const { subjects } = await response.json(); // ['Physics', 'Chemistry', 'Combined Maths'] වගේ එන්නේ
      
      // දැනට තියෙන විෂයන් අයින් කරලා අලුත් ඒවා ඇඩ් කරනවා
      subjects.forEach((subName: string) => {
        addSubject(level);
        // අන්තිමට ඇඩ් වුණ index එකට නම දානවා (මේක cvData.education[level].subjects.length එකෙන් ගන්න පුළුවන්)
        const newIndex = cvData.education[level].subjects.length;
        updateSubject(level, newIndex, { name: subName, grade: '' });
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(null);
    }
  };

  const renderEducationLevel = (level: 'oLevel' | 'aLevel', title: string) => {
    const data = cvData.education[level];
    return (
      <div className="p-4 sm:p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-5 animate-in fade-in duration-500">
        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
          <h4 className="font-bold text-gray-800 text-sm sm:text-base">{title}</h4>
          
          {/* AI Quick Fill Buttons */}
          {level === 'aLevel' && (
            <div className="flex gap-1.5">
              {['Maths', 'Bio', 'Commerce', 'Art'].map(stream => (
                <button
                  key={stream}
                  onClick={() => handleAiSubjects('aLevel', stream)}
                  className="px-2 py-1 bg-blue-50 text-blue-600 text-[9px] font-black uppercase rounded-md hover:bg-blue-100 transition-all border border-blue-100"
                >
                  {isAiLoading === 'aLevel' ? '...' : stream}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Index Number</label>
            <input
              type="text"
              value={data.indexNumber}
              onChange={(e) => updateEducation(level, { indexNumber: e.target.value })}
              placeholder="e.g., 84259728"
              className="w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none bg-white shadow-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Year</label>
            <input
              type="text"
              value={data.year}
              onChange={(e) => updateEducation(level, { year: e.target.value })}
              placeholder="e.g., 2018"
              className="w-full px-4 py-3 sm:py-2.5 text-base sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none bg-white shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Subjects & Results</label>
          {data.subjects.length > 0 ? (
            <div className="space-y-3">
              {data.subjects.map((subject, index) => (
                <div key={index} className="flex gap-2 items-center animate-in slide-in-from-left-2">
                  <input
                    type="text"
                    value={subject.name}
                    onChange={(e) => updateSubject(level, index, { name: e.target.value })}
                    placeholder="Subject Name"
                    className="flex-1 px-3 py-2.5 sm:py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                  <input
                    type="text"
                    value={subject.grade}
                    onChange={(e) => updateSubject(level, index, { grade: e.target.value })}
                    placeholder="Grade"
                    className="w-16 sm:w-20 px-2 py-2.5 sm:py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-center font-bold outline-none bg-white"
                  />
                  <button onClick={() => removeSubject(level, index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <TrashIcon size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-2xl">
              <p className="text-xs text-gray-400 font-medium">No subjects added yet.</p>
            </div>
          )}

          <button
            onClick={() => addSubject(level)}
            className="w-full py-3 border-2 border-dashed border-blue-200 rounded-2xl text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-xs font-bold"
          >
            <PlusIcon size={16} /> Add New Subject
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
