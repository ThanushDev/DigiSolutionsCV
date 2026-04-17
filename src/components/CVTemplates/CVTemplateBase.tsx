import React from 'react';
import { CVData } from '../../types/cv';

export function CVTemplateBase({ cvData, scale = 1 }: { cvData: CVData; scale?: number }) {
  const primaryColor = cvData.customColor || '#2563eb';
  const brightness = cvData.brightness || 100;

  // --- පරණ ලස්සන Default Template එක (Template 1) ---
  const ModernSidebar = () => (
    <div className="flex min-h-[297mm] text-zinc-800">
      {/* Sidebar */}
      <div style={{ backgroundColor: primaryColor }} className="w-[35%] p-8 text-white">
        {cvData.personalInfo.photo && (
          <img 
            src={cvData.personalInfo.photo} 
            className={`w-32 h-32 mb-6 border-4 border-white/20 object-cover ${cvData.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-2xl'}`} 
          />
        )}
        <section className="mb-8">
          <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-70">Contact</h3>
          <p className="text-xs mb-2">{cvData.contact.phone1}</p>
          <p className="text-xs mb-2 break-all">{cvData.contact.email}</p>
          <p className="text-xs opacity-80">{cvData.contact.address}</p>
        </section>
        <section className="mb-8">
          <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-70">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((s, i) => (
              <span key={i} className="text-[10px] bg-white/10 px-2 py-1 rounded">{s}</span>
            ))}
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="w-[65%] p-10 bg-white">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2" style={{ color: primaryColor }}>
          {cvData.personalInfo.name || "Your Name"}
        </h1>
        <p className="text-sm leading-relaxed opacity-70 mb-10">{cvData.personalInfo.description}</p>
        
        <section className="mb-8">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 border-b pb-2">Experience</h2>
          {cvData.workExperience.map(exp => (
            <div key={exp.id} className="mb-4">
              <h4 className="font-bold text-sm">{exp.title}</h4>
              <p className="text-xs opacity-60">{exp.company} | {exp.duration}</p>
              <p className="text-xs mt-1">{exp.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );

  // --- Professional Minimal (Template 2) ---
  const MinimalTop = () => (
    <div className="p-12 bg-white min-h-[297mm]">
      <div className="border-b-4 pb-6 mb-8" style={{ borderColor: primaryColor }}>
        <h1 className="text-5xl font-black text-zinc-900">{cvData.personalInfo.name}</h1>
        <p className="text-blue-600 font-bold mt-2 uppercase tracking-widest text-xs">Professional Profile</p>
      </div>
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2">
           <section className="mb-8">
             <h3 className="font-black text-lg mb-4" style={{ color: primaryColor }}>Experience</h3>
             {cvData.workExperience.map(exp => (
               <div key={exp.id} className="mb-4 border-l-2 pl-4" style={{ borderColor: primaryColor }}>
                 <p className="font-bold">{exp.title} - <span className="text-zinc-500 font-medium">{exp.company}</span></p>
                 <p className="text-xs italic mb-2">{exp.duration}</p>
                 <p className="text-xs text-zinc-600">{exp.description}</p>
               </div>
             ))}
           </section>
        </div>
        <div className="bg-zinc-50 p-6 rounded-2xl h-fit">
           <h3 className="font-black text-sm mb-4">CONTACT</h3>
           <p className="text-xs mb-2">{cvData.contact.email}</p>
           <p className="text-xs mb-2">{cvData.contact.phone1}</p>
           <h3 className="font-black text-sm mt-6 mb-4">SKILLS</h3>
           {cvData.skills.map((s, i) => (
             <p key={i} className="text-[10px] font-bold text-zinc-500 underline mb-1">{s}</p>
           ))}
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
      className="bg-white shadow-2xl"
    >
      {/* Template මාරු කරන logic එක */}
      {Number(cvData.selectedTemplate) === 1 ? <ModernSidebar /> : <MinimalTop />}
    </div>
  );
}
