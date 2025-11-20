import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings, getSEOSettings } from "@/lib/api";
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { GoogleTagManager } from '@/components/analytics/GoogleTagManager';

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
  const seoSettings = await getSEOSettings();

  return (
    <html lang="en">
      <head>
        {/* Existing head content */}
      </head>
      <body className={`${montserrat.variable} ${openSans.variable} font-sans antialiased`}>
        {/* Analytics Scripts */}
        {seoSettings.google_analytics_id && (
          <GoogleAnalytics measurementId={seoSettings.google_analytics_id} />
        )}
        {seoSettings.google_tag_manager_id && (
          <GoogleTagManager gtmId={seoSettings.google_tag_manager_id} />
        )}

        {/* Main content */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}