import React, { useState } from 'react';
import { useCV } from '../context/CVContext'; // Path එක fix කරා
import { CVTemplateBase } from '../components/CVTemplates/CVTemplateBase'; // Path එක fix කරා
import { templateThemes } from '../types/cv';
import { 
  ChevronLeftIcon, CheckCircle2Icon, Loader2, XIcon, 
  Paintbrush, SendIcon, Smartphone, Monitor, Menu, 
  Landmark, Copy, UploadIcon 
} from 'lucide-react';

export function CVPreview({ onBack }: { onBack: () => void }) {
  const { cvData, setSelectedTemplate, updateThemeColor } = useCV();
  const [showPayment, setShowPayment] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [slipUrl, setSlipUrl] = useState('');
  const [previewScale, setPreviewScale] = useState(0.45);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!cvData) return null;

  // --- Payment Slip Upload to ImgBB ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    const apiKey = '43b8bf4b90a4c63f2f931edfc646c148';

    try {
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
      alert("Error uploading slip.");
    } finally {
      setIsUploading(false);
    }
  };

  // --- WhatsApp Order Logic (Compressed Reference) ---
  const handleWhatsApp = () => {
    if (!slipUrl) return alert("Please upload the payment slip first!");

    // පරණ කෝඩ් එකේ තිබුණ විදියටම data ටික කෙටි කරලා යවනවා
    const shortData = {
      t: cvData.selectedTemplate,
      cColor: cvData.customColor,
      pi: { 
        n: cvData.personalInfo.name,
        d: cvData.personalInfo.description,
        ni: cvData.personalInfo.nic,
        r: cvData.personalInfo.religion,
        c: cvData.personalInfo.civilStatus,
        g: cvData.personalInfo.gender,
        nt: cvData.personalInfo.nationality,
        ph: cvData.personalInfo.photo, // මෙතන තමයි user ගේ photo එක යන්නේ
      },
      co: cvData.contact,
      sk: cvData.skills,
      la: cvData.languages,
      ex: cvData.workExperience,
      ed: cvData.education,
      pq: cvData.professionalQualifications,
      re: cvData.references
    };

    const encodedRef = btoa(unescape(encodeURIComponent(JSON.stringify(shortData))));
    const adminNumber = "94764781212";
    const message = `*🔥 NEW CV ORDER 🔥*\n\n*Name:* ${cvData.personalInfo.name || 'N/A'}\n*Slip:* ${slipUrl}\n\n*Ref Data:*\n${encodedRef}`;

    window.open(`https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="h-screen bg-zinc-950 flex overflow-hidden relative font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* --- Sidebar: Customization --- */}
      <div className={`fixed md:relative z-[70] h-full bg-white border-r w-[320px] md:w-[380px] transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <button onClick={onBack} className="flex items-center text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">
              <ChevronLeftIcon size={14} className="mr-1"/> Editor
            </button>
            <div className="flex items-center gap-2">
              <Paintbrush size={18} className="text-blue-600"/>
              <h2 className="text-lg font-black uppercase italic tracking-tighter">Customize</h2>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-zinc-400"><XIcon size={24}/></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-zinc-50/30 custom-scrollbar">
          {/* Template Style */}
          <div>
            <p className="text-[10px] font-black uppercase text-zinc-400 mb-3 ml-1 tracking-widest">Select Style</p>
            <div className="space-y-2">
              {templateThemes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setSelectedTemplate(t.id); updateThemeColor(t.primaryColor); }}
                  className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex justify-between items-center ${
                    cvData.selectedTemplate === t.id ? 'border-blue-600 bg-blue-50' : 'border-transparent bg-white shadow-sm hover:border-zinc-200'
                  }`}
                >
                  <span className={`text-[11px] font-black uppercase ${cvData.selectedTemplate === t.id ? 'text-blue-700' : 'text-zinc-600'}`}>{t.name}</span>
                  {cvData.selectedTemplate === t.id && <CheckCircle2Icon size={16} className="text-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Theme & Zoom */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-zinc-400 ml-1">Theme</p>
              <input type="color" value={cvData.customColor} onChange={(e) => updateThemeColor(e.target.value)}
              className="w-full h-11 rounded-xl cursor-pointer bg-white border p-1 shadow-sm" />
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-zinc-400 ml-1">Zoom</p>
              <div className="flex bg-white border rounded-xl p-1 h-11">
                <button onClick={() => setPreviewScale(0.35)} className={`flex-1 flex justify-center items-center rounded-lg ${previewScale <= 0.4 ? 'bg-zinc-900 text-white' : 'text-zinc-400'}`}><Smartphone size={16}/></button>
                <button onClick={() => setPreviewScale(0.55)} className={`flex-1 flex justify-center items-center rounded-lg ${previewScale > 0.4 ? 'bg-zinc-900 text-white' : 'text-zinc-400'}`}><Monitor size={16}/></button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-white">
          <button onClick={() => setShowPayment(true)} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-[12px] flex items-center justify-center gap-2.5 shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
            <SendIcon size={16}/> Get Full CV
          </button>
        </div>
      </div>

      {/* --- Main Preview Area --- */}
      <div className="flex-1 relative flex flex-col h-full bg-zinc-900 overflow-hidden">
        <div className="md:hidden p-4 bg-zinc-900/50 flex justify-between items-center backdrop-blur-md z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="p-3 bg-white/10 rounded-xl text-white backdrop-blur-md border border-white/10"><Menu size={20}/></button>
          <span className="text-white font-black uppercase text-[10px] tracking-[0.3em] opacity-60">Live Preview</span>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-12 flex justify-center items-start custom-scrollbar z-10">
          <div className="transition-all duration-500 shadow-[0_30px_100px_rgba(0,0,0,0.5)] origin-top" style={{ transform: `scale(${previewScale})` }}>
            <CVTemplateBase cvData={cvData} />
          </div>
        </div>
      </div>

      {/* --- Payment Modal (As requested) --- */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in duration-300">
            <button onClick={() => setShowPayment(false)} className="absolute top-6 right-6 p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors"><XIcon size={20}/></button>
            <h3 className="text-2xl font-black uppercase mb-1 italic tracking-tight">Checkout</h3>
            <p className="text-zinc-400 text-[10px] mb-6 font-bold uppercase tracking-widest">Pay & upload your slip to get the CV</p>
            
            <div className="bg-zinc-50 rounded-[2rem] p-6 mb-6 border border-zinc-100">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400 font-bold uppercase text-[9px]">Bank</span>
                  <span className="font-bold">Bank of Ceylon</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 font-bold uppercase text-[9px]">Account</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-600">91691764</span>
                    <Copy size={14} className="text-zinc-300 cursor-pointer active:scale-90" onClick={() => navigator.clipboard.writeText('91691764')}/>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400 font-bold uppercase text-[9px]">Name</span>
                  <span className="font-bold uppercase">PTN Pathiranage</span>
                </div>
                <div className="pt-3 border-t flex justify-between items-center">
                  <span className="font-black uppercase text-[11px]">Amount</span>
                  <span className="font-black text-xl text-blue-600">Rs. 500.00</span>
                </div>
              </div>
            </div>

            <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all ${slipUrl ? 'bg-green-50 border-green-200' : 'bg-zinc-50 border-zinc-200 hover:border-blue-400'}`}>
              {isUploading ? (
                <Loader2 className="animate-spin text-blue-600" />
              ) : slipUrl ? (
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle2Icon size={32} className="text-green-600" />
                  <span className="text-[10px] font-black text-green-700 uppercase">Slip Attached</span>
                </div>
              ) : (
                <div className="text-center">
                  <UploadIcon size={24} className="mx-auto text-zinc-300 mb-2"/>
                  <span className="text-[10px] font-black uppercase text-zinc-400">Upload Payment Slip</span>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </label>

            <button 
              onClick={handleWhatsApp} 
              disabled={!slipUrl || isUploading} 
              className={`w-full py-5 rounded-2xl font-black uppercase text-[12px] mt-6 transition-all ${
                slipUrl ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
              }`}
            >
              Confirm & Send Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
