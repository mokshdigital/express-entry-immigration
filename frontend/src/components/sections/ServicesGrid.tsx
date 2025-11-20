/**
 * Services Grid - Display service categories on home page
 */
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Service } from '@/types/wordpress';

interface ServicesGridProps {
    services: Service[];
}

// Map service categories to URLs
const categoryUrls: Record<string, string> = {
    study: '/services/study',
    work: '/services/work',
    pr: '/services/permanent-residency',
    visitor: '/services/visitor-visas',
    citizenship: '/services/citizenship',
    other: '/services/other',
};

export default function ServicesGrid({ services }: ServicesGridProps) {
    if (!services || services.length === 0) {
        return null;
    }

    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                        Our Immigration Services
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Expert guidance across all Canadian immigration pathways
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => {
                        const category = service.acf?.service_category || '';
                        const categoryUrl = categoryUrls[category] || '/services';
                        const excerpt = service.excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 120) || '';

                        return (
                            <Card
                                key={service.id}
                                className="hover:shadow-lg transition-shadow duration-300"
                            >
                                <CardHeader>
                                    <CardTitle className="text-xl text-brand-navy">
                                        {service.title.rendered}
                                    </CardTitle>
                                    <CardDescription>
                                        {excerpt}...
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button asChild variant="outline" className="w-full">
                                        <Link href={categoryUrl}>
                                            Learn More
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <Button asChild size="lg" variant="default">
                        <Link href="/services/study">
                            View All Services
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}