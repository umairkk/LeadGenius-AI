"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronRight,
  LineChart,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  PlayCircle,
  Search,
  ShoppingCart,
  Star,
  Target,
  TrendingUp,
  Trophy,
  type LucideIcon
} from "lucide-react";
import {
  achievementMetrics,
  awards,
  blogPosts,
  brand,
  caseStudies,
  certifications,
  faqs,
  heroMetrics,
  navLinks,
  portfolioProjects,
  services,
  testimonials,
  trustLogos
} from "../data";

const iconMap: Record<string, LucideIcon> = {
  Target,
  ShoppingCart,
  BarChart3,
  Search
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

type Metric = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
};

function formatCount(value: number) {
  if (value >= 1000000) return `${Math.round(value / 1000000)}M`;
  if (value >= 1000) return value.toLocaleString("en-US");
  return Math.round(value).toString();
}

function useCountUp(target: number) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 70;
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setCount(target * progress);
      if (frame >= totalFrames) {
        window.clearInterval(timer);
        setCount(target);
      }
    }, 18);

    return () => window.clearInterval(timer);
  }, [target]);

  return count;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = ""
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const styles = {
    primary:
      "gold-gradient text-slate-950 shadow-[0_16px_34px_rgba(199,154,49,0.22)] hover:-translate-y-0.5",
    secondary:
      "bg-white text-slate-950 border border-white/80 shadow-[0_16px_34px_rgba(7,23,43,0.11)] hover:-translate-y-0.5",
    ghost:
      "border border-slate-300/80 bg-white/70 text-slate-900 hover:border-[#c79a31] hover:text-[#07172b]"
  };

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-extrabold tracking-tight transition ${styles[variant]} ${className}`}
    >
      {children}
      <ChevronRight className="h-4 w-4" />
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/92 shadow-[0_10px_35px_rgba(7,23,43,0.04)] backdrop-blur-xl">
      <div className="container-shell flex h-[76px] items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <span className="gold-gradient flex h-11 w-11 items-center justify-center rounded-xl text-lg font-black text-slate-950 shadow-lg shadow-amber-900/10 ring-1 ring-black/5">
            UA
          </span>
          <span>
            <span className="font-display block text-base font-black tracking-tight text-[#07172b]">
              Umair Altaf
            </span>
            <span className="block text-[0.67rem] font-bold uppercase tracking-[0.2em] text-slate-500">
              Performance Marketing
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3.5 py-2 text-sm font-bold transition ${
                pathname === link.href
                  ? "bg-[#07172b] text-white shadow-sm"
                  : "text-slate-700 hover:bg-slate-100 hover:text-[#07172b]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href="/booking" className="px-5 py-2.5">
            Book Consultation
          </ButtonLink>
        </div>

        <button
          type="button"
          aria-label="Open navigation"
          className="rounded-xl border border-slate-200 p-3 lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white p-4 shadow-2xl lg:hidden">
          <div className="container-shell grid gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink href="/booking" className="mt-2">
              Book Free Consultation
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="dark-card mt-12">
      <div className="container-shell grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="gold-gradient flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black text-slate-950">
              UA
            </span>
            <div>
              <p className="text-lg font-black">Umair Altaf</p>
              <p className="text-sm text-white/60">Digital Marketing Consultant</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/68">
            {brand.tagline}. Built for businesses that want clearer data,
            stronger acquisition, and measurable revenue growth.
          </p>
        </div>
        <div>
          <p className="font-bold text-white">Explore</p>
          <div className="mt-4 grid gap-3 text-sm text-white/65">
            {navLinks.slice(1).map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold text-white">Expertise</p>
          <div className="mt-4 grid gap-3 text-sm text-white/65">
            {services.map((service) => (
              <Link key={service.slug} href={`/services#${service.slug}`} className="hover:text-white">
                {service.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold text-white">Contact</p>
          <div className="mt-4 grid gap-3 text-sm text-white/65">
            <a href={`mailto:${brand.email}`} className="hover:text-white">
              {brand.email}
            </a>
            <a href={brand.linkedin} className="hover:text-white">
              LinkedIn
            </a>
            <a href={brand.whatsapp} className="hover:text-white">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/48">
        (c) {new Date().getFullYear()} Umair Altaf. Performance marketing,
        analytics, SEO, and growth consulting.
      </div>
    </footer>
  );
}

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <Link
        href="/booking"
        className="floating-pulse hidden rounded-xl bg-[#07172b] px-5 py-3 text-sm font-black text-white shadow-2xl shadow-slate-950/20 sm:inline-flex"
      >
        Book Consultation
      </Link>
      <a
        href={brand.whatsapp}
        aria-label="Chat on WhatsApp"
        className="gold-gradient flex h-14 w-14 items-center justify-center rounded-2xl text-slate-950 shadow-2xl shadow-amber-900/20"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}

export function MotionSection({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      variants={fadeUp}
    >
      {children}
    </motion.section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center"
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-xs font-black uppercase tracking-[0.26em] text-[#a77b1d]">
        {eyebrow}
      </p>
      <h2 className="font-display mt-3 text-balance text-3xl font-black tracking-[-0.035em] text-[#07172b] md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}

function CounterCard({ metric }: { metric: Metric }) {
  const count = useCountUp(metric.value);

  return (
    <div className="premium-card rounded-2xl p-6">
      <p className="font-display text-4xl font-black tracking-[-0.04em] text-[#07172b] md:text-5xl">
        {metric.prefix}
        {formatCount(count)}
        {metric.suffix}
      </p>
      <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
        {metric.label}
      </p>
    </div>
  );
}

export function MetricsGrid({
  metrics = heroMetrics
}: {
  metrics?: Metric[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <CounterCard key={metric.label} metric={metric} />
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#07172b] text-white">
      <div className="hero-grid absolute inset-0 opacity-55" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ead08a]/70 to-transparent" />
      <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-[#c79a31]/16 blur-3xl" />
      <div className="absolute -right-36 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#173a63]/60 blur-3xl" />
      <div className="container-shell relative grid min-h-[760px] items-center gap-14 py-20 lg:grid-cols-[1.02fr_0.98fr]">
        <MotionSection>
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/14 bg-white/8 px-4 py-2 text-sm font-bold text-white/82 shadow-sm">
            <Trophy className="h-4 w-4 text-[#f1d28a]" />
            Independent consultant for paid media, analytics and growth
          </div>
          <h1 className="font-display mt-7 text-balance text-5xl font-black tracking-[-0.04em] md:text-7xl">
            Digital Marketing Expert Driving Revenue, Leads & Business Growth
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-white/74">
            I help businesses scale through Google Ads, Meta Ads, Analytics,
            Conversion Optimization, and Data-Driven Marketing Strategies.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/booking">Book Free Consultation</ButtonLink>
            <ButtonLink href="/case-studies" variant="secondary">
              View Case Studies
            </ButtonLink>
          </div>
          <div className="mt-11 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              ["01", "Strategy led by revenue"],
              ["02", "Tracking you can trust"],
              ["03", "Campaigns built to scale"]
            ].map(([number, item]) => (
              <div key={item} className="border-l border-white/14 pl-4">
                <p className="text-xs font-black tracking-[0.24em] text-[#ead08a]">
                  {number}
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-white/72">{item}</p>
              </div>
            ))}
          </div>
        </MotionSection>

        <MotionSection className="relative">
          <div className="executive-surface rounded-[1.75rem] p-5 text-[#07172b]">
            <div className="grid gap-4">
              <div className="rounded-[1.25rem] border border-slate-200 bg-white p-5">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">
                      Consultant Snapshot
                    </p>
                    <h2 className="font-display mt-3 text-3xl font-black tracking-tight">
                      Umair Altaf
                    </h2>
                    <p className="mt-2 text-sm font-bold text-slate-500">
                      Performance Marketing Consultant
                    </p>
                  </div>
                  <div className="gold-gradient flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-black text-slate-950 ring-1 ring-black/5">
                    UA
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    ["$42M+", "Revenue"],
                    ["318K+", "Leads"],
                    ["740+", "Campaigns"]
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="font-display text-2xl font-black text-[#07172b]">
                        {value}
                      </p>
                      <p className="mt-1 text-xs font-black uppercase tracking-wider text-slate-500">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.25rem] bg-[#07172b] p-5 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ead08a]">
                      Growth Dashboard
                    </p>
                    <h3 className="mt-2 text-xl font-black">Revenue & Lead Engine</h3>
                  </div>
                  <span className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-200">
                    Live-ready
                  </span>
                </div>
                <svg viewBox="0 0 520 220" className="mt-7 h-48 w-full">
                  <defs>
                    <linearGradient id="heroArea" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#ead08a" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#ead08a" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M20 188 C82 172 90 116 154 126 C213 135 210 72 274 80 C333 90 347 44 405 48 C455 52 472 28 500 22 L500 210 L20 210 Z"
                    fill="url(#heroArea)"
                  />
                  <path
                    className="graph-line"
                    d="M20 188 C82 172 90 116 154 126 C213 135 210 72 274 80 C333 90 347 44 405 48 C455 52 472 28 500 22"
                    fill="none"
                    stroke="#ead08a"
                    strokeLinecap="round"
                    strokeWidth="6"
                  />
                </svg>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["ROAS Lift", "+218%"],
                    ["CPL Change", "-44%"],
                    ["CVR Lift", "+72%"]
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-white/10 bg-white/7 p-4">
                      <p className="font-display text-2xl font-black text-white">{value}</p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/48">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Google Ads and Performance Max",
                  "Meta Ads and remarketing",
                  "GA4, GTM and attribution",
                  "CRO, SEO and growth strategy"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-[#c79a31]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}

export function TrustBar() {
  return (
    <section className="border-y border-slate-200/90 bg-white/88 py-7">
      <div className="container-shell">
        <p className="mb-4 text-center text-xs font-black uppercase tracking-[0.24em] text-slate-500">
          Trusted platform expertise and certification ecosystem
        </p>
        <div className="marquee-mask grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
          {trustLogos.map((logo) => (
            <div
              key={logo}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-black text-slate-700 shadow-sm"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {services.map((service) => {
        const Icon = iconMap[service.icon] ?? Target;
        return (
          <article
            key={service.slug}
            id={service.slug}
            className="premium-card rounded-2xl p-7 transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(7,23,43,0.12)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#a77b1d]">
                  {service.eyebrow}
                </p>
                <h3 className="font-display mt-2 text-2xl font-black tracking-tight text-[#07172b]">{service.title}</h3>
              </div>
              <span className="gold-gradient flex h-13 w-13 items-center justify-center rounded-xl text-slate-950 ring-1 ring-black/5">
                <Icon className="h-6 w-6" />
              </span>
            </div>
            <p className="mt-5 leading-7 text-slate-600">{service.description}</p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {service.services.slice(0, compact ? 4 : service.services.length).map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-[#c79a31]" />
                  {item}
                </div>
              ))}
            </div>
            {!compact ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {service.industries.map((industry) => (
                  <span
                    key={industry}
                    className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

export function StrategyFramework() {
  const pillars = [
    {
      label: "Audit",
      title: "Find the revenue leaks",
      detail:
        "Campaign structure, tracking quality, landing pages, offer positioning, and funnel data are reviewed before scaling spend."
    },
    {
      label: "Build",
      title: "Create the growth system",
      detail:
        "Paid media, analytics, conversion tracking, reporting, and CRO priorities are aligned around qualified leads and revenue."
    },
    {
      label: "Scale",
      title: "Optimize with confidence",
      detail:
        "Budget shifts, creative testing, search intent, product feeds, and landing page experiments are guided by clean performance data."
    }
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="dark-card rounded-2xl p-8 md:p-10">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#ead08a]">
          Growth Operating System
        </p>
        <h2 className="font-display mt-4 text-3xl font-black tracking-[-0.035em] md:text-5xl">
          A professional process for turning marketing spend into measurable growth.
        </h2>
        <p className="mt-6 leading-8 text-white/68">
          The work starts with measurement and business economics, then moves
          into channel execution. That keeps the strategy focused on profit,
          quality, and scale instead of surface-level traffic metrics.
        </p>
      </div>
      <div className="grid gap-4">
        {pillars.map((pillar, index) => (
          <div key={pillar.label} className="premium-card rounded-2xl p-6">
            <div className="flex gap-5">
              <span className="gold-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-black text-slate-950">
                0{index + 1}
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#a77b1d]">
                  {pillar.label}
                </p>
                <h3 className="font-display mt-2 text-2xl font-black tracking-tight text-[#07172b]">
                  {pillar.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{pillar.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonBars({
  items
}: {
  items: { label: string; before: number; after: number }[];
}) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-2 flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-500">
            <span>{item.label}</span>
            <span>Before / After</span>
          </div>
          <div className="grid gap-2">
            <div className="h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-slate-300"
                style={{ width: `${Math.min(item.before, 100)}%` }}
              />
            </div>
            <div className="h-2 rounded-full bg-amber-50">
              <div
                className="gold-gradient h-2 rounded-full"
                style={{ width: `${Math.min(item.after, 100)}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CaseStudyExplorer({ limit }: { limit?: number }) {
  const categories = ["All", ...Array.from(new Set(caseStudies.map((item) => item.category)))];
  const industries = ["All", ...Array.from(new Set(caseStudies.map((item) => item.industry)))];
  const [category, setCategory] = useState("All");
  const [industry, setIndustry] = useState("All");

  const filtered = useMemo(() => {
    return caseStudies
      .filter((item) => category === "All" || item.category === category)
      .filter((item) => industry === "All" || item.industry === industry)
      .slice(0, limit);
  }, [category, industry, limit]);

  return (
    <div>
      {!limit ? (
        <div className="mb-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-2">
          <FilterPills label="Category" values={categories} active={category} onChange={setCategory} />
          <FilterPills label="Industry" values={industries} active={industry} onChange={setIndustry} />
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        {filtered.map((study) => (
          <article key={study.id} className="premium-card rounded-2xl p-7">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-lg bg-[#07172b] px-3 py-1 text-xs font-black text-white">
                {study.category}
              </span>
              <span className="rounded-lg bg-amber-100 px-3 py-1 text-xs font-black text-amber-900">
                {study.industry}
              </span>
            </div>
            <h3 className="font-display mt-5 text-2xl font-black tracking-tight text-[#07172b]">{study.title}</h3>
            <div className="mt-6 grid gap-4 text-sm leading-7 text-slate-600">
              <p>
                <strong className="text-[#07172b]">Challenge:</strong> {study.challenge}
              </p>
              <p>
                <strong className="text-[#07172b]">Strategy:</strong> {study.strategy}
              </p>
              <p>
                <strong className="text-[#07172b]">Implementation:</strong> {study.implementation}
              </p>
              <p>
                <strong className="text-[#07172b]">Results:</strong> {study.results}
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {study.metrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-display text-2xl font-black text-[#07172b]">{metric.value}</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-7 rounded-2xl border border-slate-100 bg-white p-5">
              <ComparisonBars items={study.beforeAfter} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function FilterPills({
  label,
  values,
  active,
  onChange
}: {
  label: string;
  values: string[];
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
              active === value
                ? "bg-[#07172b] text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PortfolioGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {portfolioProjects.map((project) => (
        <article key={project.title} className="premium-card flex flex-col rounded-2xl p-7">
          <span className="w-fit rounded-lg bg-amber-100 px-3 py-1 text-xs font-black text-amber-900">
            {project.category}
          </span>
          <h3 className="font-display mt-5 text-2xl font-black tracking-tight text-[#07172b]">{project.title}</h3>
          <p className="mt-1 text-sm font-bold text-slate-500">{project.industry}</p>
          <div className="mt-5 grid gap-4 text-sm leading-7 text-slate-600">
            <p>
              <strong className="text-[#07172b]">Objective:</strong> {project.objective}
            </p>
            <p>
              <strong className="text-[#07172b]">Strategy:</strong> {project.strategy}
            </p>
            <p>
              <strong className="text-[#07172b]">Results:</strong> {project.results}
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                {tech}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export function CertificateGallery() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((certificate) => (
          <button
            key={certificate}
            type="button"
            onClick={() => setSelected(certificate)}
            className="premium-card group rounded-2xl p-7 text-left transition hover:-translate-y-1"
          >
            <span className="gold-gradient flex h-14 w-14 items-center justify-center rounded-xl text-slate-950 ring-1 ring-black/5">
              <Award className="h-7 w-7" />
            </span>
            <h3 className="font-display mt-6 text-xl font-black tracking-tight text-[#07172b]">{certificate}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Verification-ready certification badge for paid media, analytics,
              automation, or search visibility expertise.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#a77b1d]">
              View certificate <ChevronRight className="h-4 w-4" />
            </span>
          </button>
        ))}
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-w-xl rounded-2xl bg-white p-8 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="gold-gradient flex h-20 w-20 items-center justify-center rounded-2xl text-slate-950">
              <Award className="h-10 w-10" />
            </div>
            <h3 className="font-display mt-6 text-3xl font-black text-[#07172b]">{selected}</h3>
            <p className="mt-4 leading-7 text-slate-600">
              This modal is prepared for the live certificate image or PDF. Add
              the certificate asset to connect the gallery to verified proof.
            </p>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-7 rounded-xl bg-[#07172b] px-6 py-3 text-sm font-black text-white"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function AwardsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {awards.map((award) => (
        <div key={award} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="gold-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-slate-950">
            <Trophy className="h-6 w-6" />
          </span>
          <p className="font-bold text-slate-700">{award}</p>
        </div>
      ))}
    </div>
  );
}

export function TestimonialGrid({ compact = false }: { compact?: boolean }) {
  const items = compact ? testimonials.slice(0, 3) : testimonials;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((testimonial) => (
        <article key={testimonial.name} className="premium-card rounded-2xl p-7">
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-1 text-[#c79a31]">
              {Array.from({ length: testimonial.rating }).map((_, index) => (
                <Star key={index} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
              {testimonial.type === "Video Testimonial" ? <PlayCircle className="h-4 w-4" /> : null}
              {testimonial.type}
            </span>
          </div>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            &quot;{testimonial.quote}&quot;
          </p>
          <div className="mt-7 flex items-center gap-4">
            <div className="gold-gradient flex h-12 w-12 items-center justify-center rounded-xl text-sm font-black text-slate-950">
              {testimonial.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
            <div>
              <p className="font-black text-[#07172b]">{testimonial.name}</p>
              <p className="text-sm text-slate-500">{testimonial.role}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function BookingForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="premium-card rounded-2xl p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your name" required />
        <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
        <Field label="Phone" name="phone" type="tel" placeholder="+1 555 000 0000" />
        <Field label="Business Website" name="website" type="url" placeholder="https://company.com" />
        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm font-black text-slate-700">Monthly Marketing Budget</span>
          <select
            name="budget"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-[#c79a31] focus:ring-4 focus:ring-amber-100"
          >
            <option>$2,500 - $5,000</option>
            <option>$5,000 - $15,000</option>
            <option>$15,000 - $50,000</option>
            <option>$50,000+</option>
          </select>
        </label>
        <label className="grid gap-2 md:col-span-2">
          <span className="text-sm font-black text-slate-700">Services Interested In</span>
          <select
            name="services"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-[#c79a31] focus:ring-4 focus:ring-amber-100"
          >
            <option>Google Ads</option>
            <option>Meta Ads</option>
            <option>Ecommerce Marketing</option>
            <option>Lead Generation</option>
            <option>GA4 / GTM / Analytics</option>
            <option>SEO</option>
            <option>Marketing Strategy</option>
          </select>
        </label>
        {!compact ? (
          <label className="grid gap-2 md:col-span-2">
            <span className="text-sm font-black text-slate-700">Growth Challenge</span>
            <textarea
              name="message"
              rows={5}
              placeholder="Tell me what you want to improve..."
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-[#c79a31] focus:ring-4 focus:ring-amber-100"
            />
          </label>
        ) : null}
      </div>
      <button
        type="submit"
        className="gold-gradient mt-6 w-full rounded-xl px-6 py-4 text-sm font-black text-slate-950 shadow-xl shadow-amber-900/10"
      >
        Book Your Free Strategy Session
      </button>
      {submitted ? (
        <p className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
          Thanks. The form is ready for CRM or email integration. For now,
          please also book a slot on the calendar to confirm availability.
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-slate-700">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-[#c79a31] focus:ring-4 focus:ring-amber-100"
      />
    </label>
  );
}

export function FAQSection() {
  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {faqs.map((faq) => (
        <details key={faq.question} className="premium-card group rounded-2xl p-6">
          <summary className="cursor-pointer list-none text-lg font-black text-[#07172b]">
            {faq.question}
          </summary>
          <p className="mt-4 leading-7 text-slate-600">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function BlogGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {blogPosts.map((post) => (
        <article key={post.slug} className="premium-card flex flex-col rounded-2xl p-6">
          <span className="w-fit rounded-lg bg-amber-100 px-3 py-1 text-xs font-black text-amber-900">
            {post.category}
          </span>
          <h3 className="font-display mt-5 text-xl font-black leading-tight tracking-tight text-[#07172b]">
            {post.title}
          </h3>
          <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{post.excerpt}</p>
          <div className="mt-6 flex items-center justify-between text-xs font-bold text-slate-500">
            <span>{post.readTime}</span>
            <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#a77b1d]"
          >
            Read article <ChevronRight className="h-4 w-4" />
          </Link>
        </article>
      ))}
    </div>
  );
}

export function DashboardCharts() {
  const charts = [
    { label: "Revenue Generated", value: "$42M+", width: 94 },
    { label: "Leads Generated", value: "318K+", width: 88 },
    { label: "ROAS Improvements", value: "+218%", width: 82 },
    { label: "Conversion Improvements", value: "+72%", width: 74 }
  ];

  return (
    <div className="dark-card rounded-2xl p-7 md:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#f1d28a]">
            Revenue & Lead Generation Dashboard
          </p>
          <h2 className="font-display mt-4 text-3xl font-black tracking-[-0.035em] md:text-5xl">
            Built around the numbers leadership actually needs.
          </h2>
          <p className="mt-5 leading-8 text-white/68">
            A premium growth program connects campaign performance with leads,
            pipeline, revenue, conversion quality, and executive-level decision
            making.
          </p>
        </div>
        <div className="grid gap-4">
          {charts.map((chart) => (
            <div key={chart.label} className="rounded-2xl bg-white/8 p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-bold text-white/76">{chart.label}</span>
                <span className="text-2xl font-black text-[#f1d28a]">{chart.value}</span>
              </div>
              <div className="h-3 rounded-full bg-white/10">
                <motion.div
                  className="gold-gradient h-3 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${chart.width}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="dark-card relative overflow-hidden">
      <div className="hero-grid absolute inset-0 opacity-50" />
      <div className="container-shell relative py-20 md:py-28">
        <div className="max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d28a]">
            {eyebrow}
          </p>
          <h1 className="font-display mt-5 text-balance text-4xl font-black tracking-[-0.04em] md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-white/72">{description}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/booking">Book Free Consultation</ButtonLink>
            <ButtonLink href="/case-studies" variant="secondary">
              View Results
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="section-padding">
      <div className="container-shell">
        <div className="dark-card rounded-2xl p-8 text-center md:p-14">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d28a]">
            Ready to grow with cleaner data?
          </p>
          <h2 className="font-display mx-auto mt-4 max-w-3xl text-3xl font-black tracking-[-0.035em] md:text-5xl">
            Turn campaigns, tracking, landing pages, and strategy into a revenue system.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/68">
            Book a free strategy session to identify the fastest path to more
            qualified leads, profitable ecommerce revenue, and stronger growth visibility.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <ButtonLink href="/booking">Book Free Strategy Session</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact Umair
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutStory() {
  const timeline = [
    "Started managing performance campaigns for local service businesses and early ecommerce brands.",
    "Expanded into Google Shopping, Meta Ads, landing page optimization, and CRM-connected lead generation.",
    "Built analytics and GTM implementations for multi-channel attribution and executive reporting.",
    "Developed revenue-focused growth systems across healthcare, real estate, legal, SaaS, education, and ecommerce."
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="premium-card rounded-2xl p-7">
        <div className="aspect-[4/5] rounded-xl bg-[radial-gradient(circle_at_30%_20%,rgba(199,154,49,0.32),transparent_28%),linear-gradient(135deg,#07172b,#173a63)] p-6 text-white">
          <div className="flex h-full flex-col justify-between rounded-xl border border-white/16 p-6">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f1d28a]">
                Professional Photo
              </p>
              <h3 className="font-display mt-4 text-4xl font-black">Umair Altaf</h3>
            </div>
            <p className="leading-7 text-white/72">
              Performance marketing consultant focused on revenue, analytics,
              conversion optimization, and sustainable acquisition systems.
            </p>
          </div>
        </div>
      </div>
      <div>
        <SectionHeader
          align="left"
          eyebrow="About Umair"
          title="A data-driven marketing partner for businesses that need measurable growth."
          description="Umair's work combines paid media execution, analytics architecture, conversion strategy, SEO fundamentals, and commercial judgment. The mission is simple: make marketing more accountable, more profitable, and easier for leadership to understand."
        />
        <div className="mt-8 grid gap-4">
          {timeline.map((item, index) => (
            <div key={item} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="gold-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black text-slate-950">
                {index + 1}
              </span>
              <p className="leading-7 text-slate-600">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContactCards() {
  const contacts = [
    { label: "Email", value: brand.email, href: `mailto:${brand.email}`, Icon: Mail },
    { label: "Phone", value: brand.phone, href: `tel:${brand.phone.replace(/[^\d+]/g, "")}`, Icon: Phone },
    { label: "LinkedIn", value: "Connect on LinkedIn", href: brand.linkedin, Icon: LineChart },
    { label: "Calendly", value: "Book a strategy session", href: brand.calendly, Icon: Calendar }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {contacts.map(({ label, value, href, Icon }) => (
        <a key={label} href={href} className="premium-card rounded-2xl p-6 transition hover:-translate-y-1">
          <Icon className="h-7 w-7 text-[#a77b1d]" />
          <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-slate-500">{label}</p>
          <p className="mt-2 text-lg font-black text-[#07172b]">{value}</p>
        </a>
      ))}
    </div>
  );
}

export function MapPlaceholder() {
  return (
    <div className="premium-card flex min-h-[360px] items-center justify-center rounded-2xl p-8 text-center">
      <div>
        <MapPin className="mx-auto h-12 w-12 text-[#c79a31]" />
        <h3 className="font-display mt-4 text-2xl font-black text-[#07172b]">Remote Consulting Worldwide</h3>
        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">
          Google Map-ready section for office, service area, or local business
          profile embedding. Available for clients across multiple countries.
        </p>
      </div>
    </div>
  );
}

export function AchievementOverview() {
  return (
    <div>
      <MetricsGrid metrics={achievementMetrics} />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          ["Industries", "Healthcare, legal, ecommerce, SaaS, education, automotive, home services, real estate."],
          ["Marketing Philosophy", "Connect every campaign to commercial outcomes, lead quality, conversion rate, and revenue."],
          ["Mission", "Help growth-minded teams scale with better data, sharper strategy, and accountable execution."]
        ].map(([title, description]) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <TrendingUp className="h-7 w-7 text-[#a77b1d]" />
            <h3 className="font-display mt-4 text-xl font-black text-[#07172b]">{title}</h3>
            <p className="mt-3 leading-7 text-slate-600">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
