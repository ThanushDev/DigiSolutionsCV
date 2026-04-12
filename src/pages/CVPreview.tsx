import React, { useState, useRef } from 'react';
import { useCV } from '../context/CVContext';
import { TemplateRenderer } from '../components/CVTemplates/TemplateRenderer';
import { templateThemes } from '../types/cv';
import {
  ChevronLeftIcon,
  DownloadIcon,
  RefreshCwIcon,
  CheckCircleIcon,
  Loader2Icon,
  PaletteIcon,
  XIcon } from
'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
interface CVPreviewProps {
  onBack: () => void;
}
export function CVPreview({ onBack }: CVPreviewProps) {
  const { cvData, setSelectedTemplate, resetCV } = useCV();
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);
  const handleExportPDF = async () => {
    if (!cvRef.current) return;
    setIsExporting(true);
    setExportSuccess(false);
    try {
      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${cvData.personalInfo.name || 'CV'}_Resume.pdf`);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };
  const handleReset = () => {
    if (
    window.confirm(
      'Are you sure you want to reset all CV data? This action cannot be undone.'
    ))
    {
      resetCV();
    }
  };
  const currentTheme = templateThemes.find(
    (t) => t.id === cvData.selectedTemplate
  );
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pb-20 sm:pb-16">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-3 py-2 sm:px-6 lg:px-8 sm:py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4">
              <img
                src="/logo.png"
                alt="FCBS Digi Kuppiya"
                className="h-10 sm:h-14 w-auto" />
              
              <button
                onClick={onBack}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors text-sm">
                
                <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Back to Builder</span>
                <span className="sm:hidden">Back</span>
              </button>
            </div>
            <h1 className="text-base sm:text-xl font-bold text-gray-900 hidden md:block">
              Preview & Export
            </h1>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm">
                
                <RefreshCwIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-1.5 sm:py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 disabled:bg-gray-400 transition-colors text-sm">
                
                {isExporting ?
                <>
                    <Loader2Icon className="w-4 h-4 animate-spin" />
                    <span className="hidden sm:inline">Exporting...</span>
                  </> :
                exportSuccess ?
                <>
                    <CheckCircleIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Downloaded!</span>
                  </> :

                <>
                    <DownloadIcon className="w-4 h-4" />
                    <span>Export PDF</span>
                  </>
                }
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Theme Selector Sidebar - Desktop */}
        <div className="w-64 bg-white border-r border-gray-200 p-4 hidden lg:block overflow-y-auto">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <PaletteIcon className="w-5 h-5" />
            Change Theme
          </h3>
          <div className="space-y-2">
            {templateThemes.map((theme) =>
            <button
              key={theme.id}
              onClick={() => setSelectedTemplate(theme.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${cvData.selectedTemplate === theme.id ? 'bg-gray-100 ring-2 ring-gray-900' : 'hover:bg-gray-50'}`}>
              
                <div
                className="w-6 h-6 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: theme.primaryColor
                }} />
              
                <span className="text-sm font-medium text-gray-700">
                  {theme.name}
                </span>
                {cvData.selectedTemplate === theme.id &&
              <CheckCircleIcon className="w-4 h-4 text-gray-900 ml-auto" />
              }
              </button>
            )}
          </div>
        </div>

        {/* Mobile Theme Selector Button */}
        <div className="lg:hidden fixed bottom-20 right-4 z-30">
          <button
            onClick={() => setShowThemeSelector(!showThemeSelector)}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-900 text-white rounded-full shadow-lg flex items-center justify-center">
            
            <PaletteIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Mobile Theme Selector Modal */}
        {showThemeSelector &&
        <div className="lg:hidden fixed inset-0 z-40 flex items-end justify-center">
            <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowThemeSelector(false)} />
          
            <div className="relative w-full max-h-[70vh] bg-white rounded-t-2xl p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <PaletteIcon className="w-5 h-5" />
                  Select Theme
                </h3>
                <button
                onClick={() => setShowThemeSelector(false)}
                className="p-2 text-gray-500 hover:text-gray-700">
                
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {templateThemes.map((theme) =>
              <button
                key={theme.id}
                onClick={() => {
                  setSelectedTemplate(theme.id);
                  setShowThemeSelector(false);
                }}
                className={`flex items-center gap-2 px-3 py-3 rounded-lg text-left ${cvData.selectedTemplate === theme.id ? 'bg-gray-100 ring-2 ring-gray-900' : 'bg-gray-50'}`}>
                
                    <div
                  className="w-5 h-5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: theme.primaryColor
                  }} />
                
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {theme.name}
                    </span>
                  </button>
              )}
              </div>
            </div>
          </div>
        }

        {/* CV Preview */}
        <div className="flex-1 p-3 sm:p-6 overflow-auto flex justify-center">
          <div className="inline-block">
            <div className="mb-3 sm:mb-4 text-center">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-xs sm:text-sm text-gray-600 shadow-sm">
                <div
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                  style={{
                    backgroundColor: currentTheme?.primaryColor
                  }} />
                
                {currentTheme?.name} Theme
              </span>
            </div>
            <div
              ref={cvRef}
              className="shadow-2xl transform scale-[0.45] sm:scale-[0.6] md:scale-[0.75] lg:scale-100 origin-top"
              style={{
                width: '210mm',
                minHeight: '297mm'
              }}>
              
              <TemplateRenderer cvData={cvData} scale={1} />
            </div>
          </div>
        </div>
      </div>

      {/* Sponsor Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-2 sm:py-3 z-30">
        <div className="flex items-center justify-center gap-4 px-4">
          <div className="text-xs sm:text-sm text-center">
            <span className="font-medium">Sponsored by FCBS Digi Kuppiya</span>
            <span className="mx-2 sm:mx-3 text-gray-500">•</span>
            <span className="text-gray-300">Made by Mr. Thanush</span>
          </div>
        </div>
      </div>
    </div>);

}