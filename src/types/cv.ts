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

// උඹ එවපු Screenshot වල හැඩයට අනුව නම් කරපු Templates ටික
export const templateThemes = [
  { id: 1, name: 'Modern Timeline Sidebar', primaryColor: '#2c3e50' },
  { id: 2, name: 'Professional Ribbon Style', primaryColor: '#e67e22' },
  { id: 3, name: 'Executive Dark Blue', primaryColor: '#1e3a8a' },
  { id: 4, name: 'Corporate Gray Structure', primaryColor: '#4b5563' },
  { id: 5, name: 'Minimalist Emerald', primaryColor: '#059669' },
  { id: 6, name: 'Golden Premium', primaryColor: '#ca8a04' }
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
  selectedTemplate: 1,
  customColor: '#2c3e50',
  brightness: 100
};
