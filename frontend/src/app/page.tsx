import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import ServicesGrid from '@/components/sections/ServicesGrid';
import { StatsSection } from '@/components/sections/StatsSection';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import FAQsPreview from '@/components/sections/FAQsPreview';
import {
    getHeroSettings,
    getServices,
    getStats,
    getTestimonials,
    getFAQs,
} from '@/lib/api';

export const metadata: Metadata = {
    title: 'Express Entry Immigration Services | Expert Canadian Immigration Consultants',
    description: 'Licensed RCIC immigration consultants helping you navigate Canadian immigration. Study permits, work permits, PR, citizenship. Book your free consultation today.',
};

export default async function HomePage() {
    try {
        // Fetch all data in parallel
        const [heroSettings, services, stats, testimonials, faqs] = await Promise.all([
            getHeroSettings(),
            getServices(),
            getStats(),
            getTestimonials(),
            getFAQs(),
        ]);

        // DEBUG: Log data to see what we're getting
        console.log('=== HOME PAGE DATA ===');
        console.log('Hero Settings:', heroSettings);
        console.log('Services count:', services?.length);
        console.log('Stats count:', stats?.length);
        console.log('Stats data:', stats);
        console.log('Testimonials count:', testimonials?.length);
        console.log('FAQs count:', faqs?.length);
        console.log('First stat detail:', JSON.stringify(stats[0], null, 2));
        console.log('Testimonials detail:', JSON.stringify(testimonials[0], null, 2));




        return (
            <main>
                <Hero settings={heroSettings} />
                <ServicesGrid services={services} />
                <StatsSection stats={stats} />
                <TestimonialsCarousel testimonials={testimonials} />
                <FAQsPreview faqs={faqs} />
            </main>
        );
    } catch (error) {
        console.error('Error loading home page:', error);
        return (
            <main className="container py-16">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-red-600 mb-4">
                        Error Loading Page
                    </h1>
                    <p className="text-gray-600 mb-4">
                        We're having trouble loading content from the server.
                    </p>
                    <p className="text-sm text-gray-500">
                        Please check that WordPress is accessible and all plugins are active.
                    </p>
                </div>
            </main>
        );
    }
}