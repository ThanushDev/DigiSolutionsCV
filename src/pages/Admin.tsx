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

      // CRITICAL FIX: Template එක ඇතුළේ undefined error එක නවත්තන්න 
      // අපි "Safe Object" එකක් හදමු.
      const safePersonalInfo = {
        fullName: data.n || '',
        email: data.e || '',
        phone1: data.p || '',
        phone2: data.p2 || '',
        phone: data.p || '',
        address: data.a || '',
        jobTitle: data.j || '',
        linkedin: data.l || '',
        website: data.w || ''
      };

      const mappedData = {
        // මේ structure දෙකම දාන්නේ template එක කොහොම ඉල්ලුවත් crash නොවෙන්න
        personalInfo: safePersonalInfo,
        ...safePersonalInfo, 
        experience: data.ex || [],
        education: data.ed || [],
        skills: data.s || [],
        templateId: data.t ? (data.t.toString().includes('template') ? data.t : `template-${data.t}`) : 'template-1'
      };

      console.log("Final Safety Mapped Data:", mappedData);
      setDecodedData(mappedData);
    } catch (error) {
      console.error("Decode Error:", error);
      alert("Invalid Reference Code!");
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
      pdf.save(`CV_Export.pdf`);
    } catch (e) {
      alert("PDF Error!");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-zinc-900 rounded-2xl p-5 mb-6 text-white flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-3">
            <ShieldCheckIcon className="text-emerald-400" size={28} />
            <h1 className="font-bold text-lg tracking-tight">DIGI SOLUTIONS ADMIN</h1>
          </div>
          {decodedData && (
            <button 
              onClick={handleExportPDF}
              disabled={isExporting}
              className="bg-emerald-500 hover:bg-emerald-600 px-5 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all active:scale-95"
            >
              {isExporting ? <Loader2Icon className="animate-spin" size={16} /> : <DownloadIcon size={16} />}
              DOWNLOAD CV
            </button>
          )}
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl border border-zinc-100">
          <textarea 
            className="w-full h-32 p-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl mb-4 font-mono text-[10px] focus:border-emerald-500 outline-none transition-all"
            placeholder="Paste code here..."
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
          <button 
            onClick={handleVerify}
            className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-[0.99]"
          >
            VERIFY REFERENCE
          </button>

          {decodedData && (
            <div className="mt-10 animate-in fade-in zoom-in duration-300">
              <div className="bg-emerald-50 p-4 rounded-2xl mb-6 border border-emerald-100 flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <span className="text-emerald-900 font-bold text-sm underline decoration-emerald-200 decoration-2">
                   Live Preview: {decodedData.fullName}
                </span>
              </div>

              <div className="bg-zinc-200 rounded-[2.5rem] p-4 sm:p-8 flex justify-center border-4 border-white shadow-inner overflow-hidden min-h-[500px]">
                {/* CV Render Area */}
                <div ref={cvRef} className="bg-white shadow-2xl origin-top scale-[0.5] sm:scale-100 w-[794px]">
                  <TemplateRenderer cvData={decodedData} scale={1} />
                </div>
              </div>
            </div>
          )}

          {!decodedData && (
            <div className="py-20 text-center opacity-10">
              <AlertTriangleIcon className="mx-auto mb-2" size={64} />
              <p className="font-black text-xs uppercase tracking-tighter">Waiting for Data...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
