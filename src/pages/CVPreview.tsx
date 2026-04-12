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
  const currentTheme = templateThemes.find((t) => t.id === cvData.selectedTemplate);

  const handleSlipUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSlipImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const sendToWhatsApp = () => {
    // සියලුම දත්ත mapping එකක් හරහා කෙටි keys වලට හරවමු
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
    const message = `*--- NEW CV ORDER ---*%0A%0A` +
      `*Name:* ${cvData.personalInfo.name}%0A` +
      `*Amount:* Rs. 100.00%0A%0A` +
      `I have paid and attached the slip. Please send my PDF.%0A%0A` +
      `*System Ref:* ${encodedRef}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <div className="bg-white border-b sticky top-0 z-40 px-4 py-3 shadow-sm flex items-center justify-between max-w-5xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-1 text-gray-600 font-medium">
          <ChevronLeftIcon className="w-5 h-5" /> Back
        </button>
        <div className="flex gap-2">
          <button onClick={() => setShowThemeSelector(true)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <PaletteIcon className="w-5 h-5" />
          </button>
          <button onClick={() => setShowPaymentModal(true)} className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-blue-700">
            Download PDF (Rs. 100)
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 sm:p-8 flex justify-center">
        <div ref={cvRef} className="shadow-2xl bg-white" style={{ width: '210mm', minHeight: '297mm' }}>
          <TemplateRenderer cvData={cvData} scale={1} />
        </div>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Complete Payment</h3>
              <button onClick={() => setShowPaymentModal(false)}><XIcon/></button>
            </div>
            <div className="bg-blue-50 p-5 rounded-xl mb-6 border border-blue-200">
              <p className="text-blue-900 font-bold">Bank of Ceylon (BOC)</p>
              <p className="text-blue-800 text-sm">ACC: 91691764 | P.T.N. Pathiranage</p>
              <p className="mt-4 text-2xl font-black text-center">Rs. 100.00</p>
            </div>
            <label className="block p-6 border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer mb-4">
              {slipImage ? <img src={slipImage} className="h-32 mx-auto rounded" /> : "Upload Payment Slip"}
              <input type="file" className="hidden" onChange={handleSlipUpload} accept="image/*" />
            </label>
            <button disabled={!slipImage} onClick={sendToWhatsApp} className="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold flex items-center justify-center gap-2">
              <SendIcon size={20}/> Send to WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
