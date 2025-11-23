/**
 * Single Blog Post Page
 */
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, User, ArrowRight } from 'lucide-react';
import { getPostBySlug, getRecentPosts } from '@/lib/api';

// Generate metadata
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160);

    return {
        title: `${post.title.rendered} | Express Entry Immigration Services`,
        description: excerpt,
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const [post, recentPosts] = await Promise.all([
        getPostBySlug(slug),
        getRecentPosts(3),
    ]);

    if (!post) {
        notFound();
    }

    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
    const postDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <main>
            {/* Breadcrumbs */}
            <div className="bg-gray-50 py-4 border-b">
                <div className="container">
                    <nav className="flex text-sm text-gray-500" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link href="/" className="hover:text-brand-navy transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <span className="mx-2">/</span>
                                    <Link href="/news" className="hover:text-brand-navy transition-colors">
                                        Latest Updates
                                    </Link>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <span className="mx-2">/</span>
                                    <span className="text-gray-900 font-medium line-clamp-1 max-w-[200px] md:max-w-none">
                                        {post.title.rendered}
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Article */}
            <article className="py-12 md:py-16">
                <div className="container max-w-4xl">
                    <div className="mb-8">
                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4" />
                                <time dateTime={post.date}>{postDate}</time>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>Express Entry Immigration</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
                            {post.title.rendered}
                        </h1>

                        {/* Featured Image */}
                        {featuredImage && (
                            <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-8">
                                <Image
                                    src={featuredImage.source_url}
                                    alt={featuredImage.alt_text || post.title.rendered}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-lg max-w-none mb-12"
                        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                    />

                    {/* CTA */}
                    <Card className="bg-brand-navy text-white mb-12">
                        <CardContent className="py-8 text-center">
                            <h3 className="text-2xl font-bold mb-4">
                                Need Help with Your Immigration Case?
                            </h3>
                            <p className="mb-6 opacity-90">
                                Our licensed RCIC consultants are here to help you navigate the process
                            </p>
                            <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red/90 transition-all duration-300 hover:scale-105">
                                <Link href="/contact">
                                    Book Free Consultation
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Recent Posts */}
                    {recentPosts.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-brand-navy mb-6">
                                Recent Posts
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {recentPosts
                                    .filter(p => p.id !== post.id)
                                    .slice(0, 3)
                                    .map((recentPost) => {
                                        const recentImage = recentPost._embedded?.['wp:featuredmedia']?.[0];

                                        return (
                                            <Link key={recentPost.id} href={`/news/${recentPost.slug}`}>
                                                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                                                    {recentImage && (
                                                        <div className="relative h-32 w-full">
                                                            <Image
                                                                src={recentImage.source_url}
                                                                alt={recentImage.alt_text || recentPost.title.rendered}
                                                                fill
                                                                className="object-cover rounded-t-lg"
                                                            />
                                                        </div>
                                                    )}
                                                    <CardHeader>
                                                        <CardTitle className="text-base line-clamp-2">
                                                            {recentPost.title.rendered}
                                                        </CardTitle>
                                                    </CardHeader>
                                                </Card>
                                            </Link>
                                        );
                                    })}
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </main>
    );
}