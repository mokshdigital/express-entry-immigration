import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getServiceCategoryBySlug, getServicesByCategory } from '@/lib/api';
import { ServiceFlipCard } from '@/components/cards/ServiceFlipCard';

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const category = await getServiceCategoryBySlug(resolvedParams.category);

    if (!category) {
        return {
            title: 'Category Not Found',
        };
    }

    return {
        title: `${category.name} - Express Entry Immigration Services`,
        description: category.description || `Explore our ${category.name.toLowerCase()} immigration services`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const resolvedParams = await params;
    const [category, services] = await Promise.all([
        getServiceCategoryBySlug(resolvedParams.category),
        getServicesByCategory(resolvedParams.category),
    ]);

    if (!category) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-brand-navy to-brand-navy/80 text-white py-20 md:py-32">
                <div className="container">
                    {/* Category Header */}
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {category.name}
                        </h1>
                        {category.description && (
                            <p className="text-xl text-blue-100 max-w-3xl">
                                {category.description}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 md:py-24">
                <div className="container">
                    {services && services.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <ServiceFlipCard
                                    key={service.id}
                                    service={service}
                                    categorySlug={resolvedParams.category}
                                    index={index}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">
                                No services available in this category yet.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}