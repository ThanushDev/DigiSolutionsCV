import React, { useState, useRef } from 'react';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { DownloadIcon, ShieldCheckIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function Admin() {
  const [inputCode, setInputCode] = useState('');
  const [decodedData, setDecodedData] = useState<any>(null);
  const cvRef = useRef<HTMLDivElement>(null);

  const handleVerify = () => {
    try {
      let raw = inputCode.includes('System Ref:') ? inputCode.split('System Ref:')[1].trim() : inputCode.trim();
      const json = JSON.parse(decodeURIComponent(escape(atob(raw))));
      
      const formatted = {
        selectedTemplate: json.t,
        personalInfo: { 
          name: json.n, 
          fullName: json.fn, 
          description: json.j, 
          dateOfBirth: json.db, 
          nicNumber: json.ni, 
          religion: json.rl, 
          civilStatus: json.cs, 
          gender: json.gn, 
          nationality: json.nt, 
          photo: json.ph || '', // WhatsApp හරහා එන JSON එකේ ph (photo) තිබිය යුතුයි
          photoFormat: json.pf || 'circular' 
        },
        contact: { phone1: json.p1, phone2: json.p2, email: json.e, address: json.a },
        skills: json.s, 
        languages: json.l, 
        workExperience: json.ex, 
        education: json.ed, 
        professionalQualifications: json.pq, 
        references: json.r
      };
      setDecodedData(formatted);
    } catch (e) { 
      alert("Invalid Code!"); 
    }
  };

  const downloadPDF = async () => {
    if (!cvRef.current) return;
    const canvas = await html2canvas(cvRef.current, { 
      scale: 2, 
      useCORS: true,
      allowTaint: true 
    });
    const img = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(img, 'PNG', 0, 0, 210, (canvas.height * 210) / canvas.width);
    pdf.save(`CV_${decodedData.personalInfo.name}.pdf`);
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-black text-white p-6 rounded-3xl mb-8 flex justify-between items-center shadow-xl">
          <div className="flex items-center gap-2 font-bold tracking-widest">
            <ShieldCheckIcon className="text-blue-500"/> ADMIN PANEL
          </div>
          {decodedData && (
            <button onClick={downloadPDF} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all">
              <DownloadIcon size={18}/> DOWNLOAD PDF
            </button>
          )}
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm mb-10">
          <textarea 
            className="w-full h-32 p-4 rounded-2xl mb-4 border-2 border-gray-100 focus:border-blue-500 outline-none transition-all" 
            placeholder="Paste System Reference Code here..." 
            value={inputCode} 
            onChange={(e) => setInputCode(e.target.value)} 
          />
          <button onClick={handleVerify} className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all">
            Load CV Data
          </button>
        </div>

        {decodedData && (
          <div className="flex justify-center bg-white p-10 rounded-3xl shadow-inner overflow-auto">
            <div ref={cvRef}>
              <TemplateRenderer cvData={decodedData} scale={1} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
