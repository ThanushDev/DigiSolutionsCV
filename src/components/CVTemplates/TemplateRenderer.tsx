import React from 'react';
import { CVData, templateThemes } from '../../types/cv';

interface TemplateRendererProps {
  cvData: CVData;
  scale?: number;
}

// --- මෙතනින් පස්සේ මම කලින් දීපු Template 1 සිට 10 දක්වා කෝඩ් එක දාන්න ---

const EducationSection = ({ title, level }: { title: string, level: any }) => (
  <div className="mb-4">
    <p className="font-bold text-sm underline uppercase tracking-wider">{title} - {level.year}</p>
    <p className="text-[11px] mb-1">Index: {level.indexNumber}</p>
    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
      {level.subjects.map((s: any, i: number) => (
        <div key={i} className="flex justify-between text-[11px] border-b border-gray-100">
          <span>{s.name}</span> <span className="font-bold">{s.grade}</span>
        </div>
      ))}
    </div>
  </div>
);

const Template1 = ({ d }: { d: CVData }) => (
  <div className="w-[210mm] min-h-[297mm] bg-white p-12 text-left border">
    <div className="flex gap-8 mb-10 items-center border-b-4 border-blue-600 pb-6">
      <img src={d.personalInfo.photo} className={`w-32 h-32 object-cover ${d.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-xl'}`} />
      <div>
        <h1 className="text-4xl font-black uppercase text-gray-900">{d.personalInfo.name}</h1>
        <p className="text-blue-600 font-bold tracking-widest">{d.contact.email} | {d.contact.phone1}</p>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-10">
      <div className="col-span-1 space-y-6">
        <section>
          <h3 className="font-black border-b-2 border-gray-200 mb-2 uppercase text-xs">Personal Info</h3>
          <div className="text-[11px] space-y-1">
             <p><b>NIC:</b> {d.personalInfo.nicNumber}</p>
             <p><b>DOB:</b> {d.personalInfo.dateOfBirth}</p>
             <p><b>Civil:</b> {d.personalInfo.civilStatus}</p>
          </div>
        </section>
        <section>
          <h3 className="font-black border-b-2 border-gray-200 mb-2 uppercase text-xs">Skills</h3>
          <div className="flex flex-wrap gap-1">
            {d.skills.map((s,i) => <span key={i} className="bg-gray-100 px-2 py-1 text-[10px] rounded">{s}</span>)}
          </div>
        </section>
      </div>
      <div className="col-span-2 space-y-6">
         <section>
           <h3 className="text-lg font-bold text-blue-600 border-b mb-3 uppercase">Professional Summary</h3>
           <p className="text-xs leading-relaxed">{d.personalInfo.description}</p>
         </section>
         <section>
           <h3 className="text-lg font-bold text-blue-600 border-b mb-3 uppercase">Academic Qualifications</h3>
           <EducationSection title="G.C.E. A/L" level={d.education.aLevel} />
           <EducationSection title="G.C.E. O/L" level={d.education.oLevel} />
         </section>
      </div>
    </div>
  </div>
);

const Template2 = ({ d }: { d: CVData }) => (
  <div className="w-[210mm] min-h-[297mm] bg-white p-12 text-left border">
    <div className="flex gap-8 mb-10 items-center border-b-4 border-blue-600 pb-6">
      <img src={d.personalInfo.photo} className={`w-32 h-32 object-cover ${d.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-xl'}`} />
      <div>
        <h1 className="text-4xl font-black uppercase text-gray-900">{d.personalInfo.name}</h1>
        <p className="text-blue-600 font-bold tracking-widest">{d.contact.email} | {d.contact.phone1}</p>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-10">
      <div className="col-span-1 space-y-6">
        <section>
          <h3 className="font-black border-b-2 border-gray-200 mb-2 uppercase text-xs">Personal Info</h3>
          <div className="text-[11px] space-y-1">
             <p><b>NIC:</b> {d.personalInfo.nicNumber}</p>
             <p><b>DOB:</b> {d.personalInfo.dateOfBirth}</p>
             <p><b>Civil:</b> {d.personalInfo.civilStatus}</p>
          </div>
        </section>
        <section>
          <h3 className="font-black border-b-2 border-gray-200 mb-2 uppercase text-xs">Skills</h3>
          <div className="flex flex-wrap gap-1">
            {d.skills.map((s,i) => <span key={i} className="bg-gray-100 px-2 py-1 text-[10px] rounded">{s}</span>)}
          </div>
        </section>
      </div>
      <div className="col-span-2 space-y-6">
         <section>
           <h3 className="text-lg font-bold text-blue-600 border-b mb-3 uppercase">Professional Summary</h3>
           <p className="text-xs leading-relaxed">{d.personalInfo.description}</p>
         </section>
         <section>
           <h3 className="text-lg font-bold text-blue-600 border-b mb-3 uppercase">Academic Qualifications</h3>
           <EducationSection title="G.C.E. A/L" level={d.education.aLevel} />
           <EducationSection title="G.C.E. O/L" level={d.education.oLevel} />
         </section>
      </div>
    </div>
  </div>
);

const Template3 = ({ d }: { d: CVData }) => (
  <div className="w-[210mm] min-h-[297mm] bg-white p-12 text-left border">
    <div className="flex gap-8 mb-10 items-center border-b-4 border-blue-600 pb-6">
      <img src={d.personalInfo.photo} className={`w-32 h-32 object-cover ${d.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-xl'}`} />
      <div>
        <h1 className="text-4xl font-black uppercase text-gray-900">{d.personalInfo.name}</h1>
        <p className="text-blue-600 font-bold tracking-widest">{d.contact.email} | {d.contact.phone1}</p>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-10">
      <div className="col-span-1 space-y-6">
        <section>
          <h3 className="font-black border-b-2 border-gray-200 mb-2 uppercase text-xs">Personal Info</h3>
          <div className="text-[11px] space-y-1">
             <p><b>NIC:</b> {d.personalInfo.nicNumber}</p>
             <p><b>DOB:</b> {d.personalInfo.dateOfBirth}</p>
             <p><b>Civil:</b> {d.personalInfo.civilStatus}</p>
          </div>
        </section>
        <section>
          <h3 className="font-black border-b-2 border-gray-200 mb-2 uppercase text-xs">Skills</h3>
          <div className="flex flex-wrap gap-1">
            {d.skills.map((s,i) => <span key={i} className="bg-gray-100 px-2 py-1 text-[10px] rounded">{s}</span>)}
          </div>
        </section>
      </div>
      <div className="col-span-2 space-y-6">
         <section>
           <h3 className="text-lg font-bold text-blue-600 border-b mb-3 uppercase">Professional Summary</h3>
           <p className="text-xs leading-relaxed">{d.personalInfo.description}</p>
         </section>
         <section>
           <h3 className="text-lg font-bold text-blue-600 border-b mb-3 uppercase">Academic Qualifications</h3>
           <EducationSection title="G.C.E. A/L" level={d.education.aLevel} />
           <EducationSection title="G.C.E. O/L" level={d.education.oLevel} />
         </section>
      </div>
    </div>
  </div>
);

const Template4 = ({ d }: { d: CVData }) => (
  <div className="w-[210mm] min-h-[297mm] bg-white p-12 text-left border">
    <div className="flex gap-8 mb-10 items-center border-b-4 border-blue-600 pb-6">
      <img src={d.personalInfo.photo} className={`w-32 h-32 object-cover ${d.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-xl'}`} />
      <div>
        <h1 className="text-4xl font-black uppercase text-gray-900">{d.personalInfo.name}</h1>
        <p className="text-blue-600 font-bold tracking-widest">{d.contact.email} | {d.contact.phone1}</p>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-10">
      <div className="col-span-1 space-y-6">
        <section>
          <h3 className="font-black border-b-2 border-gray-200 mb-2 uppercase text-xs">Personal Info</h3>
          <div className="text-[11px] space-y-1">
             <p><b>NIC:</b> {d.personalInfo.nicNumber}</p>
             <p><b>DOB:</b> {d.personalInfo.dateOfBirth}</p>
             <p><b>Civil:</b> {d.personalInfo.civilStatus}</p>
          </div>
        </section>
        <section>
          <h3 className="font-black border-b-2 border-gray-200 mb-2 uppercase text-xs">Skills</h3>
          <div className="flex flex-wrap gap-1">
            {d.skills.map((s,i) => <span key={i} className="bg-gray-100 px-2 py-1 text-[10px] rounded">{s}</span>)}
          </div>
        </section>
      </div>
      <div className="col-span-2 space-y-6">
         <section>
           <h3 className="text-lg font-bold text-blue-600 border-b mb-3 uppercase">Professional Summary</h3>
           <p className="text-xs leading-relaxed">{d.personalInfo.description}</p>
         </section>
         <section>
           <h3 className="text-lg font-bold text-blue-600 border-b mb-3 uppercase">Academic Qualifications</h3>
           <EducationSection title="G.C.E. A/L" level={d.education.aLevel} />
           <EducationSection title="G.C.E. O/L" level={d.education.oLevel} />
         </section>
      </div>
    </div>
  </div>
);

const Template5 = ({ d }: { d: CVData }) => (
  <div className="w-[210mm] min-h-[297mm] bg-white p-12 text-left border">
    <div className="flex gap-8 mb-10 items-center border-b-4 border-blue-600 pb-6">
      <img src={d.personalInfo.photo} className={`w-32 h-32 object-cover ${d.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-xl'}`} />
      <div>
        <h1 className="text-4xl font-black uppercase text-gray-900">{d.personalInfo.name}</h1>
        <p className="text-blue-600 font-bold tracking-widest">{d.contact.email} | {d.contact.phone1}</p>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-10">
      <div className="col-span-1 space-y-6">
        <section>
          <h3 className="font-black border-b-2 border-gray-200 mb-2 uppercase text-xs">Personal Info</h3>
          <div className="text-[11px] space-y-1">
             <p><b>NIC:</b> {d.personalInfo.nicNumber}</p>
             <p><b>DOB:</b> {d.personalInfo.dateOfBirth}</p>
             <p><b>Civil:</b> {d.personalInfo.civilStatus}</p>
          </div>
        </section>
        <section>
          <h3 className="font-black border-b-2 border-gray-200 mb-2 uppercase text-xs">Skills</h3>
          <div className="flex flex-wrap gap-1">
            {d.skills.map((s,i) => <span key={i} className="bg-gray-100 px-2 py-1 text-[10px] rounded">{s}</span>)}
          </div>
        </section>
      </div>
      <div className="col-span-2 space-y-6">
         <section>
           <h3 className="text-lg font-bold text-blue-600 border-b mb-3 uppercase">Professional Summary</h3>
           <p className="text-xs leading-relaxed">{d.personalInfo.description}</p>
         </section>
         <section>
           <h3 className="text-lg font-bold text-blue-600 border-b mb-3 uppercase">Academic Qualifications</h3>
           <EducationSection title="G.C.E. A/L" level={d.education.aLevel} />
           <EducationSection title="G.C.E. O/L" level={d.education.oLevel} />
         </section>
      </div>
    </div>
  </div>
);

const Template6 = ({ d }: { d: CVData }) => (
  <div className="w-[210mm] min-h-[297mm] bg-white p-12 text-left border">
    <div className="flex gap-8 mb-10 items-center border-b-4 border-blue-600 pb-6">
      <img src={d.personalInfo.photo} className={`w-32 h-32 object-cover ${d.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-xl'}`} />
      <div>
        <h1 className="text-4xl font-black uppercase text-gray-900">{d.personalInfo.name}</h1>
        <p className="text-blue-600 font-bold tracking-widest">{d.contact.email} | {d.contact.phone1}</p>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-10">
      <div className="col-span-1 space-y-6">
        <section>
          <h3 className="font-black border-b-2 border-gray-200 mb-2 uppercase text-xs">Personal Info</h3>
          <div className="text-[11px] space-y-1">
             <p><b>NIC:</b> {d.personalInfo.nicNumber}</p>
             <p><b>DOB:</b> {d.personalInfo.dateOfBirth}</p>
             <p><b>Civil:</b> {d.personalInfo.civilStatus}</p>
          </div>
        </section>
        <section>
          <h3 className="font-black border-b-2 border-gray-200 mb-2 uppercase text-xs">Skills</h3>
          <div className="flex flex-wrap gap-1">
            {d.skills.map((s,i) => <span key={i} className="bg-gray-100 px-2 py-1 text-[10px] rounded">{s}</span>)}
          </div>
        </section>
      </div>
      <div className="col-span-2 space-y-6">
         <section>
           <h3 className="text-lg font-bold text-blue-600 border-b mb-3 uppercase">Professional Summary</h3>
           <p className="text-xs leading-relaxed">{d.personalInfo.description}</p>
         </section>
         <section>
           <h3 className="text-lg font-bold text-blue-600 border-b mb-3 uppercase">Academic Qualifications</h3>
           <EducationSection title="G.C.E. A/L" level={d.education.aLevel} />
           <EducationSection title="G.C.E. O/L" level={d.education.oLevel} />
         </section>
      </div>
    </div>
  </div>
);

const Template7 = ({ d }: { d: CVData }) => (
  <div className="w-[210mm] min-h-[297mm] bg-white p-12 text-left border">
    <div className="flex gap-8 mb-10 items-center border-b-4 border-blue-600 pb-6">
      <img src={d.personalInfo.photo} className={`w-32 h-32 object-cover ${d.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-xl'}`} />
      <div>
        <h1 className="text-4xl font-black uppercase text-gray-900">{d.personalInfo.name}</h1>
        <p className="text-blue-600 font-bold tracking-widest">{d.contact.email} | {d.contact.phone1}</p>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-10">
      <div className="col-span-1 space-y-6">
        <section>
          <h3 className="font-black border-b-2 border-gray-200 mb-2 uppercase text-xs">Personal Info</h3>
          <div className="text-[11px] space-y-1">
             <p><b>NIC:</b> {d.personalInfo.nicNumber}</p>
             <p><b>DOB:</b> {d.personalInfo.dateOfBirth}</p>
             <p><b>Civil:</b> {d.personalInfo.civilStatus}</p>
          </div>
        </section>
        <section>
          <h3 className="font-black border-b-2 border-gray-200 mb-2 uppercase text-xs">Skills</h3>
          <div className="flex flex-wrap gap-1">
            {d.skills.map((s,i) => <span key={i} className="bg-gray-100 px-2 py-1 text-[10px] rounded">{s}</span>)}
          </div>
        </section>
      </div>
      <div className="col-span-2 space-y-6">
         <section>
           <h3 className="text-lg font-bold text-blue-600 border-b mb-3 uppercase">Professional Summary</h3>
           <p className="text-xs leading-relaxed">{d.personalInfo.description}</p>
         </section>
         <section>
           <h3 className="text-lg font-bold text-blue-600 border-b mb-3 uppercase">Academic Qualifications</h3>
           <EducationSection title="G.C.E. A/L" level={d.education.aLevel} />
           <EducationSection title="G.C.E. O/L" level={d.education.oLevel} />
         </section>
      </div>
    </div>
  </div>
);

const Template8 = ({ d }: { d: CVData }) => (
  <div className="w-[210mm] min-h-[297mm] bg-white p-12 text-left border">
    <div className="flex gap-8 mb-10 items-center border-b-4 border-blue-600 pb-6">
      <img src={d.personalInfo.photo} className={`w-32 h-32 object-cover ${d.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-xl'}`} />
      <div>
        <h1 className="text-4xl font-black uppercase text-gray-900">{d.personalInfo.name}</h1>
        <p className="text-blue-600 font-bold tracking-widest">{d.contact.email} | {d.contact.phone1}</p>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-10">
      <div className="col-span-1 space-y-6">
        <section>
          <h3 className="font-black border-b-2 border-gray-200 mb-2 uppercase text-xs">Personal Info</h3>
          <div className="text-[11px] space-y-1">
             <p><b>NIC:</b> {d.personalInfo.nicNumber}</p>
             <p><b>DOB:</b> {d.personalInfo.dateOfBirth}</p>
             <p><b>Civil:</b> {d.personalInfo.civilStatus}</p>
          </div>
        </section>
        <section>
          <h3 className="font-black border-b-2 border-gray-200 mb-2 uppercase text-xs">Skills</h3>
          <div className="flex flex-wrap gap-1">
            {d.skills.map((s,i) => <span key={i} className="bg-gray-100 px-2 py-1 text-[10px] rounded">{s}</span>)}
          </div>
        </section>
      </div>
      <div className="col-span-2 space-y-6">
         <section>
           <h3 className="text-lg font-bold text-blue-600 border-b mb-3 uppercase">Professional Summary</h3>
           <p className="text-xs leading-relaxed">{d.personalInfo.description}</p>
         </section>
         <section>
           <h3 className="text-lg font-bold text-blue-600 border-b mb-3 uppercase">Academic Qualifications</h3>
           <EducationSection title="G.C.E. A/L" level={d.education.aLevel} />
           <EducationSection title="G.C.E. O/L" level={d.education.oLevel} />
         </section>
      </div>
    </div>
  </div>
);

const Template9 = ({ d }: { d: CVData }) => (
  <div className="w-[210mm] min-h-[297mm] bg-white p-12 text-left border">
    <div className="flex gap-8 mb-10 items-center border-b-4 border-blue-600 pb-6">
      <img src={d.personalInfo.photo} className={`w-32 h-32 object-cover ${d.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-xl'}`} />
      <div>
        <h1 className="text-4xl font-black uppercase text-gray-900">{d.personalInfo.name}</h1>
        <p className="text-blue-600 font-bold tracking-widest">{d.contact.email} | {d.contact.phone1}</p>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-10">
      <div className="col-span-1 space-y-6">
        <section>
          <h3 className="font-black border-b-2 border-gray-200 mb-2 uppercase text-xs">Personal Info</h3>
          <div className="text-[11px] space-y-1">
             <p><b>NIC:</b> {d.personalInfo.nicNumber}</p>
             <p><b>DOB:</b> {d.personalInfo.dateOfBirth}</p>
             <p><b>Civil:</b> {d.personalInfo.civilStatus}</p>
          </div>
        </section>
        <section>
          <h3 className="font-black border-b-2 border-gray-200 mb-2 uppercase text-xs">Skills</h3>
          <div className="flex flex-wrap gap-1">
            {d.skills.map((s,i) => <span key={i} className="bg-gray-100 px-2 py-1 text-[10px] rounded">{s}</span>)}
          </div>
        </section>
      </div>
      <div className="col-span-2 space-y-6">
         <section>
           <h3 className="text-lg font-bold text-blue-600 border-b mb-3 uppercase">Professional Summary</h3>
           <p className="text-xs leading-relaxed">{d.personalInfo.description}</p>
         </section>
         <section>
           <h3 className="text-lg font-bold text-blue-600 border-b mb-3 uppercase">Academic Qualifications</h3>
           <EducationSection title="G.C.E. A/L" level={d.education.aLevel} />
           <EducationSection title="G.C.E. O/L" level={d.education.oLevel} />
         </section>
      </div>
    </div>
  </div>
);

// ... (Template 2 සිට Template 9 දක්වා මම කලින් දුන්න කෝඩ් එක මෙතනට එන්න ඕනේ) ...
// (ඉඩ ඉතිරි කරගන්න මම ඒවා මෙතන කෙටියෙන් දැම්මේ, ඔයා මම කලින් දුන්න ලිස්ට් එකේ ඉතිරි 8ම මෙතනට දාගන්න)

const Template10 = ({ d }: { d: CVData }) => (
  <div className="w-[210mm] min-h-[297mm] bg-white p-12 text-left border-t-[20px] border-amber-900 font-serif shadow-sm">
    <div className="flex justify-between items-start border-b pb-8 mb-10">
      <div className="max-w-[130mm]">
        <h1 className="text-5xl font-bold text-amber-950 mb-4">{d.personalInfo.name}</h1>
        <p className="text-sm text-gray-600 leading-relaxed">{d.personalInfo.description}</p>
      </div>
      <img src={d.personalInfo.photo} className="w-32 h-40 object-cover border-2 border-amber-900 p-1" />
    </div>
    <div className="grid grid-cols-1 gap-10">
       <section>
         <h3 className="text-amber-900 font-black uppercase tracking-[0.2em] border-b mb-6 py-1">Biographical Details</h3>
         <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-xs">
            <div className="flex justify-between border-b py-1"><span>Full Name</span><span className="font-bold">{d.personalInfo.fullName}</span></div>
            <div className="flex justify-between border-b py-1"><span>NIC Number</span><span className="font-bold">{d.personalInfo.nicNumber}</span></div>
            <div className="flex justify-between border-b py-1"><span>Date of Birth</span><span className="font-bold">{d.personalInfo.dateOfBirth}</span></div>
         </div>
       </section>
       <section>
         <h3 className="text-amber-900 font-black uppercase tracking-[0.2em] border-b mb-6 py-1">Academic Summary</h3>
         <EducationSection title="A/L Examination" level={d.education.aLevel} />
         <EducationSection title="O/L Examination" level={d.education.oLevel} />
       </section>
    </div>
  </div>
);

// --- ප්‍රධාන Renderer එක ---

export function TemplateRenderer({ cvData, scale = 1 }: TemplateRendererProps) {
  // මෙතනදී selectedTemplate එක අනුව අදාළ Design එක තෝරනවා
  const renderTemplate = () => {
    switch (cvData.selectedTemplate) {
      case 1: return <Template1 d={cvData} />;
      case 2: return <Template1 d={cvData} />;
      case 3: return <Template1 d={cvData} />;
      case 4: return <Template1 d={cvData} />;
      case 5: return <Template1 d={cvData} />;
      case 6: return <Template1 d={cvData} />;
      case 7: return <Template1 d={cvData} />;
      case 8: return <Template1 d={cvData} />;
      case 9: return <Template1 d={cvData} />;
      // මම ඉහත ලියපු විදිහටම අනිත් Templates 2-9 දක්වා මෙතන Case එකට දාන්න
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
        className="shadow-2xl mb-20"
      >
        {renderTemplate()}
      </div>
    </div>
  );
}
