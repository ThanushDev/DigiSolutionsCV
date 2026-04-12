import React, { useState } from 'react';
import { useCV } from '../context/CVContext';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { ChevronLeftIcon, SendIcon, XIcon, CameraIcon } from 'lucide-react';

export function CVPreview({ onBack }: { onBack: () => void }) {
  const { cvData } = useCV();
  const [showPayment, setShowPayment] = useState(false);
  const [slip, setSlip] = useState<string>('');

  const sendToWhatsApp = () => {
    const data = {
      n: cvData.personalInfo.name, fn: cvData.personalInfo.fullName, j: cvData.personalInfo.description,
      db: cvData.personalInfo.dateOfBirth, ni: cvData.personalInfo.nicNumber, rl: cvData.personalInfo.religion,
      cs: cvData.personalInfo.civilStatus, gn: cvData.personalInfo.gender, nt: cvData.personalInfo.nationality,
      t: cvData.selectedTemplate, p1: cvData.contact.phone1, p2: cvData.contact.phone2,
      e: cvData.contact.email, a: cvData.contact.address, s: cvData.skills, l: cvData.languages,
      ex: cvData.workExperience, ed: cvData.education, pq: cvData.professionalQualifications, r: cvData.references
    };
    const refCode = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    const msg = `*--- NEW CV ORDER ---*%0A*Name:* ${cvData.personalInfo.name}%0A*System Ref:* ${refCode}`;
    window.open(`https://wa.me/94764781212?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white p-4 shadow flex justify-between sticky top-0 z-50">
        <button onClick={onBack} className="flex items-center font-bold text-gray-500"><ChevronLeftIcon/> BACK</button>
        <button onClick={() => setShowPayment(true)} className="bg-blue-600 text-white px-8 py-2 rounded-full font-black">PAY & DOWNLOAD</button>
      </div>
      <div className="flex justify-center p-4">
        <div className="bg-white shadow-2xl" style={{ width: '210mm', minHeight: '297mm' }}>
          <TemplateRenderer cvData={cvData} />
        </div>
      </div>

      {showPayment && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full">
            <div className="flex justify-between mb-6">
              <h2 className="font-black italic uppercase">Bank Transfer</h2>
              <button onClick={() => setShowPayment(false)}><XIcon/></button>
            </div>
            <div className="bg-blue-50 p-6 rounded-2xl mb-6">
              <p className="font-bold">BOC - 91691764</p>
              <p>P.T.N. Pathiranage</p>
              <p className="text-2xl font-black mt-2">Rs. 100.00</p>
            </div>
            <label className="block p-8 border-2 border-dashed rounded-2xl text-center cursor-pointer mb-6">
              {slip ? <img src={slip} className="h-32 mx-auto" /> : <CameraIcon className="mx-auto text-gray-400"/>}
              <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                const f = e.target.files?.[0];
                if(f) { const r = new FileReader(); r.onloadend = () => setSlip(r.result as string); r.readAsDataURL(f); }
              }} />
            </label>
            <button disabled={!slip} onClick={sendToWhatsApp} className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold flex items-center justify-center gap-2">
              <SendIcon size={18}/> SEND WHATSAPP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
