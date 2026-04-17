import React, { useState } from 'react';
import { useCV } from '../context/CVContext';
import { CVTemplateBase } from '../components/CVTemplates/CVTemplateBase';
import { templateThemes } from '../types/cv';
import { 
  ChevronLeftIcon, CheckCircle2Icon, Loader2, XIcon, 
  Paintbrush, SendIcon, Smartphone, Monitor, Menu, Camera
} from 'lucide-react';

const IMGBB_API_KEY = '43b8bf4b90a4c63f2f931edfc646c148';

export function CVPreview({ onBack }: { onBack: () => void }) {
  const { cvData, setSelectedTemplate, updateThemeColor, updatePersonalInfo } = useCV();
  const [showPayment, setShowPayment] = useState(false);
  
  const [isProfileUploading, setIsProfileUploading] = useState(false);
  const [isSlipUploading, setIsSlipUploading] = useState(false);
  const [slipUrl, setSlipUrl] = useState('');
  const [previewScale, setPreviewScale] = useState(0.45);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- Profile Image එක Preview එකේදීම Update කිරීම ---
  const handleProfileUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProfileUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        // මෙතනදී කෙලින්ම යූසර් දෙන image එක context එකට දානවා. 
        // Background remove කරන එක editor එකේදී යූසර් තීරණය කරලා ඉවරයි.
        updatePersonalInfo({ profileImage: result.data.url });
      }
    } catch (error) {
      alert("Error updating photo.");
    } finally {
      setIsProfileUploading(false);
    }
  };

  const handleSlipFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsSlipUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.success) setSlipUrl(result.data.url);
    } finally {
      setIsSlipUploading(false);
    }
  };

  const handleWhatsApp = () => {
    const cvJson = JSON.stringify(cvData);
    const encodedData = btoa(unescape(encodeURIComponent(cvJson)));
    // යූසර්ගේ අවසාන තීරණය (cvData.personalInfo.profileImage) මෙතනින් whatsapp යනවා
    const message = `*NEW CV ORDER*\n\n*Name:* ${cvData.personalInfo.fullName}\n*Template:* ${cvData.selectedTemplate}\n*Profile Photo:* ${cvData.personalInfo.profileImage || 'Not Provided'}\n*Payment Slip:* ${slipUrl}\n\n*Data Block:*\n${encodedData}`;
    window.open(`https://wa.me/94764781212?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="h-screen bg-zinc-950 flex overflow-hidden relative">
      
      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />}

      <div className={`fixed md:relative z-[70] h-full bg-white border-r w-[320px] md:w-[380px] transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex flex-col">
            <button onClick={onBack} className="flex items-center text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">
              <ChevronLeftIcon size={14} className="mr-1"/> Editor
            </button>
            <div className="flex items-center gap-2 text-zinc-900">
              <Paintbrush size={18} className="text-blue-600"/>
              <h2 className="text-lg font-black uppercase italic">Finalize CV</h2>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-zinc-400"><XIcon size={24}/></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-zinc-50/30">
          
          {/* Quick Profile Image Preview & Change */}
          <div className="p-4 bg-white rounded-3xl border border-zinc-100 shadow-sm flex items-center gap-4">
            <div className="relative group">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-zinc-100 border-2 border-white shadow-md">
                {isProfileUploading ? (
                  <div className="w-full h-full flex items-center justify-center bg-white/80"><Loader2 className="animate-spin text-blue-600" size={20}/></div>
                ) : (
                  <img src={cvData.personalInfo.profileImage || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" />
                )}
              </div>
              <label className="absolute -bottom-1 -right-1 p-1.5 bg-blue-600 text-white rounded-lg cursor-pointer shadow-lg hover:bg-blue-700 transition-all">
                <Camera size={12}/>
                <input type="file" className="hidden" accept="image/*" onChange={handleProfileUpdate} />
              </label>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-zinc-800">Profile Photo</h4>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">Tap icon to change</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase text-zinc-400 ml-1">Templates</p>
            <div className="space-y-2">
              {templateThemes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setSelectedTemplate(t.id); updateThemeColor(t.primaryColor); }}
                  className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex justify-between items-center ${
                    cvData.selectedTemplate === t.id ? 'border-blue-600 bg-blue-50' : 'border-transparent bg-white shadow-sm'
                  }`}
                >
                  <span className={`text-[11px] font-black uppercase ${cvData.selectedTemplate === t.id ? 'text-blue-700' : 'text-zinc-600'}`}>{t.name}</span>
                  {cvData.selectedTemplate === t.id && <CheckCircle2Icon size={16} className="text-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-black uppercase text-zinc-400 mb-2 ml-1">Theme</p>
              <input type="color" value={cvData.customColor} onChange={(e) => updateThemeColor(e.target.value)} className="w-full h-11 rounded-xl cursor-pointer bg-white border p-1" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-zinc-400 mb-2 ml-1">Zoom</p>
              <div className="flex bg-white border rounded-xl p-1 h-11">
                <button onClick={() => setPreviewScale(0.35)} className={`flex-1 flex justify-center items-center rounded-lg ${previewScale <= 0.4 ? 'bg-zinc-900 text-white' : 'text-zinc-400'}`}><Smartphone size={16}/></button>
                <button onClick={() => setPreviewScale(0.55)} className={`flex-1 flex justify-center items-center rounded-lg ${previewScale > 0.4 ? 'bg-zinc-900 text-white' : 'text-zinc-400'}`}><Monitor size={16}/></button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-white">
          <button onClick={() => setShowPayment(true)} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-[12px] flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            <SendIcon size={16}/> Finalize Order
          </button>
        </div>
      </div>

      <div className="flex-1 relative flex flex-col h-full overflow-hidden bg-zinc-900">
        <div className="md:hidden p-4 bg-zinc-900/50 flex justify-between items-center backdrop-blur-md">
          <button onClick={() => setIsSidebarOpen(true)} className="p-3 bg-white/10 rounded-xl text-white backdrop-blur-md border border-white/10"><Menu size={20}/></button>
          <span className="text-white font-black uppercase text-[10px] tracking-widest opacity-60">Live Preview</span>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-12 flex justify-center items-start custom-scrollbar">
          <div className="transition-all duration-500 shadow-2xl origin-top scale-[0.85] md:scale-100">
            <CVTemplateBase cvData={cvData} scale={previewScale} />
          </div>
        </div>
      </div>

      {showPayment && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setShowPayment(false)} className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full"><XIcon size={20}/></button>
            <h3 className="text-2xl font-black uppercase mb-6 italic">Payment</h3>
            
            <div className="bg-zinc-950 text-white rounded-[2rem] p-6 mb-6">
              <div className="space-y-4 text-sm">
                <div><p className="text-[9px] uppercase font-black opacity-40">Bank</p><p>Bank of Ceylon (BOC)</p></div>
                <div><p className="text-[9px] uppercase font-black opacity-40">Acc No</p><p className="text-xl text-blue-400 font-bold">91691764</p></div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-end"><span className="opacity-40 uppercase text-[10px] font-black">Total</span><span className="text-2xl font-black">Rs. 500.00</span></div>
              </div>
            </div>

            <label className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-3xl cursor-pointer transition-all ${slipUrl ? 'bg-green-50 border-green-200' : 'bg-zinc-50 border-zinc-200'}`}>
              {isSlipUploading ? <Loader2 className="animate-spin text-blue-600" /> : slipUrl ? <CheckCircle2Icon size={32} className="text-green-600" /> : <div className="text-center"><SendIcon size={20} className="mx-auto text-zinc-300 mb-2 rotate-[-45deg]"/><span className="text-[10px] font-black uppercase text-zinc-400">Upload Slip</span></div>}
              <input type="file" className="hidden" accept="image/*" onChange={handleSlipFileUpload} />
            </label>

            <button onClick={handleWhatsApp} disabled={!slipUrl} className={`w-full py-5 rounded-2xl font-black uppercase text-[12px] mt-6 transition-all ${slipUrl ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'}`}>Order via WhatsApp</button>
          </div>
        </div>
      )}
    </div>
  );
}
