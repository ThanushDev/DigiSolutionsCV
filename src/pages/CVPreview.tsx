import React from 'react';
import { useCV } from '../context/CVContext';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { ChevronLeftIcon } from 'lucide-react';

export function CVPreview({ onBack }: { onBack: () => void }) {
  const { cvData } = useCV();

  if (!cvData) return <div>No data found</div>;

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold mb-6">
          <ChevronLeftIcon size={20}/> BACK TO EDITOR
        </button>

        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border">
          {/* මෙතැනදී scale එක 1 කරලා බලන්න preview එක එනවද කියලා */}
          <div className="p-4 md:p-8 flex justify-center bg-zinc-200 min-h-[1000px]">
            <div className="bg-white shadow-lg origin-top scale-[0.6] sm:scale-[0.8] md:scale-100">
               <TemplateRenderer cvData={cvData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
