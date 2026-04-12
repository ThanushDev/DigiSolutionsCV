import React, { useState, useRef } from 'react';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { DownloadIcon, Loader2Icon, ShieldCheckIcon, AlertTriangleIcon } from 'lucide-react';
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
      if (inputCode.includes('System Ref:')) {
        rawCode = inputCode.split('System Ref:')[1];
      }

      const cleanCode = rawCode.trim().replace(/\s/g, '');
      const jsonString = atob(cleanCode);
      const data = JSON.parse(jsonString);

      // මෙතන තමයි වැදගත්ම දේ: WhatsApp එකෙන් එන කෙටි අකුරු (n, e, p) 
      // අපේ Templates බලාපොරොත්තු වන දිග නම් (fullName, email) වලට හරවනවා.
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

      console.log("Mapped Data for Template:", mappedData);
      setDecodedData(mappedData);
    } catch (error) {
      console.error("Decode Error Details:", error);
      alert("Error: Invalid Reference Code. Make sure you copied everything correctly.");
    }
  };

  const handleExportPDF = async () => {
    if (!cvRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(cvRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, (canvas.height * 210) / canvas.width);
      pdf.save(`CV_${decodedData?.personalInfo?.fullName || 'Export'}.pdf`);
    } catch (e) {
      alert("PDF Export Failed!");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-zinc-900 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="text-emerald-400" />
            <h1 className="font-bold">DIGI SOLUTIONS ADMIN</h1>
          </div>
          {decodedData && (
            <button 
              onClick={handleExportPDF}
              disabled={isExporting}
              className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all"
            >
              {isExporting ? <Loader2Icon className="animate-spin" size={16} /> : <DownloadIcon size={16} />}
              DOWNLOAD PDF
            </button>
          )}
        </div>

        <div className="p-6">
          <textarea 
            className="w-full h-32 p-4 border-2 border-zinc-200 rounded-xl mb-4 font-mono text-xs focus:border-emerald-500 outline-none"
            placeholder="Paste System Reference here..."
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
          <button 
            onClick={handleVerify}
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black hover:bg-emerald-700 transition-all"
          >
            VERIFY & RENDER CV
          </button>

          {decodedData && (
            <div className="mt-8">
              {/* Fallback View: Template එක වැඩ නොකළත් මේ දත්ත ටික පේන්න ඕනේ */}
              <div className="bg-emerald-50 p-4 rounded-lg mb-6 border border-emerald-200">
                <p className="text-emerald-800 font-bold italic text-sm">Previewing: {decodedData.personalInfo.fullName}</p>
              </div>

              {/* Real CV Preview */}
              <div className="border shadow-inner bg-zinc-200 p-4 rounded-xl flex justify-center">
                <div ref={cvRef} className="bg-white shadow-lg w-full max-w-[800px]">
                  <TemplateRenderer cvData={decodedData} scale={1} />
                </div>
              </div>
            </div>
          )}

          {!decodedData && (
            <div className="py-20 text-center text-zinc-400">
              <AlertTriangleIcon className="mx-auto mb-2 opacity-20" size={48} />
              <p>Waiting for valid reference code...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
