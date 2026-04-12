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
  { id: 1, name: 'Modern Professional', primaryColor: '#2563eb', secondaryColor: '#1e40af', accentColor: '#3b82f6', textColor: '#1f2937', bgColor: '#ffffff', sidebarBg: '#f8fafc', sidebarText: '#1f2937', fontFamily: 'Inter, sans-serif', headingFont: 'Inter, sans-serif' },
  { id: 2, name: 'Royal Blue Sidebar', primaryColor: '#1e3a8a', secondaryColor: '#1e40af', accentColor: '#60a5fa', textColor: '#111827', bgColor: '#ffffff', sidebarBg: '#eff6ff', sidebarText: '#1e3a8a', fontFamily: 'Inter, sans-serif', headingFont: 'Inter, sans-serif' },
  { id: 3, name: 'Creative Slate', primaryColor: '#0f172a', secondaryColor: '#334155', accentColor: '#38bdf8', textColor: '#1e293b', bgColor: '#ffffff', sidebarBg: '#f1f5f9', sidebarText: '#0f172a', fontFamily: 'Inter, sans-serif', headingFont: 'Inter, sans-serif' },
  { id: 4, name: 'Emerald Executive', primaryColor: '#064e3b', secondaryColor: '#065f46', accentColor: '#10b981', textColor: '#064e3b', bgColor: '#ffffff', sidebarBg: '#ecfdf5', sidebarText: '#064e3b', fontFamily: 'Inter, sans-serif', headingFont: 'Inter, sans-serif' },
  { id: 5, name: 'Dark Corporate', primaryColor: '#18181b', secondaryColor: '#27272a', accentColor: '#3b82f6', textColor: '#27272a', bgColor: '#ffffff', sidebarBg: '#18181b', sidebarText: '#ffffff', fontFamily: 'Inter, sans-serif', headingFont: 'Inter, sans-serif' },
  { id: 6, name: 'Elegant Serif', primaryColor: '#451a03', secondaryColor: '#78350f', accentColor: '#d97706', textColor: '#451a03', bgColor: '#ffffff', sidebarBg: '#fffbeb', sidebarText: '#451a03', fontFamily: 'serif', headingFont: 'serif' },
  { id: 7, name: 'Minimalist Clean', primaryColor: '#000000', secondaryColor: '#404040', accentColor: '#737373', textColor: '#171717', bgColor: '#ffffff', sidebarBg: '#fafafa', sidebarText: '#000000', fontFamily: 'sans-serif', headingFont: 'sans-serif' },
  { id: 8, name: 'Tech Crimson', primaryColor: '#991b1b', secondaryColor: '#b91c1c', accentColor: '#f87171', textColor: '#111827', bgColor: '#ffffff', sidebarBg: '#fef2f2', sidebarText: '#991b1b', fontFamily: 'sans-serif', headingFont: 'sans-serif' },
  { id: 9, name: 'Indigo Modern', primaryColor: '#312e81', secondaryColor: '#3730a3', accentColor: '#818cf8', textColor: '#1e1b4b', bgColor: '#ffffff', sidebarBg: '#eef2ff', sidebarText: '#312e81', fontFamily: 'sans-serif', headingFont: 'sans-serif' },
  { id: 10, name: 'Golden Standard', primaryColor: '#854d0e', secondaryColor: '#a16207', accentColor: '#eab308', textColor: '#422006', bgColor: '#ffffff', sidebarBg: '#fefce8', sidebarText: '#854d0e', fontFamily: 'serif', headingFont: 'serif' }
];
