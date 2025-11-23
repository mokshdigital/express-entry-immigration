import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings, getSEOSettings } from "@/lib/api";
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { GoogleTagManager } from '@/components/analytics/GoogleTagManager';
import { ConsentProvider } from '@/lib/context/ConsentContext';
import { CookieConsent } from '@/components/ui/CookieConsent';

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const seoSettings = await getSEOSettings();

  return {
    title: {
      default: seoSettings.default_meta_title,
      template: "%s | Express Entry Immigration Services",
    },
    description: seoSettings.default_meta_description,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://expressentryimmigration.ca",
      siteName: "Express Entry Immigration Services",
      title: seoSettings.default_meta_title,
      description: seoSettings.default_meta_description,
      images: [
        {
          url: "https://expressentryimmigration.ca/og-image.png",
          width: 1200,
          height: 630,
          alt: "Express Entry Immigration Services",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoSettings.default_meta_title,
      description: seoSettings.default_meta_description,
    },
    robots: "follow, index",
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [seoSettings, siteSettings] = await Promise.all([
    getSEOSettings(),
    getSiteSettings(),
  ]);

  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} font-sans`}>
      <head>
        {/* Google Analytics */}
        {seoSettings.google_analytics_id && (
          <ConsentProvider>
            <GoogleAnalytics measurementId={seoSettings.google_analytics_id} />
          </ConsentProvider>
        )}
        {/* Google Tag Manager */}
        {seoSettings.google_tag_manager_id && (
          <ConsentProvider>
            <GoogleTagManager gtmId={seoSettings.google_tag_manager_id} />
          </ConsentProvider>
        )}
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <ConsentProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CookieConsent settings={siteSettings} />
        </ConsentProvider>
      </body>
    </html>
  );
}