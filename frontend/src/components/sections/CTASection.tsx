import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
    return (
        <section className="bg-brand-navy py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Ready to Start Your Canadian Journey?
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                    Book a free consultation today and let's discuss how we can help
                    you achieve your immigration goals.
                </p>
                <Link href="/contact">
                    <Button
                        size="lg"
                        className="bg-brand-red hover:bg-brand-red/90 text-white font-semibold px-8 py-6 text-lg rounded-md transition-all duration-300 hover:scale-105"
                    >
                        Book Free Consultation
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
            </div>
        </section>
    );
}
