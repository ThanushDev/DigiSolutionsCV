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

export function CVBuilder({ onPreview }: { onPreview: () => void }) {
  const { currentStep, setCurrentStep } = useCV();

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <div className="space-y-8"><PhotoUpload /><PersonalInfo /></div>;
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

  const steps = [
    { n: 1, label: 'Bio' }, { n: 2, label: 'Contact' }, { n: 3, label: 'Skills' },
    { n: 4, label: 'Languages' }, { n: 5, label: 'Work' }, { n: 6, label: 'Study' },
    { n: 7, label: 'Awards' }, { n: 8, label: 'Refs' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-4 mb-8">
        <img src="logo.png" alt="Logo" className="h-10" onError={(e) => e.currentTarget.style.display='none'} />
        <h1 className="text-xl font-black uppercase italic tracking-tighter">DigiSolutions CV</h1>
      </div>

      <div className="flex justify-between mb-8 overflow-x-auto pb-2 gap-4">
        {steps.map((s) => (
          <button key={s.n} onClick={() => setCurrentStep(s.n)} className={`flex-1 min-w-[80px] pb-2 border-b-4 transition-all text-[10px] font-black uppercase ${currentStep === s.n ? 'border-blue-600 text-blue-600' : 'border-gray-100 text-gray-400'}`}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 p-6 md:p-12 border border-gray-50">
        {renderStep()}
        <div className="mt-12 flex justify-between items-center border-t pt-8">
          <button disabled={currentStep === 1} onClick={() => setCurrentStep(currentStep - 1)} className="text-gray-400 font-bold uppercase text-xs disabled:opacity-0">← Back</button>
          <button onClick={() => currentStep === 8 ? onPreview() : setCurrentStep(currentStep + 1)} className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs shadow-lg">
            {currentStep === 8 ? 'Finish & Preview' : 'Next Step →'}
          </button>
        </div>
      </div>
    </div>
  );
}
