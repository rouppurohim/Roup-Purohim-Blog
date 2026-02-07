import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const translations = {
  en: {
    home: 'Home',
    insights: 'Blog',
    resources: 'Resources',
    about: 'About',
    work: 'Consultation',
  },
  id: {
    home: 'Beranda',
    insights: 'Wawasan',
    resources: 'Sumber Daya',
    about: 'Tentang',
    work: 'Konsultasi',
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'en');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as 'light' | 'dark') || 'light');
  
  useEffect(() => {
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [lang, theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  const t = (key: string) => (translations[lang] as any)[key] || key;

  return (
    <AppContext.Provider value={{ lang, setLang, t, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
