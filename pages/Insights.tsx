import React, { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import { MOCK_POSTS } from '../constants';
import { useApp } from '../context/AppContext';

const Insights: React.FC = () => {
  const { name: categoryName } = useParams<{ name?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [visibleCount, setVisibleCount] = useState(6);
  const { t } = useApp();

  const categories = [
    'Market Strategy & GTM',
    'Demand Creation Strategy',
    'AI-Driven Agribusiness',
    'Crackership Agronomist'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) setSearchParams({ q: searchTerm });
    else setSearchParams({});
  };

  const filteredPosts = useMemo(() => {
    let posts = MOCK_POSTS;
    const query = searchParams.get('q');
    if (categoryName) {
      posts = posts.filter(p => p.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === categoryName.toLowerCase());
    }
    if (query) {
      const q = query.toLowerCase();
      posts = posts.filter(p => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q));
    }
    return posts;
  }, [categoryName, searchParams]);

  return (
    <div className="bg-background dark:bg-darkbg min-h-screen">
      <header className="pt-32 pb-20 border-b hairline-border bg-white dark:bg-slate-900">
        <div className="max-w-[1400px] mx-auto px-6">
          <span className="text-metadata text-accent mb-6 block">Blog Archive</span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.95] text-secondary dark:text-white mb-12">
            Strategic <br />
            Blog <br />
            <span className="text-primary italic dark:text-accent">Hub.</span>
          </h1>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 p-0 mt-12">
            <div className="flex flex-wrap gap-4">
              <Link to="/insights" className={`text-[10px] font-black uppercase tracking-widest px-8 py-4 border transition-all rounded-none ${!categoryName ? 'bg-primary text-white border-primary' : 'border-hairline text-slate-400 hover:border-slate-400'}`}>
                All
              </Link>
              {categories.map(cat => {
                const slug = cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                return (
                  <Link key={cat} to={`/category/${slug}`} className={`text-[10px] font-black uppercase tracking-widest px-8 py-4 border transition-all rounded-none ${categoryName === slug ? 'bg-primary text-white border-primary' : 'border-hairline text-slate-400 hover:border-slate-400'}`}>
                    {cat}
                  </Link>
                );
              })}
            </div>
            <form onSubmit={handleSearch} className="w-full lg:w-96 relative">
              <input
                type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="SEARCH BLOG..."
                className="w-full bg-slate-50 dark:bg-slate-800 border hairline-border rounded-none py-5 px-8 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-accent transition-all dark:text-white"
              />
            </form>
          </div>
        </div>
      </header>

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t hairline-border">
            {filteredPosts.slice(0, visibleCount).map((post) => (
              <article key={post.id} className="group bg-white dark:bg-slate-900 p-8 border-r border-b hairline-border hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-500 flex flex-col rounded-none">
                <div className="aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800 mb-10 grayscale group-hover:grayscale-0 transition-all duration-700 rounded-none border hairline-border">
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                  />
                </div>
                <div className="flex-grow">
                  <span className="text-[9px] font-black text-accent uppercase tracking-[0.4em] mb-4 block">{post.category}</span>
                  <h3 className="text-2xl font-black text-secondary dark:text-white mb-8 leading-tight group-hover:text-primary transition-colors uppercase tracking-tighter">
                    <Link to={`/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-10 line-clamp-3 font-serif italic">"{post.excerpt}"</p>
                </div>
                <div className="pt-8 border-t hairline-border flex justify-between items-center">
                  <Link to={`/${post.slug}`} className="text-metadata text-secondary dark:text-white group-hover:text-accent transition-colors font-black border-b border-current pb-1">
                    Read Article &rarr;
                  </Link>
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{post.created_at}</span>
                </div>
              </article>
            ))}
          </div>
          {visibleCount < filteredPosts.length && (
            <div className="text-center mt-16">
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="text-xs font-black uppercase tracking-[0.25em] border-2 border-secondary dark:border-white text-secondary dark:text-white px-12 py-5 hover:bg-secondary hover:text-white dark:hover:bg-white dark:hover:text-secondary transition-all rounded-none"
              >
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Insights;
