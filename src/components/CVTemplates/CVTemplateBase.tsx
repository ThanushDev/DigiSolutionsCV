import React from 'react';
import { CVData } from '../../types/cv';
import { Mail, Phone, MapPin, User, Briefcase, GraduationCap, Award, Globe } from 'lucide-react';

export function CVTemplateBase({ cvData }: { cvData: CVData }) {
  const theme = cvData.customColor;
  const photoClass = cvData.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-lg';

  // --- Common Components ---
  const EduTable = ({ title, data }: any) => (
    <div className="mt-4">
      <h4 className="font-black text-[10px] uppercase mb-2 bg-zinc-100 p-1 px-2 border-l-4" style={{ borderColor: theme }}>{title} (Index: {data.indexNumber}) - {data.year}</h4>
      <table className="w-full text-left border-collapse">
        <thead><tr className="border-b border-zinc-200"><th className="py-1 text-[9px] uppercase font-bold text-zinc-400">Subject</th><th className="py-1 text-[9px] uppercase font-bold text-zinc-400 text-right">Grade</th></tr></thead>
        <tbody>{data.subjects.map((s: any, i: number) => (<tr key={i} className="border-b border-zinc-50"><td className="py-1 text-[10px]">{s.name}</td><td className="py-1 text-[10px] font-bold text-right italic">{s.grade}</td></tr>))}</tbody>
      </table>
    </div>
  );

  // --- LAYOUT 1: THANUSH STYLE ---
  const Layout1 = () => (
    <div className="flex h-full min-h-[1120px] bg-white text-[11px] leading-relaxed">
      <div className="w-[32%] bg-zinc-900 text-white p-8 flex flex-col gap-6">
        <div className="flex justify-center"><img src={cvData.personalInfo.photo} className={`w-36 h-36 object-cover border-4 border-white/10 ${photoClass}`} /></div>
        <section>
          <h3 className="border-b border-white/20 pb-1 mb-3 text-[10px] font-black uppercase tracking-widest">Contact</h3>
          <div className="space-y-3 opacity-80">
            <p className="flex items-center gap-2 truncate"><Mail size={12}/> {cvData.contact.email}</p>
            <p className="flex items-center gap-2"><Phone size={12}/> {cvData.contact.phone1}</p>
            <p className="flex items-start gap-2"><MapPin size={12} className="mt-1"/> {cvData.contact.address}</p>
          </div>
        </section>
        <section>
          <h3 className="border-b border-white/20 pb-1 mb-3 text-[10px] font-black uppercase tracking-widest">Personal Info</h3>
          <div className="space-y-2 opacity-80 text-[10px]">
            <p><span className="font-bold">NIC:</span> {cvData.personalInfo.nicNumber}</p>
            <p><span className="font-bold">DOB:</span> {cvData.personalInfo.dateOfBirth}</p>
            <p><span className="font-bold">Status:</span> {cvData.personalInfo.civilStatus}</p>
            <p><span className="font-bold">Gender:</span> {cvData.personalInfo.gender}</p>
          </div>
        </section>
        <section>
          <h3 className="border-b border-white/20 pb-1 mb-3 text-[10px] font-black uppercase tracking-widest">Skills</h3>
          <div className="space-y-3">{cvData.skills.map((s, i) => <div key={i}><span>{s}</span><div className="h-1 bg-white/20 w-full mt-1"><div className="h-full bg-white" style={{ width: '85%' }}></div></div></div>)}</div>
        </section>
      </div>
      <div className="flex-1 p-12">
        <div className="mb-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter" style={{ color: theme }}>{cvData.personalInfo.name}</h1>
          <p className="text-sm font-bold opacity-60 uppercase tracking-widest mt-1">{cvData.personalInfo.fullName}</p>
          <p className="mt-6 text-zinc-600 text-[12px] leading-loose">{cvData.personalInfo.description}</p>
        </div>
        <div className="space-y-10">
          <section>
            <h2 className="text-sm font-black uppercase border-b-2 pb-1 mb-4 flex items-center gap-2" style={{ color: theme, borderColor: theme }}><GraduationCap size={18}/> Education</h2>
            <div className="grid grid-cols-2 gap-8"><EduTable title="G.C.E. A/L" data={cvData.education.aLevel} /><EduTable title="G.C.E. O/L" data={cvData.education.oLevel} /></div>
          </section>
          <section>
            <h2 className="text-sm font-black uppercase border-b-2 pb-1 mb-4 flex items-center gap-2" style={{ color: theme, borderColor: theme }}><Briefcase size={18}/> Experience</h2>
            {cvData.workExperience.map((w, i) => <div key={i} className="mb-4">
              <div className="flex justify-between font-bold text-xs"><span>{w.title}</span><span className="text-zinc-400">{w.duration}</span></div>
              <p className="italic text-zinc-500">{w.company}</p><p className="mt-1 text-zinc-600">{w.description}</p>
            </div>)}
          </section>
          <section>
            <h2 className="text-sm font-black uppercase border-b-2 pb-1 mb-4" style={{ color: theme, borderColor: theme }}>References</h2>
            <div className="grid grid-cols-2 gap-4">
              {cvData.references.map((r, i) => <div key={i} className="text-[10px]">
                <p className="font-black uppercase">{r.name}</p><p>{r.designation}</p><p>{r.organization}</p><p>{r.phone}</p>
              </div>)}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  // --- RENDER SELECTION ---
  const renderSelectedLayout = () => {
    switch(cvData.selectedTemplate) {
      case 1: return <Layout1 />;
      // ... (Layouts 2-8 implement common patterns like Layout 1 but with different CSS structures)
      default: return <Layout1 />;
    }
  };

  return (
    <div id="cv-render" className="w-[210mm] min-h-[297mm] bg-white shadow-2xl mx-auto overflow-hidden" style={{ filter: `brightness(${cvData.brightness}%)` }}>
      {renderSelectedLayout()}
    </div>
  );
}
