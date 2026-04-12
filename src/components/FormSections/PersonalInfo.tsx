import React from 'react';
import { useCV } from '../../context/CVContext';

export function PersonalInfo() {
  const { cvData, updatePersonalInfo } = useCV();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Mobile Header Context */}
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

        {/* Full Name */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 ml-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={cvData.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            placeholder="e.g., John Smith Perera"
            className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white"
          />
        </div>

        {/* Professional Summary */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 ml-1">Professional Summary</label>
          <textarea
            value={cvData.personalInfo.description}
            onChange={(e) => updatePersonalInfo({ description: e.target.value })}
            rows={4}
            placeholder="Briefly describe your professional background..."
            className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none shadow-sm bg-white"
          />
        </div>

        {/* NIC Number */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 ml-1">NIC Number</label>
          <input
            type="text"
            value={cvData.personalInfo.nicNumber}
            onChange={(e) => updatePersonalInfo({ nicNumber: e.target.value })}
            placeholder="e.g., 200012345678"
            className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white"
          />
        </div>

        {/* Date of Birth */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 ml-1">Date of Birth</label>
          <input
            type="date"
            value={cvData.personalInfo.dateOfBirth}
            onChange={(e) => updatePersonalInfo({ dateOfBirth: e.target.value })}
            className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white appearance-none"
          />
        </div>

        {/* Gender */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 ml-1">Gender</label>
          <div className="relative">
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
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
              ▼
            </div>
          </div>
        </div>

        {/* Nationality */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 ml-1">Nationality</label>
          <input
            type="text"
            value={cvData.personalInfo.nationality}
            onChange={(e) => updatePersonalInfo({ nationality: e.target.value })}
            placeholder="e.g., Sri Lankan"
            className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white"
          />
        </div>

        {/* Religion */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 ml-1">Religion</label>
          <input
            type="text"
            value={cvData.personalInfo.religion}
            onChange={(e) => updatePersonalInfo({ religion: e.target.value })}
            placeholder="e.g., Buddhism"
            className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white"
          />
        </div>

        {/* Civil Status */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 ml-1">Civil Status</label>
          <div className="relative">
            <select
              value={cvData.personalInfo.civilStatus}
              onChange={(e) => updatePersonalInfo({ civilStatus: e.target.value })}
              className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white appearance-none"
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Unmarried">Unmarried</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
              ▼
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
