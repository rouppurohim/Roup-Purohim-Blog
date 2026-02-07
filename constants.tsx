import { Post, Resource, Testimonial, Author } from './types';

export const THEME = {
  primary: '#1F3D2B',
  secondary: '#1C2E4A',
  accent: '#E67E22',
  background: '#F4F6F7'
};

export const AUTHOR: import('./types').Author = {
  name: "Roup Purohim",
  role: "Crackership Strategist",
  role_detail: "Agribusiness GTM Architect",
  bio: "Roup Purohim leverages two decades of regional audits and corporate GTM leadership to architect resilient agribusiness systems across the Asia-Pacific region.",
  avatar_url: "/roup.png",
  social: {
    linkedin: "https://linkedin.com/in/rouppurohim",
    twitter: "https://twitter.com/rouppurohim",
    email: "mailto:contact@rouppurohim.com"
  }
};

export const MOCK_POSTS: Post[] = [
  {
    id: 999,
    title: "The Crackership Methodology: From Field Trials to Boardroom Strategy",
    seo: {
      meta_title: "Crackership Methodology: Agribusiness GTM Strategy Audit",
      meta_description: "Learn how to bridge the gap between technical agronomy and commercial execution. A guide for Regional Managers.",
      focus_keyword: "Crackership Methodology",
      tags: ["Agribusiness", "GTM Strategy", "Sales"],
      json_ld: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Crackership Methodology: Agribusiness GTM Strategy Audit",
        "author": {
          "@type": "Person",
          "name": "Roup Purohim"
        }
      }
    },
    slug: "crackership-methodology-verification",
    excerpt: "The gap between technical agronomy and commercial execution is where most agribusinesses fail. It’s not a lack of product innovation; it’s a lack of translation.",
    content: `
The gap between **technical agronomy** and **commercial execution** is where most agribusinesses fail. It’s not a lack of product innovation; it’s a lack of *translation*.

## The Core Disconnect

In my two decades of auditing regional markets, I've observed a recurring pattern:
1.  R&D teams develop superior formulations.
2.  Marketing creates high-level value propositions.
3.  **The Field Team serves as a bottleneck**, unable to translate technical superiority into commercial velocity.

> "Your product is only as good as the agronomist's ability to explain its ROI to a distributor who has 50 other products on their shelf."

### Why "Good Enough" is the Enemy
When a field team settles for "good enough" demos, they trigger a chain reaction of mediocrity:
*   **Low Conversion Rates**: Farmers don't see a visible difference.
*   **Stagnant Inventory**: Retailers lose confidence in the turnover.
*   **Margin Erosion**: Sales teams resort to price-cutting to move volume.

## The Crackership Solution

The **Crackership Methodology** isn't just about training; it's about re-architecting the DNA of your commercial team.

### 1. Technical Authority
We don't just teach product knowledge; we teach *diagnosis*. An agronomist must be a doctor, not a brochure reader.
*   **Symptom Identification**: Rapidly identifying biotic vs. abiotic stress.
*   **Solution Mapping**: Prescribing the *exact* dosage and tank mix logic.

### 2. Commercial Literacy
Every technical action must have a commercial reaction.
-   **For the Farmer**: Lower cost per kg of yield.
-   **For the Retailer**: Higher inventory velocity.
-   **For the Principal**: Brand loyalty and reduced churn.

## Strategic Implementation

Implementing this methodology requires a phased approach:

1.  **Audit**: Assess the current "Field IQ" of your team.
2.  **Calibration**: Standardize the demo protocols.
3.  **Deployment**: Execute regional "Show & Tell" roadshows.

If you are ready to bridge the gap, the time to act is now.
    `,
    category: "Crackership Agronomist",
    lang: 'en',
    status: 'published',
    created_at: "2024-03-23",
    featured_image_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 1,
    title: "The 2025 AI-Marketing Pivot: Predicting Demand in the Agrochemical Sector",
    slug: "ai-marketing-pivot-2025",
    content: "The intersection of machine learning and seasonal agro-input demand is creating unprecedented opportunities for efficiency. By leveraging predictive models, we can reduce inventory bloat by up to 30%.",
    excerpt: "The intersection of machine learning and seasonal agro-input demand is creating unprecedented opportunities for efficiency.",
    category: "AI-Driven Agribusiness",
    lang: 'en',
    status: 'published',
    created_at: "2024-03-22",
    featured_image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Formulation Shift: Transitioning from WP to WG for Market Longevity",
    slug: "wp-to-wg-formulation-shift",
    content: "Analyzing the logistical and safety advantages of Water Dispersible Granules over traditional Wettable Powders. This technical transition is the foundation of modern field safety standards.",
    excerpt: "Analyzing the logistical and safety advantages of Water Dispersible Granules over traditional Wettable Powders.",
    category: "Demand Creation Strategy",
    lang: 'en',
    status: 'published',
    created_at: "2024-03-21",
    featured_image_url: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Southeast Asian Market Expansion: A Blueprint for GTM Execution",
    slug: "sea-market-expansion-blueprint",
    content: "Navigating complex regulatory environments and building resilient distributor networks requires a mix of local field insight and global strategic governance.",
    excerpt: "Navigating complex regulatory environments and building resilient distributor networks requires a mix of local field insight and global strategic governance.",
    category: "Market Strategy & GTM",
    lang: 'en',
    status: 'published',
    created_at: "2024-03-20",
    featured_image_url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Leadership in Agronomy: Bridging Technical Skill with Business Mastery",
    slug: "leadership-agronomy-bridge",
    content: "Agronomists must evolve into strategic business partners. The Crackership platform is designed to facilitate this transformation from the field to the boardroom.",
    excerpt: "Agronomists must evolve into strategic business partners. The Crackership platform is designed to facilitate this transformation.",
    category: "Crackership Agronomist",
    lang: 'en',
    status: 'published',
    created_at: "2024-03-19",
    featured_image_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "Optimizing AI Prompts for Agribusiness Marketing",
    slug: "ai-prompts-agri-marketing",
    content: "How generative AI is changing the way we diagnose crop issues and communicate solutions to farmers in real-time. The era of the digital agronomist is here.",
    excerpt: "How generative AI is changing the way we diagnose crop issues and communicate solutions to farmers in real-time.",
    category: "AI-Driven Agribusiness",
    lang: 'en',
    status: 'published',
    created_at: "2024-03-18",
    featured_image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    title: "Secondary Market Penetration: Tactical Distribution Strategies",
    slug: "distributive-power-secondary-markets",
    content: "Market penetration isn't just about price; it's about the technical validation of your portfolio in the eyes of the key opinion leaders at the farm level.",
    excerpt: "Market penetration isn't just about price; it's about the technical validation of your portfolio in the eyes of the key opinion leaders.",
    category: "Market Strategy & GTM",
    lang: 'en',
    status: 'published',
    created_at: "2024-03-17",
    featured_image_url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800"
  }
];

export const MOCK_RESOURCES: Resource[] = [
  // LITERATURE
  {
    id: 1,
    title: "The Crackership Strategy: Mastering Agribusiness GTM",
    description: "The definitive guide to bridging the gap between technical agronomy and commercial execution. Includes 50+ case studies from SEA markets.",
    type: "Book",
    category: "Literature",
    link: "#",
    image_url: "/ebook-cracekership.png"
  },
  {
    id: 2,
    title: "Field Force Blueprint: From Activity to Velocity",
    description: "A tactical ebook for sales managers to optimize agronomist routing and demo effectiveness.",
    type: "Ebook",
    category: "Literature",
    link: "#",
    image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600"
  },

  // TECHNOLOGY
  {
    id: 3,
    title: "AgroDemand Predictor v2.0",
    description: "SaaS platform forecasting regional product demand shifts based on micro-climate data and pest outbreak patterns.",
    type: "SaaS",
    category: "Technology",
    link: "#",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 4,
    title: "FieldAudit AI",
    description: "Custom GPT agent designed to analyze field technician reports and score them against the Crackership commercial standards.",
    type: "CustomGPT",
    category: "Technology",
    link: "#",
    image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600"
  },

  // EDUCATION
  {
    id: 5,
    title: "The Crackership Academy: 12-Week Accelerator",
    description: "Intensive workshop series for Regional Managers. Modules cover Strategic Pricing, Channel Conflict, and Technical Storytelling.",
    type: "Training",
    category: "Education",
    link: "#",
    image_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 6,
    title: "GTM Simulation Workshop",
    description: "Role-play based training where teams compete to launch a new molecule in a saturated market.",
    type: "Training",
    category: "Education",
    link: "#",
    image_url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600"
  }
];


export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Adrian S.",
    position: "Regional Director",
    company: "Global AgriCorp",
    quote: "Roup's depth of knowledge in agrochemical formulations is unparalleled. He doesn't just give advice; he provides a roadmap to growth.",
    avatar_url: "https://i.pravatar.cc/150?u=adrian"
  },
  {
    id: 2,
    name: "Sarah Chen",
    position: "Founder",
    company: "EcoPest Solutions",
    quote: "The Crackership platform helped our agronomists bridge the gap between technical skill and commercial strategy.",
    avatar_url: "https://i.pravatar.cc/150?u=sarah"
  }
];

export const MOCK_TIMELINE: import('./types').TimelineItem[] = [
  {
    year: "2024 - Present",
    role: "Crackership Strategist",
    company: "Independent Advisory",
    description: "Architecting GTM frameworks for MNCs entering the Southeast Asian agrochemical market."
  },
  {
    year: "2018 - 2023",
    role: "Regional Commercial Director",
    company: "Asia-Pac AgriSolutions",
    description: "Led a team of 150+ agronomists to achieve $200M in annual revenue across 4 key territories."
  },
  {
    year: "2012 - 2018",
    role: "Head of Marketing",
    company: "Nusantara Crop Science",
    description: "Pioneered the 'Digital Agronomist' initiative, integrating mobile CRM with field activities."
  },
  {
    year: "2005 - 2012",
    role: "Senior Agronomist",
    company: "Global Chem",
    description: "Managed technical trials for rice and corn portfolios, establishing the efficacy protocols used today."
  },
  {
    year: "2003",
    role: "Field Technical Officer",
    company: "Start of Career",
    description: "Began as a boots-on-the-ground scout, learning the raw realities of pest pressure and farmer psychology."
  }
];

export const MOCK_RESULTS: import('./types').ResultMetric[] = [
  { metric: "15%", label: "Market Share Growth", project: "Bio-stimulant Launch", desc: "Orchestrated demand via 500+ localized field trials and kiosk roadshows." },
  { metric: "100T", label: "Annual Volume Shift", project: "WG Conversion Strategy", desc: "Successfully transitioned channel mindset from cheap WP to premium WG formulations." },
  { metric: "40%", label: "Channel Efficiency", project: "Retailer Network Audit", desc: "Optimized stock rotation across 12 provinces via predictive demand modeling." }
];
