export interface Subject { name: string; grade: string; }
export interface EducationLevel { indexNumber: string; year: string; subjects: Subject[]; }
export interface WorkExperienceEntry { id: string; title: string; company: string; duration: string; description: string; }
export interface Reference { name: string; designation: string; organization: string; phone: string; }

export interface CVData {
  personalInfo: {
    name: string; fullName: string; description: string; dateOfBirth: string;
    nicNumber: string; religion: string; civilStatus: string; gender: string;
    nationality: string; photo: string; photoFormat: 'circular' | 'square';
  };
  contact: { phone1: string; phone2: string; email: string; address: string; };
  skills: string[];
  languages: string[];
  workExperience: WorkExperienceEntry[];
  education: { oLevel: EducationLevel; aLevel: EducationLevel; };
  professionalQualifications: string[];
  references: [Reference, Reference];
  selectedTemplate: number;
}

export const defaultCVData: CVData = {
  personalInfo: { name: '', fullName: '', description: '', dateOfBirth: '', nicNumber: '', religion: '', civilStatus: '', gender: '', nationality: '', photo: '', photoFormat: 'circular' },
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
