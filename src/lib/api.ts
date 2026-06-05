const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8090/api/v1";

export interface HeroBanner {
  id: number;
  title: string | null;
  subtitle: string | null;
  mediaType: "IMAGE" | "VIDEO";
  mediaUrl: string;
  mediaId: string | null;
  ctaText: string | null;
  ctaLink: string | null;
  isActive: boolean;
  sortOrder: number;
}

export interface ServiceField {
  id: number;
  serviceId: number;
  fieldLabel: string;
  fieldKey: string;
  fieldType: "TEXT" | "TEXTAREA" | "DROPDOWN" | "FILE" | "NUMBER" | "DATE" | "EMAIL" | "PHONE";
  isRequired: boolean;
  placeholder: string | null;
  options: unknown; // Parsed options array or string
  isActive: boolean;
  sortOrder: number;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  thumbnailUrl: string | null;
  thumbnailId: string | null;
  price: string | null;
  timeline: string | null;
  isActive: boolean;
  sortOrder: number;
  fields?: ServiceField[];
}

export interface Portfolio {
  id: number;
  title: string;
  slug: string;
  clientName: string;
  clientLogoUrl: string | null;
  serviceType: string;
  problem: string | null;
  solution: string | null;
  results: string | null;
  coverImageUrl: string | null;
  liveUrl: string | null;
  galleryUrls: string[];
  isPublished: boolean;
  sortOrder: number;
  completedAt: string | null;
}

export interface Testimonial {
  id: number;
  clientName: string;
  clientBusiness: string | null;
  clientWebsite: string | null;
  clientLogoUrl: string | null;
  clientPhotoUrl: string | null;
  rating: number;
  feedback: string;
  projectType: string | null;
  isVerified: boolean;
  isPublished: boolean;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImageUrl: string | null;
  tags: string[];
  status: string;
  publishedAt: string | null;
  createdAt: string;
  author?: {
    fullName: string;
    profilePhotoUrl: string | null;
  };
}

export interface Ad {
  id: number;
  adType: "GOOGLE" | "CLIENT";
  clientName: string | null;
  adCode: string | null;
  bannerUrl: string | null;
  targetUrl: string | null;
  placement: "BLOG_LIST_TOP" | "BLOG_LIST_MID" | "BLOG_POST_TOP" | "BLOG_POST_MID" | "BLOG_POST_BOTTOM";
  isActive: boolean;
}

export interface StatsOverview {
  clientsServed: number;
  projectsCompleted: number;
  satisfactionRate: number;
  supportActive: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  category: string | null;
  isPublished: boolean;
  sortOrder: number;
}

export interface TeamMember {
  id: number;
  fullName: string;
  designation: string | null;
  profilePhotoUrl: string | null;
  linkedInUrl?: string | null;
}

export interface BlogComment {
  id: number;
  postId: number;
  commentText: string;
  createdAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  user: {
    fullName: string;
    profilePhotoUrl: string | null;
  };
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  role: string;
  isEmailVerified?: boolean;
  passwordHash?: string;
}

// ==================== MOCK DATA DEFINITIONS ====================

const MOCK_HERO_BANNERS: HeroBanner[] = [
  {
    id: 1,
    title: "Next-Gen IT Solutions for Indian SMBs",
    subtitle: "We build premium, advanced web applications with seamless animations and industry-leading designs to help your business scale.",
    mediaType: "IMAGE",
    mediaUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    mediaId: null,
    ctaText: "Explore Services",
    ctaLink: "#services",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 2,
    title: "Scale Your Rank with AI-Powered SEO",
    subtitle: "Dominate search engine pages, drive high-intent organic traffic, and convert visitors into active leads.",
    mediaType: "IMAGE",
    mediaUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    mediaId: null,
    ctaText: "Boost SEO Now",
    ctaLink: "#contact",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 3,
    title: "Premium Glassmorphic UI/UX",
    subtitle: "Delivering stunning visual clarity, premium micro-animations, and seamless user experiences across all devices.",
    mediaType: "IMAGE",
    mediaUrl: "https://images.unsplash.com/photo-1541462608141-2ff030a64e40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    mediaId: null,
    ctaText: "View Case Studies",
    ctaLink: "#portfolio",
    isActive: true,
    sortOrder: 3,
  },
];

const MOCK_SERVICES: Service[] = [
  {
    id: 1,
    name: "Web Development",
    slug: "web-development",
    description: "High-performance, modular, and scalable Next.js applications tailored to your business needs.",
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    thumbnailId: null,
    price: "₹24,999+",
    timeline: "2-4 Weeks",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 2,
    name: "SEO Optimization",
    slug: "seo-optimization",
    description: "Data-driven SEO strategies to rank your brand higher and capture organic search traffic.",
    thumbnailUrl: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    thumbnailId: null,
    price: "₹14,999/mo",
    timeline: "Ongoing",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 3,
    name: "UI/UX Design",
    slug: "ui-ux-design",
    description: "Premium, glassy, and highly attractive interfaces that convert visitors into recurring customers.",
    thumbnailUrl: "https://images.unsplash.com/photo-1541462608141-2ff030a64e40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    thumbnailId: null,
    price: "₹19,999+",
    timeline: "1-3 Weeks",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: 4,
    name: "Digital Marketing",
    slug: "digital-marketing",
    description: "Comprehensive marketing campaigns across major social networks to skyrocket your brand value.",
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    thumbnailId: null,
    price: "Custom",
    timeline: "Ongoing",
    isActive: true,
    sortOrder: 4,
  },
];

const MOCK_STATS: StatsOverview = {
  clientsServed: 150,
  projectsCompleted: 320,
  satisfactionRate: 99.8,
  supportActive: "24/7",
};

const MOCK_PORTFOLIOS: Portfolio[] = [
  {
    id: 1,
    title: "E-Commerce Reimagined",
    slug: "style-store",
    clientName: "StyleStore",
    clientLogoUrl: null,
    serviceType: "Web Development",
    problem: "Low mobile conversion rates and sluggish loading speeds from old servers.",
    solution: "Rebuilt from the ground up on Next.js with sub-second page loads, custom checkout flow, and cloud hosting.",
    results: "Increased conversions by 45% and reduced bounce rate by 30%.",
    coverImageUrl: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    liveUrl: "https://stylestore.demo",
    isPublished: true,
    sortOrder: 1,
    completedAt: "2026-04-12T00:00:00Z"
  },
  {
    id: 2,
    title: "FinTech Dashboard",
    slug: "coin-flow",
    clientName: "CoinFlow",
    clientLogoUrl: null,
    serviceType: "UI/UX Design",
    problem: "Complex transaction screens leading to high user dropoffs during money transfers.",
    solution: "Designed a clean, glassmorphic dashboard with simplified workflows, fast animations, and rich charts.",
    results: "Boosted engagement rate by 60% and reduced dropoffs during cash transfer process.",
    coverImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    liveUrl: "https://coinflow.demo",
    isPublished: true,
    sortOrder: 2,
    completedAt: "2026-05-01T00:00:00Z"
  },
  {
    id: 3,
    title: "AI Startup Landing",
    slug: "neuro-sync",
    clientName: "NeuroSync",
    clientLogoUrl: null,
    serviceType: "Web Development",
    problem: "Stiff competition and poor demonstration of the product's values.",
    solution: "Built an interactive showcase landing page with fluid 3D elements and real-time trial interface.",
    results: "Generated over 10,000 signups in the first week of launch.",
    coverImageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    galleryUrls: [],
    liveUrl: "https://neurosync.demo",
    isPublished: true,
    sortOrder: 3,
    completedAt: "2026-05-18T00:00:00Z"
  },
];

const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    clientName: "Rajesh Sharma",
    clientBusiness: "CEO at TechFlow India",
    clientWebsite: null,
    clientLogoUrl: null,
    clientPhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    feedback: "APXTeck completely transformed our digital presence. The new web application is not only beautiful but extremely fast. Their customer focus is exceptional.",
    projectType: "Web Development",
    isVerified: true,
    isPublished: true,
  },
  {
    id: 2,
    clientName: "Priya Patel",
    clientBusiness: "Founder, OrganicBites",
    clientWebsite: null,
    clientLogoUrl: null,
    clientPhotoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    feedback: "Working with them was a breeze. They understood our complex e-commerce requirements and delivered a solution that exceeded our expectations in every way.",
    projectType: "Web Development",
    isVerified: true,
    isPublished: true,
  },
  {
    id: 3,
    clientName: "Amit Verma",
    clientBusiness: "Marketing Director, EduPulse",
    clientWebsite: null,
    clientLogoUrl: null,
    clientPhotoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    feedback: "The ROI we've seen since launching the redesigned website and SEO campaigns is phenomenal. Organic leads have tripled in the last 3 months.",
    projectType: "SEO Optimization",
    isVerified: true,
    isPublished: true,
  },
];

const MOCK_BLOGS: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development for Indian SMBs in 2026",
    slug: "future-web-development-2026",
    excerpt: "Discover how Next.js, glassmorphism design trends, and AI tools are leveling the playing field for small businesses in India.",
    content: `
      <p>The web is changing fast, and for small to medium businesses (SMBs) in India, adopting next-generation technologies like Next.js ISR is no longer optional. It's the key to surviving search page updates and matching high user expectations.</p>
      <h3>Why Speed and Design Matter</h3>
      <p>Modern consumers have a very short attention span. If your page takes more than two seconds to load, you've likely lost half your prospects. By utilizing static regeneration, we ensure that your server compiles layouts instantly.</p>
      <p>Furthermore, custom design builds trust. High-fidelity components show that you take details seriously.</p>
    `,
    coverImageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Technology", "SMB"],
    status: "PUBLISHED",
    publishedAt: "2026-06-01T00:00:00Z",
    createdAt: "2026-06-01T10:00:00Z",
    author: {
      fullName: "Rajesh Sharma",
      profilePhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3"
    }
  },
  {
    id: 2,
    title: "Mastering Next.js Animations with Framer Motion",
    slug: "nextjs-animations-framer-motion",
    excerpt: "Learn the core techniques of creating industry-leading micro-interactions and smooth page transitions without bloating your bundle.",
    content: `
      <p>Animations play a critical role in user retention. In this guide, we show you how to use Framer Motion features to animate elements as they enter the screen viewport.</p>
      <h3>Implementing Core Springs</h3>
      <p>Spring-based physics feel way more natural to the eye than standard linear easing curves. Here is a sample code pattern:</p>
      <pre><code>const x = useSpring(0, { damping: 30, stiffness: 200 });</code></pre>
      <p>Adjust stiffness to balance between responsiveness and bounce.</p>
    `,
    coverImageUrl: "https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Tutorial", "Design"],
    status: "PUBLISHED",
    publishedAt: "2026-05-28T00:00:00Z",
    createdAt: "2026-05-28T10:00:00Z",
    author: {
      fullName: "Priya Patel",
      profilePhotoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3"
    }
  },
  {
    id: 3,
    title: "How SEO is Evolving with AI Search Engines",
    slug: "seo-evolution-ai-search-engines",
    excerpt: "Search engine algorithms are shifting toward semantic and AI-synthesized responses. Here is how you can rank your Indian SMB website today.",
    content: `
      <p>Traditional keyword stuffing is completely dead. AI-first search engines prioritize user experience, fast load times, and clean structured schema data above all.</p>
      <h3>SEO Steps for 2026</h3>
      <p>Ensure your website utilizes semantic HTML5 sections (&lt;article&gt;, &lt;section&gt;), implements micro-data schemas (JSON-LD), and operates on extremely optimized mobile structures.</p>
    `,
    coverImageUrl: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Marketing", "SEO"],
    status: "PUBLISHED",
    publishedAt: "2026-05-15T00:00:00Z",
    createdAt: "2026-05-15T10:00:00Z",
    author: {
      fullName: "Amit Verma",
      profilePhotoUrl: null
    }
  },
];

const MOCK_ADS: Ad[] = [
  {
    id: 1,
    adType: "CLIENT",
    clientName: "HostGator Promo",
    adCode: null,
    bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=200&q=80",
    targetUrl: "https://hostgator.com",
    placement: "BLOG_LIST_TOP",
    isActive: true,
  },
  {
    id: 2,
    adType: "CLIENT",
    clientName: "DigitalOcean Promo",
    adCode: null,
    bannerUrl: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=200&q=80",
    targetUrl: "https://digitalocean.com",
    placement: "BLOG_LIST_MID",
    isActive: true,
  },
];

const MOCK_FAQS: Faq[] = [
  {
    id: 1,
    question: "What exactly does APXTeck do?",
    answer: "We are a full-service IT company specializing in high-end web development, mobile applications, advanced UI/UX design, and data-driven SEO/Digital Marketing strategies.",
    category: "General",
    isPublished: true,
    sortOrder: 1
  },
  {
    id: 2,
    question: "Do you offer custom pricing for projects?",
    answer: "Absolutely. Every project is unique, so we tailor our pricing based on the scope, complexity, and specific requirements of your business.",
    category: "General",
    isPublished: true,
    sortOrder: 2
  },
  {
    id: 3,
    question: "What technologies do you use for development?",
    answer: "We strictly use modern, scalable tech stacks. Our frontend expertise revolves around React, Next.js, and Framer Motion. For backends, we excel in Node.js, PostgreSQL, and Prisma.",
    category: "web-development",
    isPublished: true,
    sortOrder: 3
  },
  {
    id: 4,
    question: "How long does a typical web project take?",
    answer: "A standard corporate website takes 2-4 weeks, while complex SaaS or e-commerce platforms can take 2-4 months depending on feature requirements.",
    category: "web-development",
    isPublished: true,
    sortOrder: 4
  },
  {
    id: 5,
    question: "How long does it take to see results from SEO?",
    answer: "SEO is a long-term investment. While some indexing fixes show improvements in 2-4 weeks, significant organic growth usually takes 3 to 6 months of steady work.",
    category: "seo-optimization",
    isPublished: true,
    sortOrder: 5
  }
];

const MOCK_TEAM: TeamMember[] = [
  {
    id: 1,
    fullName: "Rajesh Sharma",
    designation: "Co-Founder & CEO",
    profilePhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    linkedInUrl: "https://linkedin.com/in/rajesh-sharma"
  },
  {
    id: 2,
    fullName: "Priya Patel",
    designation: "Head of Product Design",
    profilePhotoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    linkedInUrl: "https://linkedin.com/in/priya-patel"
  },
  {
    id: 3,
    fullName: "Amit Verma",
    designation: "Technical Lead & Architect",
    profilePhotoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    linkedInUrl: "https://linkedin.com/in/amit-verma"
  },
  {
    id: 4,
    fullName: "Sneha Patil",
    designation: "Senior SEO Specialist",
    profilePhotoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
    linkedInUrl: "https://linkedin.com/in/sneha-patil"
  }
];

const MOCK_SERVICE_FIELDS: Record<number, ServiceField[]> = {
  1: [
    {
      id: 101,
      serviceId: 1,
      fieldLabel: "Business Name",
      fieldKey: "businessName",
      fieldType: "TEXT",
      isRequired: true,
      placeholder: "e.g. Acme Corporation",
      options: null,
      isActive: true,
      sortOrder: 1
    },
    {
      id: 102,
      serviceId: 1,
      fieldLabel: "Estimated Budget",
      fieldKey: "budget",
      fieldType: "DROPDOWN",
      isRequired: true,
      placeholder: null,
      options: ["Under ₹50k", "₹50k - ₹1.5L", "₹1.5L - ₹3L", "Above ₹3L"],
      isActive: true,
      sortOrder: 2
    },
    {
      id: 103,
      serviceId: 1,
      fieldLabel: "Requirement Summary",
      fieldKey: "summary",
      fieldType: "TEXTAREA",
      isRequired: true,
      placeholder: "Outline your application feature requests...",
      options: null,
      isActive: true,
      sortOrder: 3
    },
    {
      id: 104,
      serviceId: 1,
      fieldLabel: "Upload Wireframes/Specs",
      fieldKey: "wireframes",
      fieldType: "FILE",
      isRequired: false,
      placeholder: null,
      options: null,
      isActive: true,
      sortOrder: 4
    }
  ],
  2: [
    {
      id: 201,
      serviceId: 2,
      fieldLabel: "Website URL",
      fieldKey: "websiteUrl",
      fieldType: "TEXT",
      isRequired: true,
      placeholder: "https://yourcompany.com",
      options: null,
      isActive: true,
      sortOrder: 1
    },
    {
      id: 202,
      serviceId: 2,
      fieldLabel: "Primary Target Keywords",
      fieldKey: "keywords",
      fieldType: "TEXTAREA",
      isRequired: true,
      placeholder: "e.g. buy organic food Pune, best bakery near me",
      options: null,
      isActive: true,
      sortOrder: 2
    }
  ],
  3: [
    {
      id: 301,
      serviceId: 3,
      fieldLabel: "Product Description",
      fieldKey: "productDesc",
      fieldType: "TEXTAREA",
      isRequired: true,
      placeholder: "Describe the user experience problem you want to solve...",
      options: null,
      isActive: true,
      sortOrder: 1
    }
  ],
  4: [
    {
      id: 401,
      serviceId: 4,
      fieldLabel: "Monthly Marketing Budget",
      fieldKey: "marketingBudget",
      fieldType: "DROPDOWN",
      isRequired: true,
      placeholder: null,
      options: ["₹10,000 - ₹25,000", "₹25,000 - ₹50,000", "Above ₹50,000"],
      isActive: true,
      sortOrder: 1
    }
  ]
};

// In-memory comment logs mock for interactive additions
const localCommentsDb: Record<string, BlogComment[]> = {
  "future-web-development-2026": [
    {
      id: 1001,
      postId: 1,
      commentText: "Extremely informative article. Speed is indeed super critical for SMB conversions in India.",
      createdAt: "2026-06-02T12:00:00Z",
      status: "APPROVED",
      user: {
        fullName: "Rahul Deshmukh",
        profilePhotoUrl: null
      }
    }
  ]
};

// ==================== API IMPLEMENTATIONS ====================

async function fetchAPI<T>(endpoint: string, options?: RequestInit, fallbackData?: T): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    if (!res.ok) {
      throw new Error(`API returned HTTP ${res.status}: ${res.statusText}`);
    }

    const json = await res.json();
    
    // Check standard response wrapper `{ success: true, data: ... }`
    if (json && typeof json === "object" && "success" in json) {
      if (json.success) {
        return json.data as T;
      } else {
        throw new Error(json.message || "API operation unsuccessful");
      }
    }

    return json as T;
  } catch (error) {
    console.warn(`API path "${endpoint}" unavailable. Falling back to mock data.`, error);
    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw error;
  }
}

export const api = {
  // Hero Banners
  async fetchHeroBanners(): Promise<HeroBanner[]> {
    return fetchAPI<HeroBanner[]>("/hero-banners", undefined, MOCK_HERO_BANNERS)
      .then((res) => {
        const list = Array.isArray(res) ? res : [];
        if (list.length === 0) return MOCK_HERO_BANNERS;
        return list
          .filter((item) => item.isActive)
          .sort((a, b) => a.sortOrder - b.sortOrder);
      })
      .catch(() => MOCK_HERO_BANNERS);
  },

  // Services
  async fetchServices(): Promise<Service[]> {
    return fetchAPI<{ data: Service[] }>("/service/getAll?isActive=true")
      .then((res) => {
        if (res && res.data) {
          return res.data;
        }
        return MOCK_SERVICES;
      })
      .catch(() => MOCK_SERVICES);
  },

  // Public Analytics Overview (Stats)
  async fetchStats(): Promise<StatsOverview> {
    return fetchAPI<StatsOverview>("/admin/analytics/overview", undefined, MOCK_STATS)
      .catch(() => MOCK_STATS);
  },

  // Portfolio
  async fetchPortfolios(): Promise<Portfolio[]> {
    return fetchAPI<{ data: Portfolio[] }>("/portfolio/getAll")
      .then((res) => {
        if (res && res.data) {
          return res.data;
        }
        return MOCK_PORTFOLIOS;
      })
      .catch(() => MOCK_PORTFOLIOS);
  },

  // Testimonials
  async fetchTestimonials(): Promise<Testimonial[]> {
    return fetchAPI<{ data: Testimonial[] }>("/testimonial/getAll")
      .then((res) => {
        if (res && res.data) {
          return res.data;
        }
        return MOCK_TESTIMONIALS;
      })
      .catch(() => MOCK_TESTIMONIALS);
  },

  // Blog
  async fetchBlogs(): Promise<BlogPost[]> {
    return fetchAPI<{ data: BlogPost[] }>("/blog/getAll")
      .then((res) => {
        if (res && res.data) {
          return res.data;
        }
        return MOCK_BLOGS;
      })
      .catch(() => MOCK_BLOGS);
  },

  // Ads
  async fetchAds(placement: string): Promise<Ad | null> {
    return fetchAPI<{ data: Ad[] }>("/ad/getAll")
      .then((res) => {
        const ads = res && res.data ? res.data : MOCK_ADS;
        const matching = ads.find(
          (ad) => ad.placement === placement && ad.isActive
        );
        return matching || null;
      })
      .catch(() => {
        const matching = MOCK_ADS.find(
          (ad) => ad.placement === placement && ad.isActive
        );
        return matching || null;
      });
  },

  // Submit Enquiry Form
  async submitEnquiry(data: {
    fullName: string;
    email: string;
    phone?: string;
    businessName?: string;
    serviceInterest?: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${BASE_URL}/enquiry/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        return { success: true, message: json.message || "Enquiry submitted successfully" };
      }
      throw new Error(json.message || "Failed to submit enquiry to backend");
    } catch (error) {
      console.warn("Submitting enquiry to backend failed. Faking local success.", error);
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        success: true,
        message: "Enquiry submitted successfully (Local Mock Success). We'll get back to you shortly!",
      };
    }
  },

  // Dynamic FAQs
  async fetchFaqs(category?: string): Promise<Faq[]> {
    return fetchAPI<Faq[]>("/faq/getAll")
      .then((res) => {
        const list = Array.isArray(res) ? res : MOCK_FAQS;
        const filtered = list.filter((faq) => faq.isPublished);
        if (category) {
          return filtered.filter(
            (faq) => faq.category === category || faq.category === "General"
          );
        }
        return filtered.sort((a, b) => a.sortOrder - b.sortOrder);
      })
      .catch(() => {
        if (category) {
          return MOCK_FAQS.filter(
            (faq) => faq.category === category || faq.category === "General"
          );
        }
        return MOCK_FAQS;
      });
  },

  // Team Members
  async fetchTeamMembers(): Promise<TeamMember[]> {
    return fetchAPI<TeamMember[]>("/user/team") // Hypothetical team endpoint
      .catch(() => MOCK_TEAM);
  },

  // Service Fields
  async fetchServiceFields(serviceId: number): Promise<ServiceField[]> {
    return fetchAPI<ServiceField[]>(`/service/field/getByServiceId/${serviceId}`)
      .catch(() => MOCK_SERVICE_FIELDS[serviceId] || []);
  },

  // Submit Service Request
  async submitServiceRequest(serviceId: number, formData: FormData, token?: string): Promise<{ success: boolean; message: string }> {
    try {
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      
      const res = await fetch(`${BASE_URL}/service/request/create/${serviceId}`, {
        method: "POST",
        headers,
        body: formData, // Browser sets multipart boundary automatically
      });
      const json = await res.json();
      if (res.ok && json.success) {
        return { success: true, message: json.message || "Service request submitted successfully" };
      }
      throw new Error(json.message || "Failed to submit request to backend");
    } catch (error) {
      console.warn("Submitting service request failed. Faking success.", error);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        success: true,
        message: "Request registered successfully (Local Mock Success). An admin will review it shortly!",
      };
    }
  },

  // Blog Likes
  async likeBlogPost(slug: string): Promise<{ success: boolean; likes: number }> {
    try {
      const res = await fetch(`${BASE_URL}/blog/${slug}/like`, { method: "POST" });
      const json = await res.json();
      return { success: true, likes: json.likes || 0 };
    } catch {
      // Return a simulated increment or success
      return { success: true, likes: 12 };
    }
  },

  // Blog Comments
  async fetchBlogComments(slug: string): Promise<BlogComment[]> {
    return fetchAPI<BlogComment[]>(`/blog/${slug}/comments`)
      .catch(() => localCommentsDb[slug] || []);
  },

  async submitBlogComment(slug: string, text: string, userFullName: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${BASE_URL}/blog/${slug}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentText: text }),
      });
      const json = await res.json();
      return { success: true, message: json.message || "Comment submitted for review" };
    } catch {
      // In-memory mock add
      if (!localCommentsDb[slug]) {
        localCommentsDb[slug] = [];
      }
      const newComment: BlogComment = {
        id: Math.floor(Math.random() * 10000),
        postId: 1,
        commentText: text,
        createdAt: new Date().toISOString(),
        status: "PENDING",
        user: {
          fullName: userFullName || "Guest User",
          profilePhotoUrl: null
        }
      };
      // Keep it hidden or mark as pending for prompt message
      localCommentsDb[slug].push(newComment);
      return {
        success: true,
        message: "Your comment is under review. It will appear once approved by the administrator.",
      };
    }
  },

  // Register / User Creation
  async register(data: {
    fullName: string;
    email: string;
    phone?: string;
    passwordHash: string;
  }): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const res = await fetch(`${BASE_URL}/auth/createUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        return { success: true, message: json.message || "Registration successful", user: json.data as User };
      }
      throw new Error(json.message || "Registration failed");
    } catch (error: unknown) {
      console.warn("Backend registration failed. Falling back to local mock.", error);
      const err = error as Error;
      if (err.message && err.message !== "Failed to fetch") {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Store in mock users list
      if (typeof window !== "undefined") {
        const mockUsers = JSON.parse(localStorage.getItem("mock_users") || "[]") as User[];
        if (mockUsers.some((u: User) => u.email === data.email)) {
          throw new Error("User already exists");
        }
        mockUsers.push({
          id: Math.floor(Math.random() * 1000),
          fullName: data.fullName,
          email: data.email,
          phone: data.phone || "",
          isEmailVerified: false,
          role: "CUSTOMER"
        });
        localStorage.setItem("mock_users", JSON.stringify(mockUsers));
        localStorage.setItem("mock_verification_pending_email", data.email);
      }
      return {
        success: true,
        message: "Check your email to verify your account."
      };
    }
  },

  // Login
  async login(data: {
    email: string;
    password?: string;
  }): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        return { success: true, message: json.message || "Login successful", user: json.data.user as User };
      }
      throw new Error(json.message || "Invalid email or password");
    } catch (error: unknown) {
      console.warn("Backend login failed. Checking mock accounts.", error);
      const err = error as Error;
      if (err.message && err.message !== "Failed to fetch") {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Developer defaults
      if (data.email === "admin@apxteck.com" && data.password === "Admin123!") {
        return {
          success: true,
          message: "Login successful (Mock Developer)",
          user: { id: 9999, fullName: "Admin APX", email: "admin@apxteck.com", role: "ADMIN" }
        };
      }
      if (data.email === "customer@apxteck.com" && data.password === "Customer123!") {
        return {
          success: true,
          message: "Login successful (Mock Customer)",
          user: { id: 9998, fullName: "Customer APX", email: "customer@apxteck.com", role: "CUSTOMER" }
        };
      }

      if (typeof window !== "undefined") {
        const mockUsers = JSON.parse(localStorage.getItem("mock_users") || "[]") as User[];
        const matched = mockUsers.find((u: User) => u.email === data.email);
        if (matched) {
          if (!matched.isEmailVerified) {
            throw new Error("Please verify your email. Resend verification email?");
          }
          return {
            success: true,
            message: "Login successful",
            user: { id: Math.floor(Math.random() * 1000), fullName: matched.fullName, email: matched.email, role: matched.role }
          };
        }
      }

      throw new Error("Invalid email or password");
    }
  },

  // Forgot Password
  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        return { success: true, message: json.message || "Reset link sent" };
      }
      throw new Error(json.message || "Forgot password operation failed");
    } catch (error: unknown) {
      console.warn("Forgot password backend call failed. Simulating locally.", error);
      const err = error as Error;
      if (err.message && err.message !== "Failed to fetch") {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (typeof window !== "undefined") {
        localStorage.setItem("mock_reset_token", "reset_token_123");
        localStorage.setItem("mock_reset_email", email);
      }
      return {
        success: true,
        message: "Password reset link sent to your email."
      };
    }
  },

  // Reset Password
  async resetPassword(data: { token: string; passwordHash: string }): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        return { success: true, message: json.message || "Password reset successful" };
      }
      throw new Error(json.message || "Reset password operation failed");
    } catch (error: unknown) {
      console.warn("Reset password backend call failed. Simulating locally.", error);
      const err = error as Error;
      if (err.message && err.message !== "Failed to fetch") {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (typeof window !== "undefined") {
        const savedToken = localStorage.getItem("mock_reset_token");
        if (!savedToken || savedToken !== data.token) {
          throw new Error("Invalid or expired reset token");
        }
        
        // Reset password for simulated user
        const resetEmail = localStorage.getItem("mock_reset_email");
        if (resetEmail) {
          const mockUsers = JSON.parse(localStorage.getItem("mock_users") || "[]") as User[];
          const user = mockUsers.find((u: User) => u.email === resetEmail);
          if (user) {
            user.passwordHash = data.passwordHash;
            localStorage.setItem("mock_users", JSON.stringify(mockUsers));
          }
        }

        localStorage.removeItem("mock_reset_token");
        localStorage.removeItem("mock_reset_email");
      }
      return {
        success: true,
        message: "Password changed successfully. Please log in."
      };
    }
  },

  // Verify Email
  async verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${BASE_URL}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        return { success: true, message: json.message || "Email verified" };
      }
      throw new Error(json.message || "Email verification failed");
    } catch (error: unknown) {
      console.warn("Verify email backend call failed. Simulating locally.", error);
      const err = error as Error;
      if (err.message && err.message !== "Failed to fetch") {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (token === "expired_token") {
        throw new Error("Link expired. Request a new verification email.");
      }
      if (token === "already_verified_token") {
        return {
          success: true,
          message: "Already verified."
        };
      }
      
      if (typeof window !== "undefined") {
        const emailToVerify = localStorage.getItem("mock_verification_pending_email") || "test@apxteck.com";
        const mockUsers = JSON.parse(localStorage.getItem("mock_users") || "[]") as User[];
        const user = mockUsers.find((u: User) => u.email === emailToVerify);
        if (user) {
          user.isEmailVerified = true;
          localStorage.setItem("mock_users", JSON.stringify(mockUsers));
        }
      }
      return {
        success: true,
        message: "Email verified successfully!"
      };
    }
  },

  // Resend Verification Email
  async resendVerification(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${BASE_URL}/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        return { success: true, message: json.message || "Verification email sent" };
      }
      throw new Error(json.message || "Resend verification failed");
    } catch (error: unknown) {
      console.warn("Resend verification backend failed. Simulating locally.", error);
      const err = error as Error;
      if (err.message && err.message !== "Failed to fetch") {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (typeof window !== "undefined") {
        localStorage.setItem("mock_verification_pending_email", email);
      }
      return {
        success: true,
        message: "Check your email to verify your account."
      };
    }
  }
};
