import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TemplateSelection } from './pages/TemplateSelection';
import { CVBuilder } from './pages/CVBuilder';
import { CVPreview } from './pages/CVPreview';
import { Admin } from './pages/Admin'; // Admin import එක තියෙනවා නේද බලන්න

function App() {
  return (
    // basename එක GitHub Repo නමට සමාන විය යුතුයි
    <Router>
      <Routes>
        {/* Admin route එක හැමවිටම ඉහළින් තියන්න */}
        <Route path="/admin" element={<Admin />} />
        
        {/* අනෙක් routes */}
        <Route path="/" element={<TemplateSelection />} />
        <Route path="/builder" element={<CVBuilder />} />
        <Route path="/preview" element={<CVPreview />} />
        
        {/* වැරදි path එකක් ආවොත් main page එකට යවන්න */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
