import React from 'react';
import { useCV } from '../../context/CVContext';
export function References() {
  const { cvData, updateReference } = useCV();
  const renderReferenceForm = (index: 0 | 1, title: string) => {
    const ref = cvData.references[index];
    return (
      <div className="p-4 bg-gray-50 rounded-lg space-y-4">
        <h4 className="font-semibold text-gray-800">{title}</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={ref.name}
              onChange={(e) =>
              updateReference(index, {
                name: e.target.value
              })
              }
              placeholder="e.g., Mr. K. Perera"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white" />
            
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Designation
            </label>
            <input
              type="text"
              value={ref.designation}
              onChange={(e) =>
              updateReference(index, {
                designation: e.target.value
              })
              }
              placeholder="e.g., Senior Manager"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white" />
            
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Organization
            </label>
            <input
              type="text"
              value={ref.organization}
              onChange={(e) =>
              updateReference(index, {
                organization: e.target.value
              })
              }
              placeholder="e.g., XYZ Holdings (Pvt) Ltd"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white" />
            
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={ref.phone}
              onChange={(e) =>
              updateReference(index, {
                phone: e.target.value
              })
              }
              placeholder="e.g., 077 987 6543"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white" />
            
          </div>
        </div>
      </div>);

  };
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        Please provide details of two references who can vouch for your
        professional capabilities.
      </p>
      {renderReferenceForm(0, 'Reference 1')}
      {renderReferenceForm(1, 'Reference 2')}
    </div>);

}