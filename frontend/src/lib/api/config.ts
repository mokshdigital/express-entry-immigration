/**
 * WordPress API Configuration
 */

// Base WordPress API URL
export const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '';
export const ACF_API_URL = process.env.NEXT_PUBLIC_ACF_API_URL || '';

// Revalidation time in seconds (ISR)
export const REVALIDATE_TIME = parseInt(process.env.REVALIDATE_TIME || '60');

// API endpoints
export const ENDPOINTS = {
    posts: `${WP_API_URL}/posts`,
    pages: `${WP_API_URL}/pages`,
    services: `${WP_API_URL}/services`,
    service_category: `${WP_API_URL}/service_category`,
    testimonials: `${WP_API_URL}/testimonials`,
    faqs: `${WP_API_URL}/faqs`,
    stats: `${WP_API_URL}/stats`,
    categories: `${WP_API_URL}/categories`,
    media: `${WP_API_URL}/media`,
} as const;

export const ACF_ENDPOINTS = {
    heroSettings: `${ACF_API_URL}/options/hero-settings`,
    navigationSettings: `${ACF_API_URL}/options/navigation-settings`,
    contactSettings: `${ACF_API_URL}/options/contact-settings`,
    socialLinks: `${ACF_API_URL}/options/social-links`,
    seoSettings: `${ACF_API_URL}/options/seo-settings`,
    siteSettings: `${ACF_API_URL}/options/site-settings`,
    aboutSettings: `${ACF_API_URL}/options/about-settings`,
} as const;