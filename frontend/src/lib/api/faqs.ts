/**
 * FAQs API functions
 */

import { ENDPOINTS } from './config';
import { fetchAPI } from './fetcher';
import { FAQ } from '@/types/wordpress';

/**
 * Get all FAQs sorted by display order
 */
export async function getFAQs(): Promise<FAQ[]> {
    const url = `${ENDPOINTS.faqs}?per_page=100`;
    const faqs = await fetchAPI<FAQ[]>(url);

    // Additional sort by ACF display_order field
    return faqs.sort((a, b) => {
        const orderA = a.acf?.display_order || 999;
        const orderB = b.acf?.display_order || 999;
        return orderA - orderB;
    });
}

/**
 * Get FAQs by category
 */
export async function getFAQsByCategory(category: string): Promise<FAQ[]> {
    const faqs = await getFAQs();

    return faqs.filter(
        faq => faq.acf?.faq_category === category
    );
}

/**
 * Get FAQ categories
 */
export async function getFAQCategories(): Promise<string[]> {
    const faqs = await getFAQs();
    const categories = new Set(
        faqs.map(faq => faq.acf?.faq_category).filter(Boolean)
    );

    return Array.from(categories);
}