import React, { useState, useRef } from 'react';
import { useCV } from '../context/CVContext';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { templateThemes } from '../types/cv';
import {
  ChevronLeftIcon,
  DownloadIcon,
  RefreshCwIcon,
  CheckCircleIcon,
  Loader2Icon,
  PaletteIcon,
  XIcon,
  CameraIcon,
  SendIcon
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CVPreviewProps {
  onBack: () => void;
}

export function CVPreview({ onBack }: CVPreviewProps) {
  const { cvData, setSelectedTemplate, resetCV } = useCV();
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [slipImage, setSlipImage] = useState<string>('');
  
  const cvRef = useRef<HTMLDivElement>(null);

  // currentTheme එක ගන්නකොට fallback එකක් දාමු crash නොවෙන්න
  const currentTheme = templateThemes.find((t) => t.id === cvData?.selectedTemplate) || templateThemes[0];

  const handleSlipUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSlipImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const sendToWhatsApp = () => {
    if(!cvData) return;

    const essentialData = {
      n: cvData.personalInfo?.name,
      fn: cvData.personalInfo?.fullName,
      j: cvData.personalInfo?.description,
      db: cvData.personalInfo?.dob,
      ni: cvData.personalInfo?.nic,
      rl: cvData.personalInfo?.religion,
      cs: cvData.personalInfo?.civilStatus,
      gn: cvData.personalInfo?.gender,
      nt: cvData.personalInfo?.nationality,
      t: cvData.selectedTemplate,
      p: cvData.contact?.phone1,
      p2: cvData.contact?.phone2,
      e: cvData.contact?.email,
      a: cvData.contact?.address,
      s: cvData.skills || [],
      l: cvData.languages || [],
      ex: cvData.workExperience || [],
      ed: cvData.education || {},
      pq: cvData.professionalQualifications || [],
      ref: cvData.references || [],
    };

    try {
      const jsonString = JSON.stringify(essentialData);
      const encodedRef = btoa(unescape(encodeURIComponent(jsonString)));
      const whatsappNumber = "94764781212"; 
      const message = `*--- NEW CV ORDER ---*%0A%0A*Name:* ${cvData.personalInfo?.name}%0A*Amount:* Rs. 100.00%0A%0AI have paid and attached the slip. Please send my PDF.%0A%0A*System Ref:* ${encodedRef}`;
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    } catch (err) {
      alert("Error generating reference code.");
    }
  };

  // cvData නැත්නම් loader එකක් පෙන්වමු
  if (!cvData) {
    return <div className="flex items-center justify-center h-screen">Loading Preview...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* Navbar */}
      <div className="bg-white border-b sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-1 text-gray-600 font-medium">
            <ChevronLeftIcon className="w-5 h-5" /> Back
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowThemeSelector(true)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <PaletteIcon className="w-5 h-5" />
            </button>
            <button onClick={() => setShowPaymentModal(true)} className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold shadow-md">
              Download PDF (Rs. 100)
            </button>
          </div>
        </div>
      </div>

      {/* CV Preview Area */}
      <div className="max-w-5xl mx-auto p-4 sm:p-8 flex justify-center">
        <div 
          className="bg-zinc-200 p-4 sm:p-10 rounded-[2rem] w-full flex justify-center overflow-auto"
        >
          <div 
            ref={cvRef} 
            className="shadow-2xl bg-white" 
            style={{ width: '210mm', minHeight: '297mm', minWidth: '210mm' }}
          >
            {/* මෙතන cvData එක කෙලින්ම යවනවා */}
            <TemplateRenderer cvData={cvData} scale={1} />
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Payment Details</h3>
              <button onClick={() => setShowPaymentModal(false)}><XIcon/></button>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl mb-6 border border-blue-200">
              <p className="font-bold text-blue-900">BOC - 91691764</p>
              <p className="text-sm text-blue-800">P.T.N. Pathiranage</p>
              <p className="mt-2 text-xl font-black text-blue-900">Rs. 100.00</p>
            </div>
            <label className="block p-6 border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer mb-6 hover:bg-zinc-50">
              {slipImage ? <img src={slipImage} className="h-32 mx-auto rounded" /> : "Upload Slip"}
              <input type="file" className="hidden" onChange={handleSlipUpload} accept="image/*" />
            </label>
            <button disabled={!slipImage} onClick={sendToWhatsApp} className="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold flex items-center justify-center gap-2">
              <SendIcon size={20}/> Send via WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Theme Selector */}
      {showThemeSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Select Template</h2>
              <button onClick={() => setShowThemeSelector(false)}><XIcon/></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {templateThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => { setSelectedTemplate(theme.id); setShowThemeSelector(false); }}
                  className={`p-4 rounded-xl border-2 ${cvData.selectedTemplate === theme.id ? 'border-blue-500' : 'border-gray-100'}`}
                >
                  <div className="w-full h-12 rounded mb-2" style={{ backgroundColor: theme.primaryColor }} />
                  <p className="font-bold text-xs">{theme.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
