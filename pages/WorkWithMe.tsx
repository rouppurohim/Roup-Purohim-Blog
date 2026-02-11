import React, { useState } from 'react';
import { MOCK_TESTIMONIALS } from '../constants';

const WorkWithMe: React.FC = () => {
  const featuredTestimonial = MOCK_TESTIMONIALS[0];
  const [formData, setFormData] = useState({ name: '', email: '', context: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Consultation Request: ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nContext:\n${formData.context}`);
    window.location.href = `mailto:roup.purohim@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-background dark:bg-darkbg min-h-screen">
      <header className="pt-20 pb-10 border-b hairline-border bg-white dark:bg-slate-900">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <span className="text-metadata text-accent mb-6 block">Consultation Services</span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.95] text-secondary dark:text-white mb-12">
            Demand <br />
            Execution <br />
            <span className="text-primary italic dark:text-accent">Consultation.</span>
          </h1>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

          {/* LEFT COLUMN: PROTOCOLS */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-black text-secondary dark:text-white mb-16 uppercase tracking-tight border-b hairline-border pb-6">Engagement Protocol</h2>

            <div className="grid grid-cols-1 gap-8 mb-24">
              {[
                { title: "Channel Velocity", desc: "Analyzing why products are stalling at the retailer/kiosk level and architecting push strategies." },
                { title: "Trial-to-Transaction", desc: "Redesigning demo plot strategies to maximize sales conversion rates among key farmer clusters." },
                { title: "Sales Bootcamp", desc: "Turning field teams into high-impact demand creators through the Crackership Method." }
              ].map((service, i) => (
                <div key={i} className="p-6 bg-white dark:bg-slate-900 border hairline-border hover:border-accent transition-all duration-500 rounded-none group shadow-sm">
                  <h3 className="text-lg font-black text-secondary dark:text-white mb-4 uppercase tracking-widest group-hover:text-accent leading-tight">{service.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{service.desc}</p>
                </div>
              ))}
            </div>

            {/* TESTIMONIAL CARD */}
            {featuredTestimonial && (
              <div className="p-6 border hairline-border bg-slate-50 dark:bg-slate-800 rounded-none shadow-sm relative overflow-hidden">
                <div className="text-6xl text-accent/20 font-serif absolute top-4 right-8">"</div>
                <blockquote className="text-xl font-serif italic text-slate-600 dark:text-slate-300 leading-relaxed mb-8 relative z-10">
                  {featuredTestimonial.quote}
                </blockquote>
                <div className="flex items-center gap-6">
                  <img src={featuredTestimonial.avatar_url} alt={featuredTestimonial.name} className="w-12 h-12 rounded-full grayscale object-cover" />
                  <div>
                    <p className="text-[10px] font-black uppercase text-secondary dark:text-white tracking-[0.2em]">{featuredTestimonial.name}</p>
                    <p className="text-[9px] text-slate-400 uppercase tracking-[0.1em] mt-1">{featuredTestimonial.position}, {featuredTestimonial.company}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: CONCISE FORM */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="bg-white dark:bg-slate-900 border hairline-border p-6 rounded-none shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent -rotate-45 translate-x-10 -translate-y-10"></div>

              <h2 className="text-2xl font-black text-secondary dark:text-white mb-2 uppercase tracking-widest">Request Briefing</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-12">Confidential & Direct</p>

              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2 block">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border hairline-border px-4 py-3 text-xs font-bold focus:outline-none focus:border-accent transition-all dark:text-white rounded-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2 block">Work Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border hairline-border px-4 py-3 text-xs font-bold focus:outline-none focus:border-accent transition-all dark:text-white rounded-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2 block">Brief Context</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.context}
                      onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border hairline-border px-4 py-3 text-xs font-bold focus:outline-none focus:border-accent transition-all dark:text-white rounded-none resize-none"
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="w-full bg-secondary text-white py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-accent transition-all shadow-md rounded-none">
                  Submit Request &rarr;
                </button>

                <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-6">
                  Response within 24 Hours
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WorkWithMe;