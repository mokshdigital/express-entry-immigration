'use client';

import Link from 'next/link';
import { Calendar, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ServiceSidebar() {
    return (
        <div className="space-y-6">
            {/* CTA Box */}
            <div className="bg-gradient-to-br from-brand-red to-brand-red/80 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Ready to Get Started?</h3>
                <p className="text-white/90 mb-6 text-sm">
                    Book a consultation with our immigration experts today.
                </p>
                <Button
                    asChild
                    className="w-full bg-white text-brand-red hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                >
                    <Link href="/contact">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Consultation
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>

            {/* Contact Box */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-brand-navy mb-4">Need Help?</h3>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-600 mb-2">Call us directly</p>
                        <a
                            href="tel:+14165551234"
                            className="flex items-center text-brand-navy hover:text-brand-red font-medium transition-colors"
                        >
                            <Phone className="w-4 h-4 mr-2" />
                            +1 (416) 555-1234
                        </a>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Monday - Friday: 9:00 AM - 6:00 PM<br />
                            Saturday: 10:00 AM - 4:00 PM
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-brand-navy mb-4">Quick Facts</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start">
                        <span className="w-2 h-2 bg-brand-red rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span>Professional immigration consultants</span>
                    </li>
                    <li className="flex items-start">
                        <span className="w-2 h-2 bg-brand-red rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span>High success rate</span>
                    </li>
                    <li className="flex items-start">
                        <span className="w-2 h-2 bg-brand-red rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span>Personalized service</span>
                    </li>
                    <li className="flex items-start">
                        <span className="w-2 h-2 bg-brand-red rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span>End-to-end support</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
