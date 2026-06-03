import type { Metadata } from "next";
import {
  BlogGrid,
  FAQSection,
  FinalCTA,
  MotionSection,
  PageHero,
  SectionHeader,
  TestimonialGrid,
  TrustBar
} from "../components/site";

export const metadata: Metadata = {
  title: "Digital Marketing Blog",
  description:
    "SEO optimized articles about Google Ads, Meta Ads, SEO, analytics, ecommerce marketing, CRO, and lead generation."
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="SEO-ready insights for Google Ads, Meta Ads, SEO, analytics, ecommerce, and lead generation."
        description="A CMS-ready blog structure with categories, article metadata, clean URLs, and conversion-focused calls to action."
      />
      <TrustBar />
      <section className="section-padding">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Latest Articles"
            title="Growth strategy content designed for search visibility and buyer education."
          />
          <MotionSection className="mt-12">
            <BlogGrid />
          </MotionSection>
        </div>
      </section>
      <section className="section-padding bg-white/60">
        <div className="container-shell">
          <SectionHeader eyebrow="FAQ" title="Helpful answers for visitors comparing marketing partners." />
          <MotionSection className="mt-12">
            <FAQSection />
          </MotionSection>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-shell">
          <SectionHeader eyebrow="Proof" title="Insights supported by real client outcomes." />
          <MotionSection className="mt-12">
            <TestimonialGrid compact />
          </MotionSection>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
