/**
 * About Page - Company information and values (CMS-powered)
 */
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { getAboutSettings } from '@/lib/api';

export const metadata: Metadata = {
    title: 'About Us | Express Entry Immigration Services',
    description: 'Learn about our experienced team of licensed RCIC consultants dedicated to helping you achieve your Canadian immigration goals.',
};

// Fallback data in case CMS data is not available
const fallbackData = {
    about_hero_headline: 'About Express Entry Immigration Services',
    about_hero_description: 'Your trusted partner in navigating Canadian immigration. We\'re licensed, experienced, and committed to making your immigration journey as smooth as possible.',
    about_mission_title: 'Our Mission',
    about_mission_description_1: 'Express Entry Immigration Services was founded with a simple mission: to make Canadian immigration accessible, transparent, and successful for everyone.',
    about_mission_description_2: 'As licensed Regulated Canadian Immigration Consultants (RCICs), we bring professional expertise, up-to-date knowledge, and personalized attention to every case. Whether you\'re a student, worker, family member, or aspiring permanent resident, we\'re here to guide you.',
    about_mission_description_3: 'With hundreds of successful cases and a deep understanding of Canadian immigration programs, we\'ve helped clients from around the world achieve their dreams of making Canada their home.',
    about_mission_image: 'https://cms.expressentryimmigration.ca/wp-content/uploads/2025/12/AboutUs-sectionimage.jpg',
    about_lead_name: 'Ashish Manral',
    about_lead_title: 'RCIC, R#',
    about_lead_credentials: 'Ashish Manral is a Licensed Regulated Canadian Immigration Consultant (RCIC) registered with the College of Immigration and Citizenship Consultants (CICC). With extensive knowledge of Canadian immigration law and procedures, he is authorized to represent clients before Immigration, Refugees and Citizenship Canada (IRCC).',
    about_lead_expertise: [
        'Express Entry & Provincial Nominee Programs (PNP)',
        'Study Permits & Post-Graduation Work Permits',
        'Work Permits & LMIA Applications',
        'Family Sponsorship & Visitor Visas',
        'Permanent Residence & Citizenship Applications',
    ],
    about_lead_commitment: 'Ashish is dedicated to providing personalized, ethical, and results-driven immigration services. He stays current with the latest immigration policies and procedures to ensure clients receive accurate, up-to-date advice tailored to their unique circumstances.',
    about_values: [
        { title: 'Professional Excellence', description: 'Licensed RCICs with proven track record and up-to-date knowledge of immigration law.' },
        { title: 'Client-First Approach', description: 'Your success is our priority. We provide personalized guidance every step of the way.' },
        { title: 'Transparent Process', description: 'Clear communication, honest assessments, and no hidden fees. You always know where you stand.' },
        { title: 'Ethical Practice', description: 'We adhere to the highest standards of professional conduct and regulatory compliance.' },
    ],
    about_why_choose_us: [
        { title: 'Licensed RCIC Consultants', description: 'All our consultants are licensed by the College of Immigration and Citizenship Consultants (CICC), ensuring you receive professional, regulated advice.' },
        { title: 'High Success Rate', description: 'Our thorough approach and attention to detail have resulted in a 98% success rate across all application types.' },
        { title: 'Comprehensive Services', description: 'From study permits to citizenship applications, we handle all aspects of Canadian immigration under one roof.' },
        { title: 'Personalized Attention', description: 'Every case is unique. We take time to understand your situation and provide tailored advice and strategy.' },
        { title: 'Transparent Pricing', description: 'No hidden fees or surprise charges. We provide clear, upfront pricing for all our services.' },
    ],
};

export default async function AboutPage() {
    let aboutSettings;

    try {
        aboutSettings = await getAboutSettings();
    } catch (error) {
        console.error('Failed to fetch about settings, using fallback:', error);
        aboutSettings = null;
    }

    // Merge CMS data with fallback
    const data = {
        ...fallbackData,
        ...aboutSettings,
    };

    // Ensure arrays exist and handle transformations
    const values = data.about_values?.length ? data.about_values : fallbackData.about_values;
    const whyChooseUs = data.about_why_choose_us?.length ? data.about_why_choose_us : fallbackData.about_why_choose_us;

    // Handle expertise: It might be a string (from Text Area) or array (from fallback)
    let expertise: string[] = fallbackData.about_lead_expertise;
    if (data.about_lead_expertise) {
        if (typeof data.about_lead_expertise === 'string') {
            expertise = (data.about_lead_expertise as string).split('\r\n').filter(Boolean);
        } else if (Array.isArray(data.about_lead_expertise)) {
            expertise = data.about_lead_expertise;
        }
    }

    return (
        <main>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-brand-navy to-brand-navy/80 text-white py-20 md:py-32">
                <div className="container">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {data.about_hero_headline}
                        </h1>
                        <p className="text-xl text-blue-100 max-w-3xl">
                            {data.about_hero_description}
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
                                {data.about_mission_title}
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                {data.about_mission_description_1}
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                {data.about_mission_description_2}
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {data.about_mission_description_3}
                            </p>
                        </div>
                        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={data.about_mission_image}
                                alt="Our team"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* RCIC Profile Section */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
                <div className="container">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                                Meet Our Lead Consultant
                            </h2>
                            <p className="text-lg text-gray-600">
                                Licensed RCIC with proven expertise in Canadian immigration
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="grid md:grid-cols-5 gap-0">
                                {/* Profile Image */}
                                <div className="md:col-span-2 relative h-64 md:h-auto bg-gradient-to-br from-brand-navy to-brand-navy/80">
                                    <div className="absolute inset-0 flex items-center justify-center p-8">
                                        <div className="text-center text-white">
                                            {data.about_lead_image ? (
                                                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20 relative shadow-lg">
                                                    <Image
                                                        src={data.about_lead_image}
                                                        alt={data.about_lead_name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-4 border-white/20">
                                                    <span className="text-5xl font-bold">
                                                        {data.about_lead_name.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                            )}
                                            <h3 className="text-2xl font-bold mb-1">{data.about_lead_name}</h3>
                                            <p className="text-blue-200 font-medium">{data.about_lead_title}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Profile Content */}
                                <div className="md:col-span-3 p-8 md:p-10">
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-xl font-bold text-brand-navy mb-3 flex items-center gap-2">
                                                <CheckCircle2 className="w-5 h-5 text-brand-red" />
                                                Professional Credentials
                                            </h4>
                                            <p className="text-gray-700 leading-relaxed">
                                                {data.about_lead_credentials}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-xl font-bold text-brand-navy mb-3 flex items-center gap-2">
                                                <CheckCircle2 className="w-5 h-5 text-brand-red" />
                                                Areas of Expertise
                                            </h4>
                                            <ul className="space-y-2 text-gray-700">
                                                {expertise.map((item, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="text-brand-red mt-1">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="text-xl font-bold text-brand-navy mb-3 flex items-center gap-2">
                                                <CheckCircle2 className="w-5 h-5 text-brand-red" />
                                                Commitment to Excellence
                                            </h4>
                                            <p className="text-gray-700 leading-relaxed">
                                                {data.about_lead_commitment}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-gray-200">
                                            <Button asChild variant="outline" className="w-full md:w-auto">
                                                <Link href="/contact">
                                                    Schedule a Consultation
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                            {whyChooseUs.map((item, index) => (
                                <div key={index} className="flex gap-4">
                                    <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                        <p className="text-gray-700">{item.description}</p>
                                    </div>
                                </div>
                            ))}
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
                    <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red/90 transition-all duration-300 hover:scale-105">
                        <Link href="/contact">
                            Book Free Consultation
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}