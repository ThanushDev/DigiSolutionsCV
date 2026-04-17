import React from 'react';
import { CVTemplateBase } from './CVTemplateBase';
import { templateThemes } from '../../types/cv';

interface TemplateRendererProps {
  cvData: any;
  scale?: number;
}

export function TemplateRenderer({ cvData, scale = 1 }: TemplateRendererProps) {
  // මෙතන Number(t.id) සහ Number(cvData.selectedTemplate) පාවිච්චි කරමු
  const currentTheme = templateThemes.find(
    t => Number(t.id) === Number(cvData.selectedTemplate)
  ) || templateThemes[0];

  if (!cvData) return null;

  return (
    <div className="relative w-full h-full flex justify-center items-start">
      <CVTemplateBase 
        cvData={cvData} 
        theme={currentTheme} 
        scale={scale} 
      />
    </div>
  );
}
