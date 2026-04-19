import React from 'react';
import { CVData, Subject } from '../../types/cv';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const DateSignature = ({ show }: { show: boolean }) => {
  if (!show) return null;
  return (
    <div className="mt-auto pt-6 flex justify-between items-end w-full pb-4 px-2">
      <div className="text-center">
        <div className="w-32 border-b border-zinc-400 border-dotted mb-1"></div>
        <p className="text-[8px] font-black uppercase text-zinc-400">Date</p>
      </div>
      <div className="text-center">
        <div className="w-32 border-b border-zinc-400 border-dotted mb-1"></div>
        <p className="text-[8px] font-black uppercase text-zinc-400">Signature</p>
      </div>
    </div>
  );
};

export function CVTemplateBase({ cvData, scale = 1 }: { cvData: CVData; scale?: number }) {
  const theme = cvData.customColor || '#1e3a8a';
  const pInfo = cvData.personalInfo || {} as any;
  const contactInfo = cvData.contact || {} as any;
  const showDS = cvData.showDS;

  const profileImg = cvData.profileImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const fullName = pInfo.fullName || '';
  const summary = pInfo.objective || '';

  const skillsList = cvData.skills?.map(s => s.name).filter(Boolean) || [];
  const langList = cvData.languages?.map(l => l.name).filter(Boolean) || [];
  const qualList = cvData.professionalQualifications?.map(q => q.qualification).filter(Boolean) || [];
  const workExpList = cvData.workExperience || [];
  const refList = cvData.references || [];

  const SectionTitle = ({ title, color = theme }: { title: string, color?: string }) => (
    <h3 className="text-[10px] font-black uppercase mb-2 border-b-2 pb-0.5" style={{ color: color, borderColor: color }}>{title}</h3>
  );

  const PersonalInfoList = ({ isDark = false }) => (
    <div className={`space-y-1 text-[9px] font-bold uppercase ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
      {pInfo.nic && <div className="grid grid-cols-[75px_1fr]"><span>NIC Number:</span> <span>{pInfo.nic}</span></div>}
      {pInfo.dob && <div className="grid grid-cols-[75px_1fr]"><span>Date of Birth:</span> <span>{pInfo.dob}</span></div>}
      {pInfo.gender && <div className="grid grid-cols-[75px_1fr]"><span>Gender:</span> <span>{pInfo.gender}</span></div>}
      {pInfo.nationality && <div className="grid grid-cols-[75px_1fr]"><span>Nationality:</span> <span>{pInfo.nationality}</span></div>}
      {pInfo.religion && <div className="grid grid-cols-[75px_1fr]"><span>Religion:</span> <span>{pInfo.religion}</span></div>}
      {pInfo.civilStatus && <div className="grid grid-cols-[75px_1fr]"><span>Civil Status:</span> <span>{pInfo.civilStatus}</span></div>}
    </div>
  );

  const Quals = () => qualList.length > 0 && (
    <section className="mb-4">
      <SectionTitle title="Professional Qualifications" />
      <ul className="list-disc pl-5 space-y-1 text-[9px] text-zinc-700 font-medium">
        {qualList.map((q, i) => <li key={i}>{q}</li>)}
      </ul>
    </section>
  );

  const Edu = () => (cvData.education?.aLevel?.subjects?.length > 0 || cvData.education?.oLevel?.subjects?.length > 0) && (
    <section className="mb-4">
      <SectionTitle title="Education Qualifications" />
      {[cvData.education?.aLevel, cvData.education?.oLevel].map((edu, idx) => edu?.subjects?.length > 0 && (
        <div key={idx} className="mb-3 last:mb-0">
          <p className="font-bold text-[9px] uppercase mb-1.5">• G.C.E. {idx === 0 ? 'Advanced' : 'Ordinary'} Level - {edu.year}</p>
          <div className="grid grid-cols-2 gap-x-10 pl-4 text-[9px]">
            {edu.subjects.map((s: Subject, i: number) => (
              <div key={i} className="flex justify-between border-b border-zinc-100 pb-1">
                <span className="text-zinc-600">{s.name}</span><span className="font-black" style={{ color: theme }}>{s.grade}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );

  const Work = () => workExpList.length > 0 && (
    <section className="mb-4">
      <SectionTitle title="Work Experience" />
      <div className="space-y-3">
        {workExpList.map((exp: any, i: number) => (
          <div key={i} className="text-[9px]">
            <div className="font-bold text-zinc-800 uppercase tracking-tight">{exp.title} <span className="font-medium text-zinc-400 lowercase italic">| {exp.company}</span></div>
            <div className="text-[8px] text-zinc-400 font-bold mb-1">{exp.duration}</div>
            <p className="text-zinc-600 leading-tight">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );

  const Refs = () => refList.some(r => r.name) && (
    <section className="mt-4">
      <SectionTitle title="References" />
      <div className="grid grid-cols-2 gap-6 text-[8px] leading-tight">
        {refList.map((r: any, i: number) => r.name && (
          <div key={i} className="text-zinc-700">
            <b className="text-[9px] text-zinc-900 uppercase">{r.name}</b><br/>
            {r.designation && <>{r.designation}<br/></>}
            {r.organization && <>{r.organization}<br/></>}
            <span className="font-bold mt-0.5 block" style={{ color: theme }}>Phone: {r.phone}</span>
          </div>
        ))}
      </div>
    </section>
  );

  const A4Page = ({ children, sidebar }: { children: React.ReactNode, sidebar?: React.ReactNode }) => (
    <div className="w-[210mm] h-[297mm] bg-white flex overflow-hidden shadow-none relative">
      {sidebar && <div className="w-[32%] shrink-0 h-full">{sidebar}</div>}
      <div className="flex-1 h-full flex flex-col p-10 overflow-hidden">{children}</div>
    </div>
  );

  const renderTemplate = () => {
    switch (cvData.selectedTemplate) {
      case 1: 
        return (
          <A4Page sidebar={
            <div className="bg-zinc-50 h-full border-r p-6 flex flex-col gap-6">
              <img src={profileImg} className="w-32 h-32 rounded-full border-4 mx-auto object-cover shadow-sm" style={{ borderColor: theme }} />
              <section><SectionTitle title="Contact" /><div className="space-y-2 text-[8px] font-bold text-zinc-600"><p className="flex items-center gap-2"><Phone size={11} className="text-zinc-400"/> {contactInfo.phone1}</p><p className="flex items-center gap-2 truncate"><Mail size={11} className="text-zinc-400"/> {contactInfo.email}</p><p className="flex items-start gap-2"><MapPin size={11} className="text-zinc-400 mt-0.5"/> {contactInfo.address}</p></div></section>
              <section><SectionTitle title="Personal Info" /><PersonalInfoList /></section>
              {skillsList.length > 0 && <section><SectionTitle title="Skills" /><div className="flex flex-wrap gap-1">{skillsList.map((s,i) => <span key={i} className="bg-zinc-200 px-2 py-1 rounded text-[8px] font-black uppercase">{s}</span>)}</div></section>}
              {langList.length > 0 && <section><SectionTitle title="Languages" /><div className="space-y-1 text-[9px] font-bold text-zinc-600">{langList.map((l,i) => <p key={i}>• {l}</p>)}</div></section>}
            </div>
          }>
            <div className="mb-6"><h1 className="text-3xl font-black uppercase leading-none mb-2" style={{ color: theme }}>{fullName}</h1>{summary && <p className="text-zinc-500 italic text-[10px] leading-relaxed">"{summary}"</p>}</div>
            <Quals /><Edu /><Work /><Refs /><DateSignature show={showDS} />
          </A4Page>
        );
      case 2:
        return (
          <A4Page>
            <div className="h-32 flex items-center justify-between px-10 text-white shrink-0 -mx-10 -mt-10 mb-8" style={{ backgroundColor: theme }}>
              <div><h1 className="text-3xl font-black uppercase leading-none">{fullName}</h1><p className="text-[10px] opacity-80 uppercase tracking-[0.2em] mt-2 font-bold italic">Curriculum Vitae</p></div>
              <img src={profileImg} className="w-24 h-24 object-cover rounded-xl border-2 border-white/30 shadow-xl" />
            </div>
            <div className="flex-1 flex gap-8">
              <div className="w-[30%] shrink-0 space-y-5">
                <section><SectionTitle title="Contact" /><div className="text-[8px] font-bold text-zinc-500 space-y-1"><p>{contactInfo.phone1}</p><p className="truncate">{contactInfo.email}</p><p>{contactInfo.address}</p></div></section>
                <section><SectionTitle title="Details" /><PersonalInfoList /></section>
                {skillsList.length > 0 && <section><SectionTitle title="Skills" /><div className="space-y-1">{skillsList.map((s,i) => <p key={i} className="text-[9px] font-black uppercase text-zinc-600">• {s}</p>)}</div></section>}
              </div>
              <div className="flex-1 flex flex-col">
                {summary && <p className="text-zinc-600 italic border-l-4 pl-4 mb-6 text-[10px] leading-relaxed" style={{ borderColor: theme }}>{summary}</p>}
                <Quals /><Edu /><Work /><Refs /><DateSignature show={showDS} />
              </div>
            </div>
          </A4Page>
        );
      case 3:
        return (
          <A4Page>
            <div className="relative h-28 bg-zinc-900 rounded-[2rem] flex items-center px-10 mb-12 shrink-0">
              <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter w-[75%]">{fullName}</h1>
              <img src={profileImg} className="absolute -bottom-6 right-10 w-28 h-28 rounded-[2rem] border-8 border-white object-cover shadow-2xl" />
            </div>
            <div className="grid grid-cols-12 gap-8 flex-1">
              <div className="col-span-4 space-y-6">
                <div className="p-5 rounded-[2rem] bg-zinc-50 border-2 border-zinc-100 space-y-5">
                  <section><p className="text-[10px] font-black uppercase mb-2 text-center" style={{ color: theme }}>Contact</p><div className="text-[8px] font-bold text-zinc-500 text-center space-y-1"><p>{contactInfo.phone1}</p><p className="truncate">{contactInfo.email}</p></div></section>
                  <PersonalInfoList />
                  {skillsList.length > 0 && <section><p className="text-[10px] font-black uppercase mb-2 text-center" style={{ color: theme }}>Skills</p><div className="flex flex-wrap gap-1 justify-center">{skillsList.map((s,i) => <span key={i} className="bg-white px-2 py-0.5 rounded-full border text-[7px] font-bold uppercase">{s}</span>)}</div></section>}
                </div>
              </div>
              <div className="col-span-8 flex flex-col">
                {summary && <p className="italic text-zinc-500 text-[10px] mb-6 leading-relaxed bg-zinc-50 p-4 rounded-2xl">"{summary}"</p>}
                <Quals /><Edu /><Work /><Refs /><DateSignature show={showDS} />
              </div>
            </div>
          </A4Page>
        );
      case 4:
        return (
          <A4Page sidebar={
            <div className="bg-zinc-900 text-white h-full p-8 flex flex-col gap-8">
              <img src={profileImg} className="w-32 h-32 rounded-2xl border-2 border-zinc-700 object-cover mx-auto" />
              <section><h3 className="border-b border-zinc-700 pb-1 mb-3 text-[10px] font-black uppercase text-zinc-400">Contact</h3><div className="text-[9px] space-y-2 text-zinc-300 font-medium"><p className="flex items-center gap-2"><Phone size={12}/> {contactInfo.phone1}</p><p className="flex items-center gap-2"><Mail size={12}/> {contactInfo.email}</p><p className="leading-tight">{contactInfo.address}</p></div></section>
              <section><h3 className="border-b border-zinc-700 pb-1 mb-3 text-[10px] font-black uppercase text-zinc-400">Personal</h3><PersonalInfoList isDark={true}/></section>
              {skillsList.length > 0 && <section><h3 className="border-b border-zinc-700 pb-1 mb-3 text-[10px] font-black uppercase text-zinc-400">Expertise</h3><div className="flex flex-wrap gap-1">{skillsList.map((s,i) => <span key={i} className="bg-zinc-800 px-2 py-1 rounded text-[8px] font-bold">{s}</span>)}</div></section>}
            </div>
          }>
            <div className="mb-8"><h1 className="text-4xl font-black uppercase text-zinc-800 tracking-tighter leading-none">{fullName}</h1>{summary && <p className="mt-4 text-zinc-500 text-[10px] leading-relaxed border-l-2 pl-4">{summary}</p>}</div>
            <Quals /><Edu /><Work /><Refs /><DateSignature show={showDS} />
          </A4Page>
        );
      case 5:
        return (
          <A4Page>
            <div className="flex justify-between items-end border-b-[6px] pb-6 mb-8 shrink-0" style={{ borderColor: theme }}>
              <div className="max-w-[70%]"><h1 className="text-3xl font-black uppercase leading-none mb-3">{fullName}</h1><p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{contactInfo.phone1} • {contactInfo.email} • {contactInfo.address}</p></div>
              <img src={profileImg} className="w-20 h-20 object-cover rounded-full ring-4 ring-zinc-50 shadow-lg" />
            </div>
            <div className="flex-1 flex flex-col">
              {summary && <div className="text-zinc-600 italic bg-zinc-50 p-4 rounded-xl mb-6 text-[10px] leading-relaxed border-r-4" style={{ borderColor: theme }}>{summary}</div>}
              <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                <section><SectionTitle title="Personal Info" /><PersonalInfoList /></section>
                <div className="space-y-6">{skillsList.length > 0 && <section><SectionTitle title="Key Skills" /><div className="grid grid-cols-2 gap-1">{skillsList.map((s,i) => <span key={i} className="text-[9px] font-bold text-zinc-600 uppercase">▪ {s}</span>)}</div></section>}</div>
                <div className="col-span-2"><Quals /></div>
                <div className="col-span-2"><Edu /></div>
                <div className="col-span-2"><Work /></div>
              </div>
              <Refs /><DateSignature show={showDS} />
            </div>
          </A4Page>
        );
      case 6:
        return (
          <A4Page>
            <div className="m-2 border-2 border-zinc-100 h-[calc(100%-1rem)] p-8 flex flex-col rounded-3xl">
              <div className="flex gap-6 items-start mb-8 shrink-0">
                <img src={profileImg} className="w-24 h-32 object-cover rounded-2xl shadow-lg border-4 border-white" />
                <div className="flex-1 pt-2"><h1 className="text-3xl font-black uppercase border-b-4 pb-2 leading-none mb-3" style={{ borderColor: theme, color: theme }}>{fullName}</h1>{summary && <p className="text-[10px] text-zinc-500 italic leading-relaxed">{summary}</p>}</div>
              </div>
              <div className="flex-1 flex gap-8">
                <div className="flex-1 flex flex-col overflow-hidden"><Quals /><Edu /><Work /><Refs /><DateSignature show={showDS} /></div>
                <div className="w-48 bg-zinc-50 p-5 rounded-[2rem] space-y-6 h-fit shrink-0 border border-zinc-100">
                  <section><h3 className="font-black text-[10px] border-b-2 pb-1 mb-2 uppercase" style={{ color: theme, borderColor: theme }}>Contact</h3><div className="text-[8px] font-bold text-zinc-500 space-y-1.5"><p className="flex items-center gap-2"><Phone size={10}/> {contactInfo.phone1}</p><p className="truncate flex items-center gap-2"><Mail size={10}/> {contactInfo.email}</p></div></section>
                  <section><h3 className="font-black text-[10px] border-b-2 pb-1 mb-2 uppercase" style={{ color: theme, borderColor: theme }}>Details</h3><PersonalInfoList /></section>
                  {skillsList.length > 0 && <section><h3 className="font-black text-[10px] border-b-2 pb-1 mb-2 uppercase" style={{ color: theme, borderColor: theme }}>Skills</h3><div className="space-y-1">{skillsList.map((s,i) => <p key={i} className="text-[8px] font-bold text-zinc-600 uppercase">» {s}</p>)}</div></section>}
                </div>
              </div>
            </div>
          </A4Page>
        );
      case 7:
        return (
          <A4Page>
            <div className="flex h-full gap-10">
              <div className="flex-1 flex flex-col">
                <header className="mb-8"><h1 className="text-4xl font-black uppercase italic leading-none mb-4 tracking-tighter" style={{ color: theme }}>{fullName}</h1>{summary && <p className="text-zinc-500 text-[10px] border-l-4 pl-4 leading-relaxed font-medium" style={{ borderColor: theme }}>{summary}</p>}</header>
                <Quals /><Edu /><Work /><Refs /><DateSignature show={showDS} />
              </div>
              <div className="w-[30%] flex flex-col gap-6 shrink-0 border-l pl-8 pt-4">
                <img src={profileImg} className="w-full h-40 object-cover rounded-3xl shadow-xl mb-2" />
                <section><h3 className="font-black uppercase text-[10px] mb-3 tracking-widest" style={{ color: theme }}>Contact</h3><div className="text-[9px] space-y-2 text-zinc-500 font-bold"><p>{contactInfo.phone1}</p><p className="truncate">{contactInfo.email}</p><p className="leading-tight">{contactInfo.address}</p></div></section>
                <section><h3 className="font-black uppercase text-[10px] mb-3 tracking-widest" style={{ color: theme }}>Profile</h3><PersonalInfoList /></section>
                {skillsList.length > 0 && <section><h3 className="font-black uppercase text-[10px] mb-3 tracking-widest" style={{ color: theme }}>Skills</h3><div className="flex flex-wrap gap-2">{skillsList.map((s,i) => <span key={i} className="text-[9px] font-black text-zinc-400 uppercase"># {s}</span>)}</div></section>}
              </div>
            </div>
          </A4Page>
        );
      case 8:
        return (
          <A4Page>
            <div className="flex flex-col h-full text-[10px]">
              <div className="text-center border-b-4 pb-6 mb-8 shrink-0" style={{ borderColor: theme }}>
                <img src={profileImg} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 p-1 shadow-lg" style={{ borderColor: theme }} />
                <h1 className="text-3xl font-black uppercase tracking-widest leading-none mb-2">{fullName}</h1>
                <p className="text-zinc-400 font-black text-[10px] uppercase">{contactInfo.phone1} | {contactInfo.email} | {contactInfo.address}</p>
              </div>
              <div className="flex-1 flex flex-col space-y-6">
                {summary && <p className="text-center italic px-12 text-zinc-500 text-[10px] leading-relaxed font-medium">"{summary}"</p>}
                <div className="grid grid-cols-2 gap-8">
                  <section><h2 className="font-black uppercase bg-zinc-900 text-white px-4 py-1.5 mb-3 rounded-r-full inline-block pr-10">Personal Details</h2><div className="px-2"><PersonalInfoList /></div></section>
                  {skillsList.length > 0 && <section><h2 className="font-black uppercase bg-zinc-900 text-white px-4 py-1.5 mb-3 rounded-r-full inline-block pr-10">Expertise</h2><div className="px-2 flex flex-wrap gap-2">{skillsList.map((s,i) => <span key={i} className="text-[9px] font-bold text-zinc-600 uppercase border-b-2">/ {s}</span>)}</div></section>}
                </div>
                <Quals /><Edu /><Work /><Refs /><DateSignature show={showDS} />
              </div>
            </div>
          </A4Page>
        );
      default: return null;
    }
  };

  return (
    <div id="cv-preview-root" className="bg-white shadow-2xl" style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
      {renderTemplate()}
    </div>
  );
}
