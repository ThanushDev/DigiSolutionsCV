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
  selectedTemplate: number;
  customColor: string;
  brightness: number;
}

// මේක නැති වුණ නිසා තමයි උඹේ Build එක Fail වුණේ. දැන් මේක හරියටම තියෙනවා.
export const defaultCVData: CVData = {
  profileImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  personalInfo: {
    fullName: '',
    objective: '',
    dob: '',
    nic: '',
    gender: '',
    nationality: '',
    religion: '',
    civilStatus: ''
  },
  contact: {
    email: '',
    phone1: '',
    phone2: '',
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
  selectedTemplate: 1,
  customColor: '#1e3a8a',
  brightness: 100
};

export const templateThemes = [
  { id: 1, name: 'Professional Default', primaryColor: '#1e3a8a' },
  { id: 2, name: 'Modern Corporate', primaryColor: '#0369a1' },
  { id: 3, name: 'Yellow Ribbon Bold', primaryColor: '#eab308' },
  { id: 4, name: 'Executive Dark', primaryColor: '#111827' },
  { id: 5, name: 'Minimalist Gray', primaryColor: '#374151' },
  { id: 6, name: 'Premium Gold', primaryColor: '#854d0e' },
  { id: 7, name: 'Classic Blue', primaryColor: '#2563eb' },
  { id: 8, name: 'Elegant Professional', primaryColor: '#be185d' }
];
