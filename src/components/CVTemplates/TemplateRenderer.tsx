import React from 'react';
// ඔයාගේ Templates ටික මෙතන import කරගන්න
import { Template1 } from './Template1';
import { Template2 } from './Template2';
import { Template3 } from './Template3';

interface TemplateRendererProps {
  cvData: any;
  data?: any; // Admin එකෙන් 'data' විදිහටත් pass කරන නිසා safety එකට
  scale?: number;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ cvData, data, scale = 1 }) => {
  // කොහෙන් දත්ත ආවත් (cvData හෝ data) එකම තැනකට අරගන්නවා
  const finalData = cvData || data;

  // දත්ත නැත්නම් මුකුත් පෙන්වන්නේ නැහැ
  if (!finalData) {
    return null;
  }

  // මෙතන තමයි වැදගත්ම දේ: 
  // User generate කරපු CV එකේ තියෙන templateId එක අනුව අදාළ Template එක තෝරනවා.
  const renderSelectedTemplate = () => {
    const templateId = finalData.templateId || 'template-1';

    switch (templateId) {
      case 'template-1':
        return <Template1 data={finalData} />;
      case 'template-2':
        return <Template2 data={finalData} />;
      case 'template-3':
        return <Template3 data={finalData} />;
      // තව templates තියෙනවා නම් මෙතනට add කරගන්න
      default:
        return <Template1 data={finalData} />;
    }
  };

  return (
    <div 
      className="template-renderer-container"
      style={{ 
        transform: `scale(${scale})`, 
        transformOrigin: 'top center',
        width: '100%' 
      }}
    >
      {renderSelectedTemplate()}
    </div>
  );
};
