import Script from "next/script";
import {
  BlogGrid,
  BookingForm,
  CaseStudyExplorer,
  DashboardCharts,
  FAQSection,
  FinalCTA,
  Hero,
  MetricsGrid,
  MotionSection,
  SectionHeader,
  ServicesGrid,
  TestimonialGrid,
  TrustBar
} from "./components/site";
import { brand } from "./data";

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: brand.name,
    jobTitle: "Digital Marketing Consultant and Performance Marketing Expert",
    description: brand.tagline,
    email: brand.email,
    sameAs: [brand.linkedin],
    knowsAbout: [
      "Google Ads",
      "Meta Ads",
      "Ecommerce Marketing",
      "Lead Generation",
      "Conversion Rate Optimization",
      "Google Analytics 4",
      "Google Tag Manager",
      "SEO",
      "Marketing Strategy",
      "Revenue Growth"
    ]
  };

  return (
    <>
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Hero />
      <TrustBar />

      <section className="section-padding">
        <div className="container-shell">
          <MotionSection>
            <MetricsGrid />
          </MotionSection>
        </div>
      </section>

      <section className="section-padding bg-white/60">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Services"
            title="Performance marketing services built for qualified leads, ecommerce revenue, and cleaner attribution."
            description="From strategy to execution, every channel is designed around measurable business outcomes, conversion quality, and profitable growth."
          />
          <MotionSection className="mt-12">
            <ServicesGrid compact />
          </MotionSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Results & Case Studies"
            title="Proof-led growth stories across Google Ads, Meta Ads, SEO, ecommerce, analytics, and lead generation."
            description="Every engagement focuses on the full path from traffic to lead quality, revenue, ROAS, conversion rate, and decision-ready reporting."
          />
          <MotionSection className="mt-12">
            <CaseStudyExplorer limit={4} />
          </MotionSection>
        </div>
      </section>

      <section className="section-padding bg-white/60">
        <div className="container-shell">
          <DashboardCharts />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Testimonials"
            title="Trusted by founders, directors, and marketing leaders who need performance they can measure."
          />
          <MotionSection className="mt-12">
            <TestimonialGrid compact />
          </MotionSection>
        </div>
      </section>

      <section className="section-padding bg-white/60">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Free Strategy Session"
              title="Find the fastest path to more revenue, leads, and growth."
              description="Share your goals, budget, website, and channel priorities. The consultation is designed to identify tracking gaps, campaign opportunities, CRO constraints, and growth levers."
            />
          </div>
          <BookingForm compact />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Insights"
            title="SEO-ready growth articles for paid media, analytics, ecommerce, lead generation, and CRO."
          />
          <MotionSection className="mt-12">
            <BlogGrid />
          </MotionSection>
        </div>
      </section>

      <section className="section-padding bg-white/60">
        <div className="container-shell">
          <SectionHeader
            eyebrow="FAQ"
            title="Answers to common questions about Google Ads, Meta Ads, tracking, SEO, and growth strategy."
          />
          <MotionSection className="mt-12">
            <FAQSection />
          </MotionSection>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
