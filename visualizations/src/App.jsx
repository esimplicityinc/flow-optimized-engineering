import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ModernMinimalist from './pages/ModernMinimalist';
import VibrantBold from './pages/VibrantBold';
import CorporateProfessional from './pages/CorporateProfessional';
import TechFuturistic from './pages/TechFuturistic';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/modern" element={<ModernMinimalist />} />
        <Route path="/vibrant" element={<VibrantBold />} />
        <Route path="/corporate" element={<CorporateProfessional />} />
        <Route path="/tech" element={<TechFuturistic />} />
      </Routes>
    </Router>
  );
}

export default App;
