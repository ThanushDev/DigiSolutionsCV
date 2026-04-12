import React from 'react';
import { useCV } from '../context/CVContext';
import { templateThemes, defaultCVData } from '../types/cv';
import { CVTemplateBase } from '../components/CVTemplates/CVTemplateBase';

export function TemplateSelection({ onNext }: { onNext: () => void }) {
  const { cvData, setSelectedTemplate } = useCV();

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-black text-center mb-4 italic uppercase text-gray-900">
          Select Your Template
        </h1>
        <p className="text-center text-gray-500 mb-12 uppercase tracking-widest text-sm">
          Choose a professional design to get started
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {templateThemes.map((theme) => (
            <div 
              key={theme.id} 
              onClick={() => { setSelectedTemplate(theme.id); onNext(); }}
              className={`group cursor-pointer rounded-2xl overflow-hidden border-4 transition-all duration-300 ${
                cvData.selectedTemplate === theme.id 
                  ? 'border-blue-500 scale-105 shadow-2xl' 
                  : 'border-white hover:border-gray-200 hover:scale-102 shadow-md'
              }`}
            >
               <div className="h-80 bg-gray-100 relative overflow-hidden">
                  <div className="transform scale-[0.25] origin-top-left p-4">
                    <CVTemplateBase cvData={defaultCVData} theme={theme} scale={1} />
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
               </div>
               <div 
                 className="p-4 text-center font-bold uppercase tracking-wider" 
                 style={{ backgroundColor: theme.primaryColor, color: '#fff' }}
               >
                 {theme.name}
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with Logo */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t p-6 flex flex-col items-center justify-center">
        <img 
          src="logo.png" 
          alt="Digi Solutions Logo" 
          className="h-10 object-contain mb-2"
          onError={(e) => { e.currentTarget.style.display = 'none'; }} // Logo eka naththam pennanne na
        />
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
          Powered by Digi Solutions
        </p>
      </div>
    </div>
  );
}
