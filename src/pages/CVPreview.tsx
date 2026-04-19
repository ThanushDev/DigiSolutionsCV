import React, { useState, useEffect } from 'react';
import { useCV } from '../context/CVContext';
import { CVTemplateBase } from '../components/CVTemplates/CVTemplateBase';
import { templateThemes } from '../types/cv';
import { 
  ChevronLeftIcon, CheckCircle2Icon, Loader2, XIcon, 
  SendIcon, Smartphone, Monitor, Menu, 
  UploadIcon, FileCheck 
} from 'lucide-react';

export function CVPreview({ onBack }: { onBack: () => void }) {
  const { cvData, setSelectedTemplate, updateThemeColor, setShowDS } = useCV();
  const [showPayment, setShowPayment] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [slipUrl, setSlipUrl] = useState('');
  const [previewScale, setPreviewScale] = useState(0.45);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Screen එකට හරියටම Fit වෙන්න Scale එක හදනවා
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setPreviewScale(0.30); // Mobile Extra Small
      } else if (width < 768) {
        setPreviewScale(0.35); // Mobile
      } else if (width < 1024) {
        setPreviewScale(0.40); // Tablet
      } else {
        setPreviewScale(0.48); // Desktop
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!cvData) return null;

  const finalCVData = {
    ...cvData,
    personalInfo: cvData.personalInfo,
    contact: cvData.contact,
    skills: cvData.skills || [],
    languages: cvData.languages || [],
    professionalQualifications: cvData.professionalQualifications || [],
    workExperience: cvData.workExperience || [],
    education: cvData.education,
    references: cvData.references || [],
    profileImage: cvData.personalInfo?.photo || cvData.profileImage,
    showDS: cvData.showDS
  };

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
    } finally { setIsUploading(false); }
  };

  const handleWhatsApp = () => {
    if (!slipUrl) return alert("Please upload the payment slip first!");
    try {
      const messageData = { ...finalCVData, paymentSlip: slipUrl, ds: cvData.showDS ? 1 : 0 };
      const encodedData = btoa(unescape(encodeURIComponent(JSON.stringify(messageData))));
      const message = `*🔥 NEW CV ORDER 🔥*\n\n*Slip:* ${slipUrl}\n\n*Ref Data:*\n${encodedData}`;
      window.open(`https://wa.me/94764781212?text=${encodeURIComponent(message)}`, '_blank');
    } catch (err) { alert("Error generating data!"); }
  };

  return (
    <div className="h-screen bg-zinc-950 flex overflow-hidden relative font-sans select-none">
      
      {/* Sidebar - Mobile Responsive */}
      <div className={`fixed md:relative z-[80] h-full bg-white border-r w-[300px] md:w-[380px] transition-transform duration-300 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-5 border-b flex justify-between items-center">
          <button onClick={onBack} className="flex items-center text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
            <ChevronLeftIcon size={14}/> Editor
          </button>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-zinc-400"><XIcon size={22}/></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-zinc-50/30 scrollbar-hide">
          <button onClick={() => setShowPayment(true)} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase text-[13px] flex items-center justify-center gap-2.5 shadow-xl hover:bg-blue-700 transition-all active:scale-95">
            <SendIcon size={18}/> Get Full CV
          </button>
          
          <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-zinc-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600"><FileCheck size={18} /></div>
                <div><p className="text-[10px] font-black uppercase">Date & Signature</p></div>
              </div>
              <button onClick={() => setShowDS(!cvData.showDS)} className={`w-10 h-5 rounded-full transition-all flex items-center px-1 ${cvData.showDS ? 'bg-blue-600 justify-end' : 'bg-zinc-200 justify-start'}`}><div className="w-3 h-3 bg-white rounded-full" /></button>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase text-zinc-400 text-center tracking-widest">Templates</p>
            <div className="grid grid-cols-1 gap-2">
              {templateThemes.map((t) => (
                <button key={t.id} onClick={() => { setSelectedTemplate(t.id); updateThemeColor(t.primaryColor); }}
                  className={`p-4 rounded-2xl text-left border-2 transition-all flex justify-between items-center ${cvData.selectedTemplate === t.id ? 'border-blue-600 bg-blue-50' : 'bg-white border-transparent'}`}>
                  <span className={`text-[11px] font-black uppercase ${cvData.selectedTemplate === t.id ? 'text-blue-700' : 'text-zinc-600'}`}>{t.name}</span>
                  {cvData.selectedTemplate === t.id && <CheckCircle2Icon size={16} className="text-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pb-10">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-zinc-400 text-center">Color</p>
              <input type="color" value={cvData.customColor} onChange={(e) => updateThemeColor(e.target.value)} className="w-full h-10 rounded-xl cursor-pointer bg-white border p-1" />
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-zinc-400 text-center">Zoom</p>
              <div className="flex bg-white border rounded-xl p-1 h-10">
                <button onClick={() => setPreviewScale(p => p - 0.05)} className="flex-1 flex justify-center items-center text-zinc-400 hover:text-zinc-900 border-r text-lg font-bold">-</button>
                <button onClick={() => setPreviewScale(p => p + 0.05)} className="flex-1 flex justify-center items-center text-zinc-400 hover:text-zinc-900 text-lg font-bold">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 relative flex flex-col h-full bg-zinc-900 overflow-hidden items-center justify-center">
        
        {/* Menu Button - Top Left */}
        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden absolute top-6 left-6 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white z-50 transition-all border border-white/10">
          <Menu size={24}/>
        </button>

        {/* The CV Container - No Scroll */}
        <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden">
          <div className="shadow-2xl origin-center bg-white transition-transform duration-300 pointer-events-none" 
               style={{ transform: `scale(${previewScale})`, flexShrink: 0 }}>
            <CVTemplateBase cvData={finalCVData} />
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowPayment(false)} className="absolute top-6 right-6 p-2 bg-zinc-100 rounded-full hover:bg-zinc-200"><XIcon size={20}/></button>
            <h3 className="text-2xl font-black uppercase mb-6 text-center tracking-tight">Payment Details</h3>
            
            <div className="bg-zinc-950 text-white rounded-[2rem] p-7 mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 px-6 py-2 rounded-bl-2xl font-black text-xs tracking-widest">RS. 300</div>
              <div className="space-y-4">
                <div><p className="text-[9px] uppercase font-black text-zinc-500">Bank (BOC)</p><p className="text-2xl text-blue-400 font-black tracking-wider">91691764</p></div>
                <div><p className="text-[9px] uppercase font-black text-zinc-500">Name</p><p className="text-sm font-bold uppercase tracking-wide">PTN Pathiranage</p></div>
              </div>
            </div>

            <label className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all ${slipUrl ? 'bg-green-50 border-green-200' : 'bg-zinc-50 border-zinc-200 hover:border-blue-400'}`}>
              {isUploading ? <Loader2 className="animate-spin text-blue-600" /> : slipUrl ? <CheckCircle2Icon size={32} className="text-green-600" /> : <UploadIcon size={24} className="text-zinc-300" />}
              <span className="text-[10px] font-black uppercase mt-3 text-zinc-400">{slipUrl ? 'Uploaded' : 'Upload Payment Slip'}</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleSlipUpload} />
            </label>

            <button onClick={handleWhatsApp} disabled={!slipUrl || isUploading} className={`w-full py-5 rounded-2xl font-black uppercase text-[12px] mt-6 transition-all active:scale-95 ${slipUrl ? 'bg-blue-600 text-white shadow-lg' : 'bg-zinc-100 text-zinc-400'}`}>Confirm Order</button>
          </div>
        </div>
      )}
    </div>
  );
}
