import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, TrashIcon, Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../../services/ai';

export function Education() {
  const { cvData, updateEducation, addSubject, updateSubject, removeSubject } = useCV();
  const [loading, setLoading] = useState<string | null>(null);

  const handleAiSubjects = async (level: 'oLevel' | 'aLevel', stream: string) => {
    setLoading(level);
    const res = await askAI('suggest_education', { level, stream });
    if (res) {
      const subs = res.split(',').map((s: string) => s.trim());
      subs.forEach((s: string) => {
        addSubject(level);
        const idx = cvData.education[level].subjects.length;
        updateSubject(level, idx, { name: s, grade: '' });
      });
    }
    setLoading(null);
  };

  const renderLevel = (level: 'oLevel' | 'aLevel', title: string) => (
    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-black uppercase text-sm text-gray-700">{title}</h3>
        {level === 'aLevel' && (
          <button onClick={() => handleAiSubjects('aLevel', 'Physical Science')} disabled={!!loading} className="text-[10px] font-bold text-purple-600 flex items-center gap-1 uppercase">
            {loading === 'aLevel' ? <Loader2 size={12} className="animate-spin"/> : <Sparkles size={12}/>} AI Subjects
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input placeholder="Index Number" value={cvData.education[level].indexNumber} onChange={e => updateEducation(level, { indexNumber: e.target.value })} className="px-4 py-2 border rounded-xl text-sm" />
        <input placeholder="Year" value={cvData.education[level].year} onChange={e => updateEducation(level, { year: e.target.value })} className="px-4 py-2 border rounded-xl text-sm" />
      </div>
      {cvData.education[level].subjects.map((s, i) => (
        <div key={i} className="flex gap-2">
          <input value={s.name} onChange={e => updateSubject(level, i, { name: e.target.value })} className="flex-1 px-4 py-2 border rounded-xl text-sm" placeholder="Subject" />
          <input value={s.grade} onChange={e => updateSubject(level, i, { grade: e.target.value })} className="w-20 px-4 py-2 border rounded-xl text-sm text-center font-bold" placeholder="Grade" />
          <button onClick={() => removeSubject(level, i)} className="text-red-400 p-2"><TrashIcon size={16}/></button>
        </div>
      ))}
      <button onClick={() => addSubject(level)} className="w-full py-2 border-2 border-dashed rounded-xl text-xs font-bold text-blue-600">+ Add Subject</button>
    </div>
  );

  return (
    <div className="space-y-8">
      {renderLevel('oLevel', 'G.C.E. Ordinary Level')}
      {renderLevel('aLevel', 'G.C.E. Advanced Level')}
    </div>
  );
}
