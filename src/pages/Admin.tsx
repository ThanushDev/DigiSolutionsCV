import React, { useState } from 'react';
import { useCV } from '../context/CVContext';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';

export function Admin() {
  const [inputCode, setInputCode] = useState('');
  const { cvData } = useCV(); // දැනට localStorage එකේ තියෙන data එක පාවිච්චි වෙනවා

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin - Manual Verification</h1>
      <textarea 
        className="w-full p-4 border rounded"
        placeholder="Paste system reference here..."
        onChange={(e) => setInputCode(e.target.value)}
      />
      
      <div className="mt-8 border-t pt-8">
        <h2 className="font-bold mb-4">CV Preview to Generate:</h2>
        <div className="border p-4 bg-gray-100">
           {/* මෙතනදී ඔයාට පුළුවන් අර PDF export button එක දාලා PDF එක ගන්න */}
           <TemplateRenderer cvData={cvData} scale={0.5} />
        </div>
      </div>
    </div>
  );
}
