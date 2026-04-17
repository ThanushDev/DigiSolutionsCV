import React, { useState } from 'react';
import { useCV } from '../context/CVContext';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { templateThemes } from '../types/cv';
import { 
  ChevronLeftIcon, 
  PaletteIcon, 
  XIcon, 
  SendIcon, 
  CheckCircle2Icon, 
  UploadIcon, 
  Loader2, 
  Landmark, 
  Copy,
  Sliders,
  Paintbrush
} from 'lucide-react';

export function CVPreview({ onBack }: { onBack: () => void }) {
  const { cvData, setSelectedTemplate, updateThemeColor, setBrightness } = useCV();
  const [showPayment, setShowPayment] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [slipUrl, setSlipUrl] = useState(''); 

  if (!cvData) return null;

  // --- Payment Slip Upload Logic ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const apiKey = '43b8bf4b90a4c63f2f931edfc646c148'; 
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
      console.error("Error uploading:", error);
      alert("Error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  // --- WhatsApp Reference Logic (Encoding) ---
  const handleWhatsApp = () => {
    const shortData = {
      t: cvData.selectedTemplate,
      pi: { 
        n: cvData.personalInfo.name,
        fn: cvData.personalInfo.fullName,
        d: cvData.personalInfo.description,
        db: cvData.personalInfo.dateOfBirth,
        ni: cvData.personalInfo.nicNumber,
        r: cvData.personalInfo.religion,
        c: cvData.personalInfo.civilStatus,
        g: cvData.personalInfo.gender,
        nt: cvData.personalInfo.nationality,
        ph: cvData.personalInfo.photo, 
        pf: cvData.personalInfo.photoFormat,
      },
      co: cvData.contact,
      sk: cvData.skills,
      la: cvData.languages,
      ex: cvData.workExperience,
      ed: cvData.education,
      pq: cvData.professionalQualifications,
      re: cvData.references
    };

    const data = btoa(unescape(encodeURIComponent(JSON.stringify(shortData))));
    const adminNumber = "94764781212";
    const message = `Hi, I have completed my CV.\n\nSlip: ${slipUrl}\n\nRef: ${data}`;

    window.open(`https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col md:flex-row overflow-hidden">
      
      {/* --- Sidebar: Style Controls --- */}
      <div className="w-full md:w-80 bg-white border-r border-zinc-200 p-6 flex flex-col z-20 shadow-xl overflow-y-auto">
        <button onClick={onBack} className="flex items-center text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-zinc-800 transition-colors mb-8">
          <ChevronLeftIcon size={14} className="mr-1"/> Back to Edit
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Paintbrush size={18} className="text-blue-600"/>
          <h2 className="text-xl font-black uppercase tracking-tighter text-zinc-800">CV Style</h2>
        </div>

        {/* 1. Template Selection */}
        <div className="space-y-3 mb-8">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">Choose Template</label>
          <div className="grid grid-cols-1 gap-2">
            {templateThemes.map(t => (
              <button 
                key={t.id}
                onClick={() => {
                  setSelectedTemplate(t.id);
                  updateThemeColor(t.primaryColor); // Auto select color
                }}
                className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex justify-between items-center ${
                  cvData.selectedTemplate === t.id ? 'border-blue-600 bg-blue-50' : 'border-zinc-100 hover:border-zinc-200'
                }`}
              >
                <span className={`text-[11px] font-black uppercase ${cvData.selectedTemplate === t.id ? 'text-blue-700' : 'text-zinc-600'}`}>
                  {t.name}
                </span>
                {cvData.selectedTemplate === t.id && <CheckCircle2Icon size={14} className="text-blue-600" />}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Color & Brightness Fine Tune */}
        <div className="space-y-6 mb-10">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">Fine Tune</label>
          
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-700">Theme Color</span>
            <input 
              type="color" 
              value={cvData.customColor || '#2563eb'}
              onChange={(e) => updateThemeColor(e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none"
            />
          </div>

          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
            <div className="flex justify-between mb-3">
              <span className="text-xs font-bold text-zinc-700 flex items-center gap-2">
                <Sliders size={12}/> Brightness
              </span>
              <span className="text-[10px] font-black text-blue-600">{cvData.brightness || 100}%</span>
            </div>
            <input 
              type="range" min="50" max="150" 
              value={cvData.brightness || 100}
              onChange={(e) => setBrightness(parseInt(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => setShowPayment(true)}
          className="mt-auto w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
        >
          <SendIcon size={14}/> Get CV Now
        </button>
      </div>

      {/* --- Main: CV Preview Area --- */}
      <div className="flex-1 bg-zinc-200/50 overflow-auto p-4 md:p-10 flex justify-center items-start">
        <div className="transition-all duration-500 shadow-2xl origin-top"
             style={{ transform: `scale(${window.innerWidth < 640 ? 0.4 : 0.85})` }}>
          <div className="bg-white rounded-sm overflow-hidden">
            <TemplateRenderer cvData={cvData} />
          </div>
        </div>
      </div>

      {/* --- Payment Modal --- */}
      {showPayment && (
        <div className="fixed inset-0 bg-zinc-900/60 z-50 flex items-end sm:items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2.5rem] p-6 md:p-8 max-w-md w-full shadow-2xl animate-in slide-in-from-bottom-10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-xl"><Landmark className="text-blue-600 w-5 h-5" /></div>
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter text-zinc-800">Payment Details</h3>
              </div>
              <button onClick={() => setShowPayment(false)} className="p-2 bg-zinc-100 rounded-full hover:bg-zinc-200">
                <XIcon size={20}/>
              </button>
            </div>
            
            <div className="bg-zinc-50 rounded-[1.5rem] p-5 border border-zinc-100 mb-6 space-y-3">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 font-bold uppercase text-[9px]">Bank</span>
                  <span className="font-bold text-zinc-800">Bank of Ceylon</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 font-bold uppercase text-[9px]">Account</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-800">91691764</span>
                    <Copy size={14} className="text-zinc-300 cursor-pointer" onClick={() => {
                      navigator.clipboard.writeText('91691764');
                      alert("Copied!");
                    }}/>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 font-bold uppercase text-[9px]">Name</span>
                  <span className="font-bold text-zinc-800">PTN Pathiranage</span>
                </div>
                <div className="pt-3 border-t flex justify-between items-center">
                  <span className="text-zinc-800 font-black uppercase text-[11px]">Amount</span>
                  <span className="font-black text-lg text-blue-600">Rs.500/=</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className={`group flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-[1.5rem] cursor-pointer transition-all ${slipUrl ? 'bg-green-50 border-green-200' : 'bg-zinc-50 border-zinc-200'}`}>
                {isUploading ? (
                  <div className="flex flex-col items-center text-blue-600"><Loader2 className="animate-spin" /><span className="text-[9px] font-black mt-2">Uploading...</span></div>
                ) : slipUrl ? (
                  <div className="flex flex-col items-center text-green-600"><CheckCircle2Icon /><span className="text-[9px] font-black mt-2">Slip Attached</span></div>
                ) : (
                  <div className="flex flex-col items-center text-zinc-400">
                    <UploadIcon size={20} className="mb-2"/>
                    <span className="text-[9px] font-black uppercase">Upload Payment Slip</span>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
              </label>
            </div>

            <button 
              onClick={handleWhatsApp}
              disabled={!slipUrl || isUploading}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all ${slipUrl ? 'bg-zinc-900 text-white shadow-xl' : 'bg-zinc-100 text-zinc-400'}`}
            >
              Confirm via WhatsApp <SendIcon size={14}/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
