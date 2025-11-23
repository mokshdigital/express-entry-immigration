import { ENDPOINTS } from './config';
import { fetchAPIWithEmbed } from './fetcher';
import { WordPressPage } from '@/types/wordpress';

/**
 * Get a page by slug
 */
export async function getPageBySlug(slug: string): Promise<WordPressPage | null> {
    const url = `${ENDPOINTS.pages}?slug=${slug}`;
    const pages = await fetchAPIWithEmbed<WordPressPage[]>(url);

    return pages.length > 0 ? pages[0] : null;
}
