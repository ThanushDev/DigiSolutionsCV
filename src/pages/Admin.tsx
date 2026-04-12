import React, { useState, useRef } from 'react';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { DownloadIcon, Loader2Icon, CheckCircleIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function Admin() {
  const [inputCode, setInputCode] = useState('');
  const [decodedData, setDecodedData] = useState<any>(null);
  const [isExporting, setIsExporting] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  // WhatsApp එකෙන් ආපු Code එක Decode කරලා දත්ත ගන්න එක
  const handleVerify = () => {
    try {
      // Message එකේ අන්තිම කෑල්ල විතරක් ගන්න (System Ref එක විතරක්)
      const codeToDecode = inputCode.includes('System Ref:') 
        ? inputCode.split('System Ref:')[1].trim() 
        : inputCode.trim();

      const jsonString = atob(codeToDecode); // Base64 decode
      const data = JSON.parse(jsonString);
      setDecodedData(data);
    } catch (error) {
      alert("Invalid Code! Please check the code again.");
      setDecodedData(null);
    }
  };

  const handleExportPDF = async () => {
    if (!cvRef.current) return;
    setIsExporting(true);

    try {
      const canvas = await html2canvas(cvRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Verified_CV_${decodedData?.n || 'User'}.pdf`);
    } catch (error) {
      console.error('PDF Error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-black text-gray-800 mb-6 border-b pb-4">
          Admin <span className="text-blue-600">Verification</span> Panel
        </h1>
        
        <div className="space-y-4">
          <p className="text-gray-600 font-medium text-sm">Paste the reference code from WhatsApp:</p>
          <textarea 
            className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all font-mono text-xs"
            placeholder="Example: eyJuIjogIlBUTHAgUGF0aGlyYW5hZ2UiLCAidCI6ICJ0ZW1wbGF0ZS0xIiwg..."
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
          
          <button 
            onClick={handleVerify}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Decode & Verify User
          </button>
        </div>

        {decodedData && (
          <div className="mt-10 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-6 bg-green-50 p-4 rounded-xl border border-green-200">
              <div>
                <p className="text-green-800 font-bold text-lg">User Verified: {decodedData.n}</p>
                <p className="text-green-600 text-sm">Template ID: {decodedData.t} | Date: {decodedData.date}</p>
              </div>
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 disabled:bg-gray-400"
              >
                {isExporting ? <Loader2Icon className="animate-spin" /> : <DownloadIcon size={18} />}
                {isExporting ? 'Generating...' : 'Download Verified PDF'}
              </button>
            </div>

            <div className="border shadow-inner bg-gray-100 p-4 rounded-xl overflow-auto max-h-[600px] flex justify-center">
               <div ref={cvRef} className="bg-white shadow-lg origin-top scale-75 sm:scale-100">
                  {/* මෙතනදී decodedData එක Template එකට දාන්න ඕනේ, එතකොටයි අදාළ කෙනාගේ CV එක පේන්නේ */}
                  <TemplateRenderer cvData={decodedData} scale={1} />
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
