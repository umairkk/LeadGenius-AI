import type { Metadata } from "next";
import {
  FinalCTA,
  MotionSection,
  PageHero,
  PortfolioGrid,
  SectionHeader,
  TestimonialGrid,
  TrustBar
} from "../components/site";

export const metadata: Metadata = {
  title: "Digital Marketing Portfolio",
  description:
    "Portfolio projects across Google Ads, Meta Ads, ecommerce, lead generation, analytics, and SEO with objectives, strategies, results, and technologies used."
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Selected projects across Google Ads, Meta Ads, ecommerce, lead generation, analytics, and SEO."
        description="Each project card shows the client industry, objective, strategy, results, and technologies used to create measurable growth."
      />
      <TrustBar />
      <section className="section-padding">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Projects"
            title="Performance marketing work organized by channel, objective, and business outcome."
          />
          <MotionSection className="mt-12">
            <PortfolioGrid />
          </MotionSection>
        </div>
      </section>
      <section className="section-padding bg-white/60">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Client Feedback"
            title="Portfolio work backed by social proof and trust indicators."
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
