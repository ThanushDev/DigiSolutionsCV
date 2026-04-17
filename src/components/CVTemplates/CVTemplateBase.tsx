import React from 'react';
import { CVData } from '../../types/cv';

export function CVTemplateBase({ cvData, scale = 1 }: { cvData: CVData; scale?: number }) {
  const primaryColor = cvData.customColor || '#2563eb';
  const brightness = cvData.brightness || 100;
  const photoStyle = cvData.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-none';

  // --- Layout 1: Dark Sidebar (Screenshot 142317) ---
  const Layout1 = () => (
    <div className="flex min-h-[297mm] bg-white">
      <div style={{ backgroundColor: '#2c3e50' }} className="w-[35%] p-8 text-white">
        <div className="flex justify-center mb-8">
          <img src={cvData.personalInfo.photo} className={`w-36 h-36 object-cover border-4 border-yellow-500 shadow-xl ${photoStyle}`} />
        </div>
        <div className="space-y-6 text-[10px] uppercase font-bold">
          <section><h3 className="border-b border-white/20 pb-1 mb-3 italic">Personal Details</h3>
            <p className="normal-case font-normal mb-1">Full Name: {cvData.personalInfo.fullName}</p>
            <p>NIC: {cvData.personalInfo.nicNumber}</p><p>DOB: {cvData.personalInfo.dateOfBirth}</p>
            <p>Religion: {cvData.personalInfo.religion}</p>
          </section>
          <section><h3 className="border-b border-white/20 pb-1 mb-3 italic">Contact</h3>
            <p>📞 {cvData.contact.phone1}</p><p className="lowercase italic underline break-all">{cvData.contact.email}</p>
            <p className="normal-case opacity-70">📍 {cvData.contact.address}</p>
          </section>
          <section><h3 className="border-b border-white/20 pb-1 mb-3 italic">Skills</h3>
            {cvData.skills.map(s => <p key={s} className="bg-black/20 px-2 py-1 mb-1 rounded">{s}</p>)}
          </section>
        </div>
      </div>
      <div className="w-[65%] p-10">
        <h1 className="text-4xl font-black uppercase" style={{ color: primaryColor }}>{cvData.personalInfo.name}</h1>
        <p className="text-[11px] text-zinc-600 my-4 leading-relaxed italic border-l-4 pl-4" style={{ borderColor: primaryColor }}>"{cvData.personalInfo.description}"</p>
        <section className="mt-8">
          <h2 className="text-sm font-black uppercase border-b-2 pb-1 mb-4" style={{ borderColor: primaryColor }}>Education</h2>
          <div className="space-y-4 text-[11px]">
             <div className="font-bold">A/L - {cvData.education.aLevel.year} (Index: {cvData.education.aLevel.indexNumber})</div>
             <div className="font-bold">O/L - {cvData.education.oLevel.year} (Index: {cvData.education.oLevel.indexNumber})</div>
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-sm font-black uppercase border-b-2 pb-1 mb-4" style={{ borderColor: primaryColor }}>Experience</h2>
          {cvData.workExperience.map(exp => (
            <div key={exp.id} className="mb-4 border-l-2 pl-4" style={{ borderColor: primaryColor + '40' }}>
              <h4 className="font-bold text-xs uppercase">{exp.title}</h4>
              <p className="text-[10px] opacity-60 font-bold">{exp.company} | {exp.duration}</p>
              <p className="text-[11px] mt-1 text-zinc-600">{exp.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );

  // --- Layout 2: Steven Terry Style (Screenshot 093918) ---
  const Layout2 = () => (
    <div className="min-h-[297mm] bg-white flex flex-col">
      <div className="flex h-44">
        <div className="w-[35%] bg-zinc-800 text-white flex flex-col justify-center px-8">
          <h1 className="text-3xl font-black uppercase">{cvData.personalInfo.name}</h1>
          <div className="h-1 w-12 bg-white mt-2"></div>
        </div>
        <div className="flex-1 flex items-center justify-between px-10" style={{ backgroundColor: primaryColor + '10' }}>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: primaryColor }}>Professional Profile</p>
          <img src={cvData.personalInfo.photo} className={`w-36 h-36 object-cover border-4 border-white shadow-lg ${photoStyle}`} />
        </div>
      </div>
      <div className="flex flex-1">
        <div className="w-[35%] bg-zinc-800 text-white p-8 space-y-8">
          <section><h4 className="text-[10px] font-black uppercase border-b border-white/20 pb-1 mb-4">Personal</h4>
            <div className="text-[10px] space-y-3 opacity-80 uppercase font-bold">
              <p>NIC: {cvData.personalInfo.nicNumber}</p><p>DOB: {cvData.personalInfo.dateOfBirth}</p><p>Gender: {cvData.personalInfo.gender}</p>
            </div>
          </section>
          <section><h4 className="text-[10px] font-black uppercase border-b border-white/20 pb-1 mb-4">Skills</h4>
            {cvData.skills.map(s => <div key={s} className="mb-2 uppercase text-[9px] font-bold">{s}<div className="h-1 bg-white/10 mt-1"><div className="h-full" style={{ width: '80%', backgroundColor: primaryColor }}></div></div></div>)}
          </section>
        </div>
        <div className="flex-1 p-10 space-y-10">
          <section><h2 className="text-sm font-black uppercase border-b-2 pb-1" style={{ borderColor: primaryColor }}>Objective</h2><p className="text-[11px] text-zinc-600 italic mt-4">{cvData.personalInfo.description}</p></section>
          <section><h2 className="text-sm font-black uppercase border-b-2 pb-1" style={{ borderColor: primaryColor }}>References</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {cvData.references.map((r, i) => (
                <div key={i} className="text-[10px] font-bold uppercase">
                  <p className="text-zinc-800">{r.name}</p><p className="opacity-50">{r.designation}</p><p style={{ color: primaryColor }}>{r.phone}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  // --- Layout 3: Ribbon & Table Style (Screenshot 094123 & 094203) ---
  const Layout3 = () => (
    <div className="min-h-[297mm] bg-white flex flex-col p-10">
      <div className="flex items-center gap-10 border-b-8 pb-8" style={{ borderColor: primaryColor }}>
        <img src={cvData.personalInfo.photo} className={`w-40 h-40 object-cover border-4 ${photoStyle}`} style={{ borderColor: primaryColor }} />
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter" style={{ color: primaryColor }}>{cvData.personalInfo.name}</h1>
          <div className="mt-2 bg-zinc-800 text-white px-4 py-1 text-[10px] font-black uppercase rounded-r-full">Curriculum Vitae</div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-10 mt-10">
        <div className="col-span-8 space-y-10">
          <section><h3 className="text-xs font-black uppercase mb-4 py-1 px-3 text-white inline-block" style={{ backgroundColor: primaryColor }}>Experience</h3>
            {cvData.workExperience.map(exp => (
              <div key={exp.id} className="mb-6 pl-4 border-l-2" style={{ borderColor: primaryColor }}>
                <p className="font-black text-xs uppercase">{exp.title}</p>
                <p className="text-[10px] font-bold uppercase" style={{ color: primaryColor }}>{exp.company} | {exp.duration}</p>
                <p className="text-[11px] text-zinc-500 mt-2">{exp.description}</p>
              </div>
            ))}
          </section>
          <section><h3 className="text-xs font-black uppercase mb-4 py-1 px-3 text-white inline-block" style={{ backgroundColor: primaryColor }}>Education</h3>
            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 space-y-3">
              <p className="text-[11px] font-black">A/L EXAM: {cvData.education.aLevel.year} | INDEX: {cvData.education.aLevel.indexNumber}</p>
              <p className="text-[11px] font-black">O/L EXAM: {cvData.education.oLevel.year} | INDEX: {cvData.education.oLevel.indexNumber}</p>
            </div>
          </section>
        </div>
        <div className="col-span-4 space-y-8">
          <section><h4 className="text-[10px] font-black uppercase mb-3 border-b-2 pb-1" style={{ borderColor: primaryColor }}>Personal Data</h4>
            <div className="text-[9px] space-y-3 font-bold uppercase text-zinc-500">
              <p>Full Name: <span className="text-zinc-800 block">{cvData.personalInfo.fullName}</span></p>
              <p>NIC: <span className="text-zinc-800">{cvData.personalInfo.nicNumber}</span></p>
              <p>Nationality: <span className="text-zinc-800">{cvData.personalInfo.nationality}</span></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  // Template Switching Logic for all 8 Screenshots
  const renderTemplate = () => {
    switch (Number(cvData.selectedTemplate)) {
      case 1: return <Layout1 />;
      case 2: return <Layout1 />; 
      case 3: return <Layout2 />;
      case 4: return <Layout2 />;
      case 5: return <Layout3 />;
      case 6: return <Layout3 />;
      case 7: return <Layout3 />;
      case 8: return <Layout1 />;
      default: return <Layout1 />;
    }
  };

  return (
    <div 
      style={{ 
        width: '210mm', minHeight: '297mm',
        filter: `brightness(${brightness}%)`,
        transform: `scale(${scale})`,
        transformOrigin: 'top center'
      }}
      className="bg-white shadow-2xl overflow-hidden mx-auto print:shadow-none"
    >
      {renderTemplate()}
    </div>
  );
}
