import React, { createContext, useContext, useState, useEffect } from 'react';
import { CVData, defaultCVData, Reference } from '../types/cv';

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
  addSubject: (level: 'oLevel' | 'aLevel') => void;
  updateSubject: (level: 'oLevel' | 'aLevel', index: number, data: any) => void;
  removeSubject: (level: 'oLevel' | 'aLevel', index: number) => void;
  addProfessionalQualification: (q: string) => void;
  // අලුතින් ඇඩ් කළ එක මෙන්න:
  updateProfessionalQualification: (index: number, newText: string) => void;
  removeProfessionalQualification: (index: number) => void;
  updateReference: (index: 0 | 1, data: any) => void;
  setSelectedTemplate: (id: number) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [cvData, setCVData] = useState<CVData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultCVData;
  });
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData)); }, [cvData]);

  const updatePersonalInfo = (data: any) => setCVData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, ...data } }));
  const updateContact = (data: any) => setCVData(prev => ({ ...prev, contact: { ...prev.contact, ...data } }));
  const addSkill = (s: string) => setCVData(prev => ({ ...prev, skills: [...prev.skills, s] }));
  const removeSkill = (i: number) => setCVData(prev => ({ ...prev, skills: prev.skills.filter((_, idx) => idx !== i) }));
  const addLanguage = (l: string) => setCVData(prev => ({ ...prev, languages: [...prev.languages, l] }));
  const removeLanguage = (i: number) => setCVData(prev => ({ ...prev, languages: prev.languages.filter((_, idx) => idx !== i) }));
  const addWorkExperience = () => setCVData(prev => ({ ...prev, workExperience: [...prev.workExperience, { id: Math.random().toString(), title: '', company: '', duration: '', description: '' }] }));
  const updateWorkExperience = (id: string, data: any) => setCVData(prev => ({ ...prev, workExperience: prev.workExperience.map(ex => ex.id === id ? { ...ex, ...data } : ex) }));
  const removeWorkExperience = (id: string) => setCVData(prev => ({ ...prev, workExperience: prev.workExperience.filter(ex => ex.id !== id) }));
  const updateEducation = (level: any, data: any) => setCVData(prev => ({ ...prev, education: { ...prev.education, [level]: { ...prev.education[level as 'oLevel'], ...data } } }));
  const addSubject = (level: any) => setCVData(prev => ({ ...prev, education: { ...prev.education, [level]: { ...prev.education[level as 'oLevel'], subjects: [...prev.education[level as 'oLevel'].subjects, { name: '', grade: '' }] } } }));
  const updateSubject = (level: any, idx: number, data: any) => setCVData(prev => ({ ...prev, education: { ...prev.education, [level]: { ...prev.education[level as 'oLevel'], subjects: prev.education[level as 'oLevel'].subjects.map((s, i) => i === idx ? { ...s, ...data } : s) } } }));
  const removeSubject = (level: any, idx: number) => setCVData(prev => ({ ...prev, education: { ...prev.education, [level]: { ...prev.education[level as 'oLevel'], subjects: prev.education[level as 'oLevel'].subjects.filter((_, i) => i !== idx) } } }));
  
  // Professional Qualification update කරන ලොජික් එක:
  const addProfessionalQualification = (q: string) => setCVData(prev => ({ ...prev, professionalQualifications: [...prev.professionalQualifications, q] }));
  const updateProfessionalQualification = (index: number, newText: string) => setCVData(prev => {
    const updated = [...prev.professionalQualifications];
    updated[index] = newText;
    return { ...prev, professionalQualifications: updated };
  });
  const removeProfessionalQualification = (i: number) => setCVData(prev => ({ ...prev, professionalQualifications: prev.professionalQualifications.filter((_, idx) => idx !== i) }));
  
  const updateReference = (index: 0 | 1, data: any) => setCVData(prev => { const newRefs = [...prev.references]; newRefs[index] = { ...newRefs[index], ...data }; return { ...prev, references: newRefs as [Reference, Reference] }; });
  const setSelectedTemplate = (id: number) => setCVData(prev => ({ ...prev, selectedTemplate: id }));

  return (
    <CVContext.Provider value={{ 
      cvData, 
      updatePersonalInfo, 
      updateContact, 
      addSkill, 
      removeSkill, 
      addLanguage, 
      removeLanguage, 
      addWorkExperience, 
      updateWorkExperience, 
      removeWorkExperience, 
      updateEducation, 
      addSubject, 
      updateSubject, 
      removeSubject, 
      addProfessionalQualification, 
      updateProfessionalQualification, // මෙන්න මේක value එකට දැම්මා
      removeProfessionalQualification, 
      updateReference, 
      setSelectedTemplate, 
      currentStep, 
      setCurrentStep 
    }}>
      {children}
    </CVContext.Provider>
  );
}

export const useCV = () => { const context = useContext(CVContext); if (!context) throw new Error('useCV error'); return context; };
