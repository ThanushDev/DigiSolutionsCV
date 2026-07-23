import React from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, ExternalLink } from 'lucide-react';

export function Projects() {
  const { cvData, addProject, updateProject, removeProject } = useCV();

  return (
    <div className="space-y-6">
      <button onClick={addProject} className="w-full py-3 bg-blue-50 text-blue-600 rounded-2xl border-2 border-dashed border-blue-200 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-100 transition-all">
        <PlusIcon size={16}/> Add Project
      </button>

      {cvData.projects.length === 0 && (
        <div className="text-center py-10 border-2 border-dashed border-zinc-100 rounded-[2.5rem]">
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">No projects added yet</p>
        </div>
      )}

      {cvData.projects.map((proj) => (
        <div key={proj.id} className="p-6 bg-white border border-zinc-100 rounded-[2.5rem] shadow-xl shadow-zinc-200/50 space-y-4 relative animate-in slide-in-from-bottom-4">
          <button onClick={() => removeProject(proj.id)} className="absolute top-4 right-4 p-2 text-zinc-300 hover:text-red-500 transition-colors">
            <XIcon size={20}/>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Project Title" value={proj.title} onChange={e => updateProject(proj.id, { title: e.target.value })} className="px-4 py-3 bg-zinc-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" />
            <input placeholder="Technologies Used" value={proj.technologies} onChange={e => updateProject(proj.id, { technologies: e.target.value })} className="px-4 py-3 bg-zinc-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <textarea 
            placeholder="Project description, your role, achievements..." 
            value={proj.description} 
            onChange={e => updateProject(proj.id, { description: e.target.value })} 
            rows={3} 
            className="w-full px-5 py-4 bg-zinc-50 border-none rounded-3xl text-sm leading-relaxed outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center gap-2">
            <ExternalLink size={14} className="text-zinc-400"/>
            <input placeholder="Project link (optional)" value={proj.link} onChange={e => updateProject(proj.id, { link: e.target.value })} className="flex-1 px-4 py-2 bg-zinc-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      ))}
    </div>
  );
}
