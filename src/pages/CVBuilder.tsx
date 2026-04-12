import React from 'react';
import { useCV } from '../context/CVContext';
import { PersonalInfoStep } from '../components/Steps/PersonalInfoStep';
import { ContactStep } from '../components/Steps/ContactStep';
import { SkillsStep } from '../components/Steps/SkillsStep';
import { WorkExperienceStep } from '../components/Steps/WorkExperienceStep';
import { EducationStep } from '../components/Steps/EducationStep';
import { QualificationsStep } from '../components/Steps/QualificationsStep';
import { ReferencesStep } from '../components/Steps/ReferencesStep';
import { LanguagesStep } from '../components/Steps/LanguagesStep';

interface CVBuilderProps {
  onPreview: () => void;
}

export function CVBuilder({ onPreview }: CVBuilderProps) {
  const { currentStep, setCurrentStep } = useCV();

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <PersonalInfoStep />;
      case 2: return <ContactStep />;
      case 3: return <SkillsStep />;
      case 4: return <LanguagesStep />;
      case 5: return <WorkExperienceStep />;
      case 6: return <EducationStep />;
      case 7: return <QualificationsStep />;
      case 8: return <ReferencesStep />;
      default: return <PersonalInfoStep />;
    }
  };

  const handleNext = () => {
    if (currentStep === 8) {
      onPreview(); // මෙන්න මෙතනින් තමයි Preview එකට යන්නේ
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
      <div className="mb-8">
        <div className="flex justify-between mb-4 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex flex-col items-center min-w-[80px] ${
                index + 1 === currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 font-bold ${
                index + 1 === currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">{step}</span>
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
            {currentStep === 8 ? 'Preview CV' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
}
