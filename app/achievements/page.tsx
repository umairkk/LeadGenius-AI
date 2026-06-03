import type { Metadata } from "next";
import {
  AchievementOverview,
  DashboardCharts,
  FinalCTA,
  MotionSection,
  PageHero,
  SectionHeader,
  TestimonialGrid,
  TrustBar
} from "../components/site";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Animated performance statistics for revenue generated, leads generated, ad spend managed, campaigns launched, countries served, and client satisfaction rate."
};

export default function AchievementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Achievements"
        title="Growth statistics that communicate experience, scale, and measurable marketing impact."
        description="Revenue generated, leads generated, ad spend managed, campaigns launched, countries served, and client satisfaction all presented as conversion-focused credibility signals."
      />
      <TrustBar />
      <section className="section-padding">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Statistics"
            title="Animated counters for the metrics buyers care about before booking a consultation."
          />
          <MotionSection className="mt-12">
            <AchievementOverview />
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
          <SectionHeader eyebrow="Social Proof" title="Results reinforced by client feedback." />
          <MotionSection className="mt-12">
            <TestimonialGrid compact />
          </MotionSection>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
