import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Analytics from './Analytics';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen font-sans flex flex-col selection:bg-accent selection:text-white bg-background dark:bg-darkbg">
      <Analytics />
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
