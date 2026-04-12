import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, XIcon } from 'lucide-react';
export function Languages() {
  const { cvData, addLanguage, removeLanguage } = useCV();
  const [newLanguage, setNewLanguage] = useState('');
  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      addLanguage(newLanguage);
      setNewLanguage('');
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddLanguage();
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newLanguage}
          onChange={(e) => setNewLanguage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., Sinhala, English, Tamil"
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
        
        <button
          onClick={handleAddLanguage}
          disabled={!newLanguage.trim()}
          className="px-4 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
          
          <PlusIcon className="w-4 h-4" />
          Add
        </button>
      </div>

      {cvData.languages.length > 0 ?
      <div className="flex flex-wrap gap-2">
          {cvData.languages.map((language, index) =>
        <div
          key={index}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full">
          
              <span className="text-gray-700">{language}</span>
              <button
            onClick={() => removeLanguage(index)}
            className="p-0.5 text-gray-400 hover:text-red-500 transition-colors">
            
                <XIcon className="w-3.5 h-3.5" />
              </button>
            </div>
        )}
        </div> :

      <p className="text-sm text-gray-500 text-center py-4">
          No languages added yet. Add languages you speak above.
        </p>
      }
    </div>);

}