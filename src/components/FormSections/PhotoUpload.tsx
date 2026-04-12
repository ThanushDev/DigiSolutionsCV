import React, { useRef, useState } from 'react';
import { useCV } from '../../context/CVContext';
import { CameraIcon, XIcon, Loader2, CheckCircle2 } from 'lucide-react';

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
    <div className="space-y-6 animate-in fade-in duration-500">
      <label className="block text-[11px] font-black uppercase tracking-widest text-gray-500 ml-1">
        Profile Photo
      </label>

      <div className="flex flex-col items-center sm:flex-row gap-6 bg-gray-50/50 p-6 rounded-3xl border border-dashed border-gray-200">
        {/* Photo Display Area */}
        <div className="relative">
          <div className={`w-36 h-36 bg-white border-4 border-white flex items-center justify-center overflow-hidden shadow-xl transition-all duration-500 ${
            cvData.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-3xl'
          }`}>
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <span className="text-[10px] font-bold text-blue-600 uppercase">Uploading...</span>
              </div>
            ) : cvData.personalInfo.photo ? (
              <img src={cvData.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-zinc-300">
                <CameraIcon className="w-10 h-10" />
                <span className="text-[10px] font-bold uppercase">No Image</span>
              </div>
            )}
          </div>

          {/* Remove Button */}
          {cvData.personalInfo.photo && !isUploading && (
            <button 
              onClick={handleRemovePhoto} 
              className="absolute -top-1 -right-1 p-2 bg-red-500 text-white rounded-full shadow-lg active:scale-90 transition-all"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Controls Area */}
        <div className="flex-1 w-full space-y-5 text-center sm:text-left">
          <div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" id="photo-upload" />
            <label 
              htmlFor="photo-upload" 
              className="inline-flex items-center justify-center px-8 py-4 bg-zinc-900 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl cursor-pointer shadow-xl hover:bg-zinc-800 active:scale-95 transition-all w-full sm:w-auto"
            >
              {cvData.personalInfo.photo ? 'Change Photo' : 'Upload Photo'}
            </label>
            <p className="text-[10px] text-gray-400 mt-2">Max size: 2MB (JPG, PNG)</p>
          </div>

          {/* Format Selector */}
          <div className="flex items-center justify-center sm:justify-start gap-4 p-1 bg-gray-100 rounded-xl w-fit mx-auto sm:mx-0">
            {['circular', 'square'].map((format) => (
              <button
                key={format}
                onClick={() => updatePersonalInfo({ photoFormat: format as 'circular' | 'square' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  cvData.personalInfo.photoFormat === format 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className={`w-3 h-3 border-2 ${format === 'circular' ? 'rounded-full' : 'rounded-sm'} ${cvData.personalInfo.photoFormat === format ? 'border-blue-600' : 'border-gray-400'}`} />
                <span className="text-[10px] font-black uppercase tracking-tighter">{format}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
