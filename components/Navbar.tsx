import React from 'react';
import { Link, useLocation } from 'react-router';
import { useApp } from '../context/AppContext';

const Navbar: React.FC = () => {
  const { t, theme, toggleTheme, lang, setLang } = useApp();
  const location = useLocation();

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('insights'), path: '/insights' },
    { name: t('resources'), path: '/resources' },
    { name: t('about'), path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-darkbg/90 backdrop-blur-md border-b hairline-border">
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between h-20 items-center">
        <Link to="/" className="flex flex-col group">
          <span className="text-xl font-black tracking-tighter text-secondary dark:text-white group-hover:text-accent transition-colors">ROUP PUROHIM</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Crackership Strategist</span>
        </Link>

        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs font-black uppercase tracking-[0.25em] transition-all hover:text-accent ${location.pathname === link.path ? 'text-accent' : 'text-secondary-text dark:text-slate-400'
                }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/work-with-me" className="text-xs font-black uppercase tracking-[0.25em] bg-primary text-white px-8 py-3 hover:bg-accent transition-all rounded-none">
            {t('work')}
          </Link>

          <div className="flex items-center gap-6 border-l hairline-border pl-6">
            <button onClick={() => setLang(lang === 'en' ? 'id' : 'en')} className="text-xs font-black uppercase tracking-widest hover:text-accent transition-colors">
              {lang === 'en' ? 'ID' : 'EN'}
            </button>
            <button onClick={toggleTheme} className="text-xs font-black opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest">
              {theme === 'light' ? 'DARK' : 'LIGHT'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
