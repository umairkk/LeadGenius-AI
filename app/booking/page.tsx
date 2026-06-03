import type { Metadata } from "next";
import {
  BookingForm,
  FinalCTA,
  MotionSection,
  PageHero,
  SectionHeader,
  TestimonialGrid,
  TrustBar
} from "../components/site";
import { brand } from "../data";

export const metadata: Metadata = {
  title: "Book Free Strategy Session",
  description:
    "Book a free digital marketing strategy session with Umair Altaf for Google Ads, Meta Ads, ecommerce marketing, lead generation, GA4, GTM, CRO, SEO, and growth strategy."
};

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Booking & Consultation"
        title="Book your free strategy session for revenue, lead generation, and marketing growth."
        description="Share your contact details, website, marketing budget, and service priorities, then choose a time through the integrated calendar section."
      />
      <TrustBar />
      <section className="section-padding">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Consultation Form"
              title="Tell Umair what you want to improve."
              description="This form is ready for CRM, email, or automation integration. It captures name, email, phone, website, monthly marketing budget, and services of interest."
            />
            <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
                Calendar Integration
              </p>
              <p className="mt-3 leading-7 text-slate-600">
                Connect Google Calendar through Calendly or replace the iframe
                source with the live booking URL for production.
              </p>
            </div>
          </div>
          <MotionSection>
            <BookingForm />
          </MotionSection>
        </div>
      </section>
      <section className="section-padding bg-white/60">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Calendly"
            title="Choose an available time for your free strategy session."
          />
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/8">
            <iframe
              src={brand.calendly}
              title="Calendly booking calendar"
              className="calendar-frame w-full"
            />
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-shell">
          <SectionHeader eyebrow="Trust" title="Book with confidence." />
          <MotionSection className="mt-12">
            <TestimonialGrid compact />
          </MotionSection>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
