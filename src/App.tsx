import React, { useState } from 'react';
import { CVProvider } from './context/CVContext';
import { CVBuilder } from './pages/CVBuilder'; 
import { CVPreview } from './pages/CVPreview';
import { Admin } from './pages/Admin'; // Admin පේජ් එක

// Named Export එකක් විදිහට App එක දෙනවා
export function App() {
  const [view, setView] = useState<'editor' | 'preview' | 'admin'>('editor');

  // URL එකේ /admin කියලා තිබ්බොත් admin පෙන්වන්න සරල logic එකක්
  React.useEffect(() => {
    if (window.location.pathname.includes('/admin')) {
      setView('admin');
    }
  }, []);

  return (
    <CVProvider>
      <div className="min-h-screen bg-gray-50">
        {view === 'editor' && (
          <CVBuilder onPreview={() => setView('preview')} />
        )}
        
        {view === 'preview' && (
          <CVPreview onBack={() => setView('editor')} />
        )}

        {view === 'admin' && (
          <Admin />
        )}
      </div>
    </CVProvider>
  );
}

export default App;
