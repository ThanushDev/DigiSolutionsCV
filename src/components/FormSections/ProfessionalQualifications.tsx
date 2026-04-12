import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon } from 'lucide-react';
export function ProfessionalQualifications() {
  const {
    cvData,
    addProfessionalQualification,
    removeProfessionalQualification
  } = useCV();
  const [newQualification, setNewQualification] = useState('');
  const handleAdd = () => {
    if (newQualification.trim()) {
      addProfessionalQualification(newQualification);
      setNewQualification('');
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newQualification}
          onChange={(e) => setNewQualification(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., Diploma in Business Management"
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
        
        <button
          onClick={handleAdd}
          disabled={!newQualification.trim()}
          className="px-4 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
          
          <PlusIcon className="w-4 h-4" />
          Add
        </button>
      </div>

      {cvData.professionalQualifications.length > 0 ?
      <div className="space-y-2">
          {cvData.professionalQualifications.map((qualification, index) =>
        <div
          key={index}
          className="flex items-start justify-between px-4 py-3 bg-gray-50 rounded-lg group">
          
              <span className="text-gray-700 flex-1 pr-4">{qualification}</span>
              <button
            onClick={() => removeProfessionalQualification(index)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
            
                <XIcon className="w-4 h-4" />
              </button>
            </div>
        )}
        </div> :

      <p className="text-sm text-gray-500 text-center py-4">
          No professional qualifications added yet. Add your certifications and
          courses above.
        </p>
      }
    </div>);

}