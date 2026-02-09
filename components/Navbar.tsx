import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar: React.FC = () => {
  const { t, theme, toggleTheme, lang, setLang } = useApp();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

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
          <span className="text-xl font-black tracking-tighter text-secondary dark:text-white group-hover:text-accent transition-colors">ROUP.ME</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Grow Skills. Grow Markets. Grow Impact.</span>
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

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-secondary dark:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-20 bg-white dark:bg-slate-900 z-[60] flex flex-col justify-start p-6 lg:hidden border-t hairline-border shadow-xl">
          {/* Navigation Links */}
          <div className="flex flex-col space-y-0 mb-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`group flex items-center justify-between py-3 px-4 border-b hairline-border transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800 ${location.pathname === link.path
                  ? 'bg-primary/5 dark:bg-accent/10 border-l-4 border-l-accent'
                  : ''
                  }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 tracking-widest">0{index + 1}</span>
                  <span className={`text-lg font-black uppercase tracking-tight ${location.pathname === link.path
                    ? 'text-accent'
                    : 'text-secondary dark:text-slate-200 group-hover:text-accent'
                    }`}>
                    {link.name}
                  </span>
                </div>
                <span className="text-slate-300 dark:text-slate-600 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ))}
            {/* Consultation as item 05 */}
            <Link
              to="/work-with-me"
              onClick={closeMenu}
              className={`group flex items-center justify-between py-3 px-4 border-b hairline-border transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800 ${location.pathname === '/work-with-me'
                ? 'bg-primary/5 dark:bg-accent/10 border-l-4 border-l-accent'
                : ''
                }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 tracking-widest">05</span>
                <span className={`text-lg font-black uppercase tracking-tight ${location.pathname === '/work-with-me'
                  ? 'text-accent'
                  : 'text-accent group-hover:text-primary'
                  }`}>
                  {t('work')}
                </span>
              </div>
              <span className="text-slate-300 dark:text-slate-600 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Settings Section */}
          <div className="pt-4 border-t hairline-border">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3 block">Settings</span>

            <div className="space-y-0">
              <div className="flex justify-between items-center py-2 px-4 border-b hairline-border hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Language</span>
                <button
                  onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
                  className="text-xs font-black uppercase tracking-widest text-accent hover:text-primary transition-colors"
                >
                  {lang === 'en' ? '🇺🇸 EN' : '🇮🇩 ID'}
                </button>
              </div>

              <div className="flex justify-between items-center py-2 px-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Theme</span>
                <button
                  onClick={toggleTheme}
                  className="text-xs font-black uppercase tracking-widest text-accent hover:text-primary transition-colors"
                >
                  {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
