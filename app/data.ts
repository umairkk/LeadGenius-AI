export const brand = {
  name: "Umair Altaf",
  tagline:
    "Helping Businesses Generate More Revenue, Leads & Growth Through Data-Driven Digital Marketing",
  email: "hello@umairaltaf.com",
  phone: "+1 (555) 014-4820",
  whatsapp: "https://wa.me/15550144820",
  linkedin: "https://www.linkedin.com/in/umairaltaf",
  calendly: "https://calendly.com/umairaltaf/strategy-session"
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

export const heroMetrics = [
  { label: "Revenue Generated", value: 42, prefix: "$", suffix: "M+" },
  { label: "Leads Generated", value: 318000, suffix: "+" },
  { label: "Campaigns Managed", value: 740, suffix: "+" },
  { label: "Industries Served", value: 26, suffix: "+" }
];

export const achievementMetrics = [
  { label: "Revenue Generated", value: 42, prefix: "$", suffix: "M+" },
  { label: "Leads Generated", value: 318000, suffix: "+" },
  { label: "Ad Spend Managed", value: 12, prefix: "$", suffix: "M+" },
  { label: "Campaigns Launched", value: 740, suffix: "+" },
  { label: "Countries Served", value: 18, suffix: "+" },
  { label: "Client Satisfaction Rate", value: 97, suffix: "%" }
];

export const trustLogos = [
  "Google Ads",
  "Meta",
  "Shopify",
  "GA4",
  "GTM",
  "HubSpot",
  "SEMrush",
  "WooCommerce"
];

export const services = [
  {
    slug: "lead-generation",
    title: "Lead Generation",
    eyebrow: "Predictable pipeline",
    icon: "Target",
    description:
      "Full-funnel acquisition systems for service businesses that need qualified inquiries, booked calls, and measurable sales opportunities.",
    services: [
      "Google Search Ads",
      "Google Local Services Ads",
      "Facebook Lead Ads",
      "Landing Page Optimization",
      "CRM Integration",
      "Conversion Tracking"
    ],
    industries: [
      "Real Estate",
      "Home Services",
      "Healthcare",
      "Law Firms",
      "Financial Services",
      "Education"
    ]
  },
  {
    slug: "ecommerce-marketing",
    title: "Ecommerce Marketing",
    eyebrow: "Profitable scale",
    icon: "ShoppingCart",
    description:
      "Performance marketing programs that improve MER, ROAS, AOV, repeat purchase, and product feed quality across paid channels.",
    services: [
      "Google Shopping Ads",
      "Performance Max",
      "Meta Ecommerce Ads",
      "Dynamic Remarketing",
      "Merchant Center Setup",
      "Feed Optimization",
      "Conversion Tracking"
    ],
    industries: ["Shopify", "Magento", "WooCommerce", "BigCommerce"]
  },
  {
    slug: "analytics-tracking",
    title: "Analytics & Tracking",
    eyebrow: "Cleaner decisions",
    icon: "BarChart3",
    description:
      "Measurement architecture for teams that need trustworthy GA4, GTM, server-side tracking, attribution, and executive reporting.",
    services: [
      "GA4 Setup",
      "GTM Implementation",
      "Enhanced Ecommerce Tracking",
      "Server Side Tracking",
      "Dashboard Creation",
      "Attribution Analysis"
    ],
    industries: ["SaaS", "Ecommerce", "Lead Gen", "Healthcare", "Education"]
  },
  {
    slug: "seo",
    title: "SEO",
    eyebrow: "Compounding growth",
    icon: "Search",
    description:
      "Technical, local, ecommerce, and content-led SEO programs built around revenue outcomes instead of vanity rankings.",
    services: [
      "Technical SEO",
      "On-Page SEO",
      "Content Strategy",
      "Local SEO",
      "Ecommerce SEO"
    ],
    industries: ["Local Services", "Ecommerce", "SaaS", "Legal", "Healthcare"]
  }
];

export const caseStudies = [
  {
    id: "healthcare-leads",
    title: "Healthcare Clinic Reduced Cost Per Lead by 48%",
    category: "Lead Generation",
    industry: "Healthcare",
    challenge:
      "The clinic was overspending on broad-match search campaigns with limited conversion tracking and no lead quality feedback loop.",
    strategy:
      "Rebuilt account structure around high-intent services, created dedicated landing pages, and connected CRM outcomes back to ad campaigns.",
    implementation:
      "Deployed GA4, GTM, call tracking, negative keyword mining, location bid strategy, and lead-stage reporting dashboards.",
    results:
      "Lead quality improved, appointment volume grew, and the clinic scaled spend into the highest-margin services with confidence.",
    metrics: [
      { label: "Cost Per Lead", value: "-48%" },
      { label: "Lead Volume", value: "+136%" },
      { label: "Conversion Rate", value: "+72%" },
      { label: "Revenue Generated", value: "$1.8M" }
    ],
    beforeAfter: [
      { label: "CPL", before: 100, after: 52 },
      { label: "Lead Volume", before: 42, after: 99 },
      { label: "Conversion Rate", before: 28, after: 48 }
    ]
  },
  {
    id: "shopify-roas",
    title: "Shopify Brand Scaled From 2.1x to 6.4x ROAS",
    category: "Ecommerce",
    industry: "Ecommerce",
    challenge:
      "The account relied on fragmented campaigns, inconsistent product feed data, and limited post-click conversion analysis.",
    strategy:
      "Consolidated campaigns, optimized Merchant Center data, launched Performance Max, and built creative testing for Meta remarketing.",
    implementation:
      "Installed enhanced ecommerce events, feed rules, margin-based segmentation, product set testing, and CRO experiments.",
    results:
      "Revenue scaled profitably while acquisition costs fell and the brand gained visibility into product-level performance.",
    metrics: [
      { label: "ROAS", value: "6.4x" },
      { label: "Revenue Generated", value: "$4.2M" },
      { label: "Conversion Rate", value: "+41%" },
      { label: "Traffic Growth", value: "+83%" }
    ],
    beforeAfter: [
      { label: "ROAS", before: 33, after: 100 },
      { label: "Conversion Rate", before: 48, after: 68 },
      { label: "Revenue", before: 38, after: 92 }
    ]
  },
  {
    id: "legal-google-ads",
    title: "Law Firm Built a Predictable Intake Engine",
    category: "Google Ads",
    industry: "Legal",
    challenge:
      "The firm needed consistent qualified consultations in competitive metro markets without wasting budget on low-value searches.",
    strategy:
      "Separated practice areas, tightened intent targeting, improved landing page proof, and aligned bidding with signed-client value.",
    implementation:
      "Built search campaigns, offline conversion imports, call scoring, location-specific pages, and weekly quality reviews.",
    results:
      "The firm gained a scalable acquisition channel with lower intake cost and clearer attribution from click to retained client.",
    metrics: [
      { label: "Cost Per Lead", value: "-39%" },
      { label: "Lead Volume", value: "+94%" },
      { label: "Conversion Rate", value: "+58%" },
      { label: "Campaigns Managed", value: "42" }
    ],
    beforeAfter: [
      { label: "CPL", before: 100, after: 61 },
      { label: "Lead Volume", before: 45, after: 87 },
      { label: "Consult Rate", before: 36, after: 58 }
    ]
  },
  {
    id: "saas-analytics",
    title: "SaaS Team Fixed Attribution and Lifted Demo Conversion",
    category: "Analytics",
    industry: "SaaS",
    challenge:
      "Leadership could not trust channel reporting because GA4 events, GTM tags, and CRM lifecycle stages were disconnected.",
    strategy:
      "Created a measurement plan, rebuilt event taxonomy, implemented GTM governance, and built a funnel dashboard for sales and marketing.",
    implementation:
      "Configured GA4, custom events, server-side tagging readiness, HubSpot mapping, and Looker Studio executive dashboards.",
    results:
      "The team identified high-quality channels, shifted spend, and improved demo conversion through clearer funnel diagnostics.",
    metrics: [
      { label: "Demo Conversion", value: "+32%" },
      { label: "Attribution Accuracy", value: "+89%" },
      { label: "Reporting Time", value: "-70%" },
      { label: "Pipeline Influenced", value: "$2.6M" }
    ],
    beforeAfter: [
      { label: "Data Trust", before: 30, after: 86 },
      { label: "Demo Rate", before: 46, after: 61 },
      { label: "Reporting Speed", before: 28, after: 84 }
    ]
  },
  {
    id: "real-estate-meta",
    title: "Real Estate Group Generated 9,800 Buyer Leads",
    category: "Meta Ads",
    industry: "Real Estate",
    challenge:
      "The brokerage needed high-volume buyer and seller leads while maintaining lead quality across fast-changing inventory.",
    strategy:
      "Combined Meta lead forms, retargeting, neighborhood creative, and CRM automations to qualify and route prospects quickly.",
    implementation:
      "Built audience testing, lead form segmentation, Zapier/CRM routing, call tracking, and weekly creative refreshes.",
    results:
      "The team improved follow-up speed, reduced wasted sales time, and created a repeatable lead acquisition system.",
    metrics: [
      { label: "Leads Generated", value: "9,800" },
      { label: "Cost Per Lead", value: "-44%" },
      { label: "Lead-to-Call Rate", value: "+63%" },
      { label: "Markets Served", value: "12" }
    ],
    beforeAfter: [
      { label: "Lead Volume", before: 34, after: 92 },
      { label: "CPL", before: 100, after: 56 },
      { label: "Call Rate", before: 38, after: 62 }
    ]
  },
  {
    id: "education-seo",
    title: "Education Provider Grew Organic Traffic 214%",
    category: "SEO",
    industry: "Education",
    challenge:
      "The site had thin program pages, weak internal linking, poor technical hygiene, and no content strategy tied to enrollment goals.",
    strategy:
      "Rebuilt program page architecture, fixed crawl issues, and created content clusters around career outcomes and local demand.",
    implementation:
      "Delivered technical SEO fixes, schema, internal links, content briefs, conversion-focused page updates, and rank tracking.",
    results:
      "Organic traffic, qualified inquiries, and assisted conversions increased while paid search became more efficient.",
    metrics: [
      { label: "Traffic Growth", value: "+214%" },
      { label: "Lead Volume", value: "+88%" },
      { label: "Keyword Growth", value: "+340%" },
      { label: "Conversion Rate", value: "+27%" }
    ],
    beforeAfter: [
      { label: "Organic Traffic", before: 29, after: 91 },
      { label: "Keywords", before: 24, after: 86 },
      { label: "Leads", before: 45, after: 85 }
    ]
  }
];

export const portfolioProjects = [
  {
    title: "National Home Services Lead Engine",
    category: "Lead Generation",
    industry: "Home Services",
    objective: "Increase qualified booked jobs while reducing wasted emergency-service spend.",
    strategy: "Service-area search campaigns, call-only campaigns, location pages, and CRM outcome imports.",
    results: "2,420 qualified leads with a 31% lower cost per booked job.",
    technologies: ["Google Ads", "GA4", "GTM", "CallRail", "HubSpot"]
  },
  {
    title: "DTC Skincare Growth Program",
    category: "Ecommerce",
    industry: "Ecommerce",
    objective: "Scale new-customer revenue while protecting contribution margin.",
    strategy: "Performance Max, Meta creative testing, product feed optimization, and post-purchase analytics.",
    results: "4.9x blended ROAS and 38% higher returning customer revenue.",
    technologies: ["Shopify", "Merchant Center", "Meta Ads", "GA4"]
  },
  {
    title: "B2B SaaS Measurement Rebuild",
    category: "Analytics",
    industry: "SaaS",
    objective: "Create reliable funnel reporting from ad click through sales opportunity.",
    strategy: "Event taxonomy, GTM implementation, CRM lifecycle mapping, and executive dashboarding.",
    results: "89% cleaner attribution and 70% less manual reporting time.",
    technologies: ["GA4", "GTM", "HubSpot", "Looker Studio"]
  },
  {
    title: "Regional Law Firm Search Expansion",
    category: "Google Ads",
    industry: "Legal",
    objective: "Win more high-value consultations in competitive legal markets.",
    strategy: "Intent-based account structure, landing page proof, negative keywords, and call quality scoring.",
    results: "94% increase in qualified leads and 39% lower CPL.",
    technologies: ["Google Ads", "Unbounce", "GA4", "GTM"]
  },
  {
    title: "Local Healthcare SEO Program",
    category: "SEO",
    industry: "Healthcare",
    objective: "Increase organic appointment requests across priority service lines.",
    strategy: "Technical SEO, local landing pages, medical content clusters, and review-driven trust signals.",
    results: "163% growth in organic appointment requests.",
    technologies: ["Search Console", "SEMrush", "Schema", "WordPress"]
  },
  {
    title: "Automotive Inventory Retargeting",
    category: "Meta Ads",
    industry: "Automotive",
    objective: "Improve used inventory inquiries and reduce stale stock.",
    strategy: "Dynamic retargeting, feed segmentation, lead forms, and sales-team routing automations.",
    results: "57% lower lead cost and 22% faster inventory movement.",
    technologies: ["Meta Ads", "Catalogs", "CRM", "GA4"]
  }
];

export const certifications = [
  "Google Ads Certification",
  "Google Analytics Certification",
  "Google Shopping Ads Certification",
  "Meta Blueprint Certification",
  "HubSpot Certifications",
  "SEMrush Certifications"
];

export const awards = [
  "Performance Marketing Excellence Recognition",
  "Featured in Growth Marketing Roundtables",
  "Speaker: Data-Driven Paid Media Workshops",
  "Recognized for Ecommerce Revenue Growth Campaigns"
];

export const testimonials = [
  {
    name: "Sarah Khan",
    role: "Founder, DTC Skincare Brand",
    rating: 5,
    type: "Video Testimonial",
    quote:
      "Umair rebuilt our Google and Meta strategy from the ground up. We finally understood which campaigns were profitable and scaled revenue without guessing."
  },
  {
    name: "Michael Reeves",
    role: "Managing Partner, Legal Group",
    rating: 5,
    type: "Text Testimonial",
    quote:
      "Our intake team now receives better leads, not just more leads. The reporting and weekly optimization cadence changed how we make marketing decisions."
  },
  {
    name: "Dr. Elena Morris",
    role: "Clinic Director",
    rating: 5,
    type: "Video Testimonial",
    quote:
      "The tracking alone was a game changer. Umair connected calls, forms, and appointment quality so our growth strategy became measurable."
  },
  {
    name: "Jason Lee",
    role: "VP Marketing, SaaS Platform",
    rating: 5,
    type: "Text Testimonial",
    quote:
      "He brings the rare mix of technical analytics depth and commercial marketing judgment. Our leadership dashboard is now trusted every week."
  }
];

export const faqs = [
  {
    question: "Can you manage both Google Ads and Meta Ads?",
    answer:
      "Yes. Campaign strategy is built around the full funnel, including Google Search, Shopping, Performance Max, Meta lead generation, ecommerce campaigns, remarketing, landing pages, and measurement."
  },
  {
    question: "Do you work with ecommerce and lead generation businesses?",
    answer:
      "Yes. The strategy differs by business model, but the core focus is the same: profitable acquisition, clean tracking, conversion rate improvement, and revenue visibility."
  },
  {
    question: "Can you fix GA4 and Google Tag Manager tracking?",
    answer:
      "Yes. Engagements can include GA4 setup, GTM implementation, enhanced ecommerce tracking, event taxonomy, server-side tagging readiness, CRM mapping, and Looker Studio dashboards."
  },
  {
    question: "Do you offer SEO strategy?",
    answer:
      "Yes. SEO programs can include technical audits, content strategy, local SEO, ecommerce SEO, schema, internal linking, and conversion-focused landing page improvements."
  },
  {
    question: "What happens in the free strategy session?",
    answer:
      "The session reviews your current goals, marketing channels, tracking quality, funnel constraints, and growth opportunities. You leave with prioritized recommendations whether or not you become a client."
  }
];

export const blogPosts = [
  {
    slug: "google-ads-account-structure-for-profitable-growth",
    title: "Google Ads Account Structure for Profitable Growth",
    category: "Google Ads",
    excerpt:
      "How to structure search, Shopping, and Performance Max campaigns around intent, margin, and conversion quality.",
    readTime: "7 min read",
    date: "2026-05-18",
    body: [
      "Profitable Google Ads growth starts with structure. Campaigns should separate intent, budget control, margin, geography, and conversion quality so optimization decisions become clear.",
      "For lead generation, build around service intent, match-type discipline, negative keywords, and offline conversion imports. For ecommerce, prioritize feed quality, product segmentation, and contribution margin.",
      "The best accounts are not the most complicated accounts. They are the accounts where every campaign has a commercial reason to exist and every conversion is measured against business value."
    ]
  },
  {
    slug: "meta-ads-creative-testing-framework",
    title: "A Practical Meta Ads Creative Testing Framework",
    category: "Meta Ads",
    excerpt:
      "A simple system for testing hooks, offers, proof, and formats without losing budget discipline.",
    readTime: "6 min read",
    date: "2026-04-29",
    body: [
      "Meta performance depends on creative volume, but volume without a testing framework creates noise. Every test should isolate a hook, audience belief, offer angle, or format.",
      "Separate exploration from scaling. Exploration campaigns help find winning messages, while scaling campaigns receive proven creative and stronger budget control.",
      "The goal is not just a lower CPM or higher click-through rate. The goal is creative that attracts the right customer and improves downstream revenue quality."
    ]
  },
  {
    slug: "ga4-gtm-tracking-checklist-for-growth-teams",
    title: "GA4 and GTM Tracking Checklist for Growth Teams",
    category: "Analytics",
    excerpt:
      "The essential measurement plan for teams that need reliable attribution, ecommerce events, and lead quality reporting.",
    readTime: "8 min read",
    date: "2026-03-22",
    body: [
      "A reliable measurement plan defines business events before it defines tags. Start with the funnel stages leadership actually uses: lead, qualified lead, appointment, opportunity, sale, repeat purchase, and refund.",
      "GA4 should receive clean event names, consistent parameters, deduped conversions, and ecommerce data that matches the store. GTM should include naming conventions and clear publishing governance.",
      "When tracking is clean, channel decisions become faster and budget conversations become less emotional because teams can see what is working."
    ]
  },
  {
    slug: "ecommerce-cro-priorities-before-scaling-ads",
    title: "Ecommerce CRO Priorities Before Scaling Ads",
    category: "Ecommerce Marketing",
    excerpt:
      "Conversion improvements that protect ad efficiency before increasing Google or Meta budgets.",
    readTime: "5 min read",
    date: "2026-02-14",
    body: [
      "Scaling paid media into a weak store amplifies waste. Before adding budget, inspect page speed, product page clarity, offer strength, checkout friction, reviews, shipping objections, and post-click message match.",
      "Start with the highest-traffic product and collection pages. Improve above-the-fold value, proof, comparison content, product detail quality, and checkout confidence.",
      "CRO is not separate from media buying. Better conversion rates give campaigns more data and more room to bid profitably."
    ]
  }
];
