'use client';

import type { Testimonial } from '@/types/wordpress';

interface TestimonialsCarouselProps {
    testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    // Duplicate testimonials 4 times to ensure seamless loop even on wide screens
    const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

    return (
        <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
            <div className="container mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                    Client Success Stories
                </h2>
                <p className="text-lg text-gray-600">
                    Real experiences from our satisfied clients
                </p>
            </div>

            <div className="relative w-full">
                {/* Gradient Masks for smooth fade in/out */}
                <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />

                <div
                    className="flex gap-6 w-max px-4 animate-marquee pause-on-hover"
                >
                    {duplicatedTestimonials.map((testimonial, index) => (
                        <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    const quote = testimonial.acf?.quote || testimonial.content?.rendered || '';
    // Strip HTML tags for clean text
    const cleanQuote = quote.replace(new RegExp('<[^>]*>?', 'gm'), '');
    const clientName = testimonial.acf?.client_name || 'Client';
    const caseType = testimonial.acf?.case_type || '';

    return (
        <div className="w-[350px] md:w-[400px] flex-shrink-0">
            <div className="h-full bg-white rounded-xl p-8 shadow-sm border border-transparent hover:border-brand-red hover:shadow-md transition-all duration-300 flex flex-col group cursor-default">
                <div className="text-brand-red text-4xl font-serif leading-none mb-4">
                    &quot;
                </div>
                <p className="text-gray-600 italic mb-6 flex-grow leading-relaxed">
                    &quot;{cleanQuote}&quot;
                </p>
                <div className="text-right mt-auto">
                    <p className="font-bold text-brand-navy text-lg">
                        {clientName}
                    </p>
                    <p className="text-brand-red text-sm font-medium">
                        {caseType}
                    </p>
                </div>
            </div>
        </div>
    );
}