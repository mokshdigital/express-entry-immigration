/**
 * FAQs Preview - Display first few FAQs on home page
 */
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import type { FAQ } from '@/types/wordpress';

interface FAQsPreviewProps {
    faqs: FAQ[];
}

export default function FAQsPreview({ faqs }: FAQsPreviewProps) {
    if (!faqs || faqs.length === 0) {
        return null;
    }

    // Show first 6 FAQs
    const previewFaqs = faqs.slice(0, 6);

    return (
        <section className="py-16 md:py-24">
            <div className="container max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600">
                        Quick answers to common immigration questions
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {previewFaqs.map((faq) => (
                        <AccordionItem
                            key={faq.id}
                            value={faq.id.toString()}
                            className="border rounded-lg px-6 last:border-b"
                        >
                            <AccordionTrigger className="text-left font-semibold hover:no-underline">
                                {faq.acf?.question || faq.title.rendered}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div
                                    className="text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: faq.acf?.answer || faq.content.rendered }}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <div className="text-center mt-12">
                    <Button asChild size="lg" variant="outline">
                        <Link href="/faqs">
                            View All FAQs
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}