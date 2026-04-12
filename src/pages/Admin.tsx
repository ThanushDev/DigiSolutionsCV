import React, { useState, useRef } from 'react';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { DownloadIcon, ShieldCheckIcon, AlertTriangleIcon } from 'lucide-react';
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
      const data = JSON.parse(atob(cleanCode));

      const finalData = {
        personalInfo: {
          fullName: data.n || '',
          email: data.e || '',
          phone1: data.p || '',
          phone2: data.p2 || '',
          address: data.a || '',
          jobTitle: data.j || '',
          linkedin: data.l || '',
          website: data.w || '',
        },
        experience: data.ex || [],
        education: data.ed || [],
        skills: data.s || [],
        templateId: data.t ? (data.t.toString().includes('template') ? data.t : `template-${data.t}`) : 'template-1'
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
        scale: 3, // High quality
        useCORS: true,
        backgroundColor: "#ffffff"
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, (canvas.height * 210) / canvas.width);
      pdf.save("CV_Export.pdf");
    } catch (e) {
      alert("Error generating PDF");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-zinc-900 rounded-3xl p-6 mb-8 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShieldCheckIcon className="text-blue-400" />
            <h1 className="font-bold">DIGI SOLUTIONS ADMIN</h1>
          </div>
          {decodedData && (
            <button onClick={handleExportPDF} className="bg-blue-500 px-6 py-2 rounded-xl font-bold flex items-center gap-2">
              <DownloadIcon size={18} /> {isExporting ? 'Saving...' : 'Download PDF'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl shadow-sm border border-zinc-100 h-fit">
            <textarea 
              className="w-full h-40 p-4 bg-zinc-50 border rounded-2xl mb-4 font-mono text-xs outline-none focus:border-blue-500"
              placeholder="Paste code..."
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
            />
            <button onClick={handleVerify} className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold">VERIFY CODE</button>
          </div>

          <div className="lg:col-span-8">
            {decodedData ? (
              <div className="flex justify-center bg-zinc-200 p-8 rounded-[3rem] shadow-inner">
                <div ref={cvRef} className="bg-white shadow-2xl" style={{ width: '210mm', minHeight: '297mm' }}>
                  <TemplateRenderer cvData={decodedData} scale={1} />
                </div>
              </div>
            ) : (
              <div className="h-96 border-4 border-dashed border-zinc-100 rounded-[3rem] flex flex-col items-center justify-center text-zinc-300">
                <AlertTriangleIcon size={48} className="mb-2 opacity-20" />
                <p className="font-bold uppercase tracking-widest text-xs opacity-40">Paste a code to start</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
