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

// මෙන්න මේකට මම අලුත් fields 2ක් දැම්මා
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
  customColor?: string; // යූසර් තෝරන පාට
  brightness?: number;  // යූසර් තෝරන දීප්තිය
}

// ටෙම්ප්ලේට් වලට අදාළ ඩීෆෝල්ට් පාටවල් ටිකත් මෙතනටම දැම්මා
export const templateThemes = [
  { id: 1, name: 'Professional Sidebar', primaryColor: '#2563eb' },
  { id: 2, name: 'Executive Blue', primaryColor: '#1e3a8a' },
  { id: 3, name: 'Corporate Gray', primaryColor: '#334155' },
  { id: 4, name: 'Modern Emerald', primaryColor: '#059669' },
  { id: 5, name: 'Dark Professional', primaryColor: '#18181b' },
  { id: 6, name: 'Classic Serif', primaryColor: '#7c2d12' },
  { id: 7, name: 'Minimalist', primaryColor: '#000000' },
  { id: 8, name: 'Crimson Tech', primaryColor: '#991b1b' },
  { id: 9, name: 'Indigo Premium', primaryColor: '#4338ca' },
  { id: 10, name: 'Golden Standard', primaryColor: '#854d0e' }
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
  customColor: '#2563eb',
  brightness: 100
};
