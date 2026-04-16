import React, { useState } from 'react';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { SearchIcon, ClipboardPaste } from 'lucide-react';

export function Admin() {
  const [inputCode, setInputCode] = useState('');
  const [decodedData, setDecodedData] = useState<any>(null);

  const handleVerify = () => {
    try {
      // WhatsApp මැසේජ් එකෙන් Ref: කොටස සොයා ගැනීම
      let raw = inputCode.includes('Ref:') ? inputCode.split('Ref:')[1].trim() : inputCode.trim();
      const json = JSON.parse(decodeURIComponent(escape(atob(raw))));
      
      // Mapping short keys back to full keys
      const formatted = {
        personalInfo: { name: json.pi.n, fullName: json.pi.fn, description: json.pi.d, photo: json.pi.ph },
        contact: { email: json.c.e, phone1: json.c.p1, address: json.c.a },
        skills: json.sk,
        workExperience: json.we.map((w:any) => ({ title: w.t, company: w.c, duration: w.du, description: w.d })),
        education: json.ed,
        references: json.rf,
        selectedTemplate: json.t
      };
      setDecodedData(formatted);
    } catch (e) {
      alert("Invalid Code Format!");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-zinc-100">
            <h2 className="text-xl font-black uppercase italic mb-6">Admin Decoder</h2>
            <textarea value={inputCode} onChange={e => setInputCode(e.target.value)} placeholder="Paste WhatsApp Message Here..." className="w-full h-48 p-4 border rounded-2xl text-xs mb-4" />
            <button onClick={handleVerify} className="w-full py-4 bg-black text-white rounded-2xl font-black uppercase text-xs">Decode CV</button>
          </div>
        </div>
        <div className="lg:col-span-8 flex justify-center">
          {decodedData ? (
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-zinc-100 w-[210mm]">
              <TemplateRenderer cvData={decodedData} scale={1} />
            </div>
          ) : (
            <div className="w-full h-[600px] border-2 border-dashed rounded-[3rem] flex flex-col items-center justify-center text-zinc-400">
              <SearchIcon size={48} />
              <p className="mt-4 font-bold uppercase text-xs">No Data Loaded</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
