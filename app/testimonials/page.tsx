import type { Metadata } from "next";
import {
  FinalCTA,
  MotionSection,
  PageHero,
  SectionHeader,
  TestimonialGrid,
  TrustBar
} from "../components/site";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Video testimonials, text testimonials, star ratings, client logos, and trust indicators for Umair Altaf's digital marketing consulting work."
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Video and text testimonials from clients who needed measurable marketing growth."
        description="Star-rated client feedback, social proof, and trust indicators for paid media, analytics, ecommerce, lead generation, SEO, and CRO engagements."
      />
      <TrustBar />
      <section className="section-padding">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Client Stories"
            title="Trust indicators from founders, directors, and marketing leaders."
          />
          <MotionSection className="mt-12">
            <TestimonialGrid />
          </MotionSection>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
