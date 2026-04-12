import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon } from 'lucide-react';
export function Skills() {
  const { cvData, addSkill, removeSkill } = useCV();
  const [newSkill, setNewSkill] = useState('');
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkill(newSkill);
      setNewSkill('');
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., Cash handling and account reconciliation"
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
        
        <button
          onClick={handleAddSkill}
          disabled={!newSkill.trim()}
          className="px-4 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
          
          <PlusIcon className="w-4 h-4" />
          Add
        </button>
      </div>

      {cvData.skills.length > 0 ?
      <div className="space-y-2">
          {cvData.skills.map((skill, index) =>
        <div
          key={index}
          className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg group">
          
              <span className="text-gray-700">{skill}</span>
              <button
            onClick={() => removeSkill(index)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors">
            
                <XIcon className="w-4 h-4" />
              </button>
            </div>
        )}
        </div> :

      <p className="text-sm text-gray-500 text-center py-4">
          No skills added yet. Add your skills above.
        </p>
      }
    </div>);

}