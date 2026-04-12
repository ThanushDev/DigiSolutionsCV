import React, { useEffect, useState, createContext, useContext } from 'react';
import { CVData, defaultCVData } from '../types/cv';
interface CVContextType {
  cvData: CVData;
  updateCVData: (data: Partial<CVData>) => void;
  updatePersonalInfo: (data: Partial<CVData['personalInfo']>) => void;
  updateContact: (data: Partial<CVData['contact']>) => void;
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
  addLanguage: (language: string) => void;
  removeLanguage: (index: number) => void;
  addWorkExperience: () => void;
  updateWorkExperience: (
  id: string,
  data: Partial<CVData['workExperience'][0]>)
  => void;
  removeWorkExperience: (id: string) => void;
  updateEducation: (
  level: 'oLevel' | 'aLevel',
  data: Partial<CVData['education']['oLevel']>)
  => void;
  addSubject: (level: 'oLevel' | 'aLevel') => void;
  updateSubject: (
  level: 'oLevel' | 'aLevel',
  index: number,
  data: {
    name?: string;
    grade?: string;
  })
  => void;
  removeSubject: (level: 'oLevel' | 'aLevel', index: number) => void;
  addProfessionalQualification: (qualification: string) => void;
  removeProfessionalQualification: (index: number) => void;
  updateReference: (
  index: 0 | 1,
  data: Partial<CVData['references'][0]>)
  => void;
  setSelectedTemplate: (templateId: number) => void;
  resetCV: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}
const CVContext = createContext<CVContextType | undefined>(undefined);
const STORAGE_KEY = 'cv_builder_data';
export function CVProvider({ children }: {children: ReactNode;}) {
  const [cvData, setCVData] = useState<CVData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultCVData;
      }
    }
    return defaultCVData;
  });
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
  }, [cvData]);
  const updateCVData = (data: Partial<CVData>) => {
    setCVData((prev) => ({
      ...prev,
      ...data
    }));
  };
  const updatePersonalInfo = (data: Partial<CVData['personalInfo']>) => {
    setCVData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...data
      }
    }));
  };
  const updateContact = (data: Partial<CVData['contact']>) => {
    setCVData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        ...data
      }
    }));
  };
  const addSkill = (skill: string) => {
    if (skill.trim()) {
      setCVData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };
  const removeSkill = (index: number) => {
    setCVData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };
  const addLanguage = (language: string) => {
    if (language.trim()) {
      setCVData((prev) => ({
        ...prev,
        languages: [...prev.languages, language.trim()]
      }));
    }
  };
  const removeLanguage = (index: number) => {
    setCVData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };
  const addWorkExperience = () => {
    setCVData((prev) => ({
      ...prev,
      workExperience: [
      ...prev.workExperience,
      {
        id: Date.now().toString(),
        title: '',
        company: '',
        duration: '',
        description: ''
      }]

    }));
  };
  const updateWorkExperience = (
  id: string,
  data: Partial<CVData['workExperience'][0]>) =>
  {
    setCVData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((exp) =>
      exp.id === id ?
      {
        ...exp,
        ...data
      } :
      exp
      )
    }));
  };
  const removeWorkExperience = (id: string) => {
    setCVData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((exp) => exp.id !== id)
    }));
  };
  const updateEducation = (
  level: 'oLevel' | 'aLevel',
  data: Partial<CVData['education']['oLevel']>) =>
  {
    setCVData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [level]: {
          ...prev.education[level],
          ...data
        }
      }
    }));
  };
  const addSubject = (level: 'oLevel' | 'aLevel') => {
    setCVData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [level]: {
          ...prev.education[level],
          subjects: [
          ...prev.education[level].subjects,
          {
            name: '',
            grade: ''
          }]

        }
      }
    }));
  };
  const updateSubject = (
  level: 'oLevel' | 'aLevel',
  index: number,
  data: {
    name?: string;
    grade?: string;
  }) =>
  {
    setCVData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [level]: {
          ...prev.education[level],
          subjects: prev.education[level].subjects.map((sub, i) =>
          i === index ?
          {
            ...sub,
            ...data
          } :
          sub
          )
        }
      }
    }));
  };
  const removeSubject = (level: 'oLevel' | 'aLevel', index: number) => {
    setCVData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [level]: {
          ...prev.education[level],
          subjects: prev.education[level].subjects.filter(
            (_, i) => i !== index
          )
        }
      }
    }));
  };
  const addProfessionalQualification = (qualification: string) => {
    if (qualification.trim()) {
      setCVData((prev) => ({
        ...prev,
        professionalQualifications: [
        ...prev.professionalQualifications,
        qualification.trim()]

      }));
    }
  };
  const removeProfessionalQualification = (index: number) => {
    setCVData((prev) => ({
      ...prev,
      professionalQualifications: prev.professionalQualifications.filter(
        (_, i) => i !== index
      )
    }));
  };
  const updateReference = (
  index: 0 | 1,
  data: Partial<CVData['references'][0]>) =>
  {
    setCVData((prev) => {
      const newRefs = [...prev.references] as [
        (typeof prev.references)[0],
        (typeof prev.references)[1]];

      newRefs[index] = {
        ...newRefs[index],
        ...data
      };
      return {
        ...prev,
        references: newRefs
      };
    });
  };
  const setSelectedTemplate = (templateId: number) => {
    setCVData((prev) => ({
      ...prev,
      selectedTemplate: templateId
    }));
  };
  const resetCV = () => {
    setCVData(defaultCVData);
    localStorage.removeItem(STORAGE_KEY);
  };
  return (
    <CVContext.Provider
      value={{
        cvData,
        updateCVData,
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
        removeProfessionalQualification,
        updateReference,
        setSelectedTemplate,
        resetCV,
        currentStep,
        setCurrentStep
      }}>
      
      {children}
    </CVContext.Provider>);

}
export function useCV() {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
}