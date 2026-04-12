import React from 'react';
import { useCV } from '../../context/CVContext';
export function PersonalInfo() {
  const { cvData, updatePersonalInfo } = useCV();
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={cvData.personalInfo.name}
            onChange={(e) =>
            updatePersonalInfo({
              name: e.target.value
            })
            }
            placeholder="e.g., JOHN SMITH"
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base" />
          
          <p className="text-xs text-gray-500 mt-1">
            This will appear as the main heading on your CV
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Professional Summary
          </label>
          <textarea
            value={cvData.personalInfo.description}
            onChange={(e) =>
            updatePersonalInfo({
              description: e.target.value
            })
            }
            placeholder="Brief description about yourself and your professional background..."
            rows={3}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm sm:text-base" />
          
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={cvData.personalInfo.fullName}
            onChange={(e) =>
            updatePersonalInfo({
              fullName: e.target.value
            })
            }
            placeholder="e.g., John Michael Smith"
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base" />
          
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={cvData.personalInfo.dateOfBirth}
              onChange={(e) =>
              updatePersonalInfo({
                dateOfBirth: e.target.value
              })
              }
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base" />
            
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NIC Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={cvData.personalInfo.nicNumber}
              onChange={(e) =>
              updatePersonalInfo({
                nicNumber: e.target.value
              })
              }
              placeholder="e.g., 123456789V"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base" />
            
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              value={cvData.personalInfo.gender}
              onChange={(e) =>
              updatePersonalInfo({
                gender: e.target.value
              })
              }
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base">
              
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nationality <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={cvData.personalInfo.nationality}
              onChange={(e) =>
              updatePersonalInfo({
                nationality: e.target.value
              })
              }
              placeholder="e.g., Sri Lankan"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base" />
            
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Religion
            </label>
            <input
              type="text"
              value={cvData.personalInfo.religion}
              onChange={(e) =>
              updatePersonalInfo({
                religion: e.target.value
              })
              }
              placeholder="e.g., Buddhism"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base" />
            
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Civil Status <span className="text-red-500">*</span>
            </label>
            <select
              value={cvData.personalInfo.civilStatus}
              onChange={(e) =>
              updatePersonalInfo({
                civilStatus: e.target.value
              })
              }
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base">
              
              <option value="">Select Status</option>
              <option value="Unmarried">Unmarried</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
        </div>
      </div>
    </div>);

}