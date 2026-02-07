import React from 'react';
import { Link } from 'react-router';
import { MOCK_POSTS, MOCK_TESTIMONIALS, MOCK_RESULTS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="bg-background dark:bg-darkbg min-h-screen">
      {/* SECTION: HERO - SHARP ARCHITECTURE */}
      <section className="pt-32 pb-24 border-b hairline-border bg-white dark:bg-slate-900">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-9">
              <span className="text-metadata text-accent mb-6 block">The Crackership Methodology: Demand Creation & Channel Mastery</span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.95] text-secondary dark:text-white mb-12">
                Accelerating <br />
                Agrochemical <br />
                <span className="text-primary italic dark:text-accent">Velocity.</span>
              </h1>
              <div className="flex flex-wrap gap-12 items-center">
                <Link to="/work-with-me" className="bg-primary text-white px-14 py-6 text-xs font-black uppercase tracking-[0.25em] hover:bg-accent transition-all rounded-none shadow-2xl">
                  Consultation
                </Link>
                <Link to="/playbook" className="border-2 border-secondary dark:border-white text-secondary dark:text-white px-10 py-5 text-xs font-black uppercase tracking-[0.25em] hover:bg-secondary hover:text-white dark:hover:bg-white dark:hover:text-secondary transition-all rounded-none">
                  Get Playbook
                </Link>
                <div className="h-12 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
                <p className="max-w-xs text-xs font-bold text-slate-500 leading-loose uppercase tracking-wider">
                  Roup Purohim: Bridging technical demo validation with high-performance retail distribution networks.
                </p>
              </div>
            </div>

            {/* HERO PERFORMANCE CARD - SLEEK REFACTOR */}
            <div className="lg:col-span-3 flex flex-col justify-end">
              <div className="p-10 border hairline-border bg-white dark:bg-slate-900 rounded-none shadow-sm relative overflow-hidden group hover:border-accent transition-colors">
                <div className="text-xs font-black text-secondary dark:text-white mb-6 uppercase tracking-widest border-b hairline-border pb-4">Performance Index</div>
                <div className="space-y-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Demand Creation Score</span>
                    <span className="text-3xl font-black text-accent tracking-tighter">Top 1%</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Retailer Trust Index</span>
                    <span className="text-3xl font-black text-secondary dark:text-white tracking-tighter">94.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: PILLARS - SHARP HAIRLINE GRID */}
      <section className="py-24 border-b hairline-border bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 divide-x dark:divide-slate-800 border hairline-border rounded-none overflow-hidden bg-white dark:bg-slate-900">
            {[
              { title: "Technical Validation", desc: "Converting field demo results into compelling sales narratives for key farmers." },
              { title: "Retailer Engagement", desc: "Building high-velocity partnerships with agricultural kiosks and regional sub-distributors." },
              { title: "GTM Architecture", desc: "Deploying novel formulations (WP to WG) through strategic channel placement." },
              { title: "Sales Force Mastery", desc: "Training agronomists to transcend technical specs and master demand creation." }
            ].map((p, i) => (
              <div key={i} className="p-12 group hover:bg-primary transition-all duration-500 rounded-none">
                <span className="text-metadata text-slate-300 mb-8 block group-hover:text-white/30">CAPABILITY 0{i + 1}</span>
                <h3 className="text-lg font-black text-secondary dark:text-white mb-4 uppercase tracking-tighter group-hover:text-white">{p.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-white/70 leading-relaxed font-sans">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: INTELLIGENCE - COMPACT BLOG LIST */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-end mb-20 border-b hairline-border pb-12">
            <div>
              <span className="text-metadata text-accent mb-4 block">Latest Blog Posts</span>
              <h2 className="text-5xl font-black text-secondary dark:text-white tracking-tighter uppercase">Blog</h2>
            </div>
            <Link to="/insights" className="text-metadata hover:text-accent transition-colors border-b-2 border-accent pb-1">View Full Archive &rarr;</Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* FEATURED POST */}
            <div className="lg:col-span-8">
              {MOCK_POSTS.slice(0, 1).map(post => (
                <Link to={`/${post.slug}`} key={post.id} className="group block">
                  <div className="aspect-[21/9] overflow-hidden bg-slate-100 dark:bg-slate-800 mb-8 grayscale group-hover:grayscale-0 transition-all duration-1000 border hairline-border rounded-none shadow-sm">
                    <img src={post.featured_image_url} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
                  </div>
                  <div className="max-w-3xl">
                    <span className="text-metadata text-accent mb-4 block tracking-[0.4em]">{post.category}</span>
                    <h3 className="text-3xl md:text-4xl font-black text-secondary dark:text-white mb-6 group-hover:text-primary transition-colors leading-[1.1] tracking-tighter uppercase">{post.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-serif italic text-lg leading-relaxed mb-8 line-clamp-3">"{post.excerpt}"</p>
                    <span className="text-metadata border-b border-secondary pb-1 group-hover:text-accent group-hover:border-accent transition-all">Read Full Insight &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* SECONDARY LIST - COMPACT */}
            <div className="lg:col-span-4 space-y-12">
              <h4 className="text-metadata text-slate-300 mb-8 block border-b hairline-border pb-4">Recent Insights</h4>
              {MOCK_POSTS.slice(1, 4).map(post => (
                <Link to={`/${post.slug}`} key={post.id} className="group flex gap-6 items-start border-b hairline-border pb-8 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors p-4 -mx-4 rounded-none">
                  <span className="text-metadata text-slate-200 pt-1 font-black italic">/0{post.id}</span>
                  <div>
                    <span className="text-[9px] font-black uppercase text-accent tracking-widest mb-2 block">{post.category}</span>
                    <h4 className="text-lg font-black text-secondary dark:text-white group-hover:text-accent transition-colors leading-tight tracking-tighter uppercase mb-2">{post.title}</h4>
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest">Read Insight &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: RESULTS - DYNAMIC DATA */}
      <section className="py-32 bg-secondary text-white relative overflow-hidden rounded-none">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="max-w-2xl">
              <span className="text-metadata text-accent mb-6 block">Channel Execution Proof</span>
              <h2 className="text-6xl font-black tracking-tighter uppercase leading-none">Moving <br /><span className="italic text-accent">Markets.</span></h2>
            </div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest max-w-xs leading-loose">
              Validated metrics from 20+ years of regional GTM management.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border hairline-border-white divide-x divide-white/10">
            {MOCK_RESULTS.map((case_, i) => (
              <div key={i} className="p-16 group hover:bg-white hover:text-secondary transition-all duration-500 rounded-none">
                <div className="text-7xl font-black text-accent mb-10 tracking-tighter group-hover:scale-110 transition-transform origin-left">{case_.metric}</div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 group-hover:text-secondary">{case_.label}</div>
                <h4 className="text-lg font-black uppercase tracking-tighter mb-6">{case_.project}</h4>
                <p className="text-xs text-slate-400 font-medium leading-loose group-hover:text-slate-600">{case_.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: SOCIAL PROOF - SLEEK CARDS */}
      <section className="py-32 border-b hairline-border bg-white dark:bg-slate-900/50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-20">
            <span className="text-metadata text-accent mb-4 block">Industry Recognition</span>
            <h2 className="text-5xl font-black text-secondary dark:text-white tracking-tighter uppercase">Trusted By <br /> <span className="text-primary dark:text-accent italic">Leaders.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {MOCK_TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="p-12 border hairline-border bg-white dark:bg-slate-900 rounded-none relative hover:shadow-lg transition-all duration-500 group">
                <div className="absolute top-10 right-10 text-6xl text-slate-100 dark:text-slate-800 font-serif italic group-hover:text-accent/20 transition-colors">"</div>
                <p className="text-lg font-serif italic text-slate-600 dark:text-slate-300 leading-loose mb-10 relative z-10">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-6">
                  <img src={testimonial.avatar_url} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest text-secondary dark:text-white">{testimonial.name}</h4>
                    <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
