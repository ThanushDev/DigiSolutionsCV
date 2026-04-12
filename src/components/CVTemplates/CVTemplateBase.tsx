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
      className="cv-template bg-white shadow-lg overflow-hidden"
      style={{
        width: `${210 * scale}mm`,
        minHeight: `${297 * scale}mm`,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        ...mainStyle
      }}>
      
      <div
        className="flex h-full"
        style={{
          minHeight: `${297 * scale}mm`
        }}>
        
        {/* Sidebar */}
        <div className="w-[35%] p-6 flex flex-col" style={sidebarStyle}>
          {/* Photo */}
          <div className="flex justify-center mb-6">
            <div
              className={`w-32 h-32 bg-gray-300 overflow-hidden border-4 ${cvData.personalInfo.photoFormat === 'circular' ? 'rounded-full' : 'rounded-lg'}`}
              style={{
                borderColor: theme.accentColor
              }}>
              
              {cvData.personalInfo.photo ?
              <img
                src={cvData.personalInfo.photo}
                alt={cvData.personalInfo.name}
                className="w-full h-full object-cover" /> :


              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                  Photo
                </div>
              }
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-6">
            <h3
              className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b"
              style={{
                borderColor: theme.accentColor
              }}>
              
              Contact
            </h3>
            <div className="space-y-3 text-sm">
              {(cvData.contact.phone1 || cvData.contact.phone2) &&
              <div className="flex items-start gap-3">
                  <PhoneIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    {cvData.contact.phone1}
                    {cvData.contact.phone2 && ` / ${cvData.contact.phone2}`}
                  </span>
                </div>
              }
              {cvData.contact.email &&
              <div className="flex items-start gap-3">
                  <MailIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="break-all">{cvData.contact.email}</span>
                </div>
              }
              {cvData.contact.address &&
              <div className="flex items-start gap-3">
                  <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{cvData.contact.address}</span>
                </div>
              }
            </div>
          </div>

          {/* Personal Details */}
          <div className="mb-6">
            <h3
              className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b"
              style={{
                borderColor: theme.accentColor
              }}>
              
              Personal Details
            </h3>
            <div className="space-y-2 text-sm">
              {cvData.personalInfo.fullName &&
              <div className="flex">
                  <span className="font-medium w-24">Full Name</span>
                  <span>:{cvData.personalInfo.fullName}</span>
                </div>
              }
              {cvData.personalInfo.dateOfBirth &&
              <div className="flex">
                  <span className="font-medium w-24">Date Of Birth</span>
                  <span>:{formatDate(cvData.personalInfo.dateOfBirth)}</span>
                </div>
              }
              {cvData.personalInfo.nicNumber &&
              <div className="flex">
                  <span className="font-medium w-24">NIC Number</span>
                  <span>:{cvData.personalInfo.nicNumber}</span>
                </div>
              }
              {cvData.personalInfo.gender &&
              <div className="flex">
                  <span className="font-medium w-24">Gender</span>
                  <span>:{cvData.personalInfo.gender}</span>
                </div>
              }
              {cvData.personalInfo.nationality &&
              <div className="flex">
                  <span className="font-medium w-24">Nationality</span>
                  <span>:{cvData.personalInfo.nationality}</span>
                </div>
              }
              {cvData.personalInfo.religion &&
              <div className="flex">
                  <span className="font-medium w-24">Religion</span>
                  <span>:{cvData.personalInfo.religion}</span>
                </div>
              }
              {cvData.personalInfo.civilStatus &&
              <div className="flex">
                  <span className="font-medium w-24">Civil Status</span>
                  <span>:{cvData.personalInfo.civilStatus}</span>
                </div>
              }
            </div>
          </div>

          {/* Skills */}
          {cvData.skills.length > 0 &&
          <div className="mb-6">
              <h3
              className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b"
              style={{
                borderColor: theme.accentColor
              }}>
              
                Skills
              </h3>
              <ul className="space-y-2 text-sm">
                {cvData.skills.map((skill, index) =>
              <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{skill}</span>
                  </li>
              )}
              </ul>
            </div>
          }

          {/* Languages */}
          {cvData.languages.length > 0 &&
          <div>
              <h3
              className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b"
              style={{
                borderColor: theme.accentColor
              }}>
              
                Language
              </h3>
              <ul className="space-y-2 text-sm">
                {cvData.languages.map((language, index) =>
              <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{language}</span>
                  </li>
              )}
              </ul>
            </div>
          }
        </div>

        {/* Main Content */}
        <div className="w-[65%] p-6">
          {/* Header */}
          <div
            className="mb-6 pb-4 border-b-2"
            style={{
              borderColor: theme.primaryColor
            }}>
            
            <h1
              className="text-3xl font-bold uppercase tracking-wide mb-3"
              style={headingStyle}>
              
              {cvData.personalInfo.name || 'YOUR NAME'}
            </h1>
            {cvData.personalInfo.description &&
            <p
              className="text-sm leading-relaxed text-gray-600"
              style={{
                color: theme.textColor
              }}>
              
                {cvData.personalInfo.description}
              </p>
            }
          </div>

          {/* Professional Qualifications */}
          {cvData.professionalQualifications.length > 0 &&
          <div className="mb-6">
              <h2
              className="text-lg font-bold uppercase tracking-wider mb-4"
              style={headingStyle}>
              
                Professional Qualifications
              </h2>
              <ul className="space-y-2 text-sm">
                {cvData.professionalQualifications.map((qual, index) =>
              <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{qual}</span>
                  </li>
              )}
              </ul>
            </div>
          }

          {/* Education */}
          {(cvData.education.oLevel.subjects.length > 0 ||
          cvData.education.aLevel.subjects.length > 0) &&
          <div className="mb-6">
              <h2
              className="text-lg font-bold uppercase tracking-wider mb-4"
              style={headingStyle}>
              
                Education Qualifications
              </h2>
              <div className="space-y-4">
                {/* A/L */}
                {cvData.education.aLevel.subjects.length > 0 &&
              <div>
                    <h3 className="font-semibold text-sm mb-2">
                      • Passed G.C.E. Advanced Level Examination -
                      {cvData.education.aLevel.year}
                    </h3>
                    {cvData.education.aLevel.indexNumber &&
                <p className="text-sm ml-4 mb-2">
                        Index Number - {cvData.education.aLevel.indexNumber}
                      </p>
                }
                    <div className="ml-8 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      {cvData.education.aLevel.subjects.map(
                    (subject, index) =>
                    <div key={index} className="flex justify-between">
                            <span>{subject.name}</span>
                            <span>:{subject.grade}</span>
                          </div>

                  )}
                    </div>
                  </div>
              }

                {/* O/L */}
                {cvData.education.oLevel.subjects.length > 0 &&
              <div>
                    <h3 className="font-semibold text-sm mb-2">
                      • Passed G.C.E. Ordinary Level Examination -
                      {cvData.education.oLevel.year}
                    </h3>
                    {cvData.education.oLevel.indexNumber &&
                <p className="text-sm ml-4 mb-2">
                        Index Number - {cvData.education.oLevel.indexNumber}
                      </p>
                }
                    <div className="ml-8 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      {cvData.education.oLevel.subjects.map(
                    (subject, index) =>
                    <div key={index} className="flex justify-between">
                            <span>{subject.name}</span>
                            <span>:{subject.grade}</span>
                          </div>

                  )}
                    </div>
                  </div>
              }
              </div>
            </div>
          }

          {/* Work Experience */}
          {cvData.workExperience.length > 0 &&
          <div className="mb-6">
              <h2
              className="text-lg font-bold uppercase tracking-wider mb-4"
              style={headingStyle}>
              
                Work Experience
              </h2>
              <div className="space-y-4">
                {cvData.workExperience.map((exp) =>
              <div key={exp.id}>
                    <h3 className="font-semibold text-sm">
                      Work as {exp.title} {exp.duration && `(${exp.duration})`}{' '}
                      in {exp.company}
                    </h3>
                    {exp.description &&
                <p
                  className="text-sm text-gray-600 mt-1 ml-4"
                  style={{
                    color: theme.textColor
                  }}>
                  
                        {exp.description}
                      </p>
                }
                  </div>
              )}
              </div>
            </div>
          }

          {/* References */}
          {(cvData.references[0].name || cvData.references[1].name) &&
          <div>
              <h2
              className="text-lg font-bold uppercase tracking-wider mb-4"
              style={headingStyle}>
              
                References
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {cvData.references.map((ref, index) =>
              ref.name ?
              <div key={index} className="text-sm">
                      <h3 className="font-semibold">{ref.name}</h3>
                      {ref.designation &&
                <p className="text-gray-600">{ref.designation}</p>
                }
                      {ref.organization &&
                <p className="text-gray-600">{ref.organization}</p>
                }
                      {ref.phone &&
                <p className="mt-1">
                          <span style={accentStyle}>Phone:</span> {ref.phone}
                        </p>
                }
                    </div> :
              null
              )}
              </div>
            </div>
          }
        </div>
      </div>
    </div>);

}