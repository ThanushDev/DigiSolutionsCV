import React, { useState, useRef } from 'react';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { DownloadIcon, Loader2Icon, ShieldCheckIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function Admin() {
  const [inputCode, setInputCode] = useState('');
  const [decodedData, setDecodedData] = useState<any>(null);
  const [isExporting, setIsExporting] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  const handleVerify = () => {
    try {
      // 1. මුලින්ම මුළු Message එකෙන්ම "System Ref:" කියන කෑල්ලෙන් පස්සේ තියෙන කොටස විතරක් ගන්නවා
      let rawCode = inputCode;
      if (inputCode.includes('System Ref:')) {
        rawCode = inputCode.split('System Ref:')[1];
      }

      // 2. අකුරු අතර තියෙන හිස්තැන් සහ අලුත් පේළි (New lines) ඉවත් කරනවා
      const cleanCode = rawCode.trim().replace(/\s/g, '');

      // 3. Base64 decode කරලා JSON බවට පත් කරනවා
      const jsonString = atob(cleanCode);
      const data = JSON.parse(jsonString);

      if (data && data.n) {
        setDecodedData(data);
      } else {
        throw new Error("Data structure is invalid");
      }
    } catch (error) {
      console.error("Decoding error:", error);
      alert("Invalid Reference Code! Please make sure you copied the entire 'System Ref' part correctly.");
      setDecodedData(null);
    }
  };

  const handleExportPDF = async () => {
    if (!cvRef.current) return;
    setIsExporting(true);

    try {
      const canvas = await html2canvas(cvRef.current, { 
        scale: 2,
        useCORS: true,
        logging: false 
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Verified_CV_${decodedData?.n || 'User'}.pdf`);
    } catch (error) {
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 p-6 text-white flex items-center gap-3">
          <ShieldCheckIcon className="text-blue-400" />
          <h1 className="text-xl font-bold tracking-tight">Digi Solutions | Admin Verification</h1>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Paste WhatsApp Reference Code:</label>
            <textarea 
              className="w-full h-40 p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-0 transition-all font-mono text-xs text-slate-600"
              placeholder="Paste the message here..."
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
            />
            <button 
              onClick={handleVerify}
              className="mt-4 w-full py-4 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Verify & Load CV
            </button>
          </div>

          {decodedData && (
            <div className="border-t-2 border-dashed border-slate-200 pt-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-8 bg-blue-50 p-6 rounded-2xl border border-blue-100 gap-4">
                <div>
                  <h2 className="text-blue-900 font-black text-xl leading-tight">{decodedData.n}</h2>
                  <p className="text-blue-600 font-medium uppercase text-xs tracking-widest mt-1">
                    Template: {decodedData.t} | Status: Verified
                  </p>
                </div>
                <button
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 disabled:bg-slate-400 transition-all shadow-xl"
                >
                  {isExporting ? <Loader2Icon className="animate-spin" /> : <DownloadIcon size={20} />}
                  {isExporting ? 'Creating PDF...' : 'Download Official CV'}
                </button>
              </div>

              <div className="flex justify-center bg-slate-200 p-4 sm:p-10 rounded-3xl overflow-hidden min-h-[500px]">
                 <div className="bg-white shadow-2xl origin-top scale-[0.6] sm:scale-100 transition-transform">
                    <div ref={cvRef}>
                      <TemplateRenderer cvData={decodedData} scale={1} />
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
