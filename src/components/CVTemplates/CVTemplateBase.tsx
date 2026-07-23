import React, { useRef, useLayoutEffect, useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { CVData, Subject } from '../../types/cv';

const DateSignature = ({ show }: { show: boolean }) => {
  if (!show) return null;
  return (
    <div 
      className="mt-8 flex justify-between items-end w-full pb-4 px-8 flex-shrink-0 break-inside-avoid overflow-visible"
      style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}
    >
      <div className="text-center">
        <div className="w-36 border-b-2 border-zinc-400 border-dotted mb-3"></div>
        <p className="text-[11px] font-black uppercase text-zinc-500 tracking-widest">Date</p>
      </div>
      <div className="text-center">
        <div className="w-36 border-b-2 border-zinc-400 border-dotted mb-3"></div>
        <p className="text-[11px] font-black uppercase text-zinc-500 tracking-widest">Signature</p>
      </div>
    </div>
  );
};

const SectionTitle = ({ title, color = '#1e3a8a' }: { title: string, color?: string }) => (
  <h3 className="text-[12px] font-black uppercase mb-3 border-b-2 pb-1" style={{ color, borderColor: color }}>{title}</h3>
);

const PersonalInfoList = ({ cvData, isDark = false }: { cvData: CVData; isDark?: boolean }) => {
  const pInfo = cvData.personalInfo || {};
  const nic = pInfo.nic || "";
  const gender = pInfo.gender || "";
  const nationality = pInfo.nationality || "";
  const religion = pInfo.religion || "";
  const civilStatus = pInfo.civilStatus || "";
  return (
    <div className={`space-y-1.5 text-[10px] font-bold uppercase ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
      {nic && <div className="flex gap-1"><span className="shrink-0">NIC:</span> <span className="break-words min-w-0">{nic}</span></div>}
      {gender && <div className="flex gap-1"><span className="shrink-0">Gender:</span> <span className="break-words min-w-0">{gender}</span></div>}
      {nationality && <div className="flex gap-1"><span className="shrink-0">Nationality:</span> <span className="break-words min-w-0">{nationality}</span></div>}
      {religion && <div className="flex gap-1"><span className="shrink-0">Religion:</span> <span className="break-words min-w-0">{religion}</span></div>}
      {civilStatus && <div className="flex gap-1"><span className="shrink-0">Status:</span> <span className="break-words min-w-0">{civilStatus}</span></div>}
    </div>
  );
};

/* Unbreakable Container Wrapper */
const SectionBlock = ({ children, className = '', pageBreakBefore = false, spacingTop = 0, spacingBottom = 0, padTop = 0, padBottom = 0 }: { children: React.ReactNode; className?: string; pageBreakBefore?: boolean; spacingTop?: number; spacingBottom?: number; padTop?: number; padBottom?: number }) => (
  <div 
    className={`break-inside-avoid ${pageBreakBefore ? 'section-page-break' : ''} ${className}`}
    style={{ 
      breakInside: 'avoid', 
      pageBreakInside: 'avoid',
      ...(spacingTop > 0 ? { marginTop: `${spacingTop}px` } : {}),
      ...(spacingBottom > 0 ? { marginBottom: `${spacingBottom}px` } : {}),
      ...(padTop > 0 ? { paddingTop: `${padTop}px` } : {}),
      ...(padBottom > 0 ? { paddingBottom: `${padBottom}px` } : {}),
      ...(pageBreakBefore ? { breakBefore: 'page', pageBreakBefore: 'always' } : {})
    }}
  >
    {children}
  </div>
);

const OptionalSections = ({ cvData, theme }: { cvData: CVData; theme: string }) => {
  const projects = cvData.projects || [];
  const achievements = cvData.achievements || [];
  const extracurriculars = cvData.extracurriculars || [];

  return (
    <>
      {projects.length > 0 && (
        <SectionBlock>
          <section className="break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <SectionTitle title="Projects" color={theme} />
            <div className="space-y-4">
              {projects.map((p: any, i: number) => (
                <div key={i} className="text-[10.5px] break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <div className="font-bold text-zinc-800 uppercase tracking-tight text-[11px]">{p.title}{p.technologies ? <span className="text-zinc-400 font-normal lowercase ml-2">| {p.technologies}</span> : null}</div>
                  <p className="text-zinc-600 leading-relaxed mt-1">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        </SectionBlock>
      )}

      {achievements.length > 0 && (
        <SectionBlock>
          <section className="break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <SectionTitle title="Achievements & Awards" color={theme} />
            <div className="space-y-3">
              {achievements.map((a: any, i: number) => (
                <div key={i} className="text-[10.5px] break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <div className="font-bold text-zinc-800 uppercase tracking-tight text-[11px]">{a.title}{a.date ? <span className="text-zinc-400 font-normal ml-2">{a.date}</span> : null}</div>
                  <p className="text-zinc-600 leading-relaxed">{a.description}</p>
                </div>
              ))}
            </div>
          </section>
        </SectionBlock>
      )}

      {extracurriculars.length > 0 && (
        <SectionBlock>
          <section className="break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <SectionTitle title="Extracurricular Activities" color={theme} />
            <div className="space-y-3">
              {extracurriculars.map((e: any, i: number) => (
                <div key={i} className="text-[10.5px] break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <div className="font-bold text-zinc-800 uppercase tracking-tight text-[11px]">{e.title}{e.role ? <span className="text-zinc-400 font-normal ml-2">— {e.role}</span> : null}</div>
                  <p className="text-zinc-600 leading-relaxed">{e.description}</p>
                </div>
              ))}
            </div>
          </section>
        </SectionBlock>
      )}
    </>
  );
};

const SectionRenderer = ({ sectionId, cvData, theme }: { sectionId: string; cvData: CVData; theme: string }) => {
  const pageBreakBefore = cvData.sectionPageBreaks?.[sectionId as keyof typeof cvData.sectionPageBreaks] || false;
  const sp = cvData.sectionSpacing?.[sectionId] || { marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 };

  switch (sectionId) {
    case 'professionalQualifications': {
      const qualList = (cvData.professionalQualifications || []).map((q: any) => typeof q === 'string' ? q : q.qualification).filter(Boolean);
      if (!qualList.length) return null;
      return (
        <SectionBlock pageBreakBefore={pageBreakBefore} spacingTop={sp.marginTop} spacingBottom={sp.marginBottom} padTop={sp.paddingTop} padBottom={sp.paddingBottom}>
          <section className="break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <SectionTitle title="Professional Qualifications" color={theme} />
            <ul className="list-disc pl-6 space-y-2 text-[10.5px] text-zinc-700 font-medium leading-relaxed">
              {qualList.map((q, i) => <li key={i}>{q}</li>)}
            </ul>
          </section>
        </SectionBlock>
      );
    }
    case 'education': {
      if (!cvData.education?.aLevel?.subjects?.length && !cvData.education?.oLevel?.subjects?.length) return null;
      return (
        <SectionBlock pageBreakBefore={pageBreakBefore} spacingTop={sp.marginTop} spacingBottom={sp.marginBottom} padTop={sp.paddingTop} padBottom={sp.paddingBottom}>
          <section className="break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <SectionTitle title="Education Qualifications" color={theme} />
            {[cvData.education?.aLevel, cvData.education?.oLevel].map((edu, idx) => edu?.subjects?.length > 0 && (
              <div key={idx} className="mb-6 last:mb-0 break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                <p className="font-bold text-[10.5px] uppercase mb-2">• G.C.E. {idx === 0 ? 'Advanced' : 'Ordinary'} Level - {edu.year}</p>
                <div className="grid grid-cols-2 gap-x-12 pl-5 text-[10.5px]">
                  {edu.subjects.map((s: Subject, i: number) => (
                    <div key={i} className="flex justify-between border-b border-zinc-100 py-1.5">
                      <span className="text-zinc-600">{s.name}</span><span className="font-black" style={{ color: theme }}>{s.grade}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </SectionBlock>
      );
    }
    case 'workExperience': {
      const workExpList = cvData.workExperience || [];
      if (!workExpList.length) return null;
      return (
        <SectionBlock pageBreakBefore={pageBreakBefore} spacingTop={sp.marginTop} spacingBottom={sp.marginBottom} padTop={sp.paddingTop} padBottom={sp.paddingBottom}>
          <section className="break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <SectionTitle title="Work Experience" color={theme} />
            <div className="space-y-5">
              {workExpList.map((exp: any, i: number) => (
                <div key={i} className="text-[10.5px] break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <div className="font-bold text-zinc-800 uppercase tracking-tight text-[11px]">{exp.title} | {exp.company}</div>
                  <div className="text-[9px] text-zinc-400 font-bold mb-1.5">{exp.startYear && exp.endYear ? `${exp.startYear} - ${exp.endYear}` : exp.duration || (exp.startYear || exp.endYear ? `${exp.startYear || ''}${exp.startYear && exp.endYear ? ' - ' : ''}${exp.endYear || ''}` : '')}</div>
                  <p className="text-zinc-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </SectionBlock>
      );
    }
    case 'projects': {
      const projects = cvData.projects || [];
      if (!projects.length) return null;
      return (
        <SectionBlock pageBreakBefore={pageBreakBefore} spacingTop={sp.marginTop} spacingBottom={sp.marginBottom} padTop={sp.paddingTop} padBottom={sp.paddingBottom}>
          <section className="break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <SectionTitle title="Projects" color={theme} />
            <div className="space-y-4">
              {projects.map((p: any, i: number) => (
                <div key={i} className="text-[10.5px] break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <div className="font-bold text-zinc-800 uppercase tracking-tight text-[11px]">{p.title}{p.technologies ? <span className="text-zinc-400 font-normal lowercase ml-2">| {p.technologies}</span> : null}</div>
                  <p className="text-zinc-600 leading-relaxed mt-1">{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        </SectionBlock>
      );
    }
    case 'achievements': {
      const achievements = cvData.achievements || [];
      if (!achievements.length) return null;
      return (
        <SectionBlock pageBreakBefore={pageBreakBefore} spacingTop={sp.marginTop} spacingBottom={sp.marginBottom} padTop={sp.paddingTop} padBottom={sp.paddingBottom}>
          <section className="break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <SectionTitle title="Achievements & Awards" color={theme} />
            <div className="space-y-3">
              {achievements.map((a: any, i: number) => (
                <div key={i} className="text-[10.5px] break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <div className="font-bold text-zinc-800 uppercase tracking-tight text-[11px]">{a.title}{a.date ? <span className="text-zinc-400 font-normal ml-2">{a.date}</span> : null}</div>
                  <p className="text-zinc-600 leading-relaxed">{a.description}</p>
                </div>
              ))}
            </div>
          </section>
        </SectionBlock>
      );
    }
    case 'extracurriculars': {
      const extracurriculars = cvData.extracurriculars || [];
      if (!extracurriculars.length) return null;
      return (
        <SectionBlock pageBreakBefore={pageBreakBefore} spacingTop={sp.marginTop} spacingBottom={sp.marginBottom} padTop={sp.paddingTop} padBottom={sp.paddingBottom}>
          <section className="break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <SectionTitle title="Extracurricular Activities" color={theme} />
            <div className="space-y-3">
              {extracurriculars.map((e: any, i: number) => (
                <div key={i} className="text-[10.5px] break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <div className="font-bold text-zinc-800 uppercase tracking-tight text-[11px]">{e.title}{e.role ? <span className="text-zinc-400 font-normal ml-2">— {e.role}</span> : null}</div>
                  <p className="text-zinc-600 leading-relaxed">{e.description}</p>
                </div>
              ))}
            </div>
          </section>
        </SectionBlock>
      );
    }
    case 'references': {
      const refList = cvData.references || [];
      if (!refList.some((r: any) => r.name)) return null;
      return (
        <SectionBlock pageBreakBefore={pageBreakBefore} spacingTop={sp.marginTop} spacingBottom={sp.marginBottom} padTop={sp.paddingTop} padBottom={sp.paddingBottom}>
          <section className="break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <SectionTitle title="References" color={theme} />
            <div className="grid grid-cols-2 gap-8 text-[9.5px]">
              {refList.map((r: any, i: number) => r.name && (
                <div key={i} className="text-zinc-700 font-medium leading-relaxed break-inside-avoid" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <b className="text-[11px] text-zinc-900 uppercase font-black">{r.name}</b><br/>
                  {r.designation && <>{r.designation}<br/></>}
                  {r.organization && <>{r.organization}<br/></>}
                  <span className="font-black mt-1.5 block text-[10.5px]" style={{ color: theme }}>{r.phone}</span>
                </div>
              ))}
            </div>
          </section>
        </SectionBlock>
      );
    }
    default:
      return null;
  }
};

const ContentBody = ({ cvData, theme }: { cvData: CVData; theme: string }) => {
  const sectionIds = ['professionalQualifications', 'education', 'workExperience', 'projects', 'achievements', 'extracurriculars', 'references'];

  return (
    <div className="w-full">
      {sectionIds.map((sectionId: string) => (
        <SectionRenderer key={sectionId} sectionId={sectionId} cvData={cvData} theme={theme} />
      ))}
    </div>
  );
};

const ProfileImg = ({ src, shape }: { src: string; shape: 'round' | 'square' }) => (
  <img src={src} className={`w-full h-full object-cover ${shape === 'round' ? 'rounded-full' : 'rounded-xl'}`} alt="Profile" />
);

const BrandLogo = () => (
  <div className="flex items-center gap-2 shrink-0">
    <img 
      src="/logo.png" 
      alt="DC Logo" 
      className="h-8 w-auto object-contain" 
      onError={(e) => { e.currentTarget.style.display = 'none'; }} 
    />
    <span className="font-black text-xs tracking-tighter uppercase text-zinc-800"></span>
  </div>
);

const MultiPageView = ({ children }: { children: React.ReactNode }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<number[]>([1]);

  useLayoutEffect(() => {
    if (mainRef.current) {
      const wrappers = mainRef.current.querySelectorAll('.cv-page-wrapper');
      
      if (wrappers.length > 0) {
        const baseWrapper = wrappers[0] as HTMLElement;
        const containerWidth = baseWrapper.clientWidth;
        const actualPageHeight = containerWidth * (297 / 210);

        wrappers.forEach(wrapper => {
          const blocks = wrapper.querySelectorAll('.break-inside-avoid') as NodeListOf<HTMLElement>;
          
          // Remove only previously-added push margins (keep React-set margins from sectionSpacing)
          blocks.forEach(block => {
            const pushAttr = block.getAttribute('data-multipage-push');
            if (pushAttr) {
              const pushPx = parseFloat(pushAttr);
              const currentMT = block.style.marginTop ? parseFloat(block.style.marginTop) || 0 : 0;
              block.style.marginTop = `${Math.max(0, currentMT - pushPx)}px`;
              block.removeAttribute('data-multipage-push');
            }
          });

          // First pass: push elements that span page boundaries
          blocks.forEach(block => {
            const wrapperRect = wrapper.getBoundingClientRect();
            const blockRect = block.getBoundingClientRect();
            const absoluteTop = blockRect.top - wrapperRect.top;
            const absoluteBottom = absoluteTop + blockRect.height;
            
            const pageIndexStart = Math.floor(absoluteTop / actualPageHeight);
            const pageIndexEnd = Math.floor((absoluteBottom - 2) / actualPageHeight);

            if (pageIndexStart !== pageIndexEnd && blockRect.height < actualPageHeight) {
              const boundary = (pageIndexStart + 1) * actualPageHeight;
              const pushAmount = boundary - absoluteTop;
              const currentMT = block.style.marginTop ? parseFloat(block.style.marginTop) || 0 : 0;
              block.style.marginTop = `${currentMT + pushAmount}px`;
              block.setAttribute('data-multipage-push', `${pushAmount}`);
            }
          });

          // Second pass: force page breaks for sections with .section-page-break
          const forcedBreaks = wrapper.querySelectorAll('.section-page-break') as NodeListOf<HTMLElement>;
          forcedBreaks.forEach(block => {
            const wrapperRect = wrapper.getBoundingClientRect();
            const blockRect = block.getBoundingClientRect();
            const absoluteTop = blockRect.top - wrapperRect.top;
            
            const currentPage = Math.floor(absoluteTop / actualPageHeight);
            const pageStart = currentPage * actualPageHeight;
            
            if (Math.abs(absoluteTop - pageStart) > 2) {
              const nextPageStart = (currentPage + 1) * actualPageHeight;
              const pushAmount = nextPageStart - absoluteTop;
              const currentMT = block.style.marginTop ? parseFloat(block.style.marginTop) || 0 : 0;
              block.style.marginTop = `${currentMT + pushAmount}px`;
              const existingPush = block.getAttribute('data-multipage-push');
              const totalPush = (existingPush ? parseFloat(existingPush) : 0) + pushAmount;
              block.setAttribute('data-multipage-push', `${totalPush}`);
            }
          });
        });

        const totalHeight = baseWrapper.scrollHeight;
        const totalPages = Math.max(1, Math.ceil(totalHeight / actualPageHeight));
        const newPages = Array.from({ length: totalPages }, (_, i) => i + 1);
        
        setPages(prev => prev.length === newPages.length ? prev : newPages);
      }
    }
  }, [children]);

  return (
    <div ref={mainRef} className="flex flex-col gap-8 items-center relative w-full">
      <div 
        className="absolute opacity-0 pointer-events-none -z-10 bg-white w-[210mm] cv-page-wrapper" 
        style={{ height: 'max-content', minHeight: '297mm' }}
      >
        {children}
      </div>
      
      {pages.map((pageIndex: number) => (
        <div 
          key={pageIndex} 
          className="bg-white shadow-2xl relative overflow-hidden" 
          style={{ 
            width: '210mm', 
            height: '297mm',
            boxSizing: 'border-box'
          }}
        >
          <div 
            className="cv-page-wrapper"
            style={{ 
              transform: `translateY(-${(pageIndex - 1) * 297}mm)`, 
              height: `${pages.length * 297}mm`,
              width: '100%'
            }}
          >
            {children}
          </div>
        </div>
      ))}
    </div>
  );
};

export function CVTemplateBase({ cvData }: { cvData: CVData }) {
  const theme = cvData.customColor || '#1e3a8a';

  const pInfo = cvData.personalInfo || {};
  const contact = cvData.contact || {};
  
  const fullName = pInfo.fullName || pInfo.name || ""; 
  const summary = pInfo.description || ""; 
  const phone1 = contact.phone1 || "";
  const email = contact.email || "";
  const address = contact.address || "";
  const skillsList = (cvData.skills || []).map(s => typeof s === 'object' ? (s as any).name : s).filter(Boolean);
  const langList = (cvData.languages || []).map(l => typeof l === 'object' ? (l as any).name : l).filter(Boolean);
  const showDS = cvData.showDS;
  const profileImg = pInfo.photo || cvData.profileImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const photoShape = cvData.photoShape || 'round';
  const pShape = photoShape === 'round' ? 'rounded-full' : 'rounded-xl';

  const renderCurrentTemplate = () => {
    switch (cvData.selectedTemplate) {
      case 1: return (
        <div className="flex min-h-[297mm] h-full w-full">
          <div className="w-[32%] bg-zinc-50 border-r p-10 flex flex-col gap-8 shrink-0 text-zinc-600">
            <div className={`w-36 h-36 ${pShape} border-4 mx-auto overflow-hidden shrink-0`} style={{ borderColor: theme }}><ProfileImg src={profileImg} shape={photoShape} /></div>
            <section><SectionTitle title="Contact" color={theme} /><div className="space-y-3 text-[10.5px] font-bold"><p className="flex items-center gap-2"><Phone size={12}/> {phone1}</p><p className="flex items-center gap-2 truncate"><Mail size={12}/> {email}</p><p className="flex items-start gap-2 whitespace-pre-wrap leading-relaxed"><MapPin size={12} className="mt-1 shrink-0"/> {address}</p></div></section>
            <section><SectionTitle title="Personal Info" color={theme} /><PersonalInfoList cvData={cvData} /></section>
            {skillsList.length > 0 && <section><SectionTitle title="Skills" color={theme} /><div className="flex flex-wrap gap-1.5">{skillsList.map((s, i) => <span key={i} className="bg-zinc-200 px-2.5 py-1.5 rounded text-[9px] font-black uppercase">{s}</span>)}</div></section>}
            {langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><div className="space-y-1.5 text-[10.5px] font-bold">{langList.map((l, i) => <p key={i}>• {l}</p>)}</div></section>}
          </div>
          <div className="flex-1 p-12 flex flex-col overflow-visible"><div className="mb-8 flex justify-between items-start"><div className="flex-1 pr-4"><h1 className="text-4xl font-black uppercase leading-none mb-4 break-words" style={{ color: theme }}>{fullName}</h1>{summary && <p className="text-zinc-500 italic text-[11px] leading-relaxed whitespace-pre-wrap">"{summary}"</p>}</div><BrandLogo /></div><ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
        </div>
      );

      case 2: return (
        <div className="flex flex-col min-h-[297mm] h-full w-full overflow-visible">
          <div className="h-32 flex items-center justify-between px-12 text-white shrink-0" style={{ backgroundColor: theme }}>
            <div className="max-w-[70%]"><h1 className="text-3xl font-black uppercase tracking-tight break-words">{fullName}</h1><p className="text-[10.5px] opacity-80 uppercase tracking-widest mt-2 flex items-center gap-4 flex-wrap"><span className="flex items-center gap-1"><Mail size={12}/> {email}</span> | <span className="flex items-center gap-1"><Phone size={12}/> {phone1}</span></p></div>
            <div className={`w-24 h-24 overflow-hidden border-2 border-white/30 ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div>
          </div>
          <div className="flex flex-1 p-12 gap-12 overflow-visible">
            <div className="w-[28%] space-y-8 shrink-0 self-stretch">
              <section><SectionTitle title="Contact" color={theme} /><div className="text-[10.5px] font-bold text-zinc-500 space-y-3"><p className="flex items-start gap-2 whitespace-pre-wrap leading-relaxed"><MapPin size={12} className="mt-1 shrink-0"/> {address}</p><p className="flex items-center gap-2"><Phone size={12}/> {phone1}</p></div></section>
              <section><SectionTitle title="Personal" color={theme} /><PersonalInfoList cvData={cvData} /></section>
              {skillsList.length > 0 && <section><SectionTitle title="Skills" color={theme} /><div className="flex flex-wrap gap-1.5">{skillsList.map((s, i) => <span key={i} className="bg-zinc-100 px-2.5 py-1.5 rounded text-[9px] font-bold uppercase">{s}</span>)}</div></section>}
              {langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><p className="text-[10.5px] font-bold text-zinc-500">{langList.join(', ')}</p></section>}
            </div>
            <div className="flex-1 flex flex-col">{summary && <p className="italic text-zinc-600 text-[10.5px] mb-8 border-l-4 pl-5 leading-relaxed whitespace-pre-wrap" style={{ borderColor: theme }}>{summary}</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
          </div>
        </div>
      );

      case 3: return (
        <div className="flex flex-col min-h-[297mm] h-full w-full p-12 overflow-visible">
          <div className="relative h-28 bg-zinc-900 rounded-[2.5rem] flex items-center px-12 mb-12 shrink-0">
            <div className="max-w-[60%]"><h1 className="text-2xl font-black text-white uppercase italic leading-none break-words">{fullName}</h1><p className="text-[10px] text-zinc-400 mt-2 uppercase tracking-widest flex items-center gap-2"><Mail size={12}/> {email}</p></div>
            <div className={`absolute -bottom-4 right-12 w-28 h-28 border-4 border-white overflow-hidden shadow-2xl ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div>
          </div>
          <div className="grid grid-cols-12 gap-10 flex-1 overflow-visible">
            <div className="col-span-4 space-y-8 shrink-0"><div className="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100 space-y-8">
              <section className="text-left"><p className="text-[11px] font-black uppercase mb-3" style={{ color: theme }}>Contact Info</p><div className="text-[10px] text-zinc-500 font-bold space-y-2 leading-relaxed"><p className="flex items-start gap-2 whitespace-pre-wrap"><MapPin size={12} className="mt-1 shrink-0"/> {address}</p><p className="flex items-center gap-2"><Phone size={12}/> {phone1}</p></div></section>
              <section><p className="text-[11px] font-black uppercase mb-3" style={{ color: theme }}>Identity</p><PersonalInfoList cvData={cvData} /></section>
              {skillsList.length > 0 && <section className="text-left"><p className="text-[11px] font-black uppercase mb-3" style={{ color: theme }}>Skills</p><div className="flex flex-wrap justify-start gap-2">{skillsList.map((s, i) => <span key={i} className="bg-zinc-200 px-3 py-1 rounded text-[9px] font-bold">{s}</span>)}</div></section>}
              {langList.length > 0 && <section className="text-left"><p className="text-[11px] font-black uppercase mb-2" style={{ color: theme }}>Languages</p><p className="text-[10px] text-zinc-500 font-bold">{langList.join(' • ')}</p></section>}
            </div></div>
            <div className="col-span-8 flex flex-col">{summary && <p className="text-[10.5px] text-zinc-500 italic mb-8 leading-relaxed whitespace-pre-wrap">"{summary}"</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
          </div>
        </div>
      );

      case 4: return (
        <div className="flex min-h-[297mm] h-full w-full overflow-visible text-zinc-300">
          <div className="w-[32%] bg-zinc-900 p-10 flex flex-col gap-8 shrink-0">
            <div className={`w-32 h-32 border-2 border-zinc-700 overflow-hidden mx-auto ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div>
            <section><h3 className="border-b border-zinc-700 pb-2 mb-4 text-[10.5px] font-black uppercase text-zinc-400">Contact</h3><div className="text-[10px] space-y-4 font-bold opacity-80 leading-relaxed"><p className="flex items-start gap-2 whitespace-pre-wrap"><MapPin size={12} className="mt-1 shrink-0"/> {address}</p><p className="flex items-center gap-2"><Phone size={12}/> {phone1}</p><p className="flex items-center gap-2 truncate"><Mail size={12}/> {email}</p></div></section>
            <section><h3 className="border-b border-zinc-700 pb-2 mb-4 text-[10.5px] font-black uppercase text-zinc-400">Personal</h3><PersonalInfoList cvData={cvData} isDark={true} /></section>
            {skillsList.length > 0 && <section><h3 className="border-b border-zinc-700 pb-2 mb-4 text-[10.5px] font-black uppercase text-zinc-400">Expertise</h3><div className="flex flex-wrap gap-1.5">{skillsList.map((s, i) => <span key={i} className="bg-zinc-800 px-2.5 py-1 rounded text-[9px] uppercase">{s}</span>)}</div></section>}
            {langList.length > 0 && <section><h3 className="border-b border-zinc-700 pb-2 mb-4 text-[10.5px] font-black uppercase text-zinc-400">Languages</h3><div className="text-[10px] font-bold opacity-70">{langList.join(', ')}</div></section>}
          </div>
          <div className="flex-1 p-12 flex flex-col overflow-visible bg-white text-zinc-800"><h1 className="text-4xl font-black uppercase tracking-tighter mb-6 break-words">{fullName}</h1>{summary && <p className="text-zinc-500 text-[10.5px] mb-8 border-l-2 pl-5 leading-relaxed whitespace-pre-wrap">{summary}</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
        </div>
      );

      case 5: return (
        <div className="flex flex-col min-h-[297mm] h-full w-full p-12 overflow-visible text-zinc-800">
          <div className="flex justify-between items-start border-b-[5px] pb-8 mb-10 shrink-0" style={{ borderColor: theme }}>
            <div className="max-w-[75%]"><h1 className="text-3xl font-black uppercase mb-3 tracking-tight break-words">{fullName}</h1><div className="text-[10.5px] font-bold text-zinc-500 flex flex-wrap gap-x-4 gap-y-1"><span className="flex items-center gap-1"><Phone size={12}/> {phone1}</span><span className="flex items-center gap-1"><Mail size={12}/> {email}</span><span className="flex items-center gap-1"><MapPin size={12}/> {address.replace(/\n/g, ', ')}</span></div></div>
            <div className={`w-20 h-20 overflow-hidden ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div>
          </div>
          <div className="flex-1 flex gap-10 overflow-visible">
            <div className="w-[28%] shrink-0 space-y-8 self-stretch"><section><SectionTitle title="Profile Details" color={theme} /><PersonalInfoList cvData={cvData} /></section>
            {skillsList.length > 0 && <section><SectionTitle title="Skills" color={theme} /><div className="flex flex-wrap gap-1.5">{skillsList.map((s, i) => <span key={i} className="bg-zinc-100 px-3 py-1 rounded text-[9px] font-black uppercase">{s}</span>)}</div></section>}
            {langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><p className="text-[10.5px] font-bold text-zinc-500 uppercase leading-relaxed">{langList.join(', ')}</p></section>}
            </div>
            <div className="flex-1 flex flex-col">{summary && <p className="text-[10.5px] text-zinc-600 italic mb-8 leading-relaxed whitespace-pre-wrap">{summary}</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
          </div>
        </div>
      );

      case 6: return (
        <div className="p-6 min-h-[297mm] h-full w-full overflow-visible">
          <div className="flex gap-8 mb-10 shrink-0">
            <div className={`w-24 h-32 overflow-hidden rounded-2xl shadow-xl ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div>
            <div className="flex-1 pt-3"><h1 className="text-3xl font-black uppercase border-b-2 pb-3 mb-4 leading-none break-words" style={{ borderColor: theme, color: theme }}>{fullName}</h1><div className="text-[10.5px] text-zinc-400 font-bold uppercase tracking-wider flex gap-4 flex-wrap"><span className="flex items-center gap-1"><Phone size={12}/> {phone1}</span><span className="flex items-center gap-1"><Mail size={12}/> {email}</span></div></div>
          </div>
          <div className="flex-1 flex gap-10 overflow-visible"><div className="flex-1 flex flex-col overflow-visible">{summary && <p className="text-[10.5px] text-zinc-500 italic mb-8 leading-relaxed whitespace-pre-wrap">"{summary}"</p>}<ContentBody cvData={cvData} theme={theme} /></div>
          <div className="w-52 bg-zinc-50 p-8 rounded-[2.5rem] space-y-8 shrink-0 border border-zinc-100">
          <section><SectionTitle title="About Me" color={theme} /><PersonalInfoList cvData={cvData} /></section>
          <section><SectionTitle title="Contact" color={theme} /><p className="text-[9.5px] font-bold text-zinc-500 whitespace-pre-wrap leading-relaxed flex items-start gap-2"><MapPin size={12} className="mt-0.5 shrink-0"/> {address}</p></section>
          {skillsList.length > 0 && <section><SectionTitle title="Skills" color={theme} /><div className="flex flex-col gap-2 text-[9.5px] font-bold text-zinc-600">{skillsList.map((s, i) => <p key={i}>• {s}</p>)}</div></section>}
          {langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><p className="text-[9.5px] font-bold text-zinc-500 leading-relaxed">{langList.join(', ')}</p></section>}
          </div></div><DateSignature show={!!showDS} />
        </div>
      );

      case 7: return (
        <div className="flex min-h-[297mm] h-full w-full gap-10 p-12 overflow-visible text-zinc-800">
          <div className="flex-1 flex flex-col overflow-visible"><h1 className="text-4xl font-black uppercase italic mb-8 tracking-tighter break-words" style={{ color: theme }}>{fullName}</h1>{summary && <p className="text-zinc-500 text-[10.5px] mb-8 border-l-4 pl-5 leading-relaxed whitespace-pre-wrap" style={{ borderColor: theme }}>{summary}</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
          <div className="w-[30%] shrink-0 border-l pl-10 space-y-8 text-zinc-600">
            <div className={`w-full h-48 overflow-hidden rounded-3xl mb-6 shadow-lg ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div>
            <section><SectionTitle title="Connect" color={theme} /><div className="text-[9.5px] font-bold space-y-3 leading-relaxed"><p className="flex items-start gap-2 whitespace-pre-wrap"><MapPin size={12} className="mt-1 shrink-0"/> {address}</p><p className="flex items-center gap-2"><Phone size={12}/> {phone1}</p><p className="flex items-center gap-2 truncate"><Mail size={12}/> {email}</p></div></section>
            <section><SectionTitle title="Personal" color={theme} /><PersonalInfoList cvData={cvData} /></section>
            {skillsList.length > 0 && <section><SectionTitle title="Top Skills" color={theme} /><div className="flex flex-col gap-2">{skillsList.map((s, i) => <p key={i} className="text-[9.5px] font-black uppercase tracking-tighter">» {s}</p>)}</div></section>}
            {langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><p className="text-[9.5px] font-black uppercase">{langList.join(' | ')}</p></section>}
          </div>
        </div>
      );

      case 8: return (
        <div className="flex flex-col min-h-[297mm] h-full w-full p-12 items-center overflow-visible text-zinc-800">
          <div className="text-center border-b-2 pb-8 mb-10 w-full shrink-0" style={{ borderColor: theme }}>
            <div className={`w-24 h-24 mx-auto mb-5 overflow-hidden border-2 p-1.5 ${pShape}`} style={{ borderColor: theme }}><ProfileImg src={profileImg} shape={photoShape} /></div>
            <h1 className="text-3xl font-black uppercase tracking-[0.2em] leading-none mb-4 break-words">{fullName}</h1><div className="text-zinc-400 font-bold text-[10px] uppercase leading-relaxed flex justify-center gap-6 flex-wrap"><span className="flex items-center gap-1"><Phone size={12}/> {phone1}</span><span className="flex items-center gap-1"><Mail size={12}/> {email}</span></div>
          </div>
          <div className="w-full grid grid-cols-12 gap-12 flex-1 overflow-visible text-left">
            <div className="col-span-4 space-y-8 shrink-0 border-r border-zinc-100 pr-6"><section><SectionTitle title="Details" color={theme} /><PersonalInfoList cvData={cvData} /></section><section><SectionTitle title="Location" color={theme} /><p className="text-[9.5px] font-bold text-zinc-500 whitespace-pre-wrap flex items-start gap-2"><MapPin size={12} className="mt-1 shrink-0"/> {address}</p></section>{skillsList.length > 0 && <section><SectionTitle title="Expertise" color={theme} /><div className="space-y-2">{skillsList.map((s, i) => <p key={i} className="text-[9.5px] font-bold text-zinc-500 uppercase tracking-tight"># {s}</p>)}</div></section>}{langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><p className="text-[9.5px] font-bold text-zinc-500 uppercase tracking-tight">{langList.join(', ')}</p></section>}</div>
            <div className="col-span-8 flex flex-col overflow-visible text-left">{summary && <p className="text-[10.5px] text-zinc-500 italic mb-10 text-left leading-relaxed whitespace-pre-wrap">"{summary}"</p>}<ContentBody cvData={cvData} theme={theme} /></div>
          </div><DateSignature show={!!showDS} />
        </div>
      );

      case 9: return (
        <div className="flex flex-col min-h-[297mm] h-full w-full overflow-visible">
          <div className="h-40 flex items-end px-12 pb-6 text-white shrink-0 relative" style={{ backgroundColor: theme }}><div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 70%), radial-gradient(circle at 80% 20%, white 0%, transparent 50%)' }}></div>
            <div className="flex items-end gap-8 z-10"><div className={`w-28 h-28 overflow-hidden border-4 border-white/30 shadow-xl mb-[-3rem] ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div><div className="pb-2"><h1 className="text-4xl font-black uppercase tracking-tight break-words">{fullName}</h1><p className="text-[10px] opacity-80 uppercase tracking-[0.3em] mt-1">{email} | {phone1}</p></div></div>
          </div>
          <div className="flex-1 px-12 pt-16 pb-8 flex gap-10 overflow-visible">
            <div className="w-64 shrink-0 space-y-6 self-stretch"><section><SectionTitle title="Personal" color={theme} /><PersonalInfoList cvData={cvData} /></section>{skillsList.length > 0 && <section><SectionTitle title="Skills" color={theme} /><div className="space-y-1.5">{skillsList.map((s, i) => <div key={i} className="flex items-center gap-2"><div className="w-full bg-zinc-100 rounded-full h-2"><div className="h-2 rounded-full" style={{ width: `${80 + Math.random() * 20}%`, backgroundColor: theme }}></div></div><span className="text-[8px] font-bold w-16 text-right text-zinc-500">{s}</span></div>)}</div></section>}{langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><p className="text-[10px] font-bold text-zinc-500 uppercase">{langList.join(' • ')}</p></section>}</div>
            <div className="flex-1 flex flex-col">{summary && <p className="text-[10.5px] text-zinc-500 italic mb-6 leading-relaxed">{summary}</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
          </div>
        </div>
      );

      case 10: return (
        <div className="flex flex-col min-h-[297mm] h-full w-full overflow-visible p-8">
          <div className="flex items-center gap-8 mb-10 shrink-0 pb-6 border-b-2" style={{ borderColor: theme }}>
            <div className={`w-24 h-24 overflow-hidden border-4 border-white shadow-xl ${pShape} shrink-0`} style={{ borderColor: theme, backgroundColor: theme + '20' }}><ProfileImg src={profileImg} shape={photoShape} /></div>
            <div className="flex-1"><h1 className="text-4xl font-black uppercase tracking-[0.1em] break-words" style={{ color: theme }}>{fullName}</h1><p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{email} | {phone1}</p></div>
          </div>
          <div className="flex-1 flex gap-10 overflow-visible">
            <div className="w-56 shrink-0 space-y-6 self-stretch"><section><SectionTitle title="Details" color={theme} /><PersonalInfoList cvData={cvData} /></section>
            {skillsList.length > 0 && <section><SectionTitle title="Core Skills" color={theme} /><div className="flex flex-wrap gap-1.5">{skillsList.map((s, i) => <span key={i} className="px-3 py-1 text-[9px] font-black uppercase text-white rounded-lg" style={{ backgroundColor: theme }}>{s}</span>)}</div></section>}
            {langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><p className="text-[10px] font-bold text-zinc-500">{langList.join(', ')}</p></section>}
            </div>
            <div className="flex-1 flex flex-col">{summary && <p className="text-[10.5px] text-zinc-600 italic mb-6">{summary}</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
          </div>
        </div>
      );

      case 11: return (
        <div className="flex min-h-[297mm] h-full w-full overflow-visible">
          <div className="w-72 p-10 flex flex-col gap-6 shrink-0 text-white" style={{ backgroundColor: theme }}>
            <div className={`w-36 h-36 overflow-hidden border-4 border-white/20 mx-auto shadow-xl ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div>
            <section><h3 className="text-[10px] font-black uppercase tracking-widest mb-4 border-b border-white/20 pb-2">Contact</h3><div className="text-[10px] space-y-3 opacity-80 leading-relaxed"><p className="flex items-start gap-2"><MapPin size={12} className="mt-1 shrink-0"/> {address}</p><p className="flex items-center gap-2"><Phone size={12}/> {phone1}</p><p className="flex items-center gap-2 break-all"><Mail size={12}/> {email}</p></div></section>
            <section><h3 className="text-[10px] font-black uppercase tracking-widest mb-4 border-b border-white/20 pb-2">Personal</h3><PersonalInfoList cvData={cvData} isDark={true} /></section>
            {skillsList.length > 0 && <section><h3 className="text-[10px] font-black uppercase tracking-widest mb-4 border-b border-white/20 pb-2">Skills</h3><div className="flex flex-wrap gap-1.5">{skillsList.map((s, i) => <span key={i} className="px-2.5 py-1 bg-white/10 rounded text-[9px] font-bold">{s}</span>)}</div></section>}
            {langList.length > 0 && <section><h3 className="text-[10px] font-black uppercase tracking-widest mb-4 border-b border-white/20 pb-2">Languages</h3><div className="text-[10px] font-bold opacity-70">{langList.join(', ')}</div></section>}
          </div>
          <div className="flex-1 p-12 flex flex-col overflow-visible"><h1 className="text-4xl font-black uppercase tracking-tighter mb-6 break-words" style={{ color: theme }}>{fullName}</h1>{summary && <p className="text-zinc-500 text-[10.5px] mb-8 leading-relaxed border-l-4 pl-5" style={{ borderColor: theme }}>{summary}</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
        </div>
      );

      case 12: return (
        <div className="flex flex-col min-h-[297mm] h-full w-full p-8 overflow-visible">
          <div className="flex items-center gap-6 mb-10 shrink-0 pb-6 border-b-2" style={{ borderColor: theme }}>
            <div className={`w-28 h-28 overflow-hidden border-[3px] shadow-lg ${pShape}`} style={{ borderColor: theme }}><ProfileImg src={profileImg} shape={photoShape} /></div>
            <div className="flex-1"><h1 className="text-4xl font-black uppercase tracking-tighter break-words">{fullName}</h1><div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-2 flex gap-4 flex-wrap"><span>{email}</span><span>|</span><span>{phone1}</span></div></div>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-10 overflow-visible">
            <div className="col-span-1 space-y-6"><section><SectionTitle title="Personal" color={theme} /><PersonalInfoList cvData={cvData} /></section>
            {skillsList.length > 0 && <section><SectionTitle title="Expertise" color={theme} /><div className="space-y-1.5">{skillsList.map((s, i) => <div key={i} className="flex items-center gap-2"><div className="flex-1 h-1.5 bg-zinc-100 rounded-full"><div className="h-1.5 rounded-full" style={{ width: `${70 + Math.random() * 30}%`, backgroundColor: theme }}></div></div><span className="text-[8px] font-bold text-zinc-500 w-14 text-right">{s}</span></div>)}</div></section>}
            {langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><p className="text-[10px] font-bold text-zinc-500">{langList.join(' • ')}</p></section>}
            </div>
            <div className="col-span-2 flex flex-col">{summary && <p className="text-[10.5px] text-zinc-500 italic mb-6">{summary}</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
          </div>
        </div>
      );

      case 13: return (
        <div className="flex flex-col min-h-[297mm] h-full w-full overflow-visible">
          <div className="h-32 bg-zinc-900 flex items-center px-12 gap-8 shrink-0 border-b-4" style={{ borderColor: theme }}>
            <div className={`w-20 h-20 overflow-hidden border-2 border-white/20 ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div>
            <div><h1 className="text-3xl font-black text-white uppercase tracking-tight break-words">{fullName}</h1><p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">{email} | {phone1}</p></div>
          </div>
          <div className="flex-1 p-10 grid grid-cols-12 gap-8 overflow-visible">
            <div className="col-span-4 space-y-6"><div className="p-6 bg-zinc-50 rounded-2xl space-y-6"><section><SectionTitle title="About" color={theme} /><PersonalInfoList cvData={cvData} /></section>{skillsList.length > 0 && <section><SectionTitle title="Skills" color={theme} /><div className="flex flex-wrap gap-1">{skillsList.map((s, i) => <span key={i} className="px-2.5 py-1.5 bg-white rounded-lg text-[8px] font-bold uppercase shadow-sm">{s}</span>)}</div></section>}{langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><p className="text-[10px] font-bold text-zinc-500">{langList.join(', ')}</p></section>}</div></div>
            <div className="col-span-8 flex flex-col">{summary && <p className="text-[10.5px] text-zinc-500 italic mb-6">{summary}</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
          </div>
        </div>
      );

      case 14: return (
        <div className="flex flex-col min-h-[297mm] h-full w-full p-10 overflow-visible">
          <div className="grid grid-cols-3 gap-8 mb-10 shrink-0">
            <div className={`w-full aspect-square overflow-hidden shadow-xl ${pShape}`} style={{ border: `4px solid ${theme}` }}><ProfileImg src={profileImg} shape={photoShape} /></div>
            <div className="col-span-2 flex flex-col justify-center"><h1 className="text-4xl font-black uppercase tracking-tighter leading-none break-words" style={{ color: theme }}>{fullName}</h1><p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-3">{email} | {phone1}</p><p className="text-[10px] text-zinc-400 mt-1">{address.replace(/\n/g, ', ')}</p></div>
          </div>
          <div className="flex-1 flex gap-10 overflow-visible">
            <div className="w-56 shrink-0 space-y-6 self-stretch">{skillsList.length > 0 && <section><SectionTitle title="Skills" color={theme} /><div className="space-y-2">{skillsList.map((s, i) => <div key={i} className="flex items-center gap-2"><div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden"><div className="h-2 rounded-full" style={{ width: `${60 + Math.random() * 40}%`, backgroundColor: theme }}></div></div><span className="text-[8px] font-bold w-16 text-right text-zinc-500">{s}</span></div>)}</div></section>}{langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><p className="text-[10px] font-bold text-zinc-500">{langList.join(', ')}</p></section>}</div>
            <div className="flex-1 flex flex-col">{summary && <p className="text-[10.5px] text-zinc-600 italic mb-6">{summary}</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
          </div>
        </div>
      );

      case 15: return (
        <div className="flex flex-col min-h-[297mm] h-full w-full overflow-visible">
          <div className="h-36 flex items-start px-12 pt-8 gap-6 shrink-0" style={{ background: `linear-gradient(135deg, ${theme}, #000)` }}>
            <div className={`w-24 h-24 overflow-hidden border-4 border-white/30 shadow-2xl ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div>
            <div className="text-white pt-2"><h1 className="text-3xl font-black uppercase tracking-tighter break-words">{fullName}</h1><p className="text-[10px] opacity-70 uppercase tracking-[0.2em] mt-1">Professional CV</p></div>
          </div>
          <div className="flex-1 p-10 flex gap-10 overflow-visible">
            <div className="w-60 shrink-0 space-y-6 self-stretch"><section><SectionTitle title="Contact" color={theme} /><div className="text-[10px] font-bold text-zinc-500 space-y-2"><p className="flex items-center gap-2"><Phone size={12}/> {phone1}</p><p className="flex items-center gap-2 break-all"><Mail size={12}/> {email}</p><p className="flex items-start gap-2"><MapPin size={12} className="mt-0.5"/> {address}</p></div></section><section><SectionTitle title="Personal Info" color={theme} /><PersonalInfoList cvData={cvData} /></section>{skillsList.length > 0 && <section><SectionTitle title="Skills" color={theme} /><div className="flex flex-wrap gap-1">{skillsList.map((s, i) => <span key={i} className="px-2 py-1 text-[8px] font-black uppercase rounded" style={{ backgroundColor: theme + '20', color: theme }}>{s}</span>)}</div></section>}</div>
            <div className="flex-1 flex flex-col">{summary && <p className="text-[10.5px] text-zinc-500 italic mb-6 border-l-2 pl-4" style={{ borderColor: theme }}>"{summary}"</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
          </div>
        </div>
      );

      case 16: return (
        <div className="flex flex-col min-h-[297mm] h-full w-full p-12 overflow-visible">
          <div className="flex justify-between items-end border-b-[6px] pb-6 mb-8 shrink-0" style={{ borderColor: theme }}>
            <div className="max-w-[70%]"><h1 className="text-4xl font-black uppercase tracking-tighter leading-none break-words">{fullName}</h1><p className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest mt-4 flex items-center gap-4"><span className="flex items-center gap-1"><Phone size={12}/> {phone1}</span><span className="flex items-center gap-1"><Mail size={12}/> {email}</span></p></div>
            <div className={`w-28 h-28 overflow-hidden shadow-xl ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div>
          </div>
          <div className="flex-1 grid grid-cols-12 gap-12 overflow-visible">
            <div className="col-span-8 flex flex-col">{summary && <p className="text-[10.5px] text-zinc-500 italic mb-8">{summary}</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
            <div className="col-span-4 space-y-8 bg-zinc-50 p-6 rounded-2xl border border-zinc-100 shrink-0 self-stretch"><section><SectionTitle title="Personal Details" color={theme} /><PersonalInfoList cvData={cvData} /></section>{skillsList.length > 0 && <section><SectionTitle title="Core Competencies" color={theme} /><div className="space-y-2">{skillsList.map((s, i) => <p key={i} className="text-[9px] font-black uppercase tracking-wider text-zinc-600 border-b border-zinc-200 pb-1">▹ {s}</p>)}</div></section>}{langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><div className="text-[9.5px] font-bold text-zinc-500 space-y-1">{langList.map((l, i) => <p key={i}>• {l}</p>)}</div></section>}</div>
          </div>
        </div>
      );

      case 17: return (
        <div className="flex flex-col min-h-[297mm] h-full w-full p-10 items-center overflow-visible">
          <div className="w-full text-center relative mb-12 shrink-0 pb-8 border-b-2" style={{ borderColor: theme }}>
            <div className={`w-32 h-32 mx-auto mb-6 overflow-hidden border-[4px] shadow-2xl relative z-10 ${pShape}`} style={{ borderColor: theme }}><ProfileImg src={profileImg} shape={photoShape} /></div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 break-words">{fullName}</h1><p className="text-[11px] text-zinc-500 font-bold uppercase tracking-[0.2em]">{email} • {phone1}</p>
          </div>
          <div className="w-full max-w-4xl flex gap-12 flex-1 overflow-visible">
            <div className="w-64 shrink-0 space-y-8 text-right self-stretch"><section><SectionTitle title="Profile" color={theme} /><PersonalInfoList cvData={cvData} /></section>{skillsList.length > 0 && <section><SectionTitle title="Skills" color={theme} /><div className="flex flex-col gap-2">{skillsList.map((s, i) => <span key={i} className="text-[10px] font-bold text-zinc-600 uppercase">{s}</span>)}</div></section>}{langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><p className="text-[10px] font-bold text-zinc-500">{langList.join(', ')}</p></section>}</div>
            <div className="flex-1 flex flex-col border-l-2 pl-12" style={{ borderColor: theme + '30' }}>{summary && <p className="text-[10.5px] text-zinc-500 italic mb-8">"{summary}"</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
          </div>
        </div>
      );

      case 18: return (
        <div className="flex min-h-[297mm] h-full w-full overflow-visible">
          <div className="w-[30%] p-10 flex flex-col gap-8 shrink-0 text-white relative" style={{ background: `linear-gradient(180deg, ${theme} 0%, #000000 100%)` }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full"></div>
            <div className={`w-32 h-32 overflow-hidden border-2 border-white/20 mx-auto shadow-2xl relative z-10 ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div>
            <section><h3 className="text-[10px] font-black uppercase tracking-widest mb-3 text-white/50">Contact</h3><div className="text-[9.5px] space-y-3 font-bold"><p className="flex items-center gap-2"><Phone size={12}/> {phone1}</p><p className="flex items-center gap-2 break-all"><Mail size={12}/> {email}</p><p className="flex items-start gap-2 whitespace-pre-wrap"><MapPin size={12} className="mt-0.5 shrink-0"/> {address}</p></div></section>
            <section><h3 className="text-[10px] font-black uppercase tracking-widest mb-3 text-white/50">Details</h3><PersonalInfoList cvData={cvData} isDark={true} /></section>
            {skillsList.length > 0 && <section><h3 className="text-[10px] font-black uppercase tracking-widest mb-3 text-white/50">Skills</h3><div className="flex flex-wrap gap-1.5">{skillsList.map((s, i) => <span key={i} className="px-2 py-1 bg-white/10 rounded-md text-[8px] font-bold uppercase border border-white/5">{s}</span>)}</div></section>}
          </div>
          <div className="flex-1 p-12 flex flex-col overflow-visible bg-zinc-50"><h1 className="text-4xl font-black uppercase tracking-tighter mb-8 break-words text-zinc-900">{fullName}</h1>{summary && <p className="text-[10.5px] text-zinc-500 italic mb-10 leading-relaxed bg-white p-4 rounded-xl border border-zinc-100 shadow-sm">{summary}</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
        </div>
      );

      case 19: return (
        <div className="flex flex-col min-h-[297mm] h-full w-full p-12 overflow-visible">
          <div className="flex justify-between items-center mb-12 shrink-0 bg-zinc-100 p-8 rounded-[2rem]">
            <div className="max-w-[65%]"><h1 className="text-4xl font-black uppercase tracking-tight break-words mb-4" style={{ color: theme }}>{fullName}</h1><div className="text-[10px] font-bold text-zinc-500 flex gap-4 uppercase"><span className="flex items-center gap-1"><Phone size={12}/> {phone1}</span><span className="flex items-center gap-1"><Mail size={12}/> {email}</span></div></div>
            <div className={`w-32 h-32 overflow-hidden shadow-xl border-4 border-white ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div>
          </div>
          <div className="flex-1 grid grid-cols-12 gap-10 overflow-visible">
            <div className="col-span-4 space-y-8 shrink-0 self-stretch"><section><SectionTitle title="Personal Info" color={theme} /><PersonalInfoList cvData={cvData} /></section>{skillsList.length > 0 && <section><SectionTitle title="Skills" color={theme} /><div className="space-y-2">{skillsList.map((s, i) => <div key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme }}></div><span className="text-[9px] font-bold text-zinc-600 uppercase">{s}</span></div>)}</div></section>}{langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><div className="text-[9.5px] font-bold text-zinc-500 space-y-1">{langList.map((l, i) => <p key={i}>- {l}</p>)}</div></section>}</div>
            <div className="col-span-8 flex flex-col">{summary && <p className="text-[10.5px] text-zinc-600 italic mb-8">{summary}</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
          </div>
        </div>
      );

      case 20: return (
        <div className="flex flex-col min-h-[297mm] h-full w-full p-10 overflow-visible text-zinc-800 border-8" style={{ borderColor: theme }}>
          <div className="flex items-end gap-8 border-b-4 pb-8 mb-10 shrink-0" style={{ borderColor: theme }}>
            <div className={`w-28 h-28 overflow-hidden shadow-xl border-2 ${pShape}`} style={{ borderColor: theme }}><ProfileImg src={profileImg} shape={photoShape} /></div>
            <div className="flex-1 pb-2"><h1 className="text-4xl font-black uppercase tracking-tighter break-words leading-none mb-3">{fullName}</h1><p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-4"><span className="flex items-center gap-1"><Mail size={12}/> {email}</span><span className="flex items-center gap-1"><Phone size={12}/> {phone1}</span></p></div>
          </div>
          <div className="flex-1 flex gap-10 overflow-visible px-4">
            <div className="w-[30%] shrink-0 space-y-8 self-stretch border-r-2 pr-6" style={{ borderColor: theme + '20' }}><section><SectionTitle title="Info" color={theme} /><PersonalInfoList cvData={cvData} /></section>{skillsList.length > 0 && <section><SectionTitle title="Skills" color={theme} /><div className="flex flex-wrap gap-1.5">{skillsList.map((s, i) => <span key={i} className="px-2 py-1 text-[8.5px] font-black uppercase bg-zinc-100 rounded text-zinc-700">{s}</span>)}</div></section>}{langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><p className="text-[10px] font-bold text-zinc-500">{langList.join(', ')}</p></section>}</div>
            <div className="flex-1 flex flex-col">{summary && <p className="text-[10.5px] text-zinc-600 italic mb-8 leading-relaxed">"{summary}"</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
          </div>
        </div>
      );

      case 21: return (
        <div className="flex min-h-[297mm] h-full w-full overflow-visible">
          <div className="w-[35%] bg-zinc-800 text-white p-10 flex flex-col gap-8 shrink-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24"></div>
            <div className={`w-36 h-36 overflow-hidden border-4 border-zinc-600 mx-auto z-10 ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div>
            <div className="text-center z-10"><h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">Contact</h2><div className="text-[9.5px] space-y-2 opacity-80 flex flex-col items-center"><p className="flex items-center gap-1"><Phone size={12}/> {phone1}</p><p className="flex items-center gap-1"><Mail size={12}/> {email}</p></div></div>
            <div className="z-10"><h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 text-center">Personal</h2><PersonalInfoList cvData={cvData} isDark={true} /></div>
            {skillsList.length > 0 && <div className="z-10"><h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 text-center">Skills</h2><div className="flex flex-wrap justify-center gap-1.5">{skillsList.map((s, i) => <span key={i} className="px-2 py-1 bg-zinc-700 rounded text-[8.5px] font-bold uppercase">{s}</span>)}</div></div>}
          </div>
          <div className="flex-1 p-12 flex flex-col overflow-visible bg-zinc-50"><h1 className="text-5xl font-black uppercase tracking-tighter mb-8 break-words leading-none" style={{ color: theme }}>{fullName}</h1>{summary && <p className="text-[10.5px] text-zinc-500 italic mb-10 leading-relaxed border-l-4 pl-4" style={{ borderColor: theme }}>{summary}</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
        </div>
      );

      case 22: return (
        <div className="flex flex-col min-h-[297mm] h-full w-full p-12 overflow-visible bg-white">
          <div className="flex justify-between items-start mb-12 shrink-0">
            <div className="max-w-[70%]"><h1 className="text-4xl font-black uppercase tracking-tight break-words mb-4 text-zinc-800">{fullName}</h1><div className="w-16 h-1.5 mb-4" style={{ backgroundColor: theme }}></div><p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-4"><span className="flex items-center gap-1"><Phone size={12}/> {phone1}</span><span className="flex items-center gap-1"><Mail size={12}/> {email}</span></p></div>
            <div className={`w-28 h-28 overflow-hidden shadow-lg border-2 border-zinc-100 ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div>
          </div>
          <div className="flex-1 grid grid-cols-12 gap-12 overflow-visible">
            <div className="col-span-4 space-y-8 shrink-0 self-stretch border-r border-zinc-100 pr-8"><section><SectionTitle title="Info" color={theme} /><PersonalInfoList cvData={cvData} /></section>{skillsList.length > 0 && <section><SectionTitle title="Expertise" color={theme} /><div className="space-y-2">{skillsList.map((s, i) => <p key={i} className="text-[9.5px] font-bold text-zinc-600 uppercase flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme }}></span> {s}</p>)}</div></section>}{langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><p className="text-[10px] font-bold text-zinc-500">{langList.join(' • ')}</p></section>}</div>
            <div className="col-span-8 flex flex-col">{summary && <p className="text-[10.5px] text-zinc-600 italic mb-8">{summary}</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
          </div>
        </div>
      );

      case 23: return (
        <div className="flex flex-col min-h-[297mm] h-full w-full overflow-visible">
          <div className="h-48 shrink-0 relative flex items-end px-12 pb-8" style={{ background: `linear-gradient(45deg, ${theme}, #0f172a)` }}>
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="z-10 text-white w-full flex justify-between items-end"><div className="max-w-[70%]"><h1 className="text-4xl font-black uppercase tracking-tighter break-words leading-none mb-3">{fullName}</h1><p className="text-[10.5px] font-bold opacity-80 flex items-center gap-4"><span className="flex items-center gap-1"><Phone size={12}/> {phone1}</span><span className="flex items-center gap-1"><Mail size={12}/> {email}</span></p></div><div className={`w-32 h-32 overflow-hidden border-4 border-white shadow-2xl mb-[-4rem] ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div></div>
          </div>
          <div className="flex-1 p-12 pt-20 grid grid-cols-12 gap-10 overflow-visible bg-zinc-50">
            <div className="col-span-8 flex flex-col bg-white p-8 rounded-2xl shadow-sm">{summary && <p className="text-[10.5px] text-zinc-600 italic mb-8 border-l-4 pl-4" style={{ borderColor: theme }}>{summary}</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
            <div className="col-span-4 space-y-8 shrink-0 self-stretch bg-white p-8 rounded-2xl shadow-sm"><section><SectionTitle title="Details" color={theme} /><PersonalInfoList cvData={cvData} /></section>{skillsList.length > 0 && <section><SectionTitle title="Skills" color={theme} /><div className="flex flex-wrap gap-1.5">{skillsList.map((s, i) => <span key={i} className="px-2.5 py-1 bg-zinc-100 rounded text-[9px] font-black uppercase text-zinc-700">{s}</span>)}</div></section>}{langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><p className="text-[10px] font-bold text-zinc-500">{langList.join(', ')}</p></section>}</div>
          </div>
        </div>
      );

      case 24: return (
        <div className="flex min-h-[297mm] h-full w-full overflow-visible p-8 gap-8">
          <div className="w-[32%] shrink-0 flex flex-col gap-6 self-stretch">
            <div className={`w-full aspect-square overflow-hidden rounded-3xl shadow-xl ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div>
            <div className="bg-zinc-100 p-8 rounded-3xl flex-1 space-y-8"><section><SectionTitle title="Contact" color={theme} /><div className="text-[9.5px] font-bold text-zinc-600 space-y-2"><p className="flex items-center gap-2"><Phone size={12}/> {phone1}</p><p className="flex items-center gap-2"><Mail size={12}/> {email}</p></div></section><section><SectionTitle title="Personal Info" color={theme} /><PersonalInfoList cvData={cvData} /></section>{skillsList.length > 0 && <section><SectionTitle title="Skills" color={theme} /><div className="flex flex-col gap-2">{skillsList.map((s, i) => <div key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme }}></div><span className="text-[9.5px] font-bold uppercase text-zinc-600">{s}</span></div>)}</div></section>}{langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><p className="text-[9.5px] font-bold text-zinc-600">{langList.join(' • ')}</p></section>}</div>
          </div>
          <div className="flex-1 flex flex-col p-6"><h1 className="text-5xl font-black uppercase tracking-tighter mb-8 break-words leading-none" style={{ color: theme }}>{fullName}</h1>{summary && <p className="text-[10.5px] text-zinc-500 italic mb-10 leading-relaxed text-justify">"{summary}"</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
        </div>
      );

      case 25: return (
        <div className="flex flex-col min-h-[297mm] h-full w-full overflow-visible bg-white">
          <div className="flex items-center justify-between p-12 border-b-8 shrink-0" style={{ borderColor: theme }}>
            <div className="max-w-[70%]"><h1 className="text-4xl font-black uppercase tracking-tight break-words mb-2">{fullName}</h1><div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-4"><span className="flex items-center gap-1"><Phone size={12}/> {phone1}</span><span className="flex items-center gap-1"><Mail size={12}/> {email}</span></div></div>
            <div className={`w-24 h-24 overflow-hidden border-2 border-zinc-200 p-1 ${pShape}`}><div className={`w-full h-full overflow-hidden ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div></div>
          </div>
          <div className="flex-1 p-12 flex gap-12 overflow-visible">
            <div className="flex-1 flex flex-col">{summary && <p className="text-[10.5px] text-zinc-600 italic mb-8 font-medium">"{summary}"</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
            <div className="w-[30%] shrink-0 space-y-8 self-stretch border-l pl-8 border-zinc-100"><section><SectionTitle title="Details" color={theme} /><PersonalInfoList cvData={cvData} /></section>{skillsList.length > 0 && <section><SectionTitle title="Skills" color={theme} /><div className="space-y-1.5">{skillsList.map((s, i) => <p key={i} className="text-[9.5px] font-bold text-zinc-600 uppercase border-b border-zinc-50 pb-1">▹ {s}</p>)}</div></section>}{langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><p className="text-[10px] font-bold text-zinc-500">{langList.join(', ')}</p></section>}</div>
          </div>
        </div>
      );

      case 26: return (
        <div className="flex min-h-[297mm] h-full w-full overflow-visible">
          <div className="w-[30%] shrink-0 flex flex-col p-10 text-white gap-8" style={{ background: `linear-gradient(180deg, ${theme}, #3b0764)` }}>
            <div className={`w-32 h-32 overflow-hidden mx-auto border-4 border-white/20 shadow-xl ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div>
            <div className="text-center"><h1 className="text-2xl font-black uppercase tracking-tight break-words">{fullName}</h1><p className="text-[9px] mt-1 opacity-60 uppercase tracking-widest">{email}</p></div>
            <section><h3 className="text-[10px] font-black uppercase tracking-widest mb-3 border-b border-white/20 pb-2">Contact</h3><div className="text-[9.5px] space-y-2 opacity-80"><p className="flex items-center gap-2"><Phone size={12}/> {phone1}</p><p className="flex items-center gap-2 break-all"><Mail size={12}/> {email}</p><p className="flex items-start gap-2"><MapPin size={12} className="mt-0.5 shrink-0"/> {address}</p></div></section>
            <section><h3 className="text-[10px] font-black uppercase tracking-widest mb-3 border-b border-white/20 pb-2">Personal</h3><PersonalInfoList cvData={cvData} isDark={true} /></section>
            {langList.length > 0 && <section><h3 className="text-[10px] font-black uppercase tracking-widest mb-3 border-b border-white/20 pb-2">Languages</h3><div className="text-[9.5px] font-bold opacity-70">{langList.join(' • ')}</div></section>}
          </div>
          <div className="flex-1 p-10 flex flex-col overflow-visible"><h1 className="text-3xl font-black uppercase tracking-tighter mb-6 break-words" style={{ color: theme }}>{fullName}</h1>{summary && <p className="text-[10.5px] text-zinc-500 italic mb-8 leading-relaxed border-l-4 pl-5" style={{ borderColor: theme }}>{summary}</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
        </div>
      );

      case 27: return (
        <div className="flex flex-col min-h-[297mm] h-full w-full overflow-visible">
          <div className="shrink-0" style={{ background: `linear-gradient(135deg, ${theme}, #0c4a6e)` }}>
            <div className="flex items-end gap-8 px-12 pt-12 pb-6 text-white"><div className={`w-24 h-24 overflow-hidden border-4 border-white/20 shadow-lg mb-[-2rem] ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div><div className="pb-2"><h1 className="text-3xl font-black uppercase tracking-tight break-words">{fullName}</h1><p className="text-[10px] opacity-70 tracking-widest mt-1">{email} | {phone1}</p></div></div>
          </div>
          <div className="flex-1 p-10 pt-12 grid grid-cols-12 gap-8 overflow-visible">
            <div className="col-span-8 flex flex-col">{summary && <p className="text-[10.5px] text-zinc-600 italic mb-6">{summary}</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
            <div className="col-span-4 space-y-6 shrink-0 self-stretch"><section><SectionTitle title="Details" color={theme} /><PersonalInfoList cvData={cvData} /></section>{skillsList.length > 0 && <section><SectionTitle title="Skills" color={theme} /><div className="flex flex-wrap gap-1.5">{skillsList.map((s, i) => <span key={i} className="px-2.5 py-1 rounded text-[8px] font-bold uppercase text-white" style={{ backgroundColor: theme }}>{s}</span>)}</div></section>}{langList.length > 0 && <section><SectionTitle title="Languages" color={theme} /><p className="text-[10px] font-bold text-zinc-500">{langList.join(' • ')}</p></section>}</div>
          </div>
        </div>
      );

      case 28: return (
        <div className="flex min-h-[297mm] h-full w-full overflow-visible">
          <div className="w-[28%] shrink-0 flex flex-col gap-6 p-8 text-white" style={{ backgroundColor: theme }}>
            <div className={`w-28 h-28 overflow-hidden mx-auto border-4 border-white/20 shadow-lg ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div>
            <div className="text-center"><h1 className="text-xl font-black uppercase break-words">{fullName}</h1><p className="text-[8px] mt-1 opacity-70 uppercase tracking-wider">{email}</p></div>
            <section><h3 className="text-[9px] font-black uppercase tracking-widest mb-3 border-b border-white/20 pb-2">Contact</h3><div className="text-[9px] space-y-2 opacity-80"><p className="flex items-center gap-2"><Phone size={11}/> {phone1}</p><p className="flex items-center gap-2 break-all"><Mail size={11}/> {email}</p></div></section>
            <section><h3 className="text-[9px] font-black uppercase tracking-widest mb-3 border-b border-white/20 pb-2">Info</h3><PersonalInfoList cvData={cvData} isDark={true} /></section>
            {langList.length > 0 && <section><h3 className="text-[9px] font-black uppercase tracking-widest mb-3 border-b border-white/20 pb-2">Languages</h3><p className="text-[9px] font-bold opacity-70">{langList.join(' • ')}</p></section>}
          </div>
          <div className="flex-1 p-8 flex flex-col overflow-visible"><h1 className="text-3xl font-black uppercase tracking-tighter mb-4 break-words" style={{ color: theme }}>{fullName}</h1>{summary && <p className="text-[10px] text-zinc-500 italic mb-6 leading-relaxed">{summary}</p>}<ContentBody cvData={cvData} theme={theme} /><DateSignature show={!!showDS} /></div>
        </div>
      );

      case 29: return (
        <div className="flex min-h-[297mm] h-full w-full overflow-visible" style={{ fontFamily: 'Inter, sans-serif' }}>
          <div className="w-[30%] shrink-0 flex flex-col p-8 text-white gap-7" style={{ background: `linear-gradient(180deg, #111827, ${theme})` }}>
            <div className={`w-28 h-28 overflow-hidden mx-auto border-4 border-white/20 shadow-2xl ${pShape}`}><ProfileImg src={profileImg} shape={photoShape} /></div>
            <div className="text-center border-b border-white/10 pb-5"><h1 className="text-xl font-black uppercase break-words tracking-tight">{fullName}</h1><p className="text-[9px] mt-1.5 opacity-60 uppercase tracking-widest">{email}</p></div>
            <section><h3 className="text-[9px] font-black uppercase tracking-widest mb-3 flex items-center gap-2"><span className="w-1 h-4 rounded-full" style={{ backgroundColor: theme }}></span>Contact</h3><div className="text-[9.5px] space-y-2.5 opacity-80"><p className="flex items-center gap-2.5"><Phone size={12}/> <span>{phone1}</span></p><p className="flex items-center gap-2.5 break-all"><Mail size={12}/> <span>{email}</span></p><p className="flex items-start gap-2.5"><MapPin size={12} className="mt-0.5 shrink-0"/> <span className="whitespace-pre-wrap">{address}</span></p></div></section>
            <section><h3 className="text-[9px] font-black uppercase tracking-widest mb-3 flex items-center gap-2"><span className="w-1 h-4 rounded-full" style={{ backgroundColor: theme }}></span>Personal Info</h3><PersonalInfoList cvData={cvData} isDark={true} /></section>
            {skillsList.length > 0 && <section><h3 className="text-[9px] font-black uppercase tracking-widest mb-3 flex items-center gap-2"><span className="w-1 h-4 rounded-full" style={{ backgroundColor: theme }}></span>Skills</h3><div className="space-y-2">{skillsList.map((s, i) => <div key={i} className="flex items-center gap-2"><div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-1.5 rounded-full" style={{ width: `${70 + (i * 5) % 30}%`, backgroundColor: theme }}></div></div><span className="text-[7px] font-bold uppercase opacity-60 w-12 text-right">{s}</span></div>)}</div></section>}
            {langList.length > 0 && <section><h3 className="text-[9px] font-black uppercase tracking-widest mb-3 flex items-center gap-2"><span className="w-1 h-4 rounded-full" style={{ backgroundColor: theme }}></span>Languages</h3><div className="space-y-1.5">{langList.map((l, i) => <p key={i} className="text-[9.5px] font-bold opacity-70">• {l}</p>)}</div></section>}
          </div>
          <div className="flex-1 p-8 flex flex-col overflow-visible bg-zinc-50">
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6"><h1 className="text-3xl font-black tracking-tight break-words" style={{ color: theme }}>{fullName}</h1><div className="flex items-center gap-3 mt-1 text-[9px] font-bold text-zinc-400 uppercase tracking-widest"><span className="flex items-center gap-1"><Phone size={11}/>{phone1}</span><span className="w-px h-3 bg-zinc-200"></span><span className="flex items-center gap-1"><Mail size={11}/>{email}</span></div></div>
            {summary && <div className="bg-white rounded-2xl p-6 shadow-sm mb-6"><p className="text-[10px] text-zinc-600 italic leading-relaxed">"{summary}"</p></div>}
            <ContentBody cvData={cvData} theme={theme} />
            <DateSignature show={!!showDS} />
          </div>
        </div>
      );

      default: return null;
    }
  };

  return <MultiPageView>{renderCurrentTemplate()}</MultiPageView>;
}