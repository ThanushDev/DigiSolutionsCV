import React, { useState, useRef } from 'react';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { DownloadIcon, ShieldCheckIcon, Loader2, SearchIcon, ClipboardPaste } from 'lucide-react';
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
      
      // Base64 Decode කිරීම (Unicode support එක්ක)
      const json = JSON.parse(decodeURIComponent(escape(atob(raw))));
      
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
      const element = cvRef.current;
      const canvas = await html2canvas(element, { 
        scale: 3, // වඩාත් පැහැදිලි (High Quality) PDF එකක් සඳහා scale එක 3 කළා
        useCORS: true, 
        allowTaint: false,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`CV_${decodedData.personalInfo.name.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error(err);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-8 font-sans text-left">
      <div className="max-w-6xl mx-auto">
        
        {/* Admin Header */}
        <div className="bg-zinc-900 text-white p-6 md:p-8 rounded-[2.5rem] mb-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl transition-all border border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-500/20">
              <ShieldCheckIcon size={28}/>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-tight text-white">
                Admin Console
              </h1>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1">
                CV Processing & PDF Generation
              </p>
            </div>
          </div>
          
          {decodedData && (
            <button 
              onClick={downloadPDF} 
              disabled={isDownloading}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all disabled:opacity-50 shadow-xl shadow-blue-600/20 active:scale-95"
            >
              {isDownloading ? <Loader2 className="animate-spin" size={20}/> : <DownloadIcon size={20}/>}
              GENERATE PDF
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Input Panel */}
          <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-zinc-100 sticky top-8">
            <div className="flex items-center gap-2 mb-6 text-zinc-500">
              <ClipboardPaste size={18} className="text-blue-600"/>
              <span className="text-[11px] font-black uppercase tracking-widest">Verification Center</span>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <textarea 
                  className="w-full h-48 p-5 rounded-3xl bg-zinc-50 border-2 border-zinc-100 focus:border-blue-500 focus:bg-white outline-none transition-all resize-none font-mono text-[10px] text-zinc-600 shadow-inner" 
                  placeholder="Paste the Reference Code from WhatsApp here..." 
                  value={inputCode} 
                  onChange={(e) => setInputCode(e.target.value)} 
                />
              </div>
              
              <button 
                onClick={handleVerify} 
                className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-black hover:shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <SearchIcon size={16}/>
                Fetch Candidate Data
              </button>
            </div>

            {/* Hint Box */}
            <div className="mt-8 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
              <h5 className="text-[10px] font-black text-blue-600 uppercase mb-1 tracking-wider">How to use:</h5>
              <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
                Copy the entire WhatsApp message sent by the user and paste it above. The system will automatically extract the code.
              </p>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-8">
            {decodedData ? (
              <div className="bg-white p-4 md:p-10 rounded-[3rem] shadow-2xl border border-zinc-100 flex justify-center min-h-[1123px] overflow-hidden">
                <div 
                  ref={cvRef} 
                  className="bg-white shadow-sm ring-1 ring-zinc-200"
                  style={{ width: '210mm', minHeight: '297mm' }} // A4 Ratio
                >
                  <TemplateRenderer cvData={decodedData} scale={1} />
                </div>
              </div>
            ) : (
              <div className="h-[600px] bg-zinc-100/50 border-2 border-dashed border-zinc-200 rounded-[3rem] flex flex-col items-center justify-center text-zinc-400 gap-4">
                <div className="p-6 bg-zinc-100 rounded-full">
                  <SearchIcon size={48} strokeWidth={1}/>
                </div>
                <p className="text-sm font-bold uppercase tracking-widest">Waiting for data...</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
