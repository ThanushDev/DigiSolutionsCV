import React, { useState, useRef } from 'react';
import { useCV } from '../context/CVContext';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { templateThemes } from '../types/cv';
import {
  ChevronLeftIcon,
  PaletteIcon,
  XIcon,
  CameraIcon,
  SendIcon
} from 'lucide-react';

interface CVPreviewProps {
  onBack: () => void;
}

export function CVPreview({ onBack }: CVPreviewProps) {
  // context එකෙන් දත්ත ගන්නවා
  const context = useCV();
  
  // දත්ත ලැබෙනකම් පොඩි ආරක්ෂිත පියවරක්
  if (!context || !context.cvData) {
    return <div className="p-10 text-center">Loading Preview Data...</div>;
  }

  const { cvData, setSelectedTemplate } = context;
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [slipImage, setSlipImage] = useState<string>('');
  const cvRef = useRef<HTMLDivElement>(null);

  const currentTheme = templateThemes.find((t) => t.id === cvData.selectedTemplate) || templateThemes[0];

  const handleSlipUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSlipImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const sendToWhatsApp = () => {
    // WhatsApp එකට යවන දත්ත structure එක
    const essentialData = {
      n: cvData.personalInfo.name,
      fn: cvData.personalInfo.fullName,
      j: cvData.personalInfo.description,
      db: cvData.personalInfo.dob,
      ni: cvData.personalInfo.nic,
      rl: cvData.personalInfo.religion,
      cs: cvData.personalInfo.civilStatus,
      gn: cvData.personalInfo.gender,
      nt: cvData.personalInfo.nationality,
      t: cvData.selectedTemplate,
      p: cvData.contact.phone1,
      p2: cvData.contact.phone2,
      e: cvData.contact.email,
      a: cvData.contact.address,
      s: cvData.skills,
      l: cvData.languages,
      ex: cvData.workExperience,
      ed: cvData.education,
      pq: cvData.professionalQualifications,
      ref: cvData.references,
    };

    const jsonString = JSON.stringify(essentialData);
    const encodedRef = btoa(unescape(encodeURIComponent(jsonString)));

    const whatsappNumber = "94764781212"; 
    const message = `*--- NEW CV ORDER ---*%0A%0A*Name:* ${cvData.personalInfo.name}%0A*Amount:* Rs. 100.00%0A%0AI have paid and attached the slip. Please send my PDF.%0A%0A*System Ref:* ${encodedRef}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Navbar */}
      <div className="bg-white border-b sticky top-0 z-40 px-4 py-3 shadow-sm flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-gray-600 font-bold hover:text-black">
          <ChevronLeftIcon className="w-5 h-5" /> BACK TO EDITOR
        </button>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowThemeSelector(true)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <PaletteIcon className="w-5 h-5 text-gray-700" />
          </button>
          <button 
            onClick={() => setShowPaymentModal(true)} 
            className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold text-sm shadow-lg hover:bg-blue-700 active:scale-95"
          >
            DOWNLOAD PDF (Rs. 100)
          </button>
        </div>
      </div>

      {/* CV Preview */}
      <div className="flex justify-center p-4 sm:p-10">
        <div className="bg-zinc-300 p-2 sm:p-10 rounded-[2.5rem] shadow-inner overflow-auto w-full flex justify-center">
          <div 
            ref={cvRef} 
            className="bg-white shadow-2xl origin-top"
            style={{ width: '210mm', minHeight: '297mm' }}
          >
            <TemplateRenderer cvData={cvData} scale={1} />
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-gray-800 uppercase">Payment Details</h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-black"><XIcon/></button>
            </div>
            <div className="bg-blue-50 p-6 rounded-2xl mb-6 border-2 border-blue-100">
              <p className="font-bold text-blue-900 text-lg">Bank of Ceylon (BOC)</p>
              <p className="text-blue-700 font-medium">Acc: 91691764</p>
              <p className="text-blue-700 font-medium">Name: P.T.N. Pathiranage</p>
              <p className="mt-4 text-3xl font-black text-center text-blue-900">Rs. 100.00</p>
            </div>
            <label className="block p-8 border-2 border-dashed border-gray-200 rounded-2xl text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all mb-6">
              {slipImage ? <img src={slipImage} className="h-40 mx-auto rounded-lg" /> : <div className="text-gray-400 font-bold flex flex-col items-center gap-2"><CameraIcon size={30}/> UPLOAD SLIP SCREENSHOT</div>}
              <input type="file" className="hidden" onChange={handleSlipUpload} accept="image/*" />
            </label>
            <button 
              disabled={!slipImage} 
              onClick={sendToWhatsApp} 
              className="w-full py-5 bg-[#25D366] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-[#20ba59] active:scale-95 disabled:bg-gray-200 shadow-xl"
            >
              <SendIcon/> SEND VIA WHATSAPP
            </button>
          </div>
        </div>
      )}

      {/* Theme Selector Modal */}
      {showThemeSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-gray-800 uppercase italic">Select CV Style</h2>
              <button onClick={() => setShowThemeSelector(false)}><XIcon/></button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {templateThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => { setSelectedTemplate(theme.id); setShowThemeSelector(false); }}
                  className={`p-2 rounded-2xl border-4 transition-all ${cvData.selectedTemplate === theme.id ? 'border-blue-500 scale-105' : 'border-gray-50'}`}
                >
                  <div className="w-full h-24 rounded-xl mb-3" style={{ backgroundColor: theme.primaryColor }} />
                  <p className="font-bold text-xs uppercase text-center">{theme.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
