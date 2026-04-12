import React from 'react';
import { useCV } from '../../context/CVContext';

export function PersonalInfo() {
  const { cvData, updatePersonalInfo } = useCV();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Display Name - CV එකේ උඩින්ම ලොකුවට වැටෙන නම */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Display Name (Name for Header) <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={cvData.personalInfo.name}
            onChange={(e) => updatePersonalInfo({ name: e.target.value })}
            placeholder="e.g., J.S. PERERA"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        {/* Full Name - Personal Details යටතේ වැටෙන සම්පූර්ණ නම */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={cvData.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            placeholder="e.g., John Smith Perera"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        {/* Professional Summary */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Professional Summary</label>
          <textarea
            value={cvData.personalInfo.description}
            onChange={(e) => updatePersonalInfo({ description: e.target.value })}
            rows={3}
            placeholder="Briefly describe your professional background..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
          />
        </div>

        {/* NIC Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">NIC Number</label>
          <input
            type="text"
            value={cvData.personalInfo.nicNumber}
            onChange={(e) => updatePersonalInfo({ nicNumber: e.target.value })}
            placeholder="e.g., 200012345678"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            value={cvData.personalInfo.dateOfBirth}
            onChange={(e) => updatePersonalInfo({ dateOfBirth: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
          <select
            value={cvData.personalInfo.gender}
            onChange={(e) => updatePersonalInfo({ gender: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nationality</label>
          <input
            type="text"
            value={cvData.personalInfo.nationality}
            onChange={(e) => updatePersonalInfo({ nationality: e.target.value })}
            placeholder="e.g., Sri Lankan"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        {/* Religion */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Religion</label>
          <input
            type="text"
            value={cvData.personalInfo.religion}
            onChange={(e) => updatePersonalInfo({ religion: e.target.value })}
            placeholder="e.g., Buddhism"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        {/* Civil Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Civil Status</label>
          <select
            value={cvData.personalInfo.civilStatus}
            onChange={(e) => updatePersonalInfo({ civilStatus: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          >
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Unmarried">Unmarried</option>
          </select>
        </div>

      </div>
    </div>
  );
}
