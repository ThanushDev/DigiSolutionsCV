export interface Subject { name: string; grade: string; }

export interface EducationLevel {
  indexNumber: string;
  year: string;
  subjects: Subject[];
}

export interface WorkExperienceEntry {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Reference {
  name: string;
  designation: string;
  organization: string;
  phone: string;
}

export interface CVData {
  personalInfo: {
    name: string;
    fullName: string;
    description: string;
    photo: string;
    photoFormat: 'circular' | 'square';
    dateOfBirth: string;
    nicNumber: string;
    gender: string;
    nationality: string;
    religion: string;
    civilStatus: string;
  };
  contact: { phone1: string; phone2: string; email: string; address: string; };
  skills: string[];
  languages: string[];
  workExperience: WorkExperienceEntry[];
  education: { oLevel: EducationLevel; aLevel: EducationLevel; };
  professionalQualifications: string[];
  references: [Reference, Reference];
  selectedTemplate: number;
  customColor: string;
  brightness: number;
}

export const templateThemes = [
  { id: 1, name: 'Thanush Dark Sidebar' },
  { id: 2, name: 'Steven Terry Header' },
  { id: 3, name: 'Yellow Ribbon Modern' },
  { id: 4, name: 'Professional Table Grid' },
  { id: 5, name: 'Executive Minimal' },
  { id: 6, name: 'Corporate Blue' },
  { id: 7, name: 'Classic Accountant' },
  { id: 8, name: 'Premium Gold' }
];

export const defaultCVData: CVData = {
  personalInfo: { name: '', fullName: '', description: '', photo: '', photoFormat: 'circular', dateOfBirth: '', nicNumber: '', gender: '', nationality: '', religion: '', civilStatus: '' },
  contact: { phone1: '', phone2: '', email: '', address: '' },
  skills: [], languages: [], workExperience: [],
  education: { oLevel: { indexNumber: '', year: '', subjects: [] }, aLevel: { indexNumber: '', year: '', subjects: [] } },
  professionalQualifications: [],
  references: [{ name: '', designation: '', organization: '', phone: '' }, { name: '', designation: '', organization: '', phone: '' }],
  selectedTemplate: 1, customColor: '#1e3a8a', brightness: 100
};
