import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { SkeletonGrid } from '@/components/loading/SkeletonGrid';

const ServiceCategoryTabs = dynamic(
    () => import('@/components/sections/ServiceCategoryTabs').then(mod => mod.ServiceCategoryTabs),
    {
        loading: () => <SkeletonGrid count={6} columns={3} />,
        ssr: true,
    }
);

export default async function ServicesPage() {
    return (
        <main className="min-h-screen">
            {/* Hero section */}
            <section className="bg-gradient-to-r from-brand-navy to-brand-navy/80 text-white py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
                    <p className="text-xl text-blue-100">
                        Comprehensive immigration consulting services for every life goal.
                    </p>
                </div>
            </section>

            {/* Services section */}
            <section className="container mx-auto px-4 py-16 md:py-24">
                <Suspense fallback={<SkeletonGrid count={6} columns={3} />}>
                    <ServiceCategoryTabs />
                </Suspense>
            </section>
        </main>
    );
}