import type { Metadata } from "next";
import {
  AwardsGrid,
  CertificateGallery,
  FinalCTA,
  MotionSection,
  PageHero,
  SectionHeader,
  TestimonialGrid,
  TrustBar
} from "../components/site";

export const metadata: Metadata = {
  title: "Certifications & Awards",
  description:
    "Google Ads, Google Analytics, Google Shopping, Meta Blueprint, HubSpot, SEMrush certifications, marketing awards, recognition, publications, and speaking engagements."
};

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Certifications & Awards"
        title="Credibility signals for platform expertise, analytics depth, and performance marketing leadership."
        description="Browse certifications, certificate gallery modals, awards, industry recognition, featured publications, and speaking engagement highlights."
      />
      <TrustBar />
      <section className="section-padding">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Certificate Gallery"
            title="Certification badges for Google Ads, Analytics, Shopping, Meta, HubSpot, and SEMrush."
          />
          <MotionSection className="mt-12">
            <CertificateGallery />
          </MotionSection>
        </div>
      </section>
      <section className="section-padding bg-white/60">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Awards"
            title="Marketing awards, industry recognition, publications, and speaking engagements."
          />
          <MotionSection className="mt-12">
            <AwardsGrid />
          </MotionSection>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-shell">
          <SectionHeader eyebrow="Trust" title="Client trust indicators and testimonials." />
          <MotionSection className="mt-12">
            <TestimonialGrid compact />
          </MotionSection>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
