import { getContactSettings, getSiteSettings, getSEOSettings } from '@/lib/api';
import ContactFormSection from '@/components/sections/ContactFormSection';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const seoSettings = await getSEOSettings();

    return {
        title: 'Contact Us - Express Entry Immigration Services',
        description: 'Get in touch with our immigration consultants. We\'re here to answer your questions about study permits, work permits, permanent residency, and more.',
        openGraph: {
            title: 'Contact Us - Express Entry Immigration Services',
            description: 'Get in touch with our immigration consultants',
            type: 'website',
            url: 'https://expressentryimmigration.ca/contact',
        },
    };
}

export default async function ContactPage() {
    const [contactSettings, siteSettings] = await Promise.all([
        getContactSettings(),
        getSiteSettings(),
    ]);

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-brand-navy to-brand-navy/80 text-white py-20 md:py-32">
                <div className="container">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
                        <p className="text-xl text-blue-100 max-w-3xl">
                            Have questions? Our immigration consultants are ready to help.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 md:py-24">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white border border-gray-200 rounded-lg p-8">
                                <h2 className="text-2xl font-bold text-brand-navy mb-6">Send us a Message</h2>
                                <ContactFormSection />
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="lg:col-span-1">
                            <div className="space-y-8">
                                {/* Address */}
                                <div className="flex gap-4">
                                    <MapPin className="w-6 h-6 text-brand-red flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-brand-navy mb-2">Address</h3>
                                        <p className="text-gray-700 whitespace-pre-line">
                                            {contactSettings.address}
                                        </p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex gap-4">
                                    <Phone className="w-6 h-6 text-brand-red flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-brand-navy mb-2">Phone</h3>
                                        <a
                                            href={`tel:${contactSettings.phone}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {contactSettings.phone}
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex gap-4">
                                    <Mail className="w-6 h-6 text-brand-red flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-brand-navy mb-2">Email</h3>
                                        <a
                                            href={`mailto:${contactSettings.email}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {contactSettings.email}
                                        </a>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="flex gap-4">
                                    <Clock className="w-6 h-6 text-brand-red flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-brand-navy mb-2">Business Hours</h3>
                                        <p className="text-gray-700">
                                            Monday - Friday: 9:00 AM - 6:00 PM<br />
                                            Saturday: 10:00 AM - 4:00 PM<br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>

                                {/* Map */}
                                {contactSettings.map_embed_url && (
                                    <div className="mt-8">
                                        <h3 className="font-semibold text-brand-navy mb-4">Location</h3>
                                        <iframe
                                            src={contactSettings.map_embed_url}
                                            width="100%"
                                            height="300"
                                            style={{ border: 0, borderRadius: '8px' }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}