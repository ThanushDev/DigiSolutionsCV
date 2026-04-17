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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=43b8bf4b90a4c63f2f931edfc646c148`, { 
        method: 'POST', body: formData 
      });
      const result = await response.json();
      if (result.success) setSlipUrl(result.data.url);
    } catch { 
      alert("Upload failed."); 
    } finally { 
      setIsUploading(false); 
    }
  };

  const handleWhatsApp = () => {
    const data = btoa(unescape(encodeURIComponent(JSON.stringify(cvData))));
    const msg = `Hi, I have completed my CV.\n\nPayment Slip: ${slipUrl}\n\nReference Data: ${data}`;
    window.open(`https://wa.me/94764781212?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="h-screen bg-zinc-200 flex flex-col md:flex-row overflow-hidden">
      
      {/* --- FIXED SIDEBAR SIZE (Standard 320px) --- */}
      <div className="w-full md:w-80 bg-white border-r flex flex-col z-20 shadow-xl h-full flex-shrink-0">
        
        <div className="p-5 border-b">
          <button onClick={onBack} className="flex items-center text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3 hover:text-blue-600 transition-colors">
            <ChevronLeftIcon size={14} className="mr-1"/> Edit
          </button>
          <div className="flex items-center gap-2">
            <Paintbrush size={18} className="text-blue-600"/>
            <h2 className="text-lg font-black uppercase tracking-tighter">Styles</h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-zinc-50/50 custom-scrollbar">
          {templateThemes.map(t => (
            <button 
              key={t.id} 
              onClick={() => { setSelectedTemplate(t.id); if(t.primaryColor) updateThemeColor(t.primaryColor); }}
              className={`w-full p-3 rounded-xl text-left border-2 transition-all flex justify-between items-center ${
                cvData.selectedTemplate === t.id ? 'border-blue-600 bg-blue-50 shadow-sm' : 'border-white bg-white hover:border-zinc-200'
              }`}
            >
              <div className="flex flex-col">
                <span className={`text-[10px] font-black uppercase ${cvData.selectedTemplate === t.id ? 'text-blue-700' : 'text-zinc-600'}`}>
                  {t.name}
                </span>
                <span className="text-[8px] opacity-40 font-bold uppercase">Style 0{t.id}</span>
              </div>
              {cvData.selectedTemplate === t.id && <CheckCircle2Icon size={16} className="text-blue-600" />}
            </button>
          ))}
        </div>

        <div className="p-5 bg-white border-t space-y-3">
          <div className="flex items-center justify-between p-2 bg-zinc-50 rounded-xl border text-[10px] font-black uppercase">
            <span className="text-zinc-500">Color</span>
            <input type="color" value={cvData.customColor} onChange={(e) => updateThemeColor(e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer" />
          </div>
          
          <button 
            onClick={() => setShowPayment(true)} 
            className="w-full py-4 bg-zinc-900 hover:bg-black text-white rounded-xl font-black uppercase text-[10px] flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
          >
            <SendIcon size={14}/> Finalize
          </button>
        </div>
      </div>

      {/* --- IMPROVED PREVIEW AREA (Centered & Responsive) --- */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center items-start custom-scrollbar">
        <div 
          className="transition-all duration-500 shadow-2xl bg-white origin-top" 
          style={{ 
            transform: `scale(${window.innerWidth < 768 ? 0.4 : 0.85})`,
            marginBottom: '100px'
          }}
        >
           <TemplateRenderer cvData={cvData} />
        </div>
      </div>

      {/* --- PAYMENT MODAL --- */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-md p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in duration-200">
            <button onClick={() => setShowPayment(false)} className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full"><XIcon size={20}/></button>
            <h3 className="text-xl font-black uppercase tracking-tighter mb-6 italic">Secure Payment</h3>
            
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 mb-6 space-y-2 text-xs">
              <div className="flex justify-between font-black uppercase opacity-60"><span>Bank</span><span className="text-zinc-900">Bank of Ceylon</span></div>
              <div className="flex justify-between font-black uppercase opacity-60"><span>Account</span><span className="text-zinc-900 font-bold">91691764</span></div>
              <div className="flex justify-between border-t border-blue-200 pt-2 font-black uppercase italic text-lg text-blue-700"><span>Price</span><span>Rs. 500.00</span></div>
            </div>

            <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer mb-6 transition-all ${slipUrl ? 'bg-green-50 border-green-200' : 'bg-zinc-50 border-zinc-200'}`}>
              {isUploading ? <Loader2 className="animate-spin text-blue-600" /> : slipUrl ? (
                <CheckCircle2Icon className="text-green-600" size={32} />
              ) : (
                <div className="flex flex-col items-center text-zinc-400">
                  <UploadIcon size={24} className="mb-1"/>
                  <span className="text-[10px] font-black uppercase">Upload Slip</span>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </label>

            <button 
              onClick={handleWhatsApp} 
              disabled={!slipUrl} 
              className={`w-full py-4 rounded-xl font-black uppercase text-[11px] transition-all ${slipUrl ? 'bg-blue-600 text-white shadow-xl hover:bg-blue-700' : 'bg-zinc-100 text-zinc-400'}`}
            >
              Send to WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
