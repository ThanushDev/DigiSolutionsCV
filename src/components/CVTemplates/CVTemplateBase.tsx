import React from 'react';
import { CVData } from '../../types/cv';

interface TemplateProps {
  cvData: CVData;
  primaryColor: string;
  photoShape: string;
}

export function CVTemplateBase({ cvData, scale = 1 }: { cvData: CVData; scale?: number }) {
  const primaryColor = cvData.customColor || '#2563eb';
  const brightness = cvData.brightness || 100;
  // User ගේ photo shape එක අනුව class එක තීරණය කරනවා
  const photoClass = cvData.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-2xl';

  // --- Template 1: Modern Sidebar (Screenshot 1 & 3 ආභාසයෙන්) ---
  const ModernSidebar = () => (
    <div className="flex min-h-[297mm] bg-white">
      <div style={{ backgroundColor: primaryColor }} className="w-[35%] p-8 text-white">
        <div className="flex justify-center mb-8">
          {cvData.personalInfo.photo && (
            <img src={cvData.personalInfo.photo} className={`w-36 h-36 object-cover border-4 border-white/30 shadow-lg ${photoClass}`} />
          )}
        </div>
        
        <div className="space-y-8">
          <section>
            <h3 className="text-[11px] font-black uppercase tracking-widest mb-4 border-b border-white/20 pb-1">Contact</h3>
            <p className="text-[11px] mb-2 break-all">Email: {cvData.contact.email}</p>
            <p className="text-[11px] mb-2">Phone: {cvData.contact.phone1}</p>
            <p className="text-[11px] opacity-80 leading-relaxed">{cvData.contact.address}</p>
          </section>

          <section>
            <h3 className="text-[11px] font-black uppercase tracking-widest mb-4 border-b border-white/20 pb-1">Personal</h3>
            <p className="text-[10px] mb-1 opacity-70">NIC: {cvData.personalInfo.nicNumber}</p>
            <p className="text-[10px] mb-1 opacity-70">DOB: {cvData.personalInfo.dateOfBirth}</p>
            <p className="text-[10px] mb-1 opacity-70">Gender: {cvData.personalInfo.gender}</p>
          </section>

          <section>
            <h3 className="text-[11px] font-black uppercase tracking-widest mb-4 border-b border-white/20 pb-1">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((s, i) => (
                <span key={i} className="text-[10px] bg-black/20 px-2 py-1 rounded-md font-bold">{s}</span>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="w-[65%] p-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2" style={{ color: primaryColor }}>
          {cvData.personalInfo.name || "Your Name"}
        </h1>
        <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">Candidate Profile</p>
        <p className="text-[12px] leading-relaxed text-zinc-600 mb-10 italic">"{cvData.personalInfo.description}"</p>

        <section className="mb-10">
          <h2 className="text-sm font-black uppercase tracking-widest mb-5 flex items-center gap-3">
            <span className="w-8 h-0.5" style={{ backgroundColor: primaryColor }}></span> Work Experience
          </h2>
          {cvData.workExperience.map(exp => (
            <div key={exp.id} className="mb-6 relative pl-6 border-l-2" style={{ borderColor: primaryColor + '30' }}>
              <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor }}></div>
              <h4 className="font-black text-sm text-zinc-800 uppercase">{exp.title}</h4>
              <p className="text-[11px] font-bold opacity-60 mb-2">{exp.company} | {exp.duration}</p>
              <p className="text-[11px] text-zinc-600 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-sm font-black uppercase tracking-widest mb-5 flex items-center gap-3">
            <span className="w-8 h-0.5" style={{ backgroundColor: primaryColor }}></span> Education
          </h2>
          <div className="space-y-4 text-[11px]">
            <p className="font-bold">A/L - {cvData.education.aLevel.year} (Index: {cvData.education.aLevel.indexNumber})</p>
            <p className="font-bold">O/L - {cvData.education.oLevel.year} (Index: {cvData.education.oLevel.indexNumber})</p>
          </div>
        </section>
      </div>
    </div>
  );

  // --- Template 2: Ribbon & Banner Style (Screenshot 5 & 6 ආභාසයෙන්) ---
  const RibbonStyle = () => (
    <div className="min-h-[297mm] bg-white p-10 font-sans">
      <div className="flex items-center gap-10 mb-12 border-b-8 pb-10" style={{ borderColor: primaryColor }}>
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4" style={{ borderColor: primaryColor }}></div>
          {cvData.personalInfo.photo && (
            <img src={cvData.personalInfo.photo} className={`w-40 h-40 object-cover shadow-2xl relative z-10 ${photoClass}`} />
          )}
        </div>
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter" style={{ color: primaryColor }}>
            {cvData.personalInfo.name}
          </h1>
          <div className="mt-2 py-1 px-4 text-white font-bold text-xs inline-block rounded-r-full" style={{ backgroundColor: primaryColor }}>
            PROFESSIONAL CURRICULUM VITAE
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-8">
           <section className="mb-10">
             <div className="flex items-center gap-4 mb-6">
                <div className="h-8 w-1" style={{ backgroundColor: primaryColor }}></div>
                <h3 className="text-lg font-black uppercase tracking-widest">Experience</h3>
             </div>
             {cvData.workExperience.map(exp => (
               <div key={exp.id} className="mb-8">
                 <div className="flex justify-between items-start mb-1">
                    <h4 className="font-black text-sm uppercase">{exp.title}</h4>
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-zinc-100">{exp.duration}</span>
                 </div>
                 <p className="text-xs font-bold text-zinc-400 mb-2 uppercase">{exp.company}</p>
                 <p className="text-xs text-zinc-600 leading-relaxed">{exp.description}</p>
               </div>
             ))}
           </section>
        </div>

        <div className="col-span-4 space-y-8">
           <div className="p-6 rounded-3xl" style={{ backgroundColor: primaryColor + '10' }}>
              <h4 className="font-black text-xs uppercase mb-4" style={{ color: primaryColor }}>Contact Details</h4>
              <div className="space-y-3 text-[11px] font-medium text-zinc-700">
                <p>📞 {cvData.contact.phone1}</p>
                <p className="break-all">✉️ {cvData.contact.email}</p>
                <p>📍 {cvData.contact.address}</p>
              </div>
           </div>
           
           <div>
              <h4 className="font-black text-xs uppercase mb-4 border-b-2 pb-2" style={{ borderColor: primaryColor }}>My Skills</h4>
              <div className="space-y-3">
                {cvData.skills.map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                      <span>{s}</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: '85%', backgroundColor: primaryColor }}></div>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      style={{ 
        width: '210mm', 
        minHeight: '297mm',
        filter: `brightness(${brightness}%)`,
        transform: `scale(${scale})`,
        transformOrigin: 'top center'
      }}
      className="bg-white"
    >
      {/* User තෝරන Template එක අනුව Render වෙනවා */}
      {Number(cvData.selectedTemplate) === 1 ? <ModernSidebar /> : <RibbonStyle />}
    </div>
  );
}
