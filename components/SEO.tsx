import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  article?: boolean;
  keywords?: string;
  focusKeyword?: string;
  jsonLd?: any;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, article, keywords, focusKeyword, jsonLd }) => {
  const siteTitle = 'Roup Purohim | Crackership Strategist';
  const defaultDesc = "20+ Years of Strategic Agribusiness Excellence. GTM Execution & AI Integration.";
  const metaDesc = description || defaultDesc;
  const metaImage = image || "https://images.unsplash.com/photo-1560693271-4f995893d115?auto=format&fit=crop&q=80&w=1000";
  const siteUrl = "https://rouppurohim.com"; // Replace with actual domain
  const twitterHandle = "@roup_purohim"; // Replace with actual handle or remove

  // Combine focus keyword with other keywords
  const allKeywords = focusKeyword
    ? `${focusKeyword}, ${keywords || ''}`.replace(/, $/, '')
    : keywords;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <html lang="id" />
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={metaDesc} />
      {allKeywords && <meta name="keywords" content={allKeywords} />}
      <meta name="author" content="Roup Purohim" />
      <link rel="canonical" href={siteUrl} />

      {/* Geo-Targeting / Local SEO */}
      <meta name="geo.region" content="ID" />
      <meta name="geo.placename" content="Indonesia" />
      <meta name="geo.position" content="-6.2088;106.8456" />
      <meta name="ICBM" content="-6.2088, 106.8456" />
      <meta name="language" content="Indonesian" />
      <meta name="content-language" content="id-ID" />
      <meta httpEquiv="content-language" content="id-ID" />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={`${title} | ${siteTitle}`} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content="Roup Purohim Authority Hub" />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={`${title} | ${siteTitle}`} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImage} />

      {/* JSON-LD Schema */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
