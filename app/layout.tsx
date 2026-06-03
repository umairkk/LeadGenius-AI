import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { FloatingActions, Footer, Header } from "./components/site";

const siteUrl = "https://umairaltaf.com";
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Umair Altaf | Digital Marketing Consultant & Performance Marketing Expert",
    template: "%s | Umair Altaf"
  },
  description:
    "Umair Altaf helps businesses scale revenue, leads, ecommerce sales, and marketing performance through Google Ads, Meta Ads, GA4, GTM, CRO, SEO, and data-driven strategy.",
  keywords: [
    "Umair Altaf",
    "digital marketing consultant",
    "Google Ads expert",
    "Meta Ads expert",
    "performance marketing expert",
    "ecommerce marketing",
    "lead generation",
    "conversion rate optimization",
    "GA4 consultant",
    "Google Tag Manager expert",
    "SEO consultant"
  ],
  authors: [{ name: "Umair Altaf" }],
  creator: "Umair Altaf",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Umair Altaf",
    title: "Umair Altaf | Digital Marketing Consultant & Performance Marketing Expert",
    description:
      "Revenue-focused digital marketing consulting for Google Ads, Meta Ads, ecommerce, lead generation, CRO, analytics, SEO, and growth strategy."
  },
  twitter: {
    card: "summary_large_image",
    title: "Umair Altaf | Digital Marketing Consultant",
    description:
      "Helping businesses generate more revenue, leads, and growth through data-driven digital marketing."
  },
  alternates: {
    canonical: siteUrl
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07172b"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        {gtmId ? (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        ) : null}
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
