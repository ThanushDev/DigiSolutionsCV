import React, { useRef, useState } from 'react';
import { useCV } from '../../context/CVContext';
import { CameraIcon, XIcon, Loader2, Sparkles } from 'lucide-react';

export function PhotoUpload() {
  const { cvData, updatePersonalInfo } = useCV();
  const [isUploading, setIsUploading] = useState(false);
  const [isRemovingBg, setIsRemovingBg] = useState(false);
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
      }
    } catch (error) {
      alert("Network Error: Check connection.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveBg = async () => {
    if (!cvData.personalInfo.photo) return;
    setIsRemovingBg(true);
    try {
      // Background Removal Logic (ඔයාගේ කලින් API එක පාවිච්චි කර ඇත)
      const response = await fetch(cvData.personalInfo.photo);
      const blob = await response.blob();
      const file = new File([blob], "photo.png", { type: "image/png" });
      
      const formData = new FormData();
      formData.append('image_file', file);
      
      const bgRes = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: { 'X-Api-Key': 'bcKub9ab7FzoaNnTQEFEXBXs' },
        body: formData,
      });

      if (bgRes.ok) {
        const bgBlob = await bgRes.blob();
        const reader = new FileReader();
        reader.onloadend = () => updatePersonalInfo({ photo: reader.result as string });
        reader.readAsDataURL(bgBlob);
      }
    } catch (e) {
      alert("AI Background removal failed.");
    } finally {
      setIsRemovingBg(false);
    }
  };

  return (
    <div className="flex flex-col items-center sm:flex-row gap-6 p-6 bg-blue-50/50 rounded-3xl border border-blue-100">
      <div className="relative group">
        <div className={`w-32 h-32 md:w-40 md:h-40 bg-white shadow-xl flex items-center justify-center overflow-hidden border-4 border-white transition-all ${cvData.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-2xl'}`}>
          {cvData.personalInfo.photo ? (
            <img src={cvData.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <CameraIcon className="w-10 h-10 text-gray-300" />
          )}
          {(isUploading || isRemovingBg) && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
        </div>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      </div>

      <div className="flex-1 space-y-4 text-center sm:text-left">
        <div>
          <h3 className="text-lg font-black text-gray-800 uppercase italic">Profile Photo</h3>
          <p className="text-xs text-gray-500 font-medium">Add a professional photo to stand out</p>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
          <button onClick={() => fileInputRef.current?.click()} className="px-5 py-2.5 bg-blue-600 text-white text-[11px] font-black uppercase rounded-xl">Upload</button>
          {cvData.personalInfo.photo && (
            <button onClick={handleRemoveBg} disabled={isRemovingBg} className="px-5 py-2.5 bg-purple-600 text-white text-[11px] font-black uppercase rounded-xl flex items-center gap-2">
              <Sparkles size={14} /> AI Remove BG
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
