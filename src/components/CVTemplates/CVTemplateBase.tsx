import React from 'react';
import { CVData } from '../../types/cv';

export function CVTemplateBase({ cvData, scale = 1 }: { cvData: CVData; scale?: number }) {
  const primaryColor = cvData.customColor || '#2563eb';
  const brightness = cvData.brightness || 100;
  const photoClass = cvData.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-2xl';

  // --- 1. MODERN SIDEBAR (Based on SS 1 & 3) ---
  const Template1 = () => (
    <div className="flex min-h-[297mm] bg-white">
      <div style={{ backgroundColor: primaryColor }} className="w-[35%] p-8 text-white">
        <div className="flex justify-center mb-8">
          {cvData.personalInfo.photo && (
            <img src={cvData.personalInfo.photo} className={`w-36 h-36 object-cover border-4 border-white/30 shadow-lg ${photoClass}`} />
          )}
        </div>
        <div className="space-y-6">
          <section>
            <h3 className="text-[11px] font-black uppercase tracking-widest mb-4 border-b border-white/20 pb-1 italic">Contact</h3>
            <p className="text-[10px] mb-2">📞 {cvData.contact.phone1}</p>
            <p className="text-[10px] mb-2 break-all">✉️ {cvData.contact.email}</p>
            <p className="text-[10px] opacity-80">{cvData.contact.address}</p>
          </section>
          <section>
            <h3 className="text-[11px] font-black uppercase tracking-widest mb-4 border-b border-white/20 pb-1 italic">Personal Details</h3>
            <div className="space-y-2 text-[10px]">
              <p>Full Name: {cvData.personalInfo.fullName}</p>
              <p>NIC: {cvData.personalInfo.nicNumber}</p>
              <p>DOB: {cvData.personalInfo.dateOfBirth}</p>
              <p>Gender: {cvData.personalInfo.gender}</p>
            </div>
          </section>
          <section>
            <h3 className="text-[11px] font-black uppercase tracking-widest mb-4 border-b border-white/20 pb-1 italic">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((s, i) => (
                <span key={i} className="text-[9px] bg-black/20 px-2 py-1 rounded">● {s}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="w-[65%] p-10">
        <h1 className="text-4xl font-black uppercase tracking-tighter" style={{ color: primaryColor }}>{cvData.personalInfo.name}</h1>
        <div className="h-1 w-20 my-4" style={{ backgroundColor: primaryColor }}></div>
        <p className="text-[12px] text-zinc-600 mb-8 italic leading-relaxed">{cvData.personalInfo.description}</p>
        
        <h2 className="text-sm font-black uppercase tracking-widest mb-4 border-b pb-2">Experience</h2>
        {cvData.workExperience.map(exp => (
          <div key={exp.id} className="mb-4 border-l-2 pl-4" style={{ borderColor: primaryColor }}>
            <h4 className="font-bold text-sm uppercase">{exp.title}</h4>
            <p className="text-[10px] font-bold text-zinc-400">{exp.company} | {exp.duration}</p>
            <p className="text-[11px] mt-1 text-zinc-600">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // --- 2. RIBBON STYLE (Based on SS 5 & 6) ---
  const Template2 = () => (
    <div className="min-h-[297mm] bg-white p-10">
      <div className="flex items-center gap-8 mb-10 border-b-4 pb-8" style={{ borderColor: primaryColor }}>
        {cvData.personalInfo.photo && (
          <img src={cvData.personalInfo.photo} className={`w-32 h-32 object-cover border-4 ${photoClass}`} style={{ borderColor: primaryColor }} />
        )}
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tight" style={{ color: primaryColor }}>{cvData.personalInfo.name}</h1>
          <div className="bg-zinc-800 text-white px-4 py-1 mt-2 inline-block text-[10px] font-bold tracking-widest rounded-r-full">CURRICULUM VITAE</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2 space-y-8">
          <section>
            <h3 className="text-xs font-black uppercase mb-4 py-1 px-3 inline-block text-white" style={{ backgroundColor: primaryColor }}>Education</h3>
            <div className="space-y-4">
               <div className="border-l-2 pl-4" style={{ borderColor: primaryColor }}>
                 <p className="text-xs font-black">Advanced Level - {cvData.education.aLevel.year}</p>
                 <p className="text-[10px]">Index: {cvData.education.aLevel.indexNumber}</p>
               </div>
               <div className="border-l-2 pl-4" style={{ borderColor: primaryColor }}>
                 <p className="text-xs font-black">Ordinary Level - {cvData.education.oLevel.year}</p>
                 <p className="text-[10px]">Index: {cvData.education.oLevel.indexNumber}</p>
               </div>
            </div>
          </section>
        </div>
        <div className="bg-zinc-50 p-6 rounded-3xl h-fit border border-zinc-100">
          <h3 className="text-[11px] font-black uppercase mb-4" style={{ color: primaryColor }}>Contact Me</h3>
          <p className="text-[10px] mb-2">📞 {cvData.contact.phone1}</p>
          <p className="text-[10px] mb-2 break-all italic underline">{cvData.contact.email}</p>
          <h3 className="text-[11px] font-black uppercase mt-6 mb-4" style={{ color: primaryColor }}>Skills</h3>
          {cvData.skills.map((s, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between text-[9px] font-bold mb-1"><span>{s}</span><span>80%</span></div>
              <div className="w-full h-1 bg-zinc-200 rounded-full overflow-hidden">
                <div className="h-full" style={{ width: '80%', backgroundColor: primaryColor }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // --- 3. GRAY STRUCTURED (Based on SS 8) ---
  const Template3 = () => (
    <div className="min-h-[297mm] bg-white flex flex-col">
       <div className="h-10 w-full" style={{ backgroundColor: primaryColor }}></div>
       <div className="p-10 flex gap-10">
          <div className="w-[30%] space-y-8">
            <div className="flex flex-col items-center">
               <div className="p-2 border-2 border-dashed rounded-full mb-4" style={{ borderColor: primaryColor }}>
                 <img src={cvData.personalInfo.photo} className={`w-32 h-32 object-cover ${photoClass}`} />
               </div>
               <h2 className="text-sm font-black uppercase mb-1">{cvData.personalInfo.name}</h2>
               <p className="text-[9px] text-zinc-400 font-bold uppercase">Candidate</p>
            </div>
            <div className="space-y-4">
              <div className="bg-zinc-800 text-white p-3 rounded-xl text-center text-[10px] font-black uppercase">About Me</div>
              <p className="text-[10px] text-zinc-600 leading-relaxed text-center italic">{cvData.personalInfo.description}</p>
            </div>
          </div>
          <div className="w-[70%] border-l border-zinc-100 pl-10 space-y-10">
             <section>
               <h3 className="text-xs font-black uppercase mb-6 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }}></span> Work History
               </h3>
               {cvData.workExperience.map(exp => (
                 <div key={exp.id} className="mb-6">
                    <div className="flex justify-between font-bold text-xs"><span>{exp.title}</span><span style={{ color: primaryColor }}>{exp.duration}</span></div>
                    <p className="text-[10px] text-zinc-400 mb-2">{exp.company}</p>
                    <p className="text-[11px] text-zinc-600 leading-relaxed">{exp.description}</p>
                 </div>
               ))}
             </section>
          </div>
       </div>
    </div>
  );

  // Template select logic
  const renderTemplate = () => {
    switch (Number(cvData.selectedTemplate)) {
      case 1: return <Template1 />;
      case 2: return <Template2 />;
      case 3: return <Template3 />;
      // අනිත් ඒවාටත් මේ වගේම Template functions ඇතුළේ ලියන්න පුළුවන්
      default: return <Template1 />;
    }
  };

  return (
    <div 
      style={{ 
        width: '210mm', 
        minHeight: '297mm',
        filter: `brightness(${brightness}%)`,
        transform: `scale(${scale})`,
        transformOrigin: 'top center'
      }}
      className="bg-white shadow-2xl overflow-hidden"
    >
      {renderTemplate()}
    </div>
  );
}
