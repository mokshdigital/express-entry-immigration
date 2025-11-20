import { getServicesByCategory, getSiteSettings } from '@/lib/api';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Clock } from 'lucide-react';

interface PageProps {
    params: Promise<{ category: string }>;
}

const categoryLabels: Record<string, string> = {
    study: 'Study Permits & Student Services',
    work: 'Work Permits & LMIA Services',
    pr: 'Permanent Residency Programs',
    visitor: 'Visitor Visas & Tourist Services',
    citizenship: 'Citizenship & PR Card Services',
    other: 'Additional Immigration Services',
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category } = await params;
    const title = categoryLabels[category] || 'Services';

    return {
        title: title,
        description: `Expert ${title.toLowerCase()} for Canadian immigration. Licensed RCIC consultants with proven results.`,
        openGraph: {
            title: `${title} - Express Entry Immigration Services`,
            description: `Professional ${title.toLowerCase()} consulting services`,
            type: 'website',
            url: `https://expressentryimmigration.ca/services/${category}`,
        },
    };
}

export default async function ServiceCategoryPage({ params }: PageProps) {
    const { category } = await params;
    const [services, siteSettings] = await Promise.all([
        getServicesByCategory(category),
        getSiteSettings(),
    ]);

    if (services.length === 0) {
        notFound();
    }

    const mainService = services[0];
    const categoryName = categoryLabels[category] || 'Services';

    // Schema markup
    const serviceSchemas = services.map(service =>
        generateServiceSchema(service.title.rendered, service.content.rendered)
    );

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://expressentryimmigration.ca' },
        { name: 'Services', url: 'https://expressentryimmigration.ca/services' },
        { name: categoryName, url: '' },
    ]);

    return (
        <>
            {/* Schema markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchemas) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

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
        </>
    );
}