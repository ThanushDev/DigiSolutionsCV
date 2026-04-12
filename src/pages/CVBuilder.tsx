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

  const handleNext = () => {
    if (currentStep === 8) {
      onPreview();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const steps = [
    'Personal', 'Contact', 'Skills', 'Languages', 
    'Experience', 'Education', 'Qualifications', 'References'
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-12 overflow-x-auto pb-4">
        <div className="flex justify-between min-w-[600px] px-2">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex flex-col items-center min-w-[80px] ${
                index + 1 === currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 font-bold ${
                index + 1 === currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        {renderStep()}
        
        <div className="mt-12 flex justify-between items-center pt-8 border-t border-gray-100">
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
            className="px-8 py-3 text-gray-500 font-bold hover:text-black disabled:opacity-30 transition-all uppercase tracking-widest text-sm"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all uppercase tracking-widest text-sm"
          >
            {currentStep === 8 ? 'PREVIEW CV' : 'NEXT STEP'}
          </button>
        </div>
      </div>
    </div>
  );
}
