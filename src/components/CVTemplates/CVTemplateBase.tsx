import React from 'react';
import { CVData, Subject } from '../../types/cv';
import { Mail, Phone, MapPin } from 'lucide-react';

const DateSignature = ({ show }: { show: boolean }) => {
  if (!show) return null;
  return (
    <div className="mt-auto pt-6 px-4 flex justify-between items-end w-full pb-4">
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
  const brightness = cvData.brightness || 100;
  const pInfo = cvData.personalInfo || {} as any;
  const contactInfo = cvData.contact || {} as any;

  const profileImg = cvData.profileImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const fullName = pInfo.fullName || '';
  const summary = pInfo.objective || '';
  const nic = pInfo.nic || '';
  const dob = pInfo.dob || '';
  const gender = pInfo.gender || '';
  const nationality = pInfo.nationality || '';
  const religion = pInfo.religion || '';
  const civilStatus = pInfo.civilStatus || '';

  const phone1 = contactInfo.phone1 || '';
  const email = contactInfo.email || '';
  const address = contactInfo.address || '';

  const skillsList = cvData.skills?.map(s => s.name).filter(Boolean) || [];
  const langList = cvData.languages?.map(l => l.name).filter(Boolean) || [];
  const qualList = cvData.professionalQualifications?.map(q => q.qualification).filter(Boolean) || [];
  const workExpList = cvData.workExperience || [];
  const refList = cvData.references || [];

  const A4Page = ({ children }: { children: React.ReactNode }) => (
    <div className="w-[210mm] h-[297mm] bg-white overflow-hidden flex flex-col relative shadow-none">
      {children}
    </div>
  );

  const PersonalInfoList = ({ isDark = false }) => (
    <div className={`space-y-1 text-[9px] font-bold uppercase ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
      {nic && <div className="grid grid-cols-[70px_1fr]"><span>NIC:</span> <span>{nic}</span></div>}
      {dob && <div className="grid grid-cols-[70px_1fr]"><span>DOB:</span> <span>{dob}</span></div>}
      {gender && <div className="grid grid-cols-[70px_1fr]"><span>Gender:</span> <span>{gender}</span></div>}
      {nationality && <div className="grid grid-cols-[70px_1fr]"><span>Nationality:</span> <span>{nationality}</span></div>}
      {religion && <div className="grid grid-cols-[70px_1fr]"><span>Religion:</span> <span>{religion}</span></div>}
      {civilStatus && <div className="grid grid-cols-[70px_1fr]"><span>Status:</span> <span>{civilStatus}</span></div>}
    </div>
  );

  const EduTable = ({ level, data, titleColor = theme }: { level: string, data: any, titleColor?: string }) => {
    if (!data || !data.subjects || data.subjects.length === 0) return null;
    return (
      <div className="mb-3">
        <p className="font-bold text-[10px] uppercase mb-1">• G.C.E. {level} - {data.year}</p>
        <div className="grid grid-cols-2 gap-x-10 gap-y-1 pl-3 text-[9px]">
          {data.subjects.map((s: Subject, i: number) => (
            <div key={i} className="flex justify-between border-b border-zinc-100 pb-0.5">
              <span>{s.name}</span><span className="font-black" style={{ color: titleColor }}>{s.grade}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- Reusable Blocks to ensure NO data is missed in any template ---
  const SkillsBlock = ({ titleColor = theme, isDark = false }) => {
    if (!skillsList.length) return null;
    return (
      <section className="mb-4">
        <h3 className="text-[11px] font-black uppercase mb-2 border-b pb-1" style={{ color: titleColor, borderColor: titleColor }}>Skills</h3>
        <div className={`flex flex-wrap gap-1.5 text-[9px] font-bold ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
          {skillsList.map((s, i) => <span key={i} className="bg-black/5 px-1.5 py-0.5 rounded">{s}</span>)}
        </div>
      </section>
    );
  };

  const LangsBlock = ({ titleColor = theme, isDark = false }) => {
    if (!langList.length) return null;
    return (
      <section className="mb-4">
        <h3 className="text-[11px] font-black uppercase mb-2 border-b pb-1" style={{ color: titleColor, borderColor: titleColor }}>Languages</h3>
        <div className={`flex flex-wrap gap-2 text-[9px] font-bold ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
          {langList.map((l, i) => <span key={i}>• {l}</span>)}
        </div>
      </section>
    );
  };

  const WorkExpBlock = ({ titleColor = theme }) => {
    if (!workExpList.length) return null;
    return (
      <section className="mb-4">
        <h3 className="text-[11px] font-black uppercase mb-2 border-b pb-1" style={{ color: titleColor, borderColor: titleColor }}>Work Experience</h3>
        <div className="space-y-3">
          {workExpList.map((exp: any, i: number) => (
            <div key={i} className="text-[10px]">
              <div className="font-bold">{exp.title} <span className="font-normal text-zinc-500 italic">| {exp.company}</span></div>
              <div className="text-[8px] text-zinc-400 mb-0.5">{exp.duration}</div>
              <div className="text-[9px] text-zinc-600 leading-tight">{exp.description}</div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const QualBlock = ({ titleColor = theme }) => {
    if (!qualList.length) return null;
    return (
      <section className="mb-4">
        <h3 className="text-[11px] font-black uppercase mb-2 border-b pb-1" style={{ color: titleColor, borderColor: titleColor }}>Qualifications</h3>
        <ul className="list-disc pl-4 space-y-1 text-[9px] text-zinc-700">
          {qualList.map((q, i) => <li key={i}>{q}</li>)}
        </ul>
      </section>
    );
  };

  const EducationBlock = ({ titleColor = theme }) => {
    if (!cvData.education?.aLevel?.subjects?.length && !cvData.education?.oLevel?.subjects?.length) return null;
    return (
      <section className="mb-4">
        <h3 className="text-[11px] font-black uppercase mb-2 border-b pb-1" style={{ color: titleColor, borderColor: titleColor }}>Education</h3>
        <EduTable level="Advanced Level" data={cvData.education?.aLevel} titleColor={titleColor} />
        <EduTable level="Ordinary Level" data={cvData.education?.oLevel} titleColor={titleColor} />
      </section>
    );
  };

  const RefBlock = ({ titleColor = theme }) => {
    if (!refList.length || !refList[0].name) return null;
    return (
      <section className="pt-2 mt-auto">
        <h3 className="text-[11px] font-black uppercase mb-2 border-b pb-1" style={{ color: titleColor, borderColor: titleColor }}>References</h3>
        <div className="grid grid-cols-2 gap-4 text-[9px]">
          {refList.map((r: any, i: number) => (
            r.name ? <div key={i}><b>{r.name}</b><br/>{r.designation}<br/>{r.organization}<br/>{r.phone}</div> : null
          ))}
        </div>
      </section>
    );
  };

  // --- Layouts ---

  const Layout1 = () => (
    <A4Page>
      <div className="flex h-full">
        <div className="w-[33%] bg-zinc-50 border-r p-6 flex flex-col gap-5 shrink-0">
          <img src={profileImg} className="w-32 h-32 rounded-full border-4 object-cover mx-auto" style={{ borderColor: theme }} />
          <section><h3 className="text-[11px] font-black uppercase mb-2 border-b pb-1" style={{ color: theme, borderColor: theme }}>Contact</h3><div className="space-y-2 text-[9px]"><p className="flex items-center gap-2"><Phone size={10}/> {phone1}</p><p className="flex items-center gap-2 truncate"><Mail size={10}/> {email}</p>{address && <p className="flex items-start gap-2"><MapPin size={10}/> {address}</p>}</div></section>
          <section><h3 className="text-[11px] font-black uppercase mb-2 border-b pb-1" style={{ color: theme, borderColor: theme }}>Personal Info</h3><PersonalInfoList /></section>
          <SkillsBlock />
          <LangsBlock />
        </div>
        <div className="flex-1 p-8 flex flex-col">
          <div className="mb-4"><h1 className="text-3xl font-black uppercase" style={{ color: theme }}>{fullName}</h1>{summary && <p className="text-zinc-600 italic mt-2 text-[10px] leading-relaxed">"{summary}"</p>}</div>
          <WorkExpBlock />
          <QualBlock />
          <EducationBlock />
          <RefBlock />
          <DateSignature show={cvData.showDS} />
        </div>
      </div>
    </A4Page>
  );

  const Layout2 = () => (
    <A4Page>
      <div className="h-32 flex items-center justify-between px-10 text-white shrink-0" style={{ backgroundColor: theme }}>
        <div><h1 className="text-3xl font-black uppercase">{fullName}</h1><p className="text-[10px] opacity-80 uppercase tracking-widest mt-1">Professional Resume</p></div>
        <img src={profileImg} className="w-24 h-24 object-cover rounded-lg border-2 border-white/20 shadow-lg" />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[30%] bg-zinc-50 border-r p-6 space-y-5">
          <section><h3 className="font-black text-[11px] mb-2 border-b pb-1" style={{ borderColor: theme, color: theme }}>Contact</h3><div className="text-[9px] space-y-1"><p>{phone1}</p><p className="truncate">{email}</p><p>{address}</p></div></section>
          <section><h3 className="font-black text-[11px] mb-2 border-b pb-1" style={{ borderColor: theme, color: theme }}>Details</h3><PersonalInfoList /></section>
          <SkillsBlock />
          <LangsBlock />
        </div>
        <div className="flex-1 p-8 flex flex-col">
          {summary && <p className="text-zinc-600 italic border-l-4 pl-4 mb-4 text-[10px]" style={{ borderColor: theme }}>{summary}</p>}
          <WorkExpBlock />
          <QualBlock />
          <EducationBlock />
          <RefBlock />
          <DateSignature show={cvData.showDS} />
        </div>
      </div>
    </A4Page>
  );

  const Layout3 = () => (
    <A4Page>
      <div className="p-8 flex flex-col h-full">
        <div className="relative h-24 bg-zinc-900 rounded-3xl flex items-center px-8 mb-12 shrink-0">
          <h1 className="text-2xl font-black text-white uppercase italic">{fullName}</h1>
          <img src={profileImg} className="absolute -bottom-6 right-8 w-24 h-24 rounded-full border-4 border-white object-cover shadow-xl" />
        </div>
        <div className="grid grid-cols-12 gap-6 flex-1">
          <div className="col-span-4 space-y-4">
            <div className="p-4 rounded-2xl border-2" style={{ borderColor: theme }}><h3 className="font-black text-[11px] mb-2 text-center">Contact</h3><div className="text-[9px] space-y-1 text-center"><p>{phone1}</p><p className="truncate">{email}</p><p>{address}</p></div></div>
            <div className="p-4 rounded-2xl bg-zinc-50 space-y-4"><PersonalInfoList /><SkillsBlock /><LangsBlock /></div>
          </div>
          <div className="col-span-8 flex flex-col">
            {summary && <p className="italic text-zinc-600 text-[10px] mb-4">"{summary}"</p>}
            <WorkExpBlock />
            <QualBlock />
            <EducationBlock />
            <RefBlock />
            <DateSignature show={cvData.showDS} />
          </div>
        </div>
      </div>
    </A4Page>
  );

  const Layout4 = () => (
    <A4Page>
      <div className="flex h-full">
        <div className="w-[33%] bg-zinc-900 text-white p-6 flex flex-col gap-5 shrink-0 h-full">
          <img src={profileImg} className="w-28 h-28 rounded-full border-2 border-zinc-500 object-cover mx-auto" />
          <section><h3 className="border-b border-zinc-700 pb-1 mb-2 text-[10px] font-black uppercase text-zinc-400">Contact</h3><div className="text-[9px] space-y-1 text-zinc-300"><p>{phone1}</p><p className="truncate">{email}</p><p>{address}</p></div></section>
          <section><h3 className="border-b border-zinc-700 pb-1 mb-2 text-[10px] font-black uppercase text-zinc-400">Details</h3><PersonalInfoList isDark={true}/></section>
          <SkillsBlock titleColor="#a1a1aa" isDark={true} />
          <LangsBlock titleColor="#a1a1aa" isDark={true} />
        </div>
        <div className="flex-1 p-8 flex flex-col">
          <div className="mb-4"><h1 className="text-3xl font-black uppercase text-zinc-800">{fullName}</h1>{summary && <p className="mt-2 text-zinc-500 text-[10px]">{summary}</p>}</div>
          <WorkExpBlock />
          <QualBlock />
          <EducationBlock />
          <RefBlock />
          <DateSignature show={cvData.showDS} />
        </div>
      </div>
    </A4Page>
  );

  const Layout5 = () => (
    <A4Page>
      <div className="p-8 flex flex-col h-full">
        <div className="flex justify-between items-center border-b-4 pb-4 mb-6 shrink-0" style={{ borderColor: theme }}>
          <div><h1 className="text-3xl font-black uppercase">{fullName}</h1><p className="text-[10px] font-bold opacity-70 uppercase mt-1">{phone1} | {email}</p><p className="text-[9px] opacity-60">{address}</p></div>
          <img src={profileImg} className="w-20 h-20 object-cover border-2 border-zinc-100" />
        </div>
        <div className="flex-1 flex flex-col">
          {summary && <div className="text-zinc-600 italic border-l-2 pl-4 mb-4 text-[10px]" style={{ borderColor: theme }}>{summary}</div>}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <section><h2 className="text-[11px] font-black uppercase border-b pb-1 mb-2" style={{ color: theme, borderColor: theme }}>Personal Info</h2><PersonalInfoList /></section>
            <div className="space-y-4">
              <SkillsBlock />
              <LangsBlock />
            </div>
            <div className="col-span-2"><WorkExpBlock /></div>
            <div className="col-span-2"><QualBlock /></div>
            <div className="col-span-2"><EducationBlock /></div>
          </div>
          <RefBlock />
          <DateSignature show={cvData.showDS} />
        </div>
      </div>
    </A4Page>
  );

  const Layout6 = () => (
    <A4Page>
      <div className="m-4 border h-[calc(100%-2rem)] p-6 flex flex-col">
        <div className="flex gap-6 items-end mb-6 shrink-0">
          <img src={profileImg} className="w-24 h-32 object-cover border-4 border-white shadow-xl" />
          <div className="flex-1"><h1 className="text-3xl font-black uppercase border-b-4 pb-1" style={{ borderColor: theme, color: theme }}>{fullName}</h1>{summary && <p className="text-[10px] text-zinc-500 mt-2 italic">{summary}</p>}</div>
        </div>
        <div className="flex-1 flex gap-6">
          <div className="flex-1 flex flex-col">
            <WorkExpBlock titleColor={theme} />
            <QualBlock titleColor={theme} />
            <EducationBlock titleColor={theme} />
            <RefBlock titleColor={theme} />
            <DateSignature show={cvData.showDS} />
          </div>
          <div className="w-48 bg-zinc-50 p-5 rounded-2xl space-y-4 h-fit shrink-0">
            <section><h3 className="font-black text-[10px] border-b pb-1 mb-2 uppercase" style={{ color: theme }}>Contact</h3><div className="text-[9px] space-y-1"><p>{phone1}</p><p className="truncate">{email}</p><p>{address}</p></div></section>
            <section><h3 className="font-black text-[10px] border-b pb-1 mb-2 uppercase" style={{ color: theme }}>Details</h3><PersonalInfoList /></section>
            <SkillsBlock titleColor={theme} />
            <LangsBlock titleColor={theme} />
          </div>
        </div>
      </div>
    </A4Page>
  );

  const Layout7 = () => (
    <A4Page>
      <div className="p-10 flex h-full gap-8">
        <div className="flex-1 flex flex-col">
          <header className="mb-6"><h1 className="text-4xl font-black uppercase italic leading-none mb-3" style={{ color: theme }}>{fullName}</h1>{summary && <p className="text-zinc-600 text-[10px] border-l-2 pl-3" style={{ borderColor: theme }}>{summary}</p>}</header>
          <WorkExpBlock titleColor={theme} />
          <QualBlock titleColor={theme} />
          <EducationBlock titleColor={theme} />
          <RefBlock titleColor={theme} />
          <DateSignature show={cvData.showDS} />
        </div>
        <div className="w-[30%] flex flex-col gap-5 shrink-0 border-l pl-6">
          <img src={profileImg} className="w-full h-40 object-cover rounded shadow-sm" />
          <section><h3 className="font-black uppercase text-[10px] mb-1" style={{ color: theme }}>Contact</h3><div className="text-[9px] space-y-1 text-zinc-600"><p>{phone1}</p><p className="truncate">{email}</p><p>{address}</p></div></section>
          <section><h3 className="font-black uppercase text-[10px] mb-1" style={{ color: theme }}>Personal</h3><PersonalInfoList /></section>
          <SkillsBlock titleColor={theme} />
          <LangsBlock titleColor={theme} />
        </div>
      </div>
    </A4Page>
  );

  const Layout8 = () => (
    <A4Page>
      <div className="p-8 flex flex-col h-full text-[10px]">
        <div className="text-center border-b-2 pb-4 mb-6 shrink-0" style={{ borderColor: theme }}>
          <img src={profileImg} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 p-0.5" style={{ borderColor: theme }} />
          <h1 className="text-2xl font-black uppercase tracking-widest">{fullName}</h1>
          <p className="mt-1 text-zinc-500 font-bold text-[9px] uppercase">{phone1} | {email}</p>
          <p className="text-zinc-400 text-[8px] uppercase">{address}</p>
        </div>
        <div className="flex-1 flex flex-col space-y-4">
          {summary && <p className="text-center italic px-10 text-zinc-600 text-[10px]">"{summary}"</p>}
          <div className="grid grid-cols-2 gap-6">
            <section><h2 className="font-black uppercase bg-zinc-50 px-3 py-1 mb-2 border-l-4" style={{ borderColor: theme }}>Personal Info</h2><div className="px-3"><PersonalInfoList /></div></section>
            <div>
              <div className="mb-3"><h2 className="font-black uppercase bg-zinc-50 px-3 py-1 mb-2 border-l-4" style={{ borderColor: theme }}>Skills & Languages</h2><div className="px-3"><SkillsBlock /><LangsBlock /></div></div>
            </div>
          </div>
          <div className="px-3"><WorkExpBlock /></div>
          <div className="px-3"><QualBlock /></div>
          <div className="px-3"><EducationBlock /></div>
          <div className="px-3 mt-auto"><RefBlock /></div>
          <DateSignature show={cvData.showDS} />
        </div>
      </div>
    </A4Page>
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
    <div id="cv-preview-root" className="mx-auto shadow-2xl origin-top" style={{ transform: `scale(${scale})`, filter: `brightness(${brightness}%)` }}>
      {renderTemplate()}
    </div>
  );
}
