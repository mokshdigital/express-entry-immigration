/**
 * Contact Page - Contact information and form
 */
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { getContactSettings, getSocialLinks } from '@/lib/api';

export const metadata: Metadata = {
    title: 'Contact Us | Express Entry Immigration Services',
    description: 'Get in touch with our licensed RCIC consultants. Book a free consultation or reach out with your immigration questions.',
};

export default async function ContactPage() {
    const [contactSettings, socialLinks] = await Promise.all([
        getContactSettings(),
        getSocialLinks(),
    ]);

    return (
        <main>
            {/* Hero Section */}
            <section className="bg-brand-navy text-white py-16 md:py-20">
                <div className="container">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-xl opacity-90">
                            Ready to start your Canadian immigration journey? Book a free consultation with
                            our licensed RCIC consultants today.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-16 md:py-24">
                <div className="container">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Contact Form - Will be implemented in Phase 8 */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Send Us a Message</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="bg-gray-50 p-8 rounded-lg text-center">
                                        <p className="text-gray-600 mb-4">
                                            Contact form will be implemented in Phase 8
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            For now, please use the contact information provided →
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-6">
                            {/* Phone */}
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex gap-4">
                                        <Phone className="h-6 w-6 text-brand-red flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold mb-1">Phone</p>
                                            <a
                                                href={`tel:${contactSettings.phone}`}
                                                className="text-brand-navy hover:underline"
                                            >
                                                {contactSettings.phone}
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Email */}
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex gap-4">
                                        <Mail className="h-6 w-6 text-brand-red flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold mb-1">Email</p>
                                            <a
                                                href={`mailto:${contactSettings.email}`}
                                                className="text-brand-navy hover:underline break-all"
                                            >
                                                {contactSettings.email}
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Address */}
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex gap-4">
                                        <MapPin className="h-6 w-6 text-brand-red flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold mb-1">Address</p>
                                            <p className="text-gray-700 whitespace-pre-line">
                                                {contactSettings.address}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Office Hours */}
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex gap-4">
                                        <Clock className="h-6 w-6 text-brand-red flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold mb-2">Office Hours</p>
                                            <div className="text-sm space-y-1 text-gray-700">
                                                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                                                <p>Saturday: 10:00 AM - 4:00 PM</p>
                                                <p>Sunday: Closed</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Social Links */}
                            {(socialLinks.facebook_url || socialLinks.linkedin_url ||
                                socialLinks.twitter_url || socialLinks.instagram_url) && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Follow Us</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex gap-4">
                                                {socialLinks.facebook_url && (
                                                    <a
                                                        href={socialLinks.facebook_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-600 hover:text-brand-navy transition-colors"
                                                    >
                                                        Facebook
                                                    </a>
                                                )}
                                                {socialLinks.linkedin_url && (
                                                    <a
                                                        href={socialLinks.linkedin_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-600 hover:text-brand-navy transition-colors"
                                                    >
                                                        LinkedIn
                                                    </a>
                                                )}
                                                {socialLinks.twitter_url && (
                                                    <a
                                                        href={socialLinks.twitter_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-600 hover:text-brand-navy transition-colors"
                                                    >
                                                        Twitter
                                                    </a>
                                                )}
                                                {socialLinks.instagram_url && (
                                                    <a
                                                        href={socialLinks.instagram_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-600 hover:text-brand-navy transition-colors"
                                                    >
                                                        Instagram
                                                    </a>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                        </div>
                    </div>

                    {/* Map */}
                    {contactSettings.map_embed_url && (
                        <div className="mt-12">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Find Us</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="w-full h-[400px] rounded-b-lg overflow-hidden">
                                        <iframe
                                            src={contactSettings.map_embed_url}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}