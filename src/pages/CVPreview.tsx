import React, { useState } from 'react';
import { useCV } from '../context/CVContext';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { templateThemes } from '../types/cv';
import { ChevronLeftIcon, PaletteIcon, XIcon, SendIcon } from 'lucide-react';

export function CVPreview({ onBack }: { onBack: () => void }) {
  const { cvData, setSelectedTemplate } = useCV();
  const [showThemes, setShowThemes] = useState(false);

  if (!cvData) return null;

  const handleWhatsApp = () => {
    const data = btoa(unescape(encodeURIComponent(JSON.stringify({
      n: cvData.personalInfo.name,
      t: cvData.selectedTemplate,
      e: cvData.contact.email
    }))));
    window.open(`https://wa.me/94700000000?text=System%20Ref:%20${data}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b p-4 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex justify-between">
          <button onClick={onBack} className="flex items-center font-bold text-gray-600">
            <ChevronLeftIcon className="mr-1"/> EDIT
          </button>
          <div className="flex gap-2">
            <button onClick={() => setShowThemes(true)} className="p-2 bg-gray-100 rounded-lg"><PaletteIcon/></button>
            <button onClick={handleWhatsApp} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
              <SendIcon size={18}/> SEND
            </button>
          </div>
        </div>
      </div>

      <div className="py-10">
        <TemplateRenderer cvData={cvData} scale={0.7} />
      </div>

      {showThemes && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold">Select Template</h3>
              <button onClick={() => setShowThemes(false)}><XIcon/></button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {templateThemes.map(t => (
                <button 
                  key={t.id} 
                  onClick={() => { setSelectedTemplate(t.id); setShowThemes(false); }}
                  className={`p-4 border-2 rounded-xl text-left ${cvData.selectedTemplate === t.id ? 'border-blue-600 bg-blue-50' : 'border-gray-100'}`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
