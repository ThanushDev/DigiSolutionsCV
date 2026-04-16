import React, { useRef, useState } from 'react';
import { useCV } from '../../context/CVContext';
import { CameraIcon, Loader2, Sparkles } from 'lucide-react';

export function PhotoUpload() {
  const { cvData, updatePersonalInfo } = useCV();
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadToImgBB = async (imageBlob: Blob | File) => {
    const formData = new FormData();
    formData.append('image', imageBlob);
    const apiKey = '43b8bf4b90a4c63f2f931edfc646c148';
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    return result.data.url;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsProcessing(true);
    try {
      const imageUrl = await uploadToImgBB(file);
      updatePersonalInfo({ photo: imageUrl });
    } catch (error) {
      alert("Upload failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveBackground = async () => {
    if (!cvData.personalInfo.photo) return;
    setIsProcessing(true);
    try {
      const response = await fetch(cvData.personalInfo.photo);
      const blob = await response.blob();
      const file = new File([blob], "photo.png", { type: "image/png" });

      const formData = new FormData();
      formData.append('image_file', file);
      
      const res = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: { 'X-Api-Key': 'bcKub9ab7FzoaNnTQEFEXBXs' },
        body: formData,
      });

      if (res.ok) {
        const bgRemovedBlob = await res.blob();
        const newUrl = await uploadToImgBB(bgRemovedBlob);
        updatePersonalInfo({ photo: newUrl }); // අන්තිම link එක මෙතනින් සේව් වෙනවා
      } else {
        alert("BG Removal Failed. Using original photo.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
      <div className="relative w-32 h-32 bg-white rounded-full overflow-hidden border-4 border-white shadow-lg">
        {cvData.personalInfo.photo ? (
          <img src={cvData.personalInfo.photo} className="w-full h-full object-cover" alt="Profile" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400"><CameraIcon/></div>
        )}
        {isProcessing && <div className="absolute inset-0 bg-black/20 flex items-center justify-center"><Loader2 className="animate-spin text-white"/></div>}
      </div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
      <div className="flex gap-2">
        <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase">Upload Photo</button>
        {cvData.personalInfo.photo && (
          <button onClick={handleRemoveBackground} className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold uppercase flex items-center gap-1">
            <Sparkles size={12}/> BG Remove
          </button>
        )}
      </div>
    </div>
  );
}
