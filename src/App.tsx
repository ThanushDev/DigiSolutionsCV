import React from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { CVProvider } from './context/CVContext';
import { CVBuilder } from './pages/CVBuilder'; 
import { CVPreview } from './pages/CVPreview';
import { Admin } from './pages/Admin';

function AppContent() {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Home (Editor) */}
      <Route path="/" element={<CVBuilder onPreview={() => navigate('/preview')} />} />
      
      {/* Preview Page */}
      <Route path="/preview" element={<CVPreview onBack={() => navigate('/')} />} />
      
      {/* Admin Page */}
      <Route path="/admin" element={<Admin />} />
      
      {/* වැරදි URL එකක් ගැහුවොත් මුලට */}
      <Route path="*" element={<CVBuilder onPreview={() => navigate('/preview')} />} />
    </Routes>
  );
}

export function App() {
  return (
    <CVProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppContent />
        </div>
      </Router>
    </CVProvider>
  );
}

export default App;
