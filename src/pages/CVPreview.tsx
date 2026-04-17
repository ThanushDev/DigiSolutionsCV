import React, { useState } from 'react';
import { useCV } from '../context/CVContext';
import { CVTemplateBase } from '../components/CVTemplates/CVTemplateBase';
import { templateThemes } from '../types/cv';
import { ChevronLeftIcon, CheckCircle2Icon, Loader2, XIcon, Paintbrush, SendIcon, Smartphone, Monitor } from 'lucide-react';

export function CVPreview({ onBack }: { onBack: () => void }) {
  const { cvData, setSelectedTemplate, updateThemeColor } = useCV();
  const [showPayment, setShowPayment] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [slipUrl, setSlipUrl] = useState('');
  const [previewScale, setPreviewScale] = useState(0.5); // Default scale for desktop

  // Handle Slip Upload to ImgBB
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=43b8bf4b90a4c63f2f931edfc646c148`, {
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
      alert("Error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  // WhatsApp Logic with Encoded Data
  const handleWhatsApp = () => {
    const cvJson = JSON.stringify(cvData);
    const encodedData = btoa(unescape(encodeURIComponent(cvJson)));
    
    const message = `*NEW CV ORDER*\n\n` +
      `*Name:* ${cvData.personalInfo.fullName}\n` +
      `*Template:* ${cvData.selectedTemplate}\n` +
      `*Payment Slip:* ${slipUrl}\n\n` +
      `*Data Block (Copy this):*\n${encodedData}`;

    window.open(`https://wa.me/94764781212?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="h-screen bg-zinc-800 flex flex-col md:flex-row overflow-hidden">
      
      {/* --- Sidebar: Controls --- */}
      <div className="w-full md:w-[350px] bg-white border-r flex flex-col z-20 shadow-2xl h-full">
        <div className="p-6 border-b">
          <button 
            onClick={onBack}
            className="flex items-center text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4 hover:text-blue-600 transition-colors"
          >
            <ChevronLeftIcon size={14} className="mr-1"/> Back to Editor
          </button>
          <div className="flex items-center gap-2">
            <Paintbrush size={20} className="text-blue-600"/>
            <h2 className="text-xl font-black uppercase italic">Customize</h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50/50">
          <p className="text-[10px] font-black uppercase text-zinc-400 px-2">Select Template Style</p>
          {templateThemes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTemplate(t.id);
                updateThemeColor(t.primaryColor);
              }}
              className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex justify-between items-center ${
                cvData.selectedTemplate === t.id 
                ? 'border-blue-600 bg-blue-50 shadow-md' 
                : 'border-white bg-white hover:border-zinc-200 shadow-sm'
              }`}
            >
              <div className="flex flex-col">
                <span className={`text-[11px] font-black uppercase ${cvData.selectedTemplate === t.id ? 'text-blue-700' : 'text-zinc-600'}`}>
                  {t.name}
                </span>
                <span className="text-[9px] text-zinc-400 font-bold">Professional Layout</span>
              </div>
              {cvData.selectedTemplate === t.id && <CheckCircle2Icon size={18} className="text-blue-600" />}
            </button>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white border-t space-y-4">
          <div className="flex items-center gap-3">
             <div className="flex-1">
                <p className="text-[9px] font-black uppercase text-zinc-400 mb-1">Theme Color</p>
                <input 
                  type="color" 
                  value={cvData.customColor} 
                  onChange={(e) => updateThemeColor(e.target.value)}
                  className="w-full h-10 rounded-xl cursor-pointer bg-white border p-1"
                />
             </div>
             <div className="flex-1">
                <p className="text-[9px] font-black uppercase text-zinc-400 mb-1">Zoom View</p>
                <div className="flex bg-zinc-100 rounded-xl p-1">
                   <button onClick={() => setPreviewScale(0.35)} className={`flex-1 flex justify-center py-1.5 rounded-lg ${previewScale === 0.35 ? 'bg-white shadow-sm' : ''}`}><Smartphone size={14}/></button>
                   <button onClick={() => setPreviewScale(0.55)} className={`flex-1 flex justify-center py-1.5 rounded-lg ${previewScale === 0.55 ? 'bg-white shadow-sm' : ''}`}><Monitor size={14}/></button>
                </div>
             </div>
          </div>
          
          <button 
            onClick={() => setShowPayment(true)}
            className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-black uppercase text-[12px] flex items-center justify-center gap-2 shadow-xl hover:bg-black transition-transform active:scale-95"
          >
            <SendIcon size={16}/> Finalize & Download
          </button>
        </div>
      </div>

      {/* --- Preview Area --- */}
      <div className="flex-1 overflow-auto bg-zinc-900/50 p-4 md:p-8 flex justify-center items-start custom-scrollbar">
        <div className="transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
           <CVTemplateBase cvData={cvData} scale={previewScale} />
        </div>
      </div>

      {/* --- Payment Modal --- */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setShowPayment(false)}
              className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full"
            >
              <XIcon size={20}/>
            </button>
            
            <h3 className="text-2xl font-black uppercase mb-2 italic">Payment Details</h3>
            <p className="text-zinc-500 text-xs mb-6 font-bold uppercase tracking-widest">Complete the transfer to receive your PDF</p>
            
            <div className="bg-zinc-900 text-white rounded-3xl p-6 mb-6 shadow-inner">
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] uppercase font-black text-zinc-400">Bank Name</p>
                  <p className="font-bold text-lg">Bank of Ceylon (BOC)</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black text-zinc-400">Account Number</p>
                  <p className="font-bold text-xl tracking-wider text-blue-400">91691764</p>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                  <span className="text-[10px] uppercase font-black opacity-50">Total Amount</span>
                  <span className="text-xl font-black">Rs. 500.00</span>
                </div>
              </div>
            </div>

            <label className={`flex flex-col items-center justify-center w-full h-40 border-4 border-dashed rounded-[2rem] cursor-pointer transition-all ${
              slipUrl ? 'bg-green-50 border-green-200' : 'bg-zinc-50 border-zinc-200 hover:border-blue-300'
            }`}>
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="animate-spin text-blue-600" />
                  <span className="text-[10px] font-black uppercase">Uploading Slip...</span>
                </div>
              ) : slipUrl ? (
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle2Icon size={32} className="text-green-600" />
                  <span className="text-[10px] font-black uppercase text-green-700">Slip Uploaded!</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-white rounded-full shadow-sm"><SendIcon size={20} className="text-zinc-400 rotate-[-45deg]"/></div>
                  <span className="text-[10px] font-black uppercase opacity-40">Tap to Upload Payment Slip</span>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </label>

            <button 
              onClick={handleWhatsApp}
              disabled={!slipUrl}
              className={`w-full py-5 rounded-2xl font-black uppercase text-[12px] mt-6 transition-all ${
                slipUrl 
                ? 'bg-blue-600 text-white shadow-xl hover:bg-blue-700 active:scale-95' 
                : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
              }`}
            >
              Order via WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
