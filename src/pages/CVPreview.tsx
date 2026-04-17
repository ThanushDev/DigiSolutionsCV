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
  Sliders
} from 'lucide-react';

export function CVPreview({ onBack }: { onBack: () => void }) {
  const { cvData, setSelectedTemplate, updateThemeColor, setBrightness } = useCV();
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
      if (result.success) setSlipUrl(result.data.url);
    } catch (error) {
      alert("Error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleWhatsApp = () => {
    const shortData = { t: cvData.selectedTemplate, pi: cvData.personalInfo, co: cvData.contact /* ... add other fields */ };
    const data = btoa(unescape(encodeURIComponent(JSON.stringify(shortData))));
    const message = `Hi, I have completed my CV.\n\nSlip: ${slipUrl}\n\nRef: ${data}`;
    window.open(`https://wa.me/94764781212?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col overflow-hidden font-sans">
      {/* Top Navbar */}
      <div className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-30 px-4 py-3 md:p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="flex items-center text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-zinc-900 transition-colors">
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
      <div className="flex-1 overflow-auto p-4 md:p-10 flex justify-center bg-zinc-200/30">
        <div className="relative mb-24 transition-all duration-500 ease-in-out origin-top"
             style={{ 
               transform: `scale(${window.innerWidth < 640 ? 0.45 : window.innerWidth < 1024 ? 0.75 : 1})`,
               width: '210mm',
               minHeight: '297mm'
             }}>
          <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-sm overflow-hidden border border-white/50">
            <TemplateRenderer cvData={cvData} />
          </div>
        </div>
      </div>

      {/* Modern Themes & Customization Modal */}
      {showThemes && (
        <div className="fixed inset-0 bg-zinc-900/60 z-50 flex items-end sm:items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2.5rem] p-6 md:p-8 max-w-md w-full animate-in slide-in-from-bottom-10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black uppercase tracking-tighter text-zinc-800">Customize CV</h3>
              <button onClick={() => setShowThemes(false)} className="p-2 bg-zinc-100 rounded-full hover:bg-zinc-200"><XIcon size={20}/></button>
            </div>

            {/* Template Selection */}
            <div className="space-y-3 mb-8">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4 block">1. Select Template</span>
              <div className="grid grid-cols-1 gap-2">
                {templateThemes.map(t => (
                  <button 
                    key={t.id} 
                    onClick={() => setSelectedTemplate(String(t.id))}
                    className={`p-4 border-2 rounded-2xl text-left transition-all flex items-center justify-between group ${String(cvData.selectedTemplate) === String(t.id) ? 'border-blue-600 bg-blue-50/50' : 'border-zinc-100 hover:border-zinc-200'}`}
                  >
                    <span className={`font-black uppercase text-[11px] ${String(cvData.selectedTemplate) === String(t.id) ? 'text-blue-700' : 'text-zinc-600'}`}>{t.name}</span>
                    {String(cvData.selectedTemplate) === String(t.id) && <CheckCircle2Icon size={18} className="text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Unique Color Palette */}
            <div className="space-y-6">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] block">2. Personalize Style</span>
              
              <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-zinc-700">Primary Theme Color</span>
                  <span className="text-[9px] text-zinc-400 font-bold">Pick your brand color</span>
                </div>
                <input 
                  type="color" 
                  value={cvData.customColor || '#2563eb'}
                  onChange={(e) => updateThemeColor(e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-none"
                />
              </div>

              {/* Brightness Seekbar */}
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders size={14} className="text-blue-600"/>
                    <span className="text-xs font-black text-zinc-700">Brightness / Intensity</span>
                  </div>
                  <span className="text-[10px] font-black px-2 py-1 bg-blue-100 text-blue-700 rounded-lg">{cvData.brightness || 100}%</span>
                </div>
                <input 
                  type="range" 
                  min="20" max="150" 
                  value={cvData.brightness || 100}
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>

            <button 
              onClick={() => setShowThemes(false)}
              className="w-full mt-8 py-4 bg-zinc-900 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200"
            >
              Apply Changes
            </button>
          </div>
        </div>
      )}

      {/* Payment Modal (Same as before) */}
      {/* ... (keep your existing payment modal code here) */}
    </div>
  );
}
