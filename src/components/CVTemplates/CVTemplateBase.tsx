import React from 'react';
import { CVData, Subject } from '../../types/cv';
import { Mail, Phone, MapPin } from 'lucide-react';

export function CVTemplateBase({ cvData, scale = 1 }: { cvData: CVData; scale?: number }) {
  const theme = cvData.customColor || '#1e3a8a';
  const brightness = cvData.brightness || 100;

  // --- Bulletproof Data Extractors (Fixes Missing Summary, NIC, DOB & Fallbacks) ---
  const pInfo = cvData.personalInfo || {} as any;
  const contactInfo = cvData.contact || {} as any;

  const profileImg = cvData.profileImage || pInfo.photo || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const fullName = pInfo.fullName || (cvData as any).fullName || (cvData as any).name || '';
  const summary = pInfo.objective || (cvData as any).professionalSummary || (cvData as any).summary || '';
  const nic = pInfo.nic || (cvData as any).nic || '';
  const dob = pInfo.dob || (cvData as any).dob || '';
  const civilStatus = pInfo.civilStatus || (cvData as any).civilStatus || '';

  const phone1 = contactInfo.phone1 || (cvData as any).phone1 || '';
  const phone2 = contactInfo.phone2 || (cvData as any).phone2 || '';
  const email = contactInfo.email || (cvData as any).email || '';
  const address = contactInfo.address || (cvData as any).address || '';

  const getSkill = (s: any) => typeof s === 'string' ? s : s.name || '';
  const getQual = (q: any) => typeof q === 'string' ? q : q.qualification || q.name || '';
  
  const skillsList = cvData.skills?.map(getSkill).filter(Boolean) || [];
  const langList = cvData.languages?.map(getSkill).filter(Boolean) || []; // Added Languages
  const qualList = cvData.professionalQualifications?.map(getQual).filter(Boolean) || [];
  const workList = cvData.workExperience || [];
  const refList = cvData.references || [];

  // --- Shared Education Component ---
  const EduTable = ({ level, data }: { level: string, data: any }) => {
    if (!data || !data.subjects || data.subjects.length === 0) return null;
    return (
      <div className="mb-4">
        <p className="font-bold text-[11px] uppercase mb-1">• Passed G.C.E. {level} - {data.year}</p>
        <p className="pl-4 text-[10px] text-zinc-500 font-bold italic mb-2">Index Number: {data.indexNumber}</p>
        <div className="grid grid-cols-2 gap-x-10 gap-y-1 pl-4 text-[11px]">
          {data.subjects.map((s: Subject, i: number) => (
            <div key={i} className="flex justify-between border-b border-zinc-100 pb-1">
              <span>{s.name}</span><span className="font-bold" style={{ color: theme }}>{s.grade}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ==========================================
  // LAYOUT 1: Professional Default
  // ==========================================
  const Layout1 = () => (
    <div className="flex h-full min-h-[1120px] bg-white text-[11px]">
      <div className="w-[33%] bg-zinc-50 border-r p-8 flex flex-col gap-8">
        <div className="flex flex-col items-center text-center">
          <img src={profileImg} className="w-36 h-36 rounded-full border-4 object-cover shadow-lg bg-zinc-200" style={{ borderColor: theme }} />
          
          <section className="w-full text-left mt-8">
            <h3 className="text-[12px] font-black uppercase tracking-wider mb-2" style={{ color: theme }}>Contact</h3><div className="h-[1px] bg-zinc-200 mb-4"></div>
            <div className="space-y-3 pl-1 text-zinc-600">
              <div className="flex items-center gap-2"><Phone size={12} style={{ color: theme }}/> {phone1} {phone2 && `/ ${phone2}`}</div>
              <div className="flex items-center gap-2 truncate"><Mail size={12} style={{ color: theme }}/> {email}</div>
              <div className="flex items-start gap-2"><MapPin size={12} className="mt-0.5" style={{ color: theme }}/> {address}</div>
            </div>
          </section>

          <section className="w-full text-left mt-6">
            <h3 className="text-[12px] font-black uppercase tracking-wider mb-2" style={{ color: theme }}>Personal Info</h3><div className="h-[1px] bg-zinc-200 mb-4"></div>
            <div className="space-y-2 pl-1 text-[10px] font-bold uppercase text-zinc-600">
              {nic && <p className="flex flex-col"><span className="text-zinc-400 text-[8px]">NIC:</span> {nic}</p>}
              {dob && <p className="flex flex-col"><span className="text-zinc-400 text-[8px]">DOB:</span> {dob}</p>}
              {civilStatus && <p className="flex flex-col"><span className="text-zinc-400 text-[8px]">Civil Status:</span> {civilStatus}</p>}
            </div>
          </section>

          <section className="w-full text-left mt-6">
            <h3 className="text-[12px] font-black uppercase tracking-wider mb-2" style={{ color: theme }}>Skills</h3><div className="h-[1px] bg-zinc-200 mb-4"></div>
            <div className="flex flex-wrap gap-2 pl-1">
              {skillsList.map((s, i) => <span key={i} className="bg-white border px-2 py-1 rounded text-[9px] font-bold uppercase shadow-sm">{s}</span>)}
            </div>
          </section>

          <section className="w-full text-left mt-6">
            <h3 className="text-[12px] font-black uppercase tracking-wider mb-2" style={{ color: theme }}>Languages</h3><div className="h-[1px] bg-zinc-200 mb-4"></div>
            <div className="flex flex-wrap gap-2 pl-1">
              {langList.map((l, i) => <span key={i} className="bg-white border px-2 py-1 rounded text-[9px] font-bold uppercase shadow-sm">{l}</span>)}
            </div>
          </section>
        </div>
      </div>

      <div className="flex-1 p-10 flex flex-col">
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase tracking-tighter" style={{ color: theme }}>{fullName}</h1>
          <div className="h-1.5 w-20 mt-2 mb-4" style={{ backgroundColor: theme }}></div>
          {summary && <p className="text-zinc-500 italic leading-relaxed">"{summary}"</p>}
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-[12px] font-black uppercase tracking-wider mb-2" style={{ color: theme }}>Professional Qualifications</h3><div className="h-[1px] bg-zinc-200 mb-4"></div>
            <ul className="space-y-2 pl-2 text-[11px] font-medium text-zinc-700">
              {qualList.map((q, i) => <li key={i} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: theme }}></span>{q}</li>)}
            </ul>
          </section>

          <section>
            <h3 className="text-[12px] font-black uppercase tracking-wider mb-2" style={{ color: theme }}>Academic Qualifications</h3><div className="h-[1px] bg-zinc-200 mb-4"></div>
            <EduTable level="Advanced Level" data={cvData.education?.aLevel} />
            <EduTable level="Ordinary Level" data={cvData.education?.oLevel} />
          </section>

          <section>
            <h3 className="text-[12px] font-black uppercase tracking-wider mb-2" style={{ color: theme }}>Work Experience</h3><div className="h-[1px] bg-zinc-200 mb-4"></div>
            <div className="space-y-4 pl-1">
              {workList.map((w: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between"><h4 className="font-black text-[11px] uppercase">{w.title || w.position}</h4><span className="text-[9px] font-bold text-zinc-400">{w.duration}</span></div>
                  <p className="text-[10px] font-bold" style={{ color: theme }}>{w.company}</p>
                  <p className="text-zinc-500 mt-1 text-[10px]">{w.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[12px] font-black uppercase tracking-wider mb-2" style={{ color: theme }}>References</h3><div className="h-[1px] bg-zinc-200 mb-4"></div>
            <div className="grid grid-cols-2 gap-8 pl-1">
              {refList.map((r: any, i: number) => (
                <div key={i}>
                  <p className="font-black uppercase text-[11px]">{r.name}</p>
                  <p className="text-zinc-600 text-[10px] font-medium">{r.designation}</p>
                  <p className="text-zinc-500 text-[10px]">{r.organization}</p>
                  <p className="text-[10px] font-black mt-1" style={{ color: theme }}>Phone: {r.phone}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // LAYOUT 2: Modern Corporate
  // ==========================================
  const Layout2 = () => (
    <div className="h-full min-h-[1120px] bg-white flex flex-col text-[11px]">
      <div className="h-44 flex items-center justify-between px-12 text-white" style={{ backgroundColor: theme }}>
        <div>
          <h1 className="text-4xl font-black uppercase">{fullName}</h1>
          <p className="text-sm opacity-80 uppercase tracking-widest mt-1">Professional Resume</p>
        </div>
        <img src={profileImg} className="w-32 h-32 object-cover rounded-lg border-4 border-white/20 shadow-lg bg-zinc-200" />
      </div>
      <div className="flex-1 flex">
        <div className="w-[30%] bg-zinc-50 border-r p-8 space-y-8">
          <section>
            <h3 className="font-black uppercase text-xs mb-3 border-b-2 pb-1" style={{ borderColor: theme }}>Contact</h3>
            <div className="space-y-3 opacity-80 text-[10px]">
              <p className="flex items-center gap-2"><Phone size={12}/> {phone1}</p>
              <p className="flex items-center gap-2"><Mail size={12}/> {email}</p>
              <p className="flex items-start gap-2"><MapPin size={12}/> {address}</p>
            </div>
          </section>
          <section>
            <h3 className="font-black uppercase text-xs mb-3 border-b-2 pb-1" style={{ borderColor: theme }}>Details</h3>
            <div className="space-y-2 opacity-80 text-[10px]">
              {nic && <p><b>NIC:</b><br/>{nic}</p>}
              {dob && <p><b>DOB:</b><br/>{dob}</p>}
            </div>
          </section>
          <section>
            <h3 className="font-black uppercase text-xs mb-3 border-b-2 pb-1" style={{ borderColor: theme }}>Skills</h3>
            {skillsList.map((s, i) => <div key={i} className="mb-1 font-bold text-[9px] uppercase">{s}</div>)}
          </section>
          <section>
            <h3 className="font-black uppercase text-xs mb-3 border-b-2 pb-1" style={{ borderColor: theme }}>Languages</h3>
            {langList.map((l, i) => <div key={i} className="mb-1 font-bold text-[9px] uppercase">{l}</div>)}
          </section>
        </div>
        <div className="flex-1 p-10 space-y-8">
          {summary && <p className="text-zinc-600 italic border-l-4 pl-4" style={{ borderColor: theme }}>{summary}</p>}
          <section>
            <h2 className="text-sm font-black uppercase mb-4" style={{ color: theme }}>Qualifications</h2>
            <ul className="list-disc pl-5 space-y-1">{qualList.map((q, i) => <li key={i}>{q}</li>)}</ul>
          </section>
          <section>
            <h2 className="text-sm font-black uppercase mb-4" style={{ color: theme }}>Education</h2>
            <EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} />
          </section>
          <section>
            <h2 className="text-sm font-black uppercase mb-4" style={{ color: theme }}>Experience</h2>
            {workList.map((w: any, i: number) => <div key={i} className="mb-3"><p className="font-black">{w.title || w.position}</p><p className="text-[10px] text-zinc-500">{w.company} | {w.duration}</p></div>)}
          </section>
          <section>
            <h2 className="text-sm font-black uppercase mb-4" style={{ color: theme }}>References</h2>
            <div className="grid grid-cols-2">{refList.map((r: any, i: number) => <div key={i}><p className="font-bold">{r.name}</p><p className="text-[10px]">{r.designation}<br/>{r.phone}</p></div>)}</div>
          </section>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // LAYOUT 3: Yellow Ribbon Bold
  // ==========================================
  const Layout3 = () => (
    <div className="h-full min-h-[1120px] bg-white p-8 text-[11px]">
      <div className="relative h-32 bg-zinc-900 rounded-3xl flex items-center px-12 mb-16">
        <div><h1 className="text-3xl font-black text-white uppercase italic">{fullName}</h1></div>
        <div className="absolute -bottom-10 right-12 w-32 h-32 p-1.5 bg-white rounded-full shadow-xl">
          <img src={profileImg} className="w-full h-full object-cover rounded-full bg-zinc-200" />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-4 space-y-8">
          <div className="p-6 rounded-3xl border-2" style={{ borderColor: theme }}>
            <h3 className="font-black uppercase text-xs mb-4">Contact</h3>
            <div className="space-y-3 text-[10px]"><p><Phone size={10} className="inline mr-2"/>{phone1}</p><p><Mail size={10} className="inline mr-2"/>{email}</p><p><MapPin size={10} className="inline mr-2"/>{address}</p></div>
          </div>
          <div className="p-6 rounded-3xl bg-zinc-50 space-y-6">
            <div><h3 className="font-black uppercase text-xs mb-3">Info</h3>{nic && <p className="text-[10px]">NIC: {nic}</p>}{dob && <p className="text-[10px]">DOB: {dob}</p>}</div>
            <div><h3 className="font-black uppercase text-xs mb-3">Skills</h3>{skillsList.map((s, i) => <div key={i} className="mb-1 text-[9px] font-bold">{s}</div>)}</div>
            <div><h3 className="font-black uppercase text-xs mb-3">Languages</h3>{langList.map((l, i) => <div key={i} className="mb-1 text-[9px] font-bold">{l}</div>)}</div>
          </div>
        </div>
        <div className="col-span-8 space-y-8 pr-4">
          {summary && <p className="italic text-zinc-600">"{summary}"</p>}
          <section><h2 className="text-sm font-black uppercase border-b-4 inline-block mb-4" style={{ borderColor: theme }}>Qualifications</h2><ul className="list-disc pl-4">{qualList.map((q, i) => <li key={i}>{q}</li>)}</ul></section>
          <section><h2 className="text-sm font-black uppercase border-b-4 inline-block mb-4" style={{ borderColor: theme }}>Education</h2><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></section>
          <section><h2 className="text-sm font-black uppercase border-b-4 inline-block mb-4" style={{ borderColor: theme }}>Experience</h2>{workList.map((w: any, i: number) => <div key={i} className="mb-2"><p className="font-bold">{w.title || w.position}</p><p className="text-[10px] opacity-60">{w.company}</p></div>)}</section>
          <section><h2 className="text-sm font-black uppercase border-b-4 inline-block mb-4" style={{ borderColor: theme }}>References</h2><div className="grid grid-cols-2">{refList.map((r: any, i: number) => <div key={i} className="text-[10px]"><b>{r.name}</b><br/>{r.phone}</div>)}</div></section>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // LAYOUT 4: Executive Minimalist
  // ==========================================
  const Layout4 = () => (
    <div className="flex h-full min-h-[1120px] bg-white text-[11px]">
      <div className="w-[30%] bg-zinc-900 text-white p-8 flex flex-col gap-6">
        <img src={profileImg} className="w-32 h-32 rounded-full border-2 border-zinc-500 object-cover mx-auto bg-zinc-800" />
        <section><h3 className="border-b border-zinc-700 pb-1 mb-3 text-[10px] font-black uppercase text-zinc-400">Contact</h3><div className="space-y-2 text-[9px]"><p>P: {phone1}</p><p>E: {email}</p><p>A: {address}</p></div></section>
        <section><h3 className="border-b border-zinc-700 pb-1 mb-3 text-[10px] font-black uppercase text-zinc-400">Details</h3><div className="space-y-2 text-[9px]">{nic && <p>NIC: {nic}</p>}{dob && <p>DOB: {dob}</p>}</div></section>
        <section><h3 className="border-b border-zinc-700 pb-1 mb-3 text-[10px] font-black uppercase text-zinc-400">Skills</h3><ul className="list-disc pl-4 text-[9px]">{skillsList.map((s, i) => <li key={i}>{s}</li>)}</ul></section>
        <section><h3 className="border-b border-zinc-700 pb-1 mb-3 text-[10px] font-black uppercase text-zinc-400">Languages</h3><ul className="list-disc pl-4 text-[9px]">{langList.map((l, i) => <li key={i}>{l}</li>)}</ul></section>
      </div>
      <div className="flex-1 p-10 space-y-8">
        <div><h1 className="text-4xl font-black uppercase tracking-widest text-zinc-800">{fullName}</h1>{summary && <p className="mt-2 text-zinc-500">{summary}</p>}</div>
        <section><h2 className="text-sm font-black uppercase mb-3 text-zinc-800" style={{ borderBottom: `2px solid ${theme}` }}>Pro Qualifications</h2><ul className="list-square pl-4 text-zinc-600">{qualList.map((q, i) => <li key={i}>{q}</li>)}</ul></section>
        <section><h2 className="text-sm font-black uppercase mb-3 text-zinc-800" style={{ borderBottom: `2px solid ${theme}` }}>Education</h2><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></section>
        <section><h2 className="text-sm font-black uppercase mb-3 text-zinc-800" style={{ borderBottom: `2px solid ${theme}` }}>Experience</h2>{workList.map((w: any, i: number) => <div key={i} className="mb-2"><span className="font-bold">{w.title || w.position}</span> <span className="text-[10px] text-zinc-400 ml-2">{w.duration}</span><br/><span className="text-[10px]">{w.company}</span></div>)}</section>
        <section><h2 className="text-sm font-black uppercase mb-3 text-zinc-800" style={{ borderBottom: `2px solid ${theme}` }}>References</h2><div className="flex gap-10">{refList.map((r: any, i: number) => <div key={i} className="text-[10px]"><b>{r.name}</b><br/>{r.organization}<br/>{r.phone}</div>)}</div></section>
      </div>
    </div>
  );

  // ==========================================
  // LAYOUT 5: Corporate Clean Grid
  // ==========================================
  const Layout5 = () => (
    <div className="h-full min-h-[1120px] bg-white p-12 text-[11px]">
      <div className="flex justify-between items-center border-b-4 pb-8 mb-8" style={{ borderColor: theme }}>
        <div><h1 className="text-4xl font-black uppercase tracking-tighter">{fullName}</h1><p className="text-xs font-bold opacity-50 uppercase tracking-widest mt-2">{phone1} | {email}</p></div>
        <img src={profileImg} className="w-28 h-28 object-cover border-4 border-zinc-100 bg-zinc-200" />
      </div>
      {summary && <p className="text-zinc-600 italic mb-8">{summary}</p>}
      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        <section><h2 className="text-xs font-black uppercase border-b pb-1 mb-4" style={{ color: theme, borderColor: theme }}>Personal Info</h2><div className="space-y-1 text-[10px]">{nic && <p><b>NIC:</b> {nic}</p>}{dob && <p><b>DOB:</b> {dob}</p>}<p><b>Address:</b> {address}</p></div></section>
        <section><h2 className="text-xs font-black uppercase border-b pb-1 mb-4" style={{ color: theme, borderColor: theme }}>Skills & Languages</h2><div className="flex flex-wrap gap-1">{[...skillsList, ...langList].map((s, i) => <span key={i} className="bg-zinc-100 px-2 py-0.5 rounded text-[9px]">{s}</span>)}</div></section>
        <section className="col-span-2"><h2 className="text-xs font-black uppercase border-b pb-1 mb-4" style={{ color: theme, borderColor: theme }}>Qualifications</h2><ul className="list-disc pl-4 grid grid-cols-2 gap-2">{qualList.map((q, i) => <li key={i}>{q}</li>)}</ul></section>
        <section className="col-span-2"><h2 className="text-xs font-black uppercase border-b pb-1 mb-4" style={{ color: theme, borderColor: theme }}>Education</h2><div className="grid grid-cols-2 gap-8"><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></div></section>
        <section><h2 className="text-xs font-black uppercase border-b pb-1 mb-4" style={{ color: theme, borderColor: theme }}>Experience</h2>{workList.map((w: any, i: number) => <div key={i} className="mb-2"><p className="font-bold">{w.title || w.position}</p><p className="text-[9px]">{w.company}</p></div>)}</section>
        <section><h2 className="text-xs font-black uppercase border-b pb-1 mb-4" style={{ color: theme, borderColor: theme }}>References</h2><div className="space-y-3">{refList.map((r: any, i: number) => <div key={i} className="text-[10px]"><b>{r.name}</b> - {r.phone}</div>)}</div></section>
      </div>
    </div>
  );

  // ==========================================
  // LAYOUT 6: Premium Golden Edge
  // ==========================================
  const Layout6 = () => (
    <div className="h-full min-h-[1120px] bg-zinc-50 p-6 text-[11px]">
      <div className="h-full bg-white border border-zinc-200 p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-zinc-50 rounded-bl-full"></div>
        <div className="flex gap-8 items-end mb-10 relative z-10">
          <img src={profileImg} className="w-32 h-40 object-cover border-4 border-white shadow-xl bg-zinc-200" />
          <div className="pb-2"><h1 className="text-4xl font-black uppercase tracking-tighter" style={{ color: theme }}>{fullName}</h1></div>
        </div>
        <div className="grid grid-cols-12 gap-10 relative z-10">
          <div className="col-span-7 space-y-8">
            {summary && <p className="italic text-zinc-600">{summary}</p>}
            <section><h2 className="text-sm font-black uppercase border-b-2 pb-1 mb-4" style={{ borderColor: theme }}>Qualifications</h2><ul className="list-disc pl-4">{qualList.map((q, i) => <li key={i}>{q}</li>)}</ul></section>
            <section><h2 className="text-sm font-black uppercase border-b-2 pb-1 mb-4" style={{ borderColor: theme }}>Education</h2><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></section>
            <section><h2 className="text-sm font-black uppercase border-b-2 pb-1 mb-4" style={{ borderColor: theme }}>Experience</h2>{workList.map((w: any, i: number) => <div key={i}><p className="font-bold">{w.title || w.position}</p><p className="text-[10px]">{w.company}</p></div>)}</section>
          </div>
          <div className="col-span-5 bg-zinc-50 p-6 rounded-3xl space-y-6">
            <section><h3 className="font-black uppercase text-xs mb-3">Contact</h3><div className="text-[10px] space-y-1"><p>{phone1}</p><p>{email}</p><p>{address}</p></div></section>
            <section><h3 className="font-black uppercase text-xs mb-3">Details</h3><div className="text-[10px] space-y-1">{nic && <p>NIC: {nic}</p>}{dob && <p>DOB: {dob}</p>}</div></section>
            <section><h3 className="font-black uppercase text-xs mb-3">Skills</h3><ul className="list-square pl-4 text-[10px]">{skillsList.map((s, i) => <li key={i}>{s}</li>)}</ul></section>
            <section><h3 className="font-black uppercase text-xs mb-3">Languages</h3><ul className="list-square pl-4 text-[10px]">{langList.map((l, i) => <li key={i}>{l}</li>)}</ul></section>
            <section><h3 className="font-black uppercase text-xs mb-3">References</h3><div className="space-y-3">{refList.map((r: any, i: number) => <div key={i} className="text-[10px]"><b>{r.name}</b><br/>{r.phone}</div>)}</div></section>
          </div>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // LAYOUT 7: Professional Timeline
  // ==========================================
  const Layout7 = () => (
    <div className="h-full min-h-[1120px] bg-white p-12 flex text-[11px]">
      <div className="flex-1 pr-10 border-r-2 border-zinc-100 space-y-8">
        <header><h1 className="text-4xl font-black uppercase italic" style={{ color: theme }}>{fullName}</h1>{summary && <p className="text-zinc-500 mt-2">{summary}</p>}</header>
        <section><h2 className="font-black uppercase text-xs mb-4 px-3 py-1 text-white inline-block" style={{ backgroundColor: theme }}>Qualifications</h2><ul className="list-disc pl-5">{qualList.map((q, i) => <li key={i}>{q}</li>)}</ul></section>
        <section><h2 className="font-black uppercase text-xs mb-4" style={{ color: theme }}>Education</h2><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></section>
        <section>
          <h2 className="font-black uppercase text-xs mb-4" style={{ color: theme }}>Timeline (Experience)</h2>
          <div className="space-y-4 border-l-2 ml-2 pl-4 border-zinc-200">
            {workList.map((w: any, i: number) => <div key={i} className="relative"><div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2" style={{ borderColor: theme }}></div><p className="font-bold">{w.title || w.position}</p><p className="text-[10px] text-zinc-500">{w.company} ({w.duration})</p></div>)}
          </div>
        </section>
      </div>
      <div className="w-56 pl-10 space-y-8">
        <img src={profileImg} className="w-full h-48 object-cover rounded shadow-lg bg-zinc-200" />
        <section><h3 className="font-black uppercase text-[10px] mb-3 opacity-50">Contact</h3><div className="space-y-2 text-[10px]"><p><b>P:</b><br/>{phone1}</p><p><b>E:</b><br/>{email}</p><p><b>A:</b><br/>{address}</p></div></section>
        <section><h3 className="font-black uppercase text-[10px] mb-3 opacity-50">Info</h3><div className="space-y-2 text-[10px]">{nic && <p><b>NIC:</b><br/>{nic}</p>}{dob && <p><b>DOB:</b><br/>{dob}</p>}</div></section>
        <section><h3 className="font-black uppercase text-[10px] mb-3 opacity-50">Skills & Languages</h3>{[...skillsList, ...langList].map((s, i) => <div key={i} className="text-[10px] font-bold mb-1">{s}</div>)}</section>
        <section><h3 className="font-black uppercase text-[10px] mb-3 opacity-50">References</h3>{refList.map((r: any, i: number) => <div key={i} className="text-[10px] mb-2"><b>{r.name}</b><br/>{r.phone}</div>)}</section>
      </div>
    </div>
  );

  // ==========================================
  // LAYOUT 8: Classic Accountant
  // ==========================================
  const Layout8 = () => (
    <div className="h-full min-h-[1120px] bg-white p-14 text-[11px] leading-relaxed">
      <div className="text-center border-b-2 pb-8 mb-8" style={{ borderColor: theme }}>
        <img src={profileImg} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 bg-zinc-200" style={{ borderColor: theme }} />
        <h1 className="text-3xl font-black uppercase tracking-widest">{fullName}</h1>
        <p className="mt-2 text-zinc-500 font-bold text-[9px] tracking-widest uppercase">{address} | {phone1} | {email}</p>
      </div>
      <div className="space-y-8">
        {summary && <p className="text-center italic px-10 text-zinc-600">"{summary}"</p>}
        <section><h2 className="font-black uppercase bg-zinc-100 px-4 py-1 mb-4 border-l-4" style={{ borderColor: theme }}>Personal Data</h2><div className="grid grid-cols-2 gap-y-2 px-4">{nic && <p><b>NIC:</b> {nic}</p>}{dob && <p><b>DOB:</b> {dob}</p>}{civilStatus && <p><b>Civil Status:</b> {civilStatus}</p>}</div></section>
        <section><h2 className="font-black uppercase bg-zinc-100 px-4 py-1 mb-4 border-l-4" style={{ borderColor: theme }}>Skills & Languages</h2><div className="flex flex-wrap gap-3 px-4">{[...skillsList, ...langList].map((s, i) => <span key={i} className="font-bold">• {s}</span>)}</div></section>
        <section><h2 className="font-black uppercase bg-zinc-100 px-4 py-1 mb-4 border-l-4" style={{ borderColor: theme }}>Professional Qualifications</h2><ul className="list-disc pl-10">{qualList.map((q, i) => <li key={i}>{q}</li>)}</ul></section>
        <section><h2 className="font-black uppercase bg-zinc-100 px-4 py-1 mb-4 border-l-4" style={{ borderColor: theme }}>Academic Details</h2><div className="px-4 space-y-4"><EduTable level="A/L" data={cvData.education?.aLevel} /><EduTable level="O/L" data={cvData.education?.oLevel} /></div></section>
        <section><h2 className="font-black uppercase bg-zinc-100 px-4 py-1 mb-4 border-l-4" style={{ borderColor: theme }}>Experience</h2><div className="px-4 space-y-3">{workList.map((w: any, i: number) => <div key={i}><p className="font-bold">{w.title || w.position} at {w.company}</p><p className="text-[10px] text-zinc-500">{w.duration}</p></div>)}</div></section>
        <section><h2 className="font-black uppercase bg-zinc-100 px-4 py-1 mb-4 border-l-4" style={{ borderColor: theme }}>References</h2><div className="grid grid-cols-2 px-4">{refList.map((r: any, i: number) => <div key={i}><p className="font-black">{r.name}</p><p>{r.designation}</p><p className="font-bold" style={{ color: theme }}>{r.phone}</p></div>)}</div></section>
      </div>
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
    <div 
      id="cv-preview-root"
      className="w-[210mm] min-h-[297mm] bg-white shadow-2xl mx-auto overflow-hidden print:shadow-none origin-top"
      style={{ transform: `scale(${scale})`, filter: `brightness(${brightness}%)` }}
    >
      {renderTemplate()}
    </div>
  );
}
