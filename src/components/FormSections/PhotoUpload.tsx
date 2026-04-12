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

    if (file.size > 2 * 1024 * 1024) {
      alert("File is too large! (Max 2MB)");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const apiKey = '43b8bf4b90a4c63f2f931edfc646c148'; 
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success && result.data && result.data.url) {
        // ඉතා වැදගත්: මෙතනදී සේව් වෙන්නේ පින්තූරයේ ලින්ක් එක විතරයි.
        updatePersonalInfo({ photo: result.data.url });
      } else {
        alert("Upload Error: " + (result.error ? result.error.message : "Failed"));
      }
    } catch (error) {
      alert("Network Error: Check connection.");
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
      <label className="block text-sm font-bold text-gray-700 uppercase">Profile Photo</label>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <div className={`w-32 h-32 bg-zinc-100 border-2 border-dashed border-zinc-300 flex items-center justify-center overflow-hidden shadow-inner ${cvData.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-2xl'}`}>
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            ) : cvData.personalInfo.photo ? (
              <img src={cvData.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <CameraIcon className="w-8 h-8 text-zinc-400" />
            )}
          </div>
          {cvData.personalInfo.photo && !isUploading && (
            <button onClick={handleRemovePhoto} className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full shadow-lg">
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex-1">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" id="photo-upload" />
          <label htmlFor="photo-upload" className="inline-flex items-center px-6 py-3 bg-zinc-900 text-white text-xs font-black uppercase rounded-xl cursor-pointer shadow-lg">
            {cvData.personalInfo.photo ? 'Change Photo' : 'Choose Photo'}
          </label>
          <div className="flex gap-4 mt-3">
            {['circular', 'square'].map((format) => (
              <label key={format} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={cvData.personalInfo.photoFormat === format} onChange={() => updatePersonalInfo({ photoFormat: format as 'circular' | 'square' })} className="w-4 h-4" />
                <span className="text-[11px] font-bold text-zinc-600 uppercase">{format}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
