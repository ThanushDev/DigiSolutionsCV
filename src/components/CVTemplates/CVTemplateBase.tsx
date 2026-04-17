import React from 'react';
import { CVData, WorkExperienceEntry, Reference, Subject } from '../../types/cv';
import { Mail, Phone, MapPin, GraduationCap, Briefcase, Award, Users } from 'lucide-react';

export function CVTemplateBase({ cvData, scale = 1 }: { cvData: CVData; scale?: number }) {
  const themeColor = cvData.customColor || '#1e3a8a';
  const brightness = cvData.brightness || 100;

  // --- Helper Components ---
  const SectionTitle = ({ title, icon: Icon }: { title: string; icon: any }) => (
    <div className="flex items-center gap-2 mb-4 mt-2">
      <div className="p-1 rounded" style={{ backgroundColor: themeColor + '20' }}>
        <Icon size={16} style={{ color: themeColor }} />
      </div>
      <h3 className="text-[12px] font-black uppercase tracking-wider" style={{ color: themeColor }}>{title}</h3>
      <div className="flex-1 h-[1px] bg-zinc-200"></div>
    </div>
  );

  const EduTable = ({ level, data }: { level: string; data: EducationLevel }) => (
    <div className="mb-6 last:mb-0">
      <p className="font-bold text-[11px] uppercase mb-2 text-zinc-800">
        • Passed G.C.E. {level} Examination - {data.year}
      </p>
      <div className="pl-4 text-[10px] mb-2 font-bold text-zinc-500 italic">
         Index Number : {data.indexNumber}
      </div>
      <div className="grid grid-cols-2 gap-x-10 gap-y-1.5 pl-4">
        {data.subjects.map((sub, idx) => (
          <div key={idx} className="flex justify-between border-b border-zinc-100 pb-1 text-[11px]">
            <span className="text-zinc-700">{sub.name}</span>
            <span className="font-black text-right min-w-[30px]" style={{ color: themeColor }}>{sub.grade}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // --- Main Professional Layout ---
  const Layout1 = () => (
    <div className="flex h-full min-h-[1120px] bg-white text-[11px] font-sans">
      
      {/* LEFT SIDEBAR */}
      <div className="w-[33%] bg-zinc-50 border-r border-zinc-200 p-8 flex flex-col gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <img 
              src={cvData.profileImage} 
              className="w-36 h-36 rounded-full border-4 object-cover shadow-lg" 
              style={{ borderColor: themeColor }} 
              alt="Profile"
            />
          </div>
          
          <section className="w-full text-left">
            <SectionTitle title="Contact" icon={Phone} />
            <div className="space-y-3 pl-1 text-zinc-600">
              <div className="flex items-center gap-3"><Phone size={12} style={{ color: themeColor }}/> <span>{cvData.contact.phone1} {cvData.contact.phone2 && ` / ${cvData.contact.phone2}`}</span></div>
              <div className="flex items-center gap-3 truncate"><Mail size={12} style={{ color: themeColor }}/> <span>{cvData.contact.email}</span></div>
              <div className="flex items-start gap-3"><MapPin size={12} className="mt-0.5" style={{ color: themeColor }}/> <span>{cvData.contact.address}</span></div>
            </div>
          </section>

          <section className="w-full text-left mt-6">
            <SectionTitle title="Personal Info" icon={Users} />
            <div className="space-y-2 pl-1 text-[10px] font-bold uppercase text-zinc-600">
              <p className="flex flex-col mb-1"><span className="text-zinc-400 text-[8px]">Full Name:</span> {cvData.personalInfo.fullName}</p>
              <p className="flex flex-col mb-1"><span className="text-zinc-400 text-[8px]">NIC Number:</span> {cvData.personalInfo.nic}</p>
              <p className="flex flex-col mb-1"><span className="text-zinc-400 text-[8px]">Date of Birth:</span> {cvData.personalInfo.dob}</p>
              <p className="flex flex-col mb-1"><span className="text-zinc-400 text-[8px]">Civil Status:</span> {cvData.personalInfo.civilStatus}</p>
            </div>
          </section>

          <section className="w-full text-left mt-6">
            <SectionTitle title="Skills" icon={Award} />
            <div className="flex flex-wrap gap-2 pl-1">
              {cvData.skills.map(s => (
                <span key={s.id} className="bg-white border px-2 py-1 rounded text-[9px] font-bold uppercase shadow-sm">{s.name}</span>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-10 flex flex-col">
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase tracking-tighter" style={{ color: themeColor }}>{cvData.personalInfo.fullName}</h1>
          <div className="h-1.5 w-20 mt-2 mb-4" style={{ backgroundColor: themeColor }}></div>
          <p className="text-zinc-500 leading-relaxed italic pr-4">"{cvData.personalInfo.objective}"</p>
        </div>

        <div className="space-y-8">
          {/* 1. Professional Qualifications */}
          <section>
            <SectionTitle title="Professional Qualifications" icon={Award} />
            <ul className="list-none space-y-2 pl-1">
              {cvData.professionalQualifications.map(pq => (
                <li key={pq.id} className="flex items-start gap-2 text-zinc-700 font-medium">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: themeColor }}></span>
                  {pq.qualification}
                </li>
              ))}
            </ul>
          </section>

          {/* 2. Education History */}
          <section>
            <SectionTitle title="Academic Qualifications" icon={GraduationCap} />
            <div className="pl-1">
              <EduTable level="Advanced Level" data={cvData.education.aLevel} />
              <div className="h-8"></div>
              <EduTable level="Ordinary Level" data={cvData.education.oLevel} />
            </div>
          </section>

          {/* 3. Work Experience */}
          <section>
            <SectionTitle title="Work Experience" icon={Briefcase} />
            <div className="space-y-6 pl-1">
              {cvData.workExperience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-black text-[12px] uppercase text-zinc-800">{exp.title}</h4>
                    <span className="text-[10px] font-bold text-zinc-400">{exp.duration}</span>
                  </div>
                  <p className="text-[11px] font-bold" style={{ color: themeColor }}>{exp.company}</p>
                  <p className="text-zinc-500 mt-1 text-[10px] leading-normal">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. References */}
          <section>
            <SectionTitle title="Professional References" icon={Users} />
            <div className="grid grid-cols-2 gap-10 pl-1">
              {cvData.references.map((ref, idx) => (
                <div key={idx}>
                  <p className="font-black text-zinc-800 uppercase text-[11px]">{ref.name}</p>
                  <p className="text-zinc-600 text-[10px] font-medium">{ref.designation}</p>
                  <p className="text-zinc-500 text-[10px]">{ref.organization}</p>
                  <p className="text-[10px] font-black mt-1" style={{ color: themeColor }}>
                    Phone: {ref.phone}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      id="cv-preview-root"
      className="w-[210mm] min-h-[297mm] bg-white shadow-2xl mx-auto overflow-hidden origin-top"
      style={{ 
        transform: `scale(${scale})`, 
        filter: `brightness(${brightness}%)`
      }}
    >
      <Layout1 />
    </div>
  );
}
