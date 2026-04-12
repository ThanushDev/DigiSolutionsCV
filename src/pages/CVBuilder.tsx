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

export function CVBuilder({ onPreview }: { onPreview: () => void }) {
  const { currentStep, setCurrentStep } = useCV();
  const steps = ['Personal', 'Contact', 'Skills', 'Languages', 'Experience', 'Education', 'Qualifications', 'References'];

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

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex justify-between mb-12 overflow-x-auto pb-4 gap-4">
        {steps.map((step, idx) => (
          <div key={idx} className={`flex flex-col items-center min-w-[80px] ${idx + 1 === currentStep ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 font-bold ${idx + 1 === currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>{idx+1}</div>
            <span className="text-[10px] font-bold uppercase">{step}</span>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-3xl shadow-xl p-8 border">
        {renderStep()}
        <div className="mt-12 flex justify-between items-center pt-8 border-t">
          <button onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep === 1} className="px-8 py-3 text-gray-500 font-bold disabled:opacity-30 uppercase text-sm">Back</button>
          <button onClick={() => currentStep === 8 ? onPreview() : setCurrentStep(currentStep + 1)} className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg">
            {currentStep === 8 ? 'PREVIEW CV' : 'NEXT STEP'}
          </button>
        </div>
      </div>
    </div>
  );
}
