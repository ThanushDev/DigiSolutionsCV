import React from 'react';
import { CVTemplateBase } from './CVTemplateBase';
import { templateThemes } from '../../types/cv';

interface TemplateRendererProps {
  cvData: any;
  scale?: number;
}

export function TemplateRenderer({ cvData, scale = 1 }: TemplateRendererProps) {
  // 1. මේ ලයින් එකෙන් තමයි සයිඩ්බාර එකෙන් වෙනස් කරන ටෙම්ප්ලේට් එක මෙතනට අප්ඩේට් වෙන්නේ.
  const currentTheme = templateThemes.find(t => t.id === cvData.selectedTemplate) || templateThemes[0];

  if (!cvData) return null;

  return (
    <div className="relative w-full h-full flex justify-center items-start">
      {/* අර උඩින් භාගෙට පෙනුන කෑල්ල මම අයින් කළා. දැන් CV එක විතරයි පේන්නේ. */}
      
      <CVTemplateBase 
        cvData={cvData} 
        theme={currentTheme} 
        scale={scale} 
      />
    </div>
  );
}
