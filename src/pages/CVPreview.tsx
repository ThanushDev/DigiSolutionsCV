import React, { useState } from 'react';
import { useCV } from '../context/CVContext';
import { CVTemplateBase } from '../components/CVTemplates/CVTemplateBase';
import { templateThemes } from '../types/cv';
import { 
  ChevronLeftIcon, CheckCircle2Icon, Loader2, XIcon, 
  SendIcon, Smartphone, Monitor, Menu, 
  UploadIcon, Image as ImageIcon
} from 'lucide-react';

export function CVPreview({ onBack }: { onBack: () => void }) {
  const { cvData, setSelectedTemplate, updateThemeColor } = useCV();
  const [showPayment, setShowPayment] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [slipUrl, setSlipUrl] = useState('');
  const [previewScale, setPreviewScale] = useState(0.45);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!cvData) return null;

  // --- Payment Slip එක විතරක් ImgBB එකට Upload කරන Logic එක ---
  const handleSlipUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (result.success) setSlipUrl(result.data.url);
    } catch (error) {
      alert("Slip upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  // --- WhatsApp Ref එක (JSON Data) යවන Logic එක ---
  const handleWhatsApp = () => {
    if (!slipUrl) return alert("Please upload the payment slip first!");
    
    // මුළු CV Data එකම JSON කරලා Encode කරනවා
    const encodedData = btoa(unescape(encodeURIComponent(JSON.stringify(cvData))));
    const message = `*🔥 NEW CV ORDER 🔥*\n\n*Name:* ${cvData.personalInfo.name}\n*Slip:* ${slipUrl}\n\n*Ref Data:*\n${encodedData}`;
    
    window.open(`https://wa.me/94764781212?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="h-screen bg-zinc-950 flex overflow-hidden relative font-sans">
      
      {/* Sidebar */}
      <div className={`fixed md:relative z-[70] h-full bg-white border-r w-[320px] md:w-[380px] transition-transform duration-300 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        <div className="p-6 border-b flex justify-between items-center">
          <button onClick={onBack} className="flex items-center text-[10px] font-black text-zinc-400 uppercase tracking-widest"><ChevronLeftIcon size={14}/> Editor</button>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-zinc-400"><XIcon size={24}/></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-zinc-50/30 custom-scrollbar">
          
          {/* Main Download Button */}
          <button onClick={() => setShowPayment(true)} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase text-[13px] flex items-center justify-center gap-2.5 shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
            <SendIcon size={18}/> Get Full CV
          </button>

          <hr className="border-zinc-200" />

          {/* Style Selector */}
          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase text-zinc-400 ml-1 tracking-widest">Selected Style</p>
            <div className="grid grid-cols-1 gap-2">
              {templateThemes.map((t) => (
                <button key={t.id} onClick={() => { setSelectedTemplate(t.id); updateThemeColor(t.primaryColor); }}
                  className={`p-4 rounded-2xl text-left border-2 transition-all flex justify-between items-center ${cvData.selectedTemplate === t.id ? 'border-blue-600 bg-blue-50' : 'bg-white border-transparent shadow-sm'}`}>
                  <span className={`text-[11px] font-black uppercase ${cvData.selectedTemplate === t.id ? 'text-blue-700' : 'text-zinc-600'}`}>{t.name}</span>
                  {cvData.selectedTemplate === t.id && <CheckCircle2Icon size={16} className="text-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Color */}
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase text-zinc-400 ml-1 tracking-widest text-center">Customize Color</p>
            <input type="color" value={cvData.customColor} onChange={(e) => updateThemeColor(e.target.value)} className="w-full h-12 rounded-xl cursor-pointer bg-white border p-1" />
          </div>

          {/* Zoom Controls */}
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase text-zinc-400 text-center tracking-widest">Zoom View</p>
            <div className="flex bg-white border rounded-xl p-1 h-11">
              <button onClick={() => setPreviewScale(0.35)} className={`flex-1 flex justify-center items-center rounded-lg ${previewScale <= 0.4 ? 'bg-zinc-900 text-white' : 'text-zinc-400'}`}><Smartphone size={16}/></button>
              <button onClick={() => setPreviewScale(0.55)} className={`flex-1 flex justify-center items-center rounded-lg ${previewScale > 0.4 ? 'bg-zinc-900 text-white' : 'text-zinc-400'}`}><Monitor size={16}/></button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Preview */}
      <div className="flex-1 relative flex flex-col h-full bg-zinc-900 overflow-hidden">
        <div className="md:hidden p-4 flex justify-between items-center z-30 bg-zinc-900/50 backdrop-blur-md">
          <button onClick={() => setIsSidebarOpen(true)} className="p-3 bg-white/10 rounded-xl text-white border border-white/10"><Menu size={20}/></button>
          <span className="text-white font-black uppercase text-[10px] tracking-widest opacity-60">Live Preview</span>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-12 flex justify-center items-start custom-scrollbar">
          <div className="transition-all duration-500 shadow-2xl origin-top bg-white" style={{ transform: `scale(${previewScale})` }}>
            {/* User Personal Info වලදී දාපු image එක මෙතන auto වැටෙනවා */}
            <CVTemplateBase cvData={cvData} />
          </div>
        </div>
      </div>

      {/* Payment & WhatsApp Ref Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-xl">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in duration-300">
            <button onClick={() => setShowPayment(false)} className="absolute top-6 right-6 p-2 bg-zinc-100 rounded-full"><XIcon size={20}/></button>
            <h3 className="text-2xl font-black uppercase mb-1 italic tracking-tight text-zinc-900">Checkout</h3>
            <p className="text-zinc-400 text-[10px] mb-6 font-bold uppercase tracking-widest">Pay to get the full CV</p>
            
            <div className="bg-zinc-950 text-white rounded-[2rem] p-6 mb-6">
              <div className="space-y-4">
                <div><p className="text-[9px] uppercase font-black text-zinc-500 tracking-[0.2em]">Bank (BOC)</p></div>
                <div><p className="text-2xl text-blue-400 font-bold tracking-wider underline">91691764</p></div>
                <div><p className="text-sm font-bold uppercase tracking-tight text-zinc-300">W. S. SEEHARA</p></div>
                <div className="pt-3 border-t border-white/10 flex justify-between">
                  <span className="text-zinc-500 uppercase text-[9px] font-black">Price</span>
                  <span className="text-lg font-black italic">Rs. 500.00</span>
                </div>
              </div>
            </div>

            <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all ${slipUrl ? 'bg-green-50 border-green-200' : 'bg-zinc-50 border-zinc-200 hover:border-blue-400'}`}>
              {isUploading ? <Loader2 className="animate-spin text-blue-600" /> : slipUrl ? <CheckCircle2Icon size={32} className="text-green-600" /> : <div className="text-center"><UploadIcon size={24} className="mx-auto text-zinc-300 mb-2"/><span className="text-[9px] font-black uppercase text-zinc-400">Upload Bank Slip</span></div>}
              <input type="file" className="hidden" accept="image/*" onChange={handleSlipUpload} />
            </label>

            <button onClick={handleWhatsApp} disabled={!slipUrl || isUploading} className={`w-full py-5 rounded-2xl font-black uppercase text-[12px] mt-6 transition-all shadow-xl ${slipUrl ? 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700 active:scale-95' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'}`}>
              Confirm Order (WhatsApp)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
