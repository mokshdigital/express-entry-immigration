import Link from 'next/link';
import { Facebook, Linkedin, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
    getContactSettings,
    getSocialLinks,
    getSiteSettings,
    getServiceCategories,
} from '@/lib/api';

export async function Footer() {
    const [contactSettings, socialLinks, siteSettings, categories] = await Promise.all([
        getContactSettings(),
        getSocialLinks(),
        getSiteSettings(),
        getServiceCategories(),
    ]);

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 border-t">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
                    {/* Column 1: Company Info (50%) */}
                    <div className="space-y-4 lg:col-span-5">
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

                    {/* Column 2: Quick Links (20%) */}
                    <div className="space-y-4 lg:col-span-2">
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

                    {/* Column 3: Services (30%) */}
                    <div className="space-y-4 lg:col-span-3">
                        <h3 className="font-bold text-lg text-brand-navy">Services</h3>
                        <ul className="space-y-2 text-sm">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <Link
                                        href={`/services/${category.slug}`}
                                        className="text-gray-600 hover:text-brand-navy transition-colors"
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="space-y-6">
                    {/* Row 1: Legal & Social */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Legal Links (Left) */}
                        <div className="flex gap-6 text-sm">
                            <Link
                                href={siteSettings.privacy_policy_url || '/privacy-policy'}
                                className="text-gray-600 hover:text-brand-navy transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href={siteSettings.terms_of_service_url || '/terms-of-service'}
                                className="text-gray-600 hover:text-brand-navy transition-colors"
                            >
                                Terms of Service
                            </Link>
                        </div>

                        {/* Social Icons (Right) */}
                        <div className="flex space-x-4">
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

                    {/* Row 2: Copyright & Credits */}
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
            </div>
        </footer>
    );
}