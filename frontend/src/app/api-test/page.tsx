import {
    getPosts,
    getServices,
    getTestimonials,
    getFAQs,
    getStats,
    getHeroSettings,
    getContactSettings,
} from '@/lib/api';

export default async function APITestPage() {
    try {
        // Fetch all data types
        const [
            posts,
            services,
            testimonials,
            faqs,
            stats,
            heroSettings,
            contactSettings,
        ] = await Promise.all([
            getPosts(),
            getServices(),
            getTestimonials(),
            getFAQs(),
            getStats(),
            getHeroSettings(),
            getContactSettings(),
        ]);

        return (
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-8">API Test Page</h1>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Posts</h2>
                        <p>Count: {posts.length}</p>
                        <pre className="bg-gray-100 p-4 rounded overflow-auto">
                            {JSON.stringify(posts[0], null, 2)}
                        </pre>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Services</h2>
                        <p>Count: {services.length}</p>
                        <ul className="list-disc pl-6">
                            {services.map(service => (
                                <li key={service.id}>
                                    {service.title.rendered} - {service.acf?.service_category}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
                        <p>Count: {testimonials.length}</p>
                        <p>Featured: {testimonials.filter(t => t.acf?.featured).length}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
                        <p>Count: {faqs.length}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Stats</h2>
                        <p>Count: {stats.length}</p>
                        <ul className="list-disc pl-6">
                            {stats.map(stat => (
                                <li key={stat.id}>
                                    {stat.acf?.stat_number} - {stat.acf?.stat_description}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Hero Settings</h2>
                        <pre className="bg-gray-100 p-4 rounded overflow-auto">
                            {JSON.stringify(heroSettings, null, 2)}
                        </pre>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Contact Settings</h2>
                        <pre className="bg-gray-100 p-4 rounded overflow-auto">
                            {JSON.stringify(contactSettings, null, 2)}
                        </pre>
                    </section>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Full error:', error); // Add this line
        return (
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-8 text-red-600">API Test Error</h1>
                <pre className="bg-red-100 p-4 rounded overflow-auto">
                    {error instanceof Error ? error.message : 'Unknown error'}
                    {'\n\n'}
                    {error instanceof Error ? error.stack : ''}
                </pre>
            </div>
        );
    }
}
