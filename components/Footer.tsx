import React from 'react';
import { AUTHOR } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="py-24 border-t hairline-border bg-white dark:bg-slate-900 rounded-none">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex flex-col">
          <span className="text-2xl font-black tracking-tighter text-secondary dark:text-white uppercase">{AUTHOR.name}</span>
          <span className="text-[10px] font-black text-accent uppercase tracking-[0.25em] leading-none mt-2">{AUTHOR.role}</span>
          <p className="text-sm text-slate-400 mt-6 max-w-sm leading-relaxed font-sans">
            Synthesizing 20+ years of regional agribusiness intelligence into actionable GTM frameworks.
          </p>
        </div>


        <div className="flex flex-col items-end gap-6">
          <div className="flex gap-8">
            <a href={AUTHOR.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-accent transition-colors">LinkedIn</a>
            <a href={AUTHOR.social.twitter} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-accent transition-colors">Twitter (X)</a>
            <a href={AUTHOR.social.email} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-accent transition-colors">Email</a>
          </div>
          <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300">
            © {new Date().getFullYear()} {AUTHOR.name}. All Strategic Rights Reserved.
          </div>
          <div className="flex gap-4">
            <a href="/admin" className="text-[8px] font-bold uppercase tracking-widest text-slate-200 hover:text-accent transition-colors">Admin Access</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
