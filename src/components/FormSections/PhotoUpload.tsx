import React, { useRef } from 'react';
import { useCV } from '../../context/CVContext';
import { CameraIcon, XIcon } from 'lucide-react';
export function PhotoUpload() {
  const { cvData, updatePersonalInfo } = useCV();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo({
          photo: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemovePhoto = () => {
    updatePersonalInfo({
      photo: ''
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Profile Photo
      </label>

      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
        <div className="relative mx-auto sm:mx-0">
          <div
            className={`w-28 h-28 sm:w-32 sm:h-32 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden ${cvData.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-lg'}`}>
            
            {cvData.personalInfo.photo ?
            <img
              src={cvData.personalInfo.photo}
              alt="Profile"
              className="w-full h-full object-cover" /> :


            <CameraIcon className="w-8 h-8 text-gray-400" />
            }
          </div>
          {cvData.personalInfo.photo &&
          <button
            onClick={handleRemovePhoto}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
            
              <XIcon className="w-4 h-4" />
            </button>
          }
        </div>

        <div className="flex-1 space-y-4 w-full sm:w-auto">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="photo-upload" />
          
          <label
            htmlFor="photo-upload"
            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-gray-700 transition-colors w-full sm:w-auto justify-center sm:justify-start">
            
            <CameraIcon className="w-4 h-4 mr-2" />
            {cvData.personalInfo.photo ? 'Change Photo' : 'Upload Photo'}
          </label>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Photo Format
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="photoFormat"
                  value="circular"
                  checked={cvData.personalInfo.photoFormat === 'circular'}
                  onChange={() =>
                  updatePersonalInfo({
                    photoFormat: 'circular'
                  })
                  }
                  className="w-4 h-4 text-blue-600" />
                
                <span className="text-sm text-gray-700">Circular</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="photoFormat"
                  value="square"
                  checked={cvData.personalInfo.photoFormat === 'square'}
                  onChange={() =>
                  updatePersonalInfo({
                    photoFormat: 'square'
                  })
                  }
                  className="w-4 h-4 text-blue-600" />
                
                <span className="text-sm text-gray-700">Square</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>);

}