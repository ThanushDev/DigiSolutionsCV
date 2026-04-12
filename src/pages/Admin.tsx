import React, { useState, useRef } from 'react';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { DownloadIcon, ShieldCheckIcon, AlertTriangleIcon, Loader2Icon } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function Admin() {
  const [inputCode, setInputCode] = useState('');
  const [decodedData, setDecodedData] = useState<any>(null);
  const [isExporting, setIsExporting] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  const handleVerify = () => {
    try {
      if (!inputCode.trim()) return;

      let rawCode = inputCode;
      if (inputCode.includes('System Ref:')) {
        rawCode = inputCode.split('System Ref:')[1];
      }

      const cleanCode = rawCode.trim().replace(/\s/g, '');
      const jsonString = atob(cleanCode);
      const rawData = JSON.parse(jsonString);

      // User ගේ original keys ටික template එකට ගැලපෙන standard keys වලට විතරක් map කරනවා.
      // හැබැයි field එකක් empty නම් ඒක empty විදිහටම යවනවා (අලුත් දේවල් දාන්නේ නැහැ).
      const finalData = {
        personalInfo: {
          fullName: rawData.n,
          email: rawData.e,
          phone1: rawData.p,
          phone2: rawData.p2,
          address: rawData.a,
          jobTitle: rawData.j,
          linkedin: rawData.l,
          website: rawData.w,
        },
        experience: rawData.ex || [],
        education: rawData.ed || [],
        skills: rawData.s || [],
        templateId: rawData.t ? (rawData.t.toString().includes('template') ? rawData.t : `template-${rawData.t}`) : 'template-1'
      };

      setDecodedData(finalData);
    } catch (error) {
      alert("Invalid Reference Code!");
    }
  };

  const handleExportPDF = async () => {
    if (!cvRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(cvRef.current, { 
        scale: 2, 
        useCORS: true,
        backgroundColor: "#ffffff"
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, (canvas.height * 210) / canvas.width);
      pdf.save(`CV_${decodedData?.personalInfo?.fullName || 'Export'}.pdf`);
    } catch (e) {
      alert("Error generating PDF");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Admin Header */}
        <div className="bg-zinc-900 rounded-[2rem] p-6 mb-8 text-white flex flex-col md:flex-row items-center justify-between shadow-xl border border-zinc-800 gap-4">
          <div className="flex items-center gap-4">
            <ShieldCheckIcon className="text-blue-400" size={32} />
            <h1 className="font-bold tracking-tight text-xl">DIGI SOLUTIONS ADMIN</h1>
          </div>
          
          {decodedData && (
            <button 
              onClick={handleExportPDF}
              disabled={isExporting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50"
            >
              {isExporting ? <Loader2Icon className="animate-spin" size={18} /> : <DownloadIcon size={18} />}
              DOWNLOAD FULL CV
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Input Area */}
          <div className="lg:col-span-4 bg-white p-6 rounded-[2.5rem] shadow-sm border border-zinc-200">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3 block">Reference Code</label>
            <textarea 
              className="w-full h-48 p-5 bg-zinc-50 border-2 border-zinc-100 rounded-[2rem] mb-4 font-mono text-[11px] focus:border-blue-500 outline-none transition-all resize-none"
              placeholder="Paste the user's reference code here..."
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
            />
            <button 
              onClick={handleVerify}
              className="w-full bg-zinc-900 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg"
            >
              VERIFY & PREVIEW
            </button>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-8">
            {decodedData ? (
              <div className="flex flex-col items-center">
                <div className="bg-zinc-300 rounded-[3rem] p-4 md:p-10 w-full flex justify-center border-4 border-white shadow-inner overflow-auto">
                  {/* CV Render Area */}
                  <div ref={cvRef} className="bg-white shadow-2xl overflow-hidden" style={{ width: '210mm', minHeight: '297mm' }}>
                    <TemplateRenderer cvData={decodedData} data={decodedData} scale={1} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[500px] border-4 border-dashed border-zinc-200 rounded-[3rem] flex flex-col items-center justify-center text-zinc-300">
                <AlertTriangleIcon size={64} className="mb-4 opacity-10" />
                <p className="font-bold text-xs uppercase tracking-[0.3em] opacity-30 text-center px-10">Paste a code to generate the full CV preview</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
