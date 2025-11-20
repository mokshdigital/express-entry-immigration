import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';
import { getSiteSettings, getNavigationSettings, getServices } from '@/lib/api';
import { buildNavigation } from '@/lib/navigation';

export async function Header() {
    // Fetch site settings, navigation settings, and services from WordPress
    const [siteSettings, navSettings, services] = await Promise.all([
        getSiteSettings(),
        getNavigationSettings(),
        getServices(),
    ]);

    // Build dynamic navigation menu
    const menu = buildNavigation(services);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    {siteSettings.site_logo_url && (
                        <Image
                            src={siteSettings.site_logo_url}
                            alt={siteSettings.site_name}
                            width={180}
                            height={50}
                            className="h-10 w-auto object-contain"
                            priority
                        />
                    )}
                </Link>

                {/* Desktop Navigation */}
                <DesktopMenu menu={menu} />

                {/* CTA & Mobile Menu */}
                <div className="flex items-center space-x-4">
                    <Button
                        asChild
                        className="hidden lg:inline-flex bg-brand-navy hover:bg-brand-red"
                    >
                        <Link href="/contact">
                            {navSettings.nav_cta_text || 'Book Consultation'}
                        </Link>
                    </Button>

                    {/* Mobile Menu Toggle */}
                    <MobileMenu menu={menu} />
                </div>
            </div>
        </header>
    );
}