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
  startYear: string;
  endYear: string;
}

export interface Reference {
  name: string;
  designation: string;
  organization: string;
  phone: string;
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  technologies: string;
  link: string;
}

export interface AchievementEntry {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface ExtracurricularEntry {
  id: string;
  title: string;
  description: string;
  role: string;
}

export interface CVData {
  profileImage: string;
  personalInfo: {
    fullName: string;
    objective: string;
    dob: string;
    nic: string;
    gender: string;
    nationality: string;
    religion: string;
    civilStatus: string;
    photo?: string;
    name?: string;
    description?: string;
  };
  contact: {
    email: string;
    phone1: string;
    phone2: string;
    address: string;
  };
  skills: { id: string; name: string }[];
  languages: { id: string; name: string }[];
  workExperience: WorkExperienceEntry[];
  education: {
    oLevel: EducationLevel;
    aLevel: EducationLevel;
  };
  professionalQualifications: { id: string; qualification: string }[];
  references: Reference[];
  projects: ProjectEntry[];
  achievements: AchievementEntry[];
  extracurriculars: ExtracurricularEntry[];
  selectedTemplate: number;
  customColor: string;
  brightness: number;
  showDS: boolean;
  photoShape: 'round' | 'square';
  paymentSlip?: string;
  sectionPageBreaks: {
    professionalQualifications: boolean;
    education: boolean;
    workExperience: boolean;
    projects: boolean;
    achievements: boolean;
    extracurriculars: boolean;
    references: boolean;
  };
  sectionSpacing: Record<string, { marginTop: number; marginBottom: number; paddingTop: number; paddingBottom: number }>;
}

export const defaultCVData: CVData = {
  profileImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  personalInfo: {
    fullName: '', objective: '', dob: '', nic: '', gender: '', nationality: '', religion: '', civilStatus: ''
  },
  contact: {
    email: '', phone1: '', phone2: '', address: ''
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
  projects: [],
  achievements: [],
  extracurriculars: [],
  selectedTemplate: 1,
  customColor: '#1e3a8a',
  brightness: 100,
  showDS: false,
  photoShape: 'round',
  sectionPageBreaks: {
    professionalQualifications: false,
    education: false,
    workExperience: false,
    projects: false,
    achievements: false,
    extracurriculars: false,
    references: false
  },
  sectionSpacing: {},
};

export const templateThemes = [
  { id: 1, name: 'Professional Default', primaryColor: '#1e3a8a' },
  { id: 2, name: 'Modern Corporate', primaryColor: '#0369a1' },
  { id: 3, name: 'Yellow Ribbon Bold', primaryColor: '#eab308' },
  { id: 4, name: 'Executive Dark', primaryColor: '#111827' },
  { id: 5, name: 'Minimalist Gray', primaryColor: '#374151' },
  { id: 6, name: 'Premium Gold', primaryColor: '#854d0e' },
  { id: 7, name: 'Classic Blue', primaryColor: '#2563eb' },
  { id: 8, name: 'Elegant Professional', primaryColor: '#be185d' },
  { id: 9, name: 'Midnight Sapphire', primaryColor: '#1e1b4b' },
  { id: 10, name: 'Forest Green', primaryColor: '#166534' },
  { id: 11, name: 'Cherry Red', primaryColor: '#991b1b' },
  { id: 12, name: 'Royal Purple', primaryColor: '#581c87' },
  { id: 13, name: 'Ocean Teal', primaryColor: '#0f766e' },
  { id: 14, name: 'Sunset Orange', primaryColor: '#c2410c' },
  { id: 15, name: 'Rose Petal', primaryColor: '#be185d' },
  { id: 16, name: 'Slate Minimal', primaryColor: '#475569' },
  { id: 17, name: 'Amber Glow', primaryColor: '#b45309' },
  { id: 18, name: 'Cyan Tech', primaryColor: '#0891b2' },
  { id: 19, name: 'Lime Fresh', primaryColor: '#4d7c0f' },
  { id: 20, name: 'Pink Elegance', primaryColor: '#9d174d' },
  { id: 21, name: 'Indigo Dream', primaryColor: '#4338ca' },
  { id: 22, name: 'Emerald Luxe', primaryColor: '#047857' },
  { id: 23, name: 'Copper Brown', primaryColor: '#78350f' },
  { id: 24, name: 'Steel Blue', primaryColor: '#1e40af' },
  { id: 25, name: 'Crimson Bold', primaryColor: '#dc2626' },
  { id: 26, name: 'Violet Nebula', primaryColor: '#6d28d9' },
  { id: 27, name: 'Azure Sky', primaryColor: '#0284c7' },
  { id: 28, name: 'Jade Stone', primaryColor: '#059669' },
  { id: 29, name: 'Premium Modern', primaryColor: '#6d28d9' },
];
