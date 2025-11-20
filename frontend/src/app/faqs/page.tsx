/**
 * FAQs Page - All frequently asked questions with filtering
 */
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getFAQs, getFAQCategories } from '@/lib/api';
import { FAQsClient } from '@/components/sections/FAQsClient';

export const metadata: Metadata = {
    title: 'Frequently Asked Questions | Express Entry Immigration Services',
    description: 'Find answers to common questions about Canadian immigration, study permits, work permits, permanent residency, and citizenship applications.',
};

export default async function FAQsPage() {
    const [faqs, categories] = await Promise.all([
        getFAQs(),
        getFAQCategories(),
    ]);

    return (
        <main>
            {/* Hero Section */}
            <section className="bg-brand-navy text-white py-16 md:py-20">
                <div className="container">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-xl opacity-90">
                            Find answers to common questions about Canadian immigration processes
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQs Content */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container max-w-4xl">
                    <FAQsClient faqs={faqs} categories={categories} />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-brand-navy text-white">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Still Have Questions?
                    </h2>
                    <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                        Book a free consultation to get personalized answers for your situation
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