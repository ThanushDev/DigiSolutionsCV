import React, { useState, useRef } from 'react';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { DownloadIcon, Loader2Icon, ShieldCheckIcon, AlertTriangleIcon, RefreshCwIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function Admin() {
  const [inputCode, setInputCode] = useState('');
  const [decodedData, setDecodedData] = useState<any>(null);
  const [isExporting, setIsExporting] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  const handleVerify = () => {
    try {
      if (!inputCode.trim()) return;

      let rawCode = inputCode;
      if (inputCode.includes('System Ref:')) {
        rawCode = inputCode.split('System Ref:')[1];
      }

      const cleanCode = rawCode.trim().replace(/\s/g, '');
      const jsonString = atob(cleanCode);
      const data = JSON.parse(jsonString);

      // Template එකට අවශ්‍ය කරන විදිහට දත්ත ටික ලස්සනට සකස් කරනවා
      const finalData = {
        personalInfo: {
          fullName: data.n || 'N/A',
          email: data.e || '',
          phone1: data.p || '',
          phone2: data.p2 || '',
          phone: data.p || '', // සමහර තැන්වල 'phone' ලෙස තිබිය හැක
          address: data.a || '',
          jobTitle: data.j || '',
          linkedin: data.l || '',
          website: data.w || '',
        },
        experience: Array.isArray(data.ex) ? data.ex : [],
        education: Array.isArray(data.ed) ? data.ed : [],
        skills: Array.isArray(data.s) ? data.s : [],
        templateId: data.t ? (data.t.toString().includes('template') ? data.t : `template-${data.t}`) : 'template-1'
      };

      console.log("Verified Data:", finalData);
      setDecodedData(finalData);
    } catch (error) {
      console.error("Decode Error:", error);
      alert("Invalid Reference Code! Please check again.");
    }
  };

  const handleExportPDF = async () => {
    if (!cvRef.current) return;
    setIsExporting(true);
    try {
      // PDF එකේ Quality එක වැඩි කරන්න Scale 2 දානවා
      const canvas = await html2canvas(cvRef.current, { 
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`DigiSolutions_CV_${decodedData?.personalInfo?.fullName?.replace(/\s+/g, '_')}.pdf`);
    } catch (e) {
      console.error("PDF Export Error:", e);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="bg-zinc-900 rounded-3xl p-6 mb-8 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl border border-zinc-800 gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/20 p-3 rounded-2xl">
              <ShieldCheckIcon className="text-blue-400" size={32} />
            </div>
            <div>
              <h1 className="font-black tracking-tighter text-2xl italic leading-none">DIGI SOLUTIONS</h1>
              <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] mt-1 font-bold">Admin Verification Portal</p>
            </div>
          </div>
          
          {decodedData && (
            <div className="flex gap-2">
              <button 
                onClick={() => { setDecodedData(null); setInputCode(''); }}
                className="bg-zinc-800 text-zinc-400 p-3 rounded-2xl hover:text-white transition-colors"
              >
                <RefreshCwIcon size={20} />
              </button>
              <button 
                onClick={handleExportPDF}
                disabled={isExporting}
                className="bg-white text-black px-8 py-3 rounded-2xl font-black text-sm hover:bg-blue-400 transition-all flex items-center gap-3 shadow-lg active:scale-95 disabled:opacity-50"
              >
                {isExporting ? <Loader2Icon className="animate-spin" size={18} /> : <DownloadIcon size={18} />}
                {isExporting ? 'GENERATING...' : 'SAVE TO PDF'}
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side: Input */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border border-zinc-100">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3 block ml-2">Reference Code</label>
              <textarea 
                className="w-full h-48 p-5 bg-zinc-50 border-2 border-zinc-100 rounded-[2rem] mb-4 font-mono text-[11px] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
                placeholder="Paste the system reference code here..."
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
              <button 
                onClick={handleVerify}
                className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95"
              >
                VERIFY & RENDER
              </button>
            </div>

            {decodedData && (
              <div className="bg-blue-50 rounded-[2rem] p-6 border border-blue-100 animate-in slide-in-from-left duration-500">
                <h3 className="text-blue-900 font-bold mb-1 italic">Verified Content</h3>
                <p className="text-blue-700 text-sm">Everything looks good. You can now preview and download the CV.</p>
              </div>
            )}
          </div>

          {/* Right Side: Preview */}
          <div className="lg:col-span-8">
            {decodedData ? (
              <div className="flex flex-col items-center animate-in fade-in zoom-in duration-700">
                {/* CV Preview Area */}
                <div className="bg-zinc-200 rounded-[3rem] p-4 md:p-10 w-full flex justify-center border-4 border-white shadow-inner overflow-auto max-h-[80vh]">
                  <div 
                    ref={cvRef} 
                    className="bg-white shadow-2xl origin-top" 
                    style={{ width: '210mm', minHeight: '297mm' }}
                  >
                    {/* මෙතනදී data සහ cvData කියන props දෙකම pass කරනවා blank වෙන එක නවත්තන්න */}
                    <TemplateRenderer 
                      cvData={decodedData} 
                      data={decodedData} 
                      scale={1} 
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[400px] bg-white rounded-[3rem] border-4 border-dashed border-zinc-100 flex flex-col items-center justify-center text-zinc-300">
                <AlertTriangleIcon size={64} className="mb-4 opacity-20" />
                <p className="font-black text-xs uppercase tracking-[0.3em] opacity-40">Awaiting Valid Data</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
