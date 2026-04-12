import React from 'react';
import { useCV } from '../context/CVContext';
import { PersonalInfo } from '../components/FormSections/PersonalInfo';
import { ContactDetails } from '../components/FormSections/ContactDetails';
import { Skills } from '../components/FormSections/Skills';
import { WorkExperience } from '../components/FormSections/WorkExperience';
import { Education } from '../components/FormSections/Education';
import { ProfessionalQualifications } from '../components/FormSections/ProfessionalQualifications';
import { References } from '../components/FormSections/References';
import { Languages } from '../components/FormSections/Languages';
import { PhotoUpload } from '../components/FormSections/PhotoUpload';

interface CVBuilderProps {
  onPreview: () => void;
}

export function CVBuilder({ onPreview }: CVBuilderProps) {
  const { currentStep, setCurrentStep } = useCV();

  const renderStep = () => {
    switch (currentStep) {
      case 1: return (
        <div className="space-y-8">
          <PhotoUpload />
          <PersonalInfo />
        </div>
      );
      case 2: return <ContactDetails />;
      case 3: return <Skills />;
      case 4: return <Languages />;
      case 5: return <WorkExperience />;
      case 6: return <Education />;
      case 7: return <ProfessionalQualifications />;
      case 8: return <References />;
      default: return <PersonalInfo />;
    }
  };

  const steps = ['Personal', 'Contact', 'Skills', 'Languages', 'Experience', 'Education', 'Qualifications', 'References'];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between mb-8 overflow-x-auto pb-4 gap-4">
        {steps.map((step, idx) => (
          <div key={idx} className={`text-center min-w-[80px] ${idx + 1 === currentStep ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center mb-1 ${idx + 1 === currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              {idx + 1}
            </div>
            <span className="text-[10px] uppercase">{step}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100">
        {renderStep()}
        <div className="mt-10 flex justify-between pt-6 border-t">
          <button 
            disabled={currentStep === 1} 
            onClick={() => setCurrentStep(currentStep - 1)}
            className="px-6 py-2 text-gray-500 disabled:opacity-30"
          >
            Back
          </button>
          <button 
            onClick={() => currentStep === 8 ? onPreview() : setCurrentStep(currentStep + 1)}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold"
          >
            {currentStep === 8 ? 'Preview CV' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
}
