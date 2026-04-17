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
    phone2: string; // Optional Phone 2
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
  references: Reference[]; // Array for 2 references
  selectedTemplate: number;
  customColor: string;
  brightness: number;
}
