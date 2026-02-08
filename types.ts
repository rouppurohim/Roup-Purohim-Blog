import React from 'react';

export type Language = 'en' | 'id';

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: 'Market Strategy & GTM' | 'Demand Creation Strategy' | 'AI-Driven Agribusiness' | 'Crackership Agronomist';
  lang: Language;
  status: 'draft' | 'published';
  created_at: string;
  featured_image_url: string;
  seo?: {
    meta_title?: string;
    meta_description?: string;
    focus_keyword?: string;
    tags?: string[];
    json_ld?: any;
  };
}

export interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'Book' | 'Ebook' | 'SaaS' | 'CustomGPT' | 'Training' | 'Career Platform';
  category: 'Literature' | 'Technology' | 'Education';
  link: string;
  image_url: string;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  quote: string;
  avatar_url: string;
}




export interface Author {
  name: string;
  role: string;
  role_detail: string;
  bio: string;
  avatar_url: string;
  social: {
    linkedin?: string;
    instagram?: string;
    whatsapp?: string;
    email?: string;
  };
}

export interface Expertise {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface TimelineItem {
  year: string;
  role: string;
  company: string;
  description: string;
}

export interface ResultMetric {
  metric: string;
  label: string;
  project: string;
  desc: string;
}