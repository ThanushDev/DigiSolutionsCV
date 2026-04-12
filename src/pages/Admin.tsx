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
      let raw = inputCode.includes('Ref:') ? inputCode.split('Ref:')[1].trim() : inputCode.trim();
      const json = JSON.parse(decodeURIComponent(escape(atob(raw))));
      const formatted = {
        selectedTemplate: json.t,
        personalInfo: { 
          name: json.pi.n, fullName: json.pi.fn, description: json.pi.d, dateOfBirth: json.pi.db, 
          nicNumber: json.pi.ni, religion: json.pi.r, civilStatus: json.pi.c, gender: json.pi.g, 
          nationality: json.pi.nt, photo: json.pi.ph || '', photoFormat: json.pi.pf || 'circular' 
        },
        contact: { phone1: json.co.p1, phone2: json.co.p2, email: json.co.e, address: json.co.a },
        skills: json.sk, languages: json.la, workExperience: json.ex, education: json.ed, 
        professionalQualifications: json.pq, references: json.re
      };
      setDecodedData(formatted);
    } catch (e) { alert("Invalid Reference Code!"); }
  };

  const downloadPDF = async () => {
    if (!cvRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cvRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, (canvas.height * 210) / canvas.width);
      pdf.save(`CV_Order.pdf`);
    } catch (err) { alert("PDF Error"); }
    finally { setIsDownloading(false); }
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="max-w-5xl mx-auto text-center">
        <div className="bg-zinc-900 text-white p-6 rounded-3xl mb-8 flex justify-between items-center shadow-xl">
          <h1 className="flex items-center gap-2 font-black uppercase tracking-tighter"><ShieldCheckIcon className="text-blue-500"/> Admin Panel</h1>
          {decodedData && (
            <button onClick={downloadPDF} className="bg-white text-black px-6 py-2 rounded-xl flex items-center gap-2 font-bold">
              {isDownloading ? <Loader2 className="animate-spin"/> : <DownloadIcon size={18}/>} DOWNLOAD PDF
            </button>
          )}
        </div>
        <textarea className="w-full h-32 p-4 rounded-2xl mb-4 border-2 outline-none focus:border-blue-500" placeholder="Paste Reference Code Here..." value={inputCode} onChange={(e) => setInputCode(e.target.value)} />
        <button onClick={handleVerify} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all">Verify & Load CV</button>
        {decodedData && (
          <div className="mt-10 flex justify-center bg-white p-10 rounded-3xl shadow-inner overflow-auto">
            <div ref={cvRef}><TemplateRenderer cvData={decodedData} scale={1} /></div>
          </div>
        )}
      </div>
    </div>
  );
}
