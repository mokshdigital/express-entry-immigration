/**
 * Services API functions
 */

import { ENDPOINTS } from './config';
import { fetchAPIWithEmbed } from './fetcher';
import { Service } from '@/types/wordpress';

/**
 * Get all services
 */
export async function getServices(): Promise<Service[]> {
    const url = `${ENDPOINTS.services}?per_page=100`;
    return fetchAPIWithEmbed<Service[]>(url);
}

/**
 * Get service by slug
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
    const url = `${ENDPOINTS.services}?slug=${slug}`;
    const services = await fetchAPIWithEmbed<Service[]>(url);

    return services.length > 0 ? services[0] : null;
}

/**
 * Get services by category
 */
export async function getServicesByCategory(category: string): Promise<Service[]> {
    const services = await getServices();

    return services.filter(
        service => service.acf?.service_category === category
    );
}

/**
 * Get all service categories
 */
export async function getServiceCategories(): Promise<string[]> {
    const services = await getServices();
    const categories = new Set(
        services.map(service => service.acf?.service_category).filter(Boolean)
    );

    return Array.from(categories);
}