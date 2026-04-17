import React from 'react';
import { CVData } from '../../types/cv';

export function CVTemplateBase({ cvData, scale = 1 }: { cvData: CVData; scale?: number }) {
  const primaryColor = cvData.customColor || '#2563eb';
  const brightness = cvData.brightness || 100;
  // Photo shape logic
  const photoStyle = cvData.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-none';

  // --- Template 1: Modern Sidebar (Screenshot 1 & 3) ---
  const Template1 = () => (
    <div className="flex min-h-[297mm] bg-white text-zinc-800">
      <div style={{ backgroundColor: primaryColor }} className="w-[35%] p-8 text-white">
        <div className="flex justify-center mb-8">
          {cvData.personalInfo.photo && (
            <img src={cvData.personalInfo.photo} className={`w-36 h-36 object-cover border-4 border-white/20 shadow-lg ${photoStyle}`} />
          )}
        </div>
        <div className="space-y-6">
          <section>
            <h3 className="text-[11px] font-black uppercase tracking-widest mb-4 border-b border-white/20 pb-1">Contact</h3>
            <p className="text-[10px] mb-1">📞 {cvData.contact.phone1}</p>
            <p className="text-[10px] mb-1 break-all italic">✉️ {cvData.contact.email}</p>
            <p className="text-[10px] opacity-80 leading-relaxed">{cvData.contact.address}</p>
          </section>
          <section>
            <h3 className="text-[11px] font-black uppercase tracking-widest mb-4 border-b border-white/20 pb-1">Personal</h3>
            <div className="space-y-1 text-[9px] opacity-90 uppercase font-bold">
              <p>NIC: {cvData.personalInfo.nicNumber}</p>
              <p>DOB: {cvData.personalInfo.dateOfBirth}</p>
              <p>Gender: {cvData.personalInfo.gender}</p>
            </div>
          </section>
          <section>
            <h3 className="text-[11px] font-black uppercase tracking-widest mb-4 border-b border-white/20 pb-1">Skills</h3>
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
        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-1 mb-6">Professional Profile</p>
        <p className="text-[11px] leading-relaxed text-zinc-600 italic mb-10">"{cvData.personalInfo.description}"</p>
        <section className="mb-8">
          <h2 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-8 h-[2px]" style={{ backgroundColor: primaryColor }}></span> Experience
          </h2>
          {cvData.workExperience.map(exp => (
            <div key={exp.id} className="mb-4 border-l-2 pl-4" style={{ borderColor: primaryColor + '40' }}>
              <h4 className="font-black text-[11px] uppercase">{exp.title}</h4>
              <p className="text-[10px] font-bold opacity-60">{exp.company} | {exp.duration}</p>
              <p className="text-[10px] mt-1">{exp.description}</p>
            </div>
          ))}
        </section>
        <section>
          <h2 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-8 h-[2px]" style={{ backgroundColor: primaryColor }}></span> Education
          </h2>
          <div className="space-y-3 text-[10px]">
             <p className="font-bold">A/L - {cvData.education.aLevel.year} (Index: {cvData.education.aLevel.indexNumber})</p>
             <p className="font-bold">O/L - {cvData.education.oLevel.year} (Index: {cvData.education.oLevel.indexNumber})</p>
          </div>
        </section>
      </div>
    </div>
  );

  // --- Template 2: Ribbon Style (Screenshot 5 & 6) ---
  const Template2 = () => (
    <div className="min-h-[297mm] bg-white p-10">
      <div className="flex items-center gap-8 mb-10 border-b-8 pb-8" style={{ borderColor: primaryColor }}>
        {cvData.personalInfo.photo && (
          <img src={cvData.personalInfo.photo} className={`w-32 h-32 object-cover border-4 ${photoStyle}`} style={{ borderColor: primaryColor }} />
        )}
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter" style={{ color: primaryColor }}>{cvData.personalInfo.name}</h1>
          <div className="bg-zinc-800 text-white px-4 py-1 mt-2 inline-block text-[10px] font-black uppercase rounded-r-full">Curriculum Vitae</div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-8">
          <section className="mb-8">
            <h3 className="text-xs font-black uppercase mb-4 py-1 px-3 inline-block text-white" style={{ backgroundColor: primaryColor }}>Experience</h3>
            {cvData.workExperience.map(exp => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between font-black text-[11px]"><span>{exp.title}</span><span className="text-zinc-400">{exp.duration}</span></div>
                <p className="text-[10px] font-bold uppercase mb-1" style={{ color: primaryColor }}>{exp.company}</p>
                <p className="text-[10px] text-zinc-600">{exp.description}</p>
              </div>
            ))}
          </section>
        </div>
        <div className="col-span-4 space-y-6">
           <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-100">
             <h4 className="text-[10px] font-black uppercase mb-3" style={{ color: primaryColor }}>Contact</h4>
             <p className="text-[9px] mb-1 font-bold">{cvData.contact.phone1}</p>
             <p className="text-[9px] break-all">{cvData.contact.email}</p>
           </div>
           <div>
             <h4 className="text-[10px] font-black uppercase mb-3 border-b-2 pb-1" style={{ borderColor: primaryColor }}>Skills</h4>
             {cvData.skills.map((s, i) => (
               <div key={i} className="mb-2">
                 <p className="text-[9px] font-bold uppercase mb-1">{s}</p>
                 <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
                   <div className="h-full" style={{ width: '80%', backgroundColor: primaryColor }}></div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      style={{ 
        width: '210mm', 
        minHeight: '297mm',
        filter: `brightness(${brightness}%)`,
        transform: `scale(${scale})`,
        transformOrigin: 'top center'
      }}
      className="bg-white shadow-2xl overflow-hidden mx-auto"
    >
      {Number(cvData.selectedTemplate) === 1 ? <Template1 /> : <Template2 />}
    </div>
  );
}
