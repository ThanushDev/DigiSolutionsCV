import React from 'react';
import { CVData, TemplateTheme } from '../../types/cv';
import { PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react';

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

  const accentStyle = {
    color: theme.accentColor
  };

  return (
    <div
      className="cv-template bg-white shadow-lg overflow-hidden mx-auto"
      style={{
        width: scale < 1 ? '100%' : `${210 * scale}mm`, // මොබයිල් එකේදී width එක fill වෙන්න
        maxWidth: `${210 * scale}mm`,
        minHeight: scale < 1 ? 'auto' : `${297 * scale}mm`,
        transform: scale < 1 ? 'none' : `scale(${scale})`, // Scale 1 ට අඩු නම් transform එක අයින් කරලා classes වලින් control කරනවා
        transformOrigin: 'top center',
        ...mainStyle
      }}>
      
      {/* Container - Mobile: Column, Desktop: Row */}
      <div
        className={`flex flex-col md:flex-row h-full w-full`}
        style={{
          minHeight: scale < 1 ? 'auto' : `${297 * scale}mm`
        }}>
        
        {/* Sidebar - Mobile: 100%, Desktop: 35% */}
        <div className="w-full md:w-[35%] p-6 flex flex-col" style={sidebarStyle}>
          {/* Photo */}
          <div className="flex justify-center mb-6">
            <div
              className={`w-28 h-28 md:w-32 md:h-32 bg-gray-300 overflow-hidden border-4 ${cvData.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-lg'}`}
              style={{ borderColor: theme.accentColor }}>
              
              {cvData.personalInfo.photo ?
                <img src={cvData.personalInfo.photo} alt={cvData.personalInfo.name} className="w-full h-full object-cover" /> :
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs text-center">Photo</div>
              }
            </div>
          </div>

          {/* Contact & Personal - Mobile එකේදී පැති දෙකට පේන්න grid එකක් දාන්න පුළුවන් */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
            {/* Contact Section */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: theme.accentColor }}>Contact</h3>
              <div className="space-y-2 text-[13px]">
                {(cvData.contact.phone1 || cvData.contact.phone2) && (
                  <div className="flex items-start gap-2">
                    <PhoneIcon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>{cvData.contact.phone1}{cvData.contact.phone2 && ` / ${cvData.contact.phone2}`}</span>
                  </div>
                )}
                {cvData.contact.email && (
                  <div className="flex items-start gap-2">
                    <MailIcon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span className="break-all">{cvData.contact.email}</span>
                  </div>
                )}
                {cvData.contact.address && (
                  <div className="flex items-start gap-2">
                    <MapPinIcon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>{cvData.contact.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Personal Details */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: theme.accentColor }}>Details</h3>
              <div className="space-y-1 text-[12px]">
                {cvData.personalInfo.fullName && <div className="flex justify-between md:block"><span className="font-medium opacity-70">Name:</span> <span className="text-right md:text-left">{cvData.personalInfo.fullName}</span></div>}
                {cvData.personalInfo.dateOfBirth && <div className="flex justify-between md:block"><span className="font-medium opacity-70">DOB:</span> <span className="text-right md:text-left">{formatDate(cvData.personalInfo.dateOfBirth)}</span></div>}
                {cvData.personalInfo.nicNumber && <div className="flex justify-between md:block"><span className="font-medium opacity-70">NIC:</span> <span className="text-right md:text-left">{cvData.personalInfo.nicNumber}</span></div>}
              </div>
            </div>
          </div>

          {/* Skills & Languages - Mobile එකේදී පැති දෙකට */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {cvData.skills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: theme.accentColor }}>Skills</h3>
                <ul className="space-y-1 text-[12px]">
                  {cvData.skills.map((skill, index) => (
                    <li key={index} className="flex items-start leading-tight"><span className="mr-1">•</span>{skill}</li>
                  ))}
                </ul>
              </div>
            )}
            {cvData.languages.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: theme.accentColor }}>Languages</h3>
                <ul className="space-y-1 text-[12px]">
                  {cvData.languages.map((language, index) => (
                    <li key={index} className="flex items-start leading-tight"><span className="mr-1">•</span>{language}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Main Content - Mobile: 100%, Desktop: 65% */}
        <div className="w-full md:w-[65%] p-6 md:p-10 bg-white">
          {/* Header */}
          <div className="mb-6 pb-4 border-b-2" style={{ borderColor: theme.primaryColor }}>
            <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-2 text-center md:text-left" style={headingStyle}>
              {cvData.personalInfo.name || 'YOUR NAME'}
            </h1>
            {cvData.personalInfo.description && (
              <p className="text-[13px] leading-relaxed text-gray-600 text-center md:text-left" style={{ color: theme.textColor }}>
                {cvData.personalInfo.description}
              </p>
            )}
          </div>

          {/* Professional Qualifications */}
          {cvData.professionalQualifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-md md:text-lg font-bold uppercase tracking-wider mb-3" style={headingStyle}>Professional</h2>
              <ul className="space-y-1.5 text-[13px]">
                {cvData.professionalQualifications.map((qual, index) => (
                  <li key={index} className="flex items-start"><span className="mr-2 text-blue-500">•</span>{qual}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-md md:text-lg font-bold uppercase tracking-wider mb-3" style={headingStyle}>Education</h2>
            <div className="space-y-4">
              {/* Simplified display for mobile compatibility */}
              {[cvData.education.aLevel, cvData.education.oLevel].map((level, i) => (
                level.subjects.length > 0 && (
                  <div key={i} className="text-[13px]">
                    <h3 className="font-bold mb-1">• {i === 0 ? 'A/L' : 'O/L'} Exam - {level.year}</h3>
                    <div className="ml-4 grid grid-cols-2 gap-x-4 gap-y-1 border-l-2 pl-3 border-gray-100">
                      {level.subjects.map((sub, idx) => (
                        <div key={idx} className="flex justify-between"><span>{sub.name}</span><span className="font-bold">{sub.grade}</span></div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Work Experience */}
          {cvData.workExperience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-md md:text-lg font-bold uppercase tracking-wider mb-3" style={headingStyle}>Experience</h2>
              <div className="space-y-4">
                {cvData.workExperience.map((exp) => (
                  <div key={exp.id} className="text-[13px]">
                    <h3 className="font-bold">{exp.title} | {exp.company}</h3>
                    {exp.duration && <p className="text-xs text-gray-400 italic mb-1">{exp.duration}</p>}
                    <p className="text-gray-600 leading-snug">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* References */}
          {(cvData.references[0].name || cvData.references[1].name) && (
            <div>
              <h2 className="text-md md:text-lg font-bold uppercase tracking-wider mb-3" style={headingStyle}>References</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cvData.references.map((ref, index) => ref.name && (
                  <div key={index} className="text-[12px] p-2 bg-gray-50 rounded-lg">
                    <h3 className="font-bold uppercase">{ref.name}</h3>
                    <p className="text-gray-500">{ref.designation}</p>
                    <p className="text-blue-600 font-bold">{ref.phone}</p>
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
