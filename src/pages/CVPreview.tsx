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

  // Payment Slip Upload to ImgBB
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=43b8bf4b90a4c63f2f931edfc646c148`, { method: 'POST', body: formData });
      const result = await response.json();
      if (result.success) setSlipUrl(result.data.url);
    } catch { alert("Upload failed"); } finally { setIsUploading(false); }
  };

  // WhatsApp Logic with Encoded Data
  const handleWhatsApp = () => {
    const data = btoa(unescape(encodeURIComponent(JSON.stringify(cvData))));
    const msg = `Hi, I have completed my CV.\n\nSlip: ${slipUrl}\n\nRef: ${data}`;
    window.open(`https://wa.me/94764781212?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="h-screen bg-zinc-100 flex flex-col md:flex-row overflow-hidden">
      
      {/* Side Control Panel - Structured for 8 Templates */}
      <div className="w-full md:w-80 bg-white border-r flex flex-col z-20 shadow-xl h-full">
        
        {/* Header Section */}
        <div className="p-6 border-b bg-white">
          <button onClick={onBack} className="flex items-center text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4 hover:text-blue-600 transition-colors">
            <ChevronLeftIcon size={14} className="mr-1"/> Back to Edit
          </button>
          <div className="flex items-center gap-2 text-blue-600">
            <Paintbrush size={18}/><h2 className="text-xl font-black uppercase tracking-tighter text-zinc-800">CV Style</h2>
          </div>
        </div>

        {/* Scrollable Templates List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-zinc-50/30 custom-scrollbar">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-2">Select Template (8 Designs)</label>
          {templateThemes.map(t => (
            <button 
              key={t.id} 
              onClick={() => { setSelectedTemplate(t.id); updateThemeColor(t.primaryColor); }}
              className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex justify-between items-center group shadow-sm ${cvData.selectedTemplate === t.id ? 'border-blue-600 bg-blue-50' : 'border-white bg-white hover:border-zinc-200'}`}
            >
              <div className="flex flex-col">
                <span className={`text-[10px] font-black uppercase ${cvData.selectedTemplate === t.id ? 'text-blue-700' : 'text-zinc-600'}`}>{t.name}</span>
                <span className="text-[8px] opacity-40 font-bold uppercase mt-1">Layout ID: {t.id}</span>
              </div>
              {cvData.selectedTemplate === t.id && <CheckCircle2Icon size={16} className="text-blue-600" />}
            </button>
          ))}
        </div>

        {/* Fixed Controls Area */}
        <div className="p-6 bg-white border-t shadow-[0_-10px_20px_rgba(0,0,0,0.02)] space-y-5">
          <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-2xl border border-zinc-100">
            <span className="text-[10px] font-black uppercase text-zinc-500 tracking-tighter">Theme Color</span>
            <input 
              type="color" 
              value={cvData.customColor} 
              onChange={(e) => updateThemeColor(e.target.value)} 
              className="w-10 h-10 rounded-xl cursor-pointer bg-white border border-zinc-200 p-1" 
            />
          </div>
          
          <div className="p-3 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-2">
            <div className="flex justify-between font-black text-[10px] uppercase text-zinc-500">
              <span>Brightness</span>
              <span className="text-blue-600">{cvData.brightness}%</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="150" 
              value={cvData.brightness} 
              onChange={(e) => setBrightness(parseInt(e.target.value))} 
              className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
            />
          </div>

          <button 
            onClick={() => setShowPayment(true)} 
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase text-[11px] flex items-center justify-center gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95"
          >
            <SendIcon size={14}/> Get Your CV
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-zinc-200/50 overflow-auto p-4 md:p-10 flex justify-center items-start">
        <div 
          className="transition-all duration-500 shadow-[0_0_60px_rgba(0,0,0,0.1)] origin-top mb-20" 
          style={{ transform: `scale(${window.innerWidth < 640 ? 0.35 : 0.82})` }}
        >
           <TemplateRenderer cvData={cvData} />
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-zinc-900/80 z-50 flex items-center justify-center backdrop-blur-md p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setShowPayment(false)} 
              className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <XIcon size={20}/>
            </button>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 italic">Secure Payment</h3>
            
            <div className="bg-blue-50 rounded-[1.5rem] p-6 border border-blue-100 mb-6 space-y-3 text-sm">
              <div className="flex justify-between text-zinc-600 uppercase text-[9px] font-black tracking-widest"><span>Bank Name</span><span className="text-zinc-900 font-bold">Bank of Ceylon</span></div>
              <div className="flex justify-between text-zinc-600 uppercase text-[9px] font-black tracking-widest"><span>Account No</span><span className="text-zinc-900 font-bold tracking-widest">91691764</span></div>
              <div className="flex justify-between border-t border-blue-200 pt-3 font-black uppercase"><span>Service Fee</span><span className="text-blue-700 text-xl">Rs. 500.00</span></div>
            </div>

            <label className={`flex flex-col items-center justify-center w-full h-40 border-4 border-dashed rounded-[2rem] cursor-pointer mb-6 transition-all ${slipUrl ? 'bg-green-50 border-green-200' : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100'}`}>
              {isUploading ? (
                <Loader2 className="animate-spin text-blue-600" size={32} />
              ) : slipUrl ? (
                <div className="flex flex-col items-center">
                  <CheckCircle2Icon className="text-green-600 mb-2" size={32} />
                  <span className="text-[10px] font-black text-green-700 uppercase">Bank Slip Uploaded!</span>
                </div>
              ) : (
                <>
                  <UploadIcon className="text-zinc-400 mb-2" size={32}/>
                  <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Upload Payment Slip</span>
                </>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </label>

            <button 
              onClick={handleWhatsApp} 
              disabled={!slipUrl} 
              className={`w-full py-5 rounded-[1.5rem] font-black uppercase text-[12px] tracking-widest transition-all ${slipUrl ? 'bg-zinc-900 text-white shadow-2xl hover:bg-black active:scale-95' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'}`}
            >
              Submit to WhatsApp
            </button>
            <p className="text-center text-[9px] font-bold text-zinc-500 uppercase mt-5 tracking-tight px-4 opacity-70">
              Note: Once you send the data, our experts will review and finalize your CV within 1 hour.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
