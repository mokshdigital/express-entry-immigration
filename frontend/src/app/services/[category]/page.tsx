/**
 * Service Category Page - Dynamic page for each service category
 */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Clock, FileText } from 'lucide-react';
import { getServicesByCategory } from '@/lib/api';

// Valid service categories
const validCategories = ['study', 'work', 'pr', 'visitor', 'citizenship', 'other'];

// Category display names
const categoryNames: Record<string, string> = {
    study: 'Study Permits & Student Services',
    work: 'Work Permits & LMIA Services',
    pr: 'Permanent Residency Programs',
    visitor: 'Visitor Visas & Tourist Services',
    citizenship: 'Citizenship & PR Card Services',
    other: 'Additional Immigration Services',
};

// Generate metadata
export async function generateMetadata({
    params,
}: {
    params: Promise<{ category: string }>;
}): Promise<Metadata> {
    const { category } = await params;
    const categoryName = categoryNames[category];

    if (!categoryName) {
        return {
            title: 'Service Not Found',
        };
    }

    return {
        title: `${categoryName} | Express Entry Immigration Services`,
        description: `Expert ${categoryName.toLowerCase()} for Canadian immigration. Licensed RCIC consultants with proven results.`,
    };
}

// Generate static paths
export async function generateStaticParams() {
    return validCategories.map((category) => ({
        category,
    }));
}

export default async function ServiceCategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;

    // Validate category
    if (!validCategories.includes(category)) {
        notFound();
    }

    // Fetch services for this category
    const services = await getServicesByCategory(category);

    if (services.length === 0) {
        notFound();
    }

    const categoryName = categoryNames[category];
    const mainService = services[0]; // Use first service as main content

    return (
        <main>
            {/* Hero Section */}
            <section className="bg-brand-navy text-white py-16 md:py-20">
                <div className="container">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {categoryName}
                        </h1>
                        <p className="text-xl leading-relaxed opacity-90">
                            {mainService.excerpt.rendered.replace(/<[^>]*>/g, '')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 md:py-24">
                <div className="container">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content Column */}
                        <div className="lg:col-span-2">
                            <Tabs defaultValue="overview" className="w-full">
                                <TabsList className="grid w-full grid-cols-3 mb-8">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="requirements">Requirements</TabsTrigger>
                                    <TabsTrigger value="process">Process</TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview" className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Service Overview</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div
                                                className="prose max-w-none"
                                                dangerouslySetInnerHTML={{
                                                    __html: mainService.content.rendered
                                                }}
                                            />
                                        </CardContent>
                                    </Card>

                                    {mainService.acf?.processing_time && (
                                        <Card>
                                            <CardContent className="flex items-center gap-4 pt-6">
                                                <Clock className="h-8 w-8 text-brand-red" />
                                                <div>
                                                    <p className="font-semibold text-lg">Processing Time</p>
                                                    <p className="text-gray-600">{mainService.acf.processing_time}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </TabsContent>

                                <TabsContent value="requirements">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Requirements & Eligibility</CardTitle>
                                            <CardDescription>
                                                Documents and criteria needed for this application
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div
                                                className="prose max-w-none"
                                                dangerouslySetInnerHTML={{
                                                    __html: mainService.acf?.requirements || '<p>Requirements information coming soon.</p>'
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="process">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Application Process</CardTitle>
                                            <CardDescription>
                                                Step-by-step guide to your application
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div
                                                className="prose max-w-none"
                                                dangerouslySetInnerHTML={{
                                                    __html: mainService.acf?.process_description || '<p>Process information coming soon.</p>'
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>

                            {/* Related Services */}
                            {services.length > 1 && (
                                <div className="mt-12">
                                    <h2 className="text-2xl font-bold text-brand-navy mb-6">
                                        Related Services
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {services.slice(1).map((service) => (
                                            <Card key={service.id}>
                                                <CardHeader>
                                                    <CardTitle className="text-lg">
                                                        {service.title.rendered}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-gray-600">
                                                        {service.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 100)}...
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                {/* CTA Card */}
                                <Card className="bg-brand-navy text-white">
                                    <CardHeader>
                                        <CardTitle>Ready to Get Started?</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p>
                                            Book a free consultation to discuss your {categoryName.toLowerCase()} needs.
                                        </p>
                                        <Button asChild className="w-full bg-brand-red hover:bg-brand-red/90">
                                            <Link href="/contact">
                                                Book Consultation
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Quick Facts Card */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Quick Facts</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                                            <p className="text-sm">Licensed RCIC consultants</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                                            <p className="text-sm">98% success rate</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                                            <p className="text-sm">Personalized service</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                                            <p className="text-sm">Transparent pricing</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Contact Info Card */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Have Questions?</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-sm">
                                            Our team is here to help answer any questions you may have.
                                        </p>
                                        <Button asChild variant="outline" className="w-full">
                                            <Link href="/faqs">
                                                View FAQs
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}