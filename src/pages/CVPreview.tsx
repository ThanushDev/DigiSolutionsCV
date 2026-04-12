import React, { useState } from 'react';
import { useCV } from '../context/CVContext';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { templateThemes } from '../types/cv';
import { ChevronLeftIcon, PaletteIcon, XIcon, SendIcon, CheckCircle2Icon, UploadIcon, Loader2, Landmark, Copy } from 'lucide-react';

export function CVPreview({ onBack }: { onBack: () => void }) {
  const { cvData, setSelectedTemplate } = useCV();
  const [showThemes, setShowThemes] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
  const [isUploading, setIsUploading] = useState(false);
  const [slipUrl, setSlipUrl] = useState(''); 

  if (!cvData) return null;

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
      co: { p1: cvData.contact.phone1, p2: cvData.contact.phone2, e: cvData.contact.email, a: cvData.contact.address },
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
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      {/* Top Navbar */}
      <div className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-30 p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="flex items-center text-xs font-black text-zinc-500 uppercase tracking-widest hover:text-zinc-900 transition-colors">
            <ChevronLeftIcon className="mr-1 w-4 h-4"/> Back
          </button>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setShowThemes(true)} 
              className="p-3 bg-zinc-100 text-zinc-600 rounded-2xl hover:bg-zinc-200 transition-all active:scale-90"
            >
              <PaletteIcon size={20}/>
            </button>
            <button 
              onClick={() => setShowPayment(true)} 
              className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
            >
              <SendIcon size={16}/> Download
            </button>
          </div>
        </div>
      </div>

      {/* CV Preview Area */}
      <div className="flex-1 py-8 px-4 flex justify-center items-start overflow-x-auto">
        <div className="shadow-2xl shadow-zinc-300 origin-top transform scale-[0.6] sm:scale-[0.8] md:scale-100 transition-transform">
          <TemplateRenderer cvData={cvData} scale={1} />
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-zinc-900/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <Landmark className="text-blue-600 w-5 h-5" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter text-zinc-800">Payment</h3>
              </div>
              <button onClick={() => setShowPayment(false)} className="p-2 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors">
                <XIcon size={20}/>
              </button>
            </div>
            
            <div className="bg-zinc-50 rounded-[2rem] p-6 border border-zinc-100 mb-8 space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest">Bank</span>
                  <span className="font-bold text-zinc-800">Bank of Ceylon</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest">Account</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-800">91691764</span>
                    <Copy size={14} className="text-zinc-300 cursor-pointer"/>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest">Name</span>
                  <span className="font-bold text-zinc-800">PTN Pathiranage</span>
                </div>
                <div className="pt-3 border-t border-zinc-200 flex justify-between items-center">
                  <span className="text-zinc-800 font-black uppercase text-[12px]">Amount</span>
                  <span className="font-black text-xl text-blue-600">Rs.500/=</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className={`group flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all duration-300 ${slipUrl ? 'bg-green-50/50 border-green-200' : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200'}`}>
                {isUploading ? (
                  <div className="flex flex-col items-center text-blue-600">
                    <Loader2 className="mb-2 animate-spin w-8 h-8" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Uploading...</span>
                  </div>
                ) : slipUrl ? (
                  <div className="flex flex-col items-center text-green-600">
                    <CheckCircle2Icon className="mb-2 w-8 h-8" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Slip Attached</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-zinc-400 group-hover:text-zinc-600">
                    <div className="p-3 bg-white rounded-2xl shadow-sm mb-3">
                      <UploadIcon size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Upload Payment Slip</span>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
              </label>
            </div>

            <button 
              onClick={handleWhatsApp}
              disabled={!slipUrl || isUploading}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all ${
                slipUrl 
                ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-200 active:scale-[0.98]' 
                : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
              }`}
            >
              Confirm Order
              <SendIcon size={16}/>
            </button>
          </div>
        </div>
      )}

      {/* Themes Modal */}
      {showThemes && (
        <div className="fixed inset-0 bg-zinc-900/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 max-w-md w-full animate-in slide-in-from-bottom-10 duration-500">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black uppercase tracking-tighter text-zinc-800 ml-1">Select Template</h3>
              <button onClick={() => setShowThemes(false)} className="p-2 bg-zinc-100 rounded-full"><XIcon size={20}/></button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {templateThemes.map(t => (
                <button 
                  key={t.id} 
                  onClick={() => { setSelectedTemplate(t.id); setShowThemes(false); }}
                  className={`p-5 border-2 rounded-2xl text-left transition-all flex items-center justify-between ${
                    cvData.selectedTemplate === t.id 
                    ? 'border-blue-600 bg-blue-50/50' 
                    : 'border-zinc-100 hover:border-zinc-300 bg-zinc-50/50'
                  }`}
                >
                  <span className={`font-black uppercase text-xs tracking-widest ${cvData.selectedTemplate === t.id ? 'text-blue-600' : 'text-zinc-600'}`}>
                    {t.name}
                  </span>
                  {cvData.selectedTemplate === t.id && <CheckCircle2Icon size={18} className="text-blue-600" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
