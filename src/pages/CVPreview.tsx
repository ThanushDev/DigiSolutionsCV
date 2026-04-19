import React, { useState } from 'react';
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

  if (!cvData) return null;

  // මෙතන තමයි ඩේටා ටික අනිවාර්යයෙන්ම template එකට යවන්න ඕන විදියට හදලා තියෙන්නේ
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
      const messageData = {
        ...finalCVData,
        paymentSlip: slipUrl,
        ds: cvData.showDS ? 1 : 0
      };

      const encodedData = btoa(unescape(encodeURIComponent(JSON.stringify(messageData))));
      const message = `*🔥 NEW CV ORDER 🔥*\n\n*Slip:* ${slipUrl}\n\n*Ref Data:*\n${encodedData}`;
      window.open(`https://wa.me/94764781212?text=${encodeURIComponent(message)}`, '_blank');
    } catch (err) {
      alert("Error generating data!");
    }
  };

  return (
    <div className="h-screen bg-zinc-950 flex overflow-hidden relative font-sans">
      <div className={`fixed md:relative z-[70] h-full bg-white border-r w-[320px] md:w-[380px] transition-transform duration-300 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b flex justify-between items-center">
          <button onClick={onBack} className="flex items-center text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-blue-600">
            <ChevronLeftIcon size={14}/> Editor
          </button>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-zinc-400"><XIcon size={24}/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-zinc-50/30">
          <button onClick={() => setShowPayment(true)} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase text-[13px] flex items-center justify-center gap-2.5 shadow-xl hover:bg-blue-700 transition-all">
            <SendIcon size={18}/> Get Full CV
          </button>
          <hr className="border-zinc-200" />
          
          <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-zinc-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600"><FileCheck size={18} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase">Date & Signature</p>
                  <p className="text-[8px] text-zinc-400 font-bold italic">Bottom placeholders</p>
                </div>
              </div>
              <button 
                onClick={() => setShowDS(!cvData.showDS)} 
                className={`w-12 h-6 rounded-full transition-all flex items-center px-1 ${cvData.showDS ? 'bg-blue-600 justify-end' : 'bg-zinc-200 justify-start'}`}
              >
                <div className="w-4 h-4 bg-white rounded-full shadow-md" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase text-zinc-400 text-center">Templates</p>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-zinc-400 text-center">Color</p>
              <input type="color" value={cvData.customColor} onChange={(e) => updateThemeColor(e.target.value)} className="w-full h-11 rounded-xl cursor-pointer bg-white border p-1" />
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-zinc-400 text-center">Zoom</p>
              <div className="flex bg-white border rounded-xl p-1 h-11">
                <button onClick={() => setPreviewScale(0.35)} className={`flex-1 flex justify-center items-center rounded-lg ${previewScale <= 0.4 ? 'bg-zinc-900 text-white' : 'text-zinc-400'}`}><Smartphone size={16}/></button>
                <button onClick={() => setPreviewScale(0.55)} className={`flex-1 flex justify-center items-center rounded-lg ${previewScale > 0.4 ? 'bg-zinc-900 text-white' : 'text-zinc-400'}`}><Monitor size={16}/></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 relative flex flex-col h-full bg-zinc-900 overflow-hidden">
        <div className="flex-1 overflow-auto p-4 md:p-12 flex justify-center items-start">
          <div className="shadow-2xl origin-top bg-white" style={{ transform: `scale(${previewScale})` }}>
            <CVTemplateBase cvData={finalCVData} />
          </div>
        </div>
        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden absolute bottom-6 right-6 p-4 bg-white rounded-full shadow-2xl text-zinc-900 z-50"><Menu size={24}/></button>
      </div>

      {showPayment && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-xl">
          <div className="bg-white rounded-[3rem] p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setShowPayment(false)} className="absolute top-6 right-6 p-2 bg-zinc-100 rounded-full"><XIcon size={20}/></button>
            <h3 className="text-2xl font-black uppercase mb-1 text-center">Payment Info</h3>
            <div className="bg-zinc-950 text-white rounded-[2.5rem] p-7 mb-6 relative overflow-hidden mt-4">
              <div className="absolute top-0 right-0 bg-blue-600 px-6 py-2 rounded-bl-[1.5rem] font-black text-sm">RS. 500</div>
              <div className="space-y-5">
                <div><p className="text-[9px] uppercase font-black text-zinc-500">Account Number (BOC)</p><p className="text-3xl text-blue-400 font-black">91691764</p></div>
                <div><p className="text-[9px] uppercase font-black text-zinc-500">Account Holder</p><p className="text-sm font-bold uppercase">PTN Pathiranage</p></div>
              </div>
            </div>
            <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-[2.5rem] cursor-pointer ${slipUrl ? 'bg-green-50 border-green-200' : 'bg-zinc-50'}`}>
              {isUploading ? <Loader2 className="animate-spin text-blue-600" /> : slipUrl ? <CheckCircle2Icon size={32} className="text-green-600" /> : <UploadIcon size={24} className="text-zinc-300" />}
              <input type="file" className="hidden" accept="image/*" onChange={handleSlipUpload} />
            </label>
            <button onClick={handleWhatsApp} disabled={!slipUrl || isUploading} className={`w-full py-5 rounded-[1.5rem] font-black uppercase text-[12px] mt-6 transition-all ${slipUrl ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-400'}`}>Confirm Order via WhatsApp</button>
          </div>
        </div>
      )}
    </div>
  );
}
