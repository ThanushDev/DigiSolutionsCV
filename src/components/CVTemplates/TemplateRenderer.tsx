import React from 'react';

// ⚠️ වැදගත්: ඔයාගේ src/components/CVTemplates/ folder එක ඇතුළේ 
// තියෙන ඇත්තම templates වල නම් මෙතන හරියටම දාන්න.
// දැනට මම මේවා comment කරලා තියෙන්නේ build error එක නොවෙන්න.
// import { Template1 } from './Template1'; 
// import { Template2 } from './Template2';

interface TemplateRendererProps {
  cvData: any;
  data?: any;
  scale?: number;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ cvData, data, scale = 1 }) => {
  const finalData = cvData || data;

  if (!finalData) return null;

  const renderSelectedTemplate = () => {
    const templateId = finalData.templateId || 'template-1';

    // ⚠️ මෙතන switch case එකේ 'Template1' වගේ ඒවා error දෙනවා නම් 
    // ඒ කියන්නේ ඒ Component එක import වෙලා නැහැ කියන එක.
    switch (templateId) {
      case 'template-1':
        // return <Template1 data={finalData} />;
      case 'template-2':
        // return <Template2 data={finalData} />;
      default:
        // Default එක විදිහට පෙන්නන්න දෙයක්:
        return (
          <div className="bg-white p-10 shadow-xl min-h-[297mm] text-black">
             <h1 className="text-3xl font-bold uppercase">{finalData.personalInfo?.fullName}</h1>
             <p className="text-zinc-500 mb-4">{finalData.personalInfo?.jobTitle}</p>
             <div className="text-sm border-t pt-4">
                <p>Email: {finalData.personalInfo?.email}</p>
                <p>Phone: {finalData.personalInfo?.phone1}</p>
                <p>Address: {finalData.personalInfo?.address}</p>
             </div>
             {/* Experience, Education loop ටික ඔයාගේ Template file එකේ ඇති */}
          </div>
        );
    }
  };

  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center', width: '100%' }}>
      {renderSelectedTemplate()}
    </div>
  );
};
