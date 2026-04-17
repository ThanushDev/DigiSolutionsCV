import React from 'react';
import { CVData, WorkExperienceEntry, Reference, Subject } from '../../types/cv';
import { Mail, Phone, MapPin, Globe, User } from 'lucide-react';

export function CVTemplateBase({ cvData, scale = 1 }: { cvData: CVData; scale?: number }) {
  const themeColor = cvData.customColor || '#1e3a8a';
  const brightness = cvData.brightness || 100;

  // --- Helper Components ---
  const SectionTitle = ({ title }: { title: string }) => (
    <div className="flex items-center gap-2 mb-4">
      <h3 className="text-sm font-black uppercase tracking-wider" style={{ color: themeColor }}>{title}</h3>
      <div className="flex-1 h-0.5 bg-zinc-200"></div>
    </div>
  );

  const EduTable = ({ level, data }: { level: string, data: { indexNumber: string, year: string, subjects: Subject[] } }) => (
    <div className="mb-6 last:mb-0">
      <p className="font-bold text-[11px] uppercase mb-1">• Passed G.C.E. {level} Examination - {data.year}</p>
      <div className="pl-4 text-[11px] space-y-1 mb-2">
         <p>Index Number - <span className="font-bold">{data.indexNumber}</span></p>
      </div>
      <div className="grid grid-cols-2 gap-x-12 gap-y-2 pl-4 text-[11px]">
        {data.subjects.map((sub, idx) => (
          <div key={idx} className="flex justify-between border-b pb-1">
            <span>{sub.name}</span>
            <span className="font-bold text-center w-10">:{sub.grade}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const ExperienceItem = ({ exp }: { exp: WorkExperienceEntry }) => (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between font-bold text-xs uppercase text-zinc-800">
        <span>{exp.position}</span>
        <span className="text-zinc-400 font-medium">{exp.duration}</span>
      </div>
      <p className="text-[11px] font-bold text-zinc-700">{exp.company}</p>
      <p className="text-[10px] text-zinc-500 mt-1">{exp.description}</p>
    </div>
  );

  const ReferenceItem = ({ ref }: { ref: Reference }) => (
    <div className="mb-2 last:mb-0 text-[11px]">
      <p className="font-bold text-zinc-800">{ref.name}</p>
      <p className="text-zinc-600">{ref.designation}</p>
      <p className="text-zinc-500">{ref.organization}</p>
      <p className="text-[10px] font-bold mt-1" style={{ color: themeColor }}>
        Phone: {ref.phone}
      </div>
    </div>
  );

  // --- Main Professional Layout (Thanush Style) ---
  const ProfessionalTemplate = () => (
    <div className="flex h-full min-h-[1120px] bg-white text-[11px] relative">
      
      {/* Sidebar (Left) */}
      <div className="w-[35%] bg-zinc-50 border-r p-8 flex flex-col gap-8">
        
        {/* Profile Image & Name (Name on top) */}
        <div className="flex flex-col gap-10">
          <img src={cvData.profileImage} className="w-32 h-32 rounded-full border-4 object-cover self-center shadow-xl" style={{ borderColor: themeColor }} />
        </div>

        {/* Contact */}
        <section>
          <SectionTitle title="Contact" />
          <div className="space-y-3 opacity-90 pl-1">
             <div className="flex items-center gap-2"><Phone size={12}/> {cvData.contact.phone1} {cvData.contact.phone2 && `/ ${cvData.contact.phone2}`}</div>
             <div className="flex items-center gap-2 truncate"><Mail size={12}/> {cvData.contact.email}</div>
             <div className="flex items-start gap-2"><MapPin size={12} className="mt-0.5"/> {cvData.contact.address}</div>
          </div>
        </section>

        {/* Personal Details */}
        <section>
          <SectionTitle title="Personal Details" />
          <div className="space-y-2 pl-1 uppercase font-bold text-[10px]">
             <p className="grid grid-cols-2"><span className="text-zinc-500">Full Name</span><span>:{cvData.personalInfo.fullName}</span></p>
             <p className="grid grid-cols-2"><span className="text-zinc-500">NIC Number</span><span>:{cvData.personalInfo.nic}</span></p>
             <p className="grid grid-cols-2"><span className="text-zinc-500">Gender</span><span>:{cvData.personalInfo.gender}</span></p>
             <p className="grid grid-cols-2"><span className="text-zinc-500">Nationality</span><span>:{cvData.personalInfo.nationality}</span></p>
             <p className="grid grid-cols-2"><span className="text-zinc-500">Religion</span><span>:{cvData.personalInfo.religion}</span></p>
             <p className="grid grid-cols-2"><span className="text-zinc-500">Civil Status</span><span>:{cvData.personalInfo.civilStatus}</span></p>
          </div>
        </section>

        {/* Skills */}
        <section>
          <SectionTitle title="Skills" />
          <ul className="list-disc list-inside space-y-1 pl-1">
            {cvData.skills.map(s => <li key={s.id} className="uppercase text-[10px]">{s.name}</li>)}
          </ul>
        </section>
        
        {/* Languages */}
        <section>
          <SectionTitle title="Language" />
          <ul className="list-disc list-inside space-y-1 pl-1">
            {cvData.languages.map(l => <li key={l.id}>{l.name}</li>)}
          </ul>
        </section>
      </div>

      {/* Main Content (Right) */}
      <div className="flex-1 p-10 flex flex-col gap-10">
        
        {/* Header (Name & Objective) */}
        <div className="border-b-2 border-zinc-100 pb-6 mb-2">
          <h1 className="text-3xl font-black uppercase" style={{ color: themeColor }}>{cvData.personalInfo.fullName}</h1>
          <p className="text-zinc-600 mt-2">{cvData.personalInfo.objective}</p>
        </div>

        {/* 1. Professional Qualifications (Top Priority) */}
        <section>
          <SectionTitle title="Professional Qualifications" />
          <ul className="list-disc list-inside space-y-1.5 pl-1 text-[11px] font-medium text-zinc-700">
             {cvData.professionalQualifications.map(pq => <li key={pq.id}>{pq.qualification}</li>)}
          </ul>
        </section>
        
        {/* 2. Education Qualifications (Grades & Subjects) */}
        <section>
          <SectionTitle title="Education Qualifications" />
          <div className="space-y-6">
            <EduTable level="Advanced Level" data={cvData.education.aLevel} />
            <EduTable level="Ordinary Level" data={cvData.education.oLevel} />
          </div>
        </section>
        
        {/* 3. Work Experience */}
        <section>
          <SectionTitle title="Work Experience" />
          <div className="space-y-5 pl-1">
             {cvData.workExperience.map(exp => <ExperienceItem key={exp.id} exp={exp} />)}
          </div>
        </section>

        {/* 4. References (Two References) */}
        <section>
          <SectionTitle title="References" />
          <div className="grid grid-cols-2 gap-8 pl-1">
             {cvData.references.map(ref => <ReferenceItem key={ref.id} ref={ref} />)}
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <div 
      className="w-[210mm] min-h-[297mm] bg-white shadow-2xl mx-auto overflow-hidden print:shadow-none origin-top"
      style={{ 
        transform: `scale(${scale})`, 
        transformOrigin: 'top center',
        filter: `brightness(${brightness}%)`
      }}
    >
      <ProfessionalTemplate />
    </div>
  );
}
