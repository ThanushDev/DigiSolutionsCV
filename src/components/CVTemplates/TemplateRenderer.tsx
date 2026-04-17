import React from 'react';
import { CVData } from '../../types/cv';
import { 
  Mail, Phone, MapPin, Briefcase, 
  GraduationCap, User 
} from 'lucide-react';

export function TemplateRenderer({ cvData }: { cvData: CVData }) {
  const themeColor = cvData.customColor || '#1e3a8a';

  // --- Helper: Array එකක් නැති වුණත් loop එක crash වීම වැළැක්වීමට ---
  const safeMap = (data: any) => (Array.isArray(data) ? data : []);

  // --- Helper: Section Titles ---
  const SectionTitle = ({ title, icon: Icon }: any) => (
    <div className="flex items-center gap-2 mb-4 border-b-2 pb-1" style={{ borderColor: themeColor }}>
      <Icon size={18} style={{ color: themeColor }} />
      <h3 className="text-sm font-black uppercase tracking-wider" style={{ color: themeColor }}>{title}</h3>
    </div>
  );

  // --- Layout 1: Classic Sidebar ---
  const Layout1 = () => (
    <div className="flex h-full min-h-[1120px] bg-white text-zinc-800 w-[210mm]">
      <div className="w-[35%] bg-slate-800 text-white p-8 flex flex-col gap-8">
        <div className="flex flex-col items-center text-center">
          <img 
            src={cvData.personalInfo?.photo || cvData.profileImage} 
            className="w-32 h-32 rounded-full border-4 border-white/20 mb-4 object-cover" 
            alt="Profile"
          />
          <h2 className="text-xl font-bold uppercase leading-tight">
            {cvData.personalInfo?.fullName || cvData.personalInfo?.name}
          </h2>
        </div>
        <div>
          <h3 className="border-b border-white/20 pb-1 mb-4 text-xs font-black uppercase tracking-tighter">Contact Info</h3>
          <div className="space-y-3 text-[10px] opacity-90">
            <div className="flex items-center gap-2"><Phone size={12}/> {cvData.contact?.phone1 || cvData.personalInfo?.phone}</div>
            <div className="flex items-center gap-2 truncate"><Mail size={12}/> {cvData.contact?.email || cvData.personalInfo?.email}</div>
            <div className="flex items-start gap-2"><MapPin size={12} className="mt-0.5"/> {cvData.contact?.address || cvData.personalInfo?.address}</div>
          </div>
        </div>
        <div>
          <h3 className="border-b border-white/20 pb-1 mb-4 text-xs font-black uppercase">Skills</h3>
          <ul className="list-disc list-inside text-[10px] space-y-1 opacity-80">
            {safeMap(cvData.skills).map((s: any, i: number) => (
              <li key={i}>{s.name || s}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 p-10">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-800 uppercase" style={{ color: themeColor }}>
            {cvData.personalInfo?.fullName || cvData.personalInfo?.name}
          </h1>
          <p className="text-[11px] text-zinc-500 mt-3 italic leading-relaxed">
            {cvData.personalInfo?.description || cvData.personalInfo?.objective}
          </p>
        </div>
        <div className="space-y-10">
          <section>
            <SectionTitle title="Work Experience" icon={Briefcase} />
            {safeMap(cvData.experience).map((exp: any, i: number) => (
              <div key={i} className="mb-5">
                <div className="flex justify-between font-bold text-xs uppercase">
                  <span>{exp.position || exp.title}</span>
                  <span className="text-zinc-400">{exp.duration}</span>
                </div>
                <p className="text-[11px] font-bold text-zinc-700">{exp.company}</p>
                <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </section>
          <section>
            <SectionTitle title="Education" icon={GraduationCap} />
            {safeMap(cvData.education).map((edu: any, i: number) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between font-bold text-xs uppercase">
                  <span>{edu.degree || edu.qualification}</span>
                  <span className="text-zinc-400">{edu.year || edu.duration}</span>
                </div>
                <p className="text-[11px] text-zinc-600">{edu.school || edu.institution}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );

  // --- Layout 2: Modern Header (Banner) ---
  const Layout2 = () => (
    <div className="h-full min-h-[1120px] bg-white flex flex-col w-[210mm]">
      <div className="h-48 p-10 flex justify-between items-center text-white" style={{ backgroundColor: themeColor }}>
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            {cvData.personalInfo?.fullName || cvData.personalInfo?.name}
          </h1>
          <p className="text-sm opacity-80 uppercase tracking-[0.3em] mt-1 font-bold">Professional CV</p>
        </div>
        <img 
          src={cvData.personalInfo?.photo || cvData.profileImage} 
          className="w-36 h-36 rounded-full border-8 border-white/20 object-cover shadow-2xl" 
          alt="Profile"
        />
      </div>
      <div className="flex flex-1">
        <div className="w-72 bg-zinc-900 text-white p-8">
           <div className="space-y-8">
              <div>
                <h3 className="text-xs font-black uppercase mb-4 border-b border-white/10 pb-1 tracking-widest">Contact</h3>
                <div className="text-[10px] space-y-3 opacity-70">
                   <p className="flex items-center gap-2"><Phone size={12}/> {cvData.contact?.phone1}</p>
                   <p className="flex items-center gap-2 truncate"><Mail size={12}/> {cvData.contact?.email}</p>
                   <p className="flex items-start gap-2"><MapPin size={12}/> {cvData.contact?.address}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase mb-4 border-b border-white/10 pb-1 tracking-widest">Skills</h3>
                <div className="space-y-2">
                   {safeMap(cvData.skills).map((s: any, i: number) => (
                     <div key={i} className="text-[10px] bg-white/10 px-3 py-1.5 rounded-lg uppercase font-bold">
                        {s.name || s}
                     </div>
                   ))}
                </div>
              </div>
           </div>
        </div>
        <div className="flex-1 p-10 space-y-8">
           <section>
              <h3 className="text-sm font-black border-b-2 mb-4 pb-1 uppercase tracking-widest" style={{ color: themeColor, borderColor: '#f4f4f5' }}>Profile</h3>
              <p className="text-[11px] leading-relaxed text-zinc-600 italic">
                {cvData.personalInfo?.description || cvData.personalInfo?.objective}
              </p>
           </section>
           <section>
              <h3 className="text-sm font-black border-b-2 mb-4 pb-1 uppercase tracking-widest" style={{ color: themeColor, borderColor: '#f4f4f5' }}>Experience</h3>
              {safeMap(cvData.experience).map((exp: any, i: number) => (
                <div key={i} className="mb-6 pl-4 border-l-4" style={{ borderColor: themeColor }}>
                  <span className="text-[10px] font-black" style={{ color: themeColor }}>{exp.duration}</span>
                  <h4 className="text-xs font-black uppercase mt-1">{exp.position || exp.title}</h4>
                  <p className="text-[10px] font-bold text-zinc-400">{exp.company}</p>
                  <p className="text-[10px] text-zinc-500 mt-2 leading-relaxed">{exp.description}</p>
                </div>
              ))}
           </section>
        </div>
      </div>
    </div>
  );

  // --- Logic to return selected template ---
  switch (Number(cvData.selectedTemplate)) {
    case 1: return <Layout1 />;
    case 2: return <Layout2 />;
    default: return <Layout1 />;
  }
}
