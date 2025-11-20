'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '@/types/wordpress';

interface TestimonialsCarouselProps {
    testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying || testimonials.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, testimonials.length]);

    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    const goToPrevious = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];
    const quote = currentTestimonial.acf?.quote || currentTestimonial.content?.rendered || '';
    const clientName = currentTestimonial.acf?.client_name || '';
    const caseType = currentTestimonial.acf?.case_type || '';

    return (
        <section className="py-16 md:py-24">
            <div className="container max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                        Client Success Stories
                    </h2>
                    <p className="text-lg text-gray-600">
                        Real experiences from our satisfied clients
                    </p>
                </div>

                <Card className="relative">
                    <CardContent className="pt-12 pb-8 px-8">
                        <div className="text-6xl text-brand-gold mb-4">"</div>
                        <div
                            className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: quote }}
                        />
                        <div className="border-t pt-6">
                            <p className="font-semibold text-brand-navy text-lg">
                                {clientName}
                            </p>
                            <p className="text-gray-600">
                                {caseType}
                            </p>
                        </div>
                    </CardContent>

                    {testimonials.length > 1 && (
                        <>
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute left-4 top-1/2 -translate-y-1/2"
                                onClick={goToPrevious}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute right-4 top-1/2 -translate-y-1/2"
                                onClick={goToNext}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>

                            <div className="flex justify-center gap-2 mt-4 pb-4">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-brand-navy' : 'bg-gray-300'
                                            }`}
                                        onClick={() => {
                                            setIsAutoPlaying(false);
                                            setCurrentIndex(index);
                                        }}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </Card>
            </div>
        </section>
    );
}