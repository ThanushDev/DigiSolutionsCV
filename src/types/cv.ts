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

export const defaultCVData: CVData = {
  personalInfo: {
    name: 'Your Name',
    description:
    'Results-driven professional skilled in your field. Committed to excellence and providing efficient service.',
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
    oLevel: {
      indexNumber: '',
      year: '',
      subjects: []
    },
    aLevel: {
      indexNumber: '',
      year: '',
      subjects: []
    }
  },
  professionalQualifications: [],
  references: [
  { name: '', designation: '', organization: '', phone: '' },
  { name: '', designation: '', organization: '', phone: '' }],

  selectedTemplate: 1
};

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

export const templateThemes: TemplateTheme[] = [
{
  id: 1,
  name: 'Professional Dark',
  primaryColor: '#2c3e50',
  secondaryColor: '#34495e',
  accentColor: '#3498db',
  textColor: '#2c3e50',
  bgColor: '#ffffff',
  sidebarBg: '#2c3e50',
  sidebarText: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  headingFont: 'Inter, sans-serif'
},
{
  id: 2,
  name: 'Clean Modern',
  primaryColor: '#1e88e5',
  secondaryColor: '#42a5f5',
  accentColor: '#1565c0',
  textColor: '#212121',
  bgColor: '#ffffff',
  sidebarBg: '#f5f5f5',
  sidebarText: '#212121',
  fontFamily: 'Inter, sans-serif',
  headingFont: 'Inter, sans-serif'
},
{
  id: 3,
  name: 'Minimal Elegant',
  primaryColor: '#5d4e37',
  secondaryColor: '#8b7355',
  accentColor: '#a08060',
  textColor: '#3d3d3d',
  bgColor: '#faf8f5',
  sidebarBg: '#f0ebe3',
  sidebarText: '#3d3d3d',
  fontFamily: 'Georgia, serif',
  headingFont: 'Georgia, serif'
},
{
  id: 4,
  name: 'Corporate Blue',
  primaryColor: '#1a237e',
  secondaryColor: '#283593',
  accentColor: '#3949ab',
  textColor: '#1a1a1a',
  bgColor: '#ffffff',
  sidebarBg: '#1a237e',
  sidebarText: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  headingFont: 'Inter, sans-serif'
},
{
  id: 5,
  name: 'Creative Teal',
  primaryColor: '#00695c',
  secondaryColor: '#00897b',
  accentColor: '#26a69a',
  textColor: '#263238',
  bgColor: '#ffffff',
  sidebarBg: '#00695c',
  sidebarText: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  headingFont: 'Inter, sans-serif'
},
{
  id: 6,
  name: 'Classic Traditional',
  primaryColor: '#4a4a4a',
  secondaryColor: '#6b6b6b',
  accentColor: '#8b0000',
  textColor: '#2d2d2d',
  bgColor: '#fffef9',
  sidebarBg: '#f5f4ef',
  sidebarText: '#2d2d2d',
  fontFamily: 'Times New Roman, serif',
  headingFont: 'Times New Roman, serif'
},
{
  id: 7,
  name: 'Bold Accent',
  primaryColor: '#d32f2f',
  secondaryColor: '#f44336',
  accentColor: '#ff5252',
  textColor: '#212121',
  bgColor: '#ffffff',
  sidebarBg: '#d32f2f',
  sidebarText: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  headingFont: 'Inter, sans-serif'
},
{
  id: 8,
  name: 'Soft Pastel',
  primaryColor: '#7986cb',
  secondaryColor: '#9fa8da',
  accentColor: '#5c6bc0',
  textColor: '#37474f',
  bgColor: '#fafafa',
  sidebarBg: '#e8eaf6',
  sidebarText: '#37474f',
  fontFamily: 'Inter, sans-serif',
  headingFont: 'Inter, sans-serif'
},
{
  id: 9,
  name: 'Executive Black',
  primaryColor: '#1a1a1a',
  secondaryColor: '#2d2d2d',
  accentColor: '#c9a227',
  textColor: '#1a1a1a',
  bgColor: '#ffffff',
  sidebarBg: '#1a1a1a',
  sidebarText: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  headingFont: 'Inter, sans-serif'
},
{
  id: 10,
  name: 'Fresh Green',
  primaryColor: '#2e7d32',
  secondaryColor: '#43a047',
  accentColor: '#66bb6a',
  textColor: '#1b5e20',
  bgColor: '#f1f8e9',
  sidebarBg: '#2e7d32',
  sidebarText: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  headingFont: 'Inter, sans-serif'
}];