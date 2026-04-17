import React, { useEffect } from 'react';
import { CVTemplateBase } from './CVTemplateBase';
import { templateThemes } from '../../types/cv';
import { useCV } from '../../context/CVContext';

export function TemplateRenderer({ cvData, scale = 1 }: { cvData: any; scale?: number }) {
  const { updateThemeColor } = useCV();

  // Template එක මාරු වෙද්දී පාට Auto-Select කරනවා
  useEffect(() => {
    const theme = templateThemes.find(t => t.id === Number(cvData.selectedTemplate));
    if (theme && !cvData.customColor) {
      updateThemeColor(theme.primaryColor);
    }
  }, [cvData.selectedTemplate]);

  if (!cvData) return null;

  return (
    <div className="relative w-full h-full flex justify-center items-start">
      <CVTemplateBase cvData={cvData} scale={scale} />
    </div>
  );
}
