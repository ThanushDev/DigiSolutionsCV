import React from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, TrashIcon } from 'lucide-react';
export function Education() {
  const { cvData, updateEducation, addSubject, updateSubject, removeSubject } =
  useCV();
  const renderEducationLevel = (level: 'oLevel' | 'aLevel', title: string) => {
    const data = cvData.education[level];
    return (
      <div className="p-3 sm:p-4 bg-gray-50 rounded-lg space-y-4">
        <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
          {title}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
              Index Number
            </label>
            <input
              type="text"
              value={data.indexNumber}
              onChange={(e) =>
              updateEducation(level, {
                indexNumber: e.target.value
              })
              }
              placeholder="e.g., 84259728"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-sm" />
            
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
              Year
            </label>
            <input
              type="text"
              value={data.year}
              onChange={(e) =>
              updateEducation(level, {
                year: e.target.value
              })
              }
              placeholder="e.g., 2018"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-sm" />
            
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-xs sm:text-sm font-medium text-gray-600">
            Subjects & Results
          </label>

          {data.subjects.length > 0 ?
          <div className="space-y-2">
              {data.subjects.map((subject, index) =>
            <div key={index} className="flex gap-2 items-center">
                  <input
                type="text"
                value={subject.name}
                onChange={(e) =>
                updateSubject(level, index, {
                  name: e.target.value
                })
                }
                placeholder="Subject name"
                className="flex-1 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-xs sm:text-sm" />
              
                  <input
                type="text"
                value={subject.grade}
                onChange={(e) =>
                updateSubject(level, index, {
                  grade: e.target.value
                })
                }
                placeholder="Grade"
                className="w-16 sm:w-20 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-xs sm:text-sm text-center" />
              
                  <button
                onClick={() => removeSubject(level, index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
                
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
            )}
            </div> :

          <p className="text-xs sm:text-sm text-gray-500 text-center py-2">
              No subjects added yet.
            </p>
          }

          <button
            onClick={() => addSubject(level)}
            className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm">
            
            <PlusIcon className="w-4 h-4" />
            Add Subject
          </button>
        </div>
      </div>);

  };
  return (
    <div className="space-y-4 sm:space-y-6">
      {renderEducationLevel('oLevel', 'G.C.E. Ordinary Level Examination')}
      {renderEducationLevel('aLevel', 'G.C.E. Advanced Level Examination')}
    </div>);

}