// Using global fetch in Node.js 24+
// Actually, modern Node has fetch.

async function checkServices() {
    const url = 'https://cms.expressentryimmigration.ca/wp-json/wp/v2/services?per_page=100&embed';
    console.log('Fetching:', url);
    try {
        const res = await fetch(url);
        console.log('Status:', res.status);
        if (!res.ok) {
            console.error('Error fetching services');
            return;
        }
        const data = await res.json();
        console.log('Total services:', data.length);
        if (data.length > 0) {
            console.log('First service sample:');
            console.log('Title:', data[0].title.rendered);
            console.log('Slug:', data[0].slug);
            console.log('ACF:', JSON.stringify(data[0].acf, null, 2));

            console.log('\nAll Service Categories:');
            data.forEach(s => {
                console.log(`- ${s.slug}: ${s.acf ? s.acf.service_category : 'NO ACF'}`);
            });
        }
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

checkServices();
