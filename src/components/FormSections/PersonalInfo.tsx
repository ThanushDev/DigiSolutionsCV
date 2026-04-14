import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Sparkles, Loader2 } from 'lucide-react';

export function PersonalInfo() {
  const { cvData, updatePersonalInfo } = useCV();
  const [loading, setLoading] = useState(false);

  const handleAiMagic = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'summary',
          data: { 
            name: cvData.personalInfo.name, 
            title: cvData.personalInfo.description,
            skills: cvData.skills.join(', ')
          }
        }),
      });
      const { result } = await response.json();
      updatePersonalInfo({ description: result.trim() });
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="md:hidden mb-2">
        <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
        <p className="text-xs text-gray-500">Tell us about yourself</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Display Name */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 ml-1">
            Display Name (Name for Header) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={cvData.personalInfo.name}
            onChange={(e) => updatePersonalInfo({ name: e.target.value })}
            placeholder="e.g., J.S. PERERA"
            className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white"
          />
        </div>

        {/* Professional Summary with AI Magic */}
        <div className="md:col-span-2 space-y-1.5">
          <div className="flex justify-between items-center mb-1 ml-1">
            <label className="block text-sm font-semibold text-gray-700">Professional Summary</label>
            <button 
              onClick={handleAiMagic}
              disabled={loading}
              className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:shadow-lg disabled:opacity-50 transition-all"
            >
              {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
              AI Write
            </button>
          </div>
          <textarea
            value={cvData.personalInfo.description}
            onChange={(e) => updatePersonalInfo({ description: e.target.value })}
            rows={4}
            placeholder="Briefly describe your professional background..."
            className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none shadow-sm bg-white"
          />
        </div>

        {/* Full Name */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 ml-1">Full Name</label>
          <input
            type="text"
            value={cvData.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white"
          />
        </div>

        {/* Rest of the fields (NIC, DOB, etc.) stay the same */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 ml-1">NIC Number</label>
          <input
            type="text"
            value={cvData.personalInfo.nicNumber}
            onChange={(e) => updatePersonalInfo({ nicNumber: e.target.value })}
            className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 ml-1">Date of Birth</label>
          <input
            type="date"
            value={cvData.personalInfo.dateOfBirth}
            onChange={(e) => updatePersonalInfo({ dateOfBirth: e.target.value })}
            className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white appearance-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 ml-1">Gender</label>
          <select
            value={cvData.personalInfo.gender}
            onChange={(e) => updatePersonalInfo({ gender: e.target.value })}
            className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white appearance-none"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 ml-1">Nationality</label>
          <input
            type="text"
            value={cvData.personalInfo.nationality}
            onChange={(e) => updatePersonalInfo({ nationality: e.target.value })}
            className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white"
          />
        </div>
      </div>
    </div>
  );
}
