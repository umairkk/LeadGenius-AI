import type { Metadata } from "next";
import {
  CaseStudyExplorer,
  FAQSection,
  FinalCTA,
  MotionSection,
  PageHero,
  SectionHeader,
  ServicesGrid,
  TestimonialGrid,
  TrustBar
} from "../components/site";

export const metadata: Metadata = {
  title: "Digital Marketing Services",
  description:
    "Lead generation, ecommerce marketing, analytics and tracking, CRO, Google Ads, Meta Ads, and SEO services from Umair Altaf."
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Digital marketing systems for lead generation, ecommerce revenue, analytics, SEO, and CRO."
        description="Each service is built to connect strategy, execution, measurement, and conversion improvements so your marketing creates visible business growth."
      />
      <TrustBar />
      <section className="section-padding">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Core Capabilities"
            title="Choose the growth lever your business needs most, or combine them into a complete acquisition system."
          />
          <MotionSection className="mt-12">
            <ServicesGrid />
          </MotionSection>
        </div>
      </section>
      <section className="section-padding bg-white/60">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Related Results"
            title="Service work is measured through revenue, ROAS, CPL, conversion rate, lead volume, and traffic growth."
          />
          <MotionSection className="mt-12">
            <CaseStudyExplorer limit={4} />
          </MotionSection>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-shell">
          <SectionHeader eyebrow="FAQ" title="Service questions about paid media, tracking, lead generation, ecommerce, and SEO." />
          <MotionSection className="mt-12">
            <FAQSection />
          </MotionSection>
        </div>
      </section>
      <section className="section-padding bg-white/60">
        <div className="container-shell">
          <SectionHeader eyebrow="Trust" title="What clients say about the work." />
          <MotionSection className="mt-12">
            <TestimonialGrid compact />
          </MotionSection>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
