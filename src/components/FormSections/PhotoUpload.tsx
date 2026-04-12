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

    // 2MB ට වඩා වැඩිද බලනවා (ImgBB limit)
    if (file.size > 2 * 1024 * 1024) {
      alert("File is too large!");
      return;
    }

    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('image', file);

    try {
      // මෙතනට ඔයාගේ API Key එක දාන්න
      const apiKey = '43b8bf4b90a4c63f2f931edfc646c148'; 
      
      // ලින්ක් එකේ අගට expiration=64800 (පැය 18) එකතු කළා
      const response = await fetch(`https://api.imgbb.com/1/upload?expiration=64800&key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      // JSON එකේ success: true ද බලනවා
      if (result.success && result.data && result.data.url) {
        // ඔයා එවල තියෙන JSON එකේ හැටියට result.data.url තමයි image link එක
        updatePersonalInfo({ photo: result.data.url });
      } else {
        // API එකෙන් එවන ඇත්තම error එක පෙන්වන්න
        const errorMsg = result.error ? result.error.message : "Unknown error";
        alert("Upload Error: " + errorMsg);
      }
    } catch (error) {
      alert("Network Error: Please check your connection.");
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
      <label className="block text-sm font-medium text-gray-700 font-bold uppercase tracking-tight">Profile Photo</label>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          <div className={`w-32 h-32 bg-zinc-100 border-2 border-dashed border-zinc-300 flex items-center justify-center overflow-hidden shadow-inner ${cvData.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-2xl'}`}>
            {isUploading ? (
              <div className="flex flex-col items-center gap-1">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <span className="text-[10px] font-bold text-blue-600 uppercase">Wait...</span>
              </div>
            ) : cvData.personalInfo.photo ? (
              <img src={cvData.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <CameraIcon className="w-8 h-8 text-zinc-400" />
            )}
          </div>
          {cvData.personalInfo.photo && !isUploading && (
            <button onClick={handleRemovePhoto} className="absolute -top-2 -right-2 p-1.5 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all">
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex-1 space-y-4">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" id="photo-upload" />
          <label htmlFor="photo-upload" className={`inline-flex items-center px-6 py-3 bg-zinc-900 text-white text-xs font-black uppercase tracking-widest rounded-xl cursor-pointer hover:bg-black transition-all shadow-lg ${isUploading ? 'opacity-50' : ''}`}>
            {cvData.personalInfo.photo ? 'Change Photo' : 'Choose Photo'}
          </label>
          <div className="flex gap-4 bg-white p-2 rounded-xl border border-zinc-100 w-fit">
            {['circular', 'square'].map((format) => (
              <label key={format} className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded-lg hover:bg-zinc-50 transition-all">
                <input
                  type="radio"
                  checked={cvData.personalInfo.photoFormat === format}
                  onChange={() => updatePersonalInfo({ photoFormat: format as 'circular' | 'square' })}
                  className="w-4 h-4 text-blue-600 accent-blue-600"
                />
                <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-tighter capitalize">{format}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
