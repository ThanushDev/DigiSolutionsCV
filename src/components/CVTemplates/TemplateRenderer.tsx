import React from 'react';
// ඔයාගේ templates ටික මෙතන import වෙලා ඇතිනේ, ඒ ටික තියාගන්න.
// උදා: import { Template1 } from './Template1';

interface TemplateRendererProps {
  cvData: any;
  data?: any; // සමහර තැන්වල 'data' ලෙස pass කරන නිසා
  scale?: number;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ cvData, data, scale = 1 }) => {
  // කොහෙන් දත්ත ආවත් (cvData හෝ data) එකම තැනකට ගන්නවා
  const rawData = cvData || data;

  if (!rawData) {
    return <div className="p-10 text-center text-zinc-400">No data available to preview.</div>;
  }

  // දත්ත missing වුණත් crash නොවී පේන්න මෙන්න මේ 'safeData' එක හදනවා
  const safeData = {
    ...rawData,
    personalInfo: rawData.personalInfo || {
      fullName: rawData.fullName || 'N/A',
      email: rawData.email || '',
      phone1: rawData.phone1 || '',
      phone: rawData.phone1 || '',
      address: rawData.address || '',
      jobTitle: rawData.jobTitle || '',
      linkedin: rawData.linkedin || '',
      website: rawData.website || ''
    },
    experience: Array.isArray(rawData.experience) ? rawData.experience : [],
    education: Array.isArray(rawData.education) ? rawData.education : [],
    skills: Array.isArray(rawData.skills) ? rawData.skills : []
  };

  // මෙතන තමයි වැදගත්ම දේ: ඔයාගේ templates වලට දත්ත යවද්දී 'data' prop එක විදිහට මේ safeData එකම යවන්න.
  const renderTemplate = () => {
    const templateId = safeData.templateId || 'template-1';

    switch (templateId) {
      case 'template-1':
        // return <Template1 data={safeData} />; // මෙහෙම තියෙන්න ඕනේ
      case 'template-2':
        // return <Template2 data={safeData} />;
      default:
        // return <Template1 data={safeData} />;
        return <div className="p-20 bg-white shadow-xl">
          <h1 className="text-4xl font-bold">{safeData.personalInfo.fullName}</h1>
          <p className="text-zinc-500">{safeData.personalInfo.jobTitle}</p>
          <hr className="my-4" />
          <p>Email: {safeData.personalInfo.email}</p>
          <p>Phone: {safeData.personalInfo.phone1}</p>
          {/* මේක නිකන් placeholder එකක්, ඔයාගේ switch logic එක මෙතනට දාන්න */}
        </div>;
    }
  };

  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
      {renderTemplate()}
    </div>
  );
};
