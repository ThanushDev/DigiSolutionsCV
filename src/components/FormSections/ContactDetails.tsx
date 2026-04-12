import React from 'react';
import { useCV } from '../../context/CVContext';

export function ContactDetails() {
  const { cvData, updateContact } = useCV();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header for Mobile - Optional but looks good */}
      <div className="md:hidden mb-2">
        <h2 className="text-lg font-bold text-gray-800">Contact Details</h2>
        <p className="text-xs text-gray-500">How can employers reach you?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Phone 1 */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 ml-1">
            Phone Number 1 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            inputMode="tel" // Mobile keyboard එකේ numbers කෙලින්ම එන්න
            value={cvData.contact.phone1}
            onChange={(e) => updateContact({ phone1: e.target.value })}
            placeholder="e.g., 077 123 4567"
            className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none shadow-sm"
          />
        </div>

        {/* Phone 2 */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 ml-1">
            Phone Number 2 (Optional)
          </label>
          <input
            type="tel"
            inputMode="tel"
            value={cvData.contact.phone2}
            onChange={(e) => updateContact({ phone2: e.target.value })}
            placeholder="e.g., 011 234 5678"
            className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none shadow-sm"
          />
        </div>

        {/* Email Address */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 ml-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            inputMode="email"
            value={cvData.contact.email}
            onChange={(e) => updateContact({ email: e.target.value })}
            placeholder="e.g., yourname@email.com"
            className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none shadow-sm"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700 ml-1">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            value={cvData.contact.address}
            onChange={(e) => updateContact({ address: e.target.value })}
            placeholder="e.g., No. 10, Main Street, Colombo 07"
            rows={3} // මොබයිල් එකේදී ලිපිනය ටයිප් කරන්න ඉඩ ඕන නිසා 3ක් කළා
            className="w-full px-4 py-3 md:py-2.5 text-base md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none outline-none shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
