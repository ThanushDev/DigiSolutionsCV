import React from 'react';
import { useCV } from '../context/CVContext';
// ... අනෙක් imports (Step components ආදිය)

interface CVBuilderProps {
  onPreview: () => void;
}

export function CVBuilder({ onPreview }: CVBuilderProps) {
  const { currentStep, setCurrentStep } = useCV();

  const handleNext = () => {
    if (currentStep === 8) { // අවසාන පියවර නම්
      onPreview(); // මෙන්න මේ function එක call වෙන්න ඕනේ
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* ... ඔයාගේ Form එකේ කොටස් ... */}
      
      <div className="mt-8 flex justify-between">
        <button 
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 1}
          className="px-6 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Back
        </button>
        <button 
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold"
        >
          {currentStep === 8 ? 'Preview CV' : 'Next Step'}
        </button>
      </div>
    </div>
  );
}
