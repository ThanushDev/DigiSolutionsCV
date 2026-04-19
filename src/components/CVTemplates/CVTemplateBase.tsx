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

  // --- DATA MAPPING SECTION (100% Guaranteed) ---
  const pInfo = cvData.personalInfo || {};
  const contactInfo = cvData.contact || {};
  
  const fullName = pInfo.name || ""; 
  const summary = pInfo.description || ""; 
  const nic = pInfo.nic || "";
  const gender = pInfo.gender || "";
  const nationality = pInfo.nationality || "";
  const religion = pInfo.religion || "";
  const civilStatus = pInfo.civilStatus || "";

  const skillsList = (cvData.skills || []).map((s: any) => typeof s === 'string' ? s : s.name).filter(Boolean);
  const langList = (cvData.languages || []).map((l: any) => typeof l === 'string' ? l : l.name).filter(Boolean);
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

  const MainBody = () => (
    <div className="flex-1 overflow-hidden">
      {/* Professional Qualifications */}
      {qualList.length > 0 && (
        <section className="mb-5">
          <SectionTitle title="Professional Qualifications" />
          <ul className="list-disc pl-5 space-y-1 text-[9px] text-zinc-700 font-medium">
            {qualList.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </section>
      )}

      {/* Education */}
      {(cvData.education?.aLevel?.subjects?.length > 0 || cvData.education?.oLevel?.subjects?.length > 0) && (
        <section className="mb-5">
          <SectionTitle title="Education Qualifications" />
          {[cvData.education?.aLevel, cvData.education?.oLevel].map((edu, idx) => edu?.subjects?.length > 0 && (
            <div key={idx} className="mb-4 last:mb-0">
              <p className="font-bold text-[9px] uppercase mb-1.5">• G.C.E. {idx === 0 ? 'Advanced' : 'Ordinary'} Level - {edu.year}</p>
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

      {/* Work Experience */}
      {workExpList.length > 0 && (
        <section className="mb-5">
          <SectionTitle title="Work Experience" />
          <div className="space-y-3">
            {workExpList.map((exp: any, i: number) => (
              <div key={i} className="text-[9px]">
                <div className="font-bold text-zinc-800 uppercase tracking-tight">{exp.title} | <span className="text-zinc-500">{exp.company}</span></div>
                <div className="text-[8px] text-zinc-400 font-bold mb-1">{exp.duration}</div>
                <p className="text-zinc-600 leading-tight">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
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

  const renderTemplate = () => {
    switch (cvData.selectedTemplate) {
      case 1: 
        return (
          <div className="flex h-full">
            <div className="w-[32%] bg-zinc-50 border-r h-full p-8 flex flex-col gap-6 shrink-0">
              <img src={profileImg} className="w-32 h-32 rounded-full border-4 mx-auto object-cover" style={{ borderColor: theme }} />
              <section><SectionTitle title="Contact" /><div className="space-y-2 text-[9px] font-bold text-zinc-600"><p className="flex items-center gap-2"><Phone size={11}/> {contactInfo.phone1}</p><p className="truncate flex items-center gap-2"><Mail size={11}/> {contactInfo.email}</p><p className="flex items-start gap-2"><MapPin size={11}/> {contactInfo.address}</p></div></section>
              <section><SectionTitle title="Personal Details" /><PersonalInfoList /></section>
              {skillsList.length > 0 && <section><SectionTitle title="Skills" /><div className="flex flex-wrap gap-1">{skillsList.map((s, i) => <span key={i} className="bg-zinc-200 px-2 py-1 rounded text-[8px] font-black uppercase">{s}</span>)}</div></section>}
              {langList.length > 0 && <section><SectionTitle title="Languages" /><div className="space-y-1 text-[9px] font-bold text-zinc-600">{langList.map((l, i) => <p key={i}>• {l}</p>)}</div></section>}
            </div>
            <div className="flex-1 p-10 flex flex-col h-full"><div className="mb-6"><h1 className="text-3xl font-black uppercase leading-none mb-3" style={{ color: theme }}>{fullName}</h1>{summary && <p className="text-zinc-500 italic text-[10px] leading-relaxed">"{summary}"</p>}</div><MainBody /><DateSignature show={showDS} /></div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col h-full">
            <div className="h-32 flex items-center justify-between px-10 text-white shrink-0" style={{ backgroundColor: theme }}>
              <div><h1 className="text-3xl font-black uppercase">{fullName}</h1><p className="text-[10px] opacity-80 uppercase tracking-widest mt-1">Professional CV</p></div>
              <img src={profileImg} className="w-24 h-24 object-cover rounded-xl border-2 border-white/30" />
            </div>
            <div className="flex-1 flex gap-8 p-10 overflow-hidden">
              <div className="w-[30%] space-y-6 shrink-0"><section><SectionTitle title="Contact" /><div className="text-[9px] font-bold text-zinc-500 space-y-1.5"><p>{contactInfo.phone1}</p><p className="truncate">{contactInfo.email}</p><p>{contactInfo.address}</p></div></section><section><SectionTitle title="Personal" /><PersonalInfoList /></section></div>
              <div className="flex-1 flex flex-col">{summary && <p className="italic text-zinc-600 text-[10px] mb-6 border-l-4 pl-4" style={{ borderColor: theme }}>{summary}</p>}<MainBody /><DateSignature show={showDS} /></div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col h-full p-10 overflow-hidden">
            <div className="relative h-28 bg-zinc-900 rounded-[2rem] flex items-center px-10 mb-12 shrink-0">
              <h1 className="text-2xl font-black text-white uppercase italic">{fullName}</h1>
              <img src={profileImg} className="absolute -bottom-6 right-10 w-28 h-28 rounded-[2rem] border-8 border-white object-cover shadow-2xl" />
            </div>
            <div className="grid grid-cols-12 gap-8 flex-1">
              <div className="col-span-4 space-y-6 shrink-0"><div className="p-6 rounded-[2rem] bg-zinc-50 border border-zinc-100 space-y-6"><section><p className="text-[10px] font-black uppercase text-center mb-2" style={{ color: theme }}>Contact</p><p className="text-[9px] text-zinc-500 text-center font-bold">{contactInfo.phone1}</p><p className="text-[9px] text-zinc-500 text-center font-bold truncate">{contactInfo.email}</p></section><PersonalInfoList /></div></div>
              <div className="col-span-8 flex flex-col">{summary && <p className="text-[10px] text-zinc-500 italic mb-6">"{summary}"</p>}<MainBody /><DateSignature show={showDS} /></div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex h-full overflow-hidden">
            <div className="w-[32%] bg-zinc-900 text-white p-8 flex flex-col gap-8 shrink-0">
              <img src={profileImg} className="w-32 h-32 rounded-2xl border-2 border-zinc-700 object-cover mx-auto" />
              <section><h3 className="border-b border-zinc-700 pb-1 mb-3 text-[10px] font-black uppercase text-zinc-400">Contact</h3><div className="text-[9px] space-y-3 font-bold"><p>{contactInfo.phone1}</p><p className="truncate">{contactInfo.email}</p></div></section>
              <section><h3 className="border-b border-zinc-700 pb-1 mb-3 text-[10px] font-black uppercase text-zinc-400">Personal</h3><PersonalInfoList isDark={true} /></section>
              {skillsList.length > 0 && <section><h3 className="border-b border-zinc-700 pb-1 mb-3 text-[10px] font-black uppercase text-zinc-400">Skills</h3><div className="flex flex-wrap gap-1">{skillsList.map((s, i) => <span key={i} className="bg-zinc-800 px-2 py-1 rounded text-[8px] font-bold">{s}</span>)}</div></section>}
            </div>
            <div className="flex-1 p-10 flex flex-col h-full overflow-hidden"><h1 className="text-4xl font-black uppercase tracking-tighter leading-none mb-4">{fullName}</h1>{summary && <p className="text-zinc-500 text-[10px] mb-6 leading-relaxed border-l-2 pl-4">{summary}</p>}<MainBody /><DateSignature show={showDS} /></div>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col h-full p-10 overflow-hidden">
            <div className="flex justify-between items-end border-b-[6px] pb-6 mb-8 shrink-0" style={{ borderColor: theme }}>
              <div className="max-w-[70%]"><h1 className="text-3xl font-black uppercase leading-none mb-3">{fullName}</h1><p className="text-[10px] font-bold text-zinc-500 uppercase">{contactInfo.phone1} • {contactInfo.email}</p></div>
              <img src={profileImg} className="w-20 h-20 object-cover rounded-full" />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="grid grid-cols-12 gap-8 flex-1 overflow-hidden">
                <div className="col-span-4 shrink-0"><SectionTitle title="Personal Info" /><PersonalInfoList /></div>
                <div className="col-span-8 flex flex-col">{summary && <p className="text-[10px] text-zinc-600 italic mb-6 leading-relaxed">{summary}</p>}<MainBody /></div>
              </div>
              <DateSignature show={showDS} />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="p-4 h-full overflow-hidden"><div className="border-2 border-zinc-100 h-full p-8 flex flex-col rounded-3xl">
            <div className="flex gap-6 mb-8 shrink-0">
              <img src={profileImg} className="w-24 h-32 object-cover rounded-2xl shadow-lg border-4 border-white" />
              <div className="flex-1 pt-2"><h1 className="text-3xl font-black uppercase border-b-4 pb-2 leading-none mb-3" style={{ borderColor: theme, color: theme }}>{fullName}</h1><p className="text-[10px] text-zinc-500 italic">{summary}</p></div>
            </div>
            <div className="flex-1 flex gap-8 overflow-hidden"><div className="flex-1"><MainBody /></div><div className="w-48 bg-zinc-50 p-5 rounded-[2rem] h-fit border border-zinc-100 shrink-0"><section><SectionTitle title="Details" /><PersonalInfoList /></section></div></div>
            <DateSignature show={showDS} />
          </div></div>
        );
      case 7:
        return (
          <div className="flex h-full gap-10 p-10 overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden"><h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none mb-6" style={{ color: theme }}>{fullName}</h1>{summary && <p className="text-zinc-500 text-[10px] mb-6 border-l-4 pl-4" style={{ borderColor: theme }}>{summary}</p>}<MainBody /><DateSignature show={showDS} /></div>
            <div className="w-[30%] shrink-0 border-l pl-8"><img src={profileImg} className="w-full h-44 object-cover rounded-3xl mb-6 shadow-lg" /><section><SectionTitle title="Personal" /><PersonalInfoList /></section></div>
          </div>
        );
      case 8:
        return (
          <div className="flex flex-col h-full p-10 items-center overflow-hidden">
            <div className="text-center border-b-4 pb-8 mb-8 w-full shrink-0" style={{ borderColor: theme }}>
              <img src={profileImg} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 p-1 shadow-md" style={{ borderColor: theme }} />
              <h1 className="text-3xl font-black uppercase tracking-widest leading-none mb-2">{fullName}</h1>
              <p className="text-zinc-400 font-black text-[10px] uppercase">{contactInfo.phone1} | {contactInfo.email}</p>
            </div>
            <div className="w-full grid grid-cols-12 gap-8 flex-1 overflow-hidden">
              <div className="col-span-4 shrink-0"><SectionTitle title="Personal Details" /><PersonalInfoList /></div>
              <div className="col-span-8 flex flex-col">
                {summary && <p className="text-[10px] text-zinc-500 italic mb-6 text-center leading-relaxed">"{summary}"</p>}
                <MainBody />
              </div>
            </div>
            <DateSignature show={showDS} />
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="bg-white shadow-none" style={{ width: '210mm', height: '297mm', transform: `scale(${scale})`, transformOrigin: 'top center' }}>
      {renderTemplate()}
    </div>
  );
}
