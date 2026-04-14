import React from 'react';
import { CVData, TemplateTheme } from '../../types/cv';
import { PhoneIcon, MailIcon, MapPinIcon, Sparkles } from 'lucide-react';

interface CVTemplateBaseProps {
  cvData: CVData;
  theme: TemplateTheme;
  scale?: number;
}

export function CVTemplateBase({
  cvData,
  theme,
  scale = 1
}: CVTemplateBaseProps) {
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const sidebarStyle = {
    backgroundColor: theme.sidebarBg,
    color: theme.sidebarText
  };

  const mainStyle = {
    backgroundColor: theme.bgColor,
    color: theme.textColor,
    fontFamily: theme.fontFamily
  };

  const headingStyle = {
    color: theme.primaryColor,
    fontFamily: theme.headingFont
  };

  return (
    <div
      className="cv-template bg-white shadow-lg overflow-hidden mx-auto transition-all duration-500"
      style={{
        width: scale < 1 ? '100%' : `${210 * scale}mm`,
        maxWidth: `${210 * scale}mm`,
        minHeight: scale < 1 ? 'auto' : `${297 * scale}mm`,
        transform: scale < 1 ? 'none' : `scale(${scale})`,
        transformOrigin: 'top center',
        ...mainStyle
      }}>
      
      <div
        className={`flex flex-col md:flex-row h-full w-full`}
        style={{ minHeight: scale < 1 ? 'auto' : `${297 * scale}mm` }}>
        
        {/* Sidebar */}
        <div className="w-full md:w-[35%] p-6 flex flex-col" style={sidebarStyle}>
          {/* Photo with AI Ring */}
          <div className="flex justify-center mb-6">
            <div
              className={`w-28 h-28 md:w-32 md:h-32 bg-gray-300 overflow-hidden border-4 relative ${cvData.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-lg'}`}
              style={{ borderColor: theme.accentColor }}>
              
              {cvData.personalInfo.photo ?
                <img src={cvData.personalInfo.photo} alt={cvData.personalInfo.name} className="w-full h-full object-cover" /> :
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs text-center">Photo</div>
              }
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: theme.accentColor }}>Contact</h3>
              <div className="space-y-2 text-[13px]">
                {(cvData.contact.phone1 || cvData.contact.phone2) && (
                  <div className="flex items-start gap-2">
                    <PhoneIcon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 opacity-70" />
                    <span>{cvData.contact.phone1}{cvData.contact.phone2 && ` / ${cvData.contact.phone2}`}</span>
                  </div>
                )}
                {cvData.contact.email && (
                  <div className="flex items-start gap-2">
                    <MailIcon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 opacity-70" />
                    <span className="break-all">{cvData.contact.email}</span>
                  </div>
                )}
                {cvData.contact.address && (
                  <div className="flex items-start gap-2">
                    <MapPinIcon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 opacity-70" />
                    <span>{cvData.contact.address}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: theme.accentColor }}>Details</h3>
              <div className="space-y-1 text-[12px]">
                {cvData.personalInfo.fullName && <div className="flex justify-between md:block"><span className="font-medium opacity-60 text-[10px] uppercase">Name:</span> <p className="font-bold">{cvData.personalInfo.fullName}</p></div>}
                {cvData.personalInfo.dateOfBirth && <div className="flex justify-between md:block mt-1"><span className="font-medium opacity-60 text-[10px] uppercase">DOB:</span> <p className="font-bold">{formatDate(cvData.personalInfo.dateOfBirth)}</p></div>}
                {cvData.personalInfo.nicNumber && <div className="flex justify-between md:block mt-1"><span className="font-medium opacity-60 text-[10px] uppercase">NIC:</span> <p className="font-bold">{cvData.personalInfo.nicNumber}</p></div>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {cvData.skills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: theme.accentColor }}>Skills</h3>
                <ul className="space-y-1.5 text-[12px]">
                  {cvData.skills.map((skill, index) => (
                    <li key={index} className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-white/40"></div>{skill}</li>
                  ))}
                </ul>
              </div>
            )}
            {cvData.languages.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: theme.accentColor }}>Languages</h3>
                <ul className="space-y-1.5 text-[12px]">
                  {cvData.languages.map((language, index) => (
                    <li key={index} className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-white/40"></div>{language}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-[65%] p-6 md:p-10 bg-white">
          <header className="mb-8 relative">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2 text-center md:text-left leading-none" style={headingStyle}>
              {cvData.personalInfo.name || 'YOUR NAME'}
            </h1>
            <div className="h-1 w-12 bg-blue-600 mb-4 rounded-full opacity-20"></div>
            {cvData.personalInfo.description && (
              <p className="text-[13px] leading-relaxed text-gray-600 text-center md:text-left italic font-medium">
                "{cvData.personalInfo.description}"
              </p>
            )}
          </header>

          {/* Professional Qualifications */}
          {cvData.professionalQualifications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2" style={headingStyle}>
                <div className="w-2 h-2 bg-current rounded-full"></div> Professional
              </h2>
              <ul className="space-y-2 text-[13px]">
                {cvData.professionalQualifications.map((qual, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <span className="text-blue-500 font-bold">•</span>
                    <span className="leading-snug">{qual}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2" style={headingStyle}>
               <div className="w-2 h-2 bg-current rounded-full"></div> Education
            </h2>
            <div className="space-y-6">
              {[cvData.education.aLevel, cvData.education.oLevel].map((level, i) => (
                level.subjects.length > 0 && (
                  <div key={i} className="text-[13px] relative pl-4 border-l-2 border-gray-100">
                    <h3 className="font-bold text-gray-800 uppercase mb-2">{i === 0 ? 'Advanced' : 'Ordinary'} Level - {level.year}</h3>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                      {level.subjects.map((sub, idx) => (
                        <div key={idx} className="flex justify-between border-b border-gray-50 pb-0.5">
                          <span className="text-gray-600 font-medium">{sub.name}</span>
                          <span className="font-black text-blue-600">{sub.grade}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Work Experience */}
          {cvData.workExperience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2" style={headingStyle}>
                <div className="w-2 h-2 bg-current rounded-full"></div> Experience
              </h2>
              <div className="space-y-6">
                {cvData.workExperience.map((exp) => (
                  <div key={exp.id} className="text-[13px] relative pl-4 border-l-2 border-gray-100">
                    <h3 className="font-black text-gray-800 uppercase tracking-tight">{exp.title}</h3>
                    <p className="text-[11px] font-bold text-blue-600 uppercase mb-2">{exp.company} {exp.duration && <span className="text-gray-400 font-normal ml-2">| {exp.duration}</span>}</p>
                    <p className="text-gray-600 leading-relaxed text-[12px]">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {(cvData.references[0].name || cvData.references[1].name) && (
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2" style={headingStyle}>
                <div className="w-2 h-2 bg-current rounded-full"></div> References
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {cvData.references.map((ref, index) => ref.name && (
                  <div key={index} className="text-[12px] p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <h3 className="font-black uppercase text-gray-800 mb-0.5">{ref.name}</h3>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-tighter mb-1 leading-tight">{ref.designation}</p>
                    <p className="text-blue-600 font-black text-[11px]">{ref.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
