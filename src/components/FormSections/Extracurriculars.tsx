import React from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Users } from 'lucide-react';

export function Extracurriculars() {
  const { cvData, addExtracurricular, updateExtracurricular, removeExtracurricular } = useCV();

  return (
    <div className="space-y-6">
      <button onClick={addExtracurricular} className="w-full py-3 bg-green-50 text-green-600 rounded-2xl border-2 border-dashed border-green-200 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-green-100 transition-all">
        <PlusIcon size={16}/> Add Extracurricular Activity
      </button>

      {(cvData.extracurriculars || []).length === 0 && (
        <div className="text-center py-10 border-2 border-dashed border-zinc-100 rounded-[2.5rem]">
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">No activities added yet</p>
        </div>
      )}

      {(cvData.extracurriculars || []).map((ext) => (
        <div key={ext.id} className="p-6 bg-white border border-zinc-100 rounded-[2.5rem] shadow-xl shadow-zinc-200/50 space-y-4 relative animate-in slide-in-from-bottom-4">
          <button onClick={() => removeExtracurricular(ext.id)} className="absolute top-4 right-4 p-2 text-zinc-300 hover:text-red-500 transition-colors">
            <XIcon size={20}/>
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-xl text-green-600"><Users size={18}/></div>
            <input placeholder="Activity Title" value={ext.title} onChange={e => updateExtracurricular(ext.id, { title: e.target.value })} className="flex-1 px-4 py-3 bg-zinc-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" />
            <input placeholder="Your Role" value={ext.role} onChange={e => updateExtracurricular(ext.id, { role: e.target.value })} className="w-40 px-4 py-3 bg-zinc-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <textarea 
            placeholder="Describe the activity and your involvement..." 
            value={ext.description} 
            onChange={e => updateExtracurricular(ext.id, { description: e.target.value })} 
            rows={2} 
            className="w-full px-5 py-4 bg-zinc-50 border-none rounded-3xl text-sm leading-relaxed outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );
}
