import React from 'react';
import { CVData, Subject } from '../../types/cv';
import { Mail, Phone, MapPin } from 'lucide-react';

export function CVTemplateBase({ cvData, scale = 1 }: { cvData: CVData; scale?: number }) {
  const theme = cvData.customColor || '#1e3a8a';
  const brightness = cvData.brightness || 100;

  // --- Data Extractors (උඹේ පරණ කෝඩ් එකේ තිබ්බ විදිහටමයි) ---
  const pInfo = cvData.personalInfo || {} as any;
  const contactInfo = cvData.contact || {} as any;

  const profileImg = cvData.profileImage || pInfo.photo || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const fullName = pInfo.name || pInfo.fullName || (cvData as any).fullName || '';
  const summary = pInfo.description || pInfo.objective || (cvData as any).professionalSummary || '';
  
  const nic = pInfo.nic || '';
  const dob = pInfo.dob || '';
  const gender = pInfo.gender || '';
  const nationality = pInfo.nationality || '';
  const religion = pInfo.religion || '';
  const civilStatus = pInfo.civilStatus || '';

  const phone1 = contactInfo.phone || contactInfo.phone1 || '';
  const email = contactInfo.email || '';
  const address = contactInfo.address || '';

  const getSkill = (s: any) => typeof s === 'string' ? s : s.name || '';
  const getQual = (q: any) => typeof q === 'string' ? q : q.qualification || q.name || '';
  
  const skillsList = cvData.skills?.map(getSkill).filter(Boolean) || [];
  const langList = cvData.languages?.map(getSkill).filter(Boolean) || [];
  const qualList = cvData.professionalQualifications?.map(getQual).filter(Boolean) || [];
  const workList = cvData.workExperience || [];
  const refList = cvData.references || [];

  // --- Strict A4 Wrapper ---
  const A4Page = ({ children }: { children: React.ReactNode }) => (
    <div className="w-[210mm] h-[297mm] bg-white overflow-hidden flex flex-col relative print:shadow-none shadow-none">
      {children}
    </div>
  );

  const PersonalInfoList = ({ isDark = false }) => (
    <div className={`space-y-1 text-[9px] font-bold uppercase ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
      {nic && <div className="grid grid-cols-[60px_1fr] border-b border-black/5 pb-0.5"><span>NIC:</span><span>{nic}</span></div>}
      {dob && <div className="grid grid-cols-[60px_1fr] border-b border-black/5 pb-0.5"><span>DOB:</span><span>{dob}</span></div>}
      {gender && <div className="grid grid-cols-[60px_1fr] border-b border-black/5 pb-0.5"><span>Gender:</span><span>{gender}</span></div>}
      {nationality && <div className="grid grid-cols-[60px_1fr] border-b border-black/5 pb-0.5"><span>Nationality:</span><span>{nationality}</span></div>}
      {civilStatus && <div className="grid grid-cols-[60px_1fr] border-b border-black/5 pb-0.5"><span>Status:</span><span>{civilStatus}</span></div>}
    </div>
  );

  const EduTable = ({ level, data }: { level: string, data: any }) => {
    if (!data || !data.subjects || data.subjects.length === 0) return null;
    return (
      <div className="mb-2">
        <p className="font-bold text-[10px] uppercase mb-1">• G.C.E. {level} - {data.year}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 pl-3 text-[9px]">
          {data.subjects.map((s: Subject, i: number) => (
            <div key={i} className="flex justify-between border-b border-zinc-100 italic">
              <span className="truncate pr-2">{s.name}</span><span className="font-bold" style={{ color: theme }}>{s.grade}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- layouts 1 to 8 (සියල්ලම A4 ලොක් කර ඇත) ---

  const Layout1 = () => (
    <A4Page>
      <div className="flex h-full">
        <div className="w-[32%] bg-zinc-50 border-r p-6 flex flex-col gap-5 h-full shrink-0">
          <img src={profileImg} className="w-32 h-32 rounded-full border-4 mx-auto object-cover" style={{ borderColor: theme }} />
          <section><h3 className="text-[11px] font-black uppercase mb-2" style={{ color: theme }}>Contact</h3><div className="space-y-2 text-[10px]"><p className="flex items-center gap-2"><Phone size={10}/> {phone1}</p><p className="flex items-center gap-2 truncate"><Mail size={10}/> {email}</p><p className="flex items-start gap-2"><MapPin size={10}/> {address}</p></div></section>
          <section><h3 className="text-[11px] font-black uppercase mb-2" style={{ color: theme }}>Personal Info</h3><PersonalInfoList /></section>
          <section><h3 className="text-[11px] font-black uppercase mb-2" style={{ color: theme }}>Skills</h3><div className="flex flex-wrap gap-1">{skillsList.map((s, i) => <span key={i} className="bg-white border px-1.5 py-0.5 rounded text-[8px] font-bold uppercase">{s}</span>)}</div></section>
        </div>
        <div className="flex-1 p-8 flex flex-col gap-4 overflow-hidden">
          <h1 className="text-3xl font-black uppercase" style={{ color: theme }}>{fullName}</h1>
          <section><h3 className="text-[11px] font-black uppercase border-b mb-2 pb-0.5" style={{ color: theme }}>Qualifications</h3><ul className="list-disc pl-4 text-[10px] space-y-0.5">{qualList.map((q, i) => <li key={i}>{q}</li>)}</ul></section>
          <section><h3 className="text-[11px] font-black uppercase border-b mb-2 pb-0.5" style={{ color: theme }}>Education</h3><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></section>
          <section className="mt-auto"><h3 className="text-[11px] font-black uppercase border-b mb-2 pb-0.5" style={{ color: theme }}>References</h3><div className="grid grid-cols-2 gap-4 text-[9px]">{refList.map((r: any, i: number) => <div key={i}><b>{r.name}</b><br/>{r.phone}</div>)}</div></section>
        </div>
      </div>
    </A4Page>
  );

  const Layout2 = () => (
    <A4Page>
      <div className="h-32 flex items-center justify-between px-10 text-white shrink-0" style={{ backgroundColor: theme }}>
        <h1 className="text-3xl font-black uppercase tracking-tight">{fullName}</h1>
        <img src={profileImg} className="w-24 h-24 object-cover rounded-full border-4 border-white/20 shadow-md" />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[30%] bg-zinc-50 border-r p-6 space-y-6">
          <section><h3 className="font-black uppercase text-[10px] border-b-2 mb-2 pb-1" style={{ borderColor: theme }}>Contact</h3><p className="text-[9px]">{phone1}<br/>{email}</p></section>
          <section><h3 className="font-black uppercase text-[10px] border-b-2 mb-2 pb-1" style={{ borderColor: theme }}>Personal</h3><PersonalInfoList /></section>
          <section><h3 className="font-black uppercase text-[10px] border-b-2 mb-2 pb-1" style={{ borderColor: theme }}>Skills</h3>{skillsList.map((s, i) => <div key={i} className="text-[8px] font-bold">• {s}</div>)}</section>
        </div>
        <div className="flex-1 p-8 flex flex-col gap-6 overflow-hidden">
          <section><h2 className="text-[11px] font-black uppercase mb-3" style={{ color: theme }}>Qualifications</h2><ul className="list-disc pl-5 text-[10px]">{qualList.map((q, i) => <li key={i}>{q}</li>)}</ul></section>
          <section><h2 className="text-[11px] font-black uppercase mb-3" style={{ color: theme }}>Education</h2><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></section>
          <section className="mt-auto border-t pt-4"><h2 className="text-[11px] font-black uppercase mb-2" style={{ color: theme }}>References</h2><div className="grid grid-cols-2 text-[9px]">{refList.map((r: any, i: number) => <div key={i}><b>{r.name}</b><br/>{r.phone}</div>)}</div></section>
        </div>
      </div>
    </A4Page>
  );

  const Layout3 = () => (
    <A4Page>
      <div className="p-6 h-full flex flex-col">
        <div className="h-24 bg-zinc-900 rounded-2xl flex items-center px-8 mb-10 text-white shrink-0 relative">
          <h1 className="text-2xl font-black uppercase italic">{fullName}</h1>
          <img src={profileImg} className="absolute -bottom-6 right-8 w-24 h-24 rounded-full border-4 border-white object-cover" />
        </div>
        <div className="flex-1 flex gap-8 overflow-hidden">
          <div className="w-[30%] space-y-4">
             <div className="p-4 rounded-xl border-2" style={{ borderColor: theme }}><h3 className="font-black uppercase text-[9px] mb-1">Contact</h3><p className="text-[8px] truncate">{phone1}<br/>{email}</p></div>
             <div className="p-4 rounded-xl bg-zinc-50 space-y-4"><PersonalInfoList /><section><h3 className="font-black uppercase text-[9px]">Skills</h3>{skillsList.map((s, i) => <div key={i} className="text-[8px] font-bold">• {s}</div>)}</section></div>
          </div>
          <div className="flex-1 space-y-4 overflow-hidden">
            <section><h2 className="text-[10px] font-black uppercase border-b-2 inline-block mb-2" style={{ borderColor: theme }}>Qualifications</h2><ul className="list-disc pl-4 text-[10px]">{qualList.map((q, i) => <li key={i}>{q}</li>)}</ul></section>
            <section><h2 className="text-[10px] font-black uppercase border-b-2 inline-block mb-2" style={{ borderColor: theme }}>Education</h2><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></section>
            <section className="mt-auto border-t pt-4"><div className="grid grid-cols-2 text-[9px]">{refList.map((r: any, i: number) => <div key={i}><b>{r.name}</b><br/>{r.phone}</div>)}</div></section>
          </div>
        </div>
      </div>
    </A4Page>
  );

  const Layout4 = () => (
    <A4Page>
      <div className="flex h-full">
        <div className="w-[28%] bg-zinc-900 text-white p-6 flex flex-col gap-6 shrink-0 h-full">
          <img src={profileImg} className="w-24 h-24 rounded-full border-2 border-zinc-700 mx-auto object-cover" />
          <section><h3 className="border-b border-zinc-700 pb-1 mb-2 text-[9px] font-black uppercase text-zinc-400">Contact</h3><p className="text-[9px]">{phone1}<br/>{email}</p></section>
          <section><h3 className="border-b border-zinc-700 pb-1 mb-2 text-[9px] font-black uppercase text-zinc-400">Personal Info</h3><PersonalInfoList isDark={true} /></section>
          <section><h3 className="border-b border-zinc-700 pb-1 mb-2 text-[9px] font-black uppercase text-zinc-400">Skills</h3>{skillsList.slice(0, 6).map((s, i) => <p key={i} className="text-[8px]">• {s}</p>)}</section>
        </div>
        <div className="flex-1 p-8 flex flex-col gap-6 overflow-hidden">
          <h1 className="text-3xl font-black uppercase text-zinc-800 leading-none">{fullName}</h1>
          <section><h2 className="text-[11px] font-black uppercase border-b-2 mb-2 pb-0.5" style={{ borderColor: theme }}>Qualifications</h2><ul className="list-disc pl-4 text-[10px]">{qualList.map((q, i) => <li key={i}>{q}</li>)}</ul></section>
          <section><h2 className="text-[11px] font-black uppercase border-b-2 mb-2 pb-0.5" style={{ borderColor: theme }}>Education</h2><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></section>
          <section className="mt-auto"><h2 className="text-[11px] font-black uppercase border-b-2 mb-2 pb-0.5" style={{ borderColor: theme }}>References</h2><div className="grid grid-cols-2 text-[10px]">{refList.map((r: any, i: number) => <div key={i}><b>{r.name}</b><br/>{r.phone}</div>)}</div></section>
        </div>
      </div>
    </A4Page>
  );

  const Layout5 = () => (
    <A4Page>
      <div className="p-10 flex flex-col h-full overflow-hidden">
        <div className="flex justify-between items-center border-b-4 pb-4 mb-6 shrink-0" style={{ borderColor: theme }}>
          <div><h1 className="text-3xl font-black uppercase">{fullName}</h1><p className="text-[9px] font-bold opacity-50">{phone1} | {email}</p></div>
          <img src={profileImg} className="w-20 h-20 object-cover border-2" style={{ borderColor: theme }} />
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 flex-1 overflow-hidden">
          <section className="col-span-2"><h2 className="text-[10px] font-black uppercase border-b mb-2" style={{ color: theme }}>Qualifications</h2><ul className="list-disc pl-4 grid grid-cols-2 gap-x-4 text-[10px]">{qualList.map((q, i) => <li key={i}>{q}</li>)}</ul></section>
          <section className="col-span-2"><h2 className="text-[10px] font-black uppercase border-b mb-2" style={{ color: theme }}>Education</h2><div className="grid grid-cols-2 gap-6"><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></div></section>
          <section><h2 className="text-[10px] font-black uppercase border-b mb-2" style={{ color: theme }}>Details</h2><PersonalInfoList /></section>
          <section><h2 className="text-[10px] font-black uppercase border-b mb-2" style={{ color: theme }}>Skills</h2><div className="flex flex-wrap gap-1">{skillsList.map((s, i) => <span key={i} className="bg-zinc-100 px-1.5 py-0.5 rounded text-[8px]">{s}</span>)}</div></section>
          <section className="col-span-2 mt-auto"><h2 className="text-[10px] font-black uppercase border-b mb-2" style={{ color: theme }}>References</h2><div className="grid grid-cols-3 gap-2 text-[9px]">{refList.map((r: any, i: number) => <div key={i}><b>{r.name}</b><br/>{r.phone}</div>)}</div></section>
        </div>
      </div>
    </A4Page>
  );

  const Layout6 = () => (
    <A4Page>
      <div className="m-4 border h-[calc(100%-2rem)] p-8 flex flex-col relative overflow-hidden">
        <div className="flex gap-6 items-end mb-8 shrink-0">
          <img src={profileImg} className="w-24 h-32 object-cover border-4 border-white shadow-md shrink-0" />
          <h1 className="text-3xl font-black uppercase border-b-4 w-full pb-2" style={{ borderColor: theme, color: theme }}>{fullName}</h1>
        </div>
        <div className="grid grid-cols-12 gap-8 flex-1 overflow-hidden">
          <div className="col-span-7 flex flex-col gap-5 overflow-hidden">
            <section><h2 className="text-[10px] font-black uppercase bg-zinc-800 text-white px-2 py-0.5 mb-2">Qualifications</h2><ul className="list-disc pl-4 text-[10px]">{qualList.map((q, i) => <li key={i}>{q}</li>)}</ul></section>
            <section className="flex-1"><h2 className="text-[10px] font-black uppercase bg-zinc-800 text-white px-2 py-0.5 mb-2">Education</h2><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></section>
            <section className="mt-auto"><h2 className="text-[10px] font-black uppercase bg-zinc-800 text-white px-2 py-0.5 mb-2">References</h2><div className="grid grid-cols-2 text-[9px]">{refList.map((r: any, i: number) => <div key={i}><b>{r.name}</b><br/>{r.phone}</div>)}</div></section>
          </div>
          <div className="col-span-5 bg-zinc-50 p-4 rounded-xl space-y-4 shrink-0 h-full">
            <section><h3 className="font-black text-[9px] border-b pb-1">Contact</h3><p className="text-[9px]">{phone1}<br/>{email}</p></section>
            <section><h3 className="font-black text-[9px] border-b pb-1">Details</h3><PersonalInfoList /></section>
            <section><h3 className="font-black text-[9px] border-b pb-1">Skills</h3><div className="space-y-1 text-[8px]">{skillsList.map((s, i) => <p key={i}>• {s}</p>)}</div></section>
          </div>
        </div>
      </div>
    </A4Page>
  );

  const Layout7 = () => (
    <A4Page>
      <div className="flex h-full p-10 gap-8">
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          <header><h1 className="text-3xl font-black uppercase italic leading-none" style={{ color: theme }}>{fullName}</h1></header>
          <section><h2 className="font-black uppercase text-[10px] mb-3 text-white px-2 py-0.5 inline-block" style={{ backgroundColor: theme }}>Qualifications</h2><ul className="list-disc pl-5 text-[10px]">{qualList.map((q, i) => <li key={i}>{q}</li>)}</ul></section>
          <section className="flex-1 overflow-hidden"><h2 className="font-black uppercase text-[10px] mb-2" style={{ color: theme }}>Education</h2><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></section>
          <section className="mt-auto border-t pt-4"><div className="grid grid-cols-2 text-[9px]">{refList.map((r: any, i: number) => <div key={i}><b>{r.name}</b><br/>{r.phone}</div>)}</div></section>
        </div>
        <div className="w-48 flex flex-col gap-6 shrink-0 h-full">
          <img src={profileImg} className="w-full h-48 object-cover rounded shadow-md border" />
          <section><h3 className="font-black uppercase text-[9px] opacity-40">Contact</h3><p className="text-[9px]">{phone1}<br/>{email}</p></section>
          <section><h3 className="font-black uppercase text-[9px] opacity-40">Personal</h3><PersonalInfoList /></section>
        </div>
      </div>
    </A4Page>
  );

  const Layout8 = () => (
    <A4Page>
      <div className="p-10 flex flex-col h-full text-[10px] leading-relaxed overflow-hidden">
        <div className="text-center border-b-2 pb-4 mb-4 shrink-0" style={{ borderColor: theme }}>
          <img src={profileImg} className="w-20 h-20 rounded-full mx-auto mb-2 object-cover border-2 p-0.5" style={{ borderColor: theme }} />
          <h1 className="text-2xl font-black uppercase leading-none">{fullName}</h1>
          <p className="mt-1 text-zinc-400 font-bold text-[8px] uppercase tracking-tighter">{address} | {phone1} | {email}</p>
        </div>
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <section><h2 className="font-black uppercase bg-zinc-50 px-3 py-0.5 mb-2 border-l-4" style={{ borderColor: theme }}>Personal Data</h2><div className="px-3"><PersonalInfoList /></div></section>
          <div className="grid grid-cols-2 gap-4 px-3">
            <section><h2 className="font-black uppercase text-[9px] border-b mb-1">Qualifications</h2><ul className="list-disc pl-4 text-[9px] space-y-0.5">{qualList.slice(0, 4).map((q, i) => <li key={i}>{q}</li>)}</ul></section>
            <section><h2 className="font-black uppercase text-[9px] border-b mb-1">Expertise</h2><p className="text-[9px]"><b>Skills:</b> {skillsList.join(', ')}</p></section>
          </div>
          <section className="flex-1 overflow-hidden"><h2 className="font-black uppercase bg-zinc-50 px-3 py-0.5 mb-2 border-l-4" style={{ borderColor: theme }}>Academic Details</h2><div className="px-3"><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></div></section>
          <section className="mt-auto pt-2"><h2 className="font-black uppercase bg-zinc-50 px-3 py-0.5 mb-1 border-l-4" style={{ borderColor: theme }}>References</h2><div className="grid grid-cols-2 px-3 gap-2 text-[9px]">{refList.map((r: any, i: number) => <div key={i}><b>{r.name}</b><br/>{r.phone}</div>)}</div></section>
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
    <div 
      id="cv-preview-root" 
      className="mx-auto shadow-2xl origin-top"
      style={{ transform: `scale(${scale})`, filter: `brightness(${brightness}%)` }}
    >
      {renderTemplate()}
    </div>
  );
}
