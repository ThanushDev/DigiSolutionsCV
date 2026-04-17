import React, { createContext, useContext, useState, useEffect } from 'react';
import { CVData, defaultCVData } from '../types/cv';

const STORAGE_KEY = 'cv_builder_data_v1';

interface CVContextType {
  cvData: CVData;
  updatePersonalInfo: (data: Partial<CVData['personalInfo']>) => void;
  updateContact: (data: Partial<CVData['contact']>) => void;
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
  addLanguage: (language: string) => void;
  removeLanguage: (index: number) => void;
  addWorkExperience: () => void;
  updateWorkExperience: (id: string, data: Partial<CVData['workExperience'][0]>) => void;
  removeWorkExperience: (id: string) => void;
  updateEducation: (level: 'oLevel' | 'aLevel', data: any) => void;
  updateProfessionalQualification: (index: number, newText: string) => void;
  removeProfessionalQualification: (index: number) => void;
  addProfessionalQualification: (q: string) => void;
  updateReference: (index: 0 | 1, data: any) => void;
  
  // මේ ටික මම අලුතෙන් ඇඩ් කළා උඹේ Color & Template වැඩේට
  setSelectedTemplate: (id: string) => void; // ID එක string එකක් කළා
  updateThemeColor: (color: string) => void; // පාට වෙනස් කරන්න
  setBrightness: (value: number) => void; // Brightness වෙනස් කරන්න
  
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [cvData, setCVData] = useState<CVData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    // මෙතනදී default values තියෙනවාද කියලා බලනවා
    return saved ? JSON.parse(saved) : defaultCVData;
  });
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
  }, [cvData]);

  // --- Helpers ---
  const updatePersonalInfo = (data: any) => setCVData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, ...data } }));
  const updateContact = (data: any) => setCVData(prev => ({ ...prev, contact: { ...prev.contact, ...data } }));
  const addSkill = (skill: string) => setCVData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
  const removeSkill = (index: number) => setCVData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  
  const addWorkExperience = () => setCVData(prev => ({
    ...prev,
    workExperience: [...prev.workExperience, { id: Date.now().toString(), title: '', company: '', duration: '', description: '' }]
  }));
  
  const updateWorkExperience = (id: string, data: any) => setCVData(prev => ({
    ...prev,
    workExperience: prev.workExperience.map(exp => exp.id === id ? { ...exp, ...data } : exp)
  }));

  const removeWorkExperience = (id: string) => setCVData(prev => ({
    ...prev,
    workExperience: prev.workExperience.filter(exp => exp.id !== id)
  }));

  const updateEducation = (level: 'oLevel' | 'aLevel', data: any) => setCVData(prev => ({
    ...prev,
    education: { ...prev.education, [level]: { ...prev.education[level], ...data } }
  }));

  const addProfessionalQualification = (q: string) => setCVData(prev => ({ ...prev, professionalQualifications: [...prev.professionalQualifications, q] }));
  const updateProfessionalQualification = (index: number, newText: string) => setCVData(prev => {
    const updated = [...prev.professionalQualifications];
    updated[index] = newText;
    return { ...prev, professionalQualifications: updated };
  });
  const removeProfessionalQualification = (index: number) => setCVData(prev => ({ ...prev, professionalQualifications: prev.professionalQualifications.filter((_, i) => i !== index) }));

  const updateReference = (index: 0 | 1, data: any) => setCVData(prev => {
    const newRefs = [...prev.references];
    newRefs[index] = { ...newRefs[index], ...data };
    return { ...prev, references: newRefs as any };
  });

  // --- මම හදපු අලුත් Functions ටික ---

  // Template එක මාරු කරන කොට ID එක හරියට Update කරනවා
  const setSelectedTemplate = (id: string) => {
    setCVData(prev => ({ ...prev, selectedTemplate: id }));
  };

  // User තෝරන පාට CV එකට දානවා
  const updateThemeColor = (color: string) => {
    setCVData(prev => ({
      ...prev,
      customColor: color // මේක පාවිච්චි කරලා අපිට Template එක පාට කරන්න පුළුවන්
    }));
  };

  // Seekbar එකෙන් එන brightness එක
  const setBrightness = (value: number) => {
    setCVData(prev => ({
      ...prev,
      brightness: value
    }));
  };

  return (
    <CVContext.Provider value={{ 
      cvData, updatePersonalInfo, updateContact, addSkill, removeSkill, 
      addWorkExperience, updateWorkExperience, removeWorkExperience,
      updateEducation, updateProfessionalQualification, removeProfessionalQualification,
      addProfessionalQualification, updateReference, 
      setSelectedTemplate, updateThemeColor, setBrightness, // අලුත් ඒවා මෙතනට දැම්මා
      currentStep, setCurrentStep,
      addLanguage: (l) => setCVData(p => ({ ...p, languages: [...p.languages, l] })),
      removeLanguage: (i) => setCVData(p => ({ ...p, languages: p.languages.filter((_, idx) => idx !== i) }))
    }}>
      {children}
    </CVContext.Provider>
  );
}

export const useCV = () => {
  const context = useContext(CVContext);
  if (!context) throw new Error('useCV must be used within a CVProvider');
  return context;
};
