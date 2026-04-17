import React, { useState } from 'react';
import { useCV } from '../context/CVContext';
import { CVTemplateBase } from '../components/CVTemplates/CVTemplateBase';
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
      const response = await fetch(`https://api.imgbb.com/1/upload?key=43b8bf4b90a4c63f2f931edfc646c148`, { method: 'POST', body: formData });
      const result = await response.json();
      if (result.success) setSlipUrl(result.data.url);
    } catch { alert("Upload failed."); } finally { setIsUploading(false); }
  };

  const handleWhatsApp = () => {
    const data = btoa(unescape(encodeURIComponent(JSON.stringify(cvData))));
    const msg = `Hi, I've completed my CV.\n\nSlip: ${slipUrl}\n\nData: ${data}`;
    window.open(`https://wa.me/94764781212?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="h-screen bg-zinc-200 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar - Fixed Size 300px */}
      <div className="w-full md:w-[300px] bg-white border-r flex flex-col z-20 shadow-2xl h-full flex-shrink-0">
        <div className="p-6 border-b">
          <button onClick={onBack} className="flex items-center text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4 hover:text-blue-600">
            <ChevronLeftIcon size={14} className="mr-1"/> Back to Edit
          </button>
          <div className="flex items-center gap-2"><Paintbrush size={18} className="text-blue-600"/><h2 className="text-xl font-black uppercase">Styles</h2></div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-zinc-50/50">
          {templateThemes.map(t => (
            <button key={t.id} onClick={() => { setSelectedTemplate(t.id); updateThemeColor(t.primaryColor); }}
              className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex justify-between items-center ${cvData.selectedTemplate === t.id ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-white bg-white hover:border-zinc-100'}`}>
              <span className={`text-[11px] font-black uppercase ${cvData.selectedTemplate === t.id ? 'text-blue-700' : 'text-zinc-600'}`}>{t.name}</span>
              {cvData.selectedTemplate === t.id && <CheckCircle2Icon size={18} className="text-blue-600" />}
            </button>
          ))}
        </div>
        <div className="p-6 bg-white border-t space-y-4">
          <input type="color" value={cvData.customColor} onChange={(e) => updateThemeColor(e.target.value)} className="w-full h-10 rounded-xl cursor-pointer bg-white border p-1" />
          <button onClick={() => setShowPayment(true)} className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-black uppercase text-[11px] flex items-center justify-center gap-2 shadow-xl"><SendIcon size={14}/> Finalize</button>
        </div>
      </div>

      {/* Responsive Preview Area */}
      <div className="flex-1 overflow-auto p-4 md:p-10 flex justify-center items-start">
        <div className="transition-all duration-500 shadow-2xl origin-top mb-20" style={{ transform: `scale(${window.innerWidth < 768 ? 0.35 : 0.85})` }}>
           <CVTemplateBase cvData={cvData} />
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setShowPayment(false)} className="absolute top-6 right-6 p-2"><XIcon size={20}/></button>
            <h3 className="text-2xl font-black uppercase mb-6 italic">Payment</h3>
            <div className="bg-blue-50 rounded-2xl p-6 border mb-6 text-sm">
              <p>Bank: <b>Bank of Ceylon</b></p>
              <p>Account: <b>91691764</b></p>
              <p className="mt-2 text-blue-700 font-bold">Price: Rs. 500.00</p>
            </div>
            <label className={`flex flex-col items-center justify-center w-full h-32 border-4 border-dashed rounded-2xl cursor-pointer mb-6 ${slipUrl ? 'bg-green-50 border-green-200' : 'bg-zinc-50'}`}>
              {isUploading ? <Loader2 className="animate-spin" /> : slipUrl ? <CheckCircle2Icon className="text-green-600" /> : <span className="text-[10px] font-black uppercase opacity-40">Upload Slip</span>}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </label>
            <button onClick={handleWhatsApp} disabled={!slipUrl} className={`w-full py-5 rounded-2xl font-black uppercase text-[12px] ${slipUrl ? 'bg-blue-600 text-white shadow-xl' : 'bg-zinc-100 text-zinc-400'}`}>Send to WhatsApp</button>
          </div>
        </div>
      )}
    </div>
  );
}
