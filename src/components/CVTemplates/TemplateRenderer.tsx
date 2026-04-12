import React from 'react';
import { CVData } from '../../types/cv';

interface Props { d: CVData; sidebarBg: string; accentColor: string; textColor: string }

const SidebarSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8 text-left">
    <h3 className="text-[12px] font-black uppercase tracking-widest border-b border-white/20 pb-1 mb-3">{title}</h3>
    {children}
  </div>
);

const MainSection = ({ title, color, children }: { title: string; color: string; children: React.ReactNode }) => (
  <div className="mb-8 text-left">
    <h3 className={`text-[13px] font-black uppercase tracking-[0.15em] border-b-2 ${color} pb-1 mb-4`}>{title}</h3>
    {children}
  </div>
);

const EducationDisplay = ({ title, level }: { title: string; level: any }) => (
  <div className="mb-5">
    <p className="font-bold text-[11px] text-gray-800 uppercase tracking-tight">• Passed {title} - {level.year}</p>
    <p className="text-[10px] text-gray-500 ml-3 mb-2 font-medium">Index Number - {level.indexNumber}</p>
    <div className="grid grid-cols-2 gap-x-10 gap-y-1 ml-3">
      {level.subjects.map((s: any, i: number) => (
        <div key={i} className="flex justify-between text-[11px] border-b border-gray-100 py-0.5">
          <span className="text-gray-600">{s.name}</span>
          <span className="font-bold text-gray-800">{s.grade}</span>
        </div>
      ))}
    </div>
  </div>
);

const ProfessionalLayout = ({ d, sidebarBg, accentColor, textColor }: Props) => (
  <div className="w-[210mm] min-h-[297mm] bg-white flex text-left shadow-2xl">
    {/* Left Sidebar */}
    <div className={`w-[75mm] ${sidebarBg} text-white p-8 flex flex-col`}>
      <div className="flex justify-center mb-10">
        <img 
          src={d.personalInfo.photo || 'https://via.placeholder.com/150'} 
          className={`w-36 h-36 object-cover border-4 border-white/20 shadow-lg ${d.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-2xl'}`} 
        />
      </div>

      <SidebarSection title="Contact">
        <div className="space-y-3 text-[11px]">
          <div className="flex items-start gap-2"><span>📞</span> <p>{d.contact.phone1} {d.contact.phone2 && <><br/>{d.contact.phone2}</>}</p></div>
          <div className="flex items-start gap-2"><span>✉️</span> <p className="break-all">{d.contact.email}</p></div>
          <div className="flex items-start gap-2"><span>📍</span> <p>{d.contact.address}</p></div>
        </div>
      </SidebarSection>

      <SidebarSection title="Personal Details">
        <div className="space-y-2 text-[10px]">
          <div className="grid grid-cols-[1fr_auto_1.5fr] gap-x-1"><span>Full Name</span><span>:</span><span className="font-bold">{d.personalInfo.fullName}</span></div>
          <div className="grid grid-cols-[1fr_auto_1.5fr] gap-x-1"><span>Date of Birth</span><span>:</span><span className="font-bold">{d.personalInfo.dateOfBirth}</span></div>
          <div className="grid grid-cols-[1fr_auto_1.5fr] gap-x-1"><span>NIC Number</span><span>:</span><span className="font-bold">{d.personalInfo.nicNumber}</span></div>
          <div className="grid grid-cols-[1fr_auto_1.5fr] gap-x-1"><span>Gender</span><span>:</span><span className="font-bold">{d.personalInfo.gender}</span></div>
          <div className="grid grid-cols-[1fr_auto_1.5fr] gap-x-1"><span>Nationality</span><span>:</span><span className="font-bold">{d.personalInfo.nationality}</span></div>
          <div className="grid grid-cols-[1fr_auto_1.5fr] gap-x-1"><span>Religion</span><span>:</span><span className="font-bold">{d.personalInfo.religion}</span></div>
          <div className="grid grid-cols-[1fr_auto_1.5fr] gap-x-1"><span>Civil Status</span><span>:</span><span className="font-bold">{d.personalInfo.civilStatus}</span></div>
        </div>
      </SidebarSection>

      <SidebarSection title="Skills">
        <ul className="text-[11px] space-y-1 list-disc list-inside opacity-90">
          {d.skills.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </SidebarSection>

      <SidebarSection title="Language">
        <ul className="text-[11px] space-y-1 list-disc list-inside opacity-90">
          {d.languages.map((l, i) => <li key={i}>{l}</li>)}
        </ul>
      </SidebarSection>
    </div>

    {/* Right Main Content */}
    <div className="flex-1 p-12 py-10">
      <header className="mb-10 text-left">
        <h1 className={`text-4xl font-black uppercase tracking-tight ${textColor} mb-2 leading-none`}>
          {d.personalInfo.name}
        </h1>
        <div className={`h-1 w-20 ${accentColor} mb-6`}></div>
        <p className="text-[11px] text-gray-600 leading-relaxed italic">{d.personalInfo.description}</p>
      </header>

      <MainSection title="Professional Qualifications" color={accentColor}>
        <ul className="space-y-2 ml-1">
          {d.professionalQualifications.map((q, i) => (
            <li key={i} className="text-[11px] text-gray-700 font-medium flex items-start gap-2">
              <span className={textColor}>•</span> {q}
            </li>
          ))}
        </ul>
      </MainSection>

      <MainSection title="Education Qualifications" color={accentColor}>
        <EducationDisplay title="G.C.E. Advanced Level Examination" level={d.education.aLevel} />
        <EducationDisplay title="G.C.E. Ordinary Level Examination" level={d.education.oLevel} />
      </MainSection>

      <MainSection title="Work Experience" color={accentColor}>
        {d.workExperience.map((ex, i) => (
          <div key={i} className="mb-4">
            <p className="font-bold text-[11px] text-gray-800">{ex.title}</p>
            <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">{ex.company} ({ex.duration})</p>
            <p className="text-[11px] text-gray-600 leading-tight">{ex.description}</p>
          </div>
        ))}
      </MainSection>

      <MainSection title="References" color={accentColor}>
        <div className="grid grid-cols-2 gap-8 mt-2 text-left">
          {d.references.map((r, i) => (
            <div key={i} className="text-left">
              <p className="font-bold text-[11px] text-gray-800">{r.name}</p>
              <p className="text-[10px] text-gray-500">{r.designation}</p>
              <p className="text-[10px] text-gray-500">{r.organization}</p>
              <p className={`text-[10px] font-bold mt-1 ${textColor}`}>Phone: {r.phone}</p>
            </div>
          ))}
        </div>
      </MainSection>
    </div>
  </div>
);

export function TemplateRenderer({ cvData, scale = 1 }: { cvData: CVData; scale?: number }) {
  const configs: Record<number, any> = {
    1: { sidebar: "bg-[#2c3e50]", accent: "border-gray-300", text: "text-[#2c3e50]" },
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
    <div className="flex justify-center w-full overflow-hidden">
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
        <ProfessionalLayout 
          d={cvData} 
          sidebarBg={theme.sidebar} 
          accentColor={theme.accent} 
          textColor={theme.text} 
        />
      </div>
    </div>
  );
}
