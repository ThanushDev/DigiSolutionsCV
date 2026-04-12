import React, { useState } from 'react';
import { CVProvider } from './context/CVContext';
import { TemplateSelection } from './pages/TemplateSelection';
import { CVBuilder } from './pages/CVBuilder';
import { CVPreview } from './pages/CVPreview';
type Page = 'templates' | 'builder' | 'preview';
function CVApp() {
  const [currentPage, setCurrentPage] = useState<Page>('templates');
  const renderPage = () => {
    switch (currentPage) {
      case 'templates':
        return <TemplateSelection onNext={() => setCurrentPage('builder')} />;
      case 'builder':
        return (
          <CVBuilder
            onBack={() => setCurrentPage('templates')}
            onNext={() => setCurrentPage('preview')} />);


      case 'preview':
        return <CVPreview onBack={() => setCurrentPage('builder')} />;
      default:
        return null;
    }
  };
  return <div className="min-h-screen bg-gray-100">{renderPage()}</div>;
}
export function App() {
  return (
    <CVProvider>
      <CVApp />
    </CVProvider>);

}