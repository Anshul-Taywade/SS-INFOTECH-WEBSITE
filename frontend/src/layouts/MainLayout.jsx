import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LenisWrapper from '@/components/LenisWrapper';

export default function MainLayout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          if (window.lenis) {
            window.lenis.scrollTo(element, { offset: -90, duration: 1.2 });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <LenisWrapper>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </LenisWrapper>
  );
}
