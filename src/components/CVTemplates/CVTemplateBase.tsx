import React from 'react';
import { CVData, Theme } from '../../types/cv';

interface CVTemplateBaseProps {
  cvData: CVData;
  theme: Theme;
  scale?: number;
}

export function CVTemplateBase({ cvData, theme, scale = 1 }: CVTemplateBaseProps) {
  // 1. User තෝරන පාට ගමු, නැත්නම් ටෙම්ප්ලේට් එකේ default පාට ගමු
  const primaryColor = cvData.customColor || theme.primaryColor;
  
  // 2. Brightness එක ගමු (Default 100)
  const brightness = cvData.brightness || 100;

  return (
    <div 
      className="bg-white mx-auto shadow-2xl overflow-hidden"
      style={{ 
        width: '210mm', 
        minHeight: '297mm',
        // මෙන්න මෙතනින් තමයි මුළු CV එකේම පාටවල් පාලනය කරන්නේ
        // @ts-ignore
        '--primary-color': primaryColor,
        filter: `brightness(${brightness}%)`,
        transform: `scale(${scale})`,
        transformOrigin: 'top center'
      }}
    >
      {/* දැන් මේ ඇතුළේ තියෙන හැම Template එකකම Background color එකට 
         backgroundColor: 'var(--primary-color)' කියන එක පාවිච්චි කරන්න ඕනේ.
      */}
      
      {/* උදාහරණයක් විදිහට ටෙම්ප්ලේට් එකේ Sidebar එක */}
      <div className="flex min-h-[297mm]">
        {/* Sidebar */}
        <div 
          className="w-1/3 text-white p-8 transition-colors duration-300"
          style={{ backgroundColor: primaryColor }} // මෙන්න මෙතනට පාට වැටෙනවා
        >
          {/* Sidebar Content */}
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-8">
           <h1 className="text-3xl font-bold" style={{ color: primaryColor }}>
             {cvData.personalInfo.name}
           </h1>
           {/* අනෙක් විස්තර... */}
        </div>
      </div>
    </div>
  );
}
