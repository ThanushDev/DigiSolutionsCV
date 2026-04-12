import React, { useState, useRef } from 'react';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { DownloadIcon, ShieldCheckIcon, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function Admin() {
  const [inputCode, setInputCode] = useState('');
  const [decodedData, setDecodedData] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  const handleVerify = () => {
    try {
      let raw = inputCode.includes('System Ref:') ? inputCode.split('System Ref:')[1].trim() : inputCode.trim();
      const json = JSON.parse(decodeURIComponent(escape(atob(raw))));
      
      const formatted = {
        selectedTemplate: json.t,
        personalInfo: { 
          name: json.n, fullName: json.fn, description: json.j, dateOfBirth: json.db, 
          nicNumber: json.ni, religion: json.rl, civilStatus: json.cs, gender: json.gn, 
          nationality: json.nt, 
          photo: json.ph || '', // Reference code එකෙන් ලින්ක් එක ගන්නවා
          photoFormat: json.pf || 'circular' 
        },
        contact: { phone1: json.p1, phone2: json.p2, email: json.e, address: json.a },
        skills: json.s, languages: json.l, workExperience: json.ex, education: json.ed, 
        professionalQualifications: json.pq, references: json.r
      };
      setDecodedData(formatted);
    } catch (e) { alert("Invalid Reference Code!"); }
  };

  const downloadPDF = async () => {
    if (!cvRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cvRef.current, { 
        scale: 2, 
        useCORS: true, // ImgBB ෆොටෝ එක PDF එකට ගන්න මේක අනිවාර්යයි
        allowTaint: false 
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, (canvas.height * 210) / canvas.width);
      pdf.save(`CV_${decodedData.personalInfo.name}.pdf`);
    } catch (err) { alert("PDF Error"); }
    finally { setIsDownloading(false); }
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-black text-white p-6 rounded-3xl mb-8 flex justify-between items-center">
          <div className="flex items-center gap-3 font-bold text-xl"><ShieldCheckIcon className="text-blue-500"/> ADMIN</div>
          {decodedData && (
            <button onClick={downloadPDF} disabled={isDownloading} className="bg-blue-600 px-6 py-2 rounded-xl font-bold flex items-center gap-2">
              {isDownloading ? <Loader2 className="animate-spin" size={18}/> : <DownloadIcon size={18}/>} PDF
            </button>
          )}
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm mb-10 border">
          <textarea 
            className="w-full h-32 p-4 rounded-2xl mb-4 border-2 outline-none font-mono text-xs" 
            placeholder="Paste System Reference Code here..." 
            value={inputCode} 
            onChange={(e) => setInputCode(e.target.value)} 
          />
          <button onClick={handleVerify} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
            Load CV Data
          </button>
        </div>

        {decodedData && (
          <div className="flex justify-center bg-white p-6 rounded-3xl shadow-inner overflow-auto border">
            <div ref={cvRef} className="bg-white">
              <TemplateRenderer cvData={decodedData} scale={1} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
