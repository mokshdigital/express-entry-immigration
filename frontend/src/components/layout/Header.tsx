import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';
import { getSiteSettings, getNavigationSettings, getServicesGroupedByCategory } from '@/lib/api';
import { buildNavigation } from '@/lib/navigation';
import { ArrowRight } from 'lucide-react';

export async function Header() {
    // Fetch site settings, navigation settings, and service categories from WordPress
    const [siteSettings, navSettings, categories] = await Promise.all([
        getSiteSettings(),
        getNavigationSettings(),
        getServicesGroupedByCategory(),
    ]);

    // Build navigation with dynamic service categories
    const menu = buildNavigation(categories);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container flex h-16 items-center">
                {/* Logo - Flex 1 to push nav to center */}
                <div className="flex-1 flex justify-start">
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
                </div>

                {/* Desktop Navigation */}
                <DesktopMenu menu={menu} />

                {/* CTA & Mobile Menu - Flex 1 to push back against logo */}
                <div className="flex-1 flex justify-end items-center space-x-4">
                    <Button
                        asChild
                        className="hidden lg:inline-flex bg-brand-navy hover:bg-brand-red transition-all duration-300 hover:scale-105"
                    >
                        <Link href="/contact">
                            {navSettings.nav_cta_text || 'Book Consultation'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>

                    {/* Mobile Menu Toggle */}
                    <MobileMenu menu={menu} />
                </div>
            </div>
        </header>
    );
}