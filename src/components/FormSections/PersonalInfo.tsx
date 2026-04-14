// src/components/FormSections/PersonalInfo.tsx
import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Sparkles, Loader2, Camera, User } from 'lucide-react';

export function PersonalInfo() {
  const { cvData, updatePersonalInfo } = useCV();
  const [loading, setLoading] = useState(false);

  const handleAiMagic = async () => {
    if (!cvData.personalInfo.name) return alert("Please enter your name first!");
    setLoading(true);
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'summary',
          data: { 
            name: cvData.personalInfo.name, 
            title: cvData.personalInfo.description || "Professional", 
            skills: cvData.skills.join(', ') 
          }
        }),
      });
      const data = await response.json();
      if (data.result) updatePersonalInfo({ description: data.result.trim() });
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => updatePersonalInfo({ photo: event.target?.result as string });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Photo Section */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="relative group">
          <div className="w-28 h-28 rounded-full border-4 border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center">
            {cvData.personalInfo.photo ? (
              <img src={cvData.personalInfo.photo} className="w-full h-full object-cover" alt="Profile" />
            ) : (
              <User size={40} className="text-gray-300" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition-all">
            <Camera size={16} />
            <input type="file" className="hidden" onChange={handlePhotoUpload} accept="image/*" />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2 space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 ml-1">Display Name</label>
          <input
            type="text"
            value={cvData.personalInfo.name}
            onChange={(e) => updatePersonalInfo({ name: e.target.value })}
            className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white"
          />
        </div>

        <div className="md:col-span-2 space-y-1.5">
          <div className="flex justify-between items-center mb-1 ml-1">
            <label className="block text-sm font-semibold text-gray-700">Professional Summary</label>
            <button 
              onClick={handleAiMagic} 
              disabled={loading}
              className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-[10px] font-bold uppercase transition-all"
            >
              {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
              AI Polish
            </button>
          </div>
          <textarea
            value={cvData.personalInfo.description}
            onChange={(e) => updatePersonalInfo({ description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none shadow-sm bg-white"
          />
        </div>
        {/* NIC, DOB fields can go here as before */}
      </div>
    </div>
  );
}
