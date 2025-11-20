import { SiteSettings } from '@/types/wordpress';

export function generateOrganizationSchema(siteSettings: SiteSettings, contactEmail: string, contactPhone: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: siteSettings.site_name,
        image: siteSettings.site_logo_url,
        description: 'Professional Canadian immigration consulting services',
        url: 'https://expressentryimmigration.ca',
        telephone: contactPhone,
        email: contactEmail,
        address: {
            '@type': 'PostalAddress',
            streetAddress: '123 Main Street, Suite 200',
            addressLocality: 'Toronto',
            addressRegion: 'ON',
            postalCode: 'M5V 3A8',
            addressCountry: 'CA',
        },
        areaServed: 'CA',
        sameAs: [
            'https://facebook.com/expressentryimmigration',
            'https://linkedin.com/company/expressentryimmigration',
            'https://twitter.com/eeimmigration',
        ],
    };
}

export function generateServiceSchema(serviceName: string, description: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: serviceName,
        description: description,
        provider: {
            '@type': 'LocalBusiness',
            name: 'Express Entry Immigration Services',
            url: 'https://expressentryimmigration.ca',
        },
        areaServed: 'CA',
        serviceType: 'Immigration Consulting',
    };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer.replace(/<[^>]*>/g, ''), // Strip HTML
            },
        })),
    };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}