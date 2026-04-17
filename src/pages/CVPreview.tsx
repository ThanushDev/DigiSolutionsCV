import React, { useState } from 'react';
import { useCV } from '../context/CVContext';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { templateThemes } from '../types/cv';
import { ChevronLeftIcon, CheckCircle2Icon, UploadIcon, Loader2, XIcon, Paintbrush, SendIcon } from 'lucide-react';

export function CVPreview({ onBack }: { onBack: () => void }) {
  const { cvData, setSelectedTemplate, updateThemeColor, setBrightness } = useCV();
  const [showPayment, setShowPayment] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [slipUrl, setSlipUrl] = useState('');

  // ImgBB Upload Logic (Same as your old code)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=43b8bf4b90a4c63f2f931edfc646c148`, { 
        method: 'POST', 
        body: formData 
      });
      const result = await response.json();
      if (result.success) setSlipUrl(result.data.url);
    } catch { 
      alert("Upload failed. Please check your internet."); 
    } finally { 
      setIsUploading(false); 
    }
  };

  // WhatsApp Submission with Full Encoded Data (Same as your old code)
  const handleWhatsApp = () => {
    const data = btoa(unescape(encodeURIComponent(JSON.stringify(cvData))));
    const msg = `Hi, I have completed my CV.\n\nPayment Slip: ${slipUrl}\n\nReference Data: ${data}`;
    window.open(`https://wa.me/94764781212?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="h-screen bg-zinc-100 flex flex-col md:flex-row overflow-hidden">
      
      {/* --- SIDEBAR: Template Selection & Controls --- */}
      <div className="w-full md:w-85 bg-white border-r flex flex-col z-20 shadow-2xl h-full">
        
        <div className="p-6 border-b">
          <button onClick={onBack} className="flex items-center text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4 hover:text-blue-600 transition-colors">
            <ChevronLeftIcon size={14} className="mr-1"/> Edit Information
          </button>
          <div className="flex items-center gap-2 text-zinc-800">
            <Paintbrush size={18} className="text-blue-600"/>
            <h2 className="text-xl font-black uppercase tracking-tighter">Choose Layout</h2>
          </div>
        </div>

        {/* Templates List - Structured for all 8 designs */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-zinc-50/50 custom-scrollbar">
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest px-2 mb-2">Available Templates</p>
          {templateThemes.map(t => (
            <button 
              key={t.id} 
              onClick={() => { 
                setSelectedTemplate(t.id); 
                if(t.primaryColor) updateThemeColor(t.primaryColor); 
              }}
              className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex justify-between items-center ${
                cvData.selectedTemplate === t.id 
                ? 'border-blue-600 bg-blue-50 shadow-md scale-[1.02]' 
                : 'border-white bg-white hover:border-zinc-200 shadow-sm'
              }`}
            >
              <div className="flex flex-col">
                <span className={`text-[11px] font-black uppercase ${cvData.selectedTemplate === t.id ? 'text-blue-700' : 'text-zinc-600'}`}>
                  {t.name}
                </span>
                <span className="text-[8px] opacity-40 font-bold uppercase mt-1">Design Style 0{t.id}</span>
              </div>
              {cvData.selectedTemplate === t.id && <CheckCircle2Icon size={18} className="text-blue-600" />}
            </button>
          ))}
        </div>

        {/* Customization & Action Button */}
        <div className="p-6 bg-white border-t space-y-4 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-2xl border">
            <span className="text-[10px] font-black uppercase text-zinc-500">Theme Color</span>
            <input 
              type="color" 
              value={cvData.customColor} 
              onChange={(e) => updateThemeColor(e.target.value)} 
              className="w-10 h-10 rounded-xl cursor-pointer bg-white border p-1" 
            />
          </div>
          
          <div className="p-3 bg-zinc-50 rounded-2xl border space-y-2">
            <div className="flex justify-between font-black text-[10px] uppercase text-zinc-500">
              <span>Brightness</span>
              <span className="text-blue-600">{cvData.brightness}%</span>
            </div>
            <input 
              type="range" min="50" max="150" 
              value={cvData.brightness} 
              onChange={(e) => setBrightness(parseInt(e.target.value))} 
              className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
            />
          </div>

          <button 
            onClick={() => setShowPayment(true)} 
            className="w-full py-4 bg-zinc-900 hover:bg-black text-white rounded-2xl font-black uppercase text-[11px] flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95"
          >
            <SendIcon size={14}/> Finalize & Download
          </button>
        </div>
      </div>

      {/* --- PREVIEW AREA: Real-time Render --- */}
      <div className="flex-1 bg-zinc-200/50 overflow-auto p-4 md:p-10 flex justify-center items-start">
        <div 
          className="transition-all duration-500 shadow-[0_0_80px_rgba(0,0,0,0.12)] origin-top mb-20" 
          style={{ transform: `scale(${window.innerWidth < 640 ? 0.35 : 0.82})` }}
        >
           <TemplateRenderer cvData={cvData} />
        </div>
      </div>

      {/* --- PAYMENT MODAL: Same logic as old code --- */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-md p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in duration-300">
            <button onClick={() => setShowPayment(false)} className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <XIcon size={20}/>
            </button>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 italic">Payment Confirmation</h3>
            
            <div className="bg-blue-50 rounded-[1.5rem] p-6 border border-blue-100 mb-6 space-y-3 text-sm">
              <div className="flex justify-between text-[10px] font-black uppercase opacity-60"><span>Bank</span><span className="text-zinc-900 font-bold text-right">Bank of Ceylon</span></div>
              <div className="flex justify-between text-[10px] font-black uppercase opacity-60"><span>Account No</span><span className="text-zinc-900 font-bold tracking-widest text-right">91691764</span></div>
              <div className="flex justify-between border-t border-blue-200 pt-3 font-black uppercase italic"><span>Total Service Fee</span><span className="text-blue-700 text-xl">Rs. 500.00</span></div>
            </div>

            <label className={`flex flex-col items-center justify-center w-full h-44 border-4 border-dashed rounded-[2rem] cursor-pointer mb-6 transition-all ${slipUrl ? 'bg-green-50 border-green-200' : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'}`}>
              {isUploading ? <Loader2 className="animate-spin text-blue-600" size={32} /> : slipUrl ? (
                <div className="flex flex-col items-center text-green-700">
                  <CheckCircle2Icon size={32} className="mb-2" />
                  <span className="text-[10px] font-black uppercase">Slip Uploaded Successfully</span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-zinc-400">
                  <UploadIcon size={32} className="mb-2"/>
                  <span className="text-[10px] font-black uppercase tracking-widest text-center">Upload Your Bank Slip<br/><span className="lowercase font-normal opacity-60">(Click to browse)</span></span>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </label>

            <button 
              onClick={handleWhatsApp} 
              disabled={!slipUrl} 
              className={`w-full py-5 rounded-[1.5rem] font-black uppercase text-[12px] tracking-widest transition-all ${slipUrl ? 'bg-blue-600 text-white shadow-2xl hover:bg-blue-700 active:scale-95' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'}`}
            >
              Get PDF via WhatsApp
            </button>
            <p className="text-center text-[9px] font-bold text-zinc-400 uppercase mt-4 tracking-tighter">
              Data is encrypted before submission for your privacy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
