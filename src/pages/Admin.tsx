import React, { useState } from 'react';
import { CVTemplateBase } from '../components/CVTemplates/CVTemplateBase';
import { SearchIcon, PrinterIcon } from 'lucide-react';

export function Admin() {
  const [inputCode, setInputCode] = useState('');
  const [decodedData, setDecodedData] = useState<any>(null);

  const handleVerify = () => {
    try {
      let raw = inputCode.includes('Ref Data:') 
        ? inputCode.split('Ref Data:')[1].trim() 
        : inputCode.trim();

      if (!raw) return alert("Please paste the code!");
      const data = JSON.parse(decodeURIComponent(escape(atob(raw))));
      setDecodedData(data);
    } catch (e) {
      alert("Invalid Code Format!");
      console.error(e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-8">
      {/* Print කරන කොට විතරක් පේන Style එකක් (CSS) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * { visibility: hidden; }
          #printable-area, #printable-area * { visibility: visible; }
          #printable-area { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 210mm; 
            height: 297mm;
            margin: 0;
            padding: 0;
          }
          .no-print { display: none !important; }
        }
      `}} />

      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 no-print">
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-[2rem] shadow-xl border">
            <h2 className="text-xl font-black uppercase mb-6 italic tracking-tighter text-zinc-900">Admin CV Decoder</h2>
            <textarea 
              value={inputCode} 
              onChange={e => setInputCode(e.target.value)} 
              placeholder="Paste the full WhatsApp message here..." 
              className="w-full h-64 p-4 border rounded-2xl text-[10px] font-mono bg-zinc-50 mb-4 focus:ring-2 focus:ring-black outline-none transition-all" 
            />
            <div className="flex flex-col gap-3">
              <button onClick={handleVerify} className="w-full py-4 bg-black text-white rounded-2xl font-black uppercase text-xs hover:bg-zinc-800 transition-all shadow-lg">
                Generate CV Preview
              </button>

              {decodedData && (
                <button 
                  onClick={handlePrint} 
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <PrinterIcon size={16}/> Print / Save as PDF
                </button>
              )}
            </div>
          </div>
          
          {decodedData?.paymentSlip && (
            <div className="mt-6 p-4 bg-white rounded-2xl border shadow-sm">
              <p className="text-[10px] font-black uppercase text-zinc-400 mb-2">Payment Slip</p>
              <a href={decodedData.paymentSlip} target="_blank" rel="noreferrer">
                <img src={decodedData.paymentSlip} alt="slip" className="w-full rounded-xl border hover:opacity-90 transition-opacity" />
              </a>
            </div>
          )}
        </div>

        <div className="lg:col-span-8 flex justify-center">
          {decodedData ? (
            <div id="printable-area" className="bg-white shadow-2xl rounded-sm overflow-hidden origin-top scale-[0.85] lg:scale-100">
              <CVTemplateBase cvData={decodedData} />
            </div>
          ) : (
            <div className="w-full h-[600px] border-4 border-dashed rounded-[3rem] flex flex-col items-center justify-center text-zinc-300 bg-white/50">
              <SearchIcon size={64} strokeWidth={1} />
              <p className="mt-4 font-black uppercase text-xs tracking-[0.2em]">Paste Data to View CV</p>
            </div>
          )}
        </div>
      </div>

      {/* Empty div for spacing when not in print */}
      {decodedData && <div className="hidden lg:block h-20"></div>}
    </div>
  );
}

export default Admin;
