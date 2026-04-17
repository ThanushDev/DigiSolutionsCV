import React from 'react';
import { CVData } from '../../types/cv';

export function CVTemplateBase({ cvData, scale = 1 }: { cvData: CVData; scale?: number }) {
  const primaryColor = cvData.customColor || '#2563eb';
  const brightness = cvData.brightness || 100;
  const photoStyle = cvData.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-none';

  // --- Layout 1 & 2: Sidebar Styles (Screenshot 142317) ---
  const SidebarLayout = () => (
    <div className="flex min-h-[297mm] bg-white text-[11px]">
      <div style={{ backgroundColor: '#2c3e50' }} className="w-[33%] p-8 text-white">
        <div className="flex justify-center mb-8">
          <img src={cvData.personalInfo.photo} className={`w-36 h-36 object-cover border-4 border-yellow-500 shadow-xl ${photoStyle}`} />
        </div>
        <div className="space-y-6 uppercase font-bold">
          <section><h3 className="border-b border-white/20 pb-1 mb-3 italic">Personal</h3>
            <div className="space-y-1 normal-case font-medium opacity-90">
              <p>Full Name: {cvData.personalInfo.fullName}</p>
              <p>NIC: {cvData.personalInfo.nicNumber}</p>
              <p>DOB: {cvData.personalInfo.dateOfBirth}</p>
              <p>Gender: {cvData.personalInfo.gender}</p>
              <p>Religion: {cvData.personalInfo.religion}</p>
            </div>
          </section>
          <section><h3 className="border-b border-white/20 pb-1 mb-3 italic">Contact</h3>
            <p>📞 {cvData.contact.phone1}</p>
            <p className="lowercase italic underline break-all">{cvData.contact.email}</p>
            <p className="normal-case opacity-80 italic">{cvData.contact.address}</p>
          </section>
          <section><h3 className="border-b border-white/20 pb-1 mb-3 italic">Skills</h3>
            {cvData.skills.map(s => <p key={s} className="mb-1">✓ {s}</p>)}
          </section>
        </div>
      </div>
      <div className="w-[67%] p-10">
        <h1 className="text-4xl font-black uppercase tracking-tighter" style={{ color: primaryColor }}>{cvData.personalInfo.name}</h1>
        <p className="text-zinc-500 italic my-4 leading-relaxed border-l-4 pl-4" style={{ borderColor: primaryColor }}>{cvData.personalInfo.description}</p>
        
        <section className="mt-8"><h2 className="text-sm font-black uppercase border-b-2 pb-1 mb-4" style={{ borderColor: primaryColor }}>Education</h2>
          <div className="space-y-4">
            <div className="p-3 bg-zinc-50 rounded-lg">
              <p className="font-black uppercase mb-2">A/L Examination - {cvData.education.aLevel.year} (Index: {cvData.education.aLevel.indexNumber})</p>
              <table className="w-full border-collapse">
                {cvData.education.aLevel.subjects.map((s, i) => (
                  <tr key={i} className="border-b border-zinc-200"><td className="py-1">{s.name}</td><td className="py-1 font-bold text-right">{s.grade}</td></tr>
                ))}
              </table>
            </div>
          </div>
        </section>

        <section className="mt-8"><h2 className="text-sm font-black uppercase border-b-2 pb-1 mb-4" style={{ borderColor: primaryColor }}>Experience</h2>
          {cvData.workExperience.map(exp => (
            <div key={exp.id} className="mb-4 border-l-2 pl-4" style={{ borderColor: primaryColor }}>
              <h4 className="font-bold text-xs uppercase">{exp.title}</h4>
              <p className="text-[10px] opacity-60 font-bold">{exp.company} | {exp.duration}</p>
              <p className="text-zinc-600 mt-1 italic">{exp.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-8"><h2 className="text-sm font-black uppercase border-b-2 pb-1 mb-4" style={{ borderColor: primaryColor }}>References</h2>
          <div className="grid grid-cols-2 gap-4">
            {cvData.references.map((r, i) => (
              <div key={i} className="text-[10px] font-bold uppercase border p-2">
                <p>{r.name}</p><p className="opacity-50">{r.designation}</p><p style={{ color: primaryColor }}>{r.phone}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  // --- Layout 3 & 4: Steven Terry Style (Screenshot 093918) ---
  const RibbonLayout = () => (
    <div className="min-h-[297mm] bg-white flex flex-col text-[11px]">
      <div className="flex h-44">
        <div className="w-[35%] bg-zinc-800 text-white flex flex-col justify-center px-8">
          <h1 className="text-3xl font-black uppercase leading-none">{cvData.personalInfo.name}</h1>
          <div className="h-1.5 w-16 bg-white mt-4" style={{ backgroundColor: primaryColor }}></div>
        </div>
        <div className="flex-1 flex items-center justify-between px-10" style={{ backgroundColor: primaryColor + '10' }}>
          <p className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: primaryColor }}>Profile Summary</p>
          <img src={cvData.personalInfo.photo} className={`w-36 h-36 object-cover border-4 border-white shadow-2xl ${photoStyle}`} />
        </div>
      </div>
      <div className="flex flex-1">
        <div className="w-[35%] bg-zinc-800 text-white p-8 space-y-8 uppercase font-bold">
          <section><h4 className="border-b border-white/10 pb-1 mb-4">Contact Detail</h4>
            <p className="mb-2">📞 {cvData.contact.phone1}</p>
            <p className="lowercase break-all underline mb-2">{cvData.contact.email}</p>
            <p className="normal-case opacity-70 italic">{cvData.contact.address}</p>
          </section>
          <section><h4 className="border-b border-white/10 pb-1 mb-4">Personal Info</h4>
            <div className="space-y-2 opacity-80">
              <p>NIC: {cvData.personalInfo.nicNumber}</p>
              <p>DOB: {cvData.personalInfo.dateOfBirth}</p>
              <p>Status: {cvData.personalInfo.civilStatus}</p>
            </div>
          </section>
        </div>
        <div className="flex-1 p-10 space-y-10">
          <section><h2 className="text-sm font-black uppercase border-b-2 pb-1" style={{ borderColor: primaryColor }}>Career Objective</h2><p className="italic mt-4 text-zinc-600">{cvData.personalInfo.description}</p></section>
          <section><h2 className="text-sm font-black uppercase border-b-2 pb-1" style={{ borderColor: primaryColor }}>Education Background</h2>
            <div className="mt-4 space-y-6">
              <div className="border p-4 rounded-xl">
                <p className="font-black mb-2 uppercase">G.C.E. O/L Examination ({cvData.education.oLevel.year}) - Index: {cvData.education.oLevel.indexNumber}</p>
                <div className="grid grid-cols-2 gap-x-8">
                  {cvData.education.oLevel.subjects.map((s, i) => (
                    <div key={i} className="flex justify-between border-b py-1"><span>{s.name}</span><span className="font-bold">{s.grade}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  // --- Layout 5-8: Table Structure (Screenshot 094123) ---
  const TableLayout = () => (
    <div className="min-h-[297mm] bg-white p-12 text-[11px]">
      <div className="flex items-center gap-10 border-b-[10px] pb-10 mb-10" style={{ borderColor: primaryColor }}>
        <img src={cvData.personalInfo.photo} className={`w-40 h-40 object-cover border-4 ${photoStyle}`} style={{ borderColor: primaryColor }} />
        <div className="flex-1">
          <h1 className="text-5xl font-black uppercase tracking-tighter" style={{ color: primaryColor }}>{cvData.personalInfo.name}</h1>
          <div className="mt-2 bg-zinc-900 text-white px-6 py-2 text-xs font-black uppercase tracking-widest inline-block">Curriculum Vitae</div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-8 space-y-10">
          <section><h3 className="text-xs font-black uppercase mb-4 text-white px-4 py-1" style={{ backgroundColor: primaryColor }}>Education Qualification</h3>
            <table className="w-full border-collapse border border-zinc-200">
              <thead className="bg-zinc-50 uppercase text-[9px] font-black"><tr><th className="border p-2 text-left">Subject</th><th className="border p-2 text-center">Grade</th></tr></thead>
              <tbody>
                <tr className="bg-zinc-100 font-bold"><td colSpan={2} className="border p-2 uppercase">A/L - {cvData.education.aLevel.year} (Index: {cvData.education.aLevel.indexNumber})</td></tr>
                {cvData.education.aLevel.subjects.map((s, i) => (
                  <tr key={i}><td className="border p-2">{s.name}</td><td className="border p-2 text-center font-bold">{s.grade}</td></tr>
                ))}
              </tbody>
            </table>
          </section>
          <section><h3 className="text-xs font-black uppercase mb-4 text-white px-4 py-1" style={{ backgroundColor: primaryColor }}>Experience</h3>
            {cvData.workExperience.map(exp => (
              <div key={exp.id} className="mb-4 border-b pb-4"><p className="font-black text-xs uppercase">{exp.title}</p><p className="font-bold opacity-60 italic">{exp.company} | {exp.duration}</p></div>
            ))}
          </section>
        </div>
        <div className="col-span-4 space-y-8 bg-zinc-50 p-6 rounded-3xl h-fit">
          <section><h4 className="font-black uppercase border-b-2 mb-3 pb-1" style={{ borderColor: primaryColor }}>Personal Data</h4>
            <div className="space-y-3 font-bold uppercase text-zinc-500 text-[9px]">
              <p>Full Name: <span className="text-zinc-800 block normal-case">{cvData.personalInfo.fullName}</span></p>
              <p>NIC: <span className="text-zinc-800">{cvData.personalInfo.nicNumber}</span></p>
              <p>Nationality: <span className="text-zinc-800">{cvData.personalInfo.nationality}</span></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  const renderTemplate = () => {
    const id = Number(cvData.selectedTemplate);
    if (id === 1 || id === 2 || id === 8) return <SidebarLayout />;
    if (id === 3 || id === 4) return <RibbonLayout />;
    return <TableLayout />;
  };

  return (
    <div 
      style={{ width: '210mm', minHeight: '297mm', filter: `brightness(${brightness}%)`, transform: `scale(${scale})`, transformOrigin: 'top center' }}
      className="bg-white shadow-2xl overflow-hidden mx-auto print:shadow-none"
    >
      {renderTemplate()}
    </div>
  );
}
