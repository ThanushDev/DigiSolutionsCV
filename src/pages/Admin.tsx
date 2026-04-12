import React, { useState, useRef } from 'react';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { DownloadIcon, Loader2Icon, ShieldCheckIcon, AlertCircleIcon } from 'lucide-react';
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

      // Template එක ඇතුළේ phone1, phone2 වගේ දේවල් ඉල්ලන නිසා 
      // අපි දත්ත ටික ඒ විදිහටම සකස් කරමු (Mapping)
      const mappedData = {
        personalInfo: {
          fullName: data.n || '',
          email: data.e || '',
          phone1: data.p || '', // මෙන්න මෙතනයි වැරදුනේ! phone වෙනුවට phone1 දාන්න
          phone2: data.p2 || '', 
          address: data.a || '',
          jobTitle: data.j || '',
          linkedin: data.l || '',
          website: data.w || '',
        },
        experience: data.ex || [],
        education: data.ed || [],
        skills: data.s || [],
        templateId: data.t || 'template-1'
      };

      console.log("Success! Mapped Data:", mappedData);
      setDecodedData(mappedData);
    } catch (error) {
      console.error("Decode Error:", error);
      alert("Invalid Code! Please copy the entire code correctly.");
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
      pdf.save(`Verified_CV_${decodedData?.personalInfo?.fullName || 'User'}.pdf`);
    } catch (e) {
      alert("PDF Export Failed!");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-blue-600 p-6 text-white flex items-center gap-3">
          <ShieldCheckIcon />
          <h1 className="text-xl font-bold uppercase tracking-wider">Digi Solutions | Admin Panel</h1>
        </div>

        <div className="p-6">
          <textarea 
            className="w-full h-32 p-4 bg-gray-50 border-2 border-gray-200 rounded-2xl mb-4 font-mono text-xs focus:border-blue-500 outline-none"
            placeholder="Paste System Reference Code here..."
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
          <button 
            onClick={handleVerify}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-black hover:bg-blue-700 transition-all shadow-lg"
          >
            VERIFY & GENERATE PREVIEW
          </button>

          {decodedData && (
            <div className="mt-8 border-t pt-8 animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-6 bg-blue-50 p-4 rounded-xl">
                <span className="font-bold text-blue-800">Previewing: {decodedData.personalInfo.fullName}</span>
                <button 
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-bold hover:bg-black transition-all"
                >
                  {isExporting ? <Loader2Icon className="animate-spin" size={18} /> : <DownloadIcon size={18} />}
                  GET PDF
                </button>
              </div>

              <div className="flex justify-center bg-gray-200 p-2 sm:p-10 rounded-2xl">
                <div ref={cvRef} className="bg-white shadow-2xl origin-top scale-[0.6] sm:scale-100">
                   <TemplateRenderer cvData={decodedData} scale={1} />
                </div>
              </div>
            </div>
          )}

          {!decodedData && (
            <div className="py-20 text-center text-gray-300">
              <AlertCircleIcon className="mx-auto mb-2 opacity-20" size={64} />
              <p>Waiting for valid reference code...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
