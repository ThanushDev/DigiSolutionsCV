import React from 'react';
import { CVTemplateBase } from './CVTemplateBase';
import { templateThemes } from '../../types/cv';
import { CVData } from '../../types/cv'; // CVData Type එක import කරගන්න

interface TemplateRendererProps {
  cvData: CVData; // මෙතනට එන්නේ useCV() එකෙන් එන කෙලින්ම cvData එක
  scale?: number;
}

export function TemplateRenderer({ cvData, scale = 1 }: TemplateRendererProps) {
  // වැදගත්: Admin පැනල් එකේ වැඩ කරද්දී Decode කරන JSON එකේ keys (n, e, p) වෙනස් නම් 
  // builder එක ඇතුලේදී ඒක කෙලින්ම cvData විදිහට pass වෙන නිසා මෙතන mapping එකක් අවශ්‍ය නැහැ.
  
  // දැනට තියෙන selectedTemplate එකට අදාළ theme එක ගන්නවා
  const theme = templateThemes.find((t) => t.id === cvData.selectedTemplate) || templateThemes[0];

  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
      <CVTemplateBase cvData={cvData} theme={theme} />
    </div>
  );
}
