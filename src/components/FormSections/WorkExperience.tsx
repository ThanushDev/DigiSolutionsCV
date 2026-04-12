import React from 'react';
import { useCV } from '../../context/CVContext';
import { PlusIcon, TrashIcon } from 'lucide-react';
export function WorkExperience() {
  const {
    cvData,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience
  } = useCV();
  return (
    <div className="space-y-6">
      {cvData.workExperience.length > 0 ?
      <div className="space-y-6">
          {cvData.workExperience.map((exp, index) =>
        <div key={exp.id} className="p-4 bg-gray-50 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-700">
                  Experience {index + 1}
                </h4>
                <button
              onClick={() => removeWorkExperience(exp.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                type="text"
                value={exp.title}
                onChange={(e) =>
                updateWorkExperience(exp.id, {
                  title: e.target.value
                })
                }
                placeholder="e.g., Marketing Executive"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white" />
              
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                type="text"
                value={exp.company}
                onChange={(e) =>
                updateWorkExperience(exp.id, {
                  company: e.target.value
                })
                }
                placeholder="e.g., ABC Company (Pvt) Ltd"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white" />
              
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Duration
                  </label>
                  <input
                type="text"
                value={exp.duration}
                onChange={(e) =>
                updateWorkExperience(exp.id, {
                  duration: e.target.value
                })
                }
                placeholder="e.g., One year"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white" />
              
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Description
                  </label>
                  <textarea
                value={exp.description}
                onChange={(e) =>
                updateWorkExperience(exp.id, {
                  description: e.target.value
                })
                }
                placeholder="Describe your responsibilities and achievements..."
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-white" />
              
                </div>
              </div>
            </div>
        )}
        </div> :

      <p className="text-sm text-gray-500 text-center py-4">
          No work experience added yet. Click the button below to add your
          experience.
        </p>
      }

      <button
        onClick={addWorkExperience}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2">
        
        <PlusIcon className="w-5 h-5" />
        Add Work Experience
      </button>
    </div>);

}