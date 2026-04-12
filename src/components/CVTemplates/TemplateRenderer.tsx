import React from 'react';
import { CVData, templateThemes } from '../../types/cv';
import { CVTemplateBase } from './CVTemplateBase';
interface TemplateRendererProps {
  cvData: CVData;
  scale?: number;
}
export function TemplateRenderer({ cvData, scale = 1 }: TemplateRendererProps) {
  const theme =
  templateThemes.find((t) => t.id === cvData.selectedTemplate) ||
  templateThemes[0];
  return <CVTemplateBase cvData={cvData} theme={theme} scale={scale} />;
}