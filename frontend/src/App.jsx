import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import ServicesPage from '@/pages/ServicesPage';
import SolutionsPage from '@/pages/SolutionsPage';
import GalleryPage from '@/pages/GalleryPage';
import CareersPage from '@/pages/CareersPage';
import ContactPage from '@/pages/ContactPage';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="solutions" element={<SolutionsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="careers" element={<CareersPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
