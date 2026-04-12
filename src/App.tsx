import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TemplateSelection } from './pages/TemplateSelection';
import { CVBuilder } from './pages/CVBuilder';
import { CVPreview } from './pages/CVPreview';
import { Admin } from './pages/Admin';

export function App() {
  return (
    <Router>
      <Routes>
        {/* Admin පේජ් එක මුලින්ම පරීක්ෂා කෙරේ */}
        <Route path="/admin" element={<Admin />} />
        
        {/* ප්‍රධාන routes */}
        <Route path="/" element={<TemplateSelection />} />
        <Route path="/builder" element={<CVBuilder />} />
        <Route path="/preview" element={<CVPreview />} />
        
        {/* වෙනත් ඕනෑම path එකක් ආවොත් main page එකට redirect කරයි */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
