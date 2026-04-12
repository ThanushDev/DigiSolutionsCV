import React from 'react';
import { CVTemplateBase } from './CVTemplateBase';
import { templateThemes } from '../../types/cv';

interface TemplateRendererProps {
  cvData: any; // Admin එකෙන් එන decoded JSON එක
  scale?: number;
}

export function TemplateRenderer({ cvData, scale = 1 }: TemplateRendererProps) {
  // 1. Admin එකෙන් එන කෙටි අකුරු (n, e, p) ටික ඔයාගේ original CVData structure එකට හරවනවා
  const mappedData = {
    selectedTemplate: cvData.t || 'template-1',
    personalInfo: {
      name: cvData.n || '',
      fullName: cvData.n || '',
      description: cvData.j || '', // Job title එක description එකට දැම්මා
      photo: '', // දැනට හිස්ව තියමු
      photoFormat: 'circular',
      dateOfBirth: '',
      nicNumber: '',
      gender: '',
      nationality: '',
      religion: '',
      civilStatus: ''
    },
    contact: {
      phone1: cvData.p || '',
      phone2: cvData.p2 || '',
      email: cvData.e || '',
      address: cvData.a || ''
    },
    skills: cvData.s || [],
    languages: [],
    professionalQualifications: [],
    education: {
      oLevel: { year: '', indexNumber: '', subjects: [] },
      aLevel: { year: '', indexNumber: '', subjects: [] }
    },
    workExperience: (cvData.ex || []).map((ex: any, i: number) => ({
      id: i.toString(),
      title: ex.role || '',
      company: ex.company || '',
      duration: ex.duration || '',
      description: ex.description || ''
    })),
    references: [
      { name: '', designation: '', organization: '', phone: '' },
      { name: '', designation: '', organization: '', phone: '' }
    ]
  };

  // 2. Theme එක හොයාගන්නවා
  const theme = templateThemes.find((t) => t.id === mappedData.selectedTemplate) || templateThemes[0];

  // 3. ඔයාගේ Original Component එකටම දත්ත දෙනවා
  return <CVTemplateBase cvData={mappedData as any} theme={theme} scale={scale} />;
}
