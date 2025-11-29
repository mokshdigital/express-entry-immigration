'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { Service } from '@/types/wordpress';
import { decodeHTML } from '@/lib/utils/decode';

interface ServiceCardProps {
    service: Service;
    categorySlug: string;
    index?: number;
}

export function ServiceCard({ service, categorySlug, index = 0 }: ServiceCardProps) {
    const featuredImage = service._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const imageAlt = service._embedded?.['wp:featuredmedia']?.[0]?.alt_text || decodeHTML(service.title.rendered);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link href={`/services/${categorySlug}/${service.slug}`}>
                <div className="group h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-brand-gold/30">
                    {/* Featured Image */}
                    {featuredImage && (
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                            <Image
                                src={featuredImage}
                                alt={imageAlt}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-gold transition-colors">
                            {decodeHTML(service.title.rendered)}
                        </h3>

                        {service.excerpt?.rendered && (
                            <div
                                className="text-gray-600 line-clamp-3 mb-4"
                                dangerouslySetInnerHTML={{ __html: service.excerpt.rendered }}
                            />
                        )}

                        {/* Processing Time */}
                        {service.acf?.processing_time && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                <Clock className="w-4 h-4" />
                                <span>Processing Time: {service.acf.processing_time}</span>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="flex items-center text-brand-gold font-semibold group-hover:gap-2 transition-all">
                            <span>Learn More</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
