import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';
import { getSiteSettings, getNavigationSettings } from '@/lib/api';

export async function Header() {
    // Fetch site settings and navigation settings from WordPress
    const [siteSettings, navSettings] = await Promise.all([
        getSiteSettings(),
        getNavigationSettings(),
    ]);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    {siteSettings.site_logo_url && (
                        <Image
                            src={siteSettings.site_logo_url}
                            alt={siteSettings.site_name}
                            width={150}
                            height={40}
                            className="h-10 w-auto"
                            priority
                        />
                    )}
                </Link>

                {/* Desktop Navigation */}
                <DesktopMenu />

                {/* CTA Button */}
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
                    <MobileMenu />
                </div>
            </div>
        </header>
    );
}