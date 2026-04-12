import React, { useState, useRef } from 'react';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { DownloadIcon, ShieldCheckIcon, Loader2, SearchIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function Admin() {
  const [inputCode, setInputCode] = useState('');
  const [decodedData, setDecodedData] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  const handleVerify = () => {
    try {
      // WhatsApp මැසේජ් එකෙන් Ref කේතය පමණක් වෙන් කර ගැනීම
      let raw = inputCode.includes('Ref:') ? inputCode.split('Ref:')[1].trim() : inputCode.trim();
      
      // Base64 Decode කිරීම
      const json = JSON.parse(decodeURIComponent(escape(atob(raw))));
      
      // කෙටි කරන ලද Keys නැවත යථා තත්ත්වයට පත් කිරීම
      const formatted = {
        selectedTemplate: json.t,
        personalInfo: { 
          name: json.pi.n, 
          fullName: json.pi.fn, 
          description: json.pi.d, 
          dateOfBirth: json.pi.db, 
          nicNumber: json.pi.ni, 
          religion: json.pi.r, 
          civilStatus: json.pi.c, 
          gender: json.pi.g, 
          nationality: json.pi.nt, 
          photo: json.pi.ph || '', 
          photoFormat: json.pi.pf || 'circular' 
        },
        contact: { 
          phone1: json.co.p1, 
          phone2: json.co.p2, 
          email: json.co.e, 
          address: json.co.a 
        },
        skills: json.sk, 
        languages: json.la, 
        workExperience: json.ex, 
        education: json.ed, 
        professionalQualifications: json.pq, 
        references: json.re
      };
      
      setDecodedData(formatted);
    } catch (e) { 
      console.error(e);
      alert("Invalid Reference Code! Please check the code again."); 
    }
  };

  const downloadPDF = async () => {
    if (!cvRef.current || !decodedData) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cvRef.current, { 
        scale: 2, 
        useCORS: true, 
        allowTaint: false,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`CV_${decodedData.personalInfo.name.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error(err);
      alert("Error generating PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-10 font-sans text-left">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-zinc-900 text-white p-6 rounded-[2rem] mb-8 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <ShieldCheckIcon size={24}/>
            </div>
            <div className="text-left">
              <h1 className="font-black uppercase tracking-tighter leading-none text-white">Admin Panel</h1>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Order Management System</p>
            </div>
          </div>
          
          {decodedData && (
            <button 
              onClick={downloadPDF} 
              disabled={isDownloading}
              className="w-full md:w-auto bg-white text-black px-8 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all disabled:opacity-50 shadow-lg"
            >
              {isDownloading ? <Loader2 className="animate-spin" size={18}/> : <DownloadIcon size={18}/>}
              DOWNLOAD PDF
            </button>
          )}
        </div>

        {/* Input Field */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-100 mb-10">
          <div className="flex items-center gap-2 mb-4 text-zinc-400">
            <SearchIcon size={16}/>
            <span className="text-[10px] font-black uppercase tracking-widest">Paste WhatsApp Reference Code Below</span>
          </div>
          <textarea 
            className="w-full h-32 p-5 rounded-3xl bg-zinc-50 border-2 border-zinc-100 focus:border-blue-500 focus:bg-white outline-none transition-all resize-none font-mono text-xs text-zinc-600 mb-6" 
            placeholder="Paste code here..." 
            value={inputCode} 
            onChange={(e) => setInputCode(e.target.value)} 
          />
          <button 
            onClick={handleVerify} 
            className="w-full bg-blue-600 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-sm hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all"
          >
            Load Candidate Data
          </button>
        </div>

        {/* Preview Container - Content alignment fixed here */}
        {decodedData && (
          <div className="bg-white p-0 md:p-12 rounded-[3rem] shadow-inner border border-zinc-100 flex justify-center overflow-x-auto min-h-screen">
             <div ref={cvRef} className="bg-white p-1">
                {/* Template එකේ content center වෙන්නේ නැති වෙන්න මෙතන align කරලා තියෙනවා */}
                <TemplateRenderer cvData={decodedData} scale={1} />
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
