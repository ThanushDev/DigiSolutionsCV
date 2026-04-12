import React from 'react';
import { useCV } from '../../context/CVContext';

export function PersonalInfo() {
  const { cvData, updatePersonalInfo } = useCV();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Display Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Display Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={cvData.personalInfo.name}
            onChange={(e) => updatePersonalInfo({ name: e.target.value })}
            placeholder="e.g., JOHN SMITH"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={cvData.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            placeholder="e.g., John Smith Perera"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Summary */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
          <textarea
            value={cvData.personalInfo.description}
            onChange={(e) => updatePersonalInfo({ description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Other Fields (NIC, DOB, etc.) */}
        <input type="date" value={cvData.personalInfo.dateOfBirth} onChange={(e) => updatePersonalInfo({ dateOfBirth: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
        <input type="text" placeholder="NIC Number" value={cvData.personalInfo.nicNumber} onChange={(e) => updatePersonalInfo({ nicNumber: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
      </div>
    </div>
  );
}
