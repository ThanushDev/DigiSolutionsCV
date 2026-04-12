import React from 'react';
// ඔයා පාවිච්චි කරන අනිත් templates ටික මෙතන import කරලා ඇතිනේ, ඒ ටික තියාගන්න.

interface TemplateRendererProps {
  cvData: any;
  scale?: number;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ cvData, scale = 1 }) => {
  // CRITICAL: මෙතනදී අපි සහතික කරනවා cvData සහ personalInfo කවදාවත් undefined වෙන්නේ නැහැ කියලා.
  const safeData = {
    ...cvData,
    personalInfo: cvData?.personalInfo || {
      fullName: '',
      email: '',
      phone1: '',
      phone: '',
      address: '',
      jobTitle: ''
    }
  };

  // ඔයාගේ දැනට තියෙන switch case එක මේ 'safeData' එකත් එක්ක පාවිච්චි කරන්න.
  // උදාහරණයක් විදිහට:
  /*
  switch (safeData.templateId) {
    case 'template-1':
      return <Template1 data={safeData} />;
    default:
      return <Template1 data={safeData} />;
  }
  */

  // දැනට මම මේක නිකන් දාන්නම් ඔයාගේ templates වලට දත්ත යවන්න.
  // ප්‍රධානම දේ තමා phone1 කියවන තැන safe navigation (?.) පාවිච්චි කරන එක.
  
  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
       {/* මෙතන ඔයාගේ දැනට තියෙන Template Logic එක දාන්න */}
       {/* හැබැයි හැම තැනම data.personalInfo?.phone1 වගේ පාවිච්චි කරන්න */}
    </div>
  );
};
