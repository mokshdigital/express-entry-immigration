/**
 * Stats Counter API functions
 */

import { ENDPOINTS } from './config';
import { fetchAPI } from './fetcher';
import { Stat } from '@/types/wordpress';

/**
 * Get all stats sorted by display order
 */
export async function getStats(): Promise<Stat[]> {
    const url = `${ENDPOINTS.stats}?per_page=100`;
    const stats = await fetchAPI<Stat[]>(url);

    // Sort by display_order field
    return stats.sort((a, b) => {
        const orderA = a.acf?.display_order || 999;
        const orderB = b.acf?.display_order || 999;
        return orderA - orderB;
    });
}