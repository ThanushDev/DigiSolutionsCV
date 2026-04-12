import React from 'react';
import { useCV } from '../../context/CVContext';
import { UserCheck } from 'lucide-react';

export function References() {
  const { cvData, updateReference } = useCV();

  const renderReferenceForm = (index: 0 | 1, title: string) => {
    const ref = cvData.references[index];
    return (
      <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-5 animate-in fade-in duration-500">
        <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
          <div className="p-1.5 bg-blue-100 rounded-lg">
            <UserCheck className="w-4 h-4 text-blue-600" />
          </div>
          <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide">{title}</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={ref.name}
              onChange={(e) => updateReference(index, { name: e.target.value })}
              placeholder="e.g., Mr. K. Perera"
              className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white"
            />
          </div>

          {/* Designation */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
              Designation
            </label>
            <input
              type="text"
              value={ref.designation}
              onChange={(e) => updateReference(index, { designation: e.target.value })}
              placeholder="e.g., Senior Manager"
              className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white"
            />
          </div>

          {/* Organization */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
              Organization
            </label>
            <input
              type="text"
              value={ref.organization}
              onChange={(e) => updateReference(index, { organization: e.target.value })}
              placeholder="e.g., XYZ Holdings (Pvt) Ltd"
              className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white"
            />
          </div>

          {/* Phone Number */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              inputMode="tel"
              value={ref.phone}
              onChange={(e) => updateReference(index, { phone: e.target.value })}
              placeholder="e.g., 077 987 6543"
              className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-4">
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
        <p className="text-xs md:text-sm text-blue-700 font-medium">
          Please provide details of two non-related references who can vouch for your professional capabilities.
        </p>
      </div>
      
      {renderReferenceForm(0, 'Reference 01')}
      {renderReferenceForm(1, 'Reference 02')}
    </div>
  );
}
