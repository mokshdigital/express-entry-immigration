/**
 * Base fetch function with error handling and ISR
 */

import { REVALIDATE_TIME } from './config';
import { WordPressAPIError } from './errors';

interface FetchOptions extends RequestInit {
    revalidate?: number;
}

export async function fetchAPI<T>(
    url: string,
    options: FetchOptions = {}
): Promise<T> {
    const { revalidate = REVALIDATE_TIME, ...fetchOptions } = options;

    try {
        const response = await fetch(url, {
            ...fetchOptions,
            next: { revalidate }, // ISR configuration
        });

        if (!response.ok) {
            throw new WordPressAPIError(
                `API request failed: ${response.statusText}`,
                response.status
            );
        }

        const data = await response.json();
        return data as T;
    } catch (error) {
        if (error instanceof WordPressAPIError) {
            throw error;
        }

        console.error('[API Debug] Fetch error:', error);

        throw new WordPressAPIError(
            'Failed to fetch data from WordPress',
            500
        );
    }
}

/**
 * Fetch with _embed parameter to include featured images
 */
export async function fetchAPIWithEmbed<T>(
    url: string,
    options: FetchOptions = {}
): Promise<T> {
    const separator = url.includes('?') ? '&' : '?';
    const urlWithEmbed = `${url}${separator}_embed`;

    return fetchAPI<T>(urlWithEmbed, options);
}