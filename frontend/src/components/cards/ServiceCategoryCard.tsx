'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ServiceCategory } from '@/types/wordpress';
import { getDashicon } from '@/lib/utils/iconMapper';

interface ServiceCategoryCardProps {
    category: ServiceCategory;
    index?: number;
}

export function ServiceCategoryCard({ category, index = 0 }: ServiceCategoryCardProps) {
    const Icon = getDashicon(category.acf.service_category_icon.value);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link href={`/services/${category.slug}`} >
                <div className="group relative h-full bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-brand-red/30 flex flex-col">
                    {/* Icon */}
                    <div className="mb-6">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-red/10 to-brand-navy/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-8 h-8 text-brand-red" />
                        </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-red transition-colors">
                        {category.name}
                    </h3>

                    {category.description && (
                        <p className="text-gray-600 mb-6 line-clamp-3">
                            {category.description}
                        </p>
                    )}

                    {/* Arrow */}
                    <div className="flex items-center mt-auto justify-end">
                        <div className="w-10 h-10 rounded-full border-2 border-brand-red flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white group-hover:scale-110 transition-all duration-300">
                            <ArrowRight className="w-5 h-5 transition-transform" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
