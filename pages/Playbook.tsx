import React from 'react';
import { AUTHOR } from '../constants';
import SEO from '../components/SEO';

const Playbook: React.FC = () => {
    return (
        <div className="bg-background dark:bg-darkbg min-h-screen">
            <SEO
                title="The 2025 Agribusiness GTM Playbook | Roup Purohim"
                description="Download the definitive tactical guide on bridging the gap between technical agronomy and commercial velocity. Used by 500+ Regional Managers."
                image={AUTHOR.avatar_url}
                article={false}
                keywords="Agribusiness Playbook, GTM Strategy, Commercial Velocity, Roup Purohim"
            />

            <header className="pt-32 pb-20 border-b hairline-border bg-white dark:bg-slate-900">
                <div className="max-w-[1000px] mx-auto px-6 text-center">
                    <span className="text-metadata text-accent mb-6 block">Strategic Knowledge Transfer</span>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.95] text-secondary dark:text-white mb-12">
                        The 2025 <br />
                        Agribusiness <br />
                        <span className="text-primary italic dark:text-accent">GTM Playbook.</span>
                    </h1>
                    <p className="text-sm md:text-base font-medium text-slate-500 max-w-2xl mx-auto leading-relaxed uppercase tracking-wider">
                        Bridging the gap between technical agronomy and commercial velocity.
                        <br className="hidden md:block" />
                        A tactical guide for Regional Managers.
                    </p>
                </div>
            </header>

            <div className="max-w-[1200px] mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

                    {/* LEFT: CONTENT / VALUE PROPS */}
                    <div className="lg:col-span-7 space-y-20">
                        <div className="border hairline-border bg-white dark:bg-slate-900 rounded-none shadow-sm relative overflow-hidden group aspect-[3/4] max-w-md mx-auto lg:mx-0">
                            <img src="/ebook-cover.png" alt="Playbook Cover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>

                        <div>
                            <h3 className="text-2xl font-black text-secondary dark:text-white mb-10 uppercase tracking-tight">Inside The Audit</h3>
                            <div className="grid grid-cols-1 gap-8">
                                {[
                                    { title: "The Velocity Gap", desc: "Why superior products fail to gain traction in fragmented markets." },
                                    { title: "The 'Doctor' Framework", desc: "Transforming agronomists from salespeople into diagnostic authorities." },
                                    { title: "Retailer Psychology", desc: "How to shift kiosk owners from passive stockists to active partners." },
                                    { title: "Tank-Mix Math", desc: "Commercial calculations that justify premium pricing to skeptical farmers." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 border-b hairline-border pb-8 last:border-0">
                                        <span className="text-lg font-black text-accent">0{i + 1}</span>
                                        <div>
                                            <h4 className="text-lg font-black text-secondary dark:text-white uppercase tracking-tighter mb-2">{item.title}</h4>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: DOWNLOAD FORM */}
                    <div className="lg:col-span-5 sticky top-32">
                        <div className="bg-white dark:bg-slate-900 border hairline-border p-12 rounded-none shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-accent -rotate-45 translate-x-12 -translate-y-12"></div>

                            <h3 className="text-xl font-black text-secondary dark:text-white mb-2 uppercase tracking-widest">Instant Access</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-12">PDF Download • 42 Pages</p>

                            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-3 block">Full Name</label>
                                    <input type="text" className="w-full bg-slate-50 dark:bg-slate-800 border hairline-border px-4 py-4 text-xs font-bold focus:outline-none focus:border-accent transition-all dark:text-white rounded-none" placeholder="E.G. ROUP PUROHIM" />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-3 block">Work Email</label>
                                    <input type="email" className="w-full bg-slate-50 dark:bg-slate-800 border hairline-border px-4 py-4 text-xs font-bold focus:outline-none focus:border-accent transition-all dark:text-white rounded-none" placeholder="NAME@COMPANY.COM" />
                                </div>

                                <button type="submit" className="w-full bg-secondary text-white py-6 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-accent transition-all shadow-lg rounded-none group relative overflow-hidden">
                                    <span className="relative z-10">Send Me The Playbook</span>
                                    <div className="absolute inset-0 bg-accent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                </button>

                                <p className="text-center text-[8px] text-slate-300 font-bold uppercase tracking-widest mt-6">
                                    Join 1,240+ Agribusiness Leaders
                                </p>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Playbook;
