/**
 * WordPress Posts API functions
 */

import { ENDPOINTS } from './config';
import { fetchAPIWithEmbed } from './fetcher';
import { WordPressPost } from '@/types/wordpress';

/**
 * Get all posts
 */
export async function getPosts(
    params?: {
        per_page?: number;
        page?: number;
        categories?: number;
    }
): Promise<WordPressPost[]> {
    const queryParams = new URLSearchParams();

    if (params?.per_page) {
        queryParams.append('per_page', params.per_page.toString());
    }
    if (params?.page) {
        queryParams.append('page', params.page.toString());
    }
    if (params?.categories) {
        queryParams.append('categories', params.categories.toString());
    }

    const url = `${ENDPOINTS.posts}?${queryParams.toString()}`;
    return fetchAPIWithEmbed<WordPressPost[]>(url);
}

/**
 * Get single post by slug
 */
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
    const url = `${ENDPOINTS.posts}?slug=${slug}`;
    const posts = await fetchAPIWithEmbed<WordPressPost[]>(url);

    return posts.length > 0 ? posts[0] : null;
}

/**
 * Get post by ID
 */
export async function getPostById(id: number): Promise<WordPressPost> {
    const url = `${ENDPOINTS.posts}/${id}`;
    return fetchAPIWithEmbed<WordPressPost>(url);
}

/**
 * Get recent posts
 */
export async function getRecentPosts(limit: number = 5): Promise<WordPressPost[]> {
    return getPosts({ per_page: limit });
}