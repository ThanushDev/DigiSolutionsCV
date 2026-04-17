export interface Subject {
  name: string;
  grade: string;
}

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

export interface PersonalInfo {
  name: string;
  description: string;
  photo: string;
  photoFormat: 'circular' | 'square';
  fullName: string;
  dateOfBirth: string;
  nicNumber: string;
  gender: string;
  nationality: string;
  religion: string;
  civilStatus: string;
}

export interface ContactDetails {
  phone1: string;
  phone2: string;
  email: string;
  address: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  contact: ContactDetails;
  skills: string[];
  languages: string[];
  workExperience: WorkExperienceEntry[];
  education: {
    oLevel: EducationLevel;
    aLevel: EducationLevel;
  };
  professionalQualifications: string[];
  references: [Reference, Reference];
  selectedTemplate: number;
  customColor?: string;
  brightness?: number;
}

export const templateThemes = [
  { id: 1, name: 'Modern Sidebar', primaryColor: '#2c3e50' },
  { id: 2, name: 'Professional Ribbon', primaryColor: '#1e3a8a' },
  { id: 3, name: 'Steven Terry Style', primaryColor: '#2c3e50' },
  { id: 4, name: 'Robert William Executive', primaryColor: '#1e3a8a' },
  { id: 5, name: 'Nina Lane Yellow Accent', primaryColor: '#ca8a04' },
  { id: 6, name: 'Accountant Structure', primaryColor: '#000000' },
  { id: 7, name: 'Premium Golden Badge', primaryColor: '#854d0e' },
  { id: 8, name: 'Classic Grey Minimal', primaryColor: '#4b5563' }
];
