import React from 'react';
import { useCV } from '../context/CVContext';
import { templateThemes, defaultCVData } from '../types/cv';
import { CVTemplateBase } from '../components/CVTemplates/CVTemplateBase';
import { CheckCircleIcon } from 'lucide-react';
interface TemplateSelectionProps {
  onNext: () => void;
}
const sampleData = {
  ...defaultCVData,
  personalInfo: {
    ...defaultCVData.personalInfo,
    name: 'JOHN SMITH',
    description:
    'Dedicated and results-oriented professional with strong analytical skills and a passion for delivering high-quality work.',
    fullName: 'John Michael Smith',
    dateOfBirth: '1998-05-15',
    nicNumber: '123456789V',
    gender: 'Male',
    nationality: 'Sri Lankan',
    religion: 'Buddhism',
    civilStatus: 'Unmarried'
  },
  contact: {
    phone1: '077 123 4567',
    phone2: '011 234 5678',
    email: 'john.smith@email.com',
    address: 'No. 10, Main Street, Colombo 07.'
  },
  skills: [
  'Project management and coordination',
  'Data analysis and reporting',
  'MS Office Suite (Advanced)'],

  languages: ['Sinhala', 'English'],
  workExperience: [
  {
    id: '1',
    title: 'Marketing Executive',
    company: 'ABC Company (Pvt) Ltd, Colombo',
    duration: 'Two years',
    description:
    'Managed marketing campaigns, coordinated with clients, and prepared detailed performance reports.'
  }],

  education: {
    oLevel: {
      indexNumber: '1234567',
      year: '2014',
      subjects: [
      {
        name: 'Mathematics',
        grade: 'A'
      },
      {
        name: 'Science',
        grade: 'A'
      },
      {
        name: 'English',
        grade: 'B'
      },
      {
        name: 'Sinhala',
        grade: 'A'
      }]

    },
    aLevel: {
      indexNumber: '7654321',
      year: '2017',
      subjects: [
      {
        name: 'Business Studies',
        grade: 'B'
      },
      {
        name: 'Accounting',
        grade: 'B'
      },
      {
        name: 'Economics',
        grade: 'C'
      }]

    }
  },
  professionalQualifications: [
  'Diploma in Business Management - National Institute of Business Management'],

  references: [
  {
    name: 'Mr. K. Perera',
    designation: 'Senior Manager',
    organization: 'XYZ Holdings (Pvt) Ltd',
    phone: '077 987 6543'
  },
  {
    name: 'Mrs. S. Fernando',
    designation: 'HR Director',
    organization: 'DEF Corporation',
    phone: '011 876 5432'
  }] as
  [
    (typeof defaultCVData.references)[0],
    (typeof defaultCVData.references)[1]]

};
export function TemplateSelection({ onNext }: TemplateSelectionProps) {
  const { cvData, setSelectedTemplate } = useCV();
  const handleSelectTemplate = (templateId: number) => {
    setSelectedTemplate(templateId);
  };
  return (
    <div className="min-h-screen bg-gray-100 pb-24 md:pb-16">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="FCBS Digi Kuppiya"
                className="h-12 sm:h-16 w-auto" />
              
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
                  Choose Your Template
                </h1>
                <p className="text-gray-600 text-sm hidden sm:block">
                  Select a professional template for your CV
                </p>
              </div>
            </div>
            <button
              onClick={onNext}
              className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors text-center">
              
              Continue to Builder →
            </button>
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <div className="max-w-7xl mx-auto px-3 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
          {templateThemes.map((theme) =>
          <div
            key={theme.id}
            onClick={() => handleSelectTemplate(theme.id)}
            className={`relative cursor-pointer rounded-lg sm:rounded-xl overflow-hidden transition-all duration-200 ${cvData.selectedTemplate === theme.id ? 'ring-2 sm:ring-4 ring-blue-500 shadow-xl scale-[1.02]' : 'hover:shadow-lg hover:scale-[1.01]'}`}>
            
              {/* Selected Badge */}
              {cvData.selectedTemplate === theme.id &&
            <div className="absolute top-2 right-2 z-10 bg-blue-500 text-white p-1 sm:p-1.5 rounded-full shadow-lg">
                  <CheckCircleIcon className="w-3 h-3 sm:w-5 sm:h-5" />
                </div>
            }

              {/* Template Preview */}
              <div
              className="bg-white p-1 sm:p-2 overflow-hidden"
              style={{
                height: '180px'
              }}>
              
                <div
                className="transform scale-[0.15] sm:scale-[0.2] origin-top-left"
                style={{
                  width: '666%',
                  height: '666%'
                }}>
                
                  <CVTemplateBase
                  cvData={{
                    ...sampleData,
                    selectedTemplate: theme.id
                  }}
                  theme={theme}
                  scale={1} />
                
                </div>
              </div>

              {/* Template Name */}
              <div
              className="px-2 sm:px-4 py-2 sm:py-3 text-center font-medium text-xs sm:text-sm"
              style={{
                backgroundColor: theme.primaryColor,
                color: theme.sidebarText
              }}>
              
                {theme.name}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sponsor Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-2 sm:py-3 z-30">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 px-4">
          <div className="text-xs sm:text-sm text-center">
            <span className="font-medium">Sponsored by FCBS Digi Kuppiya</span>
            <span className="mx-2 sm:mx-3 text-gray-500">•</span>
            <span className="text-gray-300">Made by Mr. Thanush</span>
          </div>
        </div>
      </div>
    </div>);

}