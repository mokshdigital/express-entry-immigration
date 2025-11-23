'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import type { FAQ } from '@/types/wordpress';

interface FAQsClientProps {
    faqs: FAQ[];
    categories: string[];
}

export function FAQsClient({ faqs, categories }: FAQsClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const filteredFaqs = selectedCategory === 'all'
        ? faqs
        : faqs.filter(faq => faq.acf?.faq_category === selectedCategory);

    return (
        <>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
                <Button
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('all')}
                >
                    All
                </Button>
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}
                    </Button>
                ))}
            </div>

            {/* FAQs Accordion */}
            {filteredFaqs.length === 0 ? (
                <p className="text-center text-gray-600 py-12">
                    No FAQs found in this category.
                </p>
            ) : (
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {filteredFaqs.map((faq) => (
                        <AccordionItem
                            key={faq.id}
                            value={faq.id.toString()}
                            className="border rounded-lg px-6 bg-white last:border-b"
                        >
                            <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                                {faq.acf?.question}
                            </AccordionTrigger>
                            <AccordionContent className="pb-6">
                                <div
                                    className="text-gray-700 leading-relaxed prose max-w-none"
                                    dangerouslySetInnerHTML={{ __html: faq.acf?.answer || '' }}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
        </>
    );
}
