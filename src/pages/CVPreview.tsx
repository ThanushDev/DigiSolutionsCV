import React, { useState } from 'react';
import { useCV } from '../context/CVContext';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { templateThemes } from '../types/cv';
import { ChevronLeftIcon, CheckCircle2Icon, UploadIcon, Loader2, Landmark, Copy, SendIcon, XIcon, Paintbrush, Sliders } from 'lucide-react';

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

  // WhatsApp Logic with Ref Data
  const handleWhatsApp = () => {
    const data = btoa(unescape(encodeURIComponent(JSON.stringify(cvData))));
    const msg = `Hi, I have completed my CV.\n\nSlip: ${slipUrl}\n\nRef: ${data}`;
    window.open(`https://wa.me/94764781212?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col md:flex-row overflow-hidden">
      {/* Side Control Panel */}
      <div className="w-full md:w-80 bg-white border-r p-6 flex flex-col z-20 overflow-y-auto">
        <button onClick={onBack} className="flex items-center text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-8">
          <ChevronLeftIcon size={14} className="mr-1"/> Back to Edit
        </button>

        <div className="flex items-center gap-2 mb-6 text-blue-600">
          <Paintbrush size={18}/><h2 className="text-xl font-black uppercase tracking-tighter text-zinc-800">CV Style</h2>
        </div>

        <div className="space-y-3 mb-8">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Select Template</label>
          {templateThemes.map(t => (
            <button 
              key={t.id} 
              onClick={() => { setSelectedTemplate(t.id); updateThemeColor(t.primaryColor); }}
              className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex justify-between items-center ${cvData.selectedTemplate === t.id ? 'border-blue-600 bg-blue-50' : 'border-zinc-100 hover:border-zinc-200'}`}
            >
              <span className={`text-[10px] font-black uppercase ${cvData.selectedTemplate === t.id ? 'text-blue-700' : 'text-zinc-600'}`}>{t.name}</span>
              {cvData.selectedTemplate === t.id && <CheckCircle2Icon size={14} className="text-blue-600" />}
            </button>
          ))}
        </div>

        <div className="space-y-6 mb-10">
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-700">Custom Color</span>
            <input type="color" value={cvData.customColor} onChange={(e) => updateThemeColor(e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none" />
          </div>
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
            <div className="flex justify-between mb-3 font-bold text-xs"><span>Brightness</span><span>{cvData.brightness}%</span></div>
            <input type="range" min="50" max="150" value={cvData.brightness} onChange={(e) => setBrightness(parseInt(e.target.value))} className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
          </div>
        </div>

        <button onClick={() => setShowPayment(true)} className="mt-auto w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-[11px] flex items-center justify-center gap-2 shadow-lg shadow-blue-100">
          <SendIcon size={14}/> Get CV Now
        </button>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-zinc-200/50 overflow-auto p-4 md:p-10 flex justify-center items-start">
        <div className="transition-all duration-500 shadow-2xl origin-top" style={{ transform: `scale(${window.innerWidth < 640 ? 0.4 : 0.85})` }}>
           <TemplateRenderer cvData={cvData} />
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-zinc-900/60 z-50 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setShowPayment(false)} className="absolute top-6 right-6 p-2 bg-zinc-100 rounded-full"><XIcon size={20}/></button>
            <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Payment Details</h3>
            <div className="bg-zinc-50 rounded-[1.5rem] p-5 border border-zinc-100 mb-6 space-y-3 text-sm">
              <div className="flex justify-between"><span>Bank</span><span className="font-bold text-zinc-800">Bank of Ceylon</span></div>
              <div className="flex justify-between"><span>Account</span><span className="font-bold text-zinc-800 tracking-wider">91691764</span></div>
              <div className="flex justify-between border-t pt-3 font-black"><span>Amount</span><span className="text-blue-600 text-lg">Rs.500/=</span></div>
            </div>
            <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-[1.5rem] cursor-pointer mb-6 transition-all ${slipUrl ? 'bg-green-50 border-green-200' : 'bg-zinc-50 border-zinc-200'}`}>
              {isUploading ? <Loader2 className="animate-spin text-blue-600" /> : slipUrl ? <CheckCircle2Icon className="text-green-600" /> : <><UploadIcon className="text-zinc-400 mb-2"/><span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Upload Slip</span></>}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </label>
            <button onClick={handleWhatsApp} disabled={!slipUrl} className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest ${slipUrl ? 'bg-zinc-900 text-white shadow-xl' : 'bg-zinc-100 text-zinc-400'}`}>Confirm WhatsApp</button>
          </div>
        </div>
      )}
    </div>
  );
}
