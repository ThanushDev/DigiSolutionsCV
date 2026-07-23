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
  addSubject: (level: 'oLevel' | 'aLevel') => void;
  updateSubject: (level: 'oLevel' | 'aLevel', index: number, data: any) => void;
  removeSubject: (level: 'oLevel' | 'aLevel', index: number) => void;
  updateProfessionalQualification: (index: number, newText: string) => void;
  removeProfessionalQualification: (index: number) => void;
  addProfessionalQualification: (q: string) => void;
  updateReference: (index: 0 | 1, data: any) => void;
  setSelectedTemplate: (id: number) => void;
  updateThemeColor: (color: string) => void;
  setBrightness: (value: number) => void;
  setShowDS: (val: boolean) => void;
  setPhotoShape: (shape: 'round' | 'square') => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<CVData['projects'][0]>) => void;
  removeProject: (id: string) => void;
  addAchievement: () => void;
  updateAchievement: (id: string, data: Partial<CVData['achievements'][0]>) => void;
  removeAchievement: (id: string) => void;
  addExtracurricular: () => void;
  updateExtracurricular: (id: string, data: Partial<CVData['extracurriculars'][0]>) => void;
  removeExtracurricular: (id: string) => void;
  resetCV: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  setSectionPageBreak: (sectionId: string, value: boolean) => void;
  adjustSectionSpacing: (sectionId: string, dimension: 'marginTop' | 'marginBottom' | 'paddingTop' | 'paddingBottom', delta: number) => void;
  resetSectionSpacing: (sectionId: string) => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [cvData, setCVData] = useState<CVData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultCVData;
  });
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
  }, [cvData]);

  const resetCV = () => { setCVData(defaultCVData); localStorage.removeItem(STORAGE_KEY); };
  const updatePersonalInfo = (data: any) => setCVData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, ...data } }));
  const updateContact = (data: any) => setCVData(prev => ({ ...prev, contact: { ...prev.contact, ...data } }));
  const addSkill = (skill: string) => setCVData(prev => ({ ...prev, skills: [...prev.skills, { id: Date.now().toString(), name: skill }] }));
  const removeSkill = (index: number) => setCVData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
  const addLanguage = (l: string) => setCVData(p => ({ ...p, languages: [...p.languages, { id: Date.now().toString(), name: l }] }));
  const removeLanguage = (i: number) => setCVData(p => ({ ...p, languages: p.languages.filter((_, idx) => idx !== i) }));
  const addWorkExperience = () => setCVData(prev => ({ ...prev, workExperience: [...(prev.workExperience || []), { id: Date.now().toString(), title: '', company: '', duration: '', description: '', startYear: '', endYear: '' }] }));
  const updateWorkExperience = (id: string, data: any) => setCVData(prev => ({ ...prev, workExperience: (prev.workExperience || []).map(exp => exp.id === id ? { ...exp, ...data } : exp) }));
  const removeWorkExperience = (id: string) => setCVData(prev => ({ ...prev, workExperience: (prev.workExperience || []).filter(exp => exp.id !== id) }));
  const updateEducation = (level: 'oLevel' | 'aLevel', data: any) => setCVData(prev => ({ ...prev, education: { ...prev.education, [level]: { ...prev.education[level], ...data } } }));
  const addSubject = (level: 'oLevel' | 'aLevel') => setCVData(prev => ({ ...prev, education: { ...prev.education, [level]: { ...prev.education[level], subjects: [...prev.education[level].subjects, { name: '', grade: '' }] } } }));
  const updateSubject = (level: 'oLevel' | 'aLevel', index: number, data: any) => setCVData(prev => {
    const newSubjects = [...prev.education[level].subjects];
    newSubjects[index] = { ...newSubjects[index], ...data };
    return { ...prev, education: { ...prev.education, [level]: { ...prev.education[level], subjects: newSubjects } } };
  });
  const removeSubject = (level: 'oLevel' | 'aLevel', index: number) => setCVData(prev => ({ ...prev, education: { ...prev.education, [level]: { ...prev.education[level], subjects: prev.education[level].subjects.filter((_, i) => i !== index) } } }));
  const addProfessionalQualification = (q: string) => setCVData(prev => ({ ...prev, professionalQualifications: [...prev.professionalQualifications, { id: Date.now().toString(), qualification: q }] }));
  const updateProfessionalQualification = (index: number, newText: string) => setCVData(prev => {
    const updated = [...prev.professionalQualifications];
    updated[index] = { ...updated[index], qualification: newText };
    return { ...prev, professionalQualifications: updated };
  });
  const removeProfessionalQualification = (index: number) => setCVData(prev => ({ ...prev, professionalQualifications: prev.professionalQualifications.filter((_, i) => i !== index) }));
  const updateReference = (index: 0 | 1, data: any) => setCVData(prev => {
    const newRefs = [...prev.references];
    newRefs[index] = { ...newRefs[index], ...data };
    return { ...prev, references: newRefs as any };
  });
  const setSelectedTemplate = (id: number) => setCVData(prev => ({ ...prev, selectedTemplate: id }));
  const updateThemeColor = (color: string) => setCVData(prev => ({ ...prev, customColor: color }));
  const setBrightness = (value: number) => setCVData(prev => ({ ...prev, brightness: value }));
  const setShowDS = (val: boolean) => setCVData(prev => ({ ...prev, showDS: val }));
  const setPhotoShape = (shape: 'round' | 'square') => setCVData(prev => ({ ...prev, photoShape: shape }));
  const addProject = () => setCVData(prev => ({ ...prev, projects: [...(prev.projects || []), { id: Date.now().toString(), title: '', description: '', technologies: '', link: '' }] }));
  const updateProject = (id: string, data: any) => setCVData(prev => ({ ...prev, projects: (prev.projects || []).map(p => p.id === id ? { ...p, ...data } : p) }));
  const removeProject = (id: string) => setCVData(prev => ({ ...prev, projects: (prev.projects || []).filter(p => p.id !== id) }));
  const addAchievement = () => setCVData(prev => ({ ...prev, achievements: [...(prev.achievements || []), { id: Date.now().toString(), title: '', description: '', date: '' }] }));
  const updateAchievement = (id: string, data: any) => setCVData(prev => ({ ...prev, achievements: (prev.achievements || []).map(a => a.id === id ? { ...a, ...data } : a) }));
  const removeAchievement = (id: string) => setCVData(prev => ({ ...prev, achievements: (prev.achievements || []).filter(a => a.id !== id) }));
  const addExtracurricular = () => setCVData(prev => ({ ...prev, extracurriculars: [...(prev.extracurriculars || []), { id: Date.now().toString(), title: '', description: '', role: '' }] }));
  const updateExtracurricular = (id: string, data: any) => setCVData(prev => ({ ...prev, extracurriculars: (prev.extracurriculars || []).map(e => e.id === id ? { ...e, ...data } : e) }));
  const removeExtracurricular = (id: string) => setCVData(prev => ({ ...prev, extracurriculars: (prev.extracurriculars || []).filter(e => e.id !== id) }));

  const setSectionPageBreak = (sectionId: string, value: boolean) =>
    setCVData(prev => ({ ...prev, sectionPageBreaks: { ...prev.sectionPageBreaks, [sectionId]: value } }));

  const adjustSectionSpacing = (sectionId: string, dimension: 'marginTop' | 'marginBottom' | 'paddingTop' | 'paddingBottom', delta: number) =>
    setCVData(prev => {
      const current = prev.sectionSpacing?.[sectionId] || { marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 };
      const newVal = Math.max(0, (current[dimension] || 0) + delta);
      return { ...prev, sectionSpacing: { ...prev.sectionSpacing, [sectionId]: { ...current, [dimension]: newVal } } };
    });

  const resetSectionSpacing = (sectionId: string) =>
    setCVData(prev => ({ ...prev, sectionSpacing: { ...prev.sectionSpacing, [sectionId]: { marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 } } }));

  return (
    <CVContext.Provider value={{ 
      cvData, updatePersonalInfo, updateContact, addSkill, removeSkill, addLanguage, removeLanguage,
      addWorkExperience, updateWorkExperience, removeWorkExperience,
      updateEducation, addSubject, updateSubject, removeSubject,
      updateProfessionalQualification, removeProfessionalQualification,
      addProfessionalQualification, updateReference, 
      setSelectedTemplate, updateThemeColor, setBrightness, setShowDS, setPhotoShape,
      addProject, updateProject, removeProject,
      addAchievement, updateAchievement, removeAchievement,
      addExtracurricular, updateExtracurricular, removeExtracurricular,
      setSectionPageBreak, adjustSectionSpacing, resetSectionSpacing,
      resetCV, currentStep, setCurrentStep
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
