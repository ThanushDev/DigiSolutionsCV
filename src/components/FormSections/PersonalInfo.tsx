import React from 'react';
import { useCV } from '../../context/CVContext';

export function PersonalInfo() {
  const { cvData, updatePersonalInfo } = useCV();
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800">Personal Information</h3>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          value={cvData.personalInfo.name}
          onChange={(e) => updatePersonalInfo({ name: e.target.value })}
          placeholder="Display Name"
          className="w-full px-4 py-2 border rounded-lg"
        />
        {/* Anith fields tika me widiyatama danna */}
      </div>
    </div>
  );
}
