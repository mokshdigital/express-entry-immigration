import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug, getSEOSettings } from '@/lib/api';
import { sanitizeHTML } from '@/lib/utils/sanitize';

// Generate metadata
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const [page, seoSettings] = await Promise.all([
        getPageBySlug(slug),
        getSEOSettings(),
    ]);

    if (!page) {
        return {
            title: 'Page Not Found',
        };
    }

    return {
        title: page.title.rendered,
        description: page.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160) || seoSettings.default_meta_description,
    };
}

export default async function DynamicPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const page = await getPageBySlug(slug);

    if (!page) {
        notFound();
    }

    // Sanitize HTML content to prevent XSS attacks
    const sanitizedContent = sanitizeHTML(page.content.rendered);

    return (
        <main className="py-12 md:py-16">
            <div className="container max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-8">
                    {page.title.rendered}
                </h1>

                <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                />
            </div>
        </main>
    );
}

