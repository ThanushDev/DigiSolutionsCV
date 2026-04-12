import React from 'react';
import { CVTemplateBase } from './CVTemplateBase';
import { CVData, templateThemes } from '../../types/cv';

interface TemplateRendererProps {
  cvData: CVData;
  scale?: number;
}

export function TemplateRenderer({ cvData, scale = 1 }: TemplateRendererProps) {
  const theme = templateThemes.find((t) => t.id === cvData.selectedTemplate) || templateThemes[0];

  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
      <CVTemplateBase cvData={cvData} theme={theme} />
    </div>
  );
}
