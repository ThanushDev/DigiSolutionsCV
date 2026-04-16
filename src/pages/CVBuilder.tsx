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
      case 1: return <div className="space-y-8 animate-in fade-in duration-500"><PhotoUpload /><PersonalInfo /></div>;
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Header with Logo */}
      <div className="flex items-center gap-4 mb-10">
        <img src="/logo.png" alt="Logo" className="h-12 w-auto object-contain" />
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic">Digi CV Builder</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">AI Powered Resume Creator</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100">
        {renderStep()}
        <div className="mt-10 flex justify-between pt-6 border-t">
          <button disabled={currentStep === 1} onClick={() => setCurrentStep(currentStep - 1)} className="px-6 py-3 font-bold text-xs uppercase disabled:opacity-0">Back</button>
          <button onClick={() => currentStep === 8 ? onPreview() : setCurrentStep(currentStep + 1)} className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase shadow-lg">
            {currentStep === 8 ? 'Preview CV' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
}
