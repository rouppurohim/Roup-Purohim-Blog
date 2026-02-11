import React, { useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { MOCK_POSTS, AUTHOR } from '../constants';
import { useApp } from '../context/AppContext';
import SEO from '../components/SEO';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Giscus from '../components/Giscus';

const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useApp();
  const [post, setPost] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // Try fetching from API first
        const response = await fetch(`/api/posts/${slug}`);
        const data: { success: boolean; data: any } = await response.json();

        if (data.success && data.data) {
          setPost(data.data);
        } else {
          // Fallback to MOCK_POSTS
          const mockPost = MOCK_POSTS.find(p => p.slug === slug);
          setPost(mockPost || null);
        }
      } catch (error) {
        console.error("Failed to fetch post:", error);
        // Fallback to MOCK_POSTS on error
        const mockPost = MOCK_POSTS.find(p => p.slug === slug);
        setPost(mockPost || null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (post) window.scrollTo(0, 0);
  }, [post]);

  const readingTime = useMemo(() => {
    if (!post) return 0;
    return Math.ceil((post.content.length + 500) / 200);
  }, [post]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return MOCK_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2);
  }, [post]);

  if (loading) return <div className="py-40 text-center font-black uppercase text-metadata animate-pulse">Loading Analysis...</div>;
  if (!post) return <div className="py-40 text-center font-black uppercase text-metadata">Analysis Not Found.</div>;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <article className="bg-background dark:bg-darkbg min-h-screen">
      <SEO
        title={post.seo?.meta_title || post.title}
        description={post.seo?.meta_description || post.content.slice(0, 160)}
        image={post.featured_image_url}
        article={true}
        keywords={post.seo?.tags?.join(', ') || `${post.category}, Agribusiness, Strategy, Roup Purohim, Crackership`}
        focusKeyword={post.seo?.focus_keyword}
        jsonLd={post.seo?.json_ld}
      />
      <header className="pt-20 pb-8 md:pb-10 border-b hairline-border bg-white dark:bg-slate-900">
        <div className="max-w-[720px] mx-auto px-4 md:px-6">
          <nav className="mb-12 flex items-center gap-4 text-metadata text-slate-400">
            <Link to="/insights" className="hover:text-accent transition-colors">Archive</Link>
            <span className="opacity-30">/</span>
            <span className="text-accent tracking-widest">{post.category}</span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-black text-secondary dark:text-white leading-[1] mb-12 tracking-tighter uppercase">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-12 border-t hairline-border pt-12">
            <div className="flex items-center gap-6">
              <img src={AUTHOR.avatar_url} alt={AUTHOR.name} className="w-14 h-14 object-cover shadow-lg border-2 border-white dark:border-slate-700 rounded-none" />
              <div>
                <span className="text-xs font-black uppercase tracking-widest block text-secondary dark:text-white leading-none">{AUTHOR.name}</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-accent mt-1 block">{AUTHOR.role}</span>
              </div>
            </div>
            <div className="h-10 w-px bg-slate-100 dark:bg-slate-800 hidden md:block"></div>
            <div className="text-metadata text-slate-400 flex gap-12 font-black">
              <span className="flex flex-col gap-1 tracking-widest"><span className="text-xs opacity-50 uppercase">Date</span>{post.created_at}</span>
              <span className="flex flex-col gap-1 tracking-widest"><span className="text-xs opacity-50 uppercase">Read Time</span>{readingTime} MIN AUDIT</span>
            </div>
          </div>

          {/* Tags / Keywords */}
          {post.seo?.tags && post.seo.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8">
              {post.seo.tags.slice(0, 5).map((tag, index) => (
                <span
                  key={index}
                  className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="max-w-[720px] mx-auto px-4 md:px-6 py-8 md:py-8">
        <main>
          <div className="mb-10 grayscale hover:grayscale-0 transition-all duration-1000 border hairline-border shadow-sm rounded-none overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img src={post.featured_image_url} className="w-full aspect-[21/9] object-cover" alt={post.title} loading="lazy" />
          </div>

          {/* Social Share Stickiness */}
          <div className="flex gap-4 mb-12 flex-wrap">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 self-center mr-4">Share Briefing:</span>
            {[
              { name: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, color: 'hover:text-[#0077b5]' },
              { name: 'X', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`, color: 'hover:text-[#000000] dark:hover:text-white' },
              { name: 'Threads', url: `https://www.threads.net/intent/post?text=${encodeURIComponent(post.title + ' ' + currentUrl)}`, color: 'hover:text-[#000000] dark:hover:text-white' },
              { name: 'WhatsApp', url: `https://wa.me/?text=${encodeURIComponent(post.title + ' ' + currentUrl)}`, color: 'hover:text-[#25D366]' }
            ].map(platform => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs font-black uppercase tracking-widest border hairline-border px-6 py-3 transition-colors ${platform.color} hover:border-current`}
              >
                {platform.name}
              </a>
            ))}
          </div>

          <div className="article-content prose prose-slate dark:prose-invert prose-lg md:prose-xl max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-emerald-600 hover:prose-a:text-emerald-500">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* LEAD MAGNET CTA: STRATEGIC BRIEFING */}
          <div id="ebook-download" className="my-12 p-6 md:p-8 bg-slate-50 dark:bg-slate-800 border hairline-border relative overflow-hidden group">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4 block">Free Resource</span>
                <h4 className="text-2xl font-black text-secondary dark:text-white mb-4 uppercase tracking-tight">The Cracking FA Code.</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-loose font-medium mb-6">
                  Ubah FA Dari “Orang Lapangan” Menjadi Strategic Adoption Driver. Ebook ini adalah peta jalan menuju FA yang lebih efektif, terukur, dan dihargai.
                </p>
                <Link to="/playbook" className="bg-secondary text-white px-8 py-3 text-[10px] font-black uppercase tracking-[0.25em] hover:bg-accent transition-all shadow-md rounded-none inline-block">
                  Download PDF
                </Link>
              </div>
              <div className="w-full md:w-48 aspect-[3/4] bg-white dark:bg-slate-900 shadow-xl border hairline-border flex items-center justify-center relative transform group-hover:-translate-y-2 transition-transform duration-500">
                <img src="/ebook-cover.png" alt="Playbook Cover" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Related Topics / Tags Section */}
          {post.seo?.tags && post.seo.tags.length > 0 && (
            <div className="my-10 p-5 md:p-6 bg-slate-50 dark:bg-slate-800/50 border hairline-border">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-emerald-500"></span>
                Related Topics
              </h4>
              <div className="flex flex-wrap gap-3">
                {post.seo.tags.map((tag, index) => (
                  <Link
                    key={index}
                    to={`/insights?tag=${encodeURIComponent(tag)}`}
                    className="text-xs font-bold px-5 py-2.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm hover:shadow"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
              {post.seo.focus_keyword && (
                <p className="mt-6 text-[10px] text-slate-400 uppercase tracking-widest">
                  Focus: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{post.seo.focus_keyword}</span>
                </p>
              )}
            </div>
          )}

          <div className="mt-12 p-6 md:p-6 border hairline-border bg-white dark:bg-slate-900 rounded-none shadow-sm hover:shadow-md transition-shadow duration-500">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <img src={AUTHOR.avatar_url} alt={AUTHOR.name} className="w-20 h-20 object-cover border border-white dark:border-slate-800 shrink-0 filter grayscale hover:grayscale-0 transition-all duration-500 rounded-none shadow-sm" />
              <div>
                <h4 className="text-lg font-black text-secondary dark:text-white mb-2 uppercase tracking-tighter">Private Advisory</h4>
                <p className="text-[10px] font-black uppercase text-accent tracking-widest mb-4">Expertise powered by the {AUTHOR.role}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans mb-8">
                  {AUTHOR.bio}
                </p>
                <Link to="/work-with-me" className="inline-block border hairline-border hover:border-accent text-secondary dark:text-white px-8 py-3 text-[10px] font-black uppercase tracking-[0.25em] hover:text-accent transition-all rounded-none">
                  Initiate Strategic Audit &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <div className="mt-12 pt-10 border-t hairline-border">
              <span className="text-metadata text-accent mb-12 block">Continuing Intelligence</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {relatedPosts.map(rp => (
                  <Link to={`/${rp.slug}`} key={rp.id} className="group block">
                    <div className="aspect-video bg-slate-100 dark:bg-slate-800 mb-6 grayscale group-hover:grayscale-0 transition-all">
                      <img src={rp.featured_image_url} alt={rp.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <span className="text-xs font-black text-accent uppercase tracking-widest mb-3 block">{rp.category}</span>
                    <h4 className="text-xl font-black text-secondary dark:text-white group-hover:text-primary transition-colors leading-tight uppercase tracking-tight">{rp.title}</h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Giscus Comments */}
          {/* DISCUSSION CTA: LINKEDIN */}
          <div className="mt-16 p-8 md:p-8 bg-white dark:bg-slate-900 border hairline-border shadow-sm flex flex-col md:flex-row items-center gap-8 md:gap-10">
            <div className="w-16 h-16 bg-[#0077b5] text-white flex items-center justify-center text-3xl rounded-none shadow-lg shrink-0">
              in
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-xl font-black text-secondary dark:text-white uppercase tracking-tight mb-2">Join the Conversation</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-medium">
                Discuss this strategy with 15,000+ agribusiness professionals on LinkedIn. Share your field perspective.
              </p>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#0077b5] text-white px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#006097] transition-all shadow-md"
              >
                Discuss on LinkedIn &rarr;
              </a>
            </div>
          </div>
        </main>
      </div>
    </article>
  );
};

export default PostDetail;
