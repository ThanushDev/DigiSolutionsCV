import React, { useState, useRef } from 'react';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { DownloadIcon, Loader2Icon, ShieldCheckIcon, AlertCircleIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function Admin() {
  const [inputCode, setInputCode] = useState('');
  const [decodedData, setDecodedData] = useState<any>(null);
  const [isExporting, setIsExporting] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  const handleVerify = () => {
    try {
      let rawCode = inputCode;
      
      // WhatsApp message eken reference eka witarak ganna logic eka
      if (inputCode.includes('System Ref:')) {
        rawCode = inputCode.split('System Ref:')[1];
      }

      const cleanCode = rawCode.trim().replace(/\s/g, '');
      const jsonString = atob(cleanCode);
      const data = JSON.parse(jsonString);

      // Data Short names wala idan Template ekata ona widiyata map kirima
      // Oyaage Context eke thiyena structure ekatama meka hadala thiyenne
      const mappedData = {
        personalInfo: {
          fullName: data.n || '',
          email: data.e || '',
          phone: data.p || '',
          address: data.a || '',
          jobTitle: data.j || '',
        },
        experience: data.ex || [],
        education: data.ed || [],
        skills: data.s || [],
        templateId: data.t || 'template-1'
      };

      console.log("Verified Data:", mappedData);
      setDecodedData(mappedData);
    } catch (error) {
      console.error("Decode Error:", error);
      alert("Invalid Code! Please copy the entire code after 'System Ref:'");
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
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`DigiSolutions_CV_${decodedData?.personalInfo?.fullName || 'User'}.pdf`);
    } catch (error) {
      alert("Error creating PDF.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-slate-900 rounded-t-3xl p-6 text-white flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <ShieldCheckIcon className="text-blue-400" size={32} />
            <div>
              <h1 className="text-xl font-bold">Digi Solutions Admin</h1>
              <p className="text-xs text-slate-400">Manual Verification Panel</p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white p-6 shadow-md">
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
            WhatsApp System Reference Code
          </label>
          <textarea 
            className="w-full h-32 p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none font-mono text-xs transition-all"
            placeholder="Paste the code here..."
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
          <button 
            onClick={handleVerify}
            className="mt-4 w-full py-4 bg-blue-600 text-white rounded-xl font-black hover:bg-blue-700 shadow-lg transition-transform active:scale-95"
          >
            DECODE & LOAD CV
          </button>
        </div>

        {/* Preview Area */}
        {decodedData ? (
          <div className="bg-white mt-6 rounded-b-3xl p-6 shadow-xl border-t-4 border-blue-600 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 bg-blue-50 p-6 rounded-2xl gap-4">
              <div>
                <p className="text-xs font-bold text-blue-500 uppercase">Verified User</p>
                <h2 className="text-2xl font-black text-slate-800">{decodedData.personalInfo.fullName}</h2>
              </div>
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 disabled:bg-gray-400 transition-all"
              >
                {isExporting ? <Loader2Icon className="animate-spin" /> : <DownloadIcon size={20} />}
                {isExporting ? 'Generating PDF...' : 'Download Official CV'}
              </button>
            </div>

            {/* CV Rendering */}
            <div className="bg-gray-200 p-4 sm:p-10 rounded-2xl flex justify-center overflow-x-auto">
               <div className="bg-white shadow-2xl origin-top scale-[0.5] sm:scale-100" ref={cvRef}>
                  <TemplateRenderer cvData={decodedData} scale={1} />
               </div>
            </div>
          </div>
        ) : (
          <div className="bg-white mt-6 rounded-b-3xl p-20 flex flex-col items-center text-gray-400 border-2 border-dashed border-gray-200">
            <AlertCircleIcon size={48} className="mb-4 opacity-20" />
            <p className="font-medium text-center">No data loaded. Paste a code and click Verify.</p>
          </div>
        )}
      </div>
    </div>
  );
}
