import React, { useState } from 'react';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
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

      // Base64 Decode
      const json = JSON.parse(decodeURIComponent(escape(atob(raw))));
      
      // දත්ත වල කිසිදු Keys එකක් වෙනස් නොකර කෙලින්ම TemplateRenderer එකට ලබා දීම
      // Safety checks පමණක් සිදු කරයි
      const formatted = {
        ...json,
        personalInfo: {
          ...json.personalInfo,
          photo: json.personalInfo?.photo || ""
        },
        skills: Array.isArray(json.skills) ? json.skills : [],
        experience: Array.isArray(json.experience) ? json.experience : [],
        education: Array.isArray(json.education) ? json.education : []
      };

      setDecodedData(formatted);
    } catch (e) {
      alert("Invalid Code Format!");
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-[2rem] shadow-xl border">
            <h2 className="text-xl font-black uppercase mb-6 italic">Admin Decoder</h2>
            <textarea 
              value={inputCode} 
              onChange={e => setInputCode(e.target.value)} 
              placeholder="Paste WhatsApp Message..." 
              className="w-full h-48 p-4 border rounded-2xl text-[11px] font-mono mb-4 bg-zinc-50" 
            />
            <button onClick={handleVerify} className="w-full py-4 bg-black text-white rounded-2xl font-black uppercase text-xs hover:bg-blue-600 transition-all">
              Decode & Preview
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 flex justify-center">
          {decodedData ? (
            <div className="bg-white p-4 md:p-10 rounded-[2rem] shadow-2xl border w-full overflow-auto">
              <TemplateRenderer cvData={decodedData} />
            </div>
          ) : (
            <div className="w-full h-[500px] border-2 border-dashed rounded-[3rem] flex flex-col items-center justify-center text-zinc-300">
              <SearchIcon size={48} />
              <p className="mt-4 font-black uppercase text-[10px] tracking-widest">Waiting for Data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
