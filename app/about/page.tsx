import type { Metadata } from "next";
import {
  AboutStory,
  AchievementOverview,
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
  title: "About Umair Altaf",
  description:
    "Learn about Umair Altaf's performance marketing philosophy, milestones, certifications, and mission to help businesses generate measurable revenue growth."
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A performance marketing consultant focused on revenue, tracking, and strategic growth."
        description="Umair Altaf helps growth-minded businesses turn paid media, analytics, CRO, SEO, and marketing strategy into measurable acquisition systems."
      />
      <TrustBar />
      <section className="section-padding">
        <div className="container-shell">
          <AboutStory />
        </div>
      </section>
      <section className="section-padding bg-white/60">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Achievements"
            title="Career milestones and outcomes that signal dependable growth leadership."
          />
          <MotionSection className="mt-12">
            <AchievementOverview />
          </MotionSection>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Certifications"
            title="Platform credibility across ads, analytics, automation, and search."
          />
          <MotionSection className="mt-12">
            <CertificateGallery />
          </MotionSection>
        </div>
      </section>
      <section className="section-padding bg-white/60">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Awards & Recognition"
            title="Industry recognition, publications, workshops, and performance marketing achievements."
          />
          <MotionSection className="mt-12">
            <AwardsGrid />
          </MotionSection>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-shell">
          <SectionHeader eyebrow="Social Proof" title="Client feedback from growth teams and business leaders." />
          <MotionSection className="mt-12">
            <TestimonialGrid compact />
          </MotionSection>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
