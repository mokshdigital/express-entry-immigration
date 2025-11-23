'use client';

import { ServiceCategory } from '@/types/wordpress';
import { ServiceCategoryCard } from '@/components/cards/ServiceCategoryCard';

interface ServiceCategoriesGridProps {
    categories: ServiceCategory[];
}

export default function ServiceCategoriesGrid({ categories }: ServiceCategoriesGridProps) {
    if (!categories || categories.length === 0) {
        return null;
    }

    return (
        <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="container">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                        Our Immigration Services
                    </h2>
                    <p className="text-lg text-gray-600">
                        Expert guidance for every step of your Canadian immigration journey
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {categories.map((category, index) => (
                        <ServiceCategoryCard
                            key={category.id}
                            category={category}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
