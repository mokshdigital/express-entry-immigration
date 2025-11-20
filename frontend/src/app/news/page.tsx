/**
 * Blog Listing Page - All blog posts
 */
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, ChevronRight } from 'lucide-react';
import { getPosts } from '@/lib/api';

export const metadata: Metadata = {
    title: 'Latest News & Updates | Express Entry Immigration Services',
    description: 'Stay informed with the latest Canadian immigration news, policy updates, and helpful guides from our expert RCIC consultants.',
};

export default async function NewsPage() {
    const posts = await getPosts({ per_page: 20 });

    return (
        <main>
            {/* Hero Section */}
            <section className="bg-brand-navy text-white py-16 md:py-20">
                <div className="container">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Latest News & Updates
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl">
                        Stay informed about Canadian immigration changes, policy updates, and expert insights
                    </p>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="py-16 md:py-24">
                <div className="container">
                    {posts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-600">No posts found.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post) => {
                                const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
                                const postDate = new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                });

                                return (
                                    <Link key={post.id} href={`/news/${post.slug}`}>
                                        <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                                            {featuredImage && (
                                                <div className="relative h-48 w-full">
                                                    <Image
                                                        src={featuredImage.source_url}
                                                        alt={featuredImage.alt_text || post.title.rendered}
                                                        fill
                                                        className="object-cover rounded-t-lg"
                                                    />
                                                </div>
                                            )}
                                            <CardHeader>
                                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                                    <CalendarDays className="h-4 w-4" />
                                                    <time dateTime={post.date}>{postDate}</time>
                                                </div>
                                                <CardTitle className="line-clamp-2">
                                                    {post.title.rendered}
                                                </CardTitle>
                                                <CardDescription className="line-clamp-3">
                                                    {post.excerpt.rendered.replace(/<[^>]*>/g, '')}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-center text-brand-red font-semibold">
                                                    Read More
                                                    <ChevronRight className="h-4 w-4 ml-1" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}