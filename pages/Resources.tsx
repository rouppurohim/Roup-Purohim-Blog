import React from 'react';
import { MOCK_RESOURCES } from '../constants';
import { useApp } from '../context/AppContext';

const Resources: React.FC = () => {
  const literature = MOCK_RESOURCES.filter(r => r.category === 'Literature');
  const technology = MOCK_RESOURCES.filter(r => r.category === 'Technology');
  const education = MOCK_RESOURCES.filter(r => r.category === 'Education');

  return (
    <div className="bg-background dark:bg-darkbg min-h-screen">
      <header className="pt-20 pb-10 border-b hairline-border bg-white dark:bg-slate-900">
        <div className="max-w-[1400px] mx-auto px-6">
          <span className="text-metadata text-accent mb-6 block">Strategic Resources</span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.95] text-secondary dark:text-white mb-12">
            Expert <br />
            Toolkit <br />
            <span className="text-primary italic dark:text-accent">& Resources.</span>
          </h1>
          <p className="max-w-xl text-xs font-medium text-slate-500 leading-relaxed uppercase tracking-widest pt-12 border-t hairline-border">
            High-authority playbooks, proprietary software, and specialized training frameworks designed to optimize agribusiness velocity.
          </p>
        </div>
      </header>

      {/* SECTION 01: LITERATURE (Books & Ebooks) */}
      <section className="py-10 border-b hairline-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-16 flex items-baseline gap-8">
            <h2 className="text-4xl font-black text-secondary dark:text-white tracking-tighter uppercase">01. Literature</h2>
            <div className="h-px grow bg-hairline text-slate-300 dark:text-slate-800"></div>
            <span className="text-metadata text-slate-400">Books & Guides</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {literature.map(res => (
              <div key={res.id} className="group flex flex-col md:flex-row gap-10 bg-white dark:bg-slate-900 border hairline-border p-6 hover:shadow-lg transition-all duration-500 rounded-none relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-32 aspect-[3/4] bg-slate-100 dark:bg-slate-800 shrink-0 shadow-md">
                  <img src={res.image_url} alt={res.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" loading="lazy" />
                </div>
                <div className="flex flex-col justify-between items-start">
                  <div>
                    <span className="text-[9px] font-black text-accent uppercase tracking-[0.3em] mb-4 block">{res.type}</span>
                    <h4 className="text-xl font-black text-secondary dark:text-white mb-4 leading-tight uppercase tracking-tight">{res.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-8 font-serif italic line-clamp-3">{res.description}</p>
                  </div>
                  <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary dark:text-white border-b border-secondary dark:border-white pb-1 hover:text-accent hover:border-accent transition-all">
                    Get Copy &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 02: TECHNOLOGY (SaaS & AI) */}
      <section className="py-10 border-b hairline-border bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-16 flex items-baseline gap-8">
            <h2 className="text-4xl font-black text-secondary dark:text-white tracking-tighter uppercase">02. Technology</h2>
            <div className="h-px grow bg-hairline text-slate-300 dark:text-slate-800"></div>
            <span className="text-metadata text-slate-400">SaaS & AI Agents</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {technology.map(res => (
              <div key={res.id} className="group p-6 bg-white dark:bg-slate-900 border hairline-border hover:border-accent transition-all duration-500 rounded-none">
                <div className="flex justify-between items-start mb-8">
                  <span className="w-12 h-12 flex items-center justify-center bg-secondary text-white text-lg font-black rounded-none">
                    {res.type === 'SaaS' ? 'S' : 'AI'}
                  </span>
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{res.type}</span>
                </div>
                <h4 className="text-2xl font-black text-secondary dark:text-white mb-4 uppercase tracking-tighter group-hover:text-accent transition-colors">{res.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans mb-10">{res.description}</p>
                <a href={res.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-secondary text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-accent transition-all rounded-none">
                  Launch Tool
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 03: ACADEMY (Training) */}
      <section className="py-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-16 flex items-baseline gap-8">
            <h2 className="text-4xl font-black text-secondary dark:text-white tracking-tighter uppercase">03. Academy</h2>
            <div className="h-px grow bg-hairline text-slate-300 dark:text-slate-800"></div>
            <span className="text-metadata text-slate-400">Training & Workshops</span>
          </div>
          <div className="border border-l-4 border-l-accent hairline-border bg-white dark:bg-slate-900 p-0 rounded-none overflow-hidden">
            {education.map((res, idx) => (
              <div key={res.id} className={`p-8 flex flex-col md:flex-row gap-12 items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-all ${idx !== education.length - 1 ? 'border-b hairline-border' : ''}`}>
                <div className="w-full md:w-1/3 aspect-video bg-slate-200 dark:bg-slate-800 grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden relative group">
                  <img src={res.image_url} alt={res.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" loading="lazy" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                </div>
                <div className="w-full md:w-2/3">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[9px] font-black bg-accent text-white px-3 py-1 uppercase tracking-widest">{res.type}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Enrolling Now</span>
                  </div>
                  <h3 className="text-3xl font-black text-secondary dark:text-white mb-4 uppercase tracking-tighter">{res.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 max-w-2xl">{res.description}</p>
                  <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-metadata font-black hover:text-accent transition-colors border-b-2 border-transparent hover:border-accent pb-1">
                    View Curriculum &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;