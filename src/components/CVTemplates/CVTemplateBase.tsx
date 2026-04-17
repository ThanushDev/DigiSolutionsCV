import React from 'react';
import { CVData } from '../../types/cv';
import { Mail, Phone, MapPin, User, Briefcase, GraduationCap, Award, BookOpen, Star, Globe } from 'lucide-react';

export function CVTemplateBase({ cvData }: { cvData: CVData }) {
  const theme = cvData.customColor;
  const photoClass = cvData.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-lg';

  // --- Common Table Component (Used in all layouts) ---
  const EduTable = ({ title, data }: any) => (
    <div className="mt-4">
      <h4 className="font-black text-[10px] uppercase mb-2 bg-zinc-100 p-1 px-2 border-l-4" style={{ borderColor: theme }}>{title} (Index: {data.indexNumber}) - {data.year}</h4>
      <table className="w-full text-left border-collapse">
        <thead><tr className="border-b border-zinc-200"><th className="py-1 text-[9px] uppercase font-bold text-zinc-400">Subject</th><th className="py-1 text-[9px] uppercase font-bold text-zinc-400 text-right">Grade</th></tr></thead>
        <tbody>{data.subjects.map((s: any, i: number) => (<tr key={i} className="border-b border-zinc-50"><td className="py-1 text-[10px]">{s.name}</td><td className="py-1 text-[10px] font-bold text-right italic">{s.grade}</td></tr>))}</tbody>
      </table>
    </div>
  );

  // 1. Thanush Style (Dark Sidebar)
  const Layout1 = () => (
    <div className="flex h-full min-h-[1120px] bg-white text-[11px]">
      <div className="w-[32%] bg-zinc-900 text-white p-8 flex flex-col gap-6">
        <div className="flex justify-center"><img src={cvData.personalInfo.photo} className={`w-36 h-36 object-cover border-4 border-white/10 ${photoClass}`} /></div>
        <section><h3 className="border-b border-white/20 pb-1 mb-3 text-[10px] font-black uppercase text-blue-400">Contact</h3><div className="space-y-2 opacity-80"><p className="flex items-center gap-2 truncate"><Mail size={12}/> {cvData.contact.email}</p><p className="flex items-center gap-2"><Phone size={12}/> {cvData.contact.phone1}</p><p className="flex items-start gap-2"><MapPin size={12}/> {cvData.contact.address}</p></div></section>
        <section><h3 className="border-b border-white/20 pb-1 mb-3 text-[10px] font-black uppercase text-blue-400">Personal</h3><div className="space-y-1.5 opacity-80 text-[10px]"><p><b>NIC:</b> {cvData.personalInfo.nicNumber}</p><p><b>DOB:</b> {cvData.personalInfo.dateOfBirth}</p><p><b>Status:</b> {cvData.personalInfo.civilStatus}</p></div></section>
        <section><h3 className="border-b border-white/20 pb-1 mb-3 text-[10px] font-black uppercase text-blue-400">Skills</h3><div className="space-y-3">{cvData.skills.map((s, i) => <div key={i}><span className="text-[9px] uppercase">{s}</span><div className="h-1 bg-white/10 w-full mt-1"><div className="h-full bg-blue-500" style={{ width: '80%' }}></div></div></div>)}</div></section>
      </div>
      <div className="flex-1 p-12"><h1 className="text-4xl font-black uppercase" style={{ color: theme }}>{cvData.personalInfo.name}</h1><p className="text-zinc-500 italic mb-8 border-l-4 pl-4" style={{ borderColor: theme }}>{cvData.personalInfo.description}</p>
        <div className="space-y-10"><section><h2 className="text-sm font-black uppercase border-b-2 pb-1 mb-4 flex items-center gap-2" style={{ color: theme, borderColor: theme }}><GraduationCap size={18}/> Education</h2><div className="grid grid-cols-2 gap-8"><EduTable title="G.C.E. A/L" data={cvData.education.aLevel} /><EduTable title="G.C.E. O/L" data={cvData.education.oLevel} /></div></section><section><h2 className="text-sm font-black uppercase border-b-2 pb-1 mb-4 flex items-center gap-2" style={{ color: theme, borderColor: theme }}><Briefcase size={18}/> Experience</h2>{cvData.workExperience.map((w, i) => <div key={i} className="mb-4 pl-4 border-l-2" style={{ borderColor: theme+'44' }}><div className="flex justify-between font-bold text-xs uppercase"><span>{w.title}</span><span className="text-zinc-400">{w.duration}</span></div><p className="font-bold text-zinc-500">{w.company}</p><p className="mt-1 text-zinc-600">{w.description}</p></div>)}</section></div>
      </div>
    </div>
  );

  // 2. Steven Terry Style (Large Header)
  const Layout2 = () => (
    <div className="h-full min-h-[1120px] bg-white flex flex-col text-[11px]">
      <div className="h-44 flex items-center justify-between px-12 text-white" style={{ backgroundColor: theme }}><div><h1 className="text-5xl font-black uppercase">{cvData.personalInfo.name}</h1><p className="text-lg opacity-80 uppercase tracking-widest">{cvData.workExperience[0]?.title || 'Professional'}</p></div><img src={cvData.personalInfo.photo} className={`w-36 h-36 object-cover border-8 border-white/20 ${photoClass}`} /></div>
      <div className="flex-1 flex"><div className="w-72 bg-zinc-50 border-r p-8 space-y-8"><section><h3 className="font-black uppercase text-xs mb-4 border-b-2 pb-1" style={{ borderColor: theme }}>Contact</h3><div className="space-y-3"><div className="flex items-center gap-3"><Phone size={14} style={{ color: theme }}/> {cvData.contact.phone1}</div><div className="flex items-center gap-3"><Mail size={14} style={{ color: theme }}/> {cvData.contact.email}</div><div className="flex items-start gap-3"><MapPin size={14} style={{ color: theme }}/> {cvData.contact.address}</div></div></section><section><h3 className="font-black uppercase text-xs mb-4 border-b-2 pb-1" style={{ borderColor: theme }}>Personal</h3><div className="text-[10px] space-y-2"><p><b>NIC:</b> {cvData.personalInfo.nicNumber}</p><p><b>DOB:</b> {cvData.personalInfo.dateOfBirth}</p></div></section></div>
        <div className="flex-1 p-10 space-y-10"><section><h2 className="text-sm font-black uppercase flex items-center gap-2 mb-4" style={{ color: theme }}><BookOpen size={18}/> Education Details</h2><div className="space-y-6"><EduTable title="G.C.E. A/L" data={cvData.education.aLevel} /><EduTable title="G.C.E. O/L" data={cvData.education.oLevel} /></div></section><section><h2 className="text-sm font-black uppercase flex items-center gap-2 mb-4" style={{ color: theme }}><Star size={18}/> Qualifications</h2><ul className="list-disc pl-5 space-y-1">{cvData.professionalQualifications.map((q, i) => <li key={i}>{q}</li>)}</ul></section></div>
      </div>
    </div>
  );

  // 3. Yellow Ribbon Style
  const Layout3 = () => (
    <div className="h-full min-h-[1120px] bg-white p-8">
      <div className="relative h-32 bg-zinc-900 rounded-3xl flex items-center px-12 mb-20"><div><h1 className="text-3xl font-black text-white uppercase italic">{cvData.personalInfo.name}</h1><p className="text-xs uppercase tracking-widest" style={{ color: theme }}>{cvData.personalInfo.fullName}</p></div><div className="absolute -bottom-12 right-12 w-40 h-40 p-2 bg-white rounded-full shadow-xl"><img src={cvData.personalInfo.photo} className="w-full h-full object-cover rounded-full" /></div></div>
      <div className="grid grid-cols-12 gap-10"><div className="col-span-4 space-y-8"><div className="p-6 rounded-3xl border-2" style={{ borderColor: theme }}><h3 className="font-black uppercase text-xs mb-4">Contact</h3><div className="space-y-3 text-[10px]"><p className="flex items-center gap-2"><Phone size={12}/> {cvData.contact.phone1}</p><p className="flex items-center gap-2"><Mail size={12}/> {cvData.contact.email}</p></div></div><div className="p-6 rounded-3xl bg-zinc-50"><h3 className="font-black uppercase text-xs mb-4">Skills</h3>{cvData.skills.map((s, i) => <div key={i} className="mb-2 uppercase text-[9px] font-bold">{s}</div>)}</div></div>
        <div className="col-span-8 space-y-8"><section><h2 className="text-lg font-black uppercase border-b-4 inline-block mb-4" style={{ borderColor: theme }}>Education History</h2><EduTable title="Advanced Level" data={cvData.education.aLevel} /><EduTable title="Ordinary Level" data={cvData.education.oLevel} /></section><section><h2 className="text-lg font-black uppercase border-b-4 inline-block mb-4" style={{ borderColor: theme }}>Professional Experience</h2>{cvData.workExperience.map((w, i) => <div key={i} className="mb-6"><h4 className="font-black text-xs">{w.title}</h4><p className="text-[10px] font-bold opacity-60">{w.company} | {w.duration}</p><p className="text-zinc-500 mt-1 text-[10px]">{w.description}</p></div>)}</section></div>
      </div>
    </div>
  );

  // 4. Corporate Clean Grid
  const Layout4 = () => (
    <div className="h-full min-h-[1120px] bg-white p-12 text-[11px]">
      <div className="flex justify-between items-center border-b-8 pb-8 mb-10" style={{ borderColor: theme }}><div><h1 className="text-5xl font-black uppercase tracking-tighter">{cvData.personalInfo.name}</h1><p className="text-xl font-bold opacity-40 uppercase tracking-widest">Resume</p></div><img src={cvData.personalInfo.photo} className={`w-32 h-32 object-cover border-4 border-zinc-100 ${photoClass}`} /></div>
      <div className="grid grid-cols-2 gap-12"><section className="col-span-2 space-y-2"><h2 className="text-xs font-black uppercase px-2 py-1 bg-zinc-100 border-l-4" style={{ borderColor: theme }}>Objective</h2><p className="text-zinc-600 px-2 italic">{cvData.personalInfo.description}</p></section>
        <section><h2 className="text-xs font-black uppercase border-b-2 pb-1 mb-4" style={{ color: theme, borderColor: theme }}>Education Info</h2><EduTable title="G.C.E. A/L" data={cvData.education.aLevel} /><EduTable title="G.C.E. O/L" data={cvData.education.oLevel} /></section>
        <section><h2 className="text-xs font-black uppercase border-b-2 pb-1 mb-4" style={{ color: theme, borderColor: theme }}>References</h2><div className="space-y-6">{cvData.references.map((r, i) => <div key={i} className="border p-4 bg-zinc-50 rounded-lg"><p className="font-black uppercase">{r.name}</p><p className="italic">{r.designation}</p><p className="font-bold mt-1" style={{ color: theme }}>{r.phone}</p></div>)}</div></section></div>
    </div>
  );

  // 5. Executive Minimalist
  const Layout5 = () => (
    <div className="h-full min-h-[1120px] bg-white flex flex-col">
      <div className="bg-zinc-950 text-white p-14 flex items-center gap-10">
        <img src={cvData.personalInfo.photo} className={`w-40 h-40 object-cover grayscale ${photoClass}`} />
        <div><h1 className="text-5xl font-black uppercase tracking-tighter" style={{ color: theme }}>{cvData.personalInfo.name}</h1><p className="text-lg opacity-60 uppercase font-light mt-1">{cvData.personalInfo.fullName}</p><div className="flex gap-6 mt-6 text-xs font-bold"><span className="flex items-center gap-2"><Phone size={14}/> {cvData.contact.phone1}</span><span className="flex items-center gap-2"><Mail size={14}/> {cvData.contact.email}</span></div></div>
      </div>
      <div className="p-14 grid grid-cols-12 gap-14"><div className="col-span-4 space-y-10"><section><h3 className="font-black uppercase text-xs mb-4 border-b pb-1">Personal</h3><div className="space-y-3 text-[11px] opacity-70"><p><b>NIC:</b> {cvData.personalInfo.nicNumber}</p><p><b>DOB:</b> {cvData.personalInfo.dateOfBirth}</p><p><b>Civil Status:</b> {cvData.personalInfo.civilStatus}</p></div></section><section><h3 className="font-black uppercase text-xs mb-4 border-b pb-1">Languages</h3><div className="flex flex-wrap gap-2">{cvData.languages.map((l, i) => <span key={i} className="px-3 py-1 bg-zinc-100 text-[10px] font-bold uppercase">{l}</span>)}</div></section></div>
        <div className="col-span-8 space-y-12"><section><h2 className="text-sm font-black uppercase mb-6 flex items-center gap-2" style={{ color: theme }}><GraduationCap size={18}/> Education History</h2><EduTable title="Advanced Level" data={cvData.education.aLevel} /><EduTable title="Ordinary Level" data={cvData.education.oLevel} /></section></div></div>
    </div>
  );

  // 6. Professional Timeline
  const Layout6 = () => (
    <div className="h-full min-h-[1120px] bg-white p-12 flex text-[11px]">
      <div className="flex-1 pr-12 border-r-2 border-zinc-100 space-y-10"><header><h1 className="text-5xl font-black uppercase italic" style={{ color: theme }}>{cvData.personalInfo.name}</h1><p className="font-bold opacity-40 uppercase tracking-widest mt-2">{cvData.personalInfo.fullName}</p></header>
        <section><h2 className="font-black uppercase text-xs mb-6 bg-zinc-900 text-white px-4 py-1 inline-block">Work Timeline</h2><div className="space-y-8 relative before:absolute before:left-[7px] before:top-2 before:bottom-0 before:w-0.5 before:bg-zinc-200">{cvData.workExperience.map((w, i) => (<div key={i} className="relative pl-8"><div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-white bg-blue-600 shadow-sm" style={{ backgroundColor: theme }}></div><h4 className="font-black uppercase text-xs">{w.title}</h4><p className="text-[10px] font-bold text-zinc-400">{w.company} | {w.duration}</p><p className="text-zinc-500 mt-2">{w.description}</p></div>))}</div></section>
        <section><h2 className="font-black uppercase text-xs mb-4" style={{ color: theme }}>Education Summary</h2><EduTable title="A/L Examination" data={cvData.education.aLevel} /><EduTable title="O/L Examination" data={cvData.education.oLevel} /></section></div>
      <div className="w-64 pl-12 space-y-8"><img src={cvData.personalInfo.photo} className={`w-full h-48 object-cover shadow-2xl ${photoClass}`} /><section><h3 className="font-black uppercase text-[10px] mb-4 opacity-40">Contact Info</h3><div className="space-y-4"><p><b>Phone:</b><br/>{cvData.contact.phone1}</p><p><b>Email:</b><br/>{cvData.contact.email}</p><p><b>NIC:</b><br/>{cvData.personalInfo.nicNumber}</p></div></section></div>
    </div>
  );

  // 7. Premium Golden Edge
  const Layout7 = () => (
    <div className="h-full min-h-[1120px] bg-zinc-50 p-6">
      <div className="h-full bg-white border-[1px] border-zinc-200 p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-zinc-50 rounded-bl-full -z-0"></div>
        <div className="flex gap-10 items-end mb-12 relative z-10"><img src={cvData.personalInfo.photo} className={`w-44 h-56 object-cover border-4 border-white shadow-2xl ${photoClass}`} /><div><h1 className="text-5xl font-black uppercase mb-2 tracking-tighter" style={{ color: theme }}>{cvData.personalInfo.name}</h1><p className="text-xs font-black uppercase opacity-40 tracking-widest">{cvData.personalInfo.fullName}</p></div></div>
        <div className="grid grid-cols-12 gap-12 relative z-10"><div className="col-span-7 space-y-10"><section><h2 className="text-sm font-black uppercase border-b-2 pb-1 mb-4" style={{ borderColor: theme }}>Education</h2><EduTable title="Higher Education" data={cvData.education.aLevel} /><EduTable title="Secondary Education" data={cvData.education.oLevel} /></section></div>
          <div className="col-span-5 bg-zinc-50 p-8 rounded-[2rem] space-y-8"><section><h3 className="font-black uppercase text-xs mb-4">Personal Profile</h3><p className="text-[10px] leading-relaxed text-zinc-600 italic">"{cvData.personalInfo.description}"</p></section><section><h3 className="font-black uppercase text-xs mb-4">Details</h3><div className="space-y-3 text-[10px]"><b>DOB:</b> {cvData.personalInfo.dateOfBirth} <br/> <b>NIC:</b> {cvData.personalInfo.nicNumber}</div></section></div></div>
      </div>
    </div>
  );

  // 8. Classic Accountant
  const Layout8 = () => (
    <div className="h-full min-h-[1120px] bg-white p-14 text-[11px] leading-relaxed">
      <div className="text-center border-b-2 pb-10 mb-10" style={{ borderColor: theme }}><h1 className="text-4xl font-black uppercase tracking-[0.2em]">{cvData.personalInfo.fullName}</h1><p className="mt-4 text-zinc-500 font-bold uppercase text-[9px] tracking-widest">{cvData.contact.address} | {cvData.contact.phone1} | {cvData.contact.email}</p></div>
      <div className="space-y-10"><section><h2 className="font-black uppercase bg-zinc-100 px-4 py-1 mb-4 border-r-4" style={{ borderColor: theme }}>Personal Data</h2><div className="grid grid-cols-2 gap-y-3 px-4"><p><b>Full Name:</b> {cvData.personalInfo.fullName}</p><p><b>NIC Number:</b> {cvData.personalInfo.nicNumber}</p><p><b>Date of Birth:</b> {cvData.personalInfo.dateOfBirth}</p><p><b>Religion:</b> {cvData.personalInfo.religion}</p></div></section>
        <section><h2 className="font-black uppercase bg-zinc-100 px-4 py-1 mb-4 border-r-4" style={{ borderColor: theme }}>Academic Qualifications</h2><div className="px-4 space-y-8"><EduTable title="G.C.E. Advanced Level" data={cvData.education.aLevel} /><EduTable title="G.C.E. Ordinary Level" data={cvData.education.oLevel} /></div></section>
        <section><h2 className="font-black uppercase bg-zinc-100 px-4 py-1 mb-4 border-r-4" style={{ borderColor: theme }}>Non-Related References</h2><div className="grid grid-cols-2 gap-10 px-4">{cvData.references.map((r, i) => <div key={i}><p className="font-black uppercase">{r.name}</p><p>{r.designation}</p><p className="font-bold" style={{ color: theme }}>{r.phone}</p></div>)}</div></section></div>
    </div>
  );

  const renderTemplate = () => {
    switch (cvData.selectedTemplate) {
      case 1: return <Layout1 />;
      case 2: return <Layout2 />;
      case 3: return <Layout3 />;
      case 4: return <Layout4 />;
      case 5: return <Layout5 />;
      case 6: return <Layout6 />;
      case 7: return <Layout7 />;
      case 8: return <Layout8 />;
      default: return <Layout1 />;
    }
  };

  return (
    <div id="cv-preview-root" className="w-[210mm] min-h-[297mm] bg-white shadow-2xl mx-auto overflow-hidden" style={{ filter: `brightness(${cvData.brightness}%)` }}>
      {renderTemplate()}
    </div>
  );
}
