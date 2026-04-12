import React, { useState, useRef } from 'react';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { DownloadIcon, Loader2Icon, ShieldCheckIcon, AlertTriangleIcon } from 'lucide-react';
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

      // ඉතාමත් වැදගත්: Template එක crash නොවී තිබීමට අවශ්‍ය කරන 
      // සියලුම "Key Names" මෙතනදී අපි සකස් කරනවා.
      const mappedData = {
        personalInfo: {
          fullName: data.n || '',
          email: data.e || '',
          // Template එක phone1 ඉල්ලන නිසා අපි මේ Keys දෙකම දාමු
          phone1: data.p || '', 
          phone2: data.p2 || '',
          phone: data.p || '', 
          address: data.a || '',
          jobTitle: data.j || '',
          linkedin: data.l || '',
          website: data.w || '',
        },
        experience: data.ex || [],
        education: data.ed || [],
        skills: data.s || [],
        // Template ID එක අංකයක් ද අකුරක් ද කියලා චෙක් කරනවා
        templateId: data.t ? (data.t.toString().includes('template') ? data.t : `template-${data.t}`) : 'template-1'
      };

      console.log("Verified & Mapped Data:", mappedData);
      setDecodedData(mappedData);
    } catch (error) {
      console.error("Critical Decode Error:", error);
      alert("Invalid Code! Please make sure you copied the entire system reference.");
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
      alert("PDF generation failed.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200">
        <div className="bg-slate-900 p-6 text-white flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <ShieldCheckIcon size={24} className="text-white" />
            </div>
            <h1 className="font-black text-lg tracking-tight uppercase">Digi Solutions Admin</h1>
          </div>
          {decodedData && (
            <button 
              onClick={handleExportPDF}
              disabled={isExporting}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95"
            >
              {isExporting ? <Loader2Icon className="animate-spin" size={18} /> : <DownloadIcon size={18} />}
              {isExporting ? 'EXPORTING...' : 'DOWNLOAD PDF'}
            </button>
          )}
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 block">WhatsApp System Reference</label>
            <textarea 
              className="w-full h-32 p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-mono text-xs focus:border-blue-500 focus:bg-white outline-none transition-all"
              placeholder="Paste code here..."
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
            />
            <button 
              onClick={handleVerify}
              className="mt-3 w-full bg-slate-900 text-white py-4 rounded-2xl font-black tracking-widest hover:bg-black transition-all shadow-xl active:scale-[0.98]"
            >
              VERIFY & PREVIEW CV
            </button>
          </div>

          {decodedData ? (
            <div className="mt-8 space-y-6">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-blue-900 font-bold text-sm">Now Rendering: {decodedData.personalInfo.fullName}</span>
              </div>

              {/* CV Rendering Area */}
              <div className="bg-slate-200 rounded-3xl p-4 sm:p-10 flex justify-center overflow-hidden min-h-[600px] border-4 border-white shadow-inner">
                <div ref={cvRef} className="bg-white shadow-2xl origin-top scale-[0.55] sm:scale-100 transition-transform duration-500">
                  <TemplateRenderer cvData={decodedData} scale={1} />
                </div>
              </div>
            </div>
          ) : (
            <div className="py-24 text-center border-2 border-dashed border-slate-200 rounded-3xl">
              <AlertTriangleIcon className="mx-auto mb-4 text-slate-200" size={64} />
              <p className="text-slate-400 font-medium">Please enter a valid reference code to begin verification.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
