import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import {
  FinalCTA,
  PageHero,
  SectionHeader,
  TestimonialGrid,
  TrustBar
} from "../../components/site";
import { blogPosts, brand } from "../../data";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date
    }
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: brand.name
    },
    articleSection: post.category
  };

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <PageHero eyebrow={post.category} title={post.title} description={post.excerpt} />
      <TrustBar />
      <article className="section-padding">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex flex-wrap items-center gap-3 text-sm font-bold text-slate-500">
              <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span>-</span>
              <span>{post.readTime}</span>
              <span>-</span>
              <span>{post.category}</span>
            </div>
            <div className="premium-card rounded-2xl p-7 md:p-10">
              {post.body.map((paragraph) => (
                <p key={paragraph} className="mb-6 text-lg leading-9 text-slate-700 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-display text-2xl font-black text-[#07172b]">Want a custom growth plan?</h2>
              <p className="mt-3 leading-7 text-slate-600">
                Book a free strategy session to review your campaigns, tracking,
                landing pages, SEO opportunities, and revenue growth levers.
              </p>
              <Link
                href="/booking"
                className="gold-gradient mt-5 inline-flex rounded-xl px-6 py-3 text-sm font-black text-slate-950"
              >
                Book Free Strategy Session
              </Link>
            </div>
          </div>
        </div>
      </article>
      <section className="section-padding bg-white/60">
        <div className="container-shell">
          <SectionHeader eyebrow="Trust" title="Client results behind the advice." />
          <div className="mt-12">
            <TestimonialGrid compact />
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
