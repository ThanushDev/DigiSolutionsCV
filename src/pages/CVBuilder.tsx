import React, { useState } from 'react';
import { useCV } from '../context/CVContext';
import { PhotoUpload } from '../components/FormSections/PhotoUpload';
import { PersonalInfo } from '../components/FormSections/PersonalInfo';
import { ContactDetails } from '../components/FormSections/ContactDetails';
import { Skills } from '../components/FormSections/Skills';
import { Languages } from '../components/FormSections/Languages';
import { WorkExperience } from '../components/FormSections/WorkExperience';
import { Education } from '../components/FormSections/Education';
import { ProfessionalQualifications } from '../components/FormSections/ProfessionalQualifications';
import { References } from '../components/FormSections/References';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import {
  UserIcon,
  PhoneIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  AwardIcon,
  UsersIcon,
  CameraIcon,
  LanguagesIcon,
  WrenchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  EyeOffIcon } from
'lucide-react';
interface CVBuilderProps {
  onBack: () => void;
  onNext: () => void;
}
const sections = [
{
  id: 'photo',
  label: 'Photo',
  icon: CameraIcon
},
{
  id: 'personal',
  label: 'Personal',
  icon: UserIcon
},
{
  id: 'contact',
  label: 'Contact',
  icon: PhoneIcon
},
{
  id: 'skills',
  label: 'Skills',
  icon: WrenchIcon
},
{
  id: 'languages',
  label: 'Languages',
  icon: LanguagesIcon
},
{
  id: 'qualifications',
  label: 'Qualifications',
  icon: AwardIcon
},
{
  id: 'education',
  label: 'Education',
  icon: GraduationCapIcon
},
{
  id: 'experience',
  label: 'Experience',
  icon: BriefcaseIcon
},
{
  id: 'references',
  label: 'References',
  icon: UsersIcon
}];

export function CVBuilder({ onBack, onNext }: CVBuilderProps) {
  const { cvData } = useCV();
  const [activeSection, setActiveSection] = useState('photo');
  const [showPreview, setShowPreview] = useState(false);
  const renderSection = () => {
    switch (activeSection) {
      case 'photo':
        return <PhotoUpload />;
      case 'personal':
        return <PersonalInfo />;
      case 'contact':
        return <ContactDetails />;
      case 'skills':
        return <Skills />;
      case 'languages':
        return <Languages />;
      case 'experience':
        return <WorkExperience />;
      case 'education':
        return <Education />;
      case 'qualifications':
        return <ProfessionalQualifications />;
      case 'references':
        return <References />;
      default:
        return null;
    }
  };
  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < sections.length - 1;
  const handlePrevSection = () => {
    if (canGoBack) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };
  const handleNextSection = () => {
    if (canGoForward) {
      setActiveSection(sections[currentIndex + 1].id);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pb-20 sm:pb-16">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-[1800px] mx-auto px-3 py-2 sm:px-6 lg:px-8 sm:py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4">
              <img
                src={${import.meta.env.BASE_URL}logo.png}
                alt="FCBS Digi Kuppiya"
                className="h-10 sm:h-14 w-auto" />
              
              <button
                onClick={onBack}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors text-sm">
                
                <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Back</span>
              </button>
            </div>
            <h1 className="text-base sm:text-xl font-bold text-gray-900 hidden md:block">
              CV Builder
            </h1>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg transition-colors text-sm">
                
                {showPreview ?
                <EyeOffIcon className="w-4 h-4" /> :

                <EyeIcon className="w-4 h-4" />
                }
                <span className="hidden sm:inline">
                  {showPreview ? 'Hide' : 'Preview'}
                </span>
              </button>
              <button
                onClick={onNext}
                className="px-3 sm:px-6 py-1.5 sm:py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors text-sm">
                
                <span className="hidden sm:inline">Preview & Export →</span>
                <span className="sm:hidden">Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Form Panel */}
        <div
          className={`flex-1 ${showPreview ? 'lg:max-w-2xl' : ''} bg-white border-r border-gray-200`}>
          
          {/* Section Tabs - Horizontal scroll on mobile */}
          <div className="border-b border-gray-200 bg-gray-50 overflow-x-auto">
            <div className="flex px-2 sm:px-4 py-2 gap-1 min-w-max">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-200'}`}>
                    
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{section.label}</span>
                  </button>);

              })}
            </div>
          </div>

          {/* Form Content */}
          <div
            className="p-4 sm:p-6 overflow-y-auto"
            style={{
              maxHeight: 'calc(100vh - 280px)'
            }}>
            
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {sections.find((s) => s.id === activeSection)?.label}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Fill in the details below. Changes are saved automatically.
              </p>
            </div>

            {renderSection()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <button
                onClick={handlePrevSection}
                disabled={!canGoBack}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm">
                
                <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                Previous
              </button>
              <button
                onClick={handleNextSection}
                disabled={!canGoForward}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm">
                
                Next
                <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Preview Panel - Hidden on mobile unless toggled */}
        {showPreview &&
        <div className="flex-1 bg-gray-200 p-4 sm:p-6 overflow-auto">
            <div className="flex justify-center">
              <div className="transform scale-[0.4] sm:scale-[0.5] lg:scale-[0.6] origin-top">
                <TemplateRenderer cvData={cvData} scale={1} />
              </div>
            </div>
          </div>
        }
      </div>

      {/* Sponsor Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-2 sm:py-3 z-30">
        <div className="flex items-center justify-center gap-4 px-4">
          <div className="text-xs sm:text-sm text-center">
            <span className="font-medium">Sponsored by FCBS Digi Kuppiya</span>
            <span className="mx-2 sm:mx-3 text-gray-500">•</span>
            <span className="text-gray-300">Made by Mr. Thanush</span>
          </div>
        </div>
      </div>
    </div>);

}
