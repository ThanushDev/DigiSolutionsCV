import React, { useState } from 'react';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { SearchIcon, ClipboardPaste, Trash2, Download } from 'lucide-react';

export function Admin() {
  const [inputCode, setInputCode] = useState('');
  const [decodedData, setDecodedData] = useState<any>(null);

  const handleVerify = () => {
    try {
      // 1. WhatsApp මැසේජ් එකෙන් Ref Data කොටස වෙන් කරගැනීම
      let raw = "";
      if (inputCode.includes('Ref Data:')) {
        raw = inputCode.split('Ref Data:')[1].trim();
      } else {
        raw = inputCode.trim();
      }

      // 2. Base64 Decode කිරීම
      const json = JSON.parse(decodeURIComponent(escape(atob(raw))));
      
      console.log("Admin Decoded:", json);

      // 3. Data Mapping (Full keys වලට convert කිරීම)
      // CVPreview එකෙන් එවන format එකටම මෙතන structure එක හැදුවා
      const formatted = {
        ...json,
        // සමහර වෙලාවට profileImage එක පරණ තැනක තිබ්බොත් ඒකත් ගන්නවා
        personalInfo: {
          ...json.personalInfo,
          photo: json.personalInfo?.photo || json.profileImage || ''
        }
      };

      setDecodedData(formatted);
    } catch (e) {
      console.error("Decode Error:", e);
      alert("Invalid Code Format! කරුණාකර සම්පූර්ණ මැසේජ් එකම Paste කරන්න.");
    }
  };

  const clearData = () => {
    setDecodedData(null);
    setInputCode('');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Input Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-zinc-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black uppercase italic tracking-tighter text-zinc-900">
                Admin <span className="text-blue-600">Decoder</span>
              </h2>
              {decodedData && (
                <button onClick={clearData} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
                  <Trash2 size={20} />
                </button>
              )}
            </div>

            <div className="relative group">
              <textarea 
                value={inputCode} 
                onChange={e => setInputCode(e.target.value)} 
                placeholder="Paste the full WhatsApp message here..." 
                className="w-full h-64 p-5 border-2 border-zinc-100 rounded-[1.5rem] text-[11px] font-mono mb-4 focus:border-blue-500 focus:outline-none transition-all resize-none bg-zinc-50" 
              />
              {inputCode === '' && (
                <div className="absolute top-5 left-5 pointer-events-none opacity-20">
                  <ClipboardPaste size={40} />
                </div>
              )}
            </div>

            <button 
              onClick={handleVerify} 
              className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-zinc-200"
            >
              Generate Preview
            </button>
          </div>

          {/* Quick Info Card */}
          {decodedData && (
            <div className="bg-blue-600 rounded-[2rem] p-6 text-white shadow-xl animate-in slide-in-from-left duration-500">
              <p className="text-[10px] font-black uppercase opacity-60 mb-2">Customer Name</p>
              <p className="text-lg font-bold mb-4">{decodedData.personalInfo?.name || 'Unknown'}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] font-black uppercase opacity-60">Template ID</p>
                  <p className="text-sm font-bold">#{decodedData.selectedTemplate || '1'}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase opacity-60">Color Hex</p>
                  <p className="text-sm font-bold uppercase">{decodedData.customColor || '#Default'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Preview Panel */}
        <div className="lg:col-span-8 flex flex-col items-center">
          {decodedData ? (
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center px-6">
                <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Live CV Preview</span>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full text-[10px] font-black uppercase shadow-sm hover:bg-zinc-50">
                    <Download size={14} /> Download PDF
                  </button>
                </div>
              </div>
              
              {/* Paper Background Container */}
              <div className="bg-zinc-200 p-1 md:p-10 rounded-[3rem] shadow-inner overflow-hidden flex justify-center border-4 border-white">
                 <div className="bg-white shadow-2xl origin-top transform scale-[0.9] md:scale-100">
                    <TemplateRenderer cvData={decodedData} scale={1} />
                 </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-[700px] border-4 border-dashed border-zinc-200 rounded-[4rem] flex flex-col items-center justify-center text-zinc-300 bg-white">
              <div className="p-8 bg-zinc-50 rounded-full mb-4">
                <SearchIcon size={60} strokeWidth={1} />
              </div>
              <p className="font-black uppercase text-[11px] tracking-[0.3em]">Waiting for Data</p>
              <p className="text-[10px] mt-2 opacity-60">Paste the reference code to decode the CV</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
