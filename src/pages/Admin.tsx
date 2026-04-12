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
      const data = JSON.parse(atob(cleanCode));
      setDecodedData(data); // කෙලින්ම raw JSON එක දෙනවා
    } catch (e) {
      alert("Invalid Code!");
    }
  };

  const downloadPDF = async () => {
    if (!cvRef.current) return;
    const canvas = await html2canvas(cvRef.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, 210, (canvas.height * 210) / canvas.width);
    pdf.save(`CV_Review.pdf`);
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-black text-white p-6 rounded-3xl mb-8 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold"><ShieldCheckIcon/> ADMIN REVIEW</div>
          {decodedData && (
            <button onClick={downloadPDF} className="bg-blue-600 px-6 py-2 rounded-xl font-bold flex items-center gap-2">
              <DownloadIcon size={18}/> DOWNLOAD PDF
            </button>
          )}
        </div>

        <textarea 
          className="w-full h-32 p-4 rounded-2xl mb-4 border-2 border-zinc-200 outline-none focus:border-blue-500 font-mono text-xs"
          placeholder="Paste Reference Code here..."
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button onClick={handleVerify} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold mb-10 shadow-lg">SHOW FULL CV</button>

        {decodedData && (
          <div className="flex justify-center bg-zinc-300 p-10 rounded-[3rem]">
            <div ref={cvRef} className="shadow-2xl">
              <TemplateRenderer cvData={decodedData} scale={1} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
