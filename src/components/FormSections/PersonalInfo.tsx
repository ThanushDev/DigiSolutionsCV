import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../../lib/gemini';

export function PersonalInfo() {
  const { cvData, updatePersonalInfo } = useCV();
  const [loading, setLoading] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

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

  // Suggestion chips පෙන්වන පොඩි helper එකක්
  const renderSuggestions = (field: string, options: string[]) => {
    if (activeField !== field) return null;
    return (
      <div className="flex flex-wrap gap-2 mt-2 animate-in fade-in slide-in-from-top-1">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => {
              updatePersonalInfo({ [field]: opt });
              setActiveField(null);
            }}
            className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-[10px] font-bold hover:bg-blue-600 hover:text-white transition-colors"
          >
            + {opt}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Full Name */}
      <div className="relative">
        <label className="block text-[11px] font-bold text-gray-400 uppercase ml-1 mb-1">Full Name</label>
        <input 
          type="text" 
          value={cvData.personalInfo.name || ''} 
          onChange={(e) => updatePersonalInfo({ name: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* NIC Number */}
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase ml-1 mb-1">NIC Number</label>
          <input 
            type="text" 
            placeholder="e.g. 199912345678"
            value={cvData.personalInfo.nic || ''} 
            onChange={(e) => updatePersonalInfo({ nic: e.target.value })} 
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" 
          />
        </div>

        {/* Gender - Dropdown */}
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase ml-1 mb-1">Gender</label>
          <select 
            value={cvData.personalInfo.gender || ''} 
            onChange={(e) => updatePersonalInfo({ gender: e.target.value })} 
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm appearance-none cursor-pointer"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Nationality */}
        <div className="relative">
          <label className="block text-[11px] font-bold text-gray-400 uppercase ml-1 mb-1">Nationality</label>
          <input 
            type="text" 
            onFocus={() => setActiveField('nationality')}
            value={cvData.personalInfo.nationality || ''} 
            onChange={(e) => updatePersonalInfo({ nationality: e.target.value })} 
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" 
          />
          {renderSuggestions('nationality', ['Sri Lankan', 'British', 'Indian'])}
        </div>

        {/* Religion */}
        <div className="relative">
          <label className="block text-[11px] font-bold text-gray-400 uppercase ml-1 mb-1">Religion</label>
          <input 
            type="text" 
            onFocus={() => setActiveField('religion')}
            value={cvData.personalInfo.religion || ''} 
            onChange={(e) => updatePersonalInfo({ religion: e.target.value })} 
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" 
          />
          {renderSuggestions('religion', ['Buddhist', 'Hindu', 'Islam', 'Catholic', 'Christian'])}
        </div>

        {/* Civil Status - Dropdown */}
        <div className="md:col-span-2">
          <label className="block text-[11px] font-bold text-gray-400 uppercase ml-1 mb-1">Civil Status</label>
          <select 
            value={cvData.personalInfo.civilStatus || ''} 
            onChange={(e) => updatePersonalInfo({ civilStatus: e.target.value })} 
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm appearance-none cursor-pointer"
          >
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </select>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="space-y-2 pt-2">
        <div className="flex justify-between items-center px-1">
          <label className="block text-[11px] font-bold text-gray-400 uppercase">Professional Summary</label>
          <button 
            onClick={handleAiMagic} 
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-transform active:scale-95 shadow-md shadow-purple-100 disabled:opacity-50"
          >
            {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
            AI Polish
          </button>
        </div>
        <textarea
          value={cvData.personalInfo.description || ''}
          onChange={(e) => updatePersonalInfo({ description: e.target.value })}
          rows={4}
          placeholder="Describe your professional background..."
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>
    </div>
  );
}
