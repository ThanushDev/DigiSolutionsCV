import React from 'react';
import { CVTemplateBase } from './CVTemplateBase';
import { templateThemes } from '../../types/cv';

interface TemplateRendererProps {
  cvData: any; // Admin එකෙන් එන Decode කරපු JSON එක (Short keys තියෙන එක)
  scale?: number;
}

export function TemplateRenderer({ cvData, scale = 1 }: TemplateRendererProps) {
  // 1. Admin එකෙන් එන කෙටි දත්ත (Short keys) ටික ඔයාගේ Components වලට ගැලපෙන විදිහට හරවනවා
  const mappedData = {
    selectedTemplate: cvData.t || 'template-1',
    personalInfo: {
      name: cvData.n || '',
      fullName: cvData.fn || cvData.n || '', // Full name එක fn ලෙස ඇත්නම් එය ගනී
      description: cvData.j || '',
      photo: cvData.img || '', // Photo එක තිබේ නම්
      photoFormat: cvData.pf || 'circular',
      dateOfBirth: cvData.dob || '',
      nicNumber: cvData.nic || '',
      gender: cvData.g || '',
      nationality: cvData.nat || '',
      religion: cvData.rel || '',
      civilStatus: cvData.cs || ''
    },
    contact: {
      phone1: cvData.p || '',
      phone2: cvData.p2 || '',
      email: cvData.e || '',
      address: cvData.a || ''
    },
    // Education.tsx එකට ගැලපෙන structure එක
    education: {
      oLevel: cvData.edol || { indexNumber: '', year: '', subjects: [] },
      aLevel: cvData.edal || { indexNumber: '', year: '', subjects: [] }
    },
    // Languages.tsx සහ Skills.tsx
    languages: cvData.l || [],
    skills: cvData.s || [],
    professionalQualifications: cvData.pq || [],
    // WorkExperience.tsx එකට ගැලපෙන structure එක
    workExperience: (cvData.ex || []).map((ex: any, i: number) => ({
      id: i.toString(),
      title: ex.title || ex.role || '',
      company: ex.company || '',
      duration: ex.duration || '',
      description: ex.description || ''
    })),
    // References.tsx එකට ගැලපෙන structure එක (Array with 2 objects)
    references: cvData.ref || [
      { name: '', designation: '', organization: '', phone: '' },
      { name: '', designation: '', organization: '', phone: '' }
    ]
  };

  // 2. Theme එක තෝරාගැනීම
  const theme = templateThemes.find((t) => t.id === mappedData.selectedTemplate) || templateThemes[0];

  // 3. ඔයාගේ Original CVTemplateBase එකට දත්ත යැවීම
  return <CVTemplateBase cvData={mappedData as any} theme={theme} scale={scale} />;
}
