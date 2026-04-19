import React from 'react';
import { CVData, Subject } from '../../types/cv';
import { Mail, Phone, MapPin } from 'lucide-react';

const DateSignature = ({ show }: { show: boolean }) => {
  if (!show) return null;
  return (
    <div className="mt-auto pt-8 flex justify-between items-end w-full pb-4 px-4">
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

  // --- DATA MAPPING ---
  const pInfo = cvData.personalInfo || {};
  const contact = cvData.contact || {};
  
  const fullName = pInfo.name || ""; 
  const summary = pInfo.description || ""; 
  const nic = pInfo.nic || "";
  const gender = pInfo.gender || "";
  const nationality = pInfo.nationality || "";
  const religion = pInfo.religion || "";
  const civilStatus = pInfo.civilStatus || "";

  const phone1 = contact.phone1 || "";
  const phone2 = contact.phone2 || "";
  const email = contact.email || "";
  const address = contact.address || "";

  // ERROR FIX: Ensuring skills and languages are strings, even if they come as objects
  const skillsList = (cvData.skills || []).map(s => typeof s === 'object' ? (s as any).name : s).filter(Boolean);
  const langList = (cvData.languages || []).map(l => typeof l === 'object' ? (l as any).name : l).filter(Boolean);
  
  const qualList = (cvData.professionalQualifications || []).map((q: any) => typeof q === 'string' ? q : q.qualification).filter(Boolean);
  const workExpList = cvData.workExperience || [];
  const refList = cvData.references || [];
  const showDS = cvData.showDS;
  const profileImg = pInfo.photo || cvData.profileImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  const SectionTitle = ({ title, color = theme }: { title: string, color?: string }) => (
    <h3 className="text-[10px] font-black uppercase mb-2 border-b-2 pb-0.5" style={{ color, borderColor: color }}>{title}</h3>
  );

  const PersonalInfoList = ({ isDark = false }) => (
    <div className={`space-y-1 text-[9px] font-bold uppercase ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
      {nic && <div className="grid grid-cols-[80px_1fr]"><span>NIC Number:</span> <span>{nic}</span></div>}
      {gender && <div className="grid grid-cols-[80px_1fr]"><span>Gender:</span> <span>{gender}</span></div>}
      {nationality && <div className="grid grid-cols-[80px_1fr]"><span>Nationality:</span> <span>{nationality}</span></div>}
      {religion && <div className="grid grid-cols-[80px_1fr]"><span>Religion:</span> <span>{religion}</span></div>}
      {civilStatus && <div className="grid grid-cols-[80px_1fr]"><span>Civil Status:</span> <span>{civilStatus}</span></div>}
    </div>
  );

  const ContentBody = () => (
    <div className="flex-1 space-y-6">
      {qualList.length > 0 && (
        <section>
          <SectionTitle title="Professional Qualifications" />
          <ul className="list-disc pl-5 space-y-1 text-[9px] text-zinc-700 font-medium">
            {qualList.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </section>
      )}

      {(cvData.education?.aLevel?.subjects?.length > 0 || cvData.education?.oLevel?.subjects?.length > 0) && (
        <section>
          <SectionTitle title="Education Qualifications" />
          {[cvData.education?.aLevel, cvData.education?.oLevel].map((edu, idx) => edu?.subjects?.length > 0 && (
            <div key={idx} className="mb-4 last:mb-0">
              <p className="font-bold text-[9px] uppercase mb-1">• G.C.E. {idx === 0 ? 'Advanced' : 'Ordinary'} Level - {edu.year}</p>
              <div className="grid grid-cols-2 gap-x-8 pl-4 text-[9px]">
                {edu.subjects.map((s: Subject, i: number) => (
                  <div key={i} className="flex justify-between border-b border-zinc-100 pb-1">
                    <span className="text-zinc-600">{s.name}</span><span className="font-black" style={{ color: theme }}>{s.grade}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {workExpList.length > 0 && (
        <section>
          <SectionTitle title="Work Experience" />
          <div className="space-y-3">
            {workExpList.map((exp: any, i: number) => (
              <div key={i} className="text-[9px]">
                <div className="font-bold text-zinc-800 uppercase tracking-tight">{exp.title} | {exp.company}</div>
                <div className="text-[8px] text-zinc-400 font-bold mb-1">{exp.duration}</div>
                <p className="text-zinc-600 leading-tight whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {refList.some(r => r.name) && (
        <section>
          <SectionTitle title="References" />
          <div className="grid grid-cols-2 gap-6 text-[8px]">
            {refList.map((r: any, i: number) => r.name && (
              <div key={i} className="text-zinc-700 font-medium">
                <b className="text-[9px] text-zinc-900 uppercase font-black">{r.name}</b><br/>
                {r.designation && <>{r.designation}<br/></>}
                {r.organization && <>{r.organization}<br/></>}
                <span className="font-black mt-1 block" style={{ color: theme }}>{r.phone}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderCurrentTemplate = () => {
    switch (cvData.selectedTemplate) {
      case 1: // Classic Blue
        return (
          <div className="flex h-full">
            <div className="w-[32%] bg-zinc-50 border-r h-full p-8 flex flex-col gap-6 shrink-0 overflow-hidden text-zinc-600">
              <img src={profileImg} className="w-32 h-32 rounded-full border-4 mx-auto object-cover" style={{ borderColor: theme }} />
              <section><SectionTitle title="Contact" /><div className="space-y-2 text-[9px] font-bold"><p className="flex items-center gap-2"><Phone size={10}/> {phone1}</p>{phone2 && <p>{phone2}</p>}<p className="truncate">{email}</p><p className="whitespace-pre-wrap leading-relaxed">{address}</p></div></section>
              <section><SectionTitle title="Personal Info" /><PersonalInfoList /></section>
              {skillsList.length > 0 && <section><SectionTitle title="Skills" /><div className="flex flex-wrap gap-1">{skillsList.map((s, i) => <span key={i} className="bg-zinc-200 px-2 py-1 rounded text-[8px] font-black uppercase">{s}</span>)}</div></section>}
              {langList.length > 0 && <section><SectionTitle title="Languages" /><div className="space-y-1 text-[9px] font-bold">{langList.map((l, i) => <p key={i}>• {l}</p>)}</div></section>}
            </div>
            <div className="flex-1 p-10 flex flex-col overflow-hidden"><div className="mb-6"><h1 className="text-3xl font-black uppercase leading-none mb-3" style={{ color: theme }}>{fullName}</h1>{summary && <p className="text-zinc-500 italic text-[10px] leading-relaxed whitespace-pre-wrap">"{summary}"</p>}</div><ContentBody /><DateSignature show={showDS} /></div>
          </div>
        );
      case 2: // Modern Clean
        return (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="h-28 flex items-center justify-between px-10 text-white shrink-0" style={{ backgroundColor: theme }}>
              <div className="max-w-[70%]"><h1 className="text-2xl font-black uppercase tracking-tight">{fullName}</h1><p className="text-[9px] opacity-80 uppercase tracking-widest mt-1">{email} | {phone1}</p></div>
              <img src={profileImg} className="w-20 h-20 object-cover rounded-xl border-2 border-white/30" />
            </div>
            <div className="flex flex-1 p-10 gap-10 overflow-hidden">
              <div className="w-[28%] space-y-6 shrink-0"><section><SectionTitle title="Contact" /><div className="text-[9px] font-bold text-zinc-500 space-y-2"><p className="whitespace-pre-wrap">{address}</p><p>{phone1}</p></div></section><section><SectionTitle title="Personal" /><PersonalInfoList /></section>
              {skillsList.length > 0 && <section><SectionTitle title="Skills" /><div className="flex flex-wrap gap-1">{skillsList.map((s, i) => <span key={i} className="bg-zinc-100 px-2 py-1 rounded text-[8px] font-bold uppercase">{s}</span>)}</div></section>}
              {langList.length > 0 && <section><SectionTitle title="Languages" /><p className="text-[9px] font-bold text-zinc-500">{langList.join(', ')}</p></section>}
              </div>
              <div className="flex-1 flex flex-col">{summary && <p className="italic text-zinc-600 text-[9px] mb-6 border-l-4 pl-4 whitespace-pre-wrap" style={{ borderColor: theme }}>{summary}</p>}<ContentBody /><DateSignature show={showDS} /></div>
            </div>
          </div>
        );
      case 3: // Yellow Ribbon Bold
        return (
          <div className="flex flex-col h-full p-10 overflow-hidden">
            <div className="relative h-24 bg-zinc-900 rounded-[2rem] flex items-center px-10 mb-10 shrink-0">
              <div className="max-w-[60%]"><h1 className="text-xl font-black text-white uppercase italic leading-none">{fullName}</h1><p className="text-[8px] text-zinc-400 mt-1 uppercase tracking-widest">{email}</p></div>
              <img src={profileImg} className="absolute -bottom-4 right-10 w-24 h-24 rounded-[1.5rem] border-4 border-white object-cover shadow-2xl" />
            </div>
            <div className="grid grid-cols-12 gap-8 flex-1 overflow-hidden">
              <div className="col-span-4 space-y-6 shrink-0">
                <div className="p-7 rounded-[1.5rem] bg-zinc-50 border border-zinc-100 space-y-6">
                  <section className="text-left"><p className="text-[9px] font-black uppercase mb-2" style={{ color: theme }}>Contact Info</p><div className="text-[8px] text-zinc-500 font-bold space-y-1.5 leading-relaxed"><p className="whitespace-pre-wrap">{address}</p><p>{phone1}</p></div></section>
                  <section><p className="text-[9px] font-black uppercase mb-2" style={{ color: theme }}>Identity</p><PersonalInfoList /></section>
                  {skillsList.length > 0 && <section className="text-left"><p className="text-[9px] font-black uppercase mb-2" style={{ color: theme }}>Skills</p><div className="flex flex-wrap justify-start gap-1.5">{skillsList.map((s, i) => <span key={i} className="bg-zinc-200 px-2 py-0.5 rounded text-[8px] font-bold">{s}</span>)}</div></section>}
                  {langList.length > 0 && <section className="text-left"><p className="text-[9px] font-black uppercase mb-1" style={{ color: theme }}>Languages</p><p className="text-[8px] text-zinc-500 font-bold">{langList.join(' • ')}</p></section>}
                </div>
              </div>
              <div className="col-span-8 flex flex-col">{summary && <p className="text-[9px] text-zinc-500 italic mb-6 whitespace-pre-wrap">"{summary}"</p>}<ContentBody /><DateSignature show={showDS} /></div>
            </div>
          </div>
        );
      case 4: // Executive Dark
        return (
          <div className="flex h-full overflow-hidden text-zinc-300">
            <div className="w-[32%] bg-zinc-900 p-8 flex flex-col gap-6 shrink-0 overflow-hidden">
              <img src={profileImg} className="w-28 h-28 rounded-xl border-2 border-zinc-700 object-cover mx-auto" />
              <section><h3 className="border-b border-zinc-700 pb-1 mb-3 text-[9px] font-black uppercase text-zinc-400">Contact</h3><div className="text-[8px] space-y-3 font-bold opacity-80 whitespace-pre-wrap">{address}<br/>{phone1}<br/>{email}</div></section>
              <section><h3 className="border-b border-zinc-700 pb-1 mb-3 text-[9px] font-black uppercase text-zinc-400">Personal</h3><PersonalInfoList isDark={true} /></section>
              {skillsList.length > 0 && <section><h3 className="border-b border-zinc-700 pb-1 mb-3 text-[9px] font-black uppercase text-zinc-400">Expertise</h3><div className="flex flex-wrap gap-1">{skillsList.map((s, i) => <span key={i} className="bg-zinc-800 px-2 py-0.5 rounded text-[8px] uppercase">{s}</span>)}</div></section>}
              {langList.length > 0 && <section><h3 className="border-b border-zinc-700 pb-1 mb-3 text-[9px] font-black uppercase text-zinc-400">Languages</h3><div className="text-[8px] font-bold opacity-70">{langList.join(', ')}</div></section>}
            </div>
            <div className="flex-1 p-10 flex flex-col overflow-hidden bg-white text-zinc-800"><h1 className="text-3xl font-black uppercase tracking-tighter mb-4">{fullName}</h1>{summary && <p className="text-zinc-500 text-[9px] mb-6 border-l-2 pl-4 whitespace-pre-wrap">{summary}</p>}<ContentBody /><DateSignature show={showDS} /></div>
          </div>
        );
      case 5: // Minimalist
        return (
          <div className="flex flex-col h-full p-10 overflow-hidden text-zinc-800">
            <div className="flex justify-between items-start border-b-[4px] pb-6 mb-8 shrink-0" style={{ borderColor: theme }}>
              <div className="max-w-[75%]"><h1 className="text-2xl font-black uppercase mb-2 tracking-tight">{fullName}</h1><p className="text-[9px] font-bold text-zinc-500 leading-relaxed">{phone1} • {email} • {address.replace(/\n/g, ', ')}</p></div>
              <img src={profileImg} className="w-16 h-16 object-cover rounded-full" />
            </div>
            <div className="flex-1 flex gap-8 overflow-hidden">
              <div className="w-[28%] shrink-0 space-y-6"><section><SectionTitle title="Profile Details" /><PersonalInfoList /></section>
              {skillsList.length > 0 && <section><SectionTitle title="Skills" /><div className="flex flex-wrap gap-1">{skillsList.map((s, i) => <span key={i} className="bg-zinc-100 px-2 py-0.5 rounded text-[8px] font-black uppercase">{s}</span>)}</div></section>}
              {langList.length > 0 && <section><SectionTitle title="Languages" /><p className="text-[9px] font-bold text-zinc-500 uppercase">{langList.join(', ')}</p></section>}
              </div>
              <div className="flex-1 flex flex-col">{summary && <p className="text-[9px] text-zinc-600 italic mb-6 leading-relaxed whitespace-pre-wrap">{summary}</p>}<ContentBody /><DateSignature show={showDS} /></div>
            </div>
          </div>
        );
      case 6: // Creative Box
        return (
          <div className="p-4 h-full overflow-hidden"><div className="border border-zinc-200 h-full p-8 flex flex-col rounded-[2.5rem]">
            <div className="flex gap-6 mb-8 shrink-0">
              <img src={profileImg} className="w-20 h-28 object-cover rounded-2xl shadow-xl" />
              <div className="flex-1 pt-2"><h1 className="text-2xl font-black uppercase border-b-2 pb-2 mb-3 leading-none" style={{ borderColor: theme, color: theme }}>{fullName}</h1><p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">{phone1} | {email}</p></div>
            </div>
            <div className="flex-1 flex gap-8 overflow-hidden"><div className="flex-1 flex flex-col overflow-hidden"><ContentBody /></div>
            <div className="w-44 bg-zinc-50 p-6 rounded-[2rem] h-fit space-y-6 shrink-0 border border-zinc-100">
            <section><SectionTitle title="About Me" /><PersonalInfoList /></section>
            <section><SectionTitle title="Contact" /><p className="text-[8px] font-bold text-zinc-500 whitespace-pre-wrap leading-relaxed">{address}</p></section>
            {skillsList.length > 0 && <section><SectionTitle title="Skills" /><div className="flex flex-col gap-1 text-[8px] font-bold text-zinc-600">{skillsList.map((s, i) => <p key={i}>• {s}</p>)}</div></section>}
            {langList.length > 0 && <section><SectionTitle title="Languages" /><p className="text-[8px] font-bold text-zinc-500">{langList.join(', ')}</p></section>}
            </div></div><DateSignature show={showDS} />
          </div></div>
        );
      case 7: // Sidebar Elegant
        return (
          <div className="flex h-full gap-8 p-10 overflow-hidden text-zinc-800">
            <div className="flex-1 flex flex-col overflow-hidden"><h1 className="text-3xl font-black uppercase italic mb-6 tracking-tighter" style={{ color: theme }}>{fullName}</h1>{summary && <p className="text-zinc-500 text-[9px] mb-6 border-l-4 pl-4 leading-relaxed whitespace-pre-wrap" style={{ borderColor: theme }}>{summary}</p>}<ContentBody /><DateSignature show={showDS} /></div>
            <div className="w-[30%] shrink-0 border-l pl-8 space-y-6 text-zinc-600">
                <img src={profileImg} className="w-full h-40 object-cover rounded-3xl mb-4 shadow-lg" />
                <section><SectionTitle title="Connect" /><div className="text-[8px] font-bold space-y-2"><p className="whitespace-pre-wrap leading-relaxed">{address}</p><p>{phone1}</p><p>{email}</p></div></section>
                <section><SectionTitle title="Personal" /><PersonalInfoList /></section>
                {skillsList.length > 0 && <section><SectionTitle title="Top Skills" /><div className="flex flex-col gap-1.5">{skillsList.map((s, i) => <p key={i} className="text-[8px] font-black uppercase tracking-tighter">» {s}</p>)}</div></section>}
                {langList.length > 0 && <section><SectionTitle title="Languages" /><p className="text-[8px] font-black uppercase">{langList.join(' | ')}</p></section>}
            </div>
          </div>
        );
      case 8: // Premium Gold
        return (
          <div className="flex flex-col h-full p-10 items-center overflow-hidden text-zinc-800">
            <div className="text-center border-b-2 pb-6 mb-8 w-full shrink-0" style={{ borderColor: theme }}>
              <img src={profileImg} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 p-1" style={{ borderColor: theme }} />
              <h1 className="text-2xl font-black uppercase tracking-[0.2em] leading-none mb-3">{fullName}</h1>
              <p className="text-zinc-400 font-bold text-[8px] uppercase leading-relaxed">
                {phone1} | {email} <br/> {address.replace(/\n/g, ' ')}
              </p>
            </div>
            <div className="w-full grid grid-cols-12 gap-10 flex-1 overflow-hidden text-left">
              <div className="col-span-4 space-y-6 shrink-0 border-r border-zinc-100 pr-4">
                <section><SectionTitle title="Details" /><PersonalInfoList /></section>
                {skillsList.length > 0 && <section><SectionTitle title="Expertise" /><div className="space-y-1">{skillsList.map((s, i) => <p key={i} className="text-[8px] font-bold text-zinc-500 uppercase tracking-tight"># {s}</p>)}</div></section>}
                {langList.length > 0 && <section><SectionTitle title="Languages" /><p className="text-[8px] font-bold text-zinc-500 uppercase tracking-tight">{langList.join(', ')}</p></section>}
              </div>
              <div className="col-span-8 flex flex-col overflow-hidden">
                {summary && <p className="text-[9px] text-zinc-500 italic mb-8 text-left leading-relaxed whitespace-pre-wrap">"{summary}"</p>}
                <ContentBody /> 
              </div>
            </div><DateSignature show={showDS} />
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="bg-white" style={{ width: '210mm', height: '297mm', transform: `scale(${scale})`, transformOrigin: 'top center' }}>
      {renderCurrentTemplate()}
    </div>
  );
}
