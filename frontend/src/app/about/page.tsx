/**
 * About Page - Company information and values
 */
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Us | Express Entry Immigration Services',
    description: 'Learn about our experienced team of licensed RCIC consultants dedicated to helping you achieve your Canadian immigration goals.',
};

export default function AboutPage() {
    const values = [
        {
            title: 'Professional Excellence',
            description: 'Licensed RCICs with proven track record and up-to-date knowledge of immigration law.',
        },
        {
            title: 'Client-First Approach',
            description: 'Your success is our priority. We provide personalized guidance every step of the way.',
        },
        {
            title: 'Transparent Process',
            description: 'Clear communication, honest assessments, and no hidden fees. You always know where you stand.',
        },
        {
            title: 'Ethical Practice',
            description: 'We adhere to the highest standards of professional conduct and regulatory compliance.',
        },
    ];

    return (
        <main>
            {/* Hero Section */}
            <section className="bg-brand-navy text-white py-16 md:py-24">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            About Express Entry Immigration Services
                        </h1>
                        <p className="text-xl leading-relaxed opacity-90">
                            Your trusted partner in navigating Canadian immigration. We're licensed, experienced,
                            and committed to making your immigration journey as smooth as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 md:py-24">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6">
                                Our Mission
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                Express Entry Immigration Services was founded with a simple mission: to make Canadian
                                immigration accessible, transparent, and successful for everyone.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                As licensed Regulated Canadian Immigration Consultants (RCICs), we bring professional
                                expertise, up-to-date knowledge, and personalized attention to every case. Whether
                                you're a student, worker, family member, or aspiring permanent resident, we're here
                                to guide you.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                With hundreds of successful cases and a deep understanding of Canadian immigration
                                programs, we've helped clients from around the world achieve their dreams of making
                                Canada their home.
                            </p>
                        </div>
                        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src="https://cms.expressentryimmigration.ca/wp-content/uploads/2025/11/Photograph.jpg"
                                alt="Our team"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-lg text-gray-600">
                            Principles that guide every decision and interaction
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CheckCircle2 className="h-10 w-10 text-brand-red mb-2" />
                                    <CardTitle className="text-xl">{value.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 md:py-24">
                <div className="container">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-8 text-center">
                            Why Choose Us
                        </h2>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Licensed RCIC Consultants</h3>
                                    <p className="text-gray-700">
                                        All our consultants are licensed by the College of Immigration and Citizenship
                                        Consultants (CICC), ensuring you receive professional, regulated advice.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">High Success Rate</h3>
                                    <p className="text-gray-700">
                                        Our thorough approach and attention to detail have resulted in a 98% success
                                        rate across all application types.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Comprehensive Services</h3>
                                    <p className="text-gray-700">
                                        From study permits to citizenship applications, we handle all aspects of Canadian
                                        immigration under one roof.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Personalized Attention</h3>
                                    <p className="text-gray-700">
                                        Every case is unique. We take time to understand your situation and provide
                                        tailored advice and strategy.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Transparent Pricing</h3>
                                    <p className="text-gray-700">
                                        No hidden fees or surprise charges. We provide clear, upfront pricing for all
                                        our services.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-brand-navy text-white">
                <div className="container text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Start Your Canadian Journey?
                    </h2>
                    <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                        Book a free consultation today and let's discuss how we can help you achieve your
                        immigration goals.
                    </p>
                    <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red/90">
                        <Link href="/contact">
                            Book Free Consultation
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}