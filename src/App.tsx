import React from 'react';
import { CVProvider } from './context/CVContext'; // පාර නිවැරදිද බලන්න
import { CVBuilder } from './pages/CVBuilder';    // ඔයාගේ main page එක
import { CVPreview } from './pages/CVPreview';    // Preview page එක

function AppContent() {
  // මෙතන තමයි ඔයාගේ navigation logic එක තියෙන්නේ
  // උදාහරණයක් විදිහට:
  const [showPreview, setShowPreview] = React.useState(false);

  return (
    <>
      {showPreview ? (
        <CVPreview onBack={() => setShowPreview(false)} />
      ) : (
        <CVBuilder onPreview={() => setShowPreview(true)} />
      )}
    </>
  );
}

function App() {
  return (
    // මුළු App එකම මේ CVProvider එක ඇතුළේ තිබිය යුතුමයි!
    <CVProvider>
      <AppContent />
    </CVProvider>
  );
}

export default App;
