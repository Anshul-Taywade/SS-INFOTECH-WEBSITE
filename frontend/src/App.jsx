import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import ServicesPage from '@/pages/ServicesPage';
import SolutionsPage from '@/pages/SolutionsPage';
import GalleryPage from '@/pages/GalleryPage';
import CareersPage from '@/pages/CareersPage';
import ContactPage from '@/pages/ContactPage';

// Component that redirects to Home page on browser refresh / page reload
function RedirectToHomeOnRefresh() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Detect page refresh (F5 / Reload) or non-home initial load
    const navEntries = performance.getEntriesByType('navigation');
    const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';

    if (isReload || location.pathname !== '/' || location.hash) {
      navigate('/', { replace: true });
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <RedirectToHomeOnRefresh />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="solutions" element={<SolutionsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="careers" element={<CareersPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
