import React, { useState } from 'react';
import { useCV } from '../context/CVContext';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { templateThemes } from '../types/cv';
import { ChevronLeftIcon, PaletteIcon, XIcon, SendIcon } from 'lucide-react';

export function CVPreview({ onBack }: { onBack: () => void }) {
  const { cvData, setSelectedTemplate } = useCV();
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  if (!cvData) return null;

  const sendToWhatsApp = () => {
    const essentialData = {
      n: cvData.personalInfo.name,
      t: cvData.selectedTemplate,
      p: cvData.contact.phone1,
      e: cvData.contact.email,
      // ... anith data tika encode karanna
    };
    const jsonStr = JSON.stringify(essentialData);
    const base64 = btoa(unescape(encodeURIComponent(jsonStr)));
    const message = `System Ref: ${base64}`;
    window.open(`https://wa.me/94701234567?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="bg-white border-b sticky top-0 z-30 px-4 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 font-bold">
            <ChevronLeftIcon size={20}/> EDIT
          </button>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowThemeSelector(true)}
              className="bg-gray-100 p-3 rounded-xl hover:bg-gray-200 transition-all"
            >
              <PaletteIcon size={20}/>
            </button>
            <button 
              onClick={sendToWhatsApp}
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg"
            >
              <SendIcon size={18}/> SEND
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 flex justify-center mt-8">
        <div className="bg-white shadow-2xl p-4 md:p-8 rounded-lg overflow-x-auto w-full flex justify-center">
           <TemplateRenderer cvData={cvData} scale={0.8} />
        </div>
      </div>

      {showThemeSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">SELECT STYLE</h2>
              <button onClick={() => setShowThemeSelector(false)}><XIcon/></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {templateThemes.map((theme) => (
                <button 
                  key={theme.id}
                  onClick={() => { setSelectedTemplate(theme.id); setShowThemeSelector(false); }}
                  className={`p-4 rounded-xl border-2 ${cvData.selectedTemplate === theme.id ? 'border-blue-500' : 'border-gray-100'}`}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
