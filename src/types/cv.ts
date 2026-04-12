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

export interface Education {
  oLevel: EducationLevel;
  aLevel: EducationLevel;
}

export interface CVData {
  personalInfo: PersonalInfo;
  contact: ContactDetails;
  skills: string[];
  languages: string[];
  workExperience: WorkExperienceEntry[];
  education: Education;
  professionalQualifications: string[];
  references: [Reference, Reference];
  selectedTemplate: number;
}

export interface TemplateTheme {
  id: number;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  bgColor: string;
  sidebarBg: string;
  sidebarText: string;
  fontFamily: string;
  headingFont: string;
}

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
  contact: {
    phone1: '',
    phone2: '',
    email: '',
    address: ''
  },
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

export const templateThemes: TemplateTheme[] = [
  {
    id: 1,
    name: 'Modern Professional',
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    accentColor: '#3b82f6',
    textColor: '#1f2937',
    bgColor: '#ffffff',
    sidebarBg: '#f8fafc',
    sidebarText: '#1f2937',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'Inter, sans-serif'
  },
  {
    id: 2,
    name: 'Royal Blue',
    primaryColor: '#1e3a8a',
    secondaryColor: '#1e40af',
    accentColor: '#60a5fa',
    textColor: '#111827',
    bgColor: '#ffffff',
    sidebarBg: '#eff6ff',
    sidebarText: '#1e3a8a',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'Inter, sans-serif'
  }
];
