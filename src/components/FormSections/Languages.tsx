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
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Input Section - Responsive layout */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="e.g., Sinhala, English"
            className="w-full px-4 py-3.5 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none shadow-sm bg-white"
          />
        </div>
        
        <button
          onClick={handleAddLanguage}
          disabled={!newLanguage.trim()}
          className="w-full sm:w-auto px-6 py-3.5 md:py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-bold text-sm"
        >
          <PlusIcon className="w-5 h-5 sm:w-4 sm:h-4" />
          Add Language
        </button>
      </div>

      {/* Languages Tags Section */}
      <div className="bg-gray-50/50 p-4 rounded-2xl border border-dashed border-gray-200 min-h-[100px]">
        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">
          Your Languages
        </label>
        
        {cvData.languages.length > 0 ? (
          <div className="flex flex-wrap gap-2 md:gap-3">
            {cvData.languages.map((language, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-100 rounded-full shadow-sm animate-in zoom-in duration-300"
              >
                <span className="text-gray-700 font-medium text-sm">{language}</span>
                <button
                  onClick={() => removeLanguage(index)}
                  className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 opacity-50">
            <p className="text-xs text-gray-500">No languages added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
