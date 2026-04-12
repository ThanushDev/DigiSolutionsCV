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

      // මෙතනදී අපි දත්ත structure දෙකකටම හදනවා. 
      // සමහර templates කෙලින්ම data එක ඉල්ලනවා, සමහර ඒවා object එකක් ඇතුළේ ඉල්ලනවා.
      const mappedData = {
        // Structure 1: Nested (පැරණි විදිහ)
        personalInfo: {
          fullName: data.n || '',
          email: data.e || '',
          phone1: data.p || '',
          phone: data.p || '',
          address: data.a || '',
          jobTitle: data.j || '',
        },
        // Structure 2: Flat (Template එක කෙලින්ම cvData.phone1 හෙව්වොත් මේක වැඩ කරයි)
        fullName: data.n || '',
        email: data.e || '',
        phone1: data.p || '',
        phone: data.p || '',
        experience: data.ex || [],
        education: data.ed || [],
        skills: data.s || [],
        templateId: data.t ? (data.t.toString().includes('template') ? data.t : `template-${data.t}`) : 'template-1'
      };

      console.log("Final Safety Mapped Data:", mappedData);
      setDecodedData(mappedData);
    } catch (error) {
      console.error("Decode Error:", error);
      alert("Invalid Code!");
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
      pdf.save(`DigiSolutions_Verified_${decodedData?.fullName || 'CV'}.pdf`);
    } catch (e) {
      alert("PDF Error!");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-4 font-sans text-zinc-900">
      <div className="max-w-4xl mx-auto">
        <div className="bg-zinc-900 rounded-3xl p-6 mb-6 text-white flex items-center justify-between shadow-2xl border border-zinc-800">
          <div className="flex items-center gap-3">
            <ShieldCheckIcon className="text-blue-400" />
            <h1 className="font-black tracking-tighter text-xl italic">DIGI SOLUTIONS ADMIN</h1>
          </div>
          {decodedData && (
            <button 
              onClick={handleExportPDF}
              disabled={isExporting}
              className="bg-white text-black px-6 py-2 rounded-xl font-bold text-sm hover:bg-blue-400 transition-all flex items-center gap-2"
            >
              {isExporting ? <Loader2Icon className="animate-spin" size={16} /> : <DownloadIcon size={16} />}
              SAVE PDF
            </button>
          )}
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl border border-zinc-100">
          <textarea 
            className="w-full h-32 p-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl mb-4 font-mono text-[10px] focus:border-blue-500 outline-none"
            placeholder="Paste code here..."
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
          <button 
            onClick={handleVerify}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg"
          >
            DECODE & VERIFY
          </button>

          {decodedData && (
            <div className="mt-8 animate-in fade-in zoom-in duration-500">
              <div className="bg-zinc-100 p-4 rounded-2xl mb-6 border border-zinc-200">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Active Session</p>
                <p className="font-bold text-zinc-800">{decodedData.fullName}</p>
              </div>

              {/* CV Preview Container */}
              <div className="bg-zinc-200 rounded-[2rem] p-4 sm:p-10 flex justify-center border-4 border-white shadow-inner overflow-hidden">
                <div ref={cvRef} className="bg-white shadow-2xl origin-top scale-[0.5] sm:scale-100 min-h-[1123px] w-[794px]">
                  <TemplateRenderer cvData={decodedData} scale={1} />
                </div>
              </div>
            </div>
          )}

          {!decodedData && (
            <div className="py-20 text-center opacity-20">
              <AlertTriangleIcon className="mx-auto mb-2" size={48} />
              <p className="font-bold uppercase tracking-widest text-xs">Awaiting Reference Code</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
