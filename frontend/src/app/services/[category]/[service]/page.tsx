import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Clock, Calendar } from 'lucide-react';
import { getServiceBySlug, getServiceCategoryBySlug } from '@/lib/api';
import { sanitizeHTML } from '@/lib/utils/sanitize';
import { ServiceTabs } from '@/components/ui/ServiceTabs';
import { ServiceSidebar } from '@/components/sections/ServiceSidebar';

interface ServicePageProps {
    params: Promise<{
        category: string;
        service: string;
    }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const service = await getServiceBySlug(resolvedParams.category, resolvedParams.service);

    if (!service) {
        return {
            title: 'Service Not Found',
        };
    }

    // Extract plain text from excerpt for meta description
    const plainTextExcerpt = service.excerpt?.rendered
        ? service.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160)
        : '';

    return {
        title: `${service.title.rendered} - Express Entry Immigration Services`,
        description: plainTextExcerpt || `Learn about our ${service.title.rendered.toLowerCase()} immigration services`,
    };
}

export default async function ServicePage({ params }: ServicePageProps) {
    const resolvedParams = await params;
    const [service, category] = await Promise.all([
        getServiceBySlug(resolvedParams.category, resolvedParams.service),
        getServiceCategoryBySlug(resolvedParams.category),
    ]);

    if (!service || !category) {
        notFound();
    }

    // Sanitize content
    // Sanitize content
    const sanitizedContent = sanitizeHTML(service.content?.rendered || '');

    // Safely access ACF fields with optional chaining
    const requirements = service.acf?.requirements || '';
    const sanitizedRequirements = requirements
        ? sanitizeHTML(requirements)
        : '<p>Requirements information coming soon.</p>';

    const process = service.acf?.process_description || '';
    const sanitizedProcess = process
        ? sanitizeHTML(process)
        : '<p>Process information coming soon.</p>';

    const processingTime = service.acf?.processing_time || 'Varies';
    const applicationSteps = service.acf?.application_process_steps || [];
    const featuredImage = service.featured_image_url || '/images/placeholder-service.jpg';

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-brand-navy to-brand-navy/80 text-white py-16 md:py-24">
                <div className="container">
                    {/* Service Header */}
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold">
                            {service.title.rendered}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 md:py-24">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-12">
                        {/* Left Column - 70% */}
                        <div className="lg:col-span-7 space-y-12">


                            {/* Tabs */}
                            <ServiceTabs
                                overview={sanitizedContent}
                                requirements={sanitizedRequirements}
                                process={sanitizedProcess}
                            />

                            {/* Timeline */}
                            {applicationSteps.length > 0 && (
                                <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
                                    <h2 className="text-2xl font-bold text-brand-navy mb-6">Application Timeline</h2>
                                    <div className="space-y-6">
                                        {applicationSteps.map((step, index) => (
                                            <div key={index} className="flex gap-4">
                                                <div className="flex-shrink-0">
                                                    <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold">
                                                        {index + 1}
                                                    </div>
                                                </div>
                                                <div className="flex-1 pt-1">
                                                    <h3 className="font-bold text-brand-navy mb-2">{step.step_title}</h3>
                                                    <p className="text-gray-600">{step.step_description}</p>
                                                    {step.estimated_duration && (
                                                        <div className="flex items-center text-sm text-gray-500 mt-2">
                                                            <Calendar className="w-4 h-4 mr-1" />
                                                            <span>{step.estimated_duration}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - 30% */}
                        <div className="lg:col-span-3">
                            <div className="lg:sticky lg:top-24 space-y-6">
                                {/* Processing Time Card */}
                                <div className="bg-white border-2 border-brand-red rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Clock className="w-6 h-6 text-brand-red" />
                                        <h3 className="text-lg font-bold text-brand-navy">Processing Time</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        {processingTime}
                                    </p>
                                </div>

                                <ServiceSidebar />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
