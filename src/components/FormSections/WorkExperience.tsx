import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon, Briefcase, Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../../lib/gemini'; // මෙන්න මේක අමතක කරන්න එපා

export function WorkExperience() {
  const { cvData, addWorkExperience, updateWorkExperience, removeWorkExperience } = useCV();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleImprove = async (id: string, currentDescription: string) => {
    if (!currentDescription) return;
    setLoadingId(id);
    try {
      // මෙතනදී කෙලින්ම askAI function එක පාවිච්චි කරනවා
      const prompt = `Improve this professional work experience description: "${currentDescription}". Make it more impactful and use action verbs. Keep it concise and professional.`;
      const result = await askAI(prompt);
      
      if (result) {
        updateWorkExperience(id, { description: result.trim() });
      }
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-black uppercase tracking-widest text-gray-500">Work Experience</h2>
        <button 
          onClick={addWorkExperience}
          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all font-black text-xs uppercase"
        >
          + Add Work
        </button>
      </div>

      {cvData.workExperience.map((exp) => (
        <div key={exp.id} className="p-6 bg-white border border-gray-100 rounded-[2rem] space-y-4 shadow-sm relative group">
          <button 
            onClick={() => removeWorkExperience(exp.id)}
            className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
          >
            <XIcon size={18}/>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              placeholder="Job Title (e.g. Sales Manager)" 
              value={exp.title} 
              onChange={e => updateWorkExperience(exp.id, { title: e.target.value })} 
              className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
            />
            <input 
              placeholder="Company Name" 
              value={exp.company} 
              onChange={e => updateWorkExperience(exp.id, { company: e.target.value })} 
              className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
            />
          </div>

          <div className="relative">
             <button 
               onClick={() => handleImprove(exp.id, exp.description)}
               disabled={loadingId === exp.id}
               className="absolute right-2 top-2 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-[10px] font-bold uppercase transition-all hover:opacity-90 disabled:opacity-50"
             >
               {loadingId === exp.id ? <Loader2 size={12} className="animate-spin"/> : <Sparkles size={12}/>} 
               AI Improve
             </button>
             <textarea 
               placeholder="Describe your responsibilities..." 
               value={exp.description} 
               onChange={e => updateWorkExperience(exp.id, { description: e.target.value })} 
               rows={4} 
               className="w-full px-4 py-4 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50/30"
             />
          </div>
        </div>
      ))}
    </div>
  );
}
