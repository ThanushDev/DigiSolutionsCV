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
}

// මේ කොටස අනිවාර්යයෙන්ම තිබිය යුතුයි (Build error එක එන්නේ මේක නැති නිසා)
export const templateThemes = [
  { id: 1, name: 'Professional Sidebar (Default)' },
  { id: 2, name: 'Executive Blue' },
  { id: 3, name: 'Corporate Gray' },
  { id: 4, name: 'Modern Emerald' },
  { id: 5, name: 'Dark Professional' },
  { id: 6, name: 'Classic Serif' },
  { id: 7, name: 'Minimalist' },
  { id: 8, name: 'Crimson Tech' },
  { id: 9, name: 'Indigo Premium' },
  { id: 10, name: 'Golden Standard' }
];

export const defaultCVData: CVData = {
  personalInfo: {
    name: '',
    description: '',
    photo: '',
    photoFormat: 'circular',
    fullName: '',
    dateOfBirth: '',
    nicNumber: '',
    gender: '',
    nationality: '',
    religion: '',
    civilStatus: ''
  },
  contact: { phone1: '', phone2: '', email: '', address: '' },
  skills: [],
  languages: [],
  workExperience: [],
  education: {
    oLevel: { indexNumber: '', year: '', subjects: [] },
    aLevel: { indexNumber: '', year: '', subjects: [] }
  },
  professionalQualifications: [],
  references: [
    { name: '', designation: '', organization: '', phone: '' },
    { name: '', designation: '', organization: '', phone: '' }
  ],
  selectedTemplate: 1
};
