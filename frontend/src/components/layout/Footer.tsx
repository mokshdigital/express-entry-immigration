import Link from 'next/link';
import { Facebook, Linkedin, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
    getContactSettings,
    getSocialLinks,
    getSiteSettings,
    getServices,
} from '@/lib/api';
import { buildNavigation, getServiceCategories } from '@/lib/navigation';

export async function Footer() {
    const [contactSettings, socialLinks, siteSettings, services] = await Promise.all([
        getContactSettings(),
        getSocialLinks(),
        getSiteSettings(),
        getServices(),
    ]);

    const menu = buildNavigation(services);
    const serviceCategories = getServiceCategories(menu);
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 border-t">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1: Company Info */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg text-brand-navy">
                            {siteSettings.site_name}
                        </h3>
                        <p className="text-sm text-gray-600">
                            Licensed RCIC consultants helping you achieve your Canadian dream.
                        </p>
                        <div className="space-y-2">
                            {contactSettings.phone && (
                                <div className="flex items-start space-x-2 text-sm">
                                    <Phone className="h-4 w-4 mt-0.5 text-brand-navy" />
                                    <a
                                        href={`tel:${contactSettings.phone}`}
                                        className="hover:text-brand-navy transition-colors"
                                    >
                                        {contactSettings.phone}
                                    </a>
                                </div>
                            )}
                            {contactSettings.email && (
                                <div className="flex items-start space-x-2 text-sm">
                                    <Mail className="h-4 w-4 mt-0.5 text-brand-navy" />
                                    <a
                                        href={`mailto:${contactSettings.email}`}
                                        className="hover:text-brand-navy transition-colors"
                                    >
                                        {contactSettings.email}
                                    </a>
                                </div>
                            )}
                            {contactSettings.address && (
                                <div className="flex items-start space-x-2 text-sm">
                                    <MapPin className="h-4 w-4 mt-0.5 text-brand-navy" />
                                    <address className="not-italic">
                                        {contactSettings.address.split('\n').map((line, i) => (
                                            <span key={i} className="block">
                                                {line}
                                            </span>
                                        ))}
                                    </address>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg text-brand-navy">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-600 hover:text-brand-navy transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-gray-600 hover:text-brand-navy transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services"
                                    className="text-gray-600 hover:text-brand-navy transition-colors"
                                >
                                    Our Services
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/news"
                                    className="text-gray-600 hover:text-brand-navy transition-colors"
                                >
                                    Latest News
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faqs"
                                    className="text-gray-600 hover:text-brand-navy transition-colors"
                                >
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-600 hover:text-brand-navy transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Services */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg text-brand-navy">Services</h3>
                        <ul className="space-y-2 text-sm">
                            {serviceCategories.map((category) => (
                                <li key={category.label}>
                                    <Link
                                        href={category.href}
                                        className="text-gray-600 hover:text-brand-navy transition-colors"
                                    >
                                        {category.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Legal & Social */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg text-brand-navy">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="text-gray-600 hover:text-brand-navy transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms-of-service"
                                    className="text-gray-600 hover:text-brand-navy transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>

                        <div className="pt-4">
                            <h4 className="font-semibold text-sm text-brand-navy mb-3">
                                Follow Us
                            </h4>
                            <div className="flex space-x-3">
                                {socialLinks.facebook_url && (
                                    <a
                                        href={socialLinks.facebook_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-brand-navy transition-colors"
                                        aria-label="Facebook"
                                    >
                                        <Facebook className="h-5 w-5" />
                                    </a>
                                )}
                                {socialLinks.linkedin_url && (
                                    <a
                                        href={socialLinks.linkedin_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-brand-navy transition-colors"
                                        aria-label="LinkedIn"
                                    >
                                        <Linkedin className="h-5 w-5" />
                                    </a>
                                )}
                                {socialLinks.twitter_url && (
                                    <a
                                        href={socialLinks.twitter_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-brand-navy transition-colors"
                                        aria-label="Twitter"
                                    >
                                        <Twitter className="h-5 w-5" />
                                    </a>
                                )}
                                {socialLinks.instagram_url && (
                                    <a
                                        href={socialLinks.instagram_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-brand-navy transition-colors"
                                        aria-label="Instagram"
                                    >
                                        <Instagram className="h-5 w-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                    <p>
                        © {currentYear} {siteSettings.site_name}. All rights reserved.
                    </p>
                    <p className="mt-2 md:mt-0">
                        Designed & Developed by{' '}
                        <a
                            href="https://mokshdigital.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-navy hover:text-brand-red transition-colors font-medium"
                        >
                            Moksh Digital
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}