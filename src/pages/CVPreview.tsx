import React, { useState } from 'react';
import { useCV } from '../context/CVContext';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { templateThemes } from '../types/cv';
import { ChevronLeftIcon, PaletteIcon, XIcon, SendIcon, CheckCircle2Icon, UploadIcon, Loader2 } from 'lucide-react';

export function CVPreview({ onBack }: { onBack: () => void }) {
  const { cvData, setSelectedTemplate } = useCV();
  const [showThemes, setShowThemes] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
  const [isUploading, setIsUploading] = useState(false);
  const [slipUrl, setSlipUrl] = useState(''); 

  if (!cvData) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
      if (result.success) {
        setSlipUrl(result.data.url);
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleWhatsApp = () => {
    const rawData = {
      t: cvData.selectedTemplate,
      n: cvData.personalInfo.name,
      fn: cvData.personalInfo.fullName,
      j: cvData.personalInfo.description,
      db: cvData.personalInfo.dateOfBirth,
      ni: cvData.personalInfo.nicNumber,
      rl: cvData.personalInfo.religion,
      cs: cvData.personalInfo.civilStatus,
      gn: cvData.personalInfo.gender,
      nt: cvData.personalInfo.nationality,

      // මේ ටික මම අලුතින් එකතු කළා - Profile Photo එක PDF එකට ගන්න මේක ඕනේ
      ph: cvData.personalInfo.photo, 
      pf: cvData.personalInfo.photoFormat,

      p1: cvData.contact.phone1,
      p2: cvData.contact.phone2,
      e: cvData.contact.email,
      a: cvData.contact.address,
      s: cvData.skills,
      l: cvData.languages,
      ex: cvData.workExperience,
      ed: cvData.education,
      pq: cvData.professionalQualifications,
      r: cvData.references
    };

    const data = btoa(unescape(encodeURIComponent(JSON.stringify(rawData))));
    const adminNumber = "94764781212";
    
    const message = `Hi, I have completed my CV. Please process it.
    
Payment Slip: ${slipUrl}

System Ref: ${data}`;

    window.open(`https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b p-4 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex justify-between">
          <button onClick={onBack} className="flex items-center font-bold text-gray-600">
            <ChevronLeftIcon className="mr-1"/> EDIT
          </button>
          <div className="flex gap-2">
            <button onClick={() => setShowThemes(true)} className="p-2 bg-gray-100 rounded-lg"><PaletteIcon/></button>
            <button onClick={() => setShowPayment(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
              <SendIcon size={18}/> Download Your CV
            </button>
          </div>
        </div>
      </div>

      <div className="py-10">
        <TemplateRenderer cvData={cvData} scale={0.7} />
      </div>

      {showPayment && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-black italic uppercase tracking-tight">Payment Details</h3>
              <button onClick={() => setShowPayment(false)} className="p-1 hover:bg-gray-100 rounded-full"><XIcon/></button>
            </div>
            
            <div className="bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-2xl p-5 mb-6">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Bank Transfer Info</p>
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-gray-500">Bank:</span><span className="font-bold">Bank of Ceylon</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Account No:</span><span className="font-bold">91691764</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Name:</span><span className="font-bold">PTN Pathiranage</span></div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3 text-center">Please upload a screenshot of your payment slip.</p>
              <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${slipUrl ? 'bg-green-50 border-green-300' : 'bg-gray-50 hover:bg-gray-100 border-gray-300'}`}>
                {isUploading ? (
                  <div className="flex flex-col items-center text-blue-600">
                    <Loader2 className="mb-2 animate-spin" />
                    <span className="text-sm font-bold uppercase">Uploading...</span>
                  </div>
                ) : slipUrl ? (
                  <div className="flex flex-col items-center text-green-600">
                    <CheckCircle2Icon className="mb-2" />
                    <span className="text-sm font-bold uppercase">Slip Uploaded!</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <UploadIcon className="mb-2" />
                    <span className="text-sm font-bold uppercase">Upload Slip</span>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
              </label>
            </div>

            <button 
              onClick={handleWhatsApp}
              disabled={!slipUrl || isUploading}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${slipUrl ? 'bg-green-600 text-white shadow-lg shadow-green-200' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              Confirm & Send to WhatsApp
            </button>
          </div>
        </div>
      )}

      {showThemes && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between mb-4 text-sm font-bold uppercase">
              <h3>Select Template</h3>
              <button onClick={() => setShowThemes(false)}><XIcon/></button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {templateThemes.map(t => (
                <button 
                  key={t.id} 
                  onClick={() => { setSelectedTemplate(t.id); setShowThemes(false); }}
                  className={`p-4 border-2 rounded-xl text-left transition-all ${cvData.selectedTemplate === t.id ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-gray-300'}`}
                >
                  <span className="font-bold uppercase tracking-wider">{t.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
