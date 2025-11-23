import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import ServiceCategoriesGrid from '@/components/sections/ServiceCategoriesGrid';
import { StatsSection } from '@/components/sections/StatsSection';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import FAQsPreview from '@/components/sections/FAQsPreview';
import { CTASection } from '@/components/sections/CTASection';
import {
    getHeroSettings,
    getServiceCategories,
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
        const [heroSettings, categories, stats, testimonials, faqs] = await Promise.all([
            getHeroSettings(),
            getServiceCategories(),
            getStats(),
            getTestimonials(),
            getFAQs(),
        ]);

        return (
            <main>
                <Hero settings={heroSettings} />
                {categories && categories.length > 0 && <ServiceCategoriesGrid categories={categories} />}
                {stats && stats.length > 0 && <StatsSection stats={stats} />}
                {testimonials && testimonials.length > 0 && <TestimonialsCarousel testimonials={testimonials} />}
                {faqs && faqs.length > 0 && <FAQsPreview faqs={faqs} />}
                <CTASection />
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