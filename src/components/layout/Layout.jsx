import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { ToastContainer } from '../common/ToastContainer';
import { AuthPromptModal } from '../auth/AuthPromptModal';
import { CustomerReviewSection } from '../home/CustomerReviewSection';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E140E]">
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-[#1E140E] text-[#FAF8F5] px-4 py-2 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#58150E]"
      >
        Skip to main content
      </a>

      {/* Safe scroll restoration without react-router history error */}
      <ScrollToTop />

      <Navbar />

      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {children}
      </main>

      {/* Editorial Customer Review Section */}
      <CustomerReviewSection />

      <Footer />

      {/* Global Toast Notifications & Auth Guards */}
      <ToastContainer />
      <AuthPromptModal />
    </div>
  );
};
