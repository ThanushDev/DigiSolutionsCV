import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../../lib/gemini';

export function ProfessionalQualifications() {
  const { cvData, updateProfessionalQualification } = useCV();
  const [isEnhancing, setIsEnhancing] = useState<number | null>(null);

  const enhanceQualification = async (index: number, text: string) => {
    if (!text) return;
    setIsEnhancing(index);
    try {
      const prompt = `Rewrite this professional qualification to be more standard and professional: "${text}". Only return the improved text.`;
      const result = await askAI(prompt);
      if (result) updateProfessionalQualification(index, result.trim());
    } catch (error) {
      console.error(error);
    } finally {
      setIsEnhancing(null);
    }
  };

  // ... (Return එක ඇතුළේ ඇති button එකට enhanceQualification සම්බන්ධ කරන්න)
}
