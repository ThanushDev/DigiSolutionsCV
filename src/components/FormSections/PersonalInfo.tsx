import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../../lib/gemini'; // Import කරන්න

export function PersonalInfo() {
  const { cvData, updatePersonalInfo } = useCV();
  const [loading, setLoading] = useState(false);

  const handleAiMagic = async () => {
    if (!cvData.personalInfo.name) return alert("Please enter your name first!");
    setLoading(true);
    try {
      const prompt = `Write a professional short CV summary for ${cvData.personalInfo.name} who is a ${cvData.personalInfo.description || "Professional"}. Skills: ${cvData.skills.join(', ')}. Keep it around 40 words and impactful.`;
      const result = await askAI(prompt);
      if (result) updatePersonalInfo({ description: result.trim() });
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
       {/* Name */}
       <div>
          <label className="block text-sm font-semibold text-gray-700">Full Name</label>
          <input 
            type="text" 
            value={cvData.personalInfo.name || ''} 
            onChange={(e) => updatePersonalInfo({ name: e.target.value })}
            className="w-full px-4 py-2 border rounded-xl"
          />
       </div>

       {/* අලුතෙන් එකතු කරපු Personal Details ටික */}
       <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">NIC Number</label>
            <input type="text" value={cvData.personalInfo.nic || ''} onChange={(e) => updatePersonalInfo({ nic: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Gender</label>
            <input type="text" value={cvData.personalInfo.gender || ''} onChange={(e) => updatePersonalInfo({ gender: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Nationality</label>
            <input type="text" value={cvData.personalInfo.nationality || ''} onChange={(e) => updatePersonalInfo({ nationality: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Religion</label>
            <input type="text" value={cvData.personalInfo.religion || ''} onChange={(e) => updatePersonalInfo({ religion: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Civil Status</label>
            <input type="text" value={cvData.personalInfo.civilStatus || ''} onChange={(e) => updatePersonalInfo({ civilStatus: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
          </div>
       </div>

       {/* Professional Summary */}
       <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-semibold text-gray-700">Professional Summary</label>
            <button 
              onClick={handleAiMagic} 
              disabled={loading}
              className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded-lg text-[10px] font-bold uppercase"
            >
              {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
              AI Polish
            </button>
          </div>
          <textarea
            value={cvData.personalInfo.description || ''}
            onChange={(e) => updatePersonalInfo({ description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border rounded-xl text-sm"
          />
        </div>
    </div>
  );
}
