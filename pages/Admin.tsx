import React, { useState, useEffect } from 'react';
import { MOCK_POSTS } from '../constants';
import MarkdownRenderer from '../components/MarkdownRenderer';

const Admin: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    // Form State
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState<any>('Market Strategy & GTM');
    const [files, setFiles] = useState<FileList | null>(null);
    const [generatedCode, setGeneratedCode] = useState('');

    // SEO & Metadata State
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDesc, setMetaDesc] = useState('');
    const [focusKeyword, setFocusKeyword] = useState('');
    const [tags, setTags] = useState('');

    // Publishing State
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishStatus, setPublishStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [publishMessage, setPublishMessage] = useState('');

    // Auto-generate slug from title if empty
    useEffect(() => {
        if (!slug && title) {
            setSlug(title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
        }
    }, [title, slug]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === '120Fathya') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid Access PIN');
        }
    };

    const generateJsonLd = (post: any) => {
        return {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.seo?.meta_title || post.title,
            "description": post.seo?.meta_description || post.excerpt,
            "image": post.featured_image_url,
            "author": {
                "@type": "Person",
                "name": "Roup Purohim",
                "url": "https://crackership.com"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Crackership",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://crackership.com/logo.png"
                }
            },
            "datePublished": post.created_at,
            "keywords": post.seo?.tags?.join(', ')
        };
    };

    const handleGenerate = () => {
        const keywordArray = tags.split(',').map(t => t.trim()).filter(t => t);

        const newPost: any = {
            id: Math.floor(Math.random() * 10000),
            title,
            slug: slug,
            excerpt,
            content,
            category,
            lang: 'en',
            status: 'published',
            created_at: new Date().toISOString().split('T')[0],
            featured_image_url: files && files[0] ? `/${files[0].name}` : '/placeholder.jpg',
            seo: {
                meta_title: metaTitle || title,
                meta_description: metaDesc || excerpt,
                focus_keyword: focusKeyword,
                tags: keywordArray
            }
        };

        // Generate JSON-LD
        newPost.seo.json_ld = generateJsonLd(newPost);

        const codeSnippet = `
  {
    id: ${newPost.id},
    title: "${newPost.title}",
    slug: "${newPost.slug}",
    excerpt: "${newPost.excerpt}",
    content: \`
${newPost.content}
    \`,
    category: "${newPost.category}",
    lang: 'en',
    status: 'published',
    created_at: "${newPost.created_at}",
    featured_image_url: "${newPost.featured_image_url}",
    seo: {
      meta_title: "${newPost.seo.meta_title}",
      meta_description: "${newPost.seo.meta_description}",
      focus_keyword: "${newPost.seo.focus_keyword}",
      tags: ${JSON.stringify(newPost.seo.tags)},
      json_ld: ${JSON.stringify(newPost.seo.json_ld, null, 2)}
    }
  },`;

        setGeneratedCode(codeSnippet);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedCode);
        alert('Code copied! Now paste it into src/constants.tsx');
    };

    const handlePublish = async () => {
        if (!title || !slug || !content || !category) {
            setPublishMessage('Please fill in all required fields (Title, Slug, Content, Category).');
            setPublishStatus('error');
            return;
        }

        setIsPublishing(true);
        setPublishStatus('idle');

        const keywordArray = tags.split(',').map(t => t.trim()).filter(t => t);

        let imageUrl = '/placeholder.jpg';
        if (files && files[0]) {
            const formData = new FormData();
            formData.append('file', files[0]);

            try {
                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });
                const uploadData = await uploadRes.json();
                if (uploadData.success) {
                    imageUrl = `/cdn-cgi/imagedelivery/${uploadData.key}`;
                } else {
                    throw new Error(uploadData.error || 'Image upload failed');
                }
            } catch (uploadError: any) {
                setPublishStatus('error');
                setPublishMessage(`Image upload error: ${uploadError.message}`);
                setIsPublishing(false);
                return;
            }
        }

        const postData = {
            title,
            slug,
            excerpt,
            content,
            category,
            lang: 'en',
            status: 'published',
            featured_image_url: imageUrl,
            meta_title: metaTitle || title,
            meta_description: metaDesc || excerpt,
            focus_keyword: focusKeyword,
            tags: keywordArray,
            json_ld: {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": metaTitle || title,
                "description": metaDesc || excerpt,
                "author": {
                    "@type": "Person",
                    "name": "Roup Purohim"
                }
            }
        };

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            });

            const result: { success: boolean; id?: number; error?: string } = await response.json();

            if (result.success) {
                setPublishStatus('success');
                setPublishMessage(`Article published successfully! ID: ${result.id}`);
                // Reset form
                setTitle('');
                setSlug('');
                setExcerpt('');
                setContent('');
                setMetaTitle('');
                setMetaDesc('');
                setFocusKeyword('');
                setTags('');
                setGeneratedCode('');
            } else {
                setPublishStatus('error');
                setPublishMessage(result.error || 'Failed to publish article.');
            }
        } catch (err: any) {
            setPublishStatus('error');
            setPublishMessage(`Network error: ${err.message}`);
        } finally {
            setIsPublishing(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
                <div className="bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700 w-full max-w-md">
                    <h1 className="text-2xl font-black text-white mb-6 uppercase tracking-widest text-center">System Access</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="Enter PIN"
                            className="w-full bg-slate-900 border border-slate-700 rounded p-4 text-white text-center tracking-[1em] focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                        {error && <p className="text-red-500 text-xs text-center font-bold">{error}</p>}
                        <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded uppercase tracking-widest transition-colors">
                            Unlock Console
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <header className="bg-slate-900 text-white py-6 border-b border-slate-800 px-6 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <h1 className="font-black uppercase tracking-widest text-emerald-400">Content Generator Console</h1>
                    <button onClick={() => setIsAuthenticated(false)} className="text-xs font-bold text-slate-400 hover:text-white uppercase">Logout</button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* EDITOR COLUMN */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                        <h2 className="text-lg font-black text-slate-700 dark:text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                            <span className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center text-white text-sm">✎</span>
                            Article Details
                        </h2>

                        <div className="space-y-8">
                            {/* BASIC INFO SECTION */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                                    <span className="text-emerald-500">📝</span>
                                    <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Basic Information</span>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-2">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 p-4 rounded-lg text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white font-semibold transition-all"
                                        placeholder="e.g. The Future of Agronomy"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-2">
                                            Slug (URL) <span className="text-emerald-500 text-[10px] font-normal">auto-generated</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">/</span>
                                            <input
                                                value={slug}
                                                onChange={e => setSlug(e.target.value)}
                                                className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 p-3 pl-7 rounded-lg text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white font-mono transition-all"
                                                placeholder="article-url-slug"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">Category <span className="text-red-500">*</span></label>
                                        <select
                                            value={category}
                                            onChange={e => setCategory(e.target.value)}
                                            className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 p-3 rounded-lg text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white cursor-pointer transition-all"
                                        >
                                            <option>Market Strategy & GTM</option>
                                            <option>Demand Creation Strategy</option>
                                            <option>AI-Driven Agribusiness</option>
                                            <option>Crackership Agronomist</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">Excerpt (Short Summary)</label>
                                    <textarea
                                        value={excerpt}
                                        onChange={e => setExcerpt(e.target.value)}
                                        className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 p-3 rounded-lg text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white h-20 resize-none transition-all"
                                        placeholder="Brief summary that appears in article cards..."
                                    />
                                    <p className="text-[10px] text-slate-400 mt-1">Recommended: 150-200 characters</p>
                                </div>
                            </div>

                            {/* MEDIA SECTION */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                                    <span className="text-emerald-500">🖼️</span>
                                    <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Featured Image</span>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
                                    <input
                                        type="file"
                                        onChange={e => setFiles(e.target.files)}
                                        className="w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 cursor-pointer"
                                        accept="image/*"
                                    />
                                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-3 font-bold flex items-center justify-center gap-1">
                                        <span>💡</span> Remember to upload the file to <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded">public/</code> folder
                                    </p>
                                </div>
                            </div>

                            {/* SEO SECTION */}
                            <div className="space-y-5">
                                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center gap-2">
                                        <span className="text-emerald-500">🔍</span>
                                        <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">SEO & Metadata</span>
                                    </div>
                                    <span className="text-[9px] font-black bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2 py-1 rounded-full uppercase">RankMath Style</span>
                                </div>

                                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 border border-emerald-200 dark:border-emerald-900 rounded-lg p-5 space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
                                            🎯 Focus Keyword
                                        </label>
                                        <input
                                            value={focusKeyword}
                                            onChange={e => setFocusKeyword(e.target.value)}
                                            className="w-full bg-white dark:bg-slate-800 border-2 border-emerald-200 dark:border-emerald-800 p-3 rounded-lg text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white transition-all"
                                            placeholder="Primary keyword for SEO targeting"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2">Meta Title</label>
                                        <input
                                            value={metaTitle}
                                            onChange={e => setMetaTitle(e.target.value)}
                                            className="w-full bg-white dark:bg-slate-800 border-2 border-emerald-200 dark:border-emerald-800 p-3 rounded-lg text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white transition-all"
                                            placeholder="SEO Title (max 60 chars)"
                                        />
                                        <p className="text-[10px] text-emerald-600 dark:text-emerald-500 mt-1">{metaTitle.length}/60 characters</p>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2">Tags / Keywords</label>
                                        <input
                                            value={tags}
                                            onChange={e => setTags(e.target.value)}
                                            className="w-full bg-white dark:bg-slate-800 border-2 border-emerald-200 dark:border-emerald-800 p-3 rounded-lg text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white transition-all"
                                            placeholder="agribusiness, gtm, strategy"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2">Meta Description</label>
                                        <textarea
                                            value={metaDesc}
                                            onChange={e => setMetaDesc(e.target.value)}
                                            className="w-full bg-white dark:bg-slate-800 border-2 border-emerald-200 dark:border-emerald-800 p-3 rounded-lg text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white h-20 resize-none transition-all"
                                            placeholder="Compelling description for search results..."
                                        />
                                        <p className="text-[10px] text-emerald-600 dark:text-emerald-500 mt-1">{metaDesc.length}/160 characters</p>
                                    </div>
                                </div>
                            </div>

                            {/* CONTENT SECTION */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                                    <span className="text-emerald-500">📄</span>
                                    <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Article Content</span>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Content (Markdown) <span className="text-red-500">*</span></label>
                                        <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Supports Markdown</span>
                                    </div>
                                    <textarea
                                        value={content}
                                        onChange={e => setContent(e.target.value)}
                                        className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 p-4 rounded-lg text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white h-80 font-mono text-xs leading-relaxed transition-all"
                                        placeholder="# Article Title&#10;&#10;Introduction paragraph...&#10;&#10;## Section 1&#10;&#10;Content here..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={handleGenerate}
                                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded uppercase tracking-widest transition-all"
                            >
                                Preview Code
                            </button>
                            <button
                                onClick={handlePublish}
                                disabled={isPublishing}
                                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded uppercase tracking-widest transition-all shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPublishing ? 'Publishing...' : 'Publish to Blog'}
                            </button>
                        </div>

                        {publishStatus !== 'idle' && (
                            <div className={`mt-4 p-4 rounded text-sm font-bold ${publishStatus === 'success'
                                ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500'
                                : 'bg-red-500/20 text-red-500 border border-red-500'
                                }`}>
                                {publishMessage}
                            </div>
                        )}
                    </div>
                </div>

                {/* PREVIEW & OUPUT COLUMN */}
                <div className="space-y-8">
                    {generatedCode && (
                        <div className="bg-slate-900 p-6 rounded-lg shadow-2xl border border-emerald-500 relative">
                            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4">Generated JSON Code</h3>
                            <pre className="text-xs text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed h-64 overflow-y-auto custom-scrollbar">
                                {generatedCode}
                            </pre>
                            <button
                                onClick={copyToClipboard}
                                className="absolute top-4 right-4 bg-emerald-500 text-slate-900 text-[10px] font-black uppercase px-3 py-1 rounded hover:bg-white transition-colors"
                            >
                                Copy Code
                            </button>
                        </div>
                    )}

                    <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 opacity-50 pointer-events-none">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Live Preview (Simple)</h3>
                        <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-4">{title || 'Untitled Post'}</h1>
                        <p className="text-sm font-bold text-emerald-600 mb-4">{focusKeyword ? `Focus: ${focusKeyword}` : ''}</p>
                        <div className="prose dark:prose-invert">
                            <MarkdownRenderer content={content} />
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
};

export default Admin;
