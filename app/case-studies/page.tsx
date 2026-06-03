import type { Metadata } from "next";
import {
  CaseStudyExplorer,
  DashboardCharts,
  FinalCTA,
  MotionSection,
  PageHero,
  SectionHeader,
  TestimonialGrid,
  TrustBar
} from "../components/site";

export const metadata: Metadata = {
  title: "Results & Case Studies",
  description:
    "Filterable digital marketing case studies showing challenges, strategies, implementation, results, ROAS, CPL, conversion rate, lead volume, revenue, and traffic growth."
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Results & Case Studies"
        title="Visual proof of revenue, lead generation, ecommerce, SEO, analytics, Google Ads, and Meta Ads results."
        description="Explore case studies by category and industry, with the challenge, strategy, implementation, results, and before/after performance graphs."
      />
      <TrustBar />
      <section className="section-padding">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Filter Results"
            title="Find growth examples by service category or industry."
          />
          <MotionSection className="mt-12">
            <CaseStudyExplorer />
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
            title="Case-study results supported by client trust and clear reporting."
          />
          <MotionSection className="mt-12">
            <TestimonialGrid compact />
          </MotionSection>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
