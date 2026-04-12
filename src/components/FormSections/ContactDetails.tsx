import React from 'react';
import { useCV } from '../../context/CVContext';
export function ContactDetails() {
  const { cvData, updateContact } = useCV();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number 1 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={cvData.contact.phone1}
            onChange={(e) =>
            updateContact({
              phone1: e.target.value
            })
            }
            placeholder="e.g., 077 123 4567"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number 2 (Optional)
          </label>
          <input
            type="tel"
            value={cvData.contact.phone2}
            onChange={(e) =>
            updateContact({
              phone2: e.target.value
            })
            }
            placeholder="e.g., 011 234 5678"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={cvData.contact.email}
            onChange={(e) =>
            updateContact({
              email: e.target.value
            })
            }
            placeholder="e.g., yourname@email.com"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            value={cvData.contact.address}
            onChange={(e) =>
            updateContact({
              address: e.target.value
            })
            }
            placeholder="e.g., No. 10, Main Street, Colombo 07"
            rows={2}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" />
          
        </div>
      </div>
    </div>);

}