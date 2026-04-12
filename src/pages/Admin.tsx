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
      let rawCode = inputCode.includes('System Ref:') ? inputCode.split('System Ref:')[1] : inputCode;
      const cleanCode = rawCode.trim().replace(/\s/g, '');
      
      // 1. Base64 Decode කිරීම (සිංහල අකුරු සඳහා decodeURIComponent භාවිතා කර ඇත)
      const jsonString = decodeURIComponent(escape(atob(cleanCode)));
      const rawData = JSON.parse(jsonString);

      // 2. Short Keys සිට Full Keys වලට Mapping කිරීම (TemplateRenderer එකට ගැලපෙන ලෙස)
      const formattedData = {
        selectedTemplate: rawData.t,
        personalInfo: {
          name: rawData.n,
          fullName: rawData.fn,
          description: rawData.j,
          photo: '', // පින්තූරය WhatsApp හරහා එවන්නේ නැති නිසා හිස්ව තබන්න
          photoFormat: 'circular'
        },
        contact: {
          phone1: rawData.p,
          email: rawData.e,
          address: rawData.a
        },
        skills: rawData.s || [],
        languages: rawData.l || [],
        workExperience: rawData.ex || [],
        education: rawData.ed || { oLevel: { subjects: [] }, aLevel: { subjects: [] } },
        professionalQualifications: rawData.pq || [],
        references: rawData.ref || [{}, {}]
      };

      setDecodedData(formattedData);
    } catch (e) {
      console.error(e);
      alert("Invalid Code or Decoding Error!");
    }
  };

  const downloadPDF = async () => {
    if (!cvRef.current) return;
    try {
      const canvas = await html2canvas(cvRef.current, { 
        scale: 2, 
        useCORS: true,
        logging: false 
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`CV_Review_${decodedData?.personalInfo?.name || 'Admin'}.pdf`);
    } catch (err) {
      alert("Error generating PDF");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-4 sm:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-black text-white p-6 rounded-3xl mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-bold">
            <ShieldCheckIcon className="text-blue-500"/> ADMIN REVIEW PANEL
          </div>
          {decodedData && (
            <button 
              onClick={downloadPDF} 
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
            >
              <DownloadIcon size={18}/> DOWNLOAD AS PDF
            </button>
          )}
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Paste Reference Code (System Ref):</label>
          <textarea 
            className="w-full h-32 p-4 rounded-2xl mb-4 border-2 border-zinc-100 outline-none focus:border-blue-500 font-mono text-xs bg-zinc-50"
            placeholder="Paste the long code from WhatsApp here..."
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
          <button 
            onClick={handleVerify} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-[0.98]"
          >
            DECODE & SHOW FULL CV
          </button>
        </div>

        {decodedData && (
          <div className="flex flex-col items-center">
             <p className="mb-4 text-zinc-500 text-sm font-medium italic">Previewing Template: {decodedData.selectedTemplate}</p>
             <div className="bg-zinc-300 p-4 sm:p-10 rounded-[2rem] sm:rounded-[3.5rem] overflow-auto w-full flex justify-center">
                <div 
                  ref={cvRef} 
                  className="bg-white shadow-2xl origin-top"
                  style={{ width: '210mm', minHeight: '297mm' }}
                >
                  <TemplateRenderer cvData={decodedData} scale={1} />
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
