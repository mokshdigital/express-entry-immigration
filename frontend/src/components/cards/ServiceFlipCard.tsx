'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { Service } from '@/types/wordpress';

interface ServiceFlipCardProps {
    service: Service;
    categorySlug: string;
    index?: number;
}

export function ServiceFlipCard({ service, categorySlug, index = 0 }: ServiceFlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const title = service.title.rendered;
    // Extract plain text and limit to 100 chars
    const plainExcerpt = service.excerpt?.rendered
        ? service.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
        : '';

    return (
        <div
            className="h-[280px] [perspective:1000px] cursor-pointer"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: index * 0.1 }}
                className="w-full h-full"
            >
                <motion.div
                    className="relative w-full h-full"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 1, type: "spring", stiffness: 100, damping: 20 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Front of card */}
                    <div className="absolute w-full h-full" style={{ backfaceVisibility: "hidden" }}>
                        <div className="relative h-full rounded-2xl overflow-hidden shadow-lg bg-brand-navy p-8 flex items-center justify-center">
                            <h3 className="text-2xl font-bold text-white text-center">{title}</h3>
                        </div>
                    </div>

                    {/* Back of card */}
                    <div
                        className="absolute w-full h-full"
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                        <div className="h-full rounded-2xl bg-white p-6 flex flex-col justify-center items-center text-center shadow-lg border border-gray-100">
                            <h3 className="text-lg font-bold text-brand-navy mb-3">{title}</h3>
                            <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">
                                {plainExcerpt}
                            </p>
                            <Link
                                href={`/services/${categorySlug}/${service.slug}`}
                                className="inline-flex items-center justify-center bg-brand-red hover:bg-brand-red/90 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <span>View Service</span>
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
