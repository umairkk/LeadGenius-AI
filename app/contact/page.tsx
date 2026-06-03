import type { Metadata } from "next";
import {
  BookingForm,
  ContactCards,
  FinalCTA,
  MapPlaceholder,
  MotionSection,
  PageHero,
  SectionHeader,
  TestimonialGrid,
  TrustBar
} from "../components/site";

export const metadata: Metadata = {
  title: "Contact Umair Altaf",
  description:
    "Contact Umair Altaf through the contact form, WhatsApp, email, LinkedIn, Calendly, or Google Map-ready business location section."
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact Umair Altaf for Google Ads, Meta Ads, analytics, SEO, CRO, and growth strategy."
        description="Use the contact form, WhatsApp button, email, LinkedIn, Calendly, or map-ready contact section to start a growth conversation."
      />
      <TrustBar />
      <section className="section-padding">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Get In Touch"
              title="Start with your goal, then build the right growth system."
              description="Share your current website, monthly marketing budget, and services of interest. The form is ready for CRM or email integration."
            />
            <div className="mt-8">
              <ContactCards />
            </div>
          </div>
          <MotionSection>
            <BookingForm />
          </MotionSection>
        </div>
      </section>
      <section className="section-padding bg-white/60">
        <div className="container-shell grid gap-8 lg:grid-cols-2">
          <MapPlaceholder />
          <div className="premium-card rounded-2xl p-8">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#a77b1d]">
              Conversion-focused contact options
            </p>
            <h2 className="font-display mt-4 text-3xl font-black tracking-tight text-[#07172b]">
              Multiple ways to convert high-intent visitors into booked consultations.
            </h2>
            <div className="mt-6 grid gap-4 text-slate-600">
              <p>WhatsApp floating button for immediate mobile conversations.</p>
              <p>Email and LinkedIn links for business inquiries and partnerships.</p>
              <p>Calendly booking path for qualified strategy sessions.</p>
              <p>Google Map-ready area for local trust and geographic credibility.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-shell">
          <SectionHeader eyebrow="Trust" title="What clients say before you reach out." />
          <MotionSection className="mt-12">
            <TestimonialGrid compact />
          </MotionSection>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
