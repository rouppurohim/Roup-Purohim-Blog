import React, { useEffect, useRef } from 'react';

interface GiscusProps {
    repo: string;
    repoId: string;
    category: string;
    categoryId: string;
    mapping?: 'pathname' | 'url' | 'title' | 'og:title';
    theme?: 'light' | 'dark' | 'preferred_color_scheme';
}

const Giscus: React.FC<GiscusProps> = ({
    repo,
    repoId,
    category,
    categoryId,
    mapping = 'pathname',
    theme = 'preferred_color_scheme',
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current || ref.current.hasChildNodes()) return;

        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute('data-repo', repo);
        script.setAttribute('data-repo-id', repoId);
        script.setAttribute('data-category', category);
        script.setAttribute('data-category-id', categoryId);
        script.setAttribute('data-mapping', mapping);
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'top');
        script.setAttribute('data-theme', theme);
        script.setAttribute('data-lang', 'en');
        script.setAttribute('data-loading', 'lazy');
        script.crossOrigin = 'anonymous';
        script.async = true;

        ref.current.appendChild(script);
    }, [repo, repoId, category, categoryId, mapping, theme]);

    return (
        <div className="mt-20 pt-20 border-t hairline-border">
            <h3 className="text-xl font-black uppercase tracking-widest text-secondary dark:text-white mb-10">Discussion</h3>
            <div ref={ref} className="giscus-wrapper" />
        </div>
    );
};

export default Giscus;
