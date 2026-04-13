import React from 'react';
import { CVData } from '../../types/cv';

interface Props { d: CVData; sidebarBg: string; accentColor: string; textColor: string; isDefault?: boolean }

const SidebarSection = ({ title, isDefault, children }: { title: string; isDefault?: boolean; children: React.ReactNode }) => (
  <div className="mb-8 text-left">
    <h3 className={`text-[11px] font-black uppercase tracking-[0.2em] border-b pb-1 mb-4 ${isDefault ? 'border-gray-300 text-gray-800' : 'border-white/20 text-white'}`}>
      {title}
    </h3>
    {children}
  </div>
);

const MainSection = ({ title, color, children }: { title: string; color: string; children: React.ReactNode }) => (
  <div className="mb-8 text-left">
    <h3 className={`text-[12px] font-black uppercase tracking-[0.15em] border-b-2 ${color} pb-1 mb-5`}>
      {title}
    </h3>
    {children}
  </div>
);

const EducationDisplay = ({ title, level }: { title: string; level: any }) => (
  <div className="mb-6">
    <p className="font-bold text-[11px] text-gray-800 uppercase tracking-tight">• Passed {title} - {level.year}</p>
    <p className="text-[10px] text-gray-400 ml-3 mb-2 font-bold uppercase tracking-tighter">Index Number - {level.indexNumber}</p>
    <div className="grid grid-cols-1 gap-y-1 ml-3 border-l-2 pl-3 border-gray-50">
      {level.subjects.map((s: any, i: number) => (
        <div key={i} className="flex justify-between text-[11px] max-w-[250px]">
          <span className="text-gray-600 font-medium">{s.name}</span>
          <span className="font-black text-gray-800">{s.grade}</span>
        </div>
      ))}
    </div>
  </div>
);

const ProfessionalLayout = ({ d, sidebarBg, accentColor, textColor, isDefault }: Props) => (
  /* මෙතනදී width එක හැමවෙලේම 210mm ට lock කළා */
  <div className="w-[210mm] min-h-[297mm] bg-white flex text-left shadow-2xl mx-auto overflow-hidden shrink-0">
    
    {/* Sidebar - Fixed 75mm width */}
    <div className={`w-[75mm] ${sidebarBg} ${isDefault ? 'text-gray-700 border-r border-gray-100' : 'text-white'} p-8 flex flex-col shrink-0`}>
      <div className="flex justify-center mb-10">
        <div className={`p-1 rounded-full border-4 ${isDefault ? 'border-blue-500' : 'border-white/20 shadow-lg'}`}>
          <img 
            src={d.personalInfo.photo || 'https://via.placeholder.com/150'} 
            className="w-32 h-32 object-cover rounded-full" 
            alt="Profile"
          />
        </div>
      </div>

      <SidebarSection title="Contact" isDefault={isDefault}>
        <div className="space-y-4 text-[11px] font-medium">
          <div className="flex items-start gap-3"><span>📞</span> <p>{d.contact.phone1} {d.contact.phone2 && <><br/>{d.contact.phone2}</>}</p></div>
          <div className="flex items-start gap-3"><span>✉️</span> <p className="break-all">{d.contact.email}</p></div>
          <div className="flex items-start gap-3"><span>📍</span> <p className="leading-relaxed">{d.contact.address}</p></div>
        </div>
      </SidebarSection>

      <SidebarSection title="Personal" isDefault={isDefault}>
        <div className="space-y-3 text-[10px]">
          <div className="flex flex-col mb-1"><span className="uppercase opacity-50 font-bold text-[8px]">Full Name</span><span className="font-bold text-[11px] leading-tight">{d.personalInfo.fullName}</span></div>
          <div className="flex justify-between border-b border-white/10 pb-1"><span>DOB</span><span className="font-bold">{d.personalInfo.dateOfBirth}</span></div>
          <div className="flex justify-between border-b border-white/10 pb-1"><span>NIC</span><span className="font-bold">{d.personalInfo.nicNumber}</span></div>
          <div className="flex justify-between border-b border-white/10 pb-1"><span>Gender</span><span className="font-bold">{d.personalInfo.gender}</span></div>
          <div className="flex justify-between"><span>Nationality</span><span className="font-bold">{d.personalInfo.nationality}</span></div>
        </div>
      </SidebarSection>

      <SidebarSection title="Skills" isDefault={isDefault}>
        <ul className="text-[11px] space-y-1.5">
          {d.skills.map((s, i) => <li key={i} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-current opacity-40"></span>{s}</li>)}
        </ul>
      </SidebarSection>

      <SidebarSection title="Languages" isDefault={isDefault}>
        <ul className="text-[11px] space-y-1.5">
          {d.languages.map((l, i) => <li key={i} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-current opacity-40"></span>{l}</li>)}
        </ul>
      </SidebarSection>
    </div>

    {/* Right Main Content */}
    <div className="flex-1 p-12 py-10 bg-white">
      <header className="mb-10">
        <h1 className={`text-4xl font-black uppercase tracking-tighter ${isDefault ? 'text-blue-600' : textColor} mb-3 leading-none`}>
          {d.personalInfo.name}
        </h1>
        <div className="h-1.5 w-16 bg-current mb-4 opacity-20"></div>
        <p className="text-[12px] text-gray-500 font-semibold leading-relaxed italic">{d.personalInfo.description}</p>
      </header>

      <MainSection title="Professional Qualifications" color={isDefault ? 'border-blue-600 text-blue-600' : accentColor + ' ' + textColor}>
        <ul className="space-y-2.5">
          {d.professionalQualifications.map((q, i) => (
            <li key={i} className="text-[11px] text-gray-700 font-semibold flex items-start gap-3">
              <span className={`font-bold ${isDefault ? 'text-blue-600' : textColor}`}>•</span> {q}
            </li>
          ))}
        </ul>
      </MainSection>

      <MainSection title="Education Qualifications" color={isDefault ? 'border-blue-600 text-blue-600' : accentColor + ' ' + textColor}>
        <EducationDisplay title="A/L Examination" level={d.education.aLevel} />
        <EducationDisplay title="O/L Examination" level={d.education.oLevel} />
      </MainSection>

      <MainSection title="Work Experience" color={isDefault ? 'border-blue-600 text-blue-600' : accentColor + ' ' + textColor}>
        {d.workExperience.map((ex, i) => (
          <div key={i} className="mb-5 border-l-2 border-gray-50 pl-4">
            <p className="font-black text-[11px] text-gray-800 uppercase tracking-tight">{ex.title}</p>
            <p className={`text-[9px] font-black uppercase mb-1 ${isDefault ? 'text-blue-500' : textColor}`}>{ex.company}</p>
            <p className="text-[11px] text-gray-500 leading-snug font-medium italic">{ex.description}</p>
          </div>
        ))}
      </MainSection>

      <MainSection title="References" color={isDefault ? 'border-blue-600 text-blue-600' : accentColor + ' ' + textColor}>
        <div className="grid grid-cols-2 gap-10 mt-2">
          {d.references.map((r, i) => (
            <div key={i} className="text-left">
              <p className="font-black text-[11px] text-gray-800 uppercase mb-1">{r.name}</p>
              <p className="text-[10px] text-gray-400 font-bold leading-tight mb-1 uppercase tracking-tighter">{r.designation}</p>
              <p className={`text-[11px] font-black mt-1 ${isDefault ? 'text-blue-600' : textColor}`}>Tel: {r.phone}</p>
            </div>
          ))}
        </div>
      </MainSection>
    </div>
  </div>
);

export function TemplateRenderer({ cvData, scale = 1 }: { cvData: CVData; scale?: number }) {
  const configs: Record<number, any> = {
    1: { sidebar: "bg-gray-50", accent: "border-blue-600", text: "text-blue-600", isDefault: true },
    2: { sidebar: "bg-[#1e3a8a]", accent: "border-blue-200", text: "text-blue-900" },
    3: { sidebar: "bg-[#334155]", accent: "border-slate-200", text: "text-slate-800" },
    4: { sidebar: "bg-[#064e3b]", accent: "border-emerald-200", text: "text-emerald-900" },
    5: { sidebar: "bg-zinc-900", accent: "border-zinc-200", text: "text-zinc-900" },
    6: { sidebar: "bg-[#451a03]", accent: "border-amber-200", text: "text-amber-900" },
    7: { sidebar: "bg-black", accent: "border-gray-200", text: "text-black" },
    8: { sidebar: "bg-[#991b1b]", accent: "border-red-200", text: "text-red-900" },
    9: { sidebar: "bg-[#312e81]", accent: "border-indigo-200", text: "text-indigo-900" },
    10: { sidebar: "bg-[#854d0e]", accent: "border-yellow-200", text: "text-yellow-900" },
  };

  const theme = configs[cvData.selectedTemplate] || configs[1];

  return (
    /* පෝන් එකේදී CV එක මැදට වෙන්න overflow-x handle කරන wrapper එක */
    <div className="flex justify-center w-full">
      <div 
        className="transition-transform duration-500 ease-in-out origin-top"
        style={{ 
          transform: `scale(${scale})`,
          // මෙතනදී width එක lock කරන එක තමයි වැදගත්ම දේ
          width: '210mm'
        }}
      >
        <ProfessionalLayout 
          d={cvData} 
          sidebarBg={theme.sidebar} 
          accentColor={theme.accent} 
          textColor={theme.text}
          isDefault={theme.isDefault}
        />
      </div>
    </div>
  );
}
