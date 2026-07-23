import React from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Award } from 'lucide-react';

export function Achievements() {
  const { cvData, addAchievement, updateAchievement, removeAchievement } = useCV();

  return (
    <div className="space-y-6">
      <button onClick={addAchievement} className="w-full py-3 bg-amber-50 text-amber-600 rounded-2xl border-2 border-dashed border-amber-200 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-amber-100 transition-all">
        <PlusIcon size={16}/> Add Achievement / Award
      </button>

      {cvData.achievements.length === 0 && (
        <div className="text-center py-10 border-2 border-dashed border-zinc-100 rounded-[2.5rem]">
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">No achievements added yet</p>
        </div>
      )}

      {cvData.achievements.map((ach) => (
        <div key={ach.id} className="p-6 bg-white border border-zinc-100 rounded-[2.5rem] shadow-xl shadow-zinc-200/50 space-y-4 relative animate-in slide-in-from-bottom-4">
          <button onClick={() => removeAchievement(ach.id)} className="absolute top-4 right-4 p-2 text-zinc-300 hover:text-red-500 transition-colors">
            <XIcon size={20}/>
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-50 rounded-xl text-amber-600"><Award size={18}/></div>
            <input placeholder="Achievement Title" value={ach.title} onChange={e => updateAchievement(ach.id, { title: e.target.value })} className="flex-1 px-4 py-3 bg-zinc-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" />
            <input placeholder="Date" value={ach.date} onChange={e => updateAchievement(ach.id, { date: e.target.value })} className="w-32 px-4 py-3 bg-zinc-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 text-center" />
          </div>

          <textarea 
            placeholder="Describe your achievement..." 
            value={ach.description} 
            onChange={e => updateAchievement(ach.id, { description: e.target.value })} 
            rows={2} 
            className="w-full px-5 py-4 bg-zinc-50 border-none rounded-3xl text-sm leading-relaxed outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );
}
