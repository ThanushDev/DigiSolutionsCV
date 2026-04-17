import React, { useState } from 'react';
import { useCV } from '../context/CVContext';
import { CVTemplateBase } from '../components/CVTemplates/CVTemplateBase';
import { templateThemes } from '../types/cv';
import { 
  ChevronLeftIcon, CheckCircle2Icon, Loader2, XIcon, 
  Paintbrush, SendIcon, Smartphone, Monitor, Menu, UserCircle, Sparkles 
} from 'lucide-react';

const IMGBB_API_KEY = '43b8bf4b90a4c63f2f931edfc646c148';
const REMOVE_BG_API_KEY = 'YOUR_REMOVE_BG_API_KEY'; // <--- මේක අනිවාර්යයෙන් දාන්න

export function CVPreview({ onBack }: { onBack: () => void }) {
  const { cvData, setSelectedTemplate, updateThemeColor, updatePersonalInfo } = useCV();
  const [showPayment, setShowPayment] = useState(false);
  
  // States
  const [isProfileUploading, setIsProfileUploading] = useState(false);
  const [isRemoveBgEnabled, setIsRemoveBgEnabled] = useState(true); // AI Bg Removal Toggle
  const [isSlipUploading, setIsSlipUploading] = useState(false);
  const [slipUrl, setSlipUrl] = useState('');
  const [previewScale, setPreviewScale] = useState(0.45);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ============================================================
  // Profile Image Logic (With or Without BG Removal)
  // ============================================================
  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProfileUploading(true);

    try {
      // Step 1: Upload to ImgBB first (Common for both ways)
      const formData1 = new FormData();
      formData1.append('image', file);
      const imgbbRes1 = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData1,
      });
      const imgbbData1 = await imgbbRes1.json();
      if (!imgbbData1.success) throw new Error("ImgBB upload failed");
      
      let finalUrl = imgbbData1.data.url;

      // Step 2: If AI Bg Removal is checked, process it
      if (isRemoveBgEnabled && REMOVE_BG_API_KEY) {
        const formData2 = new FormData();
        formData2.append('image_url', finalUrl);
        formData2.append('size', 'auto');

        const removeBgRes = await fetch('https://api.remove.bg/v1.0/removebg', {
          method: 'POST',
          headers: { 'X-Api-Key': REMOVE_BG_API_KEY },
          body: formData2,
        });

        if (removeBgRes.ok) {
          const imageBlob = await removeBgRes.blob();
          const formData3 = new FormData();
          formData3.append('image', imageBlob, 'profile_no_bg.png');
          
          const imgbbRes2 = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: formData3,
          });
          const imgbbData2 = await imgbbRes2.json();
          if (imgbbData2.success) finalUrl = imgbbData2.data.url;
        }
      }

      // Step 3: Update Context with final URL (Normal or Removed BG)
      updatePersonalInfo({ profileImage: finalUrl });

    } catch (error) {
      alert("Error processing image. Please try again.");
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
    // slipUrl එක සහ Profile Image එක දෙකම message එකට යනවා
    const message = `*NEW CV ORDER*\n\n*Name:* ${cvData.personalInfo.fullName}\n*Template:* ${cvData.selectedTemplate}\n*Profile Image:* ${cvData.personalInfo.profileImage || 'No Image'}\n*Payment Slip:* ${slipUrl}\n\n*Data Block:*\n${encodedData}`;
    window.open(`https://wa.me/94764781212?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="h-screen bg-zinc-950 flex overflow-hidden relative font-sans">
      
      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />}

      <div className={`fixed md:relative z-[70] h-full bg-white border-r w-[320px] md:w-[380px] transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        <div className="p-6 border-b flex justify-between items-center shrunk-0">
          <div className="flex flex-col">
            <button onClick={onBack} className="flex items-center text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 hover:text-blue-600">
              <ChevronLeftIcon size={14} className="mr-1"/> Editor
            </button>
            <div className="flex items-center gap-2 text-zinc-900">
              <Paintbrush size={18} className="text-blue-600"/>
              <h2 className="text-lg font-black uppercase italic tracking-tighter">Customize</h2>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-zinc-400 hover:text-red-500 rounded-full transition-colors"><XIcon size={24}/></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-zinc-50/30 custom-scrollbar">
          
          {/* Profile Photo Control */}
          <div className="p-5 bg-white rounded-[2rem] border border-zinc-100 shadow-sm space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                {isProfileUploading ? (
                  <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={20} /></div>
                ) : cvData.personalInfo.profileImage ? (
                  <img src={cvData.personalInfo.profileImage} className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-100" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400"><UserCircle size={30} strokeWidth={1}/></div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[13px] text-zinc-800">Profile Photo</h4>
                <p className="text-[10px] text-zinc-400 leading-tight">High quality PNG or JPG</p>
              </div>
            </div>

            {/* Remove Background Toggle */}
            <label className="flex items-center justify-between p-3 bg-zinc-50 rounded-2xl cursor-pointer group hover:bg-zinc-100 transition-colors">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${isRemoveBgEnabled ? 'bg-blue-600 text-white' : 'bg-zinc-200 text-zinc-500'}`}>
                  <Sparkles size={12} />
                </div>
                <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-wide">AI Background Removal</span>
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={isRemoveBgEnabled} onChange={() => setIsRemoveBgEnabled(!isRemoveBgEnabled)} />
                <div className="w-9 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
            </label>

            <label className={`w-full py-3.5 rounded-2xl transition-all text-center flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-wider cursor-pointer shadow-sm ${
              isProfileUploading ? 'bg-zinc-100 text-zinc-400' : 'bg-zinc-900 text-white hover:bg-black active:scale-95'
            }`}>
              {isProfileUploading ? "Processing..." : "Upload Profile Photo"}
              <input type="file" className="hidden" accept="image/*" onChange={handleProfileImageUpload} disabled={isProfileUploading} />
            </label>
          </div>

          {/* Template Selection */}
          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase text-zinc-400 ml-1 tracking-widest">Select Template</p>
            <div className="space-y-2">
              {templateThemes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setSelectedTemplate(t.id); updateThemeColor(t.primaryColor); }}
                  className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex justify-between items-center ${
                    cvData.selectedTemplate === t.id ? 'border-blue-600 bg-blue-50/50' : 'border-transparent bg-white shadow-sm hover:border-zinc-100'
                  }`}
                >
                  <span className={`text-[11px] font-black uppercase ${cvData.selectedTemplate === t.id ? 'text-blue-700' : 'text-zinc-600'}`}>{t.name}</span>
                  {cvData.selectedTemplate === t.id && <CheckCircle2Icon size={16} className="text-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase text-zinc-400 ml-1">Theme</p>
              <input type="color" value={cvData.customColor} onChange={(e) => updateThemeColor(e.target.value)} className="w-full h-11 rounded-xl cursor-pointer bg-white border p-1" />
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
            <SendIcon size={16}/> Finalize & Pay
          </button>
        </div>
      </div>

      {/* Main Preview */}
      <div className="flex-1 relative flex flex-col h-full bg-zinc-900 overflow-hidden">
        <div className="md:hidden p-4 bg-zinc-900/50 flex justify-between items-center backdrop-blur-md z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="p-3 bg-white/10 rounded-xl text-white backdrop-blur-md border border-white/10"><Menu size={20}/></button>
          <span className="text-white font-black uppercase text-[10px] tracking-widest opacity-60">Live Preview</span>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-12 flex justify-center items-start custom-scrollbar">
          <div className="transition-all duration-700 ease-out transform scale-[0.85] md:scale-100 origin-top shadow-2xl">
            <CVTemplateBase cvData={cvData} scale={previewScale} />
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-xl">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in duration-300">
            <button onClick={() => setShowPayment(false)} className="absolute top-6 right-6 p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors"><XIcon size={20}/></button>
            <h3 className="text-2xl font-black uppercase mb-1 italic">Order Summary</h3>
            <p className="text-zinc-400 text-[10px] mb-6 font-bold uppercase tracking-widest">Complete payment to finalize</p>
            
            <div className="bg-zinc-950 text-white rounded-[2rem] p-6 mb-6">
              <div className="space-y-4 text-sm">
                <div><p className="text-[9px] uppercase font-black text-zinc-500">Bank</p><p className="font-medium text-base">Bank of Ceylon (BOC)</p></div>
                <div><p className="text-[9px] uppercase font-black text-zinc-500">Acc No</p><p className="text-xl text-blue-400 font-bold tracking-wider">91691764</p></div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-end"><span className="text-zinc-500 uppercase text-[10px] font-black">Total</span><span className="text-2xl font-black">Rs. 500.00</span></div>
              </div>
            </div>

            <label className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all ${slipUrl ? 'bg-green-50 border-green-200' : 'bg-zinc-50 border-zinc-200 hover:border-blue-400'}`}>
              {isSlipUploading ? <Loader2 className="animate-spin text-blue-600" /> : slipUrl ? <CheckCircle2Icon size={32} className="text-green-600" /> : <div className="text-center"><SendIcon size={20} className="mx-auto text-zinc-300 mb-2 rotate-[-45deg]"/><span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Upload Slip</span></div>}
              <input type="file" className="hidden" accept="image/*" onChange={handleSlipFileUpload} />
            </label>

            <button onClick={handleWhatsApp} disabled={!slipUrl} className={`w-full py-5 rounded-2xl font-black uppercase text-[12px] mt-6 transition-all shadow-xl ${slipUrl ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'}`}>
              Place Order via WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
