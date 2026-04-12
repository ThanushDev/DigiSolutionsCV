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
        <div className="space-y-8 animate-in fade-in duration-500">
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

  const steps = [
    { name: 'Personal', icon: '👤' },
    { name: 'Contact', icon: '📞' },
    { name: 'Skills', icon: '⚡' },
    { name: 'Languages', icon: '🌐' },
    { name: 'Experience', icon: '💼' },
    { name: 'Education', icon: '🎓' },
    { name: 'Qualifications', icon: '📜' },
    { name: 'References', icon: '👥' }
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 md:py-10 px-4">
      
      {/* --- Step Indicators (Mobile Responsive & Clickable) --- */}
      <div className="flex justify-between mb-8 overflow-x-auto pb-4 gap-2 md:gap-4 no-scrollbar">
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <button
              key={idx}
              onClick={() => setCurrentStep(stepNum)} // ක්ලික් කළ විට ටැබ් එක මාරු වේ
              className={`flex flex-col items-center min-w-[75px] md:min-w-[90px] outline-none transition-all duration-300 ${
                isActive ? 'scale-105' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 font-bold text-sm md:text-base border-2 transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' 
                  : isCompleted 
                  ? 'bg-green-500 text-white border-green-500' 
                  : 'bg-white text-gray-400 border-gray-200'
              }`}>
                {isCompleted ? '✓' : stepNum}
              </div>
              <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-tighter ${
                isActive ? 'text-blue-600' : 'text-gray-400'
              }`}>
                {step.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* --- Form Section --- */}
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-100/50 p-5 md:p-10 border border-gray-100 transition-all">
        <div className="min-h-[300px]">
          {renderStep()}
        </div>

        {/* --- Footer Buttons --- */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-between pt-6 border-t border-gray-50">
          <button 
            disabled={currentStep === 1} 
            onClick={() => setCurrentStep(currentStep - 1)}
            className="order-2 md:order-1 px-6 py-3 text-gray-400 font-bold text-xs uppercase disabled:opacity-0 hover:text-gray-600 transition-all"
          >
            ← Back
          </button>
          
          <button 
            onClick={() => currentStep === 8 ? onPreview() : setCurrentStep(currentStep + 1)}
            className="order-1 md:order-2 px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all w-full md:w-auto"
          >
            {currentStep === 8 ? 'Finish & Preview' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  );
}
