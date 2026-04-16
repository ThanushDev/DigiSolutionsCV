import React from 'react';
import { useCV } from '../context/CVContext';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { ChevronLeftIcon } from 'lucide-react';

export function CVPreview({ onBack }: { onBack: () => void }) {
  const { cvData } = useCV();

  // cvData නැත්නම් මුකුත් පේන්නේ නැහැ. ඒක චෙක් කරමු.
  if (!cvData) return <div className="p-10 text-center text-gray-400 font-bold">NO CV DATA FOUND</div>;

  return (
    <div className="min-h-screen bg-zinc-100 pb-20 overflow-x-hidden">
      <div className="max-w-4xl mx-auto p-4">
        <button onClick={onBack} className="flex items-center gap-2 font-black text-xs uppercase mb-6 bg-white px-4 py-2 rounded-xl shadow-sm">
          <ChevronLeftIcon size={16}/> Back to Editor
        </button>

        <div className="flex justify-center w-full overflow-hidden">
          <div className="bg-white shadow-2xl p-0 md:p-0" style={{ width: '210mm', minHeight: '297mm' }}>
            <TemplateRenderer cvData={cvData} scale={1} />
          </div>
        </div>
      </div>
    </div>
  );
}
