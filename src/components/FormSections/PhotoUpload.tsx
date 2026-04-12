import React, { useRef, useState } from 'react';
import { useCV } from '../../context/CVContext';
import { CameraIcon, XIcon, Loader2 } from 'lucide-react';

export function PhotoUpload() {
  const { cvData, updatePersonalInfo } = useCV();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const apiKey = 'YOUR_IMGBB_API_KEY'; 
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        updatePersonalInfo({ photo: result.data.url });
      } else {
        alert("Upload failed: " + result.error.message);
      }
    } catch (error) {
      alert("Error uploading photo. Please check internet.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    updatePersonalInfo({ photo: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
        <div className="relative mx-auto sm:mx-0">
          <div className={`w-28 h-28 sm:w-32 sm:h-32 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden ${cvData.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-2xl'}`}>
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            ) : cvData.personalInfo.photo ? (
              <img src={cvData.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <CameraIcon className="w-8 h-8 text-gray-400" />
            )}
          </div>
          {cvData.personalInfo.photo && !isUploading && (
            <button onClick={handleRemovePhoto} className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors">
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex-1 space-y-4 w-full">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" id="photo-upload" />
          <label htmlFor="photo-upload" className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {cvData.personalInfo.photo ? 'Change Photo' : 'Upload Photo'}
          </label>
          <div className="flex gap-4">
            {['circular', 'square'].map((format) => (
              <label key={format} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={cvData.personalInfo.photoFormat === format}
                  onChange={() => updatePersonalInfo({ photoFormat: format as 'circular' | 'square' })}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700 capitalize">{format}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
