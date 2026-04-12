import React from 'react';
import { CVData } from '../../types/cv';

interface Props { d: CVData }

// --- පොදු Components ---
const SectionTitle = ({ title, color = 'text-gray-800' }: { title: string, color?: string }) => (
  <h3 className={`text-sm font-black uppercase tracking-widest border-b-2 mb-4 pb-1 ${color}`}>{title}</h3>
);

const EduLevel = ({ title, level }: { title: string, level: any }) => (
  <div className="mb-4 text-left">
    <p className="font-bold text-[11px] uppercase bg-gray-50 px-2 py-0.5 inline-block">{title} ({level.year})</p>
    <p className="text-[10px] text-gray-500 mb-1">Index: {level.indexNumber}</p>
    <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 border-l-2 border-gray-100 pl-3">
      {level.subjects.map((s: any, i: number) => (
        <div key={i} className="flex justify-between text-[10px]">
          <span>{s.name}</span> <span className="font-bold">{s.grade}</span>
        </div>
      ))}
    </div>
  </div>
);

const PersonalGrid = ({ d }: Props) => (
  <div className="grid grid-cols-2 gap-2 text-[10px]">
    <div><span className="text-gray-400 uppercase font-bold text-[8px]">Full Name:</span> <p>{d.personalInfo.fullName}</p></div>
    <div><span className="text-gray-400 uppercase font-bold text-[8px]">NIC:</span> <p>{d.personalInfo.nicNumber}</p></div>
    <div><span className="text-gray-400 uppercase font-bold text-[8px]">DOB:</span> <p>{d.personalInfo.dateOfBirth}</p></div>
    <div><span className="text-gray-400 uppercase font-bold text-[8px]">Gender:</span> <p>{d.personalInfo.gender}</p></div>
    <div><span className="text-gray-400 uppercase font-bold text-[8px]">Nationality:</span> <p>{d.personalInfo.nationality}</p></div>
    <div><span className="text-gray-400 uppercase font-bold text-[8px]">Civil Status:</span> <p>{d.personalInfo.civilStatus}</p></div>
  </div>
);

const ReferencesSection = ({ d }: Props) => (
  <div className="grid grid-cols-2 gap-4 mt-4">
    {d.references.map((r, i) => (
      <div key={i} className="text-[10px]">
        <p className="font-bold underline">Ref {i+1}</p>
        <p>{r.name}</p>
        <p className="italic text-gray-500">{r.designation} - {r.organization}</p>
        <p>Tel: {r.phone}</p>
      </div>
    ))}
  </div>
);

// --- 1. MODERN PROFESSIONAL ---
const Template1 = ({ d }: Props) => (
  <div className="w-[210mm] min-h-[297mm] bg-white p-12 text-left border shadow-sm">
    <div className="flex gap-8 mb-10 border-b-4 border-blue-600 pb-8">
      <img src={d.personalInfo.photo} className={`w-36 h-36 object-cover ${d.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-2xl shadow-lg'}`} />
      <div>
        <h1 className="text-4xl font-black text-gray-900 leading-none mb-2 uppercase">{d.personalInfo.name}</h1>
        <p className="text-sm text-gray-500 mb-4">{d.contact.address} | {d.contact.phone1}</p>
        <p className="text-xs italic bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">{d.personalInfo.description}</p>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-10">
      <div className="col-span-1 space-y-8">
        <section><SectionTitle title="Personal Details" /><PersonalGrid d={d}/></section>
        <section><SectionTitle title="Skills" /><div className="flex flex-wrap gap-1">{d.skills.map((s,i)=><span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[9px] font-bold uppercase">{s}</span>)}</div></section>
      </div>
      <div className="col-span-2 space-y-8">
        <section><SectionTitle title="Academic History" color="text-blue-600"/><EduLevel title="GCE A/L" level={d.education.aLevel}/><EduLevel title="GCE O/L" level={d.education.oLevel}/></section>
        <section><SectionTitle title="Work Experience" color="text-blue-600"/>{d.workExperience.map((ex,i)=><div key={i} className="mb-3"><p className="font-bold text-sm">{ex.title}</p><p className="text-xs text-gray-500">{ex.company} ({ex.duration})</p></div>)}</section>
        <section><SectionTitle title="References" color="text-blue-600"/><ReferencesSection d={d}/></section>
      </div>
    </div>
  </div>
);

// --- 2. ROYAL BLUE SIDEBAR ---
const Template2 = ({ d }: Props) => (
  <div className="w-[210mm] min-h-[297mm] bg-white flex text-left border">
    <div className="w-1/3 bg-blue-900 text-white p-8 space-y-8">
      <img src={d.personalInfo.photo} className={`w-32 h-32 mx-auto border-4 border-blue-700 ${d.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-xl'}`} />
      <section><h3 className="border-b border-blue-700 mb-2 uppercase text-xs font-bold">Contact Info</h3><p className="text-[10px] opacity-80">{d.contact.phone1}<br/>{d.contact.email}<br/>{d.contact.address}</p></section>
      <section><h3 className="border-b border-blue-700 mb-2 uppercase text-xs font-bold">Bio Data</h3><div className="text-[10px] space-y-1"><p>NIC: {d.personalInfo.nicNumber}</p><p>DOB: {d.personalInfo.dateOfBirth}</p><p>Status: {d.personalInfo.civilStatus}</p></div></section>
      <section><h3 className="border-b border-blue-700 mb-2 uppercase text-xs font-bold">Skills</h3><ul className="text-[10px] list-disc list-inside">{d.skills.map((s,i)=><li key={i}>{s}</li>)}</ul></section>
    </div>
    <div className="w-2/3 p-10">
      <h1 className="text-5xl font-black text-blue-900 uppercase leading-none">{d.personalInfo.name}</h1>
      <p className="text-gray-400 font-bold mb-8 uppercase tracking-widest text-xs">Curriculum Vitae</p>
      <section className="mb-8"><SectionTitle title="Academic"/><EduLevel title="Advanced Level" level={d.education.aLevel}/><EduLevel title="Ordinary Level" level={d.education.oLevel}/></section>
      <section className="mb-8"><SectionTitle title="Professional Qualifications"/>{d.professionalQualifications.map((q,i)=><p key={i} className="text-[10px] mb-1 bg-gray-50 p-2">• {q}</p>)}</section>
      <section><SectionTitle title="Non-Related References"/><ReferencesSection d={d}/></section>
    </div>
  </div>
);

// --- 3. CREATIVE SLATE ---
const Template3 = ({ d }: Props) => (
  <div className="w-[210mm] min-h-[297mm] bg-white text-left border">
    <div className="bg-slate-800 text-white p-12 grid grid-cols-4 items-center">
       <div className="col-span-3">
          <h1 className="text-4xl font-black uppercase tracking-tighter">{d.personalInfo.name}</h1>
          <p className="text-slate-400 text-xs mt-2">{d.contact.email} | {d.contact.phone1} | {d.contact.address}</p>
       </div>
       <img src={d.personalInfo.photo} className="w-28 h-28 object-cover border-4 border-slate-700 rounded-full justify-self-end" />
    </div>
    <div className="p-12 space-y-10">
      <section><h3 className="text-slate-800 font-black border-l-8 border-slate-800 pl-4 mb-4 uppercase">Profile Overview</h3><p className="text-xs leading-relaxed text-gray-600">{d.personalInfo.description}</p></section>
      <div className="grid grid-cols-2 gap-10">
        <section><h3 className="font-bold text-slate-800 mb-4 uppercase">Educational</h3><EduLevel title="A/L" level={d.education.aLevel}/><EduLevel title="O/L" level={d.education.oLevel}/></section>
        <section><h3 className="font-bold text-slate-800 mb-4 uppercase">Languages</h3><div className="flex gap-2 flex-wrap">{d.languages.map((l,i)=><span key={i} className="border border-slate-200 px-3 py-1 rounded-full text-[10px]">{l}</span>)}</div><div className="mt-8"><h3 className="font-bold text-slate-800 mb-4 uppercase">Personal Information</h3><PersonalGrid d={d}/></div></section>
      </div>
      <section><h3 className="font-bold text-slate-800 mb-4 uppercase border-b">References</h3><ReferencesSection d={d}/></section>
    </div>
  </div>
);

// --- 4. EMERALD EXECUTIVE ---
const Template4 = ({ d }: Props) => (
  <div className="w-[210mm] min-h-[297mm] bg-white text-left border-t-[30px] border-emerald-900">
    <div className="p-12">
      <div className="flex justify-between items-start mb-12">
        <div className="max-w-2/3">
          <h1 className="text-5xl font-serif font-bold text-emerald-950 mb-4">{d.personalInfo.name}</h1>
          <p className="text-sm text-gray-600">{d.personalInfo.description}</p>
        </div>
        <img src={d.personalInfo.photo} className="w-32 h-40 object-cover border border-emerald-900 p-1 bg-white" />
      </div>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-4 bg-emerald-50 p-6 rounded-3xl space-y-6">
           <section><h4 className="font-bold text-emerald-900 mb-2 uppercase text-xs">Bio Details</h4><div className="text-[10px] space-y-2 font-medium">NIC: {d.personalInfo.nicNumber}<br/>Born: {d.personalInfo.dateOfBirth}<br/>Religion: {d.personalInfo.religion}</div></section>
           <section><h4 className="font-bold text-emerald-900 mb-2 uppercase text-xs">Contacts</h4><div className="text-[10px] text-emerald-800">{d.contact.phone1}<br/>{d.contact.email}</div></section>
        </div>
        <div className="col-span-8 space-y-8">
           <section><SectionTitle title="Academic Record" color="text-emerald-900"/><EduLevel title="A/L Examination" level={d.education.aLevel}/><EduLevel title="O/L Examination" level={d.education.oLevel}/></section>
           <section><SectionTitle title="References" color="text-emerald-900"/><ReferencesSection d={d}/></section>
        </div>
      </div>
    </div>
  </div>
);

// --- 5. DARK CORPORATE ---
const Template5 = ({ d }: Props) => (
  <div className="w-[210mm] min-h-[297mm] bg-zinc-900 text-white p-12 text-left border">
    <div className="flex gap-10 border-b border-zinc-700 pb-10 mb-10">
      <img src={d.personalInfo.photo} className="w-36 h-36 object-cover grayscale rounded-none border-2 border-zinc-700" />
      <div>
        <h1 className="text-5xl font-black uppercase tracking-widest leading-none">{d.personalInfo.name}</h1>
        <p className="text-blue-500 font-bold mt-4 tracking-tighter uppercase">{d.contact.email} / {d.contact.phone1}</p>
        <p className="text-xs text-zinc-400 mt-4 max-w-lg leading-relaxed">{d.personalInfo.description}</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-12">
      <section><h3 className="text-blue-500 font-bold mb-6 border-l-2 border-blue-500 pl-4 uppercase">Education</h3><EduLevel title="A-Level" level={d.education.aLevel}/><div className="mt-4"><EduLevel title="O-Level" level={d.education.oLevel}/></div></section>
      <div className="space-y-10">
        <section><h3 className="text-blue-500 font-bold mb-6 border-l-2 border-blue-500 pl-4 uppercase">Bio Information</h3><PersonalGrid d={d}/></section>
        <section><h3 className="text-blue-500 font-bold mb-6 border-l-2 border-blue-500 pl-4 uppercase">Referees</h3><ReferencesSection d={d}/></section>
      </div>
    </div>
  </div>
);

// --- 6. ELEGANT SERIF ---
const Template6 = ({ d }: Props) => (
  <div className="w-[210mm] min-h-[297mm] bg-white p-16 text-left border font-serif border-amber-800">
    <div className="text-center mb-12">
      <h1 className="text-5xl text-amber-900 border-b-2 border-amber-100 pb-4 inline-block px-10">{d.personalInfo.name}</h1>
      <p className="text-xs text-amber-700 mt-4 tracking-[0.3em] uppercase">{d.contact.address} • {d.contact.phone1}</p>
    </div>
    <div className="grid grid-cols-4 gap-12">
      <div className="col-span-1 space-y-8">
        <img src={d.personalInfo.photo} className="w-full grayscale border border-amber-200 p-1" />
        <section><h4 className="text-xs font-bold text-amber-900 border-b mb-2">PERSONAL</h4><div className="text-[10px] space-y-1">NIC: {d.personalInfo.nicNumber}<br/>Born: {d.personalInfo.dateOfBirth}<br/>{d.personalInfo.gender}</div></section>
      </div>
      <div className="col-span-3 space-y-10">
        <section><h3 className="text-lg text-amber-900 italic border-l-2 border-amber-800 pl-4 mb-4">Professional Profile</h3><p className="text-xs leading-relaxed text-gray-700 italic">{d.personalInfo.description}</p></section>
        <section><h3 className="text-lg text-amber-900 italic border-l-2 border-amber-800 pl-4 mb-4">Academic Background</h3><EduLevel title="GCE A/L" level={d.education.aLevel}/><EduLevel title="GCE O/L" level={d.education.oLevel}/></section>
        <section><h3 className="text-lg text-amber-900 italic border-l-2 border-amber-800 pl-4 mb-4">References</h3><ReferencesSection d={d}/></section>
      </div>
    </div>
  </div>
);

// --- 7. MINIMALIST CLEAN ---
const Template7 = ({ d }: Props) => (
  <div className="w-[210mm] min-h-[297mm] bg-white p-14 text-left border">
    <div className="flex justify-between items-baseline mb-16 border-b-2 border-black pb-4">
      <h1 className="text-4xl font-black uppercase tracking-tighter">{d.personalInfo.name}</h1>
      <p className="text-[10px] font-bold">{d.contact.email} / {d.contact.phone1}</p>
    </div>
    <div className="space-y-14">
      <section className="grid grid-cols-4 gap-4"><div className="col-span-1 text-[10px] font-black uppercase tracking-widest">About Me</div><div className="col-span-3 text-xs leading-relaxed text-gray-500">{d.personalInfo.description}</div></section>
      <section className="grid grid-cols-4 gap-4"><div className="col-span-1 text-[10px] font-black uppercase tracking-widest">Education</div><div className="col-span-3"><EduLevel title="Advanced Level" level={d.education.aLevel}/><EduLevel title="Ordinary Level" level={d.education.oLevel}/></div></section>
      <section className="grid grid-cols-4 gap-4"><div className="col-span-1 text-[10px] font-black uppercase tracking-widest">Information</div><div className="col-span-3"><PersonalGrid d={d}/></div></section>
      <section className="grid grid-cols-4 gap-4"><div className="col-span-1 text-[10px] font-black uppercase tracking-widest">Referrals</div><div className="col-span-3"><ReferencesSection d={d}/></div></section>
    </div>
  </div>
);

// --- 8. TECH CRIMSON ---
const Template8 = ({ d }: Props) => (
  <div className="w-[210mm] min-h-[297mm] bg-white text-left border">
    <div className="bg-red-900 text-white p-12 flex gap-10 items-center">
      <img src={d.personalInfo.photo} className="w-32 h-32 rounded-full border-4 border-red-800 object-cover shadow-2xl" />
      <div><h1 className="text-5xl font-black uppercase leading-none mb-2">{d.personalInfo.name}</h1><p className="text-red-300 font-mono text-xs">{d.contact.phone1} • {d.contact.email}</p></div>
    </div>
    <div className="p-12 space-y-10">
      <section><h3 className="text-red-900 font-black border-b-4 border-red-900 inline-block mb-4 uppercase text-sm italic">Core Academic Records</h3><div className="grid grid-cols-2 gap-8"><EduLevel title="A-Level" level={d.education.aLevel}/><EduLevel title="O-Level" level={d.education.oLevel}/></div></section>
      <div className="grid grid-cols-2 gap-10">
        <section><h3 className="text-red-900 font-black mb-4 uppercase text-xs">Bio Information</h3><PersonalGrid d={d}/></section>
        <section><h3 className="text-red-900 font-black mb-4 uppercase text-xs">Professional Skills</h3><div className="flex flex-wrap gap-2">{d.skills.map((s,i)=><span key={i} className="bg-red-50 text-red-700 border border-red-100 px-3 py-1 rounded text-[9px] font-bold">{s}</span>)}</div></section>
      </div>
      <section><h3 className="text-red-900 font-black mb-4 uppercase text-xs border-t pt-4">Official References</h3><ReferencesSection d={d}/></section>
    </div>
  </div>
);

// --- 9. INDIGO MODERN ---
const Template9 = ({ d }: Props) => (
  <div className="w-[210mm] min-h-[297mm] bg-slate-50 p-10 text-left border">
    <div className="bg-white rounded-[3rem] shadow-xl p-12">
      <div className="flex flex-col items-center text-center mb-10">
        <img src={d.personalInfo.photo} className="w-36 h-36 rounded-3xl object-cover shadow-lg mb-4 rotate-2" />
        <h1 className="text-4xl font-black text-indigo-950 uppercase">{d.personalInfo.name}</h1>
        <p className="text-indigo-600 font-bold text-xs">{d.contact.email} | {d.contact.phone1}</p>
      </div>
      <div className="grid grid-cols-2 gap-10">
        <section className="bg-indigo-50/50 p-6 rounded-3xl"><h3 className="text-indigo-900 font-bold mb-4 flex items-center gap-2"><div className="w-3 h-3 bg-indigo-600 rounded-full"/>Bio Data</h3><PersonalGrid d={d}/></section>
        <section className="bg-white p-6 rounded-3xl border border-indigo-100"><h3 className="text-indigo-900 font-bold mb-4 flex items-center gap-2"><div className="w-3 h-3 bg-indigo-600 rounded-full"/>Academic</h3><EduLevel title="GCE A/L" level={d.education.aLevel}/><EduLevel title="GCE O/L" level={d.education.oLevel}/></section>
      </div>
      <section className="mt-8"><h3 className="text-indigo-900 font-bold mb-4 border-b pb-2 uppercase text-xs tracking-widest">References</h3><ReferencesSection d={d}/></section>
    </div>
  </div>
);

// --- 10. GOLDEN STANDARD ---
const Template10 = ({ d }: Props) => (
  <div className="w-[210mm] min-h-[297mm] bg-white p-12 text-left border-t-[20px] border-amber-900 font-serif">
    <div className="flex justify-between items-start border-b-2 border-amber-900 pb-10 mb-10">
      <div className="max-w-xl"><h1 className="text-5xl font-bold text-amber-950 mb-4">{d.personalInfo.name}</h1><p className="text-xs text-gray-600 italic leading-relaxed">{d.personalInfo.description}</p></div>
      <img src={d.personalInfo.photo} className="w-32 h-40 object-cover border-2 border-amber-950 p-1 shadow-md" />
    </div>
    <div className="space-y-12">
      <section><h3 className="text-amber-900 font-black uppercase tracking-widest border-b mb-6 text-xs">I. Biographical Information</h3><PersonalGrid d={d}/></section>
      <section><h3 className="text-amber-900 font-black uppercase tracking-widest border-b mb-6 text-xs">II. Educational Qualifications</h3><EduLevel title="Advanced Level Examination" level={d.education.aLevel}/><EduLevel title="Ordinary Level Examination" level={d.education.oLevel}/></section>
      <section><h3 className="text-amber-900 font-black uppercase tracking-widest border-b mb-6 text-xs">III. Non-Related References</h3><ReferencesSection d={d}/></section>
    </div>
  </div>
);

// --- MAIN RENDERER COMPONENT ---
export function TemplateRenderer({ cvData, scale = 1 }: { cvData: CVData; scale?: number }) {
  const renderTemplate = () => {
    switch (cvData.selectedTemplate) {
      case 1: return <Template1 d={cvData} />;
      case 2: return <Template2 d={cvData} />;
      case 3: return <Template3 d={cvData} />;
      case 4: return <Template4 d={cvData} />;
      case 5: return <Template5 d={cvData} />;
      case 6: return <Template6 d={cvData} />;
      case 7: return <Template7 d={cvData} />;
      case 8: return <Template8 d={cvData} />;
      case 9: return <Template9 d={cvData} />;
      case 10: return <Template10 d={cvData} />;
      default: return <Template1 d={cvData} />;
    }
  };

  return (
    <div className="flex justify-center w-full overflow-hidden bg-transparent">
      <div 
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'top center',
          width: '210mm'
        }}
        className="shadow-2xl mb-10"
      >
        {renderTemplate()}
      </div>
    </div>
  );
}
