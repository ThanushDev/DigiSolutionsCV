import React from 'react';
import { useCV } from '../context/CVContext';
import { templateThemes, defaultCVData } from '../types/cv';
import { CVTemplateBase } from '../components/CVTemplates/CVTemplateBase';

export function TemplateSelection({ onNext }: { onNext: () => void }) {
  const { cvData, setSelectedTemplate } = useCV();
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-black text-center mb-4 italic uppercase">Select Your Template</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {templateThemes.map((theme) => (
            <div key={theme.id} onClick={() => { setSelectedTemplate(theme.id); onNext(); }} className={`cursor-pointer rounded-2xl overflow-hidden border-4 transition-all ${cvData.selectedTemplate === theme.id ? 'border-blue-500 scale-105 shadow-2xl' : 'border-white hover:border-gray-200'}`}>
               <div className="h-64 bg-gray-200 relative overflow-hidden">
                  <div className="transform scale-[0.2] origin-top-left p-4"><CVTemplateBase cvData={defaultCVData} theme={theme} scale={1} /></div>
               </div>
               <div className="p-4 text-center font-bold" style={{ backgroundColor: theme.primaryColor, color: '#fff' }}>{theme.name}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer with logo.png */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center justify-center gap-4">
        <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Powered by Digi Solutions</p>
      </div>
    </div>
  );
}
