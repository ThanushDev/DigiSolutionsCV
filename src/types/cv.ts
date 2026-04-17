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
  { id: 1, name: 'Modern Sidebar Dark', primaryColor: '#2c3e50' },
  { id: 2, name: 'Executive Ribbon Blue', primaryColor: '#1e3a8a' },
  { id: 3, name: 'Professional Timeline Gray', primaryColor: '#4b5563' },
  { id: 4, name: 'Minimalist Emerald Border', primaryColor: '#059669' },
  { id: 5, name: 'Nina Lane Yellow Accent', primaryColor: '#ca8a04' },
  { id: 6, name: 'Brian Baxter Tech Ribbon', primaryColor: '#7c2d12' },
  { id: 7, name: 'Golden Badge Premium', primaryColor: '#854d0e' },
  { id: 8, name: 'Classic Structured White', primaryColor: '#000000' }
];

export const defaultCVData: CVData = {
  personalInfo: {
    name: '', description: '', photo: '', photoFormat: 'circular',
    fullName: '', dateOfBirth: '', nicNumber: '', gender: '',
    nationality: '', religion: '', civilStatus: ''
  },
  contact: { phone1: '', phone2: '', email: '', address: '' },
  skills: [], languages: [], workExperience: [],
  education: {
    oLevel: { indexNumber: '', year: '', subjects: [] },
    aLevel: { indexNumber: '', year: '', subjects: [] }
  },
  professionalQualifications: [],
  references: [
    { name: '', designation: '', organization: '', phone: '' },
    { name: '', designation: '', organization: '', phone: '' }
  ],
  selectedTemplate: 1,
  customColor: '#2c3e50',
  brightness: 100
};
