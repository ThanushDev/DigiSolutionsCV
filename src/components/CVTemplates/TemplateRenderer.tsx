import React from 'react';
import { CVData } from '../../types/cv';
import { Mail, Phone, MapPin, Globe, Calendar, Briefcase, GraduationCap, Award, Star, User } from 'lucide-react';

export function TemplateRenderer({ cvData }: { cvData: CVData }) {
  const themeColor = cvData.customColor || '#1e3a8a';

  // --- Helper Components ---
  const SectionTitle = ({ title, icon: Icon }: any) => (
    <div className="flex items-center gap-2 mb-4 border-b-2 pb-1" style={{ borderColor: themeColor }}>
      <Icon size={18} style={{ color: themeColor }} />
      <h3 className="text-sm font-black uppercase tracking-wider" style={{ color: themeColor }}>{title}</h3>
    </div>
  );

  const SkillBar = ({ name, level }: { name: string, level?: number }) => (
    <div className="mb-2">
      <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
        <span>{name}</span>
      </div>
      <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
        <div className="h-full" style={{ width: `${level || 80}%`, backgroundColor: themeColor }}></div>
      </div>
    </div>
  );

  // --- Layouts ---

  // 1. Classic Sidebar (Based on Thanush Image)
  const Layout1 = () => (
    <div className="flex h-full min-h-[1120px] bg-white">
      <div className="w-[35%] bg-slate-800 text-white p-8 flex flex-col gap-8">
        <div className="flex flex-col items-center text-center">
          <img src={cvData.profileImage} className="w-32 h-32 rounded-full border-4 border-white/20 mb-4 object-cover" />
          <h2 className="text-xl font-bold uppercase leading-tight">{cvData.personalInfo.fullName}</h2>
        </div>
        <div>
          <h3 className="border-b border-white/20 pb-1 mb-4 text-xs font-black uppercase">Contact</h3>
          <div className="space-y-3 text-[10px] opacity-90">
            <div className="flex items-center gap-2"><Phone size={12}/> {cvData.personalInfo.phone}</div>
            <div className="flex items-center gap-2 truncate"><Mail size={12}/> {cvData.personalInfo.email}</div>
            <div className="flex items-start gap-2"><MapPin size={12} className="mt-0.5"/> {cvData.personalInfo.address}</div>
          </div>
        </div>
        <div>
          <h3 className="border-b border-white/20 pb-1 mb-4 text-xs font-black uppercase">Skills</h3>
          <ul className="list-disc list-inside text-[10px] space-y-1">
            {cvData.skills.map((s, i) => <li key={i}>{s.name}</li>)}
          </ul>
        </div>
      </div>
      <div className="flex-1 p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-800 uppercase">{cvData.personalInfo.fullName}</h1>
          <p className="text-sm text-zinc-500 mt-2 italic">{cvData.personalInfo.objective}</p>
        </div>
        <div className="space-y-8">
          <section>
            <SectionTitle title="Education" icon={GraduationCap} />
            {cvData.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between font-bold text-xs uppercase">
                  <span>{edu.degree}</span>
                  <span className="text-zinc-400">{edu.year}</span>
                </div>
                <p className="text-[11px] text-zinc-600">{edu.school}</p>
              </div>
            ))}
          </section>
          <section>
            <SectionTitle title="Work Experience" icon={Briefcase} />
            {cvData.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between font-bold text-xs uppercase">
                  <span>{exp.position}</span>
                  <span className="text-zinc-400">{exp.duration}</span>
                </div>
                <p className="text-[11px] font-bold text-zinc-700">{exp.company}</p>
                <p className="text-[10px] text-zinc-500 mt-1">{exp.description}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );

  // 2. Modern Header (Based on Steven Terry)
  const Layout2 = () => (
    <div className="h-full min-h-[1120px] bg-white flex flex-col">
      <div className="h-48 bg-sky-700 p-10 flex justify-between items-center text-white">
        <div>
          <h1 className="text-4xl font-black uppercase">{cvData.personalInfo.fullName}</h1>
          <p className="text-lg opacity-80 uppercase tracking-widest">{cvData.experience[0]?.position || 'Professional'}</p>
        </div>
        <img src={cvData.profileImage} className="w-36 h-36 rounded-full border-8 border-white/20 object-cover shadow-2xl" />
      </div>
      <div className="flex flex-1">
        <div className="w-72 bg-slate-900 text-white p-8">
           <div className="space-y-8">
              <div>
                <h3 className="text-xs font-black uppercase mb-4 border-b border-white/10 pb-1">Personal</h3>
                <div className="text-[10px] space-y-2 opacity-70">
                  <p>DOB: {cvData.personalInfo.dob}</p>
                  <p>NIC: {cvData.personalInfo.nic}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase mb-4 border-b border-white/10 pb-1">Skills</h3>
                {cvData.skills.map((s, i) => <SkillBar key={i} name={s.name} level={85} />)}
              </div>
           </div>
        </div>
        <div className="flex-1 p-10 space-y-8">
           <section>
              <h3 className="text-sm font-black border-b-2 border-zinc-100 mb-4 pb-1 uppercase">Objective</h3>
              <p className="text-[11px] leading-relaxed text-zinc-600">{cvData.personalInfo.objective}</p>
           </section>
           <section>
              <h3 className="text-sm font-black border-b-2 border-zinc-100 mb-4 pb-1 uppercase">Work History</h3>
              {cvData.experience.map((exp, i) => (
                <div key={i} className="mb-6 pl-4 border-l-2 border-sky-700">
                  <span className="text-[10px] font-bold text-sky-700">{exp.duration}</span>
                  <h4 className="text-xs font-black uppercase">{exp.position}</h4>
                  <p className="text-[10px] font-bold text-zinc-400">{exp.company}</p>
                  <p className="text-[10px] text-zinc-500 mt-2">{exp.description}</p>
                </div>
              ))}
           </section>
        </div>
      </div>
    </div>
  );

  // 3. Ribbon Style (Based on Yellow Ribbon Image)
  const Layout3 = () => (
    <div className="h-full min-h-[1120px] bg-white p-8">
      <div className="relative mb-16 bg-zinc-900 h-32 flex items-center px-12 text-white">
        <div className="z-10">
          <h1 className="text-3xl font-black uppercase italic">{cvData.personalInfo.fullName}</h1>
          <p className="text-xs tracking-widest opacity-60 uppercase">{cvData.experience[0]?.position}</p>
        </div>
        <div className="absolute -bottom-10 right-12 w-32 h-32 bg-yellow-500 p-1.5 rounded-full">
           <img src={cvData.profileImage} className="w-full h-full rounded-full object-cover border-4 border-white" />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-10 mt-20">
        <div className="col-span-8 space-y-8">
          <section>
            <SectionTitle title="Experience" icon={Briefcase} />
            {cvData.experience.map((exp, i) => (
              <div key={i} className="mb-6">
                <h4 className="text-xs font-black">{exp.position}</h4>
                <p className="text-[10px] text-yellow-600 font-bold mb-1">{exp.company} | {exp.duration}</p>
                <p className="text-[10px] text-zinc-500">{exp.description}</p>
              </div>
            ))}
          </section>
        </div>
        <div className="col-span-4 bg-zinc-50 p-6 rounded-3xl border border-zinc-200">
           <h3 className="text-xs font-black bg-zinc-900 text-white px-3 py-1 inline-block mb-4 rounded-lg uppercase">Skills</h3>
           <div className="space-y-4">
              {cvData.skills.map((s, i) => <SkillBar key={i} name={s.name} level={90} />)}
           </div>
        </div>
      </div>
    </div>
  );

  // --- Logic to return selected template ---
  switch (cvData.selectedTemplate) {
    case 1: return <Layout1 />;
    case 2: return <Layout2 />;
    case 3: return <Layout3 />;
    // add 4, 5, 6, 7, 8 here following same pattern...
    default: return <Layout1 />;
  }
}
