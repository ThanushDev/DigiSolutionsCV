import React, { useState, useEffect } from 'react';
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
  
  // මොබයිල් වලදී scale එක පාලනය කරන්න state එකක්
  const [previewScale, setPreviewScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      // ඩෙස්ක්ටොප් එකේදී 0.9 ක් හෝ 1.0 ක් පාවිච්චි කරනවා
      // මොබයිල් (width < 768) වලදී පේජ් එක කැපෙන්නේ නැතුව කියවන්න පුළුවන් මට්ටමට (0.5 - 0.6) පොඩි කරනවා
      if (window.innerWidth < 768) {
        setPreviewScale(0.55); 
      } else {
        setPreviewScale(0.85);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

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
      {/* Navbar */}
      <div className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="flex items-center text-[10px] font-black text-zinc-500 uppercase tracking-widest">
            <ChevronLeftIcon className="mr-1 w-4 h-4"/> Back
          </button>
          
          <div className="flex gap-2">
            <button onClick={() => setShowThemes(true)} className="p-2.5 bg-zinc-100 text-zinc-600 rounded-xl active:scale-90 transition-all">
              <PaletteIcon size={18}/>
            </button>
            <button onClick={() => setShowPayment(true)} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-200 active:scale-95 transition-all">
              <SendIcon size={14}/> Download
            </button>
          </div>
        </div>
      </div>

      {/* CV Preview Area - මන් මෙතන තමයි ඔයාගේ ප්‍රශ්නය විසඳුවේ */}
      <div className="flex-1 overflow-x-auto overflow-y-auto bg-zinc-200/50 p-4 md:p-8 flex justify-center">
        <div 
          className="shadow-2xl transition-all duration-500 origin-top bg-white"
          style={{
            transform: `scale(${previewScale})`,
            // මෙතනදී අපි බල කරනවා මුල් A4 size එකම තියාගන්න කියලා
            minWidth: '210mm', 
            height: 'fit-content'
          }}
        >
          <TemplateRenderer cvData={cvData} scale={1} />
        </div>
      </div>

      {/* Payment Modal (Bottom Sheet style for Mobile) */}
      {showPayment && (
        <div className="fixed inset-0 bg-zinc-900/60 z-50 flex items-end sm:items-center justify-center backdrop-blur-sm p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 md:p-8 max-w-md w-full shadow-2xl animate-in slide-in-from-bottom-10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-xl"><Landmark className="text-blue-600 w-5 h-5" /></div>
                <h3 className="text-lg font-black uppercase text-zinc-800">Payment</h3>
              </div>
              <button onClick={() => setShowPayment(false)} className="p-2 bg-zinc-100 rounded-full"><XIcon size={20}/></button>
            </div>
            
            <div className="bg-zinc-50 rounded-[1.5rem] p-5 border border-zinc-100 mb-6 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400 font-bold uppercase text-[9px]">Bank</span>
                <span className="font-bold text-zinc-800">Bank of Ceylon</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400 font-bold uppercase text-[9px]">Account</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-800">91691764</span>
                  <Copy size={14} className="text-zinc-300 cursor-pointer" onClick={() => {navigator.clipboard.writeText('91691764'); alert('Copied!');}}/>
                </div>
              </div>
              <div className="pt-3 border-t flex justify-between items-center">
                <span className="text-zinc-800 font-black uppercase text-[11px]">Amount</span>
                <span className="font-black text-xl text-blue-600">Rs.500/=</span>
              </div>
            </div>

            <div className="mb-6">
              <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-[1.5rem] cursor-pointer transition-all ${slipUrl ? 'bg-green-50 border-green-200' : 'bg-zinc-50 border-zinc-200'}`}>
                {isUploading ? <Loader2 className="animate-spin text-blue-600" /> : 
                 slipUrl ? <CheckCircle2Icon className="text-green-600" /> : 
                 <div className="flex flex-col items-center text-zinc-400"><UploadIcon size={20} /><span className="text-[9px] font-black uppercase mt-2">Upload Slip</span></div>}
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
              </label>
            </div>

            <button onClick={handleWhatsApp} disabled={!slipUrl || isUploading} className={`w-full py-4 rounded-xl font-black uppercase text-[10px] flex items-center justify-center gap-3 ${slipUrl ? 'bg-zinc-900 text-white shadow-xl' : 'bg-zinc-100 text-zinc-400'}`}>
              Confirm Order <SendIcon size={14}/>
            </button>
          </div>
        </div>
      )}

      {/* Themes Modal */}
      {showThemes && (
        <div className="fixed inset-0 bg-zinc-900/60 z-50 flex items-end sm:items-center justify-center backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-t-[2rem] sm:rounded-[2.5rem] p-6 md:p-8 max-w-md w-full animate-in slide-in-from-bottom-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black uppercase text-zinc-800">Select Template</h3>
              <button onClick={() => setShowThemes(false)} className="p-2 bg-zinc-100 rounded-full"><XIcon size={20}/></button>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {templateThemes.map(t => (
                <button key={t.id} onClick={() => { setSelectedTemplate(t.id); setShowThemes(false); }}
                  className={`p-4 border-2 rounded-xl text-left flex items-center justify-between ${cvData.selectedTemplate === t.id ? 'border-blue-600 bg-blue-50' : 'border-zinc-100 bg-zinc-50'}`}>
                  <span className={`font-black uppercase text-[10px] ${cvData.selectedTemplate === t.id ? 'text-blue-600' : 'text-zinc-600'}`}>{t.name}</span>
                  {cvData.selectedTemplate === t.id && <CheckCircle2Icon size={16} className="text-blue-600" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
