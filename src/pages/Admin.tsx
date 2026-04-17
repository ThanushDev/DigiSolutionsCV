import React, { useState } from 'react';
import { CVTemplateBase } from '../components/CVTemplates/CVTemplateBase';
import { SearchIcon } from 'lucide-react';

export function Admin() {
  const [inputCode, setInputCode] = useState('');
  const [decodedData, setDecodedData] = useState<any>(null);

  const handleVerify = () => {
    try {
      let raw = inputCode.includes('Ref Data:') 
        ? inputCode.split('Ref Data:')[1].trim() 
        : inputCode.trim();

      if (!raw) return alert("Please paste the code!");

      // Decode Full JSON
      const data = JSON.parse(decodeURIComponent(escape(atob(raw))));
      
      // දත්ත එලෙසම ලබා දීම (Full Object mapping)
      setDecodedData(data);
    } catch (e) {
      alert("Invalid Code Format!");
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-8">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-[2rem] shadow-xl border">
            <h2 className="text-xl font-black uppercase mb-6 italic tracking-tighter">Admin CV Decoder</h2>
            <textarea 
              value={inputCode} 
              onChange={e => setInputCode(e.target.value)} 
              placeholder="Paste the full WhatsApp message here..." 
              className="w-full h-64 p-4 border rounded-2xl text-[10px] font-mono bg-zinc-50 mb-4 focus:ring-2 focus:ring-black outline-none transition-all" 
            />
            <button onClick={handleVerify} className="w-full py-4 bg-black text-white rounded-2xl font-black uppercase text-xs hover:bg-zinc-800 transition-all shadow-lg">
              Generate CV Preview
            </button>
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
            <div className="bg-white shadow-2xl rounded-sm overflow-hidden origin-top scale-[0.85] lg:scale-100">
              {/* User භාවිතා කරන සැබෑ Template එකම මෙහිදී Admin ට පෙන්වයි */}
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
    </div>
  );
}

export default Admin;
