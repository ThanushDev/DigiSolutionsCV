import React from 'react';
import { CVData, Subject } from '../../types/cv';
import { Mail, Phone, MapPin } from 'lucide-react';

const DateSignature = ({ show }: { show: boolean }) => {
  if (!show) return null;
  return (
    <div className="mt-auto pt-10 px-4 flex justify-between items-end w-full pb-4">
      <div className="text-center">
        <div className="w-40 border-b border-zinc-400 border-dotted mb-1"></div>
        <p className="text-[9px] font-black uppercase text-zinc-400">Date</p>
      </div>
      <div className="text-center">
        <div className="w-40 border-b border-zinc-400 border-dotted mb-1"></div>
        <p className="text-[9px] font-black uppercase text-zinc-400">Signature</p>
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
  const phone2 = contactInfo.phone2 || '';
  const email = contactInfo.email || '';
  const address = contactInfo.address || '';

  const skillsList = cvData.skills?.map(s => s.name).filter(Boolean) || [];
  const langList = cvData.languages?.map(l => l.name).filter(Boolean) || [];
  const qualList = cvData.professionalQualifications?.map(q => q.qualification).filter(Boolean) || [];
  const workList = cvData.workExperience || [];
  const refList = cvData.references || [];

  const A4Page = ({ children }: { children: React.ReactNode }) => (
    <div className="w-[210mm] h-[297mm] bg-white overflow-hidden flex flex-col relative shadow-none">
      {children}
    </div>
  );

  const PersonalInfoList = ({ isDark = false }) => (
    <div className={`space-y-1 text-[10px] font-bold uppercase ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
      {nic && <div className="grid grid-cols-[70px_1fr]"><span>NIC:</span> <span>{nic}</span></div>}
      {dob && <div className="grid grid-cols-[70px_1fr]"><span>DOB:</span> <span>{dob}</span></div>}
      {gender && <div className="grid grid-cols-[70px_1fr]"><span>Gender:</span> <span>{gender}</span></div>}
      {nationality && <div className="grid grid-cols-[70px_1fr]"><span>Nationality:</span> <span>{nationality}</span></div>}
      {religion && <div className="grid grid-cols-[70px_1fr]"><span>Religion:</span> <span>{religion}</span></div>}
      {civilStatus && <div className="grid grid-cols-[70px_1fr]"><span>Status:</span> <span>{civilStatus}</span></div>}
    </div>
  );

  const EduTable = ({ level, data }: { level: string, data: any }) => {
    if (!data || !data.subjects || data.subjects.length === 0) return null;
    return (
      <div className="mb-3">
        <p className="font-bold text-[11px] uppercase">• G.C.E. {level} - {data.year}</p>
        <p className="pl-4 text-[10px] text-zinc-500 italic">Index: {data.indexNumber}</p>
        <div className="grid grid-cols-2 gap-x-10 gap-y-1 pl-4 text-[11px]">
          {data.subjects.map((s: Subject, i: number) => (
            <div key={i} className="flex justify-between border-b border-zinc-100">
              <span>{s.name}</span><span className="font-bold" style={{ color: theme }}>{s.grade}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Layout1 = () => (
    <A4Page>
      <div className="flex h-full">
        <div className="w-[33%] bg-zinc-50 border-r p-8 flex flex-col gap-6 shrink-0">
          <img src={profileImg} className="w-36 h-36 rounded-full border-4 object-cover mx-auto" style={{ borderColor: theme }} />
          <section><h3 className="text-[12px] font-black uppercase mb-2" style={{ color: theme }}>Contact</h3><div className="space-y-3 text-[10px]"><p className="flex items-center gap-2"><Phone size={12}/> {phone1}</p><p className="flex items-center gap-2 truncate"><Mail size={12}/> {email}</p><p className="flex items-start gap-2"><MapPin size={12}/> {address}</p></div></section>
          <section><h3 className="text-[12px] font-black uppercase mb-2" style={{ color: theme }}>Personal Info</h3><PersonalInfoList /></section>
          <section><h3 className="text-[12px] font-black uppercase mb-2" style={{ color: theme }}>Skills</h3><div className="flex flex-wrap gap-2">{skillsList.map((s, i) => <span key={i} className="bg-white border px-2 py-1 rounded text-[9px] font-bold uppercase">{s}</span>)}</div></section>
        </div>
        <div className="flex-1 p-10 flex flex-col gap-6">
          <div><h1 className="text-4xl font-black uppercase" style={{ color: theme }}>{fullName}</h1>{summary && <p className="text-zinc-500 italic mt-2 text-sm">"{summary}"</p>}</div>
          <section><h3 className="text-[12px] font-black uppercase border-b mb-2 pb-0.5" style={{ color: theme }}>Qualifications</h3><ul className="space-y-2 pl-2 text-[11px] font-medium text-zinc-700">{qualList.map((q, i) => <li key={i} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: theme }}></span>{q}</li>)}</ul></section>
          <section><h3 className="text-[12px] font-black uppercase border-b mb-2 pb-0.5" style={{ color: theme }}>Education</h3><EduTable level="Advanced Level" data={cvData.education?.aLevel} /><EduTable level="Ordinary Level" data={cvData.education?.oLevel} /></section>
          <section><h3 className="text-[12px] font-black uppercase border-b mb-2 pb-0.5" style={{ color: theme }}>References</h3><div className="grid grid-cols-2 gap-8">{refList.map((r: any, i: number) => (<div key={i} className="text-[10px]"><b>{r.name}</b><br/>{r.designation}<br/>{r.phone}</div>))}</div></section>
          <DateSignature show={cvData.showDS} />
        </div>
      </div>
    </A4Page>
  );

  const Layout2 = () => (
    <A4Page>
      <div className="h-40 flex items-center justify-between px-12 text-white shrink-0" style={{ backgroundColor: theme }}>
        <div><h1 className="text-4xl font-black uppercase">{fullName}</h1><p className="text-sm opacity-80 uppercase tracking-widest mt-1">Professional Resume</p></div>
        <img src={profileImg} className="w-28 h-28 object-cover rounded-lg border-4 border-white/20 shadow-lg" />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[30%] bg-zinc-50 border-r p-8 space-y-8">
          <section><h3 className="font-black text-xs mb-3 border-b-2" style={{ borderColor: theme }}>Contact</h3><div className="text-[10px] space-y-2"><p>{phone1}</p><p className="truncate">{email}</p></div></section>
          <section><h3 className="font-black text-xs mb-3 border-b-2" style={{ borderColor: theme }}>Details</h3><PersonalInfoList /></section>
          <section><h3 className="font-black text-xs mb-3 border-b-2" style={{ borderColor: theme }}>Skills</h3>{skillsList.map((s, i) => <div key={i} className="text-[9px] font-bold uppercase">• {s}</div>)}</section>
        </div>
        <div className="flex-1 p-10 space-y-6 flex flex-col">
          {summary && <p className="text-zinc-600 italic border-l-4 pl-4" style={{ borderColor: theme }}>{summary}</p>}
          <section><h2 className="text-sm font-black uppercase mb-4" style={{ color: theme }}>Qualifications</h2><ul className="list-disc pl-5 space-y-1 text-[11px]">{qualList.map((q, i) => <li key={i}>{q}</li>)}</ul></section>
          <section><h2 className="text-sm font-black uppercase mb-4" style={{ color: theme }}>Education</h2><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></section>
          <section className="pt-4 border-t"><h2 className="text-sm font-black uppercase mb-4" style={{ color: theme }}>References</h2><div className="grid grid-cols-2 gap-4 text-[10px]">{refList.map((r: any, i: number) => <div key={i}><b>{r.name}</b><br/>{r.phone}</div>)}</div></section>
          <DateSignature show={cvData.showDS} />
        </div>
      </div>
    </A4Page>
  );

  const Layout3 = () => (
    <A4Page>
      <div className="p-8 flex flex-col h-full">
        <div className="relative h-28 bg-zinc-900 rounded-3xl flex items-center px-10 mb-14 shrink-0">
          <h1 className="text-3xl font-black text-white uppercase italic">{fullName}</h1>
          <img src={profileImg} className="absolute -bottom-8 right-10 w-28 h-28 rounded-full border-4 border-white object-cover shadow-xl" />
        </div>
        <div className="grid grid-cols-12 gap-8 flex-1">
          <div className="col-span-4 space-y-6">
            <div className="p-5 rounded-3xl border-2" style={{ borderColor: theme }}><h3 className="font-black text-xs mb-3">Contact</h3><div className="text-[10px] space-y-1"><p>{phone1}</p><p className="truncate">{email}</p></div></div>
            <div className="p-5 rounded-3xl bg-zinc-50 space-y-5"><PersonalInfoList /><section><h3 className="font-black text-xs">Skills</h3>{skillsList.map((s, i) => <div key={i} className="text-[9px] font-bold">• {s}</div>)}</section></div>
          </div>
          <div className="col-span-8 flex flex-col">
            {summary && <p className="italic text-zinc-600 text-[11px] mb-4">"{summary}"</p>}
            <section><h2 className="text-sm font-black uppercase border-b-4 inline-block mb-3" style={{ borderColor: theme }}>Qualifications</h2><ul className="list-disc pl-4 text-[11px] mb-4">{qualList.map((q, i) => <li key={i}>{q}</li>)}</ul></section>
            <section><h2 className="text-sm font-black uppercase border-b-4 inline-block mb-3" style={{ borderColor: theme }}>Education</h2><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></section>
            <section className="pt-4 border-t mt-auto"><h2 className="text-sm font-black uppercase border-b-4 inline-block mb-3" style={{ borderColor: theme }}>References</h2><div className="grid grid-cols-2 gap-4 text-[10px]">{refList.map((r: any, i: number) => <div key={i}><b>{r.name}</b><br/>{r.phone}</div>)}</div></section>
            <DateSignature show={cvData.showDS} />
          </div>
        </div>
      </div>
    </A4Page>
  );

  const Layout4 = () => (
    <A4Page>
      <div className="flex h-full">
        <div className="w-[30%] bg-zinc-900 text-white p-8 flex flex-col gap-6 shrink-0 h-full">
          <img src={profileImg} className="w-32 h-32 rounded-full border-2 border-zinc-500 object-cover mx-auto" />
          <section><h3 className="border-b border-zinc-700 pb-1 mb-3 text-[10px] font-black uppercase text-zinc-400">Contact</h3><div className="text-[9px] space-y-2"><p>{phone1}</p><p className="truncate">{email}</p></div></section>
          <section><h3 className="border-b border-zinc-700 pb-1 mb-3 text-[10px] font-black uppercase text-zinc-400">Details</h3><PersonalInfoList isDark={true}/></section>
        </div>
        <div className="flex-1 p-10 flex flex-col">
          <div><h1 className="text-4xl font-black uppercase text-zinc-800">{fullName}</h1>{summary && <p className="mt-2 text-zinc-500 text-sm">{summary}</p>}</div>
          <section className="mt-6"><h2 className="text-sm font-black uppercase mb-3 text-zinc-800 border-b-2 pb-1" style={{ borderColor: theme }}>Qualifications</h2><ul className="list-disc pl-4 text-zinc-600 text-[11px]">{qualList.map((q, i) => <li key={i}>{q}</li>)}</ul></section>
          <section className="mt-6"><h2 className="text-sm font-black uppercase mb-3 text-zinc-800 border-b-2 pb-1" style={{ borderColor: theme }}>Education</h2><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></section>
          <section className="pt-4 border-t mt-auto"><h2 className="text-sm font-black uppercase mb-3 text-zinc-800" style={{ color: theme }}>References</h2><div className="grid grid-cols-2 gap-4 text-[10px]">{refList.map((r: any, i: number) => <div key={i}><b>{r.name}</b><br/>{r.phone}</div>)}</div></section>
          <DateSignature show={cvData.showDS} />
        </div>
      </div>
    </A4Page>
  );

  const Layout5 = () => (
    <A4Page>
      <div className="p-10 flex flex-col h-full">
        <div className="flex justify-between items-center border-b-4 pb-6 mb-8 shrink-0" style={{ borderColor: theme }}>
          <div><h1 className="text-4xl font-black uppercase">{fullName}</h1><p className="text-xs font-bold opacity-50 uppercase mt-2">{phone1} | {email}</p></div>
          <img src={profileImg} className="w-24 h-24 object-cover border-4 border-zinc-100" />
        </div>
        <div className="flex-1 flex flex-col">
          {summary && <div className="text-zinc-600 italic border-l-2 pl-4 mb-6" style={{ borderColor: theme }}>{summary}</div>}
          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            <section><h2 className="text-xs font-black uppercase border-b pb-1 mb-3" style={{ color: theme, borderColor: theme }}>Personal Info</h2><PersonalInfoList /></section>
            <section><h2 className="text-xs font-black uppercase border-b pb-1 mb-3" style={{ color: theme, borderColor: theme }}>Skills</h2><div className="text-[10px]">{skillsList.join(', ')}</div></section>
            <section className="col-span-2"><h2 className="text-xs font-black uppercase border-b pb-1 mb-3" style={{ color: theme, borderColor: theme }}>Education</h2><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></section>
          </div>
          <section className="pt-4 border-t mt-auto"><h2 className="text-xs font-black uppercase mb-3" style={{ color: theme }}>References</h2><div className="grid grid-cols-3 gap-4 text-[9px]">{refList.map((r: any, i: number) => <div key={i}><b>{r.name}</b><br/>{r.phone}</div>)}</div></section>
          <DateSignature show={cvData.showDS} />
        </div>
      </div>
    </A4Page>
  );

  const Layout6 = () => (
    <A4Page>
      <div className="m-4 border h-[calc(100%-2rem)] p-8 flex flex-col">
        <div className="flex gap-6 items-end mb-8 shrink-0">
          <img src={profileImg} className="w-28 h-36 object-cover border-4 border-white shadow-xl" />
          <div className="flex-1"><h1 className="text-4xl font-black uppercase border-b-4 pb-2" style={{ borderColor: theme, color: theme }}>{fullName}</h1>{summary && <p className="text-[11px] text-zinc-500 mt-2 italic">{summary}</p>}</div>
        </div>
        <div className="flex-1 flex gap-8">
          <div className="flex-1 flex flex-col">
            <section className="mb-6"><h2 className="text-[10px] font-black uppercase bg-zinc-800 text-white px-2 py-1 mb-3">Education</h2><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></section>
            <section className="pt-4 border-t mt-auto"><h2 className="text-[10px] font-black uppercase bg-zinc-800 text-white px-2 py-1 mb-3">References</h2><div className="grid grid-cols-2 text-[10px] gap-4">{refList.map((r: any, i: number) => <div key={i}><b>{r.name}</b><br/>{r.phone}</div>)}</div></section>
            <DateSignature show={cvData.showDS} />
          </div>
          <div className="w-52 bg-zinc-50 p-6 rounded-3xl space-y-6 h-fit shrink-0">
            <section><h3 className="font-black text-[10px] border-b pb-1 mb-2">Contact</h3><div className="text-[10px] space-y-1"><p>{phone1}</p><p className="truncate">{email}</p></div></section>
            <section><h3 className="font-black text-[10px] border-b pb-1 mb-2">Details</h3><PersonalInfoList /></section>
          </div>
        </div>
      </div>
    </A4Page>
  );

  const Layout7 = () => (
    <A4Page>
      <div className="p-12 flex h-full gap-10">
        <div className="flex-1 flex flex-col">
          <header><h1 className="text-4xl font-black uppercase italic leading-none" style={{ color: theme }}>{fullName}</h1>{summary && <p className="text-zinc-500 mt-4 text-[11px]">{summary}</p>}</header>
          <section className="mt-8"><h2 className="font-black uppercase text-[10px] mb-4 text-white px-3 py-1 inline-block" style={{ backgroundColor: theme }}>Education</h2><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></section>
          <section className="pt-6 border-t mt-auto"><h2 className="font-black uppercase text-[10px] mb-4" style={{ color: theme }}>References</h2><div className="grid grid-cols-2 gap-6 text-[10px]">{refList.map((r: any, i: number) => <div key={i}><b>{r.name}</b><br/>{r.phone}</div>)}</div></section>
          <DateSignature show={cvData.showDS} />
        </div>
        <div className="w-52 flex flex-col gap-8 shrink-0 border-l pl-10">
          <img src={profileImg} className="w-full h-48 object-cover rounded shadow-lg" />
          <section><h3 className="font-black uppercase text-[10px] opacity-40 mb-3">Contact</h3><div className="text-[10px] space-y-2"><p>{phone1}</p><p className="truncate">{email}</p></div></section>
          <section><h3 className="font-black uppercase text-[10px] opacity-40 mb-3">Personal</h3><PersonalInfoList /></section>
        </div>
      </div>
    </A4Page>
  );

  const Layout8 = () => (
    <A4Page>
      <div className="p-12 flex flex-col h-full text-[11px]">
        <div className="text-center border-b-2 pb-6 mb-8 shrink-0" style={{ borderColor: theme }}>
          <img src={profileImg} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 p-1" style={{ borderColor: theme }} />
          <h1 className="text-3xl font-black uppercase tracking-widest">{fullName}</h1>
          <p className="mt-2 text-zinc-400 font-bold text-[9px] uppercase">{phone1} | {email}</p>
        </div>
        <div className="flex-1 flex flex-col space-y-6">
          {summary && <p className="text-center italic px-10 text-zinc-600">"{summary}"</p>}
          <section><h2 className="font-black uppercase bg-zinc-50 px-4 py-1.5 mb-3 border-l-4" style={{ borderColor: theme }}>Personal Data</h2><div className="px-4"><PersonalInfoList /></div></section>
          <section><h2 className="font-black uppercase bg-zinc-50 px-4 py-1.5 mb-3 border-l-4" style={{ borderColor: theme }}>Education</h2><div className="px-4"><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></div></section>
          <section className="pt-4 border-t px-4 mt-auto"><h2 className="font-black uppercase text-[10px] mb-3" style={{ color: theme }}>References</h2><div className="grid grid-cols-2 gap-6 text-[10px]">{refList.map((r: any, i: number) => <div key={i}><b>{r.name}</b><br/>{r.phone}</div>)}</div></section>
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
