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
        personalInfo: { name: json.n, fullName: json.fn, description: json.j, dateOfBirth: json.db, nicNumber: json.ni, religion: json.rl, civilStatus: json.cs, gender: json.gn, nationality: json.nt, photo: '', photoFormat: 'circular' },
        contact: { phone1: json.p1, phone2: json.p2, email: json.e, address: json.a },
        skills: json.s, languages: json.l, workExperience: json.ex, education: json.ed, professionalQualifications: json.pq, references: json.r
      };
      setDecodedData(formatted);
    } catch (e) { alert("Invalid Code!"); }
  };

  const downloadPDF = async () => {
    if (!cvRef.current) return;
    const canvas = await html2canvas(cvRef.current, { scale: 2, useCORS: true });
    const img = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(img, 'PNG', 0, 0, 210, (canvas.height * 210) / canvas.width);
    pdf.save(`CV_${decodedData.personalInfo.name}.pdf`);
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-black text-white p-6 rounded-3xl mb-8 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold"><ShieldCheckIcon/> ADMIN PANEL</div>
          {decodedData && <button onClick={downloadPDF} className="bg-blue-600 px-6 py-2 rounded-xl font-bold flex items-center gap-2"><DownloadIcon size={18}/> DOWNLOAD PDF</button>}
        </div>
        <textarea className="w-full h-32 p-4 rounded-2xl mb-4 border-2" placeholder="Paste Reference Code..." value={inputCode} onChange={(e)=>setInputCode(e.target.value)} />
        <button onClick={handleVerify} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold mb-10 uppercase">Load CV Data</button>
        {decodedData && (
          <div className="flex justify-center" ref={cvRef}>
            <div className="bg-white shadow-2xl" style={{ width: '210mm', minHeight: '297mm' }}>
              <TemplateRenderer cvData={decodedData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
