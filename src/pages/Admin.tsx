import React, { useState } from 'react';
import { CVTemplateBase } from '../components/CVTemplates/CVTemplateBase';
import { SearchIcon, PrinterIcon } from 'lucide-react';

export function Admin() {
  const [inputCode, setInputCode] = useState('');
  const [decodedData, setDecodedData] = useState<any>(null);

  const handleVerify = () => {
    try {
      let raw = inputCode.includes('Ref Data:') ? inputCode.split('Ref Data:')[1].trim() : inputCode.trim();
      if (!raw) return alert("Please paste the code!");

      // Decode Base64
      const data = JSON.parse(decodeURIComponent(escape(atob(raw))));
      
      // WhatsApp එකෙන් එන පොඩි අකුරු (ds) ඇත්ත property (showDS) එකට හරවනවා
      if (data.ds === 1) data.showDS = true;
      if (data.ds === 0) data.showDS = false;

      setDecodedData(data);
    } catch (e) {
      alert("Invalid Code Format!");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-8">
      <style dangerouslySetInnerHTML={{ __html: `
        @page { size: auto; margin: 0; }
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0 !important; }
          #printable-area { position: absolute; left: 0; top: 0; width: 100% !important; transform: none !important; visibility: visible !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}} />

      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 no-print">
          <div className="bg-white p-6 rounded-[2rem] shadow-xl border">
            <h2 className="text-xl font-black uppercase mb-6 italic italic">Admin CV Decoder</h2>
            <textarea value={inputCode} onChange={e => setInputCode(e.target.value)} placeholder="Paste WhatsApp message here..." className="w-full h-64 p-4 border rounded-2xl text-[10px] font-mono bg-zinc-50 mb-4 outline-none focus:ring-2 focus:ring-black" />
            <button onClick={handleVerify} className="w-full py-4 bg-black text-white rounded-2xl font-black uppercase text-xs mb-3">Generate Preview</button>
            {decodedData && (
              <button onClick={() => window.print()} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-2"><PrinterIcon size={16}/> Download PDF</button>
            )}
          </div>
        </div>

        <div className="lg:col-span-8 flex justify-center items-start">
          {decodedData ? (
            <div id="printable-area" className="bg-white shadow-2xl origin-top scale-[0.85] lg:scale-100">
              <CVTemplateBase cvData={decodedData} />
            </div>
          ) : (
            <div className="w-full h-[600px] border-4 border-dashed rounded-[3rem] flex flex-col items-center justify-center text-zinc-300 bg-white/50 no-print">
              <SearchIcon size={64} strokeWidth={1} />
              <p className="mt-4 font-black uppercase text-xs">Paste Data to View</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Admin;
