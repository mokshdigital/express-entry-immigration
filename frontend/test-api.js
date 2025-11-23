// Native fetch is available in Node.js 18+

const API_URL = 'https://cms.expressentryimmigration.ca/wp-json/wp/v2';

async function testAPI() {
    try {
        console.log(`Fetching posts from: ${API_URL}/posts`);
        const response = await fetch(`${API_URL}/posts?per_page=5`);

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return;
        }

        const posts = await response.json();
        console.log(`Found ${posts.length} posts:`);
        posts.forEach(post => {
            console.log(`- ID: ${post.id}, Slug: ${post.slug}, Title: ${post.title.rendered}`);
        });

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

testAPI();
