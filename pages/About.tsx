import React from 'react';
import { Link } from 'react-router';
import { AUTHOR, MOCK_TIMELINE } from '../constants';

const About: React.FC = () => {
  return (
    <div className="bg-background dark:bg-darkbg min-h-screen">
      {/* SECTION: INTRO - SHARP & TACTICAL */}
      <section className="pt-32 pb-24 border-b hairline-border bg-white dark:bg-slate-900">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
              <span className="text-metadata text-accent mb-6 block">The Crackership Strategist Profile</span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.95] text-secondary dark:text-white mb-12">
                Demand <br />
                Creation <br />
                <span className="text-primary italic dark:text-accent">Architect.</span>
              </h1>
              <div className="prose-slate dark:prose-invert max-w-2xl font-serif text-lg leading-relaxed italic space-y-10 text-slate-500 dark:text-slate-400">
                <p>
                  "I am not your traditional field botanist. My arena is the marketplace. I translate technical product superiority into commercial dominance."
                </p>
                <p>
                  In the agrochemical industry, technical knowledge is only as good as the volume it moves. My expertise lies in <strong className="text-secondary dark:text-white not-italic">Commercial Agronomy</strong>: the art of using demo trials to prove ROI to farmers, convincing retailers to prioritize our portfolio, and architecting GTM strategies that move product across complex regional tiers.
                </p>
                <p>
                  Through the <strong className="text-secondary dark:text-white not-italic">Crackership Framework</strong>, I help companies bridge the massive gap between field technicality and boardroom precision.
                </p>
                <p className="font-bold text-secondary dark:text-white not-italic text-left pt-6">
                  - Roup Purohim
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="bg-slate-100 dark:bg-slate-800 border hairline-border rounded-none shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden">
                <img src={AUTHOR.avatar_url} className="w-full h-[650px] object-cover" alt={AUTHOR.name} />
              </div>
              <div className="absolute -bottom-12 -left-12 bg-primary text-white p-12 shadow-2xl rounded-none border-t-4 border-accent">
                <div className="text-5xl font-black mb-2 tracking-tighter">20+</div>
                <p className="text-[10px] font-black uppercase tracking-widest text-accent">Years Execution Mastery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: TACTICAL CAPABILITIES */}
      <section className="py-32 border-b hairline-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-20">
            <span className="text-metadata text-slate-400 mb-4 block">Core Strategic Competencies</span>
            <h2 className="text-5xl font-black text-secondary dark:text-white tracking-tighter uppercase">Tactical Dominance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Kiosk Velocity", icon: "🏪", desc: "Strategies to increase product push-through at the retailer level via incentive and technical alignment." },
              { title: "Demo-to-Sales", icon: "🧪", desc: "Orchestrating field trials designed specifically to trigger brand-swapping among key farmers." },
              { title: "Channel Integrity", icon: "🔗", desc: "Auditing multi-tier distribution to prevent price leakage and ensure GTM discipline." }
            ].map((item, i) => (
              <div key={i} className="p-10 bg-white dark:bg-slate-900 border hairline-border hover:shadow-lg transition-all duration-500 rounded-none group hover:border-accent">
                <div className="text-4xl mb-8 group-hover:scale-110 transition-transform block grayscale">{item.icon}</div>
                <h4 className="text-xl font-black text-secondary dark:text-white mb-6 uppercase tracking-tight group-hover:text-accent leading-tight">{item.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: CAREER TRAJECTORY (TIMELINE) */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="mb-20 text-center">
            <span className="text-metadata text-accent mb-4 block">Professional Timeline</span>
            <h2 className="text-4xl font-black text-secondary dark:text-white tracking-tighter uppercase">Career Trajectory</h2>
          </div>
          <div className="space-y-0 relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-0">
            {MOCK_TIMELINE.map((item, i) => (
              <div key={i} className="relative pl-12 pb-20 last:pb-0">
                <div className="absolute left-0 top-0 -translate-x-[5px] w-3 h-3 bg-secondary dark:bg-white rounded-full border-4 border-white dark:border-slate-900"></div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline">
                  <div className="md:col-span-3">
                    <span className="text-xs font-black text-accent uppercase tracking-widest">{item.year}</span>
                  </div>
                  <div className="md:col-span-9">
                    <h4 className="text-xl font-black text-secondary dark:text-white uppercase tracking-tighter mb-2">{item.role}</h4>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{item.company}</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-serif italic leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-secondary text-white text-center relative overflow-hidden rounded-none">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <h2 className="text-5xl font-black mb-16 tracking-tighter uppercase leading-none">Architect Your <br />Market Dominance.</h2>
          <Link to="/work-with-me" className="inline-block bg-accent text-white px-20 py-8 text-[12px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-primary transition-all rounded-none shadow-2xl">
            Inquire for Consultation &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;