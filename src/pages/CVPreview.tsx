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
  
  // Payment States
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [slipImage, setSlipImage] = useState<string>('');
  
  const cvRef = useRef<HTMLDivElement>(null);

  const currentTheme = templateThemes.find((t) => t.id === cvData.selectedTemplate);

  // පෑන්මන්ට් ස්ලිප් එක අප්ලෝඩ් කරන ෆන්ක්ෂන් එක
  const handleSlipUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSlipImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // WhatsApp හරහා විස්තර යවන ෆන්ක්ෂන් එක
  const sendToWhatsApp = () => {
    // CV එකේ දත්ත ටික ආරක්ෂිතව Encode කිරීම (බේස්64 පාවිච්චි කර ඇත)
    const essentialData = {
      n: cvData.personalInfo.name,
      t: cvData.selectedTemplate,
      id: Math.random().toString(36).substring(7),
      date: new Date().toLocaleDateString()
    };
    const encodedRef = btoa(JSON.stringify(essentialData));

    const whatsappNumber = "94764781212"; // මෙතනට ඔයාගේ WhatsApp අංකය දාන්න (උදා: 94771234567)
    const message = `*--- NEW CV ORDER ---*%0A%0A` +
      `*Name:* ${cvData.personalInfo.name}%0A` +
      `*Amount:* Rs. 100.00%0A` +
      `*Template:* ${currentTheme?.name}%0A%0A` +
      `I have paid and attached the slip above. Please verify and send my PDF.%0A%0A` +
      `*System Ref:* ${encodedRef}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleExportPDF = async () => {
    if (!cvRef.current) return;
    setIsExporting(true);
    setExportSuccess(false);

    try {
      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${cvData.personalInfo.name.replace(/\s+/g, '_')}_CV.pdf`);

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* Navigation Header */}
      <div className="bg-white border-b sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back to Editor</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowThemeSelector(true)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Change Theme"
            >
              <PaletteIcon className="w-5 h-5" />
            </button>
            <button
              onClick={resetCV}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Reset CV"
            >
              <RefreshCwIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowPaymentModal(true)} // පෑන්මන්ට් එක පෙන්වීමට
              disabled={isExporting}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all shadow-md ${
                exportSuccess
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
              }`}
            >
              {isExporting ? (
                <Loader2Icon className="w-5 h-5 animate-spin" />
              ) : exportSuccess ? (
                <CheckCircleIcon className="w-5 h-5" />
              ) : (
                <DownloadIcon className="w-5 h-5" />
              )}
              {isExporting ? 'Generating...' : exportSuccess ? 'Downloaded!' : 'Download PDF (Rs. 200)'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        <div className="flex justify-center">
          <div className="inline-block">
            <div className="mb-4 text-center">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-sm text-gray-600 shadow-sm border">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: currentTheme?.primaryColor }}
                />
                {currentTheme?.name} Theme
              </span>
            </div>
            
            <div
              ref={cvRef}
              className="shadow-2xl bg-white origin-top transition-transform"
              style={{ width: '210mm', minHeight: '297mm' }}
            >
              <TemplateRenderer cvData={cvData} scale={1} />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Complete Payment</h3>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl mb-6 border border-blue-200">
              <p className="text-blue-900 font-bold text-sm mb-3 uppercase tracking-wide">Bank Account Details</p>
              <div className="space-y-1 text-blue-800">
                <p><span className="font-semibold opacity-70 text-xs">BANK:</span> Bank of Ceylon (BOC)</p>
                <p><span className="font-semibold opacity-70 text-xs">ACC NO:</span> 123456789</p>
                <p><span className="font-semibold opacity-70 text-xs">NAME:</span> P.T.N. Pathiranage</p>
                <p className="mt-4 text-2xl font-black text-center text-blue-900">Rs. 100.00</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block p-6 border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all group">
                {slipImage ? (
                  <div className="relative">
                    <img src={slipImage} className="h-40 mx-auto rounded-lg shadow-sm" alt="Slip" />
                    <p className="mt-2 text-xs text-blue-600 font-medium text-center">Tap to change slip</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-gray-500 group-hover:text-blue-600">
                    <CameraIcon className="w-10 h-10" />
                    <span className="font-medium text-sm">Upload Payment Slip Screenshot</span>
                  </div>
                )}
                <input type="file" className="hidden" onChange={handleSlipUpload} accept="image/*" />
              </label>

              <button
                disabled={!slipImage}
                onClick={sendToWhatsApp}
                className="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#20ba59] active:scale-95 transition-all disabled:bg-gray-300 disabled:active:scale-100 shadow-lg shadow-green-100"
              >
                <SendIcon className="w-5 h-5" />
                Send to WhatsApp
              </button>
              
              <p className="text-[10px] text-gray-400 text-center italic">
                *After sending the slip, we will verify and send your PDF manually.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Theme Selection Modal (Already Exists in your code) */}
      {showThemeSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Select a Theme</h2>
              <button onClick={() => setShowThemeSelector(false)}>
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {templateThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setSelectedTemplate(theme.id);
                    setShowThemeSelector(false);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    cvData.selectedTemplate === theme.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div
                    className="w-full h-24 rounded-lg mb-3"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                  <p className="font-bold text-sm">{theme.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-3 z-30">
        <div className="flex items-center justify-center gap-4 px-4">
          <div className="text-xs sm:text-sm text-center">
            <span className="font-medium opacity-80">Sponsored by FCBS Digi Kuppiya</span>
            <span className="mx-3 text-gray-600">•</span>
            <span className="text-gray-300 font-medium">Made by Mr. Thanush</span>
          </div>
        </div>
      </div>
    </div>
  );
}
